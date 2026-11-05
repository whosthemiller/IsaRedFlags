import { useLocale } from "../content/LocaleContext"
import { publicUrl } from "../utils/publicUrl"

type LogoProps = { large?: boolean }

export function Logo({ large = false }: LogoProps) {
  const { meta } = useLocale()
  return (
    <img
      className={large ? "logo logo-large" : "logo"}
      src={publicUrl("brand/logo-color-type.svg")}
      width={495}
      height={265}
      alt={meta.logoAlt}
    />
  )
}
