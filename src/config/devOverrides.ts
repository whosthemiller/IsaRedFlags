import type { GameConfig } from "./gameConfig"

export interface DevOverrides {
  config: Partial<GameConfig>
  focusId: string | null
}

export function devOverridesFromSearch(search: string, isDev: boolean): DevOverrides {
  if (!isDev) return { config: {}, focusId: null }
  const params = new URLSearchParams(search)
  const config: Partial<GameConfig> = {}
  if (params.get("shuffle") === "0") config.shuffleProfiles = false
  const limit = params.get("limit")
  if (limit && /^[1-9]\d*$/.test(limit)) config.roundLength = Number(limit)
  const focusId = params.get("id")
  return { config, focusId: focusId && focusId.length > 0 ? focusId : null }
}

export function readDevOverrides(): DevOverrides {
  if (typeof window === "undefined") return { config: {}, focusId: null }
  return devOverridesFromSearch(window.location.search, import.meta.env.DEV)
}
