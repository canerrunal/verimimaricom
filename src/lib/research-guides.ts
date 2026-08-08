import type { Guide } from '@/lib/guides'

const ministryEcommerce = {
  name: 'T.C. Ticaret Bakanlığı — Türkiye’de E-Ticaretin Görünümü 2025',
  url: 'https://ticaret.gov.tr/duyurular/turkiyede-e-ticaretin-gorunumu-raporu-yayinlandi-12-05-2026',
  note: 'Türkiye e-ticaret hacmi, işlem sayısı, işletme sayısı ve ödeme dağılımı için resmî kaynak.',
}

const dhlTrends = {
  name: 'DHL — 2026 E-Commerce Trends Report',
  url: 'https://www.dhl.com/global-en/microsites/ec/ecommerce-insights/insights/reports/2026-ecommerce-trends-report.html',
  note: '29 ülkede alışverişçi ve işletme tarafını karşılaştıran teslimat, iade ve AI araştırması.',
}

const euShippingDelivery = {
  name: 'Your Europe — Shipping and delivery',
  url: 'https://europa.eu/youreurope/citizens/consumers/shopping/shipping-delivery/index_en.htm',
  note: 'Sınır ötesi teslimat seçeneği, ücret, süre, hasar sorumluluğu ve teslim edilmeme durumunda tüketici bilgilendirmesini açıklar; son kontrol 29.04.2026.',
}

const euEcommerceRules = {
  name: 'European Commission — E-commerce rules in the EU',
  url: 'https://digital-strategy.ec.europa.eu/en/policies/e-commerce-rules-eu',
  note: 'Çapraz sınır e-ticaretinde fiyat, kargo, teslimat süresi, cayma ve geo-blocking şeffaflığı için resmî çerçeveyi özetler.',
}

const euCustoms2026 = {
  name: 'European Commission — 2026 low-value import guidance',
  url: 'https://taxation-customs.ec.europa.eu/news/guidance-and-legal-text-temporary-flat-fee-low-value-imports-which-will-apply-until-1-july-2028-2026-06-08_en',
  note: 'AB dışından düşük değerli ithalatta 1.07.2026 sonrası geçici gümrük uygulaması ve 1.11.2026 ürün tanımlayıcısı hazırlığı için resmî rehber; ülke ve ürün kapsamı ayrıca doğrulanmalıdır.',
}

const openAiCommerce = {
  name: 'OpenAI — Powering Product Discovery in ChatGPT',
  url: 'https://openai.com/index/powering-product-discovery-in-chatgpt/',
  note: 'ChatGPT ürün keşfi, merchant feed ve Agentic Commerce Protocol yaklaşımı için resmî kaynak.',
}

const googleUcp = {
  name: 'Google Developers Blog — Universal Commerce Protocol',
  url: 'https://developers.googleblog.com/en/under-the-hood-universal-commerce-protocol-ucp/',
  note: 'Ajan destekli ticaret için UCP standardının kapsamı ve ekosistem yaklaşımı.',
}

const digitalShelf = {
  name: 'Metheus & Mindsite — Marketplace Performance Index for Brands 2025',
  url: 'https://www.metheus.co/insights/how-metheus-consultancy-and-mindsite-decoded-turkish-e-commerce-landscape',
  note: 'Türkiye’de 101 marka ve 400 binden fazla SKU veri noktası üzerinden dijital raf boyutları.',
}

const googleMerchantProductData = {
  name: 'Google Merchant Center — Product data specification',
  url: 'https://support.google.com/merchants/answer/7052112?hl=en',
  note: 'Kimlik, başlık, açıklama, bağlantı, görsel, fiyat, stok ve varyant alanlarının güncel resmî gereksinimleri.',
}

const googleAiFeatures = {
  name: 'Google Search Central — AI features and your website',
  url: 'https://developers.google.com/search/docs/appearance/ai-features',
  note: 'AI Overviews ve AI Mode için ek teknik gereksinim veya özel AI dosyası olmadığını; indekslenebilirlik, metinsel içerik, iç bağlantı ve görünür verilerle eşleşen structured data temelini açıklar.',
}

const googleMerchantListing = {
  name: 'Google Search Central — Merchant listing structured data',
  url: 'https://developers.google.com/search/docs/appearance/structured-data/merchant-listing',
  note: 'Product ve Offer verisinde fiyat, para birimi, stok, teslimat ve iade bilgisinin kullanımını; doğrulama ve izleme adımlarını açıklar.',
}

const openAiProductFeed = {
  name: 'OpenAI Developers — Agentic Commerce product feed products schema',
  url: 'https://developers.openai.com/commerce/specs/file-upload/products',
  note: 'Non-Ads düz dosya ürün feed’i için zorunlu alanlar, doğrulama kuralları ve satıcı/politika gereksinimleri.',
}

const googleConversionLift = {
  name: 'Google Ads Help — About Conversion Lift',
  url: 'https://support.google.com/google-ads/answer/12003020?hl=en',
  note: 'Test ve kontrol gruplarıyla artımlı dönüşüm, değer, iCPA ve iROAS ölçümünü açıklayan resmî kaynak.',
}

const googleValueExperiments = {
  name: 'Google Ads Help — Value-based bidding with campaign experiments',
  url: 'https://support.google.com/google-ads/answer/14147337?hl=en',
  note: 'Değer bazlı teklif stratejisini baz ve deney kolunda tek değişkenle test etme yaklaşımını açıklar.',
}

const metaExperiments = {
  name: 'Meta Business Help Center — About Experiments',
  url: 'https://www.facebook.com/business/help/1915029282150425',
  note: 'Test ve kontrol gruplarıyla reklamın artımlı etkisini ölçen Conversion Lift yaklaşımını açıklar.',
}

const googleLifecycleGoals = {
  name: 'Google Ads Help — About customer lifecycle goals',
  url: 'https://support.google.com/google-ads/answer/12080169?hl=en',
  note: 'Yeni müşteri edinme, yüksek değerli yeni müşteri ve yeniden etkileşim hedeflerinin birinci taraf müşteri sinyalleriyle kullanımını açıklar.',
}

const gaCohortExploration = {
  name: 'Google Analytics Help — Cohort exploration',
  url: 'https://support.google.com/analytics/answer/9670133?hl=en',
  note: 'Edinme tarihine göre kullanıcı kohortlarının işlem ve geri dönüş davranışını zaman içinde inceleme yöntemini açıklar.',
}

const gaUserLifetime = {
  name: 'Google Analytics Help — User lifetime',
  url: 'https://support.google.com/analytics/answer/9947257?hl=en',
  note: 'Kullanıcı yaşam süresi gelir ve davranışını edinme kaynağı kırılımında inceleme kapsamı ile kimlik sınırlarını açıklar.',
}

const stripeClv = {
  name: 'Stripe — Customer lifetime value',
  url: 'https://stripe.com/resources/more/customer-lifetime-value',
  note: 'CLV yöntemlerini, kohort yaklaşımını ve daha doğru kârlılık okuması için brüt marj ile CAC ilişkisinin önemini açıklar.',
}

const metaCustomerLifetimeValue = {
  name: 'Meta Business Help Center — Customer lifetime value',
  url: 'https://www.facebook.com/business/help/1730784113851988',
  note: 'Müşteri yaşam boyu değerini ilişki boyunca müşteriye atfedilen tahmini net kâr olarak tanımlar.',
}

const iabEuropeCommerceMediaStandards = {
  name: 'IAB Europe — Commerce Media Measurement Standards V2.1',
  url: 'https://iabeurope.eu/knowledge_hub/iab-europes-commerce-incl-retail-media-measurement-standards-v2/',
  note: 'Brüt/net satış, artımsallık, yeni-müşteri zaman pencereleri ve varsayılan 30 günlük lookback tanımlarını standartlaştıran 2026 sürümü.',
}

const iabCommerceIncrementality = {
  name: 'IAB & IAB Europe — Guidelines for Incremental Measurement in Commerce Media',
  url: 'https://www.iab.com/guidelines/guidelines-for-incremental-measurement-in-commerce-media/',
  note: 'Deney, model bazlı karşı-olgu, ekonometrik model ve hibrit yöntemleri; güvenilir karşı-olgu ve yanlılık kontrolü ilkeleriyle açıklar.',
}

const iabMrcRetailMedia = {
  name: 'IAB/MRC — Retail Media Measurement Guidelines',
  url: 'https://www.iab.com/wp-content/uploads/2024/01/IAB_Retail_Media_Measurement_Guidelines_January2024.pdf',
  note: 'Retail media veri kalitesi, sonuç ölçümü, atıf penceresi, artımsallık ve şeffaf raporlama için kapsamlı ölçüm çerçevesi.',
}

const amazonCampaignReporting = {
  name: 'Amazon Ads — Campaign reporting and measurement',
  url: 'https://advertising.amazon.com/en-ca/measurement-analytics/campaign-reporting',
  note: 'Sponsorlu ürün ve marka kampanyalarında trafik, perakende ve atfedilen satış içgörülerinin raporlama kapsamını açıklar.',
}

