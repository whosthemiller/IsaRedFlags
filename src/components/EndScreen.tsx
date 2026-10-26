import { gameConfig } from "../config/gameConfig"
import { endResultForScore, uiCopy } from "../content/uiCopy"
import type { RoundState } from "../types/content"
import { Disclaimer } from "./Disclaimer"
import { Logo } from "./Logo"
import { Spark } from "./Spark"

type EndScreenProps = {
  round: RoundState
  onRestart: () => void
}

export function EndScreen({ round, onRestart }: EndScreenProps) {
  const result = endResultForScore(round.correct)
  return (
    <div className="screen end-screen">
      <div className="app-frame">
        <header className="app-bar">
          <Logo />
          <span className="app-bar-gap" />
        </header>
        <div className="end-body">
          <h1 dir="rtl">{result.title}</h1>
          <div className="end-medal">
              <Spark className="spark spark-a" />
              <Spark className="spark spark-b" />
              <Spark className="spark spark-c" />
              <Spark className="spark spark-d" />
              <Spark className="spark spark-e" />
            <p className="end-score">
              <bdi dir="ltr">
                {round.correct}/{round.length}
              </bdi>
            </p>
          </div>
          <p className="closing prose" dir="rtl">
            {result.description}
          </p>
        </div>
        <footer className="dock end-dock">
          <button type="button" className="primary-button" onClick={onRestart}>
            {uiCopy.again}
          </button>
          <Disclaimer />
        </footer>
        <p className="sr-only">{gameConfig.gameName}</p>
      </div>
    </div>
  )
}
