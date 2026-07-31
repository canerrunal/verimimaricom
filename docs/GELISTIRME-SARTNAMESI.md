---
title: "Veri Mimarı Web Platformu — Yazılım Geliştirme Şartnamesi"
document_type: "Product Requirements Document + Technical Specification"
version: "1.0"
status: "development-ready"
owner: "Caner Ünal"
product: "Veri Mimarı"
repository: "caner8047-coder/verimimaricom"
production_domain: "verimimari.com"
prepared_at: "2026-07-31"
primary_language: "tr-TR"
secondary_language: "en-US"
content_source: "docs/içerik.md"
recommended_path: "docs/GELISTIRME-SARTNAMESI.md"
---

# Veri Mimarı Web Platformu
## Yazılım Geliştirme Şartnamesi

> Bu doküman ürün yöneticisi, yazılım geliştirici, UI/UX tasarımcısı, içerik yöneticisi ve QA ekibi için bağlayıcı geliştirme kaynağıdır.
>
> Marka metinleri ve editoryal kurallar için `docs/içerik.md`; teknik uygulama kapsamı, görevler ve kabul kriterleri için bu dosya esas alınmalıdır.

---

# 1. Dokümanın amacı

Bu dokümanın amacı mevcut `verimimaricom` kod tabanını aşağıdaki ürüne dönüştürmek için yazılım ekibine uygulanabilir görevler vermektir:

> **E-ticaret verisini daha kârlı kararlara dönüştüren ücretsiz araçlar, rehberler ve ürünlerden oluşan bir platform.**

Mevcut site ağırlıklı olarak kişisel portföy, teknik profil, Digital Garden, AI chatbot, vaka analizi ve premium üyelik denemelerini aynı ana sayfada göstermektedir.

Yeni sürümde öncelik sırası değişecektir:

1. Kullanıcının e-ticaret problemini çözmek
2. Ücretsiz araç kullandırmak
3. Rehberlerle güven oluşturmak
4. Projeleri ve Zolm'u tanıtmak
5. E-posta listesi oluşturmak
6. Kurucu profilini destekleyici güven katmanı olarak kullanmak

Bu dönüşüm yalnızca görsel redesign değildir. Bilgi mimarisi, CMS modelleri, SEO, ölçüm sistemi, veri güvenliği ve ürün mantığı birlikte yeniden ele alınmelidir.

---

# 2. Ürün hedefi

## 2.1 Birincil ürün hedefi

E-ticaret yapan kullanıcıların aşağıdaki işleri hızlı şekilde tamamlayabileceği güvenilir bir web platformu oluşturmak:

- Başabaş ROAS hesaplamak
- Ürün kâr marjını hesaplamak
- İndirim senaryolarını karşılaştırmak
- Pazaryeri komisyon etkisini görmek
- Reklam ve operasyon metriklerini öğrenmek
- İlgili rehber ve ürünlere geçmek

## 2.2 İlk sürümün kuzey yıldızı metriği

> **Haftalık nitelikli araç kullanıcısı**

Nitelikli araç kullanıcısı aşağıdaki koşulları karşılar:

- Bir araç sayfasını açmıştır.
- Zorunlu alanların tamamını veya en az %80'ini doldurmuştur.
- Hesaplama sonucuna ulaşmıştır.

Yalnızca sayfa görüntüleme veya sosyal medya takipçi sayısı ürün başarısı olarak kabul edilmez.

## 2.3 İş hedefleri

- Organik arama üzerinden problem odaklı trafik oluşturmak
- Ücretsiz araç kullanımından e-posta üyeliğine geçiş sağlamak
- Kullanıcılara Zolm ve diğer ürünleri doğal bağlamda tanıtmak
- Caner Ünal'ın uzmanlığını çalışan ürünlerle kanıtlamak
- Türkiye'de e-ticaret araçları kategorisinde güvenilir referans marka oluşturmak

---

# 3. Kapsam

## 3.1 MVP kapsamı — P0

MVP aşağıdaki teslimleri kapsar:

- Yeni global navigasyon
- Yeni ana sayfa
- Araçlar liste sayfası
- Başabaş ROAS Hesaplayıcı
- Rehberler liste sayfası
- Rehber detay sayfası
- Projeler liste sayfası
- Proje detay sayfası
- Vaka analizleri liste ve detay sayfası
- Caner Ünal hakkında sayfası
- Bülten kayıt bileşeni
- Gizlilik ve araç veri politikası
- Sanity CMS şema güncellemesi
- Teknik SEO iyileştirmeleri
- Analitik event sistemi
- Erişilebilirlik kontrolleri
- Temel unit, integration ve E2E testleri
- Production kalite kapıları

## 3.2 İkinci faz — P1

- Kâr Marjı Hesaplayıcı
- İndirim Kârlılık Simülatörü
- Pazaryeri Komisyon Hesaplayıcı
- Araç sonuçlarını paylaşılabilir URL ile saklama
- E-posta ile sonuç özeti
- Arama ve filtreleme
- İçerik kategori landing page'leri
- Türkçe ve İngilizce içerik eşleme sistemi
- Kullanıcı geri bildirim modülü
- Zolm bekleme listesi
- Geliştirilmiş dashboard ve funnel raporları

## 3.3 Sonraki faz — P2

- Kullanıcı hesabı
- Kaydedilmiş hesaplamalar
- Premium üyelik
- Gelişmiş mağaza entegrasyonları
- Ürün bazlı toplu veri yükleme
- AI destekli analiz
- Veri Mimarı Pro
- Kişiselleştirilmiş dashboard
- Ücretli rapor ve şablon sistemi

## 3.4 MVP dışında tutulacak işler

Aşağıdakiler ilk sürümün yayınını engellememelidir:

- Kapsamlı RAG veya bilgi grafiği deneyimi
- Genel amaçlı AI chatbot
- Tam üyelik ve ödeme sistemi
- Çok kiracılı SaaS mimarisi
- Mağaza API entegrasyonları
- Native mobil uygulama
- Gelişmiş topluluk özellikleri
- Çok kapsamlı İngilizce içerik kataloğu

---

# 4. Mevcut sistem özeti

## 4.1 Mevcut teknoloji yığını

Kod tabanında tespit edilen temel yığın:

- Next.js App Router `15.1.x`
- React `19.x`
- TypeScript `5.9.x`
- Sanity `4.x`
- `next-sanity`
- Supabase istemci ve SSR paketleri
- Vercel deployment
- Vercel AI SDK ve OpenAI entegrasyonu
- Mermaid
- GitHub Actions
- Özel smoke test scripti

## 4.2 Mevcut ana klasörler

```text
src/
├── app/
│   ├── api/
│   ├── blog/
│   ├── en/
│   ├── labs/
│   ├── projeler/[slug]/
│   ├── studio/[[...index]]/
│   ├── uyelik/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── robots.ts
│   └── sitemap.ts
├── components/
│   ├── analytics/
│   ├── case-study/
│   ├── garden/
│   ├── labs/
│   ├── landing/
│   ├── membership/
│   ├── navigation/
│   └── veribot/
├── lib/
│   ├── ai/
│   ├── rag/
│   ├── analytics.ts
│   ├── blog.ts
│   ├── cms.ts
│   ├── commerce.ts
│   ├── entitlements.ts
│   ├── i18n.ts
│   ├── membership.ts
│   ├── sanity.ts
│   ├── seo.ts
│   ├── storage.ts
│   └── supabase.ts
└── sanity/
    └── schemaTypes.ts
```

## 4.3 Mevcut CMS modelleri

Mevcut Sanity şemalarında şu modeller bulunmaktadır:

- `contentBase`
- `tag`
- `blogPost`
- `skill`
- `caseStudy`
- `caseMetric`

Yeni ürün yapısını desteklemek için bu modeller tek başına yeterli değildir.

## 4.4 Korunacak bileşenler

Aşağıdaki yapılar uygun şekilde refactor edilerek korunabilir:

- Sanity istemci ve fetch altyapısı
- Metadata yardımcıları
- JSON-LD üretimi
- Analytics adapter yaklaşımı
- GitHub Actions kalite süreci
- Smoke test yaklaşımı
- Mermaid render sistemi
- Digital Garden içerik olgunluk mantığı
- Türkçe/İngilizce dictionary yaklaşımı
- Vercel güvenlik başlıkları
- Supabase yardımcıları

## 4.5 Kaldırılacak veya geri plana alınacak yapılar

MVP ana akışından çıkarılacak:

