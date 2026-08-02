import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Veri ve E-Ticaret Analitiği Projeleri',
  description:
    'Veri Mimarı projelerini, e-ticaret kârlılık sistemlerini, reklam zekâsını ve AI otomasyon deneylerini inceleyin.',
  alternates: { canonical: '/projeler' },
  openGraph: {
    title: 'Veri ve E-Ticaret Analitiği Projeleri | Veri Mimarı',
    description:
      'Çalışan sistemleri, deneyleri ve veri odaklı ürün projelerini yakından görün.',
    type: 'website',
  },
}

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children
}
