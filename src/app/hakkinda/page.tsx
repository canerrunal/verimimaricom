import type { Metadata } from 'next'
import Link from 'next/link'
import { getDictionary } from '@/lib/i18n'

export const metadata: Metadata = {
  title: 'Caner Ünal Kimdir?',
  description:
    'Veri Mimarı kurucusu Caner Ünal hakkında. E-ticaret, yapay zekâ ve yazılım sistemleri geliştiricisi.',
  alternates: {
    canonical: '/hakkinda',
  },
}

export default function AboutPage() {
  const t = getDictionary('tr')

  return (
    <main className="page" aria-label="Hakkında">
      <section className="section">
        <div className="wrap">
          <Link href="/" className="back-link">← Ana Sayfaya Dön</Link>
          <span className="eyebrow">{t.founder.eyebrow}</span>
          <h1 style={{ font: '700 clamp(28px,3.5vw,42px)/1.1 "Space Mono"', letterSpacing: '-.09em', margin: '5px 0 22px' }}>
            Merhaba, ben Caner Ünal.
          </h1>
          <p style={{ color: '#666', maxWidth: 600, fontSize: 12, margin: '0 0 20px' }}>
            E-ticaret, dijital pazarlama, veri analizi, yapay zekâ ve yazılım geliştirme alanlarını bir araya getirerek
            insanların günlük işlerinde doğrudan kullanabileceği sistemler geliştiriyorum.
          </p>
          <p style={{ color: '#666', maxWidth: 600, fontSize: 12, margin: '0 0 20px' }}>
            Veri Mimarı&apos;nı, karmaşık metrikleri sadeleştiren; bilgi paylaşmakla kalmayıp çalışan araçlar üreten bir platform olarak kuruyorum.
            Burada geliştirdiğim projeleri, kullandığım yöntemleri, yaptığım hataları ve öğrendiğim dersleri açık biçimde paylaşıyorum.
          </p>
          <p style={{ color: '#666', maxWidth: 600, fontSize: 12, margin: '0 0 40px' }}>
            Amacım daha fazla teknoloji terimi kullanmak değil; e-ticaret yapan bir kişinin &quot;Bugün hangi kararı vermeliyim?&quot; sorusuna daha net cevap verebilmek.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            <div className="tool-sm">
              <div className="indicator blue"></div>
              <h3 style={{ font: '700 17px/1.16 "Space Mono"', letterSpacing: '-.07em', margin: '36px 0 8px' }}>
                Çalışma Alanları
              </h3>
              <ul style={{ fontSize: 10, color: '#777', margin: 0, paddingLeft: 16, lineHeight: 1.8 }}>
                <li>E-ticaret analitiği</li>
                <li>Dijital reklam performansı</li>
                <li>Yapay zekâ uygulamaları</li>
                <li>SaaS ürün geliştirme</li>
                <li>Otomasyon</li>
                <li>Veri görselleştirme</li>
                <li>Dönüşüm odaklı tasarım</li>
              </ul>
            </div>

            <div className="tool-sm">
              <div className="indicator green"></div>
              <h3 style={{ font: '700 17px/1.16 "Space Mono"', letterSpacing: '-.07em', margin: '36px 0 8px' }}>
                Yaklaşım
              </h3>
              <p style={{ fontSize: 10, color: '#777', margin: 0 }}>
                Önce problemi tanımlarım, ardından ölçülebilir sonucu belirlerim.
                Teknolojiyi yalnızca bu sonuca ulaşmak için kullanırım.
              </p>
            </div>

            <div className="tool-sm">
              <div className="indicator yellow"></div>
              <h3 style={{ font: '700 17px/1.16 "Space Mono"', letterSpacing: '-.07em', margin: '36px 0 8px' }}>
                Projeler
              </h3>
              <p style={{ fontSize: 10, color: '#777', margin: 0 }}>
                Veri Mimarı&apos;nda paylaşılan yöntemler, Caner Ünal tarafından geliştirilen araç ve yazılım projelerinde gerçek iş akışlarına dönüştürülür.
              </p>
              <a className="link" href="/projeler/zolm">Zolm&apos;u Keşfet</a>
            </div>
          </div>

          <div style={{ marginTop: 40 }}>
            <a className="btn" href="/is-birligi">İş Birliği İçin İletişime Geç ↗</a>
          </div>
        </div>
      </section>
    </main>
  )
}
