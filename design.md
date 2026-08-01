# Veri Mimarı Tasarım Sistemi

> Durum: **Kanonik ve bağlayıcı**
> Sistem adı: **Veri Mimarı Editorial Data System**
> Son güncelleme: 1 Ağustos 2026

Bu dosya Veri Mimarı'nın tüm arayüzleri için tek tasarım kaynağıdır. Yeni sayfalar, bileşenler, içerik blokları, araçlar, deneyler ve kampanya yüzeyleri bu sistemin görsel dilini kullanmalıdır.

Bu tasarımın amacı bir “tema” uygulamak değil; Veri Mimarı'nı her ekranda aynı ürün gibi hissettiren tutarlı bir editoryal veri deneyimi oluşturmaktır.

## 1. Değiştirilemez temel ilkeler

1. **Sıcak kâğıt, koyu mürekkep:** Ana zemin kırık beyazdır; metin ve konturlar neredeyse siyahtır.
2. **Editoryal ölçek:** Başlıklar büyük, sıkı ve güçlüdür. Sayfanın ana fikri ilk bakışta anlaşılır.
3. **Veri konsolu disiplini:** Teknik bilgiler, etiketler ve metrikler mono yazı karakteriyle küçük ve düzenli sunulur.
4. **Flüoresan vurgu:** Lime birincil aksiyon rengidir. Cyan, turuncu, mor, sarı ve mavi yalnızca anlamlı vurgu için kullanılır.
5. **Sert ama kontrollü geometri:** İnce koyu konturlar, sert sağ-alt gölgeler, düz grid kartları ve sınırlı yuvarlaklık kullanılır.
6. **İşlev önce gelir:** Süsleme hesaplamayı, okumayı, form kullanımını veya erişilebilirliği zorlaştırmaz.
7. **Tek sistem:** Yeni bir sayfa kendi bağımsız renk, font, radius veya gölge sistemini oluşturamaz.

## 2. Kaynak dosyalar ve öncelik sırası

Bir tasarım kararı verirken aşağıdaki sıra izlenir:

1. `design.md` — niyet, kurallar ve kabul kriterleri
2. `src/app/globals.css` — çalışan tokenlar ve ortak sınıflar
3. `src/components/landing/` — navigasyon, hero, bölüm ve footer örnekleri
4. `RECON/design-dna.json` — makine tarafından okunabilir tasarım kimliği
5. `docs/içerik.md` — marka sesi ve içerik yaklaşımı

Kod ile bu dosya çelişirse değişikliğin amacı araştırılır. Kalıcı bir sistem değişikliği yapılıyorsa kod ve `design.md` aynı iş kapsamında birlikte güncellenir.

## 3. Tasarım karakteri

Veri Mimarı arayüzü şu dört karakteri aynı anda taşımalıdır:

- **Editoryal:** Net hiyerarşi, güçlü başlık ve rahat okuma ritmi
- **Teknik:** Açık yöntemler, mono meta bilgiler, ölçülebilir sonuçlar
- **Taktik:** Kullanıcıya bir sonraki doğru adımı doğrudan gösteren CTA'lar
- **İnsani:** Sıcak zemin, anlaşılır dil ve dozunda oyunbaz vurgu

Görsel metafor: **Açıklamalı bir saha rehberi ile modern bir veri konsolunun birleşimi.**

Kaçınılacak karakterler:

- Kurumsal SaaS şablonu görünümü
- Tamamen gri ve ruhsuz dashboard estetiği
- Aşırı cam efekti, blur ve yumuşak gölge
- Neon rengin dekor amaçlı her yere yayılması
- Her kartta farklı renk veya farklı radius kullanımı
- Gösterişli animasyonlar, scroll-jacking veya parallax

## 4. Renk sistemi

Tüm renkler önce CSS değişkeni olarak tanımlanmalı ve bileşenlerde değişken üzerinden kullanılmalıdır.

