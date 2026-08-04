import type { Metadata } from 'next'
import ReturnSignalAnalyzer from '@/components/tools/ReturnSignalAnalyzer'
import { getSiteUrl } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'İade Nedeni ve Yorum Sinyali Analizi',
  description:
    'CSV yorum ve iade kayıtlarını tarayıcıda sınıflandırın; ürün, içerik, kalite, teslimat ve destek aksiyonlarını önceliklendirin.',
  alternates: { canonical: '/araclar/iade-nedeni-yorum-sinyali' },
  openGraph: {
    title: 'İade Nedeni ve Yorum Sinyali Analizi | Veri Mimarı',
    description: 'Yorum ve iade sinyallerini yerel CSV analiziyle aksiyon kuyruğuna dönüştürün.',
    type: 'website',
  },
}

export default function ReturnSignalPage() {
  const siteUrl = getSiteUrl()
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'İade Nedeni ve Yorum Sinyali Analizi',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    url: `${siteUrl}/araclar/iade-nedeni-yorum-sinyali`,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'TRY' },
    description:
      'Yorum ve iade kayıtlarını tarayıcıda operasyon sınıflarına ayıran ücretsiz ön analiz aracı.',
  }
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ReturnSignalAnalyzer />
    </>
  )
}
