import { useEffect, useRef } from 'react';

/**
 * Premium minimal cursor
 * ─────────────────────────────────────────────────────────────
 * Elements:
 *   1. Outer ring  — thin blue-cyan gradient border, follows with
 *                    smooth lerp lag (feels natural, not sticky)
 *   2. Center dot  — tiny 5px solid dot, snaps near-instantly
 *
 * States:
 *   default   → ring 28px, white-ish border
 *   hovering  → ring 48px, blue-cyan gradient border + glow
 *   text      → ring hidden, native I-beam restored
 *   clicking  → ring shrinks to 18px instantly, then springs back
 *
 * Magnetic effect: hovered interactive elements nudge ±8px toward cursor
 * Ripple:          small circle radiates outward on mousedown
 *
 * All movement via RAF + lerp — zero layout cost, stable 60 fps.
 * Disabled automatically on touch / coarse-pointer devices.
 * ─────────────────────────────────────────────────────────────
 */

const LERP_RING = 0.14;   // outer ring lag  (lower = dreamier)
const LERP_DOT  = 0.62;   // dot snap speed  (higher = more responsive)
const MAGNET_PX = 9;       // max magnetic nudge in pixels

/* Elements that trigger "hover" state */
const HOVER_SELECTOR =
  'a, button, [role="button"], [data-cursor-hover], ' +
  'label, select, .group';

/* Elements that restore native text cursor */
const TEXT_SELECTOR = 'input, textarea, [contenteditable]';

