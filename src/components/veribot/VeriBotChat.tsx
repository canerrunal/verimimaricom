'use client'

import { useState } from 'react'
import { trackEvent } from '@/lib/analytics'
import VeriAssistantChat from './VeriAssistantChat'

export default function VeriBotChat() {
  const [open, setOpen] = useState(false)

  return (
    <div className={`veribot ${open ? 'open' : ''}`} aria-label="Veri Asistanı sohbet aracı">
      <button
        className="veribot-trigger"
        onClick={() => {
          const nextOpen = !open
          setOpen(nextOpen)
          trackEvent(nextOpen ? 'veri_assistant_open' : 'veri_assistant_close', {
            source: 'floating_widget',
          })
        }}
        aria-expanded={open}
        aria-controls="veri-assistant-widget"
      >
        {open ? 'Kapat' : 'Veri Asistanı'}
      </button>

      {open && (
        <div className="veribot-panel" id="veri-assistant-widget">
          <VeriAssistantChat variant="widget" />
        </div>
      )}
    </div>
  )
}
