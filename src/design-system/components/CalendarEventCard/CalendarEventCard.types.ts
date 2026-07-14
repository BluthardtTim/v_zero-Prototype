import type { ReactNode } from 'react';

export type CalendarEventCardTone = 'green' | 'blue' | 'yellow' | 'red' | 'neutral';

export interface CalendarEventCardProps {
  label: string;
  nestedLabel?: string;
  nestedContent?: ReactNode;
  /** Accent color of the left bar and tinted background. Defaults to 'green' (Figma node 121:3426). */
  tone?: CalendarEventCardTone;
  className?: string;
}
