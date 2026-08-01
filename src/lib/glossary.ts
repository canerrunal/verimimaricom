export type GlossaryTerm = {
  slug: string
  term: string
  english: string
  category: 'Kârlılık' | 'Reklam' | 'Müşteri' | 'Dönüşüm'
  shortDefinition: string
  explanation: string[]
  formula?: string
  formulaNote?: string
  example: string
  confusedWith: { term: string; explanation: string; slug?: string }
  relatedGuide: { label: string; href: string }
  relatedTool?: { label: string; href: string }
  source: { name: string; url: string; note: string }
  reviewedAt: string
}

const metaRoas = {
  name: 'Meta Business Help Center — Purchase ROAS',
  url: 'https://www.facebook.com/business/help/721503286071276',
  note: 'Purchase ROAS metriğinin dönüşüm değeri / reklam harcaması olarak hesaplandığını açıklar.',
}

const googleChannels = {
  name: 'Google Analytics Help — All channels performance report',
  url: 'https://support.google.com/analytics/answer/12198930?hl=en',
  note: 'Reklam maliyeti, gelir, dönüşüm başına maliyet ve ROAS kapsamlarını tanımlar.',
}

const googleEcommerce = {
  name: 'Google Analytics Help — Ecommerce metrics',
  url: 'https://support.google.com/analytics/answer/13428834?hl=en',
  note: 'Satın alma ve ürün kapsamlı e-ticaret metriklerinin farkını açıklar.',
}

const shopifyMargin = {
  name: 'Shopify — Profit margin calculation',
  url: 'https://www.shopify.com/blog/what-is-profit-margin',
  note: 'Brüt, faaliyet ve net kâr marjı kapsamlarını ve temel hesaplama yaklaşımını açıklar.',
}

const shopifyContribution = {
  name: 'Shopify — Contribution margin vs. gross margin',
  url: 'https://www.shopify.com/blog/contribution-margin-vs-gross-margin',
  note: 'Katkı payı ile brüt marjın farklı maliyet kapsamlarını açıklar.',
}

const shopifyReturns = {
  name: 'Shopify — Ecommerce returns management',
  url: 'https://www.shopify.com/blog/ecommerce-returns-management',
  note: 'İadelerin gelir, lojistik ve marj üzerindeki operasyonel etkilerini açıklar.',
}

