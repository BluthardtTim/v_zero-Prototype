import type { ReactNode } from 'react';

export interface TabBarProps {
  /** TabBarItem-Elemente */
  children: ReactNode;
  className?: string;
}

export interface TabBarItemProps {
  selected: boolean;
  label: ReactNode;
  onClick?: () => void;
  className?: string;
}
