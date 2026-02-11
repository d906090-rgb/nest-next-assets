import path from 'path';
import { createRequire } from 'module';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(async ({ mode }) => {
    globalThis.require = createRequire(import.meta.url);
    const { default: prerender } = await import('vite-plugin-prerender');
    const { default: Renderer } = await import('@prerenderer/renderer-puppeteer');
    const routeMeta: Record<string, { title: string; description: string; keywords: string; canonical: string; ogImage: string }> = {
      '/': {
        title: 'Нейро Завод — AI-автоматизация контента 24/7',
        description: 'Нейро Завод — платформа автоматизации контента на базе AI. Генерация видео, изображений и аудио нейросетями Sora 2, Veo 3.1, Nano Banana Pro. Автопостинг 24/7 в соцсети. Интеграции make.com и n8n.',
        keywords: 'нейро завод, контент завод, AI, автоматизация, нейросети, make.com, n8n, Sora 2, Veo 3.1, Nano Banana Pro, автопостинг, генерация видео, генерация аудио, генерация изображений',
        canonical: 'https://tecai.ru/',
        ogImage: 'https://tecai.ru/og-image.webp',
      },
      '/faq': {
        title: 'FAQ — Нейро Завод',
        description: 'Ответы на частые вопросы о Нейро Завод: AI-контент, нейросети, автопостинг 24/7, интеграции make.com и n8n, безопасность данных и быстрый запуск.',
        keywords: 'faq, нейросети, ai, автоматизация, автопостинг',
        canonical: 'https://tecai.ru/faq',
        ogImage: 'https://tecai.ru/og-image.webp',
      },
      '/cases': {
        title: 'Кейсы — Нейро Завод',
        description: 'Кейсы внедрения AI-автоматизации Нейро Завод: контент завод, нейросети, автопостинг 24/7, интеграции make.com и n8n, рост охватов и продаж.',
        keywords: 'кейсы, AI, автоматизация, контент завод, нейро завод',
        canonical: 'https://tecai.ru/cases',
        ogImage: 'https://tecai.ru/og-image.webp',
      },
      '/neuro-generation/avatars': {
        title: 'Нейро-Аватары — AI-автоматизация | Нейро Завод',
        description: 'Нейроаватары студийного качества для брендов, экспертов и отделов продаж: видео 24/7, публикация в соцсети, интеграции make.com и n8n.',
        keywords: 'нейроаватары, AI аватары, автоматизация контента, контент завод, нейро завод, HeyGen, Synthesia',
        canonical: 'https://tecai.ru/neuro-generation/avatars',
        ogImage: 'https://tecai.ru/og-image.webp',
      },
      '/neuro-generation/video': {
        title: 'Нейро-Видео — AI-автоматизация | Нейро Завод',
        description: 'Генерация AI-видео в любом жанре: промо, Shorts, экспертный контент и UGC. Поддержка Sora 2, Veo 3.1, Kling 2.6 и автопостинг через make.com и n8n.',
        keywords: 'генерация видео, Sora 2, Veo 3.1, Kling 2.6, AI видео, нейросети, контент завод',
        canonical: 'https://tecai.ru/neuro-generation/video',
        ogImage: 'https://tecai.ru/og-image.webp',
      },
      '/neuro-generation/audio': {
        title: 'Нейро-Аудио — AI-автоматизация | Нейро Завод',
        description: 'Генерация музыки, клонирование голоса и дубляж для подкастов, рекламы и видео: AI-продакшн с нейросетями и автоматизациями make.com и n8n.',
        keywords: 'генерация музыки, клонирование голоса, дубляж, AI аудио, нейросети, SUNO, Udio',
        canonical: 'https://tecai.ru/neuro-generation/audio',
        ogImage: 'https://tecai.ru/og-image.webp',
      },
      '/neuro-generation/social': {
        title: 'Соц Сети — AI-автоматизация | Нейро Завод',
        description: 'Контент для соцсетей с AI-агентами: от идеи до публикации 24/7. Рост охватов, снижение нагрузки SMM и интеграции make.com, n8n, Telegram, VK, YouTube.',
        keywords: 'соц сети, SMM автоматизация, AI автоматизация, контент завод, автопостинг, нейро завод',
        canonical: 'https://tecai.ru/neuro-generation/social',
        ogImage: 'https://tecai.ru/og-image.webp',
      },
      '/neuro-generation/3d': {
        title: '3D Генерация — AI-автоматизация | Нейро Завод',
        description: 'Создание 3D-моделей, ассетов и окружений для рекламы, маркетплейсов и презентаций на базе AI-инструментов с автоматизацией pipeline через make.com и n8n.',
        keywords: '3d генерация, 3d модели, ai дизайн, нейросети, контент завод, автоматизация',
        canonical: 'https://tecai.ru/neuro-generation/3d',
        ogImage: 'https://tecai.ru/og-image.webp',
      },
      '/neuro-generation/images': {
        title: 'Нейро-Изображения — AI-автоматизация | Нейро Завод',
        description: 'Генерация фотореалистичных изображений и креативов для рекламы, карточек товаров и брендинга с AI-моделями и автоматизациями make.com, n8n.',
        keywords: 'генерация изображений, AI изображения, нейросети, контент завод, Nano Banana Pro, дизайн автоматизация',
        canonical: 'https://tecai.ru/neuro-generation/images',
        ogImage: 'https://tecai.ru/og-image.webp',
      },
      '/autoposting/socials': {
        title: 'Автопостинг в Соцсети — AI-автоматизация | Нейро Завод',
        description: 'Автопостинг в YouTube, Instagram, TikTok, VK, Telegram и другие платформы: контент-поток 24/7 без ручных операций с интеграциями make.com и n8n.',
        keywords: 'автопостинг, соцсети, make.com, n8n, автоматизация, AI, контент завод',
        canonical: 'https://tecai.ru/autoposting/socials',
        ogImage: 'https://tecai.ru/og-image.webp',
      },
      '/autoposting/sites': {
        title: 'Сайты и Блоги — AI-автоматизация | Нейро Завод',
        description: 'Автоматическое наполнение сайтов и блогов SEO-оптимизированным контентом: статьи, описания, новости и кейсы через WordPress, make.com и n8n.',
        keywords: 'сайты и блоги, SEO контент, автоматизация контента, AI, нейросети, wordpress',
        canonical: 'https://tecai.ru/autoposting/sites',
        ogImage: 'https://tecai.ru/og-image.webp',
      },
    };

    return {
      server: {
        port: 10000,
        host: '127.0.0.1',
        allowedHosts: ['tecai.ru']
      },
      plugins: [
        react(),
        prerender({
          staticDir: path.join(__dirname, 'dist'),
          routes: [
            '/',
            '/faq',
            '/cases',
            '/neuro-generation/avatars',
            '/neuro-generation/video',
            '/neuro-generation/audio',
            '/neuro-generation/social',
            '/neuro-generation/3d',
            '/neuro-generation/images',
            '/autoposting/socials',
            '/autoposting/sites',
          ],
          renderer: new Renderer({
            renderAfterTime: 3000,
          }),
          postProcess(context) {
            const meta = routeMeta[context.route];
            if (!meta) return context;
            context.html = context.html
              .replace(/<title>.*?<\/title>/, `<title>${meta.title}</title>`)
              .replace(/<meta name="description" content=".*?">/, `<meta name="description" content="${meta.description}">`)
              .replace(/<meta name="keywords" content=".*?">/, `<meta name="keywords" content="${meta.keywords}">`)
              .replace(/<link rel="canonical" href=".*?">/, `<link rel="canonical" href="${meta.canonical}">`)
              .replace(/<meta property="og:url" content=".*?">/, `<meta property="og:url" content="${meta.canonical}">`)
              .replace(/<meta property="og:title" content=".*?">/, `<meta property="og:title" content="${meta.title}">`)
              .replace(/<meta property="og:description" content=".*?">/, `<meta property="og:description" content="${meta.description}">`)
              .replace(/<meta property="og:image" content=".*?">/, `<meta property="og:image" content="${meta.ogImage}">`)
              .replace(/<meta name="twitter:title" content=".*?">/, `<meta name="twitter:title" content="${meta.title}">`)
              .replace(/<meta name="twitter:description" content=".*?">/, `<meta name="twitter:description" content="${meta.description}">`)
              .replace(/<meta name="twitter:image" content=".*?">/, `<meta name="twitter:image" content="${meta.ogImage}">`)
              .replace(/<link rel="alternate" hreflang="ru" href=".*?">/, `<link rel="alternate" hreflang="ru" href="${meta.canonical}">`)
              .replace(/<link rel="alternate" hreflang="en" href=".*?">/, `<link rel="alternate" hreflang="en" href="${meta.canonical}?lang=en">`)
              .replace(/<link rel="alternate" hreflang="x-default" href=".*?">/, `<link rel="alternate" hreflang="x-default" href="${meta.canonical}">`);
            return context;
          },
        }),
      ],
      publicDir: 'public',
      build: {
        assetsDir: 'assets',
        rollupOptions: {
          output: {
            assetFileNames: 'assets/[name]-[hash][extname]'
          }
        }
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
