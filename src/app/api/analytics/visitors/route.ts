import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase'

export const runtime = 'nodejs'

function getVisitorId(req: Request) {
  const forwarded = req.headers.get('x-forwarded-for')
  const ip = forwarded ? forwarded.split(',')[0].trim() : req.headers.get('x-real-ip') || 'unknown'
  const ua = req.headers.get('user-agent') || ''
  return `${ip}-${ua.slice(0, 64)}`
}

function hashString(str: string) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash |= 0
  }
  return Math.abs(hash).toString(36)
}

export async function POST(req: Request) {
  try {
    const supabase = createServiceClient()
    if (!supabase) {
      return NextResponse.json({ visitors: 0 })
    }

    const body = await req.json().catch(() => ({}))
    const pagePath = body?.page || '/'

    const visitorId = getVisitorId(req)
    const sessionId = hashString(visitorId)
    const ipHash = hashString(visitorId.split('-')[0])
    const userAgent = (req.headers.get('user-agent') || '').slice(0, 256)

    const { error } = await supabase.from('visitor_sessions').upsert(
      {
        session_id: sessionId,
        ip_hash: ipHash,
        user_agent: userAgent,
        page_path: pagePath,
        last_seen_at: new Date().toISOString(),
      },
      { onConflict: 'session_id' },
    )

    if (error) {
      console.error('Visitor tracking error:', error.message)
    }

    const { count } = await supabase
      .from('visitor_sessions')
      .select('*', { count: 'exact', head: true })
      .gt('last_seen_at', new Date(Date.now() - 5 * 60 * 1000).toISOString())

    return NextResponse.json({ visitors: count || 0 })
  } catch {
    return NextResponse.json({ visitors: 0 })
  }
}

export async function GET() {
  try {
    const supabase = createServiceClient()
    if (!supabase) {
      return NextResponse.json({ visitors: 0 })
    }

    const { count } = await supabase
      .from('visitor_sessions')
      .select('*', { count: 'exact', head: true })
      .gt('last_seen_at', new Date(Date.now() - 5 * 60 * 1000).toISOString())

    return NextResponse.json({ visitors: count || 0 })
  } catch {
    return NextResponse.json({ visitors: 0 })
  }
}
