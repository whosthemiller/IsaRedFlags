import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react"
import type { Direction } from "../types/content"

export interface DragState {
  x: number
  y: number
  dragging: boolean
  settling: boolean
}

const REST: DragState = { x: 0, y: 0, dragging: false, settling: false }
const THRESHOLD = 88

export function useSwipe({
  enabled,
  reducedMotion,
  onCommit,
}: {
  enabled: boolean
  reducedMotion: boolean
  onCommit: (direction: Direction) => void
}) {
  const [drag, setDrag] = useState<DragState>(REST)
  const cardRef = useRef<HTMLElement | null>(null)
  const origin = useRef<{ id: number; x: number; y: number; horizontal: boolean; blocked: boolean } | null>(null)
  const enabledRef = useRef(enabled)
  enabledRef.current = enabled

  useEffect(() => {
    if (!enabled) {
      origin.current = null
      setDrag(REST)
    }
  }, [enabled])

  useEffect(() => {
    const node = cardRef.current
    if (!node) return
    // Safari scrolls the page on a slightly diagonal swipe. preventDefault on
    // pointermove is ignored; only a non-passive touchmove listener can cancel it.
    const blockPageScroll = (event: TouchEvent) => {
      if (!origin.current || !event.cancelable) return
      event.preventDefault()
    }
    node.addEventListener("touchmove", blockPageScroll, { passive: false })
    return () => node.removeEventListener("touchmove", blockPageScroll)
  }, [])

  function onPointerDown(event: ReactPointerEvent<HTMLElement>) {
    if (!enabledRef.current || event.button !== 0) return
    origin.current = {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      horizontal: false,
      blocked: false,
    }
  }

  function onPointerMove(event: ReactPointerEvent<HTMLElement>) {
    const start = origin.current
    if (!start || start.id !== event.pointerId || !enabledRef.current) return
    const dx = event.clientX - start.x
    const dy = event.clientY - start.y
    if (!start.horizontal && !start.blocked) {
      if (Math.abs(dy) > 16 && Math.abs(dy) > Math.abs(dx) * 1.2) {
        start.blocked = true
        setDrag(REST)
        return
      }
      if (Math.abs(dx) < 10 || Math.abs(dx) <= Math.abs(dy)) return
      start.horizontal = true
      try {
        event.currentTarget.setPointerCapture(event.pointerId)
      } catch {
        // Capture is unavailable for some synthetic or cancelled pointers.
      }
    }
    if (start.blocked) return
    if (event.cancelable) event.preventDefault()
    setDrag({ x: dx, y: dy * 0.08, dragging: true, settling: false })
  }

  function finish(event: ReactPointerEvent<HTMLElement>) {
    const start = origin.current
    if (!start || start.id !== event.pointerId) return
    const dx = event.clientX - start.x
    const horizontal = start.horizontal
    origin.current = null
    if (enabledRef.current && horizontal && Math.abs(dx) >= THRESHOLD) {
      onCommit(dx < 0 ? "left" : "right")
    }
    setDrag({ x: 0, y: 0, dragging: false, settling: !reducedMotion })
  }

  function onPointerCancel() {
    origin.current = null
    setDrag({ x: 0, y: 0, dragging: false, settling: !reducedMotion })
  }

  return {
    drag,
    cardRef,
    handlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp: finish,
      onPointerCancel,
    },
  }
}
