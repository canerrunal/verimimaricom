import type { Metadata } from 'next'
import CustomerEconomicsCalculator from '@/components/tools/CustomerEconomicsCalculator'
import { getSiteUrl } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Yeni Müşteri CAC + 90 Günlük Katkı LTV Hesaplayıcı',
  description:
    'Doğrulanmış yeni müşteri CAC, ilk sipariş katkısı, 90 günlük katkı LTV, LTV:CAC ve geri ödeme durumunu ücretsiz hesaplayın.',
  alternates: { canonical: '/araclar/yeni-musteri-cac-katki-ltv-hesaplayici' },
  openGraph: {
    title: 'Yeni Müşteri CAC + 90 Günlük Katkı LTV | Veri Mimarı',
    description:
      'Reklam harcamasını doğrulanmış yeni müşteri ve 90 günlük kohort katkısıyla birleştirin.',
    type: 'website',
  },
}

export default function CustomerEconomicsPage() {
  const siteUrl = getSiteUrl()
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Yeni Müşteri CAC + 90 Günlük Katkı LTV Hesaplayıcı',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    url: `${siteUrl}/araclar/yeni-musteri-cac-katki-ltv-hesaplayici`,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'TRY' },
    description:
      'Doğrulanmış yeni müşteri CAC, 90 günlük katkı LTV ve edinme sonrası katkıyı hesaplayan ücretsiz araç.',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CustomerEconomicsCalculator />
    </>
  )
}
