import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Başa Baş ROAS Hesaplayıcı',
  description:
    'Ürün maliyeti, komisyon, kargo ve iade giderlerini girerek reklamda zarar etmeye başladığınız başa baş ROAS ve CPA sınırını ücretsiz hesaplayın.',
  alternates: { canonical: '/araclar/basabas-roas-hesaplayici' },
  openGraph: {
    title: 'Başa Baş ROAS Hesaplayıcı | Veri Mimarı',
    description: 'Reklam harcamanızın kârlılık eşiğini ürün ekonominize göre bulun.',
    type: 'website',
  },
}

export default function BreakEvenRoasLayout({ children }: { children: React.ReactNode }) {
  return children
}
