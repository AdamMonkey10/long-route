import { useState, useEffect, useRef } from 'react'
import { SFX } from '../game/sfx.js'
import { downloadSave, importSave, wipeSave, exportSave } from '../game/save.js'
import { SYSTEMS } from '../data/systems.js'

const sectionStyle = {
  background: 'var(--bg-panel)',
  border: '1px solid var(--border)',
  borderRadius: 8,
  padding: 14,
  marginBottom: 12,
}

const labelStyle = {
  color: 'var(--text-faint)',
  fontSize: 10,
  letterSpacing: 2,
  marginBottom: 8,
}

const btn = (variant = 'default') => {
  const palette = {
    default: { bg: 'var(--bg-panel-hi)', border: 'var(--border)', color: 'var(--text)' },
    accent: { bg: '#0a2a4a', border: 'var(--border-accent)', color: 'var(--accent)' },
    good: { bg: '#0a2a0a', border: '#2a5a2a', color: 'var(--good)' },
    danger: { bg: '#2a0a0a', border: '#5a1a1a', color: 'var(--bad)' },
  }[variant]
  return {
    padding: '8px 14px',
    background: palette.bg,
    border: `1px solid ${palette.border}`,
    color: palette.color,
    borderRadius: 6,
    cursor: 'pointer',
    fontSize: 11,
    letterSpacing: 1,
  }
}

