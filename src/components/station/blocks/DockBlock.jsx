import { useState } from 'react'
import { cargoUsed } from '../../../game/utils.js'
import { StatBlock } from '../../StatBlock.jsx'
import { SFX } from '../../../game/sfx.js'

export function DockBlock({ state, dispatch, sys, services }) {
  const [repairAmt, setRepairAmt] = useState(10)
  const showRepair = services.includes('repair')
  const showManifest = services.includes('manifest')
  const missing = state.maxHull - state.hull
  const repAmt = Math.min(repairAmt, missing)
  const repCost = repAmt * 5

  return (
    <>
      {showRepair && (
        <div
          style={{
            background: 'var(--bg-panel)',
            border: '1px solid var(--border)',
            borderRadius: 8,
            padding: 14,
            marginBottom: 10,
          }}
        >
          <div style={{ color: '#708090', fontSize: 11, marginBottom: 8, letterSpacing: 1 }}>
            SHIP STATUS
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 8,
              marginBottom: state.hull < state.maxHull ? 12 : 0,
            }}
          >
            <StatBlock
              label="Hull"
              val={`${state.hull}/${state.maxHull}`}
              color={state.hull < 40 ? 'var(--bad)' : 'var(--good)'}
            />
            <StatBlock label="Cargo" val={`${cargoUsed(state.cargo)}/${state.cargoMax}`} color="var(--text)" />
            <StatBlock label="Weapons" val={`LV${state.weapons}`} color="#d0a050" />
            <StatBlock label="Shields" val={`LV${state.shields}`} color="#5090d0" />
            <StatBlock label="Engine" val={`LV${state.engine}`} color="#50d0a0" />
            <StatBlock
              label="System"
              val={sys.faction}
              color={
                sys.faction === 'Combine'
                  ? '#4080c0'
                  : sys.faction === 'Neutral'
                    ? '#808080'
                    : '#a06040'
              }
            />
          </div>
          {state.hull < state.maxHull && (
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: 12 }}>
              <div style={{ color: 'var(--text-dim)', fontSize: 11, marginBottom: 8 }}>
                Hull repair: 5cr/point
              </div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <input
                  type="range"
                  min={1}
                  max={Math.max(1, missing)}
                  value={Math.min(repairAmt, Math.max(1, missing))}
                  onChange={e => setRepairAmt(Number(e.target.value))}
                  style={{ flex: 1, accentColor: 'var(--good)' }}
                />
                <span style={{ color: 'var(--text)', fontSize: 12, minWidth: 60 }}>
                  {repAmt} pts
                </span>
                <button
                  onClick={() => {
                    SFX.buy()
                    dispatch({ type: 'REPAIR', amt: repAmt })
                  }}
                  style={{
                    padding: '6px 12px',
                    background: '#0a2a0a',
                    border: '1px solid #2a5a2a',
                    color: 'var(--good)',
                    borderRadius: 4,
                    cursor: 'pointer',
                    fontSize: 11,
                  }}
                >
                  {repCost}cr
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {showManifest && state.cargo.length > 0 && (
        <div
          style={{
            background: 'var(--bg-panel)',
            border: '1px solid var(--border)',
            borderRadius: 8,
            padding: 14,
            marginBottom: 10,
          }}
        >
          <div style={{ color: '#708090', fontSize: 11, marginBottom: 8, letterSpacing: 1 }}>
            CARGO MANIFEST
          </div>
          {state.cargo.map(c => {
            const mktPrice = state.markets[state.currentSystem]?.[c.id]?.price || 0
            const profit = (mktPrice - c.buyPrice) * c.qty
            return (
              <div
                key={c.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '6px 0',
                  borderBottom: '1px solid var(--border-dim)',
                }}
              >
                <span style={{ color: c.color, fontSize: 12 }}>● {c.name}</span>
                <span style={{ color: 'var(--text-dim)', fontSize: 11 }}>
                  {c.qty}× @ {c.buyPrice}cr
                </span>
                <span style={{ color: profit >= 0 ? 'var(--good)' : 'var(--bad)', fontSize: 11 }}>
                  {profit >= 0 ? '+' : ''}
                  {profit}cr
                </span>
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}
