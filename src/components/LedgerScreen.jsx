import { SFX } from '../game/sfx.js'

export function LedgerScreen({ state, dispatch }) {
  const totalProfit = state.totalProfit || 0
  const totalLoss = state.totalLoss || 0
  const net = totalProfit - totalLoss
  const trades = state.trades || []
  const byCom = {}
  trades
    .filter(t => t.type === 'sell')
    .forEach(t => {
      if (!byCom[t.id]) {
        byCom[t.id] = { name: t.name, color: t.color, units: 0, revenue: 0, profit: 0, count: 0 }
      }
      byCom[t.id].units += t.qty
      byCom[t.id].revenue += t.total
      byCom[t.id].profit += t.profit
      byCom[t.id].count++
    })
  const sorted = Object.values(byCom).sort((a, b) => b.profit - a.profit)

  return (
    <div style={{ maxWidth: 500, margin: '0 auto', padding: 16 }} className="fade-in">
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 14,
        }}
      >
        <div
          style={{
            color: 'var(--text-ghost)',
            fontSize: 10,
            letterSpacing: 3,
          }}
        >
          TRADE LEDGER
        </div>
        <button
          onClick={() => {
            SFX.click()
            dispatch({ type: 'GOTO_MAP' })
          }}
          style={{
            background: 'none',
            border: '1px solid var(--border)',
            color: 'var(--text-faint)',
            padding: '4px 12px',
            borderRadius: 4,
            cursor: 'pointer',
            fontSize: 11,
          }}
        >
          BACK
        </button>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: 8,
          marginBottom: 14,
        }}
      >
        <div
          style={{
            background: 'var(--bg-panel)',
            border: '1px solid #1a3a1a',
            borderRadius: 8,
            padding: 10,
            textAlign: 'center',
          }}
        >
          <div
            style={{
              color: '#4a6a4a',
              fontSize: 9,
              marginBottom: 3,
              letterSpacing: 1,
            }}
          >
            PROFIT
          </div>
          <div style={{ color: 'var(--good)', fontSize: 13 }}>+{totalProfit}cr</div>
        </div>
        <div
          style={{
            background: 'var(--bg-panel)',
            border: '1px solid #3a1a1a',
            borderRadius: 8,
            padding: 10,
            textAlign: 'center',
          }}
        >
          <div
            style={{
              color: '#6a4a4a',
              fontSize: 9,
              marginBottom: 3,
              letterSpacing: 1,
            }}
          >
            LOSS
          </div>
          <div style={{ color: 'var(--bad)', fontSize: 13 }}>-{totalLoss}cr</div>
        </div>
        <div
          style={{
            background: 'var(--bg-panel)',
            border: `1px solid ${net >= 0 ? '#1a3a1a' : '#3a1a1a'}`,
            borderRadius: 8,
            padding: 10,
            textAlign: 'center',
          }}
        >
          <div
            style={{
              color: '#4a6a60',
              fontSize: 9,
              marginBottom: 3,
              letterSpacing: 1,
            }}
          >
            NET
          </div>
          <div
            style={{
              color: net >= 0 ? 'var(--good)' : 'var(--bad)',
              fontSize: 13,
            }}
          >
            {net >= 0 ? '+' : ''}
            {net}cr
          </div>
        </div>
      </div>

      {sorted.length > 0 && (
        <div
          style={{
            background: 'var(--bg-panel)',
            border: '1px solid var(--border)',
            borderRadius: 8,
            padding: 12,
            marginBottom: 14,
          }}
        >
          <div
            style={{
              color: 'var(--text-faint)',
              fontSize: 9,
              letterSpacing: 2,
              marginBottom: 10,
            }}
          >
            BY COMMODITY
          </div>
          {sorted.map(c => (
            <div
              key={c.name}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '6px 0',
                borderBottom: '1px solid var(--border-dim)',
              }}
            >
              <span style={{ color: c.color, fontSize: 12, flex: 1 }}>● {c.name}</span>
              <span style={{ color: 'var(--text-faint)', fontSize: 10 }}>
                {c.units}u/{c.count}t
              </span>
              <span
                style={{
                  color: c.profit >= 0 ? 'var(--good)' : 'var(--bad)',
                  fontSize: 12,
                  minWidth: 66,
                  textAlign: 'right',
                }}
              >
                {c.profit >= 0 ? '+' : ''}
                {c.profit}cr
              </span>
            </div>
          ))}
        </div>
      )}

      <div
        style={{
          background: 'var(--bg-panel)',
          border: '1px solid var(--border)',
          borderRadius: 8,
          padding: 12,
        }}
      >
        <div
          style={{
            color: 'var(--text-faint)',
            fontSize: 9,
            letterSpacing: 2,
            marginBottom: 10,
          }}
        >
          RECENT TRADES
        </div>
        {trades.length === 0 && (
          <div style={{ color: 'var(--text-ghost)', fontSize: 12 }}>No trades yet.</div>
        )}
        {trades.map((t, i) => (
          <div
            key={i}
            style={{
              padding: '7px 0',
              borderBottom: '1px solid #0a1820',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 2,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                <span
                  style={{
                    color: t.type === 'buy' ? '#5090d0' : '#d0a050',
                    fontSize: 9,
                    background: t.type === 'buy' ? '#0a1a2a' : '#2a1a0a',
                    padding: '1px 6px',
                    borderRadius: 3,
                  }}
                >
                  {t.type.toUpperCase()}
                </span>
                <span style={{ color: t.color, fontSize: 12 }}>{t.name}</span>
              </div>
              <span
                style={{
                  color:
                    t.type === 'sell'
                      ? t.profit >= 0
                        ? 'var(--good)'
                        : 'var(--bad)'
                      : 'var(--text-dim)',
                  fontSize: 12,
                }}
              >
                {t.type === 'sell'
                  ? (t.profit >= 0 ? '+' : '') + t.profit + 'cr'
                  : '-' + t.total + 'cr'}
              </span>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: 10,
                color: '#3a5a6a',
              }}
            >
              <span>
                {t.qty}× @{t.price}cr
                {t.type === 'sell'
                  ? ` (cost ${t.buyPrice}, ${t.profitPerUnit >= 0 ? '+' : ''}${t.profitPerUnit}/u)`
                  : ''}
              </span>
              <span>{t.system}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
