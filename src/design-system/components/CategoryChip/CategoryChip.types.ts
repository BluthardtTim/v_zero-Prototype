import type { ReactNode } from 'react';

export interface CategoryChipProps {
  size: 'small' | 'big';
  headline: string;
  label?: string;
  image?: ReactNode;
  className?: string;
}

export interface CategoryChipListProps {
  headline?: string;
  children: ReactNode;
  className?: string;
}