| Token                   |     Değer | Görev                                |
| ----------------------- | --------: | ------------------------------------ |
| `--bg`                  | `#F6F4ED` | Ana sıcak kâğıt zemini               |
| `--paper` / `--surface` | `#FFFEF9` | Kart ve yükseltilmiş yüzey           |
| `--paper-deep`          | `#ECE9DF` | İkincil nötr bant                    |
| `--ink`                 | `#101411` | Metin, kontur, koyu bölüm            |
| `--muted`               | `#5F655F` | İkincil metin                        |
| `--line`                | `#C9CCC3` | Hafif ayırıcı                        |
| `--line-dark`           | `#92978F` | Form ve güçlü ayırıcı                |
| `--lime`                | `#D6FF63` | Birincil CTA ve ana vurgu            |
| `--cyan`                | `#86E7FF` | Bilgi, sistem veya proje bandı       |
| `--orange`              | `#FF815C` | Uyarı ve operasyon vurgusu           |
| `--purple`              | `#A99AFF` | AI, deney veya gelecek odaklı içerik |
| `--yellow`              | `#FFD86A` | Not, dikkat ve yardımcı aksiyon      |
| `--blue`                | `#5267FF` | Odak, bağlantı ve teknik işaret      |
| `--green`               | `#16724A` | Başarı ve canlı durum                |
| `--dark`                | `#111612` | Ana koyu bölüm                       |
| `--dark-2`              | `#1B211C` | Koyu yüzey katmanı                   |

### Renk kullanım kuralları

- Bir bölümde en fazla **bir baskın vurgu rengi** kullanılmalıdır.
- Lime, öncelikle ana CTA, aktif filtre veya tek kritik vurgu içindir.
- Uzun metinler neon renklerle yazılmaz.
- Koyu bölümlerde ana metin beyaz, ikincil metin `#AEB6AE` olmalıdır.
- Başarı için yeşil, uyarı için turuncu/sarı, hata için kırmızı semantik olarak korunur.
- Rastgele hex değeri eklenmez. Yeni renk gerekiyorsa önce token olarak gerekçelendirilir.
- Minimum metin kontrastı WCAG AA seviyesini karşılamalıdır.

## 5. Tipografi

### Aileler

- Başlık ve gövde: `Inter, ui-sans-serif, system-ui`
- Teknik meta ve veri: `SFMono-Regular, Consolas, Liberation Mono`
- Serif yazı karakteri kullanılmaz.
- Yeni font eklemek ancak tüm sistemi etkileyen bilinçli bir marka kararıyla mümkündür.

### Ölçek

| Rol         | Ölçü                                              | Kullanım                          |
| ----------- | ------------------------------------------------- | --------------------------------- |
| Display     | `clamp(58px, 6.45vw, 82px)` / `0.93` / `880`      | Ana sayfa ve güçlü ürün hero'su   |
| Sayfa H1    | `clamp(52px, 6.4vw, 82px)` / `0.93–0.98` / `850+` | Listeleme ve iç sayfa hero'su     |
| H2          | `clamp(42px, 5vw, 60px)` / `0.98` / `840`         | Tam genişlikte bölüm başlığı      |
| H3          | `23–25px` / `1.03–1.15` / `800+`                  | Kart ve alt bölüm başlığı         |
| Gövde       | `16px` / `1.6–1.75` / `400`                       | Paragraf ve rehber içeriği        |
| Küçük gövde | `12–14px` / `1.5–1.6`                             | Kart açıklaması ve yardımcı bilgi |
| Meta        | `8–10px` / `1.4` / `700 mono`                     | Eyebrow, durum, süre ve indeks    |

### Tipografi kuralları

- Display başlıklar `-0.055em` ile `-0.077em` arasında sıkı tracking kullanır.
- Başlık satırları kısa tutulur; mümkünse 2–4 satırda güçlü bir ritim oluşturur.
- Mono font yalnızca teknik bilgi içindir; uzun paragrafta kullanılmaz.
- Tümü büyük harf yalnızca kısa meta etiketlerinde kullanılır.
- Başlık içinde vurgu gerekiyorsa renkli uzun metin yerine lime alt çizgi/zemin işareti tercih edilir.
- Mobilde başlık anlamlı şekilde küçülür ancak görsel hiyerarşisini kaybetmez.

## 6. Yerleşim ve boşluk

### Ana ölçüler

