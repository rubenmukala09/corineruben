import { memo } from "react";

/**
 * GPU-optimized purple animated overlay for hero sections
 * Uses CSS transforms and will-change for smooth 60fps animations
 * Lower opacity values ensure text remains clear and visible
 */
const HeroPurpleOverlay = memo(() => {
  return (
    <>
      {/* Primary purple gradient - reduced opacity for text clarity */}
      <div 
        className="absolute inset-0 pointer-events-none will-change-transform"
        style={{
          background: 'linear-gradient(135deg, rgba(88, 28, 135, 0.55) 0%, rgba(124, 58, 237, 0.35) 25%, rgba(139, 92, 246, 0.2) 50%, transparent 75%)'
        }}
      />
      
      {/* Secondary depth gradient */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to right, rgba(15, 23, 42, 0.5) 0%, rgba(30, 27, 75, 0.3) 40%, transparent 70%)'
        }}
      />
      
      {/* Vertical text contrast gradient */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(88, 28, 135, 0.25) 0%, transparent 30%, transparent 70%, rgba(15, 23, 42, 0.4) 100%)'
        }}
      />
      
      {/* Animated floating orbs - GPU accelerated */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute rounded-full blur-[100px] will-change-transform"
          style={{
            width: '500px',
            height: '500px',
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%)',
            top: '-5%',
            left: '-5%',
            animation: 'pulse-glow 8s ease-in-out infinite, float-orbit 20s ease-in-out infinite',
          }}
        />
        <div 
          className="absolute rounded-full blur-[80px] will-change-transform"
          style={{
            width: '350px',
            height: '350px',
            background: 'radial-gradient(circle, rgba(124, 58, 237, 0.35) 0%, transparent 70%)',
            bottom: '15%',
            right: '5%',
            animation: 'pulse-glow 6s ease-in-out infinite 2s, float-orbit 15s ease-in-out infinite reverse',
          }}
        />
        <div 
          className="absolute rounded-full blur-[60px] will-change-transform"
          style={{
            width: '200px',
            height: '200px',
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.3) 0%, transparent 70%)',
            top: '40%',
            right: '20%',
            animation: 'pulse-glow 5s ease-in-out infinite 1s, float-orbit 12s ease-in-out infinite',
          }}
        />
      </div>
      
      {/* Animated gradient wave */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.15]"
        style={{
          background: 'linear-gradient(45deg, transparent 30%, rgba(139, 92, 246, 0.3) 50%, transparent 70%)',
          backgroundSize: '200% 200%',
          animation: 'shimmer-slow 8s ease-in-out infinite',
        }}
      />
      
      {/* Subtle accent lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.04]">
        <div 
          className="absolute w-[200%] h-[1px] bg-gradient-to-r from-transparent via-purple-400 to-transparent"
          style={{ top: '25%', left: '-50%', transform: 'rotate(-15deg)' }}
        />
        <div 
          className="absolute w-[200%] h-[1px] bg-gradient-to-r from-transparent via-violet-400 to-transparent"
          style={{ top: '50%', left: '-50%', transform: 'rotate(-15deg)' }}
        />
      </div>
    </>
  );
});

HeroPurpleOverlay.displayName = 'HeroPurpleOverlay';

export default HeroPurpleOverlay;
