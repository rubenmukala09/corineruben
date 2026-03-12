/* eslint-disable react-refresh/only-export-components */
import { forwardRef } from 'react';
import { Pause } from 'lucide-react';
import { useMusic, TRACK_INFO } from '@/components/MusicContext';

export { MusicProvider, useMusic, TRACK_INFO } from '@/components/MusicContext';

const MusicFloatingButton = forwardRef<HTMLButtonElement>((_, ref) => {
  const { isPlaying, currentTrack, stopMusic } = useMusic();

  if (!isPlaying || !currentTrack) return null;

  return (
    <button
      ref={ref}
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
          <div
            key={i}
            className="w-[3px] rounded-full bg-primary animate-pulse"
            style={{ height: `${6 + i * 2}px` }}
          />
        ))}
      </div>
    </button>
  );
});

MusicFloatingButton.displayName = 'MusicFloatingButton';

export default MusicFloatingButton;