- `PersonaQuickPaths`
- Recruiter Path
- Business Path
- Builder Path
- Ana sayfadaki Knowledge Graph
- Global ve sürekli açık VeriBot
- Global ziyaretçi sayacı görünümü
- Navigasyondaki Premium bağlantısı
- Son kullanıcıya açık üyelik demo akışı
- Teknik yetenek kartlarının ana sayfadaki önceliği

Bu özellikler tamamen silinmek zorunda değildir. Aşağıdaki alanlara taşınabilir:

- `/labs`
- `/hakkinda/teknik`
- feature flag arkasındaki deneysel alanlar
- ileriki ürün fazları

---

# 5. Mevcut teknik borç ve kritik sorunlar

## 5.1 TypeScript güvenliği

Temel dosyalarda `// @ts-nocheck` kullanılmaktadır.

Etkilenen kritik örnekler:

- `src/app/page.tsx`
- `src/app/layout.tsx`
- `src/app/sitemap.ts`
- `src/app/robots.ts`
- `src/lib/cms.ts`
- `src/lib/analytics.ts`
- `src/lib/seo.ts`

### Gereksinim

- P0 kapsamında yeni yazılan hiçbir dosyada `@ts-nocheck` kullanılmayacak.
- Dokunulan eski dosyalardan `@ts-nocheck` kaldırılacak.
- `any` yalnızca gerekçeli ve yorumla açıklanmış istisnalarda kullanılacak.
- CMS sorgu çıktıları için açık TypeScript tipleri oluşturulacak.

---

## 5.2 Eksik veya hatalı rota yapısı

Mevcut sitemap içinde `/projeler` rotası bulunmasına rağmen mevcut app ağacında yalnızca `/projeler/[slug]` görülmektedir.

### Gereksinim

- `/projeler/page.tsx` oluşturulacak.
- Sitemap yalnızca gerçekten çalışan ve indekslenebilir rotaları içerecek.
- Build sırasında rota doğrulama smoke testi çalışacak.
- 404 dönen hiçbir URL sitemap'e girmeyecek.

---

## 5.3 Global canonical sorunu

Root layout içinde canonical `/` olarak tanımlanmıştır.

### Risk

Alt sayfalar kendi metadata değerini üretmezse Google alt sayfaları ana sayfanın kopyası gibi değerlendirebilir.

### Gereksinim

- Global layout yalnızca `metadataBase`, title template ve ortak değerleri tanımlamalı.
- Her indekslenebilir sayfa `generateMetadata` veya statik metadata ile kendi canonical URL'sini üretmeli.
- Locale sayfaları doğru `hreflang` eşleşmesini sağlamalı.
- Canonical query string içermemeli.
- Trailing slash kararı tüm site boyunca tutarlı olmalı.

---

## 5.4 Robots kapsamı

Mevcut robots konfigürasyonu tüm siteye izin vermektedir.

### Gereksinim

Aşağıdaki alanlar taramaya kapatılmalı:

```text
/studio/
/api/
/uyelik/
/preview/
/draft/
/_internal/
```

Not:

- API rotalarının robots ile engellenmesi güvenlik önlemi değildir.
- API güvenliği ayrıca authentication, authorization ve rate limit ile sağlanmalıdır.

---

## 5.5 Demo üyelik akışı

`/uyelik` sayfası demo aktifleştirme ve ödeme entegrasyonu açıklamalarını son kullanıcıya göstermektedir.

### Gereksinim

MVP'de:

- Navigasyondan kaldırılacak.
- `noindex, nofollow` uygulanacak.
- Üretim ortamında demo unlock aksiyonu kapatılacak.
- İlgili API endpoint'i feature flag veya environment kontrolü olmadan çalışmayacak.
- Premium geliştirmesi P2 backlog'a taşınacak.

---

## 5.6 Demo vaka verileri

Fallback vaka içinde örnek müşteri adı ve yüksek performans sonuçları bulunmaktadır.

### Risk

Sanity verisi bulunmadığında demo veriler gerçek müşteri sonucu gibi görüntülenebilir.

### Gereksinim

- Production'da sentetik metrik içeren fallback otomatik olarak gösterilmeyecek.
- Veri bulunamazsa boş durum gösterilecek.
- Demo vaka için `caseType: demo` zorunlu olacak.
- Sayfanın üst kısmında görünür demo etiketi bulunacak.
- Demo case JSON-LD içinde müşteri başarısı olarak işaretlenmeyecek.

---

## 5.7 Test eksikliği

Mevcut kalite kapıları build ve smoke test odaklıdır.

### Gereksinim

P0'a eklenecek:

- ESLint
- Prettier kontrolü
- Type check
- Unit test
- Component/integration test
- E2E test
- Accessibility smoke test
- Broken-link/route test

---

## 5.8 Global VeriBot yükü ve odağı

`VeriBotChat` root layout içinde tüm sayfalarda render edilmektedir.

### Gereksinim

MVP'de iki seçenekten biri uygulanmalı:

**Tercih edilen:**

- VeriBot global layout'tan kaldırılır.
- `/labs/veribot` altına taşınır.

**Alternatif:**

- Yalnızca belirli rehber veya araç sayfalarında lazy load edilir.
- Kullanıcı açmadan AI isteği oluşturulmaz.
- Feature flag ile kontrol edilir.
- Kullanıcı girdileri ve üçüncü taraf veri aktarımı açıkça belirtilir.

---

# 6. Hedef bilgi mimarisi

## 6.1 Ana navigasyon

Masaüstü:

```text
Logo
Araçlar
Rehberler
Vaka Analizleri
Projeler
Hakkında
[Ücretsiz Araçları Kullan]
```

Mobil:

- Logo
- Menü butonu
- Açılır navigasyon
- Sabit CTA zorunlu değil
- Menü açıldığında focus trap uygulanmalı

## 6.2 Hedef rota ağacı

```text
/
├── araclar/
│   ├── basabas-roas-hesaplayici/
│   ├── kar-marji-hesaplayici/              # P1
│   ├── indirim-karlilik-hesaplayici/       # P1
│   └── pazaryeri-komisyon-hesaplayici/     # P1
├── rehberler/
│   ├── [slug]/
│   ├── e-ticaret-karliligi/
│   ├── dijital-reklam/
│   ├── pazaryerleri/
│   └── yapay-zeka-otomasyon/
├── vaka-analizleri/
│   └── [slug]/
├── projeler/
│   └── [slug]/
├── hakkinda/
├── hakkinda/teknik/                         # P1
├── bulten/
├── is-birligi/
├── gizlilik/
├── cerez-politikasi/
├── kullanim-kosullari/
├── labs/
└── en/                                      # Kademeli
```

## 6.3 Eski rotalar için yönlendirme

Aşağıdaki yönlendirmeler planlanmalıdır:

| Eski rota | Yeni rota | Kod |
|---|---|---:|
| `/blog` | `/rehberler` | 301 |
| `/blog/[slug]` | `/rehberler/[slug]` | 301 |
| `/uyelik` | `/bulten` veya 410 | Karara bağlı |
| WordPress `?p=*` | Eşleşen yeni içerik veya `/` | 301 |
| Eski proje slug'ları | Yeni `/projeler/[slug]` | 301 |
| Gereksiz demo rotaları | Uygun hedef veya 410 | Karara bağlı |

Yönlendirme tablosu ayrı veri yapısında tutulmalı ve test edilmelidir.

---

# 7. Sayfa gereksinimleri

# 7.1 Ana sayfa — `/`

## Amaç

Kullanıcıya ilk 5 saniyede şu mesajı vermek:

- Platform e-ticaret içindir.
- Ücretsiz kullanılabilir araçlar vardır.
- Araçlar kârlılık ve karar verme problemlerini çözer.
- Caner Ünal ürünlerin arkasındaki kişidir.

## Bölüm sırası

1. Duyuru bandı
2. Header
3. Hero
4. Problem ve değer önerisi
5. Öne çıkan araçlar
6. Öne çıkan rehberler
7. Projeler/Zolm
8. Vaka analizleri
9. Kurucu bölümü
10. Bülten CTA
11. Footer

## Fonksiyonel gereksinimler

- İçeriklerin çoğu Sanity veya merkezi config üzerinden yönetilebilir olmalı.
- En fazla 3 araç kartı gösterilmeli.
- En fazla 3 rehber gösterilmeli.
- Eksik CMS verisinde sentetik başarı verisi gösterilmemeli.
- Bölümler kendi semantik elementlerini kullanmalı.
- Hero CTA click event üretmeli.
- Core content server-rendered olmalı.
- Ana sayfa Knowledge Graph içermemeli.

