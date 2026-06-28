import type { IncomingMessage, ServerResponse } from "http"
import { assembleContext } from "../server/assemble"
import { classifyContext } from "../server/classify"
import { generateUI } from "../server/genui"

const HARDCODED_CONTEXT_QUERY = "Italy Trip summer group of friends"

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
    const blob = await assembleContext(HARDCODED_CONTEXT_QUERY)
    const classified = classifyContext(blob)
    const result = await generateUI(classified)
    sendJson(res, 200, {
      space_tree: result.space_tree,
      raw_response: result.raw_response
    })
  } catch (error) {
    console.error("Generate error", error)
    sendJson(res, 500, { error: "Server error" })
  }
}
