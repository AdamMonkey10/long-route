// Geometric, atmospheric SVG vignettes — 1970s-paperback meets official
// schematic. Each illustration is a small JSX component returning an
// inline <svg>. The exported `LocationIllustration` resolves an id like
// "portsmith.concourse" to a specific scene, falling back to a palette-driven
// generic stationscape.

const VB = '0 0 480 200'
const baseStyle = {
  display: 'block',
  width: '100%',
  height: 'auto',
  borderRadius: 6,
  border: '1px solid #1a2a3a',
  background: '#020608',
}

// ─────────────────────────────────────────────────────────────
// Detailed scenes
// ─────────────────────────────────────────────────────────────

function PortsmithConcourse() {
  return (
    <svg viewBox={VB} style={baseStyle} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="floor-grey" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#1a2028" />
          <stop offset="100%" stopColor="#3a4654" />
        </linearGradient>
      </defs>
      <rect width="480" height="200" fill="#0a0e14" />
      {/* Window with stars (nobody is looking) */}
      <rect x="14" y="16" width="76" height="42" fill="#020408" stroke="#1a2030" />
      {[14, 26, 42, 58, 70, 82].map((x, i) => (
        <circle key={i} cx={x + 4} cy={20 + ((i * 7) % 30)} r={i % 2 ? 1.2 : 0.7} fill="#a0c0d0" opacity={0.5} />
      ))}
      {/* Receding floor */}
      <polygon points="0,140 480,140 320,200 160,200" fill="url(#floor-grey)" />
      <polygon points="0,140 0,200 160,200" fill="#0a1018" />
      <polygon points="480,140 480,200 320,200" fill="#0a1018" />
      {/* Strip lights overhead receding to vanishing point */}
      {[0, 1, 2, 3, 4].map(i => {
        const t = (i + 1) / 6
        const x1 = 80 + (240 - 80) * t
        const x2 = 400 - (400 - 240) * t
        const y = 30 + 60 * t
        return <rect key={i} x={x1} y={y} width={x2 - x1} height={2} fill="#e8ecf0" opacity={0.6} />
      })}
      {/* Vanishing-point glow */}
      <circle cx="240" cy="138" r="18" fill="#4a6a90" opacity="0.25" />
      <circle cx="240" cy="138" r="6" fill="#8a9ba8" opacity="0.7" />
      {/* Walking silhouettes (mid-distance) */}
      {[
        { x: 180, h: 22, w: 6 },
        { x: 200, h: 20, w: 5 },
        { x: 280, h: 22, w: 6 },
        { x: 300, h: 21, w: 5 },
      ].map((f, i) => (
        <g key={i}>
          <ellipse cx={f.x + f.w / 2} cy={130 - f.h - 2} rx={f.w * 0.5} ry={f.w * 0.45} fill="#4a5a68" />
          <rect x={f.x} y={130 - f.h} width={f.w} height={f.h} fill="#4a5a68" />
        </g>
      ))}
      {/* Stationary figure foreground */}
      <ellipse cx="118" cy="130" rx="6" ry="5" fill="#8a9ba8" />
      <rect x="112" y="130" width="12" height="38" fill="#8a9ba8" />
      <rect x="108" y="168" width="20" height="3" fill="#0a0e14" />
      {/* Distant figure stationary at vanishing */}
      <rect x="237" y="128" width="6" height="14" fill="#3a4858" />
    </svg>
  )
}

