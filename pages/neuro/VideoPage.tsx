import React from 'react';
import { Helmet } from 'react-helmet-async';
import VideoPlayer, { VideoItem } from '../../components/VideoPlayer';

const VideoPage: React.FC<{ lang: 'en' | 'ru' }> = ({ lang }) => {
  const t = {
    title: lang === 'ru' ? 'Нейро-Видео — AI-автоматизация | Нейро Завод' : 'Neuro-Video — AI Automation | Neuro Factory',
    description: lang === 'ru'
      ? 'AI-видеопайплайн создает промо, Shorts и UGC-контент с адаптацией под платформы и автопубликацией.'
      : 'AI video pipeline creates promo videos, Shorts, and UGC content with platform adaptation and autopublishing.',
    heading: lang === 'ru' ? 'Нейро-Видео' : 'Neuro Video',
    subtitle: lang === 'ru'
      ? 'Генерация AI-видео в любом жанре и формате: промо, Shorts, экспертный контент и UGC.'
      : 'AI video generation across promo, Shorts, expert content, and UGC formats.',
    detailsTitle: lang === 'ru' ? 'Подробнее о Нейро-Видео' : 'More about Neuro-Video',
    featuresTitle: lang === 'ru' ? 'Что мы предлагаем' : 'What we offer',
    toolsTitle: lang === 'ru' ? 'Инструменты' : 'Tooling',
    problemTitle: lang === 'ru' ? 'Проблема, которую решаем' : 'Problem We Solve',
    solutionTitle: lang === 'ru' ? 'Как работает решение' : 'How the Solution Works',
    useCasesTitle: lang === 'ru' ? 'Сценарии применения' : 'Use Cases',
    integrationsTitle: lang === 'ru' ? 'Интеграции' : 'Integrations',
  };

  const content = {
    features: lang === 'ru'
      ? [
          'Сценарий, раскадровка и монтаж в едином workflow',
          'Автоматическая адаптация под Reels, Shorts и TikTok',
          'Брендовые шаблоны для массового видеопроизводства',
        ]
      : [
          'Script, storyboard, and edit in one workflow',
          'Auto-adaptation for Reels, Shorts, and TikTok',
          'Brand templates for large-scale video production',
        ],
    tools: lang === 'ru'
      ? ['Sora 2', 'Veo 3.1', 'Kling 2.6', 'Runway', 'make.com', 'n8n']
      : ['Sora 2', 'Veo 3.1', 'Kling 2.6', 'Runway', 'make.com', 'n8n'],
    problem: lang === 'ru'
      ? [
          'Командам сложно выпускать достаточный объем видео в темпе ежедневных публикаций.',
          'Ручной продакшн увеличивает сроки и стоимость контента.',
        ]
      : [
          'Teams struggle to deliver enough videos for daily publishing cycles.',
          'Manual production inflates content timelines and costs.',
        ],
    solution: lang === 'ru'
      ? [
          'Мы автоматизируем сценарии, генерацию видео и финальную адаптацию под каналы распространения.',
          'AI-конвейер формирует пакеты публикаций и передает их в автопостинг.',
        ]
      : [
          'We automate script creation, AI rendering, and final adaptation for each distribution channel.',
          'The AI pipeline prepares publishing packages and passes them to autoposting workflows.',
        ],
    useCases: lang === 'ru'
      ? [
          'Промо-ролики для запусков и акций.',
          'Серии Shorts/Reels для регулярного охвата.',
          'UGC-форматы для performance-рекламы.',
        ]
      : [
          'Promo videos for launches and campaigns.',
          'Short-form series for recurring reach growth.',
          'UGC-style assets for performance ads.',
        ],
    integrations: lang === 'ru'
      ? ['Связки make.com и n8n', 'Экспорт в YouTube, VK, TikTok', 'Webhook-уведомления в CRM']
      : ['make.com and n8n flows', 'Publishing to YouTube, VK, TikTok', 'Webhook notifications to CRM'],
  };

  const metrics = lang === 'ru'
    ? [
        { metric: 'Режим работы', value: '24/7' },
        { metric: 'Поддержка каналов', value: '10+ платформ' },
        { metric: 'Модели и инструменты', value: '6+ AI-инструментов' },
        { metric: 'Потенциал выпуска', value: 'до 500+ видео в месяц' },
      ]
    : [
        { metric: 'Operating mode', value: '24/7' },
        { metric: 'Channel support', value: '10+ platforms' },
        { metric: 'Models and tools', value: '6+ AI tools' },
        { metric: 'Output potential', value: 'up to 500+ videos per month' },
      ];

  const toAssetUrl = (path: string) => encodeURI(path);
  const toPosterDataUri = (label: string, category: 'fun' | 'product-placement') => {
    const accent = category === 'fun' ? '#00F0FF' : '#D4AF37';
    const subtitle = category === 'fun' ? 'FUN AI CLIP' : 'PRODUCT PLACEMENT';
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#0B1222"/>
          <stop offset="100%" stop-color="#000000"/>
        </linearGradient>
      </defs>
      <rect width="1280" height="720" fill="url(#bg)"/>
      <rect x="48" y="48" width="1184" height="624" rx="24" fill="none" stroke="${accent}" stroke-opacity="0.55" stroke-width="3"/>
      <text x="96" y="160" fill="${accent}" font-size="40" font-family="Inter,Arial,sans-serif" font-weight="700">${subtitle}</text>
      <text x="96" y="300" fill="#FFFFFF" font-size="54" font-family="Inter,Arial,sans-serif" font-weight="700">${label}</text>
      <text x="96" y="364" fill="#B4C0D3" font-size="28" font-family="Inter,Arial,sans-serif">TEC AI • Neuro Video</text>
    </svg>`;
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
  };

  const productPlacementFiles = [
    '@kontentzavodAI x Estel.mp4',
    '@kontentzavodAI x GJ.mp4',
    '@kontentzavodAI x Svadba.mp4',
    '@kontentzavodAI x TMSLIPMASK.mp4',
    '@kontentzavodAI x TMS.mp4',
    '@kontentzavodAI x Tsvet Code.mp4',
    '@kontentzavodAI x VS.mp4',
    '@kontentzavodAI x Я Самая2.mp4',
    '@kontentzavodAI x Я Самая.mp4',
  ];

  const funFiles = [
    'Cat Andy professional musician.mp4',
    'Нейросмех Гурман.mp4',
    'Нейросмех Котики - Кот DJ.mp4',
    'Нейросмех Котики Кот Гений.mp4',
    'Нейросмех Котики Кот Пират.mp4',
    'Нейросмех Прикол в макдаке.mp4',
    'Нейросмех Тугарин змей.mp4',
    'Нейросмех Удалёнка.mp4',
    'Нейросмех Штирлиц Радио в Шкафу.mp4',
  ];

  const videoDurations: Record<string, number> = {
    '@kontentzavodAI x Estel.mp4': 13,
    '@kontentzavodAI x GJ.mp4': 15,
    '@kontentzavodAI x Svadba.mp4': 8,
    '@kontentzavodAI x TMSLIPMASK.mp4': 36,
    '@kontentzavodAI x TMS.mp4': 15,
    '@kontentzavodAI x Tsvet Code.mp4': 15,
    '@kontentzavodAI x VS.mp4': 15,
    '@kontentzavodAI x Я Самая2.mp4': 8,
    '@kontentzavodAI x Я Самая.mp4': 15,
    'Cat Andy professional musician.mp4': 50,
    'Нейросмех Гурман.mp4': 15,
    'Нейросмех Котики - Кот DJ.mp4': 8,
    'Нейросмех Котики Кот Гений.mp4': 8,
    'Нейросмех Котики Кот Пират.mp4': 8,
    'Нейросмех Прикол в макдаке.mp4': 15,
    'Нейросмех Тугарин змей.mp4': 15,
    'Нейросмех Удалёнка.mp4': 15,
    'Нейросмех Штирлиц Радио в Шкафу.mp4': 15,
  };

  const demoVideos: VideoItem[] = [
    ...productPlacementFiles.map((fileName, index) => ({
      id: `product-placement-${index + 1}`,
      title: fileName.replace('.mp4', ''),
      description: lang === 'ru' ? 'Product-placement кейс' : 'Product-placement case',
      duration: videoDurations[fileName] ?? 0,
      videoUrl: toAssetUrl(`/video-primeri/product-placement/${fileName}`),
      posterUrl: toPosterDataUri(fileName.replace('.mp4', ''), 'product-placement'),
    })),
    ...funFiles.map((fileName, index) => ({
      id: `fun-${index + 1}`,
      title: fileName.replace('.mp4', ''),
      description: lang === 'ru' ? 'Развлекательный AI-ролик' : 'Fun AI clip',
      duration: videoDurations[fileName] ?? 0,
      videoUrl: toAssetUrl(`/video-primeri/fun/${fileName}`),
      posterUrl: toPosterDataUri(fileName.replace('.mp4', ''), 'fun'),
    })),
  ];

  const pageUrl = 'https://tecai.ru/neuro-generation/video';
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: lang === 'ru' ? 'Нейро-Видео' : 'Neuro-Video',
    description: t.description,
    serviceType: lang === 'ru' ? 'Генерация AI-видео' : 'AI video generation',
    areaServed: 'RU',
    provider: {
      '@type': 'Organization',
      name: lang === 'ru' ? 'Нейро Завод' : 'Neuro Factory',
      url: 'https://tecai.ru',
    },
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      url: pageUrl,
    },
  };

  const breadcrumbsSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: lang === 'ru' ? 'Главная' : 'Home',
        item: 'https://tecai.ru/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: lang === 'ru' ? 'Нейро-Видео' : 'Neuro-Video',
        item: pageUrl,
      },
    ],
  };

  const renderListCard = (title: string, items: string[], dotClass: string) => (
    <div className="bg-white/5 border border-white/10 p-8 rounded-3xl">
      <h2 className="text-2xl font-bold mb-5 uppercase">{title}</h2>
      <ul className="space-y-3 text-gray-300">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <div className={`w-1.5 h-1.5 rounded-full mt-2.5 shrink-0 ${dotClass}`} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <>
      <Helmet>
        <title>{t.title}</title>
        <meta name="description" content={t.description} />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:title" content={t.title} />
        <meta property="og:description" content={t.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content="https://tecai.ru/og-image.webp" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t.title} />
        <meta name="twitter:description" content={t.description} />
        <meta name="twitter:image" content="https://tecai.ru/og-image.webp" />
        <meta
          name="keywords"
          content={lang === 'ru'
            ? 'генерация видео, Sora 2, Veo 3.1, Kling 2.6, AI видео, нейросети, контент завод'
            : 'ai video generation, sora 2, veo 3.1, kling 2.6, neural networks, content automation'}
        />
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbsSchema)}</script>
      </Helmet>

      <div className="min-h-screen bg-linear-to-b from-[#080D18] via-[#0B1222] to-black text-white pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto mb-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-linear-to-r from-[#00F0FF] to-[#D4AF37] bg-clip-text text-transparent">
              {t.heading}
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">{t.subtitle}</p>
          </div>

          <VideoPlayer lang={lang} videos={demoVideos} />

          <section className="mt-12">
            <h2 className="text-3xl font-bold uppercase mb-6">{t.detailsTitle}</h2>
            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl mb-6">
              <h2 className="text-2xl font-bold mb-5 uppercase">
                {lang === 'ru' ? 'Что такое Нейро-Видео?' : 'What is Neuro-Video?'}
              </h2>
              <p className="text-gray-300">
                {lang === 'ru'
                  ? 'Нейро-Видео автоматизирует полный видеопродакшн: от сценария до публикации в нужных форматах. Решение помогает быстро собирать контент-потоки для маркетинга и продаж.'
                  : 'Neuro-Video automates full-cycle production from script to channel-ready publishing. It helps teams build high-frequency content streams for marketing and sales.'}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {renderListCard(t.problemTitle, content.problem, 'bg-[#D4AF37]')}
              {renderListCard(t.solutionTitle, content.solution, 'bg-[#00F0FF]')}
              {renderListCard(t.featuresTitle, content.features, 'bg-[#00F0FF]')}
              {renderListCard(t.toolsTitle, content.tools, 'bg-[#D4AF37]')}
              {renderListCard(t.useCasesTitle, content.useCases, 'bg-[#00F0FF]')}
              {renderListCard(t.integrationsTitle, content.integrations, 'bg-[#D4AF37]')}
            </div>

            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl mt-6">
              <h2 className="text-2xl font-bold mb-5 uppercase">
                {lang === 'ru' ? 'Какие метрики подтверждают результат?' : 'Which metrics support the result?'}
              </h2>
              <table className="w-full border-collapse text-left">
                <tbody>
                  {metrics.map((row) => (
                    <tr key={row.metric} className="border-b border-white/10 last:border-0">
                      <th className="py-3 pr-4 text-gray-300 font-semibold">{row.metric}</th>
                      <td className="py-3 text-[#00F0FF]">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default VideoPage;
