/**
 * Kompakte Textbeschreibung aller Pebble-Components fuer LLM-Kontext.
 * Wird als Teil des System-Prompts eines LLM-Generierungssystems verwendet.
 * Format: ComponentName: { prop: type, ... }
 */
export const PEBBLE_COMPONENT_REFERENCE = `
PEBBLE OS COMPONENT REFERENCE
Verwende ausschliesslich diese Components. Importiere von 'design-system'.
Jede generierte Karte muss in genau ein <Root> Element eingebettet werden.

--- ICONS ---
Icons come from Phosphor Icons. Use any icon as a UINode: { type: "<IconName>", size?: number, weight?: "thin"|"light"|"regular"|"bold"|"fill"|"duotone" }
Default size: 24. Default weight: "regular".
Common icons (use PascalCase exact name):
ArrowRight, ArrowLeft, ArrowUp, ArrowDown, ArrowUUpLeft
CaretRight, CaretLeft, CaretUp, CaretDown
MagnifyingGlass, X, Plus, Minus, Check, DotsThree, DotsThreeVertical
House, MapPin, MapTrifold, Navigation
User, Users, UserCircle
Chat, ChatCircle, ChatDots, Chats, Phone, PhoneCall, VideoCamera
Calendar, CalendarBlank, Clock, Timer
CreditCard, Money, Wallet, Receipt, CurrencyEur
File, FilePdf, FileText, Files, FolderOpen, Folder
Image, Images, Camera
Heart, Star, Bookmark, Flag, Bell, BellSimple
Gear, Sliders, SlidersHorizontal, Faders
Eye, EyeSlash, Lock, LockOpen, Key
Globe, Airplane, Suitcase, Anchor, Boat
Fork, Knife, ForkKnife, Coffee, Wine
Warning, Info, Question, CheckCircle, XCircle
Share, Download, Upload, Link, Copy, Trash, PencilSimple, Pen
--- END ICONS ---

Root: { children: ReactNode }

Avatar: { size: 24|32|48|64, grouped?: boolean, src?: string, alt?: string, initials?: string, tint?: 'red'|'yellow'|'green'|'blue', children?: ReactNode }
AvatarGroup: { size: 24|32|48|64, children: Avatar[] }

Button: { size: 'large'|'small', style: 'primary'|'secondary'|'tertiary'|'destructive'|'link', type?: 'text'|'text-icon'|'icon', state?: 'default'|'disabled'|'loading', label: string, icon?: ReactNode, onClick?: () => void }

Calendar: { days: { label: string, date: number, selected?: boolean, hasAppointment?: boolean }[], events?: { label: string, nestedLabel?: string, nestedContent?: ReactNode }[] }
// Compact week-strip + event list (Figma node 2383:3906). days = 7 entries (Sun–Sat), one marked selected (today). hasAppointment shows a green dot.
// events render as TableViewCell rows — restricted to: label (event name), nestedLabel (time range), nestedContent (optional Label badge). No leftIcon, no details, no onClick inside Calendar events.

CalendarInviteCard: { state: 'choice'|'accept'|'join', title: string, datetime: string, icon?: ReactNode, onAccept?: () => void, onDecline?: () => void, onJoin?: () => void }

CategoryChip: { size: 'small'|'big', headline: string, label?: string, image?: ReactNode }
CategoryChipList: { headline?: string, children: CategoryChip[] }

Checkbox: { checked: boolean, label?: string, onChange?: (checked: boolean) => void }

ContextMenu: { children: ReactNode }

Divider: {}

DocumentCard: { variant?: 'image', image?: ReactNode, description?: string }

FilesAttached: { files: { name: string, size?: string, icon?: ReactNode }[], size?: 'big'|'small' }
FilesAttachedCombo: { headline: string, files: { name: string, size?: string, icon?: ReactNode }[] }

Folder: { size: 'small'|'big', name: string, description?: string, starred?: boolean, icon?: ReactNode, onClick?: () => void }
FolderGrid: { type: 'small-list'|'big-list', children: Folder[] }

GrabberSheet: {}

Header: { children: ReactNode }

Image: { size?: 'default', avatar?: boolean, src: string, alt?: string }
ImageCarousel: { layout: '1-2'|'1-1-1'|'layout3', children: Image[] }
ImageStaple: { children: Image[], button?: ReactNode } // max 5 Images; stack is centered in viewport
ImageWrapper: { count?: string, label?: string, onClick?: () => void, children: Image[] }
// Scattered photo-card stack (Figma node 78:677): 3–5 Image children fanned out with rotations.
// count = e.g. "12 photos", label = e.g. "shared". onClick wires the "See all" button to a toggle/set action.

Input: { state: 'active'|'filled'|'placeholder'|'disrubted', showIcon?: boolean, showClose?: boolean, placeholder?: string, value?: string, onChange?: (value: string) => void }

Label: { size: 'big'|'small', tinted: 'white'|'green'|'blue', disabled?: boolean, children: string }

MapPreview: { city: string, area?: string, markers: { lat: number, lng: number, category?: 'default'|'restaurant'|'beach'|'accommodation'|'favorite', label?: string }[], collections?: { label: string, category?: 'default'|'restaurant'|'beach'|'accommodation'|'favorite', meta?: string }[] }
MapPreviewSmall: { city: string, area?: string, markers: { lat: number, lng: number, category?: 'default'|'restaurant'|'beach'|'accommodation'|'favorite', label?: string }[] } // compact 169x169 square map tile with city/area label — use instead of MapPreview when only one or two places need to be shown without collections

MessageThreadList: { children: MessageThreadRow[] }
MessageThreadRow: { name: string, time: string, preview: string, group?: boolean, participants?: { initials?: string, tint?: 'red'|'yellow'|'green'|'blue' }[], avatar?: ReactNode, subtitle?: string, unread?: boolean, reaction?: ReactNode, attachment?: ReactNode, style?: 'activity'|'list', onClick?: () => void }
// group=true: renders a 3-avatar circular cluster — pass participants array (up to 3 entries, each with initials + tint) to show real participant avatars; omit avatar when group=true
// participants is a plain data array, not UINode children

ModalSheet: { children: ReactNode }
ModalSheetOverlay: { children: ModalSheet, onDismiss?: () => void }
ModalSheetOverlayFull: { children: ModalSheet, onDismiss?: () => void }

Note: { size: 'large'|'small', body: string, headline?: string, items?: { text: string, checked?: boolean }[] }
// size='large': 346px wide card — headline (bold, single line), body text, optional checklist items array
// size='small': 177×177px square — body text only, no headline or items

PageControl: { amount: number, selection: number }

PopupColor: { surface: 'blue'|'green'|'yellow', headline: string, onDismiss?: () => void, children?: ReactNode }

Radio: { selected: boolean, label?: string, onChange?: (selected: boolean) => void }

Reaction: { emojis?: string[], onClick?: () => void }

SegmentedPicker: { children: SegmentedPickerOption[] }
SegmentedPickerOption: { selected: boolean, label: string, icon?: ReactNode, onClick?: () => void }

SelectionButton: { label: string, discriptor?: string, checked: boolean, state?: 'default'|'disabled', onClick?: () => void }

SheetHeader: { discription?: string, draggeable?: boolean }

Slider: { value: number, icon?: ReactNode, label?: string, onChange?: (value: number) => void }

StatsBlock: { stats: string, discriptor?: string, variant?: 'top' }

TabBar: { children: TabBarItem[] }
TabBarItem: { selected: boolean, label: ReactNode, onClick?: () => void }

TableView: { description?: string, children: (TableViewCell|TableViewCellMenu)[] }
TableViewCell: { label: string, leftIcon?: ReactNode, nestedLabel?: string, details?: string, nestedContent?: ReactNode, onClick?: () => void } // nestedLabel and nestedContent are mutually exclusive — use at most one
TableViewCellMenu: { label: string, state?: 'label', onClick?: () => void }

Toggle: { active: boolean, label?: string, onChange?: (active: boolean) => void }

ToggleButton: { selected: boolean, value: string, discription?: string, trailing?: string, state?: 'default'|'disabled', onSelect?: () => void }

ToggleList: { headline?: string, children: ToggleButton[] }

ToolbarTop: { title?: string, back?: boolean, onBack?: () => void, icon?: ReactNode }

Visual: { variant: 'emoji'|'folder', children?: string } // variant='emoji': pass a single fitting emoji as children (e.g. "🎯"); variant='folder': renders built-in folder illustration, no children needed
`.trim();

