import Reveal from './Reveal';
import SectionHeader from './SectionHeader';
import { ArrowOut } from './Icons';

const ENTRIES = [
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
      'Resolved bugs in the KubeStellar codebase through GitHub pull requests, improving reliability and reducing reported issues.',
      'Worked through code review with senior maintainers, integrating feedback to meet the project\'s engineering standards.',
      'Used Git, Kubernetes, Docker and CI/CD pipelines in a distributed open-source environment.',
    ],
    stack: 'Git  /  Docker  /  Kubernetes  /  CI/CD  /  GitHub',
  },
];

export default function Experience() {
  return (
    <div className="section">
      <div className="wrap">
        <SectionHeader id="experience-title" num="04" label="Experience" title={<>Open-source <em>work</em></>} />

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
