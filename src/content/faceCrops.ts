/**
 * Square crops, in source pixels, for the 1152×864 profile illustrations.
 * Each crop frames the head and the top of the shoulders for the chat avatar.
 */
export type FaceCrop = {
  x: number
  y: number
  size: number
}

const IMAGE_WIDTH = 1152
const IMAGE_HEIGHT = 864

export const faceCrops: Record<string, FaceCrop> = {
  "profile-01.jpg": { x: 472, y: 13, size: 210 },
  "profile-02.jpg": { x: 496, y: 22, size: 210 },
  "profile-03.jpg": { x: 488, y: 0, size: 210 },
  "profile-04.jpg": { x: 567, y: 1, size: 283 },
  "profile-05.jpg": { x: 474, y: 29, size: 241 },
  "profile-06.jpg": { x: 402, y: 76, size: 320 },
  "profile-07.jpg": { x: 493, y: 16, size: 218 },
  "profile-08.jpg": { x: 476, y: 0, size: 210 },
  "profile-09.jpg": { x: 431, y: 55, size: 246 },
  "profile-10.jpg": { x: 463, y: 1, size: 320 },
  "profile-11.jpg": { x: 407, y: 0, size: 297 },
  "profile-12.jpg": { x: 451, y: 33, size: 260 },
  "profile-13.jpg": { x: 377, y: 97, size: 283 },
  "profile-14.jpg": { x: 206, y: 102, size: 302 },
  "profile-15.jpg": { x: 517, y: 25, size: 210 },
  "profile-16.jpg": { x: 438, y: 3, size: 260 },
  "profile-17.jpg": { x: 443, y: 17, size: 237 },
  "profile-18.jpg": { x: 429, y: 18, size: 265 },
  "profile-19.jpg": { x: 441, y: 2, size: 237 },
  "profile-20.jpg": { x: 459, y: 11, size: 232 },
  "profile-21.jpg": { x: 505, y: 115, size: 210 },
  "profile-22.jpg": { x: 453, y: 86, size: 237 },
}

export function faceCropFor(image: string | null): FaceCrop | null {
  if (!image) return null
  const name = image.split("/").pop() ?? image
  return faceCrops[name] ?? null
}

export function faceCropStyle(crop: FaceCrop): {
  width: string
  height: string
  left: string
  top: string
} {
  return {
    width: `${(IMAGE_WIDTH / crop.size) * 100}%`,
    height: `${(IMAGE_HEIGHT / crop.size) * 100}%`,
    left: `${(-crop.x / crop.size) * 100}%`,
    top: `${(-crop.y / crop.size) * 100}%`,
  }
}

/** Keep the head inside the wide card photo. The card crops a landscape band. */
export function portraitFocusStyle(crop: FaceCrop): { objectPosition: string } {
  const x = ((crop.x + crop.size / 2) / IMAGE_WIDTH) * 100
  const y = (crop.y / IMAGE_HEIGHT) * 100
  return { objectPosition: `${x}% ${y}%` }
}
