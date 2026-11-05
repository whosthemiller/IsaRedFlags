import { useLocale } from "../content/LocaleContext"
import { LogoLoader } from "./LogoLoader"

export function LoadingScreen() {
  const { meta } = useLocale()
  return (
    <div className="screen loading-screen" role="status" aria-live="polite">
      <div className="app-frame">
        <LogoLoader label={meta.logoLoading} />
        <p className="sr-only">{meta.loading}</p>
      </div>
    </div>
  )
}