/**
 * Verschachtelungs- und Komposition-Regeln. Ergaenzt PEBBLE_COMPONENT_REFERENCE
 * um Constraints, die sich nicht aus den Prop-Typen allein ergeben.
 */
export const PEBBLE_SLOT_RULES = `
VERSCHACHTELUNGS-REGELN

Calendar.events sind reine Datenobjekte (label, nestedLabel, nestedContent) — sie werden intern als TableViewCell gerendert. Erlaubte Felder: label (Eventname), nestedLabel (Uhrzeit), nestedContent (Label-Badge). Kein leftIcon, kein details, kein onClick innerhalb von Calendar.events.

AvatarGroup darf nur Avatar als direkte Kinder enthalten (2-4 Stueck).
CategoryChipList darf nur CategoryChip als direkte Kinder enthalten.
FolderGrid darf nur Folder als direkte Kinder enthalten.
ImageCarousel darf nur Image als direkte Kinder enthalten.
ImageStaple darf nur Image als direkte Kinder enthalten.
MessageThreadList darf nur MessageThreadRow als direkte Kinder enthalten.
SegmentedPicker darf nur SegmentedPickerOption als direkte Kinder enthalten.
TabBar darf nur TabBarItem als direkte Kinder enthalten.
TableView darf nur TableViewCell oder TableViewCellMenu als direkte Kinder enthalten.
ToggleList darf nur ToggleButton als direkte Kinder enthalten. Immer nur ein ToggleButton
gleichzeitig mit selected=true.
ModalSheetOverlay und ModalSheetOverlayFull duerfen nur genau ein ModalSheet als Kind enthalten.

Note.items ist ein reines Datenarray (Objekte mit text: string und optionalem checked: boolean), keine UINode-Kinder — niemals mit type/children-Feldern schreiben. headline und items sind nur bei size='large' sinnvoll; bei size='small' werden sie ignoriert.

TableViewCell.nestedLabel und TableViewCell.nestedContent schliessen sich gegenseitig aus — niemals beide gleichzeitig setzen. Ein Cell hat hoechstens einen Trailing-Slot. details (Discriptor-Subline) kann zusaetzlich verwendet werden, aber zusammen mit nestedLabel oder nestedContent bleibt der Trailing-Bereich auf genau einen Wert beschraenkt.

MapPreview.markers und MapPreview.collections sind reine Datenarrays (Objekte mit lat/lng/category
bzw. label/category/meta), keine UINode-Kinder - niemals mit type/children-Feldern schreiben, niemals
als "children" Prop uebergeben.

FilesAttached.files und FilesAttachedCombo.files sind reine Datenarrays (Objekte mit name/size/icon),
keine UINode-Kinder - niemals mit type/children-Feldern schreiben.

MessageThreadRow.avatar, .reaction und .attachment sind freie ReactNode-Slots fuer je eine verschachtelte
UINode (z.B. Avatar, Reaction, CalendarInviteCard, FilesAttached oder FilesAttachedCombo) - kein Datenarray.

MessageThreadRow.participants ist ein reines Datenarray (Objekte mit optionalem initials: string und tint: 'red'|'yellow'|'green'|'blue'), keine UINode-Kinder — niemals type/children-Felder darin schreiben. Wird nur zusammen mit group=true verwendet.

Wenn der Name einer Person bekannt ist aber kein echtes Foto existiert, bevorzuge Avatar.initials
(z.B. "JD") plus Avatar.tint gegenueber dem generischen placeholder:color src-Wert - echte Initialen
sind ein staerkeres Platzhalter-Signal als eine reine Farbflaeche.

Jede generierte Karte/Ansicht ist in genau ein Root eingebettet (Wurzelelement, max-width 402px).

Toggle ist ein eigenstaendiger An/Aus-Schalter (Settings-Stil). ToggleButton ist eine
auswaehlbare Listenoption mit eingebettetem Radio - niemals Toggle innerhalb von
ToggleList/ToggleButton verwenden, niemals Radio direkt anstelle von ToggleButton in
einer Auswahlliste.

Checkbox, Radio und Toggle rendern ihr Label als Geschwister-Element, nicht als Kind -
beide Teile (Box/Schalter + Label) muessen direkt nebeneinander aus der jeweiligen
Component zurueckgegeben werden, ohne zusaetzlichen Wrapper.
`.trim();
