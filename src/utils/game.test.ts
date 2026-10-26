import { describe, expect, it } from "vitest"
import type { FeedbackBanks, Profile } from "../types/content"
import { devOverridesFromSearch } from "../config/devOverrides"
import { faceCropFor } from "../content/faceCrops"
import { loadGameContent } from "../content/loadContent"
import {
  advance,
  applyAnswer,
  choiceFromDirection,
  createRound,
  difficultyForScore,
  outcomeOf,
} from "./game"
import { shuffle } from "./shuffle"
import { countFlags } from "./validate"

const banks: FeedbackBanks = {
  correctRed: ["אדום נכון"],
  incorrectRed: ["פספוס א", "פספוס ב", "פספוס ג", "פספוס ד"],
  correctGreen: ["ירוק נכון א", "ירוק נכון ב"],
  incorrectGreen: ["פספוס ירוק"],
  end: ["סיום ראשון", "סיום שני"],
}

function profile(partial: Partial<Profile> & Pick<Profile, "id" | "flag">): Profile {
  return {
    name: "בדיקה",
    age: 30,
    gender: "m",
    difficulty: "medium",
    tagline: "שורה",
    bio: "ביו",
    openingMessage: "הודעה",
    explanation: "הסבר שלא אמור להופיע כפאנץ׳",
    image: null,
    ...partial,
  }
}

const deck: Profile[] = [
  profile({ id: "red-1", flag: "red" }),
  profile({ id: "green-1", flag: "green", customFeedback: "שורה אישית" }),
  profile({ id: "red-2", flag: "red" }),
  profile({ id: "green-2", flag: "green" }),
]

describe("choice mapping", () => {
  it("maps screen left to red and screen right to green", () => {
    expect(choiceFromDirection("left")).toBe("red")
    expect(choiceFromDirection("right")).toBe("green")
  })

  it("scores a red flag only when the player swipes left", () => {
    const state = createRound([deck[0]], { gameName: "בדיקה", shuffleProfiles: false, roundLength: 1 }, banks, () => 0)
    const missed = applyAnswer(state, "right", banks)
    expect(missed.lastCorrect).toBe(false)
    expect(missed.lastChoice).toBe("green")
    expect(missed.correct).toBe(0)
    expect(missed.answered).toBe(1)
    expect(outcomeOf("red", false)).toBe("incorrect-red")

    const caught = applyAnswer(
      createRound([deck[0]], { gameName: "בדיקה", shuffleProfiles: false, roundLength: 1 }, banks, () => 0),
      "left",
      banks,
    )
    expect(caught.lastCorrect).toBe(true)
    expect(caught.lastChoice).toBe("red")
    expect(caught.correct).toBe(1)
    expect(outcomeOf("red", true)).toBe("correct-red")
  })

  it("scores green on a right swipe and red on a left swipe", () => {
    const state = createRound([deck[1], deck[0]], { gameName: "בדיקה", shuffleProfiles: false, roundLength: 2 }, banks, () => 0)
    const green = applyAnswer(state, "right", banks)
    expect(green.lastCorrect).toBe(true)
    expect(green.correct).toBe(1)
    const red = applyAnswer(advance(green), "left", banks)
    expect(red.lastCorrect).toBe(true)
    expect(red.correct).toBe(2)
    expect(red.answered).toBe(2)
  })
})

