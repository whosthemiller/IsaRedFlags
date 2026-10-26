/** True when the URL is the profile review screen, including a non-root deploy base. */
export function isReviewPath(pathname: string, base: string): boolean {
  const normalizedBase = base.endsWith("/") ? base : `${base}/`
  const review = `${normalizedBase}review`.replace(/\/{2,}/g, "/")
  const path = pathname.length > 1 && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname
  return path === review
}
