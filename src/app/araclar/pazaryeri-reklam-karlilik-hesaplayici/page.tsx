import type { Metadata } from 'next'
import RetailMediaProfitabilityCalculator from '@/components/tools/RetailMediaProfitabilityCalculator'
import { getSiteUrl } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Pazaryeri Reklam Kârlılık Hesaplayıcı',
  description:
    'Retail media ve pazaryeri reklamlarında panel ROAS, net satış, komisyon, ürün maliyeti ve artımlı katkıyı ücretsiz hesaplayın.',
  alternates: { canonical: '/araclar/pazaryeri-reklam-karlilik-hesaplayici' },
  openGraph: {
    title: 'Pazaryeri Reklam Kârlılık Hesaplayıcı | Veri Mimarı',
    description:
      'Atfedilen satışla gerçek ek katkıyı ayırın; başabaş artımlı pay ve güvenli reklam harcamasını görün.',
    type: 'website',
  },
}

export default function RetailMediaProfitabilityPage() {
  const siteUrl = getSiteUrl()
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Pazaryeri Reklam Kârlılık Hesaplayıcı',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    url: `${siteUrl}/araclar/pazaryeri-reklam-karlilik-hesaplayici`,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'TRY' },
    description:
      'Pazaryeri reklamlarında atfedilen satış, net katkı ve tahmini artımlı reklam etkisini hesaplayan ücretsiz araç.',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <RetailMediaProfitabilityCalculator />
    </>
  )
}
