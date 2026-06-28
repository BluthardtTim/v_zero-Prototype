import type { ReactNode } from 'react';

export interface TableViewProps {
  description?: string;
  /** TableViewCell-Elemente */
  children: ReactNode;
  className?: string;
}

export interface TableViewCellProps {
  label: string;
  leftIcon?: ReactNode;
  nestedLabel?: string;
  details?: string;
  nestedContent?: ReactNode;
  onClick?: () => void;
  className?: string;
}

export interface TableViewCellMenuProps {
  label: string;
  state?: 'label';
  onClick?: () => void;
  className?: string;
}
