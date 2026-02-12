import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Shuffle,
  Repeat,
  Heart,
  Music,
  Disc,
  Clock,
  RefreshCw,
} from 'lucide-react';

interface Track {
  id: string;
  title: string;
  artist: string;
  albumId: string;
  duration: number;
  audioUrl: string;
  telegramPostId?: number;
  createdAt: string;
}

interface Album {
  id: string;
  title: string;
  artist: string;
  coverUrl: string | null;
  coverGenerated: boolean;
  trackCount: number;
  tracks: Track[];
  createdAt: string;
}

interface MusicMetadata {
  albums: Album[];
  lastSync: string | null;
  syncStatus: 'never' | 'syncing' | 'success' | 'error';
  channelUsername: string;
  totalTracks: number;
  coverJobs?: Record<
    string,
    {
      taskId?: string;
      status?: 'processing' | 'success' | 'error';
      updatedAt?: string;
      reason?: string | null;
    }
  >;
}

const LIKED_TRACKS_KEY = 'neuro-music-liked-tracks';

const loadLikedTracks = (): Set<string> => {
  try {
    const raw = localStorage.getItem(LIKED_TRACKS_KEY);
    if (raw) return new Set(JSON.parse(raw));
  } catch { /* ignore corrupt data */ }
  return new Set();
};

const saveLikedTracks = (set: Set<string>) => {
  try {
    localStorage.setItem(LIKED_TRACKS_KEY, JSON.stringify([...set]));
  } catch { /* storage full or unavailable */ }
};

