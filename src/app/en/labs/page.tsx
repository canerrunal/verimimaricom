import Link from 'next/link'
import { labsCatalog } from '@/lib/labs'
import LabEmbed from '@/components/labs/LabEmbed'
import GradioLoader from '@/components/labs/GradioLoader'

export default function LabsPageEN() {
  return (
    <main className="page" aria-label="Labs experimentation area">
      <GradioLoader />

      <section className="section">
        <div className="wrap">
          <Link href="/en" className="back-link">← Back to Home</Link>
          <span className="eyebrow">LABS</span>
          <h1 style={{ font: '700 clamp(28px,3.5vw,42px)/1.1 "Space Mono"', letterSpacing: '-.09em', margin: '5px 0 22px' }}>
            Live AI Models and Interactive Experiment Environment
          </h1>
          <p style={{ color: '#666', maxWidth: 500, fontSize: 12, margin: '0 0 40px' }}>
            Embed Hugging Face (Gradio) and Streamlit experiments directly into the platform and
            transform the portfolio from a static presentation into a live laboratory.
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
