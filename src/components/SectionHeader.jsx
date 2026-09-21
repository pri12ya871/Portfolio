import Reveal from './Reveal';

/**
 * Numbered section header: "03 — Selected work" eyebrow, then a serif title.
 * `title` may contain an <em> for the single accent word.
 */
export default function SectionHeader({ id, num, label, title, intro }) {
  return (
    <Reveal className="mb-12 sm:mb-16 grid gap-6 lg:grid-cols-[1fr_minmax(0,420px)] lg:items-end">
      <div>
        <p className="eyebrow"><b>{num}</b><span>— {label}</span></p>
        <h2 id={id} className="section-title">{title}</h2>
      </div>
      {intro && <p style={{ color: 'var(--ink-3)' }}>{intro}</p>}
    </Reveal>
  );
}
