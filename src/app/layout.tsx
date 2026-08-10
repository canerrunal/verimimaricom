import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import VeriBotChat from '@/components/veribot/VeriBotChat'
import JsonLd from '@/components/common/JsonLd'
import { brandProfile, getGlobalJsonLd, getSiteUrl } from '@/lib/seo'

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-inter',
})

const siteUrl = getSiteUrl()
const googleSiteVerification =
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || 'oTRvAIcqh7XPzyTuXHrgyk1UDwhZwVIdKSEVsEJvC8I'
const googleTagManagerId = process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID || 'GTM-MS9W2HR4'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Veri Mimarı | E-Ticaret Veri ve Kârlılık Araçları',
    template: '%s | Veri Mimarı',
  },
  description:
    'E-ticaret verisini daha kârlı kararlara dönüştüren ücretsiz araçlar, rehberler ve ürünler.',
  keywords: [
    'Veri Mimarı',
    'Caner Ünal',
    'E-ticaret danışmanı',
    'E-ticaret uzmanı',
    'Dijital pazarlama uzmanı',
    'Dijital pazarlama danışmanlığı',
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
  ...(googleSiteVerification ? { verification: { google: googleSiteVerification } } : {}),
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
        {googleTagManagerId ? (
          <>
            <Script id="google-tag-manager" strategy="afterInteractive">
              {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${googleTagManagerId}');`}
            </Script>
            <noscript>
              <iframe
                src={`https://www.googletagmanager.com/ns.html?id=${googleTagManagerId}`}
                height="0"
                width="0"
                style={{ display: 'none', visibility: 'hidden' }}
                title="Google Tag Manager"
              />
            </noscript>
          </>
        ) : null}
        {jsonLd.map((schema, index) => (
          <JsonLd key={`global-schema-${index}`} id={`global-schema-${index}`} data={schema} />
        ))}
        {children}
        <VeriBotChat />
      </body>
    </html>
  )
}