function SumpMainBay() {
  return (
    <svg viewBox={VB} style={baseStyle} preserveAspectRatio="xMidYMid slice">
      <rect width="480" height="200" fill="#0a0808" />
      {/* Cavern silhouette */}
      <path d="M 0 0 L 0 60 Q 60 90 90 70 Q 140 40 180 80 Q 220 110 260 70 Q 310 30 360 80 Q 420 110 480 70 L 480 0 Z" fill="#1a0a08" />
      <path d="M 0 200 L 0 140 Q 70 180 130 150 Q 200 110 260 150 Q 320 180 380 145 Q 430 115 480 150 L 480 200 Z" fill="#1a0a08" />
      {/* Industrial light pools */}
      <ellipse cx="120" cy="120" rx="60" ry="22" fill="#c86030" opacity="0.18" />
      <ellipse cx="340" cy="115" rx="80" ry="28" fill="#c86030" opacity="0.18" />
      {/* Hanging stalactites of equipment */}
      {[80, 160, 240, 320, 400].map((x, i) => (
        <g key={i}>
          <line x1={x} y1="0" x2={x + (i % 2 ? 4 : -4)} y2={26 + (i % 3) * 8} stroke="#3a2010" strokeWidth="2" />
          <rect x={x - 5 + (i % 2 ? 4 : -4)} y={26 + (i % 3) * 8} width="10" height="6" fill="#5a3018" />
        </g>
      ))}
      {/* Structural support trying its best */}
      <line x1="60" y1="40" x2="60" y2="160" stroke="#5a3018" strokeWidth="3" />
      <line x1="55" y1="155" x2="65" y2="160" stroke="#3a2010" strokeWidth="1" />
      <line x1="420" y1="40" x2="420" y2="160" stroke="#5a3018" strokeWidth="3" />
      {/* Warning sign (unreadable) */}
      <rect x="220" y="100" width="40" height="20" fill="#c86030" />
      <rect x="225" y="105" width="30" height="3" fill="#3a2010" />
      <rect x="225" y="111" width="20" height="2" fill="#3a2010" />
      {/* Small worker silhouette for scale */}
      <rect x="180" y="146" width="3" height="10" fill="#0a0808" />
      <rect x="178" y="156" width="7" height="2" fill="#0a0808" />
    </svg>
  )
}

function Section7() {
  return (
    <svg viewBox={VB} style={{ ...baseStyle, background: '#040202' }} preserveAspectRatio="xMidYMid slice">
      {/* Floor perspective */}
      <polygon points="0,140 480,140 320,200 160,200" fill="#0a0606" />
      <polygon points="0,140 0,200 160,200" fill="#050202" />
      <polygon points="480,140 480,200 320,200" fill="#050202" />
      {/* Walls receding */}
      <polygon points="0,0 0,140 160,140 160,80" fill="#080404" />
      <polygon points="480,0 480,140 320,140 320,80" fill="#080404" />
      <rect x="160" y="80" width="160" height="60" fill="#0a0606" />
      <rect x="160" y="0" width="160" height="80" fill="#080404" />
      {/* Door at the end */}
      <rect x="200" y="80" width="80" height="80" fill="#050202" stroke="#1a0a0a" />
      <rect x="220" y="148" width="40" height="4" fill="#2a1010" />
      {/* Sign on door */}
      <rect x="208" y="90" width="64" height="14" fill="#0a0404" stroke="#3a1818" />
      <text x="240" y="100" fontSize="6" fill="#5a2020" textAnchor="middle" fontFamily="monospace" letterSpacing="2">SECTION 7</text>
      {/* Single warning light */}
      <circle cx="240" cy="60" r="6" fill="#c03020" />
      <circle cx="240" cy="60" r="14" fill="#c03020" opacity="0.22" />
      <circle cx="240" cy="60" r="26" fill="#c03020" opacity="0.06" />
      {/* Status light — wrong colour */}
      <rect x="232" y="138" width="16" height="2.5" fill="#207040" />
      {/* Faint floor reflection of warning */}
      <ellipse cx="240" cy="178" rx="80" ry="6" fill="#c03020" opacity="0.06" />
    </svg>
  )
}

function MeridianBar() {
  return (
    <svg viewBox={VB} style={baseStyle} preserveAspectRatio="xMidYMid slice">
      <rect width="480" height="200" fill="#1a0d05" />
      {/* Low ceiling */}
      <rect x="0" y="0" width="480" height="40" fill="#100804" />
      <rect x="0" y="38" width="480" height="2" fill="#3a2010" />
      {/* Bar back wall */}
      <rect x="0" y="40" width="480" height="100" fill="#2a1808" />
      {/* Bottle row with light catch */}
      {[
        { x: 30, h: 36, c: '#a04030' },
        { x: 60, h: 42, c: '#4a8040' },
        { x: 90, h: 32, c: '#4060a0' },
        { x: 120, h: 40, c: '#c08040' },
        { x: 150, h: 36, c: '#a04030' },
        { x: 180, h: 30, c: '#c0a040' },
        { x: 210, h: 38, c: '#4060a0' },
        { x: 240, h: 42, c: '#a04030' },
        { x: 270, h: 36, c: '#4a8040' },
        { x: 300, h: 40, c: '#c08040' },
        { x: 330, h: 34, c: '#4060a0' },
        { x: 360, h: 38, c: '#c0a040' },
        { x: 390, h: 32, c: '#a04030' },
        { x: 420, h: 36, c: '#4a8040' },
        { x: 450, h: 40, c: '#c08040' },
      ].map((b, i) => (
        <g key={i}>
          <rect x={b.x} y={92 - b.h} width="14" height={b.h} fill={b.c} opacity="0.85" />
          <rect x={b.x + 2} y={92 - b.h + 2} width="3" height={b.h - 4} fill="#fff" opacity="0.18" />
          <rect x={b.x + 4} y={92 - b.h - 4} width="6" height="4" fill={b.c} />
        </g>
      ))}
      {/* Bar counter */}
      <rect x="0" y="140" width="480" height="14" fill="#5a3818" />
      <rect x="0" y="154" width="480" height="2" fill="#2a1808" />
      <rect x="0" y="156" width="480" height="44" fill="#1a0d05" />
      {/* Stools */}
      {[80, 200, 320, 420].map((x, i) => (
        <g key={i}>
          <ellipse cx={x} cy="170" rx="10" ry="3" fill="#3a2010" />
          <rect x={x - 1} y="170" width="2" height="20" fill="#3a2010" />
        </g>
      ))}
      {/* Multilingual sign */}
      <rect x="180" y="48" width="120" height="28" fill="#0a0a0a" stroke="#c08040" strokeOpacity="0.5" />
      <text x="240" y="60" fontSize="7" fill="#c08040" textAnchor="middle" fontFamily="monospace" letterSpacing="1">SIT DOWN</text>
      <text x="240" y="70" fontSize="6" fill="#7a5028" textAnchor="middle" fontFamily="monospace" letterSpacing="2">— OTTO —</text>
    </svg>
  )
}

