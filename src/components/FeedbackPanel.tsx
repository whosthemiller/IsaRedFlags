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

  useEffect(() => {
    panelRef.current?.focus()
  }, [profile.id])

  return (
    <section
      ref={panelRef}
      className={`feedback feedback-${outcome}`}
      tabIndex={-1}
      aria-label={correct ? uiCopy.correct : uiCopy.incorrect}
    >
      <p className="feedback-kicker">{correct ? uiCopy.correct : uiCopy.incorrect}</p>
      <p className="punch prose">{line}</p>
    </section>
  )
}
