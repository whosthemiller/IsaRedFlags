import { readFileSync, writeFileSync } from "node:fs"
import type { IncomingMessage, ServerResponse } from "node:http"
import path from "node:path"
import type { Plugin } from "vite"
import { applyProfileTextEdit, readProfileTextEdit } from "./src/review/applyProfileTextEdit"

const CONTENT_NAME = "isa_swipe_game_content.json"

function contentPath(): string {
  return path.resolve(process.cwd(), CONTENT_NAME)
}

function isContentFile(file: string): boolean {
  return file.endsWith(`/${CONTENT_NAME}`) || file.endsWith(`\\${CONTENT_NAME}`)
}

function requestPath(url: string | undefined): string {
  const pathOnly = (url ?? "").split("?")[0] ?? ""
  if (pathOnly.length > 1 && pathOnly.endsWith("/")) return pathOnly.slice(0, -1)
  return pathOnly || "/"
}

function isRoute(pathname: string, suffix: string): boolean {
  return pathname === suffix || pathname.endsWith(suffix)
}

function sendJson(res: ServerResponse, status: number, body: unknown) {
  res.statusCode = status
  res.setHeader("Content-Type", "application/json; charset=utf-8")
  res.end(JSON.stringify(body))
}

function readRequestBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = []
    let size = 0
    req.on("data", (chunk: Buffer) => {
      size += chunk.length
      if (size > 1_000_000) {
        reject(new Error("הבקשה גדולה מדי"))
        req.destroy()
        return
      }
      chunks.push(chunk)
    })
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")))
    req.on("error", reject)
  })
}

function readContent(): unknown {
  return JSON.parse(readFileSync(contentPath(), "utf8")) as unknown
}

export function contentEditorPlugin(): Plugin {
  return {
    name: "content-editor",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const pathname = requestPath(req.url)
        const profileRoute = isRoute(pathname, "/api/content/profile")
        const contentRoute = !profileRoute && isRoute(pathname, "/api/content")

        if (req.method === "GET" && contentRoute) {
          try {
            sendJson(res, 200, readContent())
          } catch {
            sendJson(res, 500, { ok: false, errors: ["לא הצלחנו לקרוא את קובץ התוכן"] })
          }
          return
        }

        if (req.method === "PUT" && profileRoute) {
          try {
            const edit = readProfileTextEdit(JSON.parse(await readRequestBody(req)) as unknown)
            if (!edit) {
              sendJson(res, 400, { ok: false, errors: ["הבקשה אינה עריכת טקסט תקינה"] })
              return
            }
            const merged = applyProfileTextEdit(readContent(), edit)
            if (!merged.ok) {
              sendJson(res, 400, merged)
              return
            }
            writeFileSync(contentPath(), `${JSON.stringify(merged.content, null, 2)}\n`)
            sendJson(res, 200, { ok: true })
          } catch {
            sendJson(res, 400, { ok: false, errors: ["לא הצלחנו לשמור את הטקסט"] })
          }
          return
        }

        next()
      })
    },
    // A content save rewrites the JSON the game imports. Skip the reload so the
    // review screen keeps unsaved drafts. Refreshing the game shows the new copy.
    hotUpdate(options) {
      if (!isContentFile(options.file)) return
      const seen = new Set<(typeof options.modules)[number]>()
      for (const mod of options.modules) {
        this.environment.moduleGraph.invalidateModule(mod, seen, options.timestamp, false)
      }
      return []
    },
    generateBundle() {
      this.emitFile({
        type: "asset",
        fileName: "review-content.json",
        source: readFileSync(contentPath(), "utf8"),
      })
    },
  }
}
