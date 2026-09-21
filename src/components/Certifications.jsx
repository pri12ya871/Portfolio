import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Reveal from './Reveal';
import SectionHeader from './SectionHeader';
import { ArrowLeft, ArrowRight, Close, Expand } from './Icons';

import hack1 from '../assets/hack1.jpeg';
import hack2 from '../assets/hack2.jpeg';
import hackimg2 from '../assets/hackimg2.jpeg';
import hackimg3 from '../assets/hackimg3.jpeg';
import hackimg5 from '../assets/hackimg5.jpeg';
import hackimg6 from '../assets/hackimg6.jpeg';
import hackimg7 from '../assets/hackimg7.jpeg';
import hackimg8 from '../assets/hackimg8.jpeg';
import hackimg9 from '../assets/hackimg9.jpeg';
import ctf1 from '../assets/ctf1.jpeg';
import ctf2 from '../assets/ctf2.jpeg';
import ctf3 from '../assets/ctf3.jpeg';
import ctf4 from '../assets/ctf4.jpeg';
import ctf5 from '../assets/ctf5.jpeg';
import goodies1 from '../assets/goodies1.jpeg';
import goodies2 from '../assets/goodies2.jpeg';
import goodies3 from '../assets/goodies3.jpeg';
import goodies4 from '../assets/goodies4.jpeg';

const ENTRIES = [
  {
    rank: 'Top 30 teams',
    title: 'Masters\' Union Hackathon',
    meta: '24-hour national hackathon · Gurugram · Team lead, team of 4',
    body: [
      'Led a team of four to build UpSpire, an AI-powered platform that helps students manage projects, build portfolios, resolve doubts through an AI professor and track their learning.',
      'We placed in the top 30 against teams from many institutions, prototyping, building and pitching a full-stack application to a judging panel inside 24 hours.',
    ],
    tags: ['React.js', 'Firebase', 'AI', 'Team leadership'],
    photos: [hack1, hackimg2, hackimg3, hackimg5, hackimg6, hackimg7, hackimg8, hackimg9],
  },
  {
    rank: 'Top 50 teams',
    title: 'Virtual Hackathon',
    meta: 'Team lead, team of 4 · Project: Arise',
    body: [
      'Led a remote team building Arise, an AI mental-wellness platform offering supportive conversations, progress tracking and personalised wellness activities.',
      'We placed in the top 50. Running the team remotely sharpened my planning, communication and architecture decisions under a hard deadline.',
    ],
    tags: ['AI', 'NLP', 'Voice AI', 'Firebase'],
    photos: [hack2],
  },
  {
    rank: 'Top 10 teams',
    title: 'Capture The Flag',
    meta: 'College cyber-security club',
    body: [
      'Solved web-security, cryptography, reverse-engineering and digital-forensics challenges, finishing in the top 10.',
    ],
    tags: ['Cryptography', 'Reverse engineering', 'Forensics', 'Linux'],
    photos: [ctf1, ctf2, ctf3, ctf4, ctf5],
  },
  {
    rank: 'Arcade finisher',
    title: 'Google Cloud Arcade',
    meta: 'Google Cloud skills programme',
    body: [
      'Completed hands-on labs across Compute Engine, Cloud Storage, networking, databases, Kubernetes and deployment — deploying, managing and monitoring applications on GCP.',
    ],
    tags: ['GCP', 'Kubernetes', 'IAM', 'Networking'],
    photos: [goodies1, goodies2, goodies3, goodies4],
  },
];

