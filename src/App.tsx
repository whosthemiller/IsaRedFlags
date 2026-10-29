import { useCallback, useEffect, useLayoutEffect, useMemo, useState } from "react"
import { gameConfig } from "./config/gameConfig"
import { readDevOverrides } from "./config/devOverrides"
import { loadGameContent } from "./content/loadContent"
import { ContentError } from "./components/ContentError"
import { EndScreen } from "./components/EndScreen"
import { GameScreen } from "./components/GameScreen"
import { LoadingScreen } from "./components/LoadingScreen"
import { minimumLogoLoadingMs } from "./components/LogoLoader"
import { StartScreen } from "./components/StartScreen"
import type { Direction, RoundState } from "./types/content"
import { advance, applyAnswer, createRound, profileImageSrc } from "./utils/game"
import { whenFontsReady } from "./utils/preloadFonts"
import { whenImagesReady } from "./utils/preloadImages"
import { publicUrl } from "./utils/publicUrl"

function useImagesReady(sources: readonly string[]): boolean {
  const key = sources.join("\0")
  const [readyKey, setReadyKey] = useState<string | null>(null)

  useLayoutEffect(() => {
    let cancelled = false
    void whenImagesReady(sources).then(() => {
      if (!cancelled) setReadyKey(key)
    })
    return () => {
      cancelled = true
    }
  }, [sources, key])

  return readyKey === key
}

function useFontsReady(): boolean {
  const [ready, setReady] = useState(false)

  useLayoutEffect(() => {
    let cancelled = false
    void whenFontsReady().then(() => {
      if (!cancelled) setReady(true)
    })
    return () => {
      cancelled = true
    }
  }, [])

  return ready
}

/** Boxes that jump when fonts, the logo, or container sizes settle. */
const LAYOUT_PROBES = ".logo, .game-mark, .tagline, .intro-lead, .concept, .legend, .start-dock, .app-frame"

function layoutSnapshot(): string {
  const root = document.querySelector(".start-screen")
  if (!root) return ""
  return Array.from(root.querySelectorAll(LAYOUT_PROBES), (node) => {
    const rect = node.getBoundingClientRect()
    return `${Math.round(rect.x)}:${Math.round(rect.y)}:${Math.round(rect.width)}:${Math.round(rect.height)}`
  }).join("|")
}

/** True once the start screen has kept the same geometry for a few frames. */
function useSettledLayout(enabled: boolean): boolean {
  const [settled, setSettled] = useState(false)

  useEffect(() => {
    if (!enabled || settled) return
    let cancelled = false
    let last = ""
    let stable = 0
    let frames = 0
    let timer = 0

    const finish = () => {
      if (!cancelled) setSettled(true)
    }

    const step = () => {
      if (cancelled) return
      frames += 1
      const next = layoutSnapshot()
      if (next && next === last) stable += 1
      else stable = 0
      last = next
      if ((stable >= 3 && next) || frames > 40) finish()
      else timer = window.setTimeout(step, 32)
    }

    timer = window.setTimeout(step, 32)
    return () => {
      cancelled = true
      window.clearTimeout(timer)
    }
  }, [enabled, settled])

  return settled
}

function useMinimumLoadingTime(ms: number): boolean {
  const reduced =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  const [done, setDone] = useState(reduced || ms <= 0)

  useEffect(() => {
    if (reduced || ms <= 0) return
    const id = window.setTimeout(() => setDone(true), ms)
    return () => window.clearTimeout(id)
  }, [ms, reduced])

  return done
}

export function App() {
  const loaded = useMemo(() => loadGameContent(), [])
  const imageSources = useMemo(() => {
    const logo = publicUrl("brand/logo-color-type.svg")
    if (!loaded.ok) return [logo]
    return [
      logo,
      ...loaded.content.profiles.flatMap((profile) => {
        const src = profileImageSrc(profile.image)
        return src ? [src] : []
      }),
    ]
  }, [loaded])
  const imagesReady = useImagesReady(imageSources)
  const fontsReady = useFontsReady()
  const minimumTimeDone = useMinimumLoadingTime(minimumLogoLoadingMs())
  const assetsReady = loaded.ok && imagesReady && fontsReady && minimumTimeDone
  const settled = useSettledLayout(assetsReady)
  const [round, setRound] = useState<RoundState | null>(null)
  const banks = loaded.ok ? loaded.content.feedback : null

  useEffect(() => {
    document.title = gameConfig.gameName
  }, [])

  const onDecide = useCallback(
    (direction: Direction) => {
      if (!banks) return
      setRound((current) => (current ? applyAnswer(current, direction, banks) : current))
    },
    [banks],
  )

  const onNext = useCallback(() => {
    setRound((current) => (current ? advance(current) : current))
  }, [])

  const onStart = useCallback(() => {
    if (!loaded.ok) return
    const dev = readDevOverrides()
    const config = { ...gameConfig, ...dev.config }
    let profiles = loaded.content.profiles
    if (dev.focusId) {
      const found = profiles.filter((profile) => profile.id === dev.focusId)
      if (found.length > 0) {
        profiles = found
        config.shuffleProfiles = false
        config.roundLength = found.length
      }
    }
    setRound(createRound(profiles, config, loaded.content.feedback))
  }, [loaded])

  if (!loaded.ok) return <ContentError errors={loaded.errors} />

  const booting = !round && !settled
  return (
    <>
      {!round ? <StartScreen onStart={onStart} inert={booting} /> : null}
      {round?.phase === "end" ? <EndScreen round={round} onRestart={() => setRound(null)} /> : null}
      {round && round.phase !== "end" ? (
        <GameScreen round={round} onDecide={onDecide} onNext={onNext} />
      ) : null}
      {booting ? <LoadingScreen /> : null}
    </>
  )
}
