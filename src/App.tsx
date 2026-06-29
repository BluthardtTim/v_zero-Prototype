import { useRef, useState, useEffect } from "react"
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

function HomeScreen({
  onGenerateTop,
  onGenerateBottom,
  topLoading,
  bottomLoading,
}: {
  onGenerateTop: () => void
  onGenerateBottom: () => void
  topLoading: boolean
  bottomLoading: boolean
}) {
  return (
    <div className="home-screen">
      <div className="home-screen__title">
        <p className="home-screen__title-main">Temporary Spaces</p>
        <p className="home-screen__title-sub">everything is silent</p>
      </div>

      {/* Top blob — Italy Trip (Figma node 88:646) */}
      <button
        className={`home-screen__blob home-screen__blob--top${topLoading ? " home-screen__blob--loading" : ""}`}
        onClick={onGenerateTop}
        disabled={topLoading || bottomLoading}
        aria-label="Open Italy Trip Space"
      >
        <img src="/bubbles.png" alt="" draggable={false} />
      </button>

      {/* Bottom blob — Haus Hoffmann (Figma node 88:686) */}
      <button
        className={`home-screen__blob home-screen__blob--bottom${bottomLoading ? " home-screen__blob--loading" : ""}`}
        onClick={onGenerateBottom}
        disabled={topLoading || bottomLoading}
        aria-label="Open Haus Hoffmann Space"
      >
        <img src="/bubbles.png" alt="" draggable={false} />
      </button>

      {(topLoading || bottomLoading) && (
        <p className="home-screen__loading">Generating Space…</p>
      )}
    </div>
  )
}

interface SpaceSlot {
  spaceTree: GenResult | null
  headerTree: GenResult | null
  loading: boolean
  generation: number
}

const EMPTY_SLOT: SpaceSlot = { spaceTree: null, headerTree: null, loading: false, generation: 0 }

export function App() {
  const [topSpace, setTopSpace] = useState<SpaceSlot>(EMPTY_SLOT)
  const [bottomSpace, setBottomSpace] = useState<SpaceSlot>(EMPTY_SLOT)
  const [activeSpace, setActiveSpace] = useState<"top" | "bottom" | null>(null)
  const [error, setError] = useState<string | null>(null)
  const spaceSlotRef = useRef<HTMLDivElement>(null)

  const showHome = activeSpace === null
  const currentSlot = activeSpace === "top" ? topSpace : activeSpace === "bottom" ? bottomSpace : null

  useEffect(() => {
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) meta.setAttribute("content", showHome ? "#191917" : "#ffffff")
  }, [showHome])

  async function generateSpace(slot: "top" | "bottom") {
    const spaceId = slot === "top" ? "italy-trip" : "haus-hoffmann"
    const setState = slot === "top" ? setTopSpace : setBottomSpace
    const existing = slot === "top" ? topSpace : bottomSpace

    // Already generated — just navigate to it
    if (existing.spaceTree) {
      setActiveSpace(slot)
      return
    }

    setState(s => ({ ...s, loading: true }))
    setError(null)

    // Fire header generation in parallel — failure is non-fatal
    fetch("/api/generate-header", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ spaceId }),
    })
      .then(r => (r.ok ? r.json() : Promise.reject()))
      .then(data => setState(s => ({ ...s, headerTree: data.header_tree, generation: s.generation + 1 })))
      .catch(() => console.error("Header generation failed"))

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ spaceId }),
      })
      if (!response.ok) throw new Error("Generation failed")
      const data = await response.json()
      setState(s => ({ ...s, spaceTree: data.space_tree, generation: s.generation + 1, loading: false }))
      setActiveSpace(slot)
    } catch (err) {
      console.error("Space generation failed", err)
      setError("Space could not be generated.")
      setState(s => ({ ...s, loading: false }))
    }
  }

  function goHome() {
    spaceSlotRef.current?.scrollTo({ top: 0, behavior: "instant" })
    setActiveSpace(null)
  }

  return (
    <>
      {/* Desktop dev controls — hidden on mobile via media query */}
      <div className="button-stack">
        {showHome ? (
          <>
            <Button
              size="large"
              style="primary"
              label="Italy Trip"
              state={topSpace.loading ? "loading" : "default"}
              onClick={() => generateSpace("top")}
            />
            <Button
              size="large"
              style="primary"
              label="Haus Hoffmann"
              state={bottomSpace.loading ? "loading" : "default"}
              onClick={() => generateSpace("bottom")}
            />
          </>
        ) : (
          <Button size="large" style="secondary" label="Back to Home" onClick={goHome} />
        )}
      </div>

      <div className="device-frame">
        {showHome ? (
          <HomeScreen
            onGenerateTop={() => generateSpace("top")}
            onGenerateBottom={() => generateSpace("bottom")}
            topLoading={topSpace.loading}
            bottomLoading={bottomSpace.loading}
          />
        ) : (
          <div className="space-slot" ref={spaceSlotRef}>
            <Header className={`header--compact${currentSlot?.headerTree ? "" : " header--no-border"}`}>
              <div className="header-frame">
                <div className="header-slot">
                  {currentSlot?.headerTree && (
                    <HeaderView
                      key={`header-${activeSpace}-${currentSlot.generation}`}
                      tree={currentSlot.headerTree}
                    />
                  )}
                </div>
              </div>
            </Header>

            {error && <div className="space-error">{error}</div>}
            {currentSlot?.loading && <div className="space-loading">Generating Space…</div>}
            {currentSlot?.spaceTree && !currentSlot.loading && (
              <>
                <SpaceView
                  key={`space-${activeSpace}-${currentSlot.generation}`}
                  tree={currentSlot.spaceTree}
                />
                <p className="space-ai-caption">
                  This is an Emerging Space with AI generated content.
                  <br />
                  AI can make mistakes.
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </>
  )
}
