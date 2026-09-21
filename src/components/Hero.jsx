import { motion } from 'framer-motion';
import { ArrowDown, Download } from './Icons';
import portrait from '../assets/portrait.webp';

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

/* Hand-drawn underline that sits under one word */
function Scribble({ children }) {
  return (
    <span className="relative inline-block whitespace-nowrap">
      {children}
      <svg aria-hidden="true" viewBox="0 0 120 12" preserveAspectRatio="none"
        className="absolute left-0 -bottom-1.5 w-full h-[0.3em]" style={{ overflow: 'visible' }}>
        <motion.path
          d="M2 8 C 22 3, 40 11, 60 6 S 98 3, 118 7"
          fill="none" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 0.9, delay: 0.7, ease: 'easeInOut' }}
        />
      </svg>
    </span>
  );
}

export default function Hero() {
  return (
    <div className="wrap pt-28 sm:pt-36 pb-16 sm:pb-24">
      <div className="grid gap-14 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.85fr)] lg:gap-16 lg:items-center">
        <div className="order-2 lg:order-1">
          <motion.p className="eyebrow" {...rise(0)}>
            <span
              aria-hidden="true"
              className="inline-block w-2 h-2 rounded-full self-center"
              style={{ background: 'var(--ok)', boxShadow: '0 0 0 4px rgba(47,107,58,.15)' }}
            />
            <span>Available for work — 2026</span>
          </motion.p>

          <motion.h1
            className="mt-5"
            style={{ fontSize: 'clamp(3.25rem, 8.4vw, 7.25rem)', lineHeight: 0.95, letterSpacing: '-0.035em' }}
            {...rise(0.06)}
          >
            Priya<br />Sharma<span style={{ color: 'var(--accent)' }}>.</span>
          </motion.h1>

          <motion.p
            className="mt-8 max-w-[34ch]"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.4rem, 2.6vw, 1.95rem)', lineHeight: 1.32, color: 'var(--ink)' }}
            {...rise(0.14)}
          >
            Software engineer building <Scribble>full-stack</Scribble> web applications with React
            and Node.js — with a soft spot for <em style={{ color: 'var(--accent)' }}>AI</em>, security
            and open source.
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

        <motion.figure
          className="order-1 lg:order-2 m-0 relative mx-auto lg:mr-0 w-full max-w-[200px] sm:max-w-[240px] lg:max-w-[300px]"
          initial={{ opacity: 0, y: 24, rotate: 1.5 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="portrait" style={{ aspectRatio: '1 / 1' }}>
            <img
              src={portrait}
              alt="Priya Sharma at her desk with a laptop"
              width="1254" height="1254"
              fetchPriority="high"
              className="w-full h-full object-cover"
              style={{ objectPosition: '50% 35%' }}
            />
          </div>
        </motion.figure>
      </div>

      <motion.dl
        className="m-0 mt-16 sm:mt-20 grid sm:grid-cols-2 lg:grid-cols-4"
        style={{ borderTop: '1.5px solid var(--ink)' }}
        {...rise(0.3)}
      >
        {FACTS.map(({ k, v }, i) => (
          <div
            key={k}
            className={`py-4 sm:pr-6 ${i > 0 ? 'lg:pl-6 lg:border-l' : ''}`}
            style={{ borderBottom: '1px solid var(--rule)', borderColor: 'var(--rule)' }}
          >
            <dt className="mono" style={{ color: 'var(--ink-3)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '.08em' }}>{k}</dt>
            <dd className="m-0 mt-1.5" style={{ color: 'var(--ink)' }}>{v}</dd>
          </div>
        ))}
      </motion.dl>
    </div>
  );
}
