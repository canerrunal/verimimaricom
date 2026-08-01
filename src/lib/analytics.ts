type AnalyticsPayload = Record<string, string | number | boolean | null | undefined>

declare global {
  interface Window {
    gtag?: (...args: any[]) => void
    plausible?: (event: string, options?: { props?: AnalyticsPayload }) => void
    posthog?: { capture?: (event: string, props?: AnalyticsPayload) => void }
    umami?: { track?: (event: string, props?: AnalyticsPayload) => void }
  }
}

export function trackEvent(eventName: string, payload: AnalyticsPayload = {}) {
  if (typeof window === 'undefined') return

  const safeEvent = String(eventName || '').trim()
  if (!safeEvent) return

  const props = Object.fromEntries(
    Object.entries(payload).filter(([, value]) => value !== undefined),
  )

  try {
    if (typeof window.gtag === 'function') {
      window.gtag('event', safeEvent, props)
    }

    if (typeof window.plausible === 'function') {
      window.plausible(safeEvent, { props })
    }

    if (window.posthog?.capture) {
      window.posthog.capture(safeEvent, props)
    }

    if (window.umami?.track) {
      window.umami.track(safeEvent, props)
    }
  } catch {
    // no-op: analytics failures should never break UX
  }
}

export function trackCalculatorCalc(toolName: string, inputs: AnalyticsPayload = {}) {
  trackEvent('calculator_calculate', { tool: toolName, ...inputs })
}

export function trackShareCopy(toolName: string, url: string) {
  trackEvent('share_link_copy', { tool: toolName, url })
}

export function trackWaitlistJoin(role: string, queueNumber: number) {
  trackEvent('waitlist_join', { role, queueNumber })
}

export function trackFeedbackSubmit(toolName: string, vote: 'yes' | 'no', comment?: string) {
  trackEvent('feedback_submit', { tool: toolName, vote, hasComment: Boolean(comment) })
}
