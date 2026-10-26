import { useEffect, useId, useState } from "react"
import { uiCopy } from "../content/uiCopy"
import type { Profile } from "../types/content"
import { profileImageSrc } from "../utils/game"
import { publicUrl } from "../utils/publicUrl"
import { validateContent } from "../utils/validate"
import { type ProfileTextEdit } from "./applyProfileTextEdit"
import "./review.css"

type LoadState =
  | { status: "loading" }
  | { status: "error"; errors: string[] }
  | { status: "ready"; profiles: Profile[] }

type SaveResult = { ok: true } | { ok: false; errors: string[] }

function toEdit(profile: Profile): ProfileTextEdit {
  return {
    id: profile.id,
    name: profile.name,
    tagline: profile.tagline,
    bio: profile.bio,
    openingMessage: profile.openingMessage,
    explanation: profile.explanation,
    customFeedback: profile.customFeedback ?? "",
  }
}

function sameEdit(a: ProfileTextEdit, b: ProfileTextEdit): boolean {
  return (
    a.name === b.name &&
    a.tagline === b.tagline &&
    a.bio === b.bio &&
    a.openingMessage === b.openingMessage &&
    a.explanation === b.explanation &&
    a.customFeedback === b.customFeedback
  )
}

function isSaveResult(value: unknown): value is SaveResult {
  if (typeof value !== "object" || value === null) return false
  const record = value as { ok?: unknown; errors?: unknown }
  if (record.ok === true) return true
  return record.ok === false && Array.isArray(record.errors) && record.errors.every((item) => typeof item === "string")
}

