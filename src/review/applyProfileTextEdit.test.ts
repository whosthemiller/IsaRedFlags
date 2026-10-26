import { describe, expect, it } from "vitest"
import { applyProfileTextEdit, readProfileTextEdit } from "./applyProfileTextEdit"
import { isReviewPath } from "./isReviewPath"

function sample(): Record<string, unknown> {
  return {
    schemaVersion: "1.0.0",
    language: "he",
    direction: "rtl",
    editorialNote: "הערה שנשארת",
    gameConcept: ["רעיון"],
    nameCandidates: ["שם"],
    taglines: ["שורה"],
    feedback: {
      correctRed: ["א"],
      incorrectRed: ["ב"],
      correctGreen: ["ג"],
      incorrectGreen: ["ד"],
      end: ["סיום"],
    },
    profiles: [
      {
        id: "p1",
        name: "נועה",
        gender: "f",
        age: 28,
        flag: "green",
        difficulty: "easy",
        tagline: "שורה",
        bio: "ביו",
        openingMessage: "היי",
        explanation: "הסבר מקצועי",
        image: null,
        customFeedback: "פאנץ׳",
      },
      {
        id: "p2",
        name: "נדב",
        gender: "m",
        age: 33,
        flag: "red",
        difficulty: "hard",
        tagline: "יזם",
        bio: "ביו שני",
        openingMessage: "מה קורה",
        explanation: "הסבר שני",
        image: "profile-01.jpg",
      },
    ],
  }
}

function editFor(content: Record<string, unknown>, id: string) {
  const profiles = content.profiles as Record<string, unknown>[]
  const profile = profiles.find((item) => item.id === id)
  if (!profile) throw new Error(id)
  return {
    id,
    name: String(profile.name),
    tagline: String(profile.tagline),
    bio: String(profile.bio),
    openingMessage: String(profile.openingMessage),
    explanation: String(profile.explanation),
    customFeedback: typeof profile.customFeedback === "string" ? profile.customFeedback : "",
  }
}

describe("applyProfileTextEdit", () => {
  it("updates one profile's copy and keeps the rest of the document", () => {
    const content = sample()
    const edit = editFor(content, "p1")
    edit.explanation = "הסבר מתוקן"
    edit.name = "נועה לוי"
    const result = applyProfileTextEdit(content, edit)
    expect(result.ok).toBe(true)
    if (!result.ok) return
    const next = result.content as Record<string, unknown>
    const profiles = next.profiles as Record<string, unknown>[]
    expect(profiles[0]).toMatchObject({
      name: "נועה לוי",
      explanation: "הסבר מתוקן",
      flag: "green",
      age: 28,
      customFeedback: "פאנץ׳",
    })
    expect(profiles[1]).toMatchObject({ name: "נדב", explanation: "הסבר שני", flag: "red" })
    expect(next.editorialNote).toBe("הערה שנשארת")
    expect(next.feedback).toEqual((content.feedback as object))
    expect((content.profiles as Record<string, unknown>[])[0]?.name).toBe("נועה")
  })

  it("removes custom feedback when the field is blank", () => {
    const content = sample()
    const edit = editFor(content, "p1")
    edit.customFeedback = "   "
    const result = applyProfileTextEdit(content, edit)
    expect(result.ok).toBe(true)
    if (!result.ok) return
    const profile = (result.content as { profiles: Record<string, unknown>[] }).profiles[0]
    expect(profile).not.toHaveProperty("customFeedback")
  })

  it("adds custom feedback when the profile did not have one", () => {
    const content = sample()
    const edit = editFor(content, "p2")
    edit.customFeedback = "שורה חדשה"
    const result = applyProfileTextEdit(content, edit)
    expect(result.ok).toBe(true)
    if (!result.ok) return
    const profile = (result.content as { profiles: Record<string, unknown>[] }).profiles[1]
    expect(profile?.customFeedback).toBe("שורה חדשה")
    expect(profile?.flag).toBe("red")
  })

  it("rejects an empty explanation and an unknown profile", () => {
    const content = sample()
    const empty = editFor(content, "p1")
    empty.explanation = ""
    const rejected = applyProfileTextEdit(content, empty)
    expect(rejected.ok).toBe(false)
    if (rejected.ok) return
    expect(rejected.errors.some((error) => error.includes("explanation"))).toBe(true)
    expect((content.profiles as Record<string, unknown>[])[0]?.explanation).toBe("הסבר מקצועי")

    const missing = applyProfileTextEdit(content, { ...empty, id: "missing", explanation: "יש" })
    expect(missing.ok).toBe(false)
    if (missing.ok) return
    expect(missing.errors).toEqual(["לא נמצא פרופיל missing"])
  })
})

describe("isReviewPath", () => {
  it("matches /review with or without a deploy base", () => {
    expect(isReviewPath("/review", "/")).toBe(true)
    expect(isReviewPath("/review/", "/")).toBe(true)
    expect(isReviewPath("/IsaRedFlags/review", "/IsaRedFlags/")).toBe(true)
    expect(isReviewPath("/", "/")).toBe(false)
    expect(isReviewPath("/preview", "/")).toBe(false)
  })
})

describe("readProfileTextEdit", () => {
  it("reads text fields and treats a missing custom feedback as empty", () => {
    const edit = readProfileTextEdit({
      id: "p2",
      name: "נדב",
      tagline: "יזם",
      bio: "ביו",
      openingMessage: "היי",
      explanation: "הסבר",
    })
    expect(edit?.customFeedback).toBe("")
    expect(readProfileTextEdit({ id: "p2", name: 3 })).toBeNull()
  })
})
