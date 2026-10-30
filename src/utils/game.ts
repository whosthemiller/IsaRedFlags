import type { GameConfig } from "../config/gameConfig"
import type {
  Choice,
  Difficulty,
  Direction,
  FeedbackBanks,
  FeedbackCursors,
  FeedbackLine,
  Flag,
  Gender,
  Outcome,
  Profile,
  ProfilePools,
  RoundState,
} from "../types/content"
import { publicUrl } from "./publicUrl"
import { shuffle } from "./shuffle"

const NEAREST: Record<Difficulty, Difficulty[]> = {
  easy: ["easy", "medium", "hard"],
  medium: ["medium", "easy", "hard"],
  hard: ["hard", "medium", "easy"],
}

/** Every finished round keeps at least this many flags of each color, when the deck can supply them. */
const MIN_FLAGS_PER_COLOR = 2

interface FlagCounts {
  red: number
  green: number
}

interface FlagBalance {
  shown: FlagCounts
  slotsLeft: number
}

export function emptyPools(): ProfilePools {
  return { easy: [], medium: [], hard: [] }
}

/** The next card's level is the number of correct answers so far, capped at hard. */
export function difficultyForScore(correct: number): Difficulty {
  if (correct >= 2) return "hard"
  if (correct >= 1) return "medium"
  return "easy"
}

export function resolveRoundLength(requested: number, available: number): number {
  const limit = Math.floor(requested)
  if (!Number.isFinite(limit) || limit < 1 || available < 1) return Math.max(0, available)
  return Math.min(limit, available)
}

export function poolsFromProfiles(
  profiles: readonly Profile[],
  shuffleProfiles: boolean,
  random: () => number = Math.random,
): ProfilePools {
  const ordered = shuffleProfiles ? shuffle(profiles, random) : profiles.slice()
  const pools = emptyPools()
  for (const profile of ordered) pools[profile.difficulty].push(profile)
  return pools
}

function flagCounts(profiles: readonly Profile[]): FlagCounts {
  const counts: FlagCounts = { red: 0, green: 0 }
  for (const profile of profiles) counts[profile.flag] += 1
  return counts
}

function copyPools(pools: ProfilePools): ProfilePools {
  return {
    easy: pools.easy.slice(),
    medium: pools.medium.slice(),
    hard: pools.hard.slice(),
  }
}

function poolCounts(pools: ProfilePools): FlagCounts {
  return flagCounts([...pools.easy, ...pools.medium, ...pools.hard])
}

/**
 * True when the remaining slots can still be filled so the round has at least
 * two red flags and two green flags.
 */
function canFinishWithBothColors(shown: FlagCounts, slotsLeft: number, available: FlagCounts): boolean {
  const drawable = Math.min(Math.max(0, slotsLeft), available.red + available.green)
  const minRed = Math.max(0, drawable - available.green)
  const maxRed = Math.min(drawable, available.red)
  for (let takeRed = minRed; takeRed <= maxRed; takeRed += 1) {
    const red = shown.red + takeRed
    const green = shown.green + (drawable - takeRed)
    if (red >= MIN_FLAGS_PER_COLOR && green >= MIN_FLAGS_PER_COLOR) return true
  }
  return false
}

function removeAt(pools: ProfilePools, level: Difficulty, index: number): ProfilePools {
  const next = copyPools(pools)
  next[level] = next[level].filter((_, itemIndex) => itemIndex !== index)
  return next
}

/** Draws the target difficulty, or the nearest level that still has a card. */
export function drawProfile(
  pools: ProfilePools,
  target: Difficulty,
  balance?: FlagBalance,
): { profile: Profile | null; pools: ProfilePools } {
  const available = poolCounts(pools)
  if (balance && canFinishWithBothColors(balance.shown, balance.slotsLeft, available)) {
    for (const level of NEAREST[target]) {
      for (let index = 0; index < pools[level].length; index += 1) {
        const profile = pools[level][index]
        const shown = {
          red: balance.shown.red + (profile.flag === "red" ? 1 : 0),
          green: balance.shown.green + (profile.flag === "green" ? 1 : 0),
        }
        const rest = {
          red: available.red - (profile.flag === "red" ? 1 : 0),
          green: available.green - (profile.flag === "green" ? 1 : 0),
        }
        if (!canFinishWithBothColors(shown, balance.slotsLeft - 1, rest)) continue
        return { profile, pools: removeAt(pools, level, index) }
      }
    }
  }

  const next = copyPools(pools)
  for (const level of NEAREST[target]) {
    const profile = next[level][0]
    if (!profile) continue
    next[level] = next[level].slice(1)
    return { profile, pools: next }
  }
  return { profile: null, pools: next }
}

