import { Portrait } from './Portrait.jsx'
import {
  getEnemyAction,
  formatIntent,
  playerFireDamageRange,
  playerRepairAmount,
} from '../game/utils.js'
import { SFX } from '../game/sfx.js'

function CombatBtn({ label, sub, color, disabled, onClick, full }) {
  return (
    <button
      onClick={!disabled ? onClick : undefined}
      disabled={disabled}
      style={{
        gridColumn: full ? '1 / -1' : undefined,
        padding: '10px',
        background: disabled ? 'var(--bg-panel-lo)' : 'var(--bg-panel-hi)',
        border: `1px solid ${disabled ? '#1a2030' : '#2a3a4a'}`,
        color: disabled ? 'var(--text-ghost)' : color,
        borderRadius: 6,
        cursor: disabled ? 'default' : 'pointer',
        textAlign: 'left',
        opacity: disabled ? 0.5 : 1,
      }}
    >
      <div style={{ fontSize: 11, letterSpacing: 1 }}>{label}</div>
      <div style={{ fontSize: 10, opacity: 0.7 }}>{sub}</div>
    </button>
  )
}

export function CombatScreen({ state, dispatch }) {
  if (!state.combat) return null
  const { enemy, playerAP, playerEvading, turn } = state.combat
  const { current: enemyAct, next: enemyNext } = getEnemyAction(enemy, enemy.patternIdx)

  const hullPct = (state.hull / state.maxHull) * 100
  const enemyPct = (enemy.hull / enemy.maxHull) * 100
  const fireRange = playerFireDamageRange(state.weapons)
  const showEnemyHull = state.upgrades.includes('scanner')

  const act = a => {
    if (a === 'fire' || a === 'overload') SFX.fire()
    else SFX.click()
    dispatch({ type: 'COMBAT_ACTION', act: a })
  }

  return (
    <div style={{ maxWidth: 520, margin: '0 auto', padding: 16 }} className="fade-in">
      <div
        style={{
          color: 'var(--text-ghost)',
          fontSize: 10,
          letterSpacing: 3,
          marginBottom: 8,
        }}
      >
        COMBAT — TURN {turn}
      </div>

      <div
        style={{
          background: '#0a0505',
          border: '1px solid #3a1010',
          borderRadius: 8,
          padding: 14,
          marginBottom: 10,
        }}
      >
        <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 10 }}>
          <Portrait id={enemy.id} size={64} />
          <div style={{ flex: 1 }}>
            <div style={{ color: '#e0c0a0', fontSize: 14 }}>{enemy.name}</div>
            <div style={{ color: '#705040', fontSize: 11, marginBottom: 8 }}>
              {showEnemyHull ? `Hull: ${enemy.hull}/${enemy.maxHull}` : 'Hull: ???'}
            </div>
            <div
              style={{
                height: 6,
                background: '#200a0a',
                borderRadius: 3,
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: `${enemyPct}%`,
                  background: '#a04030',
                  borderRadius: 3,
                  transition: 'width 0.3s',
                }}
              />
            </div>
          </div>
        </div>
        <div
          style={{
            background: '#0d0808',
            border: '1px solid #2a1010',
            borderRadius: 6,
            padding: 10,
          }}
        >
          <div
            style={{
              color: '#604040',
              fontSize: 10,
              marginBottom: 4,
              letterSpacing: 1,
            }}
          >
            ENEMY INTENT
          </div>
          <div style={{ color: '#d08060', fontSize: 13 }}>
            NOW: {formatIntent(enemyAct, enemy.damage)}
          </div>
          <div style={{ color: '#5a3a2a', fontSize: 11, marginTop: 4 }}>
            NEXT: {formatIntent(enemyNext, enemy.damage)}
          </div>
        </div>
      </div>

      <div
        style={{
          background: 'var(--bg-panel)',
          border: '1px solid var(--border)',
          borderRadius: 8,
          padding: 10,
          marginBottom: 10,
          maxHeight: 100,
          overflowY: 'auto',
        }}
      >
        {state.combatLog.map((l, i) => (
          <div
            key={i}
            style={{
              color: i === 0 ? 'var(--text)' : '#3a5a6a',
              fontSize: 11,
              marginBottom: 2,
              lineHeight: 1.4,
            }}
          >
            {l}
          </div>
        ))}
      </div>

      <div
        style={{
          background: 'var(--bg-panel)',
          border: '1px solid var(--border)',
          borderRadius: 8,
          padding: 12,
          marginBottom: 12,
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 8,
          }}
        >
          <span style={{ color: '#4a8a8a', fontSize: 12 }}>Persistent Delusion</span>
          <span
            style={{
              color: hullPct < 30 ? 'var(--bad)' : 'var(--good)',
              fontSize: 12,
            }}
          >
            Hull: {state.hull}/{state.maxHull}
          </span>
        </div>
        <div
          style={{
            height: 6,
            background: '#0a1520',
            borderRadius: 3,
            overflow: 'hidden',
            marginBottom: 8,
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${hullPct}%`,
              background: hullPct < 30 ? 'var(--bad)' : 'var(--good)',
              borderRadius: 3,
              transition: 'width 0.3s',
            }}
          />
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <span style={{ color: 'var(--text-faint)', fontSize: 11 }}>
            AP:{' '}
            {[...Array(3)].map((_, i) => (
              <span
                key={i}
                style={{ color: i < playerAP ? '#4aaad0' : '#1a2a3a', marginRight: 2 }}
              >
                ◆
              </span>
            ))}
          </span>
          {playerEvading && (
            <span style={{ color: '#5090d0', fontSize: 11 }}>◆ EVADING</span>
          )}
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 8,
          marginBottom: 8,
        }}
      >
        <CombatBtn
          label="FIRE (1 AP)"
          sub={`${fireRange.min}–${fireRange.max} dmg`}
          color="#d07050"
          disabled={playerAP < 1}
          onClick={() => act('fire')}
        />
        <CombatBtn
          label="OVERLOAD (2 AP)"
          sub="Double damage"
          color="#d0a050"
          disabled={playerAP < 2}
          onClick={() => act('overload')}
        />
        <CombatBtn
          label="EVADE (1 AP)"
          sub="Half incoming dmg"
          color="#5090d0"
          disabled={playerAP < 1 || playerEvading}
          onClick={() => act('evade')}
        />
        <CombatBtn
          label="REPAIR (2 AP)"
          sub={`+${playerRepairAmount(state.shields)} hull`}
          color="var(--good)"
          disabled={playerAP < 2 || state.hull >= state.maxHull}
          onClick={() => act('repair')}
        />
      </div>
      <CombatBtn
        label="END TURN →"
        sub="Enemy acts, AP refills"
        color="#a0a0d0"
        disabled={false}
        onClick={() => act('end_turn')}
        full
      />
    </div>
  )
}
