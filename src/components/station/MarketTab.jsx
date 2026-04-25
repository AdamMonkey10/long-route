import { useState } from 'react'
import { COMMODITIES } from '../../data/commodities.js'
import { SFX } from '../../game/sfx.js'
import { cargoUsed } from '../../game/utils.js'

export function MarketTab({ state, dispatch, sys }) {
  const [qty, setQty] = useState({})
  const market = state.markets[state.currentSystem] || {}
  const used = cargoUsed(state.cargo)
  const space = state.cargoMax - used

  return (
    <div>
      <div
        style={{
          color: 'var(--text-faint)',
          fontSize: 10,
          letterSpacing: 2,
          marginBottom: 10,
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <span>MARKET — {sys.economy}</span>
        <span>SPACE: {space}/{state.cargoMax}</span>
      </div>
      {COMMODITIES.filter(c => sys.hasBlackMarket || c.id !== 'contraband').map(c => {
        const mkt = market[c.id] || { price: c.base, qty: 0 }
        const cargoItem = state.cargo.find(x => x.id === c.id)
        const cargoQty = cargoItem?.qty || 0
        const q = qty[c.id] || 1
        const isCheap = sys.cheap?.includes(c.id)
        const isExpensive = sys.expensive?.includes(c.id)
        const buyDisabled = mkt.qty < q || state.credits < mkt.price * q || space < q

        return (
          <div
            key={c.id}
            style={{
              background: 'var(--bg-panel)',
              border: '1px solid var(--border)',
              borderRadius: 8,
              padding: 12,
              marginBottom: 8,
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 8,
              }}
            >
              <div>
                <span style={{ color: c.color, fontSize: 13 }}>● {c.name}</span>
                {isCheap && (
                  <span style={{ color: 'var(--good)', fontSize: 9, marginLeft: 8 }}>
                    ▼ CHEAP
                  </span>
                )}
                {isExpensive && (
                  <span style={{ color: 'var(--bad)', fontSize: 9, marginLeft: 8 }}>
                    ▲ HIGH
                  </span>
                )}
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ color: 'var(--text-bright)', fontSize: 14 }}>
                  {mkt.price}cr
                </div>
                <div style={{ color: 'var(--text-faint)', fontSize: 10 }}>
                  avail: {mkt.qty}
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <button
                onClick={() =>
                  setQty(q2 => ({ ...q2, [c.id]: Math.max(1, (q2[c.id] || 1) - 1) }))
                }
                style={{
                  width: 28,
                  height: 28,
                  background: '#0a1520',
                  border: '1px solid var(--border)',
                  color: 'var(--text)',
                  borderRadius: 4,
                  cursor: 'pointer',
                  fontSize: 14,
                }}
              >
                −
              </button>
              <span
                style={{
                  color: 'var(--text)',
                  fontSize: 13,
                  minWidth: 24,
                  textAlign: 'center',
                }}
              >
                {q}
              </span>
              <button
                onClick={() =>
                  setQty(q2 => ({ ...q2, [c.id]: (q2[c.id] || 1) + 1 }))
                }
                style={{
                  width: 28,
                  height: 28,
                  background: '#0a1520',
                  border: '1px solid var(--border)',
                  color: 'var(--text)',
                  borderRadius: 4,
                  cursor: 'pointer',
                  fontSize: 14,
                }}
              >
                +
              </button>
              <button
                onClick={() => {
                  if (buyDisabled) return
                  SFX.buy()
                  dispatch({ type: 'BUY', id: c.id, qty: q })
                }}
                disabled={buyDisabled}
                style={{
                  flex: 1,
                  padding: '6px',
                  background: '#0a2a0a',
                  border: '1px solid #1a5a1a',
                  color: 'var(--good)',
                  borderRadius: 4,
                  cursor: buyDisabled ? 'default' : 'pointer',
                  fontSize: 11,
                  opacity: buyDisabled ? 0.4 : 1,
                }}
              >
                BUY {mkt.price * q}cr
              </button>
              {cargoQty > 0 && (
                <button
                  onClick={() => {
                    SFX.sell()
                    dispatch({ type: 'SELL', id: c.id, qty: Math.min(q, cargoQty) })
                  }}
                  style={{
                    flex: 1,
                    padding: '6px',
                    background: '#2a1a0a',
                    border: '1px solid #5a3a1a',
                    color: '#d0a050',
                    borderRadius: 4,
                    cursor: 'pointer',
                    fontSize: 11,
                  }}
                >
                  SELL ({cargoQty})
                </button>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
