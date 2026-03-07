interface AuroraBackgroundProps {
  variant?: 'hero' | 'mesh' | 'soft';
  className?: string;
}

/**
 * Subtle frosted-glass background overlay — no colored gradients,
 * just a gentle blur that lets the content underneath show through.
 */
const AuroraBackground = ({ className = '' }: AuroraBackgroundProps) => {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-background/40 backdrop-blur-sm" />
    </div>
  );
};

export default AuroraBackground;
