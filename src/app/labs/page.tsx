import Link from 'next/link'
import { labsCatalog } from '@/lib/labs'
import LabEmbed from '@/components/labs/LabEmbed'
import GradioLoader from '@/components/labs/GradioLoader'

export default function LabsPage() {
  return (
    <main className="page" aria-label="Labs deney alanı">
      <GradioLoader />

      <section className="section">
        <div className="wrap">
          <Link href="/" className="back-link">← Ana Sayfaya Dön</Link>
          <span className="eyebrow">LABS</span>
          <h1 style={{ font: '700 clamp(28px,3.5vw,42px)/1.1 "Space Mono"', letterSpacing: '-.09em', margin: '5px 0 22px' }}>
            Canlı AI Modelleri ve İnteraktif Deney Ortamı
          </h1>
          <p style={{ color: '#666', maxWidth: 500, fontSize: 12, margin: '0 0 40px' }}>
            Hugging Face (Gradio) ve Streamlit deneylerini doğrudan platform içine gömerek, portföyü
            statik sunumdan canlı bir laboratuara dönüştürür.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
            {labsCatalog.map((item) => (
              <div key={item.id} className="tool-sm">
                <LabEmbed item={item} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
