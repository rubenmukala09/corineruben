// ============================================
// LUXURY ANIMATION SYSTEM
// Silk-like transitions with gentle easing
// ============================================

// Timing constants (in milliseconds) - Slower for luxury feel
export const TIMING = {
  instant: 100,
  fast: 300,
  normal: 500,
  slow: 800,
  verySlow: 1000,
  luxurious: 1200,
} as const;

// Luxury easing functions - Smooth, silk-like curves
export const EASING = {
  // Silk - Ultra smooth, no sudden movements
  silk: 'cubic-bezier(0.23, 1, 0.32, 1)',
  // Velvet - Soft start and end
  velvet: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
  // Cashmere - Gentle deceleration
  cashmere: 'cubic-bezier(0.19, 1, 0.22, 1)',
  // Satin - Elegant entrance
  satin: 'cubic-bezier(0.33, 1, 0.68, 1)',
  // Pearl - Refined, subtle
  pearl: 'cubic-bezier(0.4, 0, 0.2, 1)',
  // Gold - Premium, theatrical
  gold: 'cubic-bezier(0.16, 1, 0.3, 1)',
} as const;

// Stagger delays - Slower cascade for elegance
export const STAGGER = {
  fast: 50,
  normal: 80,
  slow: 120,
  cascade: 150,
} as const;

// Luxury reveal presets
export const REVEAL_PRESETS = {
  fadeUp: {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
  },
  fadeDown: {
    initial: { opacity: 0, y: -40 },
    animate: { opacity: 1, y: 0 },
  },
  fadeLeft: {
    initial: { opacity: 0, x: -40 },
    animate: { opacity: 1, x: 0 },
  },
  fadeRight: {
    initial: { opacity: 0, x: 40 },
    animate: { opacity: 1, x: 0 },
  },
  scale: {
    initial: { opacity: 0, scale: 0.92 },
    animate: { opacity: 1, scale: 1 },
  },
  blur: {
    initial: { opacity: 0, filter: 'blur(12px)' },
    animate: { opacity: 1, filter: 'blur(0px)' },
  },
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  },
  // Luxury specific
  float: {
    initial: { opacity: 0, y: 60, scale: 0.96 },
    animate: { opacity: 1, y: 0, scale: 1 },
  },
  unveil: {
    initial: { opacity: 0, y: 30, filter: 'blur(8px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  },
} as const;

// CSS transition strings
export const TRANSITIONS = {
  page: `opacity ${TIMING.normal}ms ${EASING.silk}, transform ${TIMING.normal}ms ${EASING.silk}`,
  element: `all ${TIMING.fast}ms ${EASING.velvet}`,
  hover: `transform ${TIMING.fast}ms ${EASING.satin}, box-shadow ${TIMING.fast}ms ${EASING.velvet}`,
  reveal: `opacity ${TIMING.slow}ms ${EASING.cashmere}, transform ${TIMING.slow}ms ${EASING.cashmere}, filter ${TIMING.slow}ms ${EASING.cashmere}`,
} as const;

// Page transition configurations
export const PAGE_TRANSITIONS = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    duration: TIMING.normal,
  },
  slide: {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -30 },
    duration: TIMING.normal,
  },
  scale: {
    initial: { opacity: 0, scale: 0.96 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.96 },
    duration: TIMING.fast,
  },
  luxury: {
    initial: { opacity: 0, y: 20, filter: 'blur(4px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
    exit: { opacity: 0, y: -10, filter: 'blur(4px)' },
    duration: TIMING.slow,
  },
  crossfade: {
    initial: { opacity: 0, scale: 0.99 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.99 },
    duration: TIMING.normal,
  },
} as const;

// CSS class mappings for scroll reveal
export const ANIMATION_CLASSES = {
  'fade-up': 'luxury-reveal-up',
  'fade-down': 'luxury-reveal-down',
  'fade-left': 'luxury-reveal-left',
  'fade-right': 'luxury-reveal-right',
  'fade-in': 'luxury-reveal-fade',
  'scale': 'luxury-reveal-scale',
  'blur': 'luxury-reveal-blur',
  'float': 'luxury-reveal-float',
  'unveil': 'luxury-reveal-unveil',
} as const;

export type AnimationType = keyof typeof ANIMATION_CLASSES;
export type EasingType = keyof typeof EASING;
export type TimingType = keyof typeof TIMING;
