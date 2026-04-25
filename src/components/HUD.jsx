import { SYSTEMS } from '../data/systems.js'
import { cargoUsed } from '../game/utils.js'
import { SFX } from '../game/sfx.js'

const navBtn = {
  background: 'none',
  border: '1px solid var(--border-hi)',
  color: 'var(--text-mid)',
  padding: '3px 10px',
  borderRadius: 4,
  cursor: 'pointer',
  fontSize: 11,
  letterSpacing: 1,
}

export function HUD({ state, dispatch }) {
  const used = cargoUsed(state.cargo)
  const hullPct = (state.hull / state.maxHull) * 100
  const hullColor =
    hullPct > 60 ? 'var(--good)' : hullPct > 30 ? 'var(--warn)' : 'var(--bad)'

  const showNav = state.view !== 'combat' && state.view !== 'event' && state.view !== 'nameEntry'
  const sysName = SYSTEMS[state.currentSystem]?.name || '—'

  const click = (action) => {
    SFX.click()
    dispatch(action)
  }

  return (
    <div
      style={{
        background: '#050d14',
        borderBottom: '1px solid var(--border-hi)',
        padding: '8px 12px',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        flexWrap: 'wrap',
        fontSize: 12,
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backdropFilter: 'blur(6px)',
      }}
    >
      <span style={{ color: 'var(--good)', fontWeight: 'bold' }}>
        ⬡ {state.credits.toLocaleString()} CR
      </span>
      <span style={{ color: '#7090a0' }}>│</span>
      <span>
        <span style={{ color: '#708090' }}>HULL </span>
        <span style={{ color: hullColor }}>
          {state.hull}/{state.maxHull}
        </span>
      </span>
      <span style={{ color: '#7090a0' }}>│</span>
      <span style={{ color: '#708090' }}>
        CARGO{' '}
        <span style={{ color: used >= state.cargoMax ? 'var(--bad)' : 'var(--text)' }}>
          {used}/{state.cargoMax}
        </span>
      </span>
      <span style={{ color: '#7090a0' }}>│</span>
      <span style={{ color: 'var(--accent)' }}>{sysName}</span>

      {showNav && (
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 6 }}>
          {state.view !== 'map' && (
            <button onClick={() => click({ type: 'GOTO_MAP' })} style={{ ...navBtn, color: 'var(--accent)' }}>
              CHART
            </button>
          )}
          {state.view !== 'log' && (
            <button onClick={() => click({ type: 'GOTO_LOG' })} style={navBtn}>
              LOG
            </button>
          )}
          {state.view !== 'ledger' && (
            <button onClick={() => click({ type: 'GOTO_LEDGER' })} style={navBtn}>
              P&amp;L
            </button>
          )}
          {state.view !== 'settings' && (
            <button
              onClick={() => click({ type: 'GOTO_SETTINGS' })}
              style={navBtn}
              title="Settings"
              aria-label="Settings"
            >
              ⚙
            </button>
          )}
        </div>
      )}
    </div>
  )
}
