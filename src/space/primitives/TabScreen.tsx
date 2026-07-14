import type { CSSProperties, ReactNode } from "react"

export interface TabScreenProps {
  children?: ReactNode
}

const style: CSSProperties = {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "var(--spacing-8)",
  // Clears the fixed/absolute TabBar: 12px top pad + 50px tap targets + 32px
  // bottom pad = 94px, plus the SAME env(safe-area-inset-bottom) the bar itself
  // adds — a flat px value here would under-clear on a real device/simulator
  // with a non-zero safe area, cutting off the last bit of content. +24px extra
  // breathing room on top of the exact match.
  paddingBottom: "calc(94px + env(safe-area-inset-bottom) + 24px)"
}

export function TabScreen({ children }: TabScreenProps) {
  return <div style={style}>{children}</div>
}
