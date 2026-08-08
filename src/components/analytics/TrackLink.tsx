'use client'

import type { ReactNode } from 'react'
import { trackEvent } from '@/lib/analytics'

type TrackLinkProps = {
  href: string
  className?: string
  children: ReactNode
  eventName: string
  payload?: Record<string, any>
  download?: boolean | string
}

export default function TrackLink({
  href,
  className,
  children,
  eventName,
  payload,
  download,
}: TrackLinkProps) {
  return (
    <a
      href={href}
      className={className}
      download={download}
      onClick={() => {
        trackEvent(eventName, {
          href,
          ...payload,
        })
      }}
    >
      {children}
    </a>
  )
}
