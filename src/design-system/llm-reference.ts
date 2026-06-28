/**
 * Kompakte Textbeschreibung aller Pebble-Components fuer LLM-Kontext.
 * Wird als Teil des System-Prompts eines LLM-Generierungssystems verwendet.
 * Format: ComponentName: { prop: type, ... }
 */
export const PEBBLE_COMPONENT_REFERENCE = `
PEBBLE OS COMPONENT REFERENCE
Verwende ausschliesslich diese Components. Importiere von 'design-system'.
Jede generierte Karte muss in genau ein <Root> Element eingebettet werden.

Root: { children: ReactNode }

Avatar: { size: 24|32|48|64, grouped?: boolean, src?: string, alt?: string, initials?: string, tint?: 'red'|'yellow'|'green'|'blue', children?: ReactNode }
AvatarGroup: { size: 24|32|48|64, children: Avatar[] }

Button: { size: 'large'|'small', style: 'primary'|'secondary'|'tertiary'|'destructive'|'link', type?: 'text'|'text-icon'|'icon', state?: 'default'|'disabled'|'loading', label: string, icon?: ReactNode, onClick?: () => void }

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

Input: { state: 'active'|'filled'|'placeholder'|'disrubted', showIcon?: boolean, showClose?: boolean, placeholder?: string, value?: string, onChange?: (value: string) => void }

Label: { size: 'big'|'small', tinted: 'white'|'green'|'blue', disabled?: boolean, children: string }

MapPreview: { city: string, area?: string, markers: { lat: number, lng: number, category?: 'default'|'restaurant'|'beach'|'accommodation'|'favorite', label?: string }[], collections?: { label: string, category?: 'default'|'restaurant'|'beach'|'accommodation'|'favorite', meta?: string }[] }

MessageThreadList: { children: MessageThreadRow[] }
MessageThreadRow: { name: string, time: string, preview: string, avatar?: ReactNode, subtitle?: string, unread?: boolean, reaction?: ReactNode, attachment?: ReactNode, style?: 'activity'|'list', onClick?: () => void }

ModalSheet: { children: ReactNode }
ModalSheetOverlay: { children: ModalSheet, onDismiss?: () => void }
ModalSheetOverlayFull: { children: ModalSheet, onDismiss?: () => void }

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
TableViewCell: { label: string, leftIcon?: ReactNode, nestedLabel?: string, details?: string, nestedContent?: ReactNode, onClick?: () => void }
TableViewCellMenu: { label: string, state?: 'label', onClick?: () => void }

Toggle: { active: boolean, label?: string, onChange?: (active: boolean) => void }

ToggleButton: { selected: boolean, value: string, discription?: string, trailing?: string, state?: 'default'|'disabled', onSelect?: () => void }

ToggleList: { headline?: string, children: ToggleButton[] }

ToolbarTop: { title?: string, back?: boolean, onBack?: () => void, icon?: ReactNode }

Visual: { children?: ReactNode }
`.trim();

/**
 * Verschachtelungs- und Komposition-Regeln. Ergaenzt PEBBLE_COMPONENT_REFERENCE
 * um Constraints, die sich nicht aus den Prop-Typen allein ergeben.
 */
export const PEBBLE_SLOT_RULES = `
VERSCHACHTELUNGS-REGELN

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

MapPreview.markers und MapPreview.collections sind reine Datenarrays (Objekte mit lat/lng/category
bzw. label/category/meta), keine UINode-Kinder - niemals mit type/children-Feldern schreiben, niemals
als "children" Prop uebergeben.

FilesAttached.files und FilesAttachedCombo.files sind reine Datenarrays (Objekte mit name/size/icon),
keine UINode-Kinder - niemals mit type/children-Feldern schreiben.

MessageThreadRow.avatar, .reaction und .attachment sind freie ReactNode-Slots fuer je eine verschachtelte
UINode (z.B. Avatar, Reaction, CalendarInviteCard, FilesAttached oder FilesAttachedCombo) - kein Datenarray.

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
