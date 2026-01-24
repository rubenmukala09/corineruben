// ============================================
// MINIMAL ANIMATION VARIANTS - Maximum speed
// ============================================

const FAST = 0.1;
const EASE = [0.4, 0, 0.2, 1] as const;

// Fade in (simple)
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: FAST, ease: EASE } }
};

// Fade up
export const fadeUp = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: FAST, ease: EASE } }
};

// Scale in
export const scaleIn = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: { opacity: 1, scale: 1, transition: { duration: FAST, ease: EASE } }
};

// Stagger container
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.03, delayChildren: 0.02 }
  }
};

// Stagger item
export const staggerItem = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: FAST, ease: EASE } }
};

// Modal animation
export const modalAnimation = {
  initial: { opacity: 0, scale: 0.98 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.08 } },
  exit: { opacity: 0, transition: { duration: 0.05 } }
};

// ===== LEGACY EXPORTS =====
export const blurReveal = fadeUp;
export const elasticPop = scaleIn;
export const sweepUp = fadeUp;
export const diagonalReveal = fadeUp;
export const morphScale = scaleIn;
export const cascadeContainer = staggerContainer;
export const cascadeItem = staggerItem;
export const waveContainer = staggerContainer;
export const waveItem = staggerItem;
export const fadeInUp = fadeUp;
export const fadeInDown = fadeUp;
export const fadeInLeft = fadeUp;
export const fadeInRight = fadeUp;
export const slideInFromBottom = fadeUp;
export const slideLeft = fadeUp;
export const slideRight = fadeUp;
export const hoverScale = { rest: { scale: 1 }, hover: { scale: 1.02 }, tap: { scale: 0.98 } };
export const floatAnimation = { animate: {} };
export const rotateAnimation = { animate: {} };
export const glowFloat = floatAnimation;
export const breathe = floatAnimation;
export const orbit = rotateAnimation;
export const magneticHover = hoverScale;
export const pulseGlow = floatAnimation;
export const letterAnimation = staggerItem;
export const textReveal = staggerItem;
export const cardFlip = scaleIn;
export const cinematicPage = fadeIn;
export const pageTransition = fadeIn;
export const curtainReveal = fadeIn;
export const shimmerGradient = floatAnimation;
