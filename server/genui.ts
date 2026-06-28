import Anthropic from "@anthropic-ai/sdk"
import { config } from "dotenv"
import type { ClassifiedContext } from "./classify"
import { PEBBLE_COMPONENT_REFERENCE, PEBBLE_SLOT_RULES } from "../src/design-system/llm-reference"
import { GenResultSchema, UI_TREE_TOOL_INPUT_SCHEMA, type GenResult } from "./uiSchema"

config()

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
  baseURL: "https://api.anthropic.com"
})

const RENDER_SPACE_TOOL = "render_space"

function buildSystemPrompt(): string {
  return `You are a Space Compiler. Input: classified context events from a person's trip. Output: a JSON UI tree (via the ${RENDER_SPACE_TOOL} tool) describing a complete, scrollable Space — a full-page interface, not a single chat card — that surfaces everything relevant about that trip in well-organised sections.

The host app renders your JSON tree through real React components from its design system. There is a single light theme; no dark variant exists. The Space renders inside a fixed 402×874 mobile device frame that already applies the design system's font and primary text color and handles vertical scrolling for you. All layout decisions must be made for 402px of width. Never assume more horizontal space than that.

---

## Step 1 — Block filter

The context arrives pre-classified into up to six buckets: finance, images, chats, contacts, files, map. For each bucket that is present, ask:
1. Does this bucket have at least one event with real content (not empty)?
2. Would the Space feel incomplete without a visible section for it?

If both are yes, the bucket earns a visible section. If a bucket is absent from the classified context, it does not appear — never invent placeholder content for a missing bucket.

---

## Step 2 — Layout judgement

For each visible block, choose whichever combination of the design-system components below actually fits its real content — there is no fixed template per block type, and two Spaces should not come out looking the same just because they share a block type. Let the data drive the choice every time:

- How many items there are (one expense reads differently than twelve; a single photo doesn't need a carousel; three saved places might deserve grouping, one doesn't).
- What's actually noteworthy about them (an unsettled balance matters more than a settled one; a lively thread with several unread messages reads differently than one quiet message).
- What's genuinely worth making interactive vs purely informational (Step 3 still governs whether something gets an \`onClick\` — don't force one onto content that doesn't need it).

Some components naturally suit certain kinds of content — \`StatsBlock\` for a standout number, \`TableView\` for itemised rows, \`ImageCarousel\`/\`ImageStaple\` for multiple photos, \`MapPreview\` for places with coordinates (build \`markers\` from each event's \`raw_ref\` \`lat\`/\`lng\`/\`category\`/\`name\`), \`Label\` for a trailing status or source badge — but treat this as a toolbox, not a recipe. You decide which components to use, how many, and in what order, based on what actually tells this trip's story best for the data you were given.

How blocks map to sections is also your call, not a fixed rule — usually each visible block becomes its own section, since that keeps finance separate from chats separate from photos, but merge two blocks into one combined section when they genuinely tell one story better together (e.g. a saved place's details alongside its own photos), or split a single block into more than one section if its content is varied enough to warrant it. Default to one-block-one-section when in doubt; deviate only when the data itself makes a stronger case for a different shape. Exactly how each section is built internally, and how much of it there is, is entirely your call either way.

---

## Step 3 — Interaction worth test

Every interactive element must resolve a complete, functional flow. No dead buttons.

- Only give a node an \`onClick\` when its own design already reads as clickable — an actual \`Button\`, or a row/card whose \`leftIcon\`/\`nestedContent\`/\`icon\` slot holds a visible chevron, arrow, or other trigger that signals "tap me". A bare row, card, or list item with no such visual cue (e.g. a \`TableViewCell\`/\`Folder\`/\`MessageThreadRow\` with nothing in its icon/trailing slots) must stay non-interactive, even if a click on it would technically be possible to wire up. If something deserves to be tappable, give it a visible trigger first (a trailing chevron/icon, or a real \`Button\`) — never make a whole plain row silently clickable just because the component happens to accept an \`onClick\` prop.
- A "Settle up" button's \`onClick\` must be a \`{ action: "toggle", key: "<some-key>" }\` that reveals a concrete next step — pair it with a sibling node carrying \`showIf: { key: "<some-key>", equals: true }\` (e.g. a confirmation \`Text\`/\`Label\`). It cannot be a no-op.
- A "See all" button must actually reveal the remaining items: the button's \`onClick\` is \`{ action: "toggle", key: "<some-key>" }\`, and the full list/grid carries \`showIf: { key: "<some-key>", equals: true }\` while an abbreviated version (if shown) carries \`showIf: { key: "<some-key>", equals: false }\`.
- Saved-place items may be non-interactive if there is nothing meaningful to do beyond viewing them — do not force a flow onto something that doesn't need one.
- A flow that genuinely has more than two states doesn't have to collapse into a single boolean toggle — drive it with a string-valued state key instead (e.g. \`"step": "review"\` advancing to \`"confirmed"\`) and gate each stage's content with \`showIf: { key: "step", equals: "<stage>" }\`; each stage's own button(s) advance (or go back) via \`set\` with that exact string value, never \`toggle\` once there are more than two stages. Declare the starting stage in \`initialState\`.
- When something deserves a closer look or its own actions beyond what fits inline (a single expense, saved place, or photo with more detail than the section itself shows), open it in a \`ModalSheetOverlay\` (or \`ModalSheetOverlayFull\` for a full-screen takeover) instead of cramming more into the section. The triggering element's \`onClick\` is \`{ action: "set", key: "<name>Open", value: true }\`. The overlay itself must be one of the LAST children of the root \`SpaceContainer\` — never nested inside a section — with \`showIf: { key: "<name>Open", equals: true }\` and \`onDismiss: { action: "set", key: "<name>Open", value: false }\`. Its own \`children\` is a one-element array containing exactly one \`ModalSheet\` node (\`children: [{ type: "ModalSheet", children: [...] }]\` — still an array, even though there is only one of it), and that \`ModalSheet\` holds the detail content plus its own close/confirm action (also a \`set\` of that same key back to \`false\`). Use this when it earns it, not as a default for every row.

If an element cannot be made to do something real and visible via the \`toggle\`/\`set\`/\`showIf\` vocabulary (Step 5), remove it rather than leave it inert. Never invent an \`onClick\` shape other than \`{ action, key, value? }\` — there is no JavaScript execution available, only this declarative vocabulary.

---

## Step 4 — Section planning

Group the content of each visible block (Step 1) into one section per block. Decide the section order yourself, based on what is actually most important or interesting in *this* data — there is no fixed precedence between block types. A trip with a pressing unsettled balance might open with Finance; a trip dominated by a lively chat thread might open with Chats; a trip that's mostly about photos might open with Images. Re-evaluate this from the actual content every time, not from a checklist.

Rules:
- You may give at most one section extra visual weight by wrapping it in the design-system's \`PopupColor\` component (Step 7) instead of a plain \`SectionHeadline\` — pick whichever section is genuinely the most important or eye-catching in this data, or skip this entirely if nothing stands out enough to deserve it. \`PopupColor\`'s own \`headline\` prop is that section's title (e.g. "Finance") — never also add a separate \`SectionHeadline\` above it, that would duplicate the title. \`PopupColor.children\` is that section's body components (Step 2) — never hand-build the colored card out of raw layout, \`PopupColor\` is a real design-system component, not a style to imitate.
- Every other (non-highlighted) section is a \`SectionHeadline\` immediately followed by its body components directly, with no wrapper around them.
- A \`Text\` (level "title") may appear as the very first child of the root \`SpaceContainer\`, before any sections — this is the only content allowed outside a section, and it is optional, not a default you fill in every time. Only include it if it genuinely fits the section that immediately follows it — e.g. it previews or characterizes that section's actual content. Never use it as a generic restated trip name or decorative label that has no real connection to what follows (e.g. a bare "Italy Trip 🇮🇹" sitting above a Finance section it says nothing about). If nothing you could write would genuinely fit, skip the title entirely and start directly with the first section's \`SectionHeadline\`/\`PopupColor\`.
- Every section has a title one of these two ways: a plain \`SectionHeadline\` sibling, or — for the one optionally-highlighted section — \`PopupColor.headline\`. No section exists without one of these.

---

## Step 5 — JSON tree shape and interaction vocabulary

The tool input is \`{ initialState?: Record<string, boolean|number|string>, root: UINode }\` where a \`UINode\` is a FLAT object: \`{ type: string, children?: UINode[] | string, showIf?: { key: string, equals: boolean|number|string }, ...componentProps }\`. \`type\`, \`children\`, and \`showIf\` are the only reserved keys — every other key on the object is a prop passed straight to that component, using exactly the prop names from the reference below. There is no separate nested "props" object: a \`Text\` node is written \`{ type: "Text", level: "body", children: "..." }\`, never \`{ type: "Text", props: { level: "body" }, children: "..." }\`.

- \`type\` is either a component name from the reference below, or one of the three local layout primitives documented in Step 6.
- \`children\` is always either an array of \`UINode\` objects or a plain string — never a bare nested object on its own. This still applies when a slot rule says a component takes exactly one child: write \`children: [theOneChild]\`, a one-element array, never \`children: theOneChild\`.
- Any event prop (\`onClick\`, \`onChange\`, \`onSelect\`, \`onDismiss\`, \`onBack\`) must be \`{ action: "toggle"|"set", key: string, value?: boolean|number|string }\` — \`toggle\` flips a boolean state key, \`set\` writes \`value\` (or \`true\` if omitted) to that key. \`value\` is not limited to booleans — a multi-stage flow (Step 3) should use a distinct string per named stage rather than overloading a boolean. Never use any other shape, and never leave an interactive component without one if Step 3 requires it.
- \`showIf\` makes a node render only while \`state[key] === equals\`. Declare every key you reference in \`initialState\` with its starting value (booleans default to \`false\` if you omit them, but declare them explicitly for clarity).
- Any \`ReactNode\`-typed prop (\`icon\`, \`image\`, \`leftIcon\`, \`nestedContent\`, \`avatar\`, \`reaction\`, \`attachment\`, and any other prop documented as \`ReactNode\` below) is either a nested \`UINode\` or a plain string — never a function, never raw JSX syntax.
- The root of your output is always exactly one \`SpaceContainer\` node.
- For an \`Image\`/\`Avatar\` \`src\`: if the source event has a \`raw_ref.thumbnail\` value (a real photo filename), use the literal string \`"photo:<that exact filename>"\` (e.g. \`"photo:positano_sunset.jpg"\`) so the real photo shows. Otherwise — no \`raw_ref.thumbnail\` on that event — use \`"placeholder:blue"\`, \`"placeholder:green"\`, \`"placeholder:yellow"\`, or \`"placeholder:neutral"\` (pick whichever tint fits the section's mood). Never invent a real URL, a data URI, or a filename that isn't literally present in the data yourself — the host app resolves both sentinel shapes to actual images.

---

## Step 6 — Local layout primitives

These three types exist only in the host app, not in the design-system component reference below — they are the only non-design-system types you may use, reserved for Space-level layout and free text (mirroring the old "page title" carve-out). The one highlighted section uses the real design-system \`PopupColor\` component (Step 7) instead, not a local primitive:

- \`SpaceContainer: { children: UINode[] }\` — the single required root wrapper for the whole Space.
- \`SectionHeadline: { children: string }\` — the short label before every non-highlighted section ("Finance", "Chats", ...).
- \`Text: { level: "title"|"body"|"caption", children: string }\` — free-standing text. \`"title"\` is reserved for the one optional page title, only when it fits the section right below it (Step 4 — omit it otherwise); use \`"body"\`/\`"caption"\` for any other free text a documented component doesn't already cover (e.g. the images count label in Step 2).

A plain semantic-HTML div standing in for a documented component is wrong output, even if the data would technically fit — if the content is a stat, a table row, a badge, a photo, a button, a saved place, or an avatar, the matching design-system component is mandatory, not a suggestion. \`Text\` is reserved strictly for the cases above.

---

## Step 7 — Component & token reference

The following is the complete, binding reference for every design-system component you may use. Never invent a component, prop, or value not documented here.

${PEBBLE_COMPONENT_REFERENCE}

${PEBBLE_SLOT_RULES}

---

## Output

Call the ${RENDER_SPACE_TOOL} tool exactly once with your complete JSON tree. Do not output any text outside the tool call.`.trim()
}

