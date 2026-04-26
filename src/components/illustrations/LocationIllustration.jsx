// Geometric, atmospheric SVG vignettes — 1970s-paperback meets official
// schematic. Each illustration is a small JSX component returning an
// inline <svg>. The exported `LocationIllustration` resolves an id like
// "portsmith.concourse" to a specific scene, falling back to a palette-driven
// generic stationscape.

const VB = '0 0 480 200'
const VB_PLATE = '0 0 1600 500'
const baseStyle = {
  display: 'block',
  width: '100%',
  height: 'auto',
  borderRadius: 6,
  border: '1px solid #1a2a3a',
  background: '#020608',
}

// ─────────────────────────────────────────────────────────────
// Style Guide §07 — Station Plates
//   16:5 viewBox 1600 × 500
//   preserveAspectRatio="xMidYMid slice"
//   survey frame: corner ticks + plate code + scale text
// ─────────────────────────────────────────────────────────────

function PortsmithConcourse() {
  return (
    <svg viewBox={VB_PLATE} style={baseStyle} preserveAspectRatio="xMidYMid slice"
         xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ps-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0a1018" />
          <stop offset="1" stopColor="#02060a" />
        </linearGradient>
        <linearGradient id="ps-floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#161c24" />
          <stop offset="1" stopColor="#080c12" />
        </linearGradient>
        <linearGradient id="ps-ceil" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0a0f16" />
          <stop offset="1" stopColor="#1a2230" />
        </linearGradient>
        <linearGradient id="ps-panel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1a2230" />
          <stop offset="1" stopColor="#0a1018" />
        </linearGradient>
      </defs>

      <rect width="1600" height="500" fill="url(#ps-bg)" />

      <g opacity="0.6">
        <circle cx="120" cy="60" r="0.8" fill="#a0c0d0" />
        <circle cx="220" cy="40" r="1.2" fill="#a0c0d0" />
        <circle cx="340" cy="80" r="0.7" fill="#a0c0d0" />
        <circle cx="1280" cy="55" r="1" fill="#a0c0d0" />
        <circle cx="1400" cy="35" r="0.7" fill="#a0c0d0" />
        <circle cx="1500" cy="75" r="1.1" fill="#a0c0d0" />
      </g>

      {/* Vanishing point */}
      <rect x="740" y="220" width="120" height="60" fill="#020608" stroke="#1a2a3a" strokeWidth="1" />
      <g fill="#3a4a5a">
        <rect x="794" y="248" width="4" height="14" />
        <circle cx="796" cy="246" r="2" />
        <rect x="803" y="252" width="3" height="10" />
        <circle cx="804.5" cy="250" r="1.5" />
      </g>

      {/* Ceiling plates */}
      <polygon points="0,0 1600,0 1600,140 860,220 740,220 0,140" fill="url(#ps-ceil)" />
      <g stroke="#2a3a4a" strokeWidth="0.8" fill="none" opacity="0.7">
        <line x1="0" y1="40" x2="1600" y2="40" />
        <line x1="0" y1="80" x2="1600" y2="80" />
        <line x1="0" y1="120" x2="1600" y2="120" />
        <line x1="0" y1="0" x2="740" y2="220" />
        <line x1="200" y1="0" x2="755" y2="220" />
        <line x1="500" y1="0" x2="775" y2="220" />
        <line x1="800" y1="0" x2="800" y2="220" />
        <line x1="1100" y1="0" x2="825" y2="220" />
        <line x1="1400" y1="0" x2="845" y2="220" />
        <line x1="1600" y1="0" x2="860" y2="220" />
      </g>
      <g fill="#d0a050" opacity="0.5">
        <rect x="380" y="98" width="60" height="3" />
        <rect x="700" y="108" width="40" height="3" />
        <rect x="860" y="108" width="40" height="3" />
        <rect x="1160" y="98" width="60" height="3" />
      </g>

      {/* Floor */}
      <polygon points="0,500 1600,500 1600,360 860,280 740,280 0,360" fill="url(#ps-floor)" />
      <g stroke="#1a2230" strokeWidth="0.7" fill="none">
        <line x1="0" y1="500" x2="740" y2="280" />
        <line x1="200" y1="500" x2="755" y2="280" />
        <line x1="500" y1="500" x2="775" y2="280" />
        <line x1="800" y1="500" x2="800" y2="280" />
        <line x1="1100" y1="500" x2="825" y2="280" />
        <line x1="1400" y1="500" x2="845" y2="280" />
        <line x1="1600" y1="500" x2="860" y2="280" />
        <line x1="0" y1="380" x2="1600" y2="380" />
        <line x1="0" y1="430" x2="1600" y2="430" />
        <line x1="0" y1="475" x2="1600" y2="475" />
      </g>

      {/* Left wall — bay doors */}
      <g>
        <polygon points="0,140 0,360 80,360 80,170" fill="url(#ps-panel)" stroke="#2a3a4a" strokeWidth="1" />
        <rect x="14" y="190" width="50" height="150" fill="#020608" stroke="#1a3040" />
        <text x="40" y="180" textAnchor="middle" fontFamily="'Space Mono', monospace" fontSize="9" fill="#4a6a80" letterSpacing="1.5">BAY 01</text>
        <circle cx="72" cy="178" r="2" fill="#d0a050" />
        <polygon points="120,165 120,345 240,345 240,180" fill="url(#ps-panel)" stroke="#2a3a4a" strokeWidth="1" />
        <rect x="138" y="200" width="84" height="135" fill="#020608" stroke="#1a3040" />
        <text x="180" y="190" textAnchor="middle" fontFamily="'Space Mono', monospace" fontSize="8" fill="#4a6a80" letterSpacing="1.5">BAY 02</text>
        <circle cx="232" cy="188" r="1.8" fill="#4ade80" />
        <polygon points="280,180 280,330 400,330 400,195" fill="url(#ps-panel)" stroke="#2a3a4a" strokeWidth="1" />
        <rect x="298" y="210" width="84" height="115" fill="#020608" stroke="#1a3040" />
        <text x="340" y="205" textAnchor="middle" fontFamily="'Space Mono', monospace" fontSize="7" fill="#4a6a80" letterSpacing="1.5">BAY 03</text>
        <circle cx="392" cy="203" r="1.6" fill="#d05050" />
        <polygon points="440,195 440,318 540,318 540,208" fill="url(#ps-panel)" stroke="#2a3a4a" strokeWidth="1" />
        <rect x="455" y="220" width="70" height="92" fill="#020608" stroke="#1a3040" />
        <text x="490" y="216" textAnchor="middle" fontFamily="'Space Mono', monospace" fontSize="6" fill="#4a6a80" letterSpacing="1.5">BAY 04</text>
        <polygon points="580,210 580,308 660,308 660,220" fill="url(#ps-panel)" stroke="#2a3a4a" strokeWidth="1" />
        <rect x="592" y="230" width="56" height="73" fill="#020608" stroke="#1a3040" />
      </g>

      {/* Right wall — filing-cabinet windows */}
      <g>
        <polygon points="1600,140 1600,360 1520,360 1520,170" fill="url(#ps-panel)" stroke="#2a3a4a" strokeWidth="1" />
        <g>
          {[180, 220, 260, 300].map((y, i) => (
            <g key={i}>
              <rect x="1530" y={y} width="22" height="34" fill="#0a1820" stroke="#2a3a4a" />
              <rect x="1556" y={y} width="22" height="34" fill="#0a1820" stroke="#2a3a4a" />
            </g>
          ))}
          <rect x="1530" y="180" width="22" height="34" fill="#1a3040" opacity="0.9" />
          <rect x="1556" y="260" width="22" height="34" fill="#1a3040" opacity="0.9" />
          <rect x="1530" y="300" width="22" height="34" fill="#1a3040" opacity="0.9" />
        </g>
        <polygon points="1480,165 1480,345 1360,345 1360,180" fill="url(#ps-panel)" stroke="#2a3a4a" strokeWidth="1" />
        <g>
          {[195, 232, 269, 306].map((y, row) => (
            [1380, 1408, 1436].map((x, col) => (
              <rect key={`${row}-${col}`} x={x} y={y} width="22" height="32"
                fill={(row === 1 && col === 2) || (row === 2 && col === 1) ? '#1a3040' : '#0a1820'}
                stroke="#2a3a4a" />
            ))
          ))}
        </g>
        <polygon points="1320,180 1320,330 1200,330 1200,195" fill="url(#ps-panel)" stroke="#2a3a4a" strokeWidth="1" />
        <g>
          {[208, 243, 278].map((y, row) => (
            [1218, 1244, 1270, 1296].map((x, col) => (
              <rect key={`${row}-${col}`} x={x} y={y} width="22" height="30"
                fill={(row === 0 && col === 1) || (row === 2 && col === 2) ? '#1a3040' : '#0a1820'}
                stroke="#2a3a4a" />
            ))
          ))}
        </g>
        <polygon points="1160,195 1160,318 1060,318 1060,208" fill="url(#ps-panel)" stroke="#2a3a4a" strokeWidth="1" />
      </g>

      {/* Mid-corridor figures */}
      <g fill="#2a3a4a">
        <rect x="540" y="350" width="6" height="22" />
        <circle cx="543" cy="346" r="3.2" />
        <rect x="546" y="358" width="6" height="8" fill="#3a3020" />
        <rect x="1010" y="345" width="6" height="22" />
        <circle cx="1013" cy="341" r="3.2" />
        <rect x="1003" y="354" width="6" height="6" fill="#2a3030" />
      </g>

      {/* Suspended sign */}
      <g transform="translate(800, 150)">
        <rect x="-110" y="-12" width="220" height="22" fill="#0a1018" stroke="#2a3a4a" />
        <text x="0" y="3" textAnchor="middle" fontFamily="'Space Mono', monospace" fontSize="11" fill="#4aafe0" letterSpacing="3">PORTSMITH STATION</text>
        <text x="0" y="14" textAnchor="middle" fontFamily="'Space Mono', monospace" fontSize="6" fill="#4a6a80" letterSpacing="2">CONCOURSE A · LEVEL 04</text>
        <line x1="-90" y1="-12" x2="-90" y2="-30" stroke="#2a3a4a" strokeWidth="0.7" />
        <line x1="90" y1="-12" x2="90" y2="-30" stroke="#2a3a4a" strokeWidth="0.7" />
      </g>

      {/* Survey frame */}
      <g stroke="#2a3a4a" strokeWidth="0.6" opacity="0.7" fill="none">
        <line x1="20" y1="10" x2="40" y2="10" />
        <line x1="20" y1="10" x2="20" y2="30" />
        <line x1="1580" y1="10" x2="1560" y2="10" />
        <line x1="1580" y1="10" x2="1580" y2="30" />
        <line x1="20" y1="490" x2="40" y2="490" />
        <line x1="20" y1="490" x2="20" y2="470" />
        <line x1="1580" y1="490" x2="1560" y2="490" />
        <line x1="1580" y1="490" x2="1580" y2="470" />
      </g>
      <text x="30" y="488" fontFamily="'Space Mono', monospace" fontSize="8" fill="#304050" letterSpacing="2">PLATE 04·A — PORTSMITH CONCOURSE</text>
      <text x="1570" y="488" textAnchor="end" fontFamily="'Space Mono', monospace" fontSize="8" fill="#304050" letterSpacing="2">SCALE 1:1200</text>
    </svg>
  )
}