describe("feedback", () => {
  it("keeps a card's custom line for a correct read and a different bank line for a miss", () => {
    const green = createRound([deck[1]], { gameName: "בדיקה", shuffleProfiles: false, roundLength: 1 }, banks, () => 0)
    const greenHit = applyAnswer(green, "right", banks)
    expect(greenHit.feedbackLine).toBe("שורה אישית")
    expect(greenHit.cursors.correctGreen).toBe(0)
    expect(greenHit.feedbackLine).not.toBe(deck[1].explanation)

    const greenMiss = applyAnswer(green, "left", banks)
    expect(greenMiss.feedbackLine).toBe("פספוס ירוק")
    expect(greenMiss.feedbackLine).not.toBe("שורה אישית")
    expect(greenMiss.cursors.incorrectGreen).toBe(1)

    const redCard = profile({ id: "red-custom", flag: "red", customFeedback: "שורה אישית" })
    const red = createRound([redCard], { gameName: "בדיקה", shuffleProfiles: false, roundLength: 1 }, banks, () => 0)
    const redHit = applyAnswer(red, "left", banks)
    expect(redHit.feedbackLine).toBe("שורה אישית")
    expect(redHit.cursors.correctRed).toBe(0)

    const redMiss = applyAnswer(red, "right", banks)
    expect(redMiss.feedbackLine).toBe("פספוס א")
    expect(redMiss.feedbackLine).not.toBe("שורה אישית")
    expect(redMiss.cursors.incorrectRed).toBe(1)
  })

  it("uses the character's gender when a line has two forms", () => {
    const gendered: FeedbackBanks = {
      ...banks,
      correctRed: [{ m: "הוא ראה", f: "היא ראתה" }],
    }
    const male = applyAnswer(
      createRound([profile({ id: "red-m", flag: "red", gender: "m" })], { gameName: "בדיקה", shuffleProfiles: false, roundLength: 1 }, gendered, () => 0),
      "left",
      gendered,
    )
    const female = applyAnswer(
      createRound([profile({ id: "red-f", flag: "red", gender: "f" })], { gameName: "בדיקה", shuffleProfiles: false, roundLength: 1 }, gendered, () => 0),
      "left",
      gendered,
    )
    expect(male.feedbackLine).toBe("הוא ראה")
    expect(female.feedbackLine).toBe("היא ראתה")
  })

  it("rotates a bank and wraps without repeating inside one pass", () => {
    let state = createRound(
      [deck[0], deck[2], profile({ id: "red-3", flag: "red" }), profile({ id: "red-4", flag: "red" }), profile({ id: "red-5", flag: "red" })],
      { gameName: "בדיקה", shuffleProfiles: false, roundLength: 5 },
      banks,
      () => 0,
    )
    const lines: string[] = []
    for (let step = 0; step < 5; step += 1) {
      state = applyAnswer(state, "right", banks)
      lines.push(state.feedbackLine ?? "")
      state = advance(state)
    }
    expect(lines).toEqual(["פספוס א", "פספוס ב", "פספוס ג", "פספוס ד", "פספוס א"])
  })
})

describe("adaptive difficulty", () => {
  it("maps the running score onto easy, medium, then hard", () => {
    expect(difficultyForScore(0)).toBe("easy")
    expect(difficultyForScore(1)).toBe("medium")
    expect(difficultyForScore(2)).toBe("hard")
    expect(difficultyForScore(4)).toBe("hard")
  })

  it("opens on easy and raises the next card after each success", () => {
    const cards = [
      profile({ id: "e1", flag: "red", difficulty: "easy" }),
      profile({ id: "m1", flag: "green", difficulty: "medium" }),
      profile({ id: "h1", flag: "red", difficulty: "hard" }),
      profile({ id: "h2", flag: "red", difficulty: "hard" }),
      profile({ id: "h3", flag: "red", difficulty: "hard" }),
    ]
    let state = createRound(cards, { gameName: "בדיקה", shuffleProfiles: false, roundLength: 5 }, banks, () => 0)
    expect(state.length).toBe(5)
    expect(state.profiles.map((item) => item.id)).toEqual(["e1"])

    const played: string[] = []
    for (const swipe of ["left", "right", "left", "left", "left"] as const) {
      played.push(state.profiles[state.index].id)
      state = advance(applyAnswer(state, swipe, banks))
    }
    expect(played).toEqual(["e1", "m1", "h1", "h2", "h3"])
    expect(state.phase).toBe("end")
    expect(state.correct).toBe(5)
  })

  it("keeps the level already reached after a miss", () => {
    const cards = [
      profile({ id: "e1", flag: "red", difficulty: "easy" }),
      profile({ id: "e2", flag: "red", difficulty: "easy" }),
      profile({ id: "m1", flag: "red", difficulty: "medium" }),
      profile({ id: "m2", flag: "green", difficulty: "medium" }),
      profile({ id: "h1", flag: "red", difficulty: "hard" }),
    ]
    let state = createRound(cards, { gameName: "בדיקה", shuffleProfiles: false, roundLength: 5 }, banks, () => 0)
    const played: string[] = []
    for (const swipe of ["right", "left", "right", "right", "left"] as const) {
      played.push(state.profiles[state.index].id)
      state = advance(applyAnswer(state, swipe, banks))
    }
    expect(played).toEqual(["e1", "e2", "m1", "m2", "h1"])
    expect(state.correct).toBe(3)
  })

  it("falls back to the nearest difficulty that still has a card", () => {
    const cards = [
      profile({ id: "h1", flag: "red", difficulty: "hard" }),
      profile({ id: "m1", flag: "green", difficulty: "medium" }),
    ]
    let state = createRound(cards, { gameName: "בדיקה", shuffleProfiles: false, roundLength: 2 }, banks, () => 0)
    expect(state.profiles[0].id).toBe("m1")
    state = advance(applyAnswer(state, "right", banks))
    expect(state.profiles[state.index].id).toBe("h1")
  })
})

