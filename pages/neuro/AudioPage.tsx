import React from 'react';
import ServicePage from '../ServicePage';

const AudioPage: React.FC<{ lang: 'en' | 'ru' }> = ({ lang }) => (
  <ServicePage 
    lang={lang} 
    title={lang === 'ru' ? 'Нейро-Аудио' : 'Neuro-Audio'} 
    slug="/neuro-generation/audio"
    description={lang === 'ru' 
      ? 'Генерация музыки, клонирование голоса и дубляж контента для подкастов, рекламы и видео: быстрый продакшн на нейросетях с автоматизацией make.com и n8n.' 
      : 'AI music generation, voice cloning, and dubbing for podcasts, ads, and videos with automated pipelines powered by make.com and n8n.'}
    features={lang === 'ru'
      ? [
          'Оригинальные треки и джинглы под ваш бренд',
          'Дубляж и локализация видео на несколько языков',
          'Клонирование голоса для единого звучания контента',
        ]
      : [
          'Original tracks and jingles tailored to your brand',
          'Video dubbing and localization for multiple languages',
          'Voice cloning for consistent content sound',
        ]}
    keywords={lang === 'ru'
      ? ['генерация музыки', 'клонирование голоса', 'дубляж', 'AI аудио', 'нейросети', 'SUNO', 'Udio']
      : ['music generation', 'voice cloning', 'dubbing', 'ai audio', 'suno', 'udio']}
    tools={lang === 'ru'
      ? ['SUNO', 'Udio', 'ElevenLabs', 'Whisper', 'n8n']
      : ['SUNO', 'Udio', 'ElevenLabs', 'Whisper', 'n8n']}
    problem={lang === 'ru'
      ? [
          'Аудиопродакшн требует много ручной работы, особенно при мультиязычных кампаниях.',
          'Разный тон голоса и стиль треков снижает узнаваемость бренда.',
        ]
      : [
          'Audio production becomes expensive and slow, especially for multi-language campaigns.',
          'Inconsistent voice and music style weakens brand recognition.',
        ]}
    solution={lang === 'ru'
      ? [
          'Система генерирует музыку, озвучку и дубляж по заданному тону бренда и каналу публикации.',
          'AI-workflow автоматически готовит финальные дорожки под видео, подкасты и рекламу.',
        ]
      : [
          'The system generates music, narration, and dubbing aligned with your brand tone and platform format.',
          'AI workflows deliver final audio tracks for videos, podcasts, and ad creatives automatically.',
        ]}
    useCases={lang === 'ru'
      ? [
          'Озвучка и дубляж экспертных роликов.',
          'Фоновая музыка для видео и Reels.',
          'Голос бренда для подкастов и автоответчиков.',
        ]
      : [
          'Narration and dubbing for expert videos.',
          'Background music for Reels and short videos.',
          'Consistent brand voice for podcasts and assistants.',
        ]}
    integrations={lang === 'ru'
      ? ['Интеграции с n8n и make.com', 'Экспорт в видеомонтажные пайплайны', 'Подключение к Telegram и YouTube публикациям']
      : ['n8n and make.com integrations', 'Export to video editing pipelines', 'Delivery into Telegram and YouTube workflows']}
    parentLabel={lang === 'ru' ? 'Нейрогенерация' : 'Neurogeneration'}
    relatedLinks={lang === 'ru'
      ? [
          { label: 'Нейро-Видео', href: '/neuro-generation/video' },
          { label: 'Нейро-Аватары', href: '/neuro-generation/avatars' },
        ]
      : [
          { label: 'Neuro-Video', href: '/neuro-generation/video' },
          { label: 'Neuro-Avatars', href: '/neuro-generation/avatars' },
        ]}
  />
);
export default AudioPage;
