import React from 'react';
import { Helmet } from 'react-helmet-async';
import FAQSection from '../components/FAQSection';
import { CONTENT } from '../data/content';

const FAQPage: React.FC<{ lang: 'en' | 'ru' }> = ({ lang }) => {
  const t = CONTENT[lang];
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: t.faq.items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
  const breadcrumbsSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: lang === 'ru' ? 'Главная' : 'Home', item: 'https://tecai.ru/' },
      { '@type': 'ListItem', position: 2, name: 'FAQ', item: 'https://tecai.ru/faq' },
    ],
  };

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <Helmet>
        <title>{lang === 'ru' ? 'FAQ — Нейро Завод' : 'FAQ — Neuro Factory'}</title>
        <meta
          name="description"
          content={
            lang === 'ru'
              ? 'Ответы на частые вопросы о платформе Нейро Завод: AI-контент, нейросети, автопостинг 24/7, интеграции make.com и n8n, безопасность данных и запуск.'
              : 'Frequently asked questions about Neuro Factory: AI content, neural networks, 24/7 autoposting, make.com and n8n integrations, security, and onboarding.'
          }
        />
        <meta
          name="keywords"
          content={lang === 'ru' ? 'faq, нейросети, ai, автоматизация, автопостинг' : 'faq, ai, automation, autoposting'}
        />
        <link rel="canonical" href="https://tecai.ru/faq" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content={lang === 'ru' ? 'FAQ — Нейро Завод' : 'FAQ — Neuro Factory'}
        />
        <meta
          property="og:description"
          content={
            lang === 'ru'
              ? 'Ответы на частые вопросы о платформе Нейро Завод: AI-контент, нейросети, автопостинг и безопасность данных.'
              : 'FAQ about Neuro Factory: AI content, neural networks, autoposting, and data security.'
          }
        />
        <meta property="og:url" content="https://tecai.ru/faq" />
        <meta property="og:image" content="https://tecai.ru/og-image.webp" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={lang === 'ru' ? 'FAQ — Нейро Завод' : 'FAQ — Neuro Factory'}
        />
        <meta
          name="twitter:description"
          content={
            lang === 'ru'
              ? 'Ответы на частые вопросы о платформе Нейро Завод: AI-контент, нейросети, автопостинг и безопасность данных.'
              : 'FAQ about Neuro Factory: AI content, neural networks, autoposting, and data security.'
          }
        />
        <meta name="twitter:image" content="https://tecai.ru/og-image.webp" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbsSchema)}</script>
      </Helmet>
      <h1 className="sr-only">{lang === 'ru' ? 'FAQ Нейро Завод' : 'Neuro Factory FAQ'}</h1>
      <FAQSection lang={lang} items={t.faq.items} />
    </div>
  );
};

export default FAQPage;