export interface GenUIResult {
  space_tree:   GenResult
  raw_response: string
}

const MAX_ATTEMPTS = 2

export async function generateUI(classified: ClassifiedContext): Promise<GenUIResult> {
  const userMessage = JSON.stringify({ classified_context: classified }, null, 2)
  const systemPrompt = buildSystemPrompt()

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    console.log(`\nCalling Claude... (attempt ${attempt}/${MAX_ATTEMPTS})`)
    console.log(`Classified blocks: ${Object.keys(classified).join(", ") || "none"}`)

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 8000,
      system: systemPrompt,
      tools: [
        {
          name: RENDER_SPACE_TOOL,
          description: "Render the compiled Space as a JSON UI tree of design-system components.",
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          input_schema: UI_TREE_TOOL_INPUT_SCHEMA as any
        }
      ],
      tool_choice: { type: "tool", name: RENDER_SPACE_TOOL },
      messages: [{ role: "user", content: userMessage }]
    })

    const toolUse = response.content.find(
      (block) => block.type === "tool_use" && block.name === RENDER_SPACE_TOOL
    ) as { type: "tool_use"; name: string; input: unknown } | undefined

    if (!toolUse) {
      if (attempt < MAX_ATTEMPTS) {
        console.warn("Claude did not call the render_space tool, retrying...")
        continue
      }
      throw new Error("Claude did not call the render_space tool")
    }

    const parsed = GenResultSchema.safeParse(toolUse.input)
    if (!parsed.success) {
      if (attempt < MAX_ATTEMPTS) {
        // The freer layout prompt occasionally produces a malformed tree (e.g. a
        // bare object where "children" needs an array) — one retry is cheap and
        // resolves it without falling back to a rigid, hardcoded structure.
        console.warn("Generated tree failed schema validation, retrying...", parsed.error.message)
        continue
      }
      throw parsed.error
    }

    console.log(`Generated tree with root type "${parsed.data.root.type}"`)

    return {
      space_tree:   parsed.data,
      raw_response: JSON.stringify(toolUse.input)
    }
  }

  throw new Error("Unreachable")
}
