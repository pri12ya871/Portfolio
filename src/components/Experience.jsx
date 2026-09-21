import Reveal from './Reveal';
import SectionHeader from './SectionHeader';
import { ArrowOut } from './Icons';

const BULLETS = [
  'Resolved bugs in the KubeStellar codebase through GitHub pull requests, improving reliability and reducing reported issues.',
  'Worked through code review with senior maintainers, integrating feedback to meet the project\'s engineering standards.',
  'Used Git, Kubernetes, Docker and CI/CD pipelines in a distributed open-source environment.',
];

export default function Experience() {
  return (
    <div className="section">
      <div className="wrap">
        <SectionHeader id="experience-title" num="04" label="Experience" title={<>Open-source <em>work</em></>} />

        <Reveal
          className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] md:gap-16 pt-8"
          style={{ borderTop: '1.5px solid var(--ink)' }}
        >
          <div>
            <h3 className="text-[clamp(1.9rem,3.6vw,2.75rem)]">KubeStellar</h3>
            <p className="mt-2 font-semibold" style={{ color: 'var(--ink)' }}>Open Source Contributor</p>
            <p className="tag mt-1">CNCF sandbox project · multi-cluster Kubernetes</p>
            <p className="mt-6">
              <a href="https://github.com/pri12ya871/kubestellar" target="_blank" rel="noopener noreferrer" className="link">
                My fork on GitHub <ArrowOut size={16} />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </p>
          </div>

          <div>
            <ul className="list-none m-0 p-0">
              {BULLETS.map((b) => (
                <li key={b} className="grid grid-cols-[20px_1fr] gap-2 py-3" style={{ borderBottom: '1px dashed var(--rule)' }}>
                  <span aria-hidden="true" style={{ color: 'var(--accent)' }}>→</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <p className="tag mt-5">Git  /  Docker  /  Kubernetes  /  CI/CD  /  GitHub</p>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
