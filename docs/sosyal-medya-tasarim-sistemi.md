# Veri Mimarı Sosyal Medya Tasarım Sistemi

> Durum: **Kanonik sosyal medya görsel kaynağı**
> Sistem adı: **Veri Mimarı Editorial Data Cards**
> Ana tasarım kaynağı: [`design.md`](../design.md)
> İçerik kaynağı: [`docs/içerik.md`](./içerik.md)
> Son güncelleme: 2 Ağustos 2026

Bu belge; ChatGPT, görsel üretim araçları veya bir tasarımcıyla hazırlanacak Veri Mimarı sosyal medya içeriklerinin siteyle aynı markaya ait görünmesini sağlar. Buradaki kurallar site tasarımını sosyal medyaya taşır; ayrı bir kampanya teması oluşturmaz.

## 1. Temanın kısa tanımı

**Sıcak kâğıt üzerinde editoryal veri kartları.** Büyük ve sıkı Inter başlıklar; küçük mono teknik etiketler; koyu konturlar; sert sağ-alt gölgeler; ince veri grid'i ve her görselde yalnızca bir flüoresan vurgu kullanılır.

Görsel karakter:

- Editoryal, teknik, doğrudan ve kanıta dayalı
- Neo-brutalist fakat temiz ve ölçülü
- İnsan eliyle açıklama eklenmiş bir veri konsolu hissi
- İlk bakışta tek fikir, ikinci bakışta uygulanabilir detay

## 2. Değişmez marka öğeleri

### Renkler

| Rol         | Renk      | Kullanım                            |
| ----------- | --------- | ----------------------------------- |
| Sıcak kâğıt | `#F6F4ED` | Ana zemin                           |
| Beyaz kâğıt | `#FFFEF9` | Kart ve veri paneli                 |
| Mürekkep    | `#101411` | Başlık, metin, kontur ve koyu yüzey |
| Soluk metin | `#5F655F` | Açıklama ve ikincil bilgi           |
| İnce çizgi  | `#C9CCC3` | Grid ve ayırıcı                     |
| Lime        | `#D6FF63` | Birincil CTA veya ana vurgu         |
| Cyan        | `#86E7FF` | Bilgi ve veri vurgusu               |
| Turuncu     | `#FF815C` | Uyarı, maliyet veya sürtünme        |
| Mor         | `#A99AFF` | İçgörü veya ürün notu               |
| Sarı        | `#FFD86A` | Not ve dikkat alanı                 |
| Mavi        | `#5267FF` | Grafik çizgisi ve seçili veri       |

Her görselde sıcak kâğıt, mürekkep ve çizgi renklerine ek olarak **en fazla bir baskın vurgu rengi** kullanılır. Lime varsayılan seçimdir.

### Tipografi

- Başlık ve gövde: `Inter`, ardından sistem sans-serif
- Teknik etiket ve sayaç: `SFMono-Regular`, `Consolas` veya eşdeğer mono
- Başlık: `800–900` ağırlık, sıkı harf aralığı, kısa satırlar
- Gövde: `400–600` ağırlık, rahat satır aralığı
- Mono: büyük harf, kısa ve küçük; uzun paragrafta kullanılmaz
- Serif, el yazısı ve dekoratif font kullanılmaz

### Logo

Yalnızca güncel **VM monogramı** kullanılır: şeffaf zeminde koyu VM ve küçük lime yön kuyruğu. Eski lime daire içindeki `V` işareti kullanılmaz.

- Açık zeminde şeffaf zeminli koyu tam işaret
- Koyu zeminde ters renkli sürüm; etrafında en az işaret genişliğinin yarısı kadar boşluk
- Logo başlıkla yarışmaz; tercihen sol üstte veya alt kimlik şeridinde yer alır
- Logo yeniden çizilmez, rengi değiştirilmez ve efekt eklenmez

## 3. Ana formatlar

| Format                   | Tuval         | Güvenli alan                                       | Önerilen kullanım              |
| ------------------------ | ------------- | -------------------------------------------------- | ------------------------------ |
| Carousel / dikey gönderi | `1080 × 1350` | Her kenardan en az `64px`                          | Ana eğitim ve araç formatı     |
| Kare gönderi             | `1080 × 1080` | Her kenardan en az `64px`                          | Duyuru, alıntı, tek metrik     |
| Story / Reels kapağı     | `1080 × 1920` | Yanlarda `72px`, üst-alt kritik bölgelerde `250px` | Anket, kısa ders, video kapağı |
| LinkedIn dikey kart      | `1080 × 1350` | Her kenardan en az `64px`                          | Vaka, kurucu notu, doküman     |

