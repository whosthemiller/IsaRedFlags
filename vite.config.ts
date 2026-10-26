import react from "@vitejs/plugin-react"
import { defineConfig } from "vitest/config"
import { contentEditorPlugin } from "./contentEditorPlugin"

export default defineConfig({
  base: process.env.VITE_BASE || "/",
  plugins: [react(), contentEditorPlugin()],
  server: {
    host: true,
    port: 5173,
  },
  preview: {
    host: true,
    port: 4173,
  },
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
})
