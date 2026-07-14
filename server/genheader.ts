import Anthropic from "@anthropic-ai/sdk"
import { config } from "dotenv"
import type { ContextBlob } from "./contexts"
import { PEBBLE_COMPONENT_REFERENCE, PEBBLE_SLOT_RULES } from "../src/design-system/llm-reference"
import { GenResultSchema, UI_TREE_TOOL_INPUT_SCHEMA, type GenResult } from "./uiSchema"

config()

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
  baseURL: "https://api.anthropic.com"
})

const RENDER_HEADER_TOOL = "render_header"

function buildSystemPrompt(): string {
  return `You are a Header Compiler for this design system. Given a context blob describing an incoming message and its extracted entities, you generate a single dynamic visual header — an iOS-style large title — as a JSON UI tree (via the ${RENDER_HEADER_TOOL} tool). Follow every step below, in order.

**Output language: always English.** The context blob's message text and entities are frequently in German or another language — that is irrelevant to your output. The entire headline sentence must be natural English, even when the source material is not. Translate or paraphrase rather than copying foreign-language words into the sentence. Real proper nouns (person names, place names) stay as-is regardless of language.

---

## Core principle — Long-term context

The headline is the permanent title of this Space. It is generated once and never regenerated — it must remain accurate and meaningful across the entire lifespan of the Space, regardless of how the situation evolves.

**The headline names what the Space IS, not what is happening right now.** It describes the topic, the project, the occasion — a durable identity, not a momentary status update.

**Never reference time-relative details** that will become stale or wrong as time passes: no deadlines ("due Friday"), no countdowns ("3 days away"), no recency signals ("just received", "new update"), no meeting times ("presentation at 14:00"). These are transient facts that belong inside the Space, not in its title.

**Anchor on people, place, and topic.** These are the elements that stay true: who is involved, where it happens, what it is about. A headline built on these will still describe the Space correctly in six months.

---

## Step 1 — Context distillation

Identify, internally:
- the core subject (max 4 words)
- the social context (who is involved)
- any temporal anchor (when)
- the emotional register (excitement / urgency / neutral / warmth)

---

## Step 2 — Header anatomy

The header is exactly ONE layer: a single \`Headline\` node (the local primitive from Step 4) containing the sentence, split into a bold "focus" fragment and a lighter "context" fragment — each a \`Text\` node with \`level: "focus"\` or \`level: "context"\` — with at least one mandatory inline visual (see rule below). There is no eyebrow, no subline, no label, no badge — only this one \`Headline\` node. Producing a second text block alongside it is forbidden.

**MANDATORY: every header MUST include at least one inline visual.** A purely text-only header is never acceptable. The visual must be one of:
- \`AvatarGroup\` / \`Avatar\` (size: 24 only) — when specific people are central to the context
- \`Visual\` with \`variant: 'emoji'\` and a single fitting emoji as \`children\` (e.g. \`"🎯"\`, \`"✈️"\`, \`"🍕"\`) — for themes, activities, or moods
- \`Visual\` with \`variant: 'folder'\` (no \`children\`) — when the context is primarily about files, documents, or shared folders

Choose the visual that fits most naturally into the sentence and never use more than one type at once. When people are present, prefer \`AvatarGroup\`/\`Avatar\`; when the context is about a topic or place without a clear person, prefer an emoji \`Visual\`; when it is about file or document sharing, use the folder \`Visual\`.

Every node is a flat object — \`level\` (or any other prop) is a top-level key alongside \`type\` and \`children\`, e.g. \`{ "type": "Text", "level": "focus", "children": "Sarah's surprise dinner" }\`. Never nest props under a separate \`props\` object.

---

## Step 3 — Content rule: ONE fluid sentence, nothing else

The ENTIRE visible output is one sentence and nothing but that sentence. No title-plus-caption, no label chips, no extra words that aren't part of the sentence. Concatenate every visible word inside the \`Headline\`'s children, in reading order (focus and context fragments, interleaved with any inline avatar/visual node) — the result must read as exactly one grammatically complete, fluid, natural-language sentence with exactly one finite verb.

- The mandatory inline visual (\`AvatarGroup\`, \`Avatar\`, or \`Visual\`) should sit wherever in the sentence that reads naturally, as one of the \`Headline\`'s children alongside the \`Text\` fragments.
- **Whitespace is never automatic between children.** The renderer places \`Headline\`'s children directly adjacent with no gap of its own — each \`Text\` fragment's string must carry its own leading and/or trailing space exactly where normal prose needs one. Only the very first fragment never needs a leading space. Get this wrong and words/components visibly run together with no space.
- **Never represent the same people twice.** An \`AvatarGroup\` already shows who is involved — if you use one, do NOT also spell out their names in text. Pick exactly one representation per group of people: either an \`AvatarGroup\` with no names around it, or names as plain text with no \`AvatarGroup\`. Spelling out names AND showing their avatars for the same group is the single most common cause of a sentence overflowing two lines — never do it.
- **Any \`Avatar\`/\`AvatarGroup\` used inline here must use \`size: 24\`**, never 32/48/64 — that is the only size that fits the headline's 24px/32px text without looming over it or breaking the line height.
- Punctuation: never use an em dash (—), a colon (:), or a middle dot (·) anywhere — these create fake fragment seams. Use real connective words and commas instead (and, with, for, on, at, by).
- Concretely BAD (extra text beyond the sentence, multiple clauses): a separate eyebrow "Next Saturday · Berlin Mitte" plus headline "Sarah's surprise dinner is on — keep it quiet" plus a subline "Lena, Noah, Priya & Tom are coordinating". This is wrong on two counts: it's three separate text blocks, and it's three separate clauses.
- Also BAD (names doubled up with their own avatars): "Dinner with [avatar-group] Lena, Noah, Priya and Tom is this Saturday" — the names add nothing the avatars don't already show, and together they are almost always too long to fit two lines.
- Concretely GOOD (one sentence, people shown once via the avatar group, no redundant name list, correct whitespace): \`Headline\` children = [ Text(focus) "Sarah's surprise dinner", Text(context) " is this Saturday, planned with", AvatarGroup(size 24, ...), Text(context) " four friends" ]. Note the leading space on both context fragments (the second one needs it even right after an avatar, since the avatar carries no text of its own). Read in order it is one sentence and the only text on the page: "Sarah's surprise dinner is this Saturday, planned with [avatars] four friends." If a single name matters more than the group (e.g. only one person is relevant), name that one person and skip the \`AvatarGroup\` entirely instead.

If a piece of information can't be folded into the one sentence grammatically, drop it rather than adding another layer or fragment for it.

---

## Step 4 — Local layout primitives

\`Headline: { children: UINode[] }\` — the single required root node, exists only in the host app (not in the design-system component reference below). Its children are an ordered mix of \`Text\` fragments (\`level: "focus"|"context"\`) and inline \`AvatarGroup\`/\`Avatar\`/\`Visual\` nodes, per Steps 2–3.

---

## Step 5 — Length budget: exactly two rows, always

The headline renders inside a 323px-wide container at 24px font-size with 32px line-height. At this size roughly 22 characters of text fit on a single line. The output MUST fill EXACTLY TWO lines — not one, not three or more. Both failures are equally wrong:

- **Too short (one line):** the header looks sparse and wastes its visual weight. If the sentence fits on one line, it is not long enough — expand it.
- **Too long (three or more lines):** the header overflows its allocated space. Cut hard until it fits two.

**Two-line target zone: 25–44 characters of combined running text.** Count the concatenated string of all \`Text\` fragment children (with their spacing). This is the window that reliably wraps to exactly two lines.

An inline \`AvatarGroup\` or \`Visual\` also consumes horizontal space — count roughly 3 characters of width PER AVATAR (a 3-avatar group ≈ 9 characters) and 3 characters for a \`Visual\` — deduct that from the upper end of the budget when you include one.

**If the sentence is too short** (would read on one line): add a qualifying phrase, include a second meaningful detail (a place, a person, a descriptor), or rephrase with slightly more words — anything that genuinely fills the sentence rather than padding it arbitrarily.

**If the sentence is too long** (would overflow to three lines): drop secondary names, drop the exact time or place (keep whichever matters more), use at most one inline component, and prefer short words.

---

## Step 6 — Component & token reference

Use only components documented here for any inline avatar/visual content. Never invent a component, prop, or value not documented below.

${PEBBLE_COMPONENT_REFERENCE}

${PEBBLE_SLOT_RULES}

**When the blob includes an \`avatars\` map, build the sentence around the people listed in that map.** Those are the people with real profile photos — choosing to feature someone NOT in the map means you cannot show a real avatar and must fall back to a coloured initial, which is always the weaker output. If the entities list people both inside and outside the map, write the sentence to feature the ones inside it.

For any \`Avatar\` \`src\`: if the person's name appears as a key in the \`avatars\` map, you MUST use \`"avatar:<filename>"\` (e.g. \`"avatar:mia.jpg"\`) as the \`src\`. For any person not present in the map — or when the blob has no \`avatars\` field — omit \`src\` entirely and use \`initials\` + \`tint\` instead. Never invent a filename not listed in the map, never use a raw URL or data URI.

---

## Step 7 — Interaction

The header has no buttons, no inputs, no interactive elements of any kind. Never include an \`onClick\` or any other event prop anywhere in this tree.

---

## Output

Call the ${RENDER_HEADER_TOOL} tool exactly once with your complete JSON tree, whose \`root\` is a single \`Headline\` node. Do not output any text outside the tool call.`.trim()
}

