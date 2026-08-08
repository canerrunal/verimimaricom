import type { Metadata } from 'next'
import AiCommerceVisibilityAudit from '@/components/tools/AiCommerceVisibilityAudit'
import { getSiteUrl } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'AI Alışveriş Görünürlük Denetimi',
  description:
    'Ürün sayfası, yapılandırılmış veri, merchant feed, fiyat-stok senkronizasyonu ve ölçüm hazırlığınızı ücretsiz puanlayın.',
  alternates: { canonical: '/araclar/ai-alisveris-gorunurluk-denetimi' },
  openGraph: {
    title: 'AI Alışveriş Görünürlük Denetimi | Veri Mimarı',
    description:
      'E-ticaret markanızın AI destekli arama ve alışveriş yüzeylerine hazırlığını 100 puanlık açık yöntemle ölçün.',
    type: 'website',
  },
}

export default function AiCommerceVisibilityAuditPage() {
  const siteUrl = getSiteUrl()
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'AI Alışveriş Görünürlük Denetimi',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    url: `${siteUrl}/araclar/ai-alisveris-gorunurluk-denetimi`,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'TRY' },
    description:
      'Ürün sayfası, yapılandırılmış veri, merchant feed, ticari senkronizasyon ve ölçüm hazırlığını puanlayan ücretsiz denetim aracı.',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AiCommerceVisibilityAudit />
    </>
  )
}
