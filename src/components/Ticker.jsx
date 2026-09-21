/* Dark band of scrolling tech names between the hero and About.
   Decorative only (the real list lives in Skills), so it's hidden from screen readers.
   Pauses on hover; static under prefers-reduced-motion. */
const ITEMS = ['React', 'Node.js', 'Express', 'MongoDB', 'Python', 'C++', 'REST APIs', 'Docker', 'Kubernetes', 'Firebase', 'Tailwind', 'Git'];

function Row() {
  return (
    <ul className="flex items-center shrink-0 list-none m-0 p-0">
      {ITEMS.map((t) => (
        <li key={t} className="flex items-center">
          <span className="px-6 sm:px-8" style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', color: 'var(--ink)' }}>
            {t}
          </span>
          <span style={{ color: 'var(--accent)', fontSize: '1.25rem' }}>✳</span>
        </li>
      ))}
    </ul>
  );
}

export default function Ticker() {
  return (
    <div className="on-ink ticker overflow-hidden py-5 sm:py-6" aria-hidden="true">
      <div className="ticker-track">
        <Row />
        <Row />
      </div>
    </div>
  );
}