Varsayılan çalışma tuvali `1080 × 1350` ve oran `4:5` olmalıdır.

## 4. Yerleşim sistemi

- 12 kolonlu kavramsal grid kullan.
- Temel boşluk birimi `8px`; ana aralıklar `16, 24, 32, 48, 64, 96px`.
- Arka planda gerektiğinde `48px` aralıklı, yaklaşık `%4–7` görünürlükte teknik grid kullan.
- Ana mesaj tuvalin üst veya orta üçte birlik alanında güçlü biçimde başlar.
- İçerik bir ana blok ve en fazla iki destek bloğundan oluşur.
- Konturlar `2px` koyu mürekkep; sert gölge çoğunlukla `6–8px 6–8px 0 #101411`.
- Köşe yarıçapı küçük kartta `12–14px`, büyük panelde `18px`, etikette tam pill olabilir.
- Dekoratif ok, halka veya alt çizgi yalnızca mesajı yönlendiriyorsa kullanılır.

### Varsayılan kart anatomisi

1. **Üst meta:** `VERİ MİMARI / KONU / 01—08`
2. **Ana başlık:** tek iddia, en fazla 3–5 kısa satır
3. **Kanıt alanı:** formül, örnek hesap, karşılaştırma, mini grafik veya kontrol listesi
4. **Alt sonuç:** kullanıcının çıkarması gereken tek ders
5. **Kimlik ve aksiyon:** VM işareti, `verimimari.com`, tek CTA

## 5. İmza bileşenleri

- Mono kaş etiketi ve carousel sayacı
- Lime fosforlu kelime, alt çizgi veya küçük yapışkan not
- Koyu konturlu beyaz veri konsolu
- Büyük sonuç metriği: örneğin `2,44×` veya `%18`
- Formül bandı: `SATIŞ − MALİYET − KOMİSYON − KARGO`
- Sert gölgeli CTA etiketi
- Kaynak ve tarih şeridi
- İnce 48px teknik grid
- Koyu bölüm üzerinde lime durum noktası

Aynı slaytta bütün bileşenleri kullanmak gerekmez. Bir ana fikir için 2–3 imza öğesi yeterlidir.

## 6. İçerik formatları

### Eğitim carousel'i — 8 slayt

1. **Kanca:** şaşırtıcı fakat doğrulanabilir tek iddia
2. **Problem:** neden mevcut bakış açısı eksik?
3. **Gizli değişken:** görünmeyen maliyet veya sinyal
4. **Basit örnek:** kısa ve izlenebilir veri
5. **Hesap:** formül veya karşılaştırma
6. **Sonuç:** verinin söylediği şey
7. **Aksiyon:** kullanıcının uygulayacağı adım
8. **CTA + kaynak:** araç, rehber veya kayıt aksiyonu

Carousel `7–9` slayt olabilir; varsayılan `8` slayttır. Bir slaytta tek ana fikir bulunur.

### Tek görsel içgörü

- Üstte kısa mono kategori
- Ortada tek güçlü cümle veya metrik
- Altta 1–2 satır açıklama
- Küçük kaynak/tarih ve tek CTA

### Hesap / formül kartı

- Sol veya üst alanda problem
- Beyaz konturlu panelde girdiler
- Büyük puntoda sonuç
- Sonucun ne anlama geldiğini açıklayan tek cümle
- Veriler örnekse açıkça `DEMO VERİ` veya `SİMÜLASYON` yazısı

### Karşılaştırma kartı

- `GÖRÜNEN` ve `GERÇEK` veya `YANLIŞ` ve `DOĞRU` olmak üzere iki net kolon
- Renk tek başına anlam taşımaz; başlık ve sembol de kullanılır
- Son satırda karar cümlesi bulunur

### Araç / ürün duyurusu

- Özellik listesi yerine çözdüğü karar problemiyle başlar
- Ürünün ekranı, veri konsolu çerçevesi içinde gösterilir
- Tek bir gerçek kullanım sonucu veya örnek akış kullanılır
- CTA doğrudan olur: `Ücretsiz Hesapla`, `Aracı Aç`, `Zolm'u Keşfet`

