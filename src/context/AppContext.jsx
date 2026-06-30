import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  /* ── Theme (dark default, persisted) ── */
  const [theme, setTheme] = useState(() => localStorage.getItem('ps-theme') || 'dark');

  const toggleTheme = useCallback(() => {
    setTheme(t => {
      const next = t === 'dark' ? 'light' : 'dark';
      localStorage.setItem('ps-theme', next);
      return next;
    });
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  /* ── Loading state ── */
  const [isLoading, setIsLoading] = useState(true);

  /* ── Navigation active section ── */
  const [activeSection, setActiveSection] = useState('home');

  /* ── Contact form global status ── */
  const [contactStatus, setContactStatus] = useState('idle'); // idle | sending | success | error

  /* ── Reduce motion preference ── */
  const [reduceMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  const value = {
    theme, toggleTheme,
    isLoading, setIsLoading,
    activeSection, setActiveSection,
    contactStatus, setContactStatus,
    reduceMotion,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be used within AppProvider');
  return ctx;
}
