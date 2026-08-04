import type { Metadata } from 'next'
import AnalyzerClient from './AnalyzerClient'
import { aiVisibilityFaqs } from './faq'
import { getSiteUrl } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Yapay Zekâ Görünürlük ve Teknik Hazırlık Ön Analizi',
  description:
    'Sitenizin teknik sinyallerini kontrol edin; ücretsiz ChatGPT ve Perplexity oturumlarından getirdiğiniz dört markasız yanıtı API maliyeti olmadan analiz edin.',
  alternates: { canonical: '/araclar/yapay-zeka-gorunurluk-analizi' },
  openGraph: {
    title: 'AI Görünürlük ve Teknik Hazırlık Ön Analizi | Veri Mimarı',
    description:
      'Ana sayfa teknik sinyalini manuel AI görünürlük kanıtından ayırın; ücretsiz web yanıtlarını tarayıcınızda analiz edin.',
    type: 'website',
  },
}

export default function AiVisibilityAnalysisPage() {
  const siteUrl = getSiteUrl()
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Yapay Zekâ Görünürlük ve Teknik Hazırlık Ön Analizi',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      url: `${siteUrl}/araclar/yapay-zeka-gorunurluk-analizi`,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'TRY' },
      description:
        'Ana sayfa teknik sinyallerini ve ücretsiz AI web oturumlarından manuel getirilen marka görünürlüğü kanıtını ayrı değerlendiren, ücretli API çağrısı yapmayan beta analiz aracı.',
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
