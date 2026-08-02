import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'İndirim Kârlılık Simülatörü',
  description:
    'İndirim oranının ürün kârına etkisini ve kârı korumak için gereken ek satış adedini ücretsiz simüle edin.',
  alternates: { canonical: '/araclar/indirim-karlilik-simulatoru' },
  openGraph: {
    title: 'İndirim Kârlılık Simülatörü | Veri Mimarı',
    description: 'Kampanya indirimini satış hacmi ve kâr etkisiyle birlikte test edin.',
    type: 'website',
  },
}

export default function DiscountProfitabilityLayout({ children }: { children: React.ReactNode }) {
  return children
}
