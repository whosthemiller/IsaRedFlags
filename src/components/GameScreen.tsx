import { useEffect } from "react"
import { uiCopy } from "../content/uiCopy"
import type { Direction, RoundState } from "../types/content"
import { outcomeOf } from "../utils/game"
import { Disclaimer } from "./Disclaimer"
import { FeedbackPanel } from "./FeedbackPanel"
import { FullScreenButton } from "./FullScreenButton"
import { IconHeart, IconNope } from "./icons"
import { Logo } from "./Logo"
import { Portrait } from "./Portrait"
import { ProfileCard } from "./ProfileCard"

type GameScreenProps = {
  round: RoundState
  onDecide: (direction: Direction) => void
  onNext: () => void
}

export function GameScreen({ round, onDecide, onNext }: GameScreenProps) {
  const profile = round.profiles[round.index]
  const next = round.profiles[round.index + 1]
  const total = round.length
  const hasMore = round.index + 1 < total
  const showingFeedback = round.phase === "feedback" && round.lastCorrect !== null && round.feedbackLine

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (round.phase !== "card") return
      if (event.altKey || event.metaKey || event.ctrlKey) return
      const target = event.target
      if (target instanceof HTMLElement && target.closest("button")) return
      if (event.key === "ArrowLeft") {
        event.preventDefault()
        onDecide("left")
      } else if (event.key === "ArrowRight") {
        event.preventDefault()
        onDecide("right")
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [onDecide, round.phase])

  if (!profile) return null

  return (
    <div className="screen game-screen">
      <div className="app-frame">
        <header className="app-bar">
          <Logo />
          <p
            className="app-count"
            role="progressbar"
            aria-label={uiCopy.progress}
            aria-valuemin={1}
            aria-valuemax={total}
            aria-valuenow={round.index + 1}
          >
            <bdi>
              {round.index + 1}
              <span className="app-count-of">/{total}</span>
            </bdi>
          </p>
          <div className="tools">
            {round.answered > 0 ? (
              <p className="score" aria-label={`${uiCopy.scoreLabel} ${round.correct} ${uiCopy.of} ${round.answered}`}>
                <bdi className="score-fraction" dir="ltr">
                  {round.correct}/{round.answered}
                </bdi>
                <span className="score-label">{uiCopy.scoreLabel}</span>
              </p>
            ) : (
              <span className="score-spacer" />
            )}
            <FullScreenButton />
          </div>
        </header>

        <div className={`stage ${showingFeedback ? "is-feedback" : ""}`}>
          {showingFeedback ? (
            <FeedbackPanel
              profile={profile}
              outcome={outcomeOf(profile.flag, round.lastCorrect === true)}
              line={round.feedbackLine ?? ""}
            />
          ) : (
            <div className={`deck ${hasMore ? "has-back" : ""}`}>
              {hasMore ? (
                <div className="card card-back" aria-hidden="true">
                  {next ? <Portrait profile={next} /> : null}
                </div>
              ) : null}
              <ProfileCard profile={profile} enabled={round.phase === "card"} onCommit={onDecide} />
            </div>
          )}
        </div>

        <footer className="dock">
          {round.phase === "card" ? (
            <>
              <p className="hint">{uiCopy.swipeHint}</p>
              <p className="sr-only">{uiCopy.keyboardHint}</p>
              <div className="actions" dir="ltr">
                <button
                  type="button"
                  className="action"
                  aria-label={uiCopy.pass}
                  aria-keyshortcuts="ArrowLeft"
                  onClick={() => onDecide("left")}
                >
                  <span className="orb orb-nope">
                    <IconNope />
                  </span>
                </button>
                <button
                  type="button"
                  className="action"
                  aria-label={uiCopy.like}
                  aria-keyshortcuts="ArrowRight"
                  onClick={() => onDecide("right")}
                >
                  <span className="orb orb-like">
                    <IconHeart />
                  </span>
                </button>
              </div>
            </>
          ) : (
            <button type="button" className="next-button" onClick={onNext}>
              {uiCopy.next}
            </button>
          )}
          <Disclaimer />
        </footer>
      </div>
    </div>
  )
}