function WreckTradingFloor() {
  return (
    <svg viewBox={VB} style={baseStyle} preserveAspectRatio="xMidYMid slice">
      <rect width="480" height="200" fill="#1a0a05" />
      {/* High ceiling structural columns */}
      {[60, 180, 300, 420].map((x, i) => (
        <g key={i}>
          <rect x={x - 4} y="0" width="8" height="170" fill="#3a2010" />
          <rect x={x - 12} y="0" width="24" height="6" fill="#5a3018" />
        </g>
      ))}
      {/* Ceiling conduits */}
      <line x1="0" y1="14" x2="480" y2="14" stroke="#5a3018" strokeWidth="2" />
      <line x1="0" y1="22" x2="480" y2="22" stroke="#3a2010" strokeWidth="1" />
      {/* Hatch in ceiling */}
      <rect x="200" y="0" width="60" height="14" fill="#0a0404" />
      <line x1="230" y1="0" x2="230" y2="14" stroke="#5a3018" strokeWidth="1" />
      {/* Stalls — crates of varying heights */}
      {[
        { x: 30, w: 70, h: 50, c: '#7a6a5a' },
        { x: 110, w: 60, h: 60, c: '#5a5040' },
        { x: 180, w: 50, h: 45, c: '#803020' },
        { x: 250, w: 70, h: 55, c: '#c07030' },
        { x: 330, w: 60, h: 50, c: '#7a6a5a' },
        { x: 400, w: 60, h: 45, c: '#5a5040' },
      ].map((s, i) => (
        <g key={i}>
          <rect x={s.x} y={170 - s.h} width={s.w} height={s.h} fill={s.c} stroke="#1a0a05" />
          <rect x={s.x + 4} y={172 - s.h} width={s.w - 8} height={3} fill="#1a0a05" opacity="0.5" />
        </g>
      ))}
      {/* Floor */}
      <rect x="0" y="170" width="480" height="30" fill="#2a1808" />
      <line x1="0" y1="172" x2="480" y2="172" stroke="#5a3018" strokeWidth="1" />
      {/* Steam from cooking somewhere */}
      <ellipse cx="290" cy="120" rx="14" ry="3" fill="#c0b090" opacity="0.18" />
      <ellipse cx="295" cy="110" rx="10" ry="3" fill="#c0b090" opacity="0.12" />
      {/* People silhouettes */}
      {[80, 150, 220, 300, 360].map((x, i) => (
        <g key={i}>
          <ellipse cx={x} cy="158" rx="3" ry="2.5" fill="#0a0404" />
          <rect x={x - 2} y="158" width="4" height="14" fill="#0a0404" />
        </g>
      ))}
    </svg>
  )
}

