import type { ReactNode } from "react"

export interface SectionHeadlineProps {
  children?: ReactNode
}

export function SectionHeadline({ children }: SectionHeadlineProps) {
  return <div className="space-section-headline">{children}</div>
}
