import type { ReactNode } from 'react';

export type PopupColorSurface = 'blue' | 'green' | 'yellow';

export interface PopupColorProps {
  surface: PopupColorSurface;
  headline: string;
  onDismiss?: () => void;
  children?: ReactNode;
  className?: string;
}
