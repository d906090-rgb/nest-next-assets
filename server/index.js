import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { OpenAI } from 'openai';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';

dotenv.config();

const app = express();
const allowedOrigins = new Set(['https://tecai.ru', 'https://www.tecai.ru']);

app.use(helmet());
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.has(origin)) {
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

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// OpenAI Chat endpoint
app.post('/api/chat', chatLimiter, async (req, res) => {
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
    res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' });
  }
});

// Kie.ai Image Generation endpoints
app.post('/api/image/create', imageCreateLimiter, async (req, res) => {
  try {
    const { prompt, aspectRatio } = req.body;
    if (!isNonEmptyString(prompt) || prompt.length > 2000) {
      return res.status(400).json({ error: 'Invalid "prompt". Must be a non-empty string up to 2000 chars.' });
    }
    if (aspectRatio && typeof aspectRatio !== 'string') {
      return res.status(400).json({ error: 'Invalid "aspectRatio". Must be a string when provided.' });
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
    if (!isNonEmptyString(taskId) || taskId.length > 128) {
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
app.post('/api/telegram', telegramLimiter, async (req, res) => {
  try {
    const { text } = req.body;
    if (!isNonEmptyString(text) || text.length > 2000) {
      return res.status(400).json({ error: 'Invalid "text". Must be a non-empty string up to 2000 chars.' });
    }
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

// Music API endpoints
const MUSIC_METADATA_PATH = '/var/www/www-root/data/www/tecai.ru/public/music/music-metadata.json';
const MUSIC_DIR = '/var/www/www-root/data/www/tecai.ru/public/music';

// Get albums and tracks
app.get('/api/music/albums', async (req, res) => {
  try {
    const fs = await import('fs/promises');
    const data = await fs.readFile(MUSIC_METADATA_PATH, 'utf-8');
    const metadata = JSON.parse(data);
    res.json(metadata);
  } catch (error) {
    console.error('Music metadata read error:', error);
    res.json({
      albums: [],
      lastSync: null,
      syncStatus: 'never',
      channelUsername: 'neyrozvuki',
      totalTracks: 0,
    });
  }
});

// Sync with Telegram channel
const musicSyncLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: { error: 'Sync rate limit exceeded.' },
});

app.post('/api/music/sync', musicSyncLimiter, async (req, res) => {
  try {
    const fs = await import('fs/promises');
    const token = process.env.TELEGRAM_BOT_TOKEN;

    if (!token) {
      return res.status(500).json({ error: 'Telegram bot token not configured' });
    }

    // Read current metadata
    let metadata;
    try {
      const data = await fs.readFile(MUSIC_METADATA_PATH, 'utf-8');
      metadata = JSON.parse(data);
    } catch {
      metadata = {
        albums: [],
        lastSync: null,
        syncStatus: 'never',
        channelUsername: 'neyrozvuki',
        totalTracks: 0,
      };
    }

    // Update sync status
    metadata.syncStatus = 'syncing';
    await fs.writeFile(MUSIC_METADATA_PATH, JSON.stringify(metadata, null, 2));

    // Fetch posts from Telegram channel
    const channelUsername = metadata.channelUsername || 'neyrozvuki';
    const updatesUrl = `https://api.telegram.org/bot${token}/getUpdates?allowed_updates=["channel_post"]&limit=100`;
    const updatesResponse = await fetch(updatesUrl);
    const updatesData = await updatesResponse.json();

    const audioTracks = [];
    const albumsMap = new Map();

    if (updatesData.ok && updatesData.result) {
      for (const update of updatesData.result) {
        const post = update.channel_post;
        if (!post) continue;

        // Check if post has audio
        const audio = post.audio;
        if (audio) {
          const trackId = `track_${audio.file_unique_id}`;
          const title = audio.title || audio.file_name || 'Unknown Track';
          const artist = audio.performer || 'AI Generated';
          const duration = audio.duration || 180;

          // Try to extract album from title (format: "Album - Track" or just use default)
          let albumTitle = 'Neuro Music Collection';
          let trackTitle = title;

          if (title.includes(' - ')) {
            const parts = title.split(' - ');
            if (parts.length >= 2) {
              albumTitle = parts[0].trim();
              trackTitle = parts.slice(1).join(' - ').trim();
            }
          }

          // Create or update album
          if (!albumsMap.has(albumTitle)) {
            albumsMap.set(albumTitle, {
              id: `album_${Buffer.from(albumTitle).toString('base64').slice(0, 16)}`,
              title: albumTitle,
              artist: artist,
              coverUrl: null,
              coverGenerated: false,
              trackCount: 0,
              tracks: [],
              createdAt: new Date().toISOString(),
            });
          }

          const album = albumsMap.get(albumTitle);
          const track = {
            id: trackId,
            title: trackTitle,
            artist: artist,
            albumId: album.id,
            duration: duration,
            audioUrl: `/api/music/file/${audio.file_id}`,
            telegramFileId: audio.file_id,
            telegramPostId: post.message_id,
            createdAt: new Date(post.date * 1000).toISOString(),
          };

          album.tracks.push(track);
          album.trackCount = album.tracks.length;
          audioTracks.push(track);
        }
      }
    }

    // Convert albums map to array and sort by creation date
    const albums = Array.from(albumsMap.values()).sort((a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    // Update metadata
    metadata.albums = albums;
    metadata.totalTracks = audioTracks.length;
    metadata.lastSync = new Date().toISOString();
    metadata.syncStatus = 'success';

    await fs.writeFile(MUSIC_METADATA_PATH, JSON.stringify(metadata, null, 2));

    res.json(metadata);
  } catch (error) {
    console.error('Music sync error:', error);

    // Update status to error
    try {
      const fs = await import('fs/promises');
      const data = await fs.readFile(MUSIC_METADATA_PATH, 'utf-8');
      const metadata = JSON.parse(data);
      metadata.syncStatus = 'error';
      await fs.writeFile(MUSIC_METADATA_PATH, JSON.stringify(metadata, null, 2));
    } catch {
      // Ignore
    }

    res.status(500).json({ error: 'Sync failed', message: error.message });
  }
});

// Serve audio file from Telegram
app.get('/api/music/file/:fileId', async (req, res) => {
  try {
    const { fileId } = req.params;
    const token = process.env.TELEGRAM_BOT_TOKEN;

    if (!token) {
      return res.status(500).json({ error: 'Telegram bot token not configured' });
    }

    // Get file path from Telegram
    const filePathUrl = `https://api.telegram.org/bot${token}/getFile?file_id=${fileId}`;
    const filePathResponse = await fetch(filePathUrl);
    const filePathData = await filePathResponse.json();

    if (!filePathData.ok) {
      return res.status(404).json({ error: 'File not found' });
    }

    const filePath = filePathData.result.file_path;
    const fileUrl = `https://api.telegram.org/file/bot${token}/${filePath}`;

    // Proxy the file
    const fileResponse = await fetch(fileUrl);
    if (!fileResponse.ok) {
      return res.status(fileResponse.status).json({ error: 'Failed to fetch file' });
    }

    // Set headers for audio streaming
    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Accept-Ranges', 'bytes');

    const reader = fileResponse.body.getReader();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      res.write(Buffer.from(value));
    }
    res.end();
  } catch (error) {
    console.error('Music file serve error:', error);
    res.status(500).json({ error: 'Failed to serve audio file' });
  }
});

// Generate album cover
app.post('/api/music/cover/:albumId', imageCreateLimiter, async (req, res) => {
  try {
    const { albumId } = req.params;
    const { prompt } = req.body;
    const fs = await import('fs/promises');

    // Find album in metadata
    const data = await fs.readFile(MUSIC_METADATA_PATH, 'utf-8');
    const metadata = JSON.parse(data);
    const album = metadata.albums.find(a => a.id === albumId);

    if (!album) {
      return res.status(404).json({ error: 'Album not found' });
    }

    const coverPrompt = prompt || `Abstract album cover art for "${album.title}" music album, digital art, vibrant colors, professional design`;

    // Use Kie.ai to generate cover
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
          prompt: coverPrompt,
          aspect_ratio: '1:1',
        },
      }),
    });

    const result = await response.json();

    if (result.code === 0 && result.data?.taskId) {
      res.json({
        taskId: result.data.taskId,
        message: 'Cover generation started. Poll /api/music/cover-status/:taskId for result.',
      });
    } else {
      res.status(400).json({ error: result.msg || 'Failed to start cover generation' });
    }
  } catch (error) {
    console.error('Cover generation error:', error);
    res.status(500).json({ error: 'Failed to generate cover' });
  }
});

// Check cover generation status
app.get('/api/music/cover-status/:taskId', async (req, res) => {
  try {
    const { taskId } = req.params;
    const fs = await import('fs/promises');
    const apiKey = process.env.KIE_AI_API_KEY;

    const response = await fetch(`https://api.kie.ai/api/v1/jobs/recordInfo?taskId=${taskId}`, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
      },
    });

    const result = await response.json();

    if (result.code === 0 && result.data?.status === 'SUCCESS' && result.data?.output?.url) {
      // Download and save cover locally
      const coverUrl = result.data.output.url;
      const coverResponse = await fetch(coverUrl);
      const coverBuffer = await coverResponse.arrayBuffer();
      const coverFilename = `cover_${taskId}.webp`;
      const coverPath = `${MUSIC_DIR}/covers/${coverFilename}`;

      await fs.writeFile(coverPath, Buffer.from(coverBuffer));

      res.json({
        status: 'success',
        coverUrl: `/music/covers/${coverFilename}`,
      });
    } else if (result.data?.status === 'PROCESSING') {
      res.json({
        status: 'processing',
        message: 'Cover is still being generated',
      });
    } else {
      res.json({
        status: 'error',
        error: result.msg || 'Unknown error',
      });
    }
  } catch (error) {
    console.error('Cover status check error:', error);
    res.status(500).json({ error: 'Failed to check cover status' });
  }
});

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
