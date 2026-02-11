import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { OpenAI } from 'openai';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// OpenAI Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
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
    res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' });
  }
});

// Kie.ai Image Generation endpoints
app.post('/api/image/create', async (req, res) => {
  try {
    const { prompt, aspectRatio } = req.body;
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
app.post('/api/telegram', async (req, res) => {
  try {
    const { text } = req.body;
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      return res.status(500).json({ error: 'Telegram configuration missing' });
    }

    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
