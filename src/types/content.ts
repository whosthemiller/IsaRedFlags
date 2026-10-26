export type Flag = "red" | "green"
export type Difficulty = "easy" | "medium" | "hard"
export type Direction = "left" | "right"
export type Choice = Flag
export type Gender = "m" | "f"

export interface Profile {
  id: string
  name: string
  age: number
  gender: Gender
  flag: Flag
  difficulty: Difficulty
  tagline: string
  bio: string
  openingMessage: string
  explanation: string
  image: string | null
  customFeedback?: string
}

/** A plain line is the same for every character. A pair follows the character's gender. */
export type FeedbackLine = string | { m: string; f: string }

export interface FeedbackBanks {
  correctRed: FeedbackLine[]
  incorrectRed: FeedbackLine[]
  correctGreen: FeedbackLine[]
  incorrectGreen: FeedbackLine[]
  end: string[]
}

export interface GameContent {
  schemaVersion: string
  language: "he"
  direction: "rtl"
  gameConcept: string[]
  nameCandidates: string[]
  taglines: string[]
  feedback: FeedbackBanks
  profiles: Profile[]
}

export type Outcome =
  | "correct-red"
  | "incorrect-red"
  | "correct-green"
  | "incorrect-green"

export interface FeedbackCursors {
  correctRed: number
  incorrectRed: number
  correctGreen: number
  incorrectGreen: number
}

export type RoundPhase = "card" | "feedback" | "end"

export interface ProfilePools {
  easy: Profile[]
  medium: Profile[]
  hard: Profile[]
}

export interface RoundState {
  profiles: Profile[]
  pools: ProfilePools
  length: number
  index: number
  correct: number
  answered: number
  phase: RoundPhase
  lastChoice: Choice | null
  lastCorrect: boolean | null
  feedbackLine: string | null
  cursors: FeedbackCursors
  endMessage: string
}
