export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="wrap footer-row">
        <span>© {year} VERİ MİMARI / CANER ÜNAL TARAFINDAN GELİŞTİRİLDİ</span>
        <span>ARAÇLAR · REHBERLER · PROJELER · GİZLİLİK</span>
      </div>
    </footer>
  )
}
