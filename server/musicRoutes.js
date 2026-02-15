import { rateLimit } from 'express-rate-limit';
import fs from 'fs/promises';
import path from 'path';
import { isIP } from 'net';

const MUSIC_RUNTIME_DIR = process.env.MUSIC_RUNTIME_DIR || '/var/lib/tecai/music';
const MUSIC_METADATA_PATH = path.join(MUSIC_RUNTIME_DIR, 'music-metadata.json');
const COVERS_DIR = path.join(MUSIC_RUNTIME_DIR, 'covers');
const DEFAULT_CHANNEL_USERNAME = 'neyrozvuki';
const TRUSTED_ORIGINS = new Set(['https://tecai.ru', 'https://www.tecai.ru']);
const TRUSTED_REFERER_PREFIXES = Array.from(TRUSTED_ORIGINS).map((origin) => `${origin}/`);
const FILE_ID_RE = /^[a-zA-Z0-9_-]{10,256}$/;
const TASK_ID_RE = /^[a-zA-Z0-9_-]{1,128}$/;
const ALBUM_ID_RE = /^album_[a-zA-Z0-9_-]{1,24}$/;
const SAFE_FILENAME_RE = /^[a-zA-Z0-9_-]+\.(jpg|jpeg|png|webp)$/i;

const AUDIO_MIME_MAP = {
  '.mp3': 'audio/mpeg',
  '.ogg': 'audio/ogg',
  '.oga': 'audio/ogg',
  '.opus': 'audio/opus',
  '.m4a': 'audio/mp4',
  '.flac': 'audio/flac',
  '.wav': 'audio/wav',
  '.aac': 'audio/aac',
};

const guessAudioMime = (filePath) => {
  const ext = path.extname(filePath || '').toLowerCase();
  return AUDIO_MIME_MAP[ext] || 'audio/mpeg';
};

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

const musicReadLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 200,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: { error: 'Music API rate limit exceeded.' },
});

const ensureDirs = async () => {
  await fs.mkdir(MUSIC_RUNTIME_DIR, { recursive: true });
  await fs.mkdir(COVERS_DIR, { recursive: true });
};

const defaultMetadata = () => ({
  albums: [],
  lastSync: null,
  syncStatus: 'never',
  channelUsername: DEFAULT_CHANNEL_USERNAME,
  totalTracks: 0,
  lastScannedMsgId: 0,
  syncProgress: null,
  coverJobs: {},
});

const readMetadata = async () => {
  try {
    await ensureDirs();
    const data = await fs.readFile(MUSIC_METADATA_PATH, 'utf-8');
    const parsed = JSON.parse(data);
    return {
      ...defaultMetadata(),
      ...parsed,
      albums: Array.isArray(parsed.albums) ? parsed.albums : [],
      coverJobs: parsed.coverJobs && typeof parsed.coverJobs === 'object' ? parsed.coverJobs : {},
    };
  } catch {
    return defaultMetadata();
  }
};

const writeMetadata = async (metadata) => {
  await ensureDirs();
  await fs.writeFile(MUSIC_METADATA_PATH, JSON.stringify(metadata, null, 2));
};

const createAlbumId = (albumTitle) => `album_${Buffer.from(albumTitle).toString('base64url').slice(0, 18)}`;
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const isPrivateIp = (host) => {
  if (!isIP(host)) return false;
  if (host === '127.0.0.1' || host === '::1') return true;
  if (host.startsWith('10.') || host.startsWith('192.168.') || host.startsWith('169.254.')) return true;
  if (/^172\.(1[6-9]|2\d|3[01])\./.test(host)) return true;
  if (host.startsWith('fc') || host.startsWith('fd') || host.startsWith('fe80:')) return true;
  return false;
};

const isAllowedRemoteUrl = (urlString) => {
  try {
    const parsed = new URL(urlString);
    if (parsed.protocol !== 'https:') return false;
    const host = (parsed.hostname || '').toLowerCase();
    if (!host || host === 'localhost' || host.endsWith('.local')) return false;
    if (isPrivateIp(host)) return false;
    return true;
  } catch {
    return false;
  }
};

