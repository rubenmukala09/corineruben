/* eslint-disable react-refresh/only-export-components */
import { useState, useRef, createContext, useContext, useCallback } from 'react';
import { toast } from 'sonner';

interface Track {
  id: string;
  title: string;
  artist: string;
}

interface MusicContextType {
  currentTrack: string | null;
  isPlaying: boolean;
  playTrack: (trackId: string) => void;
  stopMusic: () => void;
  toggleTrack: (trackId: string) => void;
}

const MusicContext = createContext<MusicContextType>({
  currentTrack: null,
  isPlaying: false,
  playTrack: () => {},
  stopMusic: () => {},
  toggleTrack: () => {},
});

export const useMusic = () => useContext(MusicContext);

const TRACK_SOURCES: Record<string, string> = {
  'amazing-grace': 'https://play.hymnswithoutwords.com/wp-content/uploads/2023/06/Amazing-Grace-Organ-5-Verses-2023.mp3',
  'wedding-day': '/audio/ruben-and-corine.mp3',
  'oceans-hillsong': '',
  'blessed-larson': '/audio/i-have-been-blessed.mp3',
  'how-great': 'https://play.hymnswithoutwords.com/wp-content/uploads/2021/06/O-Lord-My-God-How-Great-Thou-Art-Organ-4-Verses-2021.mp3',
  'joyful': '',
  'great-faithfulness': 'https://play.hymnswithoutwords.com/wp-content/uploads/2017/06/Great-is-thy-faithfulness-Faithfulness-Runyan-3-Verses-Organ-2019.mp3',
};

export const TRACK_INFO: Record<string, Track> = {
  'amazing-grace': { id: 'amazing-grace', title: 'Amazing Grace', artist: 'Instrumental' },
  'wedding-day': { id: 'wedding-day', title: 'Our Melody', artist: 'Made by us ♡' },
  'oceans-hillsong': { id: 'oceans-hillsong', title: 'Oceans', artist: 'Hillsong' },
  'blessed-larson': { id: 'blessed-larson', title: 'I Have Been Blessed', artist: 'Joseph Larson' },
  'how-great': { id: 'how-great', title: 'How Great Thou Art', artist: 'Traditional Hymn' },
  'joyful': { id: 'joyful', title: 'Joyful, Joyful', artist: 'Traditional Hymn' },
  'great-faithfulness': { id: 'great-faithfulness', title: 'Great Is Thy Faithfulness', artist: 'Traditional Hymn' },
};

export const MusicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const stopMusic = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setCurrentTrack(null);
  }, []);

  const playTrack = useCallback((trackId: string) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    const src = TRACK_SOURCES[trackId];
    if (!src) {
      toast.info(`"${TRACK_INFO[trackId]?.title}" is not available yet. Upload an MP3 to enable it.`);
      return;
    }

    const audio = new Audio(src);
    audio.loop = true;
    audio.volume = 0.35;
    audio.play().catch(() => {});
    audio.onended = () => {
      setIsPlaying(false);
      setCurrentTrack(null);
    };
    audioRef.current = audio;
    setCurrentTrack(trackId);
    setIsPlaying(true);
  }, []);

  const toggleTrack = useCallback((trackId: string) => {
    if (currentTrack === trackId && isPlaying) {
      stopMusic();
    } else {
      playTrack(trackId);
    }
  }, [currentTrack, isPlaying, stopMusic, playTrack]);

  return (
    <MusicContext.Provider value={{ currentTrack, isPlaying, playTrack, stopMusic, toggleTrack }}>
      {children}
    </MusicContext.Provider>
  );
};

export default MusicContext;
