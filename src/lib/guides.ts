import { researchGuides } from '@/lib/research-guides'

export type GuideSource = {
  name: string
  url: string
  note: string
}

export type Guide = {
  slug: string
  title: string
  excerpt: string
  category:
    | 'E-Ticaret Kârlılığı'
    | 'Reklam Analitiği'
    | 'Veri ve Raporlama'
    | 'AI & Otomasyon'
    | 'Pazaryeri & Operasyon'
  contentType: 'Temel rehber' | 'Uygulama rehberi'
  maturity: 'growing' | 'evergreen'
  audience: string
  intent: string
  readingTime: number
  publishedAt: string
  updatedAt: string
  reviewedAt: string
  reviewDueAt: string
  shortAnswer: string
  whyItMatters: string[]
  definition: string
  formula: string
  formulaNote: string
  inputs: { label: string; description: string }[]
  example: {
    title: string
    intro: string
    rows: { label: string; value: string; note: string }[]
    result: string
  }
  decisions: { signal: string; meaning: string; action: string }[]
  mistakes: string[]
  checklist: string[]
  tool?: { title: string; description: string; href: string; cta: string }
  relatedGuides: string[]
  faqs: { question: string; answer: string }[]
  sources: GuideSource[]
  disclaimer: string
}

const metaRoas: GuideSource = {
  name: 'Meta Business Help Center — Purchase ROAS',
  url: 'https://www.facebook.com/business/help/721503286071276',
  note: 'Purchase ROAS metriğinin dönüşüm değeri / reklam harcaması olarak hesaplandığını açıklar.',
}

const gaChannels: GuideSource = {
  name: 'Google Analytics Help — All channels performance report',
  url: 'https://support.google.com/analytics/answer/12198930?hl=en',
  note: 'Reklam maliyeti, gelir, dönüşüm ve ROAS metriklerinin kapsamını açıklar.',
}

const gaEcommerce: GuideSource = {
  name: 'Google Analytics Help — Ecommerce metrics',
  url: 'https://support.google.com/analytics/answer/13428834?hl=en',
  note: 'Satın alma ve ürün kapsamlı e-ticaret metriklerinin ayrımını açıklar.',
}

const shopifyMargin: GuideSource = {
  name: 'Shopify — Profit margin calculation',
  url: 'https://www.shopify.com/blog/what-is-profit-margin',
  note: 'Brüt, faaliyet ve net kâr marjı kapsamlarını ve temel hesaplama yaklaşımını açıklar.',
}

const shopifyContribution: GuideSource = {
  name: 'Shopify — Contribution margin vs. gross margin',
  url: 'https://www.shopify.com/blog/contribution-margin-vs-gross-margin',
  note: 'Katkı payının değişken giderler sonrası kalan tutar olarak kullanımını açıklar.',
}

const shopifyReturns: GuideSource = {
  name: 'Shopify — Ecommerce returns management',
  url: 'https://www.shopify.com/blog/ecommerce-returns-management',
  note: 'İadelerin taşıma, işlem ve marj üzerindeki etkilerini özetler.',
}

