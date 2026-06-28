import type { CSSProperties, ReactNode } from "react"

export interface SectionHeadlineProps {
  children?: ReactNode
}

const style: CSSProperties = {
  fontSize: "var(--typography-fontsize-h4)",
  fontWeight: "var(--typography-fontweight-regular)",
  lineHeight: "var(--typography-lineheight-h4)",
  fontFamily: "var(--font)",
  color: "var(--text-primary)",
  padding: "0 var(--spacing-1)"
}

export function SectionHeadline({ children }: SectionHeadlineProps) {
  return <div style={style}>{children}</div>
}
