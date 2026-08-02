import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'E-Ticaret Hesaplama Araçları',
  description:
    'ROAS, ürün kâr marjı, indirim, pazaryeri komisyonu ve e-ticaret stratejisini ücretsiz hesaplama araçlarıyla analiz edin.',
  alternates: { canonical: '/araclar' },
  openGraph: {
    title: 'E-Ticaret Hesaplama Araçları | Veri Mimarı',
    description:
      'E-ticaret kârlılığı, reklam verimliliği ve pazaryeri maliyetleri için ücretsiz araç kütüphanesi.',
    type: 'website',
  },
}

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return children
}
