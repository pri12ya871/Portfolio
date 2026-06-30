import { useEffect, useState } from 'react';

/**
 * Tracks the current mouse position across the document.
 * Returns { x, y } in pixels.
 */
export function useMousePosition() {
  const [pos, setPos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const handler = e => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  return pos;
}