const requireTrustedOrigin = (req, res, next) => {
  const origin = req.get('origin');
  const referer = req.get('referer');

  if (origin && TRUSTED_ORIGINS.has(origin)) {
    return next();
  }
  if (!origin && typeof referer === 'string' && TRUSTED_REFERER_PREFIXES.some((prefix) => referer.startsWith(prefix))) {
    return next();
  }

  return res.status(403).json({ error: 'Forbidden' });
};

const extractCoverOutputUrl = (taskData) => {
  const directUrl =
    taskData?.output?.url ||
    taskData?.output?.image_url ||
    taskData?.result?.url ||
    taskData?.result?.image_url;
  if (directUrl) return directUrl;

  if (!taskData?.resultJson || typeof taskData.resultJson !== 'string') return null;
  try {
    const parsed = JSON.parse(taskData.resultJson);
    return (
      parsed?.output?.url ||
      parsed?.output?.image_url ||
      parsed?.result?.url ||
      parsed?.result?.image_url ||
      parsed?.resultUrls?.[0] ||
      null
    );
  } catch {
    return null;
  }
};

const stripAudioExtension = (name) =>
  name.replace(/\.(mp3|ogg|oga|opus|m4a|flac|wav|aac)$/i, '');

const parseTrackAndAlbum = (audio) => {
  const rawTitle = stripAudioExtension(
    (audio.title || audio.file_name || 'Unknown Track').trim(),
  );
  const performer = (audio.performer || 'AI Generated').trim();

  if (rawTitle.includes(' - ')) {
    const parts = rawTitle.split(' - ');
    if (parts.length >= 2) {
      return {
        albumTitle: parts[0].trim() || 'Neuro Music Collection',
        trackTitle: parts.slice(1).join(' - ').trim() || rawTitle,
        artist: performer,
      };
    }
  }

  return {
    albumTitle: 'Neuro Music Collection',
    trackTitle: rawTitle,
    artist: performer,
  };
};

const shouldIncludePost = (post, channelUsername) => {
  if (!post || !post.chat) return false;
  if (post.chat.type !== 'channel') return false;
  const username = (post.chat.username || '').toLowerCase();
  return username === (channelUsername || '').toLowerCase();
};

const upsertTrackFromAudio = ({ audio, messageId, timestamp, albumsById, seenUniqueIds }) => {
  const uniqueId = audio?.file_unique_id;
  if (!uniqueId || seenUniqueIds.has(uniqueId)) {
    return false;
  }

  const parsed = parseTrackAndAlbum(audio);
  const albumId = createAlbumId(parsed.albumTitle);
  if (!albumsById.has(albumId)) {
    albumsById.set(albumId, {
      id: albumId,
      title: parsed.albumTitle,
      artist: parsed.artist,
      coverUrl: null,
      coverGenerated: false,
      trackCount: 0,
      tracks: [],
      createdAt: new Date((timestamp || Date.now() / 1000) * 1000).toISOString(),
    });
  }

  const album = albumsById.get(albumId);
  album.tracks.unshift({
    id: `track_${uniqueId}`,
    title: parsed.trackTitle,
    artist: parsed.artist,
    albumId,
    duration: audio.duration || 180,
    audioUrl: `/api/music/file/${audio.file_id}`,
    telegramFileId: audio.file_id,
    fileUniqueId: uniqueId,
    telegramPostId: messageId,
    createdAt: new Date((timestamp || Date.now() / 1000) * 1000).toISOString(),
  });
  album.trackCount = album.tracks.length;
  seenUniqueIds.add(uniqueId);
  return true;
};

const forwardMessageForInspection = async ({ token, chatId, messageId }) => {
  const response = await fetch(
    `https://api.telegram.org/bot${token}/forwardMessage?chat_id=${encodeURIComponent(chatId)}&from_chat_id=${encodeURIComponent(chatId)}&message_id=${messageId}&disable_notification=true`,
  );
  const data = await response.json();
  if (!data?.ok || !data.result) {
    return null;
  }

  // We forward to the same channel to gain full payload of the original message.
  // The forwarded copy must be deleted immediately to keep the channel clean.
  const forwardedMessage = data.result;
  if (forwardedMessage.message_id) {
    await fetch(
      `https://api.telegram.org/bot${token}/deleteMessage?chat_id=${encodeURIComponent(chatId)}&message_id=${forwardedMessage.message_id}`,
    ).catch(() => {});
  }
  return forwardedMessage;
};