function MarenQuarters() {
  return (
    <svg viewBox={VB} style={baseStyle} preserveAspectRatio="xMidYMid slice">
      <rect width="480" height="200" fill="#1a1208" />
      {/* Walls */}
      <rect x="0" y="0" width="480" height="50" fill="#100804" />
      {/* Bookshelves left */}
      {[60, 100, 140].map((y, i) => (
        <g key={i}>
          <rect x="10" y={y - 30} width="100" height="3" fill="#6a4a20" />
          {[10, 24, 38, 52, 66, 80, 94].map((x, j) => (
            <rect key={j} x={x + 2} y={y - 28} width={10} height={26}
              fill={['#c0b070', '#a08040', '#6a4a20', '#8a6a30', '#c0b070'][j % 5]} stroke="#1a1208" />
          ))}
        </g>
      ))}
      {/* Bookshelves right */}
      {[60, 100, 140].map((y, i) => (
        <g key={i + 10}>
          <rect x="370" y={y - 30} width="100" height="3" fill="#6a4a20" />
          {[370, 384, 398, 412, 426, 440, 454].map((x, j) => (
            <rect key={j} x={x + 2} y={y - 28} width={10} height={26}
              fill={['#a08040', '#6a4a20', '#c0b070', '#8a6a30', '#a08040'][j % 5]} stroke="#1a1208" />
          ))}
        </g>
      ))}
      {/* Manuscript stack */}
      <rect x="180" y="120" width="120" height="48" fill="#c0b070" />
      <rect x="178" y="118" width="124" height="6" fill="#a08040" />
      {[126, 134, 142, 150, 158, 166].map((y, i) => (
        <line key={i} x1="186" y1={y} x2="294" y2={y} stroke="#6a4a20" strokeWidth="0.6" opacity="0.5" />
      ))}
      {/* Lamp */}
      <line x1="320" y1="40" x2="320" y2="80" stroke="#3a2818" strokeWidth="1.5" />
      <ellipse cx="320" cy="80" rx="14" ry="6" fill="#c0b070" />
      <ellipse cx="320" cy="106" rx="40" ry="20" fill="#c0b070" opacity="0.15" />
      {/* Photograph on wall */}
      <rect x="60" y="14" width="20" height="14" fill="#3a2818" stroke="#6a4a20" />
      <rect x="62" y="16" width="16" height="10" fill="#7a6a5a" />
      {/* Floor */}
      <rect x="0" y="168" width="480" height="32" fill="#100804" />
    </svg>
  )
}

function BellhavenSquare() {
  return (
    <svg viewBox={VB} style={{ ...baseStyle, background: '#4a90d0' }} preserveAspectRatio="xMidYMid slice">
      {/* Sky gradient */}
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6aa8e0" />
          <stop offset="100%" stopColor="#a0c8e8" />
        </linearGradient>
      </defs>
      <rect width="480" height="120" fill="url(#sky)" />
      {/* Clouds */}
      <ellipse cx="100" cy="40" rx="40" ry="10" fill="#fff" opacity="0.7" />
      <ellipse cx="125" cy="36" rx="30" ry="8" fill="#fff" opacity="0.85" />
      <ellipse cx="320" cy="55" rx="50" ry="11" fill="#fff" opacity="0.6" />
      <ellipse cx="380" cy="50" rx="32" ry="9" fill="#fff" opacity="0.8" />
      {/* Distant fields */}
      <rect x="0" y="120" width="480" height="20" fill="#5a8a40" />
      <rect x="0" y="140" width="480" height="14" fill="#7aa050" />
      {/* Field rows */}
      {[126, 132, 145, 152].map((y, i) => (
        <line key={i} x1="0" y1={y} x2="480" y2={y} stroke="#3a6020" strokeWidth="0.6" opacity="0.6" />
      ))}
      {/* Foreground earth */}
      <rect x="0" y="154" width="480" height="46" fill="#8a6a40" />
      <rect x="0" y="154" width="480" height="3" fill="#6a4a20" />
      {/* Buildings */}
      <rect x="80" y="92" width="40" height="62" fill="#c0a070" stroke="#5a3a18" />
      <polygon points="78,92 100,76 122,92" fill="#7a4a28" />
      <rect x="92" y="120" width="8" height="20" fill="#3a2010" />
      <rect x="106" y="108" width="8" height="8" fill="#4a90d0" />
      {/* Water tower with banner */}
      <g>
        <rect x="240" y="80" width="6" height="74" fill="#5a4030" />
        <rect x="262" y="80" width="6" height="74" fill="#5a4030" />
        <rect x="226" y="60" width="56" height="22" fill="#7a6a5a" stroke="#3a2818" />
        <rect x="232" y="56" width="44" height="6" fill="#5a4030" />
        {/* Banner */}
        <rect x="200" y="86" width="108" height="14" fill="#c83030" />
        <text x="254" y="96" fontSize="6" fill="#fff" textAnchor="middle" fontFamily="monospace" letterSpacing="1">— STILL HERE —</text>
      </g>
      {/* Right building */}
      <rect x="360" y="100" width="50" height="54" fill="#a08050" stroke="#5a3a18" />
      <polygon points="358,100 385,82 412,100" fill="#7a4a28" />
      <rect x="378" y="124" width="10" height="22" fill="#3a2010" />
    </svg>
  )
}

