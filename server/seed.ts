import { VoyageAIClient } from "voyageai"
import { createClient } from "@supabase/supabase-js"
import { config } from "dotenv"
import { events } from "./events"

config()

const voyage  = new VoyageAIClient({ apiKey: process.env.VOYAGE_API_KEY })
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
)

async function embed(text: string): Promise<number[]> {
  const response = await voyage.embed({ input: text, model: "voyage-3" })
  return response.data![0].embedding!
}

async function seed() {
  const filterIds = process.argv.slice(2)
  const target = filterIds.length > 0
    ? events.filter(e => filterIds.includes(e.id))
    : events

  if (filterIds.length > 0) {
    const missing = filterIds.filter(id => !events.find(e => e.id === id))
    if (missing.length > 0) console.warn(`  ⚠ IDs not found in events.ts: ${missing.join(", ")}`)
  }

  console.log(`Seeding ${target.length} event(s)${filterIds.length > 0 ? ` (filtered from ${events.length})` : ""}...`)

  for (let i = 0; i < target.length; i++) {
    const event = target[i]
    console.log(`[${i + 1}/${events.length}] ${event.type} — ${event.id}`)

    const embedding = await embed(event.content)

    const { error } = await supabase.from("space_context_events").upsert({
      id:        event.id,
      type:      event.type,
      content:   event.content,
      entities:  event.entities,
      raw_ref:   event.raw_ref,
      embedding
    })

    if (error) {
      console.error("  ✗ Fehler:", error.message)
    } else {
      console.log("  ✓ gespeichert")
    }

    await new Promise(r => setTimeout(r, 21_000))
  }

  console.log("\nDone.")
}

seed()
