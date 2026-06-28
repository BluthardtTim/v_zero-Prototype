import type { CSSProperties, ReactNode } from "react"

export interface HeadlineProps {
  children?: ReactNode
}

const style: CSSProperties = {
  display: "block",
  fontFamily: "var(--font)",
  fontSize: "var(--typography-fontsize-h3)",
  // Tighter than h3's own 32px lineheight token — the Figma reference's two rows are
  // each exactly 24px tall (set by the inline 24px avatar badges, not the text itself),
  // so this matches that row height exactly and lets a wrapped 2-line sentence size
  // the same as it does in the reference, instead of leaving extra air per line.
  lineHeight: "var(--typography-lineheight-body)",
  color: "var(--text-primary)"
}

// Deliberately NOT flexbox: a flex container wraps whole children to a new line as
// indivisible units, which breaks word-by-word wrapping across fragment boundaries.
// Plain block + inline children (Text spans, inline-flex AvatarGroup/Visual) lets the
// browser wrap the sentence exactly like normal prose. There is no automatic gap
// between children — each child's own text carries its own leading/trailing space
// (see genheader.ts's whitespace rule).
/** Wraps the per-context dynamic header sentence (Text focus/context fragments + an optional inline AvatarGroup/Visual). */
export function Headline({ children }: HeadlineProps) {
  return <div className="space-headline" style={style}>{children}</div>
}