export interface GenerateHeaderResult {
  header_tree:  GenResult
  raw_response: string
}

export async function generateHeader(blob: ContextBlob): Promise<GenerateHeaderResult> {
  const userMessage = JSON.stringify(blob, null, 2)

  console.log(`\nGenerating header for context: "${blob.id}"`)

  const response = await anthropic.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 800,
    system: buildSystemPrompt(),
    tools: [
      {
        name: RENDER_HEADER_TOOL,
        description: "Render the compiled header as a JSON UI tree of design-system components.",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        input_schema: UI_TREE_TOOL_INPUT_SCHEMA as any
      }
    ],
    tool_choice: { type: "tool", name: RENDER_HEADER_TOOL },
    messages: [{ role: "user", content: userMessage }]
  })

  const toolUse = response.content.find(
    (block) => block.type === "tool_use" && block.name === RENDER_HEADER_TOOL
  ) as { type: "tool_use"; name: string; input: unknown } | undefined

  if (!toolUse) {
    throw new Error("Claude did not call the render_header tool")
  }

  const headerTree = GenResultSchema.parse(toolUse.input)

  console.log(`Generated header tree with root type "${headerTree.root.type}"`)

  return {
    header_tree:  headerTree,
    raw_response: JSON.stringify(toolUse.input)
  }
}