interface SpotifyPlayerProps {
  lang: 'en' | 'ru';
}

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const SpotifyPlayer: React.FC<SpotifyPlayerProps> = ({ lang }) => {
  const [metadata, setMetadata] = useState<MusicMetadata | null>(null);
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState<'off' | 'all' | 'one'>('off');
  const [likedTracks, setLikedTracks] = useState<Set<string>>(loadLikedTracks);
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const handleNextRef = useRef<() => void>(() => {});
  const audioListenersAttached = useRef(false);

  const applyMetadata = useCallback((data: MusicMetadata) => {
    setMetadata(data);

    setSelectedAlbum((previousAlbum) => {
      if (!data.albums.length) {
        return null;
      }

      if (previousAlbum) {
        const updatedAlbum = data.albums.find((album) => album.id === previousAlbum.id);
        if (updatedAlbum) return updatedAlbum;
      }

      return data.albums[0];
    });

    setCurrentTrack((previousTrack) => {
      if (!previousTrack) return previousTrack;
      const album = data.albums.find((item) => item.id === previousTrack.albumId);
      if (!album) return null;
      return album.tracks.find((track) => track.id === previousTrack.id) || null;
    });
  }, []);

  const loadMetadata = useCallback(async () => {
    const response = await fetch('/api/music/albums');
    if (!response.ok) {
      throw new Error(`Failed to load metadata: ${response.status}`);
    }
    const data = (await response.json()) as MusicMetadata;
    applyMetadata(data);
    return data;
  }, [applyMetadata]);

  // Load music metadata
  useEffect(() => {
    const init = async () => {
      try {
        await loadMetadata();
      } catch (error) {
        console.error('Failed to load music metadata:', error);
      } finally {
        setIsLoading(false);
      }
    };
    init();
  }, [loadMetadata]);

  // Attach audio event listeners via callback ref (avoids timing issues with useEffect + useRef)
  const attachAudioListeners = useCallback((audio: HTMLAudioElement) => {
    if (audioListenersAttached.current) return;
    audioListenersAttached.current = true;

    audio.addEventListener('timeupdate', () => setCurrentTime(audio.currentTime));
    audio.addEventListener('loadedmetadata', () => setDuration(audio.duration));
    audio.addEventListener('ended', () => handleNextRef.current());
    audio.addEventListener('play', () => setIsPlaying(true));
    audio.addEventListener('pause', () => setIsPlaying(false));
  }, []);

  // Update volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const playTrack = useCallback((track: Track) => {
    setCurrentTrack(track);
    const audio = audioRef.current;
    if (audio) {
      audio.src = track.audioUrl;
      audio.load();
      audio.play().catch((err) => {
        console.error('playTrack play() failed:', err);
      });
    } else {
      console.error('playTrack: audioRef.current is null');
    }
  }, []);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;
    if (isPlaying) {
      audio.pause();
    } else {
      // If src not set yet (e.g. page just loaded), set it
      if (!audio.src || audio.src === window.location.href) {
        audio.src = currentTrack.audioUrl;
        audio.load();
      }
      audio.play().catch((err) => {
        console.error('togglePlay play() failed:', err);
      });
    }
  }, [isPlaying, currentTrack]);

  const handlePrevious = useCallback(() => {
    if (!selectedAlbum || !currentTrack) return;
    const currentIndex = selectedAlbum.tracks.findIndex(t => t.id === currentTrack.id);
    if (currentIndex > 0) {
      playTrack(selectedAlbum.tracks[currentIndex - 1]);
    } else if (currentTime > 3) {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
      }
    }
  }, [selectedAlbum, currentTrack, currentTime, playTrack]);

  const handleNext = useCallback(() => {
    if (!selectedAlbum) return;

    if (repeat === 'one' && currentTrack) {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(console.error);
      }
      return;
    }

    if (shuffle) {
      const randomIndex = Math.floor(Math.random() * selectedAlbum.tracks.length);
      playTrack(selectedAlbum.tracks[randomIndex]);
      return;
    }

    if (currentTrack) {
      const currentIndex = selectedAlbum.tracks.findIndex(t => t.id === currentTrack.id);
      if (currentIndex < selectedAlbum.tracks.length - 1) {
        playTrack(selectedAlbum.tracks[currentIndex + 1]);
      } else if (repeat === 'all') {
        playTrack(selectedAlbum.tracks[0]);
      }
    }
  }, [selectedAlbum, currentTrack, shuffle, repeat, playTrack]);

  // Keep ref always pointing to the latest handleNext
  useEffect(() => {
    handleNextRef.current = handleNext;
  }, [handleNext]);

  const handleSeek = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    const audio = audioRef.current;
    if (audio && audio.duration) {
      audio.currentTime = time;
    }
  }, []);

  const toggleLike = useCallback((trackId: string) => {
    setLikedTracks(prev => {
      const newSet = new Set(prev);
      if (newSet.has(trackId)) {
        newSet.delete(trackId);
      } else {
        newSet.add(trackId);
      }
      saveLikedTracks(newSet);
      return newSet;
    });
  }, []);

  const handleSync = async () => {
    setIsSyncing(true);
    try {
      const response = await fetch('/api/music/sync', { method: 'POST' });
      if (response.ok) {
        const data = (await response.json()) as MusicMetadata;
        applyMetadata(data);
      }
    } catch (error) {
      console.error('Sync failed:', error);
    } finally {
      setIsSyncing(false);
    }
  };

  // Auto-refresh metadata while cover generation is still processing.
  useEffect(() => {
    const hasProcessingCover = Object.values(metadata?.coverJobs || {}).some(
      (job) => job?.status === 'processing',
    );
    if (!hasProcessingCover) return;

    const timeoutId = setTimeout(async () => {
      try {
        await loadMetadata();
      } catch (error) {
        console.error('Failed to refresh cover status:', error);
      }
    }, 4000);

    return () => clearTimeout(timeoutId);
  }, [metadata, loadMetadata]);

  const t = {
    albums: lang === 'ru' ? 'Альбомы' : 'Albums',
    tracks: lang === 'ru' ? 'Треки' : 'Tracks',
    noAlbums: lang === 'ru' ? 'Альбомы не найдены' : 'No albums found',
    noTracks: lang === 'ru' ? 'Нет треков в этом альбоме' : 'No tracks in this album',
    syncWithTelegram: lang === 'ru' ? 'Синхронизировать с Telegram' : 'Sync with Telegram',
    syncing: lang === 'ru' ? 'Синхронизация...' : 'Syncing...',
    selectAlbum: lang === 'ru' ? 'Выберите альбом' : 'Select an album',
    totalTracks: lang === 'ru' ? 'всего треков' : 'total tracks',
    poweredBy: lang === 'ru' ? 'Музыка от нейросетей' : 'Music by AI',
    neuroMusic: lang === 'ru' ? 'Нейро Музыка' : 'Neuro Music',
    demo: lang === 'ru' ? 'Демонстрация возможностей' : 'Demo of capabilities',
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96 bg-linear-to-b from-[#0D1629] to-black rounded-xl">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00F0FF]"></div>
      </div>
    );
  }

  return (
    <div className="bg-linear-to-b from-[#101A2F] via-[#0E172A] to-black rounded-xl overflow-hidden shadow-2xl border border-white/10">
      {/* Hidden audio element */}
      <audio
        ref={(el) => {
          audioRef.current = el;
          if (el) attachAudioListeners(el);
        }}
        preload="metadata"
      />

      <div className="flex h-[600px]">
        {/* Sidebar - Albums */}
        <div className="w-64 bg-black p-4 flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            <Disc className="w-8 h-8 text-[#00F0FF]" />
            <span className="text-white font-bold text-lg">{t.neuroMusic}</span>
          </div>

          {/* Sync button */}
          <button
            onClick={handleSync}
            disabled={isSyncing}
            className="mb-4 flex items-center justify-center gap-2 bg-[#00F0FF] hover:bg-[#31F5FF] disabled:bg-[#006A73] text-black px-4 py-2 rounded-full text-sm font-semibold transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
            {isSyncing ? t.syncing : t.syncWithTelegram}
          </button>

          <h3 className="text-zinc-400 text-xs uppercase font-semibold mb-3">{t.albums}</h3>

          <div className="flex-1 overflow-y-auto space-y-2">
            {metadata?.albums.length === 0 ? (
              <p className="text-zinc-500 text-sm">{t.noAlbums}</p>
            ) : (
              metadata?.albums.map(album => (
                <button
                  key={album.id}
                  onClick={() => setSelectedAlbum(album)}
                  className={`w-full flex items-center gap-3 p-2 rounded-lg transition-colors ${
                    selectedAlbum?.id === album.id
                      ? 'bg-zinc-800'
                      : 'hover:bg-zinc-800/50'
                  }`}
                >
                  <div className="w-12 h-12 rounded bg-zinc-700 flex items-center justify-center overflow-hidden shrink-0">
                    {album.coverUrl ? (
                      <img
                        src={album.coverUrl}
                        alt={album.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Music className="w-6 h-6 text-zinc-400" />
                    )}
                  </div>
                  <div className="text-left overflow-hidden">
                    <p className="text-white text-sm font-medium truncate">{album.title}</p>
                    <p className="text-zinc-400 text-xs truncate">{album.trackCount} {lang === 'ru' ? 'треков' : 'tracks'}</p>
                  </div>
                </button>
              ))
            )}
          </div>

          <div className="mt-4 pt-4 border-t border-zinc-800">
            <p className="text-zinc-500 text-xs">{t.poweredBy}</p>
            <p className="text-zinc-400 text-sm font-medium">
              {metadata?.totalTracks || 0} {t.totalTracks}
            </p>
          </div>
        </div>

        {/* Main content - Track list */}
        <div className="flex-1 bg-linear-to-b from-[#16233D]/60 to-[#0C1424] flex flex-col">
          {/* Album header */}
          {selectedAlbum && (
            <div className="p-6 bg-linear-to-b from-zinc-700/30 to-transparent">
              <div className="flex items-end gap-6">
                <div className="w-48 h-48 rounded-lg shadow-2xl overflow-hidden bg-zinc-800 shrink-0">
                  {selectedAlbum.coverUrl ? (
                    <img
                      src={selectedAlbum.coverUrl}
                      alt={selectedAlbum.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Music className="w-16 h-16 text-zinc-600" />
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-zinc-300 text-xs uppercase font-semibold">
                    {lang === 'ru' ? 'Альбом' : 'Album'}
                  </p>
                  <h1 className="text-white text-4xl font-bold mt-2">{selectedAlbum.title}</h1>
                  <p className="text-zinc-400 mt-2">{selectedAlbum.artist}</p>
                  <p className="text-zinc-500 text-sm mt-1">
                    {selectedAlbum.trackCount} {lang === 'ru' ? 'треков' : 'tracks'}
                    {selectedAlbum.createdAt && ` • ${new Date(selectedAlbum.createdAt).getFullYear()}`}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Track list */}
          <div className="flex-1 overflow-y-auto p-6">
            {!selectedAlbum ? (
              <div className="flex flex-col items-center justify-center h-full text-zinc-400">
                <Disc className="w-16 h-16 mb-4" />
                <p>{t.selectAlbum}</p>
              </div>
            ) : selectedAlbum.tracks.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-zinc-400">
                <Music className="w-16 h-16 mb-4" />
                <p>{t.noTracks}</p>
              </div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="text-zinc-400 text-xs uppercase border-b border-zinc-800">
                    <th className="pb-3 text-left w-12">#</th>
                    <th className="pb-3 text-left">{lang === 'ru' ? 'Название' : 'Title'}</th>
                    <th className="pb-3 text-left hidden md:table-cell">{lang === 'ru' ? 'Альбом' : 'Album'}</th>
                    <th className="pb-3 text-right w-20">
                      <Clock className="w-4 h-4 inline" />
                    </th>
                    <th className="pb-3 w-12"></th>
                  </tr>
                </thead>
                <tbody>
                  {selectedAlbum.tracks.map((track, index) => {
                    const isActiveTrack = currentTrack?.id === track.id;
                    const isActiveAndPlaying = isActiveTrack && isPlaying;

                    return (
                    <tr
                      key={track.id}
                      onClick={() => {
                        if (isActiveAndPlaying) {
                          audioRef.current?.pause();
                        } else if (isActiveTrack) {
                          audioRef.current?.play().catch(console.error);
                        } else {
                          playTrack(track);
                        }
                      }}
                      className={`group cursor-pointer hover:bg-white/5 ${
                        isActiveTrack ? 'bg-white/10' : ''
                      }`}
                    >
                      <td className="py-3 text-zinc-400 group-hover:text-white">
                        {isActiveAndPlaying ? (
                          <>
                            <Pause className="w-4 h-4 fill-current text-[#00F0FF] group-hover:hidden" />
                            <Pause className="w-4 h-4 fill-current hidden group-hover:block" />
                          </>
                        ) : isActiveTrack ? (
                          <>
                            <Play className="w-4 h-4 fill-current text-[#00F0FF] group-hover:hidden" />
                            <Play className="w-4 h-4 fill-current hidden group-hover:block" />
                          </>
                        ) : (
                          <>
                            <span className="group-hover:hidden">{index + 1}</span>
                            <Play className="w-4 h-4 hidden group-hover:block fill-current" />
                          </>
                        )}
                      </td>
                      <td className="py-3">
                        <p className={`font-medium ${currentTrack?.id === track.id ? 'text-[#00F0FF]' : 'text-white'}`}>
                          {track.title}
                        </p>
                        <p className="text-zinc-400 text-sm">{track.artist}</p>
                      </td>
                      <td className="py-3 text-zinc-400 text-sm hidden md:table-cell">
                        {selectedAlbum.title}
                      </td>
                      <td className="py-3 text-zinc-400 text-sm text-right">
                        {formatTime(track.duration || 0)}
                      </td>
                      <td className="py-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleLike(track.id);
                          }}
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Heart
                            className={`w-4 h-4 ${
                              likedTracks.has(track.id)
                                ? 'fill-[#D4AF37] text-[#D4AF37]'
                                : 'text-zinc-400 hover:text-white'
                            }`}
                          />
                        </button>
                      </td>
                    </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* Player bar */}
      <div className="h-20 bg-zinc-900 border-t border-zinc-800 flex items-center px-4">
        {/* Track info */}
        <div className="flex items-center gap-3 w-64">
          {currentTrack ? (
            <>
              <div className="w-14 h-14 rounded bg-zinc-800 flex items-center justify-center overflow-hidden">
                {selectedAlbum?.coverUrl ? (
                  <img
                    src={selectedAlbum.coverUrl}
                    alt={currentTrack.title}
                    className={`w-full h-full object-cover ${isPlaying ? 'animate-pulse' : ''}`}
                  />
                ) : (
                  <Music className="w-6 h-6 text-zinc-400" />
                )}
              </div>
              <div className="overflow-hidden">
                <p className="text-white text-sm font-medium truncate">{currentTrack.title}</p>
                <p className="text-zinc-400 text-xs truncate">{currentTrack.artist}</p>
              </div>
            </>
          ) : (
            <div className="text-zinc-400 text-sm">
              {lang === 'ru' ? 'Выберите трек' : 'Select a track'}
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="flex-1 flex flex-col items-center">
          <div className="flex items-center gap-4 mb-2">
            <button
              onClick={() => setShuffle(!shuffle)}
              className={`transition-colors ${shuffle ? 'text-[#00F0FF]' : 'text-zinc-400 hover:text-white'}`}
            >
              <Shuffle className="w-4 h-4" />
            </button>
            <button
              onClick={handlePrevious}
              className="text-zinc-400 hover:text-white transition-colors"
            >
              <SkipBack className="w-5 h-5 fill-current" />
            </button>
            <button
              onClick={togglePlay}
              className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:scale-105 transition-transform"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 text-black fill-current" />
              ) : (
                <Play className="w-5 h-5 text-black fill-current ml-0.5" />
              )}
            </button>
            <button
              onClick={handleNext}
              className="text-zinc-400 hover:text-white transition-colors"
            >
              <SkipForward className="w-5 h-5 fill-current" />
            </button>
            <button
              onClick={() => setRepeat(repeat === 'off' ? 'all' : repeat === 'all' ? 'one' : 'off')}
              className={`relative transition-colors ${repeat !== 'off' ? 'text-[#00F0FF]' : 'text-zinc-400 hover:text-white'}`}
            >
              <Repeat className="w-4 h-4" />
              {repeat === 'one' && (
                <span className="absolute -top-1 -right-1 text-[8px] font-bold leading-none">1</span>
              )}
            </button>
          </div>

          {/* Progress bar */}
          <div className="flex items-center gap-2 w-full max-w-md">
            <span className="text-zinc-400 text-xs w-10 text-right">{formatTime(currentTime)}</span>
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={handleSeek}
              className="flex-1 h-1 bg-zinc-600 rounded-lg appearance-none cursor-pointer accent-[#00F0FF]"
            />
            <span className="text-zinc-400 text-xs w-10">{formatTime(duration)}</span>
          </div>
        </div>

        {/* Volume */}
        <div className="flex items-center gap-2 w-64 justify-end">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="text-zinc-400 hover:text-white transition-colors"
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={isMuted ? 0 : volume}
            onChange={(e) => {
              setVolume(parseFloat(e.target.value));
              setIsMuted(false);
            }}
            className="w-24 h-1 bg-zinc-600 rounded-lg appearance-none cursor-pointer accent-[#00F0FF]"
          />
        </div>
      </div>
    </div>
  );
};

export default SpotifyPlayer;
