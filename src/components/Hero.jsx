import { useRef, useState, useCallback, useMemo } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi';
import { HiDownload, HiMail } from 'react-icons/hi';
import { BsFillGrid3X3GapFill } from 'react-icons/bs';
import heroImg from '../assets/img.jpeg';

/* ─────────────────────────────────────────
   KEYWORD HIGHLIGHT
───────────────────────────────────────── */
const KEYWORDS = ['React', 'Software Engineer', 'AI', 'Blockchain', 'UpSpire', 'REST APIs', 'Frontend'];

function highlightKeywords(text) {
  const parts = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    let earliest = -1;
    let matchedKw = null;

    for (const kw of KEYWORDS) {
      const idx = remaining.indexOf(kw);
      if (idx !== -1 && (earliest === -1 || idx < earliest)) {
        earliest = idx;
        matchedKw = kw;
      }
    }

    if (earliest === -1) {
      parts.push(<span key={key++}>{remaining}</span>);
      break;
    }
    if (earliest > 0) parts.push(<span key={key++}>{remaining.slice(0, earliest)}</span>);

    parts.push(
      <span
        key={key++}
        className="font-semibold"
        style={{
          background: 'linear-gradient(135deg,#06B6D4,#2563EB)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          filter: 'drop-shadow(0 0 6px rgba(6,182,212,0.35))',
        }}
      >
        {matchedKw}
      </span>
    );

    remaining = remaining.slice(earliest + matchedKw.length);
  }
  return parts;
}

/* ─────────────────────────────────────────
   FULL INTRODUCTION PARAGRAPHS
───────────────────────────────────────── */
const PARAGRAPHS = [
  `Hello, I'm Priya Sharma, a passionate software developer and B.Tech graduate in Computer Science Engineering from Graphic Era Hill University, Dehradun. I have a strong interest in frontend engineering, AI, cybersecurity, and building real-world applications that make a meaningful impact.`,
  `I have hands-on experience building responsive full-stack web applications using React, Node.js, JavaScript, and integrating REST APIs. I have also worked with Python, Firebase, Blockchain, and AI-based solutions across academic and personal projects, developing a broad and practical understanding of modern software development.`,
  `One of my key achievements is building UpSpire — an AI-powered student learning platform — and contributing to the KubeStellar open-source project on GitHub. I enjoy solving challenging problems, collaborating with teams, and delivering polished software under tight deadlines.`,
  `I am currently seeking opportunities as a Software Engineer or Frontend Developer where I can continue growing, contribute meaningfully to impactful products, and work alongside experienced professionals in a collaborative environment.`,
];

/* ─────────────────────────────────────────
   SOCIAL LINKS
───────────────────────────────────────── */
const SOCIAL = [
  { icon: FiLinkedin, label: 'LinkedIn',  href: 'https://www.linkedin.com/in/priya-sharma-a65902253/', color: '#0A66C2' },
  { icon: FiGithub,   label: 'GitHub',    href: 'https://github.com/pri12ya871',                       color: '#E6EDF3' },
  { icon: FiTwitter,  label: 'X',         href: 'https://x.com/PriyaNautiyal11',                       color: '#1D9BF0' },
];

