export function StatBlock({ label, val, color }) {
  return (
    <div
      style={{
        background: 'var(--bg-panel-hi)',
        border: '1px solid #1a2a3a',
        borderRadius: 6,
        padding: '8px 10px',
      }}
    >
      <div style={{ color: 'var(--text-faint)', fontSize: 10, letterSpacing: 1 }}>{label}</div>
      <div style={{ color: color || 'var(--text)', fontSize: 14, marginTop: 2 }}>{val}</div>
    </div>
  )
}
