import { useState, useEffect, useCallback } from 'react';

const SECTIONS = ['home', 'skills', 'projects', 'experience', 'certifications', 'resume', 'contact'];

/**
 * Tracks which section is currently in the viewport based on scroll position.
 * Returns the active section id string.
 */
export function useActiveSection(offset = 120) {
  const [active, setActive] = useState('home');

  const handleScroll = useCallback(() => {
    for (const id of [...SECTIONS].reverse()) {
      const el = document.getElementById(id);
      if (el && window.scrollY >= el.offsetTop - offset) {
        setActive(id);
        return;
      }
    }
    setActive('home');
  }, [offset]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return active;
}
