import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { OpenAI } from 'openai';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';
import { setupMusicRoutes } from './musicRoutes.js';

dotenv.config();

const app = express();
const allowedOrigins = new Set(['https://tecai.ru', 'https://www.tecai.ru']);
const allowedRefererPrefixes = Array.from(allowedOrigins).map((origin) => `${origin}/`);

app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
    strictTransportSecurity: {
      maxAge: 31536000,
      includeSubDomains: true,
    },
  }),
);
app.use(
  cors({
    origin: (origin, callback) => {
      if (origin && allowedOrigins.has(origin)) {
        callback(null, true);
        return;
      }
      callback(new Error('Not allowed by CORS'));
    },
    methods: ['GET', 'POST', 'OPTIONS'],
  }),
);
app.use(express.json({ limit: '10kb' }));

const baseApiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 120,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later.' },
});

const chatLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 30,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: { error: 'Chat rate limit exceeded, please try again later.' },
});

const telegramLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: { error: 'Telegram rate limit exceeded, please try again later.' },
});

const imageCreateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: { error: 'Image generation rate limit exceeded, please try again later.' },
});

app.use('/api', baseApiLimiter);

const isNonEmptyString = (value) => typeof value === 'string' && value.trim().length > 0;
const ASPECT_RATIO_RE = /^[0-9]{1,2}:[0-9]{1,2}$/;
const TASK_ID_RE = /^[a-zA-Z0-9_-]{1,128}$/;

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const requireTrustedOrigin = (req, res, next) => {
  const origin = req.get('origin');
  const referer = req.get('referer');

  if (origin && allowedOrigins.has(origin)) {
    return next();
  }

  if (!origin && typeof referer === 'string' && allowedRefererPrefixes.some((prefix) => referer.startsWith(prefix))) {
    return next();
  }

  return res.status(403).json({ error: 'Forbidden' });
};

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// OpenAI Chat endpoint
app.post('/api/chat', requireTrustedOrigin, chatLimiter, async (req, res) => {
  try {
    const { message } = req.body;
    if (!isNonEmptyString(message) || message.length > 2000) {
      return res.status(400).json({ error: 'Invalid "message". Must be a non-empty string up to 2000 chars.' });
    }
    const currentDate = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: `You are 'NEURO-ASSISTANT', the AI Concierge for Content Factory. 
          The factory is a full-cycle automation platform for content creation. Date: ${currentDate}.
          
          Tone: Professional, futuristic, helpful, and efficient. Use emojis like 🚀, 🔥, 💡, 💪, 💯.
          
          Key Info:
          - Service: AI-powered content factory for social media, video, audio, and avatar creation
          - Features: Full automation, 24/7 operation, zero human intervention
          - AI Models: Nano Banana Pro, Sora 2, Kling 2.6, Veo 3.1, Gemini 3
          - Content Types: Video generation, audio production, voice cloning, neuro-avatars
          - Tiers: Path to Stars, Edge of Possible, Speed of Legends
          
          Keep responses short (under 50 words) and informative. If asked about features, highlight the automation capabilities and AI models used.`,
        },
        { role: 'user', content: message }
      ],
      max_tokens: 150,
      temperature: 0.7,
    });

    res.json({ content: response.choices[0].message.content });
  } catch (error) {
    console.error('OpenAI Error:', error);
    res.status(503).json({ error: 'AI service temporarily unavailable' });
  }
});

// Kie.ai Image Generation endpoints
app.post('/api/image/create', requireTrustedOrigin, imageCreateLimiter, async (req, res) => {
  try {
    const { prompt, aspectRatio } = req.body;
    if (!isNonEmptyString(prompt) || prompt.length > 2000) {
      return res.status(400).json({ error: 'Invalid "prompt". Must be a non-empty string up to 2000 chars.' });
    }
    if (aspectRatio && (typeof aspectRatio !== 'string' || !ASPECT_RATIO_RE.test(aspectRatio))) {
      return res.status(400).json({ error: 'Invalid "aspectRatio". Expected format "W:H".' });
    }
    const apiKey = process.env.KIE_AI_API_KEY;

    const response = await fetch('https://api.kie.ai/api/v1/jobs/createTask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'z-image',
        input: {
          prompt,
          aspect_ratio: aspectRatio,
        },
      }),
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error('Kie.ai Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/image/status/:taskId', async (req, res) => {
  try {
    const { taskId } = req.params;
    if (!isNonEmptyString(taskId) || !TASK_ID_RE.test(taskId)) {
      return res.status(400).json({ error: 'Invalid "taskId".' });
    }
    const apiKey = process.env.KIE_AI_API_KEY;

    const response = await fetch(`https://api.kie.ai/api/v1/jobs/recordInfo?taskId=${taskId}`, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
      },
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error('Kie.ai Status Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Telegram endpoint
app.post('/api/telegram', requireTrustedOrigin, telegramLimiter, async (req, res) => {
  try {
    const { text, locale, name, contact, tariffName, configDetails, notes } = req.body || {};
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      return res.status(500).json({ error: 'Telegram configuration missing' });
    }

    let messageText = '';
    if (isNonEmptyString(text)) {
      if (text.length > 2000) {
        return res.status(400).json({ error: 'Invalid "text". Must be up to 2000 chars.' });
      }
      messageText = escapeHtml(text);
    } else {
      if (!isNonEmptyString(name) || !isNonEmptyString(contact) || !isNonEmptyString(tariffName)) {
        return res.status(400).json({ error: 'Invalid order payload.' });
      }

      const normalizedLocale = locale === 'en' ? 'en' : 'ru';
      const safeName = escapeHtml(name.trim().slice(0, 200));
      const safeContact = escapeHtml(contact.trim().slice(0, 200));
      const safeTariff = escapeHtml(tariffName.trim().slice(0, 200));
      const safeConfig = isNonEmptyString(configDetails) ? escapeHtml(configDetails.trim().slice(0, 1000)) : '';
      const safeNotes = isNonEmptyString(notes) ? escapeHtml(notes.trim().slice(0, 3000)) : '';

      messageText =
        normalizedLocale === 'ru'
          ? `🚀 <b>НОВАЯ ЗАЯВКА</b>\n\n👤 <b>Имя:</b> ${safeName}\n📱 <b>Контакт:</b> ${safeContact}\n💎 <b>Тариф:</b> ${safeTariff}${safeConfig ? `\n⚙️ <b>Конфигурация:</b> ${safeConfig}` : ''}${safeNotes ? `\n📝 <b>Комментарий:</b> ${safeNotes}` : ''}`
          : `🚀 <b>NEW ORDER</b>\n\n👤 <b>Name:</b> ${safeName}\n📱 <b>Contact:</b> ${safeContact}\n💎 <b>Tier:</b> ${safeTariff}${safeConfig ? `\n⚙️ <b>Configuration:</b> ${safeConfig}` : ''}${safeNotes ? `\n📝 <b>Notes:</b> ${safeNotes}` : ''}`;
    }

    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: messageText,
        parse_mode: 'HTML',
      }),
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error('Telegram Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

setupMusicRoutes(app);

app.use((error, req, res, next) => {
  if (error && error.message === 'Not allowed by CORS') {
    return res.status(403).json({ error: 'Origin is not allowed' });
  }
  return next(error);
});

const PORT = process.env.PORT || 3004;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
