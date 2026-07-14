import type { ReactNode } from 'react';

export interface SegmentedPickerProps {
  /** SegmentedPickerOption-Elemente */
  children: ReactNode;
  /** Trailing action icon, e.g. a Funnel filter button (Figma node 119:2049) — right-aligned, opposite the tabs. */
  trailingIcon?: ReactNode;
  onTrailingIconClick?: () => void;
  className?: string;
}

export interface SegmentedPickerOptionProps {
  selected: boolean;
  label: string;
  icon?: ReactNode;
  onClick?: () => void;
  className?: string;
}
