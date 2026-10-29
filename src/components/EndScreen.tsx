import { gameConfig } from "../config/gameConfig"
import { endResultForScore, uiCopy, type EndLine } from "../content/uiCopy"
import type { RoundState } from "../types/content"
import { AppFrame } from "./AppFrame"
import { Disclaimer } from "./Disclaimer"
import { Logo } from "./Logo"
import { Spark } from "./Spark"

type EndScreenProps = {
  round: RoundState
  onRestart: () => void
}

function RankedLine({ line }: { line: EndLine }) {
  return (
    <>
      <span className="end-lead">{line.lead}</span>
      {line.rest ? <span className="end-rest">{line.rest}</span> : null}
    </>
  )
}

export function EndScreen({ round, onRestart }: EndScreenProps) {
  const result = endResultForScore(round.correct)
  return (
    <div className="screen end-screen">
      <AppFrame watch={`${round.correct}/${round.length}`}>
        <header className="app-bar">
          <Logo />
          <span className="app-bar-gap" />
        </header>
        <div className="end-body">
          <h1 dir="rtl">
            <RankedLine line={result.title} />
          </h1>
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
            <RankedLine line={result.description} />
          </p>
        </div>
        <footer className="dock end-dock">
          <button type="button" className="primary-button" onClick={onRestart}>
            {uiCopy.again}
          </button>
          <Disclaimer />
        </footer>
        <p className="sr-only">{gameConfig.gameName}</p>
      </AppFrame>
    </div>
  )
}
