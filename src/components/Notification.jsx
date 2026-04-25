export function Notification({ message }) {
  if (!message) return null
  return (
    <div
      style={{
        position: 'fixed',
        top: 56,
        left: '50%',
        transform: 'translateX(-50%)',
        background: '#0a1a2a',
        border: '1px solid var(--border-accent)',
        color: '#80c0e0',
        padding: '10px 20px',
        borderRadius: 8,
        fontSize: 12,
        zIndex: 200,
        maxWidth: '90vw',
        textAlign: 'center',
        boxShadow: '0 4px 20px rgba(0,30,60,0.8)',
        animation: 'slideDown 0.25s ease',
      }}
    >
      {message}
    </div>
  )
}