## Kabul kriterleri

- H1 yalnızca bir adet.
- Mobil 360 px genişlikte yatay scroll yok.
- Birincil CTA ilk viewport içinde görünür.
- JavaScript devre dışı olduğunda temel metin ve bağlantılar erişilebilir.
- Lighthouse performans, erişilebilirlik, best practices ve SEO hedefleri sağlanır.
- Ana sayfa CLS değeri kabul sınırı içinde kalır.
- Hero görseli LCP'yi gereksiz yükseltmez.

---

# 7.2 Araçlar liste sayfası — `/araclar`

## Amaç

Tüm aktif araçları kategori ve durumlarıyla göstermek.

## Kart alanları

- Araç adı
- Kısa açıklama
- Kategori
- Durum
- Kullanım süresi
- Fiyat etiketi
- Son güncelleme
- CTA
- Opsiyonel ikon

## Durum enum

```ts
type ToolStatus =
  | 'draft'
  | 'beta'
  | 'live'
  | 'maintenance'
  | 'archived'
```

## Filtreler

MVP:

- Tümü
- Kârlılık
- Reklam
- Pazaryeri
- Operasyon

Filtreler URL query parametresiyle senkronize olmalı:

```text
/araclar?kategori=karlilik
```

## Kabul kriterleri

- Filtre değişimi sayfa yenilemeden çalışır.
- Filtreli URL paylaşılabilir.
- Boş sonuç durumu vardır.
- Arşiv araçları varsayılan listede gösterilmez.
- Filtre butonları keyboard ile kullanılabilir.

---

# 7.3 Başabaş ROAS Hesaplayıcı

## Rota

```text
/araclar/basabas-roas-hesaplayici
```

## Amaç

Kullanıcının değişken maliyetleri üzerinden:

- Reklam öncesi katkı payını
- Başabaş CPA'yı
- Başabaş ROAS'ı
- Hedef CPA'yı
- Hedef ROAS'ı

hesaplamak.

## 7.3.1 MVP giriş alanları

| Alan | Teknik ad | Tip | Zorunlu | Min | Max |
|---|---|---|---:|---:|---:|
| Satış fiyatı | `salePrice` | currency | Evet | 0.01 | 100000000 |
| Ürün maliyeti | `productCost` | currency | Evet | 0 | 100000000 |
| Komisyon oranı | `commissionRate` | percent | Hayır | 0 | 100 |
| Ödeme kesinti oranı | `paymentFeeRate` | percent | Hayır | 0 | 100 |
| Gidiş kargo | `shippingCost` | currency | Hayır | 0 | 1000000 |
| Paketleme | `packagingCost` | currency | Hayır | 0 | 1000000 |
| İade oranı | `returnRate` | percent | Hayır | 0 | 100 |
| İade başına kayıp | `returnCost` | currency | Hayır | 0 | 1000000 |
| Diğer değişken gider | `otherVariableCost` | currency | Hayır | 0 | 1000000 |
| Hedef kâr oranı | `targetMarginRate` | percent | Hayır | 0 | 100 |

Varsayılan değerler:

```ts
{
  commissionRate: 0,
  paymentFeeRate: 0,
  shippingCost: 0,
  packagingCost: 0,
  returnRate: 0,
  returnCost: 0,
  otherVariableCost: 0,
  targetMarginRate: 10
}
```

## 7.3.2 Hesaplama formülleri

```ts
commissionCost = salePrice * (commissionRate / 100)

paymentFeeCost = salePrice * (paymentFeeRate / 100)

expectedReturnCost = returnCost * (returnRate / 100)

totalVariableCostBeforeAds =
  productCost +
  commissionCost +
  paymentFeeCost +
  shippingCost +
  packagingCost +
  expectedReturnCost +
  otherVariableCost

contributionBeforeAds =
  salePrice - totalVariableCostBeforeAds

breakEvenCPA =
  contributionBeforeAds

breakEvenROAS =
  salePrice / breakEvenCPA

targetProfitPerOrder =
  salePrice * (targetMarginRate / 100)

targetCPA =
  contributionBeforeAds - targetProfitPerOrder

targetROAS =
  salePrice / targetCPA
```

## 7.3.3 Geçersiz durumlar

Aşağıdaki durumlarda sonuç hesaplanmamalı veya özel mesaj gösterilmelidir:

```text
salePrice <= 0
contributionBeforeAds <= 0
targetCPA <= 0
NaN veya Infinity oluşması
oranların 0–100 dışında olması
maliyetlerin negatif olması
```

Mesaj örneği:

> Reklam vermeden önce dahi sipariş başına katkı payı oluşmuyor. Satış fiyatını veya maliyetleri kontrol edin.

## 7.3.4 KDV yaklaşımı

MVP'de hesaplama “kullanıcının girdiği tutarlar aynı muhasebe bazındadır” varsayımıyla yapılacaktır.

Arayüzde açık uyarı:

> Bu sürüm KDV mahsuplaşmasını ve sabit giderleri ayrı ayrı modellemez. Tüm tutarları aynı KDV yaklaşımıyla girin.

P1 gelişmiş mod:

- KDV dahil/hariç seçimleri
- satış KDV oranı
- maliyet KDV oranları
- indirilebilir KDV varsayımları
- kanal bazlı muhasebe modu

KDV gelişmiş modu mali müşavir doğrulaması olmadan production'a alınmamalıdır.

## 7.3.5 Sonuç kartları

Gösterilecek:

1. Reklam öncesi katkı payı
2. Toplam değişken maliyet
3. Başabaş CPA
4. Başabaş ROAS
5. Hedef CPA
6. Hedef ROAS
7. Maliyet dağılımı
8. Kısa yorum

Örnek yorum:

> Başabaş ROAS değeriniz 2,74. Girdiğiniz varsayımlara göre her 1 TL reklam harcaması için en az 2,74 TL gelir üretmeniz gerekir.

## 7.3.6 Form davranışı

- Hesaplama istemci tarafında yapılacak.
- Form submit olmadan her tuşta ağır hesaplama yapılmamalı.
- “Hesapla” aksiyonu bulunmalı.
- Kullanıcı sonuçtan sonra değerleri değiştirebilmeli.
- Sayısal alanlar Türkçe sayı formatını desteklemeli.
- Virgül ve nokta girişleri normalize edilmeli.
- Currency çıktıları `tr-TR`, `TRY` formatında gösterilmeli.
- Form state ilk MVP'de sunucuya gönderilmemeli.
- Local storage yalnızca açık kullanıcı tercihiyle kullanılmalı.

## 7.3.7 Paylaşım

MVP:

- “Sonucu kopyala” butonu
- Hassas girişleri URL'ye yazmadan kısa metin paylaşımı

P1:

- İmzalı veya anonim share token
- Süresi dolan sonuç sayfası
- Kullanıcının açık onayı

## 7.3.8 Analitik

Zorunlu event'ler:

```text
tool_view
tool_start
tool_complete
tool_validation_error
tool_result_copy
tool_reset
tool_to_guide_click
tool_to_product_click
newsletter_signup_start
newsletter_signup_complete
```

Event payload örnekleri:

```ts
{
  tool_id: 'break_even_roas',
  tool_version: '1.0',
  source: 'direct|organic|instagram|linkedin|email|unknown',
  locale: 'tr-TR',
  completion_time_bucket: '0-30s|31-60s|61-180s|180s+'
}
```

Gönderilmemesi gerekenler:

- Satış fiyatı
- Ürün maliyeti
- Tam form girdileri
- E-posta
- Kullanıcının hesaplama sonucu
- Kişisel veya ticari hassas veri

## 7.3.9 Test senaryoları

### Senaryo A

```text
Satış fiyatı: 1000
Ürün maliyeti: 300
Komisyon: %15
Ödeme kesintisi: %0
Kargo: 80
Paketleme: 20
İade oranı: %10
İade maliyeti: 100
Diğer: 0
Hedef marj: %10
```

Beklenen:

```text
Komisyon: 150
Beklenen iade maliyeti: 10
Toplam değişken maliyet: 560
Katkı payı: 440
Başabaş CPA: 440
Başabaş ROAS: 2.2727...
Hedef kâr: 100
Hedef CPA: 340
Hedef ROAS: 2.9411...
```

UI yuvarlama:

```text
Başabaş ROAS: 2,27
Hedef ROAS: 2,94
```

### Senaryo B

```text
Satış fiyatı: 500
Ürün maliyeti: 600
```

