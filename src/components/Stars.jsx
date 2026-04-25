import { useMemo } from 'react'

export function Stars({ count = 60 }) {
  const stars = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() > 0.85 ? 2 : 1,
        opacity: 0.2 + Math.random() * 0.6,
      })),
    [count],
  )
  return (
    <div
      aria-hidden
      style={{
        position: 'fixed',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      {stars.map((s, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            background: '#a0c0d0',
            borderRadius: '50%',
            opacity: s.opacity,
          }}
        />
      ))}
    </div>
  )
}
