import { UPGRADES } from '../../data/upgrades.js'
import { SFX } from '../../game/sfx.js'

export function ShipyardTab({ state, dispatch }) {
  return (
    <div>
      <div
        style={{
          color: 'var(--text-dim)',
          fontSize: 12,
          marginBottom: 16,
          lineHeight: 1.5,
        }}
      >
        The Persistent Delusion is functional. It could be more functional.
      </div>
      {UPGRADES.map(upg => {
        const owned = state.upgrades.includes(upg.id)
        const reqOwned = !upg.req || state.upgrades.includes(upg.req)
        const canAfford = state.credits >= upg.cost
        return (
          <div
            key={upg.id}
            style={{
              background: 'var(--bg-panel)',
              border: `1px solid ${owned ? '#1a4a2a' : 'var(--border)'}`,
              borderRadius: 8,
              padding: 12,
              marginBottom: 8,
              opacity: !reqOwned ? 0.5 : 1,
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: 6,
              }}
            >
              <div>
                <span
                  style={{
                    color: owned ? 'var(--good)' : 'var(--text)',
                    fontSize: 13,
                  }}
                >
                  {owned ? '✓ ' : ''}
                  {upg.name}
                </span>
                <div style={{ color: '#506080', fontSize: 11, marginTop: 3 }}>{upg.desc}</div>
                {upg.req && !state.upgrades.includes(upg.req) && (
                  <div style={{ color: '#6a4a4a', fontSize: 10, marginTop: 3 }}>
                    Requires: {UPGRADES.find(u => u.id === upg.req)?.name}
                  </div>
                )}
              </div>
              <span
                style={{
                  color: owned ? 'var(--good)' : canAfford ? 'var(--text-bright)' : 'var(--bad)',
                  fontSize: 13,
                  marginLeft: 12,
                  whiteSpace: 'nowrap',
                }}
              >
                {owned ? 'OWNED' : `${upg.cost}cr`}
              </span>
            </div>
            {!owned && reqOwned && (
              <button
                onClick={() => {
                  if (!canAfford) return
                  SFX.upgrade()
                  dispatch({ type: 'BUY_UPGRADE', id: upg.id })
                }}
                disabled={!canAfford}
                style={{
                  width: '100%',
                  padding: '8px',
                  background: canAfford ? '#0a2a4a' : 'var(--bg-panel-lo)',
                  border: `1px solid ${canAfford ? 'var(--border-accent)' : '#1a2a3a'}`,
                  color: canAfford ? 'var(--accent)' : '#3a5a70',
                  borderRadius: 4,
                  cursor: canAfford ? 'pointer' : 'default',
                  fontSize: 11,
                }}
              >
                INSTALL
              </button>
            )}
          </div>
        )
      })}
    </div>
  )
}
