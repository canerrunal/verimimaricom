export type AnnouncementStat = {
  label: string
  value: string
  detail: string
}

export type AnnouncementSection = {
  id: string
  heading: string
  paragraphs?: string[]
  bullets?: string[]
}

export type Announcement = {
  slug: string
  addedOrder: number
  eyebrow: string
  title: string
  excerpt: string
  category: string
  publishedAt: string
  updatedAt: string
  readingTime: string
  image: string
  imageAlt: string
  source: string
  sourceNote: string
  stats: AnnouncementStat[]
  sections: AnnouncementSection[]
  nextStep?: {
    eyebrow: string
    title: string
    body: string
    ctaLabel: string
    ctaHref: string
  }
}

export const announcements: Announcement[] = [
  {
    slug: 'trendyol-elektronik-ticaret-aracilik-sozlesmesi-degisiklik-protokolu-2026',
    addedOrder: 1,
    eyebrow: 'TRENDYOL DUYURULARI / 9 AĞUSTOS 2026',
    title: 'Trendyol sözleşmesi değişti: operasyon artık günlük takip istiyor.',
    excerpt:
      'İade sayaçlarından ürün güvenliğine, hesap yaptırımlarından komisyon ve kargo maliyetlerine kadar satıcının kontrol etmesi gereken başlıkları tek notta topladık.',
    category: 'Trendyol Duyuruları',
    publishedAt: '2026-08-09',
    updatedAt: '2026-08-09',
    readingTime: '9 dk',
    image: '/duyurular/trendyol-sozlesme-degisiklik-protokolu-2026.svg',
    imageAlt: 'Trendyol sözleşme değişiklik protokolünün operasyon başlıklarını özetleyen görsel',
    source: 'Elektronik Ticaret Aracılık Sözleşmesi – Değişiklik Protokolü (50) · 127 sayfa',
    sourceNote:
      'Bu duyuru, paylaşılan 127 sayfalık sözleşme özeti üzerinden hazırlanmıştır; hukuki görüş yerine operasyonel kontrol listesi olarak okunmalıdır. Komisyon ve kargo etkisini netleştirmek için eski tarife ile ürün bazlı karşılaştırma yapılmalıdır.',
    stats: [
      {
        label: 'YÜRÜRLÜK',
        value: '22 MAY / 22 HAZ',
        detail: 'Maddelere göre iki farklı yürürlük tarihi',
      },
      { label: 'İADE AKSİYONU', value: '2 İŞ GÜNÜ', detail: 'Aksi halde otomatik müşteri iadesi' },
      { label: 'ÜRÜN KAPATMA', value: '14 → 30 → 60', detail: 'Gün bazlı satışa kapatma kademesi' },
      {
        label: 'HESAP ASKISI',
        value: '3 → 7 → 15 → 30',
        detail: 'Tekrarlayan performans sorunlarında süreler',
      },
    ],
    sections: [
      {
        id: 'yalnizca-komisyon-degil',
        heading: 'Bu protokol yalnızca komisyon güncellemesi değil.',
        paragraphs: [
          'Değişiklik protokolü; ürün güvenliği, iade yönetimi, hızlı teslimat, satıcı puanı, otomatik Tatil Modu, hesap askıya alma, ürün kapatma, mikro ihracat, komisyon ve büyük hacimli kargo tarifelerini aynı çerçevede değiştiriyor.',
          'Maddelerin bir bölümü 22 Mayıs 2026, ürün güvenliği ve performans başlıklarının önemli bir bölümü ise 22 Haziran 2026 itibarıyla yürürlükte. Bu nedenle kontrolü “ileride bakarız” listesi olarak değil, mevcut operasyon kontrolü olarak ele almak gerekiyor.',
        ],
      },
      {
        id: 'urun-guvenligi',
        heading: 'Ürün güvenliği bilgisinin doğruluğu satıcıda.',
        paragraphs: [
          'Ürün ilanında üretici, ithalatçı, materyal bileşeni, CE bilgisi, bakım/kullanım talimatı ve ürün güvenliği uyarılarının eksiksiz ve doğru verilmesi bekleniyor.',
          'Trendyol sisteminde otomatik önerilen bilgi kullanılsa bile son kontrol sorumluluğu satıcıdan kalkmıyor. Özellikle ithal ürünlerde ürün kartını yeniden doğrulamak kritik.',
        ],
        bullets: [
          'Üretici ve ithalatçı',
          'CE ve materyal bilgisi',
          'Bakım/kullanım talimatı',
          'Güvenlik uyarıları',
        ],
      },
      {
        id: 'iade-sureleri',
        heading: 'İadede iki iş günlük sayaç kritik.',
        paragraphs: [
          'Normal cayma/iade akışında müşteri teslimden itibaren 15 gün içinde iade kodu alabiliyor; kod 7 gün geçerli. Kusurlu, yanlış veya eksik ürünlerde müşteri hizmetleri üzerinden 30 güne kadar iade kodu verilebiliyor.',
          'Ürün satıcıya ulaştığında 2 iş günü içinde işlem yapılmazsa sistem iadeyi otomatik onaylayıp bedeli müşteriye iade edebiliyor. Ret halinde doğru neden, açıklama ve kanıt yüklenmeli; reddedilen ürün de yeniden müşteriye gönderilmeli.',
          'Metnin farklı bölümlerinde yeniden kargolama için 72 saat ve 3 iş günü ifadeleri geçiyor. Bu nedenle en kısa süreyi iç operasyon standardı kabul edip paneldeki güncel uygulamayı ayrıca doğrulamak güvenli yaklaşım.',
        ],
        bullets: [
          'Analiz süreci 24 gün içinde tamamlanmalı.',
          'Değişim onaylanırsa yeni ürün 3 iş günü içinde kargolanmalı.',
          '“Servise gönderin” ifadesi tek başına kusurlu ürün iadesini reddetmek için yeterli görülmüyor.',
        ],
      },
      {
        id: 'performans-yaptirimlari',
        heading: 'Performans sorunu artık doğrudan hesap riskine dönüşüyor.',
        paragraphs: [
          'Yüksek tedarik edememe, kusurlu/yanlış/eksik ürün iadesi ve gecikmeli teslimat gibi sorunlar tekrarlandığında hesap askıya alma kademesi uygulanabiliyor. İlk olayda 3 iş günü sonunda askıya alma ve itiraz/iyileştirme imkanı; sonraki olaylarda 3, 7, 15 ve 30 güne uzayan süreler öngörülüyor.',
          'Süre dolduğunda hesabın kendiliğinden açılması yeterli olmayabilir; Trendyol’un istediği iyileştirici aksiyonların da tamamlanması bekleniyor.',
        ],
      },
      {
        id: 'urun-kapatma-tatil-modu',
        heading: 'Ürün 14, 30 veya 60 gün satıştan kapanabilir.',
        paragraphs: [
          'Ürün bazında yüksek iade, düşük puan, tedarik edememe, teslim edilmiş siparişe ilişkin şikayetler veya eksik/kusurlu/yanlış gönderim sorunları görülürse ürün satışa kapatılabiliyor. İlk kapatma 14 gün, ikinci 30 gün, üçüncü ve sonraki kapatmalar 60 gün olarak kademeleniyor.',
          'Ayrıca operasyonel kapasite kırmızı/turuncu seviyedeyse, satıcıya ulaşılamıyorsa veya sevkiyat performansı kapasitenin altında kalıyorsa hesap otomatik Tatil Modu’na alınabiliyor. Stok kadar günlük operasyon kapasitesi de satışta kalma koşulu haline geliyor.',
        ],
      },
      {
        id: 'hizli-teslimat-satici-puani',
        heading: 'Otomatik etiket ve satıcı puanı ayarlarını kontrol edin.',
        paragraphs: [
          'Hızlı Teslimat ve Bugün Kargoda etiketleri performansa göre önerilebiliyor; “önerilen ürünlerime otomatik tanımlansın” seçeneği varsayılan olarak açık gelebiliyor. Hızlı Teslimat için sonraki iş günü, Bugün Kargoda için aynı gün kargoya teslim taahhüdü oluşuyor.',
          'Satıcı puanı; kargoya teslim, zamanında teslim, tedarik edememe, iade yanıt süresi, ihtilaflı iade, değerlendirmeler, müşteri soruları ve ihlal puanı gibi metriklerle haftalık hesaplanıyor. Puanın ürün sıralamasını etkileyebileceği açıkça belirtiliyor.',
        ],
        bullets: [
          'Satıcı Paneli’nde otomatik etiket ayarını inceleyin.',
          'Kargoya teslim ve aynı gün teslim oranlarını ayrı izleyin.',
          'İade ve müşteri sorularına yanıt süresi için alarm kurun.',
        ],
      },
      {
        id: 'mikro-ihracat-saglik-beyanlari',
        heading: 'Mikro ihracat ve sağlık beyanlarında kapsam genişliyor.',
        paragraphs: [
          'Trendyol, önceden bildirim yaparak belirli ülkeler için satıcının tüm ürünlerini mikro ihracata açabiliyor. Satıcının ürün güvenliği, gümrük uygunluğu, orijinallik, içerik, menşe ve izinler bakımından sorumluluğu devam ediyor; uygunsuz bir ürünün diğer gönderileri geciktirmesi halinde maliyet riski doğabiliyor.',
          'Mevzuata aykırı sağlık beyanları ve noktalama, harf oyunu veya farklı dil kullanarak kuralı aşma girişimleri ayrıca ihlal olarak değerlendiriliyor.',
        ],
      },
      {
        id: 'komisyon-kargo',
        heading: 'Komisyon ve büyük hacimli kargo, kâr tablosuna yeniden girmeli.',
        paragraphs: [
          'Yeni komisyon tablosu kategori, alt kategori, ürün grubu, vade, satıcı seviyesi, marka ve farklı avantaj gruplarına göre ayrışıyor. Eski tablo olmadan bunun her ürün için zam mı indirim mi olduğunu söylemek mümkün değil; ürün bazlı eski-yeni karşılaştırma yapılmalı.',
          'CEVA ve Horoz için yeni büyük hacimli kargo tarifeleri de ekleniyor. Özellikle desisi yüksek ürünlerde ana gönderi ücretine ek olarak AT dışı teslimat, tekrar sevk ve başarısız teslimat maliyetleri hesaba katılmalı.',
        ],
        bullets: [
          '0–30 desi/kg bandı: CEVA 468,62 TL; Horoz 567,76 TL.',
          '50 desi: CEVA 756,49 TL; Horoz 623,45 TL.',
          '500 desi: CEVA 6.582,04 TL; Horoz 6.234,52 TL.',
        ],
      },
      {
        id: 'hemen-yapilacaklar',
        heading: 'Bugün yapılacak kontrol listesi.',
        paragraphs: [
          'Bu protokolü operasyon ekibine aktarmanın en pratik yolu, aşağıdaki başlıkları panel ve iç takip sistemi üzerinden tek tek kapatmak:',
        ],
        bullets: [
          'Hızlı Teslimat/Bugün Kargoda otomatik tanımlama ayarını kontrol edin.',
          'Aktif ürünlerde üretici, ithalatçı, CE, materyal ve güvenlik bilgilerini doğrulayın.',
          '2 iş günü iade, 24 gün analiz ve 3 iş günü değişim sayaçları için alarm kurun.',
          'Operasyonel kapasite rengini ve tedarik edememe oranını günlük izleyin.',
          'Ürün bazında iade, şikayet, düşük puan ve eksik/yanlış gönderim oranlarını haftalık takip edin.',
          'Mikro ihracata açık ülke ve ürün kapsamını yeniden kontrol edin.',
          'Yeni komisyon ve CEVA/Horoz tarifesini ürün kârlılığına işleyin.',
        ],
      },
    ],
    nextStep: {
      eyebrow: 'SONRAKİ ADIM',
      title: 'Paneli kontrol edin. Kâr tablosunu güncelleyin.',
      body: 'Sözleşmedeki her başlığı ürün, sipariş ve operasyon verinizle eşleştirin; varsayım yerine güncel sipariş ekonomisini kullanın.',
      ctaLabel: 'Kârı yeniden hesapla →',
      ctaHref: '/araclar/kar-marji-hesaplayici',
    },
  },
  {
    slug: 'trendyol-bugun-kargoda-platform-hizmet-bedeli-protokol-51',
    addedOrder: 2,
    eyebrow: 'TRENDYOL DUYURULARI / PROTOKOL 51',
    title: 'Bugün Kargoda artık görünürlük değil, doğrudan kâr kararı.',
    excerpt:
      'Platform hizmet bedeli ve 350 TL altı sipariş kargo desteği, hızlı gönderim performansını paket başına ölçülebilir bir avantaja dönüştürüyor.',
    category: 'Trendyol Duyuruları',
    publishedAt: '2026-08-09',
    updatedAt: '2026-08-09',
    readingTime: '7 dk',
    image: '/duyurular/trendyol-bugun-kargoda-protokol-51.svg',
    imageAlt: 'Bugün Kargoda platform hizmet bedeli ve kargo desteğini özetleyen görsel',
    source: 'Elektronik Ticaret Aracılık Sözleşmesi – Değişiklik Protokolü (51)',
    sourceNote:
      'Bu duyuru, paylaşılan Protokol 51 özeti üzerinden hazırlanmıştır. Tablolardaki tutarlar KDV hariç örneklerdir; kendi ürünlerinizde desi, kargo firması, termin ve gerçekleşen teslim performansını birlikte kontrol edin.',
    stats: [
      {
        label: 'HİZMET BEDELİ',
        value: '10,99 → 4,99 TL',
        detail: 'Koşullar sağlanırsa teslimat başına, KDV hariç',
      },
      {
        label: 'TEX FARKI',
        value: '34,58 TL',
        detail: '0–199,99 TL siparişte Model 1 / Model 2 farkı',
      },
      {
        label: 'BAREM EŞİĞİ',
        value: '< 350 TL',
        detail: 'Destek hesabının devreye girdiği sipariş bandı',
      },
      { label: 'DESİ SINIRI', value: '≤ 10 DESİ', detail: 'Barem desteği için üst sınır' },
    ],
    sections: [
      {
        id: 'bugun-kargoda-maliyet',
        heading: 'Bugün Kargoda artık finansal bir model.',
        paragraphs: [
          'Bugün Kargoda etiketi yoksa ve/veya gönderi aynı gün “Taşıma Durumunda” statüsüne geçirilmezse Platform Hizmet Bedeli teslimat başına 10,99 TL + KDV oluyor. Etiketin bulunması ve gönderinin aynı gün statüye geçirilmesi birlikte sağlanırsa bedel 4,99 TL + KDV’ye düşüyor.',
          'Yani yalnızca etiketi açmak yeterli değil. Etiket, aynı gün fiili kargo performansıyla birlikte çalışıyor ve her başarılı gönderide 6 TL + KDV avantaj yaratıyor.',
        ],
        bullets: [
          '100 gönderide çıplak bedel farkı: 600 TL',
          '1.000 gönderide çıplak bedel farkı: 6.000 TL',
          '5.000 gönderide çıplak bedel farkı: 30.000 TL',
        ],
      },
      {
        id: 'model-1-kargo-destegi',
        heading: 'Model 1, hızlı ve başarılı operasyonu ödüllendiriyor.',
        paragraphs: [
          'Model 1; Trendyol’un uygun bulduğu satıcı siparişlerinde veya terminini 1 gün yapıp Hızlı Teslimat/Bugün Kargoda etiketini kurala uygun şekilde kullanan satıcılarda uygulanabiliyor.',
          '0–199,99 TL siparişlerde TEX ve PTT için barem altı fiyat 34,16 TL; Aras 42,91 TL, Sürat 48,74 TL, Kolay Gelsin 51,24 TL, DHL eCommerce 52,08 TL ve YK 74,58 TL olarak özetleniyor. 200–349,99 TL bandında TEX/PTT 65,83 TL’den başlıyor.',
        ],
      },
      {
        id: 'model-2-kargo-farki',
        heading: 'Model 2’ye düşmek düşük fiyatlı üründe pahalı.',
        paragraphs: [
          'Termin 1 günden uzunsa veya etiket olmasına rağmen ürün taahhüt edilen performansla kargoya verilmezse Model 2 devreye giriyor. 0–199,99 TL siparişlerde TEX/PTT fiyatı 68,74 TL’ye çıkıyor.',
          'TEX örneğinde Model 1 ile Model 2 arasındaki fark paket başına 34,58 TL. 150 TL’lik bir siparişte platform hizmet bedeli farkı da eklendiğinde, yalnızca çıplak kargo ve hizmet bedeli farkı 40,58 TL’ye ulaşıyor. Düşük fiyatlı ürünlerde operasyon modeli marjı doğrudan değiştirebilir.',
        ],
        bullets: [
          'TEX: 34,16 TL → 68,74 TL',
          'Aras: 42,91 TL → 75,41 TL',
          'YK: 74,58 TL → 105,41 TL',
        ],
      },
      {
        id: '350-tl-barem',
        heading: '350 TL altı siparişlerde yeni kargo baremi var.',
        paragraphs: [
          '350 TL ve üzerindeki siparişlerde normal Trendyol Anlaşmalı Kargo Fiyat Listesi uygulanıyor. 350 TL’nin altındaki siparişlerde ise Barem Destek Tutarı üzerinden Model 1 veya Model 2 fiyatı hesaplanıyor.',
          'Bu yüzden ürün kârlılığı hesabında artık satış fiyatı tek başına yeterli değil. Sipariş bandı, desi, kargo firması, termin ve Bugün Kargoda durumu aynı modelde bulunmalı.',
        ],
      },
      {
        id: 'barem-sartlari',
        heading: 'Barem desteğinin kapsamı sınırsız değil.',
        paragraphs: [
          'Destek için gönderinin 10 desi veya altında olması, standart kargo firmasıyla gönderilmesi ve yeniden gönderim, değişim, tekrar sevk veya eksik ürün tamamlama paketi olmaması gerekiyor. Bu şartları karşılamayan gönderiler normal fiyatlandırmaya dönebiliyor.',
          'Örneğin eksik parçayı müşteriye yeniden gönderdiğiniz paket barem desteğine giremeyebilir. 10 desinin üzerindeki ürünlerde de destek yerine normal desi bazlı fiyat devam ediyor.',
        ],
        bullets: [
          '10 desi üstü gönderiler destek dışında.',
          'Yeniden gönderim ve değişim paketleri destek dışında.',
          'Satıcı Anlaşmalı Kargo modeli bu bareme dahil değil.',
        ],
      },
      {
        id: 'paket-bolme-kargo-firmasi',
        heading: 'Paket bölme ve kargo firması maliyeti değiştirebilir.',
        paragraphs: [
          'Bir sipariş iki pakete bölündüğünde her iki paket otomatik olarak desteklenmiyor; şartları karşılayan en fazla bir teslimat gönderisi bareme dahil ediliyor. Desiler farklıysa en düşük desili, desiler aynıysa sipariş tutarı en düşük paket dikkate alınıyor.',
          'Trendyol, teslimat performansı düşük gördüğü bir kargo firmasını Barem Destek uygulamasından çıkarabiliyor. Satıcının operasyonu iyi olsa bile taşıyıcının genel performansı paket maliyetini etkileyebiliyor.',
        ],
      },
      {
        id: 'ceva-horoz-iade',
        heading: 'Büyük hacim ve iadelerde farklı kurallar var.',
        paragraphs: [
          'CEVA Tedarik, CEVA ve Horoz bu barem desteğine dahil değil; bu gönderiler desi bazlı fiyatlandırmayla devam ediyor. Büyük ürün satan işletmeler için avantajı küçük paket kargo tablosunda aramamak gerekiyor.',
          'Normal iade paketleri de destek kapsamı dışında. Ancak Başarılı Satıcı Rozeti sahibi olup ilgili program koşullarını karşılayan satıcılar, statüleri devam ettiği sürece uygun iadelerde Model 1 desteğinden yararlanabiliyor.',
        ],
      },
      {
        id: 'iki-protokol-birlikte',
        heading: 'Protokol 50 ve 51 birlikte aynı yöne işaret ediyor.',
        paragraphs: [
          'İlk protokolde Bugün Kargoda performansı satıcı puanı ve görünürlükle ilişkilendiriliyordu. Protokol 51 bu davranışın üzerine düşük Platform Hizmet Bedeli ve daha yüksek kargo desteği ekliyor.',
          'Ortaya çıkan model net: 1 günlük termin → hızlı etiket → aynı gün fiili kargo → düşük hizmet bedeli → yüksek kargo desteği → daha iyi satıcı puanı potansiyeli. Tersi durumda Model 2, daha yüksek hizmet bedeli ve olası performans riski birlikte geliyor.',
        ],
        bullets: [
          '150 TL altı/çevresindeki ürünlerde Model 1 ve Model 2 marjını ayrı hesaplayın.',
          'Etiketi açmakla fiili aynı gün teslimi birlikte takip edin.',
          'Kendi anlaşmalı kargonuz ile Trendyol destekli Model 1’i ürün bazında karşılaştırın.',
          'Desi sınırı ve paket bölme etkisini kârlılık modeline ekleyin.',
        ],
      },
    ],
    nextStep: {
      eyebrow: 'SONRAKİ ADIM',
      title: 'Hızlı gönderimi kârlılık hesabına bağlayın.',
      body: 'Her ürün için Model 1, Model 2 ve kendi kargo anlaşmanızın sipariş başına katkısını ayrı ayrı hesaplayın.',
      ctaLabel: 'Kârı yeniden hesapla →',
      ctaHref: '/araclar/kar-marji-hesaplayici',
    },
  },
  {
    slug: 'trendyol-protokol-53-cezalar-mikro-ihracat-kargo-2026',
    addedOrder: 3,
    eyebrow: 'TRENDYOL DUYURULARI / PROTOKOL 53',
    title: 'Trendyol Protokol 53: operasyon hatası artık doğrudan ceza.',
    excerpt:
      'Tedarik edememe, yanlış veya kusurlu ürün, mikro ihracat iadeleri, satıcı seviyeleri ve yeni kargo fiyatları tek protokolde sertleşiyor.',
    category: 'Trendyol Duyuruları',
    publishedAt: '2026-08-09',
    updatedAt: '2026-08-09',
    readingTime: '10 dk',
    image: '/duyurular/trendyol-protokol-53-ceza-kargo.svg',
    imageAlt: 'Trendyol Protokol 53 cezai şartları ve kargo değişikliklerini özetleyen görsel',
    source: 'Elektronik Ticaret Aracılık Sözleşmesi – Değişiklik Protokolü (53)',
    sourceNote:
      'Bu duyuru, paylaşılan Protokol 53 özeti üzerinden hazırlanmıştır; hukuki görüş yerine operasyonel risk notu olarak okunmalıdır. Yürürlük tarihleri maddeye göre 26 Haziran, 13 Temmuz ve 27 Temmuz 2026 olarak ayrışıyor.',
    stats: [
      {
        label: 'CEZA BAREMİ',
        value: '50 → 1.200 TL',
        detail: 'Tedarik, yanlış ve sorunlu ürün olaylarında',
      },
      {
        label: 'AĞIR KUSUR',
        value: '350 TL / ÜRÜN',
        detail: 'Ürün bedelinden bağımsız sabit cezai şart',
      },
      {
        label: 'MİKRO İHRACAT İADESİ',
        value: '%30–35',
        detail: 'Yurt dışı iade operasyon yansıtma bedeli',
      },
      {
        label: 'KARGO DEĞİŞİMİ',
        value: '13 TEM 2026',
        detail: 'Yeni kargo fiyatlarının yürürlük tarihi',
      },
    ],
    sections: [
      {
        id: 'dogrudan-parasal-ceza',
        heading: 'Operasyon hatası artık doğrudan parasal cezaya dönüşüyor.',
        paragraphs: [
          'Tedarik edememe, yanlış ürün gönderme ve kusurlu/eksik/ayıplı/hasarlı ürün teslim etme durumlarında ürün bedeline bağlı cezai şart uygulanıyor. 0–199,99 TL bandında ceza 50 TL’den başlıyor; 10.000 TL ve üzerindeki siparişlerde 1.200 TL’ye kadar çıkıyor.',
          'Bu cezalar, ilk protokoldeki satıcı puanı, ürün kapatma ve hesap askıya alma risklerinin üzerine geliyor. Aynı operasyon problemi artık hem performans hem de nakit akışı açısından zarar yaratabilir.',
        ],
        bullets: [
          '0–199,99 TL: 50 TL',
          '350–599,99 TL: 120 TL',
          '1.000–2.999,99 TL: 300 TL',
          '3.000–9.999,99 TL: 600 TL',
          '10.000 TL ve üzeri: 1.200 TL',
        ],
      },
      {
        id: 'gecikme-ve-adel',
        heading: 'Geç kargolama da aynı zincirin parçası.',
        paragraphs: [
          'Termin süresinde ürün taşıyıcıya teslim edilmezse ayrı bir gecikme cezası uygulanabiliyor. Tutarlar düşük siparişlerde 50 TL’den başlıyor; yüksek tutarlı gecikmiş ürünlerde 300 TL’ye kadar çıkıyor.',
          'ADEL teslimat seçeneğini kullanan satıcılar, gönderi ADEL olarak güncellendikten sonra 216 saat yani 9 gün içinde ürünü teslim edip “teslim edildi” bilgisini Trendyol’a bildirmek zorunda. Bu süre de yalnızca operasyon metrikleriyle değil, parasal ceza riskiyle takip edilmeli.',
        ],
      },
      {
        id: 'depo-kalite-kontrolu',
        heading: 'Depo kalite kontrolü artık kârlılığın parçası.',
        paragraphs: [
          'Yanlış ürün gönderimi, ürünün geri gelmesi ve kargo maliyetiyle bitmiyor; iade maliyeti, satıcı puanı etkisi, memnuniyet bedeli, ürün kapatma ve cezai şart aynı olayın devamı olabiliyor. 3.500 TL’lik yanlış ürün örneğinde 600 TL cezai şartın yanında bu kalemlerin tamamı oluşabilir.',
          'Ağır kusurlu ürünlerde — örneğin ayakkabıdan çivi çıkması veya ürünün patlaması gibi durumlarda — ürün fiyatından bağımsız olarak teslimat başına 350 TL sabit cezai şart öngörülüyor.',
        ],
        bullets: [
          'Paketleme öncesi barkod ve varyant kontrolü',
          'Eksik parça ve aksesuar kontrolü',
          'Hasar ve ağır kusur için fotoğraflı çıkış kaydı',
          'Fiziksel fiyat etiketi ile Trendyol fiyatının eşleştirilmesi',
        ],
      },
      {
        id: 'fiziki-fiyat-etiketi',
        heading: 'Fiziksel fiyat etiketi de ayrı bir risk.',
        paragraphs: [
          'Ürünün üzerindeki fiziksel fiyat etiketi Trendyol’daki satış fiyatından düşükse ve müşteri bunu şikayet ederse teslimat başına 85 TL cezai şart uygulanabiliyor. Özellikle mağaza ve çok kanallı satış yapan işletmeler, paketleme kontrolüne fiyat etiketi adımını eklemeli.',
          'Kampanya, indirim veya DSM sistemlerini kötüye kullanarak Trendyol’a ya da müşteriye zarar/kar kaybı doğurulması halinde sipariş iptali, taşıma halindeki siparişlerin iadeye çekilmesi ve ek yaptırımlar da gündeme gelebiliyor.',
        ],
      },
      {
        id: 'mikro-ihracat-iade-bedeli',
        heading: 'Mikro ihracat iadelerinde yüzde 30–35 risk primi var.',
        paragraphs: [
          'Mikro ihracatta ürün herhangi bir nedenle iadeye dönerse — müşterinin iade talebi veya müşteriye teslim edilememe dahil — Yurt Dışı İade Operasyon Yansıtma Bedeli uygulanıyor. 2.000 TL ve altındaki ürünlerde satış bedelinin %35’i, 2.000 TL üzerindeki ürünlerde %30’u faturalandırılıyor.',
          'Bedel, KDV dahil ilk satış bedeli üzerinden hesaplanıyor. 1.000 TL’lik üründe 350 TL, 2.500 TL’lik üründe 750 TL, 10.000 TL’lik üründe 3.000 TL operasyon bedeli oluşabiliyor. Mikro ihracat fiyatlaması bu riski içermiyorsa marj olduğundan yüksek görünür.',
        ],
        bullets: [
          '2.000 TL ve altı: satış bedelinin %35’i',
          '2.000 TL üzeri: satış bedelinin %30’u',
          'Teslim edilememe de iade kapsamına dahil',
        ],
      },
      {
        id: 'resmi-satici-seviyeleri',
        heading: '“Onaylanmış Satıcı” adı “Resmi Satıcı” oluyor.',
        paragraphs: [
          'Rozet sistemi yeniden tanımlanıyor. Resmi Satıcı için son 1 ayda en az 1 net sipariş, ilk ürün listelemesinin üzerinden en az 60 gün geçmesi, ihlal puanının 12’nin altında olması ve markanın sahibi veya tek ve nihai yetkili satıcısı olduğunun kanıtlanması gerekiyor.',
          'Seviye 4 ve 5’te satıcı puanının son 1 aylık ortalaması 7,00’nin altına düşmemeli ve aktif ürünlerin en az %50’si satıcının sahibi olduğu markalara ait olmalı. Seviye 4 altındaki satıcılarda puan eşiği 8,50, marka yoğunluğu ise %90 olarak özetleniyor.',
        ],
      },
      {
        id: 'seviye-ve-topluluk',
        heading: 'Seviyeler 180 günlük ciro ve siparişle ölçülüyor.',
        paragraphs: [
          'Satıcı seviyesi, mikro ihracat hariç son 180 günlük net ciro ve net sipariş adedine göre günlük hesaplanıyor. Ana baremlerde hem ciro hem sipariş koşulunun birlikte sağlanması gerekiyor.',
          'Seviye 5 için 340 milyon TL ve 320.000 sipariş, Seviye 4 için 50 milyon TL ve 50.000 sipariş, Seviye 3 için 6,2 milyon TL ve 6.200 sipariş, Seviye 2 için 320.000 TL ve 400 sipariş baremleri veriliyor. Yeni satıcı ilk 60 gün Seviye 1’de değerlendiriliyor; son 30 günde sipariş yoksa hesap inaktif statüsüne geçebiliyor.',
          'Bazı kategorilerde özel eşikler ve mikro ihracat cirosuyla Seviye 4 yolu var. Birbirinde %50 veya daha fazla pay sahibi şirketler de “Topluluk” olarak birlikte değerlendirilebiliyor; ortaklık değişirse aynı gün bildirim yükümlülüğü doğuyor.',
        ],
      },
      {
        id: 'komisyon-ve-kargo',
        heading: 'Komisyon sınırlı değişiyor, kargo yeniden zamlanıyor.',
        paragraphs: [
          'Komisyon tarafında bu protokol tüm tabloyu değil, 394, 396 ve 416. satırları değiştiriyor. Bunlar bebek bezi, bebek ıslak mendil/havlu ve yüzey temizlik mendilleri gibi kategoriler; Sleepy marka komisyonu da ayrıca yer alıyor. Bu kategorilerde değilseniz komisyon etkisi doğrudan olmayabilir.',
          'Kargo tarafında Aras, DHL eCommerce, Kolay Gelsin, Sürat ve Yurtiçi fiyatları yeniden değişiyor. 0–2 deside Aras 88,96 TL, DHL 97,99 TL, Kolay Gelsin 96,59 TL, Sürat 95,54 TL ve Yurtiçi 121,75 TL olarak özetleniyor.',
        ],
        bullets: [
          '50 desi: Aras 606,95 TL; DHL 1.319,79 TL; Kolay Gelsin 618,44 TL.',
          '500 desi: Aras 5.908,16 TL; DHL 17.515,29 TL; Kolay Gelsin 5.343,44 TL.',
          'Ağır kargo ek bedeli: Aras 4.250 TL; DHL 7.154,99 TL; Sürat 4.500 TL; Yurtiçi 5.350 TL.',
        ],
      },
      {
        id: 'barem-zammi-ve-aksiyon',
        heading: 'Protokol 51’in barem avantajı da birkaç gün sonra değişiyor.',
        paragraphs: [
          'Protokol 51’de 8 Temmuz 2026’da başlayan Barem Destek sistemi, Protokol 53’te 13 Temmuz 2026 itibarıyla yeniden fiyatlanıyor. 0–199,99 TL Model 1 bandında Aras 42,91 TL’den 48,33 TL’ye, Sürat 48,74 TL’den 54,58 TL’ye, Yurtiçi 74,58 TL’den 83,33 TL’ye çıkıyor.',
          'Bu nedenle “Bugün Kargoda avantajı var” demek tek başına yeterli değil. Model 1 ve Model 2’nin güncel fiyatını, kargo firmasını ve ürünün desisini aynı sipariş ekonomisi tablosunda karşılaştırmak gerekiyor.',
        ],
        bullets: [
          'Stok ve depo kalite kontrolünü cezai şartlarla birlikte izleyin.',
          'Mikro ihracat iadelerine %30–35 risk payı ekleyin.',
          'Satıcı seviyesi ve Resmi Satıcı şartlarını aylık değil günlük takip edin.',
          'Büyük deside DHL dahil tüm taşıyıcıları ürün bazında karşılaştırın.',
          'Yeni kargo ve barem fiyatlarını mevcut Model 1/2 tablonuzla güncelleyin.',
        ],
      },
    ],
    nextStep: {
      eyebrow: 'SONRAKİ ADIM',
      title: 'Cezayı beklemeyin. Hata maliyetini modele ekleyin.',
      body: 'Ürün, operasyon ve mikro ihracat kararlarınızı yalnızca satış bedeliyle değil; ceza, iade ve güncel kargo maliyetleriyle birlikte değerlendirin.',
      ctaLabel: 'Kârı yeniden hesapla →',
      ctaHref: '/araclar/kar-marji-hesaplayici',
    },
  },
  {
    slug: 'trendyol-protokol-54-ceva-horoz-buyuk-desi-kargo-2026',
    addedOrder: 4,
    eyebrow: 'TRENDYOL DUYURULARI / PROTOKOL 54',
    title: 'Protokol 54: büyük desili kargo artık marjı sessizce eritiyor.',
    excerpt:
      'CEVA Tedarik ve Horoz tarifeleri yeniden yükseliyor; 500 desilik tek gönderide yüzlerce TL ek maliyet oluşabiliyor.',
    category: 'Trendyol Duyuruları',
    publishedAt: '2026-08-09',
    updatedAt: '2026-08-09',
    readingTime: '7 dk',
    image: '/duyurular/trendyol-protokol-54-buyuk-desi-kargo.svg',
    imageAlt: 'CEVA Tedarik, CEVA ve Horoz büyük desi kargo tarifelerini özetleyen görsel',
    source: 'Elektronik Ticaret Aracılık Sözleşmesi – Değişiklik Protokolü (54)',
    sourceNote:
      'Bu duyuru, paylaşılan Protokol 54 özeti üzerinden hazırlanmıştır. Fiyat karşılaştırması yalnızca tarife bazındadır; hizmet bölgesi, teslim süresi, hasar oranı ve ürün kabul koşulları ayrıca doğrulanmalıdır.',
    stats: [
      {
        label: 'CEVA TEDARİK',
        value: '+%10,15',
        detail: 'Farklı desi seviyelerinde korunan yaklaşık artış',
      },
      { label: 'HOROZ', value: '+%8', detail: 'Büyük hacimli tarifedeki yaklaşık artış' },
      {
        label: '500 DESİ',
        value: '+499–668 TL',
        detail: 'Tek gönderide eski tarifeye göre ek yük',
      },
      {
        label: 'BAŞARISIZ TESLİMAT',
        value: '%100',
        detail: 'Gönderi ücretinin tamamı kadar ek maliyet',
      },
    ],
    sections: [
      {
        id: 'tek-degisiklik-kargo',
        heading: 'Bu protokol sade, etkisi doğrudan maliyet.',
        paragraphs: [
          'Protokol 54’te komisyon, ceza, iade, satıcı puanı veya operasyon kuralı değişmiyor. Tek değişiklik Horoz, CEVA ve CEVA Tedarik kargo fiyat tarifelerinin yenilenmesi.',
          'Tarifenin tamamı 16 Temmuz 2026’da yürürlüğe giriyor. Protokol 53’te standart kargo firmalarının 13 Temmuz’da güncellenmesinden yalnızca üç gün sonra büyük/desili taşıma tarifesi de değişmiş oluyor.',
        ],
      },
      {
        id: 'dusuk-desi-secimi',
        heading: '0–36 deside CEVA Tedarik, 37 desiden sonra Horoz öne çıkıyor.',
        paragraphs: [
          '0–30 desi aralığında yeni sabit fiyatlar CEVA Tedarik için 516,21 TL, Horoz için 613,19 TL ve CEVA için 697,63 TL. Tarife tabanında en düşük seçenek CEVA Tedarik.',
          '31 desiden sonra CEVA Tedarik kademeli olarak artarken Horoz 0–45 desi boyunca 613,19 TL seviyesinde kalıyor. Yaklaşık 37 desiden itibaren Horoz, CEVA Tedarik’ten daha ucuz hale geliyor.',
        ],
        bullets: [
          '30 desi: CEVA Tedarik 516,21 TL · CEVA 697,63 TL · Horoz 613,19 TL',
          '35 desi: CEVA Tedarik 583,32 TL · CEVA 736,74 TL · Horoz 613,19 TL',
          '45 desi: CEVA Tedarik 749,98 TL · CEVA 818,02 TL · Horoz 613,19 TL',
        ],
      },
      {
        id: 'buyuk-desi-maliyet',
        heading: 'Büyük deside küçük yüzde farkı yüzlerce TL oluyor.',
        paragraphs: [
          '50 deside yeni fiyatlar CEVA Tedarik 833,31 TL, CEVA 859,73 TL ve Horoz 673,35 TL. Horoz, CEVA Tedarik’e göre tek gönderide 159,96 TL daha düşük kalıyor.',
          '100 deside Horoz 1.346,70 TL ile en düşük seçenek. 200 deside 2.693,40 TL, 300 deside 4.040,10 TL ve 500 deside 6.733,50 TL seviyesine çıkıyor. Yüksek hacimde yüzde farkı kadar TL farkı da fiyatlamaya girmeli.',
        ],
        bullets: [
          '100 desi: CEVA Tedarik 1.445,29 TL · CEVA 1.465,59 TL · Horoz 1.346,70 TL',
          '200 desi: CEVA Tedarik 2.900,01 TL · CEVA 2.907,11 TL · Horoz 2.693,40 TL',
          '500 desi: CEVA Tedarik 7.250,46 TL · CEVA 7.277,60 TL · Horoz 6.733,50 TL',
        ],
      },
      {
        id: 'zam-etkisi',
        heading: 'CEVA Tedarik yaklaşık %10,15, Horoz yaklaşık %8 zamlandı.',
        paragraphs: [
          'Önceki tarifede 0–30 desi CEVA Tedarik 468,62 TL iken yeni fiyat 516,21 TL’ye çıkıyor: gönderi başına 47,59 TL ek yük. Horoz 567,76 TL’den 613,19 TL’ye çıkıyor: gönderi başına 45,43 TL ek yük.',
          '500 deside CEVA Tedarik 6.582,04 TL’den 7.250,46 TL’ye çıkıyor; fark 668,42 TL. Horoz 6.234,52 TL’den 6.733,50 TL’ye çıkıyor; fark 498,98 TL. Büyük ürünlerde eski satış fiyatını korumak bazı SKU’ları doğrudan zarara taşıyabilir.',
        ],
      },
      {
        id: 'ceva-ayrimi-at-disi',
        heading: 'CEVA ile CEVA Tedarik artık ayrı seçenekler.',
        paragraphs: [
          'Protokol 54, CEVA Tedarik ve CEVA’yı ayrı kolonlarda fiyatlandırıyor. 0–30 desi aralığında aralarındaki fark 181,42 TL; bu nedenle iki taşıma modelini ürün kârlılığı hesabında aynı seçenek gibi kullanmamak gerekiyor.',
          'AT Dışı Teslimat ücretleri de artıyor: CEVA Tedarik 2.161,39 TL, CEVA 2.573,61 TL ve Horoz 2.041,20 TL. Bölge dışı teslimat yapan ürünlerde ana tarife kadar bu ek bedel de kontrol edilmeli.',
        ],
      },
      {
        id: 'tekrar-sevk-basarisiz-teslimat',
        heading: 'Tekrar sevk %50, başarısız teslimat %100 ek maliyet.',
        paragraphs: [
          'Üç firmada da tekrar sevk maliyeti gönderi ücretinin %50’si olarak uygulanıyor. 500 desilik Horoz gönderisinde bu, teorik olarak 3.366,75 TL ek maliyet demek.',
          'Başarısız teslimatta ise gönderi ücretinin %100’ü kadar ek maliyet oluşabiliyor. 500 desilik bir Horoz gönderisinde 6.733,50 TL, CEVA gönderisinde 7.277,60 TL seviyesinde risk var. Müşterinin teslimata hazır olması, telefon doğrulaması ve adres kontrolü artık kârlılık önlemi.',
        ],
        bullets: [
          'Teslimat öncesi adres ve telefon doğrulaması yapın.',
          'Büyük ürünlerde randevulu teslimat bilgisini netleştirin.',
          'Yeniden sevk ve başarısız teslimat oranını taşıyıcı bazında izleyin.',
        ],
      },
      {
        id: 'degismeyenler-kronoloji',
        heading: 'Bu protokolü diğer değişikliklerle karıştırmayın.',
        paragraphs: [
          'Protokol 53 Aras, DHL eCommerce, Kolay Gelsin, Sürat ve Yurtiçi tarifelerini değiştirmişti. Protokol 54 yalnızca CEVA Tedarik, CEVA ve Horoz tarafını güncelliyor. Böylece Temmuz ortası itibarıyla standart ve büyük/desili taşıma tabloları ayrı tarihlerde yenilenmiş durumda.',
          'Komisyon, cezai şart, satıcı puanı ve iade prosedüründe bu protokole bağlı yeni bir değişiklik bulunmuyor. Fakat güncel kargo maliyeti, önceki protokollerdeki komisyon, platform hizmet bedeli ve mikro ihracat iade riskiyle birlikte düşünülmeli.',
        ],
      },
      {
        id: 'buyuk-urun-aksiyon',
        heading: 'Büyük ürün satanlar için yeni karar tablosu.',
        paragraphs: [
          'Sadece “hangi firma daha ucuz?” sorusu yeterli değil. Ürünün desisi, teslimat bölgesi, taşıyıcı kabul koşulları ve başarısız teslimat ihtimali birlikte değerlendirildiğinde gerçek sipariş maliyeti ortaya çıkıyor.',
        ],
        bullets: [
          '0–36 deside CEVA Tedarik, 37 desi ve üzeri için Horoz seçeneğini tarife bazında karşılaştırın.',
          'CEVA ile CEVA Tedarik’i ayrı kargo türleri olarak fiyatlayın.',
          '500 desi ürünlerde 500–670 TL arası ek maliyeti satış fiyatına yansıtın.',
          'AT Dışı Teslimat, tekrar sevk ve başarısız teslimat senaryolarını marj modeline ekleyin.',
          'Taşıyıcı seçimini yalnızca fiyata değil, gerçek teslimat performansına göre yapın.',
        ],
      },
    ],
    nextStep: {
      eyebrow: 'SONRAKİ ADIM',
      title: 'Desiyi girin. Taşıyıcıyı seçin. Marjı yeniden görün.',
      body: 'Büyük ürünlerde güncel kargo tarifesi, başarısız teslimat ve tekrar sevk riskini aynı sipariş ekonomisi hesabına dahil edin.',
      ctaLabel: 'Kârı yeniden hesapla →',
      ctaHref: '/araclar/kar-marji-hesaplayici',
    },
  },
  {
    slug: 'trendyol-protokol-55-api-ai-mikro-ihracat-epr-2026',
    addedOrder: 5,
    eyebrow: 'TRENDYOL DUYURULARI / PROTOKOL 55',
    title: 'Protokol 55: otomasyon serbest, sorumluluk sende.',
    excerpt:
      'API, MCP ve yapay zekâ entegrasyonları sözleşmeye giriyor; veri güvenliği, KVKK, EPR ve ülke mevzuatı yükümlülükleri satıcıya bırakılıyor.',
    category: 'Trendyol Duyuruları',
    publishedAt: '2026-08-09',
    updatedAt: '2026-08-09',
    readingTime: '10 dk',
    image: '/duyurular/trendyol-protokol-55-api-epr.svg',
    imageAlt:
      'Trendyol Protokol 55 API yapay zekâ ve mikro ihracat sorumluluklarını özetleyen görsel',
    source: 'Elektronik Ticaret Aracılık Sözleşmesi – Değişiklik Protokolü (55)',
    sourceNote:
      'Bu duyuru, paylaşılan Protokol 55 özeti üzerinden hazırlanmıştır; hukuki görüş yerine entegrasyon ve operasyon hazırlık notu olarak okunmalıdır. Metindeki hükümler için yürürlük tarihleri 31 Temmuz ve 30 Ağustos 2026 olarak ayrışıyor.',
    stats: [
      {
        label: 'YÜRÜRLÜK',
        value: '31 TEM / 30 AĞU',
        detail: 'Operasyon ve entegrasyon maddeleri iki tarihe ayrılıyor',
      },
      {
        label: 'API / AI',
        value: 'SORUMLULUK SATICIDA',
        detail: 'Hatalı otomasyon işlemi hesabınıza ait sayılıyor',
      },
      {
        label: 'EPR',
        value: 'HAKEDİŞTEN KESİLEBİLİR',
        detail: 'Çevre ve ambalaj ücretleri satıcıya yansıyabilir',
      },
      {
        label: 'BAREM',
        value: '≤ 10 DESİ',
        detail: 'Paneldeki sabit ücret ve kapsam şartları devam ediyor',
      },
    ],
    sections: [
      {
        id: 'yeni-donem-entegrasyon',
        heading: 'Bu kez kargo değil, işletim modeli değişiyor.',
        paragraphs: [
          'Protokol 55; komisyon, yeni genel kargo zam tablosu veya yeni cezai şart baremi getirmiyor. Ana değişiklik, Trendyol operasyonlarının MCP, API, eklenti, üçüncü taraf yazılım ve yapay zekâ tabanlı süreçlerle yürütülebileceğinin sözleşmeye açıkça yazılması.',
          'Bunun karşılığında sorumluluk sınırı da netleşiyor: otomasyonla yapılan ürün, fiyat, stok, içerik, kampanya veya panel işleminin doğruluğu ve mevzuata uygunluğu satıcıya ait kalıyor.',
        ],
      },
      {
        id: 'api-ai-sorumlulugu',
        heading: 'Yapay zekâ hata yaparsa “AI yaptı” savunması yetmiyor.',
        paragraphs: [
          'Bir entegrasyon ürün oluşturur, fiyatı günceller, stoğu değiştirir, içerik yükler veya veriyi silerse bu işlemlerin sonucu satıcının sorumluluğunda. Örneğin 4.999 TL’lik fiyatın otomasyon hatasıyla 499 TL’ye inmesi, sözleşmedeki yaklaşımda entegrasyon sağlayıcısına devredilmiş bir risk olarak görülmüyor.',
          'Trendyol, entegrasyonların kesintisiz, hatasız, güvenli veya belirli bir amaca uygun çalışacağını da garanti etmiyor. İşlem sonucundan doğan zarar, kâr kaybı veya üçüncü kişi talepleri için otomatik bir platform sorumluluğu oluşmuyor.',
        ],
        bullets: [
          'Fiyat ve stok güncellemelerinde onay adımı kullanın.',
          'Ürün silme, kampanya ve sipariş iptalini kontrolsüz AI akışından ayırın.',
          'Her otomasyon için geri alma ve manuel durdurma mekanizması kurun.',
        ],
      },
      {
        id: 'anahtar-kvkk-veri',
        heading: 'API anahtarı ve müşteri verisi artık sözleşmesel risk.',
        paragraphs: [
          'API Key, API Secret, Supplier ID, access token ve diğer erişim bilgilerinin güvenliğinden satıcı sorumlu. Bu anahtarlar ele geçirilirse yapılan fiyat, stok, ürün veya içerik değişiklikleri satıcı hesabından yapılmış bağlayıcı işlemler olarak değerlendirilebilir.',
          'Müşteri adı, telefon, adres veya sipariş bilgisi üçüncü taraf AI, API, yazılım ya da sunucuya aktarılıyorsa KVKK kapsamındaki veri sorumlusu yükümlülükleri de satıcıya kalıyor. Yurt içi veya yurt dışı veri aktarımı için gerekli hukuki şartlar ayrıca kontrol edilmeli.',
        ],
        bullets: [
          'Eski personel ve entegratörlerde kalan erişimleri iptal edin.',
          'Yetki kapsamını minimum gerekli izinlerle sınırlandırın.',
          'Dış AI servislerine giden müşteri alanlarını veri envanterine ekleyin.',
          'Anahtar rotasyonu ve erişim loglarını düzenli kontrol edin.',
        ],
      },
      {
        id: 'entegrasyon-kontrol',
        heading: 'Entegrasyonu bir kez bağlayıp unutmak yeterli değil.',
        paragraphs: [
          'Satıcının kullandığı otomasyon, API ve AI araçlarını kaynak, güvenlik özellikleri ve erişim yetkileri açısından periyodik kontrol etmesi bekleniyor. Eski, açık barındıran veya kötü amaçlı olabileceğinden makul şekilde şüphelenilen sistemlerin kullanımı derhal bırakılmalı.',
          'Bu nedenle güvenli minimum akış şu olmalı: AI/API işlemi → doğrulama → log → geri alma. Özellikle fiyat, stok, ürün silme ve müşteri verisi içeren akışlarda doğrudan yazma yetkisi yerine kontrollü bir ara katman kullanılmalı.',
        ],
      },
      {
        id: 'hizli-teslimat-barem',
        heading: 'Hızlı teslimat tanımları ve barem sistemi korunuyor.',
        paragraphs: [
          'Termin 0 gün Bugün Kargoda, termin 1 gün Hızlı Teslimat olarak açıkça tanımlanıyor. Etiketlerin adı değişse bile şartların korunabileceği belirtiliyor. Otomatik etiket tanımlama seçeneğinin varsayılan açık olması da devam ediyor.',
          'Hızlı Teslimat için kargoya teslim başarısı %90’ın üzerinde, ortalama teslim süresi 24 saatin altında ve taşıyıcının almasından müşteriye teslim ortalaması 72 saatin altında olmalı. Bugün Kargoda için aynı gün teslim oranı %80’in üzerinde olmalı.',
          'Barem altı uygulamasında ise tutarlar artık yalnızca eski PDF tablolarından okunmamalı; panelde paylaşılan sabit kargo ücretleri esas alınmalı. 10 desi sınırı, standart kargo ve yeniden gönderim/değişim/tekrar sevk istisneleri devam ediyor.',
        ],
        bullets: [
          'Bölünmüş siparişte yalnızca bir teslimat gönderisi bareme alınabiliyor.',
          'Hesaplamada teslim statüsü alınan paketler dikkate alınıyor.',
          'Desiler farklıysa en düşük desili, aynıysa sipariş tutarı düşük paket seçiliyor.',
        ],
      },
      {
        id: 'coffret-yasagi',
        heading: 'Çok markalı set ve coffret SKU’larını yeniden tarayın.',
        paragraphs: [
          'Birden fazla markaya ait ürün içeren set/coffret ürünler, platform kurallarına aykırı ve satışı uygun olmayan ürünler kapsamına ekleniyor. Örneğin farklı markalara ait şampuan, krem ve taraktan oluşan satıcı yapımı bir set riskli hale gelebilir.',
          'Bu hükmün mevcut bundle, set ve coffret ürünlere etkisi doğrudan katalog taraması gerektiriyor. Ürün bileşenlerinin marka ilişkisi ve satış uygunluğu 30 Ağustos’tan önce kayıt altına alınmalı.',
        ],
      },
      {
        id: 'mikro-ihracat-ulke-epr',
        heading: 'Mikro ihracatta Türkiye’de satılabilmek artık yetmiyor.',
        paragraphs: [
          'Satıcı; mikro ihracat yaptığı ülkenin ürün güvenliği, gümrük, fikri ve sınai mülkiyet, tüketici, elektronik ticaret ve diğer ilgili mevzuatına uymayı kabul ediyor. Bu ülkelerdeki ihlalden doğan maliyet, ceza ve zarar satıcıya bırakılıyor.',
          'Ambalaj malzemeleri, ambalaj mevzuatı ve Genişletilmiş Üretici Sorumluluğu (EPR) de satıcının fiziksel, idari ve yasal sorumluluğunda. Trendyol çevre koruma veya EPR ücretini hesaplayıp ödeyebilir; fakat bu tutarlar hakedişten, bakiyeden veya alacaktan satıcıya yansıtılabilir.',
          'Platformun ödeme yapması asli hukuki sorumluluğu kaldırmıyor. Uygunsuz ambalaj nedeniyle idari para cezası, geriye dönük vergi veya başka yaptırımlar oluşursa Trendyol bunları satıcıya rücu edebilir ve ürün/mağaza askıya alma gündeme gelebilir.',
        ],
      },
      {
        id: 'mikro-ihracat-denetim',
        heading: 'Mikro ihracat paketleri açılıp kontrol edilebilecek.',
        paragraphs: [
          'Trendyol rastgele paket açabilir, ek belge isteyebilir ve ürünün ihracata uygunluğunu inceleyebilir. Satıcının belgeleri zamanında ve eksiksiz vermesi, denetim sürecinde iş birliği yapması bekleniyor.',
          'İade sonrası fiziksel kontrol veya sipariş kaydı karşılaştırmasında ürün yanlış, eksik, kusurlu ya da siparişe uygun değilse ürün derhal satışa kapatılabiliyor. Böylece mikro ihracattaki kalite sorunu yalnızca tek iade değil, aynı SKU’nun satışının kapanması riskine dönüşüyor.',
        ],
      },
      {
        id: '30-agustos-hazirlik',
        heading: '30 Ağustos’tan önce kapanması gereken liste.',
        paragraphs: [
          '31 Temmuz 2026’da Hızlı Teslimat/Bugün Kargoda ve Barem Altı maddeleri yürürlüğe girmiş durumda. MCP/API/AI, coffret, ihracat uyumu, EPR ve denetim maddeleri 30 Ağustos 2026’da devreye girecek.',
          'Bu üç haftalık hazırlık penceresinde entegrasyon ve mikro ihracat envanterini birlikte güncellemek gerekiyor:',
        ],
        bullets: [
          'API Key, Secret, token ve Supplier ID erişimlerini listeleyip eski erişimleri kapatın.',
          'ERP, bot, AI ve üçüncü taraf yazılımların yetki envanterini çıkarın.',
          'Fiyat, stok, silme, kampanya ve sipariş iptali akışlarına doğrulama/log/geri alma ekleyin.',
          'Müşteri verisinin dış AI/API servislerine aktarımını KVKK açısından kontrol edin.',
          'Çok markalı set ve coffret SKU’larını tarayın.',
          'Her mikro ihracat ülkesi için ürün, IP, gümrük, ambalaj ve EPR matrisi oluşturun.',
          'Ürün kârlılığına EPR ve ambalaj çevre maliyeti alanı ekleyin.',
        ],
      },
    ],
    nextStep: {
      eyebrow: 'SONRAKİ ADIM',
      title: 'Otomasyonu bağlamadan önce sorumluluk haritasını çıkarın.',
      body: 'Her API, AI ve mikro ihracat akışında hangi verinin nereye gittiğini, hangi işlemi değiştirebildiğini ve hatada nasıl geri alınacağını kayıt altına alın.',
      ctaLabel: 'Kârı yeniden hesapla →',
      ctaHref: '/araclar/kar-marji-hesaplayici',
    },
  },
  {
    slug: 'trendyol-protokol-56-komisyon-kadin-kooperatifi-ptt-tex-2026',
    addedOrder: 6,
    eyebrow: 'TRENDYOL DUYURULARI / PROTOKOL 56',
    title: 'Protokol 56: komisyon dinamikleşiyor, PTT’de 30 desi kritik eşik.',
    excerpt:
      'Ürün ve Plus komisyon tarifeleri, Kadın Kooperatifi desteği, Trendyol Luxe ve PTT/TEX fiyatları aynı protokolde yeniden kuruluyor.',
    category: 'Trendyol Duyuruları',
    publishedAt: '2026-08-09',
    updatedAt: '2026-08-09',
    readingTime: '10 dk',
    image: '/duyurular/trendyol-protokol-56-komisyon-kargo.svg',
    imageAlt:
      'Trendyol Protokol 56 dinamik komisyon ve PTT/TEX kargo değişikliklerini özetleyen görsel',
    source: 'Elektronik Ticaret Aracılık Sözleşmesi – Değişiklik Protokolü (56)',
    sourceNote:
      'Bu duyuru, paylaşılan Protokol 56 özeti üzerinden hazırlanmıştır. Komisyon oranları ve kargo tutarları ürün, satıcı, program ve panel koşullarına göre değişebileceğinden güncel Satıcı Paneli verisi ayrıca kontrol edilmelidir.',
    stats: [
      {
        label: 'KOMİSYON',
        value: 'EN DÜŞÜK ORAN',
        detail: 'Birden fazla avantaj uygunsa satıcı lehine hesaplama',
      },
      {
        label: 'KADIN KOOPERATİFİ',
        value: '%0 / 6 AY',
        detail: 'Sonraki 4,5 yıl için %1 komisyon programı',
      },
      {
        label: 'PTT 30 → 31 DESİ',
        value: '348,60 → 720,28 TL',
        detail: 'Tek desi farkıyla kritik maliyet sıçraması',
      },
      {
        label: 'YÜRÜRLÜK',
        value: '7 AĞU → 6 EYL',
        detail: 'Maddelere göre dört ayrı başlangıç tarihi',
      },
    ],
    sections: [
      {
        id: 'dinamik-komisyon-motoru',
        heading: 'Komisyon artık kategori oranından ibaret değil.',
        paragraphs: [
          'Yeni hesaplama sistemi; ürün, kategori, marka, satıcı seviyesi, satıcı tipi, lokasyon, ürün özel tarifesi ve Trendyol Plus durumunu birlikte değerlendirebiliyor. Aynı kategorideki iki satıcı, marka veya seviye farkı nedeniyle farklı komisyon ödeyebilir.',
          'Yeni satıcı için ilk ürün listelemesinden itibaren 60 günlük dönem tanımlanıyor; özel komisyon oranından yararlanmak için ilk 15 gün içinde ürünün listelenip canlıya çıkması gerekiyor. Mağazayı açıp ilk 15 günü boş geçirmek finansal olarak dezavantaj yaratabilir.',
        ],
      },
      {
        id: 'kadin-girisimci-kooperatifi',
        heading: 'Kadın Kooperatifi programı güçlü bir avantaj sunuyor.',
        paragraphs: [
          'Şartları karşılayan Kadın Kooperatifleri için 21 Ağustos 2026’dan itibaren ilk 6 ay %0 komisyon, sonraki 4,5 yıl %1 komisyon uygulanıyor. Standart kategori oranının %15 olduğunu varsayarsak 100.000 TL satışta 15.000 TL yerine %1 dönemde 1.000 TL komisyon oluşuyor; %0 dönemde komisyon alınmıyor.',
          'Kooperatifin en az %51’inin kadınlara ait olması, mağazada yalnızca kendi ürettiği veya işlediği ürünleri satması ve en az bir paketli/barkodlu ürün bulundurması gerekiyor. Ticaret Sicil Gazetesi veya Kuruluş Gazetesi ile son 3 ay içinde alınmış ortaklık durum belgesi isteniyor.',
          'Bu komisyon avantajı diğer hizmet, kargo ve platform bedellerini ortadan kaldırmıyor; ürün ekonomisi toplam maliyetlerle birlikte hesaplanmalı.',
        ],
      },
      {
        id: 'en-dusuk-komisyon-plus',
        heading: 'Birden fazla oran uygunsa en düşük komisyon uygulanıyor.',
        paragraphs: [
          'Satıcı aynı anda kategori, seviye, marka, ürün özel tarifesi veya Kadın Girişimci/Kooperatif gibi birden fazla komisyon programına giriyorsa, uygun oranlar içindeki en düşük komisyonun uygulanması öngörülüyor. Bu satıcı lehine önemli bir mekanizma.',
          'Buna karşılık Ürün Komisyon Tarifesi ve Trendyol Plus Komisyon Tarifesi sabit PDF eki olmak zorunda değil; Satıcı Paneli’nde periyodik yayınlanabiliyor. Plus’a özel fiyat verirken ürün indirimi ile Plus komisyon tarifesi birlikte hesaplanmalı.',
        ],
        bullets: [
          'Kategori oranı',
          'Marka ve satıcı seviyesi oranı',
          'Ürün Komisyon Tarifesi',
          'Trendyol Plus Komisyon Tarifesi',
          'Uygun oranlar içindeki en düşük sonuç',
        ],
      },
      {
        id: 'trendyol-luxe',
        heading: 'Trendyol Luxe yeni bir operasyon katmanı getiriyor.',
        paragraphs: [
          'Satıcı, Trendyol ve Luxe operasyonlarında birlikte çalışmayı veya yalnızca birini seçmeyi tercih edebiliyor. Belirli ürünler kriterleri karşılasa bile operasyonlardan hariç bırakılabiliyor.',
          'Seçilen operasyonun kural setine uymayan ürün derhal satışa kapatılabiliyor. Ürün veya operasyon seçimi değiştirilip ürün yeniden uygun hale gelirse otomatik olarak tekrar satışa açılabilmesi, bu kapatmanın genel performans kapatmasından farklı bir uygunluk filtresi olduğunu gösteriyor.',
        ],
      },
      {
        id: 'ptt-30-31-desi',
        heading: 'PTT’de 30’dan 31 desiye geçiş maliyeti iki katlıyor.',
        paragraphs: [
          'Yeni tarifede PTT 30 deside 348,60 TL iken 31 deside 720,28 TL’ye çıkıyor. Tek desilik fark 371,68 TL ek maliyet yaratıyor. PTT kullanan ürünlerde paketleme ve desi optimizasyonu artık doğrudan marj kararı.',
          'TEX’te aynı kırılma yok: 30 desi 360,55 TL, 31 desi 413,86 TL. Bu nedenle 31 desi ve üzerindeki ürünlerde TEX belirgin biçimde avantajlı hale gelebiliyor.',
        ],
        bullets: [
          '50 desi: PTT 1.050,27 TL · TEX 623,10 TL',
          '100 desi: PTT 1.918,62 TL · TEX 1.205,64 TL',
          '100 deside TEX avantajı: 712,98 TL / gönderi',
        ],
      },
      {
        id: 'ptt-tex-barem',
        heading: 'Barem altı PTT/TEX fiyatları da yükseliyor.',
        paragraphs: [
          'Yeni barem altı fiyatlar KDV dahil olarak 0–199,99 TL siparişte Model 1 için PTT/TEX 38,74 TL, 200–349,99 TL bandında 70,41 TL. Model 2’de bu tutarlar sırasıyla 73,33 TL ve 78,74 TL oluyor.',
          'Protokol 51’deki 34,16 TL ve 65,83 TL Model 1 tutarlarına göre yaklaşık 4,58 TL artış var. PTT’de başarısız teslimat için gönderi ücretinin %30’u belirtilirken TEX için ayrı bir başarısız teslimat bedeli gösterilmiyor.',
        ],
      },
      {
        id: 'yeni-komisyon-satirlari',
        heading: 'Yeni iki ürün grubu ve mikro ihracat açıklaması.',
        paragraphs: [
          'Ek 1’e 466 numaralı Kumpas/Kontrol Kalemi ve 467 numaralı Termos Aksesuarları ürün grupları ekleniyor. Bu satırlarda 28 iş günü vade, kategori ve seviye komisyonları ile Kadın Girişimci/Kooperatif oranları ayrıca tanımlanıyor; satışınız bu iki grupta değilse doğrudan etkisi sınırlı.',
          'Mikro ihracat gönderilerindeki “tanımlama” ifadesinin müşteriye etiket gösterimini ifade ettiği ve bu gösterimin mikro ihracat gönderilerinde bulunmadığı açıklanıyor. Bu bölüm daha çok teknik bir netleştirme niteliğinde.',
        ],
      },
      {
        id: 'yururluk-ve-aksiyon',
        heading: 'Dört farklı yürürlük tarihi var.',
        paragraphs: [
          '7 Ağustos 2026’da mikro ihracat tanımlama açıklaması ve iki yeni komisyon satırı yürürlükte. PTT/TEX yeni kargo tarifesi 10 Ağustos’ta, yeni komisyon hesaplama sistemi ve Kadın Kooperatifi programı 21 Ağustos’ta, Trendyol/Luxe sistemi ise 6 Eylül 2026’da başlıyor.',
          'Bu nedenle önce desi bazlı kargo tablosu, ardından komisyon motoru ve Kadın Kooperatifi uygunluğu kontrol edilmeli. Eylül yaklaşırken Luxe’a girecek ürünlerin operasyon kriterleri ayrıca izlenmeli.',
        ],
        bullets: [
          'PTT kullanan SKU’larda 29–32 desi bandını ayırın.',
          '31+ deside PTT ve TEX maliyetini yeniden karşılaştırın.',
          'Panelde yayımlanacak Ürün ve Plus Komisyon Tarifelerini düzenli takip edin.',
          'Birden fazla avantajda en düşük komisyonun uygulandığını doğrulayın.',
          'Kadın Kooperatifi belgeleri ve Luxe ürün kapsamını hazırlayın.',
        ],
      },
    ],
    nextStep: {
      eyebrow: 'SONRAKİ ADIM',
      title: 'Komisyon motorunu ve desi tablosunu birlikte güncelleyin.',
      body: 'Ürün bazlı komisyon, Plus fiyatı, satıcı seviyesi ve PTT/TEX kargo maliyetini aynı kârlılık hesabında görünür hale getirin.',
      ctaLabel: 'Kârı yeniden hesapla →',
      ctaHref: '/araclar/kar-marji-hesaplayici',
    },
  },
  {
    slug: 'kargo-tarifesi-10-agustos-2026',
    addedOrder: 0,
    eyebrow: 'KARGO TARİFESİ / 10 AĞUSTOS 2026',
    title: 'Kargo zammını yüzdeyle okumak yetmez.',
    excerpt: 'Hangi deside ne kadar kâr kaybettiğinize bakın.',
    category: 'Operasyon ve kârlılık',
    publishedAt: '2026-08-08',
    updatedAt: '2026-08-08',
    readingTime: '4 dk',
    image: '/duyurular/kargo-tarifesi-10-agustos-2026.png',
    imageAlt: 'PTT ve TEX kargo tarifesi değişikliklerini özetleyen Veri Mimarı görseli',
    source: 'Trendyol kargo tarifeleri · 16.07.2026 vs 10.08.2026',
    sourceNote:
      'Paylaşılan oranlar KDV hariç tarife karşılaştırmasına dayanır. KDV dahil ek yük, sipariş ekonomisi hesabında ayrıca ele alınmalıdır.',
    stats: [
      { label: 'PTT / 6 DESİ', value: '+%13,10', detail: 'Küçük desilerde ayrışan artış' },
      { label: 'PTT / 7 DESİ', value: '+%14,16', detail: 'Operasyon karmasında kritik eşik' },
      { label: 'TEX / 30 DESİ', value: '+%9,63', detail: '328,88 TL → 360,55 TL' },
      { label: 'KDV DAHİL', value: '+≈38 TL', detail: 'Tek TEX gönderisindeki yaklaşık ek yük' },
    ],
    sections: [
      {
        id: 'tek-oran-degil',
        heading: 'Tarife tek oranlı değil.',
        paragraphs: [
          'Trendyol’un 10 Ağustos 2026 tarifesi, PTT tarafında tek oranlı bir fiyat güncellemesi getirmiyor. Özellikle küçük ve orta desilerde maliyet artışı ciddi şekilde ayrışıyor.',
        ],
        bullets: [
          'PTT 6 desi → +%13,10',
          'PTT 7 desi → +%14,16',
          '10–100 desi bandında artış büyük ölçüde %8 civarında ilerliyor.',
        ],
      },
      {
        id: 'tex-degisikligi',
        heading: 'TEX fiyatlarını da hesaba katın.',
        paragraphs: [
          'Tarifenin gözden kaçabilecek ikinci tarafı TEX fiyatlarının da değişmesi. 30 deside 328,88 TL olan ücret 360,55 TL’ye çıkıyor: tek gönderide +31,67 TL, yani +%9,63.',
          'KDV dahil edildiğinde tek gönderideki ek yük yaklaşık 38 TL’ye ulaşıyor.',
        ],
      },
      {
        id: 'siparis-ekonomisi',
        heading: 'Buradan sonrası yüzde hesabı değil, sipariş ekonomisi.',
        paragraphs: [
          'Operasyonunuz ağırlıklı olarak 6–7 desi siparişlerden oluşuyorsa bütçeyi “kargoya %8 zam geldi” varsayımıyla güncellemek maliyeti eksik hesaplamak demek.',
          'Satış fiyatınız aynı kaldığında bu para doğrudan katkı payınızdan çıkar.',
        ],
        bullets: [
          'Ayda 100 adet 30 desi TEX gönderisi → yaklaşık 3.800 TL ek maliyet',
          'Ayda 500 gönderi → yaklaşık 19.000 TL ek maliyet',
          'Ayda 1.000 gönderi → yaklaşık 38.000 TL ek maliyet',
        ],
      },
      {
        id: 'karar-listesi',
        heading: 'Tarife değişince hangi kararlar yeniden hesaplanmalı?',
        paragraphs: [
          'Kargo maliyetini yalnızca operasyon ekibinin konusu olarak görmeyin. Yeni tarife, ticari karar tablosunun birkaç satırını aynı anda değiştirir.',
        ],
        bullets: [
          'Ürün bazlı kârlılık',
          'Kampanya marjı',
          'Ücretsiz kargo eşiği',
          'Başa baş ROAS',
          'Reklam için ayırabileceğiniz maksimum tutar',
        ],
      },
      {
        id: 'barem-alti',
        heading: 'Bir detay: barem altı uygulaması.',
        paragraphs: [
          'Barem altı uygulamasına dahil gönderiler ana tarife üzerinden faturalandırılmıyor. Bu nedenle doğru analiz “Kargo ne kadar zamlandı?” sorusuyla bitmiyor.',
          'Asıl soru şu: “Benim sipariş karmamda yeni tarife, sipariş başına katkı payını kaç TL düşürüyor?”',
        ],
      },
    ],
  },
]

export function getAnnouncement(slug: string) {
  return announcements.find((announcement) => announcement.slug === slug)
}

export type AnnouncementSortOrder = 'newest' | 'oldest' | 'updated'

export function sortAnnouncements(items: Announcement[], order: AnnouncementSortOrder = 'newest') {
  return [...items].sort((a, b) => {
    if (order === 'oldest') return a.addedOrder - b.addedOrder
    if (order === 'updated') {
      const updatedDifference = b.updatedAt.localeCompare(a.updatedAt)
      return updatedDifference || b.addedOrder - a.addedOrder
    }
    return b.addedOrder - a.addedOrder
  })
}
