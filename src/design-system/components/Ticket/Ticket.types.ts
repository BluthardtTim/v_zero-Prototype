export interface TicketProps {
  /** Eyebrow label above the card, e.g. "Day-Trip". Defaults to "Day-Trip". Keep it a durable category, not a countdown. */
  label?: string;
  /** Absolute date, e.g. "Mon, 20 Aug 2026" */
  date: string;
  departureStation: string;
  departureTime: string;
  arrivalStation: string;
  arrivalTime: string;
  /** e.g. "2h 23min" */
  duration: string;
  /** e.g. "on time", "delayed 15 min", "cancelled" */
  status: string;
  statusTone?: 'onTime' | 'delayed' | 'cancelled';
  passengerName: string;
  seat?: string;
  coach?: string;
  className?: string;
}
