# Cursor build brief — משחק זיהוי הונאות השקעה | רשות ניירות ערך

## Your role
You are a senior frontend engineer and product designer. Build a **functional, polished, touch-first Hebrew RTL web game** inspired by the interaction pattern of swipe-based dating apps, for an educational Israeli Securities Authority experience. The product is a web app, **not** an iOS native app. Treat the attached Word document and JSON as the definitive editorial source, and the attached official ISA brand book as the definitive visual brand source.

## Files I am supplying
1. `משחק הונאות.docx` — the editorial brief, concept, candidate names, copy, feedback, and complete profile set.
2. `isa_swipe_game_content.json` — the structured content for the app: profile IDs, names, ages, short taglines, bios, opening messages, correct answers, difficulty, optional bespoke feedback, explanations, and global feedback banks.
3. ISA brand book (PDF / brand assets provided separately) — required reference for typography, colors, identity, spacing, logos, illustration/image styling, and accessible usage. **Do not invent or extrapolate brand tokens as official if the brand book has not been provided or cannot be read.** Ask for missing assets and use clearly marked temporary placeholders until then.

## Central concept and tone
**An investment is also a relationship.** In both, warning signs include promises that are too good to be true, secrecy, pressure to commit, inappropriate advice, false authority, and unrealistic guarantees. Positive signs include transparency, understanding needs, time to evaluate, and realistic discussion of risk.

The humor happens first in dating language; the financial lesson appears after the user's choice. Keep the voice dry, sharp, playful, and lightly cheeky — **never** corporate edutainment, patronizing finance jargon, random emojis, or a presentation disguised as an app. Preserve approved wording; do not rewrite profile content.

The opening slogans include:
- ״הטעם שלך בגברים זו בעיה שלך. בהשקעות אנחנו יכולים לעזור.״
- ״הטעם שלך בנשים זו בעיה שלך. בהשקעות אנחנו יכולים לעזור.״
The slogan should vary without gender assumptions about players. Other approved copy and name candidates live in the JSON; no name is finalized. Use a **configurable temporary game name** (e.g. "תשואה ממבט ראשון"), easily replaceable in one place.

## Product specification
1. **Start screen**: game title / logo space, one of the existing taglines, succinct explanation, and obvious Start control. Clarify that left = red flag / לא הטייפ שלי, right = green flag / שווה להכיר.
2. **Swipe game**: show ONE profile at a time. A coherent dating-app-like card with a reserved portrait image area, name, age, tagline, bio, and opening chat message. Preserve all Hebrew text and punctuation from JSON. Do not display the `flag`, `difficulty`, or professional explanation before the decision.
3. **Controls**: swipe left / right with finger or pointer AND prominent accessible buttons with the same actions. Buttons are the primary fallback for users who cannot swipe. Show swipe direction hints. Do not require gestures to complete the game.
4. **After selection**: freeze the card and show a distinct, delightful short response based on whether the player identified the flag correctly. Prefer a profile-specific `customFeedback` where it makes sense, otherwise rotate through the matching bank in `feedback`. Show the *actual* flag, followed by that profile's `explanation`. Then show “הבא” to proceed. Red-flag misses and green-flag misses require separate response styles; no shaming.
5. **Progress**: unobtrusive profile number/progress bar and cumulative score (correct answers / completed). No score shown before any answer. End screen with final score and one of the approved closing messages; restart works.
6. **Session sequencing**: implement Fisher–Yates shuffle **once at session start**, keep the current shuffled order stable throughout the round, do not repeat a profile during a round. Provide a `shuffleProfiles` configuration flag; optional fixed order for QA. Use all 22 in the initial build, but keep the round length configurable for an event version (e.g. 10–12).
7. **Data**: import the local JSON; do not hard-code profiles or explanations into components. Validate required content fields on load, fail gracefully and explain missing assets/content in development mode. Images are currently `null`: never fetch random portraits or hallucinate headshots. Show branded neutral placeholders; allow later local assets to be referenced by `image`.
8. **No backend for MVP**, no sign-in, no cookies, no analytics, no personal data collection, no user accounts, no remote AI or content generation. Store only ephemeral session state in memory; refreshing resets the round.
9. **Accuracy / consumer protection**: Red and green refer to **signals in the scenario**, not a reliable determination that a real person is fraudulent or that an investment is approved or safe. Include a concise persistent or end-screen disclaimer: “דגל ירוק אינו אישור להשקיע או המלצה על אדם או מוצר. לפני השקעה בודקים.” Do not claim ISA endorsement of any featured person or asset. Do not include a payment flow or real investing functionality.

## Target device and responsive design
**Primary: 11-inch iPad in Safari, web-based, landscape orientation.** Design specifically for approximately **1194×834 CSS points in landscape and 834×1194 in portrait** as useful reference geometries, but **do not assume hardware resolution = CSS viewport**. Browser toolbars, zoom, iPadOS and model affect usable space. Build fluid responsive layouts, test actual viewport sizes, and allow portrait gracefully. Also support laptop/desktop browsers, tablet touch and smaller mobile widths, without horizontal scrolling.

