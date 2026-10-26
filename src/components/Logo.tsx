import { publicUrl } from "../utils/publicUrl"

type LogoProps = { large?: boolean }

export function Logo({ large = false }: LogoProps) {
  return (
    <img
      className={large ? "logo logo-large" : "logo"}
      src={publicUrl("brand/logo-color-type.svg")}
      alt="הרשות לניירות ערך"
    />
  )
}