/* ── Lightbox: real dialog, focus moves in, Esc / arrows work, focus returns on close ── */
function Lightbox({ title, photos, start, onClose }) {
  const [i, setI] = useState(start);
  const closeRef = useRef(null);
  const n = photos.length;

  useEffect(() => {
    const prevFocus = document.activeElement;
    closeRef.current?.focus();
    document.body.style.overflow = 'hidden';
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setI((x) => (x + 1) % n);
      if (e.key === 'ArrowLeft') setI((x) => (x - 1 + n) % n);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      prevFocus?.focus?.();
    };
  }, [n, onClose]);

  const ctl = {
    width: 48, height: 48, borderRadius: 999, border: '1.5px solid rgba(243,239,230,.35)',
    background: 'transparent', color: 'var(--paper)', cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  };

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`${title} — photo ${i + 1} of ${n}`}
      className="fixed inset-0 z-[100] flex flex-col"
      style={{ background: 'rgba(23,20,15,.96)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <div className="wrap flex items-center justify-between h-16 shrink-0" onClick={(e) => e.stopPropagation()}>
        <p className="mono" style={{ color: 'rgba(243,239,230,.7)' }}>{title} · {i + 1} / {n}</p>
        <button ref={closeRef} type="button" style={ctl} onClick={onClose} aria-label="Close photos">
          <Close size={20} />
        </button>
      </div>

      <div className="flex-1 min-h-0 flex items-center justify-center gap-3 px-3 pb-6">
        {n > 1 && (
          <button type="button" style={ctl} className="shrink-0" aria-label="Previous photo"
            onClick={(e) => { e.stopPropagation(); setI((x) => (x - 1 + n) % n); }}>
            <ArrowLeft size={20} />
          </button>
        )}
        <img
          key={i}
          src={photos[i]}
          alt={`${title}, photo ${i + 1}`}
          className="min-w-0 max-h-full object-contain rounded-md"
          style={{ maxWidth: 'min(1000px, 100%)' }}
          onClick={(e) => e.stopPropagation()}
        />
        {n > 1 && (
          <button type="button" style={ctl} className="shrink-0" aria-label="Next photo"
            onClick={(e) => { e.stopPropagation(); setI((x) => (x + 1) % n); }}>
            <ArrowRight size={20} />
          </button>
        )}
      </div>
    </motion.div>
  );
}

function Photos({ title, photos }) {
  const [open, setOpen] = useState(null);
  const visible = photos.slice(0, 4);
  const extra = photos.length - visible.length;

  return (
    <>
      <ul className={`list-none m-0 p-0 grid gap-2 ${photos.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
        {visible.map((src, idx) => (
          <li key={src}>
            <button
              type="button"
              onClick={() => setOpen(idx)}
              className="group relative block w-full overflow-hidden rounded-md cursor-zoom-in"
              style={{ aspectRatio: photos.length === 1 ? '16 / 10' : '4 / 3', border: 0, padding: 0, background: 'var(--paper-3)' }}
              aria-label={`Open ${title} photo ${idx + 1} of ${photos.length}`}
            >
              <img src={src} alt="" loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
              {idx === visible.length - 1 && extra > 0 ? (
                <span className="absolute inset-0 flex items-center justify-center mono"
                  style={{ background: 'rgba(23,20,15,.55)', color: 'var(--paper)', fontSize: 15 }}>
                  +{extra} more
                </span>
              ) : (
                <span className="absolute right-2 bottom-2 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity"
                  style={{ background: 'var(--paper)', color: 'var(--ink)' }}>
                  <Expand size={15} />
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>
      <AnimatePresence>
        {open !== null && <Lightbox title={title} photos={photos} start={open} onClose={() => setOpen(null)} />}
      </AnimatePresence>
    </>
  );
}

export default function Certifications() {
  return (
    <div className="section" style={{ background: 'var(--paper-2)' }}>
      <div className="wrap">
        <SectionHeader
          id="achievements-title"
          num="05"
          label="Achievements"
          title={<>Hackathons &amp; <em>competitions</em></>}
          intro="Where I've built under pressure. Photos open full-size."
        />

        <ol className="list-none m-0 p-0">
          {ENTRIES.map((e) => (
            <Reveal
              as="li"
              key={e.title}
              className="grid gap-8 py-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-16"
              style={{ borderTop: '1.5px solid var(--ink)' }}
            >
              <div>
                <p className="mono inline-block px-2.5 py-1 rounded-full"
                  style={{ background: 'var(--accent-soft)', color: 'var(--accent)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '.06em' }}>
                  {e.rank}
                </p>
                <h3 className="mt-4 text-[clamp(1.75rem,3.2vw,2.4rem)]">{e.title}</h3>
                <p className="mt-2" style={{ color: 'var(--ink-3)', fontSize: 15 }}>{e.meta}</p>
                <div className="mt-5 space-y-4">
                  {e.body.map((t) => <p key={t}>{t}</p>)}
                </div>
                <p className="tag mt-5">{e.tags.join('  /  ')}</p>
              </div>
              <Photos title={e.title} photos={e.photos} />
            </Reveal>
          ))}
        </ol>
      </div>
    </div>
  );
}
