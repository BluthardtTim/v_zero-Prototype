import { useReducer, type ComponentType } from "react"
import * as DS from "../design-system"
import * as PhosphorIcons from "@phosphor-icons/react"
import { SpaceContainer, TabScreen, SectionHeadline, Row, Text, Headline } from "./primitives"
import { ChatScreen, PhotosScreen } from "../screens"
import { isUIAction, isUIActionList, isStateBinding, isUINode, type UIAction, type UINode, type UIState } from "./types"

export const COMPONENT_REGISTRY: Record<string, ComponentType<any>> = {
  // Phosphor Icons — every icon available as { type: "House", size: 24, weight: "regular" }
  // forwardRef components are objects (not functions), so we accept both
  ...Object.fromEntries(
    Object.entries(PhosphorIcons).filter(([, v]) =>
      typeof v === "function" ||
      (typeof v === "object" && v !== null && typeof (v as any).render === "function")
    )
  ),
  // local Space-layout primitives — not part of the design system package
  SpaceContainer,
  TabScreen,
  SectionHeadline,
  Row,
  Text,
  Headline,

  // design-system components
  Root: DS.Root,
  Avatar: DS.Avatar,
  Calendar: DS.Calendar,
  AvatarGroup: DS.AvatarGroup,
  Button: DS.Button,
  CalendarEventCard: DS.CalendarEventCard,
  CalendarInviteCard: DS.CalendarInviteCard,
  CategoryChip: DS.CategoryChip,
  CategoryChipList: DS.CategoryChipList,
  Checkbox: DS.Checkbox,
  ContextMenu: DS.ContextMenu,
  Divider: DS.Divider,
  DocumentCard: DS.DocumentCard,
  Documents: DS.Documents,
  FilesAttached: DS.FilesAttached,
  FilesAttachedCombo: DS.FilesAttachedCombo,
  Finance: DS.Finance,
  Folder: DS.Folder,
  FolderGrid: DS.FolderGrid,
  GrabberSheet: DS.GrabberSheet,
  Header: DS.Header,
  Image: DS.Image,
  ImageCarousel: DS.ImageCarousel,
  ImageStaple: DS.ImageStaple,
  ImageWrapper: DS.ImageWrapper,
  Input: DS.Input,
  Label: DS.Label,
  MapPreview: DS.MapPreview,
  MapPreviewSmall: DS.MapPreviewSmall,
  Photos: DS.Photos,
  MessageThreadList: DS.MessageThreadList,
  MessageThreadRow: DS.MessageThreadRow,
  ModalSheet: DS.ModalSheet,
  ModalSheetOverlay: DS.ModalSheetOverlay,
  ModalSheetOverlayFull: DS.ModalSheetOverlayFull,
  PageControl: DS.PageControl,
  Radio: DS.Radio,
  Reaction: DS.Reaction,
  SegmentedPicker: DS.SegmentedPicker,
  SegmentedPickerOption: DS.SegmentedPickerOption,
  SelectionButton: DS.SelectionButton,
  SheetHeader: DS.SheetHeader,
  Slider: DS.Slider,
  StatsBlock: DS.StatsBlock,
  TabBar: DS.TabBar,
  TabBarItem: DS.TabBarItem,
  TableView: DS.TableView,
  TableViewCell: DS.TableViewCell,
  TableViewCellMenu: DS.TableViewCellMenu,
  Ticket: DS.Ticket,
  Toggle: DS.Toggle,
  ToggleButton: DS.ToggleButton,
  ToggleList: DS.ToggleList,
  ToolbarTop: DS.ToolbarTop,
  Visual: DS.Visual,

  // prebuilt screens
  ChatScreen,
  PhotosScreen,
}

type Dispatch = (action: UIAction) => void

export function useUITree(initialState: UIState | undefined) {
  return useReducer((state: UIState, action: UIAction): UIState => {
    if (action.action === "toggle") {
      return { ...state, [action.key]: !state[action.key] }
    }
    return { ...state, [action.key]: action.value ?? true }
  }, initialState ?? {})
}

const EVENT_PROP_NAMES = new Set(["onClick", "onChange", "onSelect", "onDismiss", "onBack"])

// The RAG event data has no real photo files — the model references a placeholder
// tint instead of having to reproduce an exact data-URI, which it can't do reliably.
const PLACEHOLDER_COLORS: Record<string, string> = {
  blue: "rgb(203,223,255)",
  green: "rgb(198,221,177)",
  yellow: "rgb(246,240,187)",
  neutral: "rgb(241,242,236)"
}

