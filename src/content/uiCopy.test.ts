import { describe, expect, it } from "vitest"
import { endResultForScore } from "./uiCopy"

describe("end result copy", () => {
  it("uses the lower Hebrew result for scores 0, 1, and 2", () => {
    for (const score of [0, 1, 2]) {
      const result = endResultForScore(score, "he")
      expect(result.title).toEqual({ lead: "לא תמיד זו אהבה ממבט ראשון", rest: "" })
      expect(result.description).toEqual({
        lead: "רושם ראשוני יכול להטעות.",
        rest: "גם בהשקעות, שווה לתת לפרטים מבט נוסף, לשאול שאלות ולהכיר את הסיכונים.",
      })
    }
  })

  it("uses the higher Hebrew result for scores 3, 4, and 5", () => {
    for (const score of [3, 4, 5]) {
      const result = endResultForScore(score, "he")
      expect(result.title).toEqual({
        lead: "יש לך רדאר",
        rest: "עכשיו הגיע הזמן להשתמש בו גם מחוץ לאפליקציה",
      })
      expect(result.description).toEqual({
        lead: "זיהית לא מעט סימנים חשובים.",
        rest: "גם במציאות, כדאי להמשיך לבדוק לפני שמתחייבים.",
      })
    }
  })

  it("uses the lower English result for scores 0–2", () => {
    const result = endResultForScore(1, "en")
    expect(result.title).toEqual({ lead: "It's Not Always Love at First Sight", rest: "" })
    expect(result.description).toEqual({
      lead: "First impressions can be misleading.",
      rest: "Investing is no different: take a second look, ask questions, and understand the risks.",
    })
  })

  it("uses the higher English result for scores 3+", () => {
    const result = endResultForScore(4, "en")
    expect(result.title).toEqual({
      lead: "You've Got a Radar for Red Flags",
      rest: "Now it's time to use it outside the app, too.",
    })
    expect(result.description).toEqual({
      lead: "You picked up on some important signs.",
      rest: "In real life, keep asking questions before you commit.",
    })
  })
})
