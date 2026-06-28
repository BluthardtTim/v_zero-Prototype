import type { ReactNode } from 'react';

export interface ButtonProps {
  size: 'large' | 'small';
  style: 'primary' | 'secondary' | 'tertiary' | 'destructive' | 'link';
  type?: 'text' | 'text-icon' | 'icon';
  state?: 'default' | 'disabled' | 'loading';
  label: string;
  icon?: ReactNode;
  onClick?: () => void;
  className?: string;
}
