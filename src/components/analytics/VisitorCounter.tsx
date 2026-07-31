'use client'

import { useEffect, useState } from 'react'

export default function VisitorCounter() {
  const [visitors, setVisitors] = useState(0)

  useEffect(() => {
    const track = async () => {
      try {
        const res = await fetch('/api/analytics/visitors', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ page: window.location.pathname }),
        })
        const data = await res.json()
        setVisitors(data.visitors || 0)
      } catch {
        setVisitors(0)
      }
    }

    track()
    const interval = setInterval(track, 30000)
    return () => clearInterval(interval)
  }, [])

  if (visitors === 0) return null

  return (
    <div className="visitor-counter" aria-label="Canlı ziyaretçi sayısı">
      <span className="pulse" />
      <span>{visitors} aktif ziyaretçi</span>
    </div>
  )
}