Beklenen:

- Hesaplama uyarısı
- ROAS sonucu gösterilmez
- Kullanıcı maliyetlerini kontrol etmeye yönlendirilir

### Senaryo C

```text
Tüm opsiyonel alanlar: 0
Satış fiyatı: 100
Ürün maliyeti: 50
```

Beklenen:

```text
Başabaş CPA: 50
Başabaş ROAS: 2
```

---

# 7.4 Rehberler liste sayfası — `/rehberler`

## Gereksinimler

- Kategori filtreleri
- Son güncellenen içerikler
- Temel kaynak etiketi
- Arama alanı P1
- Sayfalama veya load more
- Sanity verisi
- SEO category intro content
- Boş durum
- Skeleton yerine server-rendered content tercih edilir

## İçerik kartı

```ts
type GuideCard = {
  title: string
  slug: string
  excerpt: string
  category: CategorySummary
  maturity: 'seed' | 'growing' | 'evergreen'
  publishedAt?: string
  updatedAt?: string
  readingTimeMinutes?: number
  featuredImage?: ImageAsset
  relatedTool?: ToolSummary
}
```

---

# 7.5 Rehber detay sayfası — `/rehberler/[slug]`

## Zorunlu bölümler

- Breadcrumb
- H1
- Excerpt
- Yazar
- Yayın tarihi
- Güncelleme tarihi
- İçerik olgunluk etiketi
- İçindekiler
- Portable Text gövdesi
- İlgili araç CTA
- İlgili rehberler
- Kaynaklar
- Yasal/finansal uyarı, gerektiğinde
- Bülten CTA

## Teknik gereksinimler

- `generateStaticParams` veya uygun ISR stratejisi
- Sanity preview desteği P1
- Portable Text custom component'leri
- Heading anchor'ları
- Kod blokları
- Tablo
- Callout
- Formül
- Görsel açıklaması
- External link güvenlik attributeleri
- Okuma süresi server-side hesaplanmalı
- Article JSON-LD

---

# 7.6 Projeler liste sayfası — `/projeler`

## Amaç

Zolm ve diğer ürünleri portföy kartı değil, problem çözen ürünler olarak göstermek.

## Kart alanları

- Ürün adı
- Değer önerisi
- Durum
- Hedef kullanıcı
- Logo/görsel
- Son güncelleme
- CTA

## Durum enum

```ts
type ProjectStatus =
  | 'idea'
  | 'prototype'
  | 'beta'
  | 'live'
  | 'paused'
  | 'archived'
```

---

# 7.7 Proje detay sayfası — `/projeler/[slug]`

## Zorunlu içerik

- Ürün adı
- Tek cümlelik değer önerisi
- Durum etiketi
- Problem
- Hedef kullanıcı
- Çözüm
- Çalışan özellikler
- Yol haritasındaki özellikler
- Ekran görüntüleri
- Geliştirme notları
- Gizlilik/veri yaklaşımı
- Demo veya bekleme listesi CTA
- Veri Mimarı bağlantısı

## Kabul kriterleri

- Planlanan özellik çalışan özellik gibi gösterilmez.
- Beta ve canlı sürüm açıkça ayrılır.
- Dış demo bağlantısı güvenli şekilde açılır.
- Repo bağlantısı opsiyoneldir.
- Zolm sayfası marka anlatımından bağımsız ürün değeri sunar.

---

# 7.8 Vaka analizleri

## Rotalar

```text
/vaka-analizleri
/vaka-analizleri/[slug]
```

## Vaka türleri

```ts
type CaseStudyType =
  | 'verified_client'
  | 'anonymized_client'
  | 'internal_project'
  | 'demo'
```

## Zorunlu alanlar

- Vaka türü
- Başlık
- Problem
- Hedef
- Başlangıç dönemi
- Sonuç dönemi
- Veri kaynakları
- Yöntem
- Metrikler
- Sonuç özeti
- Sınırlamalar
- Doğrulama notu
- Demo uyarısı
- İlgili proje/araç

## Metrik modeli

```ts
type CaseMetric = {
  key: string
  label: string
  baselineValue?: number
  resultValue?: number
  unit?: string
  periodLabel?: string
  direction?: 'increase' | 'decrease' | 'neutral'
  sourceNote?: string
  isSimulated: boolean
}
```

## Demo kabul kriteri

`caseType === 'demo'` ise:

- Üst bölümde görünür uyarı
- Her metrikte simülasyon durumu
- Gerçek müşteri logosu kullanılamaz
- “Başarı” schema'sı üretilemez
- Sosyal medya paylaşım metni demo bilgisini içerir

---

# 7.9 Hakkında sayfası — `/hakkinda`

## Bölümler

- Caner Ünal tanıtımı
- Veri Mimarı neden kuruldu?
- Çalışma alanları
- Yaklaşım
- Seçilmiş projeler
- Teknik profile geçiş
- İş birliği CTA
- Sosyal profil bağlantıları

## Gereksinim

Kişisel kariyer bilgileri ana ürün mesajının önüne geçmemelidir.

---

# 7.10 Bülten — `/bulten`

## MVP seçenekleri

Tercih sırası:

1. Mevcut güvenilir e-posta sağlayıcısı
2. Supabase + transaction email entegrasyonu
3. Geçici bekleme listesi tablosu

## Form alanları

- E-posta
- Açık rıza checkbox
- Opsiyonel ad
- Kaynak bilgisi hidden field

## Gereksinimler

- Server-side validation
- Rate limit
- Honeypot
- Duplicate email davranışı
- Double opt-in tercih edilir
- KVKK aydınlatma bağlantısı
- Başarı ve hata durumları
- E-posta analytics event'lerinde plaintext email bulunmamalı

---

# 7.11 Footer

## Kolonlar

- Araçlar
- Rehberler
- Projeler
- Marka
- Yasal

## Zorunlu bağlantılar

- Hakkında
- İş birliği
- Gizlilik
- Çerez politikası
- Kullanım koşulları
- Instagram
- LinkedIn
- GitHub

## Alt satır

```text
© [currentYear] Veri Mimarı. Caner Ünal tarafından geliştirildi.
```

Yıl dinamik olmalı.

---

# 8. CMS mimarisi

## 8.1 Genel karar

Sanity korunacaktır.

Mevcut `contentBase` referans modeli yeni sürümde karmaşıklık yaratıyorsa iki yaklaşım değerlendirilebilir:

### Seçenek A — Mevcut modeli genişlet

- Daha düşük migration maliyeti
- Mevcut içerikler korunur
- Reference çözümleme devam eder

### Seçenek B — İçerik türlerini bağımsızlaştır

- Daha basit editör deneyimi
- Daha güçlü type generation
- Daha kolay sorgular
- Migration gerekir

**Önerilen:** Bağımsız içerik modellerine geçiş ve migration scripti.

---

## 8.2 Yeni Sanity modelleri

## `siteSettings`

```ts
{
  _type: 'siteSettings',
  title: string,
  description: string,
  logo: image,
  defaultOgImage: image,
  announcement?: {
    enabled: boolean,
    text: string,
    href: string,
    startsAt?: datetime,
    endsAt?: datetime
  },
  socialLinks: SocialLink[],
  contactEmail: string,
  newsletterTitle: string,
  newsletterDescription: string
}
```

Tekil document olmalı.

## `author`

```ts
{
  _type: 'author',
  name: string,
  slug: slug,
  role: string,
  shortBio: text,
  bio: portableText,
  image: image,
  email?: string,
  socialLinks: SocialLink[]
}
```

## `category`

```ts
{
  _type: 'category',
  title: string,
  slug: slug,
  description: text,
  categoryType: 'guide' | 'tool' | 'project',
  icon?: string,
  seo: SeoFields
}
```

## `guide`

```ts
{
  _type: 'guide',
  title: string,
  slug: slug,
  excerpt: text,
  body: portableText,
  featuredImage?: image,
  author: reference(author),
  category: reference(category),
  tags: reference(tag)[],
  maturity: 'seed' | 'growing' | 'evergreen',
  status: 'draft' | 'published' | 'archived',
  publishedAt: datetime,
  updatedAt?: datetime,
  reviewedAt?: datetime,
  reviewDueAt?: datetime,
  relatedTool?: reference(tool),
  relatedGuides?: reference(guide)[],
  sources?: Source[],
  locale: 'tr-TR' | 'en-US',
  translationOf?: reference(guide),
  seo: SeoFields
}
```

## `tool`

