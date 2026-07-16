import { useRef, useState, useEffect } from "react"
import { LineSegments, Faders } from "@phosphor-icons/react"
import { Header } from "./design-system"
import { RenderNode, useUITree } from "./space/renderer"
import type { GenResult } from "./space/types"
import "./App.css"
import "./screens/screens.css"

function SpaceView({ tree }: { tree: GenResult }) {
  const [state, dispatch] = useUITree(tree.initialState)
  return <RenderNode node={tree.root} state={state} dispatch={dispatch} />
}

function HeaderView({ tree }: { tree: GenResult }) {
  const [state, dispatch] = useUITree(tree.initialState)
  return <RenderNode node={tree.root} state={state} dispatch={dispatch} />
}

function HomeScreen({
  onGenerate,
  loading,
}: {
  onGenerate: () => void
  loading: boolean
}) {
  return (
    <div className="home-screen">
      {loading ? (
        <div className="home-screen__loading">
          <div className="home-screen__spinner" />
        </div>
      ) : (
        <button className="home-screen__generate" onClick={onGenerate}>
          Generate
        </button>
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
const SPACE_ID = "italy-trip"

function ConsolePanel({ lines }: { lines: string[] }) {
  const bodyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = bodyRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [lines])

  return (
    <div className="console-panel">
      <div className="console-panel__body" ref={bodyRef}>
        {lines.length === 0 ? (
          <p className="console-panel__placeholder">// waiting for generation…</p>
        ) : (
          lines.map((line, i) => (
            <p key={i} className="console-panel__line">{line}</p>
          ))
        )}
      </div>
    </div>
  )
}

export function App() {
  const [space, setSpace] = useState<SpaceSlot>(EMPTY_SLOT)
  const [showHome, setShowHome] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [logs, setLogs] = useState<string[]>([])

  useEffect(() => {
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) meta.setAttribute("content", showHome ? "#191917" : "#ffffff")
  }, [showHome])

  function appendLogs(raw: string) {
    const parsed = raw.split("\n").filter(line => line.length > 0)
    if (parsed.length > 0) setLogs(prev => [...prev, ...parsed])
  }

  async function generateSpace() {
    // Already generated — just navigate to it
    if (space.spaceTree) {
      setShowHome(false)
      return
    }

    setSpace(s => ({ ...s, loading: true }))
    setError(null)
    setLogs([])

    // Fire header generation in parallel — failure is non-fatal
    fetch("/api/generate-header", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ spaceId: SPACE_ID }),
    })
      .then(r => (r.ok ? r.json() : Promise.reject()))
      .then(data => {
        appendLogs(data.logs)
        setSpace(s => ({ ...s, headerTree: data.header_tree, generation: s.generation + 1 }))
      })
      .catch(() => console.error("Header generation failed"))

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ spaceId: SPACE_ID }),
      })
      if (!response.ok) throw new Error("Generation failed")
      const data = await response.json()
      appendLogs(data.logs)
      setSpace(s => ({ ...s, spaceTree: data.space_tree, generation: s.generation + 1, loading: false }))
      setShowHome(false)
    } catch (err) {
      console.error("Space generation failed", err)
      setError("Space could not be generated.")
      setSpace(s => ({ ...s, loading: false }))
    }
  }

  return (
    <>
      <div className="desktop-stage">
        <ConsolePanel lines={logs} />

        <div className="phone-mockup">
          <img
            src="/device-frame.png"
            alt=""
            className="phone-mockup__chrome"
            draggable={false}
          />

          <div className="device-frame">
            {showHome ? (
              <HomeScreen onGenerate={generateSpace} loading={space.loading} />
            ) : (
              <div className="space-slot">
                <Header className={`header--compact${space.headerTree ? "" : " header--no-border"}`}>
                  <div className="header-frame">
                    {/* Figma node 114:641 / 114:646 — LineSegments + Faders icon buttons */}
                    <div className="header-icons">
                      <button type="button" className="header-icon-btn" aria-label="Connections">
                        <LineSegments size={20} weight="regular" color="#0D0D0C" />
                      </button>
                      <button type="button" className="header-icon-btn" aria-label="Filters">
                        <Faders size={20} weight="regular" color="#0D0D0C" />
                      </button>
                    </div>
                    <div className="header-slot">
                      {space.headerTree && (
                        <HeaderView
                          key={`header-${space.generation}`}
                          tree={space.headerTree}
                        />
                      )}
                    </div>
                  </div>
                </Header>

                {error && <div className="space-error">{error}</div>}
                {space.loading && <div className="space-loading">Generating Space…</div>}
                {space.spaceTree && !space.loading && (
                  <>
                    <SpaceView
                      key={`space-${space.generation}`}
                      tree={space.spaceTree}
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
        </div>
      </div>
    </>
  )
}
