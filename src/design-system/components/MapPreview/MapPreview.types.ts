import type { ReactNode } from 'react';

export type MapMarkerCategory = 'default' | 'restaurant' | 'beach' | 'accommodation' | 'favorite';

export interface MapMarker {
  lat: number;
  lng: number;
  category?: MapMarkerCategory;
  label?: string;
}

export interface MapCollection {
  label: string;
  category?: MapMarkerCategory;
  meta?: string;
  /** Icon shown inside the chip's light-blue circle (Figma node 117:1420) — a Phosphor icon UINode. */
  icon?: ReactNode;
}

export interface MapPreviewProps {
  city: string;
  area?: string;
  markers: MapMarker[];
  collections?: MapCollection[];
  className?: string;
}

export interface MapPreviewSmallProps {
  city: string;
  area?: string;
  markers: MapMarker[];
  className?: string;
}
