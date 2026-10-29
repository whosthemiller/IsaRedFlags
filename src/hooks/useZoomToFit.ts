import { useLayoutEffect, type RefObject } from "react"

/**
 * Scales a content column down so it stays inside the frame.
 * offsetHeight ignores transforms, so the natural height can be measured
 * while a transform is already applied. Nothing is clipped and nothing scrolls.
 */
export function useZoomToFit(
  frameRef: RefObject<HTMLElement | null>,
  innerRef: RefObject<HTMLElement | null>,
  watch: unknown,
) {
  useLayoutEffect(() => {
    const frame = frameRef.current
    const inner = innerRef.current
    if (!frame || !inner) return

    const apply = () => {
      const style = getComputedStyle(frame)
      const availableH =
        frame.clientHeight - parseFloat(style.paddingTop) - parseFloat(style.paddingBottom)
      const availableW =
        frame.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight)
      const neededH = inner.offsetHeight
      const neededW = inner.offsetWidth
      if (availableH <= 0 || availableW <= 0 || neededH <= 0 || neededW <= 0) return

      const scaleH = neededH > availableH + 1 ? (availableH - 0.5) / neededH : 1
      const scaleW = neededW > availableW + 1 ? (availableW - 0.5) / neededW : 1
      const scale = Math.min(1, scaleH, scaleW)
      const next = scale < 0.995 ? `scale(${scale})` : ""
      if ((inner.style.transform || "") === next) return
      inner.style.transformOrigin = next ? "top center" : ""
      inner.style.transform = next
    }

    apply()
    const observer = new ResizeObserver(apply)
    observer.observe(frame)
    observer.observe(inner)
    window.addEventListener("resize", apply)
    window.visualViewport?.addEventListener("resize", apply)
    document.fonts?.addEventListener("loadingdone", apply)
    return () => {
      observer.disconnect()
      window.removeEventListener("resize", apply)
      window.visualViewport?.removeEventListener("resize", apply)
      document.fonts?.removeEventListener("loadingdone", apply)
      inner.style.transform = ""
      inner.style.transformOrigin = ""
    }
  }, [frameRef, innerRef, watch])
}
