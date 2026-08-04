import { NextResponse } from 'next/server'
import { parseScanRequest } from '@/features/ai-visibility/schemas/scan'
import { checkRateLimit } from '@/features/ai-visibility/security/rate-limit'
import {
  runVisibilityBenchmark,
  safetyIdentifier,
} from '@/features/ai-visibility/services/benchmark'

export const runtime = 'nodejs'
export const maxDuration = 60

function clientIp(request: Request) {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  )
}

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Geçersiz istek gövdesi.' }, { status: 400 })
  }

  const parsed = parseScanRequest(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error }, { status: 400 })
  }

  const ip = clientIp(request)
  const globalDailyLimit = Math.max(
    1,
    Math.min(100, Number(process.env.AI_VISIBILITY_DAILY_SCAN_CAP) || 10),
  )
  const [visitorRate, globalRate] = await Promise.all([
    checkRateLimit({ scope: 'ai-scan-visitor', key: ip, limit: 2, strict: true }),
    checkRateLimit({
      scope: 'ai-scan-global',
      key: 'global',
      limit: globalDailyLimit,
      strict: true,
    }),
  ])
  if (!visitorRate.persistent || !globalRate.persistent) {
    return NextResponse.json(
      { error: 'Canlı benchmark koruma katmanı şu anda hazır değil. Lütfen daha sonra deneyin.' },
      { status: 503 },
    )
  }
  if (!visitorRate.allowed || !globalRate.allowed) {
    const retryAfter = Math.max(visitorRate.retryAfterSeconds, globalRate.retryAfterSeconds)
    return NextResponse.json(
      { error: 'Günlük ücretsiz canlı benchmark sınırına ulaşıldı. Yarın yeniden deneyin.' },
      { status: 429, headers: { 'Retry-After': String(retryAfter) } },
    )
  }

  try {
    const result = await runVisibilityBenchmark(parsed.data!, {
      safetyIdentifier: safetyIdentifier(ip),
    })
    return NextResponse.json(result, {
      headers: { 'Cache-Control': 'private, no-store' },
    })
  } catch {
    return NextResponse.json(
      { error: 'Canlı AI benchmarkı tamamlanamadı. Birkaç dakika sonra yeniden deneyin.' },
      { status: 502 },
    )
  }
}
