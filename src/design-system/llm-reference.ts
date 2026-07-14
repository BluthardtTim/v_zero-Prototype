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
Gear, Sliders, SlidersHorizontal, Faders, Funnel
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

Calendar: { days: { label: string, date: number, selected?: boolean, hasAppointment?: boolean }[], events?: { label: string, nestedLabel?: string, nestedContent?: ReactNode, tone?: 'green'|'blue'|'yellow'|'red'|'neutral' }[] }
// Compact week-strip + event list (Figma node 2383:3906). days = 7 entries (Sun–Sat), one marked selected (today). hasAppointment shows a green dot.
// events render as CalendarEventCard rows (Figma node 121:3426) — a tinted, left-bar-accented card, restricted to: label (event name), nestedLabel (time or day — never a relative phrase like "today", the Core principle above still applies), nestedContent (optional Label badge), tone (accent color, defaults to 'green'). No leftIcon, no details, no onClick inside Calendar events.

CalendarEventCard: { label: string, nestedLabel?: string, nestedContent?: ReactNode, tone?: 'green'|'blue'|'yellow'|'red'|'neutral' }
// Figma node 121:3426/121:3449 — a single tinted calendar-event row (left accent bar + title + optional time subtitle). Normally used only inside Calendar.events (see above); only place one directly in a tree outside Calendar for a genuinely standalone single-event mention.

CalendarInviteCard: { state: 'choice'|'accept'|'join', title: string, datetime: string, icon?: ReactNode, onAccept?: () => void, onDecline?: () => void, onJoin?: () => void }

CategoryChip: { size: 'small'|'big', headline: string, label?: string, image?: ReactNode }
CategoryChipList: { headline?: string, children: CategoryChip[] }

Checkbox: { checked: boolean, label?: string, onChange?: (checked: boolean) => void }

ContextMenu: { children: ReactNode }

Divider: {}

DocumentCard: { variant?: 'image', image?: ReactNode, description?: string }

Documents: { documents: { title: string, subtitle: string, date: string, fileType?: string, visibility?: 'shared'|'private' }[], visibleCount?: number, seeAllLabel?: string }
// Figma node 119:1892 — the canonical files-bucket section: a Shared/Private tab header (built internally from SegmentedPicker, not a separate node you add), a row per document (placeholder file-type icon, title, subtitle, absolute date), then a "See all" link once there are more than visibleCount (default 3) rows in the selected tab.
// documents is a plain data array, not UINode children. subtitle = "By <uploader name>". date must be an absolute date (e.g. "6 Apr 2025"), never relative. visibility defaults to 'shared' when omitted.
// Self-contained: the Shared/Private tab switch and the "See all" expansion are managed internally by the component — do NOT wire onClick/toggle/showIf/initialState for them, Documents needs none of that.

FilesAttached: { files: { name: string, size?: string, icon?: ReactNode }[], size?: 'big'|'small' }
FilesAttachedCombo: { headline: string, files: { name: string, size?: string, icon?: ReactNode }[] }

Finance: { period: string, headline: string, transactions: { icon?: ReactNode, title: string, subtitle: string, amount: string, tone: 'owed'|'settled' }[], buttonLabel: string, buttonIcon?: ReactNode, onButtonClick?: () => void }
// Figma node 117:1444 — the canonical finance-bucket card: period/headline header, a divider, one row per expense, then a full-width CTA button. See the finance bullet in Step 2 for how to compute period/headline/tone from raw_ref.
// tone drives the trailing amount's color: 'owed' = red, 'settled' = green. transactions is a plain data array, not UINode children — icon defaults to a generic payment icon when omitted.

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

