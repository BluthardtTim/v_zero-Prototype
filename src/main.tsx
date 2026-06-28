import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./assets/fonts/fonts.css"
import "./design-system/build/tokens.css"
import "./design-system/build/components.css"
import { App } from "./App"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
