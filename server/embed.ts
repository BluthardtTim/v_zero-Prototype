import { VoyageAIClient } from "voyageai"
import { config } from "dotenv"

config()

const voyage = new VoyageAIClient({ apiKey: process.env.VOYAGE_API_KEY })

export async function embed(text: string): Promise<number[]> {
  const response = await voyage.embed({ input: text, model: "voyage-3" })
  return response.data![0].embedding!
}
