import { useReducer, type ComponentType } from "react"
import * as DS from "../design-system"
import * as PhosphorIcons from "@phosphor-icons/react"
import { SpaceContainer, SectionHeadline, Row, Text, Headline } from "./primitives"
import { isUIAction, isUINode, type UIAction, type UINode, type UIState } from "./types"

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
  CalendarInviteCard: DS.CalendarInviteCard,
  CategoryChip: DS.CategoryChip,
  CategoryChipList: DS.CategoryChipList,
  Checkbox: DS.Checkbox,
  ContextMenu: DS.ContextMenu,
  Divider: DS.Divider,
  DocumentCard: DS.DocumentCard,
  FilesAttached: DS.FilesAttached,
  FilesAttachedCombo: DS.FilesAttachedCombo,
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
  Note: DS.Note,
  MessageThreadList: DS.MessageThreadList,
  MessageThreadRow: DS.MessageThreadRow,
  ModalSheet: DS.ModalSheet,
  ModalSheetOverlay: DS.ModalSheetOverlay,
  ModalSheetOverlayFull: DS.ModalSheetOverlayFull,
  PageControl: DS.PageControl,
  PopupColor: DS.PopupColor,
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
  Toggle: DS.Toggle,
  ToggleButton: DS.ToggleButton,
  ToggleList: DS.ToggleList,
  ToolbarTop: DS.ToolbarTop,
  Visual: DS.Visual
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
  if (EVENT_PROP_NAMES.has(keyHint) && typeof value !== "function") {
    // An event prop with no recognised action shape — never call an unknown value as a function.
    return undefined
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
      // resolve sentinel src values inside plain data objects (e.g. group chat participants)
      if (item && typeof item === "object" && "src" in item && typeof (item as Record<string, unknown>).src === "string") {
        return { ...item, src: resolveValue((item as Record<string, unknown>).src, state, dispatch, "src") }
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

export function RenderNode({ node, state, dispatch }: { node: UINode; state: UIState; dispatch: Dispatch }) {
  if (node.showIf && state[node.showIf.key] !== node.showIf.equals) {
    return null
  }

  const Component = COMPONENT_REGISTRY[node.type]
  if (!Component) {
    console.warn(`renderer: unknown component type "${node.type}", skipping`)
    return null
  }

  const props = resolveProps(node, state, dispatch)
  const children = resolveChildren(node.children, state, dispatch)

  return <Component {...props}>{children}</Component>
}
