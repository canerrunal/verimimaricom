# Trendyol sayısal stok ve ürün metrikleri

## Değişiklik

Profil ve taksonomi gözlemlerine `metrics` JSONB eklendi. Kaynak alanları normalize edilerek stok miktarı, satıcı/varyant/ilan kimliği, kaynak ve zaman, görülen satıcılar, varyantlar ve stok azalmasına dayalı satış tahmini saklanır. Yorum/değerlendirme/soru sayısı ve ürün puanı ayrı grafiklerdir.

Sayısal stok grafiği en son bilinen inventory_key kapsamıyla sınırlandırılır; farklı varyant veya satıcıların stokları tek seri gibi birleştirilmez. Günlük satış tahmini görünür satış etiketinden ayrıdır. Haftalık/aylık sonuç için tam ölçüm aralığı gerekir. Eksik dönemler sıfır gösterilmez. Eski durum grafiklerinin anlamı korunur.

Profil ingest işlemi tüm gözlemler yazılana kadar çalışmayı FAIL tutar; tamamlanınca PASS yapar. Böylece yarım yazılmış gün kamuya görünmez. Yeni kolonlar eklenmeden API sürümü yayınlanmamalıdır.

## Yayına alma

1. Yetkili Supabase bağlantısında `supabase/migrations/202609050001_trendyol_product_metrics.sql` uygulanır.
2. Uygulama dağıtılır ve hem profil hem taksonomi ingest/history uçları doğrulanır.
3. Trendyol reposundaki yeni collector çıktıları mevcut yayın hattından gönderilir. Collector'ın ilk miktar ölçümlerinden daha eski satış sayıları uydurulamaz.

5 Eylül 2026: yetkili Supabase SQL editöründe migration başarıyla uygulandı. Her iki gözlem tablosunda ve latest görünümde JSONB kolonları doğrulandı. Dağıtım GitHub/Vercel hattından yapılır.

## Doğrulama

- Gerçek Trendyol kaynağı ve canlı örnek ürün: fiyat 429,90; M beden stok 4; 48 değerlendirme, 34 yorum, 34 soru.
- Ayrı canlı kategori denemesi: 40/40 başarılı detay, 40/40 sayısal stok.
- Metrik ve geçmiş birim testleri; TypeScript ve production build.
- Geçici, açıkça TEST VERİSİ etiketli sayfada 1440px masaüstü / 390px mobil grafik, varyant tablosu, dönem ve metrik seçimi, eksik 7/30 günlük dönem, Escape ile kapanış ve focus dönüşü kontrol edildi. Mobil sayfa genişliği 390, dialog içerik/genişlik 355/355; yatay taşma yok. Test sayfası dağıtım kaynaklarına dahil değildir.
