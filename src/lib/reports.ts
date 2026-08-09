export type BenchmarkRow = {
  segment: string
  margin: string
  returnRate: string
  breakEvenRoas: string
  mer: string
  signal: string
}

export type BenchmarkReport = {
  slug: string
  title: string
  description: string
  publishedAt: string
  reviewedAt: string
  status: string
  sample: string
  methodology: string[]
  headline: { label: string; value: string; note: string }[]
  rows: BenchmarkRow[]
  decisions: { signal: string; meaning: string; action: string }[]
  limitations: string[]
  sources: { name: string; url: string; note: string }[]
  relatedGuides: { title: string; href: string }[]
  relatedTools: { title: string; href: string }[]
}

export const benchmarkReports: BenchmarkReport[] = [
  {
    slug: 'turkiye-e-ticaret-karlilik-nabzi-2026',
    title: 'Türkiye E-Ticaret Kârlılık Nabzı 2026',
    description:
      'Ürün marjı, iade oranı, başabaş ROAS ve MER arasındaki ilişkiyi açıkça etiketlenmiş simülasyon verisiyle inceleyen benchmark notu.',
    publishedAt: '2026-08-02',
    reviewedAt: '2026-08-02',
    status: 'Simülasyon benchmarkı · gerçek pazar ortalaması değildir',
    sample: '5 ürün ekonomisi senaryosu · 12 aylık planlama varsayımı · açık yöntem',
    methodology: [
      'Her senaryoda satış fiyatı, değişken maliyet, beklenen iade etkisi ve reklam gideri aynı para biriminde tanımlandı.',
      'Başabaş ROAS, reklam öncesi katkı marjının tersinden; MER, toplam gelir ÷ toplam pazarlama harcaması olarak hesaplandı.',
      'Değerler gerçek işletmelerden toplanmış pazar ortalaması değildir. Kullanıcı kendi muhasebe ve reklam verisiyle yeniden hesaplamalıdır.',
      'Amaç tek bir “iyi oran” ilan etmek değil, oranların ürün ekonomisiyle nasıl hareket ettiğini görünür kılmaktır.',
    ],
    headline: [
      { label: 'Orta senaryo başabaş ROAS', value: '3,1x', note: 'Katkı marjı %32 varsayımı' },
      { label: 'Yüksek iade etkisi', value: '+0,8x', note: 'Başabaş eşiğinde simüle artış' },
      { label: 'Planlama sinyali', value: 'MER + katkı', note: 'Tek başına ROAS yerine' },
    ],
    rows: [
      {
        segment: 'Yüksek marj / düşük iade',
        margin: '%45',
        returnRate: '%4',
        breakEvenRoas: '2,2x',
        mer: '5,0x',
        signal: 'Ölçekleme alanı geniş',
      },
      {
        segment: 'Orta marj / düşük iade',
        margin: '%32',
        returnRate: '%6',
        breakEvenRoas: '3,1x',
        mer: '4,2x',
        signal: 'Kontrollü büyüme',
      },
      {
        segment: 'Orta marj / yüksek iade',
        margin: '%25',
        returnRate: '%14',
        breakEvenRoas: '4,0x',
        mer: '3,4x',
        signal: 'İade ve ürün deneyimini çöz',
      },
      {
        segment: 'Düşük marj / düşük iade',
        margin: '%18',
        returnRate: '%4',
        breakEvenRoas: '5,6x',
        mer: '2,6x',
        signal: 'İndirim ve CPA baskısı',
      },
      {
        segment: 'Düşük marj / yüksek iade',
        margin: '%10',
        returnRate: '%18',
        breakEvenRoas: '10,0x',
        mer: '1,8x',
        signal: 'Kampanya öncesi yeniden fiyatla',
      },
    ],
    decisions: [
      {
        signal: 'ROAS hedefi başabaş eşiğin altında',
        meaning: 'Atfedilen gelir iyi görünse de reklam sonrası katkı negatif olabilir.',
        action: 'Bütçeyi artırmadan ürün marjı, teklif ve iade etkisini yeniden hesapla.',
      },
      {
        signal: 'ROAS sabit, MER düşüyor',
        meaning: 'Platform atfı korunurken şirket düzeyi toplam verimlilik bozuluyor olabilir.',
        action: 'Organik gelir, diğer kanallar ve tam pazarlama gideriyle uzlaştır.',
      },
      {
        signal: 'İade oranı yükseliyor',
        meaning:
          'Gelecekte gerçekleşecek maliyet bugünkü kampanya kararını olduğundan iyi gösterir.',
        action: 'Beklenen iade etkisini sipariş ekonomisine ekle ve ürün deneyimini incele.',
      },
    ],
    limitations: [
      'Senaryolar gerçek işletme örneklemi değildir; pazar payı veya sektör ortalaması iddiası taşımaz.',
      'Vergi, sabit gider, stok sermayesi, ödeme vadesi ve kanal bazlı atıf farkları kapsam dışıdır.',
      'Başabaş ROAS kârlılık eşiğidir; büyüme hedefi, nakit ihtiyacı ve müşteri yaşam boyu değeri ayrıca değerlendirilmelidir.',
      'Türkiye’de kategori, platform, sezon ve sözleşme koşulları değiştiği için değerler doğrudan kopyalanmamalıdır.',
    ],
    sources: [
      {
        name: 'T.C. Ticaret Bakanlığı — Türkiye’de E-Ticaretin Görünümü',
        url: 'https://ticaret.gov.tr/duyurular/turkiyede-e-ticaretin-gorunumu-raporu-yayinlandi-12-05-2026',
        note: 'Pazar bağlamı için başvurulabilecek resmî kaynak; bu simülasyonun veri seti değildir.',
      },
      {
        name: 'Veri Mimarı — Başabaş ROAS yöntemi',
        url: '/rehberler/basabas-roas-nasil-hesaplanir',
        note: 'Hesaplama tanımı ve ekonomik eşik açıklaması.',
      },
    ],
    relatedGuides: [
      { title: 'E-ticaret kârlılığı: baştan sona rehber', href: '/rehberler/e-ticaret-karliligi' },
      {
        title: 'ROAS yüksekken kâr neden düşebilir?',
        href: '/rehberler/roas-yuksekken-kar-neden-duser',
      },
      {
        title: 'İade oranı kârlılık hesabına nasıl eklenir?',
        href: '/rehberler/iade-orani-karlilik-hesabina-nasil-eklenir',
      },
    ],
    relatedTools: [
      { title: 'Başabaş ROAS Hesaplayıcı', href: '/araclar/basabas-roas-hesaplayici' },
      { title: 'Kâr Marjı Hesaplayıcı', href: '/araclar/kar-marji-hesaplayici' },
      {
        title: 'Kampanya Öncesi Marj Kontrol Listesi',
        href: '/sablonlar/kampanya-oncesi-marj-kontrol-listesi',
      },
    ],
  },
]

export function getBenchmarkReport(slug: string) {
  return benchmarkReports.find((item) => item.slug === slug)
}
