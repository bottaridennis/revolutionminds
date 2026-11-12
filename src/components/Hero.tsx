import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowDown, MapPin, Volume2, VolumeX } from 'lucide-react';
import { asset, STORES } from '../data/stores';

const LINES = [
  ['Vesti', 'il'],
  ['cambiamento.'],
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    videoRef.current?.play().catch(() => {
      /* autoplay bloccato: resta il poster */
    });
  }, []);

  let wordIndex = 0;

  return (
    <section id="top" ref={ref} className="relative h-[100svh] min-h-[620px] overflow-hidden bg-ink text-paper grain">
      <motion.video
        ref={videoRef}
        src={asset('video.mp4')}
        poster={asset('clothes.jpg')}
        autoPlay
        muted={muted}
        loop
        playsInline
        style={{ scale }}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/30 to-ink" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-transparent to-transparent" />

      <motion.div
        style={{ y: textY, opacity: fade }}
        className="relative z-10 h-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 flex flex-col justify-end pb-28 md:pb-20"
      >
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/5 backdrop-blur px-3 py-1.5 text-xs font-medium mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-lime animate-pulse" />
          Second hand a Verona · {STORES.length} negozi mappati
        </motion.div>

        <h1 className="font-display font-extrabold tracking-[-0.04em] leading-[0.88] text-[clamp(3.5rem,13vw,11rem)]">
          {LINES.map((line, li) => (
            <span key={li} className="block overflow-hidden pb-[0.06em]">
              {line.map((w) => {
                const i = wordIndex++;
                const isLast = li === LINES.length - 1;
                return (
                  <motion.span
                    key={w}
                    className={`inline-block mr-[0.22em] ${isLast ? 'text-lime' : ''}`}
                    initial={{ y: '110%' }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.25 + i * 0.12, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {w}
                  </motion.span>
                );
              })}
            </span>
          ))}
        </h1>

        <div className="mt-8 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="max-w-md text-lg md:text-xl text-paper/80 leading-snug"
          >
            Ridurre l'impatto ambientale della moda{' '}
            <span className="font-serif italic text-paper text-2xl">attraverso il consumo consapevole.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex flex-wrap items-center gap-3"
          >
            <a
              href="#mappa"
              className="group inline-flex items-center gap-2 rounded-full bg-lime text-ink pl-5 pr-2 py-2 font-semibold hover:bg-paper transition-colors"
            >
              Trova un negozio
              <span className="grid place-items-center w-9 h-9 rounded-full bg-ink text-lime transition-transform group-hover:rotate-[-20deg]">
                <MapPin className="w-4 h-4" />
              </span>
            </a>
            <a
              href="#nel-mondo"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-3.5 font-semibold hover:bg-white/10 transition-colors"
            >
              Il costo nascosto
            </a>
          </motion.div>
        </div>
      </motion.div>

      <button
        onClick={() => setMuted((m) => !m)}
        className="absolute z-20 top-20 right-4 sm:right-6 lg:right-10 inline-flex items-center gap-2 rounded-full bg-ink/50 backdrop-blur border border-white/20 px-3.5 py-2 text-xs font-semibold text-paper hover:bg-lime hover:text-ink hover:border-lime transition-colors"
        aria-label={muted ? 'Attiva audio' : 'Disattiva audio'}
      >
        {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        {muted ? 'Attiva audio' : 'Muto'}
      </button>

      <a
        href="#chi-siamo"
        aria-label="Scorri giù"
        className="hidden md:flex absolute z-20 bottom-8 left-1/2 -translate-x-1/2 w-11 h-11 rounded-full border border-white/25 items-center justify-center text-paper/80 hover:text-lime hover:border-lime transition-colors"
      >
        <motion.span animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>
          <ArrowDown className="w-4 h-4" />
        </motion.span>
      </a>
    </section>
  );
}
