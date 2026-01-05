import React from 'react';

const HeroPurpleOverlay: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Base gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-violet-800/30 to-purple-900/40 animate-gradient-wave" />
      
      {/* Floating orbs with orbital motion */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-to-br from-violet-500/25 to-purple-600/20 blur-3xl animate-float-orbit" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-gradient-to-tl from-purple-400/20 to-violet-500/25 blur-3xl animate-float-orbit-reverse" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-purple-500/15 to-violet-400/15 blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-1/4 left-1/3 w-64 h-64 rounded-full bg-gradient-to-br from-violet-600/20 to-purple-500/15 blur-2xl animate-float-delayed" />
      
      {/* Animated accent lines with shimmer */}
      <div className="absolute inset-0 opacity-[0.08]">
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(135deg,transparent_40%,hsl(var(--purple-400))_50%,transparent_60%)] animate-shimmer-slow" />
      </div>
      
      {/* Geometric accents */}
      <div className="absolute top-20 right-20 w-32 h-32 border border-purple-400/20 rounded-full animate-pulse-glow" />
      <div className="absolute bottom-32 left-16 w-24 h-24 border border-violet-400/15 rounded-full animate-pulse-glow-delayed" />
      
      {/* Subtle noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMC4xNSIvPjwvc3ZnPg==')]" />
    </div>
  );
};

export default HeroPurpleOverlay;
