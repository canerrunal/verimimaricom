import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

export async function POST() {
  return NextResponse.json(
    {
      error:
        'Ücretli AI sağlayıcı çağrıları kapalıdır. Yanıtları ücretsiz web oturumlarından getirip manuel benchmark alanında analiz edin.',
      mode: 'manual-zero-cost',
    },
    { status: 410 },
  )
}
