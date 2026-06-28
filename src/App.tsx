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

function HomeScreen({ onGenerate, loading }: { onGenerate: () => void; loading: boolean }) {
  return (
    <div className="home-screen">
      <div className="home-screen__title">
        <p className="home-screen__title-main">Temporary Spaces</p>
        <p className="home-screen__title-sub">everything is silent</p>
      </div>
      <div className="home-screen__center">
        <button
          className={`home-screen__bubbles${loading ? " home-screen__bubbles--loading" : ""}`}
          onClick={onGenerate}
          disabled={loading}
          aria-label="Generate Space"
        >
          <img src="/bubbles.png" alt="" draggable={false} />
        </button>
      </div>
      <p className={`home-screen__loading${loading ? " home-screen__loading--visible" : ""}`}>
        Generating Space…
      </p>
    </div>
  )
}

export function App() {
  const [spaceTree, setSpaceTree] = useState<GenResult | null>(null)
  const [headerTree, setHeaderTree] = useState<GenResult | null>(null)
  const [loadingSpace, setLoadingSpace] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [generation, setGeneration] = useState(0)
  const [headerGeneration, setHeaderGeneration] = useState(0)
  const spaceSlotRef = useRef<HTMLDivElement>(null)

  async function generateSpace() {
    setLoadingSpace(true)
    setError(null)

    // Fire header generation in parallel — failure is non-fatal
    fetch("/api/generate-header", { method: "POST" })
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(data => {
        setHeaderTree(data.header_tree)
        setHeaderGeneration(g => g + 1)
      })
      .catch(() => console.error("Header generation failed"))

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

  function restartInteractions() {
    if (!spaceTree) return
    spaceSlotRef.current?.scrollTo({ top: 0, behavior: "instant" })
    setGeneration(g => g + 1)
  }

  const generated = !!spaceTree && !loadingSpace
  const showHome = !spaceTree

  useEffect(() => {
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) meta.setAttribute("content", showHome ? "#191917" : "#ffffff")
  }, [showHome])

  return (
    <>
      {/* Desktop dev controls — hidden on mobile via media query */}
      <div className="button-stack">
        {!generated && (
          <Button size="large" style="primary" label="Generate Space" state={loadingSpace ? "loading" : "default"} onClick={generateSpace} />
        )}
        {generated && (
          <Button size="large" style="secondary" label="Restart" onClick={restartInteractions} />
        )}
      </div>

      <div className="device-frame">
        {showHome ? (
          <HomeScreen onGenerate={generateSpace} loading={loadingSpace} />
        ) : (
          <div className="space-slot" ref={spaceSlotRef}>
            <Header className={`header--compact${headerTree ? "" : " header--no-border"}`}>
              <div className="header-frame">
                <div className="header-slot">
                  {headerTree && <HeaderView key={`header-${headerGeneration}`} tree={headerTree} />}
                </div>
              </div>
            </Header>

            {error && <div className="space-error">{error}</div>}
            {spaceTree && !loadingSpace && (
              <>
                <SpaceView key={`space-${generation}`} tree={spaceTree} />
                <p className="space-ai-caption">This is an Emerging Space with AI generated content.<br />AI can make mistakes.</p>
              </>
            )}
          </div>
        )}
      </div>
    </>
  )
}
