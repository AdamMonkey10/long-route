import { SFX } from '../game/sfx.js'

export function EventScreen({ state, dispatch }) {
  if (!state.event) return null
  const ev = state.event

  return (
    <div style={{ maxWidth: 520, margin: '0 auto', padding: 24 }} className="fade-in">
      <div
        style={{
          color: 'var(--text-faint)',
          fontSize: 10,
          letterSpacing: 3,
          marginBottom: 16,
        }}
      >
        HYPERSPACE EVENT
      </div>
      <div
        style={{
          background: 'var(--bg-panel)',
          border: '1px solid var(--border)',
          borderRadius: 8,
          padding: 20,
          marginBottom: 16,
        }}
      >
        <p
          style={{
            color: '#a0b8c0',
            fontSize: 14,
            lineHeight: 1.8,
            margin: 0,
            whiteSpace: 'pre-line',
          }}
        >
          {ev.text}
        </p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {ev.options.map((opt, i) => {
          const cantPay = opt.type === 'pay' && state.credits < opt.value
          const noCargo =
            (opt.type === 'info_trade' || opt.type === 'give_cargo') &&
            (() => {
              const need = opt.need || opt.id
              const qty = opt.qty
              const c = state.cargo.find(x => x.id === need)
              return !c || c.qty < qty
            })()
          const disabled = cantPay || noCargo

          return (
            <button
              key={i}
              onClick={() => {
                if (disabled) return
                SFX.click()
                dispatch({ type: 'RESOLVE_EVENT', option: opt })
              }}
              disabled={disabled}
              style={{
                padding: '14px 16px',
                background: disabled ? 'var(--bg-panel-lo)' : 'var(--bg-panel-hi)',
                border: '1px solid var(--border)',
                color: disabled ? 'var(--text-ghost)' : 'var(--text-mid)',
                borderRadius: 6,
                cursor: disabled ? 'default' : 'pointer',
                fontSize: 12,
                textAlign: 'left',
                lineHeight: 1.4,
                opacity: disabled ? 0.5 : 1,
              }}
            >
              <span style={{ color: '#2a5a8a' }}>▶ </span>
              {opt.text}
              {cantPay && (
                <span
                  style={{
                    display: 'block',
                    fontSize: 10,
                    color: '#6a3a3a',
                    marginTop: 2,
                  }}
                >
                  Can't afford this
                </span>
              )}
              {noCargo && (
                <span
                  style={{
                    display: 'block',
                    fontSize: 10,
                    color: '#6a3a3a',
                    marginTop: 2,
                  }}
                >
                  Not enough {opt.need || opt.id} in cargo
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
