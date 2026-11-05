import { describe, expect, it } from "vitest"
import { loadGameContent } from "./loadContent"

describe("loadGameContent", () => {
  it("loads the Hebrew deck", () => {
    const result = loadGameContent("he")
    expect(result.ok).toBe(true)
    if (!result.ok) return
    expect(result.content.language).toBe("he")
    expect(result.content.direction).toBe("rtl")
    expect(result.content.profiles).toHaveLength(22)
  })

  it("loads the English deck", () => {
    const result = loadGameContent("en")
    expect(result.ok).toBe(true)
    if (!result.ok) return
    expect(result.content.language).toBe("en")
    expect(result.content.direction).toBe("ltr")
    expect(result.content.profiles).toHaveLength(22)
    expect(result.content.profiles[0]?.name).toBe("Nadav")
  })
})
