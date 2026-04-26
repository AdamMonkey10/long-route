import { useEffect, useState } from 'react'
import { SFX } from '../../game/sfx.js'
import { NpcList } from './blocks/NpcList.jsx'
import { DockBlock } from './blocks/DockBlock.jsx'
import { MarketBlock } from './blocks/MarketBlock.jsx'
import { ShipyardBlock } from './blocks/ShipyardBlock.jsx'
import { findGuideEntry } from '../../data/guide.js'
import { GuidePanel, GuideButton } from '../GuidePanel.jsx'
import { LocationIllustration } from '../illustrations/LocationIllustration.jsx'

export function LocationView({ state, dispatch, sys, loc, sessionState }) {
  const services = loc.services || []
  const guideEntry = findGuideEntry(sys.id, loc.id)
  const [showGuide, setShowGuide] = useState(false)

  useEffect(() => {
    if (!guideEntry || !sessionState) return
    if (!sessionState.seenGuide.has(guideEntry.id)) {
      sessionState.seenGuide.add(guideEntry.id)
      setShowGuide(true)
    }
  }, [guideEntry, sessionState])
  const hasDock = services.includes('repair') || services.includes('manifest')
  const hasMarket = services.includes('market')
  const hasShipyard = services.includes('shipyard')

  return (
    <div style={{ maxWidth: 520, margin: '0 auto', padding: '12px 16px' }} className="fade-in">
      {showGuide && guideEntry && (
        <GuidePanel entry={guideEntry} onDismiss={() => setShowGuide(false)} />
      )}

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 8,
        }}
      >
        <button
          onClick={() => {
            SFX.click()
            dispatch({ type: 'BACK_TO_CONCOURSE' })
          }}
          style={{
            background: 'none',
            border: '1px solid var(--border)',
            color: 'var(--text-faint)',
            padding: '4px 10px',
            borderRadius: 4,
            cursor: 'pointer',
            fontSize: 10,
            letterSpacing: 2,
          }}
        >
          ← {sys.concourse?.name?.toUpperCase() || 'CONCOURSE'}
        </button>
        <span style={{ color: 'var(--text-ghost)', fontSize: 10, letterSpacing: 2 }}>
          {sys.name.toUpperCase()}
        </span>
      </div>

      <div style={{ marginBottom: 12 }}>
        <LocationIllustration systemId={sys.id} locationId={loc.id} />
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
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            marginBottom: 6,
            gap: 8,
          }}
        >
          <div
            style={{
              color: 'var(--text-bright)',
              fontSize: 16,
              letterSpacing: 1,
            }}
          >
            {loc.name}
          </div>
          {guideEntry && <GuideButton onClick={() => setShowGuide(true)} />}
        </div>
        <div
          style={{
            color: '#a0b8c0',
            fontSize: 12,
            lineHeight: 1.7,
            marginBottom: loc.npcs?.length ? 12 : 0,
          }}
        >
          {loc.desc}
        </div>
        {loc.npcs?.length > 0 && (
          <NpcList state={state} dispatch={dispatch} npcIds={loc.npcs} />
        )}
      </div>

      {hasDock && <DockBlock state={state} dispatch={dispatch} sys={sys} services={services} />}
      {hasMarket && <MarketBlock state={state} dispatch={dispatch} sys={sys} />}
      {hasShipyard && <ShipyardBlock state={state} dispatch={dispatch} />}
    </div>
  )
}
