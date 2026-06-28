import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { bem, cx } from '../../utils/bem';
import type { MapMarkerCategory, MapPreviewSmallProps } from './MapPreview.types';

const CATEGORY_STYLE: Record<MapMarkerCategory, { bg: string; glyph: string }> = {
  default:       { bg: '#e05d51', glyph: '\u{1F6A9}' },
  restaurant:    { bg: '#c6ddb1', glyph: '\u{1F374}' },
  beach:         { bg: '#a9d4e0', glyph: '\u{1F3D6}️' },
  accommodation: { bg: '#0d0d0c', glyph: '\u{1F3E0}' },
  favorite:      { bg: '#c6ddb1', glyph: '\u{2764}️' },
};

const PIN_SIZE = 20;

function buildPinIcon(category: MapMarkerCategory | undefined): L.DivIcon {
  const style = CATEGORY_STYLE[category ?? 'default'];
  return L.divIcon({
    className: 'pebble-mappreview-small__leaflet-pin',
    html: `<span style="display:flex;align-items:center;justify-content:center;width:${PIN_SIZE}px;height:${PIN_SIZE}px;border-radius:9999px;background:${style.bg};font-size:11px;box-shadow:0 0 1px rgba(13,13,12,0.25);">${style.glyph}</span>`,
    iconSize:   [PIN_SIZE, PIN_SIZE],
    iconAnchor: [PIN_SIZE / 2, PIN_SIZE / 2],
  });
}

export function MapPreviewSmall({ city, area, markers, className }: MapPreviewSmallProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      zoomControl:       false,
      scrollWheelZoom:   false,
      attributionControl: false,
      dragging:          false,
      touchZoom:         false,
      doubleClickZoom:   false,
      boxZoom:           false,
      keyboard:          false,
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
    }).addTo(map);

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || markers.length === 0) return;

    const layerGroup = L.layerGroup().addTo(map);
    for (const marker of markers) {
      L.marker([marker.lat, marker.lng], { icon: buildPinIcon(marker.category) }).addTo(layerGroup);
    }

    if (markers.length === 1) {
      map.setView([markers[0].lat, markers[0].lng], 15);
    } else {
      const bounds = L.latLngBounds(markers.map((m) => [m.lat, m.lng] as [number, number]));
      map.fitBounds(bounds, { padding: [24, 24], maxZoom: 16 });
    }

    return () => {
      layerGroup.remove();
    };
  }, [markers]);

  // Show up to 2 distinct categories in the side column (deduplicated)
  const sideMarkers = [...new Map(markers.map((m) => [m.category ?? 'default', m])).values()].slice(0, 2);

  return (
    <div className={cx(bem('mappreview-small'), className)}>
      <div className="pebble-mappreview-small__canvas" ref={containerRef} />

      {sideMarkers.length > 0 && (
        <div className="pebble-mappreview-small__pins">
          {sideMarkers.map((m, i) => {
            const style = CATEGORY_STYLE[m.category ?? 'default'];
            return (
              <span
                key={i}
                className="pebble-mappreview-small__pin"
                style={{ background: style.bg }}
              >
                {style.glyph}
              </span>
            );
          })}
        </div>
      )}

      <div className="pebble-mappreview-small__footer">
        <span className="pebble-mappreview-small__city">{city}</span>
        {area && <span className="pebble-mappreview-small__area">{area}</span>}
      </div>
    </div>
  );
}
