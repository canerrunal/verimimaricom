import { NextResponse } from 'next/server'
import { parsePreflightInput } from '@/features/ai-visibility/schemas/scan'
import { PreflightError, runPreflight } from '@/features/ai-visibility/services/preflight'

export const runtime = 'nodejs'
export const maxDuration = 20

const WINDOW_MS = 15 * 60 * 1000
const MAX_REQUESTS = 8
const rateLimits = new Map<string, { count: number; resetAt: number }>()

function clientIp(request: Request) {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  )
}

function canRun(key: string) {
  const now = Date.now()
  const current = rateLimits.get(key)
  if (!current || current.resetAt <= now) {
    rateLimits.set(key, { count: 1, resetAt: now + WINDOW_MS })
    return true
  }
  if (current.count >= MAX_REQUESTS) return false
  current.count += 1
  return true
}

export async function POST(request: Request) {
  if (!canRun(clientIp(request))) {
    return NextResponse.json(
      { error: 'Kısa sürede çok fazla ön analiz başlatıldı. Lütfen biraz sonra yeniden deneyin.' },
      { status: 429 },
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
    const result = await runPreflight({ domain: parsed.data!.domain })
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
