import React from 'react';
import { Helmet } from 'react-helmet-async';
import SpotifyPlayer from '../../components/SpotifyPlayer';

const AudioPage: React.FC<{ lang: 'en' | 'ru' }> = ({ lang }) => {
  const t = {
    title: lang === 'ru' ? 'Нейро-Аудио — AI-автоматизация | Нейро Завод' : 'Neuro-Audio — AI Automation | Neuro Factory',
    description: lang === 'ru'
      ? 'Слушайте нейро-музыку, созданную искусственным интеллектом. Демонстрация возможностей AI-генерации музыки всех жанров.'
      : 'Listen to neuro-music created by artificial intelligence. Demo of AI music generation capabilities across all genres.',
    heading: lang === 'ru' ? 'Нейро-Музыка' : 'Neuro Music',
    subtitle: lang === 'ru'
      ? 'Музыка, созданная нейросетями. Демонстрация наших возможностей в AI-генерации.'
      : 'Music created by neural networks. Demo of our AI generation capabilities.',
    channelLink: lang === 'ru' ? 'Подписаться на канал' : 'Subscribe to channel',
  };

  return (
    <>
      <Helmet>
        <title>{t.title}</title>
        <meta name="description" content={t.description} />
        <meta property="og:title" content={t.title} />
        <meta property="og:description" content={t.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tecai.ru/neuro-generation/audio" />
        <meta name="keywords" content={lang === 'ru'
          ? 'нейро музыка, AI музыка, генерация музыки, нейросети, SUNO, Udio, электронная музыка'
          : 'neuro music, AI music, music generation, neural networks, SUNO, Udio, electronic music'} />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-zinc-900 to-black text-white py-8 px-4">
        {/* Header section */}
        <div className="max-w-7xl mx-auto mb-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
              {t.heading}
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              {t.subtitle}
            </p>
          </div>

          {/* Spotify-style player */}
          <SpotifyPlayer lang={lang} />

          {/* Channel link */}
          <div className="text-center mt-8">
            <a
              href="https://t.me/neyrozvuki"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#0088cc] hover:bg-[#0077b5] text-white px-6 py-3 rounded-full font-medium transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.692-1.653-1.123-2.678-1.799-1.185-.781-.417-1.21.258-1.911.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.139-5.062 3.345-.479.329-.913.489-1.302.481-.428-.009-1.252-.242-1.865-.442-.751-.244-1.349-.374-1.297-.789.027-.216.324-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.015 3.333-1.386 4.025-1.627 4.477-1.635.099-.002.321.023.465.141.121.1.154.234.17.331.015.098.034.322.019.496z"/>
              </svg>
              {t.channelLink}
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default AudioPage;
