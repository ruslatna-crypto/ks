import React from 'react';
import { ExternalLink, Navigation } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const MapWidget = () => {
  const { lang } = useLanguage();
  // Coordinates for Keramika Sintez (Tashkent, Chingiz Aytmatov st. 2 "B")
  const lat = 41.328495;
  const lon = 69.293988;
  const twoGisUrl = "http://2gis.uz/tashkent/firm/70000001074420592/center/69.293988,41.328495/zoom/16";

  const mapHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  <style>
    * { box-sizing: border-box; }
    body, html, #map { margin: 0; padding: 0; width: 100%; height: 100%; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
    .custom-red-pin {
      display: flex;
      align-items: center;
      justify-content: center;
      filter: drop-shadow(0 4px 6px rgba(0,0,0,0.35));
      cursor: pointer;
    }
  </style>
</head>
<body>
  <div id="map"></div>
  <script>
    var map = L.map('map', { scrollWheelZoom: false }).setView([${lat}, ${lon}], 16);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap'
    }).addTo(map);

    var redPinIcon = L.divIcon({
      className: 'custom-red-pin',
      html: '<svg width="34" height="44" viewBox="0 0 24 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 0C5.372 0 0 5.372 0 12c0 8.8 12 20 12 20s12-11.2 12-20c0-6.628-5.372-12-12-12z" fill="#ED3237" stroke="#FFFFFF" stroke-width="1.2"/><circle cx="12" cy="11.5" r="4.5" fill="#FFFFFF"/></svg>',
      iconSize: [34, 44],
      iconAnchor: [17, 44],
      popupAnchor: [0, -40]
    });

    var marker = L.marker([${lat}, ${lon}], { icon: redPinIcon }).addTo(map);
    marker.bindPopup('<div style="font-size:14px;line-height:1.4;"><strong>ООО &laquo;KERAMIKA SINTEZ&raquo;</strong><br>ул. Чингиза Айтматова 2 &ldquo;Б&rdquo;</div>').openPopup();
  </script>
</body>
</html>`;

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: 320 }}>
      <iframe
        title="Карта расположения Keramika Sintez"
        srcDoc={mapHtml}
        style={{ width: '100%', height: '100%', minHeight: 320, border: 'none', display: 'block' }}
        loading="lazy"
      />
      <div style={{
        position: 'absolute',
        bottom: 12,
        left: 12,
        right: 12,
        background: 'rgba(255, 255, 255, 0.94)',
        backdropFilter: 'blur(8px)',
        padding: '10px 14px',
        borderRadius: 'var(--radius-sm)',
        boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 8,
        zIndex: 10,
        border: '1px solid var(--color-border)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <Navigation size={16} color="var(--color-primary)" />
          <span style={{ fontSize: '0.86rem', fontWeight: 600, color: 'var(--color-dark)' }}>
            {lang === 'en' ? 'Keramika Sintez on 2GIS Tashkent' : 'Keramika Sintez на карте 2GIS'}
          </span>
        </div>
        <a
          href={twoGisUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 5,
            fontSize: '0.82rem',
            fontWeight: 600,
            color: 'var(--color-primary)',
            background: 'var(--color-primary-subtle)',
            padding: '5px 10px',
            borderRadius: 4
          }}
        >
          <span>{lang === 'en' ? 'Open in 2GIS' : 'Открыть в 2GIS'}</span>
          <ExternalLink size={13} />
        </a>
      </div>
    </div>
  );
};

export default MapWidget;