- İçerik kabuğu: maksimum `1180px`
- Masaüstü dış boşluk: minimum `20px`
- Mobil dış boşluk: `14px`
- Temel boşluk birimi: `8px`
- Ana ölçek: `8, 12, 20, 28, 40, 56, 72, 108`
- Ana breakpoint'ler: `980px` ve `760px`

### Bölüm ritmi

- Masaüstü ana bölüm padding'i: `108px 0`
- Mobil ana bölüm padding'i: `72px 0`
- Bölümler tam genişlikte renk bantları olarak düşünülür.
- İçerik her zaman `.wrap` içinde hizalanır.
- Ana sayfada sıcak kâğıt, yüzey, cyan ve koyu bantlar kontrollü biçimde dönüşümlü kullanılabilir.
- Bir bölüm içindeki grid çizgileri komşu kartlar arasında ortak sınır oluşturmalıdır.

### Grid

- Ana hero masaüstünde yaklaşık `1.04fr / 0.96fr` iki kolondur.
- Listeleme grid'i masaüstünde üç, mobilde tek kolondur.
- İki kolonlu formlar ve makaleler mobilde tek kolona düşer.
- Kart grid'inde boşluk yerine ortak 1px kontur tercih edilebilir.
- Yatay taşma hiçbir breakpoint'te kabul edilmez.

## 7. Sayfa arketipleri

Yeni sayfa geliştirilirken önce aşağıdaki arketiplerden biri seçilir.

### 7.1 Ana/ürün landing sayfası

Sıra:

1. `NavBar`
2. Büyük mesaj + işlevsel görsel içeren `hero-shell`
3. Problem veya kanıt şeridi
4. Tam genişlikte dönüşümlü `section-band` blokları
5. Birincil dönüşüm bölümü
6. Newsletter
7. Footer

Hero içinde bir ana CTA, en fazla bir ikincil CTA ve en fazla üç güven sinyali bulunur.

### 7.2 Listeleme sayfası

Araçlar, rehberler, projeler ve blog için:

1. `NavBar`
2. `.hero.single` ile güçlü H1 ve kısa açıklama
3. Gerekiyorsa pill filtreler ve arama
4. Ortak konturlu kart grid'i
5. Footer

Filtreler lime ile aktifleşir. Kartların tüm yüzeyi tıklanabilir olabilir.

### 7.3 Araç/hesaplayıcı sayfası

1. Kısa hero: problem, yöntem ve güven sinyali
2. Sol tarafta açıklamalı girdiler
3. Sağ tarafta koyu ve gerektiğinde sticky `.results` paneli
4. Sonuçların formülü ve varsayımları
5. İlgili rehber veya sonraki adım CTA'sı

Hesap sonucu yalnızca renkle anlatılmaz; metinsel durum da sunulur.

### 7.4 Rehber/makale sayfası

1. Kategori, olgunluk ve güncelleme bilgisini içeren meta alanı
2. Büyük ama okunabilir başlık
3. Masaüstünde içindekiler + içerik kolonu
4. Açıklayıcı callout, tablo ve kaynak blokları
5. İlgili araç veya bir sonraki rehbere geçiş

Uzun içerikte gövde genişliği yaklaşık `700–760px` tutulur.

### 7.5 Proje/deney sayfası

- Purple veya cyan tek baskın vurgu olarak seçilebilir.
- Projenin problemi, sistemi, canlı durumu ve ölçülebilir sonucu görünür olmalıdır.
- “Yakında” sayfası yalnızca süslü bir hero olamaz; yol haritası veya bekleme listesi aksiyonu sunmalıdır.

## 8. Bileşen kuralları

### Navigasyon

- Yükseklik masaüstünde `72px`, mobilde `64px`.
- Sıcak kâğıt üzerinde hafif saydam ve blur'lu olabilir.
- Logo, ana bağlantılar ve en fazla iki aksiyon içerir.
- Mobilde bağlantılar menü düğmesi altında tek kolon açılır.
- Navigasyon metinleri kısa ve görev odaklıdır.

### Butonlar

