import React from 'react';
import ServicePage from '../ServicePage';

const SitesPage: React.FC<{ lang: 'en' | 'ru' }> = ({ lang }) => (
  <ServicePage 
    lang={lang} 
    title={lang === 'ru' ? 'Сайты и Блоги' : 'Sites & Blogs'} 
    slug="/autoposting/sites"
    description={lang === 'ru' 
      ? 'Автоматическое наполнение сайтов и блогов SEO-оптимизированным контентом: статьи, описания, новости и кейсы с интеграциями WordPress, make.com и n8n.' 
      : 'Automatic website and blog publishing with SEO-optimized articles, descriptions, news, and case updates through WordPress, make.com, and n8n.'}
    features={lang === 'ru'
      ? [
          'Генерация контента под семантику и intent аудитории',
          'Публикация в WordPress и CMS по API',
          'Автообновление разделов и контент-календаря',
        ]
      : [
          'Content generation aligned with semantic intent',
          'Publishing to WordPress and CMS via API',
          'Auto-updates for sections and content calendars',
        ]}
    keywords={lang === 'ru'
      ? ['сайты и блоги', 'SEO контент', 'автоматизация контента', 'AI', 'нейросети', 'wordpress']
      : ['sites and blogs', 'seo content', 'content automation', 'ai', 'wordpress']}
    tools={lang === 'ru'
      ? ['WordPress API', 'make.com', 'n8n', 'OpenAI', 'Gemini']
      : ['WordPress API', 'make.com', 'n8n', 'OpenAI', 'Gemini']}
    problem={lang === 'ru'
      ? [
          'Сайты и блоги теряют трафик из-за нерегулярного выхода SEO-контента.',
          'Редакционные процессы занимают много времени и блокируют масштабирование.',
        ]
      : [
          'Websites and blogs lose traffic because SEO content is published inconsistently.',
          'Manual editorial workflows consume time and block content scaling.',
        ]}
    solution={lang === 'ru'
      ? [
          'AI-система генерирует статьи под семантику, intent и структуру категорий сайта.',
          'Публикация и обновления выполняются автоматически через CMS и API-интеграции.',
        ]
      : [
          'The AI system generates articles by semantic intent, keyword clusters, and site structure.',
          'Publishing and updates are automated through CMS and API integrations.',
        ]}
    useCases={lang === 'ru'
      ? [
          'Регулярные SEO-статьи для блога компании.',
          'Автогенерация карточек и описаний товаров.',
          'Контент-поддержка категорий и новостных разделов.',
        ]
      : [
          'Recurring SEO articles for company blogs.',
          'Auto-generated product descriptions and category pages.',
          'Continuous content support for news and landing sections.',
        ]}
    integrations={lang === 'ru'
      ? ['WordPress API и CMS-коннекторы', 'make.com и n8n workflow', 'Связка с аналитикой и индексированием']
      : ['WordPress API and CMS connectors', 'make.com and n8n workflows', 'Connections to analytics and indexing']}
    parentLabel={lang === 'ru' ? 'Автопостинг' : 'Autoposting'}
    relatedLinks={lang === 'ru'
      ? [
          { label: 'Автопостинг в Соцсети', href: '/autoposting/socials' },
          { label: 'Кейсы', href: '/cases' },
        ]
      : [
          { label: 'Social Media Autoposting', href: '/autoposting/socials' },
          { label: 'Cases', href: '/cases' },
        ]}
  />
);
export default SitesPage;
