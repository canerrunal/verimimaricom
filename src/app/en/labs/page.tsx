import Link from 'next/link'
import { labsCatalog } from '@/lib/labs'
import LabEmbed from '@/components/labs/LabEmbed'
import GradioLoader from '@/components/labs/GradioLoader'
import NavBar from '@/components/landing/NavBar'
import Footer from '@/components/landing/Footer'
import { getDictionary } from '@/lib/i18n'

export default function LabsPageEN() {
  const t = getDictionary('en')

  return (
    <main className="page" aria-label="Labs experimentation area">
      <GradioLoader />
      <NavBar t={t} />

      <section className="wrap hero single">
        <Link href="/en" className="back-link">
          ← Back to Home
        </Link>
        <span className="eyebrow">LABS</span>
        <h1>Live AI Models and Interactive Experiment Environment</h1>
        <p className="intro">
          Embed Hugging Face (Gradio) and Streamlit experiments directly into the platform and
          transform the portfolio from a static presentation into a live laboratory.
        </p>
      </section>

      <section className="wrap" style={{ paddingBottom: 72 }}>
        <div className="lab-grid" style={{ marginTop: 36 }}>
          {labsCatalog.map((item: any) => (
            <LabEmbed key={item.id} item={item} />
          ))}
        </div>
      </section>
      <Footer t={t} />
    </main>
  )
}
