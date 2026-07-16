import type { IncomingMessage, ServerResponse } from "http"
import { contexts } from "../server/contexts"
import { generateHeader } from "../server/genheader"
import { captureLogs } from "../server/captureLogs"

function sendJson(res: ServerResponse, status: number, payload: unknown): void {
  const body = JSON.stringify(payload)
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  })
  res.end(body)
}

function readBody(req: IncomingMessage): Promise<Record<string, unknown>> {
  return new Promise(resolve => {
    let data = ""
    req.on("data", (chunk: Buffer) => { data += chunk.toString() })
    req.on("end", () => { try { resolve(JSON.parse(data)) } catch { resolve({}) } })
    req.on("error", () => resolve({}))
  })
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  if (req.method !== "POST") {
    return sendJson(res, 405, { error: "Method not allowed" })
  }

  try {
    const body = await readBody(req)
    const spaceId = typeof body.spaceId === "string" ? body.spaceId : "italy-trip"
    const headerContext = contexts.find(c => c.id === spaceId)

    if (!headerContext) {
      return sendJson(res, 500, { error: `Unknown header context: ${spaceId}` })
    }

    const captured = await captureLogs(async () => generateHeader(headerContext))
    sendJson(res, 200, {
      header_tree: captured.result.header_tree,
      raw_response: captured.result.raw_response,
      logs: captured.output
    })
  } catch (error) {
    console.error("Generate header error", error)
    sendJson(res, 500, { error: "Server error" })
  }
}
