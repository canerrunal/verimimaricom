// @ts-nocheck
import { labsCatalog } from '@/lib/labs'
import LabEmbed from '@/components/labs/LabEmbed'
import GradioLoader from '@/components/labs/GradioLoader'

export default function LabsPage() {
  return (
    <main className="page labs-page" aria-label="Labs deney alani">
      <GradioLoader />

      <section className="labs-hero">
        <span className="eyebrow">Phase 3 . Labs</span>
        <h1>Canli AI Modelleri ve Interaktif Deney Ortami</h1>
        <p>
          Hugging Face (Gradio) ve Streamlit deneylerini dogrudan platform icine gomerek, portfoyuu
          statik sunumdan canli bir laboratuara dondurur.
        </p>
      </section>

      <section className="labs-grid" aria-label="Gomulu model kartlari">
        {labsCatalog.map((item) => (
          <LabEmbed key={item.id} item={item} />
        ))}
      </section>
    </main>
  )
}
