import { NextResponse } from 'next/server'
import { parsePreflightInput } from '@/features/ai-visibility/schemas/scan'
import { checkRateLimit } from '@/features/ai-visibility/security/rate-limit'
import { PreflightError, runPreflight } from '@/features/ai-visibility/services/preflight'

export const runtime = 'nodejs'
export const maxDuration = 20

function clientIp(request: Request) {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  )
}

export async function POST(request: Request) {
  const rate = await checkRateLimit({
    scope: 'ai-preflight',
    key: clientIp(request),
    limit: 30,
  })
  if (!rate.allowed) {
    return NextResponse.json(
      { error: 'Günlük ücretsiz ön analiz sınırına ulaşıldı. Yarın yeniden deneyin.' },
      { status: 429, headers: { 'Retry-After': String(rate.retryAfterSeconds) } },
    )
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Geçersiz istek gövdesi.' }, { status: 400 })
  }

  const parsed = parsePreflightInput(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error }, { status: 400 })
  }

  try {
    const result = await runPreflight({
      domain: parsed.data!.domain,
      country: parsed.data!.country,
      language: parsed.data!.language,
    })
    return NextResponse.json(result, {
      headers: { 'Cache-Control': 'private, no-store' },
    })
  } catch (error) {
    if (error instanceof PreflightError) {
      return NextResponse.json({ error: error.message, code: error.code }, { status: error.status })
    }
    return NextResponse.json(
      { error: 'Ön analiz tamamlanamadı. Site adresini kontrol edip yeniden deneyin.' },
      { status: 500 },
    )
  }
}
