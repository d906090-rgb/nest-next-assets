import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Clapperboard, Pause, Play, SkipBack, SkipForward, Clock3 } from 'lucide-react';

export interface VideoItem {
  id: string;
  title: string;
  description?: string;
  duration: number;
  videoUrl: string;
  posterUrl?: string;
}

interface VideoPlayerProps {
  lang: 'en' | 'ru';
  videos: VideoItem[];
}

const formatTime = (seconds: number): string => {
  if (!Number.isFinite(seconds) || seconds <= 0) return '--:--';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const VideoPlayer: React.FC<VideoPlayerProps> = ({ lang, videos }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [loadedVideoIds, setLoadedVideoIds] = useState<Set<string>>(new Set());
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const t = useMemo(
    () => ({
      demo: lang === 'ru' ? 'Демонстрация возможностей' : 'Capabilities Demo',
      playlist: lang === 'ru' ? 'Плейлист роликов' : 'Video Playlist',
      noVideos: lang === 'ru' ? 'Добавьте ролики для демонстрации' : 'Add videos to start demo',
      selectVideo: lang === 'ru' ? 'Выберите ролик' : 'Select a video',
      previous: lang === 'ru' ? 'Предыдущий' : 'Previous',
      next: lang === 'ru' ? 'Следующий' : 'Next',
      play: lang === 'ru' ? 'Воспроизвести' : 'Play',
      pause: lang === 'ru' ? 'Пауза' : 'Pause',
      clip: lang === 'ru' ? 'Ролик' : 'Clip',
      duration: lang === 'ru' ? 'Длительность' : 'Duration',
      loadVideo: lang === 'ru' ? 'Нажмите Play, чтобы загрузить видео' : 'Press Play to load the video',
      ready: lang === 'ru' ? 'Готово к просмотру' : 'Ready to watch',
      loading: lang === 'ru' ? 'Загрузка видео...' : 'Loading video...',
    }),
    [lang],
  );

  const currentVideo = videos[activeIndex] ?? null;
  const isCurrentLoaded = currentVideo ? loadedVideoIds.has(currentVideo.id) : false;

  const playCurrent = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    setIsBuffering(true);
    video.play().catch((error) => {
      setIsBuffering(false);
      console.error('Video play failed:', error);
    });
  }, []);

  const pauseCurrent = useCallback(() => {
    setIsBuffering(false);
    videoRef.current?.pause();
  }, []);

  const videoRefCallback = useCallback((element: HTMLVideoElement | null) => {
    videoRef.current = element;
    if (element && isCurrentLoaded && isPlaying) {
      setIsBuffering(true);
      element.load();
      element.play().catch((error) => {
        setIsBuffering(false);
        console.error('Video autoplay failed:', error);
      });
    }
  }, [isCurrentLoaded, isPlaying]);

  const selectVideo = useCallback(
    (index: number) => {
      const boundedIndex = Math.min(Math.max(index, 0), Math.max(videos.length - 1, 0));
      setActiveIndex(boundedIndex);
      setIsPlaying(false);
      setIsBuffering(false);
      setCurrentTime(0);
    },
    [videos.length],
  );

  const handlePrevious = useCallback(() => {
    if (!videos.length) return;
    const nextIndex = activeIndex === 0 ? videos.length - 1 : activeIndex - 1;
    selectVideo(nextIndex);
  }, [activeIndex, selectVideo, videos.length]);

  const handleNext = useCallback(() => {
    if (!videos.length) return;
    const nextIndex = activeIndex === videos.length - 1 ? 0 : activeIndex + 1;
    selectVideo(nextIndex);
  }, [activeIndex, selectVideo, videos.length]);

  const togglePlay = useCallback(() => {
    if (!currentVideo) return;
    if (!isCurrentLoaded) {
      setLoadedVideoIds((prev) => new Set(prev).add(currentVideo.id));
      setIsBuffering(true);
      setIsPlaying(true);
      return;
    }
    if (isPlaying) {
      pauseCurrent();
      return;
    }
    playCurrent();
  }, [currentVideo, isCurrentLoaded, isPlaying, pauseCurrent, playCurrent]);

  const handleLoadedMetadata = useCallback((event: React.SyntheticEvent<HTMLVideoElement>) => {
    setDuration(event.currentTarget.duration || currentVideo?.duration || 0);
  }, [currentVideo?.duration]);

  useEffect(() => {
    setDuration(currentVideo?.duration ?? 0);
    setCurrentTime(0);
  }, [currentVideo]);

  if (!videos.length) {
    return (
      <div className="bg-linear-to-b from-[#101A2F] via-[#0E172A] to-black rounded-xl border border-white/10 p-8 text-center">
        <p className="text-gray-300">{t.noVideos}</p>
      </div>
    );
  }

  return (
    <div className="bg-linear-to-b from-[#101A2F] via-[#0E172A] to-black rounded-xl overflow-hidden shadow-2xl border border-white/10">
      <div className="flex flex-col lg:flex-row lg:max-h-[80vh]">
        <aside className="lg:w-80 bg-black/70 border-b lg:border-b-0 lg:border-r border-white/10 p-4 md:p-5 lg:overflow-y-auto">
          <div className="flex items-center gap-3 mb-5">
            <Clapperboard className="w-7 h-7 text-[#00F0FF]" />
            <div>
              <p className="text-xs uppercase text-gray-400">{t.demo}</p>
              <p className="text-white font-semibold">{t.playlist}</p>
            </div>
          </div>

          <div className="space-y-2 max-h-[360px] lg:max-h-[470px] overflow-y-auto pr-1">
            {videos.map((video, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={video.id}
                  onClick={() => selectVideo(index)}
                  className={`w-full text-left rounded-xl border transition-colors p-3 ${
                    isActive
                      ? 'border-[#00F0FF]/60 bg-[#00F0FF]/10'
                      : 'border-white/10 bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <p className="text-white font-medium truncate">{video.title}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                    <Clock3 className="w-3.5 h-3.5" />
                    <span>{formatTime(video.duration)}</span>
                  </div>
                  <p className="text-[11px] mt-1 text-gray-500">
                    {loadedVideoIds.has(video.id) ? t.ready : t.loadVideo}
                  </p>
                  {video.description ? (
                    <p className="text-sm text-gray-400 mt-2 line-clamp-2">{video.description}</p>
                  ) : null}
                </button>
              );
            })}
          </div>
        </aside>

        <div className="flex-1 p-4 md:p-6 flex flex-col">
          <div className="mb-4">
            <p className="text-xs uppercase tracking-wide text-gray-400">{t.clip}</p>
            <h3 className="text-xl md:text-2xl font-semibold text-white">{currentVideo?.title ?? t.selectVideo}</h3>
            {currentVideo?.description ? (
              <p className="text-gray-400 mt-1">{currentVideo.description}</p>
            ) : null}
          </div>

          <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black mb-4 w-full h-[280px] sm:h-[320px] md:h-[400px] lg:h-[450px]">
            {isCurrentLoaded ? (
              <video
                ref={videoRefCallback}
                className="absolute inset-0 w-full h-full object-contain bg-black"
                controls
                preload="metadata"
                playsInline
                poster={currentVideo?.posterUrl}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onWaiting={() => setIsBuffering(true)}
                onCanPlay={() => setIsBuffering(false)}
                onPlaying={() => setIsBuffering(false)}
                onEnded={handleNext}
                onLoadedMetadata={handleLoadedMetadata}
                onLoadedData={() => setIsBuffering(false)}
                onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
              >
                {currentVideo ? <source src={currentVideo.videoUrl} type="video/mp4" /> : null}
              </video>
            ) : (
              <>
                {currentVideo?.posterUrl ? (
                  <img
                    src={currentVideo.posterUrl}
                    alt={currentVideo.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="absolute inset-0 bg-linear-to-br from-[#0E1A31] via-[#0A1326] to-black" />
                )}
                <div className="absolute inset-0 bg-black/45 flex flex-col items-center justify-center text-center px-4">
                  <button
                    onClick={togglePlay}
                    className="w-14 h-14 bg-white rounded-full flex items-center justify-center hover:scale-105 transition-transform"
                    aria-label={t.play}
                  >
                    <Play className="w-6 h-6 text-black fill-current ml-0.5" />
                  </button>
                  <p className="mt-4 text-white font-medium">{t.loadVideo}</p>
                </div>
              </>
            )}
            {isCurrentLoaded && isBuffering ? (
              <div className="absolute inset-0 bg-black/45 flex flex-col items-center justify-center pointer-events-none z-10">
                <div className="w-10 h-10 rounded-full border-2 border-white/30 border-t-[#00F0FF] animate-spin" />
                <p className="mt-3 text-sm text-white">{t.loading}</p>
              </div>
            ) : null}
          </div>

          <div className="mt-auto">
            <div className="flex items-center gap-2 w-full mb-4">
              <span className="text-gray-400 text-xs w-10 text-right">{formatTime(currentTime)}</span>
              <input
                type="range"
                min="0"
                max={duration || 0}
                value={Math.min(currentTime, duration || currentTime)}
                disabled={!isCurrentLoaded}
                onChange={(event) => {
                  const time = parseFloat(event.target.value);
                  setCurrentTime(time);
                  if (videoRef.current) {
                    videoRef.current.currentTime = time;
                  }
                }}
                className="flex-1 h-1 bg-zinc-600 rounded-lg appearance-none cursor-pointer accent-[#00F0FF]"
              />
              <span className="text-gray-400 text-xs w-10">{formatTime(duration || 0)}</span>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="text-xs text-gray-400">
                {t.duration}: <span className="text-[#00F0FF]">{formatTime(currentVideo?.duration ?? duration ?? 0)}</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrevious}
                  className="text-zinc-300 hover:text-white transition-colors"
                  aria-label={t.previous}
                >
                  <SkipBack className="w-5 h-5" />
                </button>
                <button
                  onClick={togglePlay}
                  className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:scale-105 transition-transform"
                  aria-label={isPlaying ? t.pause : t.play}
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5 text-black fill-current" />
                  ) : (
                    <Play className="w-5 h-5 text-black fill-current ml-0.5" />
                  )}
                </button>
                <button
                  onClick={handleNext}
                  className="text-zinc-300 hover:text-white transition-colors"
                  aria-label={t.next}
                >
                  <SkipForward className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