export const researchGuides: Guide[] = [
  {
    slug: 'e-ticaret-karlilik-isletim-sistemi',
    title: 'E-Ticaret Kârlılık İşletim Sistemi: ROAS’tan Gerçek Katkı Payına',
    excerpt:
      'Ciro, panel ROAS ve sipariş sayısını tek bir kârlılık karar sistemine bağlayın; hangi ürünün ve kampanyanın gerçekten para bıraktığını görün.',
    category: 'E-Ticaret Kârlılığı',
    contentType: 'Uygulama rehberi',
    maturity: 'evergreen',
    audience: 'E-ticaret kurucuları, büyüme liderleri ve finans ekipleri',
    intent: 'Sistem kurma',
    readingTime: 11,
    publishedAt: '2026-08-01',
    updatedAt: '2026-08-01',
    reviewedAt: '2026-08-01',
    reviewDueAt: '2026-11-01',
    shortAnswer:
      'Sağlıklı e-ticaret yönetimi reklam panelindeki gelirle değil, iptal ve iadeler sonrası net gelirle başlar. Ürün, komisyon, ödeme, kargo, paketleme ve iade rezervi çıkarıldığında reklam öncesi katkı; reklam gideri de çıkarıldığında pazarlama sonrası katkı görülür. ROAS ancak bu ekonomik eşiklerle birlikte karar metriğine dönüşür.',
    whyItMatters: [
      'Aynı ROAS, marjı ve iade oranı farklı iki üründe tamamen farklı kâr sonucu üretebilir.',
      'Ürün, kanal ve yeni müşteri kırılımını aynı ekonomik dilde karşılaştırır.',
      'Raporlamayı geriye dönük sunumdan haftalık bütçe, fiyat ve stok kararına dönüştürür.',
    ],
    definition:
      'Kârlılık işletim sistemi, net gelirden faaliyet sonucuna uzanan katmanları aynı dönem, para birimi ve iade tanımıyla birleştiren karar düzenidir. Her metriğin bir eşiği, sahibi ve tetiklediği aksiyon vardır.',
    formula:
      'Pazarlama sonrası katkı = Net gelir − ürün − komisyon − ödeme − lojistik − iade rezervi − reklam',
    formulaNote:
      'Faaliyet sonucu için pazarlama sonrası katkıdan sabit ve yarı sabit giderler ayrıca düşülür. Vergi ve muhasebe sınıflandırması şirket politikasına göre doğrulanmalıdır.',
    inputs: [
      {
        label: 'Net gelir',
        description: 'İptal, iade ve indirim kapsamı tanımlanmış gerçekleşen gelir.',
      },
      {
        label: 'Ürün ekonomisi',
        description: 'SKU maliyeti, komisyon, ödeme, kargo ve paketleme.',
      },
      {
        label: 'İade rezervi',
        description: 'Ürün veya kategori bazında beklenen geri kazanılamayan maliyet.',
      },
      {
        label: 'Pazarlama gideri',
        description: 'Medya ile karara göre ajans, kreatif ve araç maliyetleri.',
      },
      {
        label: 'Müşteri boyutu',
        description: 'Yeni müşteri, tekrar sipariş ve 90 günlük katkı LTV kohortları.',
      },
    ],
    example: {
      title: '1.000 TL net gelirli sipariş',
      intro: 'KDV hariç, basitleştirilmiş bir sipariş ekonomisiyle panel ROAS’ın sınırını görelim.',
      rows: [
        { label: 'Net gelir', value: '1.000 TL', note: 'İptal ve iade kapsamı sabit' },
        { label: 'Ürün maliyeti', value: '350 TL', note: 'Kalan 650 TL' },
        { label: 'Komisyon + ödeme', value: '180 TL', note: 'Kalan 470 TL' },
        { label: 'Kargo + paketleme', value: '90 TL', note: 'Kalan 380 TL' },
        { label: 'Beklenen iade rezervi', value: '60 TL', note: 'Kalan 320 TL' },
        { label: 'Reklam gideri', value: '250 TL', note: 'Kalan 70 TL' },
      ],
      result:
        'Panel ROAS 4,0x görünür; fakat pazarlama sonrası katkı yalnızca 70 TL, yani net gelirin %7’sidir. Sabit giderler henüz düşülmemiştir.',
    },
    decisions: [
      {
        signal: 'ROAS iyi, katkı zayıf',
        meaning: 'Gelir kalitesi veya değişken gider yapısı bozuluyor.',
        action: 'Ürün karması, indirim, iade ve kanal maliyetini ayırın.',
      },
      {
        signal: 'Katkı pozitif, nakit baskılı',
        meaning: 'Stok ve tahsilat döngüsü büyümeyi taşımıyor.',
        action: 'Ölçek kararına vade ve stok finansmanı kapısı ekleyin.',
      },
      {
        signal: 'Yeni müşteri CAC artıyor',
        meaning: 'Edinme maliyeti kohort katkısını aşabilir.',
        action: '90 günlük katkı LTV ve geri ödeme süresiyle doğrulayın.',
      },
    ],
    mistakes: [
      'Platform ROAS’ını gerçekleşen kâr gibi kullanmak.',
      'İade ve iptalleri rapor döneminin dışında bırakmak.',
      'Farklı ürünlere tek mağaza ortalaması uygulamak.',
      'MER, CAC ve LTV kapsamını veri sözlüğünde tanımlamamak.',
      'Metrik üretip karar eşiği ve sorumlu atamamak.',
    ],
    checklist: [
      'Gelir, maliyet ve iade kapsamını tek veri sözlüğünde sabitleyin.',
      'SKU ve kanal bazında reklam öncesi katkıyı hesaplayın.',
      'Başabaş ROAS ve hedef CPA eşiklerini ürün ekonomisinden türetin.',
      'Yeni müşteri CAC ile 90 günlük katkı LTV’yi kohort bazında eşleyin.',
      'Haftalık bütçe, fiyat, stok ve kreatif kararlarını kayıt altına alın.',
    ],
    tool: {
      title: 'Başabaş ROAS Hesaplayıcı',
      description: 'Ürün, komisyon, kargo ve iade varsayımlarınızla zarar sınırını görün.',
      href: '/araclar/basabas-roas-hesaplayici',
      cta: 'Kendi eşiğini hesapla',
    },
    relatedGuides: [
      'basabas-roas-nasil-hesaplanir',
      'mer-nedir-nasil-hesaplanir',
      'haftalik-reklam-raporu-nasil-hazirlanir',
    ],
    faqs: [
      {
        question: 'ROAS neden tek başına yetmez?',
        answer:
          'ROAS yalnızca atfedilen gelir ile reklam harcamasını oranlar; ürün, operasyon, iade ve sabit giderleri doğrudan göstermez.',
      },
      {
        question: 'İşletim sistemi hangi sıklıkla çalışmalı?',
        answer:
          'Operasyonel eşikler haftalık, kohort ve faaliyet sonucu aylık; maliyet varsayımları önemli fiyat veya sözleşme değişiminde yeniden doğrulanmalıdır.',
      },
      {
        question: 'Hangi metrik ana KPI olmalı?',
        answer:
          'Tek metrik yerine ürün ve kanal bazında pazarlama sonrası katkı, şirket düzeyinde toplam katkı ve nakit güvenlik kapıları birlikte kullanılmalıdır.',
      },
    ],
    sources: [ministryEcommerce, dhlTrends],
    disclaimer:
      'Bu çerçeve operasyonel karar desteğidir; vergi, muhasebe veya yatırım tavsiyesi değildir. Kapsamı mali müşaviriniz ve şirket veri sözlüğünüzle doğrulayın.',
  },
  {
    slug: 'kampanya-kar-savas-odasi',
    title: 'Kampanya Kâr Savaş Odası: İndirim, Hacim ve Artımsallık',
    excerpt:
      'Kampanya cirosunu değil, baz satıştan arındırılmış artımlı katkıyı yönetin; indirim, reklam, iade, stok ve kapasite kararını aynı tabloda birleştirin.',
    category: 'E-Ticaret Kârlılığı',
    contentType: 'Uygulama rehberi',
    maturity: 'evergreen',
    audience: 'E-ticaret, finans, performans pazarlama ve operasyon ekipleri',
    intent: 'Kampanya planlama ve ölçüm',
    readingTime: 12,
    publishedAt: '2026-08-01',
    updatedAt: '2026-08-01',
    reviewedAt: '2026-08-01',
    reviewDueAt: '2026-11-01',
    shortAnswer:
      'Kampanyayı başarılı saymak için promosyon dönemindeki toplam ciroya değil, kampanya olmasa oluşması beklenen baz katkının üstünde kalan değere bakın. İndirimli sipariş katkısından reklam, kreatif, influencer, ek operasyon ve iade maliyetini çıkarın; sonucu kontrol grubu veya güvenilir baz dönemle karşılaştırın. Pozitif ciro artışı negatif artımlı katkıyı gizleyebilir.',
    whyItMatters: [
      'Kampanya döneminde zaten gelecek siparişleri promosyon başarısı saymayı önler.',
      'İndirim, reklam, stok, iade ve kapasiteyi aynı ekonomik hedefe bağlar.',
      'Platform ROAS’ı ile şirketin gerçek artımlı kâr etkisini birbirinden ayırır.',
    ],
    definition:
      'Kampanya kâr savaş odası, kampanya öncesi karar kapılarını, dönem içi erken uyarıları ve kampanya sonrası artımsallık doğrulamasını tek ritimde yöneten çapraz ekip tablosudur. Her sinyalin eşiği, sahibi ve aksiyonu kampanya başlamadan belirlenir.',
    formula:
      'Artımlı kampanya katkısı = Gerçekleşen kampanya katkısı − beklenen baz katkı − ek kampanya giderleri',
    formulaNote:
      'Kontrollü deney yoksa baz katkı yalnız tahmindir; sezonsallık, fiyat, stok ve kanal değişimleri sonuçta belirsizlik yaratır. Nedensellik iddiası için uygun test/kontrol tasarımı gerekir.',
    inputs: [
      {
        label: 'Baz katkı',
        description: 'Kampanya olmasa beklenen sipariş adedi × normal sipariş katkısı.',
      },
      {
        label: 'Promosyon katkısı',
        description:
          'İndirim, komisyon, lojistik ve beklenen iade sonrası sipariş başına kalan tutar.',
      },
      {
        label: 'Artımlı gider',
        description: 'Ek medya, kreatif, influencer, kupon paylaşımı ve operasyon maliyeti.',
      },
      {
        label: 'Kontrol tasarımı',
        description:
          'Uygunsa kullanıcı, coğrafya, mağaza veya ürün düzeyinde test ve kontrol ayrımı.',
      },
      {
        label: 'Koruma kapıları',
        description: 'Minimum katkı, stok gün sayısı, iade, teslimat SLA’sı ve nakit sınırı.',
      },
    ],
    example: {
      title: '14 günlük kampanya sonucu',
      intro: 'Ciro artışını baz katkı ve artımlı giderle düzelterek okuyalım.',
      rows: [
        { label: 'Beklenen baz sipariş', value: '800 adet', note: 'Kampanyasız tahmin' },
        { label: 'Normal sipariş katkısı', value: '300 TL', note: '240.000 TL baz katkı' },
        { label: 'Kampanya siparişi', value: '1.400 adet', note: 'Gerçekleşen' },
        { label: 'Promosyon katkısı', value: '190 TL', note: '266.000 TL toplam' },
        { label: 'Ek kampanya gideri', value: '18.000 TL', note: 'Medya + kreatif + operasyon' },
        { label: 'Artımlı katkı', value: '8.000 TL', note: '266.000 − 240.000 − 18.000' },
      ],
      result:
        'Sipariş adedi %75 artmış görünse de artımlı katkı yalnız 8.000 TL’dir. İade veya lojistik maliyeti varsayımdan 6 TL/sipariş saparsa kampanya ekonomik olarak negatife dönebilir.',
    },
    decisions: [
      {
        signal: 'Hacim artıyor, artımlı katkı negatif',
        meaning: 'İndirim ve ek giderler ek talebin ekonomik değerini aşıyor.',
        action: 'İndirimi daraltın, sepet/bundle koşulu ekleyin veya kampanyayı durdurun.',
      },
      {
        signal: 'Katkı pozitif, stok kapısı kırmızı',
        meaning: 'Kısa dönem kazanç çekirdek ürün bulunurluğunu riske atıyor.',
        action: 'Bütçeyi stoklu SKU’lara kaydırın ve satış hızını kapasiteyle sınırlandırın.',
      },
      {
        signal: 'Platform ROAS iyi, lift zayıf',
        meaning: 'Reklam zaten gelecek siparişlere kredi alıyor olabilir.',
        action: 'Kontrol grubu, coğrafi test veya ürün holdout ile artımsallığı ölçün.',
      },
    ],
    mistakes: [
      'Kampanya toplam cirosunu artımlı sonuç saymak.',
      'Normal dönemde zaten gelecek siparişleri bazdan çıkarmamak.',
      'İndirimli sipariş katkısını eski kargo ve iade oranıyla hesaplamak.',
      'Aynı anda teklif, kreatif, bütçe ve hedeflemeyi değiştirip nedeni tek değişkene bağlamak.',
      'Stok, müşteri hizmeti ve teslimat kapasitesini yalnız kampanya başladıktan sonra izlemek.',
    ],
    checklist: [
      'Normal ve promosyon sipariş katkısını kampanyadan önce hesaplayın.',
      'Baz sipariş ve katkı tahminini tarih, ürün ve kanal kırılımıyla kaydedin.',
      'Minimum toplam katkı, stok ve teslimat kapılarını yazın.',
      'Test edilecek tek ana değişkeni ve kontrol yöntemini belirleyin.',
      'Kampanya sonrası iptal ve olgunlaşmış iade verisiyle sonucu yeniden hesaplayın.',
    ],
    tool: {
      title: 'İndirim Kârlılık Simülatörü',
      description: 'Normal ve indirimli birim katkıyı, kârı koruyan minimum hacimle karşılaştırın.',
      href: '/araclar/indirim-karlilik-simulatoru',
      cta: 'Kampanya eşiğini hesapla',
    },
    relatedGuides: [
      'indirim-karliligi-nasil-hesaplanir',
      'e-ticaret-karlilik-isletim-sistemi',
      'artimsallik-ve-kar-odakli-reklam-olcumu',
    ],
    faqs: [
      {
        question: 'Kampanya cirosu arttıysa kampanya başarılı değil midir?',
        answer:
          'Zorunlu olarak değil. İndirim, medya, iade ve operasyon giderleri ile kampanyasız baz katkı çıkarıldığında artımlı sonuç negatif olabilir.',
      },
      {
        question: 'Baz satış nasıl belirlenir?',
        answer:
          'En güçlü yöntem uygun bir kontrol grubudur. Bu mümkün değilse benzer gün, sezon, ürün ve kanal verisiyle tahmin yapılır; sonuç nedensel kanıt değil belirsizlik içeren tahmin olarak etiketlenir.',
      },
      {
        question: 'Platform ROAS’ı neden yeterli değil?',
        answer:
          'Platform ROAS’ı atfedilen geliri harcamaya böler. Kampanyasız oluşacak satışları, ürün ekonomisini ve bütün ek giderleri doğrudan göstermez.',
      },
    ],
    sources: [googleConversionLift, googleValueExperiments, metaExperiments],
    disclaimer:
      'Baz dönem karşılaştırması nedensellik kanıtı değildir. Kontrollü deney uygunluğu, örneklem gücü ve hesap erişimi platforma göre değişir; finansal sonuçları gerçekleşen sipariş ve iade verisiyle doğrulayın.',
  },
  {
    slug: 'artimsallik-ve-kar-odakli-reklam-olcumu',
    title: 'Artımsallık ve Kâr Odaklı Reklam Ölçümü',
    excerpt:
      'Platformun kredi yazdığı satışla reklamın gerçekten yarattığı ek sonucu ayırın; test, kontrol ve katkı ekonomisini aynı karar tablosunda birleştirin.',
    category: 'Reklam Analitiği',
    contentType: 'Uygulama rehberi',
    maturity: 'evergreen',
    audience: 'Performans pazarlama, büyüme, veri ve finans ekipleri',
    intent: 'Ölçüm sistemi kurma',
    readingTime: 12,
    publishedAt: '2026-08-01',
    updatedAt: '2026-08-01',
    reviewedAt: '2026-08-01',
    reviewDueAt: '2026-11-01',
    shortAnswer:
      'Artımsallık, reklam gösterilen test grubuyla reklam etkisinden uzak tutulan karşılaştırılabilir kontrol grubu arasındaki sonuç farkıdır. Platform ROAS’ı hangi satışın reklama atfedildiğini, kontrollü deney ise reklam olmasaydı ne kadarının yine oluşacağını anlamaya çalışır. İş kararı için artımlı sipariş veya gelir, sipariş başına katkı ve artımlı medya gideriyle birleştirilmelidir.',
    whyItMatters: [
      'Marka araması, organik talep ve mevcut müşteri satın alımlarının reklama fazla kredi yazmasını görünür kılar.',
      'Aynı ROAS’a sahip iki kampanyanın iş için yarattığı ek katkının farklı olabileceğini gösterir.',
      'Bütçe artışını atfedilen gelire değil, gerçekten yaratılan ek ekonomik değere bağlar.',
    ],
    definition:
      'Reklam artımsallığı, uygun bir rastgeleleştirme veya karşılaştırılabilir holdout tasarımında test ve kontrol gruplarının sonuç farkından tahmin edilen nedensel etkidir. Kâr odaklı ölçüm bu farkı net gelir yerine katkı değeriyle fiyatlar ve ek medya giderini sonuçtan çıkarır.',
    formula:
      'Net artımlı katkı = (Test dönüşüm oranı − kontrol dönüşüm oranı) × uygun test nüfusu × dönüşüm başına katkı − artımlı medya gideri',
    formulaNote:
      'Bu operasyonel sadeleştirmedir. Platformun raporladığı lift, güven aralığı, iCPA veya iROAS hesabı deney tasarımına göre değişebilir. Rastgeleleştirme, örneklem gücü ve kontaminasyon kontrolü olmadan nedensellik iddiası kurulmaz.',
    inputs: [
      {
        label: 'Uygun nüfus',
        description:
          'Test kapsamına gerçekten girebilen kullanıcı, bölge, mağaza veya ürün evreni.',
      },
      {
        label: 'Test ve kontrol sonucu',
        description: 'Aynı ölçüm penceresinde tanımı eşit dönüşüm oranı, gelir veya katkı.',
      },
      {
        label: 'Dönüşüm başına katkı',
        description: 'İptal, iade, ürün ve değişken operasyon giderleri sonrası kalan değer.',
      },
      {
        label: 'Artımlı medya gideri',
        description: 'Test kolunda kontrol koluna göre oluşan ek reklam harcaması.',
      },
      {
        label: 'Belirsizlik',
        description: 'Güven aralığı, minimum tespit edilebilir etki ve veri olgunlaşma süresi.',
      },
    ],
    example: {
      title: '50.000 kişilik test nüfusu',
      intro: 'Basitleştirilmiş bir holdout sonucunu sipariş katkısıyla fiyatlayalım.',
      rows: [
        { label: 'Test dönüşüm oranı', value: '%3,2', note: 'Reklam etkisine açık grup' },
        { label: 'Kontrol dönüşüm oranı', value: '%2,8', note: '0,4 puan mutlak lift' },
        { label: 'Tahmini artımlı sipariş', value: '200', note: '50.000 × %0,4' },
        { label: 'Sipariş başına katkı', value: '240 TL', note: '48.000 TL brüt artımlı katkı' },
        { label: 'Artımlı medya gideri', value: '35.000 TL', note: 'Testin ek gideri' },
        { label: 'Net artımlı katkı', value: '13.000 TL', note: '48.000 − 35.000' },
      ],
      result:
        'Atfedilen ROAS yüksek görünse bile ölçekleme kararı 13.000 TL net artımlı katkının güven aralığı, veri olgunluğu ve alternatif bütçe kullanımıyla birlikte değerlendirilmesine dayanmalıdır.',
    },
    decisions: [
      {
        signal: 'Atfedilen ROAS güçlü, lift sıfıra yakın',
        meaning: 'Kampanya zaten oluşacak talebe kredi alıyor olabilir.',
        action:
          'Bütçeyi büyütmeyin; hedeflemeyi, kanal rolünü ve holdout kapsamını yeniden tasarlayın.',
      },
      {
        signal: 'Lift pozitif, net artımlı katkı negatif',
        meaning: 'Reklam ek sipariş yaratıyor fakat edinme maliyeti ekonomik değeri aşıyor.',
        action:
          'Teklif, ürün karması veya katkı değerini düzeltin; yalnız dönüşüm artışına göre ölçeklemeyin.',
      },
      {
        signal: 'Lift ve katkı pozitif, belirsizlik geniş',
        meaning: 'Yön umut verici olsa da etki büyüklüğü güvenilir karar eşiğine ulaşmamış.',
        action:
          'Testi yeterli süre ve güçle sürdürün; ara sonuçlara göre sık bütçe değişikliği yapmayın.',
      },
    ],
    mistakes: [
      'Platform atfını nedensel etki olarak sunmak.',
      'Kontrol grubuna başka kampanyalardan reklam etkisi sızmasını izlememek.',
      'Gelir liftini ürün, iade ve operasyon maliyeti çıkarmadan kâr diye adlandırmak.',
      'Test sırasında teklif, kreatif, hedefleme ve fiyatı aynı anda değiştirmek.',
      'Yetersiz örneklemde pozitif nokta tahminini kesin sonuç saymak.',
    ],
    checklist: [
      'Tek birincil sonucu ve ekonomik karar eşiğini testten önce yazın.',
      'Test/kontrol birimini, uygun nüfusu ve dışlama kurallarını sabitleyin.',
      'Katkı değerini aynı ürün ve iade kapsamıyla hesaplayın.',
      'Deney sürerken kontaminasyon ve büyük operasyon değişikliklerini kaydedin.',
      'Sonucu güven aralığı, olgunlaşmış iade ve toplam işletme katkısıyla doğrulayın.',
    ],
    tool: {
      title: 'Yeni Müşteri CAC + 90 Günlük Katkı LTV Hesaplayıcı',
      description:
        'Artımlı yeni müşteriyi 90 günlük katkı değeriyle fiyatlayın ve hedefi koruyan azami CAC’i bulun.',
      href: '/araclar/yeni-musteri-cac-katki-ltv-hesaplayici',
      cta: 'Müşteri ekonomisini hesapla',
    },
    relatedGuides: [
      'kampanya-kar-savas-odasi',
      'yeni-musteri-cac-katki-ltv-nasil-hesaplanir',
      'roas-yuksekken-kar-neden-duser',
    ],
    faqs: [
      {
        question: 'Platform ROAS ile artımlı ROAS aynı şey mi?',
        answer:
          'Hayır. Platform ROAS’ı atfedilen geliri harcamaya böler. Artımlı ölçüm, reklam olmasaydı oluşacak sonucu kontrol grubuyla tahmin eder; gelir veya katkı farkını ek harcamayla ilişkilendirir.',
      },
      {
        question: 'Kontrol grubu olmadan artımsallık ölçülür mü?',
        answer:
          'Güvenilir bir karşı olgu olmadan ancak tahmin yapılır. Zaman serisi veya benzer bölge modelleri kullanılabilir; fakat varsayımları ve belirsizliği açıkça yazılmalı, kontrollü deneyle aynı kanıt düzeyinde sunulmamalıdır.',
      },
      {
        question: 'Deney ne kadar sürmeli?',
        answer:
          'Sabit bir gün sayısı yoktur. Baz dönüşüm oranı, beklenen etki, trafik, satın alma gecikmesi ve iade olgunluğu birlikte güç hesabını belirler. Platformun uygunluk ve çalışma tasarımı rehberini izleyin.',
      },
    ],
    sources: [googleConversionLift, googleValueExperiments, metaExperiments],
    disclaimer:
      'Deney uygunluğu, rastgeleleştirme yöntemi, raporlanan metrik ve minimum örneklem platforma göre değişebilir. Bu rehber istatistiksel danışmanlık veya platform sonucu garantisi değildir.',
  },
  {
    slug: 'yeni-musteri-cac-katki-ltv-nasil-hesaplanir',
    title: 'Yeni Müşteri CAC ve 90 Günlük Katkı LTV Nasıl Hesaplanır?',
    excerpt:
      'Platformdaki yeni müşteri sayısını CRM ile doğrulayın; ilk sipariş ve tekrar sipariş değerini gelir değil katkı olarak hesaplayın.',
    category: 'Reklam Analitiği',
    contentType: 'Uygulama rehberi',
    maturity: 'evergreen',
    audience: 'E-ticaret kurucuları, büyüme, CRM, finans ve performans ekipleri',
    intent: 'Hesaplama ve kohort kurma',
    readingTime: 11,
    publishedAt: '2026-08-01',
    updatedAt: '2026-08-01',
    reviewedAt: '2026-08-01',
    reviewDueAt: '2026-11-01',
    shortAnswer:
      'Yeni müşteri CAC, aynı dönemin edinme harcamasının CRM veya sipariş sistemiyle doğrulanmış ilk kez alışveriş yapan müşteri sayısına bölünmesidir. 90 günlük katkı LTV ise ilk sipariş katkısı ile bu müşterilerin 90 günde ürettiği tekrar sipariş katkısının toplamından olgunlaşmış iade ve servis kaybının çıkarılmasıdır. Bu iki değer aynı edinme kohortu ve aynı maliyet kapsamıyla karşılaştırılmalıdır.',
    whyItMatters: [
      'Platformun yeni müşteri etiketi eski müşteriyi yeni sayarsa CAC olduğundan iyi görünür.',
      'Gelir LTV’si yüksek fakat marjı düşük bir kohort büyüdükçe nakit kaybettirebilir.',
      'Kanal ve ilk ürün kohortları arasındaki kalite farkını tek sipariş ROAS’ından daha erken gösterir.',
    ],
    definition:
      'Katkı LTV, bir müşterinin belirli ölçüm penceresinde ürettiği net gelirden ürün ve siparişle değişen maliyetler ile beklenen iade/servis kaybı çıkarıldıktan sonra kalan değerdir. Buradaki 90 gün sonsuz yaşam boyu tahmini değil, tekrar ölçülebilir bir geri ödeme penceresidir.',
    formula:
      '90 günlük katkı LTV = İlk sipariş katkısı + 90 günlük tekrar sipariş katkısı − beklenen iade ve servis kaybı',
    formulaNote:
      'Katkı LTV:CAC = 90 günlük katkı LTV ÷ doğrulanmış yeni müşteri CAC. Evrensel “iyi oran” yoktur; pencere, nakit ihtiyacı, marj, tekrar alışveriş ritmi ve veri güveni hedefi belirler.',
    inputs: [
      {
        label: 'Edinme harcaması',
        description: 'Aynı kohorta ait medya ile karara göre kreatif, ajans ve promosyon kapsamı.',
      },
      {
        label: 'Doğrulanmış yeni müşteri',
        description: 'Tekil müşteri kimliğiyle ilk tamamlanan siparişi doğrulanan kişiler.',
      },
      {
        label: 'İlk sipariş katkısı',
        description:
          'Net gelirden ürün, komisyon, ödeme, kargo ve paketleme çıkarıldıktan sonra kalan.',
      },
      {
        label: '90 günlük tekrar katkısı',
        description: 'Kohort başına tekrar sipariş adedi × tekrar sipariş başına katkı.',
      },
      {
        label: 'Olgunlaşmış kayıp',
        description:
          'İade, ters lojistik, servis ve geri kazanılamayan maliyetlerin müşteri başına değeri.',
      },
    ],
    example: {
      title: '800 doğrulanmış yeni müşteri kohortu',
      intro: 'Gelir LTV yerine 90 günlük katkı değerini aynı kohortta kuralım.',
      rows: [
        { label: 'Edinme harcaması', value: '240.000 TL', note: 'CAC = 300 TL' },
        { label: 'İlk sipariş', value: '900 − 650 TL', note: '250 TL katkı' },
        { label: '90 günde tekrar sipariş', value: '0,45 adet', note: 'Müşteri başına' },
        { label: 'Tekrar sipariş katkısı', value: '720 − 470 TL', note: '0,45 × 250 = 112,5 TL' },
        { label: 'Beklenen ek kayıp', value: '25 TL', note: 'İade + servis' },
        { label: '90 günlük katkı LTV', value: '337,5 TL', note: 'LTV:CAC = 1,13x' },
      ],
      result:
        'Kohort CAC’i 90 günde geri öder ve müşteri başına 37,5 TL bırakır. Ancak 50 TL hedef katkının altında olduğu için büyüme pozitif ama güvenlik tamponu zayıftır.',
    },
    decisions: [
      {
        signal: 'İlk sipariş katkısı CAC’i karşılıyor',
        meaning: 'Edinme maliyeti ilk siparişte geri kazanılıyor.',
        action:
          'Kanalı ölçeklemeden önce yeni müşteri kimliği, toplam katkı ve stok kapasitesini doğrulayın.',
      },
      {
        signal: '90 günlük katkı pozitif, CAC’in altında',
        meaning: 'Müşteri değer üretiyor fakat seçilen pencerede edinme maliyetini geri ödemiyor.',
        action:
          'CAC’i düşürün, ilk ürün karmasını iyileştirin veya tekrar satın alma programını test edin.',
      },
      {
        signal: 'Gelir LTV güçlü, katkı LTV zayıf',
        meaning: 'Tekrar siparişler ciro üretiyor ama marj veya iade kaybı değeri eritiyor.',
        action: 'Kanal yerine ürün, indirim, lojistik ve iade nedeni kırılımını düzeltin.',
      },
    ],
    mistakes: [
      'Platformdaki “new customer” sayısını CRM doğrulaması olmadan kullanmak.',
      'Farklı edinme aylarını tek LTV ortalamasında karıştırmak.',
      'Geliri LTV, brüt marjı katkı LTV olarak adlandırmak.',
      'İlk sipariş ve tekrar siparişte farklı maliyet kapsamı kullanmak.',
      '90 günlük gözlemi sonsuz yaşam boyu tahmini gibi sunmak.',
      'SaaS için kullanılan 3:1 gibi oranları e-ticarete evrensel benchmark olarak taşımak.',
    ],
    checklist: [
      'Tekil müşteri anahtarını ve “yeni” tanımını veri sözlüğüne yazın.',
      'Edinme harcaması ile müşteri kohortunun tarih ve kanal kapsamını eşitleyin.',
      'İlk ve tekrar sipariş katkısını aynı değişken maliyet sözlüğüyle hesaplayın.',
      '30/60/90 günlük olgunlaşmayı ayrı sütunlarda saklayın.',
      'İade ve iptaller olgunlaştığında geçmiş kohortu yeniden hesaplayın.',
      'Kanal, kampanya, ilk ürün ve müşteri segmenti kırılımlarını karşılaştırın.',
    ],
    tool: {
      title: 'Yeni Müşteri CAC + 90 Günlük Katkı LTV Hesaplayıcı',
      description:
        'Kendi edinme, ilk sipariş ve tekrar sipariş verinizle CAC, katkı LTV ve hedef tamponunu hesaplayın.',
      href: '/araclar/yeni-musteri-cac-katki-ltv-hesaplayici',
      cta: 'Kohort ekonomisini hesapla',
    },
    relatedGuides: [
      'artimsallik-ve-kar-odakli-reklam-olcumu',
      'e-ticaret-karlilik-isletim-sistemi',
      'roas-yuksekken-kar-neden-duser',
    ],
    faqs: [
      {
        question: 'CAC hesabına hangi giderler girmeli?',
        answer:
          'En az medya harcaması girer. Ajans, kreatif, promosyon ve araç giderlerini dahil edip etmediğinizi veri sözlüğünde açıkça belirtin; dönemler arasında aynı kapsamı koruyun.',
      },
      {
        question: 'Neden 90 gün?',
        answer:
          '90 gün çoğu e-ticaret ekibi için ölçülebilir bir başlangıç penceresidir; evrensel standart değildir. Ürünün doğal tekrar satın alma ritmi 30 gün veya 12 ay ise pencereyi iş modeline göre değiştirin.',
      },
      {
        question: 'İyi LTV:CAC oranı kaçtır?',
        answer:
          'Evrensel oran yoktur. Katkı kapsamı, ölçüm penceresi, nakit döngüsü ve veri güveni değiştiğinde aynı oran farklı risk taşır. Hedefi kendi geri ödeme ve katkı ihtiyacınızdan türetin.',
      },
      {
        question: 'GA4 tek başına yeni müşteriyi doğrular mı?',
        answer:
          'GA4 kohort davranışını incelemeye yardımcı olur; fakat cihaz, kimlik ve eşikleme sınırları vardır. Finansal CAC için sipariş ve CRM müşteri kimliğini esas alıp analitik veriyi davranış katmanı olarak kullanın.',
      },
    ],
    sources: [
      googleLifecycleGoals,
      gaCohortExploration,
      gaUserLifetime,
      stripeClv,
      metaCustomerLifetimeValue,
    ],
    disclaimer:
      'Bu hesap operasyonel karar desteğidir; muhasebe, vergi veya yatırım tavsiyesi değildir. Kimlik eşleştirme, KDV, iade ve maliyet kapsamını şirket veri sözlüğünüzle doğrulayın.',
  },
  {
    slug: 'ai-alisveris-ajanlarina-hazirlik',
    title: 'AI Alışveriş Ajanlarına Hazırlık: Ürün Verisi ve Feed Kontrol Listesi',
    excerpt:
      'ChatGPT ve Google’ın alışveriş yüzeyleri için protokolden önce ürün kataloğu, stok, fiyat, teslimat ve ölçüm altyapısını hazırlayın.',
    category: 'AI & Otomasyon',
    contentType: 'Uygulama rehberi',
    maturity: 'growing',
    audience: 'E-ticaret yöneticileri, ürün ekipleri ve teknik liderler',
    intent: 'Hazırlık ve denetim',
    readingTime: 12,
    publishedAt: '2026-08-01',
    updatedAt: '2026-08-02',
    reviewedAt: '2026-08-02',
    reviewDueAt: '2026-09-15',
    shortAnswer:
      'AI alışveriş hazırlığının ilk işi yeni bir chatbot veya “AI için özel SEO etiketi” değil; indekslenebilir ürün sayfaları, görünür içerikle eşleşen Product/Offer verisi ve güncel merchant feed’idir. Kalıcı SKU, doğru varyant, fiyat, stok, teslimat ve iade bilgisi tek doğruluk kaynağından beslenmeli; ACP veya UCP entegrasyonu bu temel kurulduktan sonra değerlendirilmelidir.',
    whyItMatters: [
      'Ürün kataloğu artık yalnızca mağaza sayfası değil, farklı keşif yüzeylerine dağıtılan bir veri ürünüdür.',
      'Fiyat, stok ve varyant uyuşmazlığı insan müşteride de alışveriş ajanında da güven kaybı yaratır.',
      'Protokoller değişse bile ürün veri kalitesine yapılan yatırım kalıcıdır.',
    ],
    definition:
      'AI commerce readiness, bir ürünün doğru tanımlanması, güncel bulunabilirlik ve fiyatla sunulması, teslimat/iade koşullarının anlaşılması ve sonuçların ölçülebilmesi için gereken veri ve operasyon hazırlığıdır.',
    formula:
      'Hazırlık skoru = bulunabilirlik × %20 + ürün verisi × %30 + ticari senkronizasyon × %30 + güven/ölçüm × %20',
    formulaNote:
      'Bu ağırlıklar Veri Mimarı başlangıç modelidir; resmî bir OpenAI veya Google uygunluk puanı değildir. İndeksleme, tarayıcı erişimi, Product/Offer doğrulaması ile fiyat ve stok eşleşmesi toplam skordan bağımsız kritik yayın kapılarıdır.',
    inputs: [
      {
        label: 'Bulunabilirlik',
        description: 'İndekslenebilir URL, tarayıcı erişimi, iç bağlantı ve sitemap.',
      },
      {
        label: 'Ürün verisi',
        description: 'Product/Offer, kalıcı SKU/GTIN, varyant ve karar verdiren içerik.',
      },
      {
        label: 'Ticari senkronizasyon',
        description:
          'Sayfa, structured data, feed ve checkout arasında fiyat, stok ve politika eşleşmesi.',
      },
      {
        label: 'Güven ve ölçüm',
        description: 'Marka/politika kimliği, platform teşhisi ve sipariş-iade geri beslemesi.',
      },
    ],
    example: {
      title: '10.000 SKU’lu katalog sağlık örneği',
      intro: 'Aşağıdaki değerler bir denetim örneğidir; platform uygunluk sonucu değildir.',
      rows: [
        { label: 'Zorunlu alan doluluğu', value: '%96', note: 'Hedef ≥ %98' },
        { label: 'Fiyat eşleşmesi', value: '%99,4', note: 'Kritik hata: 60 SKU' },
        { label: 'Stok eşleşmesi', value: '%97,8', note: 'Kritik hata: 220 SKU' },
        { label: 'Varyant bütünlüğü', value: '%94', note: 'Beden/renk ilişkileri eksik' },
        { label: 'Son tam güncelleme', value: '31 saat', note: 'Günlük SLA aşıldı' },
      ],
      result:
        'Genel doluluk yüksek görünse de stok ve varyant hataları nedeniyle katalog yayın kapısını geçmemelidir.',
    },
    decisions: [
      {
        signal: 'Fiyat veya stok uyumsuz',
        meaning: 'Ajanın verdiği cevap sipariş anında geçersiz kalabilir.',
        action: 'Entegrasyonu durdurun, kaynağı ve güncelleme SLA’sını düzeltin.',
      },
      {
        signal: 'Varyantlar kopuk',
        meaning: 'Yanlış renk, beden veya uyumluluk seçilebilir.',
        action: 'Ebeveyn-varyant modelini kalıcı kimliklerle yeniden kurun.',
      },
      {
        signal: 'Feed sağlıklı, ölçüm eksik',
        meaning: 'Trafik ve sipariş etkisi doğrulanamaz.',
        action: 'Kaynak etiketi, sipariş ve iade geri beslemesini ekleyin.',
      },
    ],
    mistakes: [
      'Ülke uygunluğunu doğrulamadan canlı entegrasyon vaadi vermek.',
      'Ürün sayfasını tek doğruluk kaynağı sanıp feed farklarını izlememek.',
      'Yalnız alan doluluğuna bakıp fiyat ve stok doğruluğunu atlamak.',
      'llms.txt veya özel “AI schema” dosyasını Google AI görünürlüğü için zorunlu sanmak.',
      'Tam katalog güncellemesini seyrek ve hatasızmış gibi kabul etmek.',
      'AI trafiğini sipariş, iptal ve iade sonucuna bağlamamak.',
    ],
    checklist: [
      'SKU ve varyant kimliklerini kalıcı hale getirin.',
      'Zorunlu alan, fiyat ve stok eşleşme oranını günlük ölçün.',
      'Tam katalog ile gün içi artımlı güncelleme sorumluluğunu ayırın.',
      'Teslimat, iade ve satıcı bilgisini yapılandırılmış tutun.',
      'Product/Offer verisinin görünür sayfa içeriğiyle eşleştiğini doğrulayın.',
      'Ülke, merchant ve ödeme uygunluğunu resmî kaynaklardan doğrulayın.',
    ],
    tool: {
      title: 'AI Alışveriş Görünürlük Denetimi',
      description:
        'Bulunabilirlik, ürün verisi, ticari senkronizasyon ve ölçüm hazırlığınızı 100 puanlık açık yöntemle değerlendirin.',
      href: '/araclar/ai-alisveris-gorunurluk-denetimi',
      cta: 'AI görünürlüğünü denetle',
    },
    relatedGuides: [
      'e-ticaret-dashboard-metrikleri',
      'haftalik-reklam-raporu-nasil-hazirlanir',
      'teslimat-iade-donusum-kontrol-listesi',
    ],
    faqs: [
      {
        question: 'ACP ve UCP aynı şey mi?',
        answer:
          'Hayır. Farklı ekosistemlerden gelen, ajan destekli ticaretin farklı bölümlerini standartlaştırmayı amaçlayan yaklaşımlardır.',
      },
      {
        question: 'Türkiye’de bugün kullanılabilir mi?',
        answer:
          'Ülke, merchant ve ödeme uygunluğu ürünlere göre değişebilir. Canlı kullanım kararı güncel resmî belgelerden doğrulanmalıdır.',
      },
      {
        question: 'İlk teknik yatırım ne olmalı?',
        answer:
          'Kalıcı ürün kimliği, fiyat/stok doğruluğu, varyant bütünlüğü ve güvenilir tam/artımlı katalog güncelleme hattı.',
      },
      {
        question: 'Google AI görünürlüğü için llms.txt veya özel bir AI schema gerekli mi?',
        answer:
          'Google’ın resmî rehberine göre AI Overviews ve AI Mode için özel bir AI dosyası veya schema gerekmiyor. İndekslenebilirlik, yararlı metinsel içerik, iç bağlantılar ve görünür içerikle eşleşen structured data temel olmaya devam ediyor. Platforma özel merchant feed’leri ayrı bir ticari veri hattıdır.',
      },
    ],
    sources: [
      googleAiFeatures,
      googleMerchantListing,
      openAiCommerce,
      openAiProductFeed,
      googleMerchantProductData,
      googleUcp,
      dhlTrends,
    ],
    disclaimer:
      'Protokol ve ülke uygunluğu hızla değişebilir. Entegrasyon öncesinde güncel resmî dokümantasyonu, sözleşmeleri ve ödeme koşullarını doğrulayın.',
  },
  {
    slug: 'pazaryeri-dijital-raf-performansi',
    title: 'Pazaryerinde Dijital Raf Performansı Nasıl Ölçülür?',
    excerpt:
      'Görünürlük, içerik, fiyat, buybox, stok ve operasyonu tek skor kartında birleştirerek pazaryeri performansını satıştan önce yönetin.',
    category: 'Pazaryeri & Operasyon',
    contentType: 'Uygulama rehberi',
    maturity: 'growing',
    audience: 'Pazaryeri yöneticileri, marka ekipleri ve e-ticaret kurucuları',
    intent: 'Ölçüm ve optimizasyon',
    readingTime: 10,
    publishedAt: '2026-08-01',
    updatedAt: '2026-08-01',
    reviewedAt: '2026-08-01',
    reviewDueAt: '2026-10-01',
    shortAnswer:
      'Dijital raf performansı, satışın ön koşullarını puanlar: stratejik aramalarda görünürlük, ürün içeriğinin karar tamlığı, fiyat ve buybox disiplini, stok sürekliliği, yorum güveni ve teslimat operasyonu. Skor kategori ve karşılaştırılabilir rakip setine göre haftalık izlenmeli; satış ve katkı sonucu aylık doğrulanmalıdır.',
    whyItMatters: [
      'Satış gecikmeli bir sonuçtur; raf sinyalleri problemi daha erken görünür kılar.',
      'Reklam görünürlüğü, içerik kalitesi ve stok sorunlarını birbirinden ayırır.',
      'Buybox büyümesini minimum katkı sınırıyla birlikte yönetmeye zorlar.',
    ],
    definition:
      'Dijital raf, bir ürünün pazaryerindeki aranabilirlik, bulunabilirlik, içerik, fiyat, güven ve operasyon durumunun bütünüdür. Amaç tek bir vanity score değil, düşen boyutu doğru ekibe ve aksiyona yönlendirmektir.',
    formula:
      'Raf skoru = görünürlük × %25 + içerik × %20 + fiyat/buybox × %20 + stok × %15 + yorum × %10 + operasyon × %10',
    formulaNote:
      'Ağırlıklar başlangıç modelidir. Modada varyant bulunurluğu, elektronikte teknik nitelik ve buybox gibi kategoriye özgü boyutlar daha ağır tanımlanabilir.',
    inputs: [
      { label: 'Sorgu sepeti', description: 'Kategori için sabitlenen 20–50 stratejik arama.' },
      {
        label: 'Rakip seti',
        description: 'Fiyat bandı ve kullanım amacı karşılaştırılabilir ürünler.',
      },
      {
        label: 'İçerik verisi',
        description: 'Başlık, nitelik, görsel, varyant ve açıklama tamlığı.',
      },
      {
        label: 'Ticari sinyaller',
        description: 'Fiyat, promosyon, buybox, stok ve sponsorlu görünürlük.',
      },
      {
        label: 'Operasyon sinyalleri',
        description: 'Puan, yorum, soru yanıtı, hazırlama ve geç gönderim.',
      },
    ],
    example: {
      title: '100 puanlık haftalık raf skoru',
      intro: 'Kategoriye göre ağırlıklandırılmış örnek bir marka görünümü.',
      rows: [
        { label: 'Görünürlük', value: '17 / 25', note: 'Sponsorlu güçlü, organik zayıf' },
        { label: 'İçerik', value: '16 / 20', note: 'Nitelik alanlarında boşluk var' },
        { label: 'Fiyat + buybox', value: '12 / 20', note: 'Marj altı fiyat baskısı' },
        { label: 'Stok', value: '13 / 15', note: 'İki ana SKU kesintili' },
        { label: 'Yorum + operasyon', value: '16 / 20', note: 'Yanıt süresi iyileştirilmeli' },
      ],
      result:
        'Toplam 74/100. İlk aksiyon daha fazla reklam değil; organik görünürlük, buybox nedeni ve iki ana SKU’nun stok kesintisidir.',
    },
    decisions: [
      {
        signal: 'Görünürlük düştü',
        meaning: 'Stok, sıralama veya sponsorlu pay kaybı olabilir.',
        action: 'Sorgu ve SKU kırılımını ayırın.',
      },
      {
        signal: 'Dönüşüm düştü',
        meaning: 'Fiyat, içerik, yorum veya teslimat vaadi bozulmuş olabilir.',
        action: 'Karşılaştırılabilir rakip ürünlerle fark analizi yapın.',
      },
      {
        signal: 'Buybox düştü',
        meaning: 'Fiyat veya operasyon skoru baskı yaratıyor.',
        action: 'Minimum marjı koruyarak nedeni doğrulayın.',
      },
    ],
    mistakes: [
      'Organik ve sponsorlu görünürlüğü tek metrikte eritmek.',
      'Farklı kategori ve fiyat bandındaki ürünleri kıyaslamak.',
      'Ürün içeriğini yalnız kelime sayısıyla değerlendirmek.',
      'Buybox hedefini katkı payından bağımsız optimize etmek.',
      'Promosyon haftasını normal dönemle doğrudan karşılaştırmak.',
    ],
    checklist: [
      'Rakip ürün ve stratejik sorgu sepetini sabitleyin.',
      'Organik ve sponsorlu görünürlüğü ayrı ölçün.',
      'İçerik alanlarını karar tamlığına göre puanlayın.',
      'Buybox ve fiyat kararına minimum katkı kapısı ekleyin.',
      'Raf skorunu satış, katkı ve iade sonucuyla doğrulayın.',
    ],
    tool: {
      title: 'Pazaryeri Komisyon Hesaplayıcı',
      description: 'Komisyon, hizmet bedeli ve lojistik sonrası ürün başına kalan tutarı görün.',
      href: '/araclar/pazaryeri-komisyon-hesaplayici',
      cta: 'Pazaryeri katkısını hesapla',
    },
    relatedGuides: [
      'e-ticaret-karlilik-isletim-sistemi',
      'retail-media-karliligi-nasil-olculur',
      'e-ticaret-dashboard-metrikleri',
    ],
    faqs: [
      {
        question: 'İyi bir raf skoru kaçtır?',
        answer:
          'Evrensel eşik yoktur. Kendi kategori, rakip seti ve ağırlıklarınızla önce baz dönem oluşturup değişimi ve ticari sonucu birlikte izleyin.',
      },
      {
        question: 'Daha uzun açıklama daha iyi midir?',
        answer:
          'Hayır. Hedef uzunluk değil, müşterinin karar vermesi ve yanlış beklentinin azalması için gereken bilginin eksiksizliğidir.',
      },
      {
        question: 'Skor ne sıklıkla güncellenmeli?',
        answer:
          'Raf sinyalleri haftalık; satış, katkı ve iade gibi sonuçlar aylık ya da yeterli örnek oluştuğunda doğrulanabilir.',
      },
    ],
    sources: [digitalShelf],
    disclaimer:
      'Pazaryeri algoritmaları ve veri erişimi değişebilir. Skor ağırlıkları Veri Mimarı başlangıç modelidir; kategori ekonominize göre doğrulanmalıdır.',
  },
  {
    slug: 'retail-media-karliligi-nasil-olculur',
    title: 'Retail Media Kârlılığı Nasıl Ölçülür?',
    excerpt:
      'Sponsorlu satış ROAS’ını net satış, pazaryeri kesintisi, ürün katkısı ve artımsallıkla düzeltin; reklamın gerçek ekonomik etkisini yönetin.',
    category: 'Pazaryeri & Operasyon',
    contentType: 'Uygulama rehberi',
    maturity: 'evergreen',
    audience: 'Pazaryeri, retail media, performans pazarlama, e-ticaret ve finans ekipleri',
    intent: 'Ölçüm ve bütçe kararı',
    readingTime: 12,
    publishedAt: '2026-08-01',
    updatedAt: '2026-08-01',
    reviewedAt: '2026-08-01',
    reviewDueAt: '2026-10-01',
    shortAnswer:
      'Retail media kârlılığı panel ROAS’ından değil, iade ve iptal sonrası net atfedilen satıştan başlar. Bu satıştan ürün maliyeti, pazaryeri kesintisi ve sipariş operasyonu çıkarılarak atıf bazlı katkı bulunur. Reklamın gerçek iş etkisi için bu katkının yalnız güvenilir bir deney veya açıkça etiketlenmiş senaryoyla artımlı olduğu tahmin edilen kısmı alınır; reklam harcaması son adımda çıkarılır.',
    whyItMatters: [
      'Marka araması, organik sıralama ve zaten oluşacak satışlar sponsorlu kampanyaya fazla kredi yazabilir.',
      'Aynı panel ROAS’ı, komisyonu ve ürün maliyeti farklı SKU’larda tamamen farklı katkı üretir.',
      'Sponsorlu görünürlük organik raf performansını destekleyebilir veya ikame edebilir; iki yüzey ayrı ölçülmelidir.',
      'Brüt ve net satış tanımı eşitlenmeden pazaryerleri ve kampanyalar karşılaştırılamaz.',
    ],
    definition:
      'Retail media kârlılık sistemi; reklam teslimatını, atfedilen satışı, net satış ekonomisini ve artımlı etkiyi ayrı katmanlar olarak ölçer. Panel sonucu optimizasyon sinyalidir; bütçe kararı, güvenilir karşı-olguya göre tahmin edilen ek katkı ve şirketin nakit/stoğa ilişkin koruma kapılarıyla verilir.',
    formula:
      'Net artımlı katkı = (Net atfedilen satış − ürün − komisyon − operasyon) × doğrulanmış artımlı pay − reklam harcaması',
    formulaNote:
      'Artımlı pay RCT, holdout, matched-market veya uygun karşı-olgu modelinden gelmiyorsa sonuç yalnız senaryodur. Atıf penceresi, brüt/net satış, iade olgunluğu ve yeni-müşteri tanımı raporda açıkça yazılmalıdır.',
    inputs: [
      {
        label: 'Atfedilen brüt satış',
        description: 'Platformun aynı kampanya ve zaman penceresinde reklama kredi yazdığı satış.',
      },
      {
        label: 'Net satış düzeltmesi',
        description: 'İade, iptal, vergi ve indirimin veri sözlüğünde tanımlanan etkisi.',
      },
      {
        label: 'Ürün ve kanal ekonomisi',
        description: 'COGS, komisyon, hizmet/ödeme kesintisi, kargo ve paketleme.',
      },
      {
        label: 'Artımlı pay',
        description:
          'Atfedilen sonucun reklam olmasaydı oluşmayacak kısmı; yöntem ve güven aralığıyla.',
      },
      {
        label: 'Raf bağlamı',
        description: 'Organik/sponsorlu görünürlük, fiyat, buybox, stok ve yeni-müşteri kırılımı.',
      },
    ],
    example: {
      title: 'Panel ROAS’ı 5x olan sponsorlu kampanya',
      intro: 'Atfedilen satıştan gerçek ek katkıya doğru adım adım ilerleyelim.',
      rows: [
        {
          label: 'Atfedilen brüt satış',
          value: '600.000 TL',
          note: '120.000 TL harcama · ROAS 5x',
        },
        { label: 'İade / iptal düzeltmesi', value: '−%8', note: '552.000 TL net atfedilen satış' },
        { label: 'Ürün maliyeti', value: '−%42', note: 'Net satış üzerinden' },
        { label: 'Komisyon + operasyon', value: '−122.800 TL', note: '%15 kesinti + 500 × 80 TL' },
        { label: 'Atıf bazlı katkı', value: '77.360 TL', note: 'Reklam sonrası pozitif görünür' },
        { label: 'Tahmini artımlı pay', value: '%45', note: 'Senaryo veya deney sonucu' },
        {
          label: 'Net artımlı katkı',
          value: '−31.188 TL',
          note: 'Gerçek ek katkı reklamı karşılamıyor',
        },
      ],
      result:
        'Panel ROAS 5x ve atıf bazlı katkı pozitif olsa da atfedilen katkının en az %60,8’i gerçekten artımlı değilse kampanya reklam harcamasını geri ödeyemez.',
    },
    decisions: [
      {
        signal: 'Panel ROAS güçlü, net artımlı katkı negatif',
        meaning: 'Reklam organik veya zaten oluşacak talebe yüksek kredi alıyor olabilir.',
        action:
          'Bütçeyi büyütmeyin; holdout, sorgu ve yeni-müşteri kırılımıyla artımlı payı doğrulayın.',
      },
      {
        signal: 'Artımlı katkı pozitif, stok/buybox zayıf',
        meaning: 'Medya talebi büyütürken ürün bulunurluğu ve satın alma hakkı sonucu sınırlıyor.',
        action: 'Bütçeyi stoklu ve buybox’ı koruyan SKU’lara kaydırın.',
      },
      {
        signal: 'Sponsorlu satış artıyor, organik pay düşüyor',
        meaning:
          'Reklam gerçek kategori büyümesi yerine organik görünürlüğün yerini alıyor olabilir.',
        action:
          'Sponsorlu ve organik sorgu payını ayrı izleyin; marka ve kategori sorgularını ayırın.',
      },
      {
        signal: 'Yeni-müşteri payı artıyor, katkı hedef altında',
        meaning: 'Edinme genişliyor fakat müşteri veya ürün ekonomisi zayıf.',
        action: '90 günlük katkı LTV ve ilk ürün kohortuyla bütçe tavanını yeniden hesaplayın.',
      },
    ],
    mistakes: [
      'Atfedilen satışı artımlı satış kabul etmek.',
      'Brüt satış ROAS’ını iade ve iptal olgunlaşmadan bütçe hedefi yapmak.',
      'Komisyon ve sipariş operasyonunu yalnız ürün P&L’inde bırakıp reklam kararından çıkarmak.',
      'Marka araması ile kategori keşif sorgusunu aynı kampanya ortalamasında eritmek.',
      'Sponsorlu ve organik raf görünürlüğünü tek metrik olarak raporlamak.',
      'Artımlı pay varsayımını deney sonucu gibi sunmak.',
    ],
    checklist: [
      'Brüt satış, net satış ve iade olgunluğu tanımını yazın.',
      'Platform, SKU, sorgu ve kampanya penceresini aynı kapsamda eşleyin.',
      'Ürün, komisyon ve operasyon sonrası reklam öncesi katkıyı hesaplayın.',
      'Artımlı payın deney, model veya senaryo kaynağını etiketleyin.',
      'Sponsorlu/organik görünürlük ile yeni/mevcut müşteriyi ayrı izleyin.',
      'Bütçe artışını net artımlı katkı, stok ve buybox kapısına bağlayın.',
      'Olgunlaşmış iade verisi geldiğinde kampanya sonucunu yeniden hesaplayın.',
    ],
    tool: {
      title: 'Pazaryeri Reklam Kârlılık Hesaplayıcı',
      description:
        'Panel ROAS’ını net satış, komisyon, ürün maliyeti ve artımlı katkıyla aynı senaryoda düzeltin.',
      href: '/araclar/pazaryeri-reklam-karlilik-hesaplayici',
      cta: 'Retail media katkısını hesapla',
    },
    relatedGuides: [
      'pazaryeri-dijital-raf-performansi',
      'artimsallik-ve-kar-odakli-reklam-olcumu',
      'e-ticaret-karlilik-isletim-sistemi',
    ],
    faqs: [
      {
        question: 'Retail media ROAS ile kâr aynı şey midir?',
        answer:
          'Hayır. ROAS atfedilen satışı reklam harcamasına böler. Kâr veya katkı için iade, ürün, komisyon ve operasyon maliyetleri düşülmeli; bütçe etkisi için reklamın gerçekten ek yarattığı pay ayrıca doğrulanmalıdır.',
      },
      {
        question: 'Artımlı payı bilmiyorsam ne girmeliyim?',
        answer:
          'Kötü, baz ve iyi senaryolar çalıştırın ve sonucu “varsayım” olarak etiketleyin. Bu senaryo bütçe hassasiyetini gösterir; deney veya güvenilir karşı-olgu yerine geçmez.',
      },
      {
        question: 'Organik satış sponsorlu reklam sayesinde artmış olabilir mi?',
        answer:
          'Olabilir. Reklam ürün keşfi, yorum hacmi ve sıralamayı etkileyebilir; aynı zamanda zaten gelecek organik satışı ikame edebilir. Sponsorlu ve organik sorgu/SKU görünürlüğünü zaman ve kontrol tasarımıyla birlikte inceleyin.',
      },
      {
        question: 'Atıf penceresi kaç gün olmalı?',
        answer:
          'Kategori satın alma döngüsüne göre değişir. IAB Europe V2.1 varsayılan 30 günlük lookback raporlamasını desteklerken esnek pencere seçeneği ister; kullandığınız platform penceresini ve karşılaştırma kapsamını açıkça yazın.',
      },
    ],
    sources: [
      iabEuropeCommerceMediaStandards,
      iabCommerceIncrementality,
      iabMrcRetailMedia,
      amazonCampaignReporting,
    ],
    disclaimer:
      'Artımlı pay girdisi deneyden gelmiyorsa hesap nedensel sonuç değil senaryodur. Pazaryeri raporlama tanımları ve uygun ölçüm özellikleri platforma, ülkeye ve hesaba göre değişebilir.',
  },
  {
    slug: 'teslimat-iade-donusum-kontrol-listesi',
    title: 'Teslimat ve İade Dönüşüm Kontrol Listesi',
    excerpt:
      'Ücretsiz kargo ezberinin ötesine geçin; teslimat seçeneği, güven, hız, iade maliyeti ve checkout iletişimini birlikte ölçün.',
    category: 'Pazaryeri & Operasyon',
    contentType: 'Uygulama rehberi',
    maturity: 'growing',
    audience: 'E-ticaret, CRO, müşteri deneyimi ve operasyon ekipleri',
    intent: 'Denetim ve test planı',
    readingTime: 9,
    publishedAt: '2026-08-01',
    updatedAt: '2026-08-01',
    reviewedAt: '2026-08-01',
    reviewDueAt: '2026-11-01',
    shortAnswer:
      'Teslimat satırı yalnız operasyon bilgisi değildir; fiyat, hız, seçenek ve güveni birlikte taşıyan bir dönüşüm bileşenidir. Teslimat vaadini siparişten önce açık, siparişten sonra izlenebilir kılın; ücretsiz kargo ve iade kararlarını yalnız dönüşümle değil sipariş başına katkıyla değerlendirin.',
    whyItMatters: [
      'DHL’nin küresel araştırmasında alışverişçilerin %67’si teslimat teklifi nedeniyle sepet terk ettiğini bildiriyor.',
      'Güvenilir sağlayıcı, seçenek netliği ve iade koşulu satın alma kararını etkiliyor.',
      'İade nedeni ürün içeriği, kalite ve taşıyıcı problemlerini aynı anda görünür kılıyor.',
    ],
    definition:
      'Teslimat dönüşüm sistemi, checkout teklifini, gerçekleşen teslimat performansını ve iade ekonomisini aynı deney tablosunda izler. Amaç en hızlı veya en ucuz vaat değil, müşteri güveni ve katkı payı birlikte güçlü olan tekliftir.',
    formula:
      'Teslimat sonrası katkı = Net gelir − ürün gideri − gidiş lojistiği − beklenen iade maliyeti − reklam',
    formulaNote:
      'Beklenen iade maliyeti; iade olasılığı ile ters kargo, işlem, değer kaybı ve geri kazanım tutarının birlikte modellenmesiyle hesaplanmalıdır.',
    inputs: [
      {
        label: 'Checkout teklifi',
        description: 'Ücret, tahmini tarih, taşıyıcı, seçenek ve ücretsiz kargo eşiği.',
      },
      {
        label: 'Gerçekleşen süre',
        description: 'Siparişten teslimata gün; taşıyıcı ve bölge kırılımı.',
      },
      {
        label: 'Lojistik maliyeti',
        description: 'Gidiş, paketleme, ters kargo ve yeniden işleme.',
      },
      {
        label: 'İade nedeni',
        description:
          'Beden, renk, uyumluluk, hasar, gecikme ve yanlış ürün gibi eyleme dönük kodlar.',
      },
      {
        label: 'Dönüşüm sonucu',
        description: 'Seçenek görünümü, satın alma, sepet, katkı ve WISMO teması.',
      },
    ],
    example: {
      title: 'Ücretsiz kargo eşiği testi',
      intro: 'Eşik değişikliğini yalnız sipariş sayısıyla değil ekonomik sonuçla değerlendirelim.',
      rows: [
        { label: 'Mevcut eşik', value: '750 TL', note: 'Sepet 690 TL' },
        { label: 'Test eşiği', value: '900 TL', note: 'Sepet 815 TL' },
        { label: 'Dönüşüm değişimi', value: '−%3', note: 'Sipariş sayısı azaldı' },
        { label: 'Sipariş başına katkı', value: '+%18', note: 'Ek ürün ve daha az sübvansiyon' },
        { label: 'Toplam katkı', value: '+%9', note: 'Ana karar metriği' },
      ],
      result:
        'Dönüşüm oranı düşse de toplam katkı yükseldiği için test ekonomik olarak olumlu olabilir; kapasite ve müşteri etkisi ayrıca kontrol edilmelidir.',
    },
    decisions: [
      {
        signal: 'Checkout terk yüksek',
        meaning: 'Ücret, tarih veya seçenek geç ve belirsiz görünüyor olabilir.',
        action: 'Teslimat bilgisini ödeme adımından önce açıklaştırın.',
      },
      {
        signal: 'Vaat tutmuyor',
        meaning: 'Bölge veya taşıyıcı performansı teklifin gerisinde.',
        action: 'Tahmini tarihi gerçek dağılıma göre güncelleyin.',
      },
      {
        signal: 'İade artıyor',
        meaning: 'Ürün beklentisi, kalite veya teslimat hasarı sorunu olabilir.',
        action: 'Nedenleri SKU, taşıyıcı ve içerik sahibiyle eşleyin.',
      },
    ],
    mistakes: [
      'Teslimat ücretini ödeme adımına kadar saklamak.',
      '“Hızlı teslimat” gibi doğrulanamayan genel ifade kullanmak.',
      'Ücretsiz kargoyu yalnız dönüşüm oranıyla değerlendirmek.',
      'İade nedenini “müşteri vazgeçti” düzeyinde bırakmak.',
      'Küresel oranları Türkiye için doğrudan benchmark kabul etmek.',
    ],
    checklist: [
      'Ücret, tarih ve seçenekleri checkout öncesinde gösterin.',
      'Söz verilen ve gerçekleşen süreyi taşıyıcı/bölge bazında ölçün.',
      'Ücretsiz kargo eşiğini toplam katkıyla test edin.',
      'İade nedenlerini ürün, içerik ve operasyon aksiyonlarına bağlayın.',
      'Mobil checkout, odak görünürlüğü ve yatay taşmayı doğrulayın.',
    ],
    tool: {
      title: 'İndirim Kârlılık Simülatörü',
      description: 'Teklif değişikliğinin gerekli ek satış ve katkı etkisini senaryolaştırın.',
      href: '/araclar/indirim-karlilik-simulatoru',
      cta: 'Teklifi simüle et',
    },
    relatedGuides: [
      'iade-orani-karliliga-nasil-eklenir',
      'e-ticaret-karlilik-isletim-sistemi',
      'indirim-karliligi-nasil-hesaplanir',
    ],
    faqs: [
      {
        question: 'Ücretsiz kargo her zaman dönüşümü artırır mı?',
        answer:
          'Artırabilir; fakat karar toplam katkı, sepet, iade ve lojistik maliyeti birlikte ölçülerek verilmelidir.',
      },
      {
        question: 'DHL oranlarını Türkiye hedefi olarak kullanabilir miyim?',
        answer:
          'Hayır. Küresel araştırma hangi sürtünmeleri ölçmeniz gerektiğini gösterir; yerel hedef kendi mağaza verinizden çıkmalıdır.',
      },
      {
        question: 'İadeyi azaltmanın ilk adımı nedir?',
        answer:
          'Neden kodlarını eyleme dönük hale getirip en yüksek hacimli SKU’larda içerik, kalite ve taşıyıcı kaynaklı sorunları ayırmaktır.',
      },
    ],
    sources: [dhlTrends, ministryEcommerce],
    disclaimer:
      'Küresel araştırma oranları Türkiye için doğrudan benchmark değildir. Deney sonuçlarını kendi trafik, kategori, bölge ve katkı verinizle doğrulayın.',
  },
  {
    slug: 'e-ihracat-yerellestirme-teslimat-guveni',
    title: 'E-İhracatta Yerelleştirme ve Teslimat Güveni Nasıl Kurulur?',
    excerpt:
      'Yeni bir ülkeye reklam açmadan önce fiyat, dil, teslimat, iade, gümrük ve müşteri desteğini tek güven teklifinde doğrulayın.',
    category: 'Pazaryeri & Operasyon',
    contentType: 'Uygulama rehberi',
    maturity: 'growing',
    audience: 'E-ihracat kurucuları, büyüme, operasyon, müşteri deneyimi ve hukuk ekipleri',
    intent: 'Pazar açılışı ve risk kontrolü',
    readingTime: 10,
    publishedAt: '2026-08-02',
    updatedAt: '2026-08-02',
    reviewedAt: '2026-08-02',
    reviewDueAt: '2026-09-15',
    shortAnswer:
      'E-ihracat yerelleştirme yalnızca dili çevirmek değildir. Hedef ülkede müşterinin gördüğü fiyatın hangi para biriminde ve vergi kapsamıyla sunulduğu, teslimatın kaç günde ve hangi taşıyıcıyla geldiği, iade/cayma sürecinin nasıl işlediği, gümrük maliyetinin kimin sorumluluğunda olduğu ve destek kanalının ne kadar hızlı yanıt verdiği tek bir güven teklifidir. Reklamı bu temel yüzeyler doğrulandıktan sonra ölçekleyin.',
    whyItMatters: [
      'DHL’nin 2026 araştırmasında alışverişçilerin %67’si teslimat teklifi nedeniyle sepet terk etti; %70’i teslimat/iade sağlayıcısına güvenmiyorsa markadan alışveriş yapmayacağını bildirdi.',
      'AB resmî rehberleri sınır ötesi satışta teslimat seçenekleri, ücret ve süre bilgisinin satın alma öncesi açık olmasını vurguluyor.',
      'AB dışından gönderimde gümrük ve ürün tanımlayıcısı hazırlığı fiyat, teslimat vaadi ve operasyon akışını doğrudan etkileyebilir.',
      'Yerel para birimi göstermek tek başına yerelleştirme değildir; checkout, iade ve destek de aynı ülke sözleşmesini taşımalıdır.',
    ],
    definition:
      'E-ihracat güven sistemi; ülke bazlı teklif, ödeme, teslimat, gümrük, iade ve müşteri hizmetleri verisini aynı ürün ve sipariş kimliği altında doğrulayan operasyon katmanıdır. Başarı, ülkeye açılan trafik değil; beklenen ve gerçekleşen teslimat, net katkı, iade ve destek sonuçlarının birlikte sürdürülebilmesidir.',
    formula:
      'Ülke başı katkı = Net tahsilat − ürün − ödeme − gidiş lojistiği − gümrük/vergiler − iade rezervi − destek − edinme maliyeti',
    formulaNote:
      'Vergi, gümrük, IOSS veya yerel yükümlülükler ülkeye, ürün sınıfına ve satış modeline göre değişir. Formülde “gümrük/vergiler” kalemini sıfır varsaymayın; sorumlu tarafı ve checkout gösterimini ülke bazında doğrulayın.',
    inputs: [
      {
        label: 'Ülke teklifi',
        description:
          'Dil, para birimi, vergi dahil/hariç gösterim, stok ve teslim edilebilir SKU kapsamı.',
      },
      {
        label: 'Teslimat sözleşmesi',
        description: 'Taşıyıcı, fiyat, tahmini süre, gecikme iletişimi ve takip numarası üretimi.',
      },
      {
        label: 'Gümrük ve ürün kimliği',
        description:
          'Ürün sınıfı, menşe, gerekli tanımlayıcılar, beyan sahibi ve beklenmeyen maliyet sorumluluğu.',
      },
      {
        label: 'İade ve cayma akışı',
        description:
          'İade adresi, ters kargo, süre, geri ödeme yöntemi, hasar ve yeniden satış kararı.',
      },
      {
        label: 'Yerel destek',
        description: 'Dil, saat dilimi, yanıt SLA’sı, teslimat takibi ve WISMO temasının kaydı.',
      },
    ],
    example: {
      title: 'Yeni bir AB ülkesine reklam açmadan önce',
      intro:
        'Aynı ürün fiyatını göstermek yerine ülke teklifini güven kapılarıyla değerlendirelim.',
      rows: [
        { label: 'Ürün fiyatı', value: 'Yerel para biriminde', note: 'Vergi kapsamı açık' },
        {
          label: 'Teslimat teklifi',
          value: 'Ücret + tahmini tarih',
          note: 'Checkout öncesi görünür',
        },
        {
          label: 'Gümrük sorumluluğu',
          value: 'Satıcı / taşıyıcı / müşteri',
          note: 'Siparişten önce açık',
        },
        { label: 'İade yolu', value: 'Adres + süre + maliyet', note: 'Yerel dilde erişilebilir' },
        { label: 'Destek SLA’sı', value: 'İlk yanıt süresi', note: 'Teslimat takibi dahil' },
        { label: 'Yayın kapısı', value: '5/5 doğrulama', note: 'Eksikse reklam ölçeklenmez' },
      ],
      result:
        'Ülke sayfası ve checkout bu beş güven alanını taşımıyorsa trafik satın almak erken olabilir. Önce küçük bir doğrulama kohortu, sonra teslimat/iade olgunlaştığında bütçe artışı uygulanmalıdır.',
    },
    decisions: [
      {
        signal: 'Tıklama var, checkout başlangıcı düşük',
        meaning: 'Fiyat, vergi, teslimat veya ödeme beklentisi reklamdan sonra bozuluyor olabilir.',
        action:
          'Ülke landing sayfası ile checkout toplam fiyatını ve teslimat teklifini karşılaştırın.',
      },
      {
        signal: 'Checkout var, sipariş düşük',
        meaning: 'Gümrük sürprizi, ödeme reddi veya teslimat süresi güveni zedeliyor olabilir.',
        action: 'Ödeme reddi, ülke kodu, taşıyıcı ve terk adımını ayrı izleyin.',
      },
      {
        signal: 'Sipariş var, iade ve destek yüksek',
        meaning: 'Ürün beklentisi, yerelleştirme veya teslimat vaadi doğru kurulmamış olabilir.',
        action: 'İade nedenini SKU, çeviri, ölçü, taşıyıcı ve vaat alanlarına ayırın.',
      },
      {
        signal: 'Ciro artıyor, ülke katkısı negatif',
        meaning: 'Lojistik, gümrük, ödeme ve edinme maliyeti satış gelirini eritiyor.',
        action: 'Ülke bazlı başabaş CAC ve minimum sipariş katkısı kapısı belirleyin.',
      },
    ],
    mistakes: [
      'Ürün sayfasını yalnız makine çevirisiyle yerelleştirip checkout ve iade metnini çevirmemek.',
      'Vergi/gümrük sorumluluğunu siparişten sonra müşteriye açıklamak.',
      'Teslimat süresini tek ortalama gün olarak yazıp ülke veya bölge farkını gizlemek.',
      'Yerel para birimi gösterimini gerçek tahsilat ve ödeme yöntemleriyle karıştırmak.',
      'İade adresi, ters kargo ve geri ödeme süresini destek ekibine bırakmak.',
      'Küresel teslimat oranlarını Türkiye’den açılan her ülke için hedef kabul etmek.',
    ],
    checklist: [
      'Ülke sayfası ve checkout aynı para birimi, vergi ve toplam fiyat tanımını taşıyor.',
      'Teslimat ücreti, tahmini tarih, taşıyıcı ve takip akışı satın alma öncesi görünür.',
      'Gümrük/vergiler ve sorumlu taraf ürün ve sipariş akışında açıkça yazıyor.',
      'İade/cayma süresi, adresi, maliyeti ve geri ödeme yöntemi hedef dilde erişilebilir.',
      'Yerel ödeme yöntemi, para birimi ve başarısız ödeme nedeni izleniyor.',
      'İade, destek ve teslimat sonuçları ülke/SKU/kampanya kimliğiyle bağlanıyor.',
      'Ülke başı katkı pozitif olmadan reklam bütçesi ölçeklenmiyor.',
    ],
    tool: {
      title: 'İndirim Kârlılık Simülatörü',
      description:
        'Ülke teklifindeki fiyat, lojistik ve iade varsayımlarının katkı eşiğini senaryolaştırın.',
      href: '/araclar/indirim-karlilik-simulatoru',
      cta: 'Ülke teklifini simüle et',
    },
    relatedGuides: [
      'teslimat-iade-donusum-kontrol-listesi',
      'ai-alisveris-ajanlarina-hazirlik',
      'e-ticaret-karlilik-isletim-sistemi',
    ],
    faqs: [
      {
        question: 'Yerel para birimi göstermek yeterli mi?',
        answer:
          'Hayır. Para birimi; vergi kapsamı, ödeme sağlayıcısı, teslimat ücreti, iade geri ödemesi ve muhasebe uzlaştırmasıyla birlikte ele alınmalıdır.',
      },
      {
        question: 'AB teslimat ve iade kuralları Türkiye’den satışta otomatik uygulanır mı?',
        answer:
          'Hedef ülkeye, satış modeline ve tüketiciye yöneltilen ticari faaliyete göre yükümlülükler değişebilir. Resmî ülke rehberlerini ve hukuk/vergı danışmanınızı kontrol etmeden tek bir AB kuralını tüm pazarlara uygulamayın.',
      },
      {
        question: 'İlk ülke kampanyası ne zaman ölçeklenmeli?',
        answer:
          'Checkout, teslimat, iade ve destek akışı küçük bir doğrulama kohortunda çalışıp ülke başı katkı ve iade penceresi ölçüldükten sonra.',
      },
    ],
    sources: [dhlTrends, euShippingDelivery, euEcommerceRules, euCustoms2026],
    disclaimer:
      'Bu rehber operasyonel karar desteğidir; hukuk, vergi veya gümrük danışmanlığı değildir. Hedef ülke, ürün sınıfı, satış modeli ve güncel mevzuat için yerel uzman doğrulaması gerekir.',
  },
  {
    slug: 'urun-veri-sozlesmesi-katalog-yonetimi',
    title: 'Ürün Veri Sözleşmesi Nasıl Kurulur? SKU, Varyant, Fiyat ve Stok Paritesi',
    excerpt:
      'Mağaza, structured data, merchant feed, reklam ve checkout arasında aynı ürünü konuşmak için uygulanabilir bir katalog veri sözleşmesi kurun.',
    category: 'Veri ve Raporlama',
    contentType: 'Uygulama rehberi',
    maturity: 'growing',
    audience: 'E-ticaret, ürün, veri, pazarlama ve mühendislik ekipleri',
    intent: 'Veri mimarisi ve operasyon standardı',
    readingTime: 11,
    publishedAt: '2026-08-02',
    updatedAt: '2026-08-02',
    reviewedAt: '2026-08-02',
    reviewDueAt: '2026-09-15',
    shortAnswer:
      'Ürün veri sözleşmesi; SKU/item_id, ebeveyn-varyant ilişkisi, başlık, açıklama, görsel, fiyat, stok, teslimat ve iade alanlarının anlamını, sahibi olan sistemi, güncelleme SLA’sını ve hata davranışını yazılı hale getirir. Amaç tek bir CSV üretmek değil; ürün sayfası, Product/Offer structured data, merchant feed, reklam kataloğu ve checkout arasında aynı ürünü ve ticari durumu taşıyan doğrulanabilir bir kimlik zinciri kurmaktır.',
    whyItMatters: [
      'Aynı SKU farklı sistemlerde farklı isim veya fiyatla yaşarsa pazarlama raporu ile sipariş sonucu birbirinden kopar.',
      'Varyant ilişkisi ve stok durumu bozulduğunda görünürlük artışı yanlış ürün, yanlış beden veya stok dışı teklif üretebilir.',
      'Alan sahibi ve güncelleme SLA’sı tanımlanmayan feed hataları ekipler arasında bekleyen manuel işlere dönüşür.',
      'AI keşif yüzeyleri ve klasik reklam katalogları değişse bile kalıcı ürün kimliği ve veri paritesi yatırımı korunur.',
    ],
    definition:
      'Ürün veri sözleşmesi, katalogdaki her alan için tanım, kaynak sistem, format, izin verilen değer, sahip, güncelleme sıklığı, doğrulama kuralı ve hata durumunu belirleyen ekipler arası veri anlaşmasıdır. Ticari gerçeklik ile içerik gerçekliğini aynı ürün kimliğinde birleştirir.',
    formula:
      'Parite oranı = aynı SKU için eşleşen alan sayısı / doğrulanması gereken alan sayısı × 100',
    formulaNote:
      'Parite oranı bir platform kabul veya sıralama garantisi değildir. Fiyat ve stok gibi kritik alanlar için genel ortalama yerine kritik hata oranı ve son başarılı güncelleme yaşı da ayrı izlenmelidir.',
    inputs: [
      {
        label: 'Kimlik modeli',
        description: 'SKU/item_id, GTIN, ebeveyn ürün, varyant ve ülke/kanal anahtarları.',
      },
      {
        label: 'İçerik sözleşmesi',
        description: 'Başlık, açıklama, görsel, ölçü, materyal, uyumluluk ve dil kuralları.',
      },
      {
        label: 'Ticari sözleşme',
        description: 'Fiyat, para birimi, stok, teslimat, iade ve satıcı/politika alanları.',
      },
      {
        label: 'Kalite kapıları',
        description:
          'Zorunlu alan, format, güncellik, sayfa/feed/checkout eşleşmesi ve hata sahibi.',
      },
    ],
    example: {
      title: 'Tek ürün için beş yüzey parite kontrolü',
      intro:
        'Aşağıdaki örnekte yüksek alan doluluğu, ticari parite bozulduğu için yayın kapısını geçmiyor.',
      rows: [
        { label: 'Kalıcı kimlik', value: 'AYK-001 / 42 / siyah', note: 'Sayfa-feed-checkout aynı' },
        { label: 'Başlık ve görsel', value: '%100', note: 'Görünür içerikle eşleşiyor' },
        { label: 'Fiyat ve para birimi', value: 'Feed ≠ checkout', note: 'Kritik hata' },
        { label: 'Stok güncelliği', value: '26 saat', note: 'SLA: 2 saat' },
        { label: 'Varyant ilişkisi', value: 'Kopuk', note: 'Beden seçimi güvenilmez' },
      ],
      result:
        'İçerik tamam olsa da fiyat, stok ve varyant kapıları geçilmeden reklam veya AI ticaret yüzeyi açılmamalı; önce kaynak sistem ve güncelleme hattı düzeltilmelidir.',
    },
    decisions: [
      {
        signal: 'Alan doluluğu yüksek, parite düşük',
        meaning: 'Katalog dolu görünür ama yüzeyler farklı ticari gerçeklik taşır.',
        action: 'Önce fiyat, stok, varyant ve checkout eşleşmesini kritik yayın kapısı yapın.',
      },
      {
        signal: 'Aynı SKU birden fazla kimlikle akıyor',
        meaning: 'Atıf, stok ve iade analizi ürünler arasında bölünür.',
        action: 'Kalıcı item_id belirleyip kanal kimliklerini eşleme tablosunda tutun.',
      },
      {
        signal: 'Feed güncellemesi başarısız ama alarm yok',
        meaning: 'Eski fiyat/stok bilgisi sessizce yayınlanmaya devam eder.',
        action: 'Son başarılı güncelleme yaşı, hata oranı ve sahip SLA’sı için alarm kurun.',
      },
      {
        signal: 'İçerik ekipleri ve veri ekibi farklı tanım kullanıyor',
        meaning: '“Stokta”, “teslimat süresi” veya “varyant” gibi alanlar raporda tutarsızlaşır.',
        action: 'Alan sözlüğünü örnek değer, sahip ve kabul kriteriyle yayınlayın.',
      },
    ],
    mistakes: [
      'Kanal bazında yeni SKU üretip kalıcı ürün kimliğini kaybetmek.',
      'Zorunlu alanları yalnız dolu/boş kontrolüyle ölçmek; anlam, format ve güncelliği test etmemek.',
      'Fiyat ve stok paritesini günlük ortalamayla gizleyip kritik anlık hataları izlememek.',
      'Varyant ebeveynini yalnız görsel bir grup sanıp sipariş ve iade kimliğiyle bağlamamak.',
      'Ürün sayfasını güncelleyip structured data, feed ve reklam kataloğunu geride bırakmak.',
      'Hata kuyruğunda sahip ve son tarih bulunmadan tüm sorunları “teknik” etiketiyle bekletmek.',
    ],
    checklist: [
      'Her ürün ve varyant için kalıcı SKU/item_id ve ebeveyn ilişkisi tanımlı.',
      'Alan sözlüğünde tanım, örnek değer, sahip, kaynak sistem ve güncelleme SLA’sı var.',
      'Sayfa, structured data, feed, reklam kataloğu ve checkout paritesi ölçülüyor.',
      'Fiyat, stok, para birimi ve teslimat için kritik yayın kapıları tanımlı.',
      'Son başarılı güncelleme yaşı ve hata oranı için alarm/eskalasyon akışı çalışıyor.',
      'Ülke ve kanal farkları ana kimliği bozmadan eşleme tablosunda tutuluyor.',
      'İade, sipariş ve reklam sonuçları aynı ürün/ülke/kampanya kimliğiyle geri besleniyor.',
    ],
    tool: {
      title: 'AI Merchant Feed Alan Sözlüğü',
      description:
        'Google ve OpenAI ürün alanlarını, kaynak sistem ve sahiplik bilgisiyle tek sözleşmede eşleyin.',
      href: '/sablonlar/ai-merchant-feed-alan-sozlugu',
      cta: 'Alan sözlüğünü aç',
    },
    relatedGuides: [
      'ai-alisveris-ajanlarina-hazirlik',
      'e-ticaret-dashboard-metrikleri',
      'pazaryeri-dijital-raf-performansi',
    ],
    faqs: [
      {
        question: 'Ürün veri sözleşmesi sadece teknik ekip işi mi?',
        answer:
          'Hayır. Ürün, operasyon, pazarlama, müşteri hizmetleri ve finans ekipleri alanların anlamını ve karar etkisini birlikte belirlemelidir; teknik ekip hattı uygular.',
      },
      {
        question: 'Parite oranı kaç olursa yeterlidir?',
        answer:
          'Evrensel eşik yoktur. Kritik fiyat/stok alanlarında hedef, ortalamadan önce sıfıra yakın kritik hata ve tanımlı güncelleme SLA’sıdır. Kategori ve kanal bazında kendi toleransınızı yazılı hale getirin.',
      },
      {
        question: 'Merchant feed ile ürün sayfası aynı veri kaynağından mı gelmeli?',
        answer:
          'Tek fiziksel sistem zorunlu değildir; fakat sahiplik, kimlik ve güncelleme kuralları ortak olmalı, iki yüzey arasındaki farklar otomatik doğrulanmalıdır.',
      },
      {
        question: 'Bu sözleşme AI görünürlüğünü garanti eder mi?',
        answer:
          'Hayır. Veri paritesi yalnızca sağlam bir ön koşuldur. İndeksleme, platform uygunluğu, ülke/merchant kapsamı ve gerçek sipariş deneyimi ayrıca doğrulanmalıdır.',
      },
    ],
    sources: [
      googleMerchantProductData,
      googleMerchantListing,
      openAiProductFeed,
      googleAiFeatures,
    ],
    disclaimer:
      'Bu rehber veri ve operasyon standardı için karar desteğidir; platform kabulü, sıralama veya ticari sonuç garantisi değildir. Güncel alan ve ülke gereksinimlerini ilgili resmî dokümantasyondan doğrulayın.',
  },
]
