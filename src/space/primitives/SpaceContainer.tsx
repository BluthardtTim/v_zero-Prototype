import type { CSSProperties, ReactNode } from "react"

export interface SpaceContainerProps {
  children?: ReactNode
}

const style: CSSProperties = {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "var(--spacing-8)",
  padding: "var(--spacing-8) var(--spacing-5) var(--spacing-5)",
  boxSizing: "border-box",
  // Grows to fill any leftover height in .space-slot's flex column so short
  // content still reaches the bottom of the screen — pushing the AI-disclaimer
  // caption (the next flex sibling after this, in App.tsx) down to the true
  // bottom of the viewport instead of floating right under a half-empty screen.
  // flex-shrink:0 keeps this a pure minimum: long content still overflows and
  // scrolls normally rather than ever being compressed below its own height.
  flex: "1 0 auto"
}

export function SpaceContainer({ children }: SpaceContainerProps) {
  return <div style={style}>{children}</div>
}
