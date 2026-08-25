import { NextResponse } from 'next/server'
import { createServiceClient, supabase } from '@/lib/supabase'
import { buildMarketHistory, type MarketHistorySource } from '@/lib/trendyol-market-history'

export const runtime = 'nodejs'
export const maxDuration = 15

function clean(value: string | null, maxLength = 180) {
  return String(value || '')
    .trim()
    .slice(0, maxLength)
}

function validSource(value: string): value is MarketHistorySource {
  return value === 'profile' || value === 'taxonomy'
}

export async function GET(request: Request) {
  const url = new URL(request.url)
  const sourceValue = clean(url.searchParams.get('source'), 20)
  const productId = clean(url.searchParams.get('productId'), 80)
  const productKey = clean(url.searchParams.get('productKey'))
  const offerKey = clean(url.searchParams.get('offerKey'))
  const profileSlug = clean(url.searchParams.get('profileSlug'), 80)
  const merchantId = clean(url.searchParams.get('merchantId'), 80)

  if (!validSource(sourceValue) || !productId) {
    return NextResponse.json(
      { error: 'Geçerli bir ürün geçmişi isteği gönderin.' },
      { status: 400 },
    )
  }
  if (sourceValue === 'taxonomy' && !productKey) {
    return NextResponse.json({ error: 'Ürün anahtarı eksik.' }, { status: 400 })
  }

  // Bu herkese açık uçta anon istemci önceliklidir; RLS yalnız PASS koşularını görünür tutar.
  const database = supabase || createServiceClient()
  if (!database) {
    return NextResponse.json({ error: 'Geçmiş veri bağlantısı kullanılamıyor.' }, { status: 503 })
  }

  let profileRequest = database
    .from('market_observations')
    .select(
      'observed_date,captured_at,price,stock_status,stock_signal,sales_signal_daily_min,sales_signal',
    )
    .eq('product_id', productId)
    .order('observed_date', { ascending: true })
    .order('captured_at', { ascending: true })
    .limit(400)

  if (sourceValue === 'profile' && offerKey)
    profileRequest = profileRequest.eq('offer_key', offerKey)
  if (sourceValue === 'profile' && profileSlug) {
    profileRequest = profileRequest.eq('profile_slug', profileSlug)
  }
  if (sourceValue === 'taxonomy' && merchantId) {
    profileRequest = profileRequest.eq('merchant_id', merchantId)
  }

  const [profileResponse, taxonomyResponse] = await Promise.all([
    profileRequest,
    sourceValue === 'taxonomy'
      ? database
          .from('market_taxonomy_product_observations')
          .select('observed_date,captured_at,price,in_stock,running_out')
          .eq('product_key', productKey)
          .order('observed_date', { ascending: true })
          .order('captured_at', { ascending: true })
          .limit(400)
      : Promise.resolve({ data: [], error: null }),
  ])

  const requiredQueryFailed =
    sourceValue === 'profile' ? Boolean(profileResponse.error) : Boolean(taxonomyResponse.error)

  if (requiredQueryFailed) {
    return NextResponse.json({ error: 'Ürün geçmişi şu anda okunamıyor.' }, { status: 502 })
  }

  const history = buildMarketHistory(
    sourceValue,
    profileResponse.data || [],
    taxonomyResponse.data || [],
  )

  return NextResponse.json(
    {
      source: sourceValue,
      productId,
      history,
      coverage: {
        priceDays: history.price.length,
        stockDays: history.stock.length,
        salesDays: history.sales.length,
      },
      methodology: {
        price: 'Aynı ürün ve teklif için başarılı günlük gözlemlerde görülen fiyat.',
        stock:
          'Herkese açık ürün sayfasındaki stok durumu; stok adedi bulunmadığında durum seviyesi gösterilir.',
        sales:
          '“3 günde 500+” benzeri görünür talep etiketinin güne bölünmüş alt sınırı; kesin sipariş adedi değildir.',
      },
    },
    { headers: { 'Cache-Control': 'public, s-maxage=900, stale-while-revalidate=1800' } },
  )
}
