export const getHeroDate = (lang: 'en' | 'ru') => {
  const now = new Date();
  const year = now.getFullYear();

  if (lang === 'ru') {
    const day = now.getDate();
    const month = now.toLocaleString('ru', { month: 'short' }).replace('.', '').toUpperCase();
    return `${day} ${month}, ${year} // МОСКВА`;
  } else {
    const day = now.getDate();
    const month = now.toLocaleString('en', { month: 'short' }).toUpperCase();
    return `${month} ${day}, ${year} // MOSCOW`;
  }
};

export const CONTENT = {
  en: {
    nav: {
      lineup: 'Team',
      experience: 'Neural Nets',
      tickets: 'Tariffs',
      cta: 'CONNECT',
      neurogeneration: 'Neurogeneration',
      autoposting: 'Autoposting',
      cases: 'Cases',
      faq: 'FAQ'
    },
    hero: {
      h1_1: 'NEURO',
      h1_2: 'CONVEYOR',
      subtitle: 'An orchestra of neuro agents that will replace your bloggers, SMM, and ART departments. 24/7. Without vacations or sick leave. Save up to 10 million rubles',
      cta: 'Launch Factory'
    },
    marquee: ['FULL-CYCLE AUTOMATION', 'SMART DISTRIBUTION', 'HYPER-SCALING'],
    lineupSection: {
      title_1: 'Neural',
      title_2: 'Architects',
      phase: 'PHASE 1 LINEUP'
    },
    experience: {
      items: [
        { title: "AI", text: "Only the most advanced models: Nano Banana Pro, Sora 2, Kling 2.6, Veo 3.1 and many others." },
        { title: "Best Quality", text: "We create viral content of the highest possible quality." },
        { title: "Automate All", text: "Over 1,000 pieces of content per month, untouched by human hands, working 24/7. No breaks, no weekends." },
        { title: "AUDIO AI", text: "• Music generation\n• Dubbing of any foreign video \\ audio\n• Voice cloning" },
        { title: "VIDEO AI", text: "• Video generation in any genre, format, and style\n• Integration of your products and brand\n• Any video length" },
        { title: "AI AVATARS", text: "• Creation of studio-quality neuro-avatars\n• Automation of neuro-avatars for social media \\ presentations \\ speeches\n• Interactive neuro-avatars for online interaction" }
      ]
    },
    about: {
      title: 'What is Neuro Factory',
      paragraphs: [
        'Neuro Factory is an AI content automation platform that combines video, image, and audio generation with 24/7 autoposting to social channels and websites.',
        'The platform replaces fragmented manual routines with a multi-agent workflow: strategy, script generation, media production, formatting, and publishing.',
        'Neuro Factory integrates with make.com and n8n, supports modern models such as Sora 2 and Veo 3.1, and helps teams scale output without adding headcount.'
      ]
    },
    stats: {
      title: 'Key Metrics',
      items: [
        { label: 'Content units per month', value: '1,000+' },
        { label: 'Supported social and content channels', value: '15+' },
        { label: 'Connected AI models and tools', value: '10+' },
        { label: 'Workflow uptime mode', value: '24/7' },
      ]
    },
    comparison: {
      title: 'Neuro Factory vs Traditional SMM Team',
      rows: [
        { metric: 'Production speed', neuro: 'Automated daily flow', traditional: 'Limited by team bandwidth' },
        { metric: 'Operating mode', neuro: '24/7 without downtime', traditional: 'Working hours only' },
        { metric: 'Scalability', neuro: 'Fast workflow replication', traditional: 'Requires hiring and onboarding' },
        { metric: 'Tooling', neuro: 'AI + make.com + n8n', traditional: 'Manual operations and fragmented stack' },
      ]
    },
    tickets: {
      title_1: 'CHOOSE',
      title_2: 'POWER',
      sub: 'Stop working manually. Make algorithms generate money while competitors sleep.',
      tiers: [
         { 
           name: "PATH TO STARS", 
           price: "3,500",
           currency: "$",
           features: [
             "Ready-made and configured neuro factory", 
             "1 workflow", 
             "10 social accounts (YouTube, Instagram*, Facebook*, VK, Telegram, Pinterest...)",
             "Choice of AI (Sora 2, Veo 3.1, ChatGPT, Gemini 3, Nano Banana Pro...)",
             "Online support (self-managed)"
           ] 
         },
         { 
           name: "EDGE OF POSSIBLE", 
           price: "7,500",
           currency: "$",
           features: [
             "Everything in \"Path to Stars\"",
             "Up to 6 videos, 8 images, 10 text posts per day",
             "1 Year \"All Inclusive\" Subscription:",
             "— Latest AI Model Updates",
             "— Full Technical Support",
             "— Brand Unpacking, Identity & Target Audience setup",
             "— Digital Profile creation (Tone of Voice)",
             "— Custom Neuro Factory Assembly",
             "100% Flexibility: Factory adaptation (Add-on)",
             "Extended Socials: LinkedIn, TikTok, Threads, MAX*"
           ] 
         },
         { 
           name: "SPEED OF LEGENDS", 
           price: "15,000",
           currency: "$",
           features: [
             "Everything in \"Path to Stars\" & \"Edge of Possible\"",
             "Gen & Post up to 30 items/day (incl. video)",
             "2 Additional Workflows (Total 3)",
             "20 Additional Social Accounts (Total 30)",
             "1 Custom Neuro-Avatar (HeyGen / Synthesia)",
             "Offline & Online Training (2 people, 3 months):",
             "— Build & Config your own Neuro Factory",
             "— Launch High-End Automate Projects",
             "Creation of 2 Landing Pages"
           ] 
         }
      ],
      btn: 'LAUNCH',
      btnProcessing: 'PROCESSING...',
      btnAcquired: 'ACQUIRED'
    },
    faq: {
      title: "FAQ",
      items: [
        {
          question: "How does the Neural Conveyor work?",
          answer: "We connect your channels to a centralized AI workflow hub and configure goals, tone of voice, and publication cadence. The system then generates scripts, media assets, and platform-ready posts end-to-end. You can run fully automated publishing or add approval steps for sensitive campaigns. This setup gives predictable 24/7 output without manual bottlenecks."
        },
        {
          question: "Can I use my own brand avatar?",
          answer: "Yes. We can build a custom avatar from your visual identity or create a synthetic spokesperson aligned with your brand style. The avatar can be used for social videos, product explainers, onboarding clips, and presentations. Voice, script style, and delivery can be tuned for each channel and audience segment."
        },
        {
          question: "Do I own the content copyright?",
          answer: "Yes. All generated content is created for your business workflows and remains under your commercial use rights according to the contract. You can publish, adapt, and repurpose materials across social channels, websites, and ad platforms. We also keep source assets and workflow logic transparent for long-term control."
        },
        {
          question: "Which AI models are under the hood?",
          answer: "We use an up-to-date model stack selected by task type. Typical pipelines include Sora 2 and Veo 3.1 for video workflows, advanced language models for planning and scripts, image models for creatives, and dedicated audio models for dubbing and voice cloning. The orchestration layer is integrated with make.com and n8n for reliable execution."
        },
        {
          question: "What if the AI makes a mistake?",
          answer: "Workflows include validation and self-correction loops before publishing. For regulated or sensitive brands, we enable Human-in-the-Loop approval at defined checkpoints. You can review scripts, visuals, or final posts before distribution. This balances automation speed with editorial control."
        },
        {
          question: "Is my data safe?",
          answer: "Yes. Data is processed in controlled infrastructure with strict access rules and role-based permissions. Integrations are configured with least-privilege tokens and isolated workflows. Access to business data is limited to approved scopes required for operation and support."
        },
        {
          question: "How do I contact support?",
          answer: "You can contact support through your personal manager, Telegram, or the contact form on the website. Enterprise clients receive response-time targets and escalation paths. We also provide onboarding sessions to reduce launch risks and shorten time to value."
        },
        {
          question: "What data is required to launch the factory?",
          answer: "We start with a launch brief: business goals, audience segments, channels, content pillars, and brand constraints. The more context we receive, the better the output quality and relevance. We can launch quickly with a minimal dataset and expand after initial performance validation."
        },
        {
          question: "I am very sensitive about my personal data. Do you guarantee its safety?",
          answer: "Yes. Personal data is handled under strict confidentiality and contractual boundaries. We do not transfer identifiable information to third parties without explicit agreement. When possible, workflows use anonymized or reduced datasets to minimize exposure."
        },
        {
          question: "How does Neuro Factory integrate with make.com and n8n?",
          answer: "We use make.com and n8n as orchestration layers for workflow triggers, approvals, publishing, and monitoring. This enables low-code extensibility and transparent automation logic. Your team can inspect or co-manage scenarios after onboarding."
        },
        {
          question: "Which models are used for video generation?",
          answer: "Video pipelines are assembled from task-specific models, including Sora 2 and Veo 3.1, with quality control and formatting steps for each channel. The final model stack depends on target format, speed requirements, and brand constraints."
        },
        {
          question: "How does AI automation compare to a traditional SMM team in cost?",
          answer: "AI automation reduces repetitive production costs by replacing manual routine with reusable workflows. Final economics depend on your scope, but most teams gain from higher volume, faster iteration, and lower marginal cost per content unit."
        },
        {
          question: "Which channels are supported by autoposting?",
          answer: "Typical channel sets include YouTube, VK, Telegram, TikTok, Instagram, and additional platforms where API or connector support is available. We map channel priorities during onboarding and configure fail-safe publication logic."
        },
      ]
    },
    footer: {
      copyright: '© 2025-2026 CONTENT FACTORY INC. MOSCOW DIST 9.',
      columns: [
        {
          title: 'Navigation',
          links: [
            { label: 'Team', href: '#lineup' },
            { label: 'Neural Nets', href: '#experience' },
            { label: 'Tariffs', href: '#tickets' },
            { label: 'FAQ', href: '#faq' }
          ]
        },
        {
          title: 'Legal',
          links: [
            { label: 'Legal Information', href: '/legal/legal-info.pdf' },
            { label: 'Privacy Policy', href: '/legal/privacy-policy.pdf' },
            { label: 'Terms of Use', href: '/legal/terms-of-use.pdf' },
            { label: 'License', href: '/legal/license.pdf' },
            { label: 'Cookies Policy', href: '/legal/cookies-policy.pdf' }
          ]
        },
        {
          title: 'Contacts',
          links: [
            { label: 'Support Bot', href: 'https://t.me/AI_Technology_avto' },
            { label: 'Sales Dept', href: 'https://t.me/AI_Technology_avto' },
            { label: 'Partnership', href: 'mailto:ait@kontent-zavod-ai.ru' }
          ]
        }
      ]
    },
    modal: {
      listen: 'Listen Preview',
      pause: 'Stop Preview'
    }
  },
  ru: {
    nav: {
      lineup: 'Команда',
      experience: 'Нейросети',
      tickets: 'Тарифы',
      cta: 'ПОДКЛЮЧИТЬ',
      neurogeneration: 'Нейрогенерация',
      autoposting: 'Автопостинг',
      cases: 'Кейсы',
      faq: 'FAQ'
    },
    hero: {
      h1_1: 'НЕЙРО',
      h1_2: 'ЗАВ∞Д',
      subtitle: 'Оркестр из нейро агентов, которые заменят вам блогеров, СММ и АРТ отделы. 24 \\ 7. Без отпуска и больничных. Сэкономьте до 10 млн руб',
      cta: 'Запустить Завод'
    },
    marquee: ['АВТОМАТИЗАЦИЯ ЦИКЛА', 'УМНАЯ ДИСТРИБУЦИЯ', 'ГИПЕР-МАСШТАБИРОВАНИЕ'],
    lineupSection: {
      title_1: 'Нейро',
      title_2: 'Архитекторы',
      phase: 'ФАЗА 1'
    },
    experience: {
      items: [
        { title: "НЕЙРОСЕТИ", text: "Только самые современные модели: Nano Banana Pro, Sora 2, Kling 2.6, Veo 3.1 и многие другие." },
        { title: "ЛУЧШЕЕ КАЧЕСТВО", text: "Мы создаём виральный контент максимально возможного качества." },
        { title: "АВТОМАТИЗИРУЙ ВСЁ", text: "От 1 000 единиц контента в месяц, к которому не притрагивается рука человека и который работает 24/7. Без отпуска и выходных." },
        { title: "АУДИО AI", text: "• Генерация музыки\n• Дублирование любого иностранного видео \\ аудио\n• Клонирование голоса" },
        { title: "ВИДЕО AI", text: "• Генерация видео в любом жанре, формате и стиле\n• Интеграция ваших товаров и бренда в видео\n• Любая длина видео" },
        { title: "АВАТАРЫ AI", text: "• Создание нейроаватаров студийного качества\n• Автоматизация нейроаватаров для соц сетей \\ презентаций \\ выступлений\n• Интерактивные нейроаватары для online взаимодействия" }
      ]
    },
    about: {
      title: 'Что такое Нейро Завод',
      paragraphs: [
        'Нейро Завод — это платформа AI-автоматизации контента, которая объединяет генерацию видео, изображений и аудио с автопостингом 24/7 в соцсети и на сайты.',
        'Платформа заменяет разрозненные ручные процессы единым мультиагентным конвейером: стратегия, сценарии, продакшн, адаптация под площадки и публикация.',
        'Нейро Завод интегрируется с make.com и n8n, использует современные модели вроде Sora 2 и Veo 3.1 и помогает масштабировать контент без расширения штата.'
      ]
    },
    stats: {
      title: 'Ключевые метрики',
      items: [
        { label: 'Единиц контента в месяц', value: '1 000+' },
        { label: 'Поддерживаемых каналов публикации', value: '15+' },
        { label: 'Подключённых AI-моделей и инструментов', value: '10+' },
        { label: 'Режим работы workflow', value: '24/7' },
      ]
    },
    comparison: {
      title: 'Нейро Завод vs Традиционная SMM-команда',
      rows: [
        { metric: 'Скорость производства', neuro: 'Автоматический ежедневный поток', traditional: 'Ограничено загрузкой команды' },
        { metric: 'Режим работы', neuro: '24/7 без пауз', traditional: 'Только рабочие часы' },
        { metric: 'Масштабирование', neuro: 'Быстрое тиражирование workflow', traditional: 'Найм и длительный онбординг' },
        { metric: 'Технологический стек', neuro: 'AI + make.com + n8n', traditional: 'Ручные процессы и фрагментированные инструменты' },
      ]
    },
    tickets: {
      title_1: 'ВЫБЕРИ',
      title_2: 'МОЩНОСТЬ',
      sub: 'Хватит работать руками. Заставь алгоритмы генерировать деньги, пока конкуренты спят.',
      tiers: [
         { 
           name: "ПУТЬ К ЗВЁЗДАМ", 
           price: "350 000",
           currency: "₽",
           features: [
             "Готовый и настроенный нейро завод", 
             "1 workflow", 
             "10 аккаунтов на подключение к соц сетям на выбор (YouTube, Instagram*, Facebook*, VK, VK CLIPS, OK, Telegram, Pinterest)",
             "Нейросети на выбор (Sora 2, Veo 3.1, ChatGPT, Gemini 3, Nano Banana Pro, GPT-IMAGE 1,5, Seedream 4.5 и т.д.)",
             "Онлайн поддержка без сопровождения"
           ] 
         },
         { 
           name: "ГРАНЬ ВОЗМОЖНОГО", 
           price: "750 000",
           currency: "₽",
           features: [
             "Всё то же, что и в тарифе «Путь к звёздам»",
             "До 6 единиц видео контента в день, 8 изображений, 10 текстовых",
             "1 год подписки по формату «Всё включено»:",
             "— Обновление нейросетей до последней модели",
             "— Техподдержка весь период подписки",
             "— Распаковка бизнеса, настройка по ЦА, Brandbook",
             "— Создание цифрового профиля (Tone of Voice)",
             "— Индивидуальная сборка завода под бренд",
             "100% гибкость: адаптация под новые цели (доп. услуга)",
             "Расширенный пакет соц сетей: LinkedIn, Дзен, TikTok, Threads, MAX*"
           ] 
         },
         { 
           name: "СКОРОСТЬ ЛЕГЕНД", 
           price: "1 500 000",
           currency: "₽",
           features: [
             "Всё то же, что и в тарифов «Грань возможного» и «Путь к звёздам»",
             "Генерация и постинг до 30 единиц контента в день (вкл. видео)",
             "Доп 2 workflow (всего 3)",
             "Доп 20 соц сетей на подключение (всего 30)",
             "1 Нейроаватар последней версии (HeyGen / Synthesia)",
             "Очное офлайн и онлайн обучение (2 чел, 3 мес):",
             "— Создание и настройка собственного нейро завода",
             "— Запуск automate проектов high end класса",
             "Создание 2 landing page для акций и задач"
           ] 
         }
      ],
      btn: 'ЗАПУСТИТЬ',
      btnProcessing: 'ОБРАБОТКА...',
      btnAcquired: 'КУПЛЕНО'
    },
    faq: {
      title: "FAQ",
      items: [
        {
          question: "Как работает НЕЙРО-ЗАВ∞Д?",
          answer: "Мы подключаем ваши каналы к единому AI-хабу и настраиваем цели, тональность бренда и график публикаций. Дальше система сама проходит весь цикл: сценарий, генерация медиа, адаптация форматов и постинг. При необходимости включаем этапы согласования перед публикацией. Так вы получаете стабильный контент-поток 24/7 без ручных узких мест."
        },
        {
          question: "Можно ли использовать своего аватара?",
          answer: "Да. Мы создаём цифрового аватара на базе вашей внешности или проектируем уникального персонажа под бренд. Аватар можно использовать в экспертных роликах, презентациях, обучении и продажах. Голос, сценарный стиль и подача адаптируются под площадку и сегмент аудитории."
        },
        {
          question: "Кому принадлежат права на контент?",
          answer: "Права на контент принадлежат вам в рамках договорённостей по проекту. Вы можете использовать материалы в коммерции, рекламе, соцсетях, на сайте и в рассылках. Мы также обеспечиваем прозрачность по исходникам и структуре workflow, чтобы вы сохраняли контроль над контентом в долгую."
        },
        {
          question: "Какие нейросети используются?",
          answer: "Мы используем актуальный стек моделей под конкретные задачи. Для видео — Sora 2 и Veo 3.1, для сценариев и логики — продвинутые языковые модели, для визуалов и аудио — профильные генеративные инструменты. Оркестрация и автоматизация выполняются через make.com и n8n."
        },
        {
          question: "Что если ИИ ошибется?",
          answer: "В workflow заложены этапы самопроверки и валидации перед публикацией. Для чувствительных тематик подключается Human-in-the-Loop: вы утверждаете сценарии или финальные посты. Это сохраняет баланс между скоростью автоматизации и качественным контролем бренда."
        },
        {
          question: "Мои данные в безопасности?",
          answer: "Да. Данные обрабатываются в защищённой инфраструктуре с ролевым доступом и ограниченными правами интеграций. Мы применяем принцип минимально необходимого доступа и изоляцию сценариев. Чувствительные данные передаются только в пределах согласованного контура."
        },
        {
          question: "Как связаться с поддержкой?",
          answer: "Через персонального менеджера, Telegram или форму на сайте. Для корпоративных клиентов доступны регламенты реакции и эскалации. Также мы проводим онбординг-сессии, чтобы быстро запустить контент-конвейер и снизить риски на старте."
        },
        {
          question: "Какие данные необходимы для запуска завода?",
          answer: "На старте мы собираем бриф: цели бизнеса, аудиторию, каналы, контент-пиллары и ограничения бренда. Чем полнее вводные, тем выше релевантность и качество материалов. Можно стартовать с минимального набора данных и масштабировать систему после первых результатов."
        },
        {
          question: "Я очень трепетно отношусь к своим персональным данным. Вы гарантируете их сохранность?",
          answer: "Да, гарантируем. Персональные данные не передаются третьим лицам без отдельного согласования и договорной базы. По возможности применяются обезличивание и сокращение объёма данных в workflow, чтобы дополнительно снизить риски."
        },
        {
          question: "Как Нейро Завод интегрируется с make.com и n8n?",
          answer: "make.com и n8n используются как слой оркестрации: триггеры, публикация, согласования, уведомления и мониторинг ошибок. Это даёт прозрачную, масштабируемую логику автоматизации без жёсткой привязки к одной платформе. После запуска команда может совместно управлять сценариями."
        },
        {
          question: "Какие модели используются для генерации видео (Sora 2, Veo 3.1)?",
          answer: "Видеопайплайн собирается из моделей под задачу и формат. Для генерации и вариативности используются Sora 2 и Veo 3.1, а финальные шаги включают проверку качества и адаптацию под каналы. Конкретная связка зависит от скорости, бюджета и требований к качеству."
        },
        {
          question: "Сколько стоит AI-автоматизация контента по сравнению с SMM-командой?",
          answer: "AI-автоматизация снижает долю ручной рутины и стоимость единицы контента за счёт повторно используемых workflow. Экономика зависит от объёма задач, но обычно выигрывает по масштабу, скорости и предсказуемости выпуска. Для оценки мы считаем сценарий под ваши KPI и каналы."
        },
        {
          question: "Какие соцсети поддерживает автопостинг?",
          answer: "Базовый контур обычно включает YouTube, VK, Telegram, TikTok, Instagram и другие площадки с доступными API или коннекторами. На этапе запуска мы приоритизируем каналы и настраиваем отказоустойчивую логику публикации, чтобы контент выходил стабильно."
        },
      ]
    },
    footer: {
      copyright: '© 2025-2026 КОНТЕНТ ЗАВОД INC. МОСКВА, РАЙОН 9.',
      columns: [
        {
          title: 'Навигация',
          links: [
            { label: 'Команда', href: '#lineup' },
            { label: 'Нейросети', href: '#experience' },
            { label: 'Тарифы', href: '#tickets' },
            { label: 'FAQ', href: '#faq' }
          ]
        },
        {
          title: 'Legal',
          links: [
            { label: 'Правовая информация', href: '/legal/legal-info.pdf' },
            { label: 'Политика конфиденциальности', href: '/legal/privacy-policy.pdf' },
            { label: 'Условия использования', href: '/legal/terms-of-use.pdf' },
            { label: 'Лицензия', href: '/legal/license.pdf' },
            { label: 'Политика Cookies', href: '/legal/cookies-policy.pdf' }
          ]
        },
        {
          title: 'Контакты',
          links: [
            { label: 'Поддержка', href: 'https://t.me/AI_Technology_avto' },
            { label: 'Отдел продаж', href: 'https://t.me/AI_Technology_avto' },
            { label: 'Партнерство', href: 'mailto:ait@kontent-zavod-ai.ru' }
          ]
        }
      ]
    },
    modal: {
      listen: 'Слушать Превью',
      pause: 'Стоп'
    }
  }
};

