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
    updatedAt: '2026-08-01',
    reviewedAt: '2026-08-01',
    reviewDueAt: '2026-09-15',
    shortAnswer:
      'AI alışveriş hazırlığının ilk işi yeni bir chatbot değil, makine tarafından anlaşılabilen ve güncel kalan ürün verisidir. Kalıcı SKU kimliği, doğru varyant, fiyat, stok, görsel, teslimat ve iade bilgisi tek doğruluk kaynağından beslenmelidir. ACP veya UCP entegrasyonu bu temel kurulduktan sonra değerlendirilmelidir.',
    whyItMatters: [
      'Ürün kataloğu artık yalnızca mağaza sayfası değil, farklı keşif yüzeylerine dağıtılan bir veri ürünüdür.',
      'Fiyat, stok ve varyant uyuşmazlığı insan müşteride de alışveriş ajanında da güven kaybı yaratır.',
      'Protokoller değişse bile ürün veri kalitesine yapılan yatırım kalıcıdır.',
    ],
    definition:
      'AI commerce readiness, bir ürünün doğru tanımlanması, güncel bulunabilirlik ve fiyatla sunulması, teslimat/iade koşullarının anlaşılması ve sonuçların ölçülebilmesi için gereken veri ve operasyon hazırlığıdır.',
    formula:
      'Hazırlık skoru = Zorunlu alan × %30 + doğruluk × %30 + güncellik × %20 + operasyon × %10 + ölçüm × %10',
    formulaNote:
      'Bu ağırlıklar Veri Mimarı başlangıç modelidir; resmî bir OpenAI veya Google uygunluk puanı değildir. Kritik fiyat ve stok hataları toplam skordan bağımsız engelleyici kabul edilmelidir.',
    inputs: [
      { label: 'Ürün kimliği', description: 'Kalıcı SKU/GTIN, ebeveyn ürün ve varyant ilişkisi.' },
      {
        label: 'Ticari gerçeklik',
        description: 'Sayfa ile eşleşen fiyat, para birimi, stok ve satılabilirlik.',
      },
      {
        label: 'Karar içeriği',
        description: 'Başlık, nitelik, görsel, ölçü, malzeme ve uyumluluk.',
      },
      { label: 'Operasyon', description: 'Teslimat, iade, satıcı ve sipariş durumu bilgisi.' },
      {
        label: 'Ölçüm',
        description: 'Kaynak etiketi, sipariş kimliği, iptal ve iade geri beslemesi.',
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
      'Tam katalog güncellemesini seyrek ve hatasızmış gibi kabul etmek.',
      'AI trafiğini sipariş, iptal ve iade sonucuna bağlamamak.',
    ],
    checklist: [
      'SKU ve varyant kimliklerini kalıcı hale getirin.',
      'Zorunlu alan, fiyat ve stok eşleşme oranını günlük ölçün.',
      'Tam katalog ile gün içi artımlı güncelleme sorumluluğunu ayırın.',
      'Teslimat, iade ve satıcı bilgisini yapılandırılmış tutun.',
      'Ülke, merchant ve ödeme uygunluğunu resmî kaynaklardan doğrulayın.',
    ],
    tool: {
      title: 'Ürün Feed Sağlık Kontrolü',
      description:
        'CSV ürün verinizde kritik alan, kimlik, fiyat, stok, URL ve içerik sorunlarını tarayıcıda görün.',
      href: '/araclar/urun-feed-saglik-kontrolu',
      cta: 'Feed’i ücretsiz analiz et',
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
    ],
    sources: [openAiCommerce, openAiProductFeed, googleMerchantProductData, googleUcp, dhlTrends],
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
]
