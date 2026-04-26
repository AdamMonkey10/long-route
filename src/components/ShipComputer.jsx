// The Persistent Delusion's onboard advisory voice. Mild,
// slightly-too-calm, technically reassuring.

function pickMessage(state) {
  const hullPct = state.hull / state.maxHull
  const credits = state.credits || 0

  if (state.combat) {
    return "Combat situation detected. The computer notes that the odds of survival are not zero. The computer declines to be more specific than that."
  }

  if (state.currentSystem === 'exodus') {
    return "Location: Exodus Point. The computer notes that this is, technically, the end of the map. The computer declines to speculate about what this means. The computer suggests you might want your towel."
  }

  if (state.flags?.decryption_complete && !state.flags?.game_complete) {
    return "Data core decrypted. Contents noted. The computer would like to register, for the record, that it finds the implications significant. The computer is, after all, on this ship too."
  }

  if (state.flags?.has_data_core && !state.flags?.decryption_complete) {
    return "Encrypted object detected in cargo. The computer is not curious about its contents. The computer is, in fact, extremely curious about its contents. The computer will not ask."
  }

  if (hullPct < 0.3) {
    return "DON'T PANIC. Hull critical. This is a concerning development. The computer would like to note that panic, while understandable, is statistically unhelpful."
  }

  if (hullPct < 0.6) {
    return "Hull integrity reduced. The ship remains, technically speaking, intact. This is good. The alternative is not."
  }

  if (hullPct < 0.8) {
    return "Minor hull damage detected. This is statistically normal. Most ships sustain some damage. Most. Don't Panic."
  }

  if (credits < 200) {
    return "Credit reserves low. The computer recommends trade. The computer notes that it cannot recommend specific trades as it is, ultimately, a ship computer."
  }

  if (credits >= 2000) {
    return "Financial status: adequate. The answer to the ultimate question of life, the universe, and everything is not 2,000 credits. It is, however, a reasonable start."
  }

  return "All systems nominal. The universe remains indifferent. Have a pleasant journey."
}

export function ShipComputer({ state }) {
  const msg = pickMessage(state)

  return (
    <div
      style={{
        background: '#080d10',
        border: '1px solid #2a3a4a',
        borderRadius: 8,
        padding: '10px 12px',
        marginBottom: 10,
        fontFamily: "'Space Mono', ui-monospace, monospace",
      }}
    >
      <div
        style={{
          color: '#5a8a90',
          fontSize: 9,
          letterSpacing: 2,
          marginBottom: 6,
          display: 'flex',
          alignItems: 'center',
          gap: 6,
        }}
      >
        <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: '#80c0a0' }} />
        PERSISTENT DELUSION — SHIP ADVISORY
      </div>
      <div
        style={{
          color: '#a0c8b0',
          fontSize: 11,
          lineHeight: 1.6,
          letterSpacing: 0.2,
        }}
      >
        {msg}
      </div>
    </div>
  )
}
