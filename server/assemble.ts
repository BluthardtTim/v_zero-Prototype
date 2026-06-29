import { embed }         from "./embed"
import { searchContext } from "./search"
import type { EventType } from "./events"

export interface ResolvedContext {
  type:       EventType
  similarity: number
  content:    string
  entities:   Record<string, unknown>
  raw_ref:    Record<string, unknown>
}

export interface ContextBlob {
  query:            string
  relevant_context: ResolvedContext[]
  assembled_at:     string
  match_count:      number
}

export async function assembleContext(query: string): Promise<ContextBlob> {

  console.log(`\nAssembling context for: "${query.slice(0, 80)}..."`)

  const queryEmbedding = await embed(query)
  console.log(`Embedding generated (${queryEmbedding.length} dims)`)

  const allMatches = await searchContext(queryEmbedding, 0.28, 25)

  // Dynamic cutoff: keep events at 50%+ of the top score (tested to separate project vs noise cleanly)
  const topScore = allMatches[0]?.similarity ?? 0
  const cutoff   = topScore * 0.50
  const matches  = allMatches.filter(m => m.similarity >= cutoff)

  console.log(`Found ${allMatches.length} raw matches, ${matches.length} after cutoff (top: ${topScore.toFixed(3)}, cutoff: ${cutoff.toFixed(3)})`)

  matches.forEach(m => {
    const filled = Math.round(m.similarity * 12)
    const bar    = "█".repeat(filled) + "░".repeat(12 - filled)
    console.log(`  ${bar} [${m.similarity.toFixed(3)}] ${m.type} — ${m.id}`)
    console.log(`         ${m.content.slice(0, 70)}`)
  })

  const resolved = matches.map((m): ResolvedContext => ({
    type:       m.type,
    similarity: Math.round(m.similarity * 1000) / 1000,
    content:    m.content,
    entities:   m.entities,
    raw_ref:    m.raw_ref
  }))

  const blob: ContextBlob = {
    query,
    relevant_context: resolved,
    assembled_at:      new Date().toISOString(),
    match_count:       resolved.length
  }

  console.log("\n--- Context Blob ---")
  console.log(JSON.stringify(blob, null, 2))
  console.log("--- End Context Blob ---\n")

  return blob
}
