import type { ReactNode } from 'react';

export interface ImageWrapperProps {
  count?: string;
  label?: string;
  onClick?: () => void;
  children?: ReactNode;
  className?: string;
}
