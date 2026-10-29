import { useRef, type ReactNode } from "react"
import { useZoomToFit } from "../hooks/useZoomToFit"

type AppFrameProps = {
  children: ReactNode
  /** Changes that alter the column height, so the fit is measured again. */
  watch?: unknown
}

export function AppFrame({ children, watch }: AppFrameProps) {
  const frameRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  useZoomToFit(frameRef, innerRef, watch)

  return (
    <div className="app-frame" ref={frameRef}>
      <div className="fit-target" ref={innerRef}>
        {children}
      </div>
    </div>
  )
}
