import { useRef, useState, useCallback, useEffect } from 'react';
import { motion, useInView, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FiGithub, FiCode, FiSearch, FiX, FiLayers, FiExternalLink } from 'react-icons/fi';
import { BsStars } from 'react-icons/bs';

/* ─────────────────────────────────────────
   PROJECT DATA
───────────────────────────────────────── */
const ALL_PROJECTS = [
  {
    id: 1,
    num: '01',
    title: 'ICON Store',
    category: 'Full Stack',
    categoryLabel: 'Full Stack MERN Application',
    color: '#2563EB',
    glow: 'rgba(37,99,235,0.35)',
    icon: '🛒',
    github: 'https://github.com/pri12ya871/Ecommerce-website',
    description: 'ICON Store is a full-stack MERN e-commerce platform that enables customers to shop online, sellers to manage products, and administrators to securely manage users, products, and orders through a role-based authentication system.',
    longDescription: 'Built using React.js, Node.js, Express.js, MongoDB, JWT Authentication, bcrypt encryption, and REST APIs for efficient frontend-backend communication. Demonstrates secure, scalable, production-ready web development with authentication, CRUD operations, and a complete e-commerce workflow.',
    stack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'REST API', 'Bcrypt'],
    features: ['Secure Authentication', 'Role Based Access', 'Shopping Cart', 'Order Management', 'Admin Dashboard', 'Seller Dashboard', 'Responsive UI'],
    tags: ['Full Stack', 'Backend', 'Frontend'],
  },
  {
    id: 2,
    num: '02',
    title: 'CinderPeak',
    category: 'Software Engineering',
    categoryLabel: 'Software Engineering',
    color: '#7C3AED',
    glow: 'rgba(124,58,237,0.35)',
    icon: '⚙️',
    github: 'https://github.com/pri12ya871/Cinder-Peak',
    description: 'CinderPeak is a modular C++ graph algorithm library providing a clean API for BFS, DFS, Dijkstra, and Minimum Spanning Tree (MST) algorithms, suitable for scalable software applications.',
    longDescription: 'Developed with modern C++, Google Test, GitHub Actions, and CI/CD pipelines. Focuses on efficient memory management, multithreading, unit testing, and reusable software architecture.',
    stack: ['C++', 'Google Test', 'GitHub Actions', 'CI/CD', 'Multithreading', 'STL'],
    features: ['Data Structures', 'Algorithms', 'OOP Design', 'Performance Optimization', 'Software Testing', 'Modern C++'],
    tags: ['Software Engineering', 'Backend'],
  },
  {
    id: 3,
    num: '03',
    title: 'CSE Assist',
    category: 'AI',
    categoryLabel: 'AI Chatbot',
    color: '#06B6D4',
    glow: 'rgba(6,182,212,0.35)',
    icon: '🤖',
    github: 'https://github.com/pri12ya871/chat-bot-cse-dept',
    description: 'CSE Assist is a full-stack chatbot that answers Computer Science related queries in real time using NLP-based pattern matching to provide quick, intelligent, and accurate responses.',
    longDescription: 'Backend logic developed using JavaScript and Python. A scalable JSON knowledge base was created to improve response quality, demonstrating NLP, backend development, and API integration skills.',
    stack: ['Python', 'JavaScript', 'Node.js', 'JSON', 'NLP'],
    features: ['Natural Language Processing', 'Backend Development', 'Knowledge Base Design', 'Data Processing', 'API Integration'],
    tags: ['AI', 'Backend', 'Frontend'],
  },
  {
    id: 4,
    num: '04',
    title: 'P2P File Sync',
    category: 'Distributed Systems',
    categoryLabel: 'Distributed Systems',
    color: '#10B981',
    glow: 'rgba(16,185,129,0.35)',
    icon: '🔗',
    github: 'https://github.com/OpenTechTools/p2p-file-sync-and-collab',
    description: 'A decentralized peer-to-peer version control system enabling multiple users to securely collaborate without relying on a centralized server, using Merkle DAG and CRDT.',
    longDescription: 'Uses Merkle DAG for content-addressable storage, CRDT (LWW Set) for conflict-free collaboration, SMPP protocol for authorization, SHA-256 hashing for integrity, and cryptographic signing for secure commits. Simulates decentralized networking using Kademlia DHT concepts.',
    stack: ['React.js', 'FastAPI', 'Python', 'Merkle DAG', 'CRDT', 'SHA-256', 'Digital Signatures', 'Kademlia DHT'],
    features: ['Distributed Systems', 'Blockchain Concepts', 'Cryptography', 'Version Control', 'P2P Networking', 'Secure Software Design'],
    tags: ['Distributed Systems', 'Open Source', 'Backend'],
  },
  {
    id: 5,
    num: '05',
    title: 'UpSpire',
    category: 'AI',
    categoryLabel: 'AI Powered Learning Platform',
    color: '#F59E0B',
    glow: 'rgba(245,158,11,0.35)',
    icon: '🚀',
    github: 'https://github.com/pri12ya871/UpSpire',
    description: 'UpSpire is an AI-powered student learning and career development platform — portfolio building, AI Professor for doubt resolution, academic analytics, mentor-led sessions, and premium courses in one ecosystem.',
    longDescription: 'Integrates AI features, authentication, dashboards, blockchain concepts, Firebase, and real-time data management. Demonstrates the ability to develop intelligent, production-ready full-stack software combining modern frontend technologies, AI integration, and secure architecture.',
    stack: ['React.js', 'JavaScript', 'Firebase', 'HTML5', 'CSS3', 'AI Integration', 'Blockchain Concepts', 'Authentication', 'Analytics Dashboard'],
    features: ['AI Professor', 'Portfolio Builder', 'Analytics Dashboard', 'Mentor Sessions', 'Real-Time Database', 'Blockchain'],
    tags: ['AI', 'Full Stack', 'Frontend'],
  },
];

