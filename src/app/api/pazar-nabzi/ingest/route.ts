import { timingSafeEqual } from 'node:crypto'
import { revalidatePath, revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase'
import { isMarketProfileSlug, normalizeMarketProduct } from '@/lib/trendyol-market'

export const runtime = 'nodejs'

type IngestPayload = {
  profile?: unknown
  products?: unknown
  quality?: unknown
  profileMetadata?: unknown
  sourceCommit?: unknown
}

function authorized(request: Request) {
  const expected = process.env.MARKET_DATA_INGEST_SECRET || ''
  const received = (request.headers.get('authorization') || '').replace(/^Bearer\s+/i, '')
  if (!expected || !received) return false
  const expectedBuffer = Buffer.from(expected)
  const receivedBuffer = Buffer.from(received)
  return (
    expectedBuffer.length === receivedBuffer.length &&
    timingSafeEqual(expectedBuffer, receivedBuffer)
  )
}

function record(value: unknown): Record<string, unknown> {
  return value && typeof value === 'object' && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {}
}

function chunks<T>(items: T[], size: number) {
  return Array.from({ length: Math.ceil(items.length / size) }, (_, index) =>
    items.slice(index * size, index * size + size),
  )
}

function uniqueBy<T>(items: T[], key: (item: T) => string) {
  return Array.from(new Map(items.map((item) => [key(item), item])).values())
}

export async function POST(request: Request) {
  if (!authorized(request)) {
    return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 })
  }

  const body = (await request.json().catch(() => null)) as IngestPayload | null
  if (!body || !isMarketProfileSlug(body.profile) || !Array.isArray(body.products)) {
    return NextResponse.json({ ok: false, error: 'invalid-payload' }, { status: 400 })
  }

  const quality = record(body.quality)
  const profileMetadata = record(body.profileMetadata)
  const profileSlug = body.profile
  const profileLabel = String(profileMetadata.label || profileSlug)
    .trim()
    .slice(0, 80)
  const profileSourceLabel = String(profileMetadata.sourceLabel || profileLabel)
    .trim()
    .slice(0, 160)
  const profileEnabled = profileMetadata.enabled !== false
  const products = body.products
    .map((item) => normalizeMarketProduct(item, profileSlug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item))
  const productCount = Number(quality.productCount || products.length)
  const capturedAt = String(quality.generatedAt || products[0]?.capturedAt || '')
  const observedDate = String(quality.date || products[0]?.observedDate || '')

  if (!profileLabel || !profileSourceLabel) {
    return NextResponse.json({ ok: false, error: 'invalid-profile-metadata' }, { status: 400 })
  }

  if (
    profileEnabled &&
    (quality.status !== 'PASS' ||
      productCount < 200 ||
      products.length < 200 ||
      !/^\d{4}-\d{2}-\d{2}$/.test(observedDate) ||
      Number.isNaN(new Date(capturedAt).getTime()))
  ) {
    return NextResponse.json({ ok: false, error: 'quality-gate-rejected' }, { status: 422 })
  }

  const database = createServiceClient()
  if (!database) {
    return NextResponse.json({ ok: false, error: 'database-not-configured' }, { status: 503 })
  }

  const sourceUrl = products[0]?.url || null
  const { error: profileError } = await database.from('market_profiles').upsert(
    {
      slug: profileSlug,
      marketplace: 'trendyol',
      label: profileLabel,
      source_label: profileSourceLabel,
      source_url: sourceUrl,
      enabled: profileEnabled,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'slug' },
  )
  if (profileError) {
    console.error('Market profile ingest error:', profileError.message)
    return NextResponse.json({ ok: false, error: 'profile-upsert-failed' }, { status: 500 })
  }

  if (!profileEnabled) {
    revalidateTag('trendyol-market')
    revalidatePath('/pazar-nabzi/trendyol')
    return NextResponse.json({ ok: true, profile: profileSlug, enabled: false, productCount: 0 })
  }

  const coverage = record(quality.coverage)
  const { data: run, error: runError } = await database
    .from('market_pipeline_runs')
    .upsert(
      {
        profile_slug: profileSlug,
        observed_date: observedDate,
        captured_at: capturedAt,
        status: 'FAIL',
        product_count: productCount,
        detail_success_rate: Number(quality.detailSuccessRate || 0),
        coverage,
        quality,
        source_commit:
          typeof body.sourceCommit === 'string' ? body.sourceCommit.slice(0, 80) : null,
      },
      { onConflict: 'profile_slug,captured_at' },
    )
    .select('id')
    .single()
  if (runError || !run?.id) {
    console.error('Market run ingest error:', runError?.message || 'missing-run-id')
    return NextResponse.json({ ok: false, error: 'run-upsert-failed' }, { status: 500 })
  }

  const productRows = products.map((product) => ({
    marketplace: 'trendyol',
    product_id: product.productId,
    title: product.title,
    brand: product.brand,
    category: product.category,
    canonical_url: product.url,
    first_seen_at: product.capturedAt || capturedAt,
    last_seen_at: product.capturedAt || capturedAt,
  }))
  const merchantRows = uniqueBy(
    products
      .filter((product) => product.merchantId)
      .map((product) => ({
        marketplace: 'trendyol',
        merchant_id: product.merchantId,
        name: product.sellerName,
        score: product.sellerScore,
        last_seen_at: product.capturedAt || capturedAt,
      })),
    (merchant) => `${merchant.marketplace}:${merchant.merchant_id}`,
  )

  for (const batch of chunks(productRows, 200)) {
    const { error } = await database
      .from('market_products')
      .upsert(batch, { onConflict: 'marketplace,product_id' })
    if (error) {
      console.error('Market product ingest error:', error.message)
      return NextResponse.json({ ok: false, error: 'product-upsert-failed' }, { status: 500 })
    }
  }
  for (const batch of chunks(merchantRows, 200)) {
    if (!batch.length) continue
    const { error } = await database
      .from('market_merchants')
      .upsert(batch, { onConflict: 'marketplace,merchant_id' })
    if (error) {
      console.error('Market merchant ingest error:', error.message)
      return NextResponse.json({ ok: false, error: 'merchant-upsert-failed' }, { status: 500 })
    }
  }

  const observations = products.map((product) => ({
    run_id: run.id,
    profile_slug: profileSlug,
    observed_date: observedDate,
    captured_at: product.capturedAt || capturedAt,
    marketplace: 'trendyol',
    product_id: product.productId,
    merchant_id: product.merchantId,
    offer_key: product.offerKey,
    rank_scope: product.rankScope,
    rank_scope_label: product.rankScopeLabel,
    rank_position: product.rankPosition,
    composite_position: product.compositePosition,
    rank_delta: product.rankDelta,
    price: product.price,
    original_price: product.originalPrice,
    discount_percent: product.discountPercent,
    price_delta_percent: product.priceDeltaPercent,
    currency: product.currency,
    trend_score: product.trendScore,
    opportunity_score: product.opportunityScore,
    metrics: product.metrics,
    stock_status: product.stockStatus,
    stock_signal: product.stockSignal,
    sales_signal: product.salesSignal,
    sales_signal_days: product.salesSignalDays,
    sales_signal_min: product.salesSignalMin,
    sales_signal_daily_min: product.salesSignalDailyMin,
    rating: product.rating,
    rating_count: product.ratingCount,
    review_count: product.reviewCount,
    review_delta: product.reviewDelta,
    question_count: product.questionCount,
    campaigns: product.campaigns,
    delivery_summary: product.deliverySummary,
    detail_status: product.detailStatus,
    rank_contract_version: 'v2',
  }))
  for (const batch of chunks(observations, 200)) {
    const { error } = await database
      .from('market_observations')
      .upsert(batch, { onConflict: 'run_id,product_id' })
    if (error) {
      console.error('Market observation ingest error:', error.message)
      return NextResponse.json({ ok: false, error: 'observation-upsert-failed' }, { status: 500 })
    }
  }

  const { error: finalizeError } = await database.from('market_pipeline_runs').update({ status: 'PASS' }).eq('id', run.id)
  if (finalizeError) return NextResponse.json({ ok: false, error: 'run-finalize-failed' }, { status: 500 })
  revalidateTag('trendyol-market')
  revalidatePath('/pazar-nabzi/trendyol')

  return NextResponse.json({ ok: true, profile: profileSlug, productCount: products.length })
}
