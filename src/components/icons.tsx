type IconProps = { className?: string }

export function IconNope({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M6.2 6.2l11.6 11.6M17.8 6.2L6.2 17.8"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function IconHeart({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 20.35c-.32 0-.62-.12-.86-.34C6.2 15.9 2.75 12.9 2.75 9.15 2.75 6.55 4.78 4.5 7.35 4.5c1.42 0 2.72.66 3.56 1.78L12 7.7l1.09-1.42A4.48 4.48 0 0 1 16.65 4.5c2.57 0 4.6 2.05 4.6 4.65 0 3.75-3.45 6.75-8.39 10.86-.24.22-.54.34-.86.34z"
      />
    </svg>
  )
}

export function IconFlag({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M6 3h2v18H6z" />
      <path fill="currentColor" d="M8 4h11l-2.4 4.2L19 12.5H8z" />
    </svg>
  )
}

export function IconExpand({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 4H4v4M16 4h4v4M8 20H4v-4M16 20h4v-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}
