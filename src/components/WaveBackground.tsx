const WaveBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
      <svg
        className="absolute w-full h-full opacity-[0.15]"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 800"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="wave-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: 'hsl(260, 70%, 45%)', stopOpacity: 1 }} />
            <stop offset="50%" style={{ stopColor: 'hsl(180, 70%, 45%)', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: 'hsl(260, 70%, 45%)', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        
        {/* Multiple wave layers for depth */}
        <path
          fill="url(#wave-gradient-1)"
          fillOpacity="0.3"
          d="M0,160L48,176C96,192,192,224,288,218.7C384,213,480,171,576,165.3C672,160,768,192,864,197.3C960,203,1056,181,1152,154.7C1248,128,1344,96,1392,80L1440,64L1440,800L1392,800C1344,800,1248,800,1152,800C1056,800,960,800,864,800C768,800,672,800,576,800C480,800,384,800,288,800C192,800,96,800,48,800L0,800Z"
        />
        <path
          fill="url(#wave-gradient-1)"
          fillOpacity="0.2"
          d="M0,320L48,314.7C96,309,192,299,288,304C384,309,480,331,576,336C672,341,768,331,864,320C960,309,1056,299,1152,282.7C1248,267,1344,245,1392,234.7L1440,224L1440,800L1392,800C1344,800,1248,800,1152,800C1056,800,960,800,864,800C768,800,672,800,576,800C480,800,384,800,288,800C192,800,96,800,48,800L0,800Z"
        />
        <path
          fill="url(#wave-gradient-1)"
          fillOpacity="0.15"
          d="M0,480L48,469.3C96,459,192,437,288,426.7C384,416,480,416,576,432C672,448,768,480,864,480C960,480,1056,448,1152,421.3C1248,395,1344,373,1392,362.7L1440,352L1440,800L1392,800C1344,800,1248,800,1152,800C1056,800,960,800,864,800C768,800,672,800,576,800C480,800,384,800,288,800C192,800,96,800,48,800L0,800Z"
        />
      </svg>
    </div>
  );
};

export default WaveBackground;