MapPreview: { city: string, area?: string, markers: { lat: number, lng: number, category?: 'default'|'restaurant'|'beach'|'accommodation'|'favorite', label?: string }[], collections?: { label: string, category?: 'default'|'restaurant'|'beach'|'accommodation'|'favorite', meta?: string, icon?: ReactNode }[] }
// collections = the "saved places" chips (top-left, Figma node 117:1420): each is a category of saved/bookmarked places, e.g. label "Restaurants", meta "8 Places", icon a fitting Phosphor icon (e.g. { type: "ForkKnife", size: 16 }). The bottom-right pill always shows the current city/area — no extra prop needed, it's built from city/area directly.
MapPreviewSmall: { city: string, area?: string, markers: { lat: number, lng: number, category?: 'default'|'restaurant'|'beach'|'accommodation'|'favorite', label?: string }[] } // compact 169x169 square map tile with city/area label — use instead of MapPreview when only one or two places need to be shown without collections

MessageThreadList: { children: MessageThreadRow[] }
MessageThreadRow: { name: string, time: string, preview: string, group?: boolean, participants?: { initials?: string, tint?: 'red'|'yellow'|'green'|'blue' }[], avatar?: ReactNode, subtitle?: string, unread?: boolean, reaction?: ReactNode, attachment?: ReactNode, style?: 'activity'|'list', onClick?: () => void }
// unread should be a live state binding ({ key: "read_<slug>", equals: false }), not a fixed boolean, whenever the row is tappable — see Step 8's mark-as-read pattern — so the dot actually clears once the chat is opened instead of staying on forever.
// group=true: renders a 3-avatar circular cluster — pass participants array (up to 3 entries, each with initials + tint) to show real participant avatars; omit avatar when group=true
// participants is a plain data array, not UINode children

ModalSheet: { children: ReactNode }
ModalSheetOverlay: { children: ModalSheet, onDismiss?: () => void }
ModalSheetOverlayFull: { children: ModalSheet, onDismiss?: () => void }

PageControl: { amount: number, selection: number }

Photos: { albums: { title: string, count: number, src: string, onClick?: () => void }[], recentPhotos: { src: string }[], recentTotal: number, sharedBy: string }
// Figma node 116:1376 — the photo-library summary: "All" + "Shared Albums" cover cards, then a "Recently added" thumbnail row.
// albums = EXACTLY 2 entries: [0] title "All", [1] title "Shared Albums" — see the images bullet in Step 2 for how to compute count/src.
// recentPhotos = up to 5 entries, most-recent-first; the first 4 render as plain tiles, a 5th becomes the "+N" overflow tile.
// recentTotal = total size of the recently-added pool (equal to albums[0].count) — drives the "+N" badge (recentTotal minus the 4 shown tiles).
// sharedBy = first name only of whoever added the most recent photo.
// albums[].onClick is optional — a per-entry action (e.g. { action: "set", key: "activeScreen", value: "photos_all" }) to open that album in PhotosScreen (Step 8). Omit it to leave a card non-interactive.

Radio: { selected: boolean, label?: string, onChange?: (selected: boolean) => void }

Reaction: { emojis?: string[], onClick?: () => void }

SegmentedPicker: { children: SegmentedPickerOption[], trailingIcon?: ReactNode, onTrailingIconClick?: () => void }
// Figma node 119:2049 — underline tabs (e.g. "Shared"/"Private") with a full-width bottom divider, plus an optional trailing filter icon (e.g. { type: "Funnel", size: 24 }) right-aligned opposite the tabs. Use for filtering a list/section into 2-3 views, never as a generic pill toggle.
SegmentedPickerOption: { selected: boolean, label: string, icon?: ReactNode, onClick?: () => void }

SelectionButton: { label: string, discriptor?: string, checked: boolean, state?: 'default'|'disabled', onClick?: () => void }

SheetHeader: { discription?: string, draggeable?: boolean }

Slider: { value: number, icon?: ReactNode, label?: string, onChange?: (value: number) => void }

StatsBlock: { stats: string, discriptor?: string, variant?: 'top' }

TabBar: { children: TabBarItem[] }
// Figma node 121:3457 — fixed to the bottom of the viewport, full width, not a floating pill. label is normally a single icon (e.g. { type: "House", size: 24 }), not text.
TabBarItem: { selected: boolean, label: ReactNode, onClick?: () => void }
// TabBarItem clones its own label icon to set weight: selected ? 'fill' : 'regular' and color: selected ? black : grey automatically — never pass weight or color on the icon yourself.

