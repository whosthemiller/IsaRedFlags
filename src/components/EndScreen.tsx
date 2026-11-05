import { useEffect } from "react"
import { useLocale } from "../content/LocaleContext"
import { endResultForScore, type EndLine } from "../content/uiCopy"
import type { RoundState } from "../types/content"
import { AppFrame } from "./AppFrame"
import { Disclaimer } from "./Disclaimer"
import { Logo } from "./Logo"
import { Spark } from "./Spark"

const IDLE_RELOAD_MS = 60_000

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
  const { locale, copy, meta } = useLocale()
  const result = endResultForScore(round.correct, locale)

  useEffect(() => {
    const id = window.setTimeout(() => {
      window.location.reload()
    }, IDLE_RELOAD_MS)
    return () => window.clearTimeout(id)
  }, [])

  return (
    <div className="screen end-screen">
      <AppFrame watch={`${round.correct}/${round.length}`}>
        <header className="app-bar">
          <Logo />
          <span className="app-bar-gap" />
        </header>
        <div className="end-body">
          <h1>
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
          <p className="closing prose">
            <RankedLine line={result.description} />
          </p>
        </div>
        <footer className="dock end-dock">
          <button type="button" className="primary-button" onClick={onRestart}>
            {copy.again}
          </button>
          <Disclaimer />
        </footer>
        <p className="sr-only">{meta.gameName}</p>
      </AppFrame>
    </div>
  )
}
