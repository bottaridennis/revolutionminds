import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { Globe, Map as MapIcon, Store, Users, ArrowUpRight } from 'lucide-react';
import { asset } from '../data/stores';

export const SECTIONS = [
  { id: 'chi-siamo', label: 'Chi siamo', icon: Users },
  { id: 'mappa', label: 'Mappa', icon: MapIcon },
  { id: 'negozi', label: 'Negozi', icon: Store },
  { id: 'nel-mondo', label: 'Nel mondo', icon: Globe },
];

export const QUIZ_URL = 'https://www.thredup.com/fashionfootprint/';

function useActiveSection() {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    const hero = document.getElementById('top');
    if (hero) obs.observe(hero);
    return () => obs.disconnect();
  }, []);
  return active;
}

export default function Nav() {
  const active = useActiveSection();
  const { scrollYProgress, scrollY } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => scrollY.on('change', (v) => setScrolled(v > 40)), [scrollY]);

  return (
    <>
      {/* Barra di avanzamento */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-lime origin-left z-[60]"
        style={{ scaleX: progress }}
      />

      {/* Barra superiore */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-ink/80 backdrop-blur-xl border-b border-white/10' : 'bg-transparent'
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 h-16 flex items-center justify-between text-paper">
          <a href="#top" className="flex items-center gap-2.5 group">
            <img src={asset('Logo.png')} alt="" className="w-9 h-9 object-contain transition-transform group-hover:rotate-12" />
            <span className="font-display font-extrabold text-lg tracking-tight leading-none">
              Revolution<span className="text-lime">Minds</span>
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-1 rounded-full bg-white/5 border border-white/10 p-1">
            {SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  active === s.id ? 'text-ink' : 'text-paper/70 hover:text-paper'
                }`}
              >
                {active === s.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-lime"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative">{s.label}</span>
              </a>
            ))}
          </nav>

          <a
            href={QUIZ_URL}
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-paper text-ink px-4 py-2 text-sm font-semibold hover:bg-lime transition-colors"
          >
            Fai il quiz <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </header>

      {/* Navigazione mobile in basso */}
      <nav className="md:hidden fixed bottom-3 inset-x-3 z-50 rounded-2xl bg-ink/90 backdrop-blur-xl border border-white/10 shadow-2xl">
        <div className="grid grid-cols-4">
          {SECTIONS.map((s) => {
            const on = active === s.id;
            return (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={`flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium transition-colors ${
                  on ? 'text-lime' : 'text-paper/60'
                }`}
              >
                <s.icon className="w-5 h-5" strokeWidth={on ? 2.5 : 1.75} />
                {s.label}
              </a>
            );
          })}
        </div>
      </nav>
    </>
  );
}