TableView: { description?: string, children: (TableViewCell|TableViewCellMenu)[] }
TableViewCell: { label: string, leftIcon?: ReactNode, nestedLabel?: string, details?: string, nestedContent?: ReactNode, onClick?: () => void } // nestedLabel and nestedContent are mutually exclusive — use at most one
TableViewCellMenu: { label: string, state?: 'label', onClick?: () => void }

Ticket: { label?: string, date: string, departureStation: string, departureTime: string, arrivalStation: string, arrivalTime: string, duration: string, status: string, statusTone?: 'onTime'|'delayed'|'cancelled', passengerName: string, seat?: string, coach?: string }
// Figma node 119:2113 — a boarding-pass-style card for one upcoming trip segment, interpreted from a files-bucket ticket booking (raw_ref.type === "ticket"). label is a durable category (defaults to "Day-Trip") — never phrase it as a countdown ("in 3 days"), the segment's own date already carries the timing. date must be absolute (e.g. "Thu, 17 Jul 2026"). statusTone drives the status text color: 'onTime' green, 'delayed'/'cancelled' red.

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

Calendar.events sind reine Datenobjekte (label, nestedLabel, nestedContent, tone) — sie werden intern als CalendarEventCard gerendert. Erlaubte Felder: label (Eventname), nestedLabel (Uhrzeit oder Wochentag, niemals eine relative Phrase wie "today"/"heute"), nestedContent (Label-Badge), tone (Akzentfarbe, Default 'green'). Kein leftIcon, kein details, kein onClick innerhalb von Calendar.events.

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

TableViewCell.nestedLabel und TableViewCell.nestedContent schliessen sich gegenseitig aus — niemals beide gleichzeitig setzen. Ein Cell hat hoechstens einen Trailing-Slot. details (Discriptor-Subline) kann zusaetzlich verwendet werden, aber zusammen mit nestedLabel oder nestedContent bleibt der Trailing-Bereich auf genau einen Wert beschraenkt.

MapPreview.markers und MapPreview.collections sind reine Datenarrays (Objekte mit lat/lng/category
bzw. label/category/meta), keine UINode-Kinder - niemals mit type/children-Feldern schreiben, niemals
als "children" Prop uebergeben.

Hard rule — MapPreview.markers darf niemals leer sein. Jede MapPreview muss mindestens einen
eigenstaendigen Marker (lat/lng) enthalten, der als Einzelpunkt auf der Karte erscheint und nicht
Teil einer collection ist. Collections sind rein visuelle Chip-Labels ohne Koordinaten — sie ersetzen
keinen Marker. Wenn nur eine allgemeine Location (kein exakter Ort) bekannt ist, setze einen
repraesentativen Marker auf den Stadtzentrum oder das bekannteste Wahrzeichen des Ortes.

FilesAttached.files und FilesAttachedCombo.files sind reine Datenarrays (Objekte mit name/size/icon),
keine UINode-Kinder - niemals mit type/children-Feldern schreiben.

Finance.transactions ist ein reines Datenarray (Objekte mit icon/title/subtitle/amount/tone),
keine UINode-Kinder — niemals mit type/children-Feldern schreiben, niemals als "children" Prop uebergeben.

Photos.albums und Photos.recentPhotos sind reine Datenarrays (Objekte mit title/count/src bzw. nur src),
keine UINode-Kinder — niemals mit type/children-Feldern schreiben, niemals als "children" Prop uebergeben.

Hard rule — Photos.albums hat immer genau 2 Eintraege in dieser Reihenfolge: zuerst title="All"
(alle Bilder des images-Buckets), danach title="Shared Albums" (nur Bilder mit gesetztem
raw_ref.album). Niemals ein drittes Album, niemals andere Titel, niemals ein Album pro
einzelnem Albumnamen.

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
