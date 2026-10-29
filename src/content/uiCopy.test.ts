import { describe, expect, it } from "vitest"
import { endResultForScore } from "./uiCopy"

describe("end result copy", () => {
  it("uses the lower result for scores 0, 1, and 2", () => {
    for (const score of [0, 1, 2]) {
      const result = endResultForScore(score)
      expect(result.title).toEqual({ lead: "לא תמיד זו אהבה ממבט ראשון", rest: "" })
      expect(result.description).toEqual({
        lead: "רושם ראשוני יכול להטעות.",
        rest: "גם בהשקעות, שווה לתת לפרטים מבט נוסף, לשאול שאלות ולהכיר את הסיכונים.",
      })
    }
  })

  it("uses the higher result for scores 3, 4, and 5", () => {
    for (const score of [3, 4, 5]) {
      const result = endResultForScore(score)
      expect(result.title).toEqual({
        lead: "יש לך רדאר.",
        rest: "עכשיו הגיע הזמן להשתמש בו גם מחוץ לאפליקציה",
      })
      expect(result.description).toEqual({
        lead: "זיהית לא מעט סימנים חשובים.",
        rest: "גם במציאות, כדאי להמשיך לבדוק לפני שמתחייבים.",
      })
    }
  })
})
