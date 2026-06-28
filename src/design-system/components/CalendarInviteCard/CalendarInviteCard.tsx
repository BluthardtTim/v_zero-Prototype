import { bem, cx } from '../../utils/bem';
import { Button } from '../Button';
import type { CalendarInviteCardProps } from './CalendarInviteCard.types';

export function CalendarInviteCard({
  state,
  title,
  datetime,
  icon,
  onAccept,
  onDecline,
  onJoin,
  className,
}: CalendarInviteCardProps) {
  return (
    <div className={cx(bem('calendar_invite_card', { state }), className)}>
      {icon && <span className="pebble-calendar_invite_card__icon">{icon}</span>}
      <div className="pebble-calendar_invite_card__main">
        <div className="pebble-calendar_invite_card__info">
          <span className="pebble-calendar_invite_card__title">{title}</span>
          <span className="pebble-calendar_invite_card__datetime">{datetime}</span>
        </div>
        {state === 'choice' && (
          <div className="pebble-calendar_invite_card__actions">
            <Button
              size="small"
              style="primary"
              label="Accept"
              onClick={onAccept}
              className="pebble-calendar_invite_card__action"
            />
            <Button
              size="small"
              style="secondary"
              label="Decline"
              onClick={onDecline}
              className="pebble-calendar_invite_card__action"
            />
          </div>
        )}
        {state === 'accept' && (
          <div className="pebble-calendar_invite_card__actions">
            <Button
              size="small"
              style="primary"
              label="Accept"
              onClick={onAccept}
              className="pebble-calendar_invite_card__action"
            />
          </div>
        )}
        {state === 'join' && (
          <Button size="small" style="primary" label="join" onClick={onJoin} />
        )}
      </div>
    </div>
  );
}
