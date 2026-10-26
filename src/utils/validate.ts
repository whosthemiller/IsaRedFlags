import type { FeedbackBanks, FeedbackLine, GameContent, Profile } from "../types/content"

export type LoadResult =
  | { ok: true; content: GameContent }
  | { ok: false; errors: string[] }

const FEEDBACK_KEYS = [
  "correctRed",
  "incorrectRed",
  "correctGreen",
  "incorrectGreen",
  "end",
] as const

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

function requireText(
  record: Record<string, unknown>,
  key: string,
  where: string,
  errors: string[],
): string | null {
  const value = record[key]
  if (typeof value !== "string" || value.length === 0) {
    errors.push(`${where}: השדה ${key} חסר או אינו טקסט`)
    return null
  }
  return value
}

function requireTextList(
  value: unknown,
  key: string,
  errors: string[],
): string[] | null {
  if (!Array.isArray(value) || value.length === 0) {
    errors.push(`השדה ${key} חייב להיות רשימת טקסטים שאינה ריקה`)
    return null
  }
  const texts: string[] = []
  value.forEach((item, index) => {
    if (typeof item !== "string" || item.length === 0) {
      errors.push(`${key}[${index}] חייב להיות טקסט`)
      return
    }
    texts.push(item)
  })
  return texts.length === value.length ? texts : null
}

function readFeedbackLine(item: unknown, key: string, index: number, errors: string[]): FeedbackLine | null {
  if (typeof item === "string" && item.length > 0) return item
  if (isRecord(item) && typeof item.m === "string" && item.m.length > 0 && typeof item.f === "string" && item.f.length > 0) {
    return { m: item.m, f: item.f }
  }
  errors.push(`${key}[${index}] חייב להיות טקסט, או נוסח לזכר ולנקבה`)
  return null
}

function requireFeedbackLines(value: unknown, key: string, errors: string[]): FeedbackLine[] | null {
  if (!Array.isArray(value) || value.length === 0) {
    errors.push(`השדה ${key} חייב להיות רשימת טקסטים שאינה ריקה`)
    return null
  }
  const lines: FeedbackLine[] = []
  value.forEach((item, index) => {
    const line = readFeedbackLine(item, key, index, errors)
    if (line) lines.push(line)
  })
  return lines.length === value.length ? lines : null
}

function readProfile(value: unknown, index: number, errors: string[]): Profile | null {
  const where = `פרופיל ${index + 1}`
  if (!isRecord(value)) {
    errors.push(`${where}: המבנה אינו תקין`)
    return null
  }
  const id = typeof value.id === "string" && value.id.length > 0 ? value.id : ""
  const label = id ? `פרופיל ${id}` : where
  if (!id) errors.push(`${where}: חסר id`)

  const name = requireText(value, "name", label, errors)
  const gender = value.gender
  if (gender !== "m" && gender !== "f") {
    errors.push(`${label}: השדה gender חייב להיות m או f`)
  }
  const tagline = requireText(value, "tagline", label, errors)
  const bio = requireText(value, "bio", label, errors)
  const openingMessage = requireText(value, "openingMessage", label, errors)
  const explanation = requireText(value, "explanation", label, errors)

  const age = value.age
  if (typeof age !== "number" || !Number.isInteger(age) || age <= 0) {
    errors.push(`${label}: השדה age חייב להיות מספר שלם חיובי`)
  }

  const flag = value.flag
  if (flag !== "red" && flag !== "green") {
    errors.push(`${label}: השדה flag חייב להיות red או green`)
  }

  const difficulty = value.difficulty
  if (difficulty !== "easy" && difficulty !== "medium" && difficulty !== "hard") {
    errors.push(`${label}: השדה difficulty חייב להיות easy, medium או hard`)
  }

  if (!("image" in value)) {
    errors.push(`${label}: חסר שדה image`)
  } else if (value.image !== null && (typeof value.image !== "string" || value.image.length === 0)) {
    errors.push(`${label}: השדה image חייב להיות מחרוזת או null`)
  }

  let customFeedback: string | undefined
  if ("customFeedback" in value && value.customFeedback != null) {
    if (typeof value.customFeedback !== "string" || value.customFeedback.length === 0) {
      errors.push(`${label}: customFeedback חייב להיות טקסט`)
    } else {
      customFeedback = value.customFeedback
    }
  }

  if (
    !id ||
    !name ||
    (gender !== "m" && gender !== "f") ||
    !tagline ||
    !bio ||
    !openingMessage ||
    !explanation ||
    typeof age !== "number" ||
    (flag !== "red" && flag !== "green") ||
    (difficulty !== "easy" && difficulty !== "medium" && difficulty !== "hard") ||
    !("image" in value) ||
    (value.image !== null && typeof value.image !== "string")
  ) {
    return null
  }

  const profile: Profile = {
    id,
    name,
    age,
    gender,
    flag,
    difficulty,
    tagline,
    bio,
    openingMessage,
    explanation,
    image: value.image,
  }
  if (customFeedback) profile.customFeedback = customFeedback
  return profile
}

