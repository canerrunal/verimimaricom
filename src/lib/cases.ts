export type CaseCost = {
  label: string
  amount: number
  note: string
}

export type CaseScenario = {
  label: string
  period: string
  netRevenue: number
  adSpend: number
  costs: CaseCost[]
}

export type DemoCase = {
  slug: string
  title: string
  shortTitle: string
  eyebrow: string
  summary: string
  disclosure: string
  duration: string
  updatedAt: string
  baseline: CaseScenario
  revised: CaseScenario
  assumptions: string[]
  dataSources: string[]
  diagnosis: Array<{ title: string; detail: string }>
  decisions: Array<{ title: string; detail: string }>
  limitations: string[]
  relatedGuides: Array<{ title: string; href: string }>
  relatedTools: Array<{ title: string; href: string }>
}

export const DEMO_CASE_DISCLOSURE =
  'Demo Vaka Analizi — Simüle edilmiş veri kullanılmıştır. Bu sayfadaki sonuçlar gerçek müşteri başarısı iddiası değildir.'

export function scenarioMetrics(scenario: CaseScenario) {
  const preAdCosts = scenario.costs.reduce((total, cost) => total + cost.amount, 0)
  const preAdContribution = scenario.netRevenue - preAdCosts
  const postAdContribution = preAdContribution - scenario.adSpend

  return {
    roas: scenario.netRevenue / scenario.adSpend,
    preAdCosts,
    preAdContribution,
    postAdContribution,
    postAdContributionMargin: postAdContribution / scenario.netRevenue,
  }
}

export function changeRate(before: number, after: number) {
  return (after - before) / before
}

export const demoCases: DemoCase[] = [
  {
    slug: 'roas-yuksek-kar-dusuk-demo-vaka',
    title: 'ROAS 4,2 İken Kâr Neden Düştü?',
    shortTitle: 'Aynı ROAS, farklı kârlılık',
    eyebrow: 'E-TİCARET KÂRLILIĞI / DEMO VAKA',
    summary:
      'Aynı 4,2 ROAS düzeyinde ürün karması ve sipariş ekonomisi değiştiğinde reklam sonrası katkının nasıl farklılaştığını gösteren hesap laboratuvarı.',
    disclosure: DEMO_CASE_DISCLOSURE,
    duration: '2 × 4 haftalık karşılaştırma',
    updatedAt: '2026-08-01',
    baseline: {
      label: 'Baz senaryo',
      period: 'Simülasyon / Hafta 1–4',
      netRevenue: 1_000_000,
      adSpend: 238_095.24,
      costs: [
        { label: 'Ürün maliyeti', amount: 420_000, note: 'Net satışın %42,0’si' },
        { label: 'Komisyon ve ödeme', amount: 90_000, note: 'Net satışın %9,0’ı' },
        { label: 'Kargo ve paketleme', amount: 85_000, note: 'Net satışın %8,5’i' },
        { label: 'İade maliyeti rezervi', amount: 45_000, note: 'Net satışın %4,5’i' },
      ],
    },
    revised: {
      label: 'Revize senaryo',
      period: 'Simülasyon / Hafta 5–8',
      netRevenue: 940_000,
      adSpend: 223_809.52,
      costs: [
        { label: 'Ürün maliyeti', amount: 385_400, note: 'Net satışın %41,0’ı' },
        { label: 'Komisyon ve ödeme', amount: 79_900, note: 'Net satışın %8,5’i' },
        { label: 'Kargo ve paketleme', amount: 75_200, note: 'Net satışın %8,0’ı' },
        { label: 'İade maliyeti rezervi', amount: 32_900, note: 'Net satışın %3,5’i' },
      ],
    },
    assumptions: [
      'Her iki dönemde de reklam paneli geliri yerine iade ve iptal sonrası net satış kullanıldı.',
      'ROAS iki senaryoda da 4,2’de sabit tutuldu; trafik kalitesi ve mevsimsellik değişmedi varsayıldı.',
      'Revize senaryoda düşük katkılı ürünlerin reklam payı azaltıldı ve sipariş karması değişti.',
      'KDV, sabit giderler ve kurumlar vergisi kapsam dışında bırakıldı; gösterilen sonuç net kâr değil, reklam sonrası katkıdır.',
    ],
    dataSources: [
      'Simüle edilmiş sipariş dışa aktarımı: net satış, iptal ve iade alanları',
      'Simüle edilmiş reklam paneli: harcama ve ilişkilendirilmiş gelir',
      'Simüle edilmiş ürün maliyet tablosu: SKU maliyeti, komisyon, kargo ve paketleme',
    ],
    diagnosis: [
      {
        title: 'Panel metriğini uzlaştır',
        detail: 'Reklam gelirini net satışla eşleştir; iptal ve iadeyi aynı döneme taşı.',
      },
      {
        title: 'Sipariş ekonomisini kur',
        detail: 'Ürün, komisyon, ödeme, kargo, paketleme ve iade rezervini siparişe dağıt.',
      },
      {
        title: 'Katkı kaçağını bul',
        detail: 'ROAS aynıyken reklam sonrası katkıyı ürün ve kampanya kırılımında karşılaştır.',
      },
    ],
    decisions: [
      {
        title: 'Ürün bazlı eşik',
        detail: 'Tek mağaza ROAS hedefi yerine her ürün grubu için başabaş ROAS sınırı tanımlandı.',
      },
      {
        title: 'Bütçe karması',
        detail:
          'Düşük katkılı SKU’ların ölçek bütçesi azaltılıp yeterli katkı bırakan ürünlere ağırlık verildi.',
      },
      {
        title: 'Haftalık uzlaştırma',
        detail:
          'Panel geliri, net satış ve iade rezervi aynı karar tablosunda haftalık kontrol edildi.',
      },
    ],
    limitations: [
      'Bu bir kontrollü deney değil; revize senaryonun nedensel etki kanıtı olduğu ileri sürülemez.',
      'Stok durumu, rekabet, kreatif kalitesi ve müşteri yaşam boyu değeri modelde sabit kabul edildi.',
      'Sonuçlar yalnızca verilen varsayımlarla üretilen örnek simülasyon sonuçlarıdır ve başka işletmelere genellenemez.',
    ],
    relatedGuides: [
      {
        title: 'ROAS yüksekken kâr neden düşer?',
        href: '/rehberler/roas-yuksekken-kar-neden-duser',
      },
      { title: 'Başabaş ROAS nasıl hesaplanır?', href: '/rehberler/basabas-roas-nasil-hesaplanir' },
      { title: 'Katkı payı nedir?', href: '/rehberler/katki-payi-nedir' },
    ],
    relatedTools: [
      { title: 'Başabaş ROAS Hesaplayıcı', href: '/araclar/basabas-roas-hesaplayici' },
      { title: 'Kâr Marjı Hesaplayıcı', href: '/araclar/kar-marji-hesaplayici' },
    ],
  },
]

export function getDemoCase(slug: string) {
  return demoCases.find((item) => item.slug === slug)
}
