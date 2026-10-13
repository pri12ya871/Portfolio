import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Reveal from './Reveal';
import SectionHeader from './SectionHeader';
import { ArrowOut, Plus, Minus } from './Icons';

const PROJECTS = [
  {
    title: 'Yojana Agent',
    kind: 'AI agent · government schemes',
    github: 'https://github.com/pri12ya871/yojana-agent',
    description: 'An agent that tells people which Indian government schemes they may qualify for, and why. Claude turns official guidelines into rules, but the yes/no answer always comes from plain code, citing the exact sentence in the government document.',
    details: 'Every rule the LLM extracts must pass four checks against a saved copy of the source: the quote appears word for word, its numbers and limit directions match, and a local NLI model confirms the quote supports the rule. A three-valued rule engine decides from partial answers, asks only the questions that can still change a result, and says "confirm with the office" rather than guess. A Hinglish-aware chat layer runs offline, and 60 tests include property tests over random rule sets.',
    features: ['Verified LLM rule extraction', 'Cited answers', 'Three-valued rule engine', 'Next-question picker', 'Runs without an API key'],
    stack: ['Node.js', 'Claude API', 'transformers.js', 'Zod', 'node:test'],
  },
  {
    title: 'Auth Service',
    kind: 'Backend · authentication',
    github: 'https://github.com/pri12ya871/auth-service',
    description: 'A JWT authentication service with refresh-token rotation and reuse detection: replaying a rotated refresh token revokes that user\'s whole token family.',
    details: 'scrypt password hashing, SHA-256 hashed refresh tokens, role-based access control and rate limiting. Login takes the same time for an unknown email as for a wrong password, so it does not leak which accounts exist. One runtime dependency (Express); the database, hashing, JWT signing and test runner all ship with Node. 43 tests.',
    features: ['Refresh-token rotation', 'Reuse detection', 'RBAC', 'Rate limiting', 'Timing-safe login'],
    stack: ['Node.js', 'Express', 'JWT', 'node:sqlite', 'node:crypto'],
  },
  {
    title: 'Chat API',
    kind: 'Real-time backend · WebSockets',
    github: 'https://github.com/pri12ya871/chat-api',
    description: 'A real-time chat server with rooms, presence, typing indicators and message history, over a WebSocket protocol written from scratch, with no ws and no socket.io.',
    details: 'Implements the handshake, frame codec, fragmentation, ping/pong and closing handshake, plus per-connection flood limits. Two real bugs found by running it are documented and covered by regression tests: half-open sockets leaving ghost room members, and bytes past the upgrade headers being dropped. 58 tests, including a separate WebSocket client written for the tests.',
    features: ['WebSocket protocol from scratch', 'Rooms & presence', 'Typing indicators', 'Flood limits', 'Message history'],
    stack: ['Node.js', 'Express', 'WebSockets', 'node:test'],
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
          intro="Three projects across AI and backend. Each links straight to its source."
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
