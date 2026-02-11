import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { CONTENT } from '../data/content';

const CasesPage: React.FC<{ lang: 'en' | 'ru' }> = ({ lang }) => {
  const t = CONTENT[lang];
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: lang === 'ru' ? 'Кейсы Нейро Завод' : 'Neuro Factory Cases',
    description:
      lang === 'ru'
        ? 'Кейсы внедрения AI-автоматизации контента и автопостинга для бизнеса.'
        : 'Case studies of AI content automation and social autoposting for business.',
    url: 'https://tecai.ru/cases',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: [1, 2, 3].map((idx) => ({
        '@type': 'ListItem',
        position: idx,
        name: lang === 'ru' ? `Кейс ${idx}` : `Case ${idx}`,
        url: `https://tecai.ru/cases#case-${idx}`,
      })),
    },
  };
  const breadcrumbsSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: lang === 'ru' ? 'Главная' : 'Home', item: 'https://tecai.ru/' },
      { '@type': 'ListItem', position: 2, name: lang === 'ru' ? 'Кейсы' : 'Cases', item: 'https://tecai.ru/cases' },
    ],
  };

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto min-h-screen">
      <Helmet>
        <title>{lang === 'ru' ? 'Кейсы — Нейро Завод' : 'Cases — Neuro Factory'}</title>
        <meta
          name="description"
          content={
            lang === 'ru'
              ? 'Кейсы внедрения AI-автоматизации Нейро Завод: контент завод, нейросети, автопостинг 24/7, интеграции make.com и n8n, рост digital-маркетинга.'
              : 'AI automation case studies by Neuro Factory: content workflows, neural networks, 24/7 autoposting, make.com and n8n integrations, and digital growth.'
          }
        />
        <meta
          name="keywords"
          content={lang === 'ru' ? 'кейсы, AI, автоматизация, контент завод, нейро завод' : 'cases, ai, automation, content factory'}
        />
        <link rel="canonical" href="https://tecai.ru/cases" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content={lang === 'ru' ? 'Кейсы — Нейро Завод' : 'Cases — Neuro Factory'}
        />
        <meta
          property="og:description"
          content={
            lang === 'ru'
              ? 'Кейсы внедрения AI-автоматизации: контент завод, нейросети, автопостинг и масштабирование маркетинга.'
              : 'AI automation case studies: content factory workflows, neural networks, and social autoposting.'
          }
        />
        <meta property="og:url" content="https://tecai.ru/cases" />
        <meta property="og:image" content="https://tecai.ru/og-image.webp" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={lang === 'ru' ? 'Кейсы — Нейро Завод' : 'Cases — Neuro Factory'}
        />
        <meta
          name="twitter:description"
          content={
            lang === 'ru'
              ? 'Кейсы внедрения AI-автоматизации: контент завод, нейросети, автопостинг и масштабирование маркетинга.'
              : 'AI automation case studies: content factory workflows, neural networks, and social autoposting.'
          }
        />
        <meta name="twitter:image" content="https://tecai.ru/og-image.webp" />
        <script type="application/ld+json">{JSON.stringify(itemListSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbsSchema)}</script>
      </Helmet>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <Briefcase className="w-16 h-16 text-[#00F0FF] mx-auto mb-6" />
        <h1 className="font-heading text-5xl md:text-7xl font-bold uppercase mb-8">
          {t.nav.cases}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {/* Placeholder cards */}
          {[1, 2, 3].map(i => (
            <div id={`case-${i}`} key={i} className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:border-[#00F0FF]/50 transition-all">
              <div className="w-full h-48 bg-white/10 rounded-xl mb-6 flex items-center justify-center">
                <span className="text-gray-500 font-mono">CASE_IMAGE_{i}</span>
              </div>
              <h3 className="text-xl font-bold mb-4 uppercase">Project Alpha {i}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {lang === 'ru' 
                  ? 'Автоматизация контента для крупного бренда с использованием нейро-аватаров.' 
                  : 'Content automation for a major brand using neuro-avatars.'}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default CasesPage;
