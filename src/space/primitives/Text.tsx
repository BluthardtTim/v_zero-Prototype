import type { CSSProperties, ReactNode } from "react"

export type TextLevel = "title" | "body" | "caption" | "focus" | "context"

export interface TextProps {
  level: TextLevel
  children?: ReactNode
}

const levelStyle: Record<TextLevel, CSSProperties> = {
  title: {
    fontSize: "var(--typography-fontsize-h4)",
    fontWeight: "var(--typography-fontweight-semibold)",
    lineHeight: "var(--typography-lineheight-h4)",
    color: "var(--text-primary)"
  },
  body: {
    fontSize: "var(--typography-fontsize-body)",
    fontWeight: "var(--typography-fontweight-regular)",
    lineHeight: "var(--typography-lineheight-body)",
    color: "var(--text-primary)"
  },
  caption: {
    fontSize: "var(--typography-fontsize-caption)",
    fontWeight: "var(--typography-fontweight-regular)",
    lineHeight: "var(--typography-lineheight-caption)",
    color: "var(--text-secondary)"
  },
  // Inline header sentence fragments — used as children of the Headline primitive.
  focus: {
    fontWeight: "var(--typography-fontweight-semibold)",
    color: "var(--text-primary)"
  },
  context: {
    fontWeight: "var(--typography-fontweight-regular)",
    color: "var(--text-secondary)"
  }
}

export function Text({ level, children }: TextProps) {
  return <span style={{ fontFamily: "var(--font)", ...levelStyle[level] }}>{children}</span>
}
