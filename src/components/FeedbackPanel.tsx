import { useEffect, useRef } from "react"
import { uiCopy } from "../content/uiCopy"
import type { Outcome, Profile } from "../types/content"
import { IconFlag } from "./icons"

type FeedbackPanelProps = {
  profile: Profile
  outcome: Outcome
  line: string
}

export function FeedbackPanel({ profile, outcome, line }: FeedbackPanelProps) {
  const panelRef = useRef<HTMLElement>(null)
  const correct = outcome.startsWith("correct")
  const kicker = correct ? uiCopy.correct : line
  const flagLabel = profile.flag === "red" ? uiCopy.redFlag : uiCopy.greenFlag

  useEffect(() => {
    panelRef.current?.focus()
  }, [profile.id])

  return (
    <section
      ref={panelRef}
      className={`feedback feedback-${outcome}`}
      tabIndex={-1}
      aria-label={kicker}
    >
      <p className="feedback-kicker">{kicker}</p>
      {correct ? <p className="punch prose">{line}</p> : null}
      <div className="explanation-block">
        <p className={`explanation-label explanation-label-${profile.flag}`}>
          <IconFlag className="explanation-flag" />
          <span>{flagLabel}</span>
        </p>
        <p className="explanation prose">{profile.explanation}</p>
      </div>
    </section>
  )
}
