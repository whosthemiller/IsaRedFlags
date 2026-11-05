import type { Locale } from "./locale"

export type UiCopy = {
  logoTagline: string
  introLead: string
  introDecide: string
  introCta: string
  pass: string
  like: string
  redFlag: string
  greenFlag: string
  passMeta: string
  likeMeta: string
  swipeHint: string
  keyboardHint: string
  next: string
  again: string
  scoreLabel: string
  profile: string
  of: string
  about: string
  explanation: string
  signal: string
  correct: string
  disclaimer: string
  noPhoto: string
  contentError: string
  progress: string
}

/** The lead is the emphasized clause. The rest continues the same sentence, quieter. */
export interface EndLine {
  lead: string
  rest: string
}

export interface EndResult {
  title: EndLine
  description: EndLine
}

const heCopy: UiCopy = {
  logoTagline: "את הדגלים האדומים תשאירו לאקסים, לא לתיק ההשקעות.",
  introLead: "נעים להכיר! אפליקציית ההיכרויות מבית הרשות לניירות ערך",
  introDecide:
    "בכל סיבוב יופיע פרופיל חדש, ואתם תצטרכו להחליט: אפשר לסמוך עליו? או שיש פה דגל אדום? מחליקים ימינה לדגל ירוק, שמאלה לדגל אדום. אחרי כל בחירה תגלו אם זיהיתם נכון ומה כדאי לשים לב אליו גם בהשקעות.",
  introCta: "מוכנים למצוא מאץ׳?",
  pass: "לא הטייפ שלי",
  like: "שווה להכיר",
  redFlag: "דגל אדום",
  greenFlag: "דגל ירוק",
  passMeta: "דגל אדום · שמאלה",
  likeMeta: "דגל ירוק · ימינה",
  swipeHint: "החליקו את הכרטיס, או לחצו על הכפתורים.",
  keyboardHint: "במקלדת: חץ שמאלה לדגל אדום, חץ ימינה לדגל ירוק.",
  next: "הבא",
  again: "יאללה סיבוב נוסף",
  scoreLabel: "נכון",
  profile: "פרופיל",
  of: "מתוך",
  about: "קצת עליי",
  explanation: "ההסבר",
  signal: "הסימן בסיפור",
  correct: "זיהית נכון",
  disclaimer:
    "דגל ירוק אינו אישור להשקיע או המלצה על אדם או מוצר. לפני שמשקיעים, בודקים.",
  noPhoto: "אין תמונה",
  contentError: "לא הצלחנו לטעון את תוכן המשחק.",
  progress: "התקדמות בסיבוב",
}

const enCopy: UiCopy = {
  logoTagline: "Save the red flags for your exes, not your investment portfolio.",
  introLead: "Nice to meet you! The dating app from the Israel Securities Authority.",
  introDecide:
    "Each round, you'll meet a new profile. Your call: can you trust them, or are there red flags? Swipe right for a green flag, left for a red flag. After each choice, find out if you spotted the signs—and what to watch for when investing, too.",
  introCta: "Ready to find a match?",
  pass: "Not My Type",
  like: "Worth Getting to Know",
  redFlag: "Red Flag",
  greenFlag: "Green Flag",
  passMeta: "Red Flag · Swipe Left",
  likeMeta: "Green Flag · Swipe Right",
  swipeHint: "Swipe the card or use the buttons.",
  keyboardHint: "Keyboard: Left Arrow for a red flag, Right Arrow for a green flag.",
  next: "Next",
  again: "Let's Go Again",
  scoreLabel: "Correct",
  profile: "Profile",
  of: "of",
  about: "About Me",
  explanation: "The Explanation",
  signal: "The Tell",
  correct: "You Got It Right",
  disclaimer:
    "A green flag is not approval to invest or an endorsement of any person or product. Do your research before investing.",
  noPhoto: "No Photo",
  contentError: "We couldn't load the game content.",
  progress: "Round Progress",
}

export const uiCopyByLocale: Record<Locale, UiCopy> = {
  he: heCopy,
  en: enCopy,
}

/** @deprecated Prefer uiCopyByLocale[locale] via LocaleContext. */
export const uiCopy = heCopy

const lowEndByLocale: Record<Locale, EndResult> = {
  he: {
    title: {
      lead: "לא תמיד זו אהבה ממבט ראשון",
      rest: "",
    },
    description: {
      lead: "רושם ראשוני יכול להטעות.",
      rest: "גם בהשקעות, שווה לתת לפרטים מבט נוסף, לשאול שאלות ולהכיר את הסיכונים.",
    },
  },
  en: {
    title: {
      lead: "It's Not Always Love at First Sight",
      rest: "",
    },
    description: {
      lead: "First impressions can be misleading.",
      rest: "Investing is no different: take a second look, ask questions, and understand the risks.",
    },
  },
}

const highEndByLocale: Record<Locale, EndResult> = {
  he: {
    title: {
      lead: "יש לך רדאר",
      rest: "עכשיו הגיע הזמן להשתמש בו גם מחוץ לאפליקציה",
    },
    description: {
      lead: "זיהית לא מעט סימנים חשובים.",
      rest: "גם במציאות, כדאי להמשיך לבדוק לפני שמתחייבים.",
    },
  },
  en: {
    title: {
      lead: "You've Got a Radar for Red Flags",
      rest: "Now it's time to use it outside the app, too.",
    },
    description: {
      lead: "You picked up on some important signs.",
      rest: "In real life, keep asking questions before you commit.",
    },
  },
}

/** Scores 0–2 share one result. Scores 3 and above share the other. */
export function endResultForScore(correct: number, locale: Locale = "he"): EndResult {
  return correct >= 3 ? highEndByLocale[locale] : lowEndByLocale[locale]
}
