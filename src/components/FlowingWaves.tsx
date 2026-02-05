interface FlowingWavesProps {
  variant?: 'top' | 'bottom' | 'full';
  opacity?: number;
  theme?: 'dark' | 'light';
}

const FlowingWaves = ({ variant = 'full', opacity = 0.15, theme = 'light' }: FlowingWavesProps) => {
  // Light theme uses coral/lavender, dark theme uses purple/teal
  const colors = theme === 'light' 
    ? {
        primary: { start: '#F8926A', end: '#FFB088' },   // coral
        secondary: { start: '#BB81B5', end: '#D4A5CF' }, // lavender
        accent: { start: '#E8B4A8', end: '#F5D5CC' },    // soft peach
      }
    : {
        primary: { start: '#8B5CF6', end: '#A78BFA' },   // purple
        secondary: { start: '#14B8A6', end: '#5EEAD4' }, // teal
        accent: { start: '#06B6D4', end: '#67E8F9' },    // cyan
      };

  return (
    <div 
      className={`absolute inset-0 overflow-hidden pointer-events-none ${
        variant === 'top' ? 'bottom-auto h-1/2' : 
        variant === 'bottom' ? 'top-auto h-1/2' : 
        'h-full'
      }`}
      style={{ opacity }}
    >
      {/* Animated wave layers */}
      <div className="absolute inset-0">
        {/* Wave 1 - Primary (Coral/Purple) */}
        <svg
          className="absolute w-full h-full animate-[float_20s_ease-in-out_infinite]"
          style={{ top: '10%', left: '-10%' }}
          viewBox="0 0 1200 600"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,300 C300,200 400,400 600,300 C800,200 900,400 1200,300 L1200,600 L0,600 Z"
            fill="url(#gradient-primary)"
          />
          <defs>
            <linearGradient id="gradient-primary" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: colors.primary.start, stopOpacity: 0.25 }} />
              <stop offset="100%" style={{ stopColor: colors.primary.end, stopOpacity: 0.08 }} />
            </linearGradient>
          </defs>
        </svg>

        {/* Wave 2 - Secondary (Lavender/Teal) */}
        <svg
          className="absolute w-full h-full animate-[float_25s_ease-in-out_infinite_reverse]"
          style={{ top: '20%', left: '10%' }}
          viewBox="0 0 1200 600"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,350 C250,250 450,450 650,350 C850,250 1000,450 1200,350 L1200,600 L0,600 Z"
            fill="url(#gradient-secondary)"
          />
          <defs>
            <linearGradient id="gradient-secondary" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: colors.secondary.start, stopOpacity: 0.2 }} />
              <stop offset="100%" style={{ stopColor: colors.secondary.end, stopOpacity: 0.06 }} />
            </linearGradient>
          </defs>
        </svg>

        {/* Wave 3 - Accent (Peach/Cyan) */}
        <svg
          className="absolute w-full h-full animate-[float_30s_ease-in-out_infinite]"
          style={{ top: '30%', left: '-5%' }}
          viewBox="0 0 1200 600"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,400 C200,300 500,500 700,400 C900,300 1100,500 1200,400 L1200,600 L0,600 Z"
            fill="url(#gradient-accent)"
          />
          <defs>
            <linearGradient id="gradient-accent" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: colors.accent.start, stopOpacity: 0.18 }} />
              <stop offset="100%" style={{ stopColor: colors.accent.end, stopOpacity: 0.05 }} />
            </linearGradient>
          </defs>
        </svg>

        {/* Flowing particles/dots */}
        <div className="absolute inset-0">
          <div 
            className="absolute w-2 h-2 rounded-full animate-[float_15s_ease-in-out_infinite]"
            style={{ top: '20%', left: '15%', backgroundColor: `${colors.primary.start}33` }}
          />
          <div 
            className="absolute w-3 h-3 rounded-full animate-[float_18s_ease-in-out_infinite_reverse]"
            style={{ top: '40%', left: '75%', backgroundColor: `${colors.secondary.start}33` }}
          />
          <div 
            className="absolute w-2 h-2 rounded-full animate-[float_22s_ease-in-out_infinite]"
            style={{ top: '60%', left: '40%', backgroundColor: `${colors.accent.start}33` }}
          />
          <div 
            className="absolute w-4 h-4 rounded-full animate-[float_20s_ease-in-out_infinite_reverse]"
            style={{ top: '80%', left: '80%', backgroundColor: `${colors.primary.end}25` }}
          />
        </div>
      </div>
    </div>
  );
};

export default FlowingWaves;
