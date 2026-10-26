import { useEffect, useRef } from "react"
import { uiCopy } from "../content/uiCopy"
import type { Outcome, Profile } from "../types/content"

type FeedbackPanelProps = {
  profile: Profile
  outcome: Outcome
  line: string
}

export function FeedbackPanel({ profile, outcome, line }: FeedbackPanelProps) {
  const panelRef = useRef<HTMLElement>(null)
  const correct = outcome.startsWith("correct")
  const kicker = correct ? uiCopy.correct : line

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
    </section>
  )
}
