import { useState, useEffect } from 'react';
import { Menu, Close } from './Icons';

/* One link per destination. "Contact" is the call to action — there is no
   separate "Hire Me" pointing at the same place. */
const LINKS = [
  { label: 'Work',         id: 'projects'       },
  { label: 'Experience',   id: 'experience'     },
  { label: 'Achievements', id: 'certifications' },
  { label: 'Resume',       id: 'resume'         },
];
const SECTIONS = ['home', 'about', 'skills', 'projects', 'experience', 'certifications', 'resume', 'contact'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('home');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      for (const id of [...SECTIONS].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) { setActive(id); break; }
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const linkStyle = (id) => ({
    color: active === id ? 'var(--ink)' : 'var(--ink-3)',
    textDecoration: 'none',
  });

  return (
    <header
      className="fixed inset-x-0 top-0 z-50"
      style={{
        background: scrolled || open ? 'rgba(243,239,230,0.92)' : 'transparent',
        backdropFilter: scrolled || open ? 'blur(10px)' : 'none',
        WebkitBackdropFilter: scrolled || open ? 'blur(10px)' : 'none',
        borderBottom: `1px solid ${scrolled || open ? 'var(--rule)' : 'transparent'}`,
        transition: 'background-color .25s ease, border-color .25s ease',
      }}
    >
      <nav className="wrap h-16 flex items-center justify-between" aria-label="Primary">
        <a
          href="#home"
          className="text-[22px] leading-none"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--ink)', textDecoration: 'none', fontWeight: 500 }}
          onClick={() => setOpen(false)}
        >
          Priya Sharma<span style={{ color: 'var(--accent)' }}>.</span>
        </a>

        <ul className="hidden md:flex items-center gap-8 list-none m-0 p-0">
          {LINKS.map(({ label, id }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={active === id ? 'true' : undefined}
                className="text-[15px] font-medium transition-colors hover:!text-[var(--ink)] relative py-1"
                style={linkStyle(id)}
              >
                {label}
                {active === id && (
                  <span aria-hidden="true" className="absolute left-0 right-0 -bottom-0.5 h-[2px]" style={{ background: 'var(--accent)' }} />
                )}
              </a>
            </li>
          ))}
          <li>
            <a href="#contact" className="btn btn-solid" style={{ minHeight: 40, padding: '0 18px', fontSize: 14 }}>
              Contact
            </a>
          </li>
        </ul>

        <button
          type="button"
          className="md:hidden w-11 h-11 -mr-2 flex items-center justify-center rounded-full"
          style={{ color: 'var(--ink)', background: 'transparent', border: 0, cursor: 'pointer' }}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <Close size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div id="mobile-menu" className="md:hidden wrap pb-6">
          <ul className="list-none m-0 p-0 flex flex-col">
            {[...LINKS, { label: 'Contact', id: 'contact' }].map(({ label, id }) => (
              <li key={id} style={{ borderTop: '1px solid var(--rule)' }}>
                <a
                  href={`#${id}`}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between py-4 text-[26px]"
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--ink)', textDecoration: 'none' }}
                >
                  {label}
                  {active === id && <span className="mono" style={{ color: 'var(--accent)' }}>here</span>}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
