import { useState } from "react"
import { faceCropFor, faceCropStyle } from "../content/faceCrops"
import { uiCopy } from "../content/uiCopy"
import { useReducedMotion } from "../hooks/useReducedMotion"
import { useSwipe } from "../hooks/useSwipe"
import type { Direction, Profile } from "../types/content"
import { profileImageSrc } from "../utils/game"
import { Portrait } from "./Portrait"

type ProfileCardProps = {
  profile: Profile
  enabled: boolean
  onCommit: (direction: Direction) => void
}

export function ProfileCard({ profile, enabled, onCommit }: ProfileCardProps) {
  const reducedMotion = useReducedMotion()
  const { drag, cardRef, handlers } = useSwipe({ enabled, reducedMotion, onCommit })
  const rotate = Math.max(-12, Math.min(12, drag.x / 18))
  const passOpacity = drag.dragging && drag.x < 0 ? Math.min(1, Math.abs(drag.x) / 90) : 0
  const likeOpacity = drag.dragging && drag.x > 0 ? Math.min(1, drag.x / 90) : 0
  const lean = drag.x < -12 ? "lean-left" : drag.x > 12 ? "lean-right" : ""

  return (
    <article
      ref={cardRef}
      className={`card card-front ${drag.dragging ? "is-dragging" : ""} ${drag.settling ? "is-settling" : ""} ${lean}`}
      aria-labelledby={`name-${profile.id}`}
      style={{
        transform: `translate3d(${drag.x}px, ${drag.y}px, 0) rotate(${rotate}deg)`,
        transition: drag.dragging || reducedMotion ? "none" : "transform 220ms cubic-bezier(.2, .8, .2, 1)",
      }}
      {...handlers}
    >
      <div className="wash wash-nope" style={{ opacity: passOpacity * 0.28 }} />
      <div className="wash wash-like" style={{ opacity: likeOpacity * 0.28 }} />
      <div className="stamps" dir="ltr" aria-hidden="true">
        <div className="stamp stamp-pass" dir="rtl" style={{ opacity: passOpacity }}>
          {uiCopy.pass}
        </div>
        <div className="stamp stamp-like" dir="rtl" style={{ opacity: likeOpacity }}>
          {uiCopy.like}
        </div>
      </div>
      <div className="card-hero">
        <Portrait profile={profile} />
        <div className="card-overlay">
          <h1 id={`name-${profile.id}`} className="card-name">
            {profile.name}
            <span className="card-age"> {profile.age}</span>
          </h1>
          <p className="card-tagline prose">{profile.tagline}</p>
        </div>
      </div>
      <div className="card-body">
        <section>
          <h2 className="section-label">{uiCopy.about}</h2>
          <p className="prose about-copy">{profile.bio}</p>
        </section>
        <section className="chat">
          <ChatAvatar profile={profile} />
          <p className="chat-bubble prose">{profile.openingMessage}</p>
        </section>
      </div>
    </article>
  )
}

function ChatAvatar({ profile }: { profile: Profile }) {
  const [failed, setFailed] = useState(false)
  const src = profileImageSrc(profile.image)
  const crop = faceCropFor(profile.image)
  if (src && !failed) {
    return (
      <span className="chat-avatar" aria-hidden="true">
        <img
          src={src}
          alt=""
          draggable={false}
          style={crop ? faceCropStyle(crop) : undefined}
          onError={() => setFailed(true)}
        />
      </span>
    )
  }

  const initial = Array.from(profile.name)[0] ?? ""
  return (
    <span className="chat-avatar" aria-hidden="true">
      {initial}
    </span>
  )
}
