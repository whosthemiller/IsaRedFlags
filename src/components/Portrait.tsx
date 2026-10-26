import { useState } from "react"
import { faceCropFor, portraitFocusStyle } from "../content/faceCrops"
import { uiCopy } from "../content/uiCopy"
import type { Profile } from "../types/content"
import { profileImageSrc } from "../utils/game"

const LOOKS = [
  { bg: "#5cc8ed", fg: "#00113f" },
  { bg: "#3781ff", fg: "#ffffff" },
  { bg: "#2363d1", fg: "#ffffff" },
  { bg: "#4ae8c3", fg: "#00113f" },
  { bg: "#aeb8f0", fg: "#00113f" },
  { bg: "#9747ff", fg: "#ffffff" },
  { bg: "#ff7e67", fg: "#00113f" },
  { bg: "#00113f", fg: "#ffffff" },
] as const

const ICONS = [
  "/brand/icons/shield.svg",
  "/brand/icons/scales.svg",
  "/brand/icons/document.svg",
  "/brand/icons/like.svg",
  "/brand/icons/book.svg",
  "/brand/icons/home.svg",
  "/brand/icons/chart.svg",
  "/brand/icons/lock.svg",
  "/brand/icons/clock.svg",
  "/brand/icons/letter.svg",
  "/brand/icons/certificate.svg",
  "/brand/icons/friends.svg",
  "/brand/icons/work.svg",
  "/brand/icons/bank.svg",
  "/brand/icons/search.svg",
  "/brand/icons/puzzle.svg",
  "/brand/icons/idea.svg",
]

function hashString(value: string): number {
  let hash = 0
  for (const char of value) hash = (hash * 31 + char.charCodeAt(0)) >>> 0
  return hash
}

export function Portrait({ profile }: { profile: Profile }) {
  const [failed, setFailed] = useState(false)
  const src = profileImageSrc(profile.image)
  const crop = faceCropFor(profile.image)
  if (src && !failed) {
    return (
      <div className="portrait">
        <img
          className="portrait-photo"
          src={src}
          alt=""
          draggable={false}
          style={crop ? portraitFocusStyle(crop) : undefined}
          onError={() => setFailed(true)}
        />
      </div>
    )
  }

  const hash = hashString(profile.id)
  const look = LOOKS[hash % LOOKS.length]
  const icon = ICONS[hash % ICONS.length]
  const initial = Array.from(profile.name)[0] ?? ""

  return (
    <div className="portrait">
      <div className="portrait-placeholder" style={{ background: look.bg, color: look.fg }}>
        <span className="portrait-badge">
          <img src={icon} alt="" draggable={false} />
        </span>
        <span className="portrait-initial" aria-hidden="true">
          {initial}
        </span>
        <span className="portrait-caption">{uiCopy.noPhoto}</span>
      </div>
    </div>
  )
}
