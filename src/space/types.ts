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

export function isUINode(value: unknown): value is UINode {
  return typeof value === "object" && value !== null && "type" in value && typeof (value as { type: unknown }).type === "string"
}