export const MENU_STRUCTURE = {
  neuro: [
    { path: '/neuro-generation/avatars', label: { ru: 'Аватары', en: 'Avatars' } },
    { path: '/neuro-generation/video', label: { ru: 'Видео', en: 'Video' } },
    { path: '/neuro-generation/audio', label: { ru: 'Аудио', en: 'Audio' } },
    { path: '/neuro-generation/social', label: { ru: 'Соц сети', en: 'Social Networks' } },
    { path: '/neuro-generation/3d', label: { ru: '3D', en: '3D' } },
    { path: '/neuro-generation/images', label: { ru: 'Изображения', en: 'Images' } },
  ],
  autoposting: [
    { path: '/autoposting/socials', label: { ru: 'Соц.сети', en: 'Social Media' } },
    { path: '/autoposting/sites', label: { ru: 'Сайты и блоги', en: 'Sites & Blogs' } },
  ],
};

export const LINEUP_DATA = {
  en: [
    { 
      id: '1', name: 'Andrey Fedorchuk', genre: 'Scaling Expert', day: 'AI SCALER', 
      image: '/assets/andrej-fedorchuk.png',
      description: '• 15 years in commerce\n• Path from salesperson to director\n• Launched Hanibani, Aura, Ya Samaya\n• Project revenue 10+ billion RUB\n• Hobbies: mountains, hiking',
      audioUrl: '/assets/andrej-audio.mp3'
    },
    { 
      id: '2', name: 'Sergey Fedorchuk', genre: 'Corporate EdTech', day: 'NEURAL EDU', 
      image: '/assets/sergej-fedorchuk.png',
      description: '• 15 years in training\n• Experience: Polaris, Golder, Galamart\n• Conducted 900+ trainings\n• Expert in iSpring, Adobe, SCORM\n• Hobbies: autosport, karting',
      audioUrl: '/assets/sergej-audio.mp3'
    },
    { 
      id: '3', name: 'Almas Aznabaev', genre: 'Music Producer', day: 'AUDIO SYNTH', 
      image: '/assets/almas-aznabaev.png',
      description: '• Music Expert\n• Releases neuro-tracks on Y.Music, Spotify, Apple Music etc.\n• Produced over 1000 tracks\n• Expert in Tunecore, SUNO, Udio\n• Hobbies: Stargazing walks, traveling',
      audioUrl: '/assets/almas-audio.mp3'
    },
    { 
      id: '4', name: 'ABOUT US', genre: 'IN BRIEF', day: 'OVERDRIVE', 
      image: '/assets/about-us.png',
      description: '15 years of expertise fused with startup energy. We shift routine to AI, liberating human potential for greater goals.\n\nSeeking Automation visionaries: contact support.'
    }
  ],
  ru: [
    { 
      id: '1', name: 'Андрей Федорчук', genre: 'Масштабирование', day: 'AI МАСШТАБ', 
      image: '/assets/andrej-fedorchuk.png',
      description: '• 15 лет в коммерции\n• Путь от продавца до директора\n• Запуск Hanibani, Aura, Я Самая\n• Выручка проектов 10+ млрд руб\n• Хобби: горы, хайкинг',
      audioUrl: '/assets/andrej-audio.mp3'
    },
    { 
      id: '2', name: 'Сергей Федорчук', genre: 'Корпоративное Обучение', day: 'НЕЙРО EDU', 
      image: '/assets/sergej-fedorchuk.png',
      description: '• 15 лет в обучении\n• Опыт: Polaris, Golder, Галамарт\n• Провёл 900+ тренингов\n• Эксперт iSpring, Adobe, SCORM\n• Хобби: автоспорт, картинг',
      audioUrl: '/assets/sergej-audio.mp3'
    },
    { 
      id: '3', name: 'Алмас Азнабаев', genre: 'Музыкальный продюсер', day: 'АУДИО СИНТЕЗ', 
      image: '/assets/almas-aznabaev.png',
      description: '• Музыкальный эксперт\n• Выпускает нейротреки на Я.Музыке, Spotify, Apple Music и т.д.\n• Спродюсировал более 1000 треков\n• Эксперт Tunecore, SUNO, Udio\n• Хобби: Прогулки под звёздами, путешествия',
      audioUrl: '/assets/almas-audio.mp3'
    },
    { 
      id: '4', name: 'О НАС', genre: 'КОРОТКО', day: 'ОВЕРДРАЙВ', 
      image: '/assets/about-us.png',
      description: '15 лет опыта, сплавленные в энергию стартапа. Мы забираем рутину у людей и отдаем её алгоритмам, освобождая время для великого.\n\nИщем единомышленников в Automation: пишите в поддержку.'
    }
  ]
};