### Reels kapağı ve Story

- Kapakta 6–10 kelimelik kanca; uzun paragraf yok
- Konuşan kişi varsa yüz alanı başlıktan ayrı tutulur
- Story'de soru, sonuç ve aksiyon ayrı ekranlara bölünür
- Anket ve soru kutusu için alt-orta bölgede boş alan bırakılır

### LinkedIn uyarlaması

Görsel dil aynı kalır; açıklama metni daha fazla bağlam, kişisel gözlem ve yöntem içerir. Instagram açıklaması birebir kopyalanmaz.

## 7. Metin ve veri kuralları

- Her içerik yeni bir şey öğretmeli, bir kararı kolaylaştırmalı veya bir aracı kullandırmalıdır.
- Bir paylaşımda tek vaat ve tek öncelikli CTA bulunur.
- Sayılar uydurulmaz. Kaynak, dönem ve bağlam görünür biçimde belirtilir.
- Örnek hesaplar `ÖRNEK`, `DEMO VERİ` veya `SİMÜLASYON` olarak işaretlenir.
- “Kesin sonuç”, “garantili büyüme” ve kanıtsız üstünlük iddiaları kullanılmaz.
- Türkçe karakterler korunur; başlıklar yapay biçimde TAMAMEN BÜYÜK HARF yazılmaz.
- CTA, içeriğin doğal devamıdır: `Ücretsiz Hesapla`, `Kendi Değerini Bul`, `Rehberi İncele`, `Örnek Hesabı Gör`.
- Sosyal medya ilgiyi oluşturur; web sitesi değeri sunar; araçlar güveni kanıtlar.

## 8. Kullanılmaması gerekenler

- Gradient ağırlıklı, cam efektli veya yumuşak SaaS görünümü
- Mor-pembe teknoloji gradyanı
- Stok fotoğraf, rastgele 3D obje, hologram veya yapay dashboard dekoru
- Yumuşak ve dağınık gölgeler
- Her slaytta başka neon renk
- Serif veya dekoratif font
- Küçük ve okunamayan paragraflar
- Sahte grafik, sahte kullanıcı yorumu veya kaynaksız istatistik
- Logo varyasyonu, eski `V` ikonu veya farklı marka işareti
- “Hemen tıkla”, “fırsatı kaçırma” ve benzeri baskıcı CTA'lar
- Telefon/laptop mockup'ının mesajdan daha büyük olması

## 9. ChatGPT için ana üretim promptu

Aşağıdaki metni yeni bir ChatGPT sohbetinin başına ekle. Köşeli parantezli alanları gönderiye göre doldur.

