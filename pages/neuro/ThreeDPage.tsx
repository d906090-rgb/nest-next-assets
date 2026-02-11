import React from 'react';
import ServicePage from '../ServicePage';

const ThreeDPage: React.FC<{ lang: 'en' | 'ru' }> = ({ lang }) => (
  <ServicePage 
    lang={lang} 
    title={lang === 'ru' ? '3D Генерация' : '3D Generation'} 
    slug="/neuro-generation/3d"
    description={lang === 'ru' 
      ? 'Создание 3D-моделей, ассетов и окружений для рекламы, маркетплейсов и презентаций на базе AI-инструментов с автоматизацией пайплайнов через make.com и n8n.' 
      : 'AI-based 3D model, asset, and environment creation for ads, marketplaces, and presentations with automated make.com and n8n workflows.'}
    features={lang === 'ru'
      ? [
          'Генерация 3D-ассетов для креативных кампаний',
          'Визуализация продуктов и сцен для e-commerce',
          'Подготовка материалов для AR/VR и motion',
        ]
      : [
          '3D asset generation for creative campaigns',
          'Product and scene visualization for e-commerce',
          'Assets for AR/VR and motion pipelines',
        ]}
    keywords={lang === 'ru'
      ? ['3d генерация', '3d модели', 'ai дизайн', 'нейросети', 'контент завод', 'автоматизация']
      : ['3d generation', '3d models', 'ai design', 'neural networks', 'content automation']}
    tools={lang === 'ru'
      ? ['Blender', 'Spline', 'Tripo AI', 'Kaedim', 'n8n']
      : ['Blender', 'Spline', 'Tripo AI', 'Kaedim', 'n8n']}
    problem={lang === 'ru'
      ? [
          '3D-производство часто тормозит маркетинг из-за долгих сроков и дорогой ручной работы.',
          'Командам сложно быстро готовить вариации ассетов под разные площадки.',
        ]
      : [
          '3D production often slows marketing due to long cycles and expensive manual work.',
          'Teams struggle to generate enough asset variations for multiple channels.',
        ]}
    solution={lang === 'ru'
      ? [
          'AI-пайплайн автоматически генерирует базовые 3D-ассеты и сцены под креативные задачи бренда.',
          'Решение ускоряет подготовку визуалов для e-commerce, рекламы и презентаций.',
        ]
      : [
          'An AI pipeline generates base 3D assets and scenes for your campaign goals.',
          'The workflow accelerates visual production for e-commerce, ads, and presentations.',
        ]}
    useCases={lang === 'ru'
      ? [
          'Карточки товаров с 3D-рендерами.',
          '3D-сцены для рекламных роликов и лендингов.',
          'Прототипы для AR/VR и интерактивных презентаций.',
        ]
      : [
          '3D product renders for catalog pages.',
          'Scene assets for ads and landing pages.',
          'AR/VR prototypes and interactive presentations.',
        ]}
    integrations={lang === 'ru'
      ? ['Экспорт в Blender/Unreal пайплайны', 'n8n автоматизация задач', 'Интеграция с CMS и контент-платформами']
      : ['Export to Blender and Unreal pipelines', 'n8n task automation', 'Integrations with CMS and content platforms']}
    parentLabel={lang === 'ru' ? 'Нейрогенерация' : 'Neurogeneration'}
    relatedLinks={lang === 'ru'
      ? [
          { label: 'Нейро-Изображения', href: '/neuro-generation/images' },
          { label: 'Нейро-Видео', href: '/neuro-generation/video' },
        ]
      : [
          { label: 'Neuro-Images', href: '/neuro-generation/images' },
          { label: 'Neuro-Video', href: '/neuro-generation/video' },
        ]}
  />
);
export default ThreeDPage;
