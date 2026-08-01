# Veri Mimarı — Agent çalışma kuralları

Bu dosya repository'nin tamamı için geçerlidir.

## Zorunlu tasarım kaynağı

UI, sayfa, içerik yüzeyi veya görsel bileşen üzerinde çalışmadan önce kökteki `design.md` dosyasını tamamen oku. `design.md`, Veri Mimarı'nın bağlayıcı tasarım sistemidir.

Ardından görevle ilgili olarak şu kaynakları incele:

1. `src/app/globals.css`
2. İlgili mevcut sayfa ve ortak bileşenler
3. `src/components/landing/NavBar.tsx`
4. `src/components/landing/HeroPanel.tsx`
5. `RECON/design-dna.json`
6. İçerik yazılıyorsa `docs/içerik.md`

Bu okuma yapılmadan yeni UI kodu üretme.

## Tasarım sistemi zorunluluğu

- Her yeni sayfa `design.md` içindeki sayfa arketiplerinden birini temel almalıdır.
- Her yeni bileşen mevcut renk, tipografi, boşluk, radius, kontur ve gölge tokenlarını kullanmalıdır.
- Yeni bir görsel değer eklemeden önce mevcut token ve bileşenlerle çözüm ara.
- Yeni bir sistem deseni gerekiyorsa `design.md` ve `RECON/design-dna.json` aynı değişiklikte güncellenmelidir.
- Dış referans veya ekran görüntüsü verilmemiş olsa bile `design.md` tek görsel referanstır.
- Mevcut tasarım diline uymayan geçici veya sayfaya özel bir alt tema oluşturma.

## Uygulama tercihleri

- Ortak yapı için mevcut `NavBar`, `Footer`, `.wrap`, `.hero.single`, `.hero-shell`, `.section-band`, `.grid`, `.card`, `.panel`, `.btn`, `.tag` ve form sınıflarını yeniden kullan.
- Inline style eklemek yerine anlamlı sınıf ve CSS değişkeni kullan.
- Tekrarlanan UI'ı ortak React bileşenine çıkar.
- İşlevsel hesaplayıcı, form, CMS ve API davranışlarını görsel değişiklik sırasında koru.
- Yeni bağımlılık veya ayrı bir UI framework'ü ekleme; açık kullanıcı talebi veya belgelenmiş teknik gerekçe gerekir.
- Serif font, rastgele hex renk, yumuşak SaaS gölgesi, aşırı glassmorphism, scroll-jacking ve dekoratif ağır animasyon kullanma.

## Yeni sayfa çalışma akışı

1. `design.md` dosyasını oku.
2. Sayfa arketipini seç: landing, listeleme, araç, rehber veya proje.
3. Benzer mevcut rotayı bul ve yapı taşlarını yeniden kullan.
4. İçeriği tek ana vaat ve tek öncelikli CTA etrafında düzenle.
5. Masaüstü ve mobil düzeni birlikte geliştir.
6. Çalışan etkileşimleri tarayıcıda doğrula.
7. Aşağıdaki kalite kapılarını tamamla.

## Zorunlu kalite kapıları

UI işi teslim edilmeden önce:

- Yaklaşık 1265–1440px masaüstü görünümü doğrula.
- 390px mobil görünümü doğrula.
- Yatay taşma olmadığını kontrol et.
- Navigasyon, ana CTA, form ve sayfaya özgü temel etkileşimi test et.
- Heading sırası, label'lar, focus görünürlüğü ve renk kontrastını kontrol et.
- `npm run typecheck` çalıştır.
- `npm run build` çalıştır.
- İlgili smoke veya fonksiyon testi varsa çalıştır.

Bir kontrol mevcut repository yapılandırmasındaki bağımsız bir sorun nedeniyle çalışmıyorsa bunu açıkça raporla; başarılı olmuş gibi davranma.

## Değişiklik sınırları

- Kullanıcının mevcut ve ilgisiz çalışma alanı değişikliklerini koru.
- Tasarım işi adı altında iş mantığını, API sözleşmesini veya içeriğin doğruluğunu sebepsiz değiştirme.
- Tasarım sisteminden sapma gerekiyorsa gerekçeyi kullanıcıya bildir ve kalıcıysa dokümantasyonu güncelle.
- Kullanıcının açık talebi her zaman önceliklidir. Kalıcı bir marka değişikliği istenirse `design.md` de güncellenmelidir.

## Definition of done

Yeni bir sayfa veya içerik yüzeyi ancak şu koşullarda tamamlanmıştır:

- Veri Mimarı'na ait olduğu ilk bakışta anlaşılıyor.
- `design.md` tokenları ve bileşen dili kullanılıyor.
- İçerik hiyerarşisi ve ana aksiyon net.
- Masaüstü ve mobil görünüm doğrulanmış.
- Temel etkileşimler çalışıyor.
- TypeScript ve production build kontrolleri sonucu raporlanmış.