export function SettingsScreen({ state, dispatch, onNewGame, savedAt }) {
  const [muted, setMuted] = useState(SFX.isMuted())
  const [confirmWipe, setConfirmWipe] = useState(false)
  const [confirmNew, setConfirmNew] = useState(false)
  const [importText, setImportText] = useState('')
  const [importErr, setImportErr] = useState(null)
  const [showImport, setShowImport] = useState(false)
  const [statusMsg, setStatusMsg] = useState(null)
  const fileInputRef = useRef(null)

  useEffect(() => {
    if (!statusMsg) return
    const t = setTimeout(() => setStatusMsg(null), 3000)
    return () => clearTimeout(t)
  }, [statusMsg])

  const flashStatus = msg => setStatusMsg(msg)

  const toggleMute = () => {
    const next = SFX.toggleMute()
    setMuted(next)
    if (!next) SFX.click()
    flashStatus(next ? 'Audio muted.' : 'Audio enabled.')
  }

  const doExport = () => {
    SFX.click()
    if (downloadSave()) flashStatus('Save downloaded.')
    else flashStatus('No save to export.')
  }

  const copyToClipboard = async () => {
    SFX.click()
    const raw = exportSave()
    if (!raw) {
      flashStatus('No save to copy.')
      return
    }
    try {
      await navigator.clipboard.writeText(raw)
      flashStatus('Save copied to clipboard.')
    } catch {
      flashStatus('Clipboard unavailable.')
    }
  }

  const doImport = () => {
    const result = importSave(importText)
    if (!result.ok) {
      setImportErr(result.error)
      return
    }
    SFX.upgrade()
    setImportErr(null)
    setImportText('')
    setShowImport(false)
    flashStatus('Save imported. Reloading…')
    setTimeout(() => dispatch({ type: 'LOAD_STATE', state: result.state }), 400)
  }

  const handleFile = e => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      setImportText(String(reader.result || ''))
      setShowImport(true)
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  const doWipe = () => {
    SFX.click()
    wipeSave()
    flashStatus('Save wiped.')
    setConfirmWipe(false)
  }

  const doNew = () => {
    SFX.click()
    onNewGame()
    setConfirmNew(false)
  }

  const visited = state.visitedSystems?.length || 0
  const flagsCount = Object.keys(state.flags || {}).filter(k => state.flags[k]).length

  return (
    <div style={{ maxWidth: 520, margin: '0 auto', padding: 16 }} className="fade-in">
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 14,
        }}
      >
        <div
          style={{
            color: 'var(--text-ghost)',
            fontSize: 11,
            letterSpacing: 3,
          }}
        >
          SETTINGS
        </div>
        <button onClick={() => dispatch({ type: 'GOTO_MAP' })} style={btn('default')}>
          BACK
        </button>
      </div>

      {statusMsg && (
        <div
          style={{
            background: '#0a1a2a',
            border: '1px solid var(--border-accent)',
            color: 'var(--accent-2)',
            padding: '8px 12px',
            borderRadius: 6,
            fontSize: 11,
            marginBottom: 12,
            textAlign: 'center',
            animation: 'fadeIn 0.2s ease',
          }}
        >
          {statusMsg}
        </div>
      )}

      <div style={sectionStyle}>
        <div style={labelStyle}>CAPTAIN</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, fontSize: 12 }}>
          <Stat label="Name" val={state.playerName || '—'} />
          <Stat label="Credits" val={state.credits.toLocaleString() + 'cr'} color="var(--good)" />
          <Stat label="Earned" val={(state.creditsEarned || 0).toLocaleString() + 'cr'} />
          <Stat label="Net P&L" val={`${(state.totalProfit || 0) - (state.totalLoss || 0)}cr`} />
          <Stat label="Visited" val={`${visited}/${Object.keys(SYSTEMS).length} systems`} />
          <Stat label="Discoveries" val={`${flagsCount} flags`} />
          <Stat label="Hull" val={`${state.hull}/${state.maxHull}`} />
          <Stat label="Cargo" val={`${state.cargo.length} types`} />
        </div>
      </div>

      <div style={sectionStyle}>
        <div style={labelStyle}>AUDIO</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={toggleMute} style={btn(muted ? 'danger' : 'good')}>
            {muted ? '🔇 SFX MUTED' : '🔊 SFX ON'}
          </button>
          <span style={{ color: 'var(--text-dim)', fontSize: 11 }}>
            {muted ? 'No sound effects.' : 'Click & combat sounds enabled.'}
          </span>
        </div>
      </div>

      <div style={sectionStyle}>
        <div style={labelStyle}>SAVE DATA</div>
        <div style={{ color: 'var(--text-dim)', fontSize: 11, marginBottom: 10 }}>
          Auto-saved {savedAt ? new Date(savedAt).toLocaleString() : 'never'}.
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          <button onClick={doExport} style={btn('default')}>
            ⬇ DOWNLOAD
          </button>
          <button onClick={copyToClipboard} style={btn('default')}>
            ⧉ COPY JSON
          </button>
          <button
            onClick={() => {
              SFX.click()
              setShowImport(s => !s)
              setImportErr(null)
            }}
            style={btn('default')}
          >
            ⬆ PASTE JSON
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            style={btn('default')}
          >
            ⬆ FROM FILE
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json,application/json"
            onChange={handleFile}
            style={{ display: 'none' }}
          />
        </div>
        {showImport && (
          <div style={{ marginTop: 10 }}>
            <textarea
              value={importText}
              onChange={e => setImportText(e.target.value)}
              placeholder="Paste save JSON here…"
              rows={5}
              style={{
                width: '100%',
                background: 'var(--bg-panel-lo)',
                border: '1px solid var(--border-hi)',
                color: 'var(--text)',
                padding: 10,
                borderRadius: 6,
                fontSize: 11,
                fontFamily: "'Space Mono', monospace",
                resize: 'vertical',
              }}
            />
            {importErr && (
              <div style={{ color: 'var(--bad)', fontSize: 11, marginTop: 6 }}>
                {importErr}
              </div>
            )}
            <div style={{ marginTop: 8 }}>
              <button onClick={doImport} disabled={!importText.trim()} style={btn('accent')}>
                LOAD SAVE
              </button>
            </div>
          </div>
        )}
      </div>

      <div style={sectionStyle}>
        <div style={labelStyle}>DANGER ZONE</div>
        <div
          style={{
            color: 'var(--text-dim)',
            fontSize: 11,
            marginBottom: 10,
            lineHeight: 1.5,
          }}
        >
          Both options below will end your current voyage. Export your save first if you want to keep it.
        </div>

        {!confirmNew ? (
          <button
            onClick={() => setConfirmNew(true)}
            style={{ ...btn('default'), marginRight: 6, marginBottom: 6 }}
          >
            ⟲ NEW VOYAGE
          </button>
        ) : (
          <div
            style={{
              background: '#1a1010',
              border: '1px solid #5a3a3a',
              borderRadius: 6,
              padding: 10,
              marginBottom: 8,
            }}
          >
            <div style={{ color: 'var(--bad)', fontSize: 11, marginBottom: 8 }}>
              Start a new voyage? Your current progress will be overwritten.
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              <button onClick={doNew} style={btn('danger')}>
                YES, RESTART
              </button>
              <button onClick={() => setConfirmNew(false)} style={btn('default')}>
                CANCEL
              </button>
            </div>
          </div>
        )}

        {!confirmWipe ? (
          <button onClick={() => setConfirmWipe(true)} style={btn('default')}>
            🗑 WIPE SAVE
          </button>
        ) : (
          <div
            style={{
              background: '#1a1010',
              border: '1px solid #5a3a3a',
              borderRadius: 6,
              padding: 10,
            }}
          >
            <div style={{ color: 'var(--bad)', fontSize: 11, marginBottom: 8 }}>
              Wipe save data from this device? This does not affect the current session — it only
              removes the auto-save record.
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              <button onClick={doWipe} style={btn('danger')}>
                YES, WIPE
              </button>
              <button onClick={() => setConfirmWipe(false)} style={btn('default')}>
                CANCEL
              </button>
            </div>
          </div>
        )}
      </div>

      <div style={{ color: 'var(--text-ghost)', fontSize: 10, textAlign: 'center', marginTop: 14 }}>
        v3.4 · Voice & memory · {Object.keys(SYSTEMS).length} systems · Save format v3
      </div>
    </div>
  )
}

function Stat({ label, val, color }) {
  return (
    <div>
      <div style={{ color: 'var(--text-ghost)', fontSize: 9, letterSpacing: 1 }}>{label}</div>
      <div style={{ color: color || 'var(--text)', fontSize: 13, marginTop: 2 }}>{val}</div>
    </div>
  )
}