const startCoverJob = async (album, metadata, kieApiKey) => {
  if (album.coverUrl || metadata.coverJobs?.[album.id]?.status === 'processing') {
    return false;
  }

  if (!kieApiKey) {
    metadata.coverJobs[album.id] = {
      status: 'error',
      updatedAt: new Date().toISOString(),
      reason: 'missing_kie_api_key',
    };
    return false;
  }

  const coverPrompt = `Abstract album cover art for "${album.title}" — AI-generated electronic neuro music album. Futuristic cinematic design with vibrant neon colors, deep space or cyberpunk atmosphere, glowing neural network patterns, premium quality, no text, square format`;
  const response = await fetch('https://api.kie.ai/api/v1/jobs/createTask', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${kieApiKey}`,
    },
    body: JSON.stringify({
      model: 'nano-banana-pro',
      input: {
        prompt: coverPrompt,
        aspect_ratio: '1:1',
        resolution: '1K',
        output_format: 'jpg',
      },
    }),
  });

  if (!response.ok) {
    metadata.coverJobs[album.id] = {
      status: 'error',
      updatedAt: new Date().toISOString(),
      reason: `kie_http_${response.status}`,
    };
    return false;
  }

  const result = await response.json();
  if (result?.data?.taskId) {
    metadata.coverJobs[album.id] = {
      taskId: result.data.taskId,
      status: 'processing',
      model: 'nano_banana_pro',
      updatedAt: new Date().toISOString(),
    };
    return true;
  }

  metadata.coverJobs[album.id] = {
    status: 'error',
    updatedAt: new Date().toISOString(),
    reason: result?.msg || 'nano_banana_pro_create_task_failed',
  };
  return false;
};

const compressJpeg = async (inputPath, outputPath, maxBytes = 51200) => {
  const { execFile } = await import('child_process');
  const { promisify } = await import('util');
  const execFileAsync = promisify(execFile);
  try {
    // ImageMagick convert with jpeg:extent for precise size limit
    await execFileAsync('convert', [
      inputPath,
      '-strip',
      '-define', `jpeg:extent=${Math.floor(maxBytes / 1024)}kb`,
      outputPath,
    ]);
    return true;
  } catch {
    // Fallback: try jpegoptim in-place
    try {
      await fs.copyFile(inputPath, outputPath);
      await execFileAsync('jpegoptim', [
        `--size=${Math.floor(maxBytes / 1024)}k`,
        '--strip-all',
        outputPath,
      ]);
      return true;
    } catch {
      return false;
    }
  }
};

const resolveCoverJobs = async (metadata, kieApiKey) => {
  if (!kieApiKey || !metadata.coverJobs) return;

  const entries = Object.entries(metadata.coverJobs);
  for (const [albumId, job] of entries) {
    if (!job || job.status !== 'processing' || !job.taskId) continue;

    try {
      const response = await fetch(`https://api.kie.ai/api/v1/jobs/recordInfo?taskId=${job.taskId}`, {
        headers: {
          Authorization: `Bearer ${kieApiKey}`,
        },
      });
      const result = await response.json();

      if (!result?.data) {
        continue;
      }

      const taskData = result.data;
      const taskState = String(taskData.status || taskData.state || '')
        .trim()
        .toUpperCase();

      if (['PROCESSING', 'WAITING', 'PENDING', 'RUNNING'].includes(taskState)) {
        continue;
      }

      if (['SUCCESS', 'COMPLETED', 'DONE'].includes(taskState)) {
        const outputUrl = extractCoverOutputUrl(taskData);
        if (!outputUrl) {
          metadata.coverJobs[albumId] = {
            ...job,
            status: 'error',
            updatedAt: new Date().toISOString(),
            reason: 'missing_output_url',
          };
          continue;
        }

        if (!isAllowedRemoteUrl(outputUrl)) {
          metadata.coverJobs[albumId] = {
            ...job,
            status: 'error',
            updatedAt: new Date().toISOString(),
            reason: 'disallowed_output_url',
          };
          continue;
        }

        const imageResponse = await fetch(outputUrl, {
          headers: { 'User-Agent': 'Mozilla/5.0 TecAI-CoverBot/1.0' },
        });
        if (!imageResponse.ok) {
          metadata.coverJobs[albumId] = {
            ...job,
            status: 'error',
            updatedAt: new Date().toISOString(),
            reason: `download_failed_${imageResponse.status}`,
          };
          continue;
        }

        const imageBuffer = await imageResponse.arrayBuffer();
        const tmpRawPath = path.join(COVERS_DIR, `${albumId}-${job.taskId}.tmp.jpg`);
        const finalFilename = `${albumId}-cover.jpg`;
        const finalPath = path.join(COVERS_DIR, finalFilename);

        await fs.writeFile(tmpRawPath, Buffer.from(imageBuffer));

        const compressed = await compressJpeg(tmpRawPath, finalPath, 51200);
        if (!compressed) {
          // If compression tools unavailable, keep original
          await fs.rename(tmpRawPath, finalPath).catch(() => {});
        } else {
          await fs.unlink(tmpRawPath).catch(() => {});
        }

        const album = metadata.albums.find((item) => item.id === albumId);
        if (album) {
          album.coverUrl = `/api/music/cover-file/${finalFilename}`;
          album.coverGenerated = true;
        }

        metadata.coverJobs[albumId] = {
          ...job,
          status: 'success',
          updatedAt: new Date().toISOString(),
          filename: finalFilename,
          model: 'nano_banana_pro',
        };
      } else {
        metadata.coverJobs[albumId] = {
          ...job,
          status: 'error',
          updatedAt: new Date().toISOString(),
          reason: taskData.failMsg || taskState || 'unknown',
        };
      }
    } catch (error) {
      metadata.coverJobs[albumId] = {
        ...job,
        status: 'error',
        updatedAt: new Date().toISOString(),
        reason: error?.message || 'unexpected_error',
      };
    }
  }
};

