/** Path to a file in `public/`, including the deploy base (for example `/IsaRedFlags/`). */
export function publicUrl(path: string): string {
  const base = import.meta.env.BASE_URL || "/"
  return `${base}${path.replace(/^\/+/, "")}`
}