```ts
{
  _type: 'tool',
  name: string,
  slug: slug,
  shortDescription: text,
  longDescription?: portableText,
  category: reference(category),
  status: ToolStatus,
  version: string,
  isFree: boolean,
  estimatedUseMinutes?: number,
  icon?: image,
  heroImage?: image,
  route: string,
  methodologyGuide?: reference(guide),
  relatedGuides?: reference(guide)[],
  relatedProject?: reference(project),
  lastUpdatedAt: datetime,
  dataHandlingSummary: text,
  seo: SeoFields
}
```

Not:

Hesaplama formülleri CMS içinde çalıştırılabilir kod olarak tutulmamalıdır. Formül kodu repository içinde version control altında olmalıdır.

## `project`

```ts
{
  _type: 'project',
  name: string,
  slug: slug,
  tagline: string,
  summary: text,
  body?: portableText,
  status: ProjectStatus,
  targetAudience: string[],
  problem: text,
  solution: text,
  liveFeatures: Feature[],
  plannedFeatures: Feature[],
  screenshots: image[],
  logo?: image,
  demoUrl?: url,
  repositoryUrl?: url,
  waitlistUrl?: url,
  launchedAt?: date,
  lastUpdatedAt: datetime,
  developmentNotes?: reference(developmentNote)[],
  relatedTools?: reference(tool)[],
  seo: SeoFields
}
```

## `developmentNote`

```ts
{
  _type: 'developmentNote',
  title: string,
  slug: slug,
  project: reference(project),
  summary: text,
  body: portableText,
  noteType: 'decision' | 'release' | 'lesson' | 'experiment',
  publishedAt: datetime,
  seo: SeoFields
}
```

## `caseStudy`

Mevcut model migration ile genişletilecek:

```ts
{
  _type: 'caseStudy',
  title: string,
  slug: slug,
  excerpt: text,
  body?: portableText,
  caseType: CaseStudyType,
  clientDisplayName?: string,
  clientConsentConfirmed: boolean,
  industry?: string,
  problemStatement: text,
  goal?: text,
  methodology: portableText,
  outcomeSummary: text,
  limitations: text,
  verificationNote: text,
  startDate?: date,
  endDate?: date,
  dataSources: string[],
  metrics: CaseMetric[],
  relatedProject?: reference(project),
  relatedTool?: reference(tool),
  publishedAt: datetime,
  updatedAt?: datetime,
  seo: SeoFields
}
```

## `redirect`

```ts
{
  _type: 'redirect',
  source: string,
  destination: string,
  permanent: boolean,
  enabled: boolean
}
```

Redirect'lerin build-time veya edge seviyesinde nasıl uygulanacağı teknik ekip tarafından tek mekanizmaya bağlanmalıdır.

---

## 8.3 Ortak SEO alanı

```ts
type SeoFields = {
  metaTitle?: string
  metaDescription?: string
  canonicalUrl?: string
  noIndex?: boolean
  ogImage?: ImageAsset
}
```

Validation:

- `metaTitle` önerilen maksimum 60 karakter
- `metaDescription` önerilen maksimum 160 karakter
- canonical yalnızca güvenli ve izin verilen domain
- `noIndex` default false

---

## 8.4 Portable Text blokları

Desteklenecek custom block'lar:

- `callout`
- `formula`
- `dataTable`
- `codeBlock`
- `imageWithCaption`
- `toolCta`
- `projectCta`
- `sourceList`
- `faqItem`
- `prosCons`
- `metricCard`
- `demoNotice`

Her custom block için:

- Sanity preview
- Frontend renderer
- TypeScript tipi
- Unit testi
- Erişilebilir HTML çıktısı

---

## 8.5 Migration

Migration scriptleri:

```text
scripts/migrations/
├── 001-content-base-to-guide.mjs
├── 002-case-study-v2.mjs
├── 003-create-site-settings.mjs
└── 004-create-redirects.mjs
```

Kurallar:

- Migration dry-run desteği
- Backup alınmadan production dataset'e yazma yok
- Idempotent olmalı
- Değişiklik raporu üretmeli
- Eski document ID eşlemelerini saklamalı

---

# 9. Frontend mimarisi

## 9.1 Önerilen klasör yapısı

```text
src/
├── app/
│   ├── (marketing)/
│   │   ├── page.tsx
│   │   ├── hakkinda/
│   │   ├── projeler/
│   │   ├── rehberler/
│   │   ├── vaka-analizleri/
│   │   └── bulten/
│   ├── (tools)/
│   │   └── araclar/
│   ├── api/
│   ├── studio/
│   ├── sitemap.ts
│   ├── robots.ts
│   ├── not-found.tsx
│   ├── error.tsx
│   └── layout.tsx
├── components/
│   ├── ui/
│   ├── layout/
│   ├── home/
│   ├── tools/
│   ├── guides/
│   ├── projects/
│   ├── case-studies/
│   ├── newsletter/
│   └── analytics/
├── features/
│   └── break-even-roas/
│       ├── components/
│       ├── domain/
│       ├── schemas/
│       ├── tests/
│       └── index.ts
├── lib/
│   ├── analytics/
│   ├── cms/
│   ├── seo/
│   ├── validation/
│   ├── formatting/
│   └── security/
├── sanity/
│   ├── schemaTypes/
│   ├── queries/
│   └── types/
└── styles/
```

## 9.2 Domain logic ayrımı

ROAS hesaplama mantığı React component içinde yazılmamalıdır.

```text
features/break-even-roas/domain/calculateBreakEvenRoas.ts
```

Örnek imza:

```ts
export type BreakEvenRoasInput = {
  salePrice: number
  productCost: number
  commissionRate: number
  paymentFeeRate: number
  shippingCost: number
  packagingCost: number
  returnRate: number
  returnCost: number
  otherVariableCost: number
  targetMarginRate: number
}

export type BreakEvenRoasResult = {
  commissionCost: number
  paymentFeeCost: number
  expectedReturnCost: number
  totalVariableCostBeforeAds: number
  contributionBeforeAds: number
  breakEvenCPA: number
  breakEvenROAS: number
  targetProfitPerOrder: number
  targetCPA: number
  targetROAS: number
}

export function calculateBreakEvenRoas(
  input: BreakEvenRoasInput
): BreakEvenRoasResult
```

## 9.3 Validation

Form validation için tek schema kullanılmalıdır.

Öneri:

- Zod eklenecek
- Server ve client aynı kuralları kullanacak
- Hata mesajları Türkçe dictionary'den gelecek

Not: Yeni bağımlılık eklenmeden önce bundle etkisi ve bakım durumu değerlendirilmelidir.

---

# 10. Tasarım sistemi gereksinimleri

## 10.1 Genel yaklaşım

Marka görünümü:

- Premium
- Modern
- Güvenilir
- Veriye dayalı
- Sade
- Hızlı
- Koyu moda mahkûm olmayan

Teknik terminal estetiği ana deneyimi domine etmemelidir.

## 10.2 Design token'ları

CSS variable tabanlı:

```css
:root {
  --color-bg: ...;
  --color-surface: ...;
  --color-surface-elevated: ...;
  --color-text: ...;
  --color-text-muted: ...;
  --color-border: ...;
  --color-primary: ...;
  --color-primary-hover: ...;
  --color-success: ...;
  --color-warning: ...;
  --color-danger: ...;

  --radius-sm: ...;
  --radius-md: ...;
  --radius-lg: ...;
  --radius-xl: ...;

  --shadow-sm: ...;
  --shadow-md: ...;
  --shadow-lg: ...;

  --space-1: ...;
  --space-2: ...;
  --space-3: ...;
  --space-4: ...;
  --space-6: ...;
  --space-8: ...;
  --space-12: ...;
}
```

## 10.3 Temel UI bileşenleri

- Button
- LinkButton
- Input
- CurrencyInput
- PercentageInput
- Select
- Checkbox
- FormField
- Alert
- Badge
- Card
- ToolCard
- GuideCard
- ProjectCard
- MetricCard
- Breadcrumb
- Tabs
- Accordion
- Modal
- Drawer
- Toast
- Skeleton
- EmptyState
- ErrorState

Her bileşen:

- Keyboard erişimi
- Focus state
- Disabled state
- Error state
- Loading state
- Dark/light contrast kontrolü
- TypeScript prop tipi

---

# 11. Erişilebilirlik

Hedef:

> WCAG 2.2 AA

## Zorunlu maddeler

