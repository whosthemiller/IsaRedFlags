import { describe, expect, it } from "vitest"
import { validateContent } from "./validate"

function sample(): Record<string, unknown> {
  return {
    schemaVersion: "1.0.0",
    language: "he",
    direction: "rtl",
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
        explanation: "הסבר",
        image: null,
      },
    ],
  }
}

describe("validateContent", () => {
  it("accepts a minimal valid document", () => {
    const result = validateContent(sample())
    expect(result.ok).toBe(true)
  })

  it("rejects a bad flag, a duplicate id, and a missing explanation", () => {
    const content = sample()
    const profiles = content.profiles as Record<string, unknown>[]
    profiles.push({ ...profiles[0], id: "p1", flag: "blue", explanation: "" })
    const result = validateContent(content)
    expect(result.ok).toBe(false)
    if (result.ok) return
    expect(result.errors.some((error) => error.includes("flag"))).toBe(true)
    expect(result.errors.some((error) => error.includes("מזהה כפול"))).toBe(true)
    expect(result.errors.some((error) => error.includes("explanation"))).toBe(true)
  })

  it("rejects the wrong language direction", () => {
    const content = sample()
    content.direction = "ltr"
    const result = validateContent(content)
    expect(result.ok).toBe(false)
  })
})
