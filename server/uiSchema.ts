import { z } from "zod"

/**
 * Declarative interaction vocabulary that replaces v01's inline <script> tags.
 * Any event-prop value (onClick, onChange, onSelect, onDismiss, onBack) may be
 * an UIAction instead of a function — the renderer turns it into a real dispatch call.
 */
export const ActionSchema = z.object({
  action: z.enum(["toggle", "set"]),
  key:    z.string(),
  value:  z.union([z.string(), z.number(), z.boolean()]).optional()
})
export type UIAction = z.infer<typeof ActionSchema>

/** Conditional rendering: a node only renders while state[key] === equals. */
export const ShowIfSchema = z.object({
  key:    z.string(),
  equals: z.union([z.string(), z.number(), z.boolean()])
})
export type ShowIf = z.infer<typeof ShowIfSchema>

/**
 * A node is a flat object: "type", "children", and "showIf" are reserved keys,
 * every other key is a prop passed straight to that component (matching how
 * PEBBLE_COMPONENT_REFERENCE documents props — no separate nested "props" wrapper,
 * since models reliably write components flat but not reliably through a wrapper).
 */
export interface UINode {
  type:      string
  children?: UINode[] | string
  showIf?:   ShowIf
  [prop: string]: unknown
}

export const UINodeSchema: z.ZodType<UINode> = z.lazy(() =>
  z.object({
    type:     z.string(),
    children: z.union([z.array(UINodeSchema), z.string()]).optional(),
    showIf:   ShowIfSchema.optional()
  }).catchall(z.unknown())
) as z.ZodType<UINode>

export const GenResultSchema = z.object({
  initialState: z.record(z.string(), z.union([z.boolean(), z.number(), z.string()])).optional(),
  root:         UINodeSchema
})
export type GenResult = z.infer<typeof GenResultSchema>

/**
 * Hand-written JSON Schema mirroring GenResultSchema above, used as the Anthropic
 * tool input_schema so the model is forced (via tool_choice) to emit exactly this shape.
 */
export const UI_TREE_TOOL_INPUT_SCHEMA = {
  type: "object",
  properties: {
    initialState: {
      type: "object",
      description: "Initial values for any state keys referenced by toggle/set actions or showIf checks in the tree.",
      additionalProperties: { type: ["boolean", "number", "string"] }
    },
    root: { $ref: "#/$defs/uiNode" }
  },
  required: ["root"],
  $defs: {
    uiNode: {
      type: "object",
      description: "A flat object. \"type\", \"children\", and \"showIf\" are reserved; every other key is a prop passed directly to the named component, exactly matching the prop names in the component reference (e.g. a Text node is { type: \"Text\", level: \"body\", children: \"...\" } — level is a top-level key, never nested under a separate props object).",
      properties: {
        type: {
          type: "string",
          description: "A component name from the reference below, or one of the local primitives (SpaceContainer, SectionBlock, SectionHeadline, Text, Headline)."
        },
        children: {
          description: "Either an array of nested uiNode children, or a plain string for components whose children is text content.",
          anyOf: [
            { type: "array", items: { $ref: "#/$defs/uiNode" } },
            { type: "string" }
          ]
        },
        showIf: {
          type: "object",
          description: "Render this node only while state[key] === equals.",
          properties: {
            key:    { type: "string" },
            equals: { type: ["string", "number", "boolean"] }
          },
          required: ["key", "equals"]
        }
      },
      required: ["type"],
      additionalProperties: true
    }
  }
} as const
