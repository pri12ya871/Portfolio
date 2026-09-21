import Reveal from './Reveal';
import SectionHeader from './SectionHeader';
import { ArrowOut, Download } from './Icons';

const PDF = '/Priya_Sharma_Resume.pdf';

/* The old viewer had page and zoom buttons that changed the iframe's #fragment —
   Chrome's PDF viewer ignores that after load, so they looked clickable but did nothing.
   Now: two honest actions, plus a plain preview on large screens only
   (mobile browsers don't render inline PDFs). */
export default function Resume() {
  return (
    <div className="section">
      <div className="wrap">
        <SectionHeader
          id="resume-title"
          num="06"
          label="Résumé"
          title={<>On one <em>page</em></>}
          intro="Education, projects, skills and achievements — the version recruiters forward."
        />

        <Reveal className="flex flex-wrap gap-3">
          <a href={PDF} download="Priya_Sharma_Resume.pdf" className="btn btn-solid">
            <Download size={17} /> Download PDF
          </a>
          <a href={PDF} target="_blank" rel="noopener noreferrer" className="btn btn-line">
            Open in a new tab <ArrowOut size={16} />
          </a>
        </Reveal>

        <Reveal delay={0.08} className="hidden lg:block mt-12 rounded-lg overflow-hidden"
          style={{ border: '1.5px solid var(--ink)', boxShadow: '12px 12px 0 var(--paper-3)' }}>
          <iframe
            src={`${PDF}#toolbar=0&navpanes=0&view=FitH`}
            title="Priya Sharma — résumé preview"
            className="block w-full"
            style={{ height: 880, border: 0, background: '#fff' }}
            loading="lazy"
          />
        </Reveal>
      </div>
    </div>
  );
}
