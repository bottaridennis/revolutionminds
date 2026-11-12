/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import Nav, { QUIZ_URL, SECTIONS } from './components/Nav';
import Hero from './components/Hero';
import Manifesto from './components/Manifesto';
import StoreMap from './components/StoreMap';
import StoreGrid from './components/StoreGrid';
import World from './components/World';
import { asset } from './data/stores';

const SHIRTS = [
  { src: 'yellow-shirt.png', left: '6%', top: '14%' },
  { src: 'blue-shirt.png', left: '80%', top: '10%' },
  { src: 'red-shirt.png', left: '10%', top: '72%' },
  { src: 'orange-shirt.png', left: '84%', top: '66%' },
  { src: 'wite-shirt.png', left: '62%', top: '84%' },
];

function QuizCta() {
  return (
    <section className="relative bg-lime text-ink overflow-hidden">
      {/* Magliette che fluttuano */}
      {SHIRTS.map((s, i) => (
        <motion.img
          key={s.src}
          src={asset(s.src)}
          alt=""
          aria-hidden
          className="absolute w-16 md:w-24 opacity-90 pointer-events-none"
          style={{ left: s.left, top: s.top }}
          animate={{ y: [0, -18, 0], rotate: [i * 7 - 14, i * 7 - 4, i * 7 - 14] }}
          transition={{ repeat: Infinity, duration: 4 + i * 0.7, ease: 'easeInOut' }}
        />
      ))}
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-10 py-28 md:py-40 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-6">Scopri il tuo impatto</p>
        <h2 className="font-display font-extrabold tracking-[-0.04em] leading-[0.9] text-[clamp(2.75rem,9vw,7.5rem)]">
          Quanto inquina
          <br />
          <span className="font-serif font-normal italic">il tuo armadio?</span>
        </h2>
        <p className="mt-6 text-lg max-w-md mx-auto text-ink/75">
          Fai il quiz e scopri la tua impronta ecologica. Ci vogliono pochi minuti.
        </p>
        <a
          href={QUIZ_URL}
          target="_blank"
          rel="noreferrer"
          className="group mt-10 inline-flex items-center gap-3 rounded-full bg-ink text-paper pl-7 pr-2 py-2 text-lg font-semibold hover:scale-[1.03] transition-transform"
        >
          Vai al quiz
          <span className="grid place-items-center w-12 h-12 rounded-full bg-lime text-ink transition-transform group-hover:rotate-45">
            <ArrowUpRight className="w-5 h-5" />
          </span>
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-ink text-paper pt-20 pb-28 md:pb-10 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col md:flex-row justify-between gap-10">
          <div className="max-w-sm">
            <img src={asset('Logo.png')} alt="" className="w-16 h-16 object-contain mb-4" />
            <p className="text-paper/60">
              Una piattaforma per promuovere il consumo sostenibile e il second hand a Verona e provincia.
            </p>
          </div>
          <nav className="grid grid-cols-2 gap-x-12 gap-y-3 text-sm">
            {SECTIONS.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="text-paper/70 hover:text-lime transition-colors">
                {s.label}
              </a>
            ))}
          </nav>
        </div>
        <p
          aria-hidden
          className="mt-16 font-display font-extrabold tracking-[-0.06em] leading-[0.8] text-[clamp(3rem,15.5vw,14rem)] text-outline-lime select-none whitespace-nowrap"
        >
          RevolutionMinds
        </p>
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col md:flex-row gap-2 justify-between text-xs text-paper/50">
          <span>Made by Bottari, Giuliani, Leto, Dumea, Milli · ITS Web Development</span>
          <span>Verona · 2024</span>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Manifesto />
        <StoreMap />
        <StoreGrid />
        <World />
        <QuizCta />
      </main>
      <Footer />
    </>
  );
}