/* ─────────────────────────────────────────
   FILTER CONFIG
───────────────────────────────────────── */
const FILTERS = [
  { label: 'All',                 value: 'All'                 },
  { label: 'Full Stack',          value: 'Full Stack'          },
  { label: 'Open Source',         value: 'Open Source'         },
  { label: 'AI',                  value: 'AI'                  },
  { label: 'Backend',             value: 'Backend'             },
  { label: 'Frontend',            value: 'Frontend'            },
  { label: 'Distributed Systems', value: 'Distributed Systems' },
  { label: 'Software Engineering', value: 'Software Engineering' },
];

/* ─────────────────────────────────────────
   ANIMATED COUNTER
───────────────────────────────────────── */
function Counter({ target, suffix = '', label }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const numeric = parseInt(target.replace(/\D/g, ''), 10) || 0;
    let start = 0;
    const step = Math.ceil(numeric / 40);
    const timer = setInterval(() => {
      start += step;
      if (start >= numeric) { setCount(numeric); clearInterval(timer); }
      else setCount(start);
    }, 35);
    return () => clearInterval(timer);
  }, [inView, target]);

  const display = typeof target === 'string' && /\D/.test(target)
    ? target.replace(/\d+/, count)
    : `${count}${suffix}`;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="text-center py-7 px-4 rounded-2xl"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      <div
        className="text-3xl sm:text-4xl font-black mb-2"
        style={{
          background: 'linear-gradient(135deg, #2563EB, #06B6D4)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          fontFamily: 'Sora, sans-serif',
        }}
      >
        {display}
      </div>
      <div className="text-xs font-medium" style={{ color: '#64748B', fontFamily: 'Inter' }}>{label}</div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   PROJECT CARD
