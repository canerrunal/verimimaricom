# Veri Mimarı

E-ticaret verisini daha kârlı kararlara dönüştüren araçlar, rehberler ve ürünlerden oluşan platform.

## Teknoloji Yığını

- Next.js 15 (App Router)
- React 19
- TypeScript 5.9
- Sanity CMS
- Supabase
- Vercel AI SDK + OpenAI
- Vercel Deployment

## Kurulum

```bash
npm install
cp .env.example .env.local
# .env.local dosyasını doldurun
npm run dev
```

## Environment Variables

| Değişken                        | Açıklama                  |
| ------------------------------- | ------------------------- |
| `NEXT_PUBLIC_SITE_URL`          | Site URL                  |
| `SANITY_PROJECT_ID`             | Sanity proje ID           |
| `SANITY_DATASET`                | Sanity dataset            |
| `SANITY_API_TOKEN`              | Sanity API token          |
| `OPENAI_API_KEY`                | OpenAI API key            |
| `NEXT_PUBLIC_SUPABASE_URL`      | Supabase URL              |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key         |
| `SUPABASE_SERVICE_ROLE_KEY`     | Supabase service role key |

## Scriptler

| Script                 | Açıklama            |
| ---------------------- | ------------------- |
| `npm run dev`          | Geliştirme sunucusu |
| `npm run build`        | Production build    |
| `npm run lint`         | ESLint kontrolü     |
| `npm run lint:fix`     | ESLint düzeltme     |
| `npm run typecheck`    | TypeScript kontrolü |
| `npm run format`       | Prettier formatlama |
| `npm run format:check` | Format kontrolü     |
| `npm run test`         | Vitest testleri     |
| `npm run test:watch`   | Test watch modu     |
| `npm run smoke:test`   | Smoke testleri      |

## Mimari

```
src/
├── app/              # Next.js App Router sayfaları
│   ├── api/          # API rotaları
│   ├── araclar/      # Araç sayfaları
│   ├── rehberler/    # Rehber sayfaları
│   └── ...
├── components/       # React bileşenleri
│   ├── analytics/    # Analitik bileşenleri
│   ├── landing/      # Ana sayfa bileşenleri
│   ├── navigation/   # Navigasyon bileşenleri
│   └── ui/           # Temel UI bileşenleri
├── features/         # Özellik modülleri
│   └── break-even-roas/  # ROAS hesaplama aracı
├── lib/              # Yardımcı modüller
│   ├── analytics.ts
│   ├── cms.ts
│   ├── i18n.ts
│   └── ...
└── sanity/           # Sanity şema tanımları
```

## Testing

```bash
npm run test           # Tüm testleri çalıştır
npm run test:watch     # Watch modunda test
```

Test dosyaları `src/**/*.test.ts` ve `src/**/*.test.tsx` formatındadır.

## Deployment

Proje Vercel üzerinden deploy edilmektedir. CI/CD pipeline'ı `.github/workflows/quality-gates.yml` dosyasında tanımlıdır.

Her push'ta ve PR'da şu kontroller çalışır:

1. Format kontrolü
2. Lint
3. Type check
4. Unit testler
5. Build
6. Smoke test

## Dokümanlar

- [Kanonik Tasarım Sistemi](design.md)
- [Agent Çalışma Kuralları](AGENTS.md)
- [İçerik ve Marka Rehberi](docs/içerik.md)
- [Geliştirme Şartnamesi](docs/GELISTIRME-SARTNAMESI.md)
- [Analitik Olay Sözlüğü](docs/analytics-event-dictionary.md)
- [İçerik Yaşam Döngüsü Politikası](docs/content-lifecycle-policy.md)

## Lisans

Proprietary — Caner Ünal tarafından geliştirilmiştir.
