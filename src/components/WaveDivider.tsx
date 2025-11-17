interface WaveDividerProps {
  variant?: 'top' | 'bottom';
  color?: 'primary' | 'light';
}

const WaveDivider = ({ variant = 'bottom', color = 'primary' }: WaveDividerProps) => {
  const gradientId = `wave-gradient-${variant}-${color}`;
  
  const gradientColors = color === 'primary' 
    ? { start: 'hsl(var(--purple-900))', mid: 'hsl(var(--purple-700))', end: 'hsl(var(--purple-500))' }
    : { start: 'hsl(var(--secondary))', mid: 'hsl(var(--card))', end: 'hsl(var(--secondary))' };
  
  return (
    <div className={`wave-divider ${variant === 'top' ? 'rotate-180' : ''} w-full overflow-hidden leading-none relative ${variant === 'top' ? 'mb-[-1px]' : 'mt-[-1px]'}`}>
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 1440 120" 
        preserveAspectRatio="none"
        className="relative block w-full h-[80px] md:h-[120px]"
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: gradientColors.start, stopOpacity: 1 }} />
            <stop offset="50%" style={{ stopColor: gradientColors.mid, stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: gradientColors.end, stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        <path 
          fill={`url(#${gradientId})`}
          d="M0,64L48,58.7C96,53,192,43,288,48C384,53,480,75,576,80C672,85,768,75,864,64C960,53,1056,43,1152,48C1248,53,1344,75,1392,85.3L1440,96L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
        />
      </svg>
    </div>
  );
};

export default WaveDivider;