───────────────────────────────────────── */
function ProjectCard({ project, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [hovered, setHovered] = useState(false);
  const [expanded, setExpanded] = useState(false);

  /* 3-D tilt via mouse tracking */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 80, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 80, damping: 20 });
  const rotateX = useTransform(springY, [-120, 120], [6, -6]);
  const rotateY = useTransform(springX, [-120, 120], [-6, 6]);

  const onMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  }, [mouseX, mouseY]);

  const onMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
    setHovered(false);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1, ease: 'easeOut' }}
      style={{ perspective: 900 }}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        onMouseMove={onMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={onMouseLeave}
        className="relative flex flex-col rounded-2xl overflow-hidden h-full"
        animate={{ y: hovered ? -6 : 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        data-hovered={hovered}
        /* dynamic border glow */
      >
        {/* Animated gradient border wrapper */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none z-0 transition-opacity duration-400"
          style={{
            background: hovered
              ? `linear-gradient(135deg, ${project.color}55, ${project.color}11, ${project.color}44)`
              : 'transparent',
            padding: 1,
            opacity: hovered ? 1 : 0,
          }}
        />

        <div
          className="relative z-10 flex flex-col h-full rounded-2xl overflow-hidden"
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: hovered ? `1px solid ${project.color}44` : '1px solid rgba(255,255,255,0.07)',
            boxShadow: hovered ? `0 24px 60px ${project.glow}` : '0 4px 20px rgba(0,0,0,0.2)',
            transition: 'all 0.4s cubic-bezier(0.23,1,0.32,1)',
          }}
        >
          {/* Top gradient bar */}
          <div
            className="h-1 w-full flex-shrink-0"
            style={{
              background: `linear-gradient(90deg, ${project.color}, ${project.color}60, transparent)`,
            }}
          />

          {/* Glass reflection shimmer on hover */}
          {hovered && (
            <motion.div
              initial={{ x: '-100%', opacity: 0.6 }}
              animate={{ x: '200%', opacity: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="absolute inset-0 pointer-events-none z-20"
              style={{
                background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.06) 50%, transparent 60%)',
                width: '60%',
              }}
            />
          )}

          {/* Project number */}
          <div
            className="absolute top-4 right-4 text-5xl font-black select-none pointer-events-none z-10 leading-none"
            style={{
              color: `${project.color}12`,
              fontFamily: 'Sora, sans-serif',
              transition: 'color 0.3s',
              ...(hovered ? { color: `${project.color}1f` } : {}),
            }}
          >
            {project.num}
          </div>

          <div className="p-6 flex flex-col flex-1">
            {/* Icon + category */}
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                style={{
                  background: `${project.color}18`,
                  border: `1px solid ${project.color}28`,
                  boxShadow: hovered ? `0 0 16px ${project.color}30` : 'none',
                  transition: 'all 0.3s ease',
                }}
              >
                {project.icon}
              </div>
              <div>
                <span
                  className="inline-block px-2.5 py-0.5 rounded-lg text-xs font-semibold mb-1"
                  style={{
                    background: `${project.color}15`,
                    border: `1px solid ${project.color}25`,
                    color: project.color,
                    fontFamily: 'Inter',
                  }}
                >
                  {project.categoryLabel}
                </span>
              </div>
            </div>

            {/* Title */}
            <h3
              className="text-xl font-black text-white mb-3 leading-snug"
              style={{ fontFamily: 'Sora, sans-serif' }}
            >
              {project.title}
            </h3>

            {/* Description */}
            <p
              className="text-sm leading-relaxed mb-1 flex-1"
              style={{ color: '#94A3B8', fontFamily: 'Inter', lineHeight: 1.75 }}
            >
              {project.description}
            </p>

            {/* Expand/collapse long description */}
            <AnimatePresence>
              {expanded && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.35 }}
                  className="text-sm leading-relaxed mt-2 mb-1 overflow-hidden"
                  style={{ color: '#64748B', fontFamily: 'Inter', lineHeight: 1.75 }}
                >
                  {project.longDescription}
                </motion.p>
              )}
            </AnimatePresence>

            <button
              onClick={() => setExpanded(e => !e)}
              className="text-xs font-medium mt-1 mb-4 self-start transition-colors"
              style={{ color: project.color, fontFamily: 'Inter', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
            >
              {expanded ? '↑ Show less' : '↓ Read more'}
            </button>

            {/* Stack pills */}
            <div className="flex flex-wrap gap-1.5 mb-5">
              {project.stack.map(tag => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-lg text-xs font-medium transition-all duration-200"
                  style={{
                    background: hovered ? `${project.color}0f` : 'rgba(255,255,255,0.04)',
                    border: hovered ? `1px solid ${project.color}22` : '1px solid rgba(255,255,255,0.07)',
                    color: hovered ? '#CBD5E1' : '#64748B',
                    fontFamily: 'Inter',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Feature tags */}
            <div className="flex flex-wrap gap-1.5 mb-6">
              {project.features.map(f => (
                <span
                  key={f}
                  className="flex items-center gap-1 px-2 py-0.5 rounded text-xs"
                  style={{
                    background: `${project.color}0a`,
                    border: `1px solid ${project.color}18`,
                    color: project.color,
                    fontFamily: 'Inter',
                    opacity: 0.85,
                  }}
                >
                  <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: project.color }} />
                  {f}
                </span>
              ))}
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2 mt-auto">
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.96 }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold flex-1 justify-center"
                style={{
                  background: 'linear-gradient(135deg, #2563EB, #06B6D4)',
                  color: '#fff',
                  fontFamily: 'Inter',
                  textDecoration: 'none',
                  boxShadow: '0 4px 14px rgba(37,99,235,0.3)',
                }}
              >
                <FiGithub className="text-sm" />
                View Code
              </motion.a>
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.96 }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold"
                style={{
                  background: `${project.color}14`,
                  border: `1px solid ${project.color}30`,
                  color: project.color,
                  fontFamily: 'Inter',
                  textDecoration: 'none',
                }}
              >
                <FiExternalLink className="text-sm" />
                Open
              </motion.a>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   BACKGROUND BLOBS
───────────────────────────────────────── */
function BgBlobs() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <motion.div
        animate={{ scale: [1, 1.2, 1], x: [0, 40, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-40 right-1/4 w-[500px] h-[500px] rounded-full blur-3xl opacity-[0.06]"
        style={{ background: 'radial-gradient(circle, #7C3AED, transparent 70%)' }}
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1], x: [0, -30, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full blur-3xl opacity-[0.06]"
        style={{ background: 'radial-gradient(circle, #2563EB, transparent 70%)' }}
      />
      <motion.div
        animate={{ scale: [1, 1.25, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute top-1/2 left-0 w-72 h-72 rounded-full blur-3xl opacity-[0.04]"
        style={{ background: 'radial-gradient(circle, #06B6D4, transparent 70%)' }}
      />
      {/* grid lines */}
      <div
        className="absolute inset-0 opacity-[0.022]"
        style={{
          backgroundImage: `linear-gradient(rgba(37,99,235,0.5) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(37,99,235,0.5) 1px, transparent 1px)`,
          backgroundSize: '70px 70px',
        }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────── */
export default function Projects() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: '-60px' });

  const [activeFilter, setActiveFilter] = useState('All');
  const [search, setSearch] = useState('');

  /* filtering logic */
  const filtered = ALL_PROJECTS.filter(p => {
    const matchFilter = activeFilter === 'All' || p.tags.includes(activeFilter) || p.category === activeFilter;
    const q = search.toLowerCase();
    const matchSearch = !q
      || p.title.toLowerCase().includes(q)
      || p.category.toLowerCase().includes(q)
      || p.stack.some(s => s.toLowerCase().includes(q))
      || p.tags.some(t => t.toLowerCase().includes(q));
    return matchFilter && matchSearch;
  });

  return (
    <div
      className="relative py-24 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #050816 0%, #06091a 60%, #050816 100%)' }}
    >
      <BgBlobs />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section header ── */}
        <div ref={titleRef} className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-5"
            style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.25)' }}
          >
            <FiLayers style={{ color: '#7C3AED' }} />
            <span className="text-xs font-medium tracking-wider uppercase" style={{ color: '#7C3AED', fontFamily: 'Inter' }}>
              What I've Built
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-5xl sm:text-6xl font-black mb-5"
            style={{ fontFamily: 'Sora, sans-serif' }}
          >
            <span className="text-white">My </span>
            <span style={{
              background: 'linear-gradient(135deg, #7C3AED, #2563EB, #06B6D4)',
              backgroundSize: '200% 200%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'gradientShift 5s ease infinite',
            }}>Projects</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={titleInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="text-base max-w-lg mx-auto"
            style={{ color: '#64748B', fontFamily: 'Inter', lineHeight: 1.75 }}
          >
            Building scalable software solutions using modern technologies.
          </motion.p>
        </div>

        {/* ── Stats ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.25 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-14"
        >
          <Counter target="15+" label="Projects Completed" />
          <Counter target="1+" label="Open Source Contributions" />
          <Counter target="25+" label="Technologies Used" />
          <Counter target="Multiple" label="GitHub Repositories" />
        </motion.div>

        {/* ── Search bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="relative max-w-xl mx-auto mb-8"
        >
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-base pointer-events-none" style={{ color: '#475569' }} />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by project, technology or category…"
            className="w-full pl-11 pr-10 py-3.5 rounded-xl text-sm placeholder-slate-600"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.09)',
              color: '#F1F5F9',
              fontFamily: 'Inter',
              outline: 'none',
            }}
            onFocus={e => { e.currentTarget.style.border = '1px solid rgba(37,99,235,0.5)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(37,99,235,0.1)'; }}
            onBlur={e => { e.currentTarget.style.border = '1px solid rgba(255,255,255,0.09)'; e.currentTarget.style.boxShadow = 'none'; }}
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(255,255,255,0.08)', color: '#94A3B8' }}
            >
              <FiX className="text-xs" />
            </button>
          )}
        </motion.div>

        {/* ── Filter pills ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.35 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {FILTERS.map(f => {
            const active = activeFilter === f.value;
            return (
              <motion.button
                key={f.value}
                onClick={() => setActiveFilter(f.value)}
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-250"
                style={{
                  background: active ? 'linear-gradient(135deg, #2563EB, #06B6D4)' : 'rgba(255,255,255,0.05)',
                  border: active ? 'none' : '1px solid rgba(255,255,255,0.08)',
                  color: active ? '#fff' : '#94A3B8',
                  boxShadow: active ? '0 4px 14px rgba(37,99,235,0.35)' : 'none',
                  fontFamily: 'Inter',
                }}
              >
                {f.label}
              </motion.button>
            );
          })}
        </motion.div>

        {/* ── Project grid ── */}
        <AnimatePresence mode="wait">
          {filtered.length > 0 ? (
            <motion.div
              key={`${activeFilter}-${search}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
            >
              {filtered.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-24"
            >
              <div className="text-5xl mb-4">🔍</div>
              <p className="text-base font-semibold text-white mb-2" style={{ fontFamily: 'Sora' }}>No projects found</p>
              <p className="text-sm" style={{ color: '#475569', fontFamily: 'Inter' }}>Try a different search or filter.</p>
              <button onClick={() => { setSearch(''); setActiveFilter('All'); }} className="mt-5 px-5 py-2.5 rounded-xl text-sm font-semibold" style={{ background: 'linear-gradient(135deg,#2563EB,#06B6D4)', color: '#fff', border: 'none', cursor: 'pointer', fontFamily: 'Inter' }}>
                Clear filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── GitHub CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-14"
        >
          <motion.a
            href="https://github.com/pri12ya871"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl font-semibold text-sm"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: '#F1F5F9',
              fontFamily: 'Inter',
              textDecoration: 'none',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.09)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(230,237,243,0.1)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            <FiGithub className="text-base" />
            View All Projects on GitHub
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
}
