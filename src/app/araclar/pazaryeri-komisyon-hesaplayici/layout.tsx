import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pazaryeri Komisyon Hesaplayıcı',
  description:
    'Trendyol, Hepsiburada, Amazon TR, N11 ve kendi sitenizde komisyon, kargo ve ödeme kesintileri sonrası ürün kârını karşılaştırın.',
  alternates: { canonical: '/araclar/pazaryeri-komisyon-hesaplayici' },
  openGraph: {
    title: 'Pazaryeri Komisyon Hesaplayıcı | Veri Mimarı',
    description: 'Farklı satış kanallarının komisyon ve operasyon maliyetlerini karşılaştırın.',
    type: 'website',
  },
}

export default function MarketplaceCommissionLayout({ children }: { children: React.ReactNode }) {
  return children
}
