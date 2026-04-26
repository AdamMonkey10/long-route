import { EDDA_LOG, EDDA_NAV_TRAIL } from '../data/edda_log.js'
import { SFX } from '../game/sfx.js'

export function ShipLogScreen({ state, dispatch }) {
  const decrypted = !!state.flags?.decryption_complete
  const compartmentOpened = !!state.flags?.compartment_opened
  const compartmentResolved = !!state.flags?.compartment_resolved
  const scripHeld = !!state.flags?.frontier_scrip
  const visitedCount = state.visitedSystems?.length || 0
  const compartmentReady = visitedCount >= 3

  return (
    <div style={{ maxWidth: 540, margin: '0 auto', padding: 16 }} className="fade-in">
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 14,
        }}
      >
        <div style={{ color: 'var(--text-ghost)', fontSize: 11, letterSpacing: 3 }}>
          PERSISTENT DELUSION — SHIP LOG
        </div>
        <button
          onClick={() => {
            SFX.click()
            dispatch({ type: 'GOTO_STATION', location: 'docking_bay' })
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

      {/* Edda's maintenance logs */}
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
            color: 'var(--text-faint)',
            fontSize: 10,
            letterSpacing: 2,
            marginBottom: 12,
          }}
        >
          MAINTENANCE LOGS — PREVIOUS OWNER
        </div>
        <div style={{ color: 'var(--text-dim)', fontSize: 11, lineHeight: 1.5, marginBottom: 12, fontStyle: 'italic' }}>
          Eight short entries left on the ship. Whoever wrote them did so over
          several months, then stopped abruptly. Sometime around eight years
          ago.
        </div>
        {EDDA_LOG.map((entry, i) => (
          <div
            key={i}
            style={{
              padding: '10px 0',
              borderBottom: i < EDDA_LOG.length - 1 ? '1px solid var(--border-dim)' : 'none',
            }}
          >
            <div
              style={{
                color: 'var(--accent)',
                fontSize: 9,
                letterSpacing: 2,
                marginBottom: 4,
              }}
            >
              {entry.day}
            </div>
            <div
              style={{
                color: '#a0b8c0',
                fontSize: 12,
                lineHeight: 1.6,
                fontStyle: 'italic',
              }}
            >
              {entry.text}
            </div>
          </div>
        ))}
      </div>

      {/* Nav history */}
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
            color: 'var(--text-faint)',
            fontSize: 10,
            letterSpacing: 2,
            marginBottom: 12,
          }}
        >
          NAVIGATION HISTORY {decrypted ? '— DECRYPTED' : '— ENCRYPTED'}
        </div>
        {decrypted ? (
          <>
            <div style={{ color: 'var(--text-dim)', fontSize: 11, lineHeight: 1.5, marginBottom: 10, fontStyle: 'italic' }}>
              Edda's last six recorded jumps before going dark.
            </div>
            {EDDA_NAV_TRAIL.map((stop, i) => (
              <div
                key={i}
                style={{
                  padding: '8px 0',
                  borderBottom: i < EDDA_NAV_TRAIL.length - 1 ? '1px solid var(--border-dim)' : 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                }}
              >
                <div style={{ color: 'var(--text-bright)', fontSize: 12 }}>
                  <span style={{ color: 'var(--accent)', marginRight: 8 }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {stop.system}
                </div>
                <div style={{ color: 'var(--text-dim)', fontSize: 11, fontStyle: 'italic', paddingLeft: 24 }}>
                  {stop.note}
                </div>
              </div>
            ))}
          </>
        ) : (
          <div
            style={{
              fontFamily: "'Space Mono', monospace",
              color: 'var(--text-ghost)',
              fontSize: 11,
              lineHeight: 1.6,
              padding: '4px 0',
            }}
          >
            <div>NAV.LOG.7741.ENCRYPTED — KEY MISSING</div>
            <div style={{ color: '#3a4a5a', marginTop: 6 }}>
              ▒▒░▒▒░░▒░▒▒░░▒░▒▒░▒░░▒▒░▒░░▒▒░▒░▒░▒░░▒▒░▒░░▒
              <br />
              ░▒░▒▒░░▒░▒░▒▒░░▒░▒░▒░▒▒░░▒░▒░▒▒░░▒░▒░▒▒░░▒▒
              <br />
              ▒▒░░▒░▒▒░▒░░▒░▒░▒▒░▒░░▒▒░░▒░▒▒░▒░░▒░▒▒░░▒░▒
            </div>
            <div style={{ color: 'var(--text-faint)', marginTop: 8, fontSize: 10 }}>
              {state.flags?.has_data_core
                ? '→ Decryption requires the original key. Edda left one with Keeper Isha at Kessel Expanse.'
                : '→ Source data core not yet retrieved.'}
            </div>
          </div>
        )}
      </div>

      {/* Hidden compartment */}
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
            color: 'var(--text-faint)',
            fontSize: 10,
            letterSpacing: 2,
            marginBottom: 12,
          }}
        >
          CABIN
        </div>

        {!compartmentOpened && !compartmentReady && (
          <div style={{ color: 'var(--text-ghost)', fontSize: 11, lineHeight: 1.6 }}>
            The cabin is small and tidy. There's nothing immediately interesting
            in it.
            <div style={{ color: 'var(--text-faint)', fontSize: 10, marginTop: 6 }}>
              ({visitedCount} system{visitedCount === 1 ? '' : 's'} visited; the
              ship hasn't quite stopped feeling new.)
            </div>
          </div>
        )}

        {!compartmentOpened && compartmentReady && (
          <>
            <div style={{ color: 'var(--text-dim)', fontSize: 12, lineHeight: 1.6, marginBottom: 10 }}>
              Now you've spent some time in it, the cabin doesn't feel quite as
              tidy as it did. The locker drawers don't all close the same way.
              The bunk has a panel that doesn't quite sit flush.
            </div>
            <button
              onClick={() => {
                SFX.click()
                dispatch({ type: 'SEARCH_CABIN' })
              }}
              style={{
                width: '100%',
                padding: '10px',
                background: '#0a2a4a',
                border: '1px solid var(--border-accent)',
                color: 'var(--accent)',
                borderRadius: 6,
                cursor: 'pointer',
                fontSize: 12,
                letterSpacing: 1,
              }}
            >
              [Search the cabin properly.]
            </button>
          </>
        )}

        {compartmentOpened && (
          <div style={{ color: 'var(--text)', fontSize: 12, lineHeight: 1.7 }}>
            Behind the bunk panel: a small compartment, machined neatly into the
            hull. Inside —
            <ul style={{ margin: '10px 0 10px 20px', padding: 0, color: 'var(--text-dim)' }}>
              <li>A photograph. Two people on a station observation deck. The
                photograph is creased like it's been carried for a long time.</li>
              <li>A handwritten note, folded once. It reads: <em>"If you found
                this, you're the right kind of person. The Chaplain on The Sump
                knows what to do with the scrip. — E."</em></li>
              <li>A small bundle of old Frontier Faction scrip. Thirty credits
                in face value. Out of circulation for thirteen years.</li>
            </ul>
            <div
              style={{
                color: 'var(--text-faint)',
                fontSize: 11,
                fontStyle: 'italic',
                marginTop: 8,
              }}
            >
              The note is signed E. The photograph isn't. The scrip is real.
            </div>
            {scripHeld && !compartmentResolved && (
              <div
                style={{
                  color: 'var(--accent-2)',
                  fontSize: 11,
                  marginTop: 12,
                  padding: '8px 10px',
                  background: '#0a1a2a',
                  borderRadius: 4,
                  border: '1px solid var(--border-accent)',
                }}
              >
                You're carrying the scrip. The Chaplain on the Sump is waiting.
              </div>
            )}
            {compartmentResolved && (
              <div
                style={{
                  color: 'var(--good)',
                  fontSize: 11,
                  marginTop: 12,
                  padding: '8px 10px',
                  background: '#0a2010',
                  borderRadius: 4,
                  border: '1px solid #1a4a1a',
                }}
              >
                ✓ The scrip has been delivered. The note's job is done.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
