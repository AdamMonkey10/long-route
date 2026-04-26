import { useEffect } from 'react'

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
        aria-label="Guide entry"
        style={{
          width: 'min(440px, 92vw)',
          background: '#050a05',
          border: '2px solid #40ff80',
          borderRight: 'none',
          color: '#80ff80',
          padding: '14px 16px',
          fontFamily: "'Space Mono', ui-monospace, monospace",
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 0 24px rgba(64, 255, 128, 0.18) inset, -4px 0 30px rgba(64, 255, 128, 0.15)',
          overflowY: 'auto',
          position: 'relative',
        }}
      >
        <div className="guide-scanlines" aria-hidden />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10, position: 'relative' }}>
          <div>
            <div style={{ fontSize: 9, letterSpacing: 3, color: '#40c060', marginBottom: 3 }}>
              THE HITCHHIKER&apos;S GUIDE TO THE GALAXY
            </div>
            <div style={{ fontSize: 11, color: '#a0ffa0', letterSpacing: 1 }}>
              ENTRY: {entry.title}
            </div>
          </div>
          <button
            onClick={onDismiss}
            aria-label="Dismiss guide"
            style={{
              background: 'transparent',
              border: '1px solid #207040',
              color: '#60c080',
              width: 22,
              height: 22,
              borderRadius: 3,
              cursor: 'pointer',
              fontSize: 12,
              lineHeight: 1,
              padding: 0,
              flexShrink: 0,
            }}
          >
            ✕
          </button>
        </div>

        <div
          style={{
            color: '#80ff80',
            fontSize: 12,
            lineHeight: 1.7,
            whiteSpace: 'pre-wrap',
            flex: 1,
            position: 'relative',
            textShadow: '0 0 6px rgba(80, 255, 128, 0.2)',
          }}
        >
          {entry.text}
        </div>

        <div
          style={{
            marginTop: 16,
            paddingTop: 10,
            borderTop: '1px dashed #207040',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            color: '#40c060',
            fontSize: 9,
            letterSpacing: 3,
            position: 'relative',
          }}
        >
          <span>DON&apos;T PANIC</span>
          <span style={{ color: '#205a30' }}>END OF ENTRY</span>
        </div>
      </div>
    </div>
  )
}

// Small inline button that re-opens the guide panel from a location header.
export function GuideButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      title="Re-open Guide entry"
      aria-label="Open Guide entry"
      style={{
        background: '#0a1408',
        border: '1px solid #207040',
        color: '#60c080',
        padding: '4px 8px',
        borderRadius: 4,
        cursor: 'pointer',
        fontSize: 11,
        letterSpacing: 1,
      }}
    >
      📖 GUIDE
    </button>
  )
}
