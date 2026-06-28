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