export function ReviewScreen() {
  const [load, setLoad] = useState<LoadState>({ status: "loading" })
  const canSave = import.meta.env.DEV

  useEffect(() => {
    document.title = "בדיקת פרופילים"
  }, [])

  useEffect(() => {
    const url = canSave ? publicUrl("api/content") : publicUrl("review-content.json")
    let cancelled = false
    fetch(url)
      .then((response) => {
        if (!response.ok) throw new Error("load")
        return response.json() as Promise<unknown>
      })
      .then((body) => {
        if (cancelled) return
        const result = validateContent(body)
        if (!result.ok) setLoad({ status: "error", errors: result.errors })
        else setLoad({ status: "ready", profiles: result.content.profiles })
      })
      .catch(() => {
        if (!cancelled) setLoad({ status: "error", errors: ["לא הצלחנו לטעון את הפרופילים."] })
      })
    return () => {
      cancelled = true
    }
  }, [canSave])

  return (
    <div className="review-page" dir="rtl" lang="he">
      <header className="review-top">
        <div>
          <h1>בדיקת פרופילים</h1>
          <p>כאן בודקים ניסוח, כתיב ורווחים לפני שהם מופיעים במשחק.</p>
        </div>
        <a className="review-back" href={import.meta.env.BASE_URL}>
          למשחק
        </a>
      </header>
      {canSave ? null : (
        <p className="review-note">השמירה זמינה רק כשמריצים npm run dev. כאן אפשר לקרוא את הטקסטים.</p>
      )}
      {load.status === "loading" ? <p className="review-status">טוען פרופילים…</p> : null}
      {load.status === "error" ? (
        <ul className="review-errors">
          {load.errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      ) : null}
      {load.status === "ready" ? (
        <div className="review-list">
          {load.profiles.map((profile, index) => (
            <ProfileEditor key={profile.id} profile={profile} index={index} canSave={canSave} />
          ))}
        </div>
      ) : null}
    </div>
  )
}

function ProfileEditor({ profile, index, canSave }: { profile: Profile; index: number; canSave: boolean }) {
  const [draft, setDraft] = useState(() => toEdit(profile))
  const [saved, setSaved] = useState(() => toEdit(profile))
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [errors, setErrors] = useState<string[]>([])
  const dirty = !sameEdit(draft, saved)
  const flagLabel = profile.flag === "red" ? uiCopy.redFlag : uiCopy.greenFlag

  function update(field: keyof Omit<ProfileTextEdit, "id">, value: string) {
    setDraft((current) => ({ ...current, [field]: value }))
    setMessage(null)
    setErrors([])
  }

  async function onSave() {
    if (!canSave || saving || !dirty) return
    setSaving(true)
    setMessage(null)
    setErrors([])
    try {
      const response = await fetch(publicUrl("api/content/profile"), {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draft),
      })
      const body: unknown = await response.json()
      if (!isSaveResult(body) || !body.ok) {
        setErrors(isSaveResult(body) && !body.ok ? body.errors : ["לא הצלחנו לשמור את הטקסט"])
        return
      }
      setSaved(draft)
      setMessage("נשמר. רענון המשחק יציג את הטקסט החדש.")
    } catch {
      setErrors(["לא הצלחנו לשמור את הטקסט"])
    } finally {
      setSaving(false)
    }
  }

  return (
    <article className="review-card" id={profile.id} aria-labelledby={`${profile.id}-title`}>
      <header className="review-card-head">
        <ReviewPhoto name={draft.name} image={profile.image} />
        <div>
          <p className="review-index">פרופיל {index + 1}</p>
          <h2 id={`${profile.id}-title`}>
            {draft.name.trim() || profile.name} <span className="review-age">{profile.age}</span>
          </h2>
          <p className={`review-flag review-flag-${profile.flag}`}>{flagLabel}</p>
        </div>
      </header>
      <TextField label="שם" value={draft.name} rows={1} onChange={(value) => update("name", value)} />
      <TextField label="שורת פרופיל" value={draft.tagline} rows={2} onChange={(value) => update("tagline", value)} />
      <TextField label={uiCopy.about} value={draft.bio} rows={4} onChange={(value) => update("bio", value)} />
      <TextField
        label="הודעת פתיחה"
        value={draft.openingMessage}
        rows={3}
        onChange={(value) => update("openingMessage", value)}
      />
      <TextField
        label={uiCopy.explanation}
        hint="מופיע אחרי ההחלקה, מתחת לפאנץ׳. אי אפשר לרוקן את השדה."
        value={draft.explanation}
        rows={4}
        onChange={(value) => update("explanation", value)}
      />
      <TextField
        label="פידבק מותאם"
        hint="מוצג בזיהוי נכון במקום שורת הבנק. שדה ריק מוחק אותו."
        value={draft.customFeedback}
        rows={2}
        onChange={(value) => update("customFeedback", value)}
      />
      <div className="review-actions">
        <button type="button" className="review-save" disabled={!canSave || !dirty || saving} onClick={() => void onSave()}>
          {saving ? "שומר…" : "שמירה"}
        </button>
        {dirty && canSave ? <p className="review-status">יש שינויים שלא נשמרו</p> : null}
        {message ? <p className="review-saved">{message}</p> : null}
      </div>
      {errors.length > 0 ? (
        <ul className="review-errors">
          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      ) : null}
    </article>
  )
}

function TextField({
  label,
  hint,
  value,
  rows,
  onChange,
}: {
  label: string
  hint?: string
  value: string
  rows: number
  onChange: (value: string) => void
}) {
  const id = useId()
  const hintId = hint ? `${id}-hint` : undefined
  return (
    <div className="review-field">
      <label htmlFor={id}>{label}</label>
      {hint ? (
        <p className="review-hint" id={hintId}>
          {hint}
        </p>
      ) : null}
      <textarea
        id={id}
        rows={rows}
        value={value}
        lang="he"
        dir="rtl"
        spellCheck
        autoComplete="off"
        aria-describedby={hintId}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  )
}

function ReviewPhoto({ name, image }: { name: string; image: string | null }) {
  const [failed, setFailed] = useState(false)
  const src = profileImageSrc(image)
  if (!src || failed) {
    const initial = Array.from(name)[0] ?? ""
    return (
      <span className="review-photo review-photo-empty" aria-hidden="true">
        {initial}
      </span>
    )
  }
  return <img className="review-photo" src={src} alt="" draggable={false} onError={() => setFailed(true)} />
}
