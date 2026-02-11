import React from 'react';
import ServicePage from '../ServicePage';

const SocialPage: React.FC<{ lang: 'en' | 'ru' }> = ({ lang }) => (
  <ServicePage 
    lang={lang} 
    title={lang === 'ru' ? 'Соц Сети' : 'Social Networks'} 
    slug="/neuro-generation/social"
    description={lang === 'ru' 
      ? 'Контент для соцсетей с AI-агентами от идеи до публикации: ускорение охватов, экономия ресурсов SMM-команды и интеграции make.com, n8n, автопостинг 24/7.' 
      : 'AI-powered social content from idea to publication with faster reach growth, lower SMM workload, and 24/7 autoposting via make.com and n8n.'}
    features={lang === 'ru'
      ? [
          'Контент-планы и постинг по расписанию 24/7',
          'Оптимизация форматов под каждую платформу',
          'Снижение стоимости производства контента',
        ]
      : [
          '24/7 content planning and scheduled posting',
          'Format optimization for each platform',
          'Lower content production costs',
        ]}
    keywords={lang === 'ru'
      ? ['соц сети', 'SMM автоматизация', 'AI автоматизация', 'контент завод', 'автопостинг', 'нейро завод']
      : ['social networks', 'smm automation', 'ai automation', 'content factory', 'autoposting']}
    tools={lang === 'ru'
      ? ['Telegram', 'VK', 'YouTube', 'TikTok', 'Threads', 'make.com']
      : ['Telegram', 'VK', 'YouTube', 'TikTok', 'Threads', 'make.com']}
    problem={lang === 'ru'
      ? [
          'SMM-команды не успевают производить и публиковать контент с нужной частотой.',
          'Разные платформы требуют разные форматы, что замедляет цикл производства.',
        ]
      : [
          'SMM teams cannot keep up with required content frequency and quality.',
          'Each platform requires a different format, slowing down production cycles.',
        ]}
    solution={lang === 'ru'
      ? [
          'Мы создаём единый AI-конвейер: контент-план, генерация креативов, адаптация форматов, автопубликация.',
          'Пайплайн учитывает брендбук, tone of voice и KPI по каналам.',
        ]
      : [
          'We deploy one AI pipeline for planning, creative generation, format adaptation, and autopublishing.',
          'The workflow respects your brandbook, tone of voice, and channel KPIs.',
        ]}
    useCases={lang === 'ru'
      ? [
          'Ежедневные рубрики для Telegram и VK.',
          'Контент-серии для TikTok и YouTube Shorts.',
          'Кросспостинг кампаний на несколько платформ.',
        ]
      : [
          'Daily content streams for Telegram and VK.',
          'Short-form series for TikTok and YouTube Shorts.',
          'Cross-posting campaigns across multiple platforms.',
        ]}
    integrations={lang === 'ru'
      ? ['make.com и n8n сценарии', 'Telegram Bot API, VK API, YouTube API', 'Интеграции с CRM и аналитикой']
      : ['make.com and n8n scenarios', 'Telegram Bot API, VK API, YouTube API', 'CRM and analytics integrations']}
    parentLabel={lang === 'ru' ? 'Нейрогенерация' : 'Neurogeneration'}
    relatedLinks={lang === 'ru'
      ? [
          { label: 'Автопостинг в Соцсети', href: '/autoposting/socials' },
          { label: 'Нейро-Изображения', href: '/neuro-generation/images' },
        ]
      : [
          { label: 'Social Media Autoposting', href: '/autoposting/socials' },
          { label: 'Neuro-Images', href: '/neuro-generation/images' },
        ]}
  />
);
export default SocialPage;
