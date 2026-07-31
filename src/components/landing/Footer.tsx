export default function Footer({ t }: { t: any }) {
  return (
    <footer
      style={{
        marginTop: '80px',
        padding: '32px 24px',
        borderTop: '1px solid #deded9',
        fontSize: '12px',
        color: '#777',
      }}
    >
      <div
        style={{
          maxWidth: '1160px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <span>© 2026 VERİ MİMARI / CANER ÜNAL TARAFINDAN GELİŞTİRİLDİ</span>
        <div style={{ display: 'flex', gap: '16px' }}>
          <a href="/gizlilik" style={{ color: '#555', textDecoration: 'none' }}>
            Gizlilik Politikası
          </a>
          <span>·</span>
          <a href="/bulten" style={{ color: '#555', textDecoration: 'none' }}>
            Veri Mimarı Notları
          </a>
          <span>·</span>
          <a href="/is-birligi" style={{ color: '#555', textDecoration: 'none' }}>
            İş Birliği
          </a>
        </div>
      </div>
    </footer>
  )
}
