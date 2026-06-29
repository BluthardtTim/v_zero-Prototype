import { createServer } from "http"
import { format } from "util"
import { assembleContext } from "./assemble"
import { classifyContext } from "./classify"
import { generateUI } from "./genui"
import { contexts } from "./contexts"
import { generateHeader } from "./genheader"

const port = Number(process.env.PORT) || 8787

function sendJson(res: import("http").ServerResponse, status: number, payload: unknown): void {
  const body = JSON.stringify(payload)
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  })
  res.end(body)
}

async function captureLogs<T>(run: () => Promise<T>): Promise<{ result: T; output: string }> {
  const originalLog = console.log
  const originalWarn = console.warn
  const originalError = console.error
  const lines: string[] = []

  const record = (...args: unknown[]) => {
    const line = format(...args)
    lines.push(line)
    originalLog(...args)
  }

  console.log = record
  console.warn = (...args: unknown[]) => {
    const line = format(...args)
    lines.push(line)
    originalWarn(...args)
  }
  console.error = (...args: unknown[]) => {
    const line = format(...args)
    lines.push(line)
    originalError(...args)
  }

  try {
    const result = await run()
    return { result, output: lines.join("\n") }
  } finally {
    console.log = originalLog
    console.warn = originalWarn
    console.error = originalError
  }
}

function readBody(req: import("http").IncomingMessage): Promise<Record<string, unknown>> {
  return new Promise(resolve => {
    let data = ""
    req.on("data", (chunk: Buffer) => { data += chunk.toString() })
    req.on("end", () => { try { resolve(JSON.parse(data)) } catch { resolve({}) } })
    req.on("error", () => resolve({}))
  })
}

const server = createServer(async (req, res) => {
  const method = req.method || "GET"

  try {
    const url = new URL(req.url || "/", `http://${req.headers.host}`)

    if (url.pathname === "/api/generate" && method === "POST") {
      const body = await readBody(req)
      const spaceId = typeof body.spaceId === "string" ? body.spaceId : "italy-trip"
      const ctx = contexts.find(c => c.id === spaceId) ?? contexts[0]

      const captured = await captureLogs(async () => {
        const blob = await assembleContext(ctx.searchQuery)
        const classified = classifyContext(blob)
        return generateUI(classified)
      })

      sendJson(res, 200, {
        space_tree:   captured.result.space_tree,
        raw_response: captured.result.raw_response,
        logs:         captured.output
      })
      return
    }

    if (url.pathname === "/api/generate-header" && method === "POST") {
      const body = await readBody(req)
      const spaceId = typeof body.spaceId === "string" ? body.spaceId : "italy-trip"
      const headerContext = contexts.find(c => c.id === spaceId)

      if (!headerContext) {
        sendJson(res, 500, { error: `Unknown header context: ${spaceId}` })
        return
      }

      const captured = await captureLogs(async () => generateHeader(headerContext))

      sendJson(res, 200, {
        header_tree:  captured.result.header_tree,
        raw_response: captured.result.raw_response,
        logs:         captured.output
      })
      return
    }

    sendJson(res, 405, { error: "Method not allowed" })
  } catch (error) {
    console.error("Server error", error)
    sendJson(res, 500, { error: "Server error" })
  }
})

server.listen(port, () => {
  console.log(`Space Generator API running at http://localhost:${port}`)
})
