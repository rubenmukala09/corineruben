import { useState, useRef, createContext, useContext, useCallback } from 'react';
import { Volume2, VolumeX, Pause } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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

// Track registry — add your MP3 URLs or paths here
// Once you upload your songs, replace the `src` values with the file paths
const TRACK_SOURCES: Record<string, string> = {
  'amazing-grace': 'https://play.hymnswithoutwords.com/wp-content/uploads/2023/06/Amazing-Grace-Organ-5-Verses-2023.mp3',
  'wedding-day': '/audio/wedding-day.mp3',
  'oceans-hillsong': '',     // Copyrighted — upload your own MP3
  'blessed-larson': 'https://play.hymnswithoutwords.com/wp-content/uploads/2019/06/I-Have-Been-Blessed-Blessed-Organ-3-Verses-2019.mp3',
  'how-great': 'https://play.hymnswithoutwords.com/wp-content/uploads/2021/06/O-Lord-My-God-How-Great-Thou-Art-Organ-4-Verses-2021.mp3',
  'joyful': '',              // Upload your own MP3
  'great-faithfulness': 'https://play.hymnswithoutwords.com/wp-content/uploads/2017/06/Great-is-thy-faithfulness-Faithfulness-Runyan-3-Verses-Organ-2019.mp3',
};

export const TRACK_INFO: Record<string, Track> = {
  'amazing-grace': { id: 'amazing-grace', title: 'Amazing Grace', artist: 'Instrumental' },
  'wedding-day': { id: 'wedding-day', title: 'Wedding Day', artist: 'Corine & Ruben' },
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
    // Stop current playback
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    const src = TRACK_SOURCES[trackId];
    if (!src) {
      // No audio file yet — set state for UI but no sound
      setCurrentTrack(trackId);
      setIsPlaying(true);
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

const MusicFloatingButton = () => {
  const { isPlaying, currentTrack, stopMusic } = useMusic();

  return (
    <AnimatePresence>
      {isPlaying && currentTrack && (
        <motion.button
          initial={{ opacity: 0, scale: 0, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0, y: 20 }}
          onClick={stopMusic}
          className="fixed bottom-24 left-6 z-40 glass-card-strong rounded-full px-4 py-3 flex items-center gap-3 shadow-glow hover:scale-105 transition-transform duration-300"
          aria-label="Stop music"
        >
          <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center">
            <Pause className="w-3.5 h-3.5 text-primary-foreground fill-primary-foreground" />
          </div>
          <div className="text-left pr-1">
            <p className="font-sans-elegant text-xs font-bold text-foreground leading-tight">
              {TRACK_INFO[currentTrack]?.title}
            </p>
            <p className="font-sans-elegant text-[10px] text-muted-foreground leading-tight">
              {TRACK_INFO[currentTrack]?.artist}
            </p>
          </div>
          <div className="flex gap-0.5 items-end h-4">
            {[1, 2, 3, 4].map(i => (
              <motion.div
                key={i}
                className="w-[3px] rounded-full bg-primary"
                animate={{ height: ['4px', '14px', '6px', '12px', '4px'] }}
                transition={{ duration: 0.8 + i * 0.15, repeat: Infinity, ease: 'easeInOut' }}
              />
            ))}
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default MusicFloatingButton;
