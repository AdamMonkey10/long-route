import { useEffect, useState, useRef } from 'react'
import { SYSTEMS } from '../data/systems.js'

// Persistent comms-channel-style panel for ARC-7. Always visible (except on
// the name entry screen), collapsible, fades in when the message changes.

export function Arc7Panel({ state, dispatch }) {
  const arc7 = state.arc7
  const [visibleMsg, setVisibleMsg] = useState(arc7?.currentMessage || null)
  const [fading, setFading] = useState(false)
  const incoming = useRef(arc7?.currentMessage)

  // When the message in state changes, fade out, swap, fade in.
  useEffect(() => {
    if (!arc7) return
    if (arc7.currentMessage === incoming.current) return
    incoming.current = arc7.currentMessage
    if (!arc7.currentMessage) {
      setVisibleMsg(null)
      return
    }
    setFading(true)
    const t = setTimeout(() => {
      setVisibleMsg(arc7.currentMessage)
      setFading(false)
    }, 200)
    return () => clearTimeout(t)
  }, [arc7?.currentMessage])

  if (!arc7?.currentMessage) return null

  const collapsed = !!arc7.collapsed
  const sysName = arc7.lastSystem || SYSTEMS[state.currentSystem]?.name || ''
  const stamp = `JUMP ${String(arc7.jumpCount || 0).padStart(2, '0')} · ${sysName}`

  // Collapsed bar
  if (collapsed) {
    return (
      <button
        onClick={() => dispatch({ type: 'ARC7_TOGGLE_COLLAPSE' })}
        className="arc7-collapsed"
        aria-label="Expand ARC-7 panel"
        style={{
          position: 'fixed',
          left: 0,
          right: 0,
          bottom: 0,
          background: '#050d14',
          borderTop: '1px solid #0a1a18',
          borderLeft: '2px solid #2a5a4a',
          color: '#2a6a5a',
          padding: '6px 14px',
          fontFamily: "'Space Mono', ui-monospace, monospace",
          fontSize: 10,
          letterSpacing: 3,
          textAlign: 'left',
          cursor: 'pointer',
          zIndex: 50,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span>
          ARC-7
          {arc7.hasNew && (
            <span
              className="arc7-pulse-dot"
              aria-hidden
              style={{
                display: 'inline-block',
                width: 7,
                height: 7,
                borderRadius: '50%',
                background: '#40c080',
                marginLeft: 8,
                verticalAlign: 'baseline',
              }}
            />
          )}
        </span>
        <span style={{ color: '#1a3a2a' }}>▴</span>
      </button>
    )
  }

  return (
    <div
      className="arc7-panel"
      style={{
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: 0,
        background: '#050d14',
        borderTop: '1px solid #0a1a18',
        borderLeft: '2px solid #2a5a4a',
        padding: '10px 14px 12px',
        fontFamily: "'Space Mono', ui-monospace, monospace",
        zIndex: 50,
        boxShadow: '0 -6px 18px rgba(0,0,0,0.4)',
        maxHeight: '40vh',
        overflowY: 'auto',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 6,
        }}
      >
        <span
          style={{
            color: '#2a6a5a',
            fontSize: 10,
            letterSpacing: 3,
          }}
        >
          ARC-7
        </span>
        <button
          onClick={() => dispatch({ type: 'ARC7_TOGGLE_COLLAPSE' })}
          aria-label="Collapse ARC-7 panel"
          style={{
            background: 'transparent',
            border: 'none',
            color: '#2a6a5a',
            cursor: 'pointer',
            fontSize: 14,
            padding: 0,
            lineHeight: 1,
          }}
        >
          ▾
        </button>
      </div>
      <div
        className={fading ? '' : 'arc7-message-in'}
        style={{
          color: '#80c0a0',
          fontSize: 13,
          lineHeight: 1.7,
          fontStyle: 'italic',
          whiteSpace: 'pre-line',
          opacity: fading ? 0 : 1,
          transition: 'opacity 0.2s ease',
        }}
      >
        {visibleMsg}
      </div>
      <div
        style={{
          color: '#1a3a2a',
          fontSize: 9,
          letterSpacing: 2,
          marginTop: 8,
        }}
      >
        {stamp}
      </div>
    </div>
  )
}
