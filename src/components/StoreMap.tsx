import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import { ArrowUpRight, Lock, Maximize2, Unlock } from 'lucide-react';
import { STORES, Store, townOf } from '../data/stores';
import { Eyebrow, Reveal } from './ui';

const pin = (active: boolean) =>
  L.divIcon({
    className: 'rm-marker',
    html: `<div class="rm-pin ${active ? 'is-active' : ''}"><span></span></div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -14],
  });

const ALL_BOUNDS = L.latLngBounds(STORES.map((s) => [s.lat, s.lng] as [number, number]));

function MapController({
  selected,
  unlocked,
  resetKey,
  markers,
}: {
  selected: Store | null;
  unlocked: boolean;
  resetKey: number;
  markers: React.MutableRefObject<Record<number, L.Marker | null>>;
}) {
  const map = useMap();

  useEffect(() => {
    map.fitBounds(ALL_BOUNDS, { padding: [40, 40], animate: resetKey > 0 });
  }, [map, resetKey]);

  useEffect(() => {
    const t = setTimeout(() => map.invalidateSize(), 400);
    return () => clearTimeout(t);
  }, [map]);

  useEffect(() => {
    if (!selected) return;
    map.flyTo([selected.lat, selected.lng], 15, { duration: 1.2 });
    const t = setTimeout(() => markers.current[selected.id]?.openPopup(), 1250);
    return () => clearTimeout(t);
  }, [map, selected, markers]);

  useEffect(() => {
    const handlers = [map.dragging, map.touchZoom, map.doubleClickZoom, map.scrollWheelZoom];
    handlers.forEach((h) => (unlocked ? h.enable() : h.disable()));
    if (!unlocked) return;
    const zoom = L.control.zoom({ position: 'bottomright' }).addTo(map);
    return () => {
      zoom.remove();
    };
  }, [map, unlocked]);

  return null;
}

export default function StoreMap() {
  const [selected, setSelected] = useState<Store | null>(null);
  const [unlocked, setUnlocked] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const markers = useRef<Record<number, L.Marker | null>>({});
  const listRef = useRef<HTMLDivElement>(null);

  // Mantiene visibile nella lista il negozio selezionato
  useEffect(() => {
    if (!selected || !listRef.current) return;
    const el = listRef.current.querySelector<HTMLElement>(`[data-id="${selected.id}"]`);
    if (el) listRef.current.scrollTo({ top: el.offsetTop - 8, behavior: 'smooth' });
  }, [selected]);

  return (
    <section id="mappa" className="relative bg-ink text-paper overflow-hidden grain">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-24 md:py-32">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <Eyebrow n="02" className="text-lime mb-6">Mappa negozi</Eyebrow>
            <Reveal>
              <h2 className="font-display font-extrabold tracking-[-0.04em] leading-[0.9] text-[clamp(2.75rem,8vw,6.5rem)]">
                Il second hand <br />
                <span className="font-serif font-normal italic text-lime">è dietro l'angolo.</span>
              </h2>
            </Reveal>
          </div>
          <p className="max-w-xs text-paper/60">
            {STORES.length} negozi tra Verona e provincia. Tocca un nome nella lista e la mappa ti ci porta.
          </p>
        </div>

        <div className="grid lg:grid-cols-[340px_1fr] gap-4 rounded-3xl lg:border lg:border-white/10 lg:p-3 lg:bg-white/[0.02]">
          {/* Lista */}
          <div
            ref={listRef}
            className="order-2 lg:order-1 relative max-h-[320px] lg:max-h-[600px] overflow-y-auto space-y-1 pr-1"
          >
            {STORES.map((s) => {
              const on = selected?.id === s.id;
              return (
                <button
                  key={s.id}
                  data-id={s.id}
                  onClick={() => setSelected(s)}
                  className={`w-full text-left flex items-center gap-3 rounded-2xl p-2.5 transition-colors ${
                    on ? 'bg-lime text-ink' : 'hover:bg-white/5'
                  }`}
                >
                  <img src={s.image} alt="" loading="lazy" className="w-12 h-12 rounded-xl object-cover shrink-0" />
                  <span className="min-w-0">
                    <span className="block font-semibold truncate">{s.name}</span>
                    <span className={`block text-xs truncate ${on ? 'text-ink/70' : 'text-paper/50'}`}>{townOf(s)}</span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Mappa */}
          <div className="order-1 lg:order-2 relative h-[60vh] min-h-[420px] lg:h-[600px] rounded-2xl overflow-hidden border border-white/10">
            <MapContainer
              center={[45.4396, 10.9913]}
              zoom={11}
              zoomControl={false}
              scrollWheelZoom={false}
              className="h-full w-full"
            >
              <MapController selected={selected} unlocked={unlocked} resetKey={resetKey} markers={markers} />
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              />
              {STORES.map((s) => (
                <Marker
                  key={s.id}
                  position={[s.lat, s.lng]}
                  icon={pin(selected?.id === s.id)}
                  ref={(m) => {
                    markers.current[s.id] = m;
                  }}
                  eventHandlers={{ click: () => setSelected(s) }}
                >
                  <Popup closeButton={false}>
                    <img src={s.image} alt="" className="w-full h-28 object-cover" />
                    <div className="p-4">
                      <h4 className="font-display font-extrabold text-lg leading-tight">{s.name}</h4>
                      <p className="mt-1 text-xs text-paper/60 leading-snug">{s.address}</p>
                      <a
                        href={s.maps}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-3 flex items-center justify-center gap-1.5 rounded-full bg-lime !text-ink py-2 text-sm font-semibold"
                      >
                        Apri in Maps <ArrowUpRight className="w-4 h-4" />
                      </a>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>

            <div className="absolute top-3 right-3 z-[500] flex gap-2">
              <button
                onClick={() => {
                  setSelected(null);
                  setResetKey((k) => k + 1);
                }}
                className="grid place-items-center w-10 h-10 rounded-full bg-ink/80 backdrop-blur border border-white/15 hover:bg-lime hover:text-ink transition-colors"
                aria-label="Mostra tutti i negozi"
                title="Mostra tutti"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setUnlocked((u) => !u)}
                className={`inline-flex items-center gap-2 h-10 px-4 rounded-full backdrop-blur border text-sm font-semibold transition-colors ${
                  unlocked ? 'bg-lime text-ink border-lime' : 'bg-ink/80 border-white/15 hover:border-lime'
                }`}
              >
                {unlocked ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                {unlocked ? 'Mappa libera' : 'Sblocca mappa'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
