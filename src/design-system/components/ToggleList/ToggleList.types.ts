import type { ReactNode } from 'react';

export interface ToggleListProps {
  headline?: string;
  /** ToggleButton-Elemente */
  children: ReactNode;
  className?: string;
}
