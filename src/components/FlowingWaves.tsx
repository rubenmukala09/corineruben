interface FlowingWavesProps {
  variant?: 'top' | 'bottom' | 'full';
  opacity?: number;
}

const FlowingWaves = ({ variant = 'full', opacity = 0.15 }: FlowingWavesProps) => {
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
        {/* Wave 1 - Purple */}
        <svg
          className="absolute w-full h-full animate-[float_20s_ease-in-out_infinite]"
          style={{ top: '10%', left: '-10%' }}
          viewBox="0 0 1200 600"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,300 C300,200 400,400 600,300 C800,200 900,400 1200,300 L1200,600 L0,600 Z"
            fill="url(#gradient-purple)"
          />
          <defs>
            <linearGradient id="gradient-purple" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" className="text-purple-500" style={{ stopColor: 'currentColor', stopOpacity: 0.3 }} />
              <stop offset="100%" className="text-purple-500" style={{ stopColor: 'currentColor', stopOpacity: 0.1 }} />
            </linearGradient>
          </defs>
        </svg>

        {/* Wave 2 - Teal */}
        <svg
          className="absolute w-full h-full animate-[float_25s_ease-in-out_infinite_reverse]"
          style={{ top: '20%', left: '10%' }}
          viewBox="0 0 1200 600"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,350 C250,250 450,450 650,350 C850,250 1000,450 1200,350 L1200,600 L0,600 Z"
            fill="url(#gradient-teal)"
          />
          <defs>
            <linearGradient id="gradient-teal" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" className="text-teal-500" style={{ stopColor: 'currentColor', stopOpacity: 0.3 }} />
              <stop offset="100%" className="text-teal-400" style={{ stopColor: 'currentColor', stopOpacity: 0.1 }} />
            </linearGradient>
          </defs>
        </svg>

        {/* Wave 3 - Cyan accent */}
        <svg
          className="absolute w-full h-full animate-[float_30s_ease-in-out_infinite]"
          style={{ top: '30%', left: '-5%' }}
          viewBox="0 0 1200 600"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,400 C200,300 500,500 700,400 C900,300 1100,500 1200,400 L1200,600 L0,600 Z"
            fill="url(#gradient-cyan)"
          />
          <defs>
            <linearGradient id="gradient-cyan" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" className="text-cyan-500" style={{ stopColor: 'currentColor', stopOpacity: 0.25 }} />
              <stop offset="100%" className="text-cyan-400" style={{ stopColor: 'currentColor', stopOpacity: 0.1 }} />
            </linearGradient>
          </defs>
        </svg>

        {/* Flowing particles/dots */}
        <div className="absolute inset-0">
          <div 
            className="absolute w-2 h-2 rounded-full bg-primary/20 animate-[float_15s_ease-in-out_infinite]"
            style={{ top: '20%', left: '15%' }}
          />
          <div 
            className="absolute w-3 h-3 rounded-full bg-accent-teal/20 animate-[float_18s_ease-in-out_infinite_reverse]"
            style={{ top: '40%', left: '75%' }}
          />
          <div 
            className="absolute w-2 h-2 rounded-full bg-accent-cyan/20 animate-[float_22s_ease-in-out_infinite]"
            style={{ top: '60%', left: '40%' }}
          />
          <div 
            className="absolute w-4 h-4 rounded-full bg-primary/15 animate-[float_20s_ease-in-out_infinite_reverse]"
            style={{ top: '80%', left: '80%' }}
          />
        </div>
      </div>
    </div>
  );
};

export default FlowingWaves;
