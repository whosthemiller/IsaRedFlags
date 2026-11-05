import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import type { GameContent } from "../types/content"
import type { LoadResult } from "../utils/validate"
import { loadGameContent } from "./loadContent"
import {
  applyDocumentLocale,
  localeMeta,
  readStoredLocale,
  writeStoredLocale,
  type Locale,
  type LocaleMeta,
} from "./locale"
import { uiCopyByLocale, type UiCopy } from "./uiCopy"

type LocaleContextValue = {
  locale: Locale
  meta: LocaleMeta
  copy: UiCopy
  loaded: LoadResult
  content: GameContent | null
  setLocale: (locale: Locale) => void
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    const initial = typeof window !== "undefined" ? readStoredLocale() : "he"
    if (typeof document !== "undefined") applyDocumentLocale(initial)
    return initial
  })

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next)
    writeStoredLocale(next)
    applyDocumentLocale(next)
  }, [])

  useEffect(() => {
    applyDocumentLocale(locale)
  }, [locale])

  const loaded = useMemo(() => loadGameContent(locale), [locale])
  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      meta: localeMeta[locale],
      copy: uiCopyByLocale[locale],
      loaded,
      content: loaded.ok ? loaded.content : null,
      setLocale,
    }),
    [locale, loaded, setLocale],
  )

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

export function useLocale(): LocaleContextValue {
  const value = useContext(LocaleContext)
  if (!value) throw new Error("useLocale must be used within LocaleProvider")
  return value
}
