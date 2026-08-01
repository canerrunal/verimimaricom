export type ContentMaturity = 'seed' | 'growing' | 'evergreen'
export type ContentType = 'guide' | 'news' | 'note'

export type GuideTable = {
  caption: string
  headers: string[]
  rows: string[][]
}

export type GuideSection = {
  id: string
  title: string
  body?: string
  paragraphs?: string[]
  bullets?: string[]
  callout?: string
  table?: GuideTable
}

export type ContentSource = {
  name: string
  url: string
  note: string
}

export type ContentPost = {
  slug: string
  title: string
  excerpt: string
  contentType: ContentType
  category: string
  maturity: ContentMaturity
  publishedAt: string
  updatedAt: string
  reviewDueAt?: string
  readingTime?: string
  sourceName: string
  sourceUrl: string
  tags: string[]
  highlights: string[]
  sections: GuideSection[]
  sources?: ContentSource[]
  relatedTool?: {
    href: string
    label: string
    description: string
  }
}

export const fallbackBlogPosts: ContentPost[] = [
  {
    slug: 'e-ticaret-karlilik-isletim-sistemi',
    title: 'E-ticaret Kârlılık İşletim Sistemi: ROAS’tan Gerçek Katkı Payına',
    excerpt:
      'Ciro, panel ROAS ve sipariş sayısını tek bir kârlılık karar sistemine bağlayın; hangi ürünün ve kampanyanın gerçekten para bıraktığını görün.',
    contentType: 'guide',
    category: 'E-Ticaret Kârlılığı',
    maturity: 'evergreen',
    publishedAt: '2026-08-01',
    updatedAt: '2026-08-01',
    reviewDueAt: '2026-11-01',
    readingTime: '11 dk',
    sourceName: 'Veri Mimarı Araştırma Masası',
    sourceUrl:
      'https://ticaret.gov.tr/duyurular/turkiyede-e-ticaretin-gorunumu-raporu-yayinlandi-12-05-2026',
    tags: ['Kârlılık', 'ROAS', 'Katkı Payı', 'MER', 'CAC', 'E-Ticaret'],
    highlights: [
      'Panel ROAS bir gelir oranıdır; ürünün size ne kadar para bıraktığını tek başına göstermez.',
      'Karar sırası net gelir → katkı payı → pazarlama sonrası katkı → işletme sonucu olmalıdır.',
      'Haftalık yönetim ekranında ürün, kanal ve yeni müşteri kırılımı birlikte okunmalıdır.',
      'Her metrik bir karar eşiğine ve sorumlu aksiyona bağlanmadıkça rapor kalabalığı üretir.',
    ],
    sections: [
      {
        id: 'kisa-cevap',
        title: 'Kısa cevap: ROAS’ı değil, katkı payı zincirini yönetin',
        paragraphs: [
          'E-ticarette sağlıklı karar sistemi, reklam panelindeki gelirle başlamaz. İptal ve iadeler sonrası net gelirle başlar; ürün, komisyon, ödeme, kargo ve paketleme maliyetleri düşüldükten sonra reklam için kalan alanı gösterir. Reklam gideri de düştüğünde kampanyanın büyümeye gerçekten katkı yapıp yapmadığı görülür.',
          'Bu yaklaşım tek bir “iyi ROAS” sayısı aramak yerine her ürün için ekonomik eşik üretir. Aynı ROAS, yüksek iade oranlı bir moda ürününde zarar; tekrar satın alma oranı yüksek bir sarf ürününde sürdürülebilir büyüme anlamına gelebilir.',
        ],
        callout:
          'Temel karar: Bir kampanyayı ölçeklemeden önce sipariş başına pazarlama sonrası katkının pozitif olduğunu ve nakit döngüsünün bu büyümeyi taşıdığını doğrulayın.',
      },
      {
        id: 'dort-katman',
        title: 'Dört katmanlı kârlılık görünümü',
        paragraphs: [
          'Aşağıdaki katmanlar aynı dönemi, aynı para birimini ve aynı iade tanımını kullanmalıdır. Aksi halde farklı raporlardaki sayılar doğru olsa bile karar yanlış çıkar.',
        ],
        table: {
          caption: 'Haftalık kârlılık katmanları ve karar soruları',
          headers: ['Katman', 'Basit tanım', 'Cevapladığı soru'],
          rows: [
            [
              'Net gelir',
              'Tahsil edilen satış − iptal − iade − indirim etkisi',
              'Gerçekte ne kadar gelir kaldı?',
            ],
            [
              'Katkı payı 1',
              'Net gelir − ürün − komisyon − ödeme − lojistik − iade rezervi',
              'Reklam öncesi ne kadar alan var?',
            ],
            [
              'Katkı payı 2',
              'Katkı payı 1 − performans pazarlaması',
              'Pazarlama büyümeye para bıraktı mı?',
            ],
            [
              'Faaliyet sonucu',
              'Katkı payı 2 − sabit ve yarı sabit giderler',
              'İşletme düzeyinde kâr oluştu mu?',
            ],
          ],
        },
      },
      {
        id: 'metrik-seti',
        title: 'Yönetim ekranında tutulacak altı metrik',
        bullets: [
          'Sipariş başına katkı payı: Ürün ekonomisinin temel birimi.',
          'Başabaş ROAS ve hedef ROAS: Reklamın zarar ve hedef kâr sınırı.',
          'Blended MER: Toplam net gelirin toplam pazarlama harcamasına oranı; kanal panellerinin dışında bütünsel kontrol.',
          'Yeni müşteri CAC: Yeni müşteri kazanımına ayrılan harcamanın doğrulanmış yeni müşteri sayısına bölümü.',
          '90 günlük katkı LTV’si: Bir kohortun 90 günde ürettiği katkı payının müşteri başına değeri.',
          'İade sonrası net marj: Kategori ve ürün kalitesi sorunlarını satış hacminden ayıran koruma metriği.',
        ],
        callout:
          'MER ve CAC için kanal atfı kusursuz olmayabilir. Bu yüzden bütçe kararını platform raporuna değil, aynı dönemli mağaza geliri ve müşteri verisiyle yapılan uzlaştırmaya bağlayın.',
      },
      {
        id: 'ornek',
        title: 'Yüksek ROAS’ın düşük kâra dönüştüğü örnek',
        paragraphs: [
          'Aşağıdaki değerler KDV hariç, basitleştirilmiş ve simüle edilmiş tek sipariş örneğidir. Finansal sonuç iddiası değildir.',
        ],
        table: {
          caption: '1.000 TL net gelirli örnek sipariş ekonomisi',
          headers: ['Kalem', 'Tutar', 'Kalan'],
          rows: [
            ['Net gelir', '1.000 TL', '1.000 TL'],
            ['Ürün maliyeti', '−350 TL', '650 TL'],
            ['Komisyon ve ödeme', '−180 TL', '470 TL'],
            ['Kargo ve paketleme', '−90 TL', '380 TL'],
            ['Beklenen iade rezervi', '−60 TL', '320 TL'],
            ['Reklam gideri', '−250 TL', '70 TL'],
          ],
        },
        callout:
          'Panel ROAS 4,0x görünür; fakat pazarlama sonrası katkı yalnızca 70 TL, yani net gelirin %7’sidir. Sabit giderler henüz düşülmemiştir.',
      },
      {
        id: 'karar-ritmi',
        title: 'Haftalık karar ritmi',
        bullets: [
          'Pazartesi: Sipariş, iptal, iade ve ödeme verisini tek dönem üzerinde uzlaştırın.',
          'Salı: Ürünleri pazarlama sonrası katkı ve stok riskiyle dört gruba ayırın.',
          'Çarşamba: Bütçe artışı, kreatif yenileme, fiyat değişimi veya durdurma kararını kaydedin.',
          'Cuma: Kararın beklenen ve gerçekleşen etkisini karşılaştırın; varsayımı güncelleyin.',
        ],
        callout:
          'Türkiye e-ticaret hacmi 2025’te 4,57 trilyon TL’ye ulaştı ve 634 binden fazla işletme e-ticaret yaptı. Büyüyen pazarda farkı ciro değil, aynı veriyi daha iyi karara çeviren işletim disiplini yaratacaktır.',
      },
      {
        id: 'sinirlar',
        title: 'Sınırlar ve doğrulama notu',
        paragraphs: [
          'Bu çerçeve finansal danışmanlık değildir. KDV, kurum vergisi, stok değerleme, kur etkisi, vade, tahsilat riski ve sabit gider dağıtımı işletmenizin muhasebe yöntemiyle ayrıca ele alınmalıdır.',
          'Yeni müşteri CAC ve katkı LTV’si ancak müşteri kimliği, iade ve tekrar sipariş verisi tutarlıysa karar için kullanılmalıdır. Veri kalitesi düşükse kesin hedef vermek yerine aralık kullanın.',
        ],
      },
    ],
    sources: [
      {
        name: 'T.C. Ticaret Bakanlığı — Türkiye’de E-Ticaretin Görünümü 2025',
        url: 'https://ticaret.gov.tr/duyurular/turkiyede-e-ticaretin-gorunumu-raporu-yayinlandi-12-05-2026',
        note: 'Türkiye pazar hacmi, işlem sayısı ve işletme sayısı için resmî kaynak.',
      },
      {
        name: 'DHL — 2026 E-Commerce Trends Report',
        url: 'https://www.dhl.com/global-en/microsites/ec/ecommerce-insights/insights/reports/2026-ecommerce-trends-report.html',
        note: 'Teslimat, iade ve sepet terk davranışı için 29 ülkeli küresel araştırma.',
      },
      {
        name: 'Meta — Optimize Conversions for Business Values',
        url: 'https://www.facebook.com/business/news/optimize-conversions-for-business-values',
        note: 'Reklam optimizasyonunu işletmenin değer verdiği sonuca bağlama yaklaşımı.',
      },
    ],
    relatedTool: {
      href: '/araclar/basabas-roas-hesaplayici',
      label: 'Kendi başabaş ROAS’ınızı hesaplayın',
      description:
        'Ürün, komisyon, kargo ve iade varsayımlarınızla zarar sınırını iki dakikada görün.',
    },
  },
  {
    slug: 'ai-alisveris-ajanlarina-hazirlik',
    title: 'AI Alışveriş Ajanlarına Hazırlık: Ürün Verisi ve Feed Kontrol Listesi',
    excerpt:
      'ChatGPT ve Google’ın yeni alışveriş yüzeylerinde görünür olmak için protokolden önce ürün kataloğu, stok, fiyat, teslimat ve ölçüm altyapısını hazırlayın.',
    contentType: 'guide',
    category: 'AI & Otomasyon',
    maturity: 'growing',
    publishedAt: '2026-08-01',
    updatedAt: '2026-08-01',
    reviewDueAt: '2026-09-15',
    readingTime: '12 dk',
    sourceName: 'Veri Mimarı Araştırma Masası',
    sourceUrl: 'https://openai.com/index/powering-product-discovery-in-chatgpt/',
    tags: ['AI', 'Agentic Commerce', 'ACP', 'UCP', 'Ürün Feed', 'Merchant Center'],
    highlights: [
      'AI alışveriş hazırlığının ilk işi yeni bir chatbot değil, temiz ve güncel ürün verisidir.',
      'OpenAI ACP ürün keşfini; Google UCP keşiften sipariş yönetimine uzanan ortak ticaret dilini hedefliyor.',
      'Fiyat, stok, varyant ve teslimat uyuşmazlığı hem insan hem ajan deneyiminde güven kaybı yaratır.',
      'Türkiye’de erişim ve uygunluk değişebilir; bugünkü yatırım protokolden bağımsız veri kalitesine yapılmalıdır.',
    ],
    sections: [
      {
        id: 'kisa-cevap',
        title: 'Kısa cevap: Önce kataloğunuzu makine tarafından anlaşılır yapın',
        paragraphs: [
          'AI alışveriş yüzeyleri ürünleri karşılaştırabilmek için başlık, varyant, fiyat, stok, görsel, satıcı ve teslimat gibi alanların yapılandırılmış ve güncel olmasına ihtiyaç duyuyor. Bu nedenle ilk adım ACP veya UCP entegrasyonu yazmak değil; mevcut ürün veri hattındaki eksikleri ölçmektir.',
          'OpenAI, ACP üzerinden ürün feed’leri ve promosyonlarla ChatGPT ürün keşfini besliyor. Google’ın UCP standardı ise keşif, sepet, ödeme ve sipariş yönetimi gibi yetenekleri ortak bir dille bağlamayı amaçlıyor. Her iki gelişme de kataloğun artık yalnızca ürün sayfası olmadığını; farklı yüzeylere dağıtılan bir veri ürünü olduğunu gösteriyor.',
        ],
        callout:
          'Türkiye için doğrudan erişim, ülke uygunluğu ve ödeme desteği değişebilir. Bu rehber bugünkü entegrasyon garantisi değil, protokolden bağımsız hazırlık planıdır.',
      },
      {
        id: 'veri-katmani',
        title: 'Birinci katman: Ürün kaydının tek doğruluk kaynağı',
        bullets: [
          'Kalıcı ürün ve varyant kimliği: SKU, GTIN veya uygun benzersiz anahtar.',
          'Açık başlık ve açıklama: Ürünün ne olduğu, kim için olduğu ve ayırt edici özellikleri.',
          'Kategori ve nitelikler: Malzeme, ölçü, renk, uyumluluk, beden ve kullanım koşulu.',
          'Fiyat ve para birimi: Ürün sayfası, feed ve ödeme adımında aynı değer.',
          'Stok ve bulunabilirlik: Satılabilir varyant düzeyinde güncel durum.',
          'Görseller: Doğru varyantla eşleşen, erişilebilir ve yeterli çözünürlükte varlıklar.',
          'Teslimat, iade ve satıcı bilgisi: Karar anında belirsizliği azaltan operasyon verisi.',
        ],
        callout:
          'OpenAI’ın feed rehberi tam kataloğun en az günlük gönderimini, gün içi değişikliklerin API ile güncellenmesini öneriyor. Güncellik sıklığı mağazanın fiyat ve stok oynaklığına göre artırılmalıdır.',
      },
      {
        id: 'kalite-skoru',
        title: 'İkinci katman: Feed sağlık skoru',
        table: {
          caption: 'Haftalık ürün feed kalite kontrolü',
          headers: ['Kontrol', 'Ölçüm', 'Başlangıç hedefi'],
          rows: [
            ['Zorunlu alan doluluğu', 'Dolu zorunlu alan / beklenen alan', '≥ %98'],
            ['Fiyat eşleşmesi', 'Feed fiyatı = sayfa fiyatı', '≥ %99'],
            ['Stok eşleşmesi', 'Feed stoku = satılabilir stok', '≥ %99'],
            ['Varyant bütünlüğü', 'Doğru ebeveyn altında varyant oranı', '≥ %98'],
            ['Güncellik', 'Son başarılı tam ve artımlı güncelleme yaşı', 'İş modeline göre SLA'],
            ['Hata çözüm süresi', 'Kritik feed hatasının kapanma süresi', '< 24 saat'],
          ],
        },
        callout:
          'Yüzde hedefleri Veri Mimarı’nın başlangıç kalite kapılarıdır; resmî platform uygunluk eşiği değildir. Kendi katalog büyüklüğünüz ve değişim hızınıza göre sıkılaştırın.',
      },
      {
        id: 'protokol-karari',
        title: 'Üçüncü katman: Hangi entegrasyon ne zaman?',
        paragraphs: [
          'Shopify veya desteklenen bir sağlayıcı kullanan mağazalar önce mevcut katalog bağlantılarının kapsamını doğrulamalıdır. Özel altyapıda ise Merchant Center, yapılandırılmış veri, ACP feed’i veya UCP yetenekleri aynı ürün kaydından beslenmelidir. Ayrı ayrı elle yönetilen feed’ler kısa sürede çelişir.',
        ],
        table: {
          caption: 'Olgunluğa göre entegrasyon kararı',
          headers: ['Durum', 'Öncelik', 'Henüz yapmayın'],
          rows: [
            [
              'Katalog dağınık',
              'Ürün veri modeli ve kimlik eşlemesi',
              'Yeni protokol entegrasyonu',
            ],
            ['Feed var, hatalı', 'Fiyat/stok SLA ve hata izleme', 'Daha fazla dağıtım kanalı'],
            [
              'Feed sağlıklı',
              'AI yönlendirme ve görünürlük ölçümü',
              'Gelir kanıtı olmadan büyük yeniden platformlama',
            ],
            [
              'Yüksek ölçek',
              'ACP/UCP uygunluk ve güvenlik keşfi',
              'Ödeme yetkisini kontrolsüz otomatikleştirme',
            ],
          ],
        },
      },
      {
        id: 'olcum',
        title: 'Dördüncü katman: AI keşif ölçümü',
        bullets: [
          'AI yönlendirme oturumları: ChatGPT, Gemini ve diğer doğrulanmış kaynaklardan gelen trafik.',
          'AI yönlendirme dönüşüm oranı: Aynı tanımla organik ve ücretli trafik karşılaştırması.',
          'Ürün görünürlük örneklemi: Sabit bir sorgu setinde markanın görünme ve doğru temsil edilme oranı.',
          'Feed kaynaklı hata oranı: Fiyat, stok, görsel ve varyant uyuşmazlıklarının payı.',
          'Merchant-owned checkout tamamlama oranı: AI keşfinden mağaza ödeme adımına geçiş.',
        ],
        callout:
          'OpenAI Mart 2026 güncellemesinde odağını ürün keşfi ve satıcının kendi ödeme deneyimine yönelttiğini açıkladı. Bu nedenle yalnızca “AI içinden ödeme”yi değil, nitelikli yönlendirmeyi ve mağaza dönüşümünü de ölçün.',
      },
      {
        id: 'otuz-gun',
        title: '30 günlük uygulama planı',
        bullets: [
          '1. hafta: En çok gelir üreten 50 SKU’da alan, fiyat, stok ve varyant denetimi.',
          '2. hafta: Tek ürün kaydı, güncelleme sorumlusu ve hata SLA’sı tanımı.',
          '3. hafta: Merchant Center ve mevcut feed’lerde örnek ürün doğrulaması.',
          '4. hafta: AI yönlendirme UTM standardı, sabit sorgu seti ve aylık görünürlük kaydı.',
        ],
        callout:
          'Başarı ölçütü “ACP kuruldu” değildir. Doğru ürünün doğru fiyat ve stokla bulunması, kullanıcının güvenle mağazaya geçmesi ve siparişin hatasız tamamlanmasıdır.',
      },
    ],
    sources: [
      {
        name: 'OpenAI — Powering Product Discovery in ChatGPT',
        url: 'https://openai.com/index/powering-product-discovery-in-chatgpt/',
        note: 'ACP ürün keşfi, Shopify katalog bağlantısı ve merchant-owned checkout yönü.',
      },
      {
        name: 'OpenAI Developers — Agentic Commerce Product Feed Spec',
        url: 'https://developers.openai.com/commerce/specs/spec',
        note: 'Ürün feed alanları, doğrulama ve satıcı bağlamı.',
      },
      {
        name: 'Google Developers — Universal Commerce Protocol',
        url: 'https://developers.googleblog.com/en/under-the-hood-universal-commerce-protocol-ucp/',
        note: 'UCP kapsamı, yetenek modeli ve Merchant Center gereksinimi.',
      },
      {
        name: 'Stripe Docs — Agentic Commerce Protocol',
        url: 'https://docs.stripe.com/agentic-commerce/acp',
        note: 'ACP’nin checkout, feed, ödeme yetkilendirme ve sipariş yaşam döngüsü bileşenleri.',
      },
    ],
    relatedTool: {
      href: '/is-birligi',
      label: 'Ürün veri hattınızı birlikte değerlendirelim',
      description: 'Katalog, feed ve ölçüm altyapınız için kapsamı ve öncelikleri paylaşın.',
    },
  },
  {
    slug: 'pazaryeri-dijital-raf-performansi',
    title: 'Pazaryerinde Dijital Raf Performansı Nasıl Ölçülür?',
    excerpt:
      'Görünürlük, içerik, fiyat, buybox, stok ve operasyonu tek skor kartında birleştirerek pazaryeri performansını satıştan önce yönetin.',
    contentType: 'guide',
    category: 'Pazaryeri & Operasyon',
    maturity: 'growing',
    publishedAt: '2026-08-01',
    updatedAt: '2026-08-01',
    reviewDueAt: '2026-10-01',
    readingTime: '10 dk',
    sourceName: 'Veri Mimarı Araştırma Masası',
    sourceUrl:
      'https://www.metheus.co/insights/how-metheus-consultancy-and-mindsite-decoded-turkish-e-commerce-landscape',
    tags: ['Pazaryeri', 'Dijital Raf', 'Buybox', 'Stok', 'Ürün İçeriği', 'Kârlılık'],
    highlights: [
      'Satış sonucu gecikmeli bir metriktir; dijital raf skoru problemi daha erken gösterir.',
      'Reklam görünürlüğü, içerik kalitesi ve stok bulunurluğu birlikte yönetilmelidir.',
      'Buybox kazanmak kâr etmeyi garanti etmez; fiyat disiplini katkı payıyla sınırlandırılmalıdır.',
      'Skor, kategori içindeki karşılaştırılabilir ürün ve anahtar kelime setine göre hesaplanmalıdır.',
    ],
    sections: [
      {
        id: 'kisa-cevap',
        title: 'Kısa cevap: Satışı değil, satışın ön koşullarını puanlayın',
        paragraphs: [
          'Dijital raf performansı; ürünün aramada ne kadar göründüğünü, ürün sayfasının karar için yeterli olup olmadığını, fiyat ve buybox durumunu, stok sürekliliğini ve operasyon güvenini aynı çerçevede izler. Böylece satış düştükten sonra neden aramak yerine, düşüşe yol açan sinyali daha erken görürsünüz.',
          'Metheus ve Mindsite’ın Türkiye pazaryeri çalışması 400 binden fazla SKU veri noktasını inceleyerek görünürlük, içerik, fiyat, rekabet, tüketici etkileşimi ve mağaza operasyonlarını birlikte ele aldı. Çalışmada markaların yalnızca %10’unun %10’un üzerinde anlamlı raf payına ulaşması, satış hacminin arkasındaki yapısal farkı gösteriyor.',
        ],
      },
      {
        id: 'skor-karti',
        title: '100 puanlık dijital raf skor kartı',
        table: {
          caption: 'Veri Mimarı dijital raf başlangıç skoru',
          headers: ['Boyut', 'Ağırlık', 'Örnek ölçüm'],
          rows: [
            ['Organik + sponsorlu görünürlük', '25', 'Stratejik sorgularda ilk ekran ve raf payı'],
            [
              'Ürün içeriği kalitesi',
              '20',
              'Başlık, açıklama, nitelik, görsel ve varyant doluluğu',
            ],
            [
              'Fiyat ve buybox disiplini',
              '20',
              'Buybox oranı, fiyat tutarlılığı ve minimum marj ihlali',
            ],
            ['Stok ve bulunabilirlik', '15', 'Satılabilir gün oranı ve stokta yok süresi'],
            ['Puan, yorum ve yanıt', '10', 'Yorum güncelliği, soru cevaplama ve sorun temaları'],
            [
              'Teslimat ve mağaza operasyonu',
              '10',
              'Hazırlama süresi, iptal ve geç gönderim oranı',
            ],
          ],
        },
        callout:
          'Ağırlıklar Veri Mimarı’nın başlangıç modelidir. Kategori ekonomisine göre değiştirin; örneğin modada varyant bulunurluğu, elektronikte buybox ve teknik nitelik daha ağır olabilir.',
      },
      {
        id: 'olcum-yontemi',
        title: 'Ölçümü karşılaştırılabilir kurun',
        bullets: [
          'Aynı kategori ve fiyat bandındaki gerçek rakip ürünleri seçin.',
          '20–50 stratejik sorgudan sabit bir anahtar kelime sepeti oluşturun.',
          'Organik ve sponsorlu görünürlüğü ayrı kaydedin.',
          'Stokta olmayan ürünün görünürlük kaybını ayrıca işaretleyin.',
          'Promosyon dönemini normal dönemle doğrudan karşılaştırmayın.',
          'Skoru haftalık, kârlılık ve satış sonucunu aylık değerlendirin.',
        ],
      },
      {
        id: 'icerik',
        title: 'İçerik uzunluğu değil, karar tamlığı önemlidir',
        paragraphs: [
          'Türkiye çalışmasında Beauty & Skincare ürün açıklamaları ortalama 129 kelimeyken Fashion & Sportswear 56 kelimede kaldı. Bu fark bir “daha uzun yazı” hedefi değil; ürünün kullanım, ölçü, malzeme, uyumluluk ve beklenti bilgisinin eksik kalıp kalmadığını sorgulamak için sinyaldir.',
          'İyi ürün içeriği dönüşümü artırmanın yanında yanlış beklentiyi ve iadeyi azaltmalıdır. Bu yüzden yorumlarda tekrar eden beden, renk, kurulum veya uyumluluk sorunlarını ürün veri alanlarına geri besleyin.',
        ],
      },
      {
        id: 'buybox',
        title: 'Buybox hedefini minimum kâr sınırıyla kilitleyin',
        paragraphs: [
          'Daha düşük fiyat buybox kazanımını artırabilir; ancak komisyon, hizmet bedeli, reklam ve iade maliyeti düşüldüğünde zarar üretebilir. Fiyat otomasyonu varsa minimum fiyatı alış maliyetine değil, hedef pazarlama sonrası katkı payına göre belirleyin.',
        ],
        bullets: [
          'Her pazaryeri için ayrı komisyon ve hizmet bedeli tablosu tutun.',
          'Kampanya indirimi ile kupon/sepette indirim etkisini ayırın.',
          'Buybox kaybını fiyat, stok, teslimat ve satıcı puanı nedenleriyle sınıflandırın.',
          'Hacim artışını ürün başına katkı ve nakit döngüsüyle birlikte okuyun.',
        ],
      },
      {
        id: 'haftalik-aksiyon',
        title: 'Haftalık aksiyon panosu',
        table: {
          caption: 'Skor düşüşünü aksiyona çevirme örnekleri',
          headers: ['Sinyal', 'Olası neden', 'İlk aksiyon'],
          rows: [
            [
              'Görünürlük düştü',
              'Stok, sıralama veya sponsorlu pay kaybı',
              'Sorgu ve SKU kırılımını ayır',
            ],
            [
              'Dönüşüm düştü',
              'Fiyat, içerik, yorum veya teslimat vaadi',
              'Rakip ürün sayfasıyla fark analizi yap',
            ],
            [
              'Buybox düştü',
              'Fiyat veya operasyon skoru',
              'Minimum marjı koruyarak nedeni doğrula',
            ],
            [
              'İade arttı',
              'Beklenti ve ürün gerçeği uyuşmuyor',
              'İade nedenini içerik alanına geri besle',
            ],
            [
              'Stok kesildi',
              'Tahmin veya tedarik gecikmesi',
              'Reklamı kıs, ikame SKU’yu öne çıkar',
            ],
          ],
        },
      },
    ],
    sources: [
      {
        name: 'Metheus & Mindsite — Marketplace Performance Index for Brands 2025',
        url: 'https://www.metheus.co/insights/how-metheus-consultancy-and-mindsite-decoded-turkish-e-commerce-landscape',
        note: 'Türkiye’de 101 marka ve 400 binden fazla SKU veri noktası üzerinden dijital raf boyutları.',
      },
      {
        name: 'ECDB — Consumer Shift: The Marketplace Landscape 2026',
        url: 'https://static.ecdb.com/media/2026/06/ecdb-consumer-shift-the-marketplace-landscape-14333.pdf',
        note: 'Pazaryeri yoğunlaşması, 3P büyümesi ve tekrar satın alma dinamikleri için küresel bağlam.',
      },
    ],
    relatedTool: {
      href: '/araclar/pazaryeri-komisyon-hesaplayici',
      label: 'Pazaryeri kesintilerinden sonra kalanı görün',
      description:
        'Komisyon, hizmet bedeli, kargo ve diğer maliyetlerle ürün başına sonucu hesaplayın.',
    },
  },
  {
    slug: 'teslimat-iade-donusum-kontrol-listesi',
    title: 'Teslimat ve İade Dönüşüm Kontrol Listesi',
    excerpt:
      'Ücretsiz kargo ezberinin ötesine geçin; teslimat seçeneği, güven, hız, iade maliyeti ve checkout iletişimini birlikte ölçün.',
    contentType: 'guide',
    category: 'Pazaryeri & Operasyon',
    maturity: 'growing',
    publishedAt: '2026-08-01',
    updatedAt: '2026-08-01',
    reviewDueAt: '2026-11-01',
    readingTime: '9 dk',
    sourceName: 'Veri Mimarı Araştırma Masası',
    sourceUrl:
      'https://www.dhl.com/global-en/microsites/ec/ecommerce-insights/insights/reports/2026-ecommerce-trends-report.html',
    tags: ['Teslimat', 'İade', 'Checkout', 'Dönüşüm', 'Kargo', 'Operasyon'],
    highlights: [
      'DHL’nin 2026 araştırmasında alışverişçilerin %67’si teslimat teklifi nedeniyle sepet terk ettiğini söylüyor.',
      'Ücretsiz kargo dikkat çeker; güvenilir sağlayıcı ve seçenek netliği satın almayı tamamlatır.',
      'Teslimat dönüşümü ile teslimat maliyeti aynı deney tablosunda izlenmelidir.',
      'İade oranı yalnızca operasyon KPI’ı değil; ürün içeriği ve müşteri beklentisi sinyalidir.',
    ],
    sections: [
      {
        id: 'kisa-cevap',
        title: 'Kısa cevap: Teslimat vaadini bir dönüşüm ürünü gibi yönetin',
        paragraphs: [
          'Checkout’taki teslimat satırı yalnızca operasyon bilgisi değildir. Fiyat, hız, seçenek ve güven birlikte satın alma kararını etkiler. DHL’nin 29 ülkede 29 bin alışverişçi ve 5.800 işletmeyle yaptığı 2026 araştırmasında alışverişçilerin %67’si teslimat teklifi nedeniyle sepet terk ettiğini belirtiyor.',
          'Aynı araştırmada yaklaşık her 10 alışverişçiden 7’si güvenmediği teslimat ve iade sağlayıcısı olan markadan alışveriş yapmayacağını; istediği seçenek sunulmazsa sepeti terk edeceğini söylüyor. Bu küresel oranlar Türkiye için doğrudan benchmark değildir, fakat hangi soruları ölçmeniz gerektiğini güçlü biçimde gösterir.',
        ],
      },
      {
        id: 'checkout',
        title: 'Checkout’ta görünmesi gerekenler',
        bullets: [
          'Teslimat ücreti, kullanıcı ödeme adımına gelmeden önce görünür olmalı.',
          'Tahmini tarih aralık değil, mümkünse siparişe ve adrese göre hesaplanmalı.',
          'Kargo firması veya teslimat modeli açıkça belirtilmeli.',
          'Ücretsiz kargo eşiği ve sepette kalan tutar birlikte gösterilmeli.',
          'İade süresi, ücret sorumluluğu ve başlangıç adımı kısa dille açıklanmalı.',
          'Mobilde teslimat seçenekleri tek bakışta karşılaştırılabilmeli.',
        ],
        callout:
          '“Hızlı teslimat” gibi belirsiz sıfat yerine “Bugün 15.00’e kadar siparişte 2–3 iş günü” gibi doğrulanabilir vaat kullanın.',
      },
      {
        id: 'metrikler',
        title: 'Teslimat ekonomisini altı metrikle izleyin',
        table: {
          caption: 'Teslimat ve iade karar metrikleri',
          headers: ['Metrik', 'Tanım', 'Karar'],
          rows: [
            [
              'Teslimat seçeneği dönüşümü',
              'Seçeneği görenlerden satın alanlar',
              'Hangi teklif sürtünmeyi azaltıyor?',
            ],
            ['Söz verilen / gerçekleşen süre', 'Sipariş bazında gün farkı', 'Vaat güvenilir mi?'],
            [
              'Sipariş başına lojistik maliyeti',
              'Gidiş + paket + iade rezervi',
              'Ücretsiz kargo eşiği sağlıklı mı?',
            ],
            [
              'İade oranı ve maliyeti',
              'Kategori, SKU ve neden kırılımı',
              'Ürün veya beklenti sorunu nerede?',
            ],
            [
              'WISMO temas oranı',
              '“Siparişim nerede?” talepleri / sipariş',
              'İletişim nerede yetersiz?',
            ],
            [
              'Hasarlı/geç teslimat oranı',
              'Taşıyıcı ve bölge kırılımı',
              'Sağlayıcı kalitesi yeterli mi?',
            ],
          ],
        },
      },
      {
        id: 'ucretsiz-kargo',
        title: 'Ücretsiz kargo eşiğini tahminle belirlemeyin',
        paragraphs: [
          'Eşik, ortalama sepeti yükseltirken ek ürünlerin katkı payıyla kargo sübvansiyonunu karşılamalıdır. Sadece dönüşüm artışına bakılırsa daha fazla sipariş daha düşük toplam katkı üretebilir.',
        ],
        bullets: [
          'Mevcut sepet dağılımını ve sipariş başına katkıyı çıkarın.',
          'Eşik altı ve üstü siparişlerde kargo maliyeti payını karşılaştırın.',
          'Eşik çevresindeki sepetlerde ek ürün davranışını ölçün.',
          'Dönüşüm, sepet, katkı payı ve iade etkisini aynı deneyde okuyun.',
        ],
      },
      {
        id: 'iade',
        title: 'İade nedenini ürün verisine geri besleyin',
        paragraphs: [
          'İade kodu “müşteri vazgeçti” düzeyinde kalırsa öğrenme üretmez. Beden, renk, malzeme, uyumluluk, hasar, geç teslimat ve yanlış ürün gibi nedenleri ayırın. Ürün sayfasında önlenebilecek nedenleri içerik ve görsel ekibine; taşıyıcı kaynaklı nedenleri operasyon ekibine yönlendirin.',
        ],
        callout:
          'İade azaltma hedefi müşterinin hakkını zorlaştırmak değildir. Doğru beklenti, doğru ürün ve kolay süreçle gereksiz iadeyi azaltmaktır.',
      },
      {
        id: 'test-plani',
        title: 'Dört haftalık test planı',
        bullets: [
          '1. hafta: Checkout teslimat bilgisini, maliyet ve tarih açıklığını denetleyin.',
          '2. hafta: Taşıyıcı ve bölge bazında vaat/gerçekleşen süre raporu kurun.',
          '3. hafta: Ücretsiz kargo eşiğini katkı payıyla simüle edin ve kontrollü test edin.',
          '4. hafta: En yüksek iade nedenine sahip 10 SKU’nun içerik ve operasyon düzeltmesini yayınlayın.',
        ],
      },
    ],
    sources: [
      {
        name: 'DHL — 2026 E-Commerce Trends Report',
        url: 'https://www.dhl.com/global-en/microsites/ec/ecommerce-insights/insights/reports/2026-ecommerce-trends-report.html',
        note: '29 ülkede alışverişçi ve işletme tarafını karşılaştıran teslimat, iade ve checkout araştırması.',
      },
      {
        name: 'T.C. Ticaret Bakanlığı — Türkiye’de E-Ticaretin Görünümü 2025',
        url: 'https://ticaret.gov.tr/duyurular/turkiyede-e-ticaretin-gorunumu-raporu-yayinlandi-12-05-2026',
        note: 'Türkiye’de teslimat süresi ve e-ticaret ölçeği için yerel bağlam.',
      },
    ],
    relatedTool: {
      href: '/araclar/indirim-karlilik-simulatoru',
      label: 'Teklif değişikliğinin kâra etkisini test edin',
      description:
        'İndirim ve gerekli ek satış hacmini kârlılık sınırınızla birlikte karşılaştırın.',
    },
  },
  {
    slug: 'claude-fable-5-vercel-ai-gateway',
    title: "Claude Fable 5 Vercel AI Gateway'de Yayında",
    excerpt:
      "Vercel AI Gateway, Anthropic'in Claude Fable 5 modelini 1 milyon token bağlam, reasoning, tool use, explicit caching, dosya girdisi ve görüntü desteğiyle katalogda görünür hale getirdi.",
    contentType: 'news',
    category: 'AI Haberleri',
    maturity: 'growing',
    publishedAt: '2026-06-09',
    updatedAt: '2026-06-12',
    readingTime: '4 dk',
    sourceName: 'Vercel AI Gateway',
    sourceUrl: 'https://vercel.com/ai-gateway/models/claude-fable-5',
    tags: ['Claude', 'Anthropic', 'Vercel AI Gateway', 'AI SDK', 'LLM'],
    highlights: [
      'Model kimliği AI SDK içinde anthropic/claude-fable-5 olarak kullanılıyor.',
      'Vercel sayfasında 1M context, reasoning, tool use, explicit caching, file input ve vision desteği listeleniyor.',
      'Provider tarafında Anthropic ve Google Vertex AI seçenekleri görünüyor.',
      'Vercel, modeli uzun süren, karmaşık ve asenkron görevlerde daha az kontrol noktasıyla çalışabilen Mythos-class bir model olarak konumlandırıyor.',
    ],
    sections: [
      {
        id: 'ozet',
        title: 'Haberin Kısa Özeti',
        body: "Vercel AI Gateway'in Claude Fable 5 sayfası, modeli Anthropic sağlayıcısı altında erişilebilir gösteriyor. Sayfada modelin uzun süren, karmaşık ve asenkron işleri önceki modellere göre daha az ara kontrolle yürütebildiği; güçlü güvenlik önlemleriyle gelen Mythos-class bir model olduğu belirtiliyor.",
      },
      {
        id: 'teknik',
        title: 'Teknik Notlar',
        body: 'Geliştirici tarafında en pratik detay model adının anthropic/claude-fable-5 olması. Vercel AI SDK ile streamText çağrısında bu model kimliği doğrudan kullanılabiliyor. Katalogda reasoning, tool use, explicit caching, file input ve image vision destekleri öne çıkıyor.',
      },
      {
        id: 'fiyat',
        title: 'Fiyat ve Provider Bilgisi',
        body: 'Vercel model tablosunda Anthropic ve Google Vertex AI provider seçenekleri listeleniyor. Her iki provider için de 1M context, input başına 10 dolar/M, output başına 50 dolar/M, cache read için 1 dolar/M ve cache write için 12.5 dolar/M fiyat bilgisi görünüyor.',
      },
      {
        id: 'anlam',
        title: 'Veri Mimarı İçin Anlamı',
        body: 'Bu haber özellikle ajan tabanlı yazılım üretimi, uzun bağlamlı analiz, araç kullanan otomasyonlar ve çok adımlı araştırma akışları için önemli. Vercel AI Gateway üzerinden provider yönlendirme yapılabilmesi, tek model entegrasyonunu farklı altyapılara dağıtmayı kolaylaştırıyor.',
      },
    ],
    sources: [
      {
        name: 'Anthropic — Claude Fable 5 and Claude Mythos 5',
        url: 'https://www.anthropic.com/news/claude-fable-5-mythos-5',
        note: 'Modelin resmî duyurusu, erişim ve fiyat bilgisi.',
      },
      {
        name: 'Vercel AI Gateway — Claude Fable 5',
        url: 'https://vercel.com/ai-gateway/models/claude-fable-5',
        note: 'Gateway model kimliği, sağlayıcı ve yetenek listesi.',
      },
    ],
  },
  {
    slug: 'digital-garden-baslangic-notlari',
    title: 'Digital Garden Başlangıç Notları',
    excerpt: 'Seed aşamasındaki fikirlerin ürünleşme sürecine dönüşümü.',
    contentType: 'note',
    category: 'Ürün Geliştirme',
    maturity: 'seed',
    publishedAt: '2026-06-01',
    updatedAt: '2026-06-01',
    readingTime: '2 dk',
    sourceName: 'Veri Mimarı',
    sourceUrl: '/',
    tags: ['Digital Garden', 'Ürünleşme', 'Not Sistemi'],
    highlights: [
      'Fikirleri tek seferlik yazı yerine gelişen notlar olarak ele al.',
      'Seed, growing ve evergreen ayrımıyla içerik olgunluğunu görünür yap.',
    ],
    sections: [
      {
        id: 'baslangic',
        title: 'Başlangıç',
        body: 'Digital garden yaklaşımı, tamamlanmamış fikirleri de yayınlanabilir ve geliştirilebilir bilgi parçaları olarak ele alır.',
      },
    ],
  },
]

export const fallbackGuidePosts = fallbackBlogPosts.filter((post) => post.contentType === 'guide')

export const fallbackJournalPosts = fallbackBlogPosts.filter((post) => post.contentType !== 'guide')

export function getFallbackBlogPost(slug: string) {
  return fallbackBlogPosts.find((post) => post.slug === slug)
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

export async function getBlogPostBySlug(slug: string) {
  const post = getFallbackBlogPost(slug)
  if (!post) return null

  const content = (post.sections || [])
    .map((section) => {
      const paragraphs = section.paragraphs || (section.body ? [section.body] : [])
      const paragraphHtml = paragraphs
        .map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`)
        .join('')
      return `<section><h2>${escapeHtml(section.title)}</h2>${paragraphHtml}</section>`
    })
    .join('')

  return {
    ...post,
    content,
  }
}
