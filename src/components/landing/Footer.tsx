export default function Footer({ t }: { t: any }) {
  const isEnglish = t?.locale === 'en'

  return (
    <footer className="footer">
      <div className="wrap footer-row">
        <span>
          © 2026 VERİ MİMARI /{' '}
          {isEnglish ? 'BUILT BY CANER ÜNAL' : 'CANER ÜNAL TARAFINDAN GELİŞTİRİLDİ'}
        </span>
        <span>
          <a href="/gizlilik">{isEnglish ? 'Privacy' : 'Gizlilik'}</a>
          <span style={{ margin: '0 8px' }}>·</span>
          <a href="/bulten">{isEnglish ? 'Data Architect Notes' : 'Veri Mimarı Notları'}</a>
          <span style={{ margin: '0 8px' }}>·</span>
          <a href="/sozluk">{isEnglish ? 'Glossary' : 'Sözlük'}</a>
          <span style={{ margin: '0 8px' }}>·</span>
          <a href="/yapay-zeka">{isEnglish ? 'Applied AI' : 'Yapay Zekâ'}</a>
          <span style={{ margin: '0 8px' }}>·</span>
          <a href="/karsilastirmalar">{isEnglish ? 'Comparisons' : 'Karşılaştırmalar'}</a>
          <span style={{ margin: '0 8px' }}>·</span>
          <a href="/e-ticaret-danismani">{isEnglish ? 'Consulting' : 'Danışmanlık'}</a>
        </span>
      </div>
    </footer>
  )
}
