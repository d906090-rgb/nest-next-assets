import { rateLimit } from 'express-rate-limit';
import fs from 'fs/promises';
import path from 'path';

const MUSIC_METADATA_PATH = '/var/www/www-root/data/www/tecai.ru/public/music/music-metadata.json';
const MUSIC_DIR = '/var/www/www-root/data/www/tecai.ru/public/music';
const COVERS_DIR = path.join(MUSIC_DIR, 'covers');

const musicSyncLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: { error: 'Sync rate limit exceeded.' },
});

const coverLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: { error: 'Cover generation rate limit exceeded.' },
});

// Ensure directories exist
const ensureDirs = async () => {
  try {
    await fs.mkdir(MUSIC_DIR, { recursive: true });
    await fs.mkdir(COVERS_DIR, { recursive: true });
  } catch (e) {
    // Ignore
  }
};

// Read music metadata
const readMetadata = async () => {
  try {
    await ensureDirs();
    const data = await fs.readFile(MUSIC_METADATA_PATH, 'utf-8');
    return JSON.parse(data);
  } catch {
    return {
      albums: [],
      lastSync: null,
      syncStatus: 'never',
      channelUsername: 'neyrozvuki',
      totalTracks: 0,
    };
  }
};

// Write music metadata
const writeMetadata = async (metadata) => {
  await ensureDirs();
  await fs.writeFile(MUSIC_METADATA_PATH, JSON.stringify(metadata, null, 2));
};

export const setupMusicRoutes = (app) => {
  // Get albums and tracks
  app.get('/api/music/albums', async (req, res) => {
    try {
      const metadata = await readMetadata();
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
  app.post('/api/music/sync', musicSyncLimiter, async (req, res) => {
    try {
      const token = process.env.TELEGRAM_BOT_TOKEN;

      if (!token) {
        return res.status(500).json({ error: 'Telegram bot token not configured' });
      }

      const metadata = await readMetadata();

      // Update sync status
      metadata.syncStatus = 'syncing';
      await writeMetadata(metadata);

      // Fetch posts from Telegram channel
      const channelUsername = metadata.channelUsername || 'neyrozvuki';
      const updatesUrl = `https://api.telegram.org/bot${token}/getUpdates?allowed_updates=["channel_post"]&limit=100`;
      const updatesResponse = await fetch(updatesUrl);
      const updatesData = await updatesResponse.json();

      const albumsMap = new Map();

      if (updatesData.ok && updatesData.result) {
        for (const update of updatesData.result) {
          const post = update.channel_post;
          if (!post) continue;

          const audio = post.audio;
          if (audio) {
            const trackId = `track_${audio.file_unique_id}`;
            const title = audio.title || audio.file_name || 'Unknown Track';
            const artist = audio.performer || 'AI Generated';
            const duration = audio.duration || 180;

            // Extract album from title
            let albumTitle = 'Neuro Music Collection';
            let trackTitle = title;

            if (title.includes(' - ')) {
              const parts = title.split(' - ');
              if (parts.length >= 2) {
                albumTitle = parts[0].trim();
                trackTitle = parts.slice(1).join(' - ').trim();
              }
            }

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
          }
        }
      }

      const albums = Array.from(albumsMap.values()).sort((a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      let totalTracks = 0;
      albums.forEach(a => totalTracks += a.tracks.length);

      metadata.albums = albums;
      metadata.totalTracks = totalTracks;
      metadata.lastSync = new Date().toISOString();
      metadata.syncStatus = 'success';

      await writeMetadata(metadata);

      res.json(metadata);
    } catch (error) {
      console.error('Music sync error:', error);

      try {
        const metadata = await readMetadata();
        metadata.syncStatus = 'error';
        await writeMetadata(metadata);
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

      const filePathUrl = `https://api.telegram.org/bot${token}/getFile?file_id=${fileId}`;
      const filePathResponse = await fetch(filePathUrl);
      const filePathData = await filePathResponse.json();

      if (!filePathData.ok) {
        return res.status(404).json({ error: 'File not found' });
      }

      const filePath = filePathData.result.file_path;
      const fileUrl = `https://api.telegram.org/file/bot${token}/${filePath}`;

      const fileResponse = await fetch(fileUrl);
      if (!fileResponse.ok) {
        return res.status(fileResponse.status).json({ error: 'Failed to fetch file' });
      }

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
  app.post('/api/music/cover/:albumId', coverLimiter, async (req, res) => {
    try {
      const { albumId } = req.params;
      const { prompt } = req.body;
      const metadata = await readMetadata();
      const album = metadata.albums.find(a => a.id === albumId);

      if (!album) {
        return res.status(404).json({ error: 'Album not found' });
      }

      const coverPrompt = prompt || `Abstract album cover art for "${album.title}" music album, digital art, vibrant colors, professional design`;
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
          albumId: albumId,
          message: 'Cover generation started',
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
      const apiKey = process.env.KIE_AI_API_KEY;

      const response = await fetch(`https://api.kie.ai/api/v1/jobs/recordInfo?taskId=${taskId}`, {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
        },
      });

      const result = await response.json();

      if (result.code === 0 && result.data?.status === 'SUCCESS' && result.data?.output?.url) {
        const coverUrl = result.data.output.url;
        const coverResponse = await fetch(coverUrl);
        const coverBuffer = await coverResponse.arrayBuffer();
        const coverFilename = `cover_${taskId}.webp`;
        const coverPath = path.join(COVERS_DIR, coverFilename);

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

  // Apply cover to album
  app.post('/api/music/apply-cover/:albumId', async (req, res) => {
    try {
      const { albumId } = req.params;
      const { coverUrl } = req.body;
      const metadata = await readMetadata();
      const album = metadata.albums.find(a => a.id === albumId);

      if (!album) {
        return res.status(404).json({ error: 'Album not found' });
      }

      album.coverUrl = coverUrl;
      album.coverGenerated = true;
      await writeMetadata(metadata);

      res.json({ success: true, album });
    } catch (error) {
      console.error('Apply cover error:', error);
      res.status(500).json({ error: 'Failed to apply cover' });
    }
  });
};