const resolveCoverJobsWithRetries = async (metadata, kieApiKey, retries = 4, delayMs = 2000) => {
  if (!kieApiKey) return;
  for (let i = 0; i < retries; i += 1) {
    await resolveCoverJobs(metadata, kieApiKey);
    const hasProcessing = Object.values(metadata.coverJobs || {}).some(
      (job) => job?.status === 'processing',
    );
    if (!hasProcessing) {
      return;
    }
    await sleep(delayMs);
  }
};

export const setupMusicRoutes = (app) => {
  app.get('/api/music/albums', musicReadLimiter, async (req, res) => {
    try {
      const metadata = await readMetadata();
      res.json(metadata);
    } catch (error) {
      res.status(500).json({ error: 'Failed to read music metadata' });
    }
  });

  app.get('/api/music/sync-status', musicReadLimiter, async (req, res) => {
    try {
      const metadata = await readMetadata();
      res.json({
        syncStatus: metadata.syncStatus,
        lastSync: metadata.lastSync,
        totalTracks: metadata.totalTracks,
        totalAlbums: metadata.albums.length,
        lastScannedMsgId: Number(metadata.lastScannedMsgId || 0),
        syncProgress: metadata.syncProgress || null,
      });
    } catch {
      res.status(500).json({ error: 'Failed to read sync status' });
    }
  });

  app.post('/api/music/sync', requireTrustedOrigin, musicSyncLimiter, async (req, res) => {
    const token = process.env.TELEGRAM_MUSIC_BOT_TOKEN || process.env.TELEGRAM_BOT_TOKEN;
    const kieApiKey = process.env.KIE_AI_API_KEY;

    if (!token) {
      return res.status(500).json({ error: 'Telegram bot token not configured' });
    }

    const metadata = await readMetadata();
    metadata.syncStatus = 'syncing';
    metadata.syncProgress = 'initializing';
    await writeMetadata(metadata);

    try {
      const channelUsername = metadata.channelUsername || DEFAULT_CHANNEL_USERNAME;
      const seenUniqueIds = new Set(
        metadata.albums.flatMap((album) =>
          album.tracks.map((track) => track.fileUniqueId).filter(Boolean),
        ),
      );

      const albumsById = new Map(metadata.albums.map((album) => [album.id, album]));
      const channelChatResponse = await fetch(
        `https://api.telegram.org/bot${token}/getChat?chat_id=@${encodeURIComponent(channelUsername)}`,
      );
      const channelChatData = await channelChatResponse.json();
      if (!channelChatData?.ok || !channelChatData?.result?.id) {
        throw new Error(channelChatData?.description || 'Failed to read channel chat info');
      }

      const channelChatId = channelChatData.result.id;
      const pinned = channelChatData?.result?.pinned_message;
      const pinnedMessageId = Number(pinned?.message_id || 0);
      const lastScanned = Number(metadata.lastScannedMsgId || 0);
      const firstScan = lastScanned <= 0;
      const startMsgId = Math.max(firstScan ? 1 : lastScanned + 1, 1);
      const firstScanEnd = pinnedMessageId > 0 ? pinnedMessageId + 50 : startMsgId + 250;
      const incrementalEnd = Math.max(startMsgId + 100, pinnedMessageId + 50);
      const endMsgId = Math.max(startMsgId, firstScan ? firstScanEnd : incrementalEnd);
      const totalToScan = Math.max(0, endMsgId - startMsgId + 1);

      for (let messageId = startMsgId; messageId <= endMsgId; messageId += 1) {
        metadata.syncProgress = `scanning ${messageId - startMsgId + 1}/${totalToScan}`;
        metadata.lastScannedMsgId = messageId;
        if (messageId === startMsgId || messageId % 15 === 0 || messageId === endMsgId) {
          await writeMetadata(metadata);
        }

        const forwardedMessage = await forwardMessageForInspection({
          token,
          chatId: channelChatId,
          messageId,
        });
        if (!forwardedMessage || !shouldIncludePost(forwardedMessage, channelUsername)) {
          await sleep(50);
          continue;
        }

        if (forwardedMessage.audio) {
          upsertTrackFromAudio({
            audio: forwardedMessage.audio,
            messageId,
            timestamp: forwardedMessage.forward_date || forwardedMessage.date,
            albumsById,
            seenUniqueIds,
          });
        }
        await sleep(50);
      }

      // Fallback: also ingest pinned message audio from channel chat state,
      // because it may exist without a fresh channel_post update event.
      try {
        const pinnedAudio = pinned?.audio;

        if (pinnedAudio?.file_unique_id) {
          upsertTrackFromAudio({
            audio: pinnedAudio,
            messageId: pinned?.message_id || 0,
            timestamp: pinned?.date || Date.now() / 1000,
            albumsById,
            seenUniqueIds,
          });
        }
      } catch (pinnedError) {
        // Non-fatal fallback path
      }

      metadata.albums = Array.from(albumsById.values())
        .map((album) => ({
          ...album,
          tracks: [...album.tracks].sort(
            (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          ),
          trackCount: album.tracks.length,
        }))
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

      metadata.totalTracks = metadata.albums.reduce((acc, album) => acc + album.tracks.length, 0);

      // Start cover generation for any album that still has no cover.
      for (const album of metadata.albums) {
        if (!album.coverUrl) {
          await startCoverJob(album, metadata, kieApiKey);
        }
      }

      await resolveCoverJobsWithRetries(metadata, kieApiKey);

      metadata.lastSync = new Date().toISOString();
      metadata.syncStatus = 'success';
      metadata.syncProgress = null;
      await writeMetadata(metadata);

      res.json(metadata);
    } catch (error) {
      metadata.syncStatus = 'error';
      metadata.lastSync = new Date().toISOString();
      metadata.syncProgress = null;
      await writeMetadata(metadata);
      res.status(500).json({ error: 'Sync failed' });
    }
  });

  app.get('/api/music/file/:fileId', musicReadLimiter, async (req, res) => {
    try {
      const { fileId } = req.params;
      if (!FILE_ID_RE.test(fileId)) {
        return res.status(400).json({ error: 'Invalid "fileId".' });
      }
      const token = process.env.TELEGRAM_MUSIC_BOT_TOKEN || process.env.TELEGRAM_BOT_TOKEN;
      if (!token) {
        return res.status(500).json({ error: 'Telegram bot token not configured' });
      }

      const filePathResponse = await fetch(
        `https://api.telegram.org/bot${token}/getFile?file_id=${encodeURIComponent(fileId)}`,
      );
      const filePathData = await filePathResponse.json();
      if (!filePathData?.ok || !filePathData?.result?.file_path) {
        return res.status(404).json({ error: 'File not found' });
      }

      const fileUrl = `https://api.telegram.org/file/bot${token}/${filePathData.result.file_path}`;
      const fileResponse = await fetch(fileUrl);
      if (!fileResponse.ok || !fileResponse.body) {
        return res.status(fileResponse.status || 502).json({ error: 'Failed to fetch file' });
      }

      const telegramContentType = fileResponse.headers.get('content-type') || '';
      const contentType =
        telegramContentType.startsWith('audio/')
          ? telegramContentType
          : guessAudioMime(filePathData.result.file_path);
      const contentLength = fileResponse.headers.get('content-length');
      // Override helmet's restrictive headers for media streaming
      res.removeHeader('Content-Security-Policy');
      res.removeHeader('Cross-Origin-Resource-Policy');
      res.removeHeader('Cross-Origin-Opener-Policy');
      res.setHeader('Content-Type', contentType);
      res.setHeader('Accept-Ranges', 'bytes');
      res.setHeader('Cache-Control', 'public, max-age=86400');
      res.setHeader('Cross-Origin-Resource-Policy', 'same-site');
      if (contentLength) {
        res.setHeader('Content-Length', contentLength);
      }

      const reader = fileResponse.body.getReader();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        res.write(Buffer.from(value));
      }
      res.end();
    } catch (error) {
      res.status(500).json({ error: 'Failed to serve audio file' });
    }
  });

  app.get('/api/music/cover-file/:filename', musicReadLimiter, async (req, res) => {
    try {
      const filename = path.basename(req.params.filename);
      if (!SAFE_FILENAME_RE.test(filename)) {
        return res.status(400).json({ error: 'Invalid filename' });
      }
      const filepath = path.join(COVERS_DIR, filename);
      const file = await fs.readFile(filepath);
      const ext = path.extname(filename).toLowerCase();
      const mimeMap = { '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.png': 'image/png' };
      const contentType = mimeMap[ext] || 'image/jpeg';
      res.removeHeader('Content-Security-Policy');
      res.removeHeader('Cross-Origin-Resource-Policy');
      res.setHeader('Content-Type', contentType);
      res.setHeader('Cache-Control', 'public, max-age=604800, immutable');
      res.setHeader('Cross-Origin-Resource-Policy', 'same-site');
      res.send(file);
    } catch {
      res.status(404).json({ error: 'Cover not found' });
    }
  });

  app.post('/api/music/cover/:albumId', requireTrustedOrigin, coverLimiter, async (req, res) => {
    try {
      const { albumId } = req.params;
      if (!ALBUM_ID_RE.test(albumId)) {
        return res.status(400).json({ error: 'Invalid "albumId".' });
      }
      const { prompt } = req.body || {};
      const kieApiKey = process.env.KIE_AI_API_KEY;
      if (!kieApiKey) {
        return res.status(500).json({ error: 'KIE AI key not configured (nano-banana-pro)' });
      }

      const metadata = await readMetadata();
      const album = metadata.albums.find((item) => item.id === albumId);
      if (!album) {
        return res.status(404).json({ error: 'Album not found' });
      }

      // Allow regeneration: clear existing cover so startCoverJob proceeds
      album.coverUrl = null;
      album.coverGenerated = false;
      delete metadata.coverJobs[albumId];

      await startCoverJob(
        {
          ...album,
          title: prompt ? `${album.title} — ${prompt}` : album.title,
        },
        metadata,
        kieApiKey,
      );
      await writeMetadata(metadata);
      res.json({ status: 'processing', model: 'nano_banana_pro', job: metadata.coverJobs[album.id] || null });
    } catch (error) {
      res.status(500).json({ error: 'Failed to start cover generation (nano-banana-pro)' });
    }
  });

  app.get('/api/music/cover-status/:taskId', musicReadLimiter, async (req, res) => {
    try {
      const { taskId } = req.params;
      if (!TASK_ID_RE.test(taskId)) {
        return res.status(400).json({ error: 'Invalid "taskId".' });
      }
      const metadata = await readMetadata();
      const jobEntry = Object.entries(metadata.coverJobs || {}).find(
        ([, job]) => job?.taskId === taskId,
      );
      if (!jobEntry) {
        return res.status(404).json({ error: 'Cover job not found' });
      }

      const [albumId, job] = jobEntry;
      const album = metadata.albums.find((item) => item.id === albumId);
      res.json({
        status: job.status,
        albumId,
        coverUrl: album?.coverUrl || null,
        updatedAt: job.updatedAt,
        reason: job.reason || null,
      });
    } catch {
      res.status(500).json({ error: 'Failed to read cover job status' });
    }
  });
};
