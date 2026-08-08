export type AiCommerceCategory =
  | 'discoverability'
  | 'product-data'
  | 'commerce-sync'
  | 'trust-measurement'

export type AiCommerceReadinessStatus = 'blocked' | 'early' | 'developing' | 'strong'

export type AiCommerceReadinessCheck = {
  id: string
  category: AiCommerceCategory
  weight: number
  critical: boolean
  title: string
  description: string
  action: string
}

export type AiCommerceCategoryResult = {
  category: AiCommerceCategory
  earned: number
  possible: number
  score: number
}

export type AiCommerceReadinessResult = {
  score: number
  completedCount: number
  totalCount: number
  status: AiCommerceReadinessStatus
  criticalGaps: AiCommerceReadinessCheck[]
  priorities: AiCommerceReadinessCheck[]
  categories: AiCommerceCategoryResult[]
}

export const aiCommerceCategoryLabels: Record<AiCommerceCategory, string> = {
  discoverability: 'Bulunabilirlik',
  'product-data': 'Ürün verisi',
  'commerce-sync': 'Ticari senkronizasyon',
  'trust-measurement': 'Güven ve ölçüm',
}

export const aiCommerceReadinessChecks: AiCommerceReadinessCheck[] = [
  {
    id: 'indexable-pages',
    category: 'discoverability',
    weight: 8,
    critical: true,
    title: 'Ürün sayfaları indekslenebilir',
    description:
      'Satılabilir ürün URL’leri 200 yanıtı veriyor; noindex veya giriş duvarı taşımıyor.',
    action: 'Kanonik ürün URL’lerini, HTTP durumunu ve robots meta etiketlerini kontrol edin.',
  },
  {
    id: 'crawler-access',
    category: 'discoverability',
    weight: 6,
    critical: true,
    title: 'Tarayıcı ve CDN erişimi açık',
    description:
      'robots.txt, CDN ve güvenlik katmanları gerekli arama tarayıcılarını engellemiyor.',
    action:
      'robots.txt ile CDN/WAF kayıtlarını birlikte denetleyin; yanlış 403 ve 429 yanıtlarını düzeltin.',
  },
  {
    id: 'internal-links-sitemap',
    category: 'discoverability',
    weight: 6,
    critical: false,
    title: 'İç bağlantı ve sitemap hattı var',
    description:
      'Önemli ürünler kategori bağlantılarından bulunuyor ve güncel sitemap içinde yer alıyor.',
    action:
      'Yetim ürün sayfalarını kategori yapısına bağlayın ve lastmod içeren sitemap yayınlayın.',
  },
  {
    id: 'product-offer-schema',
    category: 'product-data',
    weight: 8,
    critical: true,
    title: 'Product ve Offer verisi geçerli',
    description:
      'Ürün sayfasında Product/Offer; fiyat, para birimi ve stokla birlikte doğrulanıyor.',
    action: 'JSON-LD çıktısını Rich Results Test ile doğrulayın ve kritik hataları kapatın.',
  },
  {
    id: 'visible-structured-parity',
    category: 'product-data',
    weight: 8,
    critical: true,
    title: 'Görünen içerik ile yapılandırılmış veri eşleşiyor',
    description:
      'Başlık, fiyat, stok ve ürün kimliği sayfa metniyle aynı ticari gerçeği anlatıyor.',
    action: 'Sayfa, JSON-LD ve feed çıktısını aynı ürün kaydından üretin.',
  },
  {
    id: 'stable-identifiers',
    category: 'product-data',
    weight: 6,
    critical: false,
    title: 'SKU, GTIN ve marka kimliği kararlı',
    description:
      'Her varyant kalıcı bir ürün kimliğine sahip; GTIN/MPN mevcut olduğunda doğru taşınıyor.',
    action:
      'Kanal bazında değişmeyen SKU sözlüğü kurun; yeniden kullanılan veya değişen ID’leri temizleyin.',
  },
  {
    id: 'variant-model',
    category: 'product-data',
    weight: 4,
    critical: false,
    title: 'Varyant ilişkileri açık',
    description:
      'Beden, renk ve diğer seçenekler ebeveyn ürünle ilişkilendiriliyor; URL davranışı tutarlı.',
    action: 'Ebeveyn-varyant modelini item group ve seçili varyant URL’leriyle standartlaştırın.',
  },
  {
    id: 'decision-content',
    category: 'product-data',
    weight: 4,
    critical: false,
    title: 'Karar verdiren ürün içeriği mevcut',
    description:
      'Malzeme, ölçü, uyumluluk, kullanım amacı ve özgün görseller metinsel olarak bulunuyor.',
    action: 'Genel pazarlama metni yerine karşılaştırılabilir özellik ve kullanım kanıtı ekleyin.',
  },
  {
    id: 'merchant-feed',
    category: 'commerce-sync',
    weight: 8,
    critical: false,
    title: 'Yapılandırılmış merchant feed’i var',
    description:
      'Ürün kataloğu gerekli platform alanlarıyla dışarı aktarılabiliyor ve doğrulanabiliyor.',
    action: 'Ürün feed’ini zorunlu alan, biçim ve tekillik kontrollerinden geçirin.',
  },
  {
    id: 'price-stock-checkout-sync',
    category: 'commerce-sync',
    weight: 9,
    critical: true,
    title: 'Fiyat, stok ve checkout senkronize',
    description: 'Sayfa, yapılandırılmış veri, feed ve ödeme adımında fiyat/stok aynı kalıyor.',
    action:
      'Dört yüzeyi aynı SKU için otomatik karşılaştırın; uyuşmazlıkta yayını durduran kapı kurun.',
  },
  {
    id: 'feed-freshness-monitoring',
    category: 'commerce-sync',
    weight: 5,
    critical: false,
    title: 'Güncellik SLA’sı ve hata alarmı tanımlı',
    description:
      'Tam ve artımlı feed güncellemeleri izleniyor; reddedilen ürünler sahipli bir kuyruğa düşüyor.',
    action: 'Feed yaşı, reddedilme oranı ve fiyat/stok eşleşmesi için alarm eşikleri belirleyin.',
  },
  {
    id: 'seller-policies',
    category: 'commerce-sync',
    weight: 5,
    critical: false,
    title: 'Satıcı, teslimat ve iade verisi açık',
    description:
      'Satıcı kimliği ile teslimat, iade, gizlilik ve koşul sayfaları erişilebilir ve güncel.',
    action:
      'Politika URL’lerini hem sitede hem feed ve Organization/Offer verisinde tutarlı taşıyın.',
  },
  {
    id: 'market-localization',
    category: 'commerce-sync',
    weight: 3,
    critical: false,
    title: 'Ülke, dil, para birimi ve vergi kapsamı açık',
    description:
      'Hedef pazar ile ürün URL’si, fiyat para birimi, vergi ve teslimat kapsamı eşleşiyor.',
    action: 'Her hedef pazar için locale, currency, tax ve shipping sözlüğünü doğrulayın.',
  },
  {
    id: 'organization-policies',
    category: 'trust-measurement',
    weight: 6,
    critical: false,
    title: 'Marka ve politika kimliği doğrulanabilir',
    description:
      'Organization bilgisi, iletişim, iade, teslimat, gizlilik ve koşullar aynı marka kimliğine bağlı.',
    action: 'Marka adını ve politika sayfalarını tek Organization kimliği altında ilişkilendirin.',
  },
  {
    id: 'validation-monitoring',
    category: 'trust-measurement',
    weight: 5,
    critical: false,
    title: 'Search Console ve merchant teşhisi izleniyor',
    description:
      'İndeksleme, zengin sonuç, feed reddi ve ürün uygunluk sorunları düzenli takip ediliyor.',
    action:
      'Haftalık teknik görünürlük kontrolüne indeks, schema ve merchant hata sayılarını ekleyin.',
  },
  {
    id: 'attribution-loop',
    category: 'trust-measurement',
    weight: 5,
    critical: false,
    title: 'AI ve organik keşif sonucu ölçülebiliyor',
    description:
      'Kaynak, oturum, sipariş, iptal ve iade sonucu aynı ölçüm zincirinde ilişkilendiriliyor.',
    action: 'Kaynak etiketlerini sipariş ve iade tablolarına taşıyan geri besleme hattı kurun.',
  },
  {
    id: 'evidence-content',
    category: 'trust-measurement',
    weight: 4,
    critical: false,
    title: 'İddialar kanıt ve bağlam taşıyor',
    description:
      'Ürün faydaları doğrulanabilir özellik, kullanım bilgisi ve şeffaf yorum kaynağıyla destekleniyor.',
    action:
      'Belirsiz üstünlük iddialarını ölçü, malzeme, kullanım koşulu ve doğrulanabilir kanıtla değiştirin.',
  },
]

