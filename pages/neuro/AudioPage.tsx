import React from 'react';
import { Helmet } from 'react-helmet-async';
import SpotifyPlayer from '../../components/SpotifyPlayer';

const AudioPage: React.FC<{ lang: 'en' | 'ru' }> = ({ lang }) => {
  const t = {
    title: lang === 'ru' ? 'Нейро-Аудио — AI-автоматизация | Нейро Завод' : 'Neuro-Audio — AI Automation | Neuro Factory',
    description: lang === 'ru'
      ? 'Слушайте нейро-музыку, созданную искусственным интеллектом. Демонстрация возможностей AI-генерации музыки всех жанров.'
      : 'Listen to neuro-music created by artificial intelligence. Demo of AI music generation capabilities across all genres.',
    heading: lang === 'ru' ? 'Нейро-Музыка' : 'Neuro Music',
    subtitle: lang === 'ru'
      ? 'Музыка, созданная нейросетями. Демонстрация наших возможностей в AI-генерации.'
      : 'Music created by neural networks. Demo of our AI generation capabilities.',
    channelLink: lang === 'ru' ? 'Подписаться на канал' : 'Subscribe to channel',
    detailsTitle: lang === 'ru' ? 'Подробнее о Нейро-Аудио' : 'More about Neuro-Audio',
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
          'Оригинальные треки и джинглы под ваш бренд',
          'Дубляж и локализация видео на несколько языков',
          'Клонирование голоса для единого звучания контента',
        ]
      : [
          'Original tracks and jingles tailored to your brand',
          'Video dubbing and localization for multiple languages',
          'Voice cloning for consistent content sound',
        ],
    tools: lang === 'ru'
      ? ['SUNO', 'Udio', 'ElevenLabs', 'Whisper', 'n8n']
      : ['SUNO', 'Udio', 'ElevenLabs', 'Whisper', 'n8n'],
    problem: lang === 'ru'
      ? [
          'Аудиопродакшн требует много ручной работы, особенно при мультиязычных кампаниях.',
          'Разный тон голоса и стиль треков снижает узнаваемость бренда.',
        ]
      : [
          'Audio production becomes expensive and slow, especially for multi-language campaigns.',
          'Inconsistent voice and music style weakens brand recognition.',
        ],
    solution: lang === 'ru'
      ? [
          'Система генерирует музыку, озвучку и дубляж по заданному тону бренда и каналу публикации.',
          'AI-workflow автоматически готовит финальные дорожки под видео, подкасты и рекламу.',
        ]
      : [
          'The system generates music, narration, and dubbing aligned with your brand tone and platform format.',
          'AI workflows deliver final audio tracks for videos, podcasts, and ad creatives automatically.',
        ],
    useCases: lang === 'ru'
      ? [
          'Озвучка и дубляж экспертных роликов.',
          'Фоновая музыка для видео и Reels.',
          'Голос бренда для подкастов и автоответчиков.',
        ]
      : [
          'Narration and dubbing for expert videos.',
          'Background music for Reels and short videos.',
          'Consistent brand voice for podcasts and assistants.',
        ],
    integrations: lang === 'ru'
      ? ['Интеграции с n8n и make.com', 'Экспорт в видеомонтажные пайплайны', 'Подключение к Telegram и YouTube публикациям']
      : ['n8n and make.com integrations', 'Export to video editing pipelines', 'Delivery into Telegram and YouTube workflows'],
  };
  const metrics = lang === 'ru'
    ? [
        { metric: 'Режим работы', value: '24/7' },
        { metric: 'Поддержка каналов', value: '15+ платформ' },
        { metric: 'Модели и инструменты', value: '10+ AI-инструментов' },
        { metric: 'Потенциал выпуска', value: 'до 1 000+ единиц контента в месяц' },
      ]
    : [
        { metric: 'Operating mode', value: '24/7' },
        { metric: 'Channel support', value: '15+ platforms' },
        { metric: 'Models and tools', value: '10+ AI tools' },
        { metric: 'Output potential', value: 'up to 1,000+ content units per month' },
      ];
  const pageUrl = 'https://tecai.ru/neuro-generation/audio';
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: lang === 'ru' ? 'Нейро-Аудио' : 'Neuro-Audio',
    description: t.description,
    serviceType: lang === 'ru' ? 'Генерация аудио-контента' : 'AI audio content generation',
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
        name: lang === 'ru' ? 'Нейро-Аудио' : 'Neuro-Audio',
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
        <meta name="keywords" content={lang === 'ru'
          ? 'нейро музыка, AI музыка, генерация музыки, нейросети, SUNO, Udio, электронная музыка'
          : 'neuro music, AI music, music generation, neural networks, SUNO, Udio, electronic music'} />
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbsSchema)}</script>
      </Helmet>

      <div className="min-h-screen bg-linear-to-b from-[#080D18] via-[#0B1222] to-black text-white pt-32 pb-16 px-4">
        {/* Header section */}
        <div className="max-w-7xl mx-auto mb-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-linear-to-r from-[#00F0FF] to-[#D4AF37] bg-clip-text text-transparent">
              {t.heading}
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              {t.subtitle}
            </p>
          </div>

          {/* Spotify-style player */}
          <SpotifyPlayer lang={lang} />

          <section className="mt-12">
            <h2 className="text-3xl font-bold uppercase mb-6">{t.detailsTitle}</h2>
            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl mb-6">
              <h2 className="text-2xl font-bold mb-5 uppercase">
                {lang === 'ru' ? 'Что такое Нейро-Аудио?' : 'What is Neuro-Audio?'}
              </h2>
              <p className="text-gray-300">
                {lang === 'ru'
                  ? 'Нейро-Аудио автоматизирует генерацию музыки, дубляж и голосовые дорожки для регулярного выпуска контента под брендовый стиль.'
                  : 'Neuro-Audio automates music generation, dubbing, and voice tracks for recurring branded content production.'}
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

          {/* Channel link */}
          <div className="text-center mt-8">
            <a
              href="https://t.me/neyrozvuki"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#0088cc] hover:bg-[#0077b5] text-white px-6 py-3 rounded-full font-medium transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.692-1.653-1.123-2.678-1.799-1.185-.781-.417-1.21.258-1.911.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.139-5.062 3.345-.479.329-.913.489-1.302.481-.428-.009-1.252-.242-1.865-.442-.751-.244-1.349-.374-1.297-.789.027-.216.324-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.015 3.333-1.386 4.025-1.627 4.477-1.635.099-.002.321.023.465.141.121.1.154.234.17.331.015.098.034.322.019.496z"/>
              </svg>
              {t.channelLink}
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default AudioPage;
