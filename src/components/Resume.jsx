import { useRef, useState, useCallback, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  HiDownload, HiArrowsExpand, HiChevronLeft, HiChevronRight,
  HiZoomIn, HiZoomOut, HiX,
} from 'react-icons/hi';
import { FiFileText } from 'react-icons/fi';

const RESUME_PDF = '/PRIYA_SOFTWARE_RESUME.pdf';

/* ── Ripple Button ── */
function RippleButton({ children, onClick, href, download, variant = 'primary', icon, className = '' }) {
  const [ripples, setRipples] = useState([]);
  const ref = useRef(null);

  const addRipple = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const id = Date.now();
    setRipples(r => [...r, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }]);
    setTimeout(() => setRipples(r => r.filter(rp => rp.id !== id)), 900);
  };

  const Tag = href ? 'a' : 'button';
  const extra = href ? { href, download: download || undefined, target: download ? undefined : '_blank', rel: 'noopener noreferrer' } : { onClick };

  const styles = {
    primary: {
      background: 'linear-gradient(135deg, #2563EB 0%, #06B6D4 100%)',
      boxShadow: '0 4px 20px rgba(37,99,235,0.35)',
      color: '#fff',
      border: 'none',
    },
    glass: {
      background: 'rgba(255,255,255,0.06)',
      backdropFilter: 'blur(16px)',
      border: '1px solid rgba(255,255,255,0.12)',
      color: '#F1F5F9',
      boxShadow: 'none',
    },
  };

  return (
    <motion.div
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.97 }}
      style={{ display: 'inline-block', position: 'relative' }}
    >
      <Tag
        ref={ref}
        {...extra}
        onMouseDown={addRipple}
        className={`relative flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-sm overflow-hidden cursor-pointer select-none ${className}`}
        style={{
          fontFamily: 'Inter, sans-serif',
          textDecoration: 'none',
          transition: 'box-shadow 0.3s ease',
          ...styles[variant],
        }}
        onMouseEnter={e => {
          if (variant === 'primary') e.currentTarget.style.boxShadow = '0 8px 32px rgba(37,99,235,0.55)';
          if (variant === 'glass') { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(6,182,212,0.2)'; }
        }}
        onMouseLeave={e => {
          if (variant === 'primary') e.currentTarget.style.boxShadow = '0 4px 20px rgba(37,99,235,0.35)';
          if (variant === 'glass') { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.boxShadow = 'none'; }
        }}
      >
        {icon && <span className="text-base flex-shrink-0">{icon}</span>}
        <span>{children}</span>
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
      </Tag>
    </motion.div>
  );
}

