import type { Metadata } from 'next'
import AnalyzerClient from './AnalyzerClient'
import { aiVisibilityFaqs } from './faq'
import { getSiteUrl } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Yapay Zekâ Görünürlük Analizi',
  description:
    'Markanızın AI cevaplarında anılma, rakip payı, kaynak görünürlüğü ve teknik AI hazırlığını açık yöntemle ölçün.',
  alternates: { canonical: '/araclar/yapay-zeka-gorunurluk-analizi' },
  openGraph: {
    title: 'Yapay Zekâ Görünürlük Analizi | Veri Mimarı',
    description:
      'AI görünürlüğünü teknik hazırlıktan ayırın; sağlayıcı, rakip ve kaynak sinyallerini kanıtlarıyla inceleyin.',
    type: 'website',
  },
}

export default function AiVisibilityAnalysisPage() {
  const siteUrl = getSiteUrl()
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Yapay Zekâ Görünürlük Analizi',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      url: `${siteUrl}/araclar/yapay-zeka-gorunurluk-analizi`,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'TRY' },
      description:
        'Markaların AI cevaplarındaki görünürlük sinyallerini ve teknik AI hazırlığını ayrı değerlendiren analiz aracı.',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: aiVisibilityFaqs.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AnalyzerClient />
    </>
  )
}
