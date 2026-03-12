interface AuroraBackgroundProps {
  variant?: 'hero' | 'mesh' | 'soft';
  className?: string;
}

/**
 * Premium aurora background — three radial-gradient orbs with
 * mix-blend-mode: multiply so they interact with the cream base.
 * All styles live in index.css (.aurora-blob-css, .aurora-blob-1/2/3).
 */
const AuroraBackground = ({ className = '' }: AuroraBackgroundProps) => (
  <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
    {/* Orb 1 — top-left pink 700×700 blur 90px multiply */}
    <div className="aurora-blob-css aurora-blob-1" />
    {/* Orb 2 — bottom-right purple 600×600 blur 90px multiply */}
    <div className="aurora-blob-css aurora-blob-2" />
    {/* Orb 3 — mid accent purple 400×400 */}
    <div className="aurora-blob-css aurora-blob-3" />
  </div>
);

export default AuroraBackground;
