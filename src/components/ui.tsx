import React, { useEffect, useRef, useState } from 'react';
import { animate, motion, useInView, useReducedMotion } from 'motion/react';

/** Numero che conta da 0 al valore quando entra nello schermo. */
export function Counter({ to, suffix = '', className = '' }: { to: number; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px' });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(reduce ? to : 0);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, to, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to, reduce]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {value.toLocaleString('it-IT')}
      {suffix}
    </span>
  );
}

/** Nastro di testo che scorre all'infinito. */
export function Marquee({
  items,
  reverse = false,
  className = '',
  separator = '✦',
}: {
  items: string[];
  reverse?: boolean;
  className?: string;
  separator?: React.ReactNode;
}) {
  const row = (
    <div className="flex shrink-0 items-center" aria-hidden>
      {items.map((t, i) => (
        <React.Fragment key={i}>
          <span className="px-6 whitespace-nowrap">{t}</span>
          <span className="opacity-60">{separator}</span>
        </React.Fragment>
      ))}
    </div>
  );
  return (
    <div className={`overflow-hidden ${className}`} role="marquee" aria-label={items.join(', ')}>
      <div className={`flex w-max ${reverse ? 'animate-marquee-rev' : 'animate-marquee'}`}>
        {row}
        {row}
      </div>
    </div>
  );
}

/** Etichetta di sezione: numero + titolo piccolo. */
export function Eyebrow({ n, children, className = '' }: { n: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] ${className}`}>
      <span className="font-serif italic text-base normal-case tracking-normal">{n}</span>
      <span className="h-px w-8 bg-current opacity-40" />
      <span>{children}</span>
    </div>
  );
}

/** Fa comparire i figli con una leggera salita quando entrano nello schermo. */
export function Reveal({
  children,
  delay = 0,
  className = '',
  y = 32,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
