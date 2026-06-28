import type { ReactNode } from 'react'

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
}

export interface CalendarProps {
  days: CalendarDay[]
  events?: CalendarEvent[]
  className?: string
}
