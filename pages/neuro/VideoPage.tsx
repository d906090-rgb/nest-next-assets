import React from 'react';
import ServicePage from '../ServicePage';

const VideoPage: React.FC<{ lang: 'en' | 'ru' }> = ({ lang }) => (
  <ServicePage 
    lang={lang} 
    title={lang === 'ru' ? 'Нейро-Видео' : 'Neuro-Video'} 
    slug="/neuro-generation/video"
    description={lang === 'ru' 
      ? 'Генерация AI-видео в любом жанре и формате: промо, Shorts, экспертный контент и UGC с поддержкой Sora 2, Veo 3.1, Kling 2.6, make.com и n8n для автопубликации.' 
      : 'AI video generation across promo, Shorts, expert content, and UGC powered by Sora 2, Veo 3.1, Kling 2.6 with make.com and n8n automation.'}
    features={lang === 'ru'
      ? [
          'Сценарий, раскадровка и монтаж в едином workflow',
          'Автоматическая адаптация под Reels, Shorts и TikTok',
          'Брендовые шаблоны для массового видеопроизводства',
        ]
      : [
          'Script, storyboard, and edit in one workflow',
          'Auto-adaptation for Reels, Shorts, and TikTok',
          'Brand templates for large-scale video production',
        ]}
    keywords={lang === 'ru'
      ? ['генерация видео', 'Sora 2', 'Veo 3.1', 'Kling 2.6', 'AI видео', 'нейросети', 'контент завод']
      : ['ai video generation', 'sora 2', 'veo 3.1', 'kling 2.6', 'neural networks', 'content automation']}
    tools={lang === 'ru'
      ? ['Sora 2', 'Veo 3.1', 'Kling 2.6', 'Runway', 'make.com']
      : ['Sora 2', 'Veo 3.1', 'Kling 2.6', 'Runway', 'make.com']}
    problem={lang === 'ru'
      ? [
          'Командам сложно выпускать достаточный объём видео в темпе ежедневных публикаций.',
          'Ручной продакшн увеличивает сроки и стоимость контента.',
        ]
      : [
          'Teams struggle to deliver enough videos for daily publishing cycles.',
          'Manual production inflates content timelines and costs.',
        ]}
    solution={lang === 'ru'
      ? [
          'Мы автоматизируем сценарии, генерацию видео и финальную адаптацию под каналы распространения.',
          'AI-конвейер сам формирует пакеты публикаций и передаёт их в автопостинг.',
        ]
      : [
          'We automate script creation, AI rendering, and final adaptation for each distribution channel.',
          'The AI pipeline prepares publishing packages and passes them to autoposting workflows.',
        ]}
    useCases={lang === 'ru'
      ? [
          'Промо-ролики для запусков и акций.',
          'Серии Shorts/Reels для регулярного охвата.',
          'UGC-форматы для performance-рекламы.',
        ]
      : [
          'Promo videos for launches and campaigns.',
          'Short-form series for recurring reach growth.',
          'UGC-style assets for performance ads.',
        ]}
    integrations={lang === 'ru'
      ? ['Связки make.com и n8n', 'Экспорт в YouTube, VK, TikTok', 'Webhook-уведомления в CRM']
      : ['make.com and n8n flows', 'Publishing to YouTube, VK, TikTok', 'Webhook notifications to CRM']}
    parentLabel={lang === 'ru' ? 'Нейрогенерация' : 'Neurogeneration'}
    relatedLinks={lang === 'ru'
      ? [
          { label: 'Нейро-Аудио', href: '/neuro-generation/audio' },
          { label: 'Автопостинг в Соцсети', href: '/autoposting/socials' },
        ]
      : [
          { label: 'Neuro-Audio', href: '/neuro-generation/audio' },
          { label: 'Social Media Autoposting', href: '/autoposting/socials' },
        ]}
  />
);
export default VideoPage;
