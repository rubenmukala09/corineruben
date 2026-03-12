import { useEffect, useState } from 'react';

const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const p = docHeight > 0 ? scrollTop / docHeight : 0;
      setProgress(p);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (progress < 0.01) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[2px] z-[100] origin-left transition-transform duration-150 ease-out"
      style={{
        transform: `scaleX(${progress})`,
        background: 'linear-gradient(90deg, hsl(var(--primary) / 0.6), hsl(var(--primary)), hsl(var(--gold)))',
      }}
    />
  );
};

export default ScrollProgress;
