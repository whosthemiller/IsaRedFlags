import { useEffect, useState } from "react"
import { uiCopy } from "../content/uiCopy"
import { IconExpand } from "./icons"

export function FullScreenButton() {
  const [supported, setSupported] = useState(false)
  const [active, setActive] = useState(false)

  useEffect(() => {
    setSupported(typeof document.documentElement.requestFullscreen === "function")
    const onChange = () => setActive(Boolean(document.fullscreenElement))
    document.addEventListener("fullscreenchange", onChange)
    return () => document.removeEventListener("fullscreenchange", onChange)
  }, [])

  if (!supported) return null

  function toggle() {
    if (document.fullscreenElement) {
      void document.exitFullscreen()
      return
    }
    void document.documentElement.requestFullscreen().catch(() => undefined)
  }

  return (
    <button
      type="button"
      className="ghost-button"
      aria-pressed={active}
      aria-label={active ? uiCopy.exitFullscreen : uiCopy.fullscreen}
      onClick={toggle}
    >
      <IconExpand />
    </button>
  )
}
