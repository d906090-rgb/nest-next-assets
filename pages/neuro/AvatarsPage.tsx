import React from 'react';
import ServicePage from '../ServicePage';

const AvatarsPage: React.FC<{ lang: 'en' | 'ru' }> = ({ lang }) => (
  <ServicePage 
    lang={lang} 
    title={lang === 'ru' ? 'Нейро-Аватары' : 'Neuro-Avatars'} 
    slug="/neuro-generation/avatars"
    description={lang === 'ru' 
      ? 'Нейроаватары студийного качества для брендов, экспертов и команд продаж: автоматизация видеовыступлений, контента для соцсетей и презентаций с интеграциями make.com и n8n.' 
      : 'Studio-grade neuro-avatars for brands, experts, and sales teams with automated video publishing, social content workflows, and make.com or n8n integrations.'}
    features={lang === 'ru'
      ? [
          'Создание аватаров под Tone of Voice бренда',
          'Сценарии и озвучка для регулярных публикаций 24/7',
          'Аватары для презентаций, воронок и обучающих роликов',
        ]
      : [
          'Avatar creation tailored to your brand voice',
          'Scripts and voice for recurring 24/7 publishing',
          'Avatars for presentations, funnels, and training videos',
        ]}
    keywords={lang === 'ru'
      ? ['нейроаватары', 'AI аватары', 'автоматизация контента', 'контент завод', 'нейро завод', 'HeyGen', 'Synthesia']
      : ['neuro avatars', 'ai avatars', 'content automation', 'content factory', 'heygen', 'synthesia']}
    tools={lang === 'ru'
      ? ['HeyGen', 'Synthesia', 'ElevenLabs', 'make.com', 'n8n']
      : ['HeyGen', 'Synthesia', 'ElevenLabs', 'make.com', 'n8n']}
    problem={lang === 'ru'
      ? [
          'Экспертам и отделам маркетинга сложно стабильно выпускать видеоконтент без потерь качества и времени команды.',
          'Создание контента вручную перегружает SMM и повышает стоимость публикаций.',
        ]
      : [
          'Experts and marketing teams struggle to publish video content consistently without quality loss and team overload.',
          'Manual content production increases SMM workload and per-post costs.',
        ]}
    solution={lang === 'ru'
      ? [
          'Мы строим AI-workflow, который создаёт сценарий, озвучку и ролики с вашим нейроаватаром по контент-календарю.',
          'Система автоматически адаптирует ролики под форматы платформ и публикует их в выбранные каналы.',
        ]
      : [
          'We build an AI workflow that generates scripts, voice, and avatar videos based on your content calendar.',
          'The system auto-adapts each video format for target platforms and publishes to selected channels.',
        ]}
    useCases={lang === 'ru'
      ? [
          'Ежедневные экспертные Reels и Shorts.',
          'Серии обучающих видео для отдела продаж.',
          'Презентации продуктов и офферов для лендингов.',
        ]
      : [
          'Daily expert Reels and Shorts.',
          'Training video series for sales teams.',
          'Product and offer presentations for landing pages.',
        ]}
    integrations={lang === 'ru'
      ? ['Публикация через make.com и n8n', 'Интеграции с YouTube, VK, Telegram и TikTok', 'Webhook-связки с CRM и аналитикой']
      : ['Publishing via make.com and n8n', 'Integrations with YouTube, VK, Telegram, and TikTok', 'Webhook links with CRM and analytics']}
    parentLabel={lang === 'ru' ? 'Нейрогенерация' : 'Neurogeneration'}
    relatedLinks={lang === 'ru'
      ? [
          { label: 'Нейро-Видео', href: '/neuro-generation/video' },
          { label: 'Соц Сети', href: '/neuro-generation/social' },
        ]
      : [
          { label: 'Neuro-Video', href: '/neuro-generation/video' },
          { label: 'Social Networks', href: '/neuro-generation/social' },
        ]}
  />
);
export default AvatarsPage;