/* ── PDF Viewer ── */
function PDFViewer({ fullscreen = false }) {
  const [loading, setLoading] = useState(true);
  const [zoom, setZoom] = useState(100);
  const [page, setPage] = useState(1);
  const iframeRef = useRef(null);

  const zoomIn  = () => setZoom(z => Math.min(z + 15, 200));
  const zoomOut = () => setZoom(z => Math.max(z - 15, 50));

  // Build src with zoom hint for PDF.js style embeds
  const src = `${RESUME_PDF}#zoom=${zoom}&page=${page}&toolbar=0&navpanes=0&scrollbar=1`;

  return (
    <div
      className="flex flex-col rounded-2xl overflow-hidden"
      style={{
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 32px 80px rgba(0,0,0,0.4)',
        height: fullscreen ? '100%' : undefined,
      }}
    >
      {/* Toolbar */}
      <div
        className="flex items-center justify-between px-4 py-2.5 flex-wrap gap-2"
        style={{
          background: 'rgba(255,255,255,0.04)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          flexShrink: 0,
        }}
      >
        {/* Page controls */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setPage(p => Math.max(p - 1, 1))}
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
            style={{ background: 'rgba(255,255,255,0.06)', color: '#94A3B8' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(37,99,235,0.2)'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = '#94A3B8'; }}
          >
            <HiChevronLeft className="text-sm" />
          </button>
          <span className="text-xs px-3 py-1 rounded-lg" style={{ color: '#64748B', background: 'rgba(255,255,255,0.04)', fontFamily: 'Inter', minWidth: 64, textAlign: 'center' }}>
            Page {page}
          </span>
          <button
            onClick={() => setPage(p => p + 1)}
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
            style={{ background: 'rgba(255,255,255,0.06)', color: '#94A3B8' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(37,99,235,0.2)'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = '#94A3B8'; }}
          >
            <HiChevronRight className="text-sm" />
          </button>
        </div>

        {/* Zoom controls */}
        <div className="flex items-center gap-1">
          <button
            onClick={zoomOut}
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
            style={{ background: 'rgba(255,255,255,0.06)', color: '#94A3B8' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(37,99,235,0.2)'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = '#94A3B8'; }}
          >
            <HiZoomOut className="text-sm" />
          </button>
          <span className="text-xs px-3 py-1 rounded-lg" style={{ color: '#64748B', background: 'rgba(255,255,255,0.04)', fontFamily: 'Inter', minWidth: 52, textAlign: 'center' }}>
            {zoom}%
          </span>
          <button
            onClick={zoomIn}
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
            style={{ background: 'rgba(255,255,255,0.06)', color: '#94A3B8' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(37,99,235,0.2)'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = '#94A3B8'; }}
          >
            <HiZoomIn className="text-sm" />
          </button>
        </div>

        {/* Filename */}
        <div className="hidden sm:flex items-center gap-2">
          <FiFileText className="text-xs" style={{ color: '#475569' }} />
          <span className="text-xs" style={{ color: '#475569', fontFamily: 'Inter' }}>
            Priya_Sharma_Resume.pdf
          </span>
        </div>
      </div>

      {/* iframe */}
      <div className="relative flex-1" style={{ minHeight: fullscreen ? 0 : 700, overflow: 'hidden' }}>
        {loading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10" style={{ background: 'rgba(5,8,22,0.95)' }}>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-10 h-10 rounded-full border-2 border-transparent mb-4"
              style={{ borderTopColor: '#2563EB', borderRightColor: '#06B6D4' }}
            />
            <p className="text-sm" style={{ color: '#64748B', fontFamily: 'Inter' }}>Loading resume...</p>
          </div>
        )}
        <iframe
          ref={iframeRef}
          src={src}
          title="Priya Sharma Resume"
          className="w-full h-full"
          style={{
            border: 'none',
            display: 'block',
            minHeight: fullscreen ? '100%' : 700,
            background: '#1e1e2e',
          }}
          onLoad={() => setLoading(false)}
        />
      </div>
    </div>
  );
}

/* ── Fullscreen Modal ── */
function FullscreenModal({ open, onClose }) {
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9999] flex flex-col"
          style={{ background: 'rgba(3,4,10,0.97)', backdropFilter: 'blur(16px)' }}
        >
          {/* Header bar */}
          <div
            className="flex items-center justify-between px-6 py-3 flex-shrink-0"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', background: 'rgba(5,8,22,0.9)' }}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#2563EB,#06B6D4)' }}>
                <FiFileText className="text-white text-sm" />
              </div>
              <span className="text-sm font-semibold text-white" style={{ fontFamily: 'Sora' }}>
                Priya Sharma — Resume
              </span>
            </div>
            <div className="flex items-center gap-3">
              <RippleButton href={RESUME_PDF} download="Priya_Sharma_Resume.pdf" variant="primary" icon={<HiDownload />}>
                Download
              </RippleButton>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#94A3B8' }}
              >
                <HiX className="text-base" />
              </motion.button>
            </div>
          </div>

          {/* Full PDF viewer */}
          <div className="flex-1 p-4 overflow-hidden" style={{ minHeight: 0 }}>
            <div className="w-full h-full" style={{ maxWidth: 900, margin: '0 auto', height: '100%' }}>
              <iframe
                src={`${RESUME_PDF}#toolbar=0&navpanes=0&scrollbar=1`}
                title="Priya Sharma Resume Fullscreen"
                className="w-full h-full rounded-xl"
                style={{ border: 'none', background: '#1e1e2e', minHeight: '100%' }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── Floating background blobs ── */
function BgBlobs() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <motion.div
        animate={{ scale: [1, 1.2, 1], x: [0, 50, 0], y: [0, -30, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-32 left-1/4 w-[500px] h-[500px] rounded-full blur-3xl opacity-[0.06]"
        style={{ background: 'radial-gradient(circle, #2563EB, transparent 70%)' }}
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1], x: [0, -40, 0], y: [0, 40, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full blur-3xl opacity-[0.06]"
        style={{ background: 'radial-gradient(circle, #06B6D4, transparent 70%)' }}
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        className="absolute top-1/2 right-0 w-80 h-80 rounded-full blur-3xl opacity-[0.04]"
        style={{ background: 'radial-gradient(circle, #7C3AED, transparent 70%)' }}
      />
      {/* Grid lines */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(rgba(37,99,235,0.5) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(37,99,235,0.5) 1px, transparent 1px)`,
          backgroundSize: '70px 70px',
        }}
      />
    </div>
  );
}

/* ── Main Resume Component ── */
export default function Resume() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: '-60px' });
  const [fullscreen, setFullscreen] = useState(false);

  return (
    <>
      <FullscreenModal open={fullscreen} onClose={() => setFullscreen(false)} />

      <div
        id="resume-section"
        className="relative py-24 overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #050816 0%, #070c1d 60%, #050816 100%)' }}
      >
        <BgBlobs />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ── Section Header ── */}
          <div ref={titleRef} className="text-center mb-14">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={titleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-5"
              style={{ background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.25)' }}
            >
              <FiFileText style={{ color: '#06B6D4' }} />
              <span className="text-xs font-medium tracking-wider uppercase" style={{ color: '#06B6D4', fontFamily: 'Inter' }}>
                My Document
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={titleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl sm:text-6xl font-black mb-5"
              style={{ fontFamily: 'Sora, sans-serif' }}
            >
              <span className="text-white">My </span>
              <span style={{
                background: 'linear-gradient(135deg, #2563EB, #06B6D4)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>Resume</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={titleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base max-w-lg mx-auto"
              style={{ color: '#64748B', fontFamily: 'Inter', lineHeight: 1.75 }}
            >
              My professional experience, education, technical skills, projects, and achievements.
            </motion.p>
          </div>

          {/* ── CTA Buttons ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4 mb-10"
          >
            <RippleButton
              href={RESUME_PDF}
              download="Priya_Sharma_Resume.pdf"
              variant="primary"
              icon={<HiDownload />}
            >
              Download Resume
            </RippleButton>
            <RippleButton
              variant="glass"
              onClick={() => setFullscreen(true)}
              icon={<HiArrowsExpand />}
            >
              Open Full Screen
            </RippleButton>
          </motion.div>

          {/* ── PDF Viewer ── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <PDFViewer />
          </motion.div>
        </div>
      </div>
    </>
  );
}
