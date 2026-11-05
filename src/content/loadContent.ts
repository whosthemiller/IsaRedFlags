import heRaw from "../../isa_swipe_game_content.json"
import enRaw from "../../isa_swipe_game_content.en.json"
import type { LoadResult } from "../utils/validate"
import { validateContent } from "../utils/validate"
import type { Locale } from "./locale"

const rawByLocale: Record<Locale, unknown> = {
  he: heRaw,
  en: enRaw,
}

export function loadGameContent(locale: Locale = "he"): LoadResult {
  return validateContent(rawByLocale[locale])
}
