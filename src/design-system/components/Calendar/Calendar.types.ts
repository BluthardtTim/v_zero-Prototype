import type { ReactNode } from 'react'
import type { CalendarEventCardTone } from '../CalendarEventCard'

export interface CalendarDay {
  label: string
  date: number
  selected?: boolean
  hasAppointment?: boolean
}

export interface CalendarEvent {
  label: string
  nestedLabel?: string
  nestedContent?: ReactNode
  /** Rendered as a CalendarEventCard — accent color of the left bar and tinted background. Defaults to 'green'. */
  tone?: CalendarEventCardTone
}

export interface CalendarProps {
  days: CalendarDay[]
  events?: CalendarEvent[]
  className?: string
}
