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
        description: 'Кейсы внедрения AI-автоматизации Нейро Завод: контент завод, нейросети, автопостинг 24/7, интеграции make.com и n8n, масштабирование охватов и рост продаж.',
        keywords: 'кейсы, AI, автоматизация, контент завод, нейро завод',
        canonical: 'https://tecai.ru/cases',
        ogImage: 'https://tecai.ru/og-image.webp',
      },
      '/about': {
        title: 'О компании — Нейро Завод',
        description: 'Нейро Завод — команда экспертов по AI-автоматизации контента: профили специалистов, контакты и ключевые направления.',
        keywords: 'о компании, нейро завод, команда, ai автоматизация, эксперты',
        canonical: 'https://tecai.ru/about',
        ogImage: 'https://tecai.ru/og-image.webp',
      },
      '/neuro-generation/avatars': {
        title: 'Нейро-Аватары — AI-автоматизация | Нейро Завод',
        description: 'Нейроаватары студийного качества для брендов, экспертов и отделов продаж: автоматическое видео 24/7, публикация в соцсети, интеграции make.com и n8n.',
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
    const routeStaticSnippets: Record<string, string> = {
      '/': `
        <article data-prerender-static="true">
          <h1>Нейро Завод — AI-автоматизация контента 24/7</h1>
          <p>Нейро Завод автоматизирует контент-производство и публикации: видео, изображения и аудио с интеграциями make.com и n8n.</p>
          <section>
            <h2>Что делает платформа</h2>
            <ul>
              <li>Генерация контента для соцсетей и сайтов</li>
              <li>Автопостинг 24/7 в ключевые каналы</li>
              <li>Масштабирование выпуска без расширения команды</li>
            </ul>
          </section>
        </article>
      `,
      '/faq': `
        <article data-prerender-static="true">
          <h1>FAQ Нейро Завод</h1>
          <p>Нейро Завод автоматизирует создание и публикацию контента, включая видео, аудио и изображения для бизнеса.</p>
          <section>
            <h2>Как работает Нейро Завод</h2>
            <p>Платформа объединяет генерацию, адаптацию форматов и автопостинг в единый workflow.</p>
          </section>
        </article>
      `,
      '/cases': `
        <article data-prerender-static="true">
          <h1>Кейсы Нейро Завод</h1>
          <p>Кейсы показывают, как AI-автоматизация ускоряет производство контента и снижает нагрузку SMM-команд.</p>
          <section>
            <h2>Какие результаты получают клиенты</h2>
            <ul>
              <li>Рост регулярности публикаций</li>
              <li>Сокращение ручных операций</li>
              <li>Более предсказуемый контент-пайплайн</li>
            </ul>
          </section>
        </article>
      `,
      '/about': `
        <article data-prerender-static="true">
          <h1>О компании Нейро Завод</h1>
          <p>Нейро Завод — команда экспертов по AI-автоматизации контента и построению масштабируемых publishing-workflow.</p>
          <section>
            <h2>Кто входит в команду</h2>
            <ul>
              <li>Эксперты по масштабированию и коммерции</li>
              <li>Специалисты по корпоративному обучению</li>
              <li>Продюсеры AI-аудио и медиапроизводства</li>
            </ul>
          </section>
        </article>
      `,
      '/neuro-generation/avatars': `
        <article data-prerender-static="true">
          <h1>Нейро-Аватары</h1>
          <p>Нейроаватары студийного качества создают регулярный экспертный контент и ускоряют видеопроизводство бренда.</p>
          <section><h2>Как работает нейро-аватар</h2><p>AI генерирует сценарий, озвучку и готовый ролик под канал публикации.</p></section>
        </article>
      `,
      '/neuro-generation/video': `
        <article data-prerender-static="true">
          <h1>Нейро-Видео</h1>
          <p>AI-видеопайплайн создает промо, Shorts и UGC-контент с адаптацией под платформы и автопубликацией.</p>
          <section><h2>Сколько длится производство</h2><p>Автоматизированный workflow сокращает цикл подготовки роликов по сравнению с ручным продакшном.</p></section>
        </article>
      `,
      '/neuro-generation/audio': `
        <article data-prerender-static="true">
          <h1>Нейро-Аудио</h1>
          <p>Нейро-Аудио генерирует музыку, дубляж и клонирование голоса для подкастов, рекламы и видеоформатов.</p>
          <section><h2>Что получает бизнес</h2><p>Единое бренд-звучание и ускоренный выпуск аудиоконтента под разные каналы.</p></section>
        </article>
      `,
      '/neuro-generation/social': `
        <article data-prerender-static="true">
          <h1>Соц Сети</h1>
          <p>AI-оркестрация контента для соцсетей помогает выпускать публикации регулярно и масштабируемо.</p>
          <section><h2>Как ускоряется SMM</h2><p>Автоматизация планирования, генерации и публикации снижает долю ручной рутины.</p></section>
        </article>
      `,
      '/neuro-generation/3d': `
        <article data-prerender-static="true">
          <h1>3D Генерация</h1>
          <p>AI-подход к 3D-моделям и ассетам ускоряет подготовку визуалов для e-commerce, рекламы и презентаций.</p>
          <section><h2>Где применяется 3D</h2><p>В карточках товаров, промоматериалах, AR/VR-прототипах и визуальных сценах.</p></section>
        </article>
      `,
      '/neuro-generation/images': `
        <article data-prerender-static="true">
          <h1>Нейро-Изображения</h1>
          <p>Платформа генерирует фотореалистичные изображения и рекламные креативы под брендбук и задачи роста.</p>
          <section><h2>Как это помогает маркетингу</h2><p>Быстрый выпуск вариаций креативов повышает скорость тестирования гипотез.</p></section>
        </article>
      `,
      '/autoposting/socials': `
        <article data-prerender-static="true">
          <h1>Автопостинг в Соцсети</h1>
          <p>Единый контур автопостинга в YouTube, VK, Telegram, TikTok и другие каналы снижает операционную нагрузку.</p>
          <section><h2>Что автоматизируется</h2><p>Планирование, форматирование контента, публикация и мониторинг ошибок.</p></section>
        </article>
      `,
      '/autoposting/sites': `
        <article data-prerender-static="true">
          <h1>Сайты и Блоги</h1>
          <p>Автопубликация SEO-контента в CMS помогает поддерживать регулярность и развивать органический трафик.</p>
          <section><h2>Как работает публикация</h2><p>Статьи и обновления формируются AI-моделями и доставляются в WordPress через API.</p></section>
        </article>
      `,
    };
    const routeSchemaScripts: Record<string, unknown[]> = {
      '/faq': [
        {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'Как работает НЕЙРО-ЗАВОД?',
              acceptedAnswer: { '@type': 'Answer', text: 'Мы подключаем ваши каналы к единому AI-хабу и настраиваем цели, тональность бренда и график публикаций. Дальше система сама проходит весь цикл: сценарий, генерация медиа, адаптация форматов и постинг. При необходимости включаем этапы согласования перед публикацией.' },
            },
            {
              '@type': 'Question',
              name: 'Можно ли использовать своего аватара?',
              acceptedAnswer: { '@type': 'Answer', text: 'Да. Мы создаём цифрового аватара на базе вашей внешности или проектируем уникального персонажа под бренд. Аватар можно использовать в экспертных роликах, презентациях, обучении и продажах.' },
            },
            {
              '@type': 'Question',
              name: 'Кому принадлежат права на контент?',
              acceptedAnswer: { '@type': 'Answer', text: 'Права на контент принадлежат вам в рамках договорённостей по проекту. Вы можете использовать материалы в коммерции, рекламе, соцсетях, на сайте и в рассылках.' },
            },
            {
              '@type': 'Question',
              name: 'Какие нейросети используются?',
              acceptedAnswer: { '@type': 'Answer', text: 'Мы используем актуальный стек моделей под конкретные задачи. Для видео — Sora 2 и Veo 3.1, для сценариев — продвинутые языковые модели, для визуалов и аудио — профильные генеративные инструменты. Оркестрация через make.com и n8n.' },
            },
            {
              '@type': 'Question',
              name: 'Что если ИИ ошибется?',
              acceptedAnswer: { '@type': 'Answer', text: 'В workflow заложены этапы самопроверки и валидации перед публикацией. Для чувствительных тематик подключается Human-in-the-Loop: вы утверждаете сценарии или финальные посты.' },
            },
            {
              '@type': 'Question',
              name: 'Мои данные в безопасности?',
              acceptedAnswer: { '@type': 'Answer', text: 'Да. Данные обрабатываются в защищённой инфраструктуре с ролевым доступом и ограниченными правами интеграций. Применяется принцип минимально необходимого доступа и изоляция сценариев.' },
            },
            {
              '@type': 'Question',
              name: 'Как связаться с поддержкой?',
              acceptedAnswer: { '@type': 'Answer', text: 'Через персонального менеджера, Telegram или форму на сайте. Для корпоративных клиентов доступны регламенты реакции и эскалации. Также мы проводим онбординг-сессии.' },
            },
            {
              '@type': 'Question',
              name: 'Какие данные необходимы для запуска завода?',
              acceptedAnswer: { '@type': 'Answer', text: 'На старте мы собираем бриф: цели бизнеса, аудиторию, каналы, контент-пиллары и ограничения бренда. Можно стартовать с минимального набора данных и масштабировать систему после первых результатов.' },
            },
            {
              '@type': 'Question',
              name: 'Вы гарантируете сохранность персональных данных?',
              acceptedAnswer: { '@type': 'Answer', text: 'Да. Персональные данные не передаются третьим лицам без отдельного согласования и договорной базы. По возможности применяются обезличивание и сокращение объёма данных в workflow.' },
            },
            {
              '@type': 'Question',
              name: 'Как Нейро Завод интегрируется с make.com и n8n?',
              acceptedAnswer: { '@type': 'Answer', text: 'make.com и n8n используются как слой оркестрации: триггеры, публикация, согласования, уведомления и мониторинг ошибок. Это даёт прозрачную, масштабируемую логику автоматизации.' },
            },
            {
              '@type': 'Question',
              name: 'Какие модели используются для генерации видео?',
              acceptedAnswer: { '@type': 'Answer', text: 'Видеопайплайн собирается из моделей под задачу и формат. Для генерации используются Sora 2 и Veo 3.1, а финальные шаги включают проверку качества и адаптацию под каналы.' },
            },
            {
              '@type': 'Question',
              name: 'Сколько стоит AI-автоматизация по сравнению с SMM-командой?',
              acceptedAnswer: { '@type': 'Answer', text: 'AI-автоматизация снижает долю ручной рутины и стоимость единицы контента за счёт повторно используемых workflow. Экономика зависит от объёма задач, но обычно выигрывает по масштабу, скорости и предсказуемости выпуска.' },
            },
            {
              '@type': 'Question',
              name: 'Какие соцсети поддерживает автопостинг?',
              acceptedAnswer: { '@type': 'Answer', text: 'Базовый контур включает YouTube, VK, Telegram, TikTok, Instagram и другие площадки с доступными API или коннекторами. На этапе запуска мы настраиваем отказоустойчивую логику публикации.' },
            },
          ],
        },
        {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Главная', item: 'https://tecai.ru/' },
            { '@type': 'ListItem', position: 2, name: 'FAQ', item: 'https://tecai.ru/faq' },
          ],
        },
      ],
      '/cases': [
        {
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Кейсы Нейро Завод',
          url: 'https://tecai.ru/cases',
        },
        {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Главная', item: 'https://tecai.ru/' },
            { '@type': 'ListItem', position: 2, name: 'Кейсы', item: 'https://tecai.ru/cases' },
          ],
        },
      ],
      '/about': [
        {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Нейро Завод / Контент Завод',
          url: 'https://tecai.ru',
          logo: 'https://tecai.ru/logo-ai.png',
          description: 'AI-автоматизация создания и публикации контента для бизнеса: видео, аудио, изображения, аватары и автопостинг 24/7.',
          foundingDate: '2024',
          areaServed: 'RU',
          contactPoint: [
            { '@type': 'ContactPoint', contactType: 'customer support', email: 'ait@tecai.ru', availableLanguage: ['ru', 'en'] },
            { '@type': 'ContactPoint', contactType: 'sales', url: 'https://t.me/AI_Technology_avto', availableLanguage: ['ru', 'en'] },
          ],
          sameAs: [
            'https://t.me/kontentzavodAI',
            'https://www.youtube.com/@НейросмехИИ',
            'https://vk.com/kontentzavodai',
            'https://www.tiktok.com/@neyrosmeh',
            'https://www.linkedin.com/in/reanimatorxp/',
            'https://ru.pinterest.com/AIkontentzavod/',
            'https://www.instagram.com/neyrosmeh/reels/',
            'https://dzen.ru/kontentzavodai',
          ],
        },
        {
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: 'Андрей Федорчук',
          description: '15 лет в коммерции, запуск Hanibani, Aura, Я Самая. Выручка проектов 10+ млрд руб.',
          image: 'https://tecai.ru/assets/andrej-fedorchuk.png',
          worksFor: { '@type': 'Organization', name: 'Нейро Завод', url: 'https://tecai.ru' },
        },
        {
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: 'Сергей Федорчук',
          description: '15 лет в обучении. Провёл 900+ тренингов. Эксперт iSpring, Adobe, SCORM.',
          image: 'https://tecai.ru/assets/sergej-fedorchuk.png',
          worksFor: { '@type': 'Organization', name: 'Нейро Завод', url: 'https://tecai.ru' },
        },
        {
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: 'Алмас Азнабаев',
          description: 'Музыкальный продюсер. Спродюсировал более 1000 треков. Эксперт Tunecore, SUNO, Udio.',
          image: 'https://tecai.ru/assets/almas-aznabaev.png',
          worksFor: { '@type': 'Organization', name: 'Нейро Завод', url: 'https://tecai.ru' },
        },
        {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Главная', item: 'https://tecai.ru/' },
            { '@type': 'ListItem', position: 2, name: 'О компании', item: 'https://tecai.ru/about' },
          ],
        },
      ],
    };
    for (const [route, meta] of Object.entries(routeMeta)) {
      if (routeSchemaScripts[route]) continue;
      if (route === '/') continue;
      routeSchemaScripts[route] = [
        {
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: meta.title,
          description: meta.description,
          areaServed: 'RU',
          provider: {
            '@type': 'Organization',
            name: 'Нейро Завод',
            url: 'https://tecai.ru',
          },
          offers: {
            '@type': 'Offer',
            availability: 'https://schema.org/InStock',
            url: meta.canonical,
          },
        },
        {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Главная', item: 'https://tecai.ru/' },
            { '@type': 'ListItem', position: 2, name: meta.title, item: meta.canonical },
          ],
        },
      ];
    }

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
            '/about',
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
            renderAfterTime: 10000,
            maxConcurrentRoutes: 1,
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
            const staticSnippet = routeStaticSnippets[context.route];
            if (staticSnippet) {
              context.html = context.html.replace('<div id="root"></div>', `<div id="root">${staticSnippet}</div>`);
            }
            const extraSchemas = routeSchemaScripts[context.route] || [];
            if (extraSchemas.length) {
              const serialized = extraSchemas
                .map((schema) => `<script type="application/ld+json">${JSON.stringify(schema)}</script>`)
                .join('');
              context.html = context.html.replace('</head>', `${serialized}</head>`);
            }
            const schemaMatches = context.html.match(/<script type="application\/ld\+json">/g) || [];
            if (schemaMatches.length < 2) {
              console.warn(`[prerender] Route "${context.route}" has low schema count: ${schemaMatches.length}`);
            }
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
