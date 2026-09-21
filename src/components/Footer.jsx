import { ArrowUp } from './Icons';

/* Deliberately small: the contact links sit directly above this, so the footer
   doesn't repeat them. */
export default function Footer() {
  return (
    <footer style={{ background: 'var(--ink)', color: 'rgba(243,239,230,.7)' }}>
      <div className="wrap py-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[15px]">
          <span style={{ fontFamily: 'var(--font-display)', color: 'var(--paper)', fontSize: 20 }}>
            Priya Sharma<span style={{ color: 'var(--accent)' }}>.</span>
          </span>
          <span className="ml-3">© {new Date().getFullYear()} · Designed and built by hand.</span>
        </p>
        <a href="#home" className="inline-flex items-center gap-2 text-[15px] font-semibold no-underline hover:text-[var(--paper)]"
          style={{ color: 'rgba(243,239,230,.85)' }}>
          Back to top <ArrowUp size={16} />
        </a>
      </div>
    </footer>
  );
}
