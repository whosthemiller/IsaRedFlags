import { validateContent } from "../utils/validate"

const TEXT_FIELDS = ["name", "tagline", "bio", "openingMessage", "explanation"] as const

export type ProfileTextField = (typeof TEXT_FIELDS)[number]

export interface ProfileTextEdit {
  id: string
  name: string
  tagline: string
  bio: string
  openingMessage: string
  explanation: string
  customFeedback: string
}

export type ApplyResult =
  | { ok: true; content: unknown }
  | { ok: false; errors: string[] }

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

export function readProfileTextEdit(value: unknown): ProfileTextEdit | null {
  if (!isRecord(value) || typeof value.id !== "string" || value.id.length === 0) return null
  const edit: ProfileTextEdit = {
    id: value.id,
    name: "",
    tagline: "",
    bio: "",
    openingMessage: "",
    explanation: "",
    customFeedback: "",
  }
  for (const key of TEXT_FIELDS) {
    const field = value[key]
    if (typeof field !== "string") return null
    edit[key] = field
  }
  if ("customFeedback" in value && value.customFeedback != null) {
    if (typeof value.customFeedback !== "string") return null
    edit.customFeedback = value.customFeedback
  }
  return edit
}

/** Replace one profile's copy. Other profiles, flags, and document fields stay as they were. */
export function applyProfileTextEdit(raw: unknown, edit: ProfileTextEdit): ApplyResult {
  if (!isRecord(raw) || !Array.isArray(raw.profiles)) {
    return { ok: false, errors: ["קובץ התוכן אינו אובייקט"] }
  }

  const next: unknown = structuredClone(raw)
  if (!isRecord(next) || !Array.isArray(next.profiles)) {
    return { ok: false, errors: ["קובץ התוכן אינו אובייקט"] }
  }

  const profile = next.profiles.find((item) => isRecord(item) && item.id === edit.id)
  if (!isRecord(profile)) return { ok: false, errors: [`לא נמצא פרופיל ${edit.id}`] }

  profile.name = edit.name
  profile.tagline = edit.tagline
  profile.bio = edit.bio
  profile.openingMessage = edit.openingMessage
  profile.explanation = edit.explanation
  if (edit.customFeedback.trim().length === 0) delete profile.customFeedback
  else profile.customFeedback = edit.customFeedback

  const validated = validateContent(next)
  if (!validated.ok) return validated
  return { ok: true, content: next }
}
