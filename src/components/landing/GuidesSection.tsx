export default function GuidesSection({ t }: { t: any }) {
  return (
    <section className="section" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="head">
          <div>
            <span className="eyebrow">{t.guides.eyebrow}</span>
            <h2>{t.guides.title}</h2>
          </div>
          <p>{t.guides.description}</p>
        </div>
        <div className="guides">
          {t.guides.items.map((guide: any, idx: number) => (
            <div key={`guide-${idx}`} className={`guide ${idx === 0 ? 'featured' : ''}`}>
              <div className="guide-top">
                <span className="eyebrow">0{idx + 1}</span>
                <span>rehber</span>
              </div>
              <h3>{guide.title}</h3>
              <a className="link" href={guide.href}>Oku</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
