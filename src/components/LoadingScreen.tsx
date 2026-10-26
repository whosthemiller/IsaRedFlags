import { LogoLoader } from "./LogoLoader"

export function LoadingScreen() {
  return (
    <div className="screen loading-screen" role="status" aria-live="polite">
      <div className="app-frame">
        <LogoLoader />
        <p className="sr-only">טוען</p>
      </div>
    </div>
  )
}
