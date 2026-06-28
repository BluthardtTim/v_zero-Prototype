import type { ReactNode } from 'react';

export interface LabelProps {
  size: 'big' | 'small';
  tinted: 'white' | 'green' | 'blue';
  disabled?: boolean;
  children: ReactNode;
  className?: string;
}