- Tüm temel butonlar pill formundadır.
- Birincil genel buton: koyu zemin, beyaz yazı.
- Hero birincil butonu: lime zemin, koyu yazı, sert gölge.
- İkincil buton: açık zemin, koyu kontur.
- Hover: hafif yukarı-sola hareket + sert gölge.
- Bir bölümde birden fazla eşit ağırlıklı birincil CTA kullanılmaz.
- CTA metni eylemle başlar: “Hesabı gör”, “Aracı aç”, “Rehberi incele”.

### Kartlar

İki kart türü vardır:

1. **Grid kartı:** Radius yoktur; ortak koyu sınırlar kullanır.
2. **Yükseltilmiş panel:** `14px` radius, 1px koyu kontur ve `4–7px` sert gölge kullanır.

Kartlar arasında üçüncü bir rastgele stil oluşturulmaz. Kart başlığı, açıklama ve aksiyon hiyerarşisi korunur.

### Etiketler

- Pill biçimi, koyu 1px kontur, mono 8–10px yazı.
- Durum, süre, kategori veya sürüm bilgisi taşır.
- Uzun pazarlama cümlesi etiket içine konmaz.

### Formlar

- Beyaz yüzey, koyu 1px kontur, `7px` radius.
- Focus durumunda koyu sınır ve lime halo zorunludur.
- Her alan görünür bir label veya erişilebilir isim taşır.
- Hata mesajı alanla ilişkilendirilir ve düzeltme yolunu açıklar.
- Placeholder label yerine geçmez.

### Veri ve sonuç panelleri

- Ana sonuç görsel hiyerarşide en büyük sayıdır.
- Varsayım ve yardımcı metin mono veya küçük gövde stilinde gösterilir.
- Koyu panel üzerinde lime/cyan yalnızca kritik değerlerde kullanılır.
- Grafikler mevcut renk tokenlarını kullanır ve açıklayıcı metne sahiptir.

### Newsletter

- Lime tam genişlikte bir dönüşüm bandıdır.
- Büyük H2, kısa açıklama ve tek alanlı e-posta formu kullanır.
- Ayrılma/gizlilik bilgisi görünür olmalıdır.

### Footer

- Koyu zemin kullanır.
- Meta bilgiler mono, bağlantılar beyazdır.
- Yeni bir sayfa footer'sız bırakılmaz; özel tam ekran deneyler açıkça istisna olabilir.

## 9. İçerik ve arayüz dili

Tasarım ile içerik aynı karakteri taşımalıdır:

- Kısa, doğrudan ve kanıt odaklı yaz.
- Soyut fayda yerine ölçülebilir sonucu söyle.
- Kullanıcının bir sonraki adımını görünür kıl.
- Teknik kavramı gerektiğinde açıkla; jargonla otorite kurmaya çalışma.
- CTA'larda belirsiz “Devam”, “Gönder” veya “Daha fazla” yerine eylemi adlandır.
- Sayfa başına bir ana vaat belirle.
- Veri veya örnek simülasyonsa bunu açıkça etiketle.

Örnek başlık ritmi:

```text
Veriyi gör.
Kârı büyüt.
Kaybolmadan.
```

Örnek meta:

```text
TÜRKİYE'DEKİ E-TİCARET EKİPLERİ İÇİN
CANLI · 2 DK · ÜCRETSİZ
```

## 10. Hareket ve geri bildirim

- Mikro etkileşim süresi `160–180ms` aralığındadır.
- Hareket fonksiyoneldir: hover, focus, menü açılışı veya durum değişimi.
- Sürekli animasyon, kayan arka plan veya parallax kullanılmaz.
- `prefers-reduced-motion` desteklenir.
- Hover durumu klavye focus durumunun yerine geçemez.
- Loading durumunda kullanıcı ne beklendiğini anlamalıdır.

## 11. Erişilebilirlik

- Semantik heading sırası korunur: sayfada tek H1, ardından mantıklı H2/H3.
- Tüm etkileşimli öğeler klavyeyle kullanılabilir olmalıdır.
- Focus görünürlüğü lime halo veya mavi outline ile sağlanır.
- Renk tek başına anlam taşımaz.
- Dokunma hedefleri mümkünse minimum `42px` yüksekliğindedir.
- Görseller anlamlı `alt` metni taşır; dekoratif öğeler `aria-hidden` olur.
- Form girdileri label veya erişilebilir isim taşır.
- Koyu ve neon yüzeylerde metin kontrastı ayrıca kontrol edilir.

