import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { AlertTriangle } from 'lucide-react';
import { asset } from '../data/stores';
import { Counter, Eyebrow, Marquee, Reveal } from './ui';

const GALLERY = ['ranaplaza1.jpg', 'ranaplaza2.jpg', 'ranaPlaza3.png', 'ranaPlaza4.png'].map(asset);
const BRANDS = ['Primark', 'Benetton', 'Camaieu', 'H&M', 'Zara', 'Bershka', 'Pull and Bear', 'Oysho', 'Stradivarius', 'Walmart'];

export default function World() {
  const imgRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: imgRef, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['-12%', '12%']);

  return (
    <section id="nel-mondo" className="relative bg-ink text-paper overflow-hidden grain">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 pt-24 md:pt-32">
        <Eyebrow n="04" className="text-alarm mb-6">Nel mondo · Rana Plaza, 2013</Eyebrow>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-end">
          <div>
            <Counter
              to={1134}
              className="block font-display font-extrabold tracking-[-0.06em] leading-[0.8] text-alarm text-[clamp(6rem,22vw,17rem)]"
            />
            <Reveal>
              <h2 className="mt-4 font-display font-extrabold text-3xl md:text-5xl tracking-tight leading-[0.95]">
                L'eccidio della <span className="font-serif font-normal italic">moda veloce.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="space-y-5 text-lg text-paper/75 leading-relaxed lg:pb-3">
            <p>
              <strong className="text-paper">1134 persone</strong> hanno perso la vita nel 2013, in Bangladesh, per colpa
              di grandi brand che continuiamo a finanziare inconsapevoli dei diritti violati.
            </p>
            <p>
              Oltre <strong className="text-paper">2500 feriti</strong>. Le crepe segnalate il giorno prima furono ignorate
              dai proprietari delle fabbriche.
            </p>
            <p className="flex items-start gap-3 rounded-2xl border border-alarm/40 bg-alarm/10 p-4 text-paper">
              <AlertTriangle className="w-5 h-5 text-alarm shrink-0 mt-0.5" />
              <span className="font-serif italic text-2xl leading-tight">Il sistema ha scelto il profitto sulla vita umana.</span>
            </p>
          </Reveal>
        </div>

        <div ref={imgRef} className="mt-16 relative h-[50vh] md:h-[70vh] rounded-3xl overflow-hidden">
          <motion.img
            src={asset('ranaplaza.jpg')}
            alt="Le macerie del Rana Plaza"
            style={{ y: imgY }}
            className="absolute inset-0 w-full h-[124%] -top-[12%] object-cover grayscale contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" />
          <p className="absolute bottom-6 left-6 right-6 text-sm text-paper/70 max-w-md">
            Savar, Bangladesh — 24 aprile 2013. Il crollo dell'edificio che ospitava diverse fabbriche tessili.
          </p>
        </div>

        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          {GALLERY.map((src, i) => (
            <Reveal key={src} delay={i * 0.06}>
              <div className="group aspect-square rounded-2xl overflow-hidden">
                <img
                  src={src}
                  alt={`Rana Plaza, immagine ${i + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition duration-700"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="relative z-10 mt-24">
        <p className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-alarm">
          Brand watchlist
        </p>
        <Marquee
          items={BRANDS}
          separator={<span className="text-alarm">/</span>}
          className="border-y border-alarm/40 py-5 font-display font-extrabold text-4xl md:text-6xl tracking-tight text-paper"
        />
      </div>
      <div className="h-24 md:h-32" />
    </section>
  );
}
