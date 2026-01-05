// ============================================
// PREMIUM ANIMATION SYSTEM
// Centralized timing, easing, and animation configuration
// ============================================

// Timing constants (in milliseconds)
export const TIMING = {
  ultraFast: 150,
  fast: 250,
  normal: 400,
  slow: 600,
  verySlow: 800,
} as const;

// Premium easing functions
export const EASING = {
  // Standard smooth - good for most animations
  smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
  // Dramatic deceleration - great for reveals
  outExpo: 'cubic-bezier(0.16, 1, 0.3, 1)',
  // Bouncy, playful - for micro-interactions
  spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  // Smooth glide - elegant transitions
  glide: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  // Quick start, smooth end - for page transitions
  premium: 'cubic-bezier(0.22, 1, 0.36, 1)',
  // Natural movement
  natural: 'cubic-bezier(0.4, 0, 0.6, 1)',
} as const;

// Stagger delay configurations
export const STAGGER = {
  fast: 30,
  normal: 50,
  slow: 80,
  dramatic: 120,
} as const;

// Animation presets for scroll reveal
export const REVEAL_PRESETS = {
  fadeUp: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
  },
  fadeDown: {
    initial: { opacity: 0, y: -30 },
    animate: { opacity: 1, y: 0 },
  },
  fadeLeft: {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0 },
  },
  fadeRight: {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
  },
  scale: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
  },
  blur: {
    initial: { opacity: 0, filter: 'blur(8px)' },
    animate: { opacity: 1, filter: 'blur(0px)' },
  },
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  },
} as const;

// CSS transition strings
export const TRANSITIONS = {
  page: `opacity ${TIMING.normal}ms ${EASING.premium}, transform ${TIMING.normal}ms ${EASING.premium}`,
  element: `all ${TIMING.fast}ms ${EASING.smooth}`,
  hover: `transform ${TIMING.ultraFast}ms ${EASING.spring}, box-shadow ${TIMING.fast}ms ${EASING.smooth}`,
  reveal: `opacity ${TIMING.normal}ms ${EASING.outExpo}, transform ${TIMING.normal}ms ${EASING.outExpo}`,
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
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
    duration: TIMING.normal,
  },
  scale: {
    initial: { opacity: 0, scale: 0.98 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.98 },
    duration: TIMING.fast,
  },
  crossfade: {
    initial: { opacity: 0, scale: 0.995 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.995 },
    duration: TIMING.normal,
  },
} as const;

// CSS class mappings for scroll reveal
export const ANIMATION_CLASSES = {
  'fade-up': 'reveal-up',
  'fade-down': 'reveal-down',
  'fade-left': 'reveal-left',
  'fade-right': 'reveal-right',
  'fade-in': 'reveal-fade',
  'scale': 'reveal-scale',
  'blur': 'reveal-blur',
} as const;

export type AnimationType = keyof typeof ANIMATION_CLASSES;
export type EasingType = keyof typeof EASING;
export type TimingType = keyof typeof TIMING;
