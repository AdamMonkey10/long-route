import { SFX } from '../game/sfx.js'

export function LogScreen({ state, dispatch }) {
  return (
    <div style={{ maxWidth: 520, margin: '0 auto', padding: 16 }} className="fade-in">
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 16,
        }}
      >
        <div
          style={{
            color: 'var(--text-ghost)',
            fontSize: 11,
            letterSpacing: 3,
          }}
        >
          CAPTAIN'S LOG
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
          background: 'var(--bg-panel)',
          border: '1px solid var(--border)',
          borderRadius: 8,
          padding: 16,
        }}
      >
        {state.gameLog.length === 0 ? (
          <div style={{ color: 'var(--text-ghost)', fontSize: 12 }}>
            The log is empty. Make some history.
          </div>
        ) : (
          state.gameLog.map((entry, i) => (
            <div
              key={i}
              style={{
                color:
                  i === 0
                    ? 'var(--text)'
                    : `hsl(200, 20%, ${Math.max(25, 55 - i * 1.5)}%)`,
                fontSize: 12,
                marginBottom: 8,
                lineHeight: 1.6,
                borderLeft: i === 0 ? '2px solid var(--border-accent)' : '2px solid #1a2a3a',
                paddingLeft: 10,
              }}
            >
              {entry}
            </div>
          ))
        )}
      </div>
    </div>
  )
}
