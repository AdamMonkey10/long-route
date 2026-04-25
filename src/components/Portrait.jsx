import { PORTRAIT_DATA } from '../data/portraits.js'

export function Portrait({ id, size = 72 }) {
  const d = PORTRAIT_DATA[id] || PORTRAIT_DATA.grex
  const s = size
  const cx = s / 2
  const exp = d.exp

  const isGaunt = exp === 'gaunt'
  const isJolly = exp === 'jolly'
  const isTired = exp === 'tired'
  const isSharp = exp === 'sharp'
  const isUnknown = exp === 'unknown'
  const isMenacing = exp === 'menacing'
  const isKnowing = exp === 'knowing'
  const isAmused = exp === 'amused'
  const isVisor = exp === 'visor' || id === 'patrol' || id === 'combine_frigate'

  const faceW = isGaunt ? s * 0.38 : isJolly ? s * 0.47 : isSharp ? s * 0.36 : s * 0.42
  const faceH = isGaunt ? s * 0.54 : isJolly ? s * 0.45 : s * 0.5
  const faceY = s * 0.28

  return (
    <svg
      width={s}
      height={s}
      viewBox={`0 0 ${s} ${s}`}
      style={{ display: 'block', borderRadius: 4, border: '1px solid #2a3a4a' }}
    >
      <rect width={s} height={s} fill={d.bg} />
      <ellipse cx={cx} cy={faceY - 2} rx={faceW + 3} ry={isGaunt ? 9 : 10} fill={d.hair} />
      <ellipse cx={cx} cy={faceY + faceH * 0.38} rx={faceW} ry={faceH * 0.54} fill={d.face} />

      {isUnknown ? (
        <>
          <rect
            x={cx - faceW * 0.55}
            y={faceY + faceH * 0.08}
            width={faceW * 0.5}
            height={7}
            rx={2}
            fill="#303030"
          />
          <rect
            x={cx + faceW * 0.08}
            y={faceY + faceH * 0.08}
            width={faceW * 0.5}
            height={7}
            rx={2}
            fill="#303030"
          />
          <circle cx={cx - faceW * 0.3} cy={faceY + faceH * 0.13} r={2.5} fill={d.eye} />
          <circle cx={cx + faceW * 0.32} cy={faceY + faceH * 0.13} r={2.5} fill={d.eye} />
        </>
      ) : (
        <>
          <ellipse
            cx={cx - faceW * 0.32}
            cy={faceY + faceH * 0.15}
            rx={faceW * 0.2}
            ry={isTired ? 3.5 : isJolly ? 5 : 4.5}
            fill="white"
          />
          <ellipse
            cx={cx + faceW * 0.32}
            cy={faceY + faceH * 0.15}
            rx={faceW * 0.2}
            ry={isTired ? 3.5 : isJolly ? 5 : 4.5}
            fill="white"
          />
          <circle
            cx={cx - faceW * 0.32}
            cy={faceY + faceH * 0.16}
            r={faceW * 0.12}
            fill={d.eye}
          />
          <circle
            cx={cx + faceW * 0.32}
            cy={faceY + faceH * 0.16}
            r={faceW * 0.12}
            fill={d.eye}
          />
          <circle cx={cx - faceW * 0.31} cy={faceY + faceH * 0.17} r={faceW * 0.06} fill="#050505" />
          <circle cx={cx + faceW * 0.32} cy={faceY + faceH * 0.17} r={faceW * 0.06} fill="#050505" />

          {exp === 'stern' && (
            <>
              <rect
                x={cx - faceW * 0.52}
                y={faceY + faceH * 0.06}
                width={faceW * 0.42}
                height={4}
                rx={2}
                fill={d.hair}
              />
              <rect
                x={cx + faceW * 0.12}
                y={faceY + faceH * 0.06}
                width={faceW * 0.42}
                height={4}
                rx={2}
                fill={d.hair}
              />
            </>
          )}
          {isTired && (
            <>
              <line
                x1={cx - faceW * 0.52}
                y1={faceY + faceH * 0.1}
                x2={cx - faceW * 0.12}
                y2={faceY + faceH * 0.06}
                stroke={d.hair}
                strokeWidth={3}
                strokeLinecap="round"
              />
              <line
                x1={cx + faceW * 0.12}
                y1={faceY + faceH * 0.06}
                x2={cx + faceW * 0.52}
                y2={faceY + faceH * 0.1}
                stroke={d.hair}
                strokeWidth={3}
                strokeLinecap="round"
              />
            </>
          )}
        </>
      )}

      <ellipse
        cx={cx}
        cy={faceY + faceH * 0.38}
        rx={faceW * 0.1}
        ry={faceW * 0.08}
        fill={d.face}
        stroke={d.hair}
        strokeWidth={0.8}
        strokeOpacity={0.4}
      />

      {isJolly ? (
        <path
          d={`M ${cx - faceW * 0.35} ${faceY + faceH * 0.62} Q ${cx} ${
            faceY + faceH * 0.75
          } ${cx + faceW * 0.35} ${faceY + faceH * 0.62}`}
          stroke={d.hair}
          strokeWidth={2.5}
          fill="none"
          strokeLinecap="round"
        />
      ) : isMenacing ? (
        <path
          d={`M ${cx - faceW * 0.3} ${faceY + faceH * 0.68} Q ${cx} ${
            faceY + faceH * 0.58
          } ${cx + faceW * 0.3} ${faceY + faceH * 0.68}`}
          stroke={d.hair}
          strokeWidth={2}
          fill="none"
          strokeLinecap="round"
        />
      ) : isAmused ? (
        <path
          d={`M ${cx - faceW * 0.2} ${faceY + faceH * 0.65} Q ${
            cx + faceW * 0.15
          } ${faceY + faceH * 0.72} ${cx + faceW * 0.32} ${faceY + faceH * 0.6}`}
          stroke={d.hair}
          strokeWidth={2}
          fill="none"
          strokeLinecap="round"
        />
      ) : isKnowing ? (
        <path
          d={`M ${cx - faceW * 0.22} ${faceY + faceH * 0.64} Q ${cx} ${
            faceY + faceH * 0.7
          } ${cx + faceW * 0.28} ${faceY + faceH * 0.62}`}
          stroke={d.hair}
          strokeWidth={2}
          fill="none"
          strokeLinecap="round"
        />
      ) : (
        <line
          x1={cx - faceW * 0.25}
          y1={faceY + faceH * 0.65}
          x2={cx + faceW * 0.25}
          y2={faceY + faceH * 0.65}
          stroke={d.hair}
          strokeWidth={2}
          strokeLinecap="round"
        />
      )}

      {isJolly && (
        <path
          d={`M ${cx - faceW * 0.4} ${faceY + faceH * 0.52} C ${
            cx - faceW * 0.2
          } ${faceY + faceH * 0.57} ${cx} ${faceY + faceH * 0.5} ${cx} ${
            faceY + faceH * 0.5
          } C ${cx} ${faceY + faceH * 0.5} ${cx + faceW * 0.2} ${
            faceY + faceH * 0.57
          } ${cx + faceW * 0.4} ${faceY + faceH * 0.52}`}
          stroke={d.hair}
          strokeWidth={3}
          fill="none"
        />
      )}

      {isMenacing && (
        <line
          x1={cx - faceW * 0.1}
          y1={faceY + faceH * 0.05}
          x2={cx - faceW * 0.4}
          y2={faceY + faceH * 0.45}
          stroke="#601010"
          strokeWidth={2}
          strokeOpacity={0.7}
        />
      )}

      {isVisor && (
        <rect
          x={cx - faceW * 0.55}
          y={faceY + faceH * 0.05}
          width={faceW * 1.1}
          height={faceH * 0.25}
          rx={3}
          fill="#203040"
          opacity={0.85}
        />
      )}

      <ellipse cx={cx} cy={s - 6} rx={faceW * 0.7} ry={6} fill={d.hair} opacity={0.5} />
    </svg>
  )
}
