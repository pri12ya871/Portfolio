import { motion } from 'framer-motion';
import { ArrowDown, Download } from './Icons';

/* Quick facts a recruiter scans for — plain text, nothing here pretends to be clickable. */
const FACTS = [
  { k: 'Status',      v: 'Open to SDE, frontend and full-stack roles' },
  { k: 'Education',   v: 'B.Tech CSE, Graphic Era Hill University' },
  { k: 'Open source', v: 'Contributor to KubeStellar' },
  { k: 'Based in',    v: 'India' },
];

const rise = (delay) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function Hero() {
  return (
    <div className="wrap pt-32 sm:pt-40 pb-20 sm:pb-28">
      <motion.p className="eyebrow" {...rise(0)}>
        <span
          aria-hidden="true"
          className="inline-block w-2 h-2 rounded-full self-center"
          style={{ background: 'var(--ok)', boxShadow: '0 0 0 4px rgba(47,107,58,.15)' }}
        />
        <span>Available for work — 2026</span>
      </motion.p>

      <motion.h1
        className="mt-6"
        style={{ fontSize: 'clamp(3.25rem, 11vw, 8.5rem)', lineHeight: 0.95, letterSpacing: '-0.035em' }}
        {...rise(0.06)}
      >
        Priya Sharma
      </motion.h1>

      <div className="mt-10 sm:mt-14 grid gap-12 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-20">
        <div>
          <motion.p
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', lineHeight: 1.3, color: 'var(--ink)' }}
            {...rise(0.14)}
          >
            Software engineer building full-stack web applications with React and Node.js — with a
            soft spot for <em style={{ color: 'var(--accent)' }}>AI</em>, security and open source.
          </motion.p>

          <motion.div className="mt-10 flex flex-wrap gap-3" {...rise(0.22)}>
            <a href="#projects" className="btn btn-solid">
              See selected work <ArrowDown size={17} />
            </a>
            <a href="/Priya_Sharma_Resume.pdf" download className="btn btn-line">
              <Download size={17} /> Résumé (PDF)
            </a>
          </motion.div>
        </div>

        <motion.dl className="m-0 self-end" {...rise(0.3)}>
          {FACTS.map(({ k, v }) => (
            <div
              key={k}
              className="grid grid-cols-[112px_1fr] gap-4 py-3"
              style={{ borderTop: '1px solid var(--rule)' }}
            >
              <dt className="mono" style={{ color: 'var(--ink-3)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '.08em', paddingTop: 3 }}>{k}</dt>
              <dd className="m-0" style={{ color: 'var(--ink)' }}>{v}</dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </div>
  );
}
