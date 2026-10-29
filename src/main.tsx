import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { isReviewPath } from "./review/isReviewPath"
import { whenFontsReady } from "./utils/preloadFonts"
import "./styles/tokens.css"
import "./styles/base.css"
import "./styles/screens.css"

void whenFontsReady()

const root = document.getElementById("root")
if (!root) throw new Error("Missing #root")

const review = isReviewPath(window.location.pathname, import.meta.env.BASE_URL)
const view = review
  ? import("./review/ReviewScreen").then(({ ReviewScreen }) => <ReviewScreen />)
  : import("./App").then(({ App }) => <App />)

void view.then((element) => {
  createRoot(root).render(<StrictMode>{element}</StrictMode>)
})
