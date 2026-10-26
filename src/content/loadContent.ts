import raw from "../../isa_swipe_game_content.json"
import type { LoadResult } from "../utils/validate"
import { validateContent } from "../utils/validate"

export function loadGameContent(): LoadResult {
  return validateContent(raw)
}
