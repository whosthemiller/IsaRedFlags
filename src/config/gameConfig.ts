/**
 * Working title. Candidates stay in the content JSON and are not shown.
 * A round is `roundLength` profiles. It always opens on easy, and each
 * correct answer raises the next card: one success → medium, two or more → hard.
 * A miss does not lower a level already reached.
 * Set shuffleProfiles to false to keep source order inside each difficulty.
 */
export interface GameConfig {
  gameName: string
  shuffleProfiles: boolean
  roundLength: number
}

export const gameConfig: GameConfig = {
  gameName: "השקעה ממבט ראשון",
  shuffleProfiles: true,
  roundLength: 5,
}
