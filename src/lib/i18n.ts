// @ts-nocheck

export const dictionaries = {
  tr: {
    locale: 'tr',
    basePath: '/',
    nav: {
      ariaLabel: 'Ana navigasyon',
      brandAriaLabel: 'Veri Mimarı ana sayfa',
      brandText: 'VERİ MİMARI',
      links: [
        { href: '/araclar', label: 'Araçlar' },
        { href: '/rehberler', label: 'Rehberler' },
        { href: '/vaka-analizleri', label: 'Vaka Analizleri' },
        { href: '/projeler', label: 'Projeler' },
        { href: '/hakkinda', label: 'Hakkında' },
      ],
      cta: 'Ücretsiz Araçları Kullan',
      languageSwitch: {
        trLabel: 'TR',
        enLabel: 'EN',
        trHref: '/',
        enHref: '/en',
      },
    },
    hero: {
      eyebrow: 'E-ticaret için veri, yapay zekâ ve büyüme araçları',
      title: 'E-ticaret verisini daha kârlı kararlara dönüştürün.',
      description:
        'Reklam, ürün ve satış verilerinizi anlamanızı kolaylaştıran ücretsiz hesaplayıcılar, yapay zekâ destekli araçlar ve uygulanabilir rehberler.',
      ctaAriaLabel: 'Öne çıkan aksiyonlar',
      primaryCta: 'Ücretsiz Araçları Kullan',
      primaryCtaHref: '/araclar',
      secondaryCta: 'Rehberleri İncele',
      secondaryCtaHref: '/rehberler',
      trustLine: 'Caner Ünal tarafından geliştirildi · Açık yöntemler · Kullanılabilir çıktılar',
      badges: ['E-ticaret', 'AI Otomasyon', 'Kârlılık Analizi', 'Veri Görselleştirme'],
    },
    problem: {
      title: 'Satış artıyor olabilir. Peki kâr gerçekten artıyor mu?',
      description:
        'ROAS, ciro ve sipariş sayısı tek başına yeterli değildir. Ürün maliyeti, komisyon, kargo, iade ve operasyon giderleri hesaba katılmadığında başarılı görünen kampanyalar zarar ettirebilir.',
      cards: [
        {
          title: 'Gerçek kârlılığı görün',
          description:
            'Tüm maliyetleri hesaba katarak ürün ve kampanya bazında size ne kaldığını hesaplayın.',
        },
        {
          title: 'Doğru metriğe odaklanın',
          description:
            'Gösterişli raporlar yerine karar vermenizi sağlayan temel göstergeleri anlayın.',
        },
        {
          title: 'Tekrarlanan işleri otomatikleştirin',
          description:
            'Yapay zekâ ve SaaS araçlarını günlük e-ticaret iş akışınıza bağlayın.',
        },
      ],
    },
    tools: {
      eyebrow: 'Ücretsiz Araçlar',
      title: 'Rakamlarınızı girin, kararınızı netleştirin.',
      description:
        'E-ticaretin en sık karşılaşılan hesaplama ve analiz ihtiyaçları için ücretsiz araçlar.',
      items: [
        {
          name: 'Başabaş ROAS Hesaplayıcı',
          description:
            'Ürün maliyeti, kargo, komisyon ve iade oranınıza göre zarar etmeye başladığınız ROAS seviyesini bulun.',
          cta: 'Başabaş ROAS\'ı Hesapla',
          href: '/araclar/basabas-roas-hesaplayici',
          status: 'Ücretsiz',
        },
        {
          name: 'Kâr Marjı Hesaplayıcı',
          description:
            'Satış fiyatından tüm maliyetleri çıkarın; ürün başına katkı payınızı ve net marjınızı görün.',
          cta: 'Kâr Marjını Hesapla',
          href: '/araclar/kar-marji-hesaplayici',
          status: 'Ücretsiz',
        },
        {
          name: 'İndirim Kârlılık Simülatörü',
          description:
            'İndirim oranının satış başına kârınıza ve gerekli satış hacmine etkisini karşılaştırın.',
          cta: 'İndirim Senaryosu Oluştur',
          href: '/araclar/indirim-karlilik-simulatoru',
          status: 'Yakında',
        },
      ],
      allToolsCta: 'Tüm Araçları Gör',
      allToolsHref: '/araclar',
    },
    guides: {
      eyebrow: 'Rehberler',
      title: 'Karmaşık metrikleri sade, uygulanabilir rehberlerle öğrenin.',
      description:
        'Teorik bilgi değil; hesaplama yöntemi, örnek senaryo ve atılacak sonraki adım.',
      items: [
        {
          title: 'Başabaş ROAS nasıl hesaplanır?',
          href: '/rehberler/basabas-roas-nasil-hesaplanir',
        },
        {
          title: 'Yüksek ROAS neden her zaman yüksek kâr anlamına gelmez?',
          href: '/rehberler/yuksek-roas-kar-iliskisi',
        },
        {
          title: 'Trendyol komisyonu ürün kârlılığını nasıl etkiler?',
          href: '/rehberler/trendyol-komisyon-etkisi',
        },
        {
          title: 'İade oranı reklam bütçesine nasıl dahil edilir?',
          href: '/rehberler/iade-orani-butce-etkisi',
        },
        {
          title: 'E-ticaret raporunda takip edilmesi gereken temel metrikler',
          href: '/rehberler/e-ticaret-temel-metrikler',
        },
      ],
      cta: 'Tüm Rehberleri İncele',
      ctaHref: '/rehberler',
    },
    projects: {
      eyebrow: 'Projeler',
      title: 'İçerikten daha fazlası: çalışan ürünler.',
      description:
        'Veri Mimarı\'nda paylaşılan yöntemler, Caner Ünal tarafından geliştirilen araç ve yazılım projelerinde gerçek iş akışlarına dönüştürülür.',
      items: [
        {
          name: 'Zolm',
          description:
            'E-ticaret ve dijital pazarlama süreçlerini daha ölçülebilir ve yönetilebilir hale getirmek için geliştirilen ürün ekosistemi.',
          cta: 'Zolm\'u Keşfet',
          href: '/projeler/zolm',
          status: 'Beta',
        },
      ],
      note: 'Geliştirme aşamasındaki özellikler açıkça etiketlenir. Canlı, beta ve planlanan özellikler birbirinden ayrılır.',
    },
    caseStudies: {
      eyebrow: 'Vaka Analizleri',
      title: 'Kararın arkasındaki veriyi görün.',
      description:
        'Problemi, kullanılan yöntemi, varsayımları ve sonucu adım adım açıklayan vaka analizleri.',
      realLabel: 'Doğrulanmış müşteri vakası',
      demoLabel: 'Simüle edilmiş veriyle demo vaka',
      cta: 'Vaka Analizlerini İncele',
      ctaHref: '/vaka-analizleri',
    },
    founder: {
      eyebrow: 'Kurucu',
      title: 'Veri Mimarı\'nın arkasında kim var?',
      description:
        'Ben Caner Ünal. E-ticaret, dijital pazarlama, veri analizi ve yapay zekâyı bir araya getirerek insanların günlük işlerinde doğrudan kullanabileceği araçlar geliştiriyorum. Burada yalnızca sonuçları değil, araçları nasıl düşündüğümü, test ettiğimi ve geliştirdiğimi de paylaşıyorum.',
      primaryCta: 'Caner Ünal Hakkında',
      primaryCtaHref: '/hakkinda',
      secondaryCta: 'Geliştirme Notlarını Oku',
      secondaryCtaHref: '/blog',
    },
    newsletter: {
      title: 'Haftada bir, daha iyi bir e-ticaret kararı.',
      description:
        'Yeni araçlar, önemli sektör değişiklikleri ve uygulanabilir veri notları. Gereksiz gündem yok.',
      placeholder: 'E-posta adresiniz',
      button: 'Veri Mimarı Notlarına Katıl',
      privacy: 'İstediğiniz zaman ayrılabilirsiniz. E-posta adresiniz üçüncü taraflarla paylaşılmaz.',
    },
    finalCta: {
      title: 'İlk kararınızı veriye göre alın.',
      description:
        'Ücretsiz araçlardan biriyle başlayın ve e-ticaret rakamlarınızı daha anlaşılır hale getirin.',
      cta: 'Ücretsiz Araçları Aç',
      ctaHref: '/araclar',
    },
    knowledgeGraph: {
      sectionAriaLabel: 'Dijital Bahçe bilgi grafiği',
      eyebrow: 'Digital Garden · Knowledge Graph',
      title: 'Blog ve Notlar Arası Organik Bilgi Ağı',
      description:
        'Düğümler içerikleri, çizgiler içerikler arası ilişkileri temsil eder. Bir düğüme tıklayarak ilgili yazıya geçiş yapabilirsiniz.',
      maturityAriaLabel: 'İçerik olgunluk seviyeleri',
    },
  },
  en: {
    locale: 'en',
    basePath: '/en',
    nav: {
      ariaLabel: 'Main navigation',
      brandAriaLabel: 'Veri Mimarı home page',
      brandText: 'VERİ MİMARI',
      links: [
        { href: '/en/araclar', label: 'Tools' },
        { href: '/en/rehberler', label: 'Guides' },
        { href: '/en/vaka-analizleri', label: 'Case Studies' },
        { href: '/en/projeler', label: 'Projects' },
        { href: '/en/hakkinda', label: 'About' },
      ],
      cta: 'Use Free Tools',
      languageSwitch: {
        trLabel: 'TR',
        enLabel: 'EN',
        trHref: '/',
        enHref: '/en',
      },
    },
    hero: {
      eyebrow: 'Data, AI and growth tools for e-commerce',
      title: 'Turn e-commerce data into profitable decisions.',
      description:
        'Free calculators, AI-powered tools and actionable guides that help you understand your advertising, product and sales data.',
      ctaAriaLabel: 'Primary actions',
      primaryCta: 'Use Free Tools',
      primaryCtaHref: '/en/araclar',
      secondaryCta: 'Browse Guides',
      secondaryCtaHref: '/en/rehberler',
      trustLine: 'Built by Caner Ünal · Transparent methods · Actionable outputs',
      badges: ['E-commerce', 'AI Automation', 'Profitability Analysis', 'Data Visualization'],
    },
    problem: {
      title: 'Sales might be growing. But is profit really growing?',
      description:
        'ROAS, revenue and order count alone are not enough. Without accounting for product costs, commissions, shipping, returns and operational expenses, seemingly successful campaigns can lose money.',
      cards: [
        {
          title: 'See real profitability',
          description:
            'Calculate what you actually keep per product and per campaign by accounting for all costs.',
        },
        {
          title: 'Focus on the right metrics',
          description:
            'Understand the key indicators that actually help you make decisions, not vanity metrics.',
        },
        {
          title: 'Automate repetitive tasks',
          description:
            'Connect AI and SaaS tools into your daily e-commerce workflow.',
        },
      ],
    },
    tools: {
      eyebrow: 'Free Tools',
      title: 'Enter your numbers, get clarity.',
      description:
        'Free tools for the most common e-commerce calculation and analysis needs.',
      items: [
        {
          name: 'Break-even ROAS Calculator',
          description:
            'Find the ROAS level where you start losing money based on your product costs, shipping, commissions and return rates.',
          cta: 'Calculate Break-even ROAS',
          href: '/en/araclar/basabas-roas-hesaplayici',
          status: 'Free',
        },
        {
          name: 'Profit Margin Calculator',
          description:
            'Subtract all costs from your selling price; see your per-product contribution and net margin.',
          cta: 'Calculate Profit Margin',
          href: '/en/araclar/kar-marji-hesaplayici',
          status: 'Free',
        },
        {
          name: 'Discount Profitability Simulator',
          description:
            'Compare the impact of discount rates on your per-sale profit and required sales volume.',
          cta: 'Create Discount Scenario',
          href: '/en/araclar/indirim-karlilik-simulatoru',
          status: 'Coming Soon',
        },
      ],
      allToolsCta: 'View All Tools',
      allToolsHref: '/en/araclar',
    },
    guides: {
      eyebrow: 'Guides',
      title: 'Learn complex metrics through clear, actionable guides.',
      description:
        'Not theory; calculation methods, example scenarios and next steps.',
      items: [
        {
          title: 'How to calculate break-even ROAS?',
          href: '/en/rehberler/basabas-roas-nasil-hesaplanir',
        },
        {
          title: 'Why high ROAS doesn\'t always mean high profit',
          href: '/en/rehberler/yuksek-roas-kar-iliskisi',
        },
        {
          title: 'How does Trendyol commission affect product profitability?',
          href: '/en/rehberler/trendyol-komisyon-etkisi',
        },
        {
          title: 'How to include return rate in your ad budget',
          href: '/en/rehberler/iade-orani-butce-etkisi',
        },
        {
          title: 'Key metrics to track in e-commerce reports',
          href: '/en/rehberler/e-ticaret-temel-metrikler',
        },
      ],
      cta: 'Browse All Guides',
      ctaHref: '/en/rehberler',
    },
    projects: {
      eyebrow: 'Projects',
      title: 'More than content: working products.',
      description:
        'Methods shared on Veri Mimarı are turned into real workflows through tools and software projects built by Caner Ünal.',
      items: [
        {
          name: 'Zolm',
          description:
            'A product ecosystem built to make e-commerce and digital marketing processes more measurable and manageable.',
          cta: 'Explore Zolm',
          href: '/en/projeler/zolm',
          status: 'Beta',
        },
      ],
      note: 'Features in development are clearly labeled. Live, beta and planned features are separated.',
    },
    caseStudies: {
      eyebrow: 'Case Studies',
      title: 'See the data behind the decision.',
      description:
        'Case studies that explain the problem, methodology, assumptions and results step by step.',
      realLabel: 'Verified customer case',
      demoLabel: 'Demo case with simulated data',
      cta: 'Browse Case Studies',
      ctaHref: '/en/vaka-analizleri',
    },
    founder: {
      eyebrow: 'Founder',
      title: 'Who is behind Veri Mimarı?',
      description:
        'I\'m Caner Ünal. I build tools that people can directly use in their daily work by combining e-commerce, digital marketing, data analysis and AI. Here I share not only results but also how I think about, test and develop these tools.',
      primaryCta: 'About Caner Ünal',
      primaryCtaHref: '/en/hakkinda',
      secondaryCta: 'Read Development Notes',
      secondaryCtaHref: '/blog',
    },
    newsletter: {
      title: 'One better e-commerce decision per week.',
      description:
        'New tools, important industry changes and actionable data notes. No unnecessary noise.',
      placeholder: 'Your email address',
      button: 'Join Veri Mimarı Notes',
      privacy: 'You can unsubscribe anytime. Your email is never shared with third parties.',
    },
    finalCta: {
      title: 'Make your first data-driven decision.',
      description:
        'Start with one of the free tools and make your e-commerce numbers clearer.',
      cta: 'Open Free Tools',
      ctaHref: '/en/araclar',
    },
    knowledgeGraph: {
      sectionAriaLabel: 'Digital Garden knowledge graph',
      eyebrow: 'Digital Garden · Knowledge Graph',
      title: 'An organic knowledge network across blogs and notes',
      description:
        'Nodes represent content and links represent relationships between content. Click a node to navigate to the related article.',
      maturityAriaLabel: 'Content maturity levels',
    },
  },
}

export function getDictionary(locale: string) {
  if (String(locale).toLowerCase() === 'en') return dictionaries.en
  return dictionaries.tr
}