export const glossaryTerms: GlossaryTerm[] = [
  {
    slug: 'roas', term: 'ROAS', english: 'Return on Ad Spend', category: 'Reklam',
    shortDefinition: 'Reklama atfedilen gelirin reklam harcamasına oranıdır.',
    explanation: [
      'ROAS, belirli bir reklam kampanyasının veya kanalın gelir üretme verimliliğini gösterir. 4,0 ROAS, rapor kapsamına göre her 1 TL reklam harcamasına karşılık 4 TL atfedilen gelir görüldüğü anlamına gelir.',
      'Metrik ürün maliyeti, komisyon, kargo, iade ve genel giderleri göstermez. Bu nedenle yüksek ROAS tek başına kâr kanıtı değildir. Karar verirken ürünün başabaş ROAS eşiği ve gerçekleşen katkı payı ile karşılaştırılmalıdır.',
    ],
    formula: 'ROAS = Reklama atfedilen gelir ÷ Reklam harcaması',
    formulaNote: 'Gelir ve atıf kapsamı platform, pencere ve dönüşüm modeline göre değişebilir.',
    example: '40.000 TL atfedilen gelir ve 10.000 TL reklam harcaması varsa ROAS 4,0’dır. Ürünün başabaş eşiği 4,5 ise iyi görünen bu sonuç yine zarar üretebilir.',
    confusedWith: { term: 'MER', slug: 'mer', explanation: 'ROAS kampanya veya platform atfına; MER toplam gelir ve toplam pazarlama giderine bakar.' },
    relatedGuide: { label: 'ROAS yüksekken kâr neden düşebilir?', href: '/rehberler/roas-yuksekken-kar-neden-duser' },
    relatedTool: { label: 'Başabaş ROAS Hesaplayıcı', href: '/araclar/basabas-roas-hesaplayici' },
    source: metaRoas, reviewedAt: '2026-08-01',
  },
  {
    slug: 'basabas-roas', term: 'Başabaş ROAS', english: 'Break-even ROAS', category: 'Kârlılık',
    shortDefinition: 'Reklam gelirinin siparişin değişken maliyetleriyle reklam giderini tam karşıladığı ROAS seviyesidir.',
    explanation: [
      'Başabaş ROAS şirket ortalamasından değil, ürünün reklam öncesi katkı payından türetilir. Gerçek ROAS bu eşiğin altındaysa, girdiğiniz maliyet varsayımlarına göre her ek sipariş zarar üretebilir.',
      'Başabaş noktası hedef değildir. Sabit gider, veri hatası ve istenen kâr için eşikten daha yüksek bir operasyon hedefi gerekir. Fiyat, indirim, komisyon, kargo veya iade oranı değiştiğinde hesap yenilenmelidir.',
    ],
    formula: 'Başabaş ROAS = Net satış geliri ÷ Reklam öncesi katkı payı',
    formulaNote: 'Katkı payına ürün, komisyon, ödeme, kargo, paketleme ve beklenen iade maliyeti dahil edilmelidir.',
    example: '1.000 TL net gelirli sipariş reklam öncesi 360 TL bırakıyorsa başabaş ROAS 1.000 ÷ 360 = 2,78’dir.',
    confusedWith: { term: 'Hedef ROAS', explanation: 'Başabaş ROAS sıfır kâr eşiğidir; hedef ROAS korunmak istenen kâr ve güvenlik payını da içerir.' },
    relatedGuide: { label: 'Başabaş ROAS nasıl hesaplanır?', href: '/rehberler/basabas-roas-nasil-hesaplanir' },
    relatedTool: { label: 'Başabaş ROAS Hesaplayıcı', href: '/araclar/basabas-roas-hesaplayici' },
    source: metaRoas, reviewedAt: '2026-08-01',
  },
  {
    slug: 'mer', term: 'MER', english: 'Marketing Efficiency Ratio', category: 'Reklam',
    shortDefinition: 'Toplam gelirin toplam pazarlama harcamasına oranıdır.',
    explanation: [
      'MER, kanalların ayrı ayrı kendilerine yazdığı geliri toplamak yerine şirket düzeyinde bir verimlilik görünümü verir. 5,0 MER, her 1 TL pazarlama giderine karşılık 5 TL gelir üretildiğini gösterir.',
      'Standart bir muhasebe metriği değildir. Gelirin net veya brüt, giderin yalnız medya veya ajans ve kreatif dahil tam yüklü olup olmadığı veri sözlüğünde belirtilmelidir. Tek başına kârlılık göstermez.',
    ],
    formula: 'MER = Toplam dönem geliri ÷ Toplam pazarlama harcaması',
    formulaNote: 'Gelir ve gider aynı dönem, para birimi ve kapsamla alınmalıdır.',
    example: '3 milyon TL net gelir ve 600 bin TL tam yüklü pazarlama gideri varsa MER 5,0’dır.',
    confusedWith: { term: 'ROAS', slug: 'roas', explanation: 'ROAS atfedilen kampanya gelirini; MER bütün şirket gelirini ve pazarlama giderini kullanır.' },
    relatedGuide: { label: 'MER nedir, nasıl hesaplanır?', href: '/rehberler/mer-nedir-nasil-hesaplanir' },
    source: googleChannels, reviewedAt: '2026-08-01',
  },
  {
    slug: 'poas', term: 'POAS', english: 'Profit on Ad Spend', category: 'Reklam',
    shortDefinition: 'Reklama atfedilen kârın reklam harcamasına oranıdır.',
    explanation: [
      'POAS, ROAS’ın gelir yerine kâr odaklı yorumudur. Ama “kâr” kelimesinin brüt kâr, reklam öncesi katkı veya net kâr anlamına gelip gelmediği açıkça yazılmalıdır.',
      'Ürün karması değiştiğinde ROAS aynı kalırken POAS düşebilir. Bu nedenle düşük ve yüksek marjlı ürünleri aynı kampanyada değerlendiren ekipler için daha açıklayıcı olabilir. Veri kapsamı belirsizse karşılaştırma güvenilir değildir.',
    ],
    formula: 'POAS = Reklama atfedilen kâr ÷ Reklam harcaması',
    formulaNote: 'Kâr katmanını rapor başlığında belirtin: brüt kâr, katkı veya net kâr.',
    example: '10.000 TL reklam harcaması 18.000 TL reklam sonrası katkı ürettiyse POAS 1,8’dir.',
    confusedWith: { term: 'ROAS', slug: 'roas', explanation: 'ROAS geliri, POAS tanımlanmış kâr katmanını reklam maliyetine böler.' },
    relatedGuide: { label: 'ROAS yüksekken kâr neden düşebilir?', href: '/rehberler/roas-yuksekken-kar-neden-duser' },
    source: shopifyContribution, reviewedAt: '2026-08-01',
  },
  {
    slug: 'cpa', term: 'CPA', english: 'Cost per Action / Acquisition', category: 'Reklam',
    shortDefinition: 'Tanımlanmış bir aksiyon veya dönüşüm başına düşen reklam maliyetidir.',
    explanation: [
      'CPA’daki aksiyon sipariş, form, kayıt veya başka bir dönüşüm olabilir. Rapor başlığında aksiyon açık değilse farklı ekipler aynı kısaltmayla farklı sonuçları tartışabilir.',
      'E-ticarette sipariş CPA’sı ürün ekonomisiyle karşılaştırılmalıdır. Reklam öncesi katkı payı başabaş CPA’yı; korunmak istenen kâr çıkarıldıktan kalan tutar hedef CPA’yı verir.',
    ],
    formula: 'CPA = Reklam harcaması ÷ Tanımlanmış aksiyon sayısı',
    formulaNote: 'Platform dönüşüm sayısını sipariş veya CRM sistemiyle mutabık hale getirin.',
    example: '20.000 TL harcama 100 sipariş üretmişse sipariş CPA’sı 200 TL’dir.',
    confusedWith: { term: 'CAC', slug: 'cac', explanation: 'CPA herhangi bir aksiyonu; CAC yalnız yeni müşteri edinimini ölçer.' },
    relatedGuide: { label: 'Maksimum CPA nasıl hesaplanır?', href: '/rehberler/maksimum-cpa-nasil-hesaplanir' },
    relatedTool: { label: 'Başabaş ROAS ve CPA Hesaplayıcı', href: '/araclar/basabas-roas-hesaplayici' },
    source: googleChannels, reviewedAt: '2026-08-01',
  },
  {
    slug: 'cac', term: 'CAC', english: 'Customer Acquisition Cost', category: 'Müşteri',
    shortDefinition: 'Belirli bir dönemde kazanılan her yeni müşteri için yapılan edinme harcamasıdır.',
    explanation: [
      'CAC, yalnız sipariş sayısını değil yeni müşteri sayısını kullanır. Medya CAC yalnız reklam harcamasını; tam yüklü CAC ajans, kreatif, satış ve ilgili araç maliyetlerini de kapsayabilir.',
      'Tekrar müşteri siparişleri platform tarafından reklama atfedilebildiği için sipariş CPA genellikle CAC ile aynı değildir. CAC, ilk sipariş katkısı, müşteri yaşam boyu katkısı ve geri ödeme süresiyle birlikte okunmalıdır.',
    ],
    formula: 'CAC = Toplam müşteri edinme gideri ÷ Kazanılan yeni müşteri sayısı',
    formulaNote: 'Yeni müşteri tanımı ile gider kapsamı veri sözlüğünde sabitlenmelidir.',
    example: '150.000 TL edinme gideriyle 500 yeni müşteri kazanıldıysa CAC 300 TL’dir.',
    confusedWith: { term: 'CPA', slug: 'cpa', explanation: 'Her satın alma yeni müşteriden gelmediği için sipariş CPA’sı CAC’dan farklı olabilir.' },
    relatedGuide: { label: 'Maksimum CPA nasıl hesaplanır?', href: '/rehberler/maksimum-cpa-nasil-hesaplanir' },
    source: googleChannels, reviewedAt: '2026-08-01',
  },
  {
    slug: 'katki-payi', term: 'Katkı Payı', english: 'Contribution Margin', category: 'Kârlılık',
    shortDefinition: 'Net satıştan değişken giderler çıkarıldıktan sonra sabit gider ve kâr için kalan tutardır.',
    explanation: [
      'Katkı payı ürün, sipariş, kanal veya toplam şirket düzeyinde hesaplanabilir. Tutar TL, oran ise katkı payının net satışa yüzdesi olarak gösterilir.',
      'Pozitif katkı şirketin mutlaka net kâr ettiği anlamına gelmez; toplam katkının sabit giderleri de karşılaması gerekir. Negatif katkı ise her yeni satışın zararı büyütebileceğine işaret eder.',
    ],
    formula: 'Katkı payı = Net satış − Toplam değişken giderler',
    formulaNote: 'Katkı payı oranı = Katkı payı ÷ Net satış × 100.',
    example: '1.200 TL net satış ve 1.000 TL değişken gider varsa katkı payı 200 TL, katkı oranı %16,7’dir.',
    confusedWith: { term: 'Net kâr', slug: 'net-kar', explanation: 'Katkı payından sabit giderler henüz çıkarılmamıştır; net kâr tüm giderler sonrasıdır.' },
    relatedGuide: { label: 'Katkı payı nedir?', href: '/rehberler/katki-payi-nedir' },
    relatedTool: { label: 'Kâr Marjı Hesaplayıcı', href: '/araclar/kar-marji-hesaplayici' },
    source: shopifyContribution, reviewedAt: '2026-08-01',
  },
  {
    slug: 'brut-kar', term: 'Brüt Kâr', english: 'Gross Profit', category: 'Kârlılık',
    shortDefinition: 'Net satıştan satılan malın doğrudan maliyeti çıkarıldıktan sonra kalan tutardır.',
    explanation: [
      'Brüt kâr ürünün temel fiyat ve üretim/edinme ekonomisini gösterir. Komisyon, kargo, reklam, personel ve genel giderler çoğu brüt kâr tanımında henüz çıkarılmamıştır.',
      'Bu nedenle brüt kârı “kasada kalan para” gibi yorumlamak hatalıdır. E-ticaret kararında katkı payı ve net kâr katmanları ayrıca izlenmelidir.',
    ],
    formula: 'Brüt kâr = Net satış − Satılan malın maliyeti',
    formulaNote: 'Brüt kâr marjı = Brüt kâr ÷ Net satış × 100.',
    example: '800 TL net satış ve 360 TL ürün maliyeti varsa brüt kâr 440 TL, brüt marj %55’tir.',
    confusedWith: { term: 'Katkı payı', slug: 'katki-payi', explanation: 'Katkı payı komisyon ve kargo gibi diğer değişken giderleri de kapsayabilir.' },
    relatedGuide: { label: 'E-ticaret kâr marjı nasıl hesaplanır?', href: '/rehberler/e-ticaret-kar-marji-nasil-hesaplanir' },
    relatedTool: { label: 'Kâr Marjı Hesaplayıcı', href: '/araclar/kar-marji-hesaplayici' },
    source: shopifyMargin, reviewedAt: '2026-08-01',
  },
  {
    slug: 'net-kar', term: 'Net Kâr', english: 'Net Profit', category: 'Kârlılık',
    shortDefinition: 'Dönem gelirinden faaliyet, finansman, vergi ve diğer bütün giderler çıkarıldıktan sonra kalan sonuçtur.',
    explanation: [
      'Net kâr şirketin belirli bir dönem sonunda gerçekten kâr mı zarar mı ürettiğini gösteren en alt sonuç katmanıdır. Ürün veya sipariş düzeyindeki katkı payıyla aynı değildir.',
      'Operasyon kararlarında ürün katkısı daha hızlı sinyal verirken şirket sağlığı için toplam net kâr gerekir. Muhasebe kapsamı, tahakkuk ve vergi uygulamaları uzman doğrulaması gerektirir.',
    ],
    formula: 'Net kâr = Toplam gelir − Toplam giderler',
    formulaNote: 'Net kâr marjı = Net kâr ÷ Net satış × 100.',
    example: 'Aylık 3 milyon TL net satış ve 2,7 milyon TL toplam gider varsa net kâr 300 bin TL, net marj %10’dur.',
    confusedWith: { term: 'Katkı payı', slug: 'katki-payi', explanation: 'Katkı payı sabit gider öncesi birim ekonomiyi; net kâr bütün şirket sonucunu gösterir.' },
    relatedGuide: { label: 'E-ticaret kâr marjı nasıl hesaplanır?', href: '/rehberler/e-ticaret-kar-marji-nasil-hesaplanir' },
    source: shopifyMargin, reviewedAt: '2026-08-01',
  },
  {
    slug: 'kar-marji', term: 'Kâr Marjı', english: 'Profit Margin', category: 'Kârlılık',
    shortDefinition: 'Seçilen kâr katmanının net satış gelirine oranıdır.',
    explanation: [
      'Kâr marjı brüt, katkı, faaliyet veya net kâr üzerinden hesaplanabilir. “Marjımız %30” ifadesi hangi katmanın kullanıldığını açıklamıyorsa eksiktir.',
      'Marj, kârın satış fiyatına oranıdır. Maliyet üzerine eklenen yüzde olan markup/kâr oranıyla aynı değildir. Fiyat ve indirim kararlarında hem TL katkı hem yüzde marj birlikte izlenmelidir.',
    ],
    formula: 'Kâr marjı (%) = Kâr ÷ Net satış × 100',
    formulaNote: 'Kârın brüt, katkı veya net olduğunu formül başlığında belirtin.',
    example: '150 TL satış fiyatı ve 100 TL maliyette kâr 50 TL’dir; marj %33,3, maliyet üzerine eklenen oran ise %50’dir.',
    confusedWith: { term: 'Kâr oranı / markup', explanation: 'Markup kârı maliyete, marj kârı satış fiyatına böler.' },
    relatedGuide: { label: 'E-ticaret kâr marjı nasıl hesaplanır?', href: '/rehberler/e-ticaret-kar-marji-nasil-hesaplanir' },
    relatedTool: { label: 'Kâr Marjı Hesaplayıcı', href: '/araclar/kar-marji-hesaplayici' },
    source: shopifyMargin, reviewedAt: '2026-08-01',
  },
  {
    slug: 'degisken-gider', term: 'Değişken Gider', english: 'Variable Cost', category: 'Kârlılık',
    shortDefinition: 'Satış veya sipariş hacmi arttıkça toplamı değişen giderdir.',
    explanation: [
      'Ürün maliyeti, komisyon, ödeme kesintisi, kargo, paketleme ve bazı reklam giderleri e-ticarette yaygın değişken giderlerdir. Sınıflandırma iş modeline ve karar birimine göre değişebilir.',
      'Değişken giderler katkı payını ve başabaş ROAS’ı doğrudan belirler. Ortalama yerine ürün, kanal ve sipariş türüne uygun gerçek oran veya tutar kullanılmalıdır.',
    ],
    formula: 'Toplam değişken gider = Birim değişken gider × Satış adedi',
    formulaNote: 'Oransal ve sabit tutarlı sipariş giderlerini ayrı modellemek daha doğru sonuç verir.',
    example: 'Sipariş başına 90 TL kargo gideri 1.000 siparişte toplam 90.000 TL değişken gider oluşturur.',
    confusedWith: { term: 'Sabit gider', slug: 'sabit-gider', explanation: 'Sabit gider kısa vadede sipariş adediyle doğrudan değişmez.' },
    relatedGuide: { label: 'Katkı payı nedir?', href: '/rehberler/katki-payi-nedir' },
    relatedTool: { label: 'Kâr Marjı Hesaplayıcı', href: '/araclar/kar-marji-hesaplayici' },
    source: shopifyContribution, reviewedAt: '2026-08-01',
  },
  {
    slug: 'sabit-gider', term: 'Sabit Gider', english: 'Fixed Cost', category: 'Kârlılık',
    shortDefinition: 'Belirli kapasite ve zaman aralığında satış adediyle doğrudan değişmeyen giderdir.',
    explanation: [
      'Kira, çekirdek personel, bazı yazılım abonelikleri ve genel yönetim giderleri kısa vadede sabit kabul edilebilir. Daha uzun dönemde kapasite arttıkça basamaklı biçimde değişebilir.',
      'Sipariş katkı payı pozitif olsa bile toplam katkı sabit giderleri karşılamıyorsa şirket zarar eder. Başabaş sipariş adedi, toplam sabit giderin birim katkı payına bölünmesiyle bulunabilir.',
    ],
    formula: 'Başabaş satış adedi = Toplam sabit gider ÷ Birim katkı payı',
    formulaNote: 'Ürün karması varsa ağırlıklı ortalama katkı kullanılmalıdır.',
    example: 'Aylık sabit gider 200.000 TL ve ortalama sipariş katkısı 200 TL ise başabaş için yaklaşık 1.000 sipariş gerekir.',
    confusedWith: { term: 'Değişken gider', slug: 'degisken-gider', explanation: 'Değişken gider satış hacmiyle birlikte artar veya azalır.' },
    relatedGuide: { label: 'Katkı payı nedir?', href: '/rehberler/katki-payi-nedir' },
    source: shopifyContribution, reviewedAt: '2026-08-01',
  },
  {
    slug: 'iade-orani', term: 'İade Oranı', english: 'Return Rate', category: 'Dönüşüm',
    shortDefinition: 'Belirli bir kohortta iade edilen sipariş veya ürünlerin toplam teslimata oranıdır.',
    explanation: [
      'İade oranı sipariş, ürün adedi veya gelir üzerinden hesaplanabilir; bu üç kapsam farklı sonuç üretir. Ürün, kategori, kanal ve kampanya kırılımında izlenmesi daha açıklayıcıdır.',
      'Kârlılık hesabında yalnız kaybedilen gelir değil, ters kargo, işlem, geri dönmeyen ücret ve ürün değer kaybı da ele alınmalıdır. Kohort tamamlanmadan ölçülen oran geçici olarak düşük görünebilir.',
    ],
    formula: 'Sipariş iade oranı = İade edilen sipariş ÷ Teslim edilen sipariş × 100',
    formulaNote: 'Pay ve paydada aynı kohortu ve tamamlanma penceresini kullanın.',
    example: 'Tamamlanmış 1.000 teslimat kohortunda 120 sipariş iade edildiyse sipariş iade oranı %12’dir.',
    confusedWith: { term: 'İptal oranı', explanation: 'İptal çoğunlukla sevkiyat öncesi; iade teslimat sonrası oluşur ve ters lojistik yaratır.' },
    relatedGuide: { label: 'İade oranı kârlılığa nasıl eklenir?', href: '/rehberler/iade-orani-karliliga-nasil-eklenir' },
    relatedTool: { label: 'Başabaş ROAS Hesaplayıcı', href: '/araclar/basabas-roas-hesaplayici' },
    source: shopifyReturns, reviewedAt: '2026-08-01',
  },
  {
    slug: 'donusum-orani', term: 'Dönüşüm Oranı', english: 'Conversion Rate — CVR', category: 'Dönüşüm',
    shortDefinition: 'Tanımlanan dönüşümü tamamlayan kullanıcı veya oturumların ilgili trafiğe oranıdır.',
    explanation: [
      'E-ticarette dönüşüm genellikle satın alma olsa da sepete ekleme, ödeme başlatma veya form tamamlama için de CVR hesaplanabilir. Paydanın kullanıcı, oturum veya tıklama olması sonucu değiştirir.',
      'Dönüşüm oranı cihaz, kanal, yeni/tekrar müşteri ve ürün türüne göre ayrılmalıdır. Oran yükselirken düşük marjlı ürün karması büyüyorsa kâr aynı ölçüde artmayabilir.',
    ],
    formula: 'CVR = Dönüşüm sayısı ÷ Seçilen trafik birimi × 100',
    formulaNote: 'Dönüşüm olayı ve payda türünü rapor başlığında açıkça belirtin.',
    example: '10.000 oturumda 250 satın alma gerçekleştiyse oturum bazlı satın alma dönüşüm oranı %2,5’tir.',
    confusedWith: { term: 'Tıklama oranı — CTR', explanation: 'CTR reklamı tıklayanların gösterime oranıdır; CVR tıklama veya ziyaret sonrası dönüşümü ölçer.' },
    relatedGuide: { label: 'E-ticaret dashboardunda takip edilecek metrikler', href: '/rehberler/e-ticaret-dashboard-metrikleri' },
    source: googleEcommerce, reviewedAt: '2026-08-01',
  },
  {
    slug: 'ortalama-sepet-tutari', term: 'Ortalama Sepet Tutarı', english: 'Average Order Value — AOV', category: 'Dönüşüm',
    shortDefinition: 'Belirli bir dönemdeki sipariş başına ortalama gelir tutarıdır.',
    explanation: [
      'AOV, toplam sipariş gelirini sipariş sayısına böler. Brüt veya net gelir, iptal ve iade kapsamı açıkça belirtilmelidir. Büyük tekil siparişler ortalamayı yükseltebildiği için medyan sepet de yardımcı olabilir.',
      'Ücretsiz kargo eşiği, bundle ve cross-sell kararlarında kullanılır. Ancak sepet tutarı artarken ürün karması düşük marja kayıyorsa toplam katkı artmayabilir.',
    ],
    formula: 'AOV = Toplam sipariş geliri ÷ Sipariş sayısı',
    formulaNote: 'Gelir kapsamını ve sipariş durumlarını dönemler arasında aynı tutun.',
    example: '800.000 TL net sipariş geliri ve 1.000 tamamlanmış sipariş varsa AOV 800 TL’dir.',
    confusedWith: { term: 'Müşteri başına gelir', explanation: 'AOV sipariş sayısını; müşteri başına gelir benzersiz müşteri sayısını payda olarak kullanır.' },
    relatedGuide: { label: 'E-ticaret dashboardunda takip edilecek metrikler', href: '/rehberler/e-ticaret-dashboard-metrikleri' },
    source: googleEcommerce, reviewedAt: '2026-08-01',
  },
]

export const glossaryCategories = ['Tümü', 'Kârlılık', 'Reklam', 'Müşteri', 'Dönüşüm'] as const

export function getGlossaryTerm(slug: string) {
  return glossaryTerms.find((item) => item.slug === slug)
}

export function getRelatedTerms(item: GlossaryTerm) {
  const sameCategory = glossaryTerms.filter((term) => term.category === item.category && term.slug !== item.slug)
  const confused = item.confusedWith.slug ? getGlossaryTerm(item.confusedWith.slug) : undefined
  return [confused, ...sameCategory].filter((term, index, all): term is GlossaryTerm =>
    Boolean(term) && all.findIndex((candidate) => candidate?.slug === term?.slug) === index
  ).slice(0, 3)
}
