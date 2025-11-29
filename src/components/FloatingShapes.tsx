import { useDeviceCapabilities } from '@/hooks/useDeviceCapabilities';

export const FloatingShapes = () => {
  const { isLowEnd, prefersReducedMotion } = useDeviceCapabilities();

  // Don't render on low-end devices or if reduced motion is preferred
  if (isLowEnd || prefersReducedMotion) {
    return null;
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      <svg className="absolute w-full h-full">
        <defs>
          <filter id="blur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="25" />
          </filter>
        </defs>
        
        {/* Floating blob 1 */}
        <ellipse
          cx="10%"
          cy="20%"
          rx="200"
          ry="250"
          fill="rgba(124, 58, 237, 0.08)"
          filter="url(#blur)"
          className="animate-float-slow"
        />
        
        {/* Floating blob 2 */}
        <ellipse
          cx="85%"
          cy="40%"
          rx="180"
          ry="220"
          fill="rgba(167, 139, 250, 0.08)"
          filter="url(#blur)"
          className="animate-float-medium"
        />
        
        {/* Floating blob 3 */}
        <ellipse
          cx="50%"
          cy="70%"
          rx="220"
          ry="180"
          fill="rgba(124, 58, 237, 0.06)"
          filter="url(#blur)"
          className="animate-float-fast"
        />
        
        {/* Floating blob 4 */}
        <circle
          cx="70%"
          cy="85%"
          r="150"
          fill="rgba(167, 139, 250, 0.07)"
          filter="url(#blur)"
          className="animate-float-slow"
          style={{ animationDelay: '2s' }}
        />
      </svg>
    </div>
  );
};
