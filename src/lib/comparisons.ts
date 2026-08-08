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
    presentation: {
      title: string
      description: string
      inputs: Array<{ label: string; value: string }>
      results: Array<{ label: string; value: string; note: string; highlight?: boolean }>
      insight: { label: string; title: string; body: string }
    }
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
      bestFor: [
        'Kampanya ve kreatif karşılaştırması',
        'Teklif ve bütçe optimizasyonu',
        'Kanal içi teşhis',
      ],
      limits: [
        'Atıf modeline ve pencereye bağımlıdır',
        'Kanallar aynı siparişi sahiplenebilir',
        'Ürün ve operasyon maliyetlerini göstermez',
      ],
    },
    right: {
      name: 'MER',
      longName: 'Marketing Efficiency Ratio',
      question: 'Şirketin toplam geliri, toplam pazarlama harcamasına göre ne kadar verimli?',
      formula: 'Toplam dönem geliri ÷ Toplam pazarlama harcaması',
      numerator: 'Tanımı sabitlenmiş toplam dönem geliri',
      denominator: 'Tüm kanallar; tanıma göre medya veya tam yüklü pazarlama gideri',
      bestFor: [
        'Şirket düzeyi bütçe planlama',
        'Kanallar arası toplam verimlilik',
        'Ölçekleme eğilimini izleme',
      ],
      limits: [
        'Kanal veya kreatif teşhisi yapmaz',
        'Organik ve tekrar müşteri gelirini de içerebilir',
        'Gider kapsamı belgelenmezse karşılaştırılamaz',
      ],
    },
    example: {
      period: 'Simüle edilmiş aylık örnek',
      totalRevenue: 2_400_000,
      metaAttributedRevenue: 1_700_000,
      metaSpend: 300_000,
      googleAttributedRevenue: 1_000_000,
      googleSpend: 180_000,
      presentation: {
        title: 'Platformlar iyi görünürken toplam sonuç neden farklı?',
        description: 'Tüm değerler öğretici amaçlı simüle edilmiştir.',
        inputs: [
          { label: 'Toplam net gelir', value: '2.400.000 TL' },
          { label: 'Meta atfedilen gelir / harcama', value: '1.700.000 TL / 300.000 TL' },
          { label: 'Google atfedilen gelir / harcama', value: '1.000.000 TL / 180.000 TL' },
        ],
        results: [
          { label: 'META ROAS', value: '5,67', note: 'Platform atfı' },
          { label: 'GOOGLE ROAS', value: '5,56', note: 'Platform atfı' },
          {
            label: 'MEDYA MER',
            value: '5,00',
            note: 'Toplam gelir ÷ 480.000 TL',
            highlight: true,
          },
        ],
        insight: {
          label: 'ATIF UYARISI',
          title: 'Platformların toplam atfedilen geliri, mağaza gelirinden 300.000 TL daha yüksek.',
          body: 'Aynı sipariş iki platform tarafından sahiplenilmiş olabilir. Bu nedenle platform ROAS değerleri toplanmaz; toplam görünüm şirket geliriyle uzlaştırılır.',
        },
      },
    },
    decisions: [
      {
        situation: 'Kreatifleri karşılaştırma',
        primary: 'ROAS',
        companion: 'CTR + CVR + katkı',
        reason: 'Karar birimi reklam veya kreatiftir.',
      },
      {
        situation: 'Aylık toplam bütçeyi değerlendirme',
        primary: 'MER',
        companion: 'Katkı marjı + yeni müşteri payı',
        reason: 'Karar şirket düzeyi toplam harcamadır.',
      },
      {
        situation: 'Platform raporları toplam geliri aşıyor',
        primary: 'MER',
        companion: 'Atıf ve incrementality analizi',
        reason: 'Çifte atfın toplam görünümü bozması önlenir.',
      },
      {
        situation: 'Tek kampanyanın teklifini değiştirme',
        primary: 'ROAS',
        companion: 'Başabaş ROAS + CPA',
        reason: 'Ekonomik eşik kampanya sonucuyla karşılaştırılır.',
      },
      {
        situation: 'Kârlı büyüme kararı',
        primary: 'İkisi birlikte',
        companion: 'Reklam sonrası katkı + nakit',
        reason: 'Verimlilik, kâr ve nakit aynı şey değildir.',
      },
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
      {
        title: 'ROAS yüksekken kâr neden düşebilir?',
        href: '/rehberler/roas-yuksekken-kar-neden-duser',
      },
      {
        title: 'Haftalık reklam raporu nasıl hazırlanır?',
        href: '/rehberler/haftalik-reklam-raporu-nasil-hazirlanir',
      },
    ],
    relatedTerms: [
      { title: 'ROAS sözlük maddesi', href: '/sozluk/roas' },
      { title: 'MER sözlük maddesi', href: '/sozluk/mer' },
      { title: 'POAS sözlük maddesi', href: '/sozluk/poas' },
    ],
    relatedTool: { title: 'Başabaş ROAS Hesaplayıcı', href: '/araclar/basabas-roas-hesaplayici' },
  },
  {
    slug: 'poas-vs-roas',
    title: 'POAS vs ROAS: Geliri mi, Katkıyı mı Ölçmeli?',
    description:
      'ROAS’ın atfedilen gelir sinyalini, reklam sonrası katkı odaklı POAS ile aynı karar sisteminde doğru yerde kullanın.',
    category: 'Reklam Analitiği',
    reviewedAt: '2026-08-02',
    reviewDueAt: '2026-11-02',
    verdict:
      'Kampanya ve platform teşhisi için ROAS; ürün, komisyon, kargo ve iade kapsamını taşıyan ekonomik kararlar için POAS kullanın. POAS kapsamı şirket veri sözlüğünde açıkça yazılmalıdır.',
    left: {
      name: 'ROAS',
      longName: 'Return on Ad Spend',
      question: 'Reklam harcaması ne kadar atfedilen gelir üretti?',
      formula: 'Atfedilen reklam geliri ÷ Reklam harcaması',
      numerator: 'Platformun reklama yazdığı gelir',
      denominator: 'Seçilen reklam harcaması',
      bestFor: [
        'Kampanya ve kreatif karşılaştırması',
        'Teklif ve bütçe optimizasyonu',
        'Hızlı kanal teşhisi',
      ],
      limits: [
        'Maliyetleri ve iadeyi göstermez',
        'Atıf penceresine bağımlıdır',
        'Yüksek ROAS zarar etmeyi engellemez',
      ],
    },
    right: {
      name: 'POAS',
      longName: 'Profit on Ad Spend',
      question: 'Reklam sonrası tanımlanmış katkı, harcamaya göre ne kadar?',
      formula: 'Reklam sonrası katkı ÷ Reklam harcaması',
      numerator:
        'Net gelirden tanımlı ürün ve operasyon maliyetleri çıkarıldıktan sonra kalan katkı',
      denominator: 'Aynı kapsam ve dönemdeki reklam harcaması',
      bestFor: [
        'Ürün ve kanal kârlılığı',
        'Kampanya ölçekleme eşiği',
        'İade ve lojistik etkisini görmek',
      ],
      limits: [
        'Maliyet kapsamı değişirse karşılaştırılamaz',
        'İade olgunlaşması gecikebilir',
        'Muhasebe net kârıyla aynı değildir',
      ],
    },
    example: {
      period: 'Simüle edilmiş aylık örnek',
      totalRevenue: 1_000_000,
      metaAttributedRevenue: 1_000_000,
      metaSpend: 200_000,
      googleAttributedRevenue: 0,
      googleSpend: 0,
      presentation: {
        title: 'Aynı gelir sinyali, maliyetler eklendiğinde ne söyler?',
        description: 'Tüm değerler öğretici amaçlı simüle edilmiştir.',
        inputs: [
          { label: 'Atfedilen net gelir', value: '1.000.000 TL' },
          { label: 'Reklam harcaması', value: '200.000 TL' },
          { label: 'Ürün ve değişken operasyon gideri', value: '600.000 TL' },
        ],
        results: [
          { label: 'ROAS', value: '5,00', note: '1.000.000 ÷ 200.000' },
          {
            label: 'REKLAM SONRASI KATKI',
            value: '200.000 TL',
            note: 'Gelir − değişken gider − reklam',
          },
          { label: 'POAS', value: '1,00', note: '200.000 ÷ 200.000', highlight: true },
        ],
        insight: {
          label: 'KAPSAM UYARISI',
          title: '5,00 ROAS, bu örnekte yalnızca 1,00 POAS üretiyor.',
          body: 'ROAS gelir üretimini gösterirken POAS tanımladığınız maliyet katmanından sonra kalan katkıyı gösterir. “Kâr” kapsamı değişirse POAS da değişir.',
        },
      },
    },
    decisions: [
      {
        situation: 'Kreatifleri hızlı karşılaştırma',
        primary: 'ROAS',
        companion: 'CTR + CVR + katkı',
        reason: 'İlk teşhis platform gelir sinyalinde yapılır.',
      },
      {
        situation: 'Ürünü ölçekleme',
        primary: 'POAS',
        companion: 'İade + stok + nakit',
        reason: 'Ekonomik eşik gelirden değil katkıdan gelir.',
      },
      {
        situation: 'İade oranı yükseliyor',
        primary: 'POAS',
        companion: 'ROAS + iade kohortu',
        reason: 'Gelir korunurken gerçek katkı eriyebilir.',
      },
      {
        situation: 'Teklif ve bütçe değişikliği',
        primary: 'İkisi birlikte',
        companion: 'Başabaş ROAS + maksimum CPA',
        reason: 'Platform sinyali ekonomik eşikle sınanır.',
      },
    ],
    checklist: [
      'POAS katkısına giren maliyetleri veri sözlüğüne yazın.',
      'ROAS atıf penceresini ve kaynağını belirtin.',
      'İade ve iptal olgunlaşmasını aynı dönemde değerlendirin.',
      'POAS’ı net kâr veya nakit akışı diye adlandırmayın.',
      'İki metriği başabaş eşik ve yeni müşteri kalitesiyle birlikte okuyun.',
    ],
    sources: [
      {
        name: 'Meta Business Help Center — Purchase ROAS',
        url: 'https://www.facebook.com/business/help/721503286071276',
        note: 'Platform ROAS kapsamı için.',
      },
      {
        name: 'Shopify — Contribution margin',
        url: 'https://www.shopify.com/blog/contribution-margin',
        note: 'Katkı maliyetlerinin kapsamı için.',
      },
    ],
    relatedGuides: [
      {
        title: 'ROAS yüksekken kâr neden düşebilir?',
        href: '/rehberler/roas-yuksekken-kar-neden-duser',
      },
      { title: 'Katkı payı nedir?', href: '/rehberler/katki-payi-nedir' },
    ],
    relatedTerms: [
      { title: 'ROAS sözlük maddesi', href: '/sozluk/roas' },
      { title: 'Katkı payı sözlük maddesi', href: '/sozluk/katki-payi' },
    ],
    relatedTool: { title: 'Başabaş ROAS Hesaplayıcı', href: '/araclar/basabas-roas-hesaplayici' },
  },
  {
    slug: 'cpa-vs-cac',
    title: 'CPA vs CAC: Sipariş Maliyetini mi, Yeni Müşteriyi mi Ölçmeli?',
    description:
      'Dönüşüm başına reklam maliyeti ile doğrulanmış yeni müşteri edinme maliyetini ayırın; tekrar siparişlerin ve tam yüklü giderlerin sonucu nasıl değiştirdiğini görün.',
    category: 'Müşteri Ekonomisi',
    reviewedAt: '2026-08-02',
    reviewDueAt: '2026-11-02',
    verdict:
      'Kampanya ve sipariş verimliliği için CPA; doğrulanmış yeni müşteri ekonomisi ve geri ödeme kararı için CAC kullanın. CPA’daki aksiyonu, CAC’daki yeni müşteri ve gider kapsamını açıkça tanımlayın.',
    left: {
      name: 'CPA',
      longName: 'Cost per Action / Acquisition',
      question: 'Tanımlanmış her aksiyon veya sipariş için ne kadar reklam harcandı?',
      formula: 'Reklam harcaması ÷ Tanımlanmış aksiyon sayısı',
      numerator: 'Seçilen kampanya veya kanalın reklam harcaması',
      denominator: 'Sipariş, form, kayıt veya raporda açıkça tanımlanmış başka bir aksiyon',
      bestFor: [
        'Kampanya ve reklam seti optimizasyonu',
        'Sipariş ekonomisini başabaş eşikle karşılaştırma',
        'Kısa dönem dönüşüm maliyeti teşhisi',
      ],
      limits: [
        'Her aksiyon yeni müşteriden gelmez',
        'Platform dönüşümü iptal ve mükerrer kayıt içerebilir',
        'Ajans, kreatif ve araç giderlerini çoğu zaman kapsamaz',
      ],
    },
    right: {
      name: 'CAC',
      longName: 'Customer Acquisition Cost',
      question: 'Doğrulanmış her yeni müşteriyi kazanmak için toplam ne kadar harcandı?',
      formula: 'Tanımlanmış edinme gideri ÷ Doğrulanmış yeni müşteri sayısı',
      numerator: 'Karara göre medya veya ajans, kreatif ve araçlar dahil tam yüklü edinme gideri',
      denominator:
        'CRM veya sipariş sistemiyle ilk kez alışveriş yaptığı doğrulanmış tekil müşteri',
      bestFor: [
        'Yeni müşteri bütçesi ve kanal karması',
        'Katkı LTV ve geri ödeme süresi analizi',
        'Edinme kohortlarının kalitesini karşılaştırma',
      ],
      limits: [
        'Yeni müşteri kimliği güvenilir biçimde doğrulanmalıdır',
        'Gider kapsamı ekipler arasında değişebilir',
        'Tek başına müşteri kalitesini ve geri ödemeyi göstermez',
      ],
    },
    example: {
      period: 'Simüle edilmiş aylık örnek',
      totalRevenue: 720_000,
      metaAttributedRevenue: 720_000,
      metaSpend: 120_000,
      googleAttributedRevenue: 0,
      googleSpend: 30_000,
      presentation: {
        title: 'Aynı ayda CPA neden CAC’dan daha düşük görünebilir?',
        description: 'Tüm değerler öğretici amaçlı simüle edilmiştir.',
        inputs: [
          { label: 'Medya harcaması / tamamlanan sipariş', value: '120.000 TL / 600' },
          { label: 'Tam yüklü edinme gideri', value: '150.000 TL' },
          { label: 'Doğrulanmış yeni müşteri', value: '400' },
        ],
        results: [
          { label: 'SİPARİŞ CPA', value: '200 TL', note: '120.000 ÷ 600 sipariş' },
          { label: 'YENİ MÜŞTERİ CAC', value: '375 TL', note: '150.000 ÷ 400 müşteri' },
          { label: 'KAPSAM FARKI', value: '175 TL', note: 'CAC − CPA', highlight: true },
        ],
        insight: {
          label: 'KİMLİK UYARISI',
          title: '600 siparişin yalnızca 400’ü yeni müşteriye ait.',
          body: 'Tekrar müşterilerin siparişleri CPA’yı düşürebilir. CAC ise yalnızca ilk kez alışveriş yapan doğrulanmış müşterileri ve seçilen edinme gideri kapsamını kullanır.',
        },
      },
    },
    decisions: [
      {
        situation: 'Kampanya teklifini değiştirme',
        primary: 'CPA',
        companion: 'CVR + başabaş CPA',
        reason: 'Karar birimi kampanyanın tanımlanmış dönüşümüdür.',
      },
      {
        situation: 'Yeni müşteri bütçesini planlama',
        primary: 'CAC',
        companion: '90 günlük katkı LTV',
        reason: 'Edinme maliyeti yeni müşterinin üreteceği katkıyla karşılaştırılır.',
      },
      {
        situation: 'Tekrar sipariş payı yükseliyor',
        primary: 'İkisi birlikte',
        companion: 'Yeni müşteri oranı + CRM doğrulaması',
        reason: 'Sipariş CPA’sı iyileşirken yeni müşteri CAC’ı bozulabilir.',
      },
      {
        situation: 'Kanal kohortlarını karşılaştırma',
        primary: 'CAC',
        companion: 'Katkı LTV + geri ödeme süresi',
        reason: 'Ucuz edinim, düşük tekrar katkısını gizleyebilir.',
      },
    ],
    checklist: [
      'CPA’daki aksiyonu sipariş, form veya kayıt olarak açıkça adlandırın.',
      'Platform siparişini gerçekleşen sipariş ve iptal verisiyle uzlaştırın.',
      'Yeni müşteriyi tekil müşteri kimliği ve ilk sipariş tarihiyle doğrulayın.',
      'CAC giderinin medya mı, tam yüklü mü olduğunu yazın.',
      'CAC’ı aynı kohortun katkı LTV’si ve geri ödeme süresiyle birlikte okuyun.',
    ],
    sources: [
      {
        name: 'Google Analytics Help — All channels performance report',
        url: 'https://support.google.com/analytics/answer/12198930?hl=en',
        note: 'Reklam maliyeti ve dönüşüm başına maliyet kapsamlarını açıklar.',
      },
      {
        name: 'Google Ads Help — About customer lifecycle goals',
        url: 'https://support.google.com/google-ads/answer/12080169?hl=en',
        note: 'Yeni müşteri edinme hedeflerinde birinci taraf müşteri sinyallerinin kullanımını açıklar.',
      },
      {
        name: 'Stripe — Customer lifetime value',
        url: 'https://stripe.com/resources/more/customer-lifetime-value',
        note: 'Müşteri yaşam boyu değeri ile edinme maliyetini birlikte değerlendirme yaklaşımını açıklar.',
      },
    ],
    relatedGuides: [
      { title: 'Maksimum CPA nasıl hesaplanır?', href: '/rehberler/maksimum-cpa-nasil-hesaplanir' },
      {
        title: 'Yeni müşteri CAC ve 90 günlük katkı LTV nasıl hesaplanır?',
        href: '/rehberler/yeni-musteri-cac-katki-ltv-nasil-hesaplanir',
      },
    ],
    relatedTerms: [
      { title: 'CPA sözlük maddesi', href: '/sozluk/cpa' },
      { title: 'CAC sözlük maddesi', href: '/sozluk/cac' },
      { title: 'Katkı payı sözlük maddesi', href: '/sozluk/katki-payi' },
    ],
    relatedTool: {
      title: 'Başabaş ROAS ve CPA Hesaplayıcı',
      href: '/araclar/basabas-roas-hesaplayici',
    },
  },
  {
    slug: 'brut-kar-vs-katki-payi',
    title: 'Brüt Kâr vs Katkı Payı: Ürün Gerçekte Ne Kadar Bırakıyor?',
    description:
      'Ürün maliyeti sonrası kalan brüt kâr ile komisyon, kargo ve diğer değişken giderler sonrası kalan katkı payını aynı sipariş üzerinde ayırın.',
    category: 'E-Ticaret Kârlılığı',
    reviewedAt: '2026-08-02',
    reviewDueAt: '2026-11-02',
    verdict:
      'Fiyat ve ürün maliyeti ekonomisini görmek için brüt kâr; siparişin sabit gider ve kâr için gerçekten ne bıraktığını görmek için katkı payı kullanın. İki metriğin maliyet kapsamını rapor başlığında yazın.',
    left: {
      name: 'Brüt Kâr',
      longName: 'Gross Profit',
      question: 'Net satıştan ürünün doğrudan maliyeti çıktıktan sonra ne kaldı?',
      formula: 'Net satış − Satılan malın maliyeti',
      numerator: 'İndirim ve iade kapsamı tanımlanmış net satış geliri',
      denominator: 'Oran için net satış; tutar hesabında payda kullanılmaz',
      bestFor: [
        'Fiyat ve ürün maliyeti analizi',
        'Tedarikçi ve ürün karması kararı',
        'Brüt marj eğilimini izleme',
      ],
      limits: [
        'Komisyon ve kargoyu çoğu tanımda içermez',
        'Reklam ve iade operasyonunu göstermez',
        'Kasada kalan veya net kâr değildir',
      ],
    },
    right: {
      name: 'Katkı Payı',
      longName: 'Contribution Margin',
      question: 'Net satıştan karar kapsamındaki tüm değişken giderler çıktıktan sonra ne kaldı?',
      formula: 'Net satış − Toplam değişken giderler',
      numerator:
        'Net satıştan ürün, komisyon, ödeme, fulfillment ve tanımlı diğer değişken giderler sonrası kalan tutar',
      denominator: 'Oran için net satış; tutar hesabında payda kullanılmaz',
      bestFor: [
        'Ürün, sipariş ve kanal kârlılığı',
        'Maksimum reklam ve indirim sınırı',
        'Sabit gider başabaş hacmi',
      ],
      limits: [
        'Değişken gider tanımı şirkete göre değişebilir',
        'Sabit giderleri ve vergiyi henüz çıkarmaz',
        'Pozitif katkı tek başına net kâr kanıtı değildir',
      ],
    },
    example: {
      period: 'Simüle edilmiş sipariş örneği',
      totalRevenue: 800,
      metaAttributedRevenue: 800,
      metaSpend: 160,
      googleAttributedRevenue: 0,
      googleSpend: 1,
      presentation: {
        title: 'Yüksek brüt marj, neden daha düşük katkı bırakabilir?',
        description: 'Tüm değerler öğretici amaçlı simüle edilmiştir.',
        inputs: [
          { label: 'Net satış', value: '800 TL' },
          { label: 'Ürün maliyeti', value: '360 TL' },
          { label: 'Komisyon + ödeme + kargo', value: '160 TL' },
        ],
        results: [
          { label: 'BRÜT KÂR', value: '440 TL', note: '%55 brüt marj' },
          { label: 'KATKI PAYI', value: '280 TL', note: '%35 katkı marjı' },
          {
            label: 'EK DEĞİŞKEN GİDER',
            value: '160 TL',
            note: 'Brüt kâr − katkı',
            highlight: true,
          },
        ],
        insight: {
          label: 'KAPSAM FARKI',
          title: '%55 brüt marjlı ürün, sipariş düzeyinde %35 katkı bırakıyor.',
          body: 'Brüt kâr ürün maliyeti katmanında durur. Katkı payı ise komisyon, ödeme ve fulfillment gibi satışla birlikte değişen giderleri de hesaba katar.',
        },
      },
    },
    decisions: [
      {
        situation: 'Tedarikçi fiyatını değerlendirme',
        primary: 'Brüt kâr',
        companion: 'Brüt marj + stok devir hızı',
        reason: 'Karar ürünün doğrudan maliyet katmanındadır.',
      },
      {
        situation: 'Pazaryeri ile kendi sitesini karşılaştırma',
        primary: 'Katkı payı',
        companion: 'Komisyon + kargo + iade',
        reason: 'Kanalın değişken giderleri sonucu farklılaştırır.',
      },
      {
        situation: 'İndirim sınırını belirleme',
        primary: 'Katkı payı',
        companion: 'Gerekli ek hacim + nakit',
        reason: 'İndirimden sonra sabit gider için kalan tutar ölçülür.',
      },
      {
        situation: 'Ürün karmasını kurma',
        primary: 'İkisi birlikte',
        companion: 'TL katkı + stok ve iade',
        reason: 'Ürün ekonomisi ile operasyon yükü birlikte görülür.',
      },
    ],
    checklist: [
      'Net satışın indirim, KDV ve iade kapsamını tanımlayın.',
      'Satılan malın maliyetini güncel ürün maliyetiyle eşleyin.',
      'Değişken giderleri ürün, kanal ve sipariş düzeyinde listeleyin.',
      'Brüt kâr ile katkı payını hem TL hem oran olarak gösterin.',
      'Katkı payını net kâr diye adlandırmayın.',
    ],
    sources: [
      {
        name: 'Shopify — Contribution margin vs. gross margin',
        url: 'https://www.shopify.com/blog/contribution-margin-vs-gross-margin',
        note: 'Katkı payı ile brüt marjın farklı maliyet kapsamlarını açıklar.',
      },
      {
        name: 'Shopify — Profit margin calculation',
        url: 'https://www.shopify.com/blog/what-is-profit-margin',
        note: 'Brüt, faaliyet ve net kâr marjı katmanlarını açıklar.',
      },
    ],
    relatedGuides: [
      {
        title: 'E-ticaret kâr marjı nasıl hesaplanır?',
        href: '/rehberler/e-ticaret-kar-marji-nasil-hesaplanir',
      },
      { title: 'Katkı payı nedir?', href: '/rehberler/katki-payi-nedir' },
      {
        title: 'İade oranı kârlılığa nasıl eklenir?',
        href: '/rehberler/iade-orani-karliliga-nasil-eklenir',
      },
    ],
    relatedTerms: [
      { title: 'Brüt kâr sözlük maddesi', href: '/sozluk/brut-kar' },
      { title: 'Katkı payı sözlük maddesi', href: '/sozluk/katki-payi' },
      { title: 'Kâr marjı sözlük maddesi', href: '/sozluk/kar-marji' },
    ],
    relatedTool: { title: 'Kâr Marjı Hesaplayıcı', href: '/araclar/kar-marji-hesaplayici' },
  },
  {
    slug: 'katki-payi-vs-net-kar',
    title: 'Katkı Payı vs Net Kâr: Satış Büyürken Şirket Kâr Ediyor mu?',
    description:
      'Siparişlerin sabit giderler için bıraktığı katkı ile dönem sonunda tüm giderler sonrası kalan net kârı ayırın; ürün ve şirket kararlarını aynı metrikle vermeyin.',
    category: 'E-Ticaret Kârlılığı',
    reviewedAt: '2026-08-02',
    reviewDueAt: '2026-11-02',
    verdict:
      'Ürün, sipariş ve kanal kararları için katkı payı; şirketin dönemsel finansal sonucu için net kâr kullanın. Pozitif katkı ölçekleme sinyali olabilir fakat toplam katkı sabit ve diğer giderleri karşılamadan net kâr oluşmaz.',
    left: {
      name: 'Katkı Payı',
      longName: 'Contribution Margin',
      question:
        'Satışlar değişken giderlerden sonra sabit gider ve kâr için ne kadar kaynak bıraktı?',
      formula: 'Net satış − Toplam değişken giderler',
      numerator: 'Ürün, sipariş, kanal veya şirket düzeyinde toplam katkı tutarı',
      denominator: 'Oran için net satış; tutar hesabında payda kullanılmaz',
      bestFor: [
        'Ürün ve kanal ölçekleme kararı',
        'Başabaş hacim ve kapasite planı',
        'Fiyat, indirim ve reklam sınırı',
      ],
      limits: [
        'Sabit giderleri henüz çıkarmaz',
        'Finansman, vergi ve dönemsel diğer giderleri göstermez',
        'Maliyet sınıflandırması değişirse karşılaştırma bozulur',
      ],
    },
    right: {
      name: 'Net Kâr',
      longName: 'Net Profit',
      question: 'Dönemin bütün gelir ve giderleri sonrasında şirkette ne kaldı?',
      formula: 'Toplam gelir − Toplam giderler',
      numerator: 'Faaliyet, finansman, vergi ve diğer bütün giderler sonrası kalan dönem sonucu',
      denominator: 'Net kâr marjı için net satış; tutar hesabında payda kullanılmaz',
      bestFor: [
        'Şirket düzeyi finansal sağlık',
        'Dönem ve bütçe performansı',
        'Toplam gider tabanı ve sürdürülebilirlik',
      ],
      limits: [
        'Ürün düzeyinde hızlı teşhis için fazla toplulaştırılmıştır',
        'Tahakkuk ve muhasebe sınıflandırmalarına bağlıdır',
        'Nakit akışıyla aynı şey değildir',
      ],
    },
    example: {
      period: 'Simüle edilmiş aylık örnek',
      totalRevenue: 3_000_000,
      metaAttributedRevenue: 1_800_000,
      metaSpend: 500_000,
      googleAttributedRevenue: 900_000,
      googleSpend: 250_000,
      presentation: {
        title: 'Pozitif katkı neden aynı tutarda net kâra dönüşmez?',
        description: 'Tüm değerler öğretici amaçlı simüle edilmiştir.',
        inputs: [
          { label: 'Net satış', value: '3.000.000 TL' },
          { label: 'Toplam değişken gider', value: '2.100.000 TL' },
          { label: 'Sabit ve diğer dönem giderleri', value: '650.000 TL' },
        ],
        results: [
          { label: 'KATKI PAYI', value: '900.000 TL', note: '%30 katkı marjı' },
          { label: 'NET KÂR', value: '250.000 TL', note: '%8,3 net marj' },
          { label: 'DÖNEM GİDERİ', value: '650.000 TL', note: 'Katkı − net kâr', highlight: true },
        ],
        insight: {
          label: 'SEVİYE UYARISI',
          title: '900.000 TL katkının 650.000 TL’si sabit ve diğer dönem giderlerini karşılıyor.',
          body: 'Katkı payı ürün ve kanal ekonomisini yönetir. Net kâr ise bütün şirket sonucunu gösterir. İki sayı arasındaki fark, gider tabanının neden ayrıca yönetilmesi gerektiğini açıklar.',
        },
      },
    },
    decisions: [
      {
        situation: 'Bir ürünü ölçekleme',
        primary: 'Katkı payı',
        companion: 'İade + stok + nakit döngüsü',
        reason: 'Ek siparişin şirkete bıraktığı kaynak ölçülür.',
      },
      {
        situation: 'Aylık şirket performansı',
        primary: 'Net kâr',
        companion: 'Nakit akışı + bütçe sapması',
        reason: 'Bütün gelir ve giderlerin dönem sonucu değerlendirilir.',
      },
      {
        situation: 'Katkı büyüyor, net kâr düşüyor',
        primary: 'İkisi birlikte',
        companion: 'Sabit gider + kapasite + finansman',
        reason: 'Büyüyen birim ekonomisi artan gider tabanını gizleyebilir.',
      },
      {
        situation: 'Kanal kapatma kararı',
        primary: 'Katkı payı',
        companion: 'Kaçınılabilir sabit gider + müşteri etkisi',
        reason: 'Dağıtılmış genel gider kanalı olduğundan kötü gösterebilir.',
      },
    ],
    checklist: [
      'Değişken ve sabit gider sınıflarını karar öncesinde tanımlayın.',
      'Katkıyı ürün, kanal ve toplam şirket düzeyinde ayrı gösterin.',
      'Net kârı aynı dönem ve muhasebe kapsamıyla karşılaştırın.',
      'Dağıtılmış sabit gideri ürün katkısıyla karıştırmayın.',
      'Net kârın yanında nakit akışı ve işletme sermayesini ayrıca kontrol edin.',
    ],
    sources: [
      {
        name: 'Shopify — Contribution margin vs. gross margin',
        url: 'https://www.shopify.com/blog/contribution-margin-vs-gross-margin',
        note: 'Katkı payının değişken gider kapsamını ve brüt marjdan farkını açıklar.',
      },
      {
        name: 'Shopify — Profit margin calculation',
        url: 'https://www.shopify.com/blog/what-is-profit-margin',
        note: 'Net kâr ve net marj dahil farklı kâr katmanlarını açıklar.',
      },
    ],
    relatedGuides: [
      { title: 'Katkı payı nedir?', href: '/rehberler/katki-payi-nedir' },
      {
        title: 'E-ticaret kâr marjı nasıl hesaplanır?',
        href: '/rehberler/e-ticaret-kar-marji-nasil-hesaplanir',
      },
      {
        title: 'E-ticaret kârlılık işletim sistemi',
        href: '/rehberler/e-ticaret-karlilik-isletim-sistemi',
      },
    ],
    relatedTerms: [
      { title: 'Katkı payı sözlük maddesi', href: '/sozluk/katki-payi' },
      { title: 'Net kâr sözlük maddesi', href: '/sozluk/net-kar' },
      { title: 'Brüt kâr sözlük maddesi', href: '/sozluk/brut-kar' },
    ],
    relatedTool: { title: 'Kâr Marjı Hesaplayıcı', href: '/araclar/kar-marji-hesaplayici' },
  },
  {
    slug: 'roas-vs-basabas-roas',
    title: 'ROAS vs Başabaş ROAS: Sonuç mu, Ekonomik Eşik mi?',
    description:
      'Kampanyanın gerçekleşen gelir verimliliği ile ürün ekonomisinin zarar etmeme eşiğini ayırın; ROAS sonucunu kendi başabaş değeriyle karşılaştırın.',
    category: 'Reklam Analitiği',
    reviewedAt: '2026-08-04',
    reviewDueAt: '2026-11-04',
    verdict:
      'ROAS gerçekleşen veya raporlanan kampanya sonucudur; başabaş ROAS ise ürün maliyetlerinden türetilen zarar etmeme eşiğidir. Kampanyayı sektör ortalamasıyla değil, aynı kapsamda hesaplanan kendi eşiğinizle değerlendirin.',
    left: {
      name: 'ROAS',
      longName: 'Return on Ad Spend',
      question: 'Reklam harcaması ne kadar atfedilen gelir üretti?',
      formula: 'Atfedilen reklam geliri ÷ Reklam harcaması',
      numerator: 'Platformun veya analitik sisteminin reklama atfettiği gelir',
      denominator: 'Aynı kampanya, kanal ve dönemin reklam harcaması',
      bestFor: [
        'Gerçekleşen kampanya performansı',
        'Kreatif ve teklif karşılaştırması',
        'Kanal içi bütçe optimizasyonu',
      ],
      limits: [
        'Atıf modeline ve penceresine bağımlıdır',
        'Ürün ve operasyon maliyetlerini göstermez',
        'Tek başına kâr veya zarar sınırını söylemez',
      ],
    },
    right: {
      name: 'Başabaş ROAS',
      longName: 'Break-even ROAS',
      question: 'Ürünün değişken maliyetleri karşılaması için gereken minimum ROAS nedir?',
      formula: 'Net satış geliri ÷ Reklam öncesi katkı payı',
      numerator: 'İndirim ve iade kapsamı tanımlanmış net satış geliri',
      denominator:
        'Ürün, komisyon, ödeme, fulfillment ve beklenen iade sonrası reklam öncesi katkı',
      bestFor: [
        'Kampanya zarar etmeme eşiği',
        'Maksimum reklam maliyeti ve CPA',
        'Ürün bazlı hedef ROAS belirleme',
      ],
      limits: [
        'Başabaş noktası hedef kâr içermez',
        'Sabit gider ve nakit ihtiyacını tek başına çözmez',
        'Fiyat veya maliyet değiştiğinde yeniden hesaplanmalıdır',
      ],
    },
    example: {
      period: 'Simüle edilmiş ürün ve kampanya örneği',
      totalRevenue: 100_000,
      metaAttributedRevenue: 100_000,
      metaSpend: 30_000,
      googleAttributedRevenue: 0,
      googleSpend: 1,
      presentation: {
        title: 'İyi görünen ROAS, ürünün eşiğinin ne kadar üstünde?',
        description: 'Tüm değerler öğretici amaçlı simüle edilmiştir.',
        inputs: [
          { label: 'Atfedilen gelir / reklam harcaması', value: '100.000 TL / 30.000 TL' },
          { label: 'Sipariş başına net satış', value: '1.000 TL' },
          { label: 'Reklam öncesi sipariş katkısı', value: '380 TL' },
        ],
        results: [
          { label: 'GERÇEKLEŞEN ROAS', value: '3,33', note: '100.000 ÷ 30.000' },
          { label: 'BAŞABAŞ ROAS', value: '2,63', note: '1.000 ÷ 380' },
          { label: 'EŞİK ÜSTÜ FARK', value: '0,70x', note: 'ROAS − başabaş ROAS', highlight: true },
        ],
        insight: {
          label: 'EŞİK UYARISI',
          title:
            'Kampanya başabaş eşiğinin üstünde; fakat bu fark hedef kârın tamamını garanti etmez.',
          body: 'Başabaş ROAS sıfır kâr sınırıdır. Sabit gider, veri belirsizliği ve korunmak istenen kâr için operasyon hedefi bu değerden daha yüksek belirlenmelidir.',
        },
      },
    },
    decisions: [
      {
        situation: 'Kampanya sonucunu okumak',
        primary: 'ROAS',
        companion: 'Atıf penceresi + net gelir',
        reason: 'Gerçekleşen reklam verimliliği ölçülür.',
      },
      {
        situation: 'Zarar etmeme sınırını belirlemek',
        primary: 'Başabaş ROAS',
        companion: 'Maksimum CPA + katkı payı',
        reason: 'Eşik ürün ekonomisinden türetilir.',
      },
      {
        situation: 'Bütçeyi artırmak',
        primary: 'İkisi birlikte',
        companion: 'Marjinal ROAS + nakit',
        reason: 'Gerçekleşen sonuç ekonomik eşik ve ölçekleme etkisiyle karşılaştırılır.',
      },
      {
        situation: 'İndirim veya komisyon değişikliği',
        primary: 'Başabaş ROAS',
        companion: 'Yeni fiyat + değişken giderler',
        reason: 'Ekonomik eşik maliyet değişikliğiyle birlikte yenilenir.',
      },
    ],
    checklist: [
      'ROAS gelirinin atıf modelini ve penceresini yazın.',
      'Başabaş hesabında net satış ve değişken gider kapsamını sabitleyin.',
      'İade ve iptal etkisini olgunlaşmış kohortla güncelleyin.',
      'Başabaş ROAS’ı hedef ROAS diye kullanmayın.',
      'Her ürün veya marj grubu için eşiği ayrı kontrol edin.',
    ],
    sources: [
      {
        name: 'Meta Business Help Center — Purchase ROAS',
        url: 'https://www.facebook.com/business/help/721503286071276',
        note: 'Purchase ROAS metriğinin dönüşüm değeri ve reklam harcaması kapsamını açıklar.',
      },
      {
        name: 'Shopify — Contribution margin vs. gross margin',
        url: 'https://www.shopify.com/blog/contribution-margin-vs-gross-margin',
        note: 'Başabaş hesabının dayandığı katkı payı ve değişken gider kapsamını açıklar.',
      },
    ],
    relatedGuides: [
      {
        title: 'Başabaş ROAS nasıl hesaplanır?',
        href: '/rehberler/basabas-roas-nasil-hesaplanir',
      },
      {
        title: 'ROAS yüksekken kâr neden düşebilir?',
        href: '/rehberler/roas-yuksekken-kar-neden-duser',
      },
      { title: 'Maksimum CPA nasıl hesaplanır?', href: '/rehberler/maksimum-cpa-nasil-hesaplanir' },
    ],
    relatedTerms: [
      { title: 'ROAS sözlük maddesi', href: '/sozluk/roas' },
      { title: 'Başabaş ROAS sözlük maddesi', href: '/sozluk/basabas-roas' },
      { title: 'Katkı payı sözlük maddesi', href: '/sozluk/katki-payi' },
    ],
    relatedTool: { title: 'Başabaş ROAS Hesaplayıcı', href: '/araclar/basabas-roas-hesaplayici' },
  },
  {
    slug: 'donusum-orani-vs-ortalama-sepet-tutari',
    title: 'Dönüşüm Oranı vs Ortalama Sepet Tutarı: Hangi Büyüme Kaldıracı?',
    description:
      'Trafiğin siparişe dönüşme oranı ile her siparişin ortalama gelirini ayırın; gelir artışının hangi kaldıraçtan geldiğini ve katkıya dönüşüp dönüşmediğini görün.',
    category: 'Dönüşüm Optimizasyonu',
    reviewedAt: '2026-08-04',
    reviewDueAt: '2026-11-04',
    verdict:
      'Satın alma sürtünmesini ve trafik kalitesini anlamak için dönüşüm oranı; sepet, bundle ve cross-sell ekonomisi için ortalama sepet tutarı kullanın. Gelir büyümesini açıklamak için ikisini trafik ve katkı marjıyla birlikte okuyun.',
    left: {
      name: 'Dönüşüm Oranı',
      longName: 'Conversion Rate — CVR',
      question: 'Seçilen trafik biriminin ne kadarı tanımlanmış dönüşümü tamamladı?',
      formula: 'Dönüşüm sayısı ÷ Seçilen trafik birimi × 100',
      numerator: 'Satın alma veya raporda açıkça tanımlanmış dönüşüm sayısı',
      denominator: 'Oturum, kullanıcı ya da tıklama olarak sabitlenmiş trafik birimi',
      bestFor: [
        'Ürün sayfası ve checkout teşhisi',
        'Cihaz ve kanal kalitesi karşılaştırması',
        'A/B testi ve sürtünme analizi',
      ],
      limits: [
        'Payda türü değişirse oran karşılaştırılamaz',
        'Ürün karması ve sipariş değerini göstermez',
        'Düşük kaliteli indirimli dönüşümler oranı yükseltebilir',
      ],
    },
    right: {
      name: 'Ortalama Sepet Tutarı',
      longName: 'Average Order Value — AOV',
      question: 'Tamamlanan her sipariş ortalama ne kadar gelir üretti?',
      formula: 'Toplam sipariş geliri ÷ Tamamlanan sipariş sayısı',
      numerator: 'Kapsamı brüt veya net olarak tanımlanmış sipariş geliri',
      denominator: 'Aynı dönemdeki tamamlanmış ve geçerli sipariş sayısı',
      bestFor: [
        'Bundle ve cross-sell kararı',
        'Ücretsiz kargo eşiği',
        'Sepet ve ürün karması analizi',
      ],
      limits: [
        'Büyük tekil siparişlerden etkilenebilir',
        'Marj ve katkı kalitesini göstermez',
        'İade ve iptal kapsamı sonucu değiştirebilir',
      ],
    },
    example: {
      period: 'Simüle edilmiş haftalık örnek',
      totalRevenue: 200_000,
      metaAttributedRevenue: 200_000,
      metaSpend: 20_000,
      googleAttributedRevenue: 0,
      googleSpend: 1,
      presentation: {
        title: 'Aynı trafik, gelir sonucunu hangi iki kaldıraçla üretir?',
        description: 'Tüm değerler öğretici amaçlı simüle edilmiştir.',
        inputs: [
          { label: 'Oturum', value: '10.000' },
          { label: 'Tamamlanan sipariş', value: '250' },
          { label: 'Net sipariş geliri', value: '200.000 TL' },
        ],
        results: [
          { label: 'DÖNÜŞÜM ORANI', value: '%2,50', note: '250 ÷ 10.000' },
          { label: 'ORTALAMA SEPET', value: '800 TL', note: '200.000 ÷ 250' },
          { label: 'OTURUM BAŞINA GELİR', value: '20 TL', note: 'CVR × AOV', highlight: true },
        ],
        insight: {
          label: 'KARMA UYARISI',
          title: 'Gelir aynı anda hem dönüşüm oranından hem sepet tutarından etkilenir.',
          body: 'Bir kaldıraç yükselirken diğeri düşebilir. Kararı yalnız toplam gelirle değil, ürün karması, iade oranı ve sipariş başına katkıyla doğrulayın.',
        },
      },
    },
    decisions: [
      {
        situation: 'Checkout terkini azaltma',
        primary: 'Dönüşüm oranı',
        companion: 'Adım bazlı terk + hata oranı',
        reason: 'Sorun ziyaretin siparişe dönüşme sürecindedir.',
      },
      {
        situation: 'Ücretsiz kargo eşiği belirleme',
        primary: 'Ortalama sepet tutarı',
        companion: 'Katkı payı + kargo maliyeti',
        reason: 'Sepeti büyütmenin ek geliri ve maliyeti karşılaştırılır.',
      },
      {
        situation: 'Kampanya gelirini açıklama',
        primary: 'İkisi birlikte',
        companion: 'Trafik + ürün karması',
        reason: 'Gelir, trafik × dönüşüm oranı × ortalama sepet ilişkisiyle ayrıştırılır.',
      },
      {
        situation: 'Bundle veya cross-sell testi',
        primary: 'Ortalama sepet tutarı',
        companion: 'Dönüşüm oranı + sipariş katkısı',
        reason: 'Sepet büyürken dönüşüm veya marj kaybı olup olmadığı kontrol edilir.',
      },
    ],
    checklist: [
      'Dönüşüm olayını ve trafik paydasını rapor başlığında yazın.',
      'AOV gelirini brüt veya net olarak tanımlayın.',
      'İptal ve iade durumlarını aynı dönem kapsamıyla ele alın.',
      'Cihaz, kanal ve yeni/tekrar müşteri kırılımlarını ayırın.',
      'Her iki metriği sipariş başına katkı ve toplam gelirle doğrulayın.',
    ],
    sources: [
      {
        name: 'Google Analytics Help — Ecommerce metrics',
        url: 'https://support.google.com/analytics/answer/13428834?hl=en',
        note: 'Satın alma, oturum ve ürün kapsamlı e-ticaret metriklerinin ayrımını açıklar.',
      },
      {
        name: 'Google Analytics Help — All channels performance report',
        url: 'https://support.google.com/analytics/answer/12198930?hl=en',
        note: 'Kanal performansındaki dönüşüm, gelir ve maliyet metriklerinin kapsamını açıklar.',
      },
    ],
    relatedGuides: [
      {
        title: 'E-ticaret dashboardunda takip edilecek metrikler',
        href: '/rehberler/e-ticaret-dashboard-metrikleri',
      },
      {
        title: 'Teslimat, iade ve dönüşüm kontrol listesi',
        href: '/rehberler/teslimat-iade-donusum-kontrol-listesi',
      },
      {
        title: 'E-ticaret kâr marjı nasıl hesaplanır?',
        href: '/rehberler/e-ticaret-kar-marji-nasil-hesaplanir',
      },
    ],
    relatedTerms: [
      { title: 'Dönüşüm oranı sözlük maddesi', href: '/sozluk/donusum-orani' },
      { title: 'Ortalama sepet tutarı sözlük maddesi', href: '/sozluk/ortalama-sepet-tutari' },
      { title: 'Kâr marjı sözlük maddesi', href: '/sozluk/kar-marji' },
    ],
    relatedTool: {
      title: 'E-Ticaret Strateji ve Pazarlama Analizi',
      href: '/araclar/e-ticaret-strateji-pazarlama-analizi',
    },
  },
  {
    slug: 'degisken-gider-vs-sabit-gider',
    title: 'Değişken Gider vs Sabit Gider: Başabaş Noktasını Ne Belirler?',
    description:
      'Sipariş hacmiyle birlikte değişen maliyetleri dönem içinde doğrudan değişmeyen giderlerden ayırın; katkı payı ve başabaş hacmini doğru kurun.',
    category: 'E-Ticaret Kârlılığı',
    reviewedAt: '2026-08-04',
    reviewDueAt: '2026-11-04',
    verdict:
      'Ürün, komisyon, fulfillment ve karara göre reklamı değişken gider; kira, çekirdek ekip ve genel yönetimi kısa dönem kapasitesi içinde sabit gider olarak izleyin. Sınıflandırmayı karar birimine göre yazın; bazı giderler basamaklı veya karma davranabilir.',
    left: {
      name: 'Değişken Gider',
      longName: 'Variable Cost',
      question: 'Satış veya sipariş hacmi değiştiğinde toplamı hangi giderlerle birlikte değişir?',
      formula: 'Birim değişken gider × Satış veya sipariş adedi',
      numerator: 'Ürün, komisyon, ödeme, kargo, paketleme ve tanımlı diğer hacim giderleri',
      denominator: 'Birim tutar için sipariş veya ürün adedi',
      bestFor: [
        'Sipariş katkı payı hesabı',
        'Fiyat, indirim ve kanal kararı',
        'Başabaş ROAS ve maksimum CPA',
      ],
      limits: [
        'Birim maliyet hacim ve kanal ile değişebilir',
        'Reklam gibi giderlerin sınıfı karara göre farklılaşabilir',
        'Ortalama maliyet ürün farklarını gizleyebilir',
      ],
    },
    right: {
      name: 'Sabit Gider',
      longName: 'Fixed Cost',
      question:
        'Belirli kapasite ve zaman aralığında sipariş sayısından bağımsız hangi giderler oluşur?',
      formula: 'Başabaş adet = Toplam sabit gider ÷ Birim katkı payı',
      numerator:
        'Kira, çekirdek personel, genel yönetim ve kısa dönemde sabit kabul edilen giderler',
      denominator: 'Başabaş hesabında sipariş başına ağırlıklı katkı payı',
      bestFor: ['Şirket başabaş hacmi', 'Kapasite ve bütçe planlama', 'Dönemsel net kâr analizi'],
      limits: [
        'Uzun dönemde tamamen sabit değildir',
        'Kapasite eşiğinde basamaklı artabilir',
        'Ürünlere keyfî dağıtım kararları bozabilir',
      ],
    },
    example: {
      period: 'Simüle edilmiş aylık örnek',
      totalRevenue: 800_000,
      metaAttributedRevenue: 500_000,
      metaSpend: 120_000,
      googleAttributedRevenue: 250_000,
      googleSpend: 60_000,
      presentation: {
        title: 'Pozitif sipariş katkısı, sabit giderleri karşılamaya yeter mi?',
        description: 'Tüm değerler öğretici amaçlı simüle edilmiştir.',
        inputs: [
          { label: '1.000 siparişte net satış', value: '800.000 TL' },
          { label: 'Sipariş başına değişken gider', value: '540 TL' },
          { label: 'Aylık sabit gider', value: '220.000 TL' },
        ],
        results: [
          { label: 'TOPLAM DEĞİŞKEN GİDER', value: '540.000 TL', note: '540 × 1.000' },
          { label: 'TOPLAM SABİT GİDER', value: '220.000 TL', note: 'Dönem gideri' },
          {
            label: 'DÖNEM SONUCU',
            value: '40.000 TL',
            note: 'Satış − tüm giderler',
            highlight: true,
          },
        ],
        insight: {
          label: 'BAŞABAŞ UYARISI',
          title: 'Sipariş başına 260 TL katkı, yaklaşık 847 siparişte sabit gideri karşılar.',
          body: 'Birim katkı pozitif olsa da toplam hacim başabaş adedine ulaşmazsa dönem zararla kapanabilir. Ürün karması değişiyorsa ağırlıklı katkı kullanın.',
        },
      },
    },
    decisions: [
      {
        situation: 'Yeni siparişin ekonomisini ölçmek',
        primary: 'Değişken gider',
        companion: 'Birim katkı + başabaş CPA',
        reason: 'Ek siparişle birlikte oluşan maliyetler hesaplanır.',
      },
      {
        situation: 'Aylık başabaş hacmini bulmak',
        primary: 'Sabit gider',
        companion: 'Ağırlıklı birim katkı',
        reason: 'Toplam sabit giderin kaç siparişle karşılanacağı bulunur.',
      },
      {
        situation: 'Depo veya ekip kapasitesini artırmak',
        primary: 'İkisi birlikte',
        companion: 'Basamaklı maliyet + talep senaryosu',
        reason: 'Yeni kapasite sabit tabanı ve birim operasyon maliyetini değiştirebilir.',
      },
      {
        situation: 'Kanal kapatma kararı',
        primary: 'Değişken gider',
        companion: 'Kaçınılabilir sabit gider',
        reason: 'Dağıtılmış fakat kaçınılamayan giderler karar sonucunu çarpıtmamalıdır.',
      },
    ],
    checklist: [
      'Karar birimini ürün, sipariş, kanal veya dönem olarak seçin.',
      'Her giderin hacimle nasıl davrandığını yazın.',
      'Karma ve basamaklı giderleri ayrı işaretleyin.',
      'Birim katkı ile toplam sabit gideri aynı dönem kapsamında kullanın.',
      'Sınıflandırmayı dönemler arasında değiştirmeden karşılaştırın.',
    ],
    sources: [
      {
        name: 'Shopify — Contribution margin vs. gross margin',
        url: 'https://www.shopify.com/blog/contribution-margin-vs-gross-margin',
        note: 'Katkı payı hesabındaki değişken gider kapsamını açıklar.',
      },
      {
        name: 'Shopify — Profit margin calculation',
        url: 'https://www.shopify.com/blog/what-is-profit-margin',
        note: 'Farklı gider katmanlarının kâr ve marj hesabına etkisini açıklar.',
      },
    ],
    relatedGuides: [
      { title: 'Katkı payı nedir?', href: '/rehberler/katki-payi-nedir' },
      {
        title: 'E-ticaret kâr marjı nasıl hesaplanır?',
        href: '/rehberler/e-ticaret-kar-marji-nasil-hesaplanir',
      },
      {
        title: 'E-ticaret kârlılık işletim sistemi',
        href: '/rehberler/e-ticaret-karlilik-isletim-sistemi',
      },
    ],
    relatedTerms: [
      { title: 'Değişken gider sözlük maddesi', href: '/sozluk/degisken-gider' },
      { title: 'Sabit gider sözlük maddesi', href: '/sozluk/sabit-gider' },
      { title: 'Katkı payı sözlük maddesi', href: '/sozluk/katki-payi' },
    ],
    relatedTool: { title: 'Kâr Marjı Hesaplayıcı', href: '/araclar/kar-marji-hesaplayici' },
  },
]

export function getMetricComparison(slug: string) {
  return metricComparisons.find((item) => item.slug === slug)
}

export function comparisonExampleMetrics(item: MetricComparison) {
  const totalSpend = item.example.metaSpend + item.example.googleSpend
  const attributedRevenue =
    item.example.metaAttributedRevenue + item.example.googleAttributedRevenue
  return {
    totalSpend,
    attributedRevenue,
    metaRoas: item.example.metaAttributedRevenue / item.example.metaSpend,
    googleRoas: item.example.googleAttributedRevenue / item.example.googleSpend,
    mer: item.example.totalRevenue / totalSpend,
    attributionOverlap: attributedRevenue - item.example.totalRevenue,
  }
}
