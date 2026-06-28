import type { ReactNode } from 'react';

export interface ModalSheetProps {
  children: ReactNode;
  className?: string;
}

export interface ModalSheetOverlayProps {
  /** ModalSheet-Element */
  children: ReactNode;
  onDismiss?: () => void;
  className?: string;
}
