import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { FiGithub, FiBriefcase, FiGitBranch } from 'react-icons/fi';
import {
  SiGit, SiDocker, SiKubernetes, SiGithub,
} from 'react-icons/si';
import { BsStars } from 'react-icons/bs';

/* ── Tech badge data ── */
const BADGES = [
  { label: 'Git',         icon: SiGit,        color: '#F05032', tip: 'Version Control'          },
  { label: 'Docker',      icon: SiDocker,     color: '#2496ED', tip: 'Containerisation'          },
  { label: 'Kubernetes',  icon: SiKubernetes, color: '#326CE5', tip: 'Container Orchestration'   },
  { label: 'CI/CD',       icon: FiGitBranch,  color: '#06B6D4', tip: 'Continuous Integration'    },
  { label: 'GitHub',      icon: SiGithub,     color: '#E6EDF3', tip: 'Code Collaboration'        },
  { label: 'Open Source', icon: BsStars,      color: '#F59E0B', tip: 'Community Contribution'    },
];

/* ── Bullet points ── */
const BULLETS = [
  'Resolved bugs in the KubeStellar open-source codebase by submitting GitHub pull requests, increasing reliability and reducing reported issues in the project.',
  'Executed code reviews with senior maintainers following agile best practices, integrating feedback to improve code quality and software engineering standards.',
  'Utilized Git, Kubernetes, Docker, and CI/CD pipelines within a distributed open-source environment, gaining valuable production-level DevOps exposure.',
];