- RTL for all Hebrew UI (`lang="he" dir="rtl"`), including meaningful mixed RTL/LTR handling for numbers, English words and percentages.
- Prefer CSS Grid/Flexbox, fluid sizes and `clamp()`, `min-height: 100dvh`, and sensible safe-area insets.
- In landscape, fit the game, profile and answer controls on screen when reasonably possible; use compact/scrollable card content where needed rather than shrinking Hebrew body type to illegibility. Consider two-column landscape layout (portrait/identity alongside bio/message) if the brand supports it. In portrait, stack gracefully.
- Large comfortable touch targets (at least 44×44 CSS px; preferably bigger for event use); visible focus, high contrast, readable font sizes, keyboard support (Left/Right arrows when appropriate, plus Enter/Space on buttons), reduced-motion behavior, full screen and standalone-web usability.
- A drag/swipe animation with threshold, rubber-banding under threshold, proper pointer/touch handling and cancellation. Disable conflicting scroll only on gesture surface; never block necessary scrolling or keyboard focus. Avoid double-submit from both pointer/touch/button events.
- Transitions: tasteful, not cartoonish. Respect `prefers-reduced-motion`.
- Ensure the user can clearly read the `bio`, opening message, feedback, and explanation on iPad without accidental clipping; no text ellipsis for core copy.

## Design direction
Use the supplied official brand book as **source of truth**, and make the visual identity recognizable as the ISA's while the interaction language borrows common swipe-app conventions. Do not reproduce Tinder branding, logo, copyrighted illustration, or proprietary UI exactly. The game needs an independent visual identity. Create tokens in a dedicated theme file *derived from the actual brand book*, with a short mapping of source book page / rule → applied token.

Provide tasteful layouts, spacing, good Hebrew type hierarchy, crisp interface illustrations/placeholders, distinctive large red/green actions that are distinguishable also by icon and label (not color alone). Red/green should not override the brand palette except as semantic answer colors.

If only screenshots of brand guidelines are available, request exported logos, licensed fonts and approved imagery assets rather than embedding screenshots.

## Engineering and project deliverables
- If the folder is empty, scaffold with **React + TypeScript + Vite** and maintainable modular CSS (or existing project stack if already initialized). Avoid heavyweight dependencies unless justified.
- Suggested modules: `content/`, `components/`, `hooks/`, `styles/`, `types/`, `utils/`.
- Typed `Profile` / `GameContent` interfaces, dedicated game engine state, independent swipe-card component, feedback overlay/panel, start and end screens.
- Validate content schema including `red|green`, `easy|medium|hard`, ID uniqueness, and required fields.
- Automated logic tests for scoring, answer mapping, random order/no repeats, navigation, and reset; verify RTL and keyboard interactions manually.
- Add a short `README.md`: setup (`npm install`, `npm run dev`, build), how to edit JSON/add photos, where to edit game name, source of design tokens and known TODOs.
- Do not invent more copy, reassign flags, or 'fix' Hebrew typos in the source data without showing a separate proposed editorial corrections list for approval.
- Do not link unverified resources or libraries. Keep app usable offline after assets load; prefer local assets.

## Acceptance criteria
- App builds and runs locally, with no console errors.
- All **22** profiles are present and can be played.
- 13 red and 9 green flags exactly as source JSON.
- Cards, buttons, gesture, feedback, score, end screen, restart and randomization work.
- Hebrew right-to-left typography and punctuation display correctly.
- Desktop, iPad 11-inch landscape/portrait and smaller screens are responsive; check at minimum 1194×834, 834×1194, 1024×768, 1440×900, 390×844 viewports and actual iPad Safari if available.
- Brand-book-driven color, typography, logo and spacing rules applied when assets are provided.
- No player sees flag, difficulty or explanation before voting.
- Green signifies a positive indicator to examine further, **not** an ISA approval or guarantee.

## First actions
1. Inspect the source documents and brand book, and summarize the planned page flow, selected stack and design tokens in a short note.
2. List missing assets (e.g. profile portraits, brand fonts/logo) but **continue implementing with marked placeholders**.
3. Implement the full working MVP, including usable responsive screens; do not stop at wireframes.
4. Run build/tests and check the required viewport sizes; report any remaining limitations and items requiring editorial approval.

## Editorial warning: source contains deliberate and accidental peculiarities
`isa_swipe_game_content.json` transcribes the supplied document literally, including a few typos, asymmetries in profile wording and missing custom feedback on some cards. Don't silently rewrite them. For profiles without bespoke feedback, use appropriate global feedback. Gather questionable phrasing in a separate editorial QA checklist, not by changing original JSON.
