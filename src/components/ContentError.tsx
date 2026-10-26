import { uiCopy } from "../content/uiCopy"
import { Logo } from "./Logo"

export function ContentError({ errors }: { errors: string[] }) {
  return (
    <div className="screen start-screen">
      <div className="app-frame">
        <header className="app-bar">
          <Logo />
        </header>
        <div className="start-body">
          <h1>{uiCopy.contentError}</h1>
          {import.meta.env.DEV ? (
            <ul className="error-list">
              {errors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </div>
  )
}