export function emptyCursors(): FeedbackCursors {
  return { correctRed: 0, incorrectRed: 0, correctGreen: 0, incorrectGreen: 0 }
}

export function choiceFromDirection(direction: Direction): Choice {
  return direction === "left" ? "red" : "green"
}

export function isCorrectChoice(flag: Flag, choice: Choice): boolean {
  return flag === choice
}

export function feedbackKey(flag: Flag, correct: boolean): keyof FeedbackCursors {
  if (flag === "red") return correct ? "correctRed" : "incorrectRed"
  return correct ? "correctGreen" : "incorrectGreen"
}

export function outcomeOf(flag: Flag, correct: boolean): Outcome {
  return `${correct ? "correct" : "incorrect"}-${flag}`
}

export function resolveFeedbackLine(line: FeedbackLine, gender: Gender): string {
  return typeof line === "string" ? line : line[gender]
}

/**
 * A profile-specific customFeedback is the punch for identifying that card correctly.
 * A miss always comes from the outcome bank, so a hit and a miss never share a sentence,
 * whether the card is a red flag or a green flag.
 */
export function pickFeedbackLine(
  profile: Profile,
  correct: boolean,
  banks: FeedbackBanks,
  cursors: FeedbackCursors,
): { line: string; cursors: FeedbackCursors } {
  if (correct && profile.customFeedback) {
    return { line: profile.customFeedback, cursors }
  }
  const key = feedbackKey(profile.flag, correct)
  const bank = banks[key]
  const cursor = cursors[key]
  const raw = bank[cursor % bank.length]
  return {
    line: raw ? resolveFeedbackLine(raw, profile.gender) : "",
    cursors: { ...cursors, [key]: cursor + 1 },
  }
}

export function createRound(
  profiles: readonly Profile[],
  config: GameConfig,
  banks: FeedbackBanks,
  random: () => number = Math.random,
): RoundState {
  const length = resolveRoundLength(config.roundLength, profiles.length)
  const pools = length > 0 ? poolsFromProfiles(profiles, config.shuffleProfiles, random) : emptyPools()
  const opening =
    length > 0
      ? drawProfile(pools, "easy", { shown: { red: 0, green: 0 }, slotsLeft: length })
      : null
  const endIndex = banks.end.length === 0 ? 0 : Math.floor(random() * banks.end.length)
  return {
    profiles: opening?.profile ? [opening.profile] : [],
    pools: opening?.pools ?? emptyPools(),
    length: opening?.profile ? length : 0,
    index: 0,
    correct: 0,
    answered: 0,
    phase: opening?.profile ? "card" : "end",
    lastChoice: null,
    lastCorrect: null,
    feedbackLine: null,
    cursors: emptyCursors(),
    endMessage: banks.end[endIndex] ?? "",
  }
}

export function applyAnswer(
  state: RoundState,
  direction: Direction,
  banks: FeedbackBanks,
): RoundState {
  if (state.phase !== "card") return state
  const profile = state.profiles[state.index]
  if (!profile) return state
  const choice = choiceFromDirection(direction)
  const correct = isCorrectChoice(profile.flag, choice)
  const picked = pickFeedbackLine(profile, correct, banks, state.cursors)
  const correctCount = state.correct + (correct ? 1 : 0)
  const answered = state.answered + 1
  let profiles = state.profiles
  let pools = state.pools
  let length = state.length
  if (answered < state.length) {
    const drawn = drawProfile(pools, difficultyForScore(correctCount), {
      shown: flagCounts(profiles),
      slotsLeft: length - profiles.length,
    })
    pools = drawn.pools
    if (drawn.profile) profiles = [...profiles, drawn.profile]
    else length = profiles.length
  }
  return {
    ...state,
    profiles,
    pools,
    length,
    phase: "feedback",
    correct: correctCount,
    answered,
    lastChoice: choice,
    lastCorrect: correct,
    feedbackLine: picked.line,
    cursors: picked.cursors,
  }
}

export function advance(state: RoundState): RoundState {
  if (state.phase !== "feedback") return state
  const nextIndex = state.index + 1
  if (nextIndex >= state.profiles.length) {
    return {
      ...state,
      phase: "end",
      lastChoice: null,
      lastCorrect: null,
      feedbackLine: null,
    }
  }
  return {
    ...state,
    phase: "card",
    index: nextIndex,
    lastChoice: null,
    lastCorrect: null,
    feedbackLine: null,
  }
}

export function profileImageSrc(image: string | null): string | null {
  if (!image) return null
  if (/^(https?:|data:|blob:)/.test(image)) return image
  if (image.startsWith("/")) return publicUrl(image)
  return publicUrl(`profiles/${image}`)
}
