import type { ReactNode } from 'react';

export interface ImageStapleProps {
  /** Image-Elemente */
  children: ReactNode;
  /** Optionales Overlay-Element nach den Bildern, z.B. ein "+N" Hinweis */
  button?: ReactNode;
  className?: string;
}
