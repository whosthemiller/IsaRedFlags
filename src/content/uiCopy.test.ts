import { describe, expect, it } from "vitest"
import { endResultForScore } from "./uiCopy"

describe("end result copy", () => {
  it("uses the lower result for scores 0, 1, and 2", () => {
    for (const score of [0, 1, 2]) {
      const result = endResultForScore(score)
      expect(result.title).toBe("לא תמיד זו אהבה ממבט ראשון")
      expect(result.description).toBe(
        "רושם ראשוני יכול להטעות. גם בהשקעות, שווה לתת לפרטים מבט נוסף, לשאול שאלות ולהכיר את הסיכונים.",
      )
    }
  })

  it("uses the higher result for scores 3, 4, and 5", () => {
    for (const score of [3, 4, 5]) {
      const result = endResultForScore(score)
      expect(result.title).toBe("יש לך רדאר. עכשיו להשתמש בו גם מחוץ לאפליקציה")
      expect(result.description).toBe(
        "זיהית לא מעט סימנים חשובים. גם במציאות, כדאי להמשיך לבדוק לפני שמתחייבים.",
      )
    }
  })
})
