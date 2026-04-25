import { useState, useRef } from 'react'
import { SYSTEMS } from '../data/systems.js'
import { travelCost, canUnlockSystem } from '../game/utils.js'
import { SFX } from '../game/sfx.js'
import { HyperspaceOverlay } from './HyperspaceOverlay.jsx'

const TIER_COLOR = { 1: '#2a5a90', 2: '#4a8040', 3: '#904040', 4: '#806020' }

export function GalaxyMap({ state, dispatch }) {
  const [hovered, setHovered] = useState(null)
  const [jumping, setJumping] = useState(null)
  const [phase, setPhase] = useState('jump')
  const pending = useRef(null)
  const cur = state.currentSystem

  const handleJump = sysId => {
    if (!sysId || sysId === cur || jumping) return
    SFX.jump()
    setJumping(sysId)
    setPhase('jump')
    pending.current = sysId
    setTimeout(() => {
      setPhase('arrive')
      SFX.arrive()
    }, 1400)
    setTimeout(() => {
      setJumping(null)
      dispatch({ type: 'START_TRAVEL', to: pending.current })
    }, 2500)
  }

  const conns = []
  Object.values(SYSTEMS).forEach(s =>
    s.connections.forEach(c => {
      const key = [s.id, c].sort().join('-')
      if (!conns.find(x => x.key === key)) conns.push({ key, a: s.id, b: c })
    }),
  )

  const canGo = id => {
    if (!SYSTEMS[cur].connections.includes(id)) return false
    const t = SYSTEMS[id]
    if (t.locked && !canUnlockSystem(state, t)) return false
    return state.credits >= travelCost(id, state.engine)
  }

  const W2 = 460
  const H2 = 300
  const PAD = 8
  const sx = id => (SYSTEMS[id].x / 100) * (W2 - PAD * 2) + PAD
  const sy = id => (SYSTEMS[id].y / 100) * (H2 - PAD * 2) + PAD

  return (
    <div style={{ padding: '10px 14px', maxWidth: 520, margin: '0 auto' }}>
      {jumping && <HyperspaceOverlay phase={phase} destination={jumping} />}
      <div
        style={{
          color: 'var(--text-ghost)',
          fontSize: 10,
          letterSpacing: 3,
          marginBottom: 8,
        }}
      >
        NAVIGATION CHART — {Object.keys(SYSTEMS).length} SYSTEMS CHARTED
      </div>
      <div
        style={{
          background: 'var(--bg-panel)',
          border: '1px solid #1a3040',
          borderRadius: 8,
          overflow: 'hidden',
          marginBottom: 12,
        }}
      >
        <svg width="100%" viewBox={`0 0 ${W2} ${H2}`} style={{ display: 'block' }}>
          {Array.from({ length: 70 }, (_, i) => (
            <circle
              key={i}
              cx={(i * 63 + 17) % W2}
              cy={(i * 89 + 31) % H2}
              r={i % 6 === 0 ? 1.3 : 0.6}
              fill="#a0c0d0"
              opacity={(i % 5 + 2) * 0.04}
            />
          ))}
          {conns.map(({ key, a, b }) => {
            const acc = canGo(b) || canGo(a) || cur === a || cur === b
            return (
              <line
                key={key}
                x1={sx(a)}
                y1={sy(a)}
                x2={sx(b)}
                y2={sy(b)}
                stroke={acc ? '#1a4060' : '#0a1820'}
                strokeWidth={acc ? 1 : 0.7}
                strokeDasharray={acc ? undefined : '4,4'}
                opacity={acc ? 0.8 : 0.5}
              />
            )
          })}
          {Object.values(SYSTEMS).map(s => {
            const x = sx(s.id)
            const y = sy(s.id)
            const isCur = s.id === cur
            const cg = canGo(s.id)
            const ul = canUnlockSystem(state, s)
            const hov = hovered === s.id
            const col = isCur ? '#4aaad0' : cg ? TIER_COLOR[s.tier] || '#606060' : '#1a2a3a'
            const cost = s.id !== cur ? travelCost(s.id, state.engine) : 0
            const r = isCur ? 8 : s.locked && !ul ? 4 : 5
            return (
              <g
                key={s.id}
                style={{ cursor: cg && s.id !== cur ? 'pointer' : 'default' }}
                onClick={() => cg && s.id !== cur && !jumping && handleJump(s.id)}
                onMouseEnter={() => setHovered(s.id)}
                onMouseLeave={() => setHovered(null)}
              >
                {isCur && (
                  <circle
                    cx={x}
                    cy={y}
                    r={20}
                    fill="none"
                    stroke="#4aaad0"
                    strokeWidth={0.7}
                    opacity={0.25}
                  />
                )}
                {cg && !isCur && (
                  <circle
                    cx={x}
                    cy={y}
                    r={15}
                    fill="none"
                    stroke={col}
                    strokeWidth={0.5}
                    opacity={0.4}
                  />
                )}
                <circle
                  cx={x}
                  cy={y}
                  r={r}
                  fill={s.locked && !ul ? '#080f18' : isCur ? '#4aaad0' : cg ? col : '#111a28'}
                  stroke={isCur ? '#a0e0ff' : hov && cg ? '#c0e0ff' : cg ? col : '#1a2a3a'}
                  strokeWidth={isCur ? 2 : hov && cg ? 1.5 : 1}
                  opacity={s.locked && !ul ? 0.4 : 1}
                />
                {s.locked && !ul && (
                  <text
                    x={x}
                    y={y + 1}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize={5}
                    fill="#303040"
                  >
                    🔒
                  </text>
                )}
                <text
                  x={x}
                  y={y + 13}
                  textAnchor="middle"
                  fontSize={6.5}
                  fill={isCur ? '#80d0f0' : cg ? '#808ea0' : '#304050'}
                  fontFamily="monospace"
                >
                  {s.name.length > 16 ? s.name.split(' ').slice(0, 2).join(' ') : s.name}
                </text>
                {cg && !isCur && cost > 0 && (
                  <text
                    x={x}
                    y={y + 21}
                    textAnchor="middle"
                    fontSize={5.5}
                    fill="#3a5a70"
                    fontFamily="monospace"
                  >
                    {cost}cr
                  </text>
                )}
                {hov && s.locked && !ul && (
                  <g>
                    <rect
                      x={Math.min(x - 60, W2 - 122)}
                      y={y + 22}
                      width={120}
                      height={18}
                      rx={3}
                      fill="#050d18"
                      stroke="#1a3040"
                    />
                    <text
                      x={Math.min(x, W2 - 62)}
                      y={y + 31}
                      textAnchor="middle"
                      fontSize={5.5}
                      fill="#5a7a90"
                      fontFamily="monospace"
                    >
                      {s.unlockReq?.label?.slice(0, 28)}
                    </text>
                  </g>
                )}
              </g>
            )
          })}
        </svg>
      </div>

      <div
        style={{
          background: 'var(--bg-panel)',
          border: '1px solid #1a3040',
          borderRadius: 8,
          padding: 14,
          marginBottom: 12,
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            marginBottom: 4,
          }}
        >
          <span style={{ color: 'var(--text-bright)', fontSize: 14 }}>
            {SYSTEMS[cur].name}
          </span>
          <span style={{ color: 'var(--text-faint)', fontSize: 10 }}>
            {SYSTEMS[cur].faction} · {SYSTEMS[cur].economy}
          </span>
        </div>
        <p
          style={{
            color: 'var(--text-dim)',
            fontSize: 12,
            margin: '0 0 12px',
            lineHeight: 1.6,
          }}
        >
          {SYSTEMS[cur].desc}
        </p>
        <button
          onClick={() => {
            SFX.click()
            dispatch({ type: 'GOTO_STATION', tab: 'market' })
          }}
          style={{
            width: '100%',
            padding: '11px',
            background: '#0a2a4a',
            border: '1px solid var(--border-accent)',
            color: 'var(--accent)',
            borderRadius: 6,
            cursor: 'pointer',
            fontSize: 13,
            letterSpacing: 2,
          }}
        >
          DOCK AT STATION
        </button>
      </div>

      {SYSTEMS[cur].connections.filter(id => canGo(id)).length > 0 && (
        <div
          style={{
            background: 'var(--bg-panel)',
            border: '1px solid #1a2a3a',
            borderRadius: 8,
            padding: 12,
            marginBottom: 12,
            fontSize: 11,
          }}
        >
          <div
            style={{
              color: '#3a5a70',
              marginBottom: 8,
              letterSpacing: 2,
              fontSize: 10,
            }}
          >
            JUMP DESTINATIONS
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {SYSTEMS[cur].connections
              .filter(id => canGo(id))
              .map(id => {
                const s = SYSTEMS[id]
                return (
                  <button
                    key={id}
                    onClick={() => handleJump(id)}
                    style={{
                      padding: '5px 10px',
                      background: 'var(--bg-panel-hi)',
                      border: '1px solid var(--border-hi)',
                      color: '#6090b0',
                      borderRadius: 4,
                      cursor: 'pointer',
                      fontSize: 11,
                    }}
                  >
                    {s.name}{' '}
                    <span style={{ color: '#3a5a70' }}>
                      {travelCost(id, state.engine)}cr
                    </span>
                  </button>
                )
              })}
          </div>
        </div>
      )}

      {(state.flags.edda_clue_1 || state.flags.edda_clue_2 || state.flags.edda_clue_3) && (
        <div
          style={{
            background: 'var(--bg-panel)',
            border: '1px solid #1a2a1a',
            borderRadius: 8,
            padding: 12,
            fontSize: 11,
          }}
        >
          <div
            style={{
              color: '#4a6a4a',
              letterSpacing: 2,
              marginBottom: 8,
              fontSize: 10,
            }}
          >
            INVESTIGATION
          </div>
          {state.flags.edda_clue_1 && (
            <div style={{ color: '#70a070', marginBottom: 3 }}>
              🔍 Grex remembers Edda Vance
            </div>
          )}
          {state.flags.edda_clue_2 && (
            <div style={{ color: '#70a070', marginBottom: 3 }}>
              🔍 Mara's warning — find Smee at The Sump
            </div>
          )}
          {state.flags.edda_clue_3 && (
            <div style={{ color: '#70a070', marginBottom: 3 }}>
              🔍 Data core obtained from Smee
            </div>
          )}
          {state.flags.consortium_files && (
            <div style={{ color: '#80b080', marginBottom: 3 }}>
              📁 Consortium records in hand
            </div>
          )}
          {state.flags.edda_clue_3 && !state.flags.decryption_complete && (
            <div style={{ color: '#507060', fontSize: 10, marginTop: 4 }}>
              → Find Keeper Isha at Kessel Expanse
            </div>
          )}
          {state.flags.decryption_complete && !state.flags.truth_revealed && (
            <div style={{ color: '#80d080', marginBottom: 3 }}>
              🔓 Core decrypted — Edda is at Cold Harbor
            </div>
          )}
          {state.flags.truth_revealed && !state.flags.game_complete && (
            <div style={{ color: '#d0c060' }}>
              📡 The truth is known. Find Edda at Exodus Point.
            </div>
          )}
          {state.flags.game_complete && (
            <div style={{ color: '#ffe080', fontSize: 13 }}>
              ✨ The Long Route — Complete.
            </div>
          )}
        </div>
      )}
    </div>
  )
}
