import { useEffect, useRef } from 'react'
import { SYSTEMS } from '../data/systems.js'

export function HyperspaceOverlay({ phase, destination }) {
  const canvasRef = useRef(null)
  const animRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    const ctx = canvas.getContext('2d')
    const W = canvas.width
    const H = canvas.height
    const cx = W / 2
    const cy = H / 2
    const stars = Array.from({ length: 160 }, () => ({
      angle: Math.random() * Math.PI * 2,
      speed: 0.3 + Math.random() * 0.7,
      dist: 0.03 + Math.random() * 0.12,
      len: 0,
      hue: 200 + Math.random() * 50,
      bright: 70 + Math.random() * 30,
    }))
    let t = 0
    const draw = () => {
      t++
      const prog = Math.min(t / 80, 1)
      ctx.fillStyle =
        phase === 'arrive' ? 'rgba(1,10,20,0.22)' : 'rgba(1,10,20,0.16)'
      ctx.fillRect(0, 0, W, H)
      const spd = phase === 'arrive' ? (1 - prog) * 0.1 + 0.002 : prog * 0.14 + 0.003
      stars.forEach(s => {
        s.len += spd * s.speed * 55
        const r0 = s.dist * Math.min(W, H) * 0.5
        const r1 = r0 + s.len * Math.min(W, H) * 0.45
        const x0 = cx + Math.cos(s.angle) * r0
        const y0 = cy + Math.sin(s.angle) * r0
        const x1 = cx + Math.cos(s.angle) * r1
        const y1 = cy + Math.sin(s.angle) * r1
        const grd = ctx.createLinearGradient(x0, y0, x1, y1)
        const alpha =
          phase === 'arrive' ? (1 - prog) * (0.3 + s.speed * 0.5) : prog * (0.4 + s.speed * 0.5)
        grd.addColorStop(0, 'rgba(0,0,0,0)')
        grd.addColorStop(1, `hsla(${s.hue},80%,${s.bright}%,${alpha})`)
        ctx.strokeStyle = grd
        ctx.lineWidth = phase === 'arrive' ? 1.2 : Math.min(2.5, s.len * 1.5 + 0.4)
        ctx.globalAlpha = 1
        ctx.beginPath()
        ctx.moveTo(x0, y0)
        ctx.lineTo(x1, y1)
        ctx.stroke()
      })
      const gA = phase === 'arrive' ? (1 - prog) * 0.5 : prog * 0.35
      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.min(W, H) * 0.28)
      glow.addColorStop(0, `rgba(80,180,255,${gA * 1.2})`)
      glow.addColorStop(0.5, `rgba(30,80,200,${gA * 0.4})`)
      glow.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = glow
      ctx.beginPath()
      ctx.arc(cx, cy, Math.min(W, H) * 0.35, 0, Math.PI * 2)
      ctx.fill()
      ctx.globalAlpha = 1
      animRef.current = requestAnimationFrame(draw)
    }
    draw()
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current)
    }
  }, [phase])

  const sys = SYSTEMS[destination]

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 500,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      />
      <div
        style={{
          position: 'relative',
          textAlign: 'center',
          animation: 'fadeIn .4s ease',
        }}
      >
        {phase === 'jump' && (
          <>
            <div
              style={{
                color: '#2a5a8a',
                fontSize: 10,
                letterSpacing: 6,
                marginBottom: 16,
              }}
            >
              ENTERING HYPERSPACE
            </div>
            <div
              style={{
                color: 'var(--accent-2)',
                fontSize: 20,
                letterSpacing: 4,
                textShadow: '0 0 30px var(--accent),0 0 60px var(--accent)',
              }}
            >
              {sys?.name}
            </div>
            <div
              style={{
                color: '#2a5a8a',
                fontSize: 10,
                marginTop: 12,
                letterSpacing: 3,
              }}
            >
              ROUTE LOCKED
            </div>
          </>
        )}
        {phase === 'arrive' && (
          <>
            <div
              style={{
                color: '#2a6a4a',
                fontSize: 10,
                letterSpacing: 6,
                marginBottom: 16,
              }}
            >
              ARRIVAL CONFIRMED
            </div>
            <div
              style={{
                color: '#80ffc0',
                fontSize: 20,
                letterSpacing: 4,
                textShadow: '0 0 30px #40d080,0 0 60px #40d080',
              }}
            >
              {sys?.name}
            </div>
            <div
              style={{
                color: '#2a6a4a',
                fontSize: 10,
                marginTop: 12,
                letterSpacing: 3,
              }}
            >
              {sys?.economy}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
