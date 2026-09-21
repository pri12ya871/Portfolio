import Reveal from './Reveal';
import SectionHeader from './SectionHeader';

/* Plain lists. The old version had self-rated percentage bars ("Kubernetes 55%"),
   which recruiters discount and which invite the wrong questions. */
const GROUPS = [
  { title: 'Languages',      items: ['JavaScript', 'Python', 'C++', 'C', 'Java', 'SQL'] },
  { title: 'Frontend',       items: ['React.js', 'HTML5 & CSS3', 'Tailwind CSS', 'Material UI', 'Bootstrap'] },
  { title: 'Backend',        items: ['Node.js', 'Express.js', 'REST APIs', 'JWT authentication', 'Microservices'] },
  { title: 'Data',           items: ['MongoDB', 'MySQL', 'Firebase'] },
  { title: 'DevOps & cloud', items: ['Git & GitHub', 'Linux', 'Docker', 'Kubernetes', 'CI/CD', 'AWS, GCP'] },
  { title: 'Foundations',    items: ['Data structures & algorithms', 'OOP', 'DBMS', 'Operating systems', 'Networks', 'System design', 'Agile'] },
];

export default function TechnicalSkills() {
  return (
    <div className="section on-ink" style={{ borderTop: 0 }}>
      <div className="wrap">
        <SectionHeader
          id="skills-title"
          num="02"
          label="Skills"
          title={<>The <em>toolkit</em></>}
          intro="What I reach for day to day, grouped by where it sits in the stack."
        />

        <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {GROUPS.map((g, i) => (
            <Reveal key={g.title} delay={(i % 3) * 0.06} style={{ borderTop: '1.5px solid var(--ink)', paddingTop: 16 }}>
              <h3 className="text-[1.35rem]">{g.title}</h3>
              <ul className="list-none m-0 mt-4 p-0">
                {g.items.map((s) => (
                  <li key={s} className="py-1.5" style={{ borderBottom: '1px dashed var(--rule)', color: 'var(--ink-2)' }}>
                    {s}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