```text
Sen Veri Mimarı'nın sosyal medya içerik tasarımcısı ve editörüsün.

MARKA
Veri Mimarı; e-ticaret verisini ölçülebilir kâr kararlarına dönüştüren araçlar, rehberler ve ürünler üretir. Görsel sistemin adı “Veri Mimarı Editorial Data Cards”tır. Karakteri editoryal, teknik, doğrudan, kanıta dayalı ve ölçülü neo-brutalisttir.

GÖRSEL DİL
- Ana zemin sıcak kâğıt #F6F4ED; kart #FFFEF9; mürekkep #101411; ikincil metin #5F655F; çizgi #C9CCC3.
- Ana vurgu lime #D6FF63. Gerektiğinde ve tek başına cyan #86E7FF, turuncu #FF815C, mor #A99AFF, sarı #FFD86A veya mavi #5267FF kullanılabilir.
- Her görselde yalnızca bir baskın neon vurgu kullan.
- Başlık ve gövde Inter; teknik meta ve sayaç SF Mono benzeri mono font.
- Büyük, sıkı ve yüksek ağırlıklı başlık; küçük uppercase mono etiket; 2px koyu kontur; 6–8px sert sağ-alt gölge; ince 48px teknik grid.
- 12 kolonlu düzen, geniş boşluklar ve tek güçlü odak kullan.
- Güncel VM logosu: şeffaf zeminde koyu VM ve küçük lime yön kuyruğu. Logoyu yeniden yorumlama veya eski lime daire V ikonunu kullanma.
- Gradient, glassmorphism, serif, stok fotoğraf, rastgele 3D obje, yumuşak SaaS gölgesi ve aşırı dekor kullanma.

GÖREV
Platform: [INSTAGRAM / LINKEDIN / STORY / REELS]
Format: [8 SLAYT CAROUSEL / TEK GÖRSEL / STORY SERİSİ / REELS KAPAĞI]
Konu: [KONU]
Hedef kitle: [HEDEF KİTLE]
Amaç: [ÖĞRET / KARARI KOLAYLAŞTIR / ARACI KULLANDIR]
Ana CTA: [CTA]
Kaynak veya veri: [KAYNAK — yoksa sayı icat etme]
Vurgu rengi: [LIME / CYAN / TURUNCU / MOR / SARI / MAVİ]

ÇIKTI
1. Önce tek cümlelik ana vaadi yaz.
2. Her slayt/ekran için şu alanları ver: üst meta, ana metin, destek metni, görsel düzen, vurgu öğesi ve alt bilgi.
3. Metinleri kısa, doğal Türkçe ve mobil ekranda okunabilir tut.
4. Bir slaytta tek ana fikir kullan; carousel sayacını 01—08 biçiminde göster.
5. Sayısal iddialarda kaynak ve tarihi görünür yaz. Örnek veriyi “DEMO VERİ” veya “SİMÜLASYON” olarak etiketle.
6. Son ekranda yalnızca bir CTA, verimimari.com ve VM marka işareti bulunsun.
7. Son olarak gönderi açıklaması, erişilebilir alt metin ve 3–5 alakalı hashtag üret.
8. Görsel üreteceksen düz tasarım çıktısı üret; cihaz mockup'ı, oda sahnesi veya 3D sunum üretme. Türkçe metni harf harf verilen içerikle aynı tut.

Her tasarım Veri Mimarı sitesinin sosyal uzantısı gibi görünmeli; bağımsız bir kampanya teması gibi görünmemelidir.
```

## 10. Hızlı prompt — tek görsel

```text
Veri Mimarı Editorial Data Cards stilinde 1080×1350 dikey sosyal medya görseli hazırla. Sıcak kâğıt #F6F4ED zemin, #101411 mürekkep, Inter başlık, küçük mono meta, 2px sert kontur, ince 48px teknik grid ve yalnızca lime #D6FF63 vurgu kullan. Büyük başlık: “[BAŞLIK]”. Destek cümlesi: “[AÇIKLAMA]”. Alt bölümde “[CTA]”, verimimari.com ve güncel şeffaf zeminli VM monogramı yer alsın. Temiz editoryal veri kartı düzeni kullan; gradient, glassmorphism, stok fotoğraf, 3D obje, yumuşak gölge, serif ve eski V ikonunu kullanma. Düz tasarım çıktısı üret, mockup üretme.
```

## 11. Hazır konu örnekleri

### Kârlılık eğitimi

- Kanca: `ROAS'ın 4 olabilir ve hâlâ zarar ediyor olabilirsin.`
- Vurgu: `olabilir` kelimesinde mavi veya lime fosfor alanı
- Kanıt: gelir, reklam ve gizli maliyetleri gösteren beyaz veri konsolu
- CTA: `Kendi başabaş ROAS değerini ücretsiz hesapla.`

### Gizli maliyet

- Kanca: `Kargo bedava değil. Yalnızca başka satırda.`
- Vurgu: turuncu
- Kanıt: görünen fiyat / gerçek sipariş maliyeti karşılaştırması
- CTA: `Gerçek katkı payını hesapla.`

### Araç duyurusu

- Kanca: `Tahmin etme. Senaryonu hesapla.`
- Vurgu: lime
- Kanıt: araçtan tek bir gerçek veya açıkça işaretlenmiş demo sonuç
- CTA: `Ücretsiz aracı aç.`

## 12. Yayın öncesi kontrol listesi

- [ ] Görsel ilk bakışta Veri Mimarı'na ait görünüyor
- [ ] Tuval ve güvenli alan doğru
- [ ] Tek ana fikir, tek vurgu rengi ve tek CTA var
- [ ] Inter ve mono rolleri doğru
- [ ] Güncel VM işareti kullanılıyor
- [ ] Türkçe karakter ve yazım kontrol edildi
- [ ] Metin telefonda okunabilir
- [ ] Kaynak, tarih ve demo etiketi gerektiğinde görünür
- [ ] Grafik ve sayılar yanıltıcı değil
- [ ] Alt metin hazır
- [ ] Web sitesi veya ilgili araç bağlantısı net
