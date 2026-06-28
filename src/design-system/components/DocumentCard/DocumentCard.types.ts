import type { ReactNode } from 'react';

export interface DocumentCardProps {
  variant?: 'image';
  image?: ReactNode;
  description?: string;
  className?: string;
}