function placeholderImage(tint: string | undefined): string {
  const color = PLACEHOLDER_COLORS[tint ?? "neutral"] ?? PLACEHOLDER_COLORS.neutral
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect width="100%" height="100%" fill="${color}"/></svg>`
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

function resolveValue(value: unknown, state: UIState, dispatch: Dispatch, keyHint: string): unknown {
  if (isUIAction(value)) {
    return () => dispatch(value)
  }
  // More than one state change from a single tap (e.g. open a ChatScreen AND mark
  // that chat read) — dispatched in order against the accumulated state.
  if (isUIActionList(value)) {
    return () => value.forEach(dispatch)
  }
  if (EVENT_PROP_NAMES.has(keyHint) && typeof value !== "function") {
    // An event prop with no recognised action shape — never call an unknown value as a function.
    return undefined
  }
  // A read-only state binding on a non-event prop (e.g. MessageThreadRow.unread
  // reading a "has this been opened" flag) — resolved fresh on every render.
  if (isStateBinding(value)) {
    return state[value.key] === value.equals
  }
  if (keyHint === "src" && typeof value === "string" && value.startsWith("placeholder")) {
    return placeholderImage(value.split(":")[1])
  }
  // A real photo dropped into public/images/ (see that folder's README) — filename
  // matches an event's raw_ref.thumbnail value, e.g. "photo:positano_sunset.jpg".
  if (keyHint === "src" && typeof value === "string" && value.startsWith("photo:")) {
    return `/images/${value.slice("photo:".length)}`
  }
  // Profile photos placed in public/images/chat/ — served as /images/chat/<filename>
  if (keyHint === "src" && typeof value === "string" && value.startsWith("avatar:")) {
    return `/images/chat/${value.slice("avatar:".length)}`
  }
  if (isUINode(value)) {
    return <RenderNode key={keyHint} node={value} state={state} dispatch={dispatch} />
  }
  if (Array.isArray(value)) {
    return value.map((item, index) => {
      if (isUINode(item)) return <RenderNode key={index} node={item} state={state} dispatch={dispatch} />
      // Resolve special values inside plain data objects (e.g. avatar src sentinels, icon UINodes)
      if (item && typeof item === "object" && !Array.isArray(item)) {
        const obj = item as Record<string, unknown>
        let changed = false
        const resolved: Record<string, unknown> = {}
        for (const [k, v] of Object.entries(obj)) {
          if (k === "src" && typeof v === "string") {
            resolved[k] = resolveValue(v, state, dispatch, "src")
            changed = true
          } else if (isUIAction(v)) {
            // A per-item action inside a data array (e.g. Photos.albums[].onClick)
            resolved[k] = (() => dispatch(v))
            changed = true
          } else if (isUIActionList(v)) {
            resolved[k] = (() => v.forEach(dispatch))
            changed = true
          } else if (isUINode(v)) {
            resolved[k] = <RenderNode key={k} node={v as UINode} state={state} dispatch={dispatch} />
            changed = true
          } else if (Array.isArray(v)) {
            // Recurse into nested arrays (e.g. PhotosScreen.groups[].photos[].src) —
            // one level of array-of-objects is not always the whole shape.
            resolved[k] = resolveValue(v, state, dispatch, k)
            changed = true
          } else {
            resolved[k] = v
          }
        }
        return changed ? resolved : item
      }
      return item
    })
  }
  return value
}

const RESERVED_NODE_KEYS = new Set(["type", "children", "showIf"])

function resolveProps(node: UINode, state: UIState, dispatch: Dispatch): Record<string, unknown> {
  const resolved: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(node)) {
    if (RESERVED_NODE_KEYS.has(key)) continue
    resolved[key] = resolveValue(value, state, dispatch, key)
  }
  return resolved
}

function resolveChildren(children: UINode[] | string | undefined, state: UIState, dispatch: Dispatch) {
  if (children === undefined) return undefined
  if (typeof children === "string") return children
  return children.map((child, index) => <RenderNode key={index} node={child} state={state} dispatch={dispatch} />)
}

export function RenderNode({
  node,
  state,
  dispatch,
  ...overrideProps
}: { node: UINode; state: UIState; dispatch: Dispatch } & Record<string, unknown>) {
  if (node.showIf && state[node.showIf.key] !== node.showIf.equals) {
    return null
  }

  const Component = COMPONENT_REGISTRY[node.type]
  if (!Component) {
    console.warn(`renderer: unknown component type "${node.type}", skipping`)
    return null
  }

  // A UINode resolved into a prop value (e.g. TabBarItem's `label` icon) renders
  // as a <RenderNode> element, not the underlying component directly — so a
  // parent doing cloneElement(label, { weight, color }) targets this wrapper.
  // Forwarding any such extra props onto the resolved component (after its own
  // resolved props, so overrides win) is what makes that cloneElement pattern
  // actually reach the real icon/component instead of being silently dropped.
  const props = { ...resolveProps(node, state, dispatch), ...overrideProps }
  const children = resolveChildren(node.children, state, dispatch)

  return <Component {...props}>{children}</Component>
}
