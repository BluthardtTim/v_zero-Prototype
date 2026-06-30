import type { ReactNode } from 'react';

export interface SliderProps {
  value?: number;
  icon?: ReactNode;
  label?: string;
  onChange?: (value: number) => void;
  className?: string;
}
