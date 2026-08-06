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
  scenarioQuestion: string
  scenarioNarrative: string
  answerTitle: string
  answerDetail: string
  featuredMetric: {
    label: string
    value: string
    detail: string
  }
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
    scenarioQuestion: 'ROAS değişmeden kârlılık değişebilir mi?',
    scenarioNarrative:
      'Baz senaryoda net satış 1 milyon TL ve reklam panelindeki ROAS 4,2’dir. Revize senaryoda net satış daha düşük olmasına rağmen sipariş karmasının değiştiği varsayılır. İki dönemde ROAS sabit tutularak kâr farkının medya veriminden değil, birim ekonomiden gelebileceği görünür hâle getirilir.',
    answerTitle: 'Aynı ROAS, aynı kâr demek değildir.',
    answerDetail:
      'Ürün maliyeti, komisyon, lojistik ve iade yükü değiştiğinde her reklam lirasından sonra kalan katkı da değişir.',
    featuredMetric: {
      label: 'AYNI ROAS',
      value: '4,2',
      detail: 'Farklı ürün karması, farklı katkı sonucu.',
    },
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
  {
    slug: 'urun-sayfasi-iade-katkisi-demo-vaka',
    title: 'Ürün Sayfası İyileşince İade Maliyeti Nasıl Değişir?',
    shortTitle: 'Ürün sayfası ve iade katkısı',
    eyebrow: 'ÜRÜN DENEYİMİ / DEMO VAKA',
    summary:
      'Aynı trafik ve ROAS korunurken ürün sayfasındaki teslimat, ölçü ve kullanım bilgisinin iade rezervi üzerindeki olası ekonomik etkisini gösteren simülasyon.',
    disclosure: DEMO_CASE_DISCLOSURE,
    duration: '2 × 4 haftalık karşılaştırma',
    updatedAt: '2026-08-02',
    scenarioQuestion: 'Daha açık ürün bilgisi, iade yükünü nasıl değiştirebilir?',
    scenarioNarrative:
      'Orta ölçekli bir ev ve yaşam satıcısı için kurulan bu simülasyonda trafik, net satış ve reklam harcaması sabit tutulur. Revize senaryoda ölçü, malzeme, kullanım ve teslimat bilgisinin ürün sayfasında tamamlandığı; beklenti kaynaklı iadelerin azaldığı varsayılır.',
    answerTitle: 'Dönüşüm aynı kalsa bile katkı iyileşebilir.',
    answerDetail:
      'İade rezervi net satışın %12’sinden %6’sına indiğinde, aynı ROAS ve aynı ciro daha fazla reklam sonrası katkı bırakır.',
    featuredMetric: {
      label: 'İADE REZERVİ',
      value: '%6',
      detail: 'Aynı satış, daha düşük iade yükü.',
    },
    baseline: {
      label: 'Eksik bilgi senaryosu',
      period: 'Simülasyon / Hafta 1–4',
      netRevenue: 600_000,
      adSpend: 142_857.14,
      costs: [
        { label: 'Ürün maliyeti', amount: 210_000, note: 'Net satışın %35,0’i' },
        { label: 'Komisyon ve ödeme', amount: 54_000, note: 'Net satışın %9,0’ı' },
        { label: 'Kargo ve paketleme', amount: 48_000, note: 'Net satışın %8,0’ı' },
        { label: 'İade maliyeti rezervi', amount: 72_000, note: 'Net satışın %12,0’si' },
      ],
    },
    revised: {
      label: 'Bilgi tamamlanmış senaryo',
      period: 'Simülasyon / Hafta 5–8',
      netRevenue: 600_000,
      adSpend: 142_857.14,
      costs: [
        { label: 'Ürün maliyeti', amount: 210_000, note: 'Net satışın %35,0’i' },
        { label: 'Komisyon ve ödeme', amount: 54_000, note: 'Net satışın %9,0’ı' },
        { label: 'Kargo ve paketleme', amount: 48_000, note: 'Net satışın %8,0’ı' },
        { label: 'İade maliyeti rezervi', amount: 36_000, note: 'Net satışın %6,0’sı' },
      ],
    },
    assumptions: [
      'İki dönemde de net satış, iptal ve gerçekleşmiş iade kapsamı aynı yöntemle hesaplandı.',
      'Reklam harcaması ve ROAS sabit tutuldu; değişimin medya veriminden gelmediği varsayıldı.',
      'Revize senaryoda ölçü tablosu, malzeme/kullanım bilgisi ve teslimat beklentisi ürün sayfasında görünür hâle getirildi.',
      'İade oranındaki fark yalnızca simülasyon varsayımıdır; nedensel etki iddiası için kontrollü test gerekir.',
      'KDV, sabit giderler ve yeniden satılabilir stok kazanımı kapsam dışıdır.',
    ],
    dataSources: [
      'Simüle edilmiş ürün sayfası kalite kontrolü: ölçü, malzeme, kullanım ve teslimat alanları',
      'Simüle edilmiş sipariş ve iade dışa aktarımı: SKU, iade nedeni ve iade maliyeti',
      'Simüle edilmiş reklam paneli: sabit harcama ve ilişkilendirilmiş gelir',
    ],
    diagnosis: [
      {
        title: 'İade nedenini sınıflandır',
        detail:
          '“Beklenti karşılanmadı”, ölçü, kalite ve teslimat nedenlerini tek iade oranı içinde kaybetme.',
      },
      {
        title: 'Ürün kanıtını görünür kıl',
        detail:
          'Ürünün kime uygun olduğunu; ölçü, malzeme, kullanım ve teslimat koşullarıyla sayfada açıkla.',
      },
      {
        title: 'Katkıyı yeniden hesapla',
        detail:
          'İade rezervindeki değişimi reklam sonrası katkıya taşı; dönüşüm artışını tek başına başarı sayma.',
      },
    ],
    decisions: [
      {
        title: 'İçerik sahibi ata',
        detail:
          'Ürün sayfası alanlarını kategori, müşteri hizmetleri ve operasyon sahipleriyle birlikte kontrol et.',
      },
      {
        title: 'İade nedeni kapısı',
        detail:
          'İade nedeni kodu yoksa ürün ve reklam performansını kesin ekonomik sonuç gibi raporlama.',
      },
      {
        title: 'Olgunlaşmış kohort',
        detail: 'İade penceresi kapanmadan ürün sayfası denemesinin katkı sonucunu kesinleştirme.',
      },
    ],
    limitations: [
      'Bu simülasyon ürün sayfası içeriğinin iade azalmasına neden olduğunu kanıtlamaz.',
      'Sezon, ürün karması, stok, teslimat gecikmesi ve müşteri segmenti sabit kabul edilmiştir.',
      'İade oranı tahmini; muhasebe, vergi veya operasyonel SLA yerine geçmez.',
      'Gerçek karar için kontrol/deney tasarımı ve kapanmış iade penceresi gerekir.',
    ],
    relatedGuides: [
      {
        title: 'Teslimat ve iade dönüşüm kontrol listesi',
        href: '/rehberler/teslimat-iade-donusum-kontrol-listesi',
      },
      {
        title: 'E-ticaret kârlılık işletim sistemi',
        href: '/rehberler/e-ticaret-karlilik-isletim-sistemi',
      },
      {
        title: 'AI alışveriş ajanlarına hazırlık',
        href: '/rehberler/ai-alisveris-ajanlarina-hazirlik',
      },
    ],
    relatedTools: [
      { title: 'Kâr Marjı Hesaplayıcı', href: '/araclar/kar-marji-hesaplayici' },
      {
        title: 'AI Alışveriş Görünürlük Denetimi',
        href: '/araclar/ai-alisveris-gorunurluk-denetimi',
      },
    ],
  },
  {
    slug: 'trendyol-kampanya-ciro-katki-demo-vaka',
    title: 'Trendyol Kampanyası Ciroyu Büyütürken Katkıyı Neden Düşürdü?',
    shortTitle: 'Trendyol kampanyası ve katkı',
    eyebrow: 'TRENDYOL / KAMPANYA EKONOMİSİ / DEMO VAKA',
    summary:
      'Orta ölçekli bir moda satıcısında kampanya cirosu büyürken indirim, ürün karması, komisyon, kargo ve iade etkisinin reklam sonrası katkıyı nasıl aşağı çekebileceğini gösteren simülasyon.',
    disclosure: DEMO_CASE_DISCLOSURE,
    duration: 'Kampanya öncesi ve kampanya dönemi',
    updatedAt: '2026-08-06',
    scenarioQuestion: 'Ciro %22 büyürken reklam sonrası katkı neden küçülebilir?',
    scenarioNarrative:
      'Trendyol’da satış yapan anonim bir moda markası profili için kampanya öncesi dört hafta ile kampanya dönemi karşılaştırılır. İki senaryoda da ROAS 4,0’dır. Kampanya döneminde net satış yükselirken daha derin indirim, düşük marjlı ürün karması, sipariş başı kargo ve iade rezervinin ekonomik sonucu izlenir.',
    answerTitle: 'Kampanya hacmi, birim ekonomiyi tek başına iyileştirmez.',
    answerDetail:
      'Simülasyonda net satış %22 artarken reklam sonrası katkı %56 azalır; çünkü büyümenin önemli bölümü daha düşük katkılı siparişlerden gelir.',
    featuredMetric: {
      label: 'KATKI DEĞİŞİMİ',
      value: '−%56',
      detail: 'Ciro büyüdü, reklam sonrası katkı küçüldü.',
    },
    baseline: {
      label: 'Kampanya öncesi',
      period: 'Simülasyon / Önceki 4 hafta',
      netRevenue: 900_000,
      adSpend: 225_000,
      costs: [
        { label: 'Ürün maliyeti', amount: 315_000, note: 'Net satışın %35,0’i' },
        { label: 'Pazaryeri komisyonu', amount: 135_000, note: 'Net satışın %15,0’i' },
        { label: 'Kargo ve paketleme', amount: 81_000, note: 'Net satışın %9,0’ı' },
        { label: 'İade maliyeti rezervi', amount: 45_000, note: 'Net satışın %5,0’ı' },
      ],
    },
    revised: {
      label: 'Kampanya dönemi',
      period: 'Simülasyon / Sonraki 4 hafta',
      netRevenue: 1_100_000,
      adSpend: 275_000,
      costs: [
        { label: 'Ürün maliyeti', amount: 440_000, note: 'Net satışın %40,0’ı' },
        { label: 'Pazaryeri komisyonu', amount: 165_000, note: 'Net satışın %15,0’i' },
        { label: 'Kargo ve paketleme', amount: 110_000, note: 'Net satışın %10,0’u' },
        { label: 'İade maliyeti rezervi', amount: 66_000, note: 'Net satışın %6,0’ı' },
      ],
    },
    assumptions: [
      'Tüm tutarlar örnektir; gerçek bir Trendyol mağazasına veya müşteriye ait değildir.',
      'Net satış, kampanya indirimi ile iptal ve iade sonrası satıcı gelirini temsil eder.',
      'ROAS iki dönemde de 4,0’da sabit tutuldu; kampanya görünürlüğü ve organik katkı ayrıca modellenmedi.',
      'KDV, pazaryeri stopajının nakit akışı etkisi, sabit giderler ve vergi sonrası kâr kapsam dışıdır.',
    ],
    dataSources: [
      'Simüle edilmiş Trendyol sipariş raporu: SKU, net satış, kampanya ve iade alanları',
      'Simüle edilmiş reklam raporu: ürün bazlı harcama ve ilişkilendirilmiş gelir',
      'Simüle edilmiş maliyet tablosu: ürün maliyeti, komisyon, kargo ve paketleme',
    ],
    diagnosis: [
      {
        title: 'Kampanya siparişini ayır',
        detail: 'Kampanyalı ve kampanyasız siparişleri aynı mağaza cirosu içinde kaybetme.',
      },
      {
        title: 'SKU katkısını hesapla',
        detail:
          'İndirim sonrası net fiyatı ürün, komisyon, kargo ve iade yüküyle birlikte değerlendir.',
      },
      {
        title: 'Hacim eşiğini sınırla',
        detail:
          'Kampanyanın kaybettiği birim katkıyı telafi etmek için gereken ek siparişi hesapla.',
      },
    ],
    decisions: [
      {
        title: 'Katılım listesi',
        detail: 'Kampanyaya yalnızca indirim sonrası asgari katkı eşiğini geçen SKU’lar alınır.',
      },
      {
        title: 'Kargo koridoru',
        detail:
          'Düşük sepetli ürünlerde set, çoklu alım veya sepet alt sınırı senaryosu test edilir.',
      },
      {
        title: 'Olgunlaşmış rapor',
        detail:
          'Kampanya sonucu iade penceresi kapanınca ürün ve sipariş kohortu bazında kesinleştirilir.',
      },
    ],
    limitations: [
      'Bu simülasyon Trendyol’un güncel komisyon veya kampanya koşullarını temsil etmez.',
      'Ciro artışının kampanyadan kaynaklandığını kanıtlayan kontrollü bir deney yoktur.',
      'Organik sıralama, kupon finansmanı, stok tükenmesi ve rakip fiyat tepkisi sabit kabul edilmiştir.',
      'Gösterilen sonuç net kâr değil, reklam sonrası katkıdır.',
    ],
    relatedGuides: [
      { title: 'Katkı payı nedir?', href: '/rehberler/katki-payi-nedir' },
      { title: 'Başabaş ROAS nasıl hesaplanır?', href: '/rehberler/basabas-roas-nasil-hesaplanir' },
      {
        title: 'E-ticaret kârlılık işletim sistemi',
        href: '/rehberler/e-ticaret-karlilik-isletim-sistemi',
      },
    ],
    relatedTools: [
      { title: 'Kâr Marjı Hesaplayıcı', href: '/araclar/kar-marji-hesaplayici' },
      { title: 'Başabaş ROAS Hesaplayıcı', href: '/araclar/basabas-roas-hesaplayici' },
    ],
  },
  {
    slug: 'hepsiburada-reklam-butce-katkisi-demo-vaka',
    title: 'Hepsiburada Reklam Bütçesi Yeniden Dağıtılınca Ne Değişti?',
    shortTitle: 'Hepsiburada reklam bütçesi',
    eyebrow: 'HEPSİBURADA / REKLAM KÂRLILIĞI / DEMO VAKA',
    summary:
      'Elektronik aksesuar satıcısında reklam bütçesinin yüksek ciro üreten SKU’lardan yeterli katkı bırakan ürünlere taşınmasının olası ekonomik etkisini karşılaştıran simülasyon.',
    disclosure: DEMO_CASE_DISCLOSURE,
    duration: '2 × 4 haftalık bütçe karşılaştırması',
    updatedAt: '2026-08-06',
    scenarioQuestion: 'Daha az reklam harcamasıyla daha fazla katkı bırakmak mümkün mü?',
    scenarioNarrative:
      'Hepsiburada’da elektronik aksesuar satan anonim bir mağaza profili için iki bütçe karması karşılaştırılır. Baz senaryoda harcama, ciro üreten fakat düşük katkılı ürünlerde yoğunlaşır. Revize senaryoda bütçenin ürün bazlı başabaş ROAS ve stok uygunluğuna göre dağıtıldığı varsayılır.',
    answerTitle: 'Mağaza ROAS’ı değil, ürün eşiği bütçe kararını değiştirdi.',
    answerDetail:
      'Simülasyonda reklam harcaması azalırken ROAS 3,5’ten 4,2’ye, reklam sonrası katkı ise yaklaşık %117 yükselir.',
    featuredMetric: {
      label: 'KATKI DEĞİŞİMİ',
      value: '2,2×',
      detail: 'Bütçe, yeterli katkı bırakan ürünlere taşındı.',
    },
    baseline: {
      label: 'Ciro odaklı bütçe',
      period: 'Simülasyon / Hafta 1–4',
      netRevenue: 750_000,
      adSpend: 214_285.71,
      costs: [
        { label: 'Ürün maliyeti', amount: 285_000, note: 'Net satışın %38,0’i' },
        { label: 'Pazaryeri komisyonu', amount: 90_000, note: 'Net satışın %12,0’si' },
        { label: 'Kargo ve paketleme', amount: 67_500, note: 'Net satışın %9,0’ı' },
        { label: 'İade maliyeti rezervi', amount: 30_000, note: 'Net satışın %4,0’ı' },
      ],
    },
    revised: {
      label: 'Katkı odaklı bütçe',
      period: 'Simülasyon / Hafta 5–8',
      netRevenue: 820_000,
      adSpend: 195_238.1,
      costs: [
        { label: 'Ürün maliyeti', amount: 303_400, note: 'Net satışın %37,0’si' },
        { label: 'Pazaryeri komisyonu', amount: 90_200, note: 'Net satışın %11,0’i' },
        { label: 'Kargo ve paketleme', amount: 69_700, note: 'Net satışın %8,5’i' },
        { label: 'İade maliyeti rezervi', amount: 24_600, note: 'Net satışın %3,0’ı' },
      ],
    },
    assumptions: [
      'Tüm tutarlar simüle edilmiştir; gerçek bir Hepsiburada mağazasına ait değildir.',
      'Revize senaryoda reklam bütçesi, stokta bulunan ve başabaş ROAS eşiğini geçen SKU’lara taşınmıştır.',
      'Organik satış etkisi, marka araması ve dönemsel talep sabit kabul edilmiştir.',
      'KDV, sabit ekip giderleri ve vergi sonrası kâr kapsam dışıdır.',
    ],
    dataSources: [
      'Simüle edilmiş Hepsiburada sipariş raporu: SKU, net satış, iptal ve iade',
      'Simüle edilmiş sponsorlu ürün raporu: SKU bazlı harcama ve gelir',
      'Simüle edilmiş ürün ekonomisi tablosu: maliyet, komisyon, kargo ve stok',
    ],
    diagnosis: [
      {
        title: 'Mağaza ortalamasını aç',
        detail: 'Tek ROAS değerini ürün, kategori ve kampanya kırılımına ayır.',
      },
      {
        title: 'Başabaş eşiğini bağla',
        detail:
          'Her SKU’nun katkı yapısına göre kabul edilebilir en düşük reklam verimini belirle.',
      },
      {
        title: 'Stok sinyalini ekle',
        detail: 'Stok riski taşıyan ürünü ölçekleyip reklam öğrenmesini ve talebi boşa harcama.',
      },
    ],
    decisions: [
      {
        title: 'SKU bütçe kapısı',
        detail:
          'Başabaş eşiğin altında kalan ürünlerde teklif düşürme veya durdurma kuralı tanımlanır.',
      },
      {
        title: 'Kazanan ürün listesi',
        detail:
          'Yeterli katkı, stok ve dönüşüm hacmi sağlayan ürünlere kontrollü ölçek bütçesi açılır.',
      },
      {
        title: 'Haftalık uzlaştırma',
        detail:
          'Reklam geliri, gerçekleşmiş net satış ve iade rezervi aynı SKU tablosunda birleştirilir.',
      },
    ],
    limitations: [
      'Bu simülasyon gerçek reklam kampanyası performansı veya müşteri sonucu değildir.',
      'Atıf penceresi, organik satış payı ve rakip teklifleri modelde sabit kabul edilmiştir.',
      'Hepsiburada’nın güncel reklam ve komisyon koşulları için satıcı paneli esas alınmalıdır.',
      'Katkı artışı nedensel etki olarak yorumlanamaz.',
    ],
    relatedGuides: [
      { title: 'Başabaş ROAS nasıl hesaplanır?', href: '/rehberler/basabas-roas-nasil-hesaplanir' },
      {
        title: 'ROAS yüksekken kâr neden düşer?',
        href: '/rehberler/roas-yuksekken-kar-neden-duser',
      },
      { title: 'Katkı payı nedir?', href: '/rehberler/katki-payi-nedir' },
    ],
    relatedTools: [
      { title: 'Başabaş ROAS Hesaplayıcı', href: '/araclar/basabas-roas-hesaplayici' },
      { title: 'Kâr Marjı Hesaplayıcı', href: '/araclar/kar-marji-hesaplayici' },
    ],
  },
  {
    slug: 'amazon-tr-buy-box-katki-demo-vaka',
    title: 'Amazon Türkiye’de Buy Box Kaybı Reklam Katkısını Nasıl Etkiledi?',
    shortTitle: 'Amazon TR Buy Box ve katkı',
    eyebrow: 'AMAZON TÜRKİYE / BUY BOX / DEMO VAKA',
    summary:
      'Ev elektroniği aksesuarlarında fiyat, stok ve teslimat koşulları iyileştiğinde Buy Box görünürlüğü ile reklam sonrası katkının birlikte nasıl okunabileceğini gösteren simülasyon.',
    disclosure: DEMO_CASE_DISCLOSURE,
    duration: '2 × 4 haftalık görünürlük karşılaştırması',
    updatedAt: '2026-08-06',
    scenarioQuestion: 'Reklam açıkken Buy Box kaybı neden görünmeyen bir maliyet yaratır?',
    scenarioNarrative:
      'Amazon Türkiye’de satış yapan anonim bir ev elektroniği aksesuarı mağazası için iki dönem modellenir. Baz dönemde Buy Box görünürlüğünün %73 olduğu, revize dönemde fiyat, stok ve teslimat koşulları iyileştirilerek %91’e çıktığı varsayılır. Reklam harcaması benzer kalırken net satış ve sipariş ekonomisi birlikte karşılaştırılır.',
    answerTitle: 'Reklam verimi, teklifin satışa uygunluğu kadar güçlüdür.',
    answerDetail:
      'Simülasyonda Buy Box görünürlüğü yükselirken ROAS 4,0’dan 4,5’e ve reklam sonrası katkı yaklaşık %112 artar.',
    featuredMetric: {
      label: 'BUY BOX GÖRÜNÜRLÜĞÜ',
      value: '%91',
      detail: 'Fiyat, stok ve teslimat sinyali birlikte izlendi.',
    },
    baseline: {
      label: 'Düşük görünürlük',
      period: 'Simülasyon / Hafta 1–4',
      netRevenue: 680_000,
      adSpend: 170_000,
      costs: [
        { label: 'Ürün maliyeti', amount: 258_400, note: 'Net satışın %38,0’i' },
        { label: 'Pazaryeri komisyonu', amount: 102_000, note: 'Net satışın %15,0’i' },
        { label: 'Gönderim ve paketleme', amount: 74_800, note: 'Net satışın %11,0’i' },
        { label: 'İade maliyeti rezervi', amount: 27_200, note: 'Net satışın %4,0’ı' },
      ],
    },
    revised: {
      label: 'Güçlendirilmiş görünürlük',
      period: 'Simülasyon / Hafta 5–8',
      netRevenue: 760_000,
      adSpend: 168_888.89,
      costs: [
        { label: 'Ürün maliyeti', amount: 281_200, note: 'Net satışın %37,0’si' },
        { label: 'Pazaryeri komisyonu', amount: 106_400, note: 'Net satışın %14,0’ı' },
        { label: 'Gönderim ve paketleme', amount: 79_800, note: 'Net satışın %10,5’i' },
        { label: 'İade maliyeti rezervi', amount: 22_800, note: 'Net satışın %3,0’ı' },
      ],
    },
    assumptions: [
      'Tüm veriler simüle edilmiştir; gerçek bir Amazon satıcısı veya marka sonucu değildir.',
      'Buy Box görünürlüğü baz dönemde %73, revize dönemde %91 olarak varsayılmıştır.',
      'Revize senaryoda fiyat, stok bulunurluğu ve teslimat vaadi birlikte iyileştirilmiştir.',
      'Kur etkisi, depolama, uzun dönemli stok ücreti, KDV ve sabit giderler kapsam dışıdır.',
    ],
    dataSources: [
      'Simüle edilmiş Amazon Business Report: sipariş, net satış ve oturum alanları',
      'Simüle edilmiş reklam raporu: harcama ve ilişkilendirilmiş satış',
      'Simüle edilmiş teklif ve maliyet tablosu: Buy Box, fiyat, stok, komisyon ve gönderim',
    ],
    diagnosis: [
      {
        title: 'Buy Box kaybını eşleştir',
        detail:
          'Reklam harcamasını Buy Box görünürlüğü ve satışa uygun teklif süresiyle aynı eksende izle.',
      },
      {
        title: 'Teklif ekonomisini kur',
        detail:
          'Fiyat düşüşünün dönüşüme etkisini ürün, komisyon ve gönderim katkısıyla birlikte hesapla.',
      },
      {
        title: 'Stok kesintisini ayır',
        detail: 'Stok dışı süreyi reklam zayıflığı veya talep düşüşü gibi yorumlama.',
      },
    ],
    decisions: [
      {
        title: 'Uygunluk kapısı',
        detail:
          'Buy Box ve stok uygunluğu zayıf ürünlerde reklam harcaması için koruyucu kural tanımlanır.',
      },
      {
        title: 'Fiyat tabanı',
        detail:
          'Buy Box kazanımı için yapılabilecek fiyat hareketi asgari katkı eşiğiyle sınırlandırılır.',
      },
      {
        title: 'Ortak takip tablosu',
        detail: 'Buy Box, stok, reklam ve katkı metrikleri haftalık tek SKU görünümünde izlenir.',
      },
    ],
    limitations: [
      'Buy Box oranı ve tüm finansal sonuçlar örnek varsayımlardır.',
      'Buy Box değişiminin satış artışına neden olduğu bu modelle kanıtlanamaz.',
      'Rakip fiyatı, satıcı performansı ve teslimat SLA’sı bağımsız olarak sabitlenmemiştir.',
      'Amazon’un güncel ücret ve reklam kuralları için Seller Central verisi esas alınmalıdır.',
    ],
    relatedGuides: [
      {
        title: 'E-ticaret kârlılık işletim sistemi',
        href: '/rehberler/e-ticaret-karlilik-isletim-sistemi',
      },
      { title: 'Başabaş ROAS nasıl hesaplanır?', href: '/rehberler/basabas-roas-nasil-hesaplanir' },
      { title: 'Katkı payı nedir?', href: '/rehberler/katki-payi-nedir' },
    ],
    relatedTools: [
      { title: 'Başabaş ROAS Hesaplayıcı', href: '/araclar/basabas-roas-hesaplayici' },
      { title: 'Kâr Marjı Hesaplayıcı', href: '/araclar/kar-marji-hesaplayici' },
    ],
  },
  {
    slug: 'n11-kupon-siparis-katkisi-demo-vaka',
    title: 'N11 Kuponu Siparişi Artırırken Katkıyı Neden Azalttı?',
    shortTitle: 'N11 kuponu ve sipariş katkısı',
    eyebrow: 'N11 / KUPON EKONOMİSİ / DEMO VAKA',
    summary:
      'Kişisel bakım ürünlerinde mağaza kuponu sipariş hacmini büyütürken indirim, ürün karması, kargo ve iade yükünün reklam sonrası katkıyı nasıl azaltabileceğini gösteren simülasyon.',
    disclosure: DEMO_CASE_DISCLOSURE,
    duration: 'Kuponsuz ve kuponlu 4 hafta',
    updatedAt: '2026-08-06',
    scenarioQuestion: 'Net satış %25 büyürken katkı neden %23 azalabilir?',
    scenarioNarrative:
      'N11’de kişisel bakım ürünü satan anonim bir mağaza profili için kuponsuz dönem ile mağaza kuponunun aktif olduğu dönem karşılaştırılır. İki dönemde de ROAS 4,0’dır. Kuponlu dönemde sipariş sayısının arttığı; ancak daha düşük fiyat, küçük sepet ve iade rezervinin sipariş ekonomisini zayıflattığı varsayılır.',
    answerTitle: 'Kupon, sipariş sayısını büyütürken katkı eşiğini aşabilir.',
    answerDetail:
      'Simülasyonda net satış %25 yükselmesine rağmen reklam sonrası katkı yaklaşık %23 azalır; ek hacim, kaybedilen birim katkıyı karşılamaz.',
    featuredMetric: {
      label: 'KATKI DEĞİŞİMİ',
      value: '−%23',
      detail: 'Sipariş arttı, kupon sonrası katkı geriledi.',
    },
    baseline: {
      label: 'Kuponsuz dönem',
      period: 'Simülasyon / Hafta 1–4',
      netRevenue: 520_000,
      adSpend: 130_000,
      costs: [
        { label: 'Ürün maliyeti', amount: 182_000, note: 'Net satışın %35,0’i' },
        { label: 'Pazaryeri komisyonu', amount: 67_600, note: 'Net satışın %13,0’ı' },
        { label: 'Kargo ve paketleme', amount: 52_000, note: 'Net satışın %10,0’u' },
        { label: 'İade maliyeti rezervi', amount: 20_800, note: 'Net satışın %4,0’ı' },
      ],
    },
    revised: {
      label: 'Kuponlu dönem',
      period: 'Simülasyon / Hafta 5–8',
      netRevenue: 650_000,
      adSpend: 162_500,
      costs: [
        { label: 'Ürün maliyeti', amount: 247_000, note: 'Net satışın %38,0’i' },
        { label: 'Pazaryeri komisyonu', amount: 84_500, note: 'Net satışın %13,0’ı' },
        { label: 'Kargo ve paketleme', amount: 71_500, note: 'Net satışın %11,0’i' },
        { label: 'İade maliyeti rezervi', amount: 32_500, note: 'Net satışın %5,0’ı' },
      ],
    },
    assumptions: [
      'Tüm tutarlar simüle edilmiştir; gerçek bir N11 mağazasına veya müşteriye ait değildir.',
      'Kupon maliyetinin tamamının satıcı tarafından karşılandığı ve net satışa yansıdığı varsayılmıştır.',
      'ROAS iki dönemde de 4,0’da sabit tutulmuş; organik görünürlük etkisi ayrıca modellenmemiştir.',
      'KDV, sabit giderler, vergi sonrası kâr ve tekrar satın alma etkisi kapsam dışıdır.',
    ],
    dataSources: [
      'Simüle edilmiş N11 sipariş raporu: kupon, SKU, net satış, iptal ve iade',
      'Simüle edilmiş reklam raporu: ürün bazlı harcama ve ilişkilendirilmiş gelir',
      'Simüle edilmiş ürün ekonomisi tablosu: maliyet, komisyon, kargo ve paketleme',
    ],
    diagnosis: [
      {
        title: 'Kuponlu siparişi ayır',
        detail:
          'Kupon kullanan ve kullanmayan siparişlerin sepet, kargo ve katkı farkını ayrı izle.',
      },
      {
        title: 'Hacim eşiğini hesapla',
        detail: 'Kaybedilen birim katkıyı telafi etmek için gereken ek sipariş sayısını belirle.',
      },
      {
        title: 'Ürün uygunluğunu sınırla',
        detail: 'Kuponu tüm mağazaya değil, indirim sonrası yeterli katkı bırakan ürünlere uygula.',
      },
    ],
    decisions: [
      {
        title: 'Sepet alt sınırı',
        detail:
          'Kupon eşiği sipariş başı kargo ve paketleme yükünü taşıyacak sepet tutarına bağlanır.',
      },
      {
        title: 'SKU hariç tutma',
        detail: 'Düşük marjlı veya yüksek iadeli ürünler kupon kapsamından çıkarılır.',
      },
      {
        title: 'Kohort takibi',
        detail:
          'Kuponla gelen müşterilerin tekrar satın alma ve iade davranışı ayrı kohortta izlenir.',
      },
    ],
    limitations: [
      'Bu simülasyon N11’in güncel kupon veya komisyon koşullarını temsil etmez.',
      'Sipariş artışının kupondan kaynaklandığını kanıtlayan kontrollü bir deney yoktur.',
      'Müşteri yaşam boyu değeri ve tekrar satın alma geliri modele dahil edilmemiştir.',
      'Gösterilen sonuç net kâr değil, reklam sonrası katkıdır.',
    ],
    relatedGuides: [
      { title: 'Katkı payı nedir?', href: '/rehberler/katki-payi-nedir' },
      { title: 'Başabaş ROAS nasıl hesaplanır?', href: '/rehberler/basabas-roas-nasil-hesaplanir' },
      {
        title: 'E-ticaret kârlılık işletim sistemi',
        href: '/rehberler/e-ticaret-karlilik-isletim-sistemi',
      },
    ],
    relatedTools: [
      { title: 'Kâr Marjı Hesaplayıcı', href: '/araclar/kar-marji-hesaplayici' },
      { title: 'Başabaş ROAS Hesaplayıcı', href: '/araclar/basabas-roas-hesaplayici' },
    ],
  },
  {
    slug: 'pazarama-yeni-kanal-katki-demo-vaka',
    title: 'Pazarama’da Yeni Kanal Büyürken Reklam Katkısı Nasıl İyileşti?',
    shortTitle: 'Pazarama yeni kanal katkısı',
    eyebrow: 'PAZARAMA / YENİ KANAL / DEMO VAKA',
    summary:
      'Ev düzenleme ürünlerinde yeni pazaryeri açılış bütçesinin geniş ürün dağılımından katkı ve stok eşiği geçen SKU’lara taşınmasının olası sonucunu karşılaştıran simülasyon.',
    disclosure: DEMO_CASE_DISCLOSURE,
    duration: 'İlk 4 hafta ve optimize 4 hafta',
    updatedAt: '2026-08-06',
    scenarioQuestion: 'Yeni kanalda daha kontrollü büyüme neden daha fazla katkı bırakabilir?',
    scenarioNarrative:
      'Pazarama’da yeni mağaza açan anonim bir ev düzenleme markası için ilk dört haftalık geniş ürün reklamı ile katkı kontrollü ikinci dönem karşılaştırılır. Revize senaryoda bütçenin stok, dönüşüm hacmi ve ürün bazlı başabaş ROAS eşiğine göre dağıtıldığı varsayılır.',
    answerTitle: 'Yeni kanalın ilk hedefi ciro değil, tekrarlanabilir ürün ekonomisidir.',
    answerDetail:
      'Simülasyonda net satış %15 artarken reklam harcaması azalır; ROAS 3,2’den 4,0’a ve reklam sonrası katkı yaklaşık %167 yükselir.',
    featuredMetric: {
      label: 'KATKI DEĞİŞİMİ',
      value: '2,7×',
      detail: 'Yeni kanal, SKU eşiğiyle kontrollü ölçeklendi.',
    },
    baseline: {
      label: 'Geniş açılış bütçesi',
      period: 'Simülasyon / İlk 4 hafta',
      netRevenue: 400_000,
      adSpend: 125_000,
      costs: [
        { label: 'Ürün maliyeti', amount: 140_000, note: 'Net satışın %35,0’i' },
        { label: 'Pazaryeri komisyonu', amount: 48_000, note: 'Net satışın %12,0’si' },
        { label: 'Kargo ve paketleme', amount: 40_000, note: 'Net satışın %10,0’u' },
        { label: 'İade maliyeti rezervi', amount: 16_000, note: 'Net satışın %4,0’ı' },
      ],
    },
    revised: {
      label: 'Katkı kontrollü bütçe',
      period: 'Simülasyon / Sonraki 4 hafta',
      netRevenue: 460_000,
      adSpend: 115_000,
      costs: [
        { label: 'Ürün maliyeti', amount: 156_400, note: 'Net satışın %34,0’ı' },
        { label: 'Pazaryeri komisyonu', amount: 50_600, note: 'Net satışın %11,0’i' },
        { label: 'Kargo ve paketleme', amount: 41_400, note: 'Net satışın %9,0’ı' },
        { label: 'İade maliyeti rezervi', amount: 13_800, note: 'Net satışın %3,0’ı' },
      ],
    },
    assumptions: [
      'Tüm tutarlar simüle edilmiştir; gerçek bir Pazarama mağazasına veya müşteriye ait değildir.',
      'Revize dönemde bütçenin yeterli stok ve katkı sağlayan SKU’lara taşındığı varsayılmıştır.',
      'Yeni kanal satışlarının diğer pazaryerlerinden ne ölçüde kaydığı ayrıca modellenmemiştir.',
      'KDV, entegrasyon, ekip ve sabit operasyon giderleri kapsam dışıdır.',
    ],
    dataSources: [
      'Simüle edilmiş Pazarama sipariş raporu: SKU, net satış, iptal ve iade',
      'Simüle edilmiş reklam raporu: ürün bazlı harcama ve ilişkilendirilmiş gelir',
      'Simüle edilmiş kanal açılış tablosu: maliyet, komisyon, kargo ve stok',
    ],
    diagnosis: [
      {
        title: 'Yeni ve kaymış satışı ayır',
        detail: 'Kanal cirosunu toplam işletme cirosundaki değişimle birlikte değerlendir.',
      },
      {
        title: 'Öğrenme bütçesini sınırla',
        detail: 'Yeni SKU test bütçesi ile ölçek bütçesini aynı performans hedefinde toplama.',
      },
      {
        title: 'Kazanan SKU’yu doğrula',
        detail: 'Katkı, stok ve yeterli sipariş hacmi oluşmadan ürünü kazanan ilan etme.',
      },
    ],
    decisions: [
      {
        title: 'İki bütçe havuzu',
        detail: 'Ürün keşfi ve katkı ölçekleme bütçeleri ayrı hedef ve sınırlarla yönetilir.',
      },
      {
        title: 'Kanal katkı raporu',
        detail: 'Pazarama sonucu diğer kanallardaki satış ve stok değişimiyle birlikte raporlanır.',
      },
      {
        title: 'Stok koruma kuralı',
        detail:
          'Ana kanalları riske atacak ürünlerde yeni kanal reklamı stok kapsamına göre sınırlandırılır.',
      },
    ],
    limitations: [
      'Bu simülasyon Pazarama’nın güncel ücret veya reklam koşullarını temsil etmez.',
      'Kanallar arası satış kayması ve yeni müşteri oranı ölçülmediği için ek büyüme kanıtlanamaz.',
      'Sezon, rakip fiyatı ve mağaza puanı iki dönemde sabit kabul edilmiştir.',
      'Sonuçlar gerçek işletme performansı veya gelecek dönem tahmini değildir.',
    ],
    relatedGuides: [
      {
        title: 'E-ticaret kârlılık işletim sistemi',
        href: '/rehberler/e-ticaret-karlilik-isletim-sistemi',
      },
      { title: 'Başabaş ROAS nasıl hesaplanır?', href: '/rehberler/basabas-roas-nasil-hesaplanir' },
      { title: 'Katkı payı nedir?', href: '/rehberler/katki-payi-nedir' },
    ],
    relatedTools: [
      { title: 'Başabaş ROAS Hesaplayıcı', href: '/araclar/basabas-roas-hesaplayici' },
      { title: 'Kâr Marjı Hesaplayıcı', href: '/araclar/kar-marji-hesaplayici' },
    ],
  },
  {
    slug: 'ciceksepeti-ozel-gun-kapasite-demo-vaka',
    title: 'ÇiçekSepeti Özel Gün Yoğunluğunda Cirodan Ne Kadar Katkı Kaldı?',
    shortTitle: 'ÇiçekSepeti özel gün kapasitesi',
    eyebrow: 'ÇİÇEKSEPETİ / OPERASYON KAPASİTESİ / DEMO VAKA',
    summary:
      'Hediye kategorisinde özel gün cirosu yükselirken hızlı gönderim, iptal ve iade yükünün katkıyı nasıl eritebildiğini; kapasite kontrollü senaryoyla karşılaştıran simülasyon.',
    disclosure: DEMO_CASE_DISCLOSURE,
    duration: 'Kontrolsüz ve kapasite kontrollü yoğunluk',
    updatedAt: '2026-08-06',
    scenarioQuestion: 'Daha düşük ciro, özel gün döneminde nasıl daha fazla katkı bırakabilir?',
    scenarioNarrative:
      'ÇiçekSepeti’nde kişiselleştirilmiş hediye satan anonim bir işletme profili için iki özel gün senaryosu karşılaştırılır. İlk senaryoda reklam ve sipariş kabulü operasyon kapasitesinden bağımsız ilerler. Revize senaryoda günlük sipariş sınırı, hazırlık süresi ve ürün uygunluğu kurallarıyla hacmin kontrollü tutulduğu varsayılır.',
    answerTitle: 'Operasyon kapasitesi aşılırsa ek sipariş ek katkı üretmeyebilir.',
    answerDetail:
      'Simülasyonda net satış %8 düşerken hızlı gönderim ve iptal/iade yükü azalır; reklam sonrası katkı yaklaşık %154 yükselir.',
    featuredMetric: {
      label: 'KATKI DEĞİŞİMİ',
      value: '2,5×',
      detail: 'Daha az ciro, daha yönetilebilir sipariş yükü.',
    },
    baseline: {
      label: 'Kontrolsüz yoğunluk',
      period: 'Simülasyon / Özel gün haftası',
      netRevenue: 780_000,
      adSpend: 195_000,
      costs: [
        { label: 'Ürün maliyeti', amount: 280_800, note: 'Net satışın %36,0’sı' },
        { label: 'Pazaryeri komisyonu', amount: 109_200, note: 'Net satışın %14,0’ı' },
        { label: 'Hızlı gönderim ve paketleme', amount: 109_200, note: 'Net satışın %14,0’ı' },
        { label: 'İptal ve iade rezervi', amount: 54_600, note: 'Net satışın %7,0’ı' },
      ],
    },
    revised: {
      label: 'Kapasite kontrollü yoğunluk',
      period: 'Simülasyon / Karşılaştırma haftası',
      netRevenue: 720_000,
      adSpend: 180_000,
      costs: [
        { label: 'Ürün maliyeti', amount: 252_000, note: 'Net satışın %35,0’i' },
        { label: 'Pazaryeri komisyonu', amount: 100_800, note: 'Net satışın %14,0’ı' },
        { label: 'Hızlı gönderim ve paketleme', amount: 79_200, note: 'Net satışın %11,0’i' },
        { label: 'İptal ve iade rezervi', amount: 28_800, note: 'Net satışın %4,0’ı' },
      ],
    },
    assumptions: [
      'Tüm tutarlar simüle edilmiştir; gerçek bir ÇiçekSepeti mağazasına veya müşteriye ait değildir.',
      'İki senaryoda da ROAS 4,0’da sabit tutulmuş; talep ve kreatif kalite aynı kabul edilmiştir.',
      'Revize senaryoda günlük kapasite, hazırlık süresi ve teslimat bölgesi kuralları uygulanmıştır.',
      'KDV, personel fazla mesaisi, ceza puanı ve uzun dönemli müşteri etkisi kapsam dışıdır.',
    ],
    dataSources: [
      'Simüle edilmiş ÇiçekSepeti sipariş raporu: ürün, teslimat tarihi, iptal ve iade',
      'Simüle edilmiş reklam raporu: harcama ve ilişkilendirilmiş gelir',
      'Simüle edilmiş operasyon tablosu: hazırlık kapasitesi, gönderim ve paketleme maliyeti',
    ],
    diagnosis: [
      {
        title: 'Saatlik kapasiteyi görünür kıl',
        detail:
          'Sipariş hedefini yalnız günlük ciroya değil, hazırlık ve kargo çıkış kapasitesine bağla.',
      },
      {
        title: 'Acil maliyeti ayır',
        detail:
          'Ek kurye, hızlı gönderim ve fazla paketleme giderlerini standart lojistik içinde kaybetme.',
      },
      {
        title: 'İptal nedenini eşleştir',
        detail: 'Stok, hazırlık ve teslimat kaynaklı iptalleri ürün talebi sorunundan ayır.',
      },
    ],
    decisions: [
      {
        title: 'Sipariş kabul sınırı',
        detail:
          'Ürün ve bölge bazlı günlük kapasite dolduğunda reklam ve teslimat vaadi sınırlandırılır.',
      },
      {
        title: 'Hazırlık matrisi',
        detail:
          'Kişiselleştirme süresi yüksek ürünler yoğunluk döneminde ayrı teslimat penceresine alınır.',
      },
      {
        title: 'Katkı bazlı vardiya',
        detail:
          'Ek kapasite kararı, karşılayacağı siparişlerin reklam sonrası katkısıyla birlikte değerlendirilir.',
      },
    ],
    limitations: [
      'Bu simülasyon ÇiçekSepeti’nin güncel ücret, ceza veya teslimat koşullarını temsil etmez.',
      'İki yoğunluk dönemi kontrollü deney değildir; talep kompozisyonu farklılaşabilir.',
      'Müşteri memnuniyeti ve mağaza puanının uzun dönemli satış etkisi modele dahil edilmemiştir.',
      'Gösterilen katkı, muhasebe net kârı değildir.',
    ],
    relatedGuides: [
      { title: 'Katkı payı nedir?', href: '/rehberler/katki-payi-nedir' },
      {
        title: 'E-ticaret kârlılık işletim sistemi',
        href: '/rehberler/e-ticaret-karlilik-isletim-sistemi',
      },
      {
        title: 'Teslimat ve iade dönüşüm kontrol listesi',
        href: '/rehberler/teslimat-iade-donusum-kontrol-listesi',
      },
    ],
    relatedTools: [
      { title: 'Kâr Marjı Hesaplayıcı', href: '/araclar/kar-marji-hesaplayici' },
      { title: 'Başabaş ROAS Hesaplayıcı', href: '/araclar/basabas-roas-hesaplayici' },
    ],
  },
]

export function getDemoCase(slug: string) {
  return demoCases.find((item) => item.slug === slug)
}
