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
}

const FloatingHearts = () => {
  const { theme } = useTheme();
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    if (theme !== 'dark') {
      setHearts([]);
      return;
    }

    const generated: Heart[] = Array.from({ length: 18 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 8 + Math.random() * 16,
      delay: Math.random() * 6,
      duration: 3 + Math.random() * 4,
      opacity: 0.15 + Math.random() * 0.35,
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
          ♥
        </span>
      ))}
    </div>
  );
};

export default FloatingHearts;
