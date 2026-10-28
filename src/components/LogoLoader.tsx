/** One pulse of a bar. The stylesheet reads this from `--logo-wave`. */
export const LOGO_WAVE_MS = 1700

/** How many times the wave must cross the whole mark before the app can open. */
export const MIN_LOGO_LOOPS = 2

const bars: { dir: "up" | "down"; delay: string; fill: string; d: string }[] = [
  { dir: "down", delay: "0.213s", fill: "#5cc8ed", d: "M53.05,108.77v3.98c0,2.4-3.88,2.35-3.88,0v-3.98c0-2.73,3.84-2.76,3.88,0Z" },
  { dir: "down", delay: "0.291s", fill: "#5cc8ed", d: "M72.43,108.77v14.5c0,2.4-3.88,2.35-3.88,0v-14.5c0-2.73,3.84-2.76,3.88,0Z" },
  { dir: "down", delay: "0.353s", fill: "#5cc8ed", d: "M87.92,108.77c0-2.73,3.84-2.76,3.88,0v40.54c0,2.4-3.88,2.35-3.88,0" },
  { dir: "down", delay: "1.134s", fill: "#5cc8ed", d: "M282.95,108.77v3.98c0,2.4,3.88,2.35,3.88,0v-3.98c0-2.73-3.84-2.76-3.88,0Z" },
  { dir: "down", delay: "1.057s", fill: "#5cc8ed", d: "M263.56,108.77v14.5c0,2.4,3.88,2.35,3.88,0v-14.5c0-2.73-3.84-2.76-3.88,0Z" },
  { dir: "down", delay: "0.994s", fill: "#5cc8ed", d: "M248.07,108.77c0-2.73-3.84-2.76-3.88,0v40.54c0,2.4,3.88,2.35,3.88,0" },
  { dir: "down", delay: "0.431s", fill: "#5cc8ed", d: "M107.51,108.77c0-2.73,3.84-2.76,3.88,0v67.04c0,2.4-3.88,2.35-3.88,0" },
  { dir: "down", delay: "0.900s", fill: "#5cc8ed", d: "M224.52,108.77c0-2.73,3.84-2.76,3.88,0v67.04c0,2.4-3.88,2.35-3.88,0" },
  { dir: "down", delay: "0.510s", fill: "#5cc8ed", d: "M127.05,108.77c0-2.73,3.84-2.76,3.88,0v93.43c0,2.4-3.88,2.35-3.88,0" },
  { dir: "down", delay: "0.827s", fill: "#5cc8ed", d: "M206.18,108.77c0-2.73,3.84-2.76,3.88,0v93.43c0,2.4-3.88,2.35-3.88,0" },
  { dir: "down", delay: "0.588s", fill: "#5cc8ed", d: "M146.51,108.77c0-2.73,3.84-2.76,3.88,0v120.02c0,2.4-3.88,2.35-3.88,0" },
  { dir: "down", delay: "0.666s", fill: "#5cc8ed", d: "M166.1,108.77c0-2.73,3.84-2.76,3.88,0v147.48c0,2.4-3.88,2.35-3.88,0" },
  { dir: "down", delay: "0.744s", fill: "#5cc8ed", d: "M185.49,108.77c0-2.73,3.84-2.76,3.88,0v119.82c0,2.4-3.88,2.35-3.88,0" },
  { dir: "up", delay: "0.937s", fill: "#3781ff", d: "M233.79,149.26v-3.98c0-2.4,3.88-2.35,3.88,0v3.98c0,2.73-3.84,2.76-3.88,0Z" },
  { dir: "up", delay: "0.860s", fill: "#3781ff", d: "M214.4,149.26v-14.5c0-2.4,3.88-2.35,3.88,0v14.5c0,2.73-3.84,2.76-3.88,0Z" },
  { dir: "up", delay: "0.798s", fill: "#3781ff", d: "M198.91,149.26c0,2.73-3.84,2.76-3.88,0v-40.54c0-2.4,3.88-2.35,3.88,0" },
  { dir: "up", delay: "0.016s", fill: "#3781ff", d: "M3.88,149.26v-3.98c0-2.4-3.88-2.35-3.88,0v3.98c0,2.73,3.84,2.76,3.88,0Z" },
  { dir: "up", delay: "0.093s", fill: "#3781ff", d: "M23.27,149.26v-14.5c0-2.4-3.88-2.35-3.88,0v14.5c0,2.73,3.84,2.76,3.88,0Z" },
  { dir: "up", delay: "0.155s", fill: "#3781ff", d: "M38.76,149.26c0,2.73,3.84,2.76,3.88,0v-40.54c0-2.4-3.88-2.35-3.88,0" },
  { dir: "up", delay: "0.719s", fill: "#3781ff", d: "M179.33,149.26c0,2.73-3.84,2.76-3.88,0v-67.04c0-2.4,3.88-2.35,3.88,0" },
  { dir: "up", delay: "0.250s", fill: "#3781ff", d: "M62.32,149.26c0,2.73-3.84,2.76-3.88,0v-67.04c0-2.4,3.88-2.35,3.88,0" },
  { dir: "up", delay: "0.641s", fill: "#3781ff", d: "M159.79,149.26c0,2.73-3.84,2.76-3.88,0V55.83c0-2.4,3.88-2.35,3.88,0" },
  { dir: "up", delay: "0.323s", fill: "#3781ff", d: "M80.65,149.26c0,2.73-3.84,2.76-3.88,0V55.83c0-2.4,3.88-2.35,3.88,0" },
  { dir: "up", delay: "0.563s", fill: "#3781ff", d: "M140.33,149.26c0,2.73-3.84,2.76-3.88,0V29.24c0-2.4,3.88-2.35,3.88,0" },
  { dir: "up", delay: "0.484s", fill: "#3781ff", d: "M120.73,149.26c0,2.73-3.84,2.76-3.88,0V1.78c0-2.4,3.88-2.35,3.88,0" },
  { dir: "up", delay: "0.407s", fill: "#3781ff", d: "M101.35,149.26c0,2.73-3.84,2.76-3.88,0V29.44c0-2.4,3.88-2.35,3.88,0" },
]

/** Time until every bar has finished the minimum number of pulses. */
export function minimumLogoLoadingMs(): number {
  const span = Math.max(...bars.map((bar) => Number.parseFloat(bar.delay) * 1000))
  return span + MIN_LOGO_LOOPS * LOGO_WAVE_MS
}

export function LogoLoader() {
  return (
    <div
      className="logo-loader"
      style={{ ["--logo-wave" as string]: `${LOGO_WAVE_MS}ms` }}
      role="img"
      aria-label="הלוגו של הרשות לניירות ערך נטען"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 286.84 258.03" aria-hidden="true">
        {bars.map((bar) => (
          <path
            key={bar.d}
            className={`bar ${bar.dir}`}
            style={{ animationDelay: bar.delay }}
            fill={bar.fill}
            d={bar.d}
          />
        ))}
      </svg>
    </div>
  )
}
