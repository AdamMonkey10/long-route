import { canVisitLocation, visibleLocations } from '../../game/utils.js'
import { NpcList } from './blocks/NpcList.jsx'
import { SFX } from '../../game/sfx.js'

const SERVICE_GLYPH = {
  repair: '⛁',
  manifest: '⬢',
  market: '⬡',
  shipyard: '⚙',
}

const SERVICE_LABEL = {
  repair: 'Repair',
  manifest: 'Manifest',
  market: 'Market',
  shipyard: 'Shipyard',
}

function LocationCard({ state, dispatch, loc }) {
  const visitable = canVisitLocation(state, loc)
  const npcCount = (loc.npcs || []).length

  const onClick = () => {
    if (!visitable) {
      dispatch({
        type: 'NOTIFY',
        msg: loc.unlockReq?.label
          ? `🔒 ${loc.unlockReq.label}`
          : '🔒 Locked.',
      })
      return
    }
    SFX.click()
    dispatch({ type: 'GO_LOCATION', id: loc.id, effect: loc.visitEffect || null })
  }

  return (
    <button
      onClick={onClick}
      style={{
        width: '100%',
        background: visitable ? 'var(--bg-panel)' : 'var(--bg-panel-lo)',
        border: `1px solid ${visitable ? 'var(--border)' : '#1a2030'}`,
        borderStyle: visitable ? 'solid' : 'dashed',
        borderRadius: 8,
        padding: 12,
        cursor: 'pointer',
        textAlign: 'left',
        opacity: visitable ? 1 : 0.7,
        marginBottom: 8,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          marginBottom: 4,
        }}
      >
        <span
          style={{
            color: visitable ? 'var(--text-bright)' : 'var(--text-faint)',
            fontSize: 13,
            letterSpacing: 1,
          }}
        >
          {visitable ? '' : '🔒 '}
          {loc.name}
        </span>
        <span style={{ color: 'var(--text-ghost)', fontSize: 10, letterSpacing: 1 }}>
          {(loc.services || [])
            .filter(s => SERVICE_GLYPH[s])
            .map(s => SERVICE_GLYPH[s])
            .join(' ')}
          {npcCount > 0 && (
            <span style={{ marginLeft: 6, color: 'var(--accent)' }}>● {npcCount}</span>
          )}
        </span>
      </div>
      <div
        style={{
          color: 'var(--text-dim)',
          fontSize: 11,
          lineHeight: 1.5,
        }}
      >
        {visitable ? loc.desc : loc.unlockReq?.label || 'Locked.'}
      </div>
      {visitable && (loc.services || []).length > 0 && (
        <div
          style={{
            color: 'var(--text-faint)',
            fontSize: 10,
            marginTop: 6,
            letterSpacing: 1,
          }}
        >
          {loc.services
            .filter(s => SERVICE_LABEL[s])
            .map(s => SERVICE_LABEL[s])
            .join(' · ')}
        </div>
      )}
    </button>
  )
}

export function ConcourseView({ state, dispatch, sys }) {
  const concourse = sys.concourse || { name: sys.name, desc: sys.desc, npcs: [] }
  const locs = visibleLocations(state, sys)

  return (
    <div style={{ maxWidth: 520, margin: '0 auto', padding: '12px 16px' }} className="fade-in">
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
      <div style={{ color: 'var(--text-bright)', fontSize: 16, marginBottom: 4 }}>
        {sys.name}{' '}
        <span style={{ color: 'var(--text-faint)', fontSize: 11 }}>// {sys.economy}</span>
      </div>
      <div
        style={{
          color: 'var(--text-faint)',
          fontSize: 11,
          letterSpacing: 1,
          marginBottom: 14,
        }}
      >
        {concourse.name.toUpperCase()}
      </div>

      <div
        style={{
          background: 'var(--bg-panel)',
          border: '1px solid var(--border)',
          borderRadius: 8,
          padding: 14,
          marginBottom: 14,
        }}
      >
        <div
          style={{
            color: '#a0b8c0',
            fontSize: 13,
            lineHeight: 1.7,
            marginBottom: concourse.npcs?.length ? 12 : 0,
          }}
        >
          {concourse.desc}
        </div>
        {concourse.npcs?.length > 0 && (
          <NpcList state={state} dispatch={dispatch} npcIds={concourse.npcs} dense />
        )}
      </div>

      <div
        style={{
          color: 'var(--text-faint)',
          fontSize: 10,
          letterSpacing: 2,
          marginBottom: 8,
        }}
      >
        LOCATIONS
      </div>
      {locs.length === 0 ? (
        <div style={{ color: 'var(--text-ghost)', fontSize: 12 }}>
          No accessible locations here.
        </div>
      ) : (
        locs.map(loc => (
          <LocationCard key={loc.id} state={state} dispatch={dispatch} loc={loc} />
        ))
      )}
    </div>
  )
}
