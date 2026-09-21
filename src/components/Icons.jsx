/*
 * A tiny hand-drawn icon set — replaces react-icons.
 * Single 1.6px stroke, rounded caps, drawn on a 20px grid so they sit
 * on the text baseline next to Hanken Grotesk at 15–17px.
 */
function Svg({ size = 18, children, ...rest }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {children}
    </svg>
  );
}

/** Opens somewhere else (new tab, mail client, dialer). */
export const ArrowOut = (p) => <Svg {...p}><path d="M6 14 14 6M7.5 6H14v6.5" /></Svg>;

/** Moves you down the page. */
export const ArrowDown = (p) => <Svg {...p}><path d="M10 4v12M5 11l5 5 5-5" /></Svg>;

export const ArrowUp = (p) => <Svg {...p}><path d="M10 16V4M5 9l5-5 5 5" /></Svg>;

export const ArrowLeft = (p) => <Svg {...p}><path d="M16 10H4M9 5l-5 5 5 5" /></Svg>;

export const ArrowRight = (p) => <Svg {...p}><path d="M4 10h12M11 5l5 5-5 5" /></Svg>;

export const Download = (p) => <Svg {...p}><path d="M10 3v10M5.5 8.5 10 13l4.5-4.5M4 17h12" /></Svg>;

export const Close = (p) => <Svg {...p}><path d="m5 5 10 10M15 5 5 15" /></Svg>;

export const Menu = (p) => <Svg {...p}><path d="M3 7h14M3 13h14" /></Svg>;

export const Plus = (p) => <Svg {...p}><path d="M10 4v12M4 10h12" /></Svg>;

export const Minus = (p) => <Svg {...p}><path d="M4 10h12" /></Svg>;

export const Expand = (p) => <Svg {...p}><path d="M12 3h5v5M8 17H3v-5M17 3l-6 6M3 17l6-6" /></Svg>;
