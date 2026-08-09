import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Veri Mimarı Notları | E-Ticaret Bülteni',
  description:
    'E-ticaret kârlılığı, reklam performansı, sektör değişiklikleri ve yapay zekâ uygulamaları için haftalık Veri Mimarı Notları.',
  alternates: { canonical: '/bulten' },
  openGraph: {
    title: 'Veri Mimarı Notları | E-Ticaret Bülteni',
    description: 'Haftada bir, daha iyi bir e-ticaret kararı için araçlar ve uygulanabilir notlar.',
    url: '/bulten',
    type: 'website',
  },
}

export default function NewsletterLayout({ children }: { children: React.ReactNode }) {
  return children
}
