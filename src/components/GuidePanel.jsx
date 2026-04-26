import { useEffect } from 'react'

// The Compendium reads as a dedicated CRT screen the player consults — VT323
// pixel-font on near-black phosphor green, scanlines, soft vignette, glow.
// Everything in the Style Guide §05 lands here.

export function GuidePanel({ entry, onDismiss }) {
  useEffect(() => {
    const onKey = e => {
      if (e.key === 'Escape') onDismiss()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onDismiss])

  if (!entry) return null

  return (
    <div
      className="guide-overlay"
      onClick={onDismiss}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 5, 0, 0.55)',
        zIndex: 400,
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'stretch',
      }}
    >
      <div
        className="guide-panel"
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-label="Compendium entry"
        style={{
          width: 'min(560px, 96vw)',
          background: 'var(--phosphor-bg)',
          border: '1px solid #0a3a18',
          borderRight: 'none',
          color: 'var(--phosphor)',
          padding: '24px 26px 28px',
          fontFamily: 'var(--font-phosphor)',
          display: 'flex',
          flexDirection: 'column',
          boxShadow:
            'inset 0 0 80px rgba(0, 60, 20, 0.5), inset 0 0 8px rgba(127, 255, 138, 0.08), -8px 0 30px rgba(0,0,0,0.55)',
          textShadow: '0 0 6px var(--phosphor-glow), 0 0 1px var(--phosphor)',
          overflowY: 'auto',
          position: 'relative',
        }}
      >
        <div className="guide-scanlines" aria-hidden />
        <div className="guide-vignette" aria-hidden />

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            paddingBottom: 8,
            marginBottom: 14,
            borderBottom: '1px solid var(--phosphor-dim)',
            position: 'relative',
            fontSize: 18,
            letterSpacing: 2,
          }}
        >
          <span style={{ fontWeight: 700, color: 'var(--phosphor)' }}>▌ COMPENDIUM</span>
          <button
            onClick={onDismiss}
            aria-label="Dismiss Compendium entry"
            style={{
              background: 'transparent',
              border: '1px solid var(--phosphor-dim)',
              color: 'var(--phosphor)',
              width: 24,
              height: 24,
              borderRadius: 3,
              cursor: 'pointer',
              fontSize: 14,
              lineHeight: 1,
              padding: 0,
              flexShrink: 0,
              fontFamily: 'inherit',
            }}
          >
            ✕
          </button>
        </div>

        <div
          style={{
            color: 'var(--phosphor-dim)',
            fontSize: 14,
            letterSpacing: 2,
            marginBottom: 6,
            position: 'relative',
          }}
        >
          THE INDEPENDENT TRAVELLER&apos;S COMPENDIUM TO FRONTIER SPACE
        </div>
        <div
          style={{
            color: 'var(--phosphor-dim)',
            fontSize: 13,
            letterSpacing: 2,
            marginBottom: 14,
            position: 'relative',
          }}
        >
          — Free Cartographers&apos; Association
        </div>

        <div
          style={{
            color: 'var(--phosphor)',
            fontSize: 24,
            letterSpacing: 1,
            lineHeight: 1.1,
            marginBottom: 18,
            position: 'relative',
          }}
        >
          ENTRY: {entry.title}
        </div>

        <div
          style={{
            color: 'var(--phosphor)',
            fontSize: 20,
            lineHeight: 1.4,
            letterSpacing: 0.5,
            whiteSpace: 'pre-wrap',
            flex: 1,
            position: 'relative',
          }}
        >
          {entry.text}
        </div>

        <div
          style={{
            marginTop: 22,
            paddingTop: 10,
            borderTop: '1px solid var(--phosphor-dim)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            color: 'var(--phosphor-dim)',
            fontSize: 14,
            letterSpacing: 2,
            position: 'relative',
          }}
        >
          <span>DON&apos;T GET LOST.</span>
          <span>
            <span className="guide-cursor" aria-hidden>█</span> END OF ENTRY
          </span>
        </div>
      </div>
    </div>
  )
}

// Small inline button that re-opens the Compendium panel from a location header.
export function GuideButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      title="Re-open Compendium entry"
      aria-label="Open Compendium entry"
      style={{
        background: '#0a1408',
        border: '1px solid #207040',
        color: '#60c080',
        padding: '4px 8px',
        borderRadius: 4,
        cursor: 'pointer',
        fontSize: 11,
        letterSpacing: 1,
        fontFamily: 'var(--font-mono)',
      }}
    >
      ▤ COMPENDIUM
    </button>
  )
}
