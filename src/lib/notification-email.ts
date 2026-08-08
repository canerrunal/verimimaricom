const RESEND_ENDPOINT = 'https://api.resend.com/emails'
export const DEFAULT_NOTIFICATION_EMAIL = 'verimimaridestek@gmail.com'

type NotificationEmailInput = {
  subject: string
  text: string
  html: string
  replyTo?: string
  idempotencyKey: string
}

export type NotificationEmailResult =
  | { sent: true; id: string | null }
  | { sent: false; error: string }

export function escapeEmailHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

export function hasNotificationEmailConfig() {
  return Boolean(process.env.RESEND_API_KEY && process.env.NOTIFICATION_FROM_EMAIL)
}

export async function sendNotificationEmail(
  input: NotificationEmailInput,
): Promise<NotificationEmailResult> {
  const apiKey = process.env.RESEND_API_KEY || ''
  const from = process.env.NOTIFICATION_FROM_EMAIL || ''
  const to = process.env.NOTIFICATION_TO_EMAIL || DEFAULT_NOTIFICATION_EMAIL

  if (!apiKey || !from) return { sent: false, error: 'email-not-configured' }

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'Idempotency-Key': input.idempotencyKey.slice(0, 256),
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject: input.subject,
        text: input.text,
        html: input.html,
        ...(input.replyTo ? { reply_to: input.replyTo } : {}),
      }),
      signal: AbortSignal.timeout(8_000),
    })

    const payload = (await response.json().catch(() => ({}))) as Record<string, unknown>
    if (!response.ok) {
      const message =
        typeof payload.message === 'string' ? payload.message : `http-${response.status}`
      return { sent: false, error: message.slice(0, 300) }
    }

    return { sent: true, id: typeof payload.id === 'string' ? payload.id : null }
  } catch (error) {
    return {
      sent: false,
      error: error instanceof Error ? error.message.slice(0, 300) : 'email-request-failed',
    }
  }
}