/* ─────────────────────────────────────────
   BACKGROUND PARTICLES — memo so they
   don't regenerate on every render
───────────────────────────────────────── */
function Particles() {
  const list = useMemo(() =>
    Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      dur: Math.random() * 8 + 5,
      delay: Math.random() * 4,
      op: Math.random() * 0.35 + 0.1,
    })), []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {list.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`, top: `${p.y}%`,
            width: p.size, height: p.size,
            background: p.id % 3 === 0 ? '#2563EB' : p.id % 3 === 1 ? '#06B6D4' : '#7C3AED',
            opacity: p.op,
          }}
          animate={{ y: [-12, 12, -12], x: [-6, 6, -6], opacity: [p.op * 0.4, p.op, p.op * 0.4] }}
          transition={{ duration: p.dur, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────
   GRID LINES
───────────────────────────────────────── */
function GridLines() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none"
      style={{
        opacity: 0.025,
        backgroundImage: `
          linear-gradient(rgba(37,99,235,0.6) 1px, transparent 1px),
          linear-gradient(90deg, rgba(37,99,235,0.6) 1px, transparent 1px)
        `,
        backgroundSize: '64px 64px',
      }}
    />
  );
}

/* ─────────────────────────────────────────
   CTA BUTTON with ripple
───────────────────────────────────────── */
function CTAButton({ children, href, variant = 'primary', icon }) {
  const [ripples, setRipples] = useState([]);
  const ref = useRef(null);

  const addRipple = e => {
    const rect = ref.current.getBoundingClientRect();
    const id = Date.now();
    setRipples(r => [...r, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }]);
    setTimeout(() => setRipples(r => r.filter(rp => rp.id !== id)), 900);
  };

  const styles = {
    primary: {
      background: 'linear-gradient(135deg,#2563EB,#06B6D4)',
      color: '#fff',
      boxShadow: '0 4px 20px rgba(37,99,235,0.38)',
      border: 'none',
    },
    secondary: {
      background: 'rgba(255,255,255,0.07)',
      color: '#F1F5F9',
      border: '1px solid rgba(255,255,255,0.12)',
    },
    outline: {
      background: 'transparent',
      color: '#06B6D4',
      border: '1px solid rgba(6,182,212,0.45)',
    },
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel="noopener noreferrer"
      onMouseDown={addRipple}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.96 }}
      className="relative flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm overflow-hidden select-none"
      style={{ fontFamily: 'Inter', textDecoration: 'none', ...styles[variant] }}
      onMouseEnter={e => {
        if (variant === 'primary') e.currentTarget.style.boxShadow = '0 8px 32px rgba(37,99,235,0.55)';
      }}
      onMouseLeave={e => {
        if (variant === 'primary') e.currentTarget.style.boxShadow = '0 4px 20px rgba(37,99,235,0.38)';
      }}
    >
      {icon && <span className="text-sm">{icon}</span>}
      {children}
      {ripples.map(r => (
        <span
          key={r.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: r.x - 12, top: r.y - 12,
            width: 24, height: 24,
            background: 'rgba(255,255,255,0.28)',
            animation: 'ripple 0.85s ease-out forwards',
          }}
        />
      ))}
    </motion.a>
  );
}

/* ─────────────────────────────────────────
   HERO IMAGE
   • Tall portrait card (4:5 ratio) instead of a forced circle
     so the full face + shoulders are always visible
   • Rotated gradient border frame
   • Floating glow blobs behind it
   • Gentle float + 3-D parallax on mouse move
   • Hover zoom on the photo itself
───────────────────────────────────────── */
function HeroImage() {
  const containerRef = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 40, damping: 18, mass: 1 });
  const sy = useSpring(my, { stiffness: 40, damping: 18, mass: 1 });
  const rx = useTransform(sy, [-180, 180], [4, -4]);
  const ry = useTransform(sx, [-180, 180], [-4, 4]);

  const onMove = useCallback(e => {
    const r = containerRef.current?.getBoundingClientRect();
    if (!r) return;
    mx.set(e.clientX - r.left - r.width / 2);
    my.set(e.clientY - r.top - r.height / 2);
  }, [mx, my]);

  const onLeave = useCallback(() => { mx.set(0); my.set(0); }, [mx, my]);

  /* Portrait dimensions: width × (5/4) tall */
  const W = 'clamp(280px, 32vw, 420px)';
  const H = 'clamp(350px, 40vw, 525px)';

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex items-center justify-center"
      style={{ width: W, flexShrink: 0 }}
    >
      {/* ── Ambient glow blobs ── */}
      <motion.div
        animate={{ scale: [1, 1.22, 1], opacity: [0.18, 0.28, 0.18] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute rounded-full blur-3xl pointer-events-none"
        style={{
          width: '130%', height: '100%',
          background: 'radial-gradient(ellipse, rgba(37,99,235,0.55) 0%, rgba(124,58,237,0.18) 55%, transparent 70%)',
        }}
      />
      <motion.div
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.12, 0.22, 0.12] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1.8 }}
        className="absolute rounded-full blur-3xl pointer-events-none"
        style={{
          width: '100%', height: '80%',
          background: 'radial-gradient(ellipse, rgba(6,182,212,0.4) 0%, transparent 65%)',
        }}
      />

      {/* ── Spinning gradient ring ── */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
        className="absolute pointer-events-none"
        style={{
          width: 'calc(100% + 12px)',
          height: `calc(${H} + 12px)`,
          borderRadius: 28,
          background: 'conic-gradient(from 0deg, #2563EB 0%, #06B6D4 28%, #7C3AED 55%, transparent 75%, #2563EB 100%)',
          padding: '1.5px',
        }}
      >
        <div className="w-full h-full" style={{ borderRadius: 26, background: '#050816' }} />
      </motion.div>

      {/* ── Slow counter-spin dashed ring ── */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute pointer-events-none"
        style={{
          width: 'calc(100% + 30px)',
          height: `calc(${H} + 30px)`,
          borderRadius: 34,
          border: '1px dashed rgba(6,182,212,0.16)',
        }}
      />

      {/* ── 3-D tilt + float + photo ── */}
      <motion.div
        style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d', perspective: 1000 }}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
        className="relative z-10"
      >
        {/* Photo card */}
        <motion.div
          whileHover={{ scale: 1.025 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{
            width: W,
            height: H,
            borderRadius: 24,
            overflow: 'hidden',
            boxShadow: [
              '0 0 0 2px rgba(37,99,235,0.55)',
              '0 0 0 6px rgba(6,182,212,0.1)',
              '0 0 0 11px rgba(37,99,235,0.04)',
              '0 28px 80px rgba(37,99,235,0.48)',
              '0 0 90px rgba(6,182,212,0.16)',
            ].join(', '),
          }}
        >
          <img
            src={heroImg}
            alt="Priya Sharma — Software Engineer"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              /* Pull image up so face is well-centred in the frame */
              objectPosition: 'center 18%',
              display: 'block',
              transition: 'transform 0.55s cubic-bezier(0.22,1,0.36,1)',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.06)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
          />
          {/* Subtle depth vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: [
                'linear-gradient(180deg, rgba(5,8,22,0.08) 0%, transparent 30%)',
                'linear-gradient(0deg,   rgba(5,8,22,0.18) 0%, transparent 35%)',
              ].join(', '),
            }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   HERO SECTION
   Layout: image LEFT (desktop), text RIGHT
   On mobile: image on top, text below
───────────────────────────────────────── */
export default function Hero() {
  return (
    <div
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ background: '#050816' }}
    >
      <GridLines />
      <Particles />

      {/* Background ambient blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <motion.div
          animate={{ scale: [1, 1.18, 1], x: [0, 35, 0], y: [0, -25, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-40 -left-40 w-[560px] h-[560px] rounded-full blur-3xl opacity-[0.09]"
          style={{ background: 'radial-gradient(circle, #2563EB, transparent 70%)' }}
        />
        <motion.div
          animate={{ scale: [1, 1.25, 1], x: [0, -30, 0], y: [0, 35, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute -bottom-40 -right-40 w-[560px] h-[560px] rounded-full blur-3xl opacity-[0.08]"
          style={{ background: 'radial-gradient(circle, #06B6D4, transparent 70%)' }}
        />
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-20 pb-12">

          {/*
            DESKTOP: text LEFT (order-1) | image RIGHT (order-2)
            MOBILE:  image TOP (order-1) | text BOTTOM (order-2)
          */}
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-14 min-h-[calc(100vh-9rem)]">

            {/* ── TEXT — left on desktop, bottom on mobile ── */}
            <div className="flex-1 flex flex-col justify-center order-2 lg:order-1">

              {/* Status badge */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.05 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 self-start"
                style={{ background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.28)' }}
              >
                <motion.div
                  animate={{ opacity: [1, 0.25, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: '#06B6D4' }}
                />
                <span className="text-xs font-medium" style={{ color: '#06B6D4', fontFamily: 'Inter' }}>
                  Open to Work · SDE / Frontend / Full Stack
                </span>
              </motion.div>

              {/* Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.12 }}
                className="font-black leading-tight mb-3"
                style={{ fontFamily: 'Sora, sans-serif', fontSize: 'clamp(2.6rem, 5vw, 4rem)' }}
              >
                <span className="text-white">Hello, I'm</span>
                <br />
                <span
                  style={{
                    background: 'linear-gradient(135deg, #fff 0%, #06B6D4 45%, #2563EB 100%)',
                    backgroundSize: '200% 200%',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    animation: 'gradientShift 5s ease infinite',
                  }}
                >
                  Priya Sharma
                </span>
              </motion.h1>

              {/* Subtitle pill */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.22 }}
                className="flex flex-wrap items-center gap-2 mb-7"
              >
                <span className="text-base font-medium" style={{ color: '#94A3B8', fontFamily: 'Inter' }}>
                  B.Tech Graduate in
                </span>
                <span
                  className="px-3 py-1 rounded-lg text-base font-semibold"
                  style={{
                    background: 'rgba(37,99,235,0.14)',
                    border: '1px solid rgba(37,99,235,0.3)',
                    color: '#93C5FD',
                    fontFamily: 'Sora',
                  }}
                >
                  Computer Science Engineering
                </span>
              </motion.div>

              {/* Full paragraphs */}
              <div className="space-y-4 mb-9">
                {PARAGRAPHS.map((para, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                    className="text-base leading-relaxed"
                    style={{ color: '#94A3B8', fontFamily: 'Inter', lineHeight: 1.8 }}
                  >
                    {highlightKeywords(para)}
                  </motion.p>
                ))}
              </div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.6 }}
                className="flex flex-wrap gap-3 mb-8"
              >
                <CTAButton href="/PRIYA_SOFTWARE_RESUME.pdf" variant="primary" icon={<HiDownload />}>
                  Download Resume
                </CTAButton>
                <CTAButton href="#contact" variant="secondary" icon={<HiMail />}>
                  Contact Me
                </CTAButton>
                <CTAButton href="#projects" variant="outline" icon={<BsFillGrid3X3GapFill />}>
                  View Projects
                </CTAButton>
              </motion.div>

              {/* Social icons */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.55, delay: 0.72 }}
                className="flex items-center gap-3"
              >
                <span className="text-xs" style={{ color: '#475569', fontFamily: 'Inter' }}>Find me on</span>
                <div className="w-6 h-px" style={{ background: 'rgba(255,255,255,0.1)' }} />
                <div className="flex items-center gap-2">
                  {SOCIAL.map(({ icon: Icon, label, href, color }) => (
                    <motion.a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      whileHover={{ scale: 1.18, y: -3 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-9 h-9 rounded-xl flex items-center justify-center"
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = `${color}1e`;
                        e.currentTarget.style.borderColor = `${color}44`;
                        e.currentTarget.style.boxShadow = `0 0 18px ${color}40`;
                        e.currentTarget.querySelector('svg').style.color = color;
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                        e.currentTarget.style.boxShadow = 'none';
                        e.currentTarget.querySelector('svg').style.color = '#94A3B8';
                      }}
                    >
                      <Icon className="text-base" style={{ color: '#94A3B8', transition: 'color 0.2s' }} />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* ── IMAGE — right on desktop, top on mobile ── */}
            <div className="flex-shrink-0 flex items-center justify-center order-1 lg:order-2">
              <HeroImage />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
      >
        <span className="text-[10px] tracking-[0.25em] uppercase" style={{ color: '#334155', fontFamily: 'Inter' }}>
          Scroll
        </span>
        <div className="w-px h-10 relative overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
          <motion.div
            className="absolute top-0 left-0 w-full"
            style={{ background: 'linear-gradient(180deg,#2563EB,#06B6D4)', height: '40%' }}
            animate={{ y: ['0%', '260%'] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </div>
  );
}
