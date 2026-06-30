import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { FiGithub, FiLinkedin, FiTwitter, FiHeart, FiArrowUp, FiMail } from 'react-icons/fi';

const NAV_LINKS = [
  { label: 'Home',            href: '#home'           },
  { label: 'Skills',          href: '#skills'         },
  { label: 'Projects',        href: '#projects'       },
  { label: 'Experience',      href: '#experience'     },
  { label: 'Certifications',  href: '#certifications' },
  { label: 'Resume',          href: '#resume'         },
  { label: 'Contact',         href: '#contact'        },
];

const SOCIALS = [
  { icon: FiGithub,   href: 'https://github.com/pri12ya871',                       label: 'GitHub',   color: '#E6EDF3' },
  { icon: FiLinkedin, href: 'https://www.linkedin.com/in/priya-sharma-a65902253/', label: 'LinkedIn', color: '#0A66C2' },
  { icon: FiTwitter,  href: 'https://x.com/PriyaNautiyal11',                       label: 'Twitter',  color: '#1D9BF0' },
  { icon: FiMail,     href: 'mailto:priyanautiyal978@gmail.com',                   label: 'Email',    color: '#2563EB' },
];

/* ── Wave SVG divider ── */
function WaveDivider() {
  return (
    <div className="w-full overflow-hidden leading-none" style={{ height: 60 }}>
      <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-full" style={{ display: 'block' }}>
        <defs>
          <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#2563EB" stopOpacity="0.15" />
            <stop offset="50%"  stopColor="#06B6D4" stopOpacity="0.2"  />
            <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.15" />
          </linearGradient>
        </defs>
        <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="url(#waveGrad)" />
        <path d="M0,40 C480,10 960,55 1440,40 L1440,60 L0,60 Z" fill="rgba(5,8,22,0.6)" />
      </svg>
    </div>
  );
}

/* ── Scroll progress bar ── */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[9998]"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, #2563EB, #06B6D4, #7C3AED)',
        boxShadow: '0 0 8px rgba(6,182,212,0.7)',
      }}
    />
  );
}

/* ── Back to top ── */
function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const fn = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.7, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 20 }}
          whileHover={{ scale: 1.1, y: -3 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollTop}
          className="fixed bottom-8 right-6 z-50 w-11 h-11 rounded-xl flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, #2563EB, #06B6D4)',
            boxShadow: '0 4px 20px rgba(37,99,235,0.45)',
          }}
          aria-label="Back to top"
        >
          <FiArrowUp className="text-white text-base" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/* ── Main footer ── */
export default function Footer() {
  const scrollTo = useCallback((e, href) => {
    e.preventDefault();
    const el = document.getElementById(href.replace('#', ''));
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <>
      <ScrollProgress />
      <BackToTop />

      <footer className="relative overflow-hidden" style={{ background: '#03050f' }}>
        <WaveDivider />

        {/* Glow base */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-32 rounded-full blur-3xl opacity-[0.06]"
            style={{ background: 'radial-gradient(circle, #2563EB, transparent)' }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">

            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-white text-sm"
                  style={{ background: 'linear-gradient(135deg, #2563EB, #06B6D4)', boxShadow: '0 4px 14px rgba(37,99,235,0.4)' }}>
                  PS
                </div>
                <span className="text-base font-black text-white" style={{ fontFamily: 'Sora' }}>Priya Sharma</span>
              </div>
              <p className="text-sm leading-relaxed mb-5" style={{ color: '#475569', fontFamily: 'Inter', lineHeight: 1.7 }}>
                Software Engineer & Frontend Developer building elegant, user-centered web experiences using modern technologies.
              </p>
              {/* Socials */}
              <div className="flex gap-2">
                {SOCIALS.map(({ icon: Icon, href, label, color }) => (
                  <motion.a key={label} href={href}
                    target={href.startsWith('http') ? '_blank' : '_self'}
                    rel="noopener noreferrer" aria-label={label}
                    whileHover={{ scale: 1.12, y: -3 }} whileTap={{ scale: 0.9 }}
                    className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = `${color}1a`;
                      e.currentTarget.style.borderColor = `${color}40`;
                      e.currentTarget.style.boxShadow = `0 0 16px ${color}30`;
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <Icon className="text-sm" style={{ color: '#64748B' }} />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: '#334155', fontFamily: 'Inter' }}>
                Quick Links
              </p>
              <div className="grid grid-cols-2 gap-y-2.5 gap-x-4">
                {NAV_LINKS.map(({ label, href }) => (
                  <a key={label} href={href} onClick={e => scrollTo(e, href)}
                    className="text-sm transition-all duration-200 flex items-center gap-1.5"
                    style={{ color: '#475569', fontFamily: 'Inter', textDecoration: 'none' }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#06B6D4'; e.currentTarget.style.paddingLeft = '4px'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = '#475569'; e.currentTarget.style.paddingLeft = '0'; }}
                  >
                    <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: '#334155' }} />
                    {label}
                  </a>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: '#334155', fontFamily: 'Inter' }}>
                Open to Work
              </p>
              <div className="p-4 rounded-xl mb-4"
                style={{ background: 'rgba(37,99,235,0.08)', border: '1px solid rgba(37,99,235,0.18)' }}>
                <div className="flex items-center gap-2 mb-2">
                  <motion.div animate={{ opacity:[1,0.3,1] }} transition={{ duration:1.5, repeat:Infinity }}
                    className="w-2 h-2 rounded-full" style={{ background: '#10B981' }} />
                  <span className="text-xs font-semibold" style={{ color: '#10B981', fontFamily: 'Inter' }}>
                    Available for Hire
                  </span>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: '#64748B', fontFamily: 'Inter' }}>
                  Looking for SDE, Frontend, or Full Stack roles. Open to full-time, internship, and contract positions.
                </p>
              </div>
              <motion.a href="#contact" onClick={e => scrollTo(e, '#contact')}
                whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
                className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white"
                style={{
                  background: 'linear-gradient(135deg, #2563EB, #06B6D4)',
                  boxShadow: '0 4px 16px rgba(37,99,235,0.3)',
                  fontFamily: 'Inter', textDecoration: 'none',
                }}
              >
                <FiMail className="text-sm" />
                Get In Touch
              </motion.a>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px mb-6" style={{ background: 'rgba(255,255,255,0.05)' }} />

          {/* Bottom bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-center sm:text-left" style={{ color: '#334155', fontFamily: 'Inter' }}>
              © 2026 Priya Sharma. All Rights Reserved.
            </p>
            <p className="text-xs text-center" style={{ color: '#1e2a3a', fontFamily: 'Inter', fontStyle: 'italic' }}>
              Thank you for visiting my portfolio. Let's build something amazing together.
            </p>
            <p className="flex items-center gap-1.5 text-xs" style={{ color: '#334155', fontFamily: 'Inter' }}>
              Designed &amp; Developed by
              <span style={{ color: '#06B6D4' }}>Priya Sharma</span>
              <FiHeart className="text-xs" style={{ color: '#EC4899' }} />
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
