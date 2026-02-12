import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

interface ServicePageProps {
  lang: 'en' | 'ru';
  title: string;
  description: string;
  slug: string;
  features: string[];
  keywords: string[];
  tools: string[];
  problem: string[];
  solution: string[];
  useCases: string[];
  integrations: string[];
  parentLabel: string;
  relatedLinks: { label: string; href: string }[];
}

const ServicePage: React.FC<ServicePageProps> = ({
  lang,
  title,
  description,
  slug,
  features,
  keywords,
  tools,
  problem,
  solution,
  useCases,
  integrations,
  parentLabel,
  relatedLinks,
}) => {
  const pageUrl = `https://tecai.ru${slug}`;
  const providerName = lang === 'ru' ? 'Нейро Завод' : 'Neuro Factory';
  const pageTitle =
    lang === 'ru'
      ? `${title} — AI-автоматизация | Нейро Завод`
      : `${title} — AI Automation | Neuro Factory`;
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: title,
    description,
    serviceType: title,
    areaServed: 'RU',
    provider: {
      '@type': 'Organization',
      name: providerName,
      url: 'https://tecai.ru',
    },
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      url: pageUrl,
    },
  };
  const currentLabel = title;
  const directAnswer =
    lang === 'ru'
      ? `${title} — это AI-сервис Нейро Завод для автоматизации контент-процессов с публикацией в нужные каналы без ручной рутины.`
      : `${title} is an AI service by Neuro Factory that automates content workflows and publishing without manual routine.`;
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
        name: parentLabel,
        item: 'https://tecai.ru/',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: currentLabel,
        item: pageUrl,
      },
    ],
  };

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto min-h-screen">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords.join(', ')} />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content="https://tecai.ru/og-image.webp" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content="https://tecai.ru/og-image.webp" />
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbsSchema)}</script>
      </Helmet>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl"
      >
        <div className="flex items-center gap-4 mb-6">
          <Sparkles className="text-[#00F0FF] w-8 h-8" />
          <span className="text-[#D4AF37] tracking-[0.3em] font-bold uppercase text-xs">
            {lang === 'ru' ? 'НЕЙРО ТЕХНОЛОГИИ' : 'NEURO TECH'}
          </span>
        </div>
        <h1 className="font-heading text-5xl md:text-7xl font-bold uppercase mb-8 leading-none">
          {title}
        </h1>
        <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed mb-12">
          {description}
        </p>
        <div className="bg-white/5 border border-white/10 p-10 rounded-3xl mb-8">
          <h2 className="text-2xl font-bold mb-6 uppercase">
            {lang === 'ru' ? `Что это за решение: ${title}?` : `What is ${title}?`}
          </h2>
          <p className="text-gray-300 leading-relaxed">{directAnswer}</p>
        </div>
        <div className="bg-white/5 border border-white/10 p-10 rounded-3xl mb-8">
          <h2 className="text-2xl font-bold mb-6 uppercase">
            {lang === 'ru' ? `Какую задачу решает ${title}?` : `What problem does ${title} solve?`}
          </h2>
          <p className="text-gray-300 mb-5">
            {lang === 'ru'
              ? 'Решение закрывает ключевые операционные узкие места: скорость производства, стабильность качества и предсказуемость публикаций.'
              : 'This solution addresses critical operational bottlenecks: production speed, quality consistency, and predictable publishing cadence.'}
          </p>
          <ul className="space-y-4 text-gray-300">
            {problem.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full mt-2.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white/5 border border-white/10 p-10 rounded-3xl mb-8">
          <h2 className="text-2xl font-bold mb-6 uppercase">
            {lang === 'ru' ? `Как работает ${title}?` : `How does ${title} work?`}
          </h2>
          <p className="text-gray-300 mb-5">
            {lang === 'ru'
              ? 'Пайплайн строится как последовательность AI-шагов: подготовка, генерация, адаптация формата и передача в публикацию.'
              : 'The pipeline is built as AI-driven stages: preparation, generation, format adaptation, and publishing handoff.'}
          </p>
          <ul className="space-y-4 text-gray-300">
            {solution.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-[#00F0FF] rounded-full mt-2.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white/5 border border-white/10 p-10 rounded-3xl">
          <h2 className="text-2xl font-bold mb-6 uppercase">
            {lang === 'ru' ? `Что включает ${title}?` : `What does ${title} include?`}
          </h2>
          <p className="text-gray-300 mb-5">
            {lang === 'ru'
              ? 'Вы получаете набор функциональных блоков, которые можно масштабировать под частоту публикаций и KPI бизнеса.'
              : 'You get modular capabilities that scale with your publishing frequency and business KPIs.'}
          </p>
          <ul className="space-y-4 text-gray-300">
            {features.map((feature) => (
              <li key={feature} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-[#00F0FF] rounded-full mt-2.5 shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white/5 border border-white/10 p-10 rounded-3xl mt-8">
          <h2 className="text-2xl font-bold mb-6 uppercase">
            {lang === 'ru' ? 'Какие метрики подтверждают подход?' : 'Which metrics support this approach?'}
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
        <div className="bg-white/5 border border-white/10 p-10 rounded-3xl mt-8">
          <h2 className="text-2xl font-bold mb-6 uppercase">
            {lang === 'ru' ? 'Сценарии применения' : 'Use Cases'}
          </h2>
          <ul className="space-y-3 text-gray-300">
            {useCases.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-[#00F0FF] rounded-full mt-2.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white/5 border border-white/10 p-10 rounded-3xl mt-8">
          <h2 className="text-2xl font-bold mb-6 uppercase">
            {lang === 'ru' ? 'Инструменты' : 'Tooling'}
          </h2>
          <ul className="space-y-3 text-gray-300">
            {tools.map((tool) => (
              <li key={tool} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full mt-2.5 shrink-0" />
                <span>{tool}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white/5 border border-white/10 p-10 rounded-3xl mt-8">
          <h2 className="text-2xl font-bold mb-6 uppercase">
            {lang === 'ru' ? 'Интеграции' : 'Integrations'}
          </h2>
          <ul className="space-y-3 text-gray-300">
            {integrations.map((integration) => (
              <li key={integration} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full mt-2.5 shrink-0" />
                <span>{integration}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white/5 border border-white/10 p-10 rounded-3xl mt-8">
          <h2 className="text-2xl font-bold mb-6 uppercase">
            {lang === 'ru' ? 'Связанные решения' : 'Related Solutions'}
          </h2>
          <ul className="space-y-3 text-gray-300">
            {relatedLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="hover:text-[#00F0FF] transition-colors">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default ServicePage;
