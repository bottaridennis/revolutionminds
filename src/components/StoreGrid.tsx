import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, MapPin, Plus, Search } from 'lucide-react';
import { isCity, STORES, townOf } from '../data/stores';
import { Eyebrow, Marquee, Reveal } from './ui';

const FILTERS = [
  { id: 'all', label: 'Tutti' },
  { id: 'city', label: 'Verona città' },
  { id: 'prov', label: 'Provincia' },
] as const;

type FilterId = (typeof FILTERS)[number]['id'];

export default function StoreGrid() {
  const [q, setQ] = useState('');
  const [filter, setFilter] = useState<FilterId>('all');

  const stores = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return STORES.filter((s) => {
      if (filter === 'city' && !isCity(s)) return false;
      if (filter === 'prov' && isCity(s)) return false;
      return !needle || `${s.name} ${s.address}`.toLowerCase().includes(needle);
    });
  }, [q, filter]);

  return (
    <section id="negozi" className="relative bg-paper text-ink">
      <Marquee
        items={['Consumo consapevole', 'Riduzione sprechi', 'Etica del lavoro', 'Second hand', 'Verona']}
        className="bg-lime text-ink font-display font-extrabold text-3xl md:text-5xl tracking-tight py-4 -rotate-1 scale-[1.02] border-y-2 border-ink"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-24 md:py-32">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12">
          <div>
            <Eyebrow n="03" className="text-moss mb-6">Elenco negozi</Eyebrow>
            <Reveal>
              <h2 className="font-display font-extrabold tracking-[-0.04em] leading-[0.9] text-[clamp(2.75rem,8vw,6.5rem)]">
                Seconda mano,
                <br />
                <span className="font-serif font-normal italic text-moss">prima scelta.</span>
              </h2>
            </Reveal>
          </div>

          <div className="flex flex-col gap-3 w-full lg:w-auto">
            <label className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Cerca per nome o zona…"
                className="w-full lg:w-80 rounded-full bg-white border border-ink/15 pl-11 pr-4 py-3 outline-none focus:border-ink focus:ring-4 focus:ring-lime/60 transition"
              />
            </label>
            <div className="flex gap-2">
              {FILTERS.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFilter(f.id)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold border transition-colors ${
                    filter === f.id ? 'bg-ink text-paper border-ink' : 'border-ink/15 hover:border-ink'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {stores.map((s) => (
              <motion.a
                layout
                key={s.id}
                href={s.maps}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
                className="group relative block aspect-[4/5] rounded-3xl overflow-hidden bg-ink text-paper"
              >
                <img
                  src={s.image}
                  alt={s.name}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
                <span className="absolute top-4 left-4 rounded-full bg-ink/60 backdrop-blur px-3 py-1 font-serif italic text-sm">
                  {String(s.id).padStart(2, '0')}
                </span>
                <span className="absolute top-4 right-4 grid place-items-center w-11 h-11 rounded-full bg-lime text-ink scale-0 group-hover:scale-100 transition-transform duration-300">
                  <ArrowUpRight className="w-5 h-5" />
                </span>
                <div className="absolute bottom-0 inset-x-0 p-6">
                  <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-lime mb-2">
                    <MapPin className="w-3.5 h-3.5" /> {townOf(s)}
                  </p>
                  <h3 className="font-display font-extrabold text-3xl tracking-tight leading-none">{s.name}</h3>
                  <p className="mt-2 text-sm text-paper/60 line-clamp-1 transition-all group-hover:text-paper/90">
                    {s.address}
                  </p>
                </div>
              </motion.a>
            ))}
          </AnimatePresence>

          <motion.div
            layout
            className="aspect-[4/5] rounded-3xl border-2 border-dashed border-ink/20 flex flex-col items-center justify-center text-center p-8 hover:border-ink hover:bg-white/60 transition-colors"
          >
            <span className="grid place-items-center w-14 h-14 rounded-full bg-lime mb-5">
              <Plus className="w-6 h-6" />
            </span>
            <p className="font-display font-extrabold text-2xl tracking-tight">Manca un negozio?</p>
            <p className="mt-2 text-sm text-ink/60 font-serif italic text-lg">Inviaci i dettagli e lo aggiungiamo alla mappa.</p>
          </motion.div>
        </motion.div>

        {stores.length === 0 && (
          <p className="mt-6 text-center text-ink/60">Nessun negozio trovato per “{q}”.</p>
        )}
      </div>
    </section>
  );
}
