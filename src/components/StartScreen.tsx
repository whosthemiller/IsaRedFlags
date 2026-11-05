import { useLocale } from "../content/LocaleContext"
import { AppFrame } from "./AppFrame"
import { Disclaimer } from "./Disclaimer"
import { GameMark } from "./GameMark"
import { Logo } from "./Logo"

type StartScreenProps = {
  onStart: () => void
  inert?: boolean
}

export function StartScreen({ onStart, inert = false }: StartScreenProps) {
  const { copy, meta, setLocale } = useLocale()

  return (
    <div className="screen start-screen" inert={inert || undefined} aria-hidden={inert || undefined}>
      <AppFrame>
        <header className="app-bar">
          <Logo />
          <span className="app-bar-gap" />
          <div className="tools">
            <button
              type="button"
              className="lang-toggle"
              onClick={() => setLocale(meta.switchToLocale)}
              aria-label={meta.switchToLocale === "en" ? "Switch to English" : "מעבר לעברית"}
            >
              {meta.switchToLabel}
            </button>
          </div>
        </header>
        <div className="start-body">
          <div className="start-hero">
            <div className="game-lockup">
              <GameMark />
              <p className="tagline prose">{copy.logoTagline}</p>
            </div>
          </div>
          <div className="start-story">
            <p className="intro-lead prose">{copy.introLead}</p>
            <p className="concept prose">{copy.introDecide}</p>
          </div>
        </div>
        <footer className="dock start-dock">
          <button type="button" className="primary-button" onClick={onStart}>
            {copy.introCta}
          </button>
          <Disclaimer />
        </footer>
      </AppFrame>
    </div>
  )
}
