import React from 'react';
import { Helmet } from 'react-helmet-async';
import { LINEUP_DATA } from '../data/content';

const AboutPage: React.FC<{ lang: 'en' | 'ru' }> = ({ lang }) => {
  const team = LINEUP_DATA[lang].filter((item) => item.id !== '4');
  const pageTitle = lang === 'ru' ? 'О компании — Нейро Завод' : 'About — Neuro Factory';
  const pageDescription =
    lang === 'ru'
      ? 'Нейро Завод — команда экспертов по AI-автоматизации контента. Профили специалистов, направления работы, контакты и реквизиты для партнерства.'
      : 'Neuro Factory is an AI content automation team. Expert profiles, service focus, contacts, and legal details for partnership.';
  const pageUrl = 'https://tecai.ru/about';
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: lang === 'ru' ? 'Нейро Завод / Контент Завод' : 'Neuro Factory / Content Factory',
    url: 'https://tecai.ru',
    logo: 'https://tecai.ru/logo-ai.png',
    description:
      lang === 'ru'
        ? 'Платформа AI-автоматизации контента: видео, изображения, аудио и автопостинг 24/7.'
        : 'AI content automation platform for video, image, audio generation, and 24/7 autoposting.',
    foundingDate: '2025',
    areaServed: ['RU', 'Global'],
    address: {
      '@type': 'PostalAddress',
      addressLocality: lang === 'ru' ? 'Москва' : 'Moscow',
      addressCountry: 'RU',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: 'ait@tecai.ru',
        availableLanguage: ['ru', 'en'],
      },
      {
        '@type': 'ContactPoint',
        contactType: 'sales',
        url: 'https://t.me/AI_Technology_avto',
        availableLanguage: ['ru', 'en'],
      },
    ],
    sameAs: [
      'https://t.me/kontentzavodAI',
      'https://www.youtube.com/@НейросмехИИ',
      'https://vk.com/kontentzavodai',
      'https://www.tiktok.com/@neyrosmeh',
      'https://www.linkedin.com/in/reanimatorxp/',
      'https://ru.pinterest.com/AIkontentzavod/',
      'https://www.instagram.com/neyrosmeh/reels/',
      'https://dzen.ru/kontentzavodai',
    ],
  };
  const personSchemas = team.map((member) => ({
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: member.name,
    description: member.description,
    image: `https://tecai.ru${member.image}`,
    worksFor: {
      '@type': 'Organization',
      name: lang === 'ru' ? 'Нейро Завод' : 'Neuro Factory',
      url: 'https://tecai.ru',
    },
    sameAs: ['https://www.linkedin.com/in/reanimatorxp/'],
  }));
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
        name: lang === 'ru' ? 'О компании' : 'About',
        item: pageUrl,
      },
    ],
  };

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto min-h-screen">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta
          name="keywords"
          content={
            lang === 'ru'
              ? 'о компании, нейро завод, команда, AI автоматизация, эксперты, контент автоматизация'
              : 'about, neuro factory, team, ai automation, experts, content automation'
          }
        />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content="https://tecai.ru/og-image.webp" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content="https://tecai.ru/og-image.webp" />
        <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
        {personSchemas.map((schema, idx) => (
          <script key={idx} type="application/ld+json">
            {JSON.stringify(schema)}
          </script>
        ))}
        <script type="application/ld+json">{JSON.stringify(breadcrumbsSchema)}</script>
      </Helmet>

      <section className="mb-12">
        <h1 className="font-heading text-5xl md:text-7xl font-bold uppercase mb-6">
          {lang === 'ru' ? 'О компании' : 'About Neuro Factory'}
        </h1>
        <p className="text-xl text-gray-300 leading-relaxed max-w-4xl">
          {lang === 'ru'
            ? 'Нейро Завод помогает бизнесу автоматизировать контент-производство: от идеи и сценария до публикации в соцсетях и на сайтах. Мы фокусируемся на стабильном выпуске контента, измеримых KPI и масштабировании через AI-оркестрацию.'
            : 'Neuro Factory helps businesses automate content production from idea and script to publishing across social and web channels, with measurable KPIs and AI orchestration.'}
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold uppercase mb-6">
          {lang === 'ru' ? 'Команда экспертов' : 'Expert Team'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member) => (
            <article key={member.id} id={`expert-${member.id}`} className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <img src={member.image} alt={member.name} className="w-24 h-24 rounded-xl object-cover mb-4" />
              <h3 className="text-2xl font-bold mb-1">{member.name}</h3>
              <p className="text-[#00F0FF] mb-4">{member.genre}</p>
              <p className="text-gray-300 whitespace-pre-line text-sm leading-relaxed">{member.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold uppercase mb-6">
          {lang === 'ru' ? 'Контакты и реквизиты' : 'Contacts and Legal Details'}
        </h2>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 space-y-3 text-gray-300">
          <p>
            <strong className="text-white">{lang === 'ru' ? 'Город:' : 'City:'}</strong>{' '}
            {lang === 'ru' ? 'Москва, Россия' : 'Moscow, Russia'}
          </p>
          <p>
            <strong className="text-white">Email:</strong> <a className="text-[#00F0FF]" href="mailto:ait@tecai.ru">ait@tecai.ru</a>
          </p>
          <p>
            <strong className="text-white">Telegram:</strong> <a className="text-[#00F0FF]" href="https://t.me/AI_Technology_avto">https://t.me/AI_Technology_avto</a>
          </p>
          <p>
            <strong className="text-white">{lang === 'ru' ? 'Правовая информация:' : 'Legal information:'}</strong>{' '}
            <a className="text-[#00F0FF]" href="/legal/legal-info.pdf">
              {lang === 'ru' ? 'документ компании' : 'company document'}
            </a>
          </p>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
