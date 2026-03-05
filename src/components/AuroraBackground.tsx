import { motion } from 'framer-motion';

interface AuroraBackgroundProps {
  variant?: 'hero' | 'mesh' | 'soft';
  className?: string;
}

/**
 * Animated aurora gradient mesh background.
 * Light mode: warm pastels (dusty rose, peach, cream).
 * Dark mode: luminous jewel tones (orchid, amethyst, rose) that glow against deep midnight.
 */
const AuroraBackground = ({ variant = 'mesh', className = '' }: AuroraBackgroundProps) => {
  const baseClass = variant === 'hero' ? 'gradient-hero' : variant === 'soft' ? 'gradient-soft' : 'gradient-mesh';

  // Dark mode uses brighter, more saturated colors with higher opacity
  // to create visible aurora glow against the deep background
  const blobs = [
    {
      // Deep Plum / Orchid glow — bottom-left
      width: 600, height: 600,
      lightBg: 'rgba(139, 107, 138, 0.45)',
      darkBg: 'rgba(160, 100, 200, 0.25)',
      left: '-10%', bottom: '-5%',
      animate: { x: [0, 40, -20, 0], y: [0, -30, 20, 0], scale: [1, 1.1, 0.95, 1] },
      duration: 18, delay: 0,
    },
    {
      // Rose Gold — mid-left
      width: 500, height: 500,
      lightBg: 'rgba(212, 165, 165, 0.35)',
      darkBg: 'rgba(200, 120, 150, 0.2)',
      left: '-5%', top: '30%',
      animate: { x: [0, 60, -30, 0], y: [0, 40, -20, 0], scale: [1, 0.9, 1.1, 1] },
      duration: 22, delay: 2,
    },
    {
      // Peach / Warm amber — bottom-right
      width: 550, height: 550,
      lightBg: 'rgba(232, 196, 184, 0.4)',
      darkBg: 'rgba(180, 120, 140, 0.18)',
      right: '-8%', bottom: '5%',
      animate: { x: [0, -50, 30, 0], y: [0, -40, 25, 0], scale: [1, 1.08, 0.92, 1] },
      duration: 20, delay: 4,
    },
    {
      // Lavender / Amethyst — top-right
      width: 500, height: 500,
      lightBg: 'rgba(212, 196, 224, 0.3)',
      darkBg: 'rgba(140, 110, 210, 0.2)',
      right: '-10%', top: '0%',
      animate: { x: [0, -40, 20, 0], y: [0, 30, -15, 0], scale: [1, 1.05, 0.95, 1] },
      duration: 24, delay: 6,
    },
    {
      // Cream / Soft glow — center
      width: 400, height: 400,
      lightBg: 'rgba(245, 230, 220, 0.45)',
      darkBg: 'rgba(160, 130, 200, 0.15)',
      left: '30%', top: '25%',
      animate: { x: [0, 30, -40, 0], y: [0, -25, 35, 0], scale: [1, 1.12, 0.88, 1] },
      duration: 16, delay: 1,
    },
    {
      // Muted Coral / Magenta — bottom accent
      width: 350, height: 350,
      lightBg: 'rgba(224, 180, 168, 0.35)',
      darkBg: 'rgba(180, 100, 160, 0.18)',
      left: '20%', bottom: '10%',
      animate: { x: [0, -35, 45, 0], y: [0, 20, -30, 0], scale: [1, 0.95, 1.1, 1] },
      duration: 19, delay: 3,
    },
  ];

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <div className={`absolute inset-0 ${baseClass}`} />

      {blobs.map((blob, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none aurora-blob"
          style={{
            width: blob.width,
            height: blob.height,
            filter: 'blur(120px)',
            ...(blob.left !== undefined && { left: blob.left }),
            ...(blob.right !== undefined && { right: blob.right }),
            ...(blob.top !== undefined && { top: blob.top }),
            ...(blob.bottom !== undefined && { bottom: blob.bottom }),
          }}
          animate={blob.animate}
          transition={{ duration: blob.duration, repeat: Infinity, ease: 'easeInOut', delay: blob.delay }}
        >
          {/* Light mode color */}
          <div
            className="absolute inset-0 rounded-full dark:opacity-0 transition-opacity duration-500"
            style={{ background: blob.lightBg }}
          />
          {/* Dark mode color — brighter, more saturated */}
          <div
            className="absolute inset-0 rounded-full opacity-0 dark:opacity-100 transition-opacity duration-500"
            style={{ background: blob.darkBg }}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default AuroraBackground;
