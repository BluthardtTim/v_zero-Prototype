import type { ReactNode } from 'react';

export interface ImageCarouselProps {
  layout: '1-2' | '1-1-1' | 'layout3';
  /** Image-Elemente */
  children: ReactNode;
  className?: string;
}
