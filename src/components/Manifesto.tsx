import { useRef } from 'react';
import { motion, MotionValue, useScroll, useTransform } from 'motion/react';
import { Droplets, Factory, Heart, Plane, Sprout, Trash2, Users } from 'lucide-react';
import { asset, STORES } from '../data/stores';
import { Counter, Eyebrow, Reveal } from './ui';

const STATEMENT =
  "Siamo 5 studenti presso l'ITS di Web Development e abbiamo l'ambizione di creare un impatto positivo nella nostra comunità.";

const TEAM = ['Dennis Bottari', 'Yasmine Giuliani', 'Matteo Leto', 'Fabian Dumea', 'Diego Milli'];

const PILLARS = [
  { label: 'Consumo consapevole', text: 'Comprare meno, scegliere meglio, far durare di più.', icon: Heart },
  { label: 'Riduzione sprechi', text: 'Ogni capo usato è un capo nuovo che non serve produrre.', icon: Droplets },
  { label: 'Etica del lavoro', text: 'Dietro ogni etichetta ci sono persone e diritti.', icon: Users },
];

const LIFECYCLE = [
  { label: 'Coltivazione delle fibre', icon: Sprout },
  { label: 'Tintura chimica', icon: Factory },
  { label: 'Trasporto intercontinentale', icon: Plane },
  { label: 'Fine vita in discarica', icon: Trash2 },
];

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block mr-[0.25em]">
      {children}
    </motion.span>
  );
}

function ScrollLitText({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 45%'] });
  const words = text.split(' ');
  return (
    <p ref={ref} className="font-display font-semibold tracking-[-0.03em] leading-[1.05] text-[clamp(2rem,5vw,4.25rem)]">
      {words.map((w, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
          {w}
        </Word>
      ))}
    </p>
  );
}

export default function Manifesto() {
  return (
    <section id="chi-siamo" className="relative bg-paper text-ink overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 pt-24 md:pt-36 pb-20">
        <Eyebrow n="01" className="text-moss mb-10">Chi siamo</Eyebrow>

        <div className="grid lg:grid-cols-[1fr_320px] gap-10 lg:gap-16 items-start">
          <div>
            <ScrollLitText text={STATEMENT} />
            <Reveal className="mt-10 max-w-2xl text-lg md:text-xl leading-relaxed text-ink/75">
              Il nostro obiettivo è evidenziare l'importanza di{' '}
              <mark className="bg-lime px-1 text-ink">ridurre l'impatto ambientale</mark> legato all'industria della
              moda, caratterizzata da produzioni inquinanti e sprechi.
            </Reveal>
            <Reveal delay={0.1} className="mt-8 flex flex-wrap gap-2">
              {TEAM.map((n) => (
                <span key={n} className="rounded-full border border-ink/15 px-3.5 py-1.5 text-sm font-medium bg-white/50">
                  {n}
                </span>
              ))}
            </Reveal>
          </div>

          <motion.div
            className="hidden lg:block"
            initial={{ rotate: -10, y: 60, opacity: 0 }}
            whileInView={{ rotate: 0, y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 60, damping: 12 }}
          >
            <motion.img
              src={asset('Logo.png')}
              alt="Mascotte RevolutionMinds: un cervello che sorregge il pianeta"
              className="w-full max-w-[320px]"
              animate={{ y: [0, -12, 0], rotate: [0, 2, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
            />
          </motion.div>
        </div>

        {/* Pilastri */}
        <div className="mt-24 grid md:grid-cols-3 gap-4">
          {PILLARS.map((p, i) => (
            <Reveal key={p.label} delay={i * 0.08}>
              <div className="group h-full rounded-3xl bg-white/60 border border-ink/10 p-7 transition-all duration-300 hover:bg-ink hover:text-paper hover:-translate-y-1">
                <div className="flex items-center justify-between mb-14">
                  <span className="grid place-items-center w-12 h-12 rounded-2xl bg-lime text-ink transition-transform group-hover:rotate-[-8deg]">
                    <p.icon className="w-5 h-5" />
                  </span>
                  <span className="font-serif italic text-3xl opacity-30 group-hover:opacity-60">0{i + 1}</span>
                </div>
                <h3 className="font-display font-extrabold text-2xl tracking-tight">{p.label}</h3>
                <p className="mt-2 text-sm opacity-70">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Carbon footprint */}
        <Reveal className="mt-4">
          <div className="relative rounded-3xl bg-ink text-paper p-7 md:p-12 overflow-hidden grain">
            <div className="grid lg:grid-cols-2 gap-10 relative z-10">
              <div>
                <p className="text-lime text-xs font-semibold uppercase tracking-[0.2em] mb-4">Educational corner</p>
                <h3 className="font-display font-extrabold text-4xl md:text-5xl tracking-tight leading-[0.95]">
                  Cos'è la <span className="font-serif font-normal italic">carbon</span> footprint?
                </h3>
                <p className="mt-6 text-paper/75 leading-relaxed">
                  L'<strong className="text-lime font-semibold">impronta di carbonio</strong> è la misura dei gas serra
                  emessi dalle nostre attività quotidiane. In ambito fashion, ogni nuovo acquisto genera emissioni lungo
                  tutto il suo ciclo di vita.
                </p>
                <p className="mt-4 font-serif italic text-2xl text-paper">
                  Ridurre, riutilizzare e scegliere l'usato sono le tue armi più potenti.
                </p>
              </div>
              <ol className="relative grid gap-3 self-center">
                {LIFECYCLE.map((s, i) => (
                  <motion.li
                    key={s.label}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 * i, duration: 0.6 }}
                    className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4"
                  >
                    <span className="font-serif italic text-lime text-xl w-6">{i + 1}</span>
                    <s.icon className="w-5 h-5 text-paper/60" />
                    <span className="font-medium">{s.label}</span>
                    <span className="ml-auto text-xs text-alarm font-semibold">+ CO₂</span>
                  </motion.li>
                ))}
              </ol>
            </div>
          </div>
        </Reveal>

        {/* Numeri */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-y-10 border-t border-ink/15 pt-10">
          {[
            { to: STORES.length, label: 'negozi second hand mappati' },
            { to: 5, label: 'studenti, un progetto' },
            { to: 1134, label: 'vittime al Rana Plaza' },
            { to: 2500, suffix: '+', label: 'feriti nello stesso crollo' },
          ].map((s) => (
            <div key={s.label}>
              <Counter
                to={s.to}
                suffix={s.suffix}
                className="block font-display font-extrabold tracking-[-0.04em] text-6xl md:text-7xl"
              />
              <span className="mt-2 block text-sm text-ink/60 max-w-[14ch]">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