describe("round flow", () => {
  it("shuffles once inside each difficulty and does not repeat", () => {
    const source = deck.map((item) => item.id)
    let state = createRound(deck, { gameName: "בדיקה", shuffleProfiles: true, roundLength: 4 }, banks, () => 0)
    expect(deck.map((item) => item.id)).toEqual(source)
    const played: string[] = []
    while (state.phase !== "end") {
      const current = state.profiles[state.index].id
      played.push(current)
      const answered = applyAnswer(state, "left", banks)
      expect(answered.profiles[state.index].id).toBe(current)
      state = advance(answered)
    }
    expect(played).toEqual(["green-1", "red-2", "green-2", "red-1"])
    expect(new Set(played).size).toBe(4)
  })

  it("uses the full deck when the requested length is below 1 or above the deck", () => {
    const config = { gameName: "בדיקה", shuffleProfiles: false, roundLength: 0 }
    expect(createRound(deck, config, banks, () => 0).length).toBe(4)
    expect(createRound(deck, { ...config, roundLength: 99 }, banks, () => 0).length).toBe(4)
  })

  it("navigates to the end and ignores extra answers", () => {
    let state = createRound(deck.slice(0, 2), { gameName: "בדיקה", shuffleProfiles: false, roundLength: 2 }, banks, () => 0)
    expect(state.phase).toBe("card")
    expect(state.answered).toBe(0)
    state = applyAnswer(state, "left", banks)
    const doubled = applyAnswer(state, "right", banks)
    expect(doubled.answered).toBe(1)
    expect(doubled).toBe(state)
    expect(advance(state).phase).toBe("card")
    expect(advance(state).index).toBe(1)
    state = advance(state)
    state = applyAnswer(state, "right", banks)
    state = advance(state)
    expect(state.phase).toBe("end")
    expect(state.correct).toBe(2)
    expect(advance(state).phase).toBe("end")
    expect(applyAnswer(state, "left", banks).answered).toBe(2)
  })

  it("picks one approved closing line", () => {
    const state = createRound(deck, { gameName: "בדיקה", shuffleProfiles: false, roundLength: 4 }, banks, () => 0)
    expect(banks.end).toContain(state.endMessage)
    expect(state.endMessage).toBe("סיום ראשון")
  })

  it("resets by creating a new round", () => {
    const finished = advance(
      applyAnswer(
        createRound(deck.slice(0, 1), { gameName: "בדיקה", shuffleProfiles: false, roundLength: 1 }, banks, () => 0),
        "left",
        banks,
      ),
    )
    expect(finished.phase).toBe("end")
    const restarted = createRound(deck, { gameName: "בדיקה", shuffleProfiles: false, roundLength: 4 }, banks, () => 0)
    expect(restarted.answered).toBe(0)
    expect(restarted.correct).toBe(0)
    expect(restarted.index).toBe(0)
    expect(restarted.phase).toBe("card")
  })
})

describe("shuffle", () => {
  it("returns a permutation for a deterministic random source", () => {
    expect(shuffle(["a", "b", "c"], () => 0)).toEqual(["b", "c", "a"])
    expect(shuffle(["a", "b", "c"], () => 0.999)).toEqual(["a", "b", "c"])
  })
})

describe("dev overrides", () => {
  it("ignores query overrides outside development", () => {
    expect(devOverridesFromSearch("?shuffle=0&limit=3&id=profile-02", false)).toEqual({
      config: {},
      focusId: null,
    })
  })

  it("reads fixed order, limit, and focus id in development", () => {
    expect(devOverridesFromSearch("?shuffle=0&limit=10&id=profile-10", true)).toEqual({
      config: { shuffleProfiles: false, roundLength: 10 },
      focusId: "profile-10",
    })
  })
})

describe("supplied content", () => {
  it("loads 22 profiles with 13 red flags and 9 green flags", () => {
    const loaded = loadGameContent()
    expect(loaded.ok).toBe(true)
    if (!loaded.ok) return
    expect(loaded.content.profiles).toHaveLength(22)
    expect(countFlags(loaded.content.profiles)).toEqual({ red: 13, green: 9 })
    const byDifficulty = { easy: 0, medium: 0, hard: 0 }
    for (const item of loaded.content.profiles) byDifficulty[item.difficulty] += 1
    expect(byDifficulty.easy).toBeGreaterThanOrEqual(5)
    expect(byDifficulty.medium).toBeGreaterThanOrEqual(1)
    expect(byDifficulty.hard).toBeGreaterThanOrEqual(3)
    expect(new Set(loaded.content.profiles.map((item) => item.id)).size).toBe(22)
    expect(loaded.content.profiles.every((item) => item.image === `${item.id}.jpg`)).toBe(true)
    expect(loaded.content.profiles.every((item) => item.image && faceCropFor(item.image))).toBe(true)
    expect(loaded.content.taglines).toHaveLength(3)
    expect(loaded.content.feedback.end.length).toBeGreaterThan(0)
  })
})
