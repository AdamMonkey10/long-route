export const SAVE_KEY = 'lr_save_v1'
export const SAVE_VERSION = 3

// Migrate older saves into the current shape. Returns the migrated state, or
// null if the save is too old / unrecognised to recover.
function migrate(parsed) {
  if (!parsed || !parsed.state) return null

  if (parsed.v === SAVE_VERSION) return parsed.state

  let next = parsed.state
  let v = parsed.v

  if (v === 1) {
    // v1 → v2: locations replaced station tabs.
    next = { ...next }
    delete next.stationTab
    if (next.currentLocation === undefined) next.currentLocation = null
    v = 2
  }

  if (v === 2) {
    // v2 → v3: faction standing + Ines hidden trust.
    next = { ...next }
    if (next.combineStanding === undefined) next.combineStanding = 0
    if (next.frontierSympathy === undefined) next.frontierSympathy = 0
    if (next.inesTrust === undefined) next.inesTrust = 0
    v = 3
  }

  if (v !== SAVE_VERSION) return null
  return next
}

export function saveGame(state) {
  try {
    const payload = { v: SAVE_VERSION, ts: Date.now(), state }
    localStorage.setItem(SAVE_KEY, JSON.stringify(payload))
    return true
  } catch {
    return false
  }
}

export function loadGame() {
  try {
    const raw = localStorage.getItem(SAVE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    const state = migrate(parsed)
    if (!state) return null
    return { v: SAVE_VERSION, ts: parsed.ts || Date.now(), state }
  } catch {
    return null
  }
}

export function wipeSave() {
  try { localStorage.removeItem(SAVE_KEY) } catch {}
}

export function exportSave() {
  const raw = localStorage.getItem(SAVE_KEY)
  if (!raw) return null
  return raw
}

export function importSave(json) {
  try {
    const parsed = JSON.parse(json)
    const state = migrate(parsed)
    if (!state) return { ok: false, error: 'Invalid or incompatible save file.' }
    const payload = { v: SAVE_VERSION, ts: parsed.ts || Date.now(), state }
    localStorage.setItem(SAVE_KEY, JSON.stringify(payload))
    return { ok: true, state }
  } catch {
    return { ok: false, error: 'Could not parse JSON.' }
  }
}

export function downloadSave() {
  const raw = exportSave()
  if (!raw) return false
  const blob = new Blob([raw], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  const stamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 16)
  a.href = url
  a.download = `long-route-save-${stamp}.json`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  setTimeout(() => URL.revokeObjectURL(url), 1000)
  return true
}
