import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ürün Kâr Marjı Hesaplayıcı',
  description:
    'Satış fiyatı, ürün maliyeti, komisyon, kargo ve reklam giderleri sonrası gerçek ürün kârınızı ve net marjınızı ücretsiz hesaplayın.',
  alternates: { canonical: '/araclar/kar-marji-hesaplayici' },
  openGraph: {
    title: 'Ürün Kâr Marjı Hesaplayıcı | Veri Mimarı',
    description: 'Sipariş başına gerçek katkıyı ve kâr marjını maliyet katmanlarıyla görün.',
    type: 'website',
  },
}

export default function MarginCalculatorLayout({ children }: { children: React.ReactNode }) {
  return children
}
