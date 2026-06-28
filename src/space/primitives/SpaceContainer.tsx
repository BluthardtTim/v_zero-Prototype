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
  boxSizing: "border-box"
}

export function SpaceContainer({ children }: SpaceContainerProps) {
  return <div style={style}>{children}</div>
}
