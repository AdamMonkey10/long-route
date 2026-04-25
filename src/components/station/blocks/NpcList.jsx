import { NPCS } from '../../../data/npcs.js'
import { Portrait } from '../../Portrait.jsx'
import { SFX } from '../../../game/sfx.js'

export function NpcList({ state, dispatch, npcIds, dense = false }) {
  const npcs = (npcIds || []).map(id => NPCS[id]).filter(Boolean)
  if (npcs.length === 0) return null

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {npcs.map(npc => {
        const seen = !!state.npcSeen[npc.id]
        return (
          <button
            key={npc.id}
            onClick={() => {
              SFX.click()
              dispatch({ type: 'START_DIALOGUE', npcId: npc.id })
            }}
            style={{
              width: '100%',
              background: 'var(--bg-panel)',
              border: '1px solid var(--border)',
              borderRadius: 8,
              padding: dense ? 10 : 12,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              textAlign: 'left',
            }}
          >
            <Portrait id={npc.portrait} size={dense ? 48 : 56} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                <span style={{ color: 'var(--text-bright)', fontSize: 14 }}>{npc.name}</span>
                {!seen && (
                  <span
                    style={{
                      color: 'var(--accent-2)',
                      fontSize: 9,
                      letterSpacing: 1,
                      background: '#0a1a2a',
                      padding: '1px 5px',
                      borderRadius: 3,
                    }}
                  >
                    NEW
                  </span>
                )}
              </div>
              <div style={{ color: 'var(--text-faint)', fontSize: 11 }}>{npc.title}</div>
              {!dense && (
                <div
                  style={{
                    color: 'var(--text-dim)',
                    fontSize: 11,
                    marginTop: 4,
                    fontStyle: 'italic',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {npc.greeting}
                </div>
              )}
            </div>
          </button>
        )
      })}
    </div>
  )
}
