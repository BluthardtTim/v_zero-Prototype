export type StateValue = boolean | number | string

export interface UIAction {
  action: "toggle" | "set"
  key:    string
  value?: StateValue
}

export interface ShowIf {
  key:    string
  equals: StateValue
}

export interface UINode {
  type:      string
  children?: UINode[] | string
  showIf?:   ShowIf
  [prop: string]: unknown
}

export interface GenResult {
  initialState?: Record<string, StateValue>
  root: UINode
}

export type UIState = Record<string, StateValue>

export function isUIAction(value: unknown): value is UIAction {
  return (
    typeof value === "object" &&
    value !== null &&
    "action" in value &&
    "key" in value &&
    (value as { action: unknown }).action !== undefined &&
    ((value as { action: unknown }).action === "toggle" || (value as { action: unknown }).action === "set")
  )
}

// An event prop may carry more than one state change at once (e.g. a chat row that
// both navigates to its ChatScreen and marks itself read in the same tap) — an array
// of UIActions, all dispatched in order.
export function isUIActionList(value: unknown): value is UIAction[] {
  return Array.isArray(value) && value.length > 0 && value.every(isUIAction)
}

export function isUINode(value: unknown): value is UINode {
  return typeof value === "object" && value !== null && "type" in value && typeof (value as { type: unknown }).type === "string"
}

// A read-only binding to a state key, usable on any prop (not just showIf) — e.g.
// MessageThreadRow.unread: { key: "read_chat_x", equals: false } stays reactive to
// state instead of being a fixed boolean baked in at generation time.
export function isStateBinding(value: unknown): value is ShowIf {
  return (
    typeof value === "object" &&
    value !== null &&
    !("action" in value) &&
    "key" in value &&
    "equals" in value &&
    typeof (value as { key: unknown }).key === "string"
  )
}
