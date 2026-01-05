// ============================================
// UNIFIED ANIMATION SYSTEM - Simplified
// ============================================

// Core timing constants (in seconds)
export const TIMING = {
  instant: 0.1,
  fast: 0.15,
  normal: 0.2,
  slow: 0.3,
} as const;

// Standard easing curve
export const EASING = {
  smooth: [0.4, 0, 0.2, 1] as const,
  out: [0.0, 0, 0.2, 1] as const,
  in: [0.4, 0, 1, 1] as const,
} as const;

// Stagger delays
export const STAGGER = {
  fast: 0.03,
  normal: 0.05,
  slow: 0.08,
} as const;

// Transform presets
export const TRANSFORMS = {
  fadeUp: { 
    from: { opacity: 0, y: 12 }, 
    to: { opacity: 1, y: 0 } 
  },
  fadeIn: { 
    from: { opacity: 0 }, 
    to: { opacity: 1 } 
  },
  scaleIn: { 
    from: { opacity: 0, scale: 0.98 }, 
    to: { opacity: 1, scale: 1 } 
  },
  slideLeft: { 
    from: { opacity: 0, x: -20 }, 
    to: { opacity: 1, x: 0 } 
  },
  slideRight: { 
    from: { opacity: 0, x: 20 }, 
    to: { opacity: 1, x: 0 } 
  },
} as const;

// CSS class mappings
export const ANIMATION_CLASSES = {
  'fade-up': 'scroll-fade-up',
  'fade-in': 'scroll-fade-in', 
  'scale': 'scroll-scale-in',
  'slide-left': 'scroll-slide-left',
  'slide-right': 'scroll-slide-right',
} as const;

export type AnimationType = keyof typeof ANIMATION_CLASSES;