// ─────────────────────────────────────────────────────────────
// Generic palette-driven fallback
// ─────────────────────────────────────────────────────────────

function GenericStation({ palette = ['#1a2a3a', '#3a5a8a', '#a0c0d0'], label }) {
  const [bg, accent, light] = palette
  return (
    <svg viewBox={VB} style={{ ...baseStyle, background: bg }} preserveAspectRatio="xMidYMid slice">
      {/* Stars */}
      {Array.from({ length: 36 }).map((_, i) => {
        const x = (i * 53 + 17) % 480
        const y = (i * 89 + 31) % 200
        const r = i % 6 === 0 ? 1.4 : 0.7
        return <circle key={i} cx={x} cy={y} r={r} fill={light} opacity={0.3 + (i % 4) * 0.15} />
      })}
      {/* Distant station silhouette */}
      <rect x="120" y="130" width="240" height="20" fill={accent} opacity="0.55" />
      <rect x="80" y="120" width="40" height="30" fill={accent} opacity="0.45" />
      <rect x="360" y="120" width="40" height="30" fill={accent} opacity="0.45" />
      <rect x="180" y="110" width="120" height="22" fill={accent} opacity="0.7" />
      <circle cx="240" cy="100" r="22" fill={accent} opacity="0.7" />
      <rect x="220" y="80" width="40" height="22" fill={accent} opacity="0.6" />
      {/* Window dots */}
      {[140, 200, 260, 320].map((x, i) => (
        <rect key={i} x={x} y="138" width="3" height="4" fill={light} opacity="0.8" />
      ))}
      {/* Foreground horizon glow */}
      <rect x="0" y="150" width="480" height="50" fill="#000" opacity="0.4" />
      {label && (
        <text x="14" y="190" fontSize="9" letterSpacing="3" fill={light} opacity="0.5" fontFamily="monospace">
          {label}
        </text>
      )}
    </svg>
  )
}

// ─────────────────────────────────────────────────────────────
// Resolver
// ─────────────────────────────────────────────────────────────

const SCENES = {
  'portsmith.concourse': PortsmithConcourse,
  'sump.concourse': SumpMainBay,
  'sump.section_7': Section7,
  'iron_drift.section_7_access': Section7,
  'meridian.the_bar': MeridianBar,
  'the_wreck.trading_floor': WreckTradingFloor,
  'the_wreck.maren_quarters': MarenQuarters,
  'bellhaven.concourse': BellhavenSquare,
}

const PALETTES = {
  portsmith: ['#0a0e14', '#4a6a90', '#a0c0d0'],
  haverlock: ['#1a1a08', '#7aa050', '#c0e0a0'],
  bellhaven: ['#1a1408', '#5a8a40', '#a0c0d0'],
  sump: ['#0a0808', '#c86030', '#c0a080'],
  iron_drift: ['#0a0e14', '#c87030', '#a0c0d0'],
  meridian: ['#1a0d05', '#c08040', '#c0a080'],
  new_cascadia: ['#0a1018', '#60a0d0', '#c0e0f0'],
  consortium: ['#0a0a18', '#60a0d0', '#c0c0d0'],
  new_geneva: ['#0a1020', '#2a4a8a', '#e8ecf0'],
  ashmore: ['#001018', '#40d0ff', '#a0c0d0'],
  vantage: ['#101020', '#4060a0', '#c0c0d0'],
  kessel: ['#04081a', '#304060', '#7a6a50'],
  farside: ['#0a0808', '#6a3010', '#c08030'],
  the_wreck: ['#1a0d05', '#c07030', '#c0a080'],
  cold_harbor: ['#0a0a0a', '#c03020', '#e0e0e0'],
  exodus: ['#020408', '#c09050', '#a0b0c0'],
}

export function LocationIllustration({ systemId, locationId }) {
  const key = locationId ? `${systemId}.${locationId}` : `${systemId}.concourse`
  const Specific = SCENES[key] || SCENES[`${systemId}.concourse`]
  if (Specific) return <Specific />
  const palette = PALETTES[systemId] || ['#0a0e14', '#3a5a8a', '#a0c0d0']
  return <GenericStation palette={palette} label={(locationId || systemId).replace(/_/g, ' ').toUpperCase()} />
}
