import type { ReactNode } from 'react';

export type VisualVariant = 'emoji' | 'folder'

export interface VisualProps {
  variant?: VisualVariant;
  children?: ReactNode;
  className?: string;
}
