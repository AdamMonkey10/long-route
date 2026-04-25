let ctx = null
let muted = false

const SETTINGS_KEY = 'lr_settings'

function loadSettings() {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      muted = !!parsed.muted
    }
  } catch {}
}
loadSettings()

function persistSettings() {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify({ muted }))
  } catch {}
}

function go() {
  if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)()
  if (ctx.state === 'suspended') ctx.resume()
  return ctx
}

function sweep(f1, f2, dur, vol = 0.2, wave = 'sine') {
  if (muted) return
  try {
    const c = go()
    const n = c.currentTime
    const o = c.createOscillator()
    const g = c.createGain()
    o.type = wave
    o.frequency.setValueAtTime(f1, n)
    o.frequency.exponentialRampToValueAtTime(f2, n + dur)
    g.gain.setValueAtTime(0, n)
    g.gain.linearRampToValueAtTime(vol, n + 0.01)
    g.gain.exponentialRampToValueAtTime(0.001, n + dur)
    o.connect(g)
    g.connect(c.destination)
    o.start(n)
    o.stop(n + dur + 0.05)
  } catch {}
}

function noise(dur, vol = 0.15, freq = 800) {
  if (muted) return
  try {
    const c = go()
    const n = c.currentTime
    const b = c.createBuffer(1, c.sampleRate * dur, c.sampleRate)
    const d = b.getChannelData(0)
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1
    const s = c.createBufferSource()
    const fi = c.createBiquadFilter()
    const g = c.createGain()
    fi.type = 'bandpass'
    fi.frequency.value = freq
    fi.Q.value = 0.5
    g.gain.setValueAtTime(vol, n)
    g.gain.exponentialRampToValueAtTime(0.001, n + dur)
    s.buffer = b
    s.connect(fi)
    fi.connect(g)
    g.connect(c.destination)
    s.start(n)
    s.stop(n + dur)
  } catch {}
}

export const SFX = {
  jump() {
    sweep(80, 600, 0.35, 0.3, 'sawtooth')
    noise(0.5, 0.2, 200)
    setTimeout(() => sweep(600, 2000, 0.4, 0.12, 'sine'), 150)
  },
  arrive() {
    sweep(1200, 300, 0.4, 0.25, 'sine')
    setTimeout(() => noise(0.12, 0.2, 400), 80)
  },
  fire() {
    noise(0.07, 0.3, 1400)
    sweep(400, 200, 0.1, 0.15, 'square')
  },
  buy() {
    sweep(440, 660, 0.09, 0.12, 'sine')
    setTimeout(() => sweep(660, 880, 0.08, 0.1, 'sine'), 70)
  },
  sell() {
    sweep(880, 660, 0.08, 0.1, 'sine')
    setTimeout(() => sweep(660, 440, 0.09, 0.12, 'sine'), 70)
  },
  click() {
    sweep(900, 700, 0.04, 0.07, 'square')
  },
  victory() {
    [523, 659, 784, 1047].forEach((f, i) =>
      setTimeout(() => sweep(f, f * 1.5, 0.18, 0.1, 'sine'), i * 80),
    )
  },
  upgrade() {
    [523, 659, 784, 1047].forEach((f, i) =>
      setTimeout(() => sweep(f, f * 1.4, 0.15, 0.1, 'sine'), i * 70),
    )
  },
  isMuted() {
    return muted
  },
  setMuted(v) {
    muted = !!v
    persistSettings()
  },
  toggleMute() {
    muted = !muted
    persistSettings()
    return muted
  },
}
