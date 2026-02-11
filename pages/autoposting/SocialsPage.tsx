import React from 'react';
import ServicePage from '../ServicePage';

const SocialsPage: React.FC<{ lang: 'en' | 'ru' }> = ({ lang }) => (
  <ServicePage 
    lang={lang} 
    title={lang === 'ru' ? 'Автопостинг в Соцсети' : 'Social Media Autoposting'} 
    slug="/autoposting/socials"
    description={lang === 'ru' 
      ? 'Автопостинг в YouTube, Instagram, TikTok, VK, Telegram и другие платформы: контент-поток 24/7 без ручных операций с интеграциями make.com и n8n.' 
      : 'Autoposting to YouTube, Instagram, TikTok, VK, Telegram, and more with 24/7 content flow and make.com plus n8n integrations.'}
    features={lang === 'ru'
      ? [
          'Единый центр публикаций для всех соцсетей',
          'Планировщик контента и пакетная загрузка',
          'Интеграции с make.com и n8n для автоматизации',
        ]
      : [
          'Single publishing hub for all social networks',
          'Content scheduler and bulk publishing',
          'make.com and n8n integrations for automation',
        ]}
    keywords={lang === 'ru'
      ? ['автопостинг', 'соцсети', 'make.com', 'n8n', 'автоматизация', 'AI', 'контент завод']
      : ['autoposting', 'social media', 'make.com', 'n8n', 'automation', 'ai']}
    tools={lang === 'ru'
      ? ['make.com', 'n8n', 'Telegram Bot API', 'VK API', 'YouTube API']
      : ['make.com', 'n8n', 'Telegram Bot API', 'VK API', 'YouTube API']}
    problem={lang === 'ru'
      ? [
          'Публикации в нескольких соцсетях отнимают время и приводят к ошибкам в расписании.',
          'Ручной кросспостинг тормозит рост охватов и снижает частоту контента.',
        ]
      : [
          'Multi-platform publishing consumes team time and causes scheduling errors.',
          'Manual cross-posting slows reach growth and reduces posting frequency.',
        ]}
    solution={lang === 'ru'
      ? [
          'Мы строим автоматический pipeline публикации: подготовка постов, распределение по платформам и контроль расписания.',
          'Система учитывает ограничения платформ и форматирует контент под каждый канал.',
        ]
      : [
          'We build an automated publishing pipeline for post prep, channel distribution, and scheduling control.',
          'The workflow adapts content to platform constraints and format requirements automatically.',
        ]}
    useCases={lang === 'ru'
      ? [
          'Ежедневный автопостинг в Telegram, VK и YouTube.',
          'Синхронные запуски промо-кампаний в TikTok и Instagram.',
          'Ночные публикации без участия команды.',
        ]
      : [
          'Daily autoposting to Telegram, VK, and YouTube.',
          'Synchronized campaign launches across TikTok and Instagram.',
          'Overnight publishing without manual operations.',
        ]}
    integrations={lang === 'ru'
      ? ['make.com и n8n оркестрация', 'API-интеграции соцсетей', 'Webhook-уведомления и мониторинг ошибок']
      : ['make.com and n8n orchestration', 'Social platform API integrations', 'Webhook alerts and error monitoring']}
    parentLabel={lang === 'ru' ? 'Автопостинг' : 'Autoposting'}
    relatedLinks={lang === 'ru'
      ? [
          { label: 'Сайты и Блоги', href: '/autoposting/sites' },
          { label: 'Соц Сети', href: '/neuro-generation/social' },
        ]
      : [
          { label: 'Sites & Blogs', href: '/autoposting/sites' },
          { label: 'Social Networks', href: '/neuro-generation/social' },
        ]}
  />
);
export default SocialsPage;
