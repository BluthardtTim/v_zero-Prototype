import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { bem, cx } from '../../utils/bem';
import type { MapMarkerCategory, MapPreviewProps } from './MapPreview.types';

const CATEGORY_STYLE: Record<MapMarkerCategory, { bg: string; glyph: string }> = {
  default: { bg: '#e05d51', glyph: '\u{1F6A9}' },
  restaurant: { bg: '#c6ddb1', glyph: '\u{1F374}' },
  beach: { bg: '#a9d4e0', glyph: '\u{1F3D6}️' },
  accommodation: { bg: '#0d0d0c', glyph: '\u{1F3E0}' },
  favorite: { bg: '#c6ddb1', glyph: '\u{2764}️' },
};

const MARKER_SIZE = 26;

function buildMarkerIcon(category: MapMarkerCategory | undefined): L.DivIcon {
  const style = CATEGORY_STYLE[category ?? 'default'];
  return L.divIcon({
    className: 'pebble-mappreview__marker',
    html: `<span style="display:flex;align-items:center;justify-content:center;width:${MARKER_SIZE}px;height:${MARKER_SIZE}px;border-radius:9999px;background:${style.bg};font-size:${Math.round(
      MARKER_SIZE * 0.55,
    )}px;box-shadow:0 0 1px rgba(13,13,12,0.25);">${style.glyph}</span>`,
    iconSize: [MARKER_SIZE, MARKER_SIZE],
    iconAnchor: [MARKER_SIZE / 2, MARKER_SIZE / 2],
  });
}

export function MapPreview({ city, area, markers, collections, className }: MapPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);

  // Map instance lifecycle is independent of prop changes — created once per mount.
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      zoomControl: false,
      scrollWheelZoom: false,
      attributionControl: true,
    });

    // CartoDB Positron — a flat, minimal, mostly-label-free basemap (no API key
    // required) instead of the busier default OSM raster style.
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
    }).addTo(map);

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Markers are re-synced whenever the data changes, independent of map setup.
  useEffect(() => {
    const map = mapRef.current;
    if (!map || markers.length === 0) return;

    const layerGroup = L.layerGroup().addTo(map);
    for (const marker of markers) {
      const leafletMarker = L.marker([marker.lat, marker.lng], { icon: buildMarkerIcon(marker.category) }).addTo(
        layerGroup,
      );
      if (marker.label) leafletMarker.bindTooltip(marker.label);
    }

    if (markers.length === 1) {
      map.setView([markers[0].lat, markers[0].lng], 16);
    } else {
      const bounds = L.latLngBounds(markers.map((marker) => [marker.lat, marker.lng] as [number, number]));
      map.fitBounds(bounds, { padding: [32, 32], maxZoom: 17 });
    }

    return () => {
      layerGroup.remove();
    };
  }, [markers]);

  const primary = markers[0];

  function handleNavigate() {
    const destination = primary ? `${primary.lat},${primary.lng}` : `${area ? `${area}, ` : ''}${city}`;
    const url = primary
      ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`
      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(destination)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  return (
    <div className={cx(bem('mappreview'), className)}>
      <div className="pebble-mappreview__canvas" ref={containerRef} />

      {collections && collections.length > 0 && (
        <div className="pebble-mappreview__collections">
          {collections.map((collection, index) => {
            const style = CATEGORY_STYLE[collection.category ?? 'favorite'];
            return (
              <div className="pebble-mappreview__chip" key={index}>
                <span className="pebble-mappreview__chip-icon" style={{ background: style.bg }}>
                  {style.glyph}
                </span>
                <div className="pebble-mappreview__chip-text">
                  <span className="pebble-mappreview__chip-label">{collection.label}</span>
                  {collection.meta && <span className="pebble-mappreview__chip-meta">{collection.meta}</span>}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Floating frosted-glass pill, bottom-left — matches the Figma reference's plain
          "search" pill exactly (just text, no icon/button chrome inside it). The whole
          pill is the tap target, like a search bar is, rather than a separate button. */}
      <button type="button" className="pebble-mappreview__location" onClick={handleNavigate}>
        <span className="pebble-mappreview__city">{city}</span>
        {area && <span className="pebble-mappreview__area">{area}</span>}
      </button>
    </div>
  );
}
