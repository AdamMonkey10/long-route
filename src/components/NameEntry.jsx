import { useState } from 'react'
import { SFX } from '../game/sfx.js'
import { Stars } from './Stars.jsx'

export function NameEntry({ dispatch, hasSave, onContinue }) {
  const [name, setName] = useState('')

  const launch = () => {
    if (!name.trim()) return
    SFX.click()
    dispatch({ type: 'SET_NAME', name: name.trim() })
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--bg-deep)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        color: 'var(--text)',
      }}
    >
      <Stars count={80} />
      <div style={{ position: 'relative', maxWidth: 480, width: '100%', textAlign: 'center' }}>
        <div style={{ color: '#2a5a8a', fontSize: 11, letterSpacing: 6, marginBottom: 8 }}>
          A GAME OF TRADING, DISCOVERY &amp; MILD PERIL
        </div>
        <h1
          style={{
            fontSize: 32,
            color: 'var(--text-bright)',
            margin: '0 0 4px',
            letterSpacing: 4,
            fontWeight: 400,
            textShadow: '0 0 20px rgba(74,175,224,0.3)',
          }}
        >
          THE LONG ROUTE
        </h1>
        <div style={{ color: '#304050', marginBottom: 24, fontSize: 12 }}>
          ──────────────────
        </div>

        {hasSave && (
          <div
            style={{
              background: '#0a1a2a',
              border: '1px solid var(--border-accent)',
              borderRadius: 8,
              padding: 14,
              marginBottom: 18,
              animation: 'fadeIn 0.4s ease',
            }}
          >
            <div style={{ color: 'var(--accent-2)', fontSize: 12, marginBottom: 10, letterSpacing: 1 }}>
              SAVED VOYAGE DETECTED
            </div>
            <button
              onClick={() => {
                SFX.click()
                onContinue()
              }}
              style={{
                width: '100%',
                padding: '12px',
                background: '#0a2a4a',
                border: '1px solid #2a6a9a',
                color: 'var(--accent)',
                borderRadius: 6,
                fontSize: 14,
                letterSpacing: 3,
                cursor: 'pointer',
                animation: 'pulseAccent 2s ease-in-out infinite',
              }}
            >
              CONTINUE
            </button>
            <div
              style={{
                color: 'var(--text-faint)',
                fontSize: 10,
                marginTop: 8,
                letterSpacing: 1,
              }}
            >
              or start a new voyage below (your save will remain)
            </div>
          </div>
        )}

        <div
          style={{
            background: 'var(--bg-panel-lo)',
            border: '1px solid var(--border-hi)',
            borderRadius: 8,
            padding: 22,
            textAlign: 'left',
            marginBottom: 22,
            lineHeight: 1.7,
          }}
        >
          <p style={{ margin: '0 0 12px', color: 'var(--text-mid)', fontSize: 13 }}>
            You have come into possession of a second-hand trading vessel called the{' '}
            <span style={{ color: 'var(--text-bright)' }}>Persistent Delusion</span>.
          </p>
          <p style={{ margin: '0 0 12px', color: 'var(--text-mid)', fontSize: 13 }}>
            You bought it from a salvage yard on Portsmith Station for considerably more than it
            was worth, because the previous owner left a forwarding address of{' '}
            <span style={{ color: 'var(--text)' }}>"none of your business"</span> and you found
            this intriguing.
          </p>
          <p style={{ margin: 0, color: 'var(--text-mid)', fontSize: 13 }}>
            You have <span style={{ color: 'var(--good)' }}>500 credits</span>, a ship with{' '}
            <span style={{ color: 'var(--good)' }}>20 cargo slots</span>, and no plan whatsoever.
            This is, statistically speaking, how most great things begin.
          </p>
        </div>

        <div style={{ marginBottom: 16 }}>
          <label
            style={{
              display: 'block',
              color: '#4080a0',
              fontSize: 11,
              letterSpacing: 2,
              marginBottom: 8,
            }}
          >
            CAPTAIN'S NAME
          </label>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && launch()}
            placeholder="..."
            maxLength={24}
            style={{
              width: '100%',
              background: 'var(--bg-panel-lo)',
              border: '1px solid var(--border-hi)',
              color: 'var(--text-bright)',
              padding: '10px 14px',
              borderRadius: 6,
              fontSize: 16,
              boxSizing: 'border-box',
            }}
            autoFocus
          />
        </div>
        <button
          onClick={launch}
          disabled={!name.trim()}
          style={{
            width: '100%',
            padding: '12px',
            background: name.trim() ? '#0a2a4a' : 'var(--bg-panel-lo)',
            border: `1px solid ${name.trim() ? '#2a6a9a' : '#1a2a3a'}`,
            color: name.trim() ? 'var(--accent)' : 'var(--text-ghost)',
            borderRadius: 6,
            fontSize: 14,
            letterSpacing: 3,
            cursor: name.trim() ? 'pointer' : 'default',
          }}
        >
          {hasSave ? 'NEW VOYAGE' : 'LAUNCH'}
        </button>
      </div>
    </div>
  )
}
