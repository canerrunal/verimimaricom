import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import VeriBotChat from '@/components/veribot/VeriBotChat'
import { brandProfile, getGlobalJsonLd, getSiteUrl } from '@/lib/seo'

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-inter',
})

const siteUrl = getSiteUrl()

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Veri Mimarı | Caner Ünal',
    template: '%s | Veri Mimarı',
  },
  description:
    'E-ticaret verisini daha kârlı kararlara dönüştüren ücretsiz araçlar, rehberler ve ürünler.',
  keywords: [
    'Veri Mimarı',
    'Caner Ünal',
    'E-ticaret',
    'Başa Baş ROAS',
    'Reklam Analitiği',
    'Kârlılık',
    'Veri Analitiği',
    'Yapay Zeka',
  ],
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: siteUrl,
    title: 'Veri Mimarı | Caner Ünal',
    description: brandProfile.description,
    siteName: 'Veri Mimarı',
    images: [
      {
        url: brandProfile.image,
        width: 1200,
        height: 630,
        alt: 'Veri Mimarı - Caner Ünal',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Veri Mimarı | Caner Ünal',
    description: brandProfile.description,
    images: [brandProfile.image],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = getGlobalJsonLd()

  return (
    <html lang="tr" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://cdn.sanity.io" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />
      </head>
      <body>
        {jsonLd.map((schema, index) => (
          <script
            key={`global-schema-${index}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
        {children}
        <VeriBotChat />
      </body>
    </html>
  )
}
