import { bem, cx } from '../../utils/bem';
import type { CalendarEventCardProps } from './CalendarEventCard.types';

export function CalendarEventCard({ label, nestedLabel, nestedContent, tone = 'green', className }: CalendarEventCardProps) {
  return (
    <div className={cx(bem('calendar_event_card', { tone }), className)}>
      <div className="pebble-calendar_event_card__bar" />
      <div className="pebble-calendar_event_card__text">
        <span className="pebble-calendar_event_card__label">{label}</span>
        {nestedLabel && <span className="pebble-calendar_event_card__nested-label">{nestedLabel}</span>}
      </div>
      {nestedContent && <div className="pebble-calendar_event_card__nested-content">{nestedContent}</div>}
    </div>
  );
}
