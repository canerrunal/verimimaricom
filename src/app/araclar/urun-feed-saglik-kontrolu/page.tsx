import type { Metadata } from 'next'
import FeedHealthChecker from '@/components/tools/FeedHealthChecker'
import { getSiteUrl } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Ürün Feed Sağlık Kontrolü',
  description:
    'CSV ürün feed’inizde eksik alan, fiyat, stok, URL, kimlik ve içerik sorunlarını ücretsiz tarayın. Google Merchant Center ve OpenAI feed hazırlığını görün.',
  alternates: { canonical: '/araclar/urun-feed-saglik-kontrolu' },
  openGraph: {
    title: 'Ürün Feed Sağlık Kontrolü | Veri Mimarı',
    description:
      'Ürün feed’inizi tarayıcıda analiz edin; kritik hataları ve platform zorunlu alan hazırlığını görün.',
    type: 'website',
  },
}

export default function ProductFeedHealthPage() {
  const siteUrl = getSiteUrl()
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Ürün Feed Sağlık Kontrolü',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    url: `${siteUrl}/araclar/urun-feed-saglik-kontrolu`,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'TRY' },
    description:
      'CSV ürün verisinde çekirdek alan, biçim, tekillik ve içerik kalite sorunlarını tarayıcıda analiz eden ücretsiz araç.',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <FeedHealthChecker />
    </>
  )
}
