import { useCallback, useEffect, useLayoutEffect, useMemo, useState } from "react"
import { gameConfig } from "./config/gameConfig"
import { readDevOverrides } from "./config/devOverrides"
import { loadGameContent } from "./content/loadContent"
import { ContentError } from "./components/ContentError"
import { EndScreen } from "./components/EndScreen"
import { GameScreen } from "./components/GameScreen"
import { LoadingScreen } from "./components/LoadingScreen"
import { StartScreen } from "./components/StartScreen"
import type { Direction, RoundState } from "./types/content"
import { advance, applyAnswer, createRound, profileImageSrc } from "./utils/game"
import { whenImagesReady } from "./utils/preloadImages"

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

export function App() {
  const loaded = useMemo(() => loadGameContent(), [])
  const imageSources = useMemo(() => {
    if (!loaded.ok) return []
    return loaded.content.profiles.flatMap((profile) => {
      const src = profileImageSrc(profile.image)
      return src ? [src] : []
    })
  }, [loaded])
  const imagesReady = useImagesReady(imageSources)
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
  if (!imagesReady) return <LoadingScreen />
  if (!round) return <StartScreen onStart={onStart} />
  if (round.phase === "end") return <EndScreen round={round} onRestart={() => setRound(null)} />
  return <GameScreen round={round} onDecide={onDecide} onNext={onNext} />
}
