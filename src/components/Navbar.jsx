import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiHome } from 'react-icons/hi';
import { HiMenuAlt3, HiX } from 'react-icons/hi';

const NAV_LINKS = [
  { label: 'Projects',       href: '#projects'       },
  { label: 'Experience',     href: '#experience'     },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Resume',         href: '#resume'         },
  { label: 'Contact',        href: '#contact'        },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('home');
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20);
    const sections = ['home', 'skills', 'projects', 'experience', 'certifications', 'resume', 'contact'];
    for (const id of [...sections].reverse()) {
      const el = document.getElementById(id);
      if (el && window.scrollY >= el.offsetTop - 120) {
        setActive(id);
        break;
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const scrollTo = (e, href) => {
    e.preventDefault();
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMobileOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8"
        style={{
          background: scrolled ? 'rgba(5, 8, 22, 0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
          transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
        }}
      >
        <div className="max-w-7xl mx-auto h-16 flex items-center justify-between">
          {/* Logo / Home Icon */}
          <motion.a
            href="#home"
            onClick={(e) => scrollTo(e, '#home')}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 group"
            aria-label="Home"
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300"
              style={{
                background: active === 'home'
                  ? 'linear-gradient(135deg, #2563EB, #06B6D4)'
                  : 'rgba(255,255,255,0.06)',
                boxShadow: active === 'home' ? '0 0 20px rgba(37, 99, 235, 0.4)' : 'none',
              }}
            >
              <HiHome className="text-white text-lg" />
            </div>
          </motion.a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ label, href }) => {
              const id = href.replace('#', '');
              const isActive = active === id;
              return (
                <motion.a
                  key={label}
                  href={href}
                  onClick={(e) => scrollTo(e, href)}
                  whileHover={{ y: -1 }}
                  className="relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300"
                  style={{
                    color: isActive ? '#06B6D4' : '#94A3B8',
                    background: isActive ? 'rgba(6, 182, 212, 0.08)' : 'transparent',
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  {label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full"
                      style={{ background: 'linear-gradient(90deg, #2563EB, #06B6D4)' }}
                      transition={{ type: 'spring', bounce: 0.25, duration: 0.4 }}
                    />
                  )}
                </motion.a>
              );
            })}
            <motion.a
              href="#contact"
              onClick={(e) => scrollTo(e, '#contact')}
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.97 }}
              className="ml-3 px-5 py-2 rounded-lg text-sm font-semibold text-white"
              style={{
                background: 'linear-gradient(135deg, #2563EB, #06B6D4)',
                boxShadow: '0 4px 15px rgba(37, 99, 235, 0.3)',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              Hire Me
            </motion.a>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 rounded-lg"
            style={{ background: 'rgba(255,255,255,0.06)' }}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {mobileOpen ? (
                <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <HiX className="text-white text-xl" />
                </motion.span>
              ) : (
                <motion.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <HiMenuAlt3 className="text-white text-xl" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed top-16 left-4 right-4 z-40 rounded-2xl overflow-hidden"
            style={{
              background: 'rgba(5, 8, 22, 0.96)',
              backdropFilter: 'blur(24px)',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
            }}
          >
            <div className="p-4 flex flex-col gap-1">
              <a
                href="#home"
                onClick={(e) => scrollTo(e, '#home')}
                className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all"
                style={{
                  color: active === 'home' ? '#06B6D4' : '#94A3B8',
                  background: active === 'home' ? 'rgba(6, 182, 212, 0.08)' : 'transparent',
                }}
              >
                <HiHome className="text-lg" />
                <span className="text-sm font-medium" style={{ fontFamily: 'Inter' }}>Home</span>
              </a>
              {NAV_LINKS.map(({ label, href }) => {
                const id = href.replace('#', '');
                const isActive = active === id;
                return (
                  <a
                    key={label}
                    href={href}
                    onClick={(e) => scrollTo(e, href)}
                    className="px-4 py-3 rounded-xl text-sm font-medium transition-all"
                    style={{
                      color: isActive ? '#06B6D4' : '#94A3B8',
                      background: isActive ? 'rgba(6, 182, 212, 0.08)' : 'transparent',
                      fontFamily: 'Inter',
                    }}
                  >
                    {label}
                  </a>
                );
              })}
              <a
                href="#contact"
                onClick={(e) => scrollTo(e, '#contact')}
                className="mt-2 px-4 py-3 rounded-xl text-sm font-semibold text-white text-center"
                style={{
                  background: 'linear-gradient(135deg, #2563EB, #06B6D4)',
                }}
              >
                Hire Me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
