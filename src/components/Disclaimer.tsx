import { useLocale } from "../content/LocaleContext"

export function Disclaimer() {
  const { copy } = useLocale()
  return <p className="disclaimer">{copy.disclaimer}</p>
}
