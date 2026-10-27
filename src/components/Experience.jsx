import Reveal from './Reveal';
import SectionHeader from './SectionHeader';
import { ArrowOut } from './Icons';

const ENTRIES = [
  {
    name: 'Naamin',
    role: 'Full-Stack Web Developer (Freelance) · Jan – Apr 2026',
    tag: 'Live baby-name discovery website · Remote',
    link: { href: 'https://naamin.com', label: 'naamin.com' },
    bullets: [
      'Shipped full-stack features for naamin.com over a 4-month collaboration with the founder, turning product requirements into production pages.',
      'Powered name search with 3 filters (gender, starting letter, popularity) and 2 user features (wishlists, saved shortlists) by querying Supabase through its JavaScript client.',
      'Updated pages across a product with 10+ name tools, user accounts and 22-language support, including Name Finder, Nickname Finder and a Name Report with PDF download.',
      'Resolved UI and functional issues across desktop and mobile browsers, iterating on the founder\'s feedback.',
    ],
    stack: 'Next.js  /  React.js  /  Supabase',
  },
  {
    name: 'tRPC',
    role: 'Merged pull request · Oct 2026',
    tag: 'End-to-end typesafe APIs for TypeScript',
    link: { href: 'https://github.com/trpc/trpc/pull/7529', label: 'trpc/trpc#7529' },
    bullets: [
      'Found that the Fastify adapter registered WebSocket keepalive twice for every connection, doubling ping traffic.',
      'Showed the less obvious effect: each registration reset only its own timer, so the leftover one could close a healthy connection.',
      'Removed the duplicate and added a regression test that counts pings per interval. Merged by tRPC\'s creator.',
    ],
    stack: 'TypeScript  /  WebSockets  /  Fastify  /  Vitest',
  },
  {
    name: 'TypeORM',
    role: 'Merged pull request · Oct 2026',
    tag: 'ORM for Node.js and TypeScript',
    link: { href: 'https://github.com/typeorm/typeorm/pull/12750', label: 'typeorm/typeorm#12750' },
    bullets: [
      'Replaced Date.now() with performance.now() for query timing across all 13 database drivers, so a system clock change can no longer skew slow-query reports.',
      'Rounded execution time in the logger so slow-query logs stay readable.',
      'Worked through maintainer review and rebased across a repo restructure before merge.',
    ],
    stack: 'TypeScript  /  Node.js  /  SQL drivers',
  },
  {
    name: 'KubeStellar',
    role: 'Open Source Contributor',
    tag: 'CNCF sandbox project · multi-cluster Kubernetes',
    link: { href: 'https://github.com/pri12ya871/kubestellar', label: 'My fork on GitHub' },
    bullets: [
      'Submitted a documentation fix to KubeStellar, a CNCF Sandbox project for multi-cluster Kubernetes configuration management.',
      'The pull request was reviewed by maintainers and merged (Mar 2025).',
    ],
    stack: 'Git  /  Docker  /  Kubernetes  /  CI/CD  /  GitHub',
  },
];

export default function Experience() {
  return (
    <div className="section">
      <div className="wrap">
        <SectionHeader id="experience-title" num="04" label="Experience" title={<>Work &amp; <em>open source</em></>} />

        {ENTRIES.map((e, i) => (
          <Reveal
            key={e.name}
            className={`grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] md:gap-16 pt-8${i > 0 ? ' mt-14' : ''}`}
            style={{ borderTop: '1.5px solid var(--ink)' }}
          >
            <div>
              <h3 className="text-[clamp(1.9rem,3.6vw,2.75rem)]">{e.name}</h3>
              <p className="mt-2 font-semibold" style={{ color: 'var(--ink)' }}>{e.role}</p>
              <p className="tag mt-1">{e.tag}</p>
              <p className="mt-6">
                <a href={e.link.href} target="_blank" rel="noopener noreferrer" className="link">
                  {e.link.label} <ArrowOut size={16} />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </p>
            </div>

            <div>
              <ul className="list-none m-0 p-0">
                {e.bullets.map((b) => (
                  <li key={b} className="grid grid-cols-[20px_1fr] gap-2 py-3" style={{ borderBottom: '1px dashed var(--rule)' }}>
                    <span aria-hidden="true" style={{ color: 'var(--accent)' }}>→</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <p className="tag mt-5">{e.stack}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
