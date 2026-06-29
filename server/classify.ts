import type { ContextBlob, ResolvedContext } from "./assemble"

export interface ClassifiedContext {
  finance?:  ResolvedContext[]
  images?:   ResolvedContext[]
  chats?:    ResolvedContext[]
  contacts?: ResolvedContext[]
  files?:    ResolvedContext[]
  map?:      ResolvedContext[]
  notes?:    ResolvedContext[]
  articles?: ResolvedContext[]
  calendar?: ResolvedContext[]
}

export function classifyContext(blob: ContextBlob): ClassifiedContext {
  const classified: ClassifiedContext = {}

  for (const event of blob.relevant_context) {
    const bucket = classified[event.type] ?? (classified[event.type] = [])
    bucket.push(event)
  }

  console.log("\n--- Classified Context ---")
  for (const [type, items] of Object.entries(classified)) {
    console.log(`  ${type}: ${items!.length} event(s)`)
  }
  console.log("--- End Classified Context ---\n")

  return classified
}
