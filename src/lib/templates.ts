export type ResourceTemplate = {
  slug: string
  title: string
  description: string
  category: string
  format: string
  updatedAt: string
  reviewDueAt: string
  downloadHref: string
  primaryOutcome: string
  audience: string
  sheets: Array<{ name: string; purpose: string; fields: string[] }>
  steps: Array<{ title: string; description: string }>
  checks: string[]
  metrics: Array<{ name: string; definition: string; decision: string }>
  relatedGuide: { title: string; href: string }
  relatedTool: { title: string; href: string }
}

export const resourceTemplates: ResourceTemplate[] = [
  {
    slug: 'haftalik-reklam-performans-raporu',
    title: 'Haftalık Reklam Performans Raporu',
    description:
      'Meta ve Google Ads sonuçlarını hedef, önceki dönem, veri kalitesi ve sahipli aksiyonlarla aynı tabloda yönetin.',
    category: 'Reklam Analitiği',
    format: 'CSV · Excel / Google Sheets',
    updatedAt: '2026-08-02',
    reviewDueAt: '2026-11-02',
    downloadHref: '/sablonlar/haftalik-reklam-performans-raporu.csv',
    primaryOutcome:
      'Metrik dökümünü, karar ve sorumlu içeren haftalık yönetim raporuna dönüştürür.',
    audience: 'E-ticaret yöneticileri, performans pazarlama ekipleri ve ajans müşterileri',
    sheets: [
      {
        name: 'Haftalık özet',
        purpose: 'Kanal sonuçlarını hedef ve önceki dönemle aynı satırda karşılaştırır.',
        fields: ['Harcama', 'Gelir', 'ROAS', 'CPA', 'MER', 'Yeni müşteri payı'],
      },
      {
        name: 'Teşhis',
        purpose: 'Değişimin sürücüsünü veri, hipotez ve güven düzeyiyle kaydeder.',
        fields: ['Sinyal', 'Kanıt', 'Güven düzeyi', 'Risk'],
      },
      {
        name: 'Aksiyon planı',
        purpose: 'Kararı sorumlu, termin ve başarı ölçütüne bağlar.',
        fields: ['Aksiyon', 'Sorumlu', 'Termin', 'Başarı ölçütü', 'Durum'],
      },
    ],
    steps: [
      {
        title: 'Tanımları sabitleyin',
        description:
          'Rapor haftasını, saat dilimini, para birimini, gelir kapsamını ve atıf penceresini üst bilgiye yazın.',
      },
      {
        title: 'Veriyi uzlaştırın',
        description:
          'Platform gelirini mağaza geliriyle eşitlemeye çalışmayın; farkı ve olası çifte atfı ayrı not edin.',
      },
      {
        title: 'Değişimi açıklayın',
        description:
          'Yalnız sonucu değil, sonucu oluşturan CPM, CTR, CVR, sepet ve ürün karması sinyallerini yazın.',
      },
      {
        title: 'Kararı sahiplenin',
        description:
          'Her aksiyona tek sorumlu, gerçekçi termin ve gelecek hafta kontrol edilecek başarı ölçütü ekleyin.',
      },
    ],
    checks: [
      'Karşılaştırılan haftalar aynı gün sayısını ve tamamlanmış veri penceresini kapsıyor.',
      'Platform ROAS ile şirket düzeyi MER aynı metrik gibi sunulmuyor.',
      'Gelir ve harcama aynı para biriminde; vergi ve iade kapsamı belgelenmiş.',
      'Yüzde değişimler düşük hacimli sonuçlarda mutlak değerle birlikte gösteriliyor.',
      'Neden iddiaları kanıt, hipotez veya bilinmiyor olarak açıkça ayrılıyor.',
      'Her aksiyonun sorumlusu, termini ve ölçülebilir başarı koşulu var.',
    ],
    metrics: [
      {
        name: 'ROAS',
        definition: 'Atfedilen reklam geliri ÷ reklam harcaması',
        decision: 'Kampanya ve kanal içi verimlilik teşhisi',
      },
      {
        name: 'MER',
        definition: 'Toplam mağaza geliri ÷ toplam pazarlama harcaması',
        decision: 'Şirket düzeyi toplam pazarlama verimliliği',
      },
      {
        name: 'CPA',
        definition: 'Reklam harcaması ÷ atfedilen sipariş',
        decision: 'Sipariş edinme maliyetini ekonomik eşikle kıyaslama',
      },
      {
        name: 'CVR',
        definition: 'Sipariş ÷ oturum veya tıklama',
        decision: 'Trafiğin satışa dönüşme kalitesini teşhis etme',
      },
    ],
    relatedGuide: {
      title: 'Haftalık reklam raporu nasıl hazırlanır?',
      href: '/rehberler/haftalik-reklam-raporu-nasil-hazirlanir',
    },
    relatedTool: {
      title: 'Başabaş ROAS Hesaplayıcı',
      href: '/araclar/basabas-roas-hesaplayici',
    },
  },
  {
    slug: 'kampanya-oncesi-marj-kontrol-listesi',
    title: 'Kampanya Öncesi Marj Kontrol Listesi',
    description:
      'İndirim, komisyon, kargo, iade ve reklam maliyetini kampanya yayına girmeden önce tek satırda doğrulayın.',
    category: 'E-Ticaret Kârlılığı',
    format: 'CSV · Excel / Google Sheets',
    updatedAt: '2026-08-02',
    reviewDueAt: '2026-11-02',
    downloadHref: '/sablonlar/kampanya-oncesi-marj-kontrol-listesi.csv',
    primaryOutcome:
      'Kampanya cirosu hedeflenirken sipariş başına katkının yanlışlıkla eritilmesini önler.',
    audience: 'E-ticaret, kategori, finans ve performans pazarlama ekipleri',
    sheets: [
      {
        name: 'Ürün kontrolü',
        purpose: 'Her SKU için kampanya sonrası birim ekonomisini görünür kılar.',
        fields: ['Liste fiyatı', 'İndirim', 'Maliyet', 'Komisyon', 'Kargo', 'İade', 'Maksimum CPA'],
      },
    ],
    steps: [
      {
        title: 'Ürünleri ekleyin',
        description: 'Kampanyaya girecek SKU ve gerçek liste fiyatlarını yazın.',
      },
      {
        title: 'Maliyetleri tamamlayın',
        description: 'Komisyon, kargo ve beklenen iade etkisini ürün bazında girin.',
      },
      {
        title: 'Eşiği hesaplayın',
        description: 'İndirim sonrası katkı ile maksimum reklam maliyetini karşılaştırın.',
      },
      {
        title: 'Onay kaydı oluşturun',
        description: 'Finans ve pazarlama onayını durum alanında belgeleyin.',
      },
    ],
    checks: [
      'İndirim oranı etiket fiyatına değil gerçek satış fiyatına uygulanıyor.',
      'Komisyon matrahı ve vergi kapsamı doğrulandı.',
      'Kargo katkısı ve ücretsiz kargo eşiği hesaba katıldı.',
      'İade etkisi yalnız iade oranı değil, geri kazanılamayan maliyetle ölçüldü.',
      'Maksimum CPA hedefi kampanya bütçesine bağlandı.',
    ],
    metrics: [
      {
        name: 'Katkı',
        definition: 'Net gelir − değişken maliyetler',
        decision: 'Siparişin sabit gider ve kâra ne bıraktığını görme',
      },
      {
        name: 'Maksimum CPA',
        definition: 'Reklam öncesi katkı − hedef katkı',
        decision: 'Reklama ayrılabilecek sipariş başı üst sınır',
      },
      {
        name: 'Başabaş ROAS',
        definition: '1 ÷ reklam öncesi katkı marjı',
        decision: 'Kampanya ROAS alt sınırını belirleme',
      },
    ],
    relatedGuide: {
      title: 'İndirim kârlılığı nasıl hesaplanır?',
      href: '/rehberler/indirim-karliligi-nasil-hesaplanir',
    },
    relatedTool: {
      title: 'İndirim Kârlılık Simülatörü',
      href: '/araclar/indirim-karlilik-simulatoru',
    },
  },
  {
    slug: 'utm-isimlendirme-standardi',
    title: 'UTM İsimlendirme Standardı',
    description:
      'Kaynak, kanal, kampanya, içerik ve terim alanlarını ekip genelinde tutarlı hale getiren kayıt tablosu.',
    category: 'Veri ve Raporlama',
    format: 'CSV · Excel / Google Sheets',
    updatedAt: '2026-08-02',
    reviewDueAt: '2026-11-02',
    downloadHref: '/sablonlar/utm-isimlendirme-standardi.csv',
    primaryOutcome:
      'Aynı kanalın farklı yazımlarla bölünmesini ve raporlama sınıflandırmasının bozulmasını önler.',
    audience: 'Pazarlama, içerik, ajans ve analitik ekipleri',
    sheets: [
      {
        name: 'UTM kayıt defteri',
        purpose: 'Her bağlantının sahibi, amacı ve standart parametrelerini kaydeder.',
        fields: ['URL', 'Source', 'Medium', 'Campaign', 'Content', 'Term', 'Sahip'],
      },
    ],
    steps: [
      {
        title: 'Sözlüğü belirleyin',
        description: 'Source ve medium için izin verilen küçük harfli değerleri tanımlayın.',
      },
      {
        title: 'Kampanya kuralı kurun',
        description: 'Pazar, hedef, tarih ve teklif bilgisinin sırasını sabitleyin.',
      },
      {
        title: 'Bağlantıyı kaydedin',
        description: 'Yayınlanacak her URL’yi sahip ve oluşturma tarihiyle kayıt altına alın.',
      },
      {
        title: 'Raporu denetleyin',
        description:
          'Yeni kaynak/kanal değerlerini haftalık olarak standart sözlükle karşılaştırın.',
      },
    ],
    checks: [
      'Tüm parametreler küçük harf ve Türkçe karakter içermeyen değerler kullanıyor.',
      'Boşluk yerine tire kullanımı ekip genelinde tutarlı.',
      'utm_source platformu, utm_medium trafik türünü ifade ediyor.',
      'Kişisel veri veya hassas müşteri bilgisi parametrelere yazılmıyor.',
      'Bağlantı yayına alınmadan önce açılış sayfası ve yönlendirme test edildi.',
    ],
    metrics: [
      {
        name: 'utm_source',
        definition: 'Trafiği gönderen platform veya yayıncı',
        decision: 'Kaynak düzeyi raporlama',
      },
      {
        name: 'utm_medium',
        definition: 'Trafik edinme yöntemi',
        decision: 'Ücretli, organik, e-posta gibi kanal gruplama',
      },
      {
        name: 'utm_campaign',
        definition: 'Ortak kampanya kimliği',
        decision: 'Kanallar arası kampanya sonucunu birleştirme',
      },
    ],
    relatedGuide: {
      title: 'E-ticaret dashboard metrikleri',
      href: '/rehberler/e-ticaret-dashboard-metrikleri',
    },
    relatedTool: {
      title: 'E-Ticaret Strateji ve Pazarlama Analizi',
      href: '/araclar/e-ticaret-strateji-pazarlama-analizi',
    },
  },
  {
    slug: 'ai-merchant-feed-alan-sozlugu',
    title: 'AI Merchant Feed Alan Sözlüğü',
    description:
      'Google Merchant, Product/Offer ve OpenAI ürün feed alanlarını tek ürün kimliği, sahip ve doğrulama akışında eşleyin.',
    category: 'AI & Ürün Verisi',
    format: 'CSV · Excel / Google Sheets',
    updatedAt: '2026-08-02',
    reviewDueAt: '2026-09-15',
    downloadHref: '/sablonlar/ai-merchant-feed-alan-sozlugu.csv',
    primaryOutcome:
      'Ürün sayfası, structured data, merchant feed ve checkout arasında aynı ticari gerçeği taşıyan bir alan sözlüğü kurar.',
    audience: 'E-ticaret, ürün, veri, SEO ve pazarlama operasyon ekipleri',
    sheets: [
      {
        name: 'Alan sözlüğü',
        purpose:
          'Kaynak sistem alanlarını Google ve OpenAI hedef alanlarıyla eşler; zorunluluk ve sahiplik görünür olur.',
        fields: [
          'Ürün kimliği',
          'Kaynak alanı',
          'Google alanı',
          'OpenAI alanı',
          'Örnek değer',
          'Sahip',
        ],
      },
      {
        name: 'Doğrulama kuyruğu',
        purpose:
          'Eksik, uyuşmayan veya güncelliği geçmiş alanları yayın öncesi kapatılabilir işlere dönüştürür.',
        fields: ['SKU', 'Sorun', 'Kritiklik', 'Kaynak', 'Son doğrulama', 'Termin', 'Durum'],
      },
    ],
    steps: [
      {
        title: 'Kalıcı kimliği seçin',
        description:
          'Her varyant için değişmeyen SKU/item_id kullanın; grup ve varyant ilişkisini ayrıca kaydedin.',
      },
      {
        title: 'Kaynak alanı eşleyin',
        description:
          'PIM, ERP veya mağaza kaynağındaki alanı Google Product/Offer ve OpenAI feed karşılığıyla aynı satıra yazın.',
      },
      {
        title: 'Görünen değerle karşılaştırın',
        description:
          'Başlık, fiyat, para birimi, stok, URL, teslimat ve iade bilgisinin ürün sayfasında da aynı olduğunu kontrol edin.',
      },
      {
        title: 'Yayın kapısını işletin',
        description:
          'Kritik eksik veya uyuşmazlıkları doğrulama kuyruğuna alın; kapanmadan feed ve checkout yayınına izin vermeyin.',
      },
    ],
    checks: [
      'item_id/SKU her varyant için kalıcı ve tekil; grup kimliği ilişkili varyantlarda sabit.',
      'title, description, url, brand ve image_url alanları ürün sayfasıyla aynı kaynaktan üretiliyor.',
      'price, currency, availability ve sale tarihleri sayfa, structured data, feed ve checkout arasında eşleşiyor.',
      'Google Product/Offer alanları Rich Results Test; feed alanları platform teşhisiyle doğrulanıyor.',
      'is_eligible_search=true olmadan checkout uygunluğu açılmıyor; satıcı politika URL’leri erişilebilir.',
      'Her kritik alanın sahibi, son doğrulama tarihi ve düzeltme süresi kayıtlı.',
    ],
    metrics: [
      {
        name: 'Alan kapsama',
        definition: 'Doğrulanmış zorunlu hedef alan sayısı ÷ toplam zorunlu hedef alan sayısı',
        decision: 'Feed yayına hazır mı, hangi alanlar öncelikli?',
      },
      {
        name: 'Parite oranı',
        definition:
          'Sayfa, structured data, feed ve checkout değeri eşleşen kritik alanlar ÷ kontrol edilen kritik alanlar',
        decision: 'Tek doğruluk kaynağı ticari gerçekliği koruyor mu?',
      },
      {
        name: 'Kritik açık yaşı',
        definition: 'Kritik sorunun ilk tespitinden bugüne geçen gün sayısı',
        decision: 'Yayın kapısı hangi veri borcunu önce durdurmalı?',
      },
      {
        name: 'Güncelleme SLA uyumu',
        definition: 'Tanımlı süre içinde tamamlanan feed güncellemeleri ÷ toplam güncelleme',
        decision: 'Fiyat ve stok değişiklikleri yüzeylere zamanında ulaşıyor mu?',
      },
    ],
    relatedGuide: {
      title: 'AI Alışveriş Ajanlarına Hazırlık rehberini aç',
      href: '/rehberler/ai-alisveris-ajanlarina-hazirlik',
    },
    relatedTool: {
      title: 'AI Alışveriş Görünürlük Denetimi',
      href: '/araclar/ai-alisveris-gorunurluk-denetimi',
    },
  },
]

export function getResourceTemplate(slug: string) {
  return resourceTemplates.find((item) => item.slug === slug)
}
