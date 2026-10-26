import { uiCopy } from "../content/uiCopy"
import { Disclaimer } from "./Disclaimer"
import { FullScreenButton } from "./FullScreenButton"
import { GameMark } from "./GameMark"
import { IconHeart, IconNope } from "./icons"
import { Logo } from "./Logo"

type StartScreenProps = {
  onStart: () => void
}

export function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="screen start-screen">
      <div className="app-frame">
        <header className="app-bar">
          <Logo />
          <span className="app-bar-gap" />
          <div className="tools">
            <FullScreenButton />
          </div>
        </header>
        <div className="start-body">
          <div className="start-hero">
            <div className="game-lockup">
              <GameMark />
              <p className="tagline prose">{uiCopy.logoTagline}</p>
            </div>
          </div>
          <div className="start-story">
            <p className="intro-lead prose">{uiCopy.introLead}</p>
            <p className="concept prose">{uiCopy.introDecide}</p>
            <p className="concept prose">{uiCopy.introDiscover}</p>
          </div>
          <div className="legend" dir="ltr">
            <div className="legend-item">
              <span className="orb orb-nope">
                <IconNope />
              </span>
              <span className="action-label" dir="rtl">
                {uiCopy.pass}
              </span>
              <span className="action-meta" dir="rtl">
                {uiCopy.passMeta}
              </span>
            </div>
            <div className="legend-item">
              <span className="orb orb-like">
                <IconHeart />
              </span>
              <span className="action-label" dir="rtl">
                {uiCopy.like}
              </span>
              <span className="action-meta" dir="rtl">
                {uiCopy.likeMeta}
              </span>
            </div>
          </div>
        </div>
        <footer className="dock start-dock">
          <p className="intro-cta prose">{uiCopy.introCta}</p>
          <button type="button" className="primary-button" onClick={onStart}>
            {uiCopy.start}
          </button>
          <Disclaimer />
        </footer>
      </div>
    </div>
  )
}
