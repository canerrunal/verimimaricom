import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase'
import { checkRateLimit } from '@/features/ai-visibility/security/rate-limit'
import {
  escapeEmailHtml,
  hasNotificationEmailConfig,
  sendNotificationEmail,
} from '@/lib/notification-email'
import { parseContactSubmission } from '@/lib/submission-validation'

export const runtime = 'nodejs'

function requestKey(request: Request) {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  )
}

export async function POST(request: Request) {
  const parsed = parseContactSubmission(await request.json().catch(() => null))
  if ('error' in parsed) {
    return NextResponse.json({ ok: false, error: parsed.error }, { status: 400 })
  }

  if (parsed.data.website) {
    return NextResponse.json({ ok: true, notificationSent: true })
  }

  const supabase = createServiceClient()
  if (!supabase || !hasNotificationEmailConfig()) {
    return NextResponse.json(
      { ok: false, error: 'submission-service-not-configured' },
      { status: 503 },
    )
  }

  const limit = await checkRateLimit({
    scope: 'contact-submit',
    key: requestKey(request),
    limit: 5,
  })
  if (!limit.allowed) {
    return NextResponse.json(
      { ok: false, error: 'rate-limited' },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfterSeconds) } },
    )
  }

  const { name, email, projectType, budget, message, pagePath } = parsed.data
  const { data, error } = await supabase
    .from('contact_submissions')
    .insert({
      name,
      email,
      project_type: projectType,
      budget,
      message: message || null,
      page_path: pagePath,
      user_agent: (request.headers.get('user-agent') || '').slice(0, 500),
    })
    .select('id')
    .single()

  if (error || !data?.id) {
    console.error('Contact storage error:', error?.message || 'missing-id')
    return NextResponse.json({ ok: false, error: 'contact-storage-failed' }, { status: 500 })
  }

  const safeName = escapeEmailHtml(name)
  const safeEmail = escapeEmailHtml(email)
  const safeProjectType = escapeEmailHtml(projectType)
  const safeBudget = escapeEmailHtml(budget)
  const safeMessage = escapeEmailHtml(message || 'Proje notu bırakılmadı.')
  const safePage = escapeEmailHtml(pagePath)
  const notification = await sendNotificationEmail({
    subject: `[Veri Mimarı] Yeni iş birliği talebi: ${name}`,
    text: `Ad Soyad: ${name}\nE-posta: ${email}\nProje: ${projectType}\nBütçe: ${budget}\nNot: ${message || 'Proje notu bırakılmadı.'}\nSayfa: ${pagePath}`,
    html: `<h2>Yeni iş birliği talebi</h2><p><strong>Ad Soyad:</strong> ${safeName}</p><p><strong>E-posta:</strong> ${safeEmail}</p><p><strong>Proje:</strong> ${safeProjectType}</p><p><strong>Bütçe:</strong> ${safeBudget}</p><p><strong>Not:</strong><br>${safeMessage.replaceAll('\n', '<br>')}</p><p><strong>Sayfa:</strong> ${safePage}</p>`,
    replyTo: email,
    idempotencyKey: `contact-${data.id}`,
  })
  const notificationError = 'error' in notification ? notification.error : null

  await supabase
    .from('contact_submissions')
    .update({
      notification_status: notification.sent ? 'sent' : 'failed',
      notification_id: notification.sent ? notification.id : null,
      notification_error: notificationError,
    })
    .eq('id', data.id)

  if (notificationError) console.error('Contact email error:', notificationError)

  return NextResponse.json(
    { ok: true, notificationSent: notification.sent },
    { status: notification.sent ? 200 : 202 },
  )
}
