import { useLocale } from "../content/LocaleContext"
import { AppFrame } from "./AppFrame"
import { Logo } from "./Logo"

export function ContentError({ errors }: { errors: string[] }) {
  const { copy } = useLocale()
  return (
    <div className="screen start-screen">
      <AppFrame watch={errors.length}>
        <header className="app-bar">
          <Logo />
        </header>
        <div className="start-body">
          <h1>{copy.contentError}</h1>
          {import.meta.env.DEV ? (
            <ul className="error-list">
              {errors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          ) : null}
        </div>
      </AppFrame>
    </div>
  )
}
