import { bem, cx } from '../../utils/bem';
import { Divider } from '../Divider';
import type { TicketProps } from './Ticket.types';

export function Ticket({
  label = 'Day-Trip',
  date,
  departureStation,
  departureTime,
  arrivalStation,
  arrivalTime,
  duration,
  status,
  statusTone = 'onTime',
  passengerName,
  seat,
  coach,
  className,
}: TicketProps) {
  return (
    <div className={cx(bem('ticket'), className)}>
      <div className="pebble-ticket__label">{label}</div>

      <div className="pebble-ticket__card">
        <p className="pebble-ticket__date">{date}</p>
        <Divider />

        <div className="pebble-ticket__journey">
          <div className="pebble-ticket__stop">
            <span className="pebble-ticket__station">{departureStation}</span>
            <span className="pebble-ticket__time">{departureTime}</span>
          </div>
          <span className="pebble-ticket__duration">{duration}</span>
          <div className="pebble-ticket__stop pebble-ticket__stop--end">
            <span className="pebble-ticket__station">{arrivalStation}</span>
            <span className="pebble-ticket__time">{arrivalTime}</span>
          </div>
        </div>
        <span className={cx('pebble-ticket__status', `pebble-ticket__status--${statusTone}`)}>
          {status}
        </span>

        <Divider />

        <div className="pebble-ticket__details">
          <div className="pebble-ticket__detail">
            <span className="pebble-ticket__detail-label">Passenger</span>
            <span className="pebble-ticket__detail-value">{passengerName}</span>
          </div>
          {seat && (
            <div className="pebble-ticket__detail">
              <span className="pebble-ticket__detail-label">Seat</span>
              <span className="pebble-ticket__detail-value">{seat}</span>
            </div>
          )}
          {coach && (
            <div className="pebble-ticket__detail">
              <span className="pebble-ticket__detail-label">Coach</span>
              <span className="pebble-ticket__detail-value">{coach}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
