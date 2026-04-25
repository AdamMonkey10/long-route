export const SAVE_KEY = 'lr_save_v1'
export const SAVE_VERSION = 1

export function saveGame(state) {
  try {
    const payload = {
      v: SAVE_VERSION,
      ts: Date.now(),
      state,
    }
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
    if (!parsed || typeof parsed !== 'object') return null
    if (parsed.v !== SAVE_VERSION) return null
    return parsed
  } catch {
    return null
  }
}

export function wipeSave() {
  try {
    localStorage.removeItem(SAVE_KEY)
  } catch {}
}

export function exportSave() {
  const raw = localStorage.getItem(SAVE_KEY)
  if (!raw) return null
  return raw
}

export function importSave(json) {
  try {
    const parsed = JSON.parse(json)
    if (!parsed || parsed.v !== SAVE_VERSION || !parsed.state) {
      return { ok: false, error: 'Invalid or incompatible save file.' }
    }
    localStorage.setItem(SAVE_KEY, JSON.stringify(parsed))
    return { ok: true, state: parsed.state }
  } catch (e) {
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
