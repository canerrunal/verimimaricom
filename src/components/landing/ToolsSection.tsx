export default function ToolsSection({ t }: { t: any }) {
  return (
    <section className="wrap tools">
      <div className="tools-title">ARAÇLAR / GERÇEK VERİYLE HESAPLAMA</div>
      <div className="tool-card main">
        <div>
          <h3>{t.tools.items[0].name}</h3>
          <p>{t.tools.items[0].description}</p>
          <a href={t.tools.items[0].href}>{t.tools.items[0].cta} ↗</a>
        </div>
      </div>
      <div className="tool-card blue">
        <div>
          <h4>{t.tools.items[1].name}</h4>
          <p>{t.tools.items[1].description}</p>
        </div>
      </div>
      <div className="tool-card purple">
        <div>
          <h4>{t.tools.items[2].name}</h4>
          <p>{t.tools.items[2].description}</p>
        </div>
      </div>
      <div className="tool-card light">
        <div>
          <h4>{t.tools.allToolsCta}</h4>
          <p>Tüm araçları keşfedin.</p>
        </div>
      </div>
    </section>
  )
}