function SumpMainBay() {
  return (
    <svg viewBox={VB_PLATE} style={baseStyle} preserveAspectRatio="xMidYMid slice"
         xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="sump-glow" cx="50%" cy="60%" r="60%">
          <stop offset="0" stopColor="#ff8a30" stopOpacity="0.35" />
          <stop offset="0.4" stopColor="#c84a10" stopOpacity="0.15" />
          <stop offset="1" stopColor="#080202" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="sump-rock" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2a1a14" />
          <stop offset="1" stopColor="#0a0606" />
        </linearGradient>
        <radialGradient id="sump-lamp" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#ffd080" />
          <stop offset="0.4" stopColor="#ff8030" stopOpacity="0.85" />
          <stop offset="1" stopColor="#ff8030" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="1600" height="500" fill="#060202" />
      <rect width="1600" height="500" fill="url(#sump-glow)" />

      <path d="M 0,0 L 0,500 L 240,500 L 220,440 L 260,400 L 200,360 L 250,320 L 180,280 L 240,240 L 170,200 L 230,170 L 160,130 L 220,90 L 150,50 L 200,20 L 0,0 Z"
        fill="url(#sump-rock)" stroke="#3a2018" strokeWidth="1.5" />
      <path d="M 1600,0 L 1600,500 L 1380,500 L 1400,450 L 1360,410 L 1420,370 L 1370,330 L 1430,290 L 1370,250 L 1440,210 L 1380,170 L 1450,130 L 1390,90 L 1460,50 L 1400,20 L 1600,0 Z"
        fill="url(#sump-rock)" stroke="#3a2018" strokeWidth="1.5" />
      <path d="M 240,0 L 280,0 L 270,40 Z M 360,0 L 400,0 L 380,60 Z M 520,0 L 550,0 L 540,30 Z M 700,0 L 740,0 L 720,80 Z M 860,0 L 900,0 L 880,50 Z M 1020,0 L 1050,0 L 1040,40 Z M 1180,0 L 1220,0 L 1200,70 Z M 1340,0 L 1380,0 L 1360,40 Z"
        fill="#0a0404" stroke="#3a2018" strokeWidth="0.8" />

      <path d="M 240,500 L 240,440 Q 400,420 600,430 T 1000,420 T 1380,440 L 1380,500 Z" fill="#1a0e08" />
      <path d="M 240,440 Q 400,420 600,430 T 1000,420 T 1380,440" stroke="#3a2018" strokeWidth="1.2" fill="none" />

      {/* Mining rig */}
      <g stroke="#5a3018" strokeWidth="1.5" fill="#1a0e08">
        <polygon points="780,420 820,420 830,180 770,180" />
        {[220, 260, 300, 340, 380].map(y => (
          <line key={y} x1="780" y1={y} x2="820" y2={y} />
        ))}
        {[200, 240, 280, 320, 360].map(y => (
          <g key={y}>
            <line x1="775" y1={y} x2="825" y2={y + 40} />
            <line x1="825" y1={y} x2="775" y2={y + 40} />
          </g>
        ))}
        <polygon points="780,420 820,420 800,460" fill="#3a1808" />
      </g>
      <line x1="800" y1="180" x2="800" y2="40" stroke="#3a2018" strokeWidth="1" />

      {/* Shacks */}
      <g stroke="#5a3018" strokeWidth="1" fill="#1a0e08">
        <rect x="380" y="408" width="80" height="32" />
        <polygon points="380,408 460,408 450,396 390,396" />
        <rect x="392" y="418" width="10" height="14" fill="#ff8030" opacity="0.85" />
        <rect x="412" y="420" width="6" height="10" fill="#ffb060" opacity="0.7" />
        <rect x="436" y="418" width="14" height="14" fill="#3a1808" />
        <rect x="540" y="402" width="60" height="40" />
        <polygon points="540,402 600,402 590,388 550,388" />
        <rect x="552" y="416" width="10" height="14" fill="#ff8030" opacity="0.8" />
        <rect x="572" y="416" width="14" height="18" fill="#3a1808" />
        <rect x="980" y="404" width="100" height="38" />
        <polygon points="980,404 1080,404 1070,390 990,390" />
        <rect x="996" y="416" width="14" height="14" fill="#ffb060" opacity="0.85" />
        <rect x="1020" y="416" width="14" height="14" fill="#ff8030" opacity="0.8" />
        <rect x="1050" y="416" width="20" height="18" fill="#3a1808" />
        <rect x="1160" y="414" width="60" height="28" />
        <rect x="1170" y="424" width="8" height="10" fill="#ff8030" opacity="0.8" />
      </g>

      {/* Mining lamps strung across cavern roof */}
      <g>
        <path d="M 0,80 Q 200,140 400,110 T 800,130 T 1200,110 T 1600,90" fill="none" stroke="#3a2018" strokeWidth="0.8" />
        {[
          { x: 180, y: 128, r: 34 },
          { x: 380, y: 115, r: 40 },
          { x: 600, y: 124, r: 36 },
          { x: 1000, y: 128, r: 42 },
          { x: 1240, y: 118, r: 36 },
          { x: 1440, y: 100, r: 32 },
        ].map((l, i) => (
          <g key={i}>
            <circle cx={l.x} cy={l.y} r={l.r} fill="url(#sump-lamp)" />
            <line x1={l.x} y1={l.y} x2={l.x} y2={l.y - 10} stroke="#3a2018" strokeWidth="0.8" />
            <circle cx={l.x} cy={l.y} r="3.5" fill="#ffd080" />
          </g>
        ))}
      </g>

      {/* Tiny miners w/ helmet lamps */}
      <g fill="#0a0404" stroke="#1a0a06" strokeWidth="0.6">
        {[
          { x: 500, y: 438 },
          { x: 700, y: 436 },
          { x: 900, y: 430 },
          { x: 1120, y: 436 },
        ].map((m, i) => (
          <g key={i}>
            <circle cx={m.x} cy={m.y} r="2.5" />
            <rect x={m.x - 1.3} y={m.y + 2} width="2.6" height="8" />
            <circle cx={m.x} cy={m.y - 1} r="0.8" fill="#ffb060" />
          </g>
        ))}
      </g>

      {/* Vapour drift */}
      <g fill="#ff8030" opacity="0.06">
        <ellipse cx="500" cy="380" rx="200" ry="20" />
        <ellipse cx="1000" cy="370" rx="220" ry="18" />
      </g>

      {/* Survey frame */}
      <g stroke="#3a2018" strokeWidth="0.6" opacity="0.7" fill="none">
        <line x1="20" y1="10" x2="40" y2="10" />
        <line x1="20" y1="10" x2="20" y2="30" />
        <line x1="1580" y1="10" x2="1560" y2="10" />
        <line x1="1580" y1="10" x2="1580" y2="30" />
        <line x1="20" y1="490" x2="40" y2="490" />
        <line x1="20" y1="490" x2="20" y2="470" />
        <line x1="1580" y1="490" x2="1560" y2="490" />
        <line x1="1580" y1="490" x2="1580" y2="470" />
      </g>
      <text x="30" y="488" fontFamily="'Space Mono', monospace" fontSize="8" fill="#5a3018" letterSpacing="2">PLATE 11·C — THE SUMP / WORKING FACE</text>
      <text x="1570" y="488" textAnchor="end" fontFamily="'Space Mono', monospace" fontSize="8" fill="#5a3018" letterSpacing="2">DEPTH ~2.4 km</text>
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
    <svg viewBox={VB_PLATE} style={baseStyle} preserveAspectRatio="xMidYMid slice"
         xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bh-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1a2840" />
          <stop offset="0.35" stopColor="#3a4a6a" />
          <stop offset="0.65" stopColor="#a87858" />
          <stop offset="0.85" stopColor="#d89060" />
          <stop offset="1" stopColor="#e0a878" />
        </linearGradient>
        <linearGradient id="bh-ground" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3a2818" />
          <stop offset="1" stopColor="#1a1208" />
        </linearGradient>
        <radialGradient id="bh-sun" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#ffe8b0" />
          <stop offset="0.5" stopColor="#ffb060" stopOpacity="0.6" />
          <stop offset="1" stopColor="#ffb060" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="1600" height="340" fill="url(#bh-sky)" />

      <g fill="#e0d8c0" opacity="0.7">
        <circle cx="120" cy="40" r="0.7" />
        <circle cx="220" cy="72" r="1" />
        <circle cx="380" cy="20" r="0.8" />
        <circle cx="500" cy="55" r="0.6" />
        <circle cx="180" cy="90" r="0.5" />
        <circle cx="60" cy="120" r="0.7" />
        <circle cx="320" cy="100" r="0.5" />
        <circle cx="440" cy="130" r="0.6" />
      </g>
      <g fill="#fff8e0" opacity="0.4">
        <circle cx="640" cy="48" r="0.7" />
        <circle cx="720" cy="80" r="0.5" />
      </g>

      <circle cx="1180" cy="320" r="180" fill="url(#bh-sun)" />
      <circle cx="1180" cy="320" r="38" fill="#ffe8b0" />

      <g fill="#e8c098" opacity="0.55">
        <ellipse cx="380" cy="220" rx="220" ry="6" />
        <ellipse cx="900" cy="200" rx="280" ry="5" />
        <ellipse cx="1380" cy="240" rx="180" ry="6" />
        <ellipse cx="160" cy="260" rx="160" ry="4" />
      </g>
      <g fill="#d8a878" opacity="0.7">
        <ellipse cx="600" cy="240" rx="180" ry="3" />
        <ellipse cx="1100" cy="220" rx="220" ry="4" />
      </g>

      {/* Birds */}
      <g stroke="#1a1208" strokeWidth="1.4" fill="none" strokeLinecap="round">
        <path d="M 460,150 q 4,-4 8,0 q 4,-4 8,0" />
        <path d="M 500,170 q 3,-3 6,0 q 3,-3 6,0" />
        <path d="M 540,140 q 3,-3 6,0 q 3,-3 6,0" />
      </g>

      <line x1="0" y1="340" x2="1600" y2="340" stroke="#5a3a20" strokeWidth="0.8" opacity="0.6" />

      <path d="M 0,340 Q 200,300 400,320 T 800,310 T 1200,320 T 1600,300 L 1600,340 Z" fill="#2a1e18" opacity="0.85" />
      <path d="M 0,340 Q 300,320 600,335 T 1100,328 T 1600,335 L 1600,340 Z" fill="#1a1208" opacity="0.8" />

      {/* Settlement silhouette */}
      <g fill="#0a0606" stroke="#2a1808" strokeWidth="0.8">
        <polygon points="240,340 244,225 250,200 256,225 260,340" />
        <line x1="244" y1="240" x2="260" y2="240" stroke="#2a1808" />
        <line x1="244" y1="265" x2="260" y2="265" stroke="#2a1808" />
        <circle cx="252" cy="200" r="2.5" fill="#d05050" />
        <path d="M 300,340 Q 300,290 340,290 Q 380,290 380,340 Z" />
        <rect x="316" y="318" width="6" height="10" fill="#ffd080" />
        <rect x="332" y="316" width="6" height="12" fill="#ffd080" />
        <rect x="350" y="318" width="6" height="10" fill="#ffd080" />
        <rect x="400" y="304" width="60" height="36" />
        <polygon points="400,304 430,290 460,304" />
        <rect x="408" y="316" width="6" height="10" fill="#ffd080" />
        <rect x="422" y="316" width="6" height="10" fill="#ffd080" />
        <rect x="436" y="316" width="6" height="10" fill="#ffd080" />
        <rect x="450" y="316" width="6" height="10" fill="#ffd080" />
        <rect x="490" y="298" width="14" height="42" />
        <ellipse cx="497" cy="298" rx="7" ry="3" />
        <rect x="510" y="294" width="14" height="46" />
        <ellipse cx="517" cy="294" rx="7" ry="3" />
        <rect x="530" y="300" width="14" height="40" />
        <ellipse cx="537" cy="300" rx="7" ry="3" />
        <rect x="580" y="316" width="120" height="24" />
        <line x1="580" y1="320" x2="700" y2="320" stroke="#2a1808" />
        {[592, 612, 632, 652, 672].map((x, i) => (
          <rect key={x} x={x} y="324" width="8" height="12" fill="#ffd080" opacity={i % 2 ? 1 : 0.7} />
        ))}
        <rect x="720" y="318" width="20" height="22" />
        <polygon points="720,318 730,310 740,318" />
        <rect x="724" y="324" width="4" height="6" fill="#ffd080" />
        <rect x="744" y="320" width="18" height="20" />
        <polygon points="744,320 753,313 762,320" />
        <rect x="748" y="326" width="4" height="6" fill="#ffd080" />
        <rect x="766" y="316" width="22" height="24" />
        <polygon points="766,316 777,308 788,316" />
        <rect x="770" y="322" width="4" height="6" fill="#ffd080" />
        <rect x="780" y="322" width="4" height="6" fill="#ffd080" />
        <rect x="810" y="296" width="22" height="30" />
        <ellipse cx="821" cy="296" rx="11" ry="4" />
        <rect x="817" y="326" width="3" height="14" />
        <rect x="824" y="326" width="3" height="14" />
        <polygon points="850,340 850,318 880,310 910,318 910,340" />
        <rect x="858" y="322" width="44" height="18" fill="#1a3018" stroke="#2a1808" />
      </g>
      <g fill="#1a0e08" stroke="#2a1808" strokeWidth="0.6" opacity="0.85">
        <rect x="940" y="324" width="36" height="16" />
        <polygon points="940,324 958,316 976,324" />
        <rect x="950" y="328" width="4" height="6" fill="#ffd080" />
        <rect x="966" y="328" width="4" height="6" fill="#ffd080" />
        <rect x="990" y="326" width="28" height="14" />
        <rect x="998" y="330" width="3" height="5" fill="#ffd080" />
        <rect x="1030" y="322" width="20" height="18" />
        <polygon points="1030,322 1040,316 1050,322" />
        <rect x="1036" y="328" width="3" height="5" fill="#ffd080" />
      </g>

      {/* Foreground */}
      <rect x="0" y="340" width="1600" height="160" fill="url(#bh-ground)" />
      <g stroke="#1a1208" strokeWidth="0.8" fill="none" opacity="0.55">
        <path d="M 0,360 Q 800,355 1600,360" />
        <path d="M 0,378 Q 800,374 1600,378" />
        <path d="M 0,398 Q 800,394 1600,398" />
        <path d="M 0,420 Q 800,418 1600,420" />
        <path d="M 0,448 Q 800,446 1600,448" />
      </g>

      {/* Footpath */}
      <path d="M 1100,500 Q 900,460 700,420 T 460,360" stroke="#5a4028" strokeWidth="6" fill="none" opacity="0.7" />
      <path d="M 1100,500 Q 900,460 700,420 T 460,360" stroke="#7a5838" strokeWidth="2" fill="none" opacity="0.8" strokeDasharray="2 4" />

      {/* Fence */}
      <g stroke="#1a0a06" strokeWidth="2.2" fill="none">
        <line x1="60" y1="500" x2="80" y2="372" />
        <line x1="280" y1="500" x2="270" y2="380" />
        <line x1="500" y1="498" x2="470" y2="392" />
      </g>
      <g stroke="#1a0a06" strokeWidth="1.6" fill="none" opacity="0.85">
        <path d="M 60,420 Q 280,400 500,418" />
        <path d="M 60,460 Q 280,438 500,456" />
      </g>

      {/* Walking colonist */}
      <g>
        <circle cx="980" cy="424" r="3" fill="#0a0604" />
        <ellipse cx="980" cy="421.5" rx="4.5" ry="1.4" fill="#0a0604" />
        <rect x="978.5" y="426" width="3" height="10" fill="#0a0604" />
        <line x1="980" y1="436" x2="978" y2="442" stroke="#0a0604" strokeWidth="1.4" />
        <line x1="980" y1="436" x2="982" y2="442" stroke="#0a0604" strokeWidth="1.4" />
        <line x1="980" y1="430" x2="976" y2="434" stroke="#0a0604" strokeWidth="1.2" />
        <line x1="980" y1="430" x2="984" y2="434" stroke="#0a0604" strokeWidth="1.2" />
      </g>
      <ellipse cx="970" cy="446" rx="24" ry="2" fill="#0a0604" opacity="0.4" />

      <g stroke="#1a0e08" strokeWidth="1" fill="none" opacity="0.8">
        <path d="M 200,500 Q 198,488 196,480 M 200,500 Q 200,488 200,478 M 200,500 Q 202,488 204,482" />
        <path d="M 720,500 Q 718,490 716,484 M 720,500 Q 720,488 720,480 M 720,500 Q 722,490 724,486" />
        <path d="M 1320,500 Q 1318,492 1316,486 M 1320,500 Q 1320,490 1320,484 M 1320,500 Q 1322,492 1324,488" />
      </g>

      {/* Survey frame */}
      <g stroke="#5a3a20" strokeWidth="0.6" opacity="0.7" fill="none">
        <line x1="20" y1="10" x2="40" y2="10" />
        <line x1="20" y1="10" x2="20" y2="30" />
        <line x1="1580" y1="10" x2="1560" y2="10" />
        <line x1="1580" y1="10" x2="1580" y2="30" />
        <line x1="20" y1="490" x2="40" y2="490" />
        <line x1="20" y1="490" x2="20" y2="470" />
        <line x1="1580" y1="490" x2="1560" y2="490" />
        <line x1="1580" y1="490" x2="1580" y2="470" />
      </g>
      <text x="30" y="488" fontFamily="'Space Mono', monospace" fontSize="8" fill="#5a3a20" letterSpacing="2">PLATE 02·B — BELLHAVEN, FIRST LIGHT</text>
      <text x="1570" y="488" textAnchor="end" fontFamily="'Space Mono', monospace" fontSize="8" fill="#5a3a20" letterSpacing="2">SURVEY 2089</text>
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
