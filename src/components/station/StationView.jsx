import { SYSTEMS } from '../../data/systems.js'
import { DockTab } from './DockTab.jsx'
import { MarketTab } from './MarketTab.jsx'
import { BarTab } from './BarTab.jsx'
import { ShipyardTab } from './ShipyardTab.jsx'
import { SFX } from '../../game/sfx.js'

const TABS = [
  { id: 'dock', label: 'DOCK' },
  { id: 'market', label: 'MARKET' },
  { id: 'bar', label: 'BAR' },
  { id: 'shipyard', label: 'YARD' },
]

export function StationView({ state, dispatch }) {
  const sys = SYSTEMS[state.currentSystem]
  const tab = state.stationTab

  return (
    <div style={{ maxWidth: 520, margin: '0 auto', padding: '12px 16px' }}>
      <div
        style={{
          color: 'var(--text-ghost)',
          fontSize: 11,
          letterSpacing: 3,
          marginBottom: 4,
        }}
      >
        DOCKED AT
      </div>
      <div style={{ color: 'var(--text-bright)', fontSize: 16, marginBottom: 12 }}>
        {sys.name}{' '}
        <span style={{ color: 'var(--text-faint)', fontSize: 11 }}>// {sys.economy}</span>
      </div>

      <div
        style={{
          display: 'flex',
          gap: 4,
          marginBottom: 16,
          borderBottom: '1px solid var(--border)',
          paddingBottom: 8,
        }}
      >
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => {
              SFX.click()
              dispatch({ type: 'SET_TAB', tab: t.id })
            }}
            style={{
              padding: '6px 12px',
              background: tab === t.id ? '#0a2a4a' : 'none',
              border: `1px solid ${tab === t.id ? 'var(--border-accent)' : '#1a2a3a'}`,
              color: tab === t.id ? 'var(--accent)' : 'var(--text-faint)',
              borderRadius: 4,
              cursor: 'pointer',
              fontSize: 11,
              letterSpacing: 1,
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'dock' && <DockTab state={state} dispatch={dispatch} sys={sys} />}
      {tab === 'market' && <MarketTab state={state} dispatch={dispatch} sys={sys} />}
      {tab === 'bar' && <BarTab state={state} dispatch={dispatch} sys={sys} />}
      {tab === 'shipyard' && <ShipyardTab state={state} dispatch={dispatch} />}
    </div>
  )
}
