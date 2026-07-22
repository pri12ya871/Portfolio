/* ─────────────────────────────────────────
   GIRL CODING — anime / lofi style SVG
   A girl with long purple hair and glowing
   headphones working on a laptop in a cozy
   neon-purple room. Designed for a circular
   frame. Subtle animations only (blink,
   hair sway, glow pulses, steam).
   Pure SVG + CSS — zero asset weight.
───────────────────────────────────────── */
export default function GirlCoding() {
  return (
    <svg
      viewBox="0 0 480 480"
      role="img"
      aria-label="Illustration of a girl coding on a laptop"
      style={{ width: '100%', height: '100%', display: 'block' }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <style>{`
        .gcl-bob     { animation: gcl-bob 4.5s ease-in-out infinite; }
        .gcl-blink   { animation: gcl-blink 4.6s ease-in-out infinite;
                       transform-box: fill-box; transform-origin: center 60%; }
        .gcl-sway-l  { animation: gcl-sway 5.5s ease-in-out infinite;
                       transform-box: fill-box; transform-origin: 50% 0%; }
        .gcl-sway-r  { animation: gcl-sway 5.5s ease-in-out 0.6s infinite reverse;
                       transform-box: fill-box; transform-origin: 50% 0%; }
        .gcl-led     { animation: gcl-glow 2.2s ease-in-out infinite; }
        .gcl-logo    { animation: gcl-glow 3s ease-in-out 0.5s infinite; }
        .gcl-spill   { animation: gcl-spill 3.5s ease-in-out infinite; }
        .gcl-cone    { animation: gcl-cone 5s ease-in-out infinite; }
        .gcl-steam   { animation: gcl-steam 3s ease-out infinite; }
        .gcl-steam2  { animation: gcl-steam 3s ease-out 1.4s infinite; }
        .gcl-star    { animation: gcl-star 2.8s ease-in-out infinite; }
        @keyframes gcl-bob   { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }
        @keyframes gcl-blink { 0%, 90%  { transform: scaleY(1); }
                               93%      { transform: scaleY(0.06); }
                               96%,100% { transform: scaleY(1); } }
        @keyframes gcl-sway  { 0%,100% { transform: rotate(1.6deg); } 50% { transform: rotate(-1.6deg); } }
        @keyframes gcl-glow  { 0%,100% { opacity: 0.55; } 50% { opacity: 1; } }
        @keyframes gcl-spill { 0%,100% { opacity: 0.18; } 50% { opacity: 0.3; } }
        @keyframes gcl-cone  { 0%,100% { opacity: 0.16; } 50% { opacity: 0.26; } }
        @keyframes gcl-steam { 0% { transform: translateY(0); opacity: 0; }
                               20% { opacity: 0.5; }
                               100% { transform: translateY(-24px); opacity: 0; } }
        @keyframes gcl-star  { 0%,100% { opacity: 0.2; transform: scale(0.85); }
                               50% { opacity: 1; transform: scale(1.1); } }
        @media (prefers-reduced-motion: reduce) {
          .gcl-bob, .gcl-blink, .gcl-sway-l, .gcl-sway-r, .gcl-led, .gcl-logo,
          .gcl-spill, .gcl-cone, .gcl-steam, .gcl-steam2, .gcl-star { animation: none; }
        }
      `}</style>

      <defs>
        <radialGradient id="gclBg" cx="45%" cy="38%" r="75%">
          <stop offset="0%"  stopColor="#3B1D5E" />
          <stop offset="55%" stopColor="#221040" />
          <stop offset="100%" stopColor="#12081F" />
        </radialGradient>
        <linearGradient id="gclHairBack" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"  stopColor="#7C3AED" />
          <stop offset="100%" stopColor="#5B21B6" />
        </linearGradient>
        <linearGradient id="gclHairFront" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"  stopColor="#C084FC" />
          <stop offset="100%" stopColor="#9333EA" />
        </linearGradient>
        <linearGradient id="gclHoodie" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"  stopColor="#C026D3" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>
        <radialGradient id="gclIris" cx="50%" cy="35%" r="70%">
          <stop offset="0%"  stopColor="#F0ABFC" />
          <stop offset="100%" stopColor="#6D28D9" />
        </radialGradient>
        <linearGradient id="gclLaptop" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"  stopColor="#2E1656" />
          <stop offset="100%" stopColor="#1C0D38" />
        </linearGradient>
        <linearGradient id="gclSpill" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%"  stopColor="#F0ABFC" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#F0ABFC" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="gclCone" x1="0" y1="0" x2="0.6" y2="1">
          <stop offset="0%"  stopColor="#FBBF24" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#FBBF24" stopOpacity="0" />
        </linearGradient>
        <clipPath id="gclClip"><circle cx="240" cy="240" r="240" /></clipPath>
      </defs>

      <g clipPath="url(#gclClip)">

        {/* ── Room background ── */}
        <rect width="480" height="480" fill="url(#gclBg)" />
        <ellipse cx="220" cy="300" rx="210" ry="170" fill="#A855F7" opacity="0.14" />

        {/* moon */}
        <circle cx="404" cy="98" r="20" fill="#F0ABFC" opacity="0.85" />
        <circle cx="412" cy="92" r="18" fill="#2A1548" />

        {/* twinkling stars */}
        <g fill="#E9D5FF">
          <path className="gcl-star" style={{ animationDelay: '0s' }}   d="M92 80 l2.5 6 6 2.5 -6 2.5 -2.5 6 -2.5 -6 -6 -2.5 6 -2.5 z" />
          <path className="gcl-star" style={{ animationDelay: '1.1s' }} d="M166 54 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2 z" />
          <path className="gcl-star" style={{ animationDelay: '1.8s' }} d="M436 190 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2 z" />
          <circle className="gcl-star" style={{ animationDelay: '0.6s' }} cx="58"  cy="196" r="2.6" />
          <circle className="gcl-star" style={{ animationDelay: '2.2s' }} cx="352" cy="64"  r="2.2" />
          <circle className="gcl-star" style={{ animationDelay: '1.4s' }} cx="428" cy="268" r="2.4" />
        </g>

        {/* ── Shelf with books & plant ── */}
        <g>
          <rect x="36" y="118" width="172" height="10" rx="3" fill="#2A1548" />
          <rect x="36" y="118" width="172" height="3"  rx="1.5" fill="#4C2A85" />
          <rect x="48"  y="78" width="13" height="40" rx="2" fill="#7C3AED" />
          <rect x="64"  y="84" width="11" height="34" rx="2" fill="#EC4899" />
          <rect x="78"  y="80" width="13" height="38" rx="2" fill="#C084FC" />
          <rect x="95"  y="82" width="12" height="36" rx="2" fill="#F472B6" transform="rotate(9 101 100)" />
          <rect x="114" y="78" width="14" height="40" rx="2" fill="#5B21B6" />
          <ellipse cx="152" cy="94" rx="7" ry="12" fill="#34D399" transform="rotate(-14 152 94)" />
          <ellipse cx="162" cy="92" rx="6" ry="13" fill="#10B981" />
          <ellipse cx="171" cy="95" rx="6" ry="11" fill="#34D399" transform="rotate(13 171 95)" />
          <path d="M150 104 h24 l-3 14 h-18 z" fill="#EC4899" opacity="0.85" />
        </g>

        {/* ── Desk lamp ── */}
        <g>
          <ellipse cx="76" cy="362" rx="26" ry="6" fill="#2A1548" />
          <path d="M76 360 L86 272 L128 240" stroke="#3F2A63" strokeWidth="6" fill="none" strokeLinecap="round" />
          <circle cx="86" cy="272" r="5" fill="#4C2A85" />
          <polygon points="108,224 176,242 148,286 92,258" fill="#6D28D9" />
          <circle cx="146" cy="272" r="9" fill="#FCD34D" opacity="0.95" />
          <circle cx="146" cy="272" r="16" fill="#FCD34D" opacity="0.3" />
          {/* light cone */}
          <polygon className="gcl-cone" points="118,272 172,256 300,356 130,360" fill="url(#gclCone)" />
        </g>

        {/* ══ GIRL ══ */}
        <g className="gcl-bob">

          {/* back hair — two long falls */}
          <path d="M300 110
                   C238 112 208 156 210 232
                   C211 292 202 338 191 366
                   Q188 375 198 375 L240 375
                   Q250 308 250 244 L350 244
                   Q350 308 360 375 L402 375
                   Q412 375 409 366
                   C398 338 389 292 390 232
                   C392 156 362 112 300 110 Z"
            fill="url(#gclHairBack)" />

          {/* neck */}
          <rect x="288" y="228" width="24" height="24" rx="8" fill="#F3BEA2" />

          {/* hoodie torso */}
          <path d="M232 378 L232 340 Q236 290 252 268 Q270 250 300 248 Q330 250 348 268 Q364 290 368 340 L368 378 Z"
            fill="url(#gclHoodie)" />
          {/* hood collar */}
          <path d="M262 264 Q300 288 338 264 Q330 246 300 244 Q270 246 262 264 Z" fill="#701A75" />
          {/* drawstrings */}
          <path d="M289 274 q-2 14 0 24 M311 274 q2 14 0 24" stroke="#F0ABFC" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          {/* arms resting toward the laptop */}
          <path d="M256 274 Q236 304 240 346" stroke="#9333EA" strokeWidth="18" fill="none" strokeLinecap="round" />
          <path d="M344 274 Q364 304 354 348" stroke="#9333EA" strokeWidth="18" fill="none" strokeLinecap="round" />
          <circle cx="242" cy="352" r="8" fill="#F3BEA2" />
          <circle cx="352" cy="354" r="8" fill="#F3BEA2" />

          {/* face */}
          <ellipse cx="300" cy="192" rx="48" ry="46" fill="#FFE3D0" />

          {/* eyes (blink group) */}
          <g className="gcl-blink">
            {/* left */}
            <ellipse cx="279" cy="199" rx="10" ry="11.5" fill="#FFFFFF" />
            <ellipse cx="277" cy="201" rx="7.5" ry="10" fill="url(#gclIris)" />
            <ellipse cx="276" cy="203" rx="3.5" ry="5" fill="#2E1065" />
            <circle cx="274" cy="196" r="2.5" fill="#FFFFFF" />
            <circle cx="281" cy="207" r="1.4" fill="#FFFFFF" opacity="0.85" />
            <path d="M266 192 Q279 182 292 190" stroke="#3B0764" strokeWidth="4" fill="none" strokeLinecap="round" />
            {/* right */}
            <ellipse cx="321" cy="199" rx="10" ry="11.5" fill="#FFFFFF" />
            <ellipse cx="319" cy="201" rx="7.5" ry="10" fill="url(#gclIris)" />
            <ellipse cx="318" cy="203" rx="3.5" ry="5" fill="#2E1065" />
            <circle cx="316" cy="196" r="2.5" fill="#FFFFFF" />
            <circle cx="323" cy="207" r="1.4" fill="#FFFFFF" opacity="0.85" />
            <path d="M308 190 Q321 182 334 192" stroke="#3B0764" strokeWidth="4" fill="none" strokeLinecap="round" />
          </g>

          {/* brows, nose, mouth, blush */}
          <path d="M267 177 Q279 171 290 175" stroke="#7E22CE" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M310 175 Q321 171 333 177" stroke="#7E22CE" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M299 213 q2 3 0 5" stroke="#E8B39B" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M294 226 Q300 231 307 227" stroke="#C2596F" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <ellipse cx="261" cy="215" rx="10" ry="5.5" fill="#F9A8D4" opacity="0.45" />
          <ellipse cx="339" cy="215" rx="10" ry="5.5" fill="#F9A8D4" opacity="0.45" />

          {/* bangs */}
          <path d="M256 168 Q262 132 300 128 Q338 132 344 168
                   Q346 182 338 190 Q334 170 326 164
                   Q322 184 312 190 Q306 170 300 170
                   Q294 170 288 190 Q278 184 274 164
                   Q266 170 262 190 Q254 182 256 168 Z"
            fill="url(#gclHairFront)" />
          <path d="M270 146 Q300 134 330 146" stroke="#E9D5FF" strokeWidth="3" fill="none" opacity="0.4" strokeLinecap="round" />

          {/* face-framing strands (gentle sway) */}
          <path className="gcl-sway-l" d="M254 168 Q241 220 249 274 Q252 286 260 282 Q254 224 263 184 Z" fill="url(#gclHairFront)" />
          <path className="gcl-sway-r" d="M346 168 Q359 220 351 274 Q348 286 340 282 Q346 224 337 184 Z" fill="url(#gclHairFront)" />

          {/* headphones */}
          <path d="M244 152 Q300 94 356 152" stroke="#A21CAF" strokeWidth="12" fill="none" strokeLinecap="round" />
          <path d="M248 148 Q300 100 352 148" stroke="#F0ABFC" strokeWidth="3.5" fill="none" strokeLinecap="round" opacity="0.7" />
          <rect x="226" y="172" width="27" height="53" rx="13" fill="#A21CAF" stroke="#E879F9" strokeWidth="1.5" />
          <rect x="347" y="172" width="27" height="53" rx="13" fill="#A21CAF" stroke="#E879F9" strokeWidth="1.5" />
          <circle className="gcl-led" cx="239.5" cy="198" r="10" fill="#F0ABFC" opacity="0.3" />
          <circle className="gcl-led" cx="239.5" cy="198" r="5.5" fill="#F0ABFC" />
          <circle className="gcl-led" cx="360.5" cy="198" r="10" fill="#F0ABFC" opacity="0.3" />
          <circle className="gcl-led" cx="360.5" cy="198" r="5.5" fill="#F0ABFC" />
        </g>

        {/* ── Desk ── */}
        <rect x="0" y="356" width="480" height="124" fill="#22103E" />
        <rect x="0" y="356" width="480" height="8" fill="#4C2A85" />
        <rect x="0" y="356" width="480" height="2" fill="#A855F7" opacity="0.5" />

        {/* ── Laptop (back facing viewer) ── */}
        <g>
          {/* screen light spilling up onto her face */}
          <polygon className="gcl-spill" points="150,248 292,248 322,176 130,176" fill="url(#gclSpill)" />
          <path d="M152 246 L290 246 L300 358 L142 358 Z" fill="url(#gclLaptop)" stroke="#A855F7" strokeOpacity="0.45" strokeWidth="1.5" />
          <rect x="152" y="246" width="138" height="3" fill="#EC4899" opacity="0.7" />
          {/* glowing logo */}
          <circle className="gcl-logo" cx="221" cy="302" r="24" fill="#C084FC" opacity="0.25" />
          <text className="gcl-logo" x="221" y="309" textAnchor="middle" fontFamily="monospace" fontSize="21" fontWeight="bold" fill="#F0ABFC">{'</>'}</text>
        </g>

        {/* ── Mug with steam ── */}
        <g>
          <path className="gcl-steam"  d="M400 318 q4 -6 0 -11 q-4 -5 0 -11" stroke="#D8B4FE" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path className="gcl-steam2" d="M409 318 q-4 -6 0 -11 q4 -5 0 -11" stroke="#D8B4FE" strokeWidth="2" fill="none" strokeLinecap="round" />
          <rect x="392" y="326" width="27" height="30" rx="5" fill="#4C2A85" />
          <rect x="392" y="331" width="27" height="5" fill="#EC4899" opacity="0.85" />
          <path d="M419 333 q11 0 11 9 t-11 9" stroke="#4C2A85" strokeWidth="4" fill="none" />
        </g>

        {/* soft vignette */}
        <circle cx="240" cy="240" r="240" fill="none" stroke="#0B0416" strokeWidth="34" opacity="0.35" />
      </g>
    </svg>
  );
}