- Tüm form alanlarında görünür label
- Placeholder label yerine geçmez
- Hata mesajı `aria-describedby` ile bağlı
- Hata özeti focus alabilir
- Renk tek bilgi taşıyıcısı değildir
- Focus görünür
- Skip link vardır
- Mobil menü keyboard ile kullanılabilir
- Modal focus trap uygular
- ESC ile kapanma
- Hareket azaltma tercihi desteklenir
- Grafik ve maliyet dağılımı metinsel alternatif içerir
- Buton ve link ayrımı semantik
- Minimum dokunma alanı
- Heading sırası mantıklı
- Dil attribute'u doğru

## Otomasyon

- Axe tabanlı component testi
- Lighthouse CI veya eşdeğeri
- E2E kritik akışta erişilebilirlik kontrolü

---

# 12. SEO teknik gereksinimleri

## 12.1 Metadata

Her indekslenebilir sayfa:

- Benzersiz title
- Benzersiz description
- Canonical
- Open Graph
- Twitter card
- Robots kararı
- Locale
- Alternates
- OG image

## 12.2 Yapılandırılmış veri

| Sayfa | Schema |
|---|---|
| Global | Organization, Person, WebSite |
| Rehber | Article veya BlogPosting |
| Araç | SoftwareApplication |
| Proje | SoftwareApplication veya CreativeWork |
| Breadcrumb | BreadcrumbList |
| Hakkında | Person |
| SSS | Yalnızca görünür içerik varsa FAQPage |

## 12.3 Sitemap

Sitemap veri kaynakları:

- Statik sayfalar
- Yayındaki rehberler
- Canlı/beta araçlar
- Yayındaki projeler
- Yayındaki vaka analizleri
- İndekslenebilir locale sayfaları

Hariç tutulacak:

- Draft
- Noindex
- Studio
- API
- Demo üyelik
- Preview
- Arşivlenmiş sayfalar

`lastModified` gerçek CMS update tarihinden gelmeli. Her build'de tüm statik sayfalara “şimdi” tarihi vermek tercih edilmez.

## 12.4 Robots

Önerilen temel çıktı:

```txt
User-agent: *
Allow: /
Disallow: /studio/
Disallow: /api/
Disallow: /preview/
Disallow: /draft/
Disallow: /uyelik/

Sitemap: https://verimimari.com/sitemap.xml
```

## 12.5 Redirect ve eski WordPress URL'leri

- Search Console export'u alınacak.
- Eski indeksli URL'ler eşlenecek.
- Query bazlı WordPress URL'leri redirect testlerine eklenecek.
- Redirect chain oluşturulmayacak.
- Tek hop hedeflenecek.
- Hedefi olmayan eski düşük değerli URL'ler 410 olabilir.

---

# 13. Performans

## 13.1 Hedefler

Mobil p75 hedefleri:

- LCP ≤ 2.5 s
- INP ≤ 200 ms
- CLS ≤ 0.1
- TTFB makul CDN sınırında
- JS bundle araç sayfasında gereksiz AI kodu içermez

## 13.2 Gereksinimler

- Server Component varsayılan
- `use client` yalnızca etkileşim gereken bileşenlerde
- VeriBot bundle'ı ana sayfaya dahil edilmez
- Mermaid yalnızca gerektiği sayfada dynamic import
- Görseller `next/image`
- Font sayısı sınırlandırılır
- Above-fold görselleri optimize edilir
- Sanity görsellerinde ölçüler belirtilir
- Third-party script'ler consent ve performans değerlendirmesinden sonra yüklenir
- Araç hesaplama kodu hafif tutulur
- Büyük chart kütüphanesi MVP'de eklenmez

---

# 14. Analitik mimarisi

## 14.1 Genel karar

Mevcut çoklu adapter yaklaşımı sadeleştirilmeli.

Tek event API:

```ts
track(eventName, properties)
```

Provider adapter'ları:

```text
analytics/
├── index.ts
├── schema.ts
├── providers/
│   ├── ga4.ts
│   ├── plausible.ts
│   ├── posthog.ts
│   └── noop.ts
└── consent.ts
```

Aynı anda birden fazla provider'a event göndermek yalnızca bilinçli config ile yapılmalıdır.

## 14.2 Event isimlendirme

- snake_case
- Fiil veya tamamlanmış aksiyon
- Versiyonlanabilir
- PII içermez
- Event sözlüğünde tanımlı olmayan event merge edilmez

## 14.3 Event sözlüğü

Mevcut `docs/analytics-event-dictionary.md` güncellenecek.

Her event:

```text
Name
Purpose
Trigger
Required properties
Optional properties
PII risk
Owner
Dashboard usage
```

## 14.4 Consent

Çerez kullanan provider varsa:

- Consent banner
- Reddetme seçeneği
- Tercih saklama
- Analitik script'i consent öncesi çalıştırmama
- KVKK/GDPR uygun bilgilendirme

Cookieless çözüm tercih edilirse yine gizlilik açıklaması yapılmalıdır.

---

# 15. Güvenlik

## 15.1 Security header'ları

Mevcut başlıklara ek olarak değerlendirilmesi gerekenler:

- Content-Security-Policy
- Strict-Transport-Security
- Cross-Origin-Opener-Policy
- Cross-Origin-Resource-Policy
- X-Frame-Options veya CSP frame-ancestors
- Permissions-Policy

CSP report-only ile başlanabilir.

## 15.2 API güvenliği

Her public API endpoint için:

- HTTP method kontrolü
- Input validation
- Body size limit
- Rate limit
- Timeout
- Hata sanitization
- Secret loglamama
- CORS kararı
- Abuse monitoring

## 15.3 Environment variables

- `.env.example` güncellenecek.
- Kullanılmayan premium secret'ları MVP production'dan kaldırılabilir.
- Service role key yalnızca server tarafında kullanılmalı.
- `NEXT_PUBLIC_` prefix'li hiçbir secret olmamalı.
- Log çıktılarında secret veya token bulunmamalı.

## 15.4 Sanity Studio

- `/studio` robots dışı
- Production erişim politikası
- CORS origin sınırı
- Token minimum yetki
- Public dataset kullanım kararı belgelenmeli
- Draft içerikler frontend'de sızmamalı

## 15.5 Form güvenliği

Bülten ve iş birliği formları:

- Rate limit
- Honeypot
- CSRF yaklaşımı
- Server validation
- E-posta normalize etme
- HTML sanitization
- Spam loglama
- Kullanıcıya teknik hata detayı göstermeme

---

# 16. Hata, yüklenme ve boş durumları

Her dinamik modülde üç durum zorunlu:

```text
loading
error
empty
```

## CMS hatası

Ana sayfa CMS'e erişemezse:

- Sentetik başarı metriği gösterilmez.
- Temel statik içerik gösterilebilir.
- Araçlar config üzerinden fallback olabilir.
- Hata monitoring'e gider.
- Kullanıcıya teknik stack trace gösterilmez.

## Araç hatası

Hesaplama domain fonksiyonu beklenmedik hata verirse:

- Sonuç kartı gizlenir.
- Kullanıcı girdileri kaybolmaz.
- Kullanıcı dostu hata gösterilir.
- Error boundary devreye girer.
- Event loglanır, hassas input gönderilmez.

## 404

Özel `not-found.tsx`:

- Arama veya ana navigasyon
- Popüler araçlar
- Ana sayfaya dönüş
- 404 status korunur

---

# 17. Uluslararasılaştırma

## MVP

Türkçe ana ürün dili.

Mevcut `/en` sayfaları:

- Kaliteli değilse `noindex` yapılabilir.
- Otomatik çeviriyle genişletilmez.
- Türkçe dönüşüm tamamlanmadan parity zorunlu değildir.

## P1

Locale stratejisi:

```text
/       -> tr-TR
/en/    -> en-US
```

Her içerikte:

- locale
- translationOf
- hreflang
- localized slug
- localized metadata

Fallback ile Türkçe metnin İngilizce sayfada görünmesi engellenmelidir.

---

# 18. Test stratejisi

## 18.1 Araçlar

Önerilen:

- Vitest
- React Testing Library
- Playwright
- Axe
- TypeScript
- ESLint
- Prettier

## 18.2 Unit test

Zorunlu:

- ROAS hesaplama fonksiyonu
- Sayı parse/format
- Validation schema
- URL filter parser
- SEO metadata helper
- Analytics payload sanitizer
- CMS mapper
- Demo vaka etiketi mantığı

## 18.3 Component test

- CurrencyInput
- PercentageInput
- ROAS formu
- Sonuç kartları
- Mobil menü
- Newsletter form
- ToolCard
- GuideCard
- DemoNotice

