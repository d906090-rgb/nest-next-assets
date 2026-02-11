import React from 'react';
import ServicePage from '../ServicePage';

const ImagesPage: React.FC<{ lang: 'en' | 'ru' }> = ({ lang }) => (
  <ServicePage 
    lang={lang} 
    title={lang === 'ru' ? 'Нейро-Изображения' : 'Neuro-Images'} 
    slug="/neuro-generation/images"
    description={lang === 'ru' 
      ? 'Генерация фотореалистичных изображений и креативов для рекламы, карточек товаров и брендинга с AI-моделями, автопроцессами make.com и n8n для масштабирования.' 
      : 'Photorealistic image generation for ads, product cards, and branding with AI models plus scalable make.com and n8n automation.'}
    features={lang === 'ru'
      ? [
          'Креативы для performance-маркетинга и SMM',
          'Визуалы для маркетплейсов и лендингов',
          'Единый визуальный стиль под брендбук',
        ]
      : [
          'Creatives for performance marketing and SMM',
          'Visuals for marketplaces and landing pages',
          'Consistent style aligned with your brandbook',
        ]}
    keywords={lang === 'ru'
      ? ['генерация изображений', 'AI изображения', 'нейросети', 'контент завод', 'Nano Banana Pro', 'дизайн автоматизация']
      : ['image generation', 'ai images', 'neural networks', 'nano banana pro', 'design automation']}
    tools={lang === 'ru'
      ? ['Nano Banana Pro', 'Seedream 4.5', 'Flux 2 Pro', 'Recraft', 'make.com']
      : ['Nano Banana Pro', 'Seedream 4.5', 'Flux 2 Pro', 'Recraft', 'make.com']}
    problem={lang === 'ru'
      ? [
          'Креативным командам сложно быстро выпускать большое число визуалов без потери качества.',
          'Ручная подготовка изображений увеличивает стоимость рекламных кампаний.',
        ]
      : [
          'Creative teams struggle to deliver enough visual assets quickly without quality drops.',
          'Manual image production raises campaign costs and slows launch speed.',
        ]}
    solution={lang === 'ru'
      ? [
          'Мы собираем AI-конвейер генерации визуалов под ваш брендбук, аудиторию и рекламные цели.',
          'Пайплайн автоматически формирует наборы креативов под разные площадки и форматы.',
        ]
      : [
          'We build an AI visual pipeline aligned with your brandbook, audience segments, and campaign goals.',
          'The workflow auto-generates asset sets for multiple channels and placement formats.',
        ]}
    useCases={lang === 'ru'
      ? [
          'Креативы для performance-рекламы и ретаргета.',
          'Изображения для карточек товаров и маркетплейсов.',
          'Визуальные серии для соцсетей и лендингов.',
        ]
      : [
          'Creatives for performance ads and retargeting.',
          'Image packs for product cards and marketplaces.',
          'Visual series for social channels and landing pages.',
        ]}
    integrations={lang === 'ru'
      ? ['Интеграции make.com и n8n', 'Потоки в рекламные кабинеты и CMS', 'Связка с контент-календарём']
      : ['make.com and n8n integrations', 'Pipelines to ad platforms and CMS', 'Connection with your content calendar']}
    parentLabel={lang === 'ru' ? 'Нейрогенерация' : 'Neurogeneration'}
    relatedLinks={lang === 'ru'
      ? [
          { label: 'Нейро-Видео', href: '/neuro-generation/video' },
          { label: 'Сайты и Блоги', href: '/autoposting/sites' },
        ]
      : [
          { label: 'Neuro-Video', href: '/neuro-generation/video' },
          { label: 'Sites & Blogs', href: '/autoposting/sites' },
        ]}
  />
);
export default ImagesPage;
