// @ts-nocheck
import type { Metadata } from 'next'
import TrackLink from '@/components/analytics/TrackLink'
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
        <span className="eyebrow">{t.founder.eyebrow}</span>
        <h1>Merhaba, ben Caner Ünal.</h1>
        <p className="section-description">
          E-ticaret, dijital pazarlama, veri analizi, yapay zekâ ve yazılım geliştirme alanlarını bir araya getirerek
          insanların günlük işlerinde doğrudan kullanabileceği sistemler geliştiriyorum.
        </p>

        <p className="section-description">
          Veri Mimarı'nı, karmaşık metrikleri sadeleştiren; bilgi paylaşmakla kalmayıp çalışan araçlar üreten bir platform olarak kuruyorum.
          Burada geliştirdiğim projeleri, kullandığım yöntemleri, yaptığım hataları ve öğrendiğim dersleri açık biçimde paylaşıyorum.
        </p>

        <p className="section-description">
          Amacım daha fazla teknoloji terimi kullanmak değil; e-ticaret yapan bir kişinin "Bugün hangi kararı vermeliyim?" sorusuna daha net cevap verebilmek.
        </p>

        <div className="card-grid-3">
          <article className="card">
            <h3>Çalışma Alanları</h3>
            <ul className="feature-list">
              <li>E-ticaret analitiği</li>
              <li>Dijital reklam performansı</li>
              <li>Yapay zekâ uygulamaları</li>
              <li>SaaS ürün geliştirme</li>
              <li>Otomasyon</li>
              <li>Veri görselleştirme</li>
              <li>Dönüşüm odaklı tasarım</li>
            </ul>
          </article>

          <article className="card">
            <h3>Yaklaşım</h3>
            <p>
              Önce problemi tanımlarım, ardından ölçülebilir sonucu belirlerim.
              Teknolojiyi yalnızca bu sonuca ulaşmak için kullanırım.
            </p>
          </article>

          <article className="card">
            <h3>Projeler</h3>
            <p>
              Veri Mimarı'nda paylaşılan yöntemler, Caner Ünal tarafından geliştirilen araç ve yazılım projelerinde gerçek iş akışlarına dönüştürülür.
            </p>
            <TrackLink
              href="/projeler/zolm"
              className="card-cta"
              eventName="cta_about_project_click"
              payload={{ project: 'Zolm', placement: 'about_page' }}
            >
              Zolm'u Keşfet
            </TrackLink>
          </article>
        </div>

        <div className="hero-cta-group">
          <TrackLink
            href="/is-birligi"
            className="cta-link cta-primary"
            eventName="cta_about_collaboration_click"
            payload={{ placement: 'about_page' }}
          >
            İş Birliği İçin İletişime Geç
          </TrackLink>
        </div>
      </section>
    </main>
  )
}
