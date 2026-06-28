import { useRef, useState } from "react"
import { Header, Button } from "./design-system"
import { RenderNode, useUITree } from "./space/renderer"
import type { GenResult } from "./space/types"
import "./App.css"

function SpaceView({ tree }: { tree: GenResult }) {
  const [state, dispatch] = useUITree(tree.initialState)
  return <RenderNode node={tree.root} state={state} dispatch={dispatch} />
}

function HeaderView({ tree }: { tree: GenResult }) {
  const [state, dispatch] = useUITree(tree.initialState)
  return <RenderNode node={tree.root} state={state} dispatch={dispatch} />
}

// Feature flag: the dynamic AI-generated header sentence is disabled for now.
// The backend (/api/generate-header, genheader.ts) and all header UI components
// stay fully intact — flip this back to true to re-enable.
const HEADER_GENERATION_ENABLED = false

export function App() {
  const [spaceTree, setSpaceTree] = useState<GenResult | null>(null)
  const [headerTree, setHeaderTree] = useState<GenResult | null>(null)
  const [loadingSpace, setLoadingSpace] = useState(false)
  const [loadingHeader, setLoadingHeader] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [generation, setGeneration] = useState(0)
  const [headerGeneration, setHeaderGeneration] = useState(0)
  const spaceSlotRef = useRef<HTMLDivElement>(null)

  // Always fetches /api/generate-header in isolation — used both by the (currently
  // disabled) production refresh icon and by the dev-only "Generate Header" button,
  // so the header prompt can be iterated on without re-running the full Space generation.
  async function generateHeaderOnly() {
    setLoadingHeader(true)
    try {
      const response = await fetch("/api/generate-header", { method: "POST" })
      if (!response.ok) throw new Error("Header generation failed")
      const data = await response.json()
      setHeaderTree(data.header_tree)
      setHeaderGeneration(g => g + 1)
    } catch (err) {
      // The header is a decorative top section — the Space still works without it.
      console.error("Header generation failed", err)
    } finally {
      setLoadingHeader(false)
    }
  }

  function regenerateHeader() {
    if (!HEADER_GENERATION_ENABLED) return
    return generateHeaderOnly()
  }

  async function generateSpace() {
    setLoadingSpace(true)
    setError(null)
    regenerateHeader()

    try {
      const response = await fetch("/api/generate", { method: "POST" })
      if (!response.ok) throw new Error("Generation failed")
      const data = await response.json()
      setSpaceTree(data.space_tree)
      setGeneration(g => g + 1)
    } catch (err) {
      console.error("Space generation failed", err)
      setError("Space could not be generated.")
    } finally {
      setLoadingSpace(false)
    }
  }

  function restartSpace() {
    if (!spaceTree) return
    spaceSlotRef.current?.scrollTo({ top: 0, behavior: "instant" })
    setGeneration(g => g + 1)
  }

  return (
    <>
      <div className="button-stack">
        <Button size="large" style="primary" label="Generate Space" state={loadingSpace ? "loading" : "default"} onClick={generateSpace} />
        <Button size="large" style="secondary" label="Restart" state={spaceTree ? "default" : "disabled"} onClick={restartSpace} />
        <Button size="large" style="secondary" label="Generate Header" state={loadingHeader ? "loading" : "default"} onClick={generateHeaderOnly} />
      </div>

      <div className="device-frame">
        <div className="space-slot" ref={spaceSlotRef}>
          {/* Lives inside the scrollable slot (not pinned above it) so it scrolls away
              with the rest of the content instead of staying fixed at the top. No
              ToolbarTop/title — this is just the generated headline sentence. The
              bottom border (pebble-header's default) is suppressed until a header has
              actually been generated, so the empty/reserved slot stays fully invisible. */}
          <Header className={`header--compact${headerTree ? "" : " header--no-border"}`}>
            <div className="header-frame">
              {/* Always reserves its fixed two-line height (App.css) so the header never
                  shifts the layout below it once content pops in — empty/invisible until
                  a header has actually been generated. */}
              <div className="header-slot">
                {headerTree && <HeaderView key={`header-${headerGeneration}`} tree={headerTree} />}
              </div>
            </div>
          </Header>

          {!spaceTree && !loadingSpace && !error && <div className="space-empty">No Space yet.</div>}
          {loadingSpace && <div className="space-loading">Generating Space…</div>}
          {error && <div className="space-error">{error}</div>}
          {spaceTree && !loadingSpace && (
            // spaceTree.root is always a SpaceContainer node already (see genui.ts Step 5) — no extra wrapper here.
            <SpaceView key={`space-${generation}`} tree={spaceTree} />
          )}
        </div>
      </div>
    </>
  )
}
