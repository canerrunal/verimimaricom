export type ComparisonMetric = {
  name: string
  longName: string
  question: string
  formula: string
  numerator: string
  denominator: string
  bestFor: string[]
  limits: string[]
}

export type MetricComparison = {
  slug: string
  title: string
  description: string
  category: string
  reviewedAt: string
  reviewDueAt: string
  verdict: string
  left: ComparisonMetric
  right: ComparisonMetric
  example: {
    period: string
    totalRevenue: number
    metaAttributedRevenue: number
    metaSpend: number
    googleAttributedRevenue: number
    googleSpend: number
  }
  decisions: Array<{ situation: string; primary: string; companion: string; reason: string }>
  checklist: string[]
  sources: Array<{ name: string; url: string; note: string }>
  relatedGuides: Array<{ title: string; href: string }>
  relatedTerms: Array<{ title: string; href: string }>
  relatedTool: { title: string; href: string }
}

export const metricComparisons: MetricComparison[] = [
  {
    slug: 'roas-vs-mer',
    title: 'ROAS vs MER: Hangi Metrik Ne Zaman Kullanılmalı?',
    description:
      'Kampanya verimliliği ile şirket düzeyi pazarlama verimliliğini ayırın; ROAS ve MER’i aynı karar sisteminde doğru yerde kullanın.',
    category: 'Reklam Analitiği',
    reviewedAt: '2026-08-01',
    reviewDueAt: '2026-11-01',
    verdict:
      'Kampanya, kreatif ve kanal teşhisi için ROAS; toplam bütçe ve şirket düzeyi verimlilik için MER kullanın. İkisi de tek başına kâr metriği değildir.',
    left: {
      name: 'ROAS',
      longName: 'Return on Ad Spend',
      question: 'Belirli reklam harcaması ne kadar atfedilen gelir üretti?',
      formula: 'Atfedilen reklam geliri ÷ Reklam harcaması',
      numerator: 'Platformun veya analitik sisteminin reklama atfettiği gelir',
      denominator: 'Seçilen kampanya, reklam seti, kreatif veya kanal harcaması',
      bestFor: ['Kampanya ve kreatif karşılaştırması', 'Teklif ve bütçe optimizasyonu', 'Kanal içi teşhis'],
      limits: ['Atıf modeline ve pencereye bağımlıdır', 'Kanallar aynı siparişi sahiplenebilir', 'Ürün ve operasyon maliyetlerini göstermez'],
    },
    right: {
      name: 'MER',
      longName: 'Marketing Efficiency Ratio',
      question: 'Şirketin toplam geliri, toplam pazarlama harcamasına göre ne kadar verimli?',
      formula: 'Toplam dönem geliri ÷ Toplam pazarlama harcaması',
      numerator: 'Tanımı sabitlenmiş toplam dönem geliri',
      denominator: 'Tüm kanallar; tanıma göre medya veya tam yüklü pazarlama gideri',
      bestFor: ['Şirket düzeyi bütçe planlama', 'Kanallar arası toplam verimlilik', 'Ölçekleme eğilimini izleme'],
      limits: ['Kanal veya kreatif teşhisi yapmaz', 'Organik ve tekrar müşteri gelirini de içerebilir', 'Gider kapsamı belgelenmezse karşılaştırılamaz'],
    },
    example: {
      period: 'Simüle edilmiş aylık örnek',
      totalRevenue: 2_400_000,
      metaAttributedRevenue: 1_700_000,
      metaSpend: 300_000,
      googleAttributedRevenue: 1_000_000,
      googleSpend: 180_000,
    },
    decisions: [
      { situation: 'Kreatifleri karşılaştırma', primary: 'ROAS', companion: 'CTR + CVR + katkı', reason: 'Karar birimi reklam veya kreatiftir.' },
      { situation: 'Aylık toplam bütçeyi değerlendirme', primary: 'MER', companion: 'Katkı marjı + yeni müşteri payı', reason: 'Karar şirket düzeyi toplam harcamadır.' },
      { situation: 'Platform raporları toplam geliri aşıyor', primary: 'MER', companion: 'Atıf ve incrementality analizi', reason: 'Çifte atfın toplam görünümü bozması önlenir.' },
      { situation: 'Tek kampanyanın teklifini değiştirme', primary: 'ROAS', companion: 'Başabaş ROAS + CPA', reason: 'Ekonomik eşik kampanya sonucuyla karşılaştırılır.' },
      { situation: 'Kârlı büyüme kararı', primary: 'İkisi birlikte', companion: 'Reklam sonrası katkı + nakit', reason: 'Verimlilik, kâr ve nakit aynı şey değildir.' },
    ],
    checklist: [
      'ROAS gelirinin atıf modelini ve penceresini yazın.',
      'MER gelirini brüt veya net olarak tanımlayın.',
      'MER giderinin yalnız medya mı, tam yüklü mü olduğunu belirtin.',
      'Bütün değerleri aynı dönem ve para biriminde uzlaştırın.',
      'ROAS ve MER’i katkı marjı ile birlikte yorumlayın.',
    ],
    sources: [
      {
        name: 'Meta Business Help Center — Purchase ROAS',
        url: 'https://www.facebook.com/business/help/721503286071276',
        note: 'Purchase ROAS metriğinin dönüşüm değeri ve reklam harcaması kapsamını açıklar.',
      },
      {
        name: 'Google Analytics Help — All channels performance report',
        url: 'https://support.google.com/analytics/answer/12198930?hl=en',
        note: 'Kanal performansında reklam maliyeti, gelir ve ROAS kapsamlarını açıklar.',
      },
    ],
    relatedGuides: [
      { title: 'MER nedir, nasıl hesaplanır?', href: '/rehberler/mer-nedir-nasil-hesaplanir' },
      { title: 'ROAS yüksekken kâr neden düşebilir?', href: '/rehberler/roas-yuksekken-kar-neden-duser' },
      { title: 'Haftalık reklam raporu nasıl hazırlanır?', href: '/rehberler/haftalik-reklam-raporu-nasil-hazirlanir' },
    ],
    relatedTerms: [
      { title: 'ROAS sözlük maddesi', href: '/sozluk/roas' },
      { title: 'MER sözlük maddesi', href: '/sozluk/mer' },
      { title: 'POAS sözlük maddesi', href: '/sozluk/poas' },
    ],
    relatedTool: { title: 'Başabaş ROAS Hesaplayıcı', href: '/araclar/basabas-roas-hesaplayici' },
  },
]

export function getMetricComparison(slug: string) {
  return metricComparisons.find((item) => item.slug === slug)
}

export function comparisonExampleMetrics(item: MetricComparison) {
  const totalSpend = item.example.metaSpend + item.example.googleSpend
  const attributedRevenue = item.example.metaAttributedRevenue + item.example.googleAttributedRevenue
  return {
    totalSpend,
    attributedRevenue,
    metaRoas: item.example.metaAttributedRevenue / item.example.metaSpend,
    googleRoas: item.example.googleAttributedRevenue / item.example.googleSpend,
    mer: item.example.totalRevenue / totalSpend,
    attributionOverlap: attributedRevenue - item.example.totalRevenue,
  }
}
