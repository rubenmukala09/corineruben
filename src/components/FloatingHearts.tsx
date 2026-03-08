import { useEffect, useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useIsMobile } from '@/hooks/use-mobile';

interface Heart {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
  symbol: string;
}

const FloatingHearts = () => {
  const isMobile = useIsMobile();
  const { theme } = useTheme();
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    if (theme !== 'dark') {
      setHearts([]);
      return;
    }

    const count = isMobile ? 6 : 14;
    const symbols = ['✦', '✧', '♥', '·', '✦', '♥', '✧', '·', '✵', '♡'];
    const generated: Heart[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: 5 + Math.random() * 90,
      y: 5 + Math.random() * 90,
      size: 8 + Math.random() * 14,
      delay: Math.random() * 10,
      duration: 3 + Math.random() * 5,
      opacity: 0.45 + Math.random() * 0.35,
      symbol: symbols[i % symbols.length],
    }));
    setHearts(generated);
  }, [theme, isMobile]);

  if (theme !== 'dark' || hearts.length === 0) return null;

  return (
    <div className="fixed inset-0 z-[1] pointer-events-none overflow-hidden">
      {hearts.map(h => (
        <span
          key={h.id}
          className="absolute heart-glow"
          style={{
            left: `${h.x}%`,
            top: `${h.y}%`,
            fontSize: `${h.size}px`,
            '--heart-delay': `${h.delay}s`,
            '--heart-duration': `${h.duration}s`,
            '--heart-max-opacity': `${h.opacity}`,
            opacity: 0,
          } as React.CSSProperties}
        >
          {h.symbol}
        </span>
      ))}
    </div>
  );
};

export default FloatingHearts;
