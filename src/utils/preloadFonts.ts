/** Letters and digits the game draws, so each face is actually requested. */
const SAMPLE = "אבגדהוזחטיכלמנסעפצקרשת השקעה 0123456789"

const FACES = [
  '400 16px "Simpler"',
  '700 16px "Simpler"',
  '400 16px "Simpler Italic"',
  '400 16px "Simpler Ext Bold"',
] as const

function loadFace(face: string): Promise<void> {
  return document.fonts.load(face, SAMPLE).then(
    () => undefined,
    () => undefined,
  )
}

function facesReady(): boolean {
  return FACES.every((face) => document.fonts.check(face, SAMPLE))
}

/**
 * Resolves when the brand faces can actually be drawn.
 * An early call, before the font rules exist, retries instead of giving up.
 * A missing face does not hold the screen forever.
 */
export function whenFontsReady(): Promise<void> {
  if (typeof document === "undefined" || !document.fonts?.load) return Promise.resolve()
  const started = Date.now()

  const attempt = (): Promise<void> =>
    Promise.all(FACES.map(loadFace))
      .then(() => document.fonts.ready)
      .then(() => {
        if (facesReady() || Date.now() - started > 4000) return
        return new Promise<void>((resolve) => {
          window.setTimeout(() => resolve(attempt()), 50)
        })
      })

  return attempt()
}
