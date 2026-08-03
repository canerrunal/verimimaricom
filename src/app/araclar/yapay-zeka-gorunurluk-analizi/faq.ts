export const aiVisibilityFaqs = [
  {
    question: 'AI görünürlük analizi neyi ölçer?',
    answer:
      'Beta sürüm, dört markasız sorunun OpenAI API yanıtlarında markanın anılma, sıra ve kaynak gösterilme sinyallerini örnekler. Perplexity yalnızca üretim anahtarı yapılandırıldığında aynı sözleşmeyle çalışır. Ana sayfa teknik sinyali bu sonuçtan ayrı gösterilir.',
  },
  {
    question: 'Bu sonuç ChatGPT veya Gemini uygulamasında herkesin gördüğü sonucu temsil eder mi?',
    answer:
      'Hayır. API tabanlı benchmark; konum, zaman, model sürümü, kullanıcı bağlamı ve arama moduna göre değişebilen tüketici uygulaması yanıtlarının tamamını temsil etmez.',
  },
  {
    question: 'Ön analiz sırasında hangi veriler kontrol edilir?',
    answer:
      'Herkese açık ana sayfanın erişimi, title, meta açıklama, H1, canonical, robots.txt, sitemap.xml ve temel JSON-LD türleri kontrol edilir. Bu hızlı kontrol tüm siteyi taramaz ve giriş gerektiren alanlara erişmez.',
  },
  {
    question: 'Düşük görünürlük puanı ne anlama gelir?',
    answer:
      'Yalnızca ölçülen geçerli cevaplarda markanın az anıldığını gösterir. “Hiçbir yapay zekâ markayı tanımıyor” anlamına gelmez; örneklem ve güven aralığıyla birlikte yorumlanmalıdır.',
  },
  {
    question: 'Araç AI platformlarında sıralama garantisi verir mi?',
    answer:
      'Hayır. Araç ölçüm, kanıt ve öncelik üretir; üçüncü taraf AI platformlarında anılma, kaynak seçimi veya sıralama garantisi vermez.',
  },
] as const
