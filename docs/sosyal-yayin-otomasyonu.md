# Sosyal yayın otomasyonu

Yeni bir kayıt `src/lib/announcements.ts` dosyasına eklenip `main` dalına ulaştığında GitHub Actions, canlı duyuru ve 1080×1350 JPEG sosyal kartı hazır olana kadar bekler. Ardından Instagram, Facebook, LinkedIn ve X için platforma özgü metinleri resmî API’lerle yayınlar.

Başarılı her yayın `social/<platform>/<slug>` Git etiketiyle kaydedilir. Bir platform hata verirse başarılı olanlar tekrarlanmaz; iş akışı yeniden çalıştırıldığında yalnızca eksik yayın tamamlanır.

## Gerekli GitHub değişkenleri

| Ad                       | Değer                                                         |
| ------------------------ | ------------------------------------------------------------- |
| `SITE_URL`               | `https://verimimari.com`                                      |
| `SOCIAL_PUBLISH_ENABLED` | Kurulum ve dry-run tamamlanana kadar `false`, açılışta `true` |
| `META_GRAPH_VERSION`     | `v26.0`                                                       |
| `LINKEDIN_VERSION`       | `202608`                                                      |

## Gerekli GitHub secret’ları

| Ad                      | Amaç                                                                                          |
| ----------------------- | --------------------------------------------------------------------------------------------- |
| `META_ACCESS_TOKEN`     | Instagram profesyonel hesabı ve Facebook Sayfası için uzun ömürlü Page erişim belirteci       |
| `INSTAGRAM_ACCOUNT_ID`  | Instagram profesyonel hesap kimliği                                                           |
| `FACEBOOK_PAGE_ID`      | Facebook Sayfa kimliği                                                                        |
| `LINKEDIN_ACCESS_TOKEN` | `w_organization_social` veya kişisel paylaşımda `w_member_social` yetkili OAuth 2.0 belirteci |
| `LINKEDIN_AUTHOR_URN`   | `urn:li:organization:<id>` veya `urn:li:person:<id>`                                          |
| `X_CONSUMER_KEY`        | X uygulamasının OAuth 1.0a Consumer Key değeri                                                |
| `X_CONSUMER_SECRET`     | X uygulamasının OAuth 1.0a Consumer Secret değeri                                             |
| `X_ACCESS_TOKEN`        | `@verimimari` hesabına bağlı okuma-yazma yetkili erişim belirteci                             |
| `X_ACCESS_TOKEN_SECRET` | `@verimimari` erişim belirtecinin OAuth 1.0a sırrı                                            |

Meta uygulamasında Instagram için `instagram_business_basic` ve `instagram_business_content_publish` (Instagram Login) veya `instagram_basic`, `instagram_content_publish` ve `pages_read_engagement` (Facebook Login) izinleri gerekir. Facebook Sayfası yayını için Page belirtecinin `pages_manage_posts`, `pages_read_engagement` ve ilgili sayfa görevlerini taşıması gerekir.

LinkedIn şirket sayfasında belirteci üreten üye sayfada Administrator veya Content Admin rolünde olmalıdır. X projesinde OAuth 1.0a kullanıcı bağlamında `Read and write` izni ve aktif API erişimi gerekir.

## Güvenli açılış sırası

1. Secret’ları ve kimlikleri GitHub repository ayarlarına ekleyin.
2. Actions ekranında `Publish announcements to social media` iş akışını `dry_run: true` ile çalıştırın.
3. Üretilen dört metni ve sosyal JPEG’i kontrol edin.
4. `SOCIAL_PUBLISH_ENABLED=true` yapın.
5. Mevcut bir duyuruyu ilk kez yayınlamak için aynı iş akışını slug ile `dry_run: false` çalıştırın.

Lokal dry-run örneği:

```bash
npm run social:publish -- --slug apple-m6-m5-ultra-yerel-ai-hesaplama-2026 --dry-run
```

Belirli platformları denemek için:

```bash
npm run social:publish -- --slug apple-m6-m5-ultra-yerel-ai-hesaplama-2026 --platforms linkedin,x --dry-run
```
