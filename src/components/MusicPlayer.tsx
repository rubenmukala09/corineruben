/* eslint-disable react-refresh/only-export-components */
import { forwardRef } from 'react';
import { Pause } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMusic, TRACK_INFO } from '@/components/MusicContext';

export { MusicProvider, useMusic, TRACK_INFO } from '@/components/MusicContext';

const MusicFloatingButton = forwardRef<HTMLButtonElement>((_, ref) => {
  const { isPlaying, currentTrack, stopMusic } = useMusic();

  return (
    <AnimatePresence>
      {isPlaying && currentTrack && (
        <motion.button
          ref={ref}
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
});

MusicFloatingButton.displayName = 'MusicFloatingButton';

export default MusicFloatingButton;