const foundationalGuides: Guide[] = [
  {
    slug: 'basabas-roas-nasil-hesaplanir',
    title: 'Başabaş ROAS Nasıl Hesaplanır?',
    excerpt:
      'Ürün maliyeti, komisyon, kargo ve iadeyi hesaba katarak reklamda zarar etmeye başladığınız ROAS seviyesini bulun.',
    category: 'E-Ticaret Kârlılığı',
    contentType: 'Temel rehber',
    maturity: 'evergreen',
    audience: 'E-ticaret marka sahipleri ve performans pazarlama ekipleri',
    intent: 'Hesaplama',
    readingTime: 9,
    publishedAt: '2026-08-01',
    updatedAt: '2026-08-01',
    reviewedAt: '2026-08-01',
    reviewDueAt: '2026-11-01',
    shortAnswer:
      'Başabaş ROAS, bir siparişten reklam öncesi kalan katkı payının reklam maliyetini tam karşıladığı seviyedir. Satış fiyatını reklam için kullanılabilecek azami tutara bölerek hesaplanır. Sonuç 2,80 ise her 1 TL reklam harcamasının en az 2,80 TL gelir üretmesi gerekir; bunun altında, girdiğiniz maliyet varsayımlarına göre sipariş zarar yazar.',
    whyItMatters: [
      'Platformdaki yüksek ROAS tek başına kârı kanıtlamaz; ürün ve operasyon maliyetleri reklam panelinde görünmez.',
      'Her ürünün maliyet yapısı farklı olduğu için tek bir hesap hedefini bütün kataloğa uygulamak yanıltıcı olabilir.',
      'İndirim, komisyon veya iade oranı değiştiğinde güvenli reklam eşiği de değişir.',
    ],
    definition:
      'ROAS, atfedilen reklam gelirini reklam harcamasına böler. Başabaş ROAS ise bu oranı şirket ortalamasından değil, ürünün reklam öncesi katkı payından türetir. Hesap sipariş bazında yapılır; sabit gider veya hedef kâr eklenecekse ayrıca pay ayrılır.',
    formula: 'Başabaş ROAS = Net satış geliri ÷ Reklam için kullanılabilir katkı payı',
    formulaNote:
      'Reklam için kullanılabilir katkı payı = net satış geliri − ürün maliyeti − komisyon − kargo − paketleme − ödeme gideri − beklenen iade maliyeti − diğer değişken giderler.',
    inputs: [
      {
        label: 'Net satış geliri',
        description:
          'İndirimler ve siparişe yansıtılan iadeler sonrası, hesapta esas alınan gelir.',
      },
      { label: 'Ürün maliyeti', description: 'Satılan ürünün edinme veya üretim maliyeti.' },
      {
        label: 'Sipariş değişken giderleri',
        description:
          'Komisyon, ödeme, kargo, paketleme ve siparişle birlikte artan diğer giderler.',
      },
      {
        label: 'Beklenen iade maliyeti',
        description: 'İade olasılığı ile iade başına geri kazanılamayan maliyetin çarpımı.',
      },
      {
        label: 'Hedef kâr payı',
        description: 'Başabaş yerine hedef ROAS aranıyorsa katkı payından ayrıca ayrılan tutar.',
      },
    ],
    example: {
      title: '1.000 TL satış fiyatlı ürün',
      intro:
        'KDV ve muhasebe kapsamı şirketinize göre ayrıca ele alınmak üzere, sipariş ekonomisini sade bir örnekle kuralım.',
      rows: [
        { label: 'Net satış geliri', value: '1.000 TL', note: 'Hesabın paydası' },
        { label: 'Ürün maliyeti', value: '420 TL', note: 'Gelirden düşülür' },
        { label: 'Komisyon + ödeme', value: '90 TL', note: 'Gelirden düşülür' },
        { label: 'Kargo + paketleme', value: '85 TL', note: 'Gelirden düşülür' },
        { label: 'Beklenen iade maliyeti', value: '45 TL', note: 'Olasılık ağırlıklı' },
        { label: 'Reklam için katkı payı', value: '360 TL', note: '1.000 − 640' },
      ],
      result:
        'Başabaş ROAS = 1.000 ÷ 360 = 2,78. Atıf ve veri gecikmesi nedeniyle operasyon hedefi bunun bir miktar üzerinde belirlenmelidir.',
    },
    decisions: [
      {
        signal: 'Gerçek ROAS eşikten düşük',
        meaning: 'Her sipariş değişken maliyetler sonrası zarar üretiyor olabilir.',
        action: 'Bütçeyi büyütmeden fiyatı, maliyeti ve kampanya yapısını kontrol edin.',
      },
      {
        signal: 'Gerçek ROAS eşiğe çok yakın',
        meaning: 'Katkı payı sabit gider ve hata payı için yetersizdir.',
        action: 'Hedef kâr ve atıf farkı için güvenlik payı ekleyin.',
      },
      {
        signal: 'Gerçek ROAS eşikten yüksek',
        meaning: 'Sipariş reklam sonrası pozitif katkı üretiyor.',
        action: 'Sonucu MER, yeni müşteri oranı ve toplam kârla birlikte doğrulayın.',
      },
    ],
    mistakes: [
      'Ciroyu KDV ve indirim kapsamı belirsiz şekilde kullanmak.',
      'İadeyi yalnızca gelir kaybı sayıp ters kargo ve işlem maliyetini dışarıda bırakmak.',
      'Platform ROAS ile şirketin gerçek tahsilat gelirini aynı kabul etmek.',
      'Tek ürün eşiğini bütün ürün karmasına uygulamak.',
      'Başabaş değeri hedef kâr değeri sanmak.',
    ],
    checklist: [
      'Hesap dönemini ve gelir kapsamını sabitleyin.',
      'Siparişle artan tüm giderleri aynı dönemden alın.',
      'İade oranını ürün veya kategori bazında kullanın.',
      'En az kötü, baz ve iyi senaryo hesaplayın.',
      'Hedefi haftalık gerçekleşen kârla yeniden doğrulayın.',
    ],
    tool: {
      title: 'Başabaş ROAS Hesaplayıcı',
      description:
        'Kendi fiyat, maliyet, komisyon, kargo ve iade varsayımlarınızla eşiği hesaplayın.',
      href: '/araclar/basabas-roas-hesaplayici',
      cta: 'Kendi değerini bul',
    },
    relatedGuides: [
      'roas-yuksekken-kar-neden-duser',
      'maksimum-cpa-nasil-hesaplanir',
      'iade-orani-karliliga-nasil-eklenir',
    ],
    faqs: [
      {
        question: 'İyi bir başabaş ROAS kaçtır?',
        answer:
          'Evrensel bir sayı yoktur. Marj daraldıkça başabaş ROAS yükselir; bu nedenle sektör ortalamasından değil kendi birim ekonominizden hesaplanmalıdır.',
      },
      {
        question: 'Başabaş ROAS sabit giderleri içerir mi?',
        answer:
          'Temel sipariş bazlı hesap değişken giderleri içerir. Sabit giderleri karşılamak veya hedef kâr üretmek için katkı payından ayrıca pay ayırıp hedef ROAS hesaplamak gerekir.',
      },
      {
        question: 'Meta ve Google ROAS neden farklı?',
        answer:
          'Atıf penceresi, dönüşüm modeli, zaman dilimi ve sayılan gelir kapsamı farklı olabilir. Aynı eşiği kıyaslamadan önce rapor kapsamlarını eşitleyin.',
      },
    ],
    sources: [metaRoas, gaChannels],
    disclaimer:
      'Bu hesap operasyonel karar desteğidir; vergi, muhasebe veya yatırım tavsiyesi değildir. KDV, iade ve maliyet muhasebesi kapsamını mali müşavirinizle doğrulayın.',
  },
  {
    slug: 'roas-yuksekken-kar-neden-duser',
    title: 'ROAS Yüksekken Kâr Neden Düşebilir?',
    excerpt:
      'Reklam paneli iyi görünürken kasada neden daha az para kaldığını ürün karması, maliyet ve atıf farklarıyla teşhis edin.',
    category: 'Reklam Analitiği',
    contentType: 'Temel rehber',
    maturity: 'evergreen',
    audience: 'Marka sahipleri, ajanslar ve büyüme ekipleri',
    intent: 'Teşhis',
    readingTime: 8,
    publishedAt: '2026-08-01',
    updatedAt: '2026-08-01',
    reviewedAt: '2026-08-01',
    reviewDueAt: '2026-11-01',
    shortAnswer:
      'ROAS yalnızca atfedilen gelir ile reklam harcamasını karşılaştırır. Ürün maliyeti, indirim, komisyon, kargo, iade ve sabit gider yükselirse ROAS aynı kalsa bile kâr düşebilir. Ayrıca platform atfı ile muhasebe geliri aynı şey değildir. Bu nedenle ROAS önce ürün katkı payı, sonra toplam MER ve gerçekleşen net kârla birlikte okunmalıdır.',
    whyItMatters: [
      'Bütçe artışı düşük marjlı ürünleri öne çıkarıp toplam kârı seyreltebilir.',
      'İndirim geliri korurken birim katkı payını hızla düşürebilir.',
      'Atfedilen gelir, aynı siparişin birden fazla platformda görünmesine veya sonradan iade edilmesine rağmen yüksek kalabilir.',
    ],
    definition:
      'Yüksek ROAS, reklam harcamasına göre yüksek atfedilen gelir demektir; yüksek kâr demek değildir. Kâr, bu gelirden satılan ürün ve operasyon maliyetlerinin tamamı çıkarıldıktan sonra kalan tutardır.',
    formula:
      'Sipariş katkısı = Net gelir − ürün maliyeti − değişken operasyon giderleri − reklam maliyeti',
    formulaNote:
      'Teşhis için platform ROAS, başabaş ROAS, blended MER ve muhasebeleşmiş katkı birlikte aynı tarih aralığında izlenmelidir.',
    inputs: [
      { label: 'Ürün karması', description: 'Reklamın hangi marj seviyesindeki ürünleri sattığı.' },
      {
        label: 'Gerçekleşen indirim',
        description: 'Kupon, kampanya ve ücretsiz kargo dahil net fiyat etkisi.',
      },
      {
        label: 'İade ve iptal',
        description: 'Platformda sonradan düzelmeyen veya gecikmeli görünen kayıplar.',
      },
      {
        label: 'Atıf kapsamı',
        description: 'Pencere, kanal, görüntüleme/tıklama ve model farkları.',
      },
      {
        label: 'Toplam pazarlama gideri',
        description: 'Ajans, kreatif, influencer ve araç maliyetleri dahil kapsam.',
      },
    ],
    example: {
      title: 'ROAS aynı, katkı farklı',
      intro: 'İki dönemde reklam paneli 4,0 ROAS gösteriyor.',
      rows: [
        { label: 'Dönem A geliri / reklam', value: '400.000 / 100.000 TL', note: 'ROAS 4,0' },
        { label: 'Dönem A diğer değişken gider', value: '240.000 TL', note: 'Katkı 60.000 TL' },
        { label: 'Dönem B geliri / reklam', value: '400.000 / 100.000 TL', note: 'ROAS yine 4,0' },
        { label: 'Dönem B diğer değişken gider', value: '285.000 TL', note: 'Katkı 15.000 TL' },
      ],
      result:
        'Aynı ROAS, ürün karması ve indirim nedeniyle 45.000 TL daha az katkı üretti. Sorun reklam oranında değil, gelir kalitesindedir.',
    },
    decisions: [
      {
        signal: 'ROAS sabit, MER düşüyor',
        meaning: 'Platform dışı maliyet veya kanal karması bozuluyor.',
        action: 'Toplam pazarlama giderini ve organik/ücretli gelir ayrımını kontrol edin.',
      },
      {
        signal: 'ROAS yüksek, katkı negatif',
        meaning: 'Başabaş eşiği kampanya hedefinden yüksek.',
        action: 'Ürün bazlı eşik ve teklif stratejisini yeniden kurun.',
      },
      {
        signal: 'Panel geliri, muhasebe gelirinden yüksek',
        meaning: 'Atıf, iptal veya iade farkı var.',
        action: 'Sipariş kimliği ve gerçekleşen tahsilatla mutabakat yapın.',
      },
    ],
    mistakes: [
      'ROAS artışını doğrudan kâr artışı diye sunmak.',
      'İade gecikmesini rapor dönemine taşımamak.',
      'Ürün bazlı marj yerine mağaza ortalamasını kullanmak.',
      'Ajans ve kreatif giderini pazarlama maliyetinden çıkarmak.',
      'Farklı atıf pencerelerini aynı tabloda karşılaştırmak.',
    ],
    checklist: [
      'ROAS ve başabaş ROAS aynı kapsamda mı?',
      'Net fiyat ve ürün karması değişti mi?',
      'İade/iptal kohortu tamamlandı mı?',
      'Toplam pazarlama gideri eksiksiz mi?',
      'Panel geliri sipariş sistemiyle mutabık mı?',
    ],
    tool: {
      title: 'Başabaş ROAS Hesaplayıcı',
      description: 'Görünen ROAS değerini kendi maliyet eşiğinizle kıyaslayın.',
      href: '/araclar/basabas-roas-hesaplayici',
      cta: 'Eşiği hesapla',
    },
    relatedGuides: [
      'basabas-roas-nasil-hesaplanir',
      'mer-nedir-nasil-hesaplanir',
      'iade-orani-karliliga-nasil-eklenir',
    ],
    faqs: [
      {
        question: 'ROAS yerine hangi metriğe bakmalıyım?',
        answer:
          'Tek bir ikame yoktur. Kampanya optimizasyonunda ROAS; şirket düzeyinde MER; ekonomik sonuçta katkı payı ve net kâr birlikte izlenmelidir.',
      },
      {
        question: 'ROAS yükselirken satış düşebilir mi?',
        answer:
          'Evet. Harcama daha hızlı kısılırsa verimli ama küçük bir hacim kalabilir. Oran iyileşirken toplam katkı azalabilir.',
      },
      {
        question: 'Atfedilen gelir gerçek gelir midir?',
        answer:
          'Atfedilen gelir platformun kendi modeline göre reklama yazdığı değerdir. Gerçekleşen gelir; iptal, iade, vergi ve tahsilat kapsamına göre farklılaşabilir.',
      },
    ],
    sources: [metaRoas, gaChannels],
    disclaimer:
      'Rapor kapsamı ve atıf modeli platforma göre değişir. Karar vermeden önce reklam panelini sipariş ve finans verisiyle mutabık hale getirin.',
  },
  {
    slug: 'e-ticaret-kar-marji-nasil-hesaplanir',
    title: 'E-Ticaret Kâr Marjı Nasıl Hesaplanır?',
    excerpt:
      'Brüt, katkı ve net kâr marjını birbirinden ayırın; ürünün satıştan gerçekten ne kadar bıraktığını görün.',
    category: 'E-Ticaret Kârlılığı',
    contentType: 'Temel rehber',
    maturity: 'evergreen',
    audience: 'E-ticaret yöneticileri ve finans ekipleri',
    intent: 'Hesaplama',
    readingTime: 9,
    publishedAt: '2026-08-01',
    updatedAt: '2026-08-01',
    reviewedAt: '2026-08-01',
    reviewDueAt: '2026-11-01',
    shortAnswer:
      'Kâr marjı, seçtiğiniz kâr tanımını net satış gelirine bölüp 100 ile çarparak bulunur. Brüt marj yalnızca satışın doğrudan maliyetini; katkı marjı siparişle artan değişken giderleri; net marj ise dönem içindeki tüm giderleri içerir. “Marjımız %30” demeden önce hangi katmanı ölçtüğünüzü açıkça yazın.',
    whyItMatters: [
      'Aynı ürün brüt marjda güçlü, reklam sonrası katkıda zayıf görünebilir.',
      'Fiyat ve indirim kararları oran kadar sipariş başına kalan TL ile birlikte değerlendirilmelidir.',
      'Kâr oranı ile satış fiyatı üzerinden hesaplanan kâr marjı aynı değildir.',
    ],
    definition:
      'Kâr marjı, gelirin ne kadarının seçilen maliyet katmanı sonrası kaldığını gösterir. Payda net satış geliridir. Maliyet üzerine eklenen yüzde ise “markup/kâr oranı”dır ve aynı sonuç değildir.',
    formula: 'Kâr marjı (%) = (Net satış geliri − kapsanan maliyetler) ÷ Net satış geliri × 100',
    formulaNote:
      'Brüt, katkı ve net marj için formülün yapısı aynıdır; yalnızca çıkarılan maliyetlerin kapsamı değişir.',
    inputs: [
      { label: 'Net satış', description: 'İndirim ve iade kapsamı tanımlanmış dönem geliri.' },
      { label: 'Satılan malın maliyeti', description: 'Ürün edinme veya üretim maliyeti.' },
      {
        label: 'Değişken giderler',
        description: 'Komisyon, ödeme, kargo, paketleme, reklam ve iade etkisi.',
      },
      {
        label: 'Sabit/faaliyet giderleri',
        description: 'Personel, kira, yazılım ve genel yönetim giderleri.',
      },
    ],
    example: {
      title: '800 TL net satışlı ürün',
      intro: 'Aynı satış için üç farklı marj katmanını hesaplayalım.',
      rows: [
        { label: 'Net satış', value: '800 TL', note: 'Payda' },
        { label: 'Ürün maliyeti', value: '360 TL', note: 'Brüt kâr 440 TL' },
        { label: 'Diğer değişken giderler', value: '200 TL', note: 'Katkı 240 TL' },
        { label: 'Dağıtılan sabit gider', value: '120 TL', note: 'Net kâr 120 TL' },
        {
          label: 'Brüt / katkı / net marj',
          value: '%55 / %30 / %15',
          note: 'Kapsam değiştikçe oran değişir',
        },
      ],
      result:
        'Ürün “%55 marjlı” diye tanımlanabilir; fakat siparişin işletmeye bıraktığı net marj bu örnekte yalnızca %15’tir.',
    },
    decisions: [
      {
        signal: 'Brüt marj iyi, katkı düşük',
        meaning: 'Sipariş operasyonu veya reklam maliyeti ağır.',
        action: 'Komisyon, kargo, iade ve edinme maliyetini ürün bazında ayırın.',
      },
      {
        signal: 'Katkı iyi, net marj düşük',
        meaning: 'Sabit gider tabanı veya kapasite kullanımı sorunlu.',
        action: 'Hacim, genel gider ve kanal verimliliğini inceleyin.',
      },
      {
        signal: 'TL katkı artıyor, oran düşüyor',
        meaning: 'İndirim daha fazla hacim getiriyor olabilir.',
        action: 'Toplam katkı ile kapasite ve nakit etkisini birlikte değerlendirin.',
      },
    ],
    mistakes: [
      'Kârı maliyete bölüp sonucu marj diye adlandırmak.',
      'KDV, iade ve indirim kapsamını belirtmemek.',
      'Ürün maliyeti güncellenmeden eski marjla karar vermek.',
      'Kargo ve komisyonu sabit sanmak.',
      'Net marj ile sipariş katkısını karıştırmak.',
    ],
    checklist: [
      'Marj katmanını adlandırın.',
      'Net satış kapsamını sabitleyin.',
      'Maliyetleri aynı dönemden alın.',
      'TL ve yüzde sonucu birlikte gösterin.',
      'En çok satan ürünleri ayrıca kontrol edin.',
    ],
    tool: {
      title: 'Kâr Marjı Hesaplayıcı',
      description: 'Satış fiyatı ve maliyetlerinizi girerek ürün başına katkı ve marjı görün.',
      href: '/araclar/kar-marji-hesaplayici',
      cta: 'Marjını hesapla',
    },
    relatedGuides: [
      'katki-payi-nedir',
      'indirim-karliligi-nasil-hesaplanir',
      'basabas-roas-nasil-hesaplanir',
    ],
    faqs: [
      {
        question: 'Kâr marjı ile kâr oranı aynı mı?',
        answer:
          'Hayır. Marj kârı satış fiyatına, markup ise kârı maliyete böler. 100 TL maliyetli ürün 150 TL’ye satılırsa markup %50, brüt marj %33,3’tür.',
      },
      {
        question: 'Kargo kâr marjına dahil mi?',
        answer:
          'Katkı veya net marj hesaplanıyorsa işletmenin üstlendiği net kargo maliyeti dahil edilmelidir.',
      },
      {
        question: 'İade edilen ürün nasıl ele alınır?',
        answer:
          'Dönem hesabında net satış ve gerçekleşen iade gideriyle; ürün kararında ise beklenen iade olasılığı ve geri kazanılamayan maliyetle ele alınabilir.',
      },
    ],
    sources: [shopifyMargin, shopifyContribution],
    disclaimer:
      'Muhasebe sınıflandırmaları şirketinize göre değişebilir. Finansal raporlama kapsamını mali müşavirinizle doğrulayın.',
  },
  {
    slug: 'katki-payi-nedir',
    title: 'Katkı Payı Nedir ve Nasıl Kullanılır?',
    excerpt:
      'Her satışın sabit giderleri ve kârı karşılamak için ne kadar kaynak bıraktığını ürün ve kanal bazında hesaplayın.',
    category: 'E-Ticaret Kârlılığı',
    contentType: 'Temel rehber',
    maturity: 'evergreen',
    audience: 'Marka sahipleri, ürün ve finans ekipleri',
    intent: 'Bilgi',
    readingTime: 7,
    publishedAt: '2026-08-01',
    updatedAt: '2026-08-01',
    reviewedAt: '2026-08-01',
    reviewDueAt: '2026-11-01',
    shortAnswer:
      'Katkı payı, net satıştan sipariş veya satış hacmiyle birlikte değişen giderler çıkarıldıktan sonra kalan tutardır. Bu tutar önce sabit giderleri, ardından kârı karşılar. Ürün bazında pozitif katkı görmek şirketin mutlaka net kâr ettiği anlamına gelmez; fakat negatif katkı, her ek satışın zararı büyütebileceğini gösterir.',
    whyItMatters: [
      'Reklama ayrılabilecek azami tutarın temelini oluşturur.',
      'Ürün, kanal ve kampanya kararlarını aynı ekonomik dilde karşılaştırır.',
      'Ciro büyümesinin sabit giderleri karşılayıp karşılamadığını gösterir.',
    ],
    definition:
      'Katkı payı, gelirden tüm değişken giderler çıkarıldıktan sonra kalan TL tutarıdır. Katkı payı oranı aynı tutarın net satışa oranıdır. Brüt kâr çoğunlukla ürünün doğrudan maliyetine odaklanırken katkı, komisyon ve kargo gibi hacimle değişen giderleri de kapsar.',
    formula: 'Katkı payı = Net satış − Toplam değişken giderler',
    formulaNote:
      'Katkı payı oranı (%) = Katkı payı ÷ Net satış × 100. Değişken gider kapsamı karar öncesinde yazılı olarak tanımlanmalıdır.',
    inputs: [
      { label: 'Net satış', description: 'İndirim ve iadeler sonrası esas alınan gelir.' },
      { label: 'Ürün maliyeti', description: 'Satılan birime ait maliyet.' },
      { label: 'Kanal giderleri', description: 'Komisyon, ödeme ve pazaryeri hizmet bedelleri.' },
      { label: 'Fulfillment', description: 'Kargo, paketleme ve sipariş işleme.' },
      {
        label: 'Edinme gideri',
        description: 'Karar kapsamına göre siparişe atanan reklam maliyeti.',
      },
    ],
    example: {
      title: 'Sipariş katkısı',
      intro: '1.200 TL net satışlı siparişin değişken giderlerini ayıralım.',
      rows: [
        { label: 'Net satış', value: '1.200 TL', note: 'Gelir' },
        { label: 'Ürün maliyeti', value: '510 TL', note: 'Değişken' },
        { label: 'Komisyon + ödeme', value: '135 TL', note: 'Değişken' },
        { label: 'Kargo + paketleme', value: '95 TL', note: 'Değişken' },
        { label: 'Reklam', value: '260 TL', note: 'Değişken' },
        { label: 'Katkı payı', value: '200 TL', note: '%16,7' },
      ],
      result:
        'Bu sipariş sabit gider ve kâr için 200 TL bırakır. Aylık sabit gider 200.000 TL ise aynı karmada başabaş için yaklaşık 1.000 sipariş gerekir.',
    },
    decisions: [
      {
        signal: 'Katkı negatif',
        meaning: 'Her ek satış zararı büyütebilir.',
        action: 'Fiyat, ürün maliyeti, kanal veya reklam koşulunu düzeltmeden ölçeklemeyin.',
      },
      {
        signal: 'Katkı pozitif ama düşük',
        meaning: 'Hata payı ve sabit gider karşılama gücü zayıf.',
        action: 'Karma, minimum sepet ve operasyon maliyetini iyileştirin.',
      },
      {
        signal: 'Katkı güçlü, net kâr zayıf',
        meaning: 'Sabit gider veya kapasite sorunu vardır.',
        action: 'Dönem bazlı başabaş hacmi ve genel giderleri inceleyin.',
      },
    ],
    mistakes: [
      'Sabit ve değişken gider ayrımını yazmamak.',
      'Katkı payını net kâr diye sunmak.',
      'İade olasılığını yok saymak.',
      'Oran yüksek diye toplam katkıyı kontrol etmemek.',
      'Kanal giderlerini mağaza ortalamasına dağıtmak.',
    ],
    checklist: [
      'Karar birimini seçin: ürün, sipariş, kanal.',
      'Net gelir kapsamını belirleyin.',
      'Tüm değişken giderleri listeleyin.',
      'TL katkı ve oranı birlikte hesaplayın.',
      'Sabit gider başabaş hacmini ayrıca bulun.',
    ],
    tool: {
      title: 'Kâr Marjı Hesaplayıcı',
      description: 'Ürün başına değişken giderleri girip katkı payını görün.',
      href: '/araclar/kar-marji-hesaplayici',
      cta: 'Katkıyı hesapla',
    },
    relatedGuides: [
      'e-ticaret-kar-marji-nasil-hesaplanir',
      'maksimum-cpa-nasil-hesaplanir',
      'indirim-karliligi-nasil-hesaplanir',
    ],
    faqs: [
      {
        question: 'Katkı payı ile brüt kâr aynı mı?',
        answer:
          'Her zaman değil. Katkı payı karar kapsamında tanımlanan tüm değişken giderleri; brüt kâr ise çoğunlukla satılan malın doğrudan maliyetini çıkarır.',
      },
      {
        question: 'Reklam gideri katkı payına dahil mi?',
        answer:
          'Reklam sonrası sipariş katkısı ölçülüyorsa evet. Reklam öncesi katkı, maksimum edinme maliyetini bulmak için reklamı henüz çıkarmaz.',
      },
      {
        question: 'Pozitif katkı yeterli mi?',
        answer:
          'Hayır. Toplam katkının sabit giderleri karşılaması gerekir; kalan tutar net kâra dönüşür.',
      },
    ],
    sources: [shopifyContribution, shopifyMargin],
    disclaimer:
      'Gider sınıflandırması faaliyet modeline göre değişir. Aynı metriği dönemler arasında karşılaştırırken kapsamı sabit tutun.',
  },
  {
    slug: 'mer-nedir-nasil-hesaplanir',
    title: 'MER Nedir, Nasıl Hesaplanır?',
    excerpt:
      'Toplam gelirin toplam pazarlama harcamasına oranını hesaplayın; platform ROAS ile şirket düzeyi verimliliği ayırın.',
    category: 'Reklam Analitiği',
    contentType: 'Temel rehber',
    maturity: 'evergreen',
    audience: 'Büyüme liderleri, marka sahipleri ve ajanslar',
    intent: 'Bilgi ve hesaplama',
    readingTime: 8,
    publishedAt: '2026-08-01',
    updatedAt: '2026-08-01',
    reviewedAt: '2026-08-01',
    reviewDueAt: '2026-11-01',
    shortAnswer:
      'MER (Marketing Efficiency Ratio), belirli bir dönemdeki toplam geliri toplam pazarlama harcamasına böler. 5,0 MER, her 1 TL pazarlama harcamasına karşılık 5 TL gelir üretildiğini gösterir. ROAS kampanya veya platform atfına; MER ise şirketin tüm gelir ve pazarlama harcaması kapsamına bakar. Kârlılığı tek başına göstermez.',
    whyItMatters: [
      'Kanallar arası çifte atıf etkisini azaltan şirket düzeyi bir görünüm sağlar.',
      'Ajans, kreatif ve araç giderlerinin kapsama eklenmesine izin verir.',
      'Bütçe artarken toplam verimliliğin nasıl değiştiğini izler.',
    ],
    definition:
      'MER, yaygın bir yönetim metriğidir; platformların standart ve evrensel tanımlı bir alanı değildir. Bu nedenle pay ve payda kapsamı şirket tarafından belgelenmelidir. Gelir net veya brüt, pazarlama gideri medya veya tam yüklü seçilebilir; dönemler arasında aynı tanım korunmalıdır.',
    formula: 'MER = Dönem toplam geliri ÷ Dönem toplam pazarlama harcaması',
    formulaNote:
      'Kârlılık eşiği için MER hedefi, toplam katkı marjı ve sabit gider yapısıyla birlikte belirlenmelidir.',
    inputs: [
      {
        label: 'Gelir kapsamı',
        description: 'Sipariş, net satış, iade ve vergi kapsamı açıkça tanımlanmış dönem geliri.',
      },
      {
        label: 'Medya harcaması',
        description: 'Tüm ücretli kanalların gerçekleşen reklam harcaması.',
      },
      {
        label: 'Tam yüklü giderler',
        description: 'Karara göre ajans, kreatif, influencer ve pazarlama araçları.',
      },
      { label: 'Dönem', description: 'Gelir ve giderin aynı zaman dilimi ve zaman dilimi ayarı.' },
    ],
    example: {
      title: 'Aylık blended görünüm',
      intro: 'Platform raporlarını toplam şirket görünümüne taşıyalım.',
      rows: [
        { label: 'Net gelir', value: '3.000.000 TL', note: 'İade kapsamı tanımlı' },
        { label: 'Meta Ads', value: '300.000 TL', note: 'Medya' },
        { label: 'Google Ads', value: '180.000 TL', note: 'Medya' },
        { label: 'Ajans + kreatif + araç', value: '120.000 TL', note: 'Tam yüklü' },
        { label: 'Toplam pazarlama', value: '600.000 TL', note: 'Payda' },
      ],
      result:
        'Tam yüklü MER = 3.000.000 ÷ 600.000 = 5,0. Yalnız medya ile hesaplanan oran 6,25 olur; kapsam yazılmazsa iki ekip farklı sonuç sunabilir.',
    },
    decisions: [
      {
        signal: 'Harcama artıyor, MER yatay',
        meaning: 'Ek bütçe benzer verimle gelir üretiyor.',
        action: 'Katkı marjı ve nakit kapasitesi uygunsa kontrollü ölçekleyin.',
      },
      {
        signal: 'Harcama artıyor, MER düşüyor',
        meaning: 'Azalan marjinal verim veya gecikmeli gelir olabilir.',
        action: 'Yeni müşteri, kanal ve kohort etkisini ayırın.',
      },
      {
        signal: 'Platform ROAS iyi, MER zayıf',
        meaning: 'Çifte atıf, organik ikame veya kapsam dışı gider olabilir.',
        action: 'Toplam gider ve sipariş kaynağı mutabakatı yapın.',
      },
    ],
    mistakes: [
      'Sadece medya harcamasını kullanıp metriği tam yüklü diye sunmak.',
      'Brüt gelir ile net geliri dönemler arasında değiştirmek.',
      'Gecikmeli iade ve tahsilatı yok saymak.',
      'MER’i kâr marjı sanmak.',
      'Sezonsallığı günlük değişimle yorumlamak.',
    ],
    checklist: [
      'Pay ve payda tanımını belgeleyin.',
      'Bütün kanalları aynı para birimine getirin.',
      'Gelir ve gider dönemini eşitleyin.',
      'Medya MER ve tam yüklü MER’i ayırın.',
      'Katkı ve yeni müşteri payıyla birlikte izleyin.',
    ],
    relatedGuides: [
      'roas-yuksekken-kar-neden-duser',
      'e-ticaret-dashboard-metrikleri',
      'haftalik-reklam-raporu-nasil-hazirlanir',
    ],
    faqs: [
      {
        question: 'İyi MER kaçtır?',
        answer:
          'Evrensel bir hedef yoktur. Sağlıklı eşik, şirketin katkı marjına, sabit giderine ve büyüme hedeflerine göre hesaplanır.',
      },
      {
        question: 'MER ile blended ROAS aynı mı?',
        answer:
          'Pratikte benzer kullanımlar vardır; fakat isimden çok pay/payda kapsamı önemlidir. Şirketinizin tanımını veri sözlüğünde yazın.',
      },
      {
        question: 'Organik gelir MER’e dahil mi?',
        answer:
          'Şirket düzeyi MER’de genellikle toplam gelir dahil edilir. Kanal katkısını ölçmek için ek olarak incrementality veya kohort analizi gerekir.',
      },
    ],
    sources: [gaChannels, metaRoas],
    disclaimer:
      'MER standart bir muhasebe metriği değildir. Kapsamı veri sözlüğünde açıkça tanımlayın ve dönemler arasında değiştirmeyin.',
  },
  {
    slug: 'maksimum-cpa-nasil-hesaplanir',
    title: 'Maksimum CPA Nasıl Hesaplanır?',
    excerpt:
      'Bir müşteri veya sipariş için kârlılığı bozmadan ödeyebileceğiniz en yüksek edinme maliyetini bulun.',
    category: 'Reklam Analitiği',
    contentType: 'Temel rehber',
    maturity: 'evergreen',
    audience: 'Performans pazarlama ve finans ekipleri',
    intent: 'Hesaplama',
    readingTime: 8,
    publishedAt: '2026-08-01',
    updatedAt: '2026-08-01',
    reviewedAt: '2026-08-01',
    reviewDueAt: '2026-11-01',
    shortAnswer:
      'Başabaş maksimum CPA, siparişin reklam öncesi katkı payına eşittir. Hedef kâr isteniyorsa bu katkıdan hedef kâr tutarı çıkarılır. Örneğin sipariş reklam öncesi 320 TL bırakıyor ve 80 TL hedef katkı korunmak isteniyorsa hedef CPA en fazla 240 TL’dir. Müşteri CPA’sı ile sipariş CPA’sını karıştırmayın.',
    whyItMatters: [
      'Teklif ve bütçe kararını ürün ekonomisine bağlar.',
      'ROAS hedefini daha anlaşılır TL sınırına çevirir.',
      'Yeni müşteri ediniminde LTV kullanılıyorsa geri ödeme süresini görünür kılar.',
    ],
    definition:
      'CPA, seçilen aksiyon başına maliyettir. E-ticarette aksiyon çoğunlukla sipariş veya yeni müşteridir. Maksimum CPA, bu aksiyon için ekonomik olarak taşınabilecek üst sınırdır; atıf panelindeki mevcut CPA’dan bağımsız şekilde maliyet yapısından türetilir.',
    formula: 'Hedef maksimum CPA = Reklam öncesi katkı payı − Korunacak hedef kâr',
    formulaNote:
      'Yeni müşteri LTV’si kullanılacaksa tekrar satış varsayımı, brüt değil katkı bazında ve belirli geri ödeme süresiyle sınırlandırılmalıdır.',
    inputs: [
      { label: 'Sipariş geliri', description: 'İndirim ve beklenen iade sonrası net gelir.' },
      {
        label: 'Reklam öncesi değişken giderler',
        description: 'Ürün, komisyon, ödeme, kargo ve operasyon giderleri.',
      },
      { label: 'Hedef kâr', description: 'Sipariş veya müşteri başına korunacak tutar.' },
      { label: 'Dönüşüm tanımı', description: 'Sipariş, müşteri ya da yeni müşteri ayrımı.' },
    ],
    example: {
      title: 'Hedef CPA hesabı',
      intro: 'Sipariş başına maliyet sınırını katkıdan türetelim.',
      rows: [
        { label: 'Net sipariş geliri', value: '900 TL', note: 'Gelir' },
        { label: 'Reklam öncesi giderler', value: '580 TL', note: 'Ürün + operasyon' },
        { label: 'Reklam öncesi katkı', value: '320 TL', note: 'Başabaş CPA' },
        { label: 'Hedef kâr', value: '80 TL', note: 'Korunacak tutar' },
        { label: 'Hedef maksimum CPA', value: '240 TL', note: '320 − 80' },
      ],
      result:
        'Gerçekleşen sipariş CPA’sı 240 TL’nin altında kaldığında varsayımlarınız altında hedef katkı korunur. Yeni müşteri CPA’sı ayrıca hesaplanmalıdır.',
    },
    decisions: [
      {
        signal: 'CPA hedefin altında',
        meaning: 'Sipariş hedef katkıyı koruyor.',
        action: 'Hacim, kalite ve iade etkisini izleyerek bütçeyi değerlendirin.',
      },
      {
        signal: 'CPA başabaş ile hedef arasında',
        meaning: 'Sipariş pozitif ama hedefin altında katkı üretiyor.',
        action: 'Teklif, sepet ve dönüşüm oranını iyileştirin.',
      },
      {
        signal: 'CPA başabaşın üstünde',
        meaning: 'İlk sipariş zarar yazıyor.',
        action:
          'LTV ile gerekçelendiriliyorsa geri ödeme süresi ve retention kanıtını kontrol edin.',
      },
    ],
    mistakes: [
      'Sipariş CPA ve yeni müşteri CPA’yı karıştırmak.',
      'Gelir yerine ciroyu iade etkisiz kullanmak.',
      'LTV’yi brüt gelir olarak eklemek.',
      'Hedef kârı sıfır kabul etmek.',
      'Platform dönüşüm sayısını sipariş sistemiyle doğrulamamak.',
    ],
    checklist: [
      'Dönüşüm birimini adlandırın.',
      'Reklam öncesi katkıyı hesaplayın.',
      'Hedef kâr tutarını belirleyin.',
      'Atfedilen dönüşümleri mutabık hale getirin.',
      'Yeni müşteri için geri ödeme sınırı koyun.',
    ],
    tool: {
      title: 'Başabaş ROAS Hesaplayıcı',
      description: 'Araç, aynı maliyet yapısından başabaş CPA ve ROAS sonuçlarını birlikte üretir.',
      href: '/araclar/basabas-roas-hesaplayici',
      cta: 'CPA sınırını gör',
    },
    relatedGuides: [
      'basabas-roas-nasil-hesaplanir',
      'katki-payi-nedir',
      'roas-yuksekken-kar-neden-duser',
    ],
    faqs: [
      {
        question: 'CPA ile CAC aynı mı?',
        answer:
          'CPA tanımlanan aksiyonun maliyetidir; CAC yeni müşteri edinme maliyetidir. Her sipariş yeni müşteriden gelmiyorsa iki metrik farklıdır.',
      },
      {
        question: 'LTV maksimum CPA’ya eklenir mi?',
        answer:
          'Yalnız tekrar satış katkısı doğrulanmışsa ve geri ödeme süresi kabul edilebilirse. Gelecek brüt ciroyu doğrudan bugünkü CPA limitine eklemek risklidir.',
      },
      {
        question: 'Maksimum CPA ne sıklıkla güncellenmeli?',
        answer:
          'Fiyat, ürün maliyeti, komisyon, kargo, indirim veya iade oranı anlamlı değiştiğinde yeniden hesaplanmalıdır.',
      },
    ],
    sources: [gaChannels, shopifyContribution],
    disclaimer:
      'Maksimum CPA bir model sonucudur; veri gecikmesi, atıf ve tekrar satış varsayımları ayrıca stres testine tabi tutulmalıdır.',
  },
  {
    slug: 'iade-orani-karliliga-nasil-eklenir',
    title: 'İade Oranı Kârlılığa Nasıl Eklenir?',
    excerpt:
      'İade olasılığını gelir kaybı, ters kargo, işlem ve geri kazanım değerleriyle birlikte sipariş ekonomisine ekleyin.',
    category: 'E-Ticaret Kârlılığı',
    contentType: 'Temel rehber',
    maturity: 'growing',
    audience: 'E-ticaret operasyon ve finans ekipleri',
    intent: 'Hesaplama',
    readingTime: 9,
    publishedAt: '2026-08-01',
    updatedAt: '2026-08-01',
    reviewedAt: '2026-08-01',
    reviewDueAt: '2026-10-01',
    shortAnswer:
      'İade etkisini yalnız “iade oranı × satış fiyatı” olarak çıkarmak yeterli değildir. İade edilen siparişte geri kazanılan ürün değerini, kaybedilen kargo/komisyonu, ters lojistiği, işlem maliyetini ve yeniden satılamama riskini ayırın. Beklenen iade maliyeti, iade olasılığı ile iade başına net kaybın çarpımıdır.',
    whyItMatters: [
      'İade oranı yüksek kategorilerde görünen marjı ciddi biçimde değiştirebilir.',
      'Ürün, beden, kanal ve kampanya bazında iade davranışı farklıdır.',
      'İade gecikmesi aynı ayın reklam ve gelir raporunu olduğundan iyi gösterebilir.',
    ],
    definition:
      'Beklenen iade maliyeti, gelecekte oluşması muhtemel iade kaybını sipariş bazında olasılık ağırlıklı hale getirir. Bu yöntem planlama için kullanılır; dönem finansal raporunda gerçekleşen iadeler ayrıca işlenir.',
    formula: 'Beklenen iade maliyeti = İade olasılığı × İade başına geri kazanılamayan net maliyet',
    formulaNote:
      'Net maliyet; kaybedilen marj, ters kargo, işlem ve hasar maliyetlerinden geri kazanılan ürün ve ücretleri çıkarır.',
    inputs: [
      {
        label: 'İade oranı',
        description: 'Tamamlanmış kohorttan ürün/kategori/kanal bazında oran.',
      },
      {
        label: 'Geri kazanılan ürün değeri',
        description: 'Yeniden satılabilen stokun maliyet karşılığı.',
      },
      { label: 'Ters lojistik', description: 'İade kargosu ve depo kabul maliyeti.' },
      {
        label: 'Geri dönmeyen ücretler',
        description: 'Komisyon, ödeme veya hizmet bedelinin iade edilmeyen kısmı.',
      },
      {
        label: 'Değer kaybı',
        description: 'Hasar, paket açılması veya ikinci kalite satış farkı.',
      },
    ],
    example: {
      title: 'Olasılık ağırlıklı iade maliyeti',
      intro: 'Bir siparişin iade başına net kaybını ve beklenen etkisini hesaplayalım.',
      rows: [
        { label: 'İade oranı', value: '%12', note: 'Tamamlanmış kohort' },
        { label: 'Ters kargo + işlem', value: '140 TL', note: 'İade başına' },
        { label: 'Geri dönmeyen ücret', value: '60 TL', note: 'İade başına' },
        { label: 'Ürün değer kaybı', value: '100 TL', note: 'İade başına' },
        { label: 'İade başına net kayıp', value: '300 TL', note: 'Toplam' },
        { label: 'Beklenen sipariş etkisi', value: '36 TL', note: '300 × %12' },
      ],
      result:
        'Her siparişin katkı hesabına 36 TL beklenen iade maliyeti eklenir. Kampanya kohortu olgunlaştıkça oran gerçekleşen veriyle güncellenir.',
    },
    decisions: [
      {
        signal: 'İade oranı ürün bazında sıçrıyor',
        meaning: 'Ürün bilgisi, kalite veya beden sorunu olabilir.',
        action: 'Neden kodlarını ve ürün sayfasını inceleyin.',
      },
      {
        signal: 'Oran sabit, iade maliyeti artıyor',
        meaning: 'Lojistik veya geri kazanım ekonomisi bozuluyor.',
        action: 'Ters kargo, yeniden paketleme ve yeniden satış oranını iyileştirin.',
      },
      {
        signal: 'Reklam kohortunda iade yüksek',
        meaning: 'Hedefleme veya vaat uyumsuz olabilir.',
        action: 'Kreatif vaadi ve müşteri kalitesini kampanya bazında kontrol edin.',
      },
    ],
    mistakes: [
      'Açık kohortun iade oranını erken kesinleştirmek.',
      'İade edilen ürünün tamamını sıfır değer saymak.',
      'Ters kargo ve işçilik maliyetini dışarıda bırakmak.',
      'İptal ile iadeyi aynı operasyon nedeni olarak toplamak.',
      'Kategori ortalamasını bütün ürünlere uygulamak.',
    ],
    checklist: [
      'İade kohortunun tamamlanma süresini belirleyin.',
      'Neden kodlarını standartlaştırın.',
      'Geri kazanılan stok değerini ölçün.',
      'Ürün ve kanal bazında beklenen maliyeti hesaplayın.',
      'Başabaş ROAS ve marjı yeni oranla güncelleyin.',
    ],
    tool: {
      title: 'Başabaş ROAS Hesaplayıcı',
      description: 'İade varsayımının güvenli ROAS eşiğini nasıl değiştirdiğini görün.',
      href: '/araclar/basabas-roas-hesaplayici',
      cta: 'İade etkisini hesapla',
    },
    relatedGuides: [
      'basabas-roas-nasil-hesaplanir',
      'e-ticaret-kar-marji-nasil-hesaplanir',
      'roas-yuksekken-kar-neden-duser',
    ],
    faqs: [
      {
        question: 'İptal ve iade aynı mı?',
        answer:
          'Hayır. İptal çoğu zaman sevkiyat öncesi oluşur; iade ters lojistik ve ürün değer kaybı yaratabilir. Ayrı neden ve maliyet olarak izleyin.',
      },
      {
        question: 'Hangi iade oranını kullanmalıyım?',
        answer:
          'Benzer ürün, kanal ve müşteri kohortunun tamamlanmış dönem oranını kullanın; mağaza ortalaması yalnız başlangıç varsayımıdır.',
      },
      {
        question: 'İade geliri ROAS’tan düşer mi?',
        answer:
          'Platform ve entegrasyon yapısına göre gecikmeli veya eksik düşebilir. Reklam raporunu gerçekleşen sipariş/iade verisiyle mutabık hale getirin.',
      },
    ],
    sources: [shopifyReturns, gaEcommerce],
    disclaimer:
      'İade politikası, tüketici mevzuatı ve muhasebe kaydı ülke ve iş modeline göre değişebilir. Buradaki yöntem operasyonel tahmin içindir.',
  },
  {
    slug: 'indirim-karliligi-nasil-hesaplanir',
    title: 'İndirim Kârlılığı Nasıl Hesaplanır?',
    excerpt:
      'İndirim sonrası birim katkıyı, gerekli ek satış hacmini ve kampanyanın başabaş noktasını birlikte hesaplayın.',
    category: 'E-Ticaret Kârlılığı',
    contentType: 'Temel rehber',
    maturity: 'evergreen',
    audience: 'E-ticaret ve kampanya ekipleri',
    intent: 'Hesaplama',
    readingTime: 9,
    publishedAt: '2026-08-01',
    updatedAt: '2026-08-01',
    reviewedAt: '2026-08-01',
    reviewDueAt: '2026-11-01',
    shortAnswer:
      'İndirim kârlılığı, yalnız yeni fiyat ile maliyet arasındaki fark değildir. Önce indirimli net satıştan değişken giderleri çıkarıp yeni birim katkıyı bulun. Ardından eski toplam katkıyı korumak için gereken satış adedini eski birim katkı ÷ yeni birim katkı ile hesaplayın. Katkı yarıya düşerse aynı toplam katkı için yaklaşık iki kat sipariş gerekir.',
    whyItMatters: [
      'Ciro artışı toplam katkı düşüşünü gizleyebilir.',
      'Yüzdesel komisyon azalırken sabit kargo aynı kaldığı için marj daha hızlı daralabilir.',
      'İndirim, reklam hedefini ve ücretsiz kargo eşiğini birlikte değiştirebilir.',
    ],
    definition:
      'İndirim kârlılığı, kampanyanın birim katkı, toplam katkı ve gerekli ek hacim üzerindeki etkisidir. Kampanya yalnız satış adediyle değil, iade ve yeni müşteri kalitesi dahil gerçekleşen katkıyla değerlendirilmelidir.',
    formula: 'Gerekli hacim çarpanı = Eski birim katkı ÷ Yeni birim katkı',
    formulaNote:
      'Yeni birim katkı sıfır veya negatifse hacim artışı eski katkıyı geri getiremez; her ek satış zararı büyütebilir.',
    inputs: [
      {
        label: 'Liste ve indirimli fiyat',
        description: 'Kupon ve kampanya sonrası gerçek net satış.',
      },
      {
        label: 'Sabit birim maliyetler',
        description: 'Ürün, kargo ve paketleme gibi tutar bazlı giderler.',
      },
      {
        label: 'Oransal giderler',
        description: 'Komisyon ve ödeme kesintisi gibi satışa bağlı giderler.',
      },
      { label: 'Baz sipariş hacmi', description: 'Kampanyasız karşılaştırma dönemi adedi.' },
      { label: 'İade etkisi', description: 'Kampanyalı kohortun beklenen iade maliyeti.' },
    ],
    example: {
      title: '%20 indirim senaryosu',
      intro: '1.000 TL ürünün katkısı kampanyada nasıl değişiyor?',
      rows: [
        { label: 'Normal fiyat / katkı', value: '1.000 / 350 TL', note: 'Baz durum' },
        { label: 'İndirimli fiyat', value: '800 TL', note: '%20 indirim' },
        { label: 'İndirimli katkı', value: '166 TL', note: 'Oransal gider güncellendi' },
        { label: 'Baz sipariş', value: '100 adet', note: '35.000 TL toplam katkı' },
        { label: 'Gerekli hacim', value: '211 adet', note: '350 ÷ 166 = 2,11×' },
      ],
      result:
        'Kampanya eski toplam katkıyı korumak için yaklaşık %111 daha fazla sipariş gerektirir. Reklam, iade ve kapasite etkisi eklenirse eşik daha da yükselebilir.',
    },
    decisions: [
      {
        signal: 'Yeni katkı negatif',
        meaning: 'Her kampanya satışı zarar üretir.',
        action: 'İndirimi, paket yapısını veya maliyet paylaşımını değiştirin.',
      },
      {
        signal: 'Hacim eşiği gerçekçi değil',
        meaning: 'Kampanya eski toplam katkıyı koruyamaz.',
        action: 'Daha dar segment, bundle veya sepet koşulu deneyin.',
      },
      {
        signal: 'Toplam katkı artıyor',
        meaning: 'Ek hacim birim marj kaybını telafi ediyor.',
        action: 'İade, stok ve yeni müşteri kalitesiyle sonucu doğrulayın.',
      },
    ],
    mistakes: [
      'İndirimi ciro üzerinden değerlendirmek.',
      'Komisyonu eski fiyatla hesaplamak.',
      'Kargo ve paketlemeyi yüzdesel sanmak.',
      'Reklam maliyetindeki artışı dışarıda bırakmak.',
      'Baz satışların kampanya olmadan da geleceğini unutmak.',
    ],
    checklist: [
      'Normal birim katkıyı sabitleyin.',
      'İndirimli net fiyatı hesaplayın.',
      'Yeni katkı ve hacim çarpanını bulun.',
      'Stok ve operasyon kapasitesini kontrol edin.',
      'Kampanya sonrası gerçekleşen kohortu ölçün.',
    ],
    tool: {
      title: 'İndirim Kârlılık Simülatörü',
      description: 'İndirim oranlarını yan yana koyup birim katkı ve gerekli hacmi karşılaştırın.',
      href: '/araclar/indirim-karlilik-simulatoru',
      cta: 'İndirim senaryosu oluştur',
    },
    relatedGuides: [
      'e-ticaret-kar-marji-nasil-hesaplanir',
      'katki-payi-nedir',
      'basabas-roas-nasil-hesaplanir',
    ],
    faqs: [
      {
        question: 'İndirimli satış her zaman kötü mü?',
        answer:
          'Hayır. Ek hacim, yeni müşteri değeri veya stok maliyeti kaybı telafi edebilir; bunun gerçekleşen katkıyla kanıtlanması gerekir.',
      },
      {
        question: 'Gerekli satış artışı nasıl bulunur?',
        answer:
          'Eski birim katkıyı yeni birim katkıya bölün. Sonuç 1,6 ise aynı toplam katkı için yaklaşık %60 daha fazla adet gerekir.',
      },
      {
        question: 'Kupon mu fiyat indirimi mi farklıdır?',
        answer:
          'Ekonomik sonuç net tahsilata bağlıdır; ancak kullanım oranı, segment ve raporlama etkisi farklı olabilir. Gerçekleşen ortalama indirimi kullanın.',
      },
    ],
    sources: [shopifyMargin, shopifyContribution],
    disclaimer:
      'Kampanya sonucu talep, stok ve müşteri davranışına bağlıdır. Simülasyon varsayımlarını gerçekleşen verilerle güncelleyin.',
  },
  {
    slug: 'e-ticaret-dashboard-metrikleri',
    title: 'E-Ticaret Dashboardunda Takip Edilecek Metrikler',
    excerpt:
      'Gösterişli grafikler yerine gelir, katkı, müşteri, dönüşüm ve veri kalitesini aynı karar ekranında birleştirin.',
    category: 'Veri ve Raporlama',
    contentType: 'Uygulama rehberi',
    maturity: 'growing',
    audience: 'E-ticaret yöneticileri, analistler ve ajanslar',
    intent: 'Uygulama',
    readingTime: 10,
    publishedAt: '2026-08-01',
    updatedAt: '2026-08-01',
    reviewedAt: '2026-08-01',
    reviewDueAt: '2026-10-01',
    shortAnswer:
      'İyi bir e-ticaret dashboardu beş soruyu cevaplar: Ne kadar net gelir ürettik, ne kadar katkı kaldı, bunu hangi müşteri ve kanallar getirdi, dönüşüm hunisi nerede kırıldı, veriye ne kadar güvenebiliriz? Yönetim ekranında 8–12 karar metriği yeterlidir; detaylar ürün ve kanal drill-down’ında tutulmalıdır.',
    whyItMatters: [
      'Aynı metriğin farklı ekiplerde farklı tanımlanmasını önler.',
      'Reklam panelini sipariş, iade ve finans verisiyle bağlar.',
      'Sorunu göstermekle kalmayıp sorumlu ekip ve sonraki aksiyonu görünür kılar.',
    ],
    definition:
      'Dashboard bir grafik koleksiyonu değil, belirli karar ritmi için tasarlanmış ölçüm yüzeyidir. Her metrik sahip, tanım, kaynak, yenilenme zamanı, hedef ve karşılaştırma dönemi taşır.',
    formula:
      'Karar ekranı = Sonuç metrikleri + sürücü metrikleri + koruyucu metrikler + veri kalite sinyalleri',
    formulaNote:
      'Önerilen çekirdek: net gelir, sipariş, katkı, katkı marjı, pazarlama gideri, MER, yeni müşteri CPA, dönüşüm oranı, ortalama sepet, iade oranı ve veri tazeliği.',
    inputs: [
      { label: 'Sipariş sistemi', description: 'Sipariş, net satış, iptal, iade ve ürün verisi.' },
      {
        label: 'Reklam platformları',
        description: 'Harcama, gösterim, tıklama ve atfedilen dönüşüm.',
      },
      { label: 'Web analitiği', description: 'Oturum, ürün, sepet, ödeme ve purchase eventleri.' },
      {
        label: 'Maliyet verisi',
        description: 'Ürün, komisyon, kargo, ödeme ve kampanya giderleri.',
      },
      { label: 'Veri sözlüğü', description: 'Her metriğin formülü, sahibi ve kapsamı.' },
    ],
    example: {
      title: 'Haftalık yönetim kartı',
      intro: 'Üst katmanda az sayıda metrik, her birinin altında teşhis kırılımı olsun.',
      rows: [
        { label: 'Net gelir', value: 'Hafta / hedef / geçen yıl', note: 'Sonuç' },
        { label: 'Katkı marjı', value: 'Toplam + ürün kırılımı', note: 'Ekonomi' },
        { label: 'MER ve yeni müşteri CPA', value: 'Tam yüklü kapsam', note: 'Edinme' },
        { label: 'CVR ve ortalama sepet', value: 'Cihaz + kanal', note: 'Dönüşüm' },
        { label: 'İade oranı', value: 'Olgun kohort', note: 'Koruyucu' },
        { label: 'Veri tazeliği', value: 'Kaynak bazında', note: 'Güven' },
      ],
      result:
        'Yönetici önce sapmayı görür; ardından ürün, kanal, cihaz ve müşteri kırılımlarına inerek aksiyonu seçer.',
    },
    decisions: [
      {
        signal: 'Gelir artıyor, katkı düşüyor',
        meaning: 'Karma, indirim veya maliyet bozuluyor.',
        action: 'Ürün/kampanya katkı kırılımına inin.',
      },
      {
        signal: 'Harcama artıyor, yeni müşteri sabit',
        meaning: 'Tekrar müşteriye atıf veya azalan verim olabilir.',
        action: 'Müşteri türü ve marjinal edinimi inceleyin.',
      },
      {
        signal: 'Metrikler kaynaklar arasında ayrışıyor',
        meaning: 'Tanım, kapsam veya veri kalitesi sorunu var.',
        action: 'Karar vermeden önce mutabakat ve tazelik kontrolü yapın.',
      },
    ],
    mistakes: [
      'Her platform metriğini tek ekrana koymak.',
      'Brüt ve net geliri etiketsiz karıştırmak.',
      'Son tamamlanmamış gün ile tam haftayı kıyaslamak.',
      'İade kohortu olgunlaşmadan oranı kesinleştirmek.',
      'Veri tazeliği ve kaynak hatasını göstermemek.',
    ],
    checklist: [
      'Dashboardun karar sahibini yazın.',
      '8–12 çekirdek metrik seçin.',
      'Her metrik için veri sözlüğü oluşturun.',
      'Hedef ve karşılaştırma dönemini ekleyin.',
      'Tazelik ve mutabakat uyarısı gösterin.',
      'Mobilde ana aksiyonları önceliklendirin.',
    ],
    relatedGuides: [
      'mer-nedir-nasil-hesaplanir',
      'haftalik-reklam-raporu-nasil-hazirlanir',
      'roas-yuksekken-kar-neden-duser',
    ],
    faqs: [
      {
        question: 'Dashboardda kaç metrik olmalı?',
        answer:
          'Karar ekranında genellikle 8–12 çekirdek metrik yeterlidir. Teşhis metrikleri kırılım veya ayrı sekmede tutulabilir.',
      },
      {
        question: 'Gerçek zamanlı dashboard gerekli mi?',
        answer:
          'Çoğu yönetim kararı için hayır. Yenilenme sıklığı karar hızına ve kaynağın olgunlaşma süresine göre seçilmelidir.',
      },
      {
        question: 'Tek doğruluk kaynağı nedir?',
        answer:
          'Her karar metriği için onaylanmış tanım ve kaynak belirlenmesidir; bütün verinin fiziksel olarak tek sistemde olması şart değildir.',
      },
    ],
    sources: [gaEcommerce, gaChannels],
    disclaimer:
      'Metrik seçimi iş modeline göre değişir. Dashboard başlamadan önce gelir, müşteri ve maliyet tanımlarını veri sözlüğünde sabitleyin.',
  },
  {
    slug: 'haftalik-reklam-raporu-nasil-hazirlanir',
    title: 'Haftalık Reklam Raporu Nasıl Hazırlanır?',
    excerpt:
      'Veri dökümü yerine karar üreten bir haftalık raporu hedef, sonuç, neden ve aksiyon sırasıyla kurun.',
    category: 'Veri ve Raporlama',
    contentType: 'Uygulama rehberi',
    maturity: 'growing',
    audience: 'Marka, ajans ve performans ekipleri',
    intent: 'Uygulama',
    readingTime: 10,
    publishedAt: '2026-08-01',
    updatedAt: '2026-08-01',
    reviewedAt: '2026-08-01',
    reviewDueAt: '2026-10-01',
    shortAnswer:
      'Haftalık reklam raporu dört katman taşımalıdır: hedefe göre sonuç, değişimin doğrulanmış sürücüleri, risk ve veri kalitesi notu, gelecek haftanın sahipli aksiyonları. Harcama, gelir ve ROAS dökümü tek başına rapor değildir. Aynı gün aralığını, atıf kapsamını ve tamamlanmış veri penceresini kullanın.',
    whyItMatters: [
      'Ekiplerin metrik tartışması yerine karar tartışmasını sağlar.',
      'Kısa dönem oynaklığı ile gerçek yön değişimini ayırır.',
      'Aksiyonların sonraki raporda takip edilmesini mümkün kılar.',
    ],
    definition:
      'Haftalık reklam raporu, seçilen dönemin performansını hedef ve kıyasla açıklayan, nedenleri kanıt düzeyine göre ayıran ve sorumlu/terminli aksiyon üreten operasyon belgesidir.',
    formula: 'Rapor = Sonuç özeti → Sürücü analizi → Risk/veri kalitesi → Aksiyon ve sahip',
    formulaNote:
      'Karşılaştırma için geçen hafta yanında 4 haftalık ortalama veya geçen yıl gibi sezonsallığı azaltan ikinci bir referans kullanın.',
    inputs: [
      { label: 'Hedefler', description: 'Harcama, yeni müşteri, katkı ve gelir hedefi.' },
      {
        label: 'Gerçekleşen medya verisi',
        description: 'Kanal ve kampanya bazında harcama, gelir, CPA, ROAS.',
      },
      {
        label: 'Sipariş/finans sonucu',
        description: 'Net gelir, katkı, iptal ve olgunlaşmış iade.',
      },
      {
        label: 'Deney ve değişiklik günlüğü',
        description: 'Bütçe, teklif, kreatif, site ve kampanya değişiklikleri.',
      },
      {
        label: 'Veri kalite kontrolü',
        description: 'Eksik gün, entegrasyon, atıf ve tazelik notu.',
      },
    ],
    example: {
      title: 'Bir sayfalık haftalık özet',
      intro: 'Tabloyu karar sırasına göre düzenleyin.',
      rows: [
        { label: 'Sonuç', value: 'Katkı hedefin %8 altında', note: 'Ana mesaj' },
        { label: 'Sürücü 1', value: 'Yeni müşteri CPA +%14', note: 'Doğrulanmış' },
        { label: 'Sürücü 2', value: 'Mobil CVR −0,4 puan', note: 'İncelenecek' },
        { label: 'Risk', value: 'Son 5 gün iade kohortu açık', note: 'Geçici veri' },
        { label: 'Aksiyon', value: 'Checkout hata incelemesi', note: 'Sahip + tarih' },
      ],
      result:
        'Rapor “ne oldu?” sorusunu bir cümlede, “neden?” sorusunu kanıtla ve “şimdi ne yapacağız?” sorusunu sahipli aksiyonla cevaplar.',
    },
    decisions: [
      {
        signal: 'Sapma veri hatasından geliyor',
        meaning: 'Performans yorumu güvenilir değil.',
        action: 'Raporu notlayın, veri sahibi ve düzeltme zamanını yazın.',
      },
      {
        signal: 'Tek haftalık oynaklık var',
        meaning: 'Kalıcı trend kanıtı zayıf.',
        action: '4 haftalık ortalama ve deney günlüğüyle izlemeyi sürdürün.',
      },
      {
        signal: 'Aynı sürücü iki hafta tekrarlanıyor',
        meaning: 'Operasyonel sorun kalıcılaşıyor.',
        action: 'Aksiyonu proje seviyesine çıkarıp sahip ve başarı metriği atayın.',
      },
    ],
    mistakes: [
      'Sadece ekran görüntüsü paylaşmak.',
      'Yüzde değişimi mutlak değer olmadan göstermek.',
      'Atıf penceresi değişikliğini not etmemek.',
      'Hipotezi doğrulanmış neden gibi yazmak.',
      'Sahipsiz ve tarihsiz aksiyon bırakmak.',
    ],
    checklist: [
      'Dönem ve kıyasları sabitleyin.',
      'Veri tazeliğini kontrol edin.',
      'Üç ana sonucu özetleyin.',
      'Sürücüleri kanıt düzeyiyle etiketleyin.',
      'En fazla beş aksiyona sahip ve tarih ekleyin.',
      'Önceki aksiyonların durumunu kapatın.',
    ],
    relatedGuides: [
      'e-ticaret-dashboard-metrikleri',
      'mer-nedir-nasil-hesaplanir',
      'roas-yuksekken-kar-neden-duser',
    ],
    faqs: [
      {
        question: 'Haftalık raporda hangi metrikler olmalı?',
        answer:
          'Hedefe bağlı olarak harcama, net gelir, katkı, MER, yeni müşteri CPA ve temel dönüşüm sürücüleri çekirdek seti oluşturabilir.',
      },
      {
        question: 'Geçen haftayla kıyas yeterli mi?',
        answer:
          'Hayır. Gün dağılımı, kampanya ve sezonsallık etkisi için 4 haftalık ortalama veya geçen yıl gibi ek referans kullanın.',
      },
      {
        question: 'Ajans ve marka farklı ROAS görüyorsa ne yapılmalı?',
        answer:
          'Kaynak, atıf penceresi, para birimi, zaman dilimi ve gelir kapsamını veri sözlüğünde eşitleyin; sonra sipariş sistemiyle mutabakat yapın.',
      },
    ],
    sources: [gaChannels, metaRoas, gaEcommerce],
    disclaimer:
      'Haftalık rapor, açık iade kohortları ve atıf gecikmeleri nedeniyle geçici değerler içerebilir. Bu alanları raporda görünür biçimde işaretleyin.',
  },
]

export const guides: Guide[] = [...foundationalGuides, ...researchGuides]

export const guideCategories = [
  'Tümü',
  'E-Ticaret Kârlılığı',
  'Reklam Analitiği',
  'Veri ve Raporlama',
  'AI & Otomasyon',
  'Pazaryeri & Operasyon',
] as const

export function getGuideBySlug(slug: string) {
  return guides.find((guide) => guide.slug === slug)
}

export function getRelatedGuides(guide: Guide) {
  return guide.relatedGuides.map(getGuideBySlug).filter((item): item is Guide => Boolean(item))
}
