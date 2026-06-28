import type { ReactNode } from 'react';

export interface SegmentedPickerProps {
  /** SegmentedPickerOption-Elemente */
  children: ReactNode;
  className?: string;
}

export interface SegmentedPickerOptionProps {
  selected: boolean;
  label: string;
  icon?: ReactNode;
  onClick?: () => void;
  className?: string;
}