export default function Cursor() {
  const ringRef   = useRef(null);
  const dotRef    = useRef(null);
  const canvasRef = useRef(null); // off-screen canvas for gradient ring border

  useEffect(() => {
    if (typeof window === 'undefined') return;
    // Disable on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const ring = ringRef.current;
    const dot  = dotRef.current;
    if (!ring || !dot) return;

    /* ── State ── */
    let rx = -80, ry = -80;   // ring lerp position
    let dx = -80, dy = -80;   // dot  lerp position
    let tx = -80, ty = -80;   // target (raw mouse)

    let visible  = false;
    let hovering = false;
    let isText   = false;
    let clicking = false;
    let raf      = null;

    /* Active magnetic element */
    let magnetEl     = null;
    let magnetOrigin = null; // { x, y } — element's original translate

    /* ── Gradient ring via conic-gradient on a pseudo canvas approach
          We just set a border-image on the div programmatically ── */

    /* ── RAF loop ── */
    function tick() {
      rx = lerp(rx, tx, LERP_RING);
      ry = lerp(ry, ty, LERP_RING);
      dx = lerp(dx, tx, LERP_DOT);
      dy = lerp(dy, ty, LERP_DOT);

      const show = visible && !isText;

      /* Ring */
      const ringSize = clicking ? 18 : hovering ? 48 : 28;
      const half     = ringSize / 2;

      ring.style.opacity    = show ? '1' : '0';
      ring.style.width      = ringSize + 'px';
      ring.style.height     = ringSize + 'px';
      ring.style.transform  = `translate(${rx - half}px, ${ry - half}px)`;
      ring.style.borderColor = hovering ? 'transparent' : 'rgba(120,160,255,0.55)';
      ring.style.background  = hovering
        ? 'transparent'
        : 'transparent';

      // Gradient border trick: use outline + box-shadow for hover state
      if (hovering) {
        ring.style.boxShadow = `
          inset 0 0 0 1.5px rgba(37,99,235,0.0),
          0 0 0 1.5px #2563EB,
          0 0 12px rgba(6,182,212,0.35)
        `;
        ring.style.border = 'none';
      } else {
        ring.style.boxShadow = 'none';
        ring.style.border = '1.5px solid rgba(120,160,255,0.5)';
      }

      /* Dot */
      const dotSize = isText ? 0 : clicking ? 3 : hovering ? 5 : 5;
      dot.style.opacity   = visible ? '1' : '0';
      dot.style.width     = dotSize + 'px';
      dot.style.height    = dotSize + 'px';
      dot.style.transform = `translate(${dx - dotSize / 2}px, ${dy - dotSize / 2}px)`;
      dot.style.background = hovering
        ? 'linear-gradient(135deg, #2563EB, #06B6D4)'
        : '#c8d8ff';

      raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);

    /* ── Helpers ── */
    function lerp(a, b, t) { return a + (b - a) * t; }

    function spawnRipple(x, y) {
      const el = document.createElement('div');
      el.style.cssText = `
        position: fixed;
        left: ${x - 14}px;
        top:  ${y - 14}px;
        width: 28px;
        height: 28px;
        border-radius: 50%;
        border: 1.5px solid rgba(6,182,212,0.7);
        pointer-events: none;
        z-index: 99998;
        animation: ps-ripple 0.55s ease-out forwards;
      `;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 600);
    }

    /* ── Magnetic: nudge element toward cursor ── */
    function applyMagnet(el, cx, cy) {
      const r   = el.getBoundingClientRect();
      const ecx = r.left + r.width  / 2;
      const ecy = r.top  + r.height / 2;
      const dx  = (cx - ecx) / (r.width  / 2);
      const dy  = (cy - ecy) / (r.height / 2);
      const nx  = Math.max(-1, Math.min(1, dx));
      const ny  = Math.max(-1, Math.min(1, dy));
      el.style.transform  = `translate(${nx * MAGNET_PX}px, ${ny * MAGNET_PX}px)`;
      el.style.transition = 'transform 0.12s ease-out';
    }

    function resetMagnet(el) {
      if (!el) return;
      el.style.transform  = 'translate(0px, 0px)';
      el.style.transition = 'transform 0.35s ease-out';
    }

    /* ── Event handlers ── */
    function onMove(e) {
      tx = e.clientX;
      ty = e.clientY;
      visible = true;
      if (magnetEl) applyMagnet(magnetEl, tx, ty);
    }

    function onDown(e) {
      clicking = true;
      spawnRipple(e.clientX, e.clientY);
    }
    function onUp()    { clicking = false; }
    function onLeave() { visible  = false; }
    function onEnter() { visible  = true;  }

    function onOver(e) {
      const target = e.target;

      // Text cursor — restore native
      isText   = !!target.closest(TEXT_SELECTOR);

      // Hover state
      const hoverEl = target.closest(HOVER_SELECTOR);
      hovering = !!hoverEl && !isText;

      // Magnetic
      if (hovering && hoverEl !== magnetEl) {
        resetMagnet(magnetEl);
        magnetEl = hoverEl;
      } else if (!hovering && magnetEl) {
        resetMagnet(magnetEl);
        magnetEl = null;
      }
    }

    function onOut(e) {
      const to = e.relatedTarget;
      if (!to || !to.closest(HOVER_SELECTOR)) {
        hovering = false;
        resetMagnet(magnetEl);
        magnetEl = null;
        isText   = false;
      }
    }

    document.addEventListener('mousemove',  onMove,  { passive: true });
    document.addEventListener('mousedown',  onDown);
    document.addEventListener('mouseup',    onUp);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);
    document.addEventListener('mouseover',  onOver,  { passive: true });
    document.addEventListener('mouseout',   onOut,   { passive: true });

    /* ── Hide native cursor + inject ripple keyframes ── */
    const style = document.createElement('style');
    style.id = 'ps-cursor-style';
    style.textContent = `
      *, *::before, *::after { cursor: none !important; }
      input, textarea, [contenteditable],
      input *, textarea * { cursor: text !important; }

      @keyframes ps-ripple {
        0%   { transform: scale(0.5); opacity: 0.9; }
        100% { transform: scale(2.6); opacity: 0;   }
      }
    `;
    document.head.appendChild(style);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('mousemove',  onMove);
      document.removeEventListener('mousedown',  onDown);
      document.removeEventListener('mouseup',    onUp);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      document.removeEventListener('mouseover',  onOver);
      document.removeEventListener('mouseout',   onOut);
      document.getElementById('ps-cursor-style')?.remove();
      resetMagnet(magnetEl);
    };
  }, []);

  /* Don't render on touch devices */
  if (typeof window !== 'undefined' &&
      window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  const base = {
    position:      'fixed',
    top:           0,
    left:          0,
    borderRadius:  '50%',
    pointerEvents: 'none',
    zIndex:        99999,
    willChange:    'transform, width, height, opacity',
    // CSS transitions only apply to size/color/opacity — NOT transform
    transition: [
      'width 0.2s cubic-bezier(0.22,1,0.36,1)',
      'height 0.2s cubic-bezier(0.22,1,0.36,1)',
      'opacity 0.25s ease',
      'border-color 0.2s ease',
      'box-shadow 0.2s ease',
      'background 0.15s ease',
    ].join(', '),
  };

  return (
    <>
      {/* Outer ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          ...base,
          width:   28,
          height:  28,
          opacity: 0,
          border:  '1.5px solid rgba(120,160,255,0.5)',
          background: 'transparent',
        }}
      />

      {/* Center dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          ...base,
          width:      5,
          height:     5,
          opacity:    0,
          background: '#c8d8ff',
          transition: [
            'width 0.15s cubic-bezier(0.22,1,0.36,1)',
            'height 0.15s cubic-bezier(0.22,1,0.36,1)',
            'opacity 0.25s ease',
            'background 0.15s ease',
          ].join(', '),
        }}
      />
    </>
  );
}
