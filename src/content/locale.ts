export type Locale = "he" | "en"

export type TextDirection = "rtl" | "ltr"

export interface LocaleMeta {
  locale: Locale
  lang: string
  dir: TextDirection
  gameName: string
  markWord: string
  markSub: string
  loading: string
  logoAlt: string
  logoLoading: string
  switchToLabel: string
  switchToLocale: Locale
}

export const LOCALE_STORAGE_KEY = "isa-locale"

export const localeMeta: Record<Locale, LocaleMeta> = {
  he: {
    locale: "he",
    lang: "he",
    dir: "rtl",
    gameName: "השקעה ממבט ראשון",
    markWord: "השקעה",
    markSub: "ממבט ראשון",
    loading: "טוען",
    logoAlt: "הרשות לניירות ערך",
    logoLoading: "הלוגו של הרשות לניירות ערך נטען",
    switchToLabel: "EN",
    switchToLocale: "en",
  },
  en: {
    locale: "en",
    lang: "en",
    dir: "ltr",
    gameName: "Investment at First Sight",
    markWord: "Investment",
    markSub: "at First Sight",
    loading: "Loading",
    logoAlt: "Israel Securities Authority",
    logoLoading: "Israel Securities Authority logo is loading",
    switchToLabel: "עב",
    switchToLocale: "he",
  },
}

export function isLocale(value: unknown): value is Locale {
  return value === "he" || value === "en"
}

export function readStoredLocale(): Locale {
  try {
    const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY)
    if (isLocale(stored)) return stored
  } catch {
    /* ignore storage failures */
  }
  return "he"
}

export function writeStoredLocale(locale: Locale): void {
  try {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale)
  } catch {
    /* ignore storage failures */
  }
}

export function applyDocumentLocale(locale: Locale): void {
  const meta = localeMeta[locale]
  document.documentElement.lang = meta.lang
  document.documentElement.dir = meta.dir
  document.title = meta.gameName
}
