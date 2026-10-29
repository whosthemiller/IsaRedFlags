export const uiCopy = {
  logoTagline: "את הדגלים האדומים תשאירו לאקסים, לא לתיק ההשקעות.",
  start: "בואו נתחיל",
  introLead: "נעים להכיר! אפליקציית ההיכרויות מבית הרשות לניירות ערך",
  introDecide:
    "בכל סיבוב יופיע פרופיל חדש, ואתם תצטרכו להחליט: מחליקים ימינה לדגל ירוק ששווה להכיר, או שמאלה לדגל אדום שעדיף להתרחק ממנו?",
  introDiscover:
    "אחרי כל בחירה תגלו מה הסתתר מאחורי הפרופיל, ותוכלו לבדוק עד כמה אתם טובים בזיהוי דגלים אדומים — בדייטינג ובהשקעות.",
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
} as const

/** The lead is the emphasized clause. The rest continues the same sentence, quieter. */
export interface EndLine {
  lead: string
  rest: string
}

export interface EndResult {
  title: EndLine
  description: EndLine
}

const lowEndResult: EndResult = {
  title: {
    lead: "לא תמיד זו אהבה ממבט ראשון",
    rest: "",
  },
  description: {
    lead: "רושם ראשוני יכול להטעות.",
    rest: "גם בהשקעות, שווה לתת לפרטים מבט נוסף, לשאול שאלות ולהכיר את הסיכונים.",
  },
}

const highEndResult: EndResult = {
  title: {
    lead: "יש לך רדאר.",
    rest: "עכשיו הגיע הזמן להשתמש בו גם מחוץ לאפליקציה",
  },
  description: {
    lead: "זיהית לא מעט סימנים חשובים.",
    rest: "גם במציאות, כדאי להמשיך לבדוק לפני שמתחייבים.",
  },
}

/** Scores 0–2 share one result. Scores 3 and above share the other. */
export function endResultForScore(correct: number): EndResult {
  return correct >= 3 ? highEndResult : lowEndResult
}