export function validateContent(value: unknown): LoadResult {
  const errors: string[] = []
  if (!isRecord(value)) {
    return { ok: false, errors: ["קובץ התוכן אינו אובייקט"] }
  }

  if (typeof value.schemaVersion !== "string" || value.schemaVersion.length === 0) {
    errors.push("חסר schemaVersion")
  }
  if (value.language !== "he") errors.push("language חייב להיות he")
  if (value.direction !== "rtl") errors.push("direction חייב להיות rtl")

  const gameConcept = requireTextList(value.gameConcept, "gameConcept", errors)
  const nameCandidates = requireTextList(value.nameCandidates, "nameCandidates", errors)
  const taglines = requireTextList(value.taglines, "taglines", errors)

  let feedback: FeedbackBanks | null = null
  if (!isRecord(value.feedback)) {
    errors.push("חסר אובייקט feedback")
  } else {
    const banks = {} as FeedbackBanks
    let banksOk = true
    for (const key of FEEDBACK_KEYS) {
      if (key === "end") {
        const list = requireTextList(value.feedback[key], `feedback.${key}`, errors)
        if (!list) banksOk = false
        else banks.end = list
        continue
      }
      const list = requireFeedbackLines(value.feedback[key], `feedback.${key}`, errors)
      if (!list) banksOk = false
      else banks[key] = list
    }
    if (banksOk) feedback = banks
  }

  const profiles: Profile[] = []
  if (!Array.isArray(value.profiles) || value.profiles.length === 0) {
    errors.push("אין פרופילים בתוכן")
  } else {
    const seen = new Set<string>()
    value.profiles.forEach((item, index) => {
      if (isRecord(item) && typeof item.id === "string" && item.id.length > 0) {
        if (seen.has(item.id)) errors.push(`מזהה כפול: ${item.id}`)
        seen.add(item.id)
      }
      const profile = readProfile(item, index, errors)
      if (profile) profiles.push(profile)
    })
  }

  if (
    errors.length > 0 ||
    !gameConcept ||
    !nameCandidates ||
    !taglines ||
    !feedback ||
    profiles.length !== (Array.isArray(value.profiles) ? value.profiles.length : -1) ||
    typeof value.schemaVersion !== "string"
  ) {
    return { ok: false, errors }
  }

  return {
    ok: true,
    content: {
      schemaVersion: value.schemaVersion,
      language: "he",
      direction: "rtl",
      gameConcept,
      nameCandidates,
      taglines,
      feedback,
      profiles,
    },
  }
}

export function countFlags(profiles: readonly Profile[]): { red: number; green: number } {
  return profiles.reduce(
    (counts, profile) => {
      counts[profile.flag] += 1
      return counts
    },
    { red: 0, green: 0 },
  )
}
