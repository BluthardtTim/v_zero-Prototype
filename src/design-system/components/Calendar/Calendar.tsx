import { cx } from '../../utils/bem'
import { CalendarEventCard } from '../CalendarEventCard'
import type { CalendarProps } from './Calendar.types'

export function Calendar({ days, events = [], className }: CalendarProps) {
  return (
    <div className={cx('pebble-calendar', className)}>
      <div className="pebble-calendar__week">
        {days.map((day, i) => (
          <div key={i} className="pebble-calendar__day">
            <span className="pebble-calendar__day-label">{day.label}</span>
            <div className={cx('pebble-calendar__day-circle', day.selected && 'pebble-calendar__day-circle--selected')}>
              <span className={cx('pebble-calendar__day-number', day.selected && 'pebble-calendar__day-number--selected')}>
                {day.date}
              </span>
            </div>
            <div className={cx('pebble-calendar__dot', day.hasAppointment && 'pebble-calendar__dot--visible')} />
          </div>
        ))}
      </div>

      {events.length > 0 && (
        <>
          <div className="pebble-calendar__divider" />
          {events.map((event, i) => (
            <CalendarEventCard
              key={i}
              label={event.label}
              nestedLabel={event.nestedLabel}
              nestedContent={event.nestedContent}
              tone={event.tone}
            />
          ))}
        </>
      )}
    </div>
  )
}
