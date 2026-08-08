import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase'
import { checkRateLimit } from '@/features/ai-visibility/security/rate-limit'
import {
  escapeEmailHtml,
  hasNotificationEmailConfig,
  sendNotificationEmail,
} from '@/lib/notification-email'
import { parseFeedbackSubmission } from '@/lib/submission-validation'

export const runtime = 'nodejs'

function requestKey(request: Request) {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  )
}

export async function POST(request: Request) {
  const parsed = parseFeedbackSubmission(await request.json().catch(() => null))
  if ('error' in parsed) {
    return NextResponse.json({ ok: false, error: parsed.error }, { status: 400 })
  }

  const supabase = createServiceClient()
  if (!supabase || !hasNotificationEmailConfig()) {
    return NextResponse.json(
      { ok: false, error: 'submission-service-not-configured' },
      { status: 503 },
    )
  }

  const limit = await checkRateLimit({
    scope: 'feedback-submit',
    key: requestKey(request),
    limit: 12,
  })
  if (!limit.allowed) {
    return NextResponse.json(
      { ok: false, error: 'rate-limited' },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfterSeconds) } },
    )
  }

  const { toolName, vote, comment, pagePath } = parsed.data
  const { data, error } = await supabase
    .from('feedback_submissions')
    .insert({
      tool_name: toolName,
      vote,
      comment: comment || null,
      page_path: pagePath,
      user_agent: (request.headers.get('user-agent') || '').slice(0, 500),
    })
    .select('id')
    .single()

  if (error || !data?.id) {
    console.error('Feedback storage error:', error?.message || 'missing-id')
    return NextResponse.json({ ok: false, error: 'feedback-storage-failed' }, { status: 500 })
  }

  const safeTool = escapeEmailHtml(toolName)
  const safeComment = escapeEmailHtml(comment || 'Not bırakılmadı.')
  const safePage = escapeEmailHtml(pagePath)
  const voteLabel = vote === 'yes' ? 'Evet, faydalı' : 'Geliştirilmeli'
  const notification = await sendNotificationEmail({
    subject: `[Veri Mimarı] Yeni geri bildirim: ${toolName}`,
    text: `Araç: ${toolName}\nDeğerlendirme: ${voteLabel}\nNot: ${comment || 'Not bırakılmadı.'}\nSayfa: ${pagePath}`,
    html: `<h2>Yeni araç geri bildirimi</h2><p><strong>Araç:</strong> ${safeTool}</p><p><strong>Değerlendirme:</strong> ${voteLabel}</p><p><strong>Not:</strong><br>${safeComment.replaceAll('\n', '<br>')}</p><p><strong>Sayfa:</strong> ${safePage}</p>`,
    idempotencyKey: `feedback-${data.id}`,
  })
  const notificationError = 'error' in notification ? notification.error : null

  await supabase
    .from('feedback_submissions')
    .update({
      notification_status: notification.sent ? 'sent' : 'failed',
      notification_id: notification.sent ? notification.id : null,
      notification_error: notificationError,
    })
    .eq('id', data.id)

  if (notificationError) console.error('Feedback email error:', notificationError)

  return NextResponse.json(
    { ok: true, notificationSent: notification.sent },
    { status: notification.sent ? 200 : 202 },
  )
}
