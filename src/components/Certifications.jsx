import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useInView, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FiAward, FiX, FiChevronLeft, FiChevronRight, FiMaximize2, FiGithub } from 'react-icons/fi';
import { HiLocationMarker } from 'react-icons/hi';
import { BsStars, BsShieldCheck, BsPeopleFill } from 'react-icons/bs';
import hack1  from '../assets/hack1.jpeg';
import hack2  from '../assets/hack2.jpeg';
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

/* ═══════════════════════════════════════════
   LIGHTBOX
═══════════════════════════════════════════ */
function Lightbox({ images, startIndex, onClose }) {
  const [idx, setIdx] = useState(startIndex);
  const total = images.length;

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const onKey = (e) => {
      if (e.key === 'ArrowRight') setIdx(i => (i + 1) % total);
      if (e.key === 'ArrowLeft')  setIdx(i => (i - 1 + total) % total);
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [total, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.93)', backdropFilter: 'blur(20px)' }}
      onClick={onClose}
    >
      {/* Close */}
      <motion.button
        whileHover={{ scale: 1.1, rotate: 90 }}
        onClick={onClose}
        className="absolute top-5 right-5 w-10 h-10 rounded-xl flex items-center justify-center z-10"
        style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff' }}
      >
        <FiX />
      </motion.button>

      {/* Counter */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-xs font-medium"
        style={{ background: 'rgba(255,255,255,0.08)', color: '#94A3B8', fontFamily: 'Inter' }}>
        {idx + 1} / {total}
      </div>

      {/* Prev */}
      <motion.button
        whileHover={{ scale: 1.1, x: -2 }} whileTap={{ scale: 0.9 }}
        onClick={e => { e.stopPropagation(); setIdx(i => (i - 1 + total) % total); }}
        className="absolute left-4 sm:left-8 w-11 h-11 rounded-xl flex items-center justify-center"
        style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', color: '#fff' }}
      >
        <FiChevronLeft className="text-lg" />
      </motion.button>

      {/* Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={idx}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.28 }}
          className="relative mx-16 sm:mx-24 max-w-4xl w-full"
          onClick={e => e.stopPropagation()}
        >
          <img
            src={images[idx]}
            alt={`Image ${idx + 1}`}
            className="w-full h-auto rounded-2xl object-contain"
            style={{ maxHeight: '80vh', boxShadow: '0 40px 100px rgba(0,0,0,0.6)' }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Next */}
      <motion.button
        whileHover={{ scale: 1.1, x: 2 }} whileTap={{ scale: 0.9 }}
        onClick={e => { e.stopPropagation(); setIdx(i => (i + 1) % total); }}
        className="absolute right-4 sm:right-8 w-11 h-11 rounded-xl flex items-center justify-center"
        style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', color: '#fff' }}
      >
        <FiChevronRight className="text-lg" />
      </motion.button>

      {/* Thumbnail strip */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={e => { e.stopPropagation(); setIdx(i); }}
            className="rounded-lg overflow-hidden transition-all duration-200"
            style={{
              width: 44, height: 32,
              border: i === idx ? '2px solid #2563EB' : '2px solid transparent',
              opacity: i === idx ? 1 : 0.5,
            }}
          >
            <img src={img} alt="" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   MASONRY / GRID GALLERY
═══════════════════════════════════════════ */
function ImageGallery({ images, captions = [] }) {
  const [lightboxIdx, setLightboxIdx] = useState(null);
  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4">
        {images.map((src, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: i * 0.07 }}
            whileHover={{ scale: 1.03, zIndex: 2 }}
            onClick={() => setLightboxIdx(i)}
            className="relative rounded-xl overflow-hidden cursor-pointer group"
            style={{ aspectRatio: '4/3' }}
          >
            <img src={src} alt={captions[i] || `Photo ${i + 1}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            {/* Overlay */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
              style={{ background: 'rgba(5,8,22,0.55)' }}>
              <FiMaximize2 className="text-white text-xl" />
            </div>
            {/* Bottom gradient */}
            <div className="absolute inset-x-0 bottom-0 h-12"
              style={{ background: 'linear-gradient(0deg, rgba(5,8,22,0.7), transparent)' }} />
          </motion.div>
        ))}
      </div>
      <AnimatePresence>
        {lightboxIdx !== null && (
          <Lightbox images={images} startIndex={lightboxIdx} onClose={() => setLightboxIdx(null)} />
        )}
      </AnimatePresence>
    </>
  );
}

/* ═══════════════════════════════════════════
   SINGLE IMAGE CARD (with parallax tilt)
═══════════════════════════════════════════ */
function SingleImageCard({ src, alt, color }) {
  const [open, setOpen] = useState(false);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 80, damping: 18 });
  const sy = useSpring(my, { stiffness: 80, damping: 18 });
  const rx = useTransform(sy, [-80, 80], [6, -6]);
  const ry = useTransform(sx, [-80, 80], [-6, 6]);

  const move = useCallback(e => {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - rect.left - rect.width / 2);
    my.set(e.clientY - rect.top - rect.height / 2);
  }, [mx, my]);

  const leave = useCallback(() => { mx.set(0); my.set(0); }, [mx, my]);

  return (
    <>
      <motion.div
        style={{ perspective: 800 }}
        onMouseMove={move} onMouseLeave={leave}
        className="mt-4 cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <motion.div
          style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
          className="relative rounded-2xl overflow-hidden group"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <img src={src} alt={alt} className="w-full h-64 sm:h-80 object-cover transition-transform duration-500 group-hover:scale-105" />
          {/* Glow border */}
          <div className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{ boxShadow: `inset 0 0 0 1.5px ${color}44`, transition: 'box-shadow 0.3s' }} />
          {/* Shimmer */}
          <motion.div
            initial={{ x: '-100%' }} whileHover={{ x: '200%' }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.07) 50%, transparent 60%)', width: '60%' }}
          />
          {/* Open icon */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: 'rgba(5,8,22,0.4)' }}>
            <FiMaximize2 className="text-white text-2xl" />
          </div>
        </motion.div>
      </motion.div>
      <AnimatePresence>
        {open && <Lightbox images={[src]} startIndex={0} onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  );
}

/* ═══════════════════════════════════════════
   TECH BADGE
═══════════════════════════════════════════ */
function Badge({ label, color }) {
  return (
    <motion.span
      whileHover={{ scale: 1.08, y: -2 }}
      className="px-3 py-1.5 rounded-xl text-xs font-semibold cursor-default inline-block"
      style={{
        background: `${color}14`,
        border: `1px solid ${color}30`,
        color: color,
        fontFamily: 'Inter',
        transition: 'box-shadow 0.3s',
      }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = `0 0 14px ${color}40`}
      onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
    >
      {label}
    </motion.span>
  );
}

/* ═══════════════════════════════════════════
   ACHIEVEMENT CARD WRAPPER
═══════════════════════════════════════════ */
function AchievementCard({ children, color, delay = 0, direction = 'left' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: direction === 'left' ? -50 : 50, y: 20 }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
      className="relative rounded-2xl overflow-hidden"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: `1px solid rgba(255,255,255,0.08)`,
        transition: 'box-shadow 0.4s ease, border-color 0.4s ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = `0 20px 60px ${color}22`;
        e.currentTarget.style.borderColor = `${color}30`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
      }}
    >
      {/* Top accent */}
      <div className="h-0.5 w-full" style={{ background: `linear-gradient(90deg, ${color}, ${color}40, transparent)` }} />
      {/* Hover glow bg */}
      <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at top left, ${color}07, transparent 55%)` }} />
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   SECTION 1 – MASTERS' UNION HACKATHON
═══════════════════════════════════════════ */
function MastersUnionSection() {
  const hackImages = [hack1, hackimg2, hackimg3, hackimg5, hackimg6, hackimg7, hackimg8, hackimg9];
  const badges = ['React.js','JavaScript','Firebase','AI','Blockchain','Team Leadership','Full Stack','Problem Solving'];

  return (
    <AchievementCard color="#2563EB" delay={0.1} direction="left">
      <div className="p-6 sm:p-8">
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
          <div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold mb-3"
              style={{ background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.35)', color: '#F59E0B', fontFamily: 'Inter' }}
            >
              🏆 Top 30 Teams
            </motion.div>
            <h3 className="text-2xl sm:text-3xl font-black text-white mb-1" style={{ fontFamily: 'Sora' }}>
              Masters' Union Hackathon
            </h3>
            <p className="text-sm font-semibold mb-3" style={{ color: '#2563EB', fontFamily: 'Inter' }}>
              24-Hour National Hackathon
            </p>
            <div className="flex flex-wrap gap-4 text-xs" style={{ color: '#64748B', fontFamily: 'Inter' }}>
              <span className="flex items-center gap-1"><HiLocationMarker className="text-sm" style={{ color: '#2563EB' }} /> Masters' Union, Gurugram</span>
              <span className="flex items-center gap-1"><BsPeopleFill className="text-sm" style={{ color: '#06B6D4' }} /> Team of 4 · Team Leader</span>
              <span className="flex items-center gap-1"><BsStars className="text-sm" style={{ color: '#F59E0B' }} /> Project: UpSpire</span>
            </div>
          </div>
        </div>

        <div className="h-px mb-6" style={{ background: 'rgba(255,255,255,0.06)' }} />

        {/* Description */}
        <div className="space-y-4 mb-7">
          {[
            'One of the highlights of my academic journey was participating in a 24-hour hackathon at Masters\' Union, Gurugram, where I led a team of four members. We built UpSpire, an AI-powered platform that helps students manage projects, build portfolios, resolve doubts through an AI professor, and track their learning progress.',
            'Our team successfully secured a position among the Top 30 teams, competing against talented participants from multiple institutions.',
            'This experience significantly enhanced my leadership, teamwork, communication, problem-solving, and software development skills while giving me practical experience in designing and building a full-stack application under strict time constraints.',
            'The hackathon challenged us to rapidly prototype ideas, collaborate efficiently, manage deadlines, and present innovative solutions before an experienced judging panel.',
          ].map((p, i) => (
            <motion.p key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 + i * 0.1 }}
              className="text-sm leading-relaxed"
              style={{ color: '#94A3B8', fontFamily: 'Inter', lineHeight: 1.8 }}
            >{p}</motion.p>
          ))}
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-7">
          {badges.map(b => <Badge key={b} label={b} color="#2563EB" />)}
        </div>

        {/* Gallery */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#334155', fontFamily: 'Inter' }}>
            Event Gallery
          </p>
          <ImageGallery images={hackImages} />
        </div>
      </div>
    </AchievementCard>
  );
}

/* ═══════════════════════════════════════════
   SECTION 2 – VIRTUAL HACKATHON
═══════════════════════════════════════════ */
function VirtualHackathonSection() {
  const badges = ['Artificial Intelligence','Frontend','Backend','Leadership','Firebase','Voice AI','NLP','Problem Solving'];

  return (
    <AchievementCard color="#7C3AED" delay={0.1} direction="right">
      <div className="p-6 sm:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left */}
          <div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold mb-3"
              style={{ background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.35)', color: '#F59E0B', fontFamily: 'Inter' }}
            >
              🏆 Top 50 Teams
            </motion.div>
            <h3 className="text-2xl sm:text-3xl font-black text-white mb-1" style={{ fontFamily: 'Sora' }}>
              Virtual Hackathon
            </h3>
            <p className="text-sm font-semibold mb-3" style={{ color: '#7C3AED', fontFamily: 'Inter' }}>
              Team Leader · Team of 4 · Project: Arise
            </p>
            <div className="h-px mb-5" style={{ background: 'rgba(255,255,255,0.06)' }} />
            <div className="space-y-3 mb-6">
              {[
                'Another valuable experience was leading a team of four members in a virtual hackathon, where we developed Arise, an AI-powered mental wellness platform.',
                'Arise was designed to provide emotional support through AI-based conversations, progress tracking, personalized wellness activities, and a safe environment for users seeking guidance and emotional well-being.',
                'Our team successfully secured a position among the Top 50 teams. Leading the team remotely strengthened my communication, project planning, collaboration, software architecture, and leadership skills while delivering an AI-powered solution under strict deadlines.',
              ].map((p, i) => (
                <motion.p key={i}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + i * 0.1 }}
                  className="text-sm leading-relaxed"
                  style={{ color: '#94A3B8', fontFamily: 'Inter', lineHeight: 1.8 }}
                >{p}</motion.p>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {badges.map(b => <Badge key={b} label={b} color="#7C3AED" />)}
            </div>
          </div>
          {/* Right – image */}
          <div className="flex items-center">
            <div className="w-full">
              <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#334155', fontFamily: 'Inter' }}>
                Event Photo
              </p>
              <SingleImageCard src={hack2} alt="Virtual Hackathon" color="#7C3AED" />
            </div>
          </div>
        </div>
      </div>
    </AchievementCard>
  );
}

/* ═══════════════════════════════════════════
   SECTION 3 – CTF COMPETITION
═══════════════════════════════════════════ */
function CTFSection() {
  const ctfImages = [ctf1, ctf2, ctf3, ctf4, ctf5];
  const badges = ['Cyber Security','CTF','Cryptography','Reverse Engineering','Forensics','Networking','Linux','Ethical Hacking'];

  return (
    <AchievementCard color="#06B6D4" delay={0.1} direction="left">
      <div className="p-6 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
          <div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold mb-3"
              style={{ background: 'rgba(6,182,212,0.12)', border: '1px solid rgba(6,182,212,0.35)', color: '#06B6D4', fontFamily: 'Inter' }}
            >
              🏅 Top 10 Teams
            </motion.div>
            <h3 className="text-2xl sm:text-3xl font-black text-white mb-1" style={{ fontFamily: 'Sora' }}>
              Capture The Flag Competition
            </h3>
            <p className="text-sm font-semibold mb-3" style={{ color: '#06B6D4', fontFamily: 'Inter' }}>
              College Cyber Security Club · Participant
            </p>
          </div>
        </div>

        <div className="h-px mb-6" style={{ background: 'rgba(255,255,255,0.06)' }} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="space-y-3 mb-6">
              {[
                'I participated in my college\'s Capture The Flag (CTF) cybersecurity competition, solving challenges related to Web Security, Cryptography, Reverse Engineering, and Digital Forensics.',
                'Competing against numerous participants, I secured a position among the Top 10 teams and received event goodies in recognition of my performance.',
                'The competition significantly improved my analytical thinking, practical cybersecurity skills, debugging abilities, and real-world problem-solving approach.',
              ].map((p, i) => (
                <motion.p key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                  className="text-sm leading-relaxed"
                  style={{ color: '#94A3B8', fontFamily: 'Inter', lineHeight: 1.8 }}
                >{p}</motion.p>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {badges.map(b => <Badge key={b} label={b} color="#06B6D4" />)}
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#334155', fontFamily: 'Inter' }}>
              Competition Gallery
            </p>
            <ImageGallery images={ctfImages} />
          </div>
        </div>
      </div>
    </AchievementCard>
  );
}

/* ═══════════════════════════════════════════
   SECTION 4 – GOOGLE CLOUD ARCADE
═══════════════════════════════════════════ */
function GoogleCloudSection() {
  const gImages = [goodies1, goodies2, goodies3, goodies4];
  const badges = ['Google Cloud','Cloud Computing','Networking','Kubernetes','Compute Engine','Storage','IAM','DevOps'];

  return (
    <AchievementCard color="#10B981" delay={0.1} direction="right">
      <div className="p-6 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
          <div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold mb-3"
              style={{ background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.35)', color: '#10B981', fontFamily: 'Inter' }}
            >
              ☁ Google Cloud Arcade Finisher
            </motion.div>
            <h3 className="text-2xl sm:text-3xl font-black text-white mb-1" style={{ fontFamily: 'Sora' }}>
              Google Cloud Arcade
            </h3>
            <p className="text-sm font-semibold" style={{ color: '#10B981', fontFamily: 'Inter' }}>
              Cloud Program · Arcade Finisher
            </p>
          </div>
        </div>

        <div className="h-px mb-6" style={{ background: 'rgba(255,255,255,0.06)' }} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="space-y-3 mb-6">
              {[
                'I successfully completed the Google Cloud Arcade Program, where I completed multiple hands-on labs covering Compute Engine, Cloud Storage, Networking, Databases, Kubernetes, Cloud Infrastructure, and Cloud Deployment.',
                'Through these practical labs, I gained hands-on experience deploying, managing, and monitoring cloud applications using Google Cloud Platform.',
                'Upon successful completion, I received Google Cloud Arcade Goodies as recognition of my participation and consistent performance.',
              ].map((p, i) => (
                <motion.p key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                  className="text-sm leading-relaxed"
                  style={{ color: '#94A3B8', fontFamily: 'Inter', lineHeight: 1.8 }}
                >{p}</motion.p>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {badges.map(b => <Badge key={b} label={b} color="#10B981" />)}
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#334155', fontFamily: 'Inter' }}>
              Goodies & Recognition
            </p>
            <ImageGallery images={gImages} />
          </div>
        </div>
      </div>
    </AchievementCard>
  );
}

/* ═══════════════════════════════════════════
   ANIMATED SECTION DIVIDER
═══════════════════════════════════════════ */
function SectionDivider({ index }) {
  const colors = ['#2563EB', '#7C3AED', '#06B6D4', '#10B981'];
  const color = colors[index % colors.length];
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} className="flex items-center gap-4 my-10">
      <motion.div className="flex-1 h-px"
        initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{ background: 'rgba(255,255,255,0.06)', originX: 0 }}
      />
      <motion.div
        initial={{ scale: 0, opacity: 0 }} animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: `${color}20`, border: `1px solid ${color}40`, boxShadow: `0 0 16px ${color}30` }}
      >
        <FiAward className="text-sm" style={{ color }} />
      </motion.div>
      <motion.div className="flex-1 h-px"
        initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
        style={{ background: 'rgba(255,255,255,0.06)', originX: 1 }}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════
   BACKGROUND
═══════════════════════════════════════════ */
function BgBlobs() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <motion.div animate={{ scale:[1,1.2,1], x:[0,40,0] }} transition={{ duration:14, repeat:Infinity, ease:'easeInOut' }}
        className="absolute -top-40 left-1/4 w-[500px] h-[500px] rounded-full blur-3xl opacity-[0.055]"
        style={{ background:'radial-gradient(circle, #2563EB, transparent 70%)' }} />
      <motion.div animate={{ scale:[1,1.15,1], x:[0,-30,0] }} transition={{ duration:11, repeat:Infinity, ease:'easeInOut', delay:2 }}
        className="absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full blur-3xl opacity-[0.05]"
        style={{ background:'radial-gradient(circle, #7C3AED, transparent 70%)' }} />
      <motion.div animate={{ scale:[1,1.2,1] }} transition={{ duration:9, repeat:Infinity, ease:'easeInOut', delay:1 }}
        className="absolute bottom-1/4 left-0 w-96 h-96 rounded-full blur-3xl opacity-[0.045]"
        style={{ background:'radial-gradient(circle, #06B6D4, transparent 70%)' }} />
      <motion.div animate={{ scale:[1,1.25,1] }} transition={{ duration:13, repeat:Infinity, ease:'easeInOut', delay:3 }}
        className="absolute bottom-0 right-1/3 w-80 h-80 rounded-full blur-3xl opacity-[0.04]"
        style={{ background:'radial-gradient(circle, #10B981, transparent 70%)' }} />
      {/* particles */}
      {Array.from({ length: 30 }, (_,i) => (
        <motion.div key={i}
          className="absolute rounded-full"
          style={{
            left:`${Math.random()*100}%`, top:`${Math.random()*100}%`,
            width: Math.random()*2.5+0.5, height: Math.random()*2.5+0.5,
            background: ['#2563EB','#06B6D4','#7C3AED','#10B981'][i%4],
            opacity: Math.random()*0.35+0.1,
          }}
          animate={{ y:[-15,15,-15], x:[-8,8,-8] }}
          transition={{ duration:5+Math.random()*6, repeat:Infinity, ease:'easeInOut', delay:Math.random()*4 }}
        />
      ))}
      {/* grid */}
      <div className="absolute inset-0 opacity-[0.022]"
        style={{
          backgroundImage:`linear-gradient(rgba(37,99,235,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.5) 1px, transparent 1px)`,
          backgroundSize:'70px 70px',
        }}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAIN EXPORT
═══════════════════════════════════════════ */
export default function Certifications() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: '-60px' });

  return (
    <div className="relative py-24 overflow-hidden"
      style={{ background:'linear-gradient(180deg,#050816 0%,#07091e 50%,#050816 100%)' }}>
      <BgBlobs />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <div ref={titleRef} className="text-center mb-20">
          <motion.div
            initial={{ opacity:0, y:20 }} animate={titleInView ? { opacity:1, y:0 } : {}}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-5"
            style={{ background:'rgba(245,158,11,0.1)', border:'1px solid rgba(245,158,11,0.25)' }}
          >
            <FiAward style={{ color:'#F59E0B' }} />
            <span className="text-xs font-medium tracking-wider uppercase" style={{ color:'#F59E0B', fontFamily:'Inter' }}>
              My Journey
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity:0, y:30 }} animate={titleInView ? { opacity:1, y:0 } : {}}
            transition={{ delay:0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black mb-5"
            style={{ fontFamily:'Sora, sans-serif' }}
          >
            <span className="text-white">Certifications &</span>
            <br />
            <span style={{
              background:'linear-gradient(135deg, #F59E0B, #EF4444, #7C3AED)',
              backgroundSize:'200% 200%',
              WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
              animation:'gradientShift 5s ease infinite',
            }}>Achievements</span>
          </motion.h2>

          <motion.p
            initial={{ opacity:0 }} animate={titleInView ? { opacity:1 } : {}} transition={{ delay:0.2 }}
            className="text-base max-w-2xl mx-auto"
            style={{ color:'#64748B', fontFamily:'Inter', lineHeight:1.8 }}
          >
            My journey through hackathons, open-source contributions, technical competitions, cloud learning, leadership experiences, and continuous skill development.
          </motion.p>

          {/* Underline draw */}
          <motion.div
            initial={{ scaleX:0 }} animate={titleInView ? { scaleX:1 } : {}}
            transition={{ duration:0.9, delay:0.4, ease:'easeOut' }}
            className="mx-auto mt-5 h-0.5 rounded-full"
            style={{
              width:160, originX:0.5,
              background:'linear-gradient(90deg, transparent, #F59E0B, #EF4444, transparent)',
            }}
          />
        </div>

        {/* ── Sections ── */}
        <div className="space-y-6">
          <MastersUnionSection />
          <SectionDivider index={0} />
          <VirtualHackathonSection />
          <SectionDivider index={1} />
          <CTFSection />
          <SectionDivider index={2} />
          <GoogleCloudSection />
        </div>
      </div>
    </div>
  );
}
