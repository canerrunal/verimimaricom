import { ImageResponse } from 'next/og'

export const alt = 'Veri Mimarı — E-ticaret veri, kârlılık ve dijital pazarlama sistemleri'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '58px 64px',
        background: '#F6F4ED',
        color: '#101411',
        fontFamily: 'Arial, sans-serif',
        border: '14px solid #101411',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 68,
              height: 68,
              background: '#101411',
              color: '#D6FF63',
              fontSize: 31,
              fontWeight: 900,
            }}
          >
            VM
          </div>
          <div style={{ display: 'flex', fontSize: 34, fontWeight: 850 }}>veri/mimarı</div>
        </div>
        <div style={{ display: 'flex', fontSize: 18, fontWeight: 700 }}>CANER ÜNAL · TÜRKİYE</div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 980 }}>
        <div style={{ display: 'flex', fontSize: 23, fontWeight: 800, marginBottom: 22 }}>
          E-TİCARET · VERİ · DİJİTAL PAZARLAMA
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 72,
            lineHeight: 0.98,
            letterSpacing: '-3px',
            fontWeight: 900,
          }}
        >
          Veriyi kârlı kararlara dönüştüren sistemler.
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div
          style={{
            display: 'flex',
            padding: '12px 18px',
            background: '#D6FF63',
            border: '3px solid #101411',
            fontSize: 20,
            fontWeight: 800,
          }}
        >
          AÇIK YÖNTEMLER · ÇALIŞAN ARAÇLAR
        </div>
        <div style={{ display: 'flex', fontSize: 22, fontWeight: 700 }}>verimimari.com</div>
      </div>
    </div>,
    size,
  )
}
