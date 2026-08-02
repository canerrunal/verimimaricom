import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'E-Ticaret ve Veri Analitiği Rehberleri',
  description:
    'ROAS, kârlılık, reklam performansı, müşteri ekonomisi ve yapay zekâ için formül, örnek ve uygulanabilir e-ticaret rehberleri.',
  alternates: { canonical: '/rehberler' },
  openGraph: {
    title: 'E-Ticaret ve Veri Analitiği Rehberleri | Veri Mimarı',
    description:
      'Metrikleri öğrenin, formülü uygulayın ve doğru kararı çalışan araçlarla test edin.',
    type: 'website',
  },
}

export default function GuidesLayout({ children }: { children: React.ReactNode }) {
  return children
}
