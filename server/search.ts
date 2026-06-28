import { createClient } from "@supabase/supabase-js"
import { config } from "dotenv"
import type { EventType } from "./events"

config()

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
)

export interface ContextMatch {
  id:         string
  type:       EventType
  content:    string
  entities:   Record<string, unknown>
  raw_ref:    Record<string, unknown>
  similarity: number
}

export async function searchContext(
  queryEmbedding: number[],
  threshold = 0.30,
  limit = 12
): Promise<ContextMatch[]> {
  const { data, error } = await supabase.rpc("match_space_events", {
    query_embedding: queryEmbedding,
    match_threshold: threshold,
    match_count:     limit
  })

  if (error) throw new Error(`Vector search failed: ${error.message}`)
  return data as ContextMatch[]
}