## 18.4 E2E kritik akışlar

### Akış 1

```text
Ana sayfa
→ Ücretsiz Araçları Kullan
→ Başabaş ROAS aracı
→ Form doldur
→ Sonuç gör
→ İlgili rehbere git
```

### Akış 2

```text
Organik rehber sayfası
→ Araç CTA
→ Hesaplama
→ Bülten formu
```

### Akış 3

```text
Projeler
→ Zolm
→ Bekleme listesi veya demo CTA
```

### Akış 4

```text
Mobil menü
→ Tüm ana bağlantılar
→ Menü keyboard erişimi
```

### Akış 5

```text
Demo vaka
→ Demo etiketi görünür
→ Metrikler simülasyon etiketi taşır
```

## 18.5 Visual regression

Ana sayfa ve hesaplayıcı için önerilir:

- Desktop
- Tablet
- 390 px mobil
- Light/dark varsa iki tema

## 18.6 Route smoke

Kontrol edilecek:

```text
/
/araclar
/araclar/basabas-roas-hesaplayici
/rehberler
/projeler
/vaka-analizleri
/hakkinda
/bulten
/gizlilik
/robots.txt
/sitemap.xml
```

Beklenen:

- 200 veya bilinen redirect
- No unexpected 500
- Canonical doğru
- Title boş değil

---

# 19. CI/CD ve kalite kapıları

## 19.1 Pull request kontrolleri

Her PR:

```bash
npm ci
npm run format:check
npm run lint
npm run typecheck
npm run test
npm run build
npm run smoke:test
npm run test:e2e
```

E2E preview URL hazır olmadan çalıştırılamıyorsa iki job'a ayrılmalıdır.

