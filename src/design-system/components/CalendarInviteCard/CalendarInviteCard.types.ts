import type { ReactNode } from 'react';

export type CalendarInviteCardState = 'choice' | 'accept' | 'join';

export interface CalendarInviteCardProps {
  state: CalendarInviteCardState;
  title: string;
  datetime: string;
  icon?: ReactNode;
  onAccept?: () => void;
  onDecline?: () => void;
  onJoin?: () => void;
  className?: string;
}
