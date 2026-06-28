import type { CSSProperties, ReactNode } from "react"

const style: CSSProperties = {
  display: "flex",
  flexDirection: "row",
  gap: "var(--spacing-3)",
  alignItems: "flex-start",
  width: "100%",
}

/** Layout row for placing two or more small-variant components side by side (e.g. MapPreviewSmall + Note size='small'). */
export function Row({ children }: { children?: ReactNode }) {
  return <div style={style}>{children}</div>
}
