import Link from 'next/link'
import type { Metadata } from 'next'
import { labsCatalog } from '@/lib/labs'
import LabEmbed from '@/components/labs/LabEmbed'
import GradioLoader from '@/components/labs/GradioLoader'
import NavBar from '@/components/landing/NavBar'
import Footer from '@/components/landing/Footer'
import { getDictionary } from '@/lib/i18n'

export const metadata: Metadata = {
  title: 'AI Laboratuvarı ve İnteraktif Deneyler',
  description:
    'E-ticaret, veri analizi ve yapay zekâ için canlı model demolarını ve interaktif prototipleri inceleyin.',
  alternates: { canonical: '/labs' },
  openGraph: { url: '/labs', type: 'website' },
}

export default function LabsPage() {
  const t = getDictionary('tr')

  return (
    <main className="page" aria-label="Labs deney alanı">
      <GradioLoader />
      <NavBar t={t} />

      <section className="wrap hero single">
        <Link href="/" className="back-link">
          ← Ana Sayfaya Dön
        </Link>
        <span className="eyebrow">LABS</span>
        <h1>Canlı AI Modelleri ve İnteraktif Deney Ortamı</h1>
        <p className="intro">
          Hugging Face (Gradio) ve Streamlit deneylerini doğrudan platform içine gömerek, portföyü
          statik sunumdan canlı bir laboratuvara dönüştürür.
        </p>
      </section>

      <section className="wrap" style={{ paddingBottom: 72 }}>
        <div className="lab-grid">
          {labsCatalog.map((item: any) => (
            <LabEmbed key={item.id} item={item} />
          ))}
        </div>
      </section>
      <Footer t={t} />
    </main>
  )
}
