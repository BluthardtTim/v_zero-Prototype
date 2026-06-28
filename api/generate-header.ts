import type { IncomingMessage, ServerResponse } from "http"
import { contexts } from "../server/contexts"
import { generateHeader } from "../server/genheader"

const HARDCODED_HEADER_CONTEXT_ID = "italy-trip"

function sendJson(res: ServerResponse, status: number, payload: unknown): void {
  const body = JSON.stringify(payload)
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  })
  res.end(body)
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  if (req.method !== "POST") {
    return sendJson(res, 405, { error: "Method not allowed" })
  }

  try {
    const headerContext = contexts.find(c => c.id === HARDCODED_HEADER_CONTEXT_ID)
    if (!headerContext) {
      return sendJson(res, 500, { error: `Unknown header context: ${HARDCODED_HEADER_CONTEXT_ID}` })
    }

    const result = await generateHeader(headerContext)
    sendJson(res, 200, {
      header_tree: result.header_tree,
      raw_response: result.raw_response
    })
  } catch (error) {
    console.error("Generate header error", error)
    sendJson(res, 500, { error: "Server error" })
  }
}
