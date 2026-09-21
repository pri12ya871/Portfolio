import Reveal from './Reveal';
import SectionHeader from './SectionHeader';

export default function About() {
  return (
    <div className="section">
      <div className="wrap">
        <SectionHeader id="about-title" num="01" label="About" title={<>A little <em>background</em></>} />

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
          <Reveal>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.35rem, 2.4vw, 1.7rem)', lineHeight: 1.4, color: 'var(--ink)' }}>
              I'm a software developer and B.Tech graduate in Computer Science Engineering from Graphic
              Era Hill University, Dehradun, with a strong interest in frontend engineering, AI,
              cybersecurity, and building real-world applications that make a meaningful impact.
            </p>
          </Reveal>

          <Reveal delay={0.08} className="space-y-5">
            <p>
              I have hands-on experience building responsive full-stack web applications using React,
              Node.js and JavaScript, and integrating REST APIs. I've also worked with Python, Firebase,
              blockchain and AI-based solutions across academic and personal projects.
            </p>
            <p>
              One of my key achievements is building UpSpire — an AI-powered student learning platform —
              and contributing to the KubeStellar open-source project. I enjoy solving hard problems,
              collaborating with teams, and shipping polished software under tight deadlines.
            </p>
            <p>
              I'm looking for a Software Engineer or Frontend Developer role where I can keep growing,
              contribute to products that matter, and learn from experienced engineers.
            </p>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
