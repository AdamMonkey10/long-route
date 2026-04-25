import { NPCS } from '../data/npcs.js'
import { Portrait } from './Portrait.jsx'
import { SFX } from '../game/sfx.js'

export function DialogueScreen({ state, dispatch }) {
  const { npcId, nodeId } = state.dialogue || {}
  const npc = npcId ? NPCS[npcId] : null
  if (!npc) return null
  const node = npc.tree[nodeId]
  if (!node) return null

  const text = node.text.replace(/\{name\}/g, state.playerName || 'Captain')

  return (
    <div style={{ maxWidth: 520, margin: '0 auto', padding: 16 }} className="fade-in">
      <div
        style={{
          background: 'var(--bg-panel)',
          border: '1px solid var(--border)',
          borderRadius: 8,
          padding: 16,
          marginBottom: 12,
          display: 'flex',
          gap: 16,
          alignItems: 'flex-start',
        }}
      >
        <Portrait id={npc.portrait} size={80} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ color: 'var(--text-bright)', fontSize: 16, marginBottom: 2 }}>
            {npc.name}
          </div>
          <div style={{ color: 'var(--text-faint)', fontSize: 11, marginBottom: 12 }}>
            {npc.title}
          </div>
          <div style={{ color: 'var(--text-ghost)', fontSize: 11 }}>◦ ◦ ◦</div>
        </div>
      </div>

      <div
        style={{
          background: 'var(--bg-panel)',
          border: '1px solid var(--border)',
          borderRadius: 8,
          padding: 16,
          marginBottom: 12,
        }}
      >
        <div
          style={{
            color: '#a0b8c0',
            fontSize: 13,
            lineHeight: 1.8,
            whiteSpace: 'pre-line',
          }}
        >
          {text}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {node.options.map((opt, i) => {
          if (opt.requireFlag && !state.flags[opt.requireFlag]) return null
          const cargoMissing =
            opt.requireCargo &&
            (() => {
              const c = state.cargo.find(x => x.id === opt.requireCargo)
              return !c || c.qty < opt.requireQty
            })()
          return (
            <button
              key={i}
              onClick={() => {
                if (cargoMissing) return
                SFX.click()
                dispatch({ type: 'CHOOSE_OPTION', option: opt })
              }}
              disabled={cargoMissing}
              style={{
                padding: '12px 16px',
                background: cargoMissing ? 'var(--bg-panel-lo)' : 'var(--bg-panel-hi)',
                border: `1px solid ${
                  cargoMissing ? '#1a2030' : opt.flag ? '#2a4a2a' : 'var(--border)'
                }`,
                color: cargoMissing
                  ? 'var(--text-ghost)'
                  : opt.flag
                    ? '#70a070'
                    : 'var(--text-mid)',
                borderRadius: 6,
                cursor: cargoMissing ? 'default' : 'pointer',
                fontSize: 12,
                textAlign: 'left',
                lineHeight: 1.4,
              }}
            >
              <span
                style={{
                  color: cargoMissing
                    ? '#303040'
                    : opt.flag
                      ? '#4a8a4a'
                      : '#2a5a8a',
                }}
              >
                ▶{' '}
              </span>
              {opt.text}
              {opt.flagLabel && (
                <span
                  style={{
                    display: 'block',
                    fontSize: 10,
                    color: '#4a6a4a',
                    marginTop: 4,
                  }}
                >
                  {opt.flagLabel}
                </span>
              )}
              {cargoMissing && (
                <span
                  style={{
                    display: 'block',
                    fontSize: 10,
                    color: '#6a3a3a',
                    marginTop: 2,
                  }}
                >
                  Requires {opt.requireQty} {opt.requireCargo}
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
