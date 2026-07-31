export default function GuidesSection({ t }: { t: any }) {
  return (
    <section className="wrap guides">
      <div className="guides-title">REHBERLER / E-TİCARETTE VERİ KULLANIMI</div>
      <div className="guides">
        {t.guides.items.map((guide: any, idx: number) => (
          <div key={`guide-${idx}`} className={idx === 0 ? 'featured' : ''}>
            <a href={guide.href}>
              <h3>{guide.title}</h3>
            </a>
          </div>
        ))}
      </div>
    </section>
  )
}