## 19.2 Package script önerisi

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "typecheck": "tsc --noEmit",
    "format": "prettier . --write",
    "format:check": "prettier . --check",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:e2e": "playwright test",
    "test:a11y": "playwright test tests/a11y",
    "smoke:test": "node ./scripts/smoke-test.mjs"
  }
}
```

Not:

Mevcut `next lint` scripti Next.js sürümüyle uyum açısından kontrol edilmeli ve standart ESLint CLI'a geçirilmelidir.

## 19.3 Branch politikası

- `main` doğrudan push kapalı
- En az bir review
- Tüm required checks başarılı
- Secret scan
- Preview deploy kontrolü
- Migration PR'larında rollback planı

---

# 20. Observability

## Zorunlu

- Runtime error monitoring
- API error monitoring
- Build/deploy notification
- Web vitals ölçümü
- Form error oranı
- Tool completion funnel
- CMS fetch failure
- Newsletter failure
- 404 trend raporu

## Loglama

Loglarda bulunmamalı:

- E-posta plaintext
- Form hesaplama değerleri
- API secret
- Authorization header
- Supabase service key
- OpenAI key
- Kullanıcı mesajının tamamı, gerekli değilse

---

# 21. Backlog — epikler ve görevler

# EPIC-00 — Proje hazırlığı

## VM-001 — Geliştirme branch ve board oluştur

**Öncelik:** P0  
**Boyut:** S

### Kabul kriterleri

- Issue template
- PR template
- Label sistemi
- Epic bağlantıları
- Definition of Done PR template içinde

## VM-002 — `docs/içerik.md` ve bu şartnameyi repoya ekle

**Öncelik:** P0  
**Boyut:** XS

### Kabul kriterleri

- `docs/içerik.md`
- `docs/GELISTIRME-SARTNAMESI.md`
- README'den iki dokümana bağlantı

## VM-003 — README oluştur/güncelle

**Öncelik:** P0  
**Boyut:** S

İçerik:

- Proje amacı
- Teknoloji yığını
- Kurulum
- Environment variables
- Scriptler
- Mimari
- Deployment
- Test
- Doküman bağlantıları

---

# EPIC-01 — Kalite ve teknik borç

## VM-101 — ESLint ve Prettier kur

**Öncelik:** P0  
**Boyut:** S

## VM-102 — Typecheck scripti ekle

**Öncelik:** P0  
**Boyut:** XS

## VM-103 — Dokunulan temel dosyalardan `@ts-nocheck` kaldır

**Öncelik:** P0  
**Boyut:** L

İlk dosyalar:

- root layout
- ana sayfa
- sitemap
- robots
- analytics
- seo
- cms

## VM-104 — Test altyapısı kur

**Öncelik:** P0  
**Boyut:** M

## VM-105 — GitHub Actions kalite kapılarını genişlet

**Öncelik:** P0  
**Boyut:** M

---

# EPIC-02 — Tasarım sistemi ve layout

## VM-201 — Design token sistemi

**Öncelik:** P0  
**Boyut:** M

## VM-202 — Temel UI component seti

**Öncelik:** P0  
**Boyut:** L

## VM-203 — Yeni header ve mobil menü

**Öncelik:** P0  
**Boyut:** M

## VM-204 — Yeni footer

**Öncelik:** P0  
**Boyut:** S

## VM-205 — Global loading/error/not-found sayfaları

**Öncelik:** P0  
**Boyut:** M

---

# EPIC-03 — CMS

## VM-301 — Yeni schema modelleri

**Öncelik:** P0  
**Boyut:** XL

## VM-302 — GROQ query katmanını modülerleştir

**Öncelik:** P0  
**Boyut:** M

Önerilen:

```text
src/sanity/queries/
├── guides.ts
├── tools.ts
├── projects.ts
├── caseStudies.ts
└── settings.ts
```

## VM-303 — Type generation

**Öncelik:** P0  
**Boyut:** M

## VM-304 — Migration scriptleri

**Öncelik:** P0  
**Boyut:** L

## VM-305 — CMS validation ve editor preview

**Öncelik:** P1  
**Boyut:** M

---

# EPIC-04 — Ana sayfa

## VM-401 — Hero ve değer önerisi

**Öncelik:** P0  
**Boyut:** M

## VM-402 — Problem kartları

**Öncelik:** P0  
**Boyut:** S

## VM-403 — Öne çıkan araçlar

**Öncelik:** P0  
**Boyut:** M

## VM-404 — Öne çıkan rehberler

**Öncelik:** P0  
**Boyut:** M

## VM-405 — Proje ve Zolm bölümü

**Öncelik:** P0  
**Boyut:** S

## VM-406 — Vaka ve kurucu bölümü

**Öncelik:** P0  
**Boyut:** M

## VM-407 — Ana sayfadan PersonaQuickPaths ve Knowledge Graph kaldır

**Öncelik:** P0  
**Boyut:** S

---

# EPIC-05 — Araç platformu

## VM-501 — Araçlar liste sayfası

**Öncelik:** P0  
**Boyut:** M

## VM-502 — ROAS domain modeli ve unit testleri

**Öncelik:** P0  
**Boyut:** M

## VM-503 — ROAS formu

**Öncelik:** P0  
**Boyut:** L

## VM-504 — Sonuç ekranı

**Öncelik:** P0  
**Boyut:** M

## VM-505 — Araç metodoloji içeriği

**Öncelik:** P0  
**Boyut:** M

## VM-506 — Tool analytics

**Öncelik:** P0  
**Boyut:** S

## VM-507 — Sonuç kopyalama/paylaşma

**Öncelik:** P0  
**Boyut:** S

## VM-508 — Kâr marjı aracı

**Öncelik:** P1  
**Boyut:** L

## VM-509 — İndirim simülatörü

**Öncelik:** P1  
**Boyut:** L

---

# EPIC-06 — Rehberler

## VM-601 — Rehber liste

**Öncelik:** P0  
**Boyut:** M

## VM-602 — Rehber detay

**Öncelik:** P0  
**Boyut:** L

## VM-603 — Portable Text renderer

**Öncelik:** P0  
**Boyut:** L

## VM-604 — Category landing

**Öncelik:** P1  
**Boyut:** M

## VM-605 — İç bağlantı sistemi

**Öncelik:** P0  
**Boyut:** M

---

# EPIC-07 — Projeler ve vaka analizleri

## VM-701 — Projeler liste

**Öncelik:** P0  
**Boyut:** M

## VM-702 — Proje detay v2

**Öncelik:** P0  
**Boyut:** L

## VM-703 — Vaka liste

**Öncelik:** P0  
**Boyut:** M

## VM-704 — Vaka detay v2

**Öncelik:** P0  
**Boyut:** L

## VM-705 — Demo güvenlik etiketi ve fallback temizliği

**Öncelik:** P0  
**Boyut:** M

---

# EPIC-08 — Bülten ve dönüşüm

## VM-801 — Newsletter provider kararı

**Öncelik:** P0  
**Boyut:** S

## VM-802 — Newsletter form API

**Öncelik:** P0  
**Boyut:** M

## VM-803 — Newsletter UI bileşeni

**Öncelik:** P0  
**Boyut:** S

## VM-804 — KVKK ve form güvenliği

**Öncelik:** P0  
**Boyut:** M

## VM-805 — Zolm bekleme listesi

**Öncelik:** P1  
**Boyut:** M

---

# EPIC-09 — SEO

## VM-901 — Sayfa bazlı metadata

**Öncelik:** P0  
**Boyut:** M

## VM-902 — Sitemap v2

**Öncelik:** P0  
**Boyut:** M

## VM-903 — Robots v2

**Öncelik:** P0  
**Boyut:** XS

## VM-904 — JSON-LD

**Öncelik:** P0  
**Boyut:** M

## VM-905 — Redirect tablosu

**Öncelik:** P0  
**Boyut:** M

## VM-906 — Eski WordPress URL temizliği

**Öncelik:** P0  
**Boyut:** M

---

# EPIC-10 — Analytics ve observability

## VM-1001 — Analytics adapter v2

**Öncelik:** P0  
**Boyut:** M

## VM-1002 — Consent yönetimi

**Öncelik:** Provider'a bağlı P0  
**Boyut:** M

## VM-1003 — Tool funnel dashboard

**Öncelik:** P1  
**Boyut:** M

## VM-1004 — Error monitoring

**Öncelik:** P0  
**Boyut:** S

## VM-1005 — Web vitals

**Öncelik:** P0  
**Boyut:** S

---

# EPIC-11 — Güvenlik ve production hazırlığı

## VM-1101 — Security headers v2

**Öncelik:** P0  
**Boyut:** M

## VM-1102 — API rate limiting

**Öncelik:** P0  
**Boyut:** M

## VM-1103 — Studio ve preview güvenliği

**Öncelik:** P0  
**Boyut:** M

## VM-1104 — Üyelik demo akışını production'dan kapat

**Öncelik:** P0  
**Boyut:** S

## VM-1105 — Secret ve dependency audit

**Öncelik:** P0  
**Boyut:** S

---

# 22. Önerilen uygulama sırası

## Aşama 1 — Temel

- EPIC-00
- EPIC-01
- EPIC-02'nin temel bileşenleri
- SEO kritik düzeltmeler
- Demo üyelik kapatma

## Aşama 2 — CMS ve içerik

- EPIC-03
- Rehber veri modelleri
- Proje ve vaka modelleri
- Migration

## Aşama 3 — Ana deneyim

- EPIC-04
- Header/footer
- Yeni ana sayfa

## Aşama 4 — İlk araç

- EPIC-05
- ROAS aracı
- Unit/E2E testleri
- Analytics

## Aşama 5 — İçerik ve dönüşüm

- EPIC-06
- EPIC-07
- EPIC-08

## Aşama 6 — Production hardening

- EPIC-09
- EPIC-10
- EPIC-11
- Final QA
- Redirect doğrulama
- Search Console gönderimi

---

# 23. Release kriterleri

MVP production'a çıkmadan önce aşağıdakilerin tamamı sağlanmalıdır.

## Ürün

- [ ] Ana sayfa yeni konumlandırmayı gösteriyor
- [ ] Araçlar listesi çalışıyor
- [ ] Başabaş ROAS aracı doğru sonuç veriyor
- [ ] Rehber liste ve detay çalışıyor
- [ ] Proje liste ve detay çalışıyor
- [ ] Vaka liste ve detay çalışıyor
- [ ] Hakkında sayfası hazır
- [ ] Bülten formu çalışıyor veya açıkça bekleme listesi olarak tanımlı

## Güven

- [ ] Demo vaka açıkça etiketli
- [ ] Production'da demo unlock kapalı
- [ ] Araç girdileri izinsiz saklanmıyor
- [ ] Gizlilik metni yayında
- [ ] Sponsor/affiliate altyapısı için etiket standardı hazır

## Teknik

- [ ] Build başarılı
- [ ] Typecheck başarılı
- [ ] Lint başarılı
- [ ] Unit test başarılı
- [ ] E2E kritik akışlar başarılı
- [ ] Accessibility test başarılı
- [ ] Route smoke başarılı
- [ ] Broken link kritik hata yok
- [ ] Production env doğrulandı
- [ ] Error monitoring çalışıyor

## SEO

- [ ] Canonical'lar doğru
- [ ] Sitemap doğru
- [ ] Robots doğru
- [ ] Eski URL redirect'leri çalışıyor
- [ ] Structured data validation kritik hata vermiyor
- [ ] Noindex sayfaları sitemap'te değil
- [ ] OG görselleri doğru

## Performans

- [ ] Ana sayfada VeriBot bundle yok
- [ ] Mobil LCP hedefe yakın
- [ ] CLS kritik değil
- [ ] Form etkileşimleri akıcı
- [ ] Görseller optimize

---

# 24. Definition of Done

Bir görev “tamamlandı” sayılmak için:

1. Kabul kriterlerini sağlamalıdır.
2. TypeScript hatası içermemelidir.
3. Yeni `@ts-nocheck` veya açıklamasız `any` eklememelidir.
4. İlgili unit/component/E2E testi bulunmalıdır.
5. Erişilebilirlik kontrolünden geçmelidir.
6. Mobil ve masaüstü kontrol edilmelidir.
7. Analytics gerekiyorsa event sözlüğü güncellenmelidir.
8. Yeni env değişkeni varsa `.env.example` güncellenmelidir.
9. Yeni rota varsa sitemap/robots/canonical kararı verilmelidir.
10. CMS alanı varsa editor validation bulunmalıdır.
11. Hata ve boş durumları uygulanmalıdır.
12. PR açıklamasında ekran görüntüsü veya test kanıtı bulunmalıdır.
13. Dokümantasyon güncellenmelidir.
14. Production verisini etkiliyorsa rollback planı bulunmalıdır.

---

# 25. Açık kararlar

Geliştirme başlamadan ürün sahibi ve teknik lider aşağıdaki kararları netleştirmelidir:

| ID | Karar | Önerilen |
|---|---|---|
| D-01 | Tasarım light mı dark mı? | Light ana tema, opsiyonel dark |
| D-02 | Newsletter provider | Mevcut ihtiyaçlara göre yönetilen servis |
| D-03 | Analytics provider | Tek ana provider |
| D-04 | Sanity model migration yaklaşımı | Bağımsız yeni modeller |
| D-05 | `/blog` redirect | `/rehberler` |
| D-06 | `/uyelik` davranışı | `noindex`, navigasyondan kaldır |
| D-07 | VeriBot MVP'de var mı? | Hayır, Labs'e taşı |
| D-08 | İngilizce site MVP'de var mı? | Kısıtlı/noindex veya sonraki faz |
| D-09 | ROAS KDV modu | MVP basit, P1 gelişmiş |
| D-10 | Sonuç saklama | MVP'de hayır |
| D-11 | Zolm CTA hedefi | Proje sayfası veya bekleme listesi |
| D-12 | Eski demo vaka | Açık demo etiketiyle tut veya kaldır |

Bu kararlar çözümlenmeden ilgili task'a başlanmamalıdır; ancak diğer bağımsız epikler ilerleyebilir.

---

# 26. Yazılım ekibine kısa ürün özeti

Bu projede amaç daha fazla özellik göstermek değil, ziyaretçinin bir e-ticaret problemini çözmesini sağlamaktır.

Teknik öncelikler:

1. Sağlam TypeScript ve test altyapısı
2. Hızlı, erişilebilir ve SEO uyumlu sayfalar
3. Açık CMS modeli
4. Doğru çalışan hesaplayıcı
5. Hassas veriyi toplamayan analitik
6. Demo ve gerçek içerik ayrımı
7. İçerikten araca, araçtan ürüne doğal geçiş

En önemli ilk kullanıcı akışı:

```text
Google / Instagram / LinkedIn
        ↓
Rehber veya ana sayfa
        ↓
Başabaş ROAS Hesaplayıcı
        ↓
Anlaşılır sonuç
        ↓
İlgili rehber / bülten / Zolm
```

> **MVP başarısı, sitenin ne kadar teknolojik göründüğüyle değil; kullanıcının hesaplamayı doğru tamamlaması, sonucu anlaması ve tekrar gelmesiyle ölçülecektir.**