## 12. Responsive davranış

### 980px altı

- Navigasyon menü düğmesine dönüşür.
- İki kolonlu hero tek kolona iner.
- Hero görseli metnin altında kalır.

### 760px altı

- Tüm ana grid'ler tek kolondur.
- Header `64px` olur.
- Ana başlık yaklaşık `47–64px` aralığına iner.
- Dış boşluk `14px` olur.
- Bölüm padding'i `72px` olur.
- Döndürülmüş dekoratif notlar gerektiğinde gizlenir.
- Form butonları ve newsletter alanları tam genişliğe geçer.

Mobil tasarım masaüstünün küçültülmüş hali değildir. Okuma sırası, dokunma alanı ve görünür aksiyon yeniden değerlendirilir.

## 13. Uygulama kuralları

Yeni UI geliştirmesinde:

1. Önce uygun sayfa arketipini seç.
2. Mevcut bileşen ve sınıfları ara.
3. Mevcut token yeterliyse yeni değer ekleme.
4. Tekrarlanan yapı varsa ortak bileşene çıkar.
5. Inline style yerine sınıf ve token kullan.
6. Yeni global sınıf adını amacına göre isimlendir; görsel değer adına göre değil.
7. Var olan işlevi tasarım uğruna bozma.
8. Yeni tasarım kararı sistem düzeyindeyse bu dosyayı da güncelle.

### Yasaklar

- Rastgele hex renk, font, gölge veya radius
- Sayfaya özel ikinci bir tasarım sistemi
- Uzun metinde mono font
- Aynı bölümde birden fazla neon vurgu
- Sırf dekor için gradients, glassmorphism veya ağır animasyon
- Mobil doğrulama yapmadan UI teslimi
- Erişilebilir isim taşımayan ikon butonu
- Mevcut `NavBar`, `Footer`, `.wrap`, `.hero.single`, `.section-band`, `.card`, `.panel`, `.btn`, `.tag` sistemini sebepsizce yeniden yazmak

## 14. Görsel QA ve definition of done

Bir UI işi aşağıdakilerin tamamı sağlanmadan bitmiş sayılmaz:

- [ ] `design.md` ile sayfa arketipi ve bileşen dili uyumlu
- [ ] Renkler yalnızca tasarım tokenlarından geliyor
- [ ] Inter + mono rolleri doğru kullanılmış
- [ ] Tek H1 ve mantıklı heading hiyerarşisi var
- [ ] Ana CTA açık ve görsel olarak öncelikli
- [ ] 1180px içerik kabuğu ve bölüm ritmi korunuyor
- [ ] Masaüstü görünüm yaklaşık 1265–1440px genişlikte kontrol edildi
- [ ] Mobil görünüm 390px genişlikte kontrol edildi
- [ ] Yatay taşma yok
- [ ] Mobil menü, formlar ve ana etkileşimler çalışıyor
- [ ] Focus görünür ve klavye kullanımı mümkün
- [ ] `prefers-reduced-motion` davranışı bozulmadı
- [ ] TypeScript kontrolü başarılı
- [ ] Production build başarılı
- [ ] Kritik rota veya işlev için smoke test yapıldı

## 15. İstisna süreci

Bu sistem bilinçli olarak geliştirilebilir; fakat sessizce bypass edilemez.

Yeni bir ihtiyaç mevcut kurallarla çözülemiyorsa:

1. İhtiyacın neden mevcut bileşenlerle karşılanamadığını açıkla.
2. Önce mevcut token veya bileşenin genişletilmesini değerlendir.
3. Yeni desen oluşturulacaksa erişilebilirlik ve responsive davranışını tanımla.
4. `design.md`, `RECON/design-dna.json` ve çalışan CSS'i aynı değişiklikte güncelle.
5. Eski ve yeni sayfalarda tutarlılığı görsel olarak doğrula.

Kullanıcının açık talebi bu sistemle çelişirse kullanıcı talebi önceliklidir. Talep kalıcı bir marka değişikliği ise tasarım sistemi de aynı iş kapsamında güncellenmelidir.
