import { UPGRADES } from '../../../data/upgrades.js'
import { SFX } from '../../../game/sfx.js'
import { cargoUsed } from '../../../game/utils.js'

export function ShipyardBlock({ state, dispatch, loc }) {
  // Filter: an upgrade with availableAt is only purchasable when the named
  // NPC is in this location. Default upgrades show in any shipyard.
  const presentNpcs = new Set(loc?.npcs || [])
  const visible = UPGRADES.filter(u => !u.availableAt || presentNpcs.has(u.availableAt))
  const componentsHeld = state.cargo.find(c => c.id === 'components')?.qty || 0
  const showCassMods = visible.some(u => u.componentCost)

  return (
    <div>
      <div
        style={{
          color: 'var(--text-faint)',
          fontSize: 10,
          letterSpacing: 2,
          marginBottom: 10,
        }}
      >
        {showCassMods ? 'OFF-BOOKS MODIFICATIONS' : 'SHIPYARD CATALOGUE'}
      </div>
      {showCassMods && (
        <div
          style={{
            color: 'var(--text-dim)',
            fontSize: 11,
            marginBottom: 10,
            lineHeight: 1.5,
          }}
        >
          Paid in components, not credits. You hold{' '}
          <span style={{ color: '#5090d0' }}>{componentsHeld}</span> components.
        </div>
      )}
      {visible.map(upg => {
        const owned = state.upgrades.includes(upg.id)
        const reqOwned = !upg.req || state.upgrades.includes(upg.req)
        const isComponent = !!upg.componentCost
        const canAfford = isComponent
          ? componentsHeld >= upg.componentCost
          : state.credits >= upg.cost
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
                <span style={{ color: owned ? 'var(--good)' : 'var(--text)', fontSize: 13 }}>
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
                {owned
                  ? 'OWNED'
                  : isComponent
                    ? `${upg.componentCost} comp`
                    : `${upg.cost}cr`}
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
