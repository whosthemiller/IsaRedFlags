import { Spark } from "./Spark"

export function GameMark() {
  return (
    <h1 className="game-mark">
      <span className="festive-glow" aria-hidden="true" />
      <Spark className="spark spark-a" />
      <Spark className="spark spark-b" />
      <Spark className="spark spark-c" />
      <Spark className="spark spark-d" />
      <Spark className="spark spark-e" />
      <span className="game-mark-cards" aria-hidden="true">
        <span className="game-mark-face game-mark-heart">
          <svg viewBox="0 0 48 48">
            <path
              fill="#ff7e67"
              d="M24 41C18 34 7.5 28 7.5 17.5A8.5 8.5 0 0 1 24 14.6 8.5 8.5 0 0 1 40.5 17.5C40.5 28 30 34 24 41z"
            />
          </svg>
        </span>
        <span className="game-mark-face game-mark-chart">
          <svg viewBox="0.7 2 37.3 38.5">
            <rect x="4" y="26" width="8" height="13" rx="2" fill="#5cc8ed" />
            <rect x="16" y="18" width="8" height="21" rx="2" fill="#4ae8c3" />
            <rect x="28" y="14" width="8" height="25" rx="2" fill="#2363d1" />
            <path
              d="M4 18 L28 7"
              fill="none"
              stroke="#3781ff"
              strokeWidth="2.6"
              strokeLinecap="round"
            />
            <path fill="#3781ff" d="M35.6 3.4 29.4 10.2 26.4 3.6z" />
          </svg>
        </span>
      </span>
      <span className="game-mark-type">
        <span className="game-mark-word">השקעה</span>
        <span className="game-mark-sub">ממבט ראשון</span>
      </span>
    </h1>
  )
}