const categories = Object.keys(aiCommerceCategoryLabels) as AiCommerceCategory[]

export function calculateAiCommerceReadiness(
  selectedIds: Iterable<string>,
): AiCommerceReadinessResult {
  const selected = new Set(selectedIds)
  const completed = aiCommerceReadinessChecks.filter((check) => selected.has(check.id))
  const missing = aiCommerceReadinessChecks.filter((check) => !selected.has(check.id))
  const score = completed.reduce((total, check) => total + check.weight, 0)
  const criticalGaps = missing.filter((check) => check.critical)
  const priorities = [...missing].sort(
    (left, right) => Number(right.critical) - Number(left.critical) || right.weight - left.weight,
  )

  let status: AiCommerceReadinessStatus
  if (criticalGaps.length > 0) status = 'blocked'
  else if (score < 50) status = 'early'
  else if (score < 80) status = 'developing'
  else status = 'strong'

  return {
    score,
    completedCount: completed.length,
    totalCount: aiCommerceReadinessChecks.length,
    status,
    criticalGaps,
    priorities,
    categories: categories.map((category) => {
      const categoryChecks = aiCommerceReadinessChecks.filter(
        (check) => check.category === category,
      )
      const possible = categoryChecks.reduce((total, check) => total + check.weight, 0)
      const earned = categoryChecks
        .filter((check) => selected.has(check.id))
        .reduce((total, check) => total + check.weight, 0)

      return {
        category,
        earned,
        possible,
        score: possible === 0 ? 0 : Math.round((earned / possible) * 100),
      }
    }),
  }
}
