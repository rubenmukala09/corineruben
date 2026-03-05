import { useEffect, useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

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
  const { theme } = useTheme();
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    if (theme !== 'dark') {
      setHearts([]);
      return;
    }

    const symbols = ['✦', '✧', '♥', '·', '✦', '♥', '✧', '·'];
    const generated: Heart[] = Array.from({ length: 35 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 6 + Math.random() * 14,
      delay: Math.random() * 8,
      duration: 2.5 + Math.random() * 5,
      opacity: 0.3 + Math.random() * 0.5,
      symbol: symbols[i % symbols.length],
    }));
    setHearts(generated);
  }, [theme]);

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