/* ── Animated floating badge ── */
function TechBadge({ badge, index }) {
  const [hovered, setHovered] = useState(false);
  const Icon = badge.icon;

  return (
    <div className="relative" style={{ display: 'inline-block' }}>
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.85 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, delay: 0.6 + index * 0.08 }}
        animate={{ y: [0, -4, 0] }}
        /* float only when not hovered */
        style={{ animationPlayState: hovered ? 'paused' : 'running' }}
        whileHover={{ scale: 1.12, y: -6 }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="flex items-center gap-2 px-3.5 py-2 rounded-xl cursor-default"
        data-anim-duration={`${3 + index * 0.4}s`}
      >
        {/* We do the float via framer separately */}
        <motion.div
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl"
          animate={!hovered ? { y: [0, -5, 0] } : { y: 0 }}
          transition={!hovered ? { duration: 3 + index * 0.4, repeat: Infinity, ease: 'easeInOut', delay: index * 0.3 } : {}}
          style={{
            background: hovered ? `${badge.color}18` : 'rgba(255,255,255,0.05)',
            border: hovered ? `1px solid ${badge.color}44` : '1px solid rgba(255,255,255,0.08)',
            boxShadow: hovered ? `0 0 18px ${badge.color}40, 0 4px 16px rgba(0,0,0,0.3)` : 'none',
            transition: 'all 0.3s cubic-bezier(0.23,1,0.32,1)',
          }}
        >
          <Icon className="text-base flex-shrink-0" style={{ color: hovered ? badge.color : '#64748B', transition: 'color 0.3s' }} />
          <span className="text-xs font-semibold" style={{ color: hovered ? '#F1F5F9' : '#94A3B8', fontFamily: 'Inter', whiteSpace: 'nowrap', transition: 'color 0.3s' }}>
            {badge.label}
          </span>
        </motion.div>
      </motion.div>

      {/* Tooltip */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.92 }}
            transition={{ duration: 0.18 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap z-20"
            style={{
              background: 'rgba(5,8,22,0.95)',
              border: `1px solid ${badge.color}44`,
              color: badge.color,
              fontFamily: 'Inter',
              pointerEvents: 'none',
            }}
          >
            {badge.tip}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Connecting line that animates in ── */
function TimelineLine({ inView }) {
  return (
    <div className="absolute left-5 top-12 bottom-0 w-0.5 overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
      <motion.div
        className="w-full origin-top"
        initial={{ scaleY: 0 }}
        animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
        transition={{ duration: 1.2, delay: 0.4, ease: 'easeOut' }}
        style={{ height: '100%', background: 'linear-gradient(180deg, #2563EB, #06B6D4, transparent)' }}
      />
    </div>
  );
}

/* ── Single Experience card ── */
function ExperienceCard() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <div ref={ref} className="relative pl-14">
      <TimelineLine inView={inView} />

      {/* Node dot */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.2, type: 'spring', bounce: 0.45 }}
        className="absolute left-0 top-1"
        style={{ width: 44, height: 44 }}
      >
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center"
          style={{
            background: 'rgba(37,99,235,0.15)',
            border: '2px solid #2563EB',
            boxShadow: '0 0 24px rgba(37,99,235,0.5)',
          }}
        >
          <FiBriefcase className="text-base" style={{ color: '#2563EB' }} />
        </div>
        {/* Pulse ring */}
        <motion.div
          className="absolute inset-0 rounded-xl"
          animate={{ scale: [1, 1.6], opacity: [0.5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
          style={{ border: '1px solid rgba(37,99,235,0.4)' }}
        />
      </motion.div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
        className="group relative rounded-2xl overflow-hidden"
        style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
          transition: 'all 0.4s cubic-bezier(0.23,1,0.32,1)',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.boxShadow = '0 24px 60px rgba(37,99,235,0.18)';
          e.currentTarget.style.borderColor = 'rgba(37,99,235,0.28)';
          e.currentTarget.style.transform = 'translateY(-3px)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.boxShadow = 'none';
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        {/* Gradient top bar */}
        <div className="h-0.5 w-full" style={{ background: 'linear-gradient(90deg, #2563EB, #06B6D4, transparent)' }} />

        {/* Hover glow background */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at top left, rgba(37,99,235,0.07), transparent 60%)' }}
        />

        <div className="p-6 sm:p-8">
          {/* Header row */}
          <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
            <div>

              <h3
                className="text-xl sm:text-2xl font-black text-white mb-1"
                style={{ fontFamily: 'Sora, sans-serif' }}
              >
                KubeStellar
              </h3>
              <p className="text-sm font-semibold" style={{ color: '#2563EB', fontFamily: 'Inter' }}>
                Open Source Contributor
              </p>
            </div>

            {/* GitHub button */}
            <motion.a
              href="https://github.com/pri12ya871/kubestellar"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.55 }}
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2.5 px-5 py-2.5 rounded-xl font-semibold text-sm"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#F1F5F9',
                fontFamily: 'Inter',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(230,237,243,0.12)';
                e.currentTarget.style.border = '1px solid rgba(230,237,243,0.25)';
                e.currentTarget.style.boxShadow = '0 0 20px rgba(230,237,243,0.15)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                e.currentTarget.style.border = '1px solid rgba(255,255,255,0.1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <FiGithub className="text-base" />
              View on GitHub
            </motion.a>
          </div>

          {/* Divider */}
          <div className="mb-6 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />

          {/* Bullet points */}
          <ul className="space-y-4 mb-8">
            {BULLETS.map((text, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -24 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.6 + i * 0.12 }}
                className="flex gap-3"
              >
                <span className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full" style={{ background: '#2563EB' }} />
                <p className="text-sm leading-relaxed" style={{ color: '#94A3B8', fontFamily: 'Inter', lineHeight: 1.75 }}>
                  {text}
                </p>
              </motion.li>
            ))}
          </ul>

          {/* Divider */}
          <div className="mb-5 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />

          {/* Tech badges */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#475569', fontFamily: 'Inter' }}>
              Technologies Used
            </p>
            <div className="flex flex-wrap gap-1">
              {BADGES.map((badge, i) => (
                <TechBadge key={badge.label} badge={badge} index={i} />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ── Background blobs ── */
function BgBlobs() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <motion.div
        animate={{ scale: [1, 1.18, 1], y: [0, -30, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-0 right-1/3 w-96 h-96 rounded-full blur-3xl opacity-[0.06]"
        style={{ background: 'radial-gradient(circle, #7C3AED, transparent 70%)' }}
      />
      <motion.div
        animate={{ scale: [1, 1.12, 1], y: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute bottom-0 left-1/3 w-80 h-80 rounded-full blur-3xl opacity-[0.06]"
        style={{ background: 'radial-gradient(circle, #2563EB, transparent 70%)' }}
      />
    </div>
  );
}

/* ── Main Export ── */
export default function Experience() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: '-60px' });

  return (
    <div
      className="relative py-24 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #050816 0%, #080d20 60%, #050816 100%)' }}
    >
      <BgBlobs />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section header ── */}
        <div ref={titleRef} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-5"
            style={{ background: 'rgba(37,99,235,0.1)', border: '1px solid rgba(37,99,235,0.25)' }}
          >
            <FiBriefcase style={{ color: '#2563EB' }} />
            <span className="text-xs font-medium tracking-wider uppercase" style={{ color: '#2563EB', fontFamily: 'Inter' }}>
              Professional Work
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-5xl sm:text-6xl font-black mb-5"
            style={{ fontFamily: 'Sora, sans-serif' }}
          >
            <span className="text-white">Exp</span>
            <span style={{
              background: 'linear-gradient(135deg, #2563EB, #06B6D4)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>erience</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={titleInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="text-base max-w-lg mx-auto"
            style={{ color: '#64748B', fontFamily: 'Inter', lineHeight: 1.75 }}
          >
            My Open Source Contributions and Professional Development
          </motion.p>
        </div>

        {/* ── Timeline ── */}
        <ExperienceCard />
      </div>
    </div>
  );
}
