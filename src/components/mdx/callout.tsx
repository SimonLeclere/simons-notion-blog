import type { ReactNode } from 'react'

type CalloutProps = {
  type?: 'info' | 'warning'
  children: ReactNode
}

export default function Callout({ type = 'info', children }: CalloutProps) {
  return (
    <div
      style={{
        borderLeft: `4px solid ${type === 'warning' ? '#f59e0b' : '#0070f3'}`,
        backgroundColor: 'var(--callout-bg)',
        padding: '12px 14px',
        borderRadius: '8px',
        margin: '1.25rem 0',
      }}
    >
      {children}
    </div>
  )
}
