export const sampleVisibilityReport = {
  measuredAt: '3 Ağustos 2026',
  brandName: 'Örnek Marka',
  domain: 'ornekmarka.com',
  visibilityIndex: 18.4,
  readinessScore: 72,
  confidenceLevel: 66,
  shareOfVoice: 4.7,
  citationShare: 11.8,
  validRuns: 38,
  plannedRuns: 40,
  mentions: 5,
  mentionInterval: '%5,8–%27,3',
  providers: [
    { name: 'OpenAI', runs: '8/8', mentions: 2, citations: 1 },
    { name: 'Gemini', runs: '8/8', mentions: 1, citations: 0 },
    { name: 'Claude', runs: '7/8', mentions: 0, citations: 0 },
    { name: 'Perplexity', runs: '8/8', mentions: 2, citations: 2 },
    { name: 'xAI', runs: '7/8', mentions: 0, citations: 0 },
  ],
  competitors: [
    { name: 'Rakip A', mentions: 22, share: 28.2, position: 1.9 },
    { name: 'Rakip B', mentions: 17, share: 20.5, position: 2.6 },
    { name: 'Rakip C', mentions: 12, share: 13.1, position: 3.2 },
  ],
  actions: [
    {
      phase: 'İLK 7 GÜN',
      title: 'Marka ve Organization varlığını tutarlı hâle getirin.',
      detail:
        'Ana sayfa ve kurumsal sayfalarda doğrulanmış marka adı, URL ve iletişim verisi kullanın.',
    },
    {
      phase: 'İLK 30 GÜN',
      title: 'Yüksek potansiyelli markasız sorular için alıcı rehberleri yayınlayın.',
      detail:
        'Kategori, karşılaştırma ve problem/çözüm niyetlerini kanıtlı içeriklerle karşılayın.',
    },
    {
      phase: 'İLK 90 GÜN',
      title: 'Rakiplerin atıf aldığı bağımsız kaynaklarda doğrulanabilir varlık geliştirin.',
      detail: 'Kaynak boşluğunu dijital PR, uzman görüşü ve editoryal iş birlikleriyle kapatın.',
    },
  ],
  evidence: {
    provider: 'Perplexity',
    model: 'yapılandırılmış-model-id',
    prompt: "Türkiye'de örnek kategoride güvenilir markalar hangileri?",
    excerpt: '… Örnek Marka, kategori içinde değerlendirilebilecek seçeneklerden biri …',
    citation: 'industry-example.org/guide',
  },
} as const
