import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Reveal from './Reveal';
import SectionHeader from './SectionHeader';
import { ArrowOut, Plus, Minus } from './Icons';

const PROJECTS = [
  {
    title: 'ICON Store',
    kind: 'Full-stack MERN application',
    github: 'https://github.com/pri12ya871/Ecommerce-website',
    description: 'A full-stack e-commerce platform where customers shop, sellers manage products, and administrators manage users, products and orders through role-based authentication.',
    details: 'Built with React, Node.js, Express and MongoDB, with JWT authentication, bcrypt password hashing and a REST API between frontend and backend. Covers the complete e-commerce workflow: authentication, CRUD, cart and orders.',
    features: ['Role-based access', 'Shopping cart', 'Order management', 'Admin & seller dashboards', 'Responsive UI'],
    stack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'bcrypt'],
  },
  {
    title: 'CinderPeak',
    kind: 'C++ graph library',
    github: 'https://github.com/pri12ya871/Cinder-Peak',
    description: 'A modular C++ graph-algorithm library with a clean API for BFS, DFS, Dijkstra and minimum spanning trees.',
    details: 'Written in modern C++ with Google Test and GitHub Actions CI. Focuses on memory management, multithreading, unit testing and reusable architecture.',
    features: ['Graph algorithms', 'OOP design', 'Unit-tested', 'CI pipeline'],
    stack: ['C++', 'STL', 'Google Test', 'GitHub Actions'],
  },
  {
    title: 'CSE Assist',
    kind: 'Chatbot',
    github: 'https://github.com/pri12ya871/chat-bot-cse-dept',
    description: 'A chatbot that answers computer-science questions in real time using NLP pattern matching over a structured knowledge base.',
    details: 'Backend logic in JavaScript and Python, with a JSON knowledge base designed to be extended without code changes.',
    features: ['NLP pattern matching', 'Knowledge-base design', 'API integration'],
    stack: ['Python', 'JavaScript', 'Node.js', 'JSON'],
  },
  {
    title: 'P2P File Sync',
    kind: 'Distributed systems · open source',
    github: 'https://github.com/OpenTechTools/p2p-file-sync-and-collab',
    description: 'A decentralised peer-to-peer version-control system that lets several users collaborate securely without a central server.',
    details: 'Uses a Merkle DAG for content-addressable storage, a CRDT (LWW set) for conflict-free merging, SHA-256 for integrity and signed commits, and Kademlia-style DHT concepts for peer discovery.',
    features: ['Merkle DAG', 'CRDTs', 'Signed commits', 'P2P networking'],
    stack: ['React.js', 'FastAPI', 'Python', 'SHA-256'],
  },
  {
    title: 'UpSpire',
    kind: 'AI learning platform · hackathon',
    github: 'https://github.com/pri12ya871/UpSpire',
    description: 'A student learning and career platform: portfolio builder, an "AI Professor" for doubt resolution, academic analytics and mentor sessions in one place.',
    details: 'Built in 24 hours at the Masters\' Union hackathon, where the team placed in the top 30. Combines AI features, authentication, dashboards and real-time data with Firebase.',
    features: ['AI Professor', 'Portfolio builder', 'Analytics dashboard', 'Real-time database'],
    stack: ['React.js', 'JavaScript', 'Firebase'],
  },
];

function ProjectRow({ p, index }) {
  const [open, setOpen] = useState(false);
  const detailsId = `project-${index}-details`;

  return (
    <Reveal as="li" className="proj-row py-8 sm:py-10 px-4 -mx-4 sm:px-6 sm:-mx-6 rounded-xl" style={{ borderTop: '1px solid var(--rule)' }}>
      <div className="grid gap-4 md:grid-cols-[88px_minmax(0,1fr)_minmax(0,1.2fr)] md:gap-8">
        <span
          className="proj-num inline-block leading-none"
          style={{ color: 'var(--accent)', fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 'clamp(2.5rem, 4vw, 3.5rem)' }}
          aria-hidden="true"
        >
          {String(index + 1).padStart(2, '0')}
        </span>

        <div>
          <h3 className="text-[clamp(1.75rem,3.4vw,2.5rem)]">{p.title}</h3>
          <p className="mono mt-2" style={{ color: 'var(--ink-3)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '.06em' }}>
            {p.kind}
          </p>
        </div>

        <div>
          <p>{p.description}</p>

          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                id={detailsId}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <p className="mt-4" style={{ color: 'var(--ink-3)' }}>{p.details}</p>
                <ul className="mt-4 list-none p-0 m-0 flex flex-wrap gap-x-5 gap-y-1">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-2" style={{ color: 'var(--ink-2)', fontSize: 15 }}>
                      <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent)' }} />
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>

          <p className="tag mt-5">{p.stack.join('  /  ')}</p>

          <div className="mt-6 flex flex-wrap items-center gap-x-7 gap-y-3">
            <a href={p.github} target="_blank" rel="noopener noreferrer" className="link">
              Source on GitHub <ArrowOut size={16} />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls={detailsId}
              className="inline-flex items-center gap-1.5 text-[15px] font-medium cursor-pointer"
              style={{ background: 'none', border: 0, padding: 0, color: 'var(--ink-3)' }}
            >
              {open ? <Minus size={15} /> : <Plus size={15} />}
              {open ? 'Less detail' : 'More detail'}
            </button>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export default function Projects() {
  return (
    <div className="section">
      <div className="wrap">
        <SectionHeader
          id="projects-title"
          num="03"
          label="Work"
          title={<>Selected <em>work</em></>}
          intro="Five projects across full-stack, systems and AI. Each links straight to its source."
        />

        <ol className="list-none m-0 p-0" style={{ borderBottom: '1px solid var(--rule)' }}>
          {PROJECTS.map((p, i) => <ProjectRow key={p.title} p={p} index={i} />)}
        </ol>

        <p className="mt-10">
          <a href="https://github.com/pri12ya871" target="_blank" rel="noopener noreferrer" className="link">
            Everything else is on GitHub <ArrowOut size={16} />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </p>
      </div>
    </div>
  );
}
