export default function ProjectsSection({ t }: { t: any }) {
  return (
    <section className="wrap projects">
      <div className="projects-title">PROJELER / ZOLM DURUM ÇALIŞMASI</div>
      {t.projects.items.map((project: any, idx: number) => (
        <div key={`proj-${idx}`} className={`project-card ${idx === 0 ? 'purple-panel' : ''}`}>
          <div>
            <h3>{project.name}</h3>
            <p>{project.description}</p>
            <a href={project.href}>{project.cta} ↗</a>
          </div>
        </div>
      ))}
      <p className="note">{t.projects.note}</p>
    </section>
  )
}
