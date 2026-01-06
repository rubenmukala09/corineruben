import { memo } from "react";

/**
 * GPU-optimized purple mesh overlay for inner page hero sections
 * Creates a glassmorphism/mesh gradient effect with subtle animation
 * 30-40% opacity ensures photos remain visible behind while text stays readable
 */
const HeroPurpleOverlay = memo(() => {
  return (
    <>
      {/* Primary purple mesh gradient - glassmorphism base */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, hsla(270, 60%, 25%, 0.4) 0%, hsla(260, 70%, 45%, 0.35) 50%, hsla(280, 60%, 40%, 0.3) 100%)',
        }}
      />
      
      {/* Left side text contrast enhancement */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to right, hsla(270, 50%, 20%, 0.5) 0%, hsla(270, 50%, 30%, 0.3) 40%, transparent 70%)',
        }}
      />
      
      {/* Animated mesh blobs - lava lamp effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Large slow-moving blob */}
        <div 
          className="absolute rounded-full will-change-transform"
          style={{
            width: '60%',
            height: '60%',
            background: 'radial-gradient(ellipse, hsla(270, 70%, 50%, 0.25) 0%, transparent 70%)',
            top: '-10%',
            left: '-10%',
            filter: 'blur(80px)',
            animation: 'mesh-float-1 20s ease-in-out infinite',
          }}
        />
        {/* Medium blob - offset timing */}
        <div 
          className="absolute rounded-full will-change-transform"
          style={{
            width: '50%',
            height: '50%',
            background: 'radial-gradient(ellipse, hsla(280, 65%, 55%, 0.2) 0%, transparent 70%)',
            bottom: '-5%',
            right: '-5%',
            filter: 'blur(60px)',
            animation: 'mesh-float-2 18s ease-in-out infinite',
          }}
        />
        {/* Small accent blob */}
        <div 
          className="absolute rounded-full will-change-transform"
          style={{
            width: '35%',
            height: '35%',
            background: 'radial-gradient(ellipse, hsla(265, 60%, 60%, 0.15) 0%, transparent 70%)',
            top: '30%',
            right: '10%',
            filter: 'blur(50px)',
            animation: 'mesh-float-3 15s ease-in-out infinite',
          }}
        />
      </div>
      
      {/* Subtle shimmer wave for high-tech cyber feel */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-15"
        style={{
          background: 'linear-gradient(110deg, transparent 20%, hsla(270, 70%, 60%, 0.2) 40%, hsla(280, 60%, 55%, 0.15) 60%, transparent 80%)',
          backgroundSize: '200% 100%',
          animation: 'mesh-shimmer 12s ease-in-out infinite',
        }}
      />

      {/* Keyframe styles for animations */}
      <style>{`
        @keyframes mesh-float-1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(5%, 8%) scale(1.05); }
          50% { transform: translate(10%, 3%) scale(0.98); }
          75% { transform: translate(3%, -5%) scale(1.02); }
        }
        @keyframes mesh-float-2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-8%, 5%) scale(1.03); }
          66% { transform: translate(-3%, -8%) scale(0.97); }
        }
        @keyframes mesh-float-3 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(-10%, 10%) rotate(5deg); }
        }
        @keyframes mesh-shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </>
  );
});

HeroPurpleOverlay.displayName = 'HeroPurpleOverlay';

export default HeroPurpleOverlay;
