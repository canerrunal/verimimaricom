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
  const dateValue = clean(url.searchParams.get('date'), 10)
  const cutoff = /^\d{4}-\d{2}-\d{2}$/.test(dateValue)
    ? dateValue
    : new Date().toISOString().slice(0, 10)
  const profileSlug = clean(url.searchParams.get('profileSlug'), 80)

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
      'observed_date,captured_at,price,stock_status,stock_signal,sales_signal_daily_min,sales_signal,metrics,rating,rating_count,review_count,question_count',
    )
    .eq('product_id', productId)
    .lte('observed_date', cutoff)
    .order('observed_date', { ascending: false })
    .order('captured_at', { ascending: false })
    .limit(400)

  if (sourceValue === 'profile' && offerKey)
    profileRequest = profileRequest.eq('offer_key', offerKey)
  if (sourceValue === 'profile' && profileSlug) {
    profileRequest = profileRequest.eq('profile_slug', profileSlug)
  }
  // Taksonomi teklifinin fiyat/stok geçmişi product_key ile ayrılır. Görünür satış etiketi ise
  // ürün sayfası seviyesinde olduğundan satıcı kimliğiyle daraltılmaz; bazı profil koşularında
  // merchant_id bulunmasa da aynı ürünün doğrulanmış talep geçmişi korunur.

  const [profileResponse, taxonomyResponse] = await Promise.all([
    profileRequest,
    sourceValue === 'taxonomy'
      ? database
          .from('market_taxonomy_product_observations')
          .select(
            'observed_date,captured_at,price,in_stock,running_out,metrics,rating,rating_count',
          )
          .eq('product_key', productKey)
          .lte('observed_date', cutoff)
          .order('observed_date', { ascending: false })
          .order('captured_at', { ascending: false })
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
        quantity:
          'Sayfanın bildirdiği seçili satıcı/varyant stok adedi; toplam depo stoğu ve satın alma limiti değildir.',
        estimatedSales:
          'Aynı satıcı, ilan ve varyantın 18–30 saat aralığındaki net stok azalışı 24 saate ölçeklenir. Yenileme, stok düzeltmesi ve iadeler sonucu etkileyebilir. Haftalık/aylık değerler yalnız tam gözlem aralığı varsa toplanır.',
        score: 'Ürünün ortalama puanı; 5 üzerinden.',
        ratings: 'Ürüne verilen puanların toplam sayısı.',
        reviews: 'Yazılı yorum sayısı; değerlendirme sayısından farklıdır.',
        questions: 'Sayfada görülen soru-cevap sayısı.',
        sellers:
          'Sayfa kaynağında kimliği görülen benzersiz satıcılar; tüm satıcıların toplamı olmayabilir.',
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
