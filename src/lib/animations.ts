// Fresh Animation Variants for Framer Motion - 2025 Edition

// Elegant reveal with blur
export const blurReveal = {
  hidden: { opacity: 0, filter: "blur(12px)", y: 20 },
  visible: { 
    opacity: 1, 
    filter: "blur(0px)",
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
  }
};

// Smooth elastic bounce in
export const elasticPop = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 0.6, 
      ease: [0.34, 1.56, 0.64, 1] // Spring-like bounce
    }
  }
};

// Graceful slide from bottom with rotation
export const sweepUp = {
  hidden: { opacity: 0, y: 60, rotateX: 15 },
  visible: { 
    opacity: 1, 
    y: 0,
    rotateX: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
};

// Diagonal slide entrance
export const diagonalReveal = {
  hidden: { opacity: 0, x: -40, y: 40 },
  visible: { 
    opacity: 1, 
    x: 0,
    y: 0,
    transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }
  }
};

// Morphing scale with glow effect
export const morphScale = {
  hidden: { opacity: 0, scale: 0.92, filter: "brightness(0.8)" },
  visible: { 
    opacity: 1, 
    scale: 1,
    filter: "brightness(1)",
    transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] }
  }
};

// Cascade stagger container - elegant timing
export const cascadeContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
      ease: "easeOut"
    }
  }
};

// Cascade stagger item
export const cascadeItem = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  }
};

// Wave stagger for lists
export const waveContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  }
};

export const waveItem = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.4, ease: "easeOut" }
  }
};

// Cinematic page transition
export const cinematicPage = {
  initial: { opacity: 0, y: 8, filter: "blur(4px)" },
  animate: { 
    opacity: 1, 
    y: 0,
    filter: "blur(0px)",
    transition: { 
      duration: 0.45, 
      ease: [0.22, 1, 0.36, 1]
    }
  },
  exit: { 
    opacity: 0, 
    y: -8,
    filter: "blur(2px)",
    transition: { duration: 0.25, ease: "easeIn" }
  }
};

// Smooth curtain reveal
export const curtainReveal = {
  initial: { clipPath: "inset(0 100% 0 0)" },
  animate: { 
    clipPath: "inset(0 0% 0 0)",
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
  },
  exit: { 
    clipPath: "inset(0 0 0 100%)",
    transition: { duration: 0.5, ease: "easeIn" }
  }
};

// Character by character text reveal
export const textReveal = {
  hidden: { opacity: 0, y: 20, rotateX: -40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      delay: i * 0.04,
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1]
    }
  })
};

// Glowing float animation
export const glowFloat = {
  animate: {
    y: [0, -12, 0],
    boxShadow: [
      "0 8px 32px hsl(var(--primary) / 0.15)",
      "0 16px 48px hsl(var(--primary) / 0.25)",
      "0 8px 32px hsl(var(--primary) / 0.15)"
    ],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Breathing pulse
export const breathe = {
  animate: {
    scale: [1, 1.03, 1],
    opacity: [0.9, 1, 0.9],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Orbit rotation
export const orbit = {
  animate: {
    rotate: 360,
    transition: {
      duration: 25,
      repeat: Infinity,
      ease: "linear"
    }
  }
};

// Shimmer gradient animation
export const shimmerGradient = {
  animate: {
    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: "linear"
    }
  }
};

// Magnetic hover effect
export const magneticHover = {
  rest: { scale: 1, rotate: 0 },
  hover: { 
    scale: 1.05, 
    transition: { duration: 0.25, ease: "easeOut" } 
  },
  tap: { 
    scale: 0.97, 
    transition: { duration: 0.1 } 
  }
};

// Card flip effect
export const cardFlip = {
  hidden: { 
    opacity: 0, 
    rotateY: -15, 
    scale: 0.95,
    transformPerspective: 1200
  },
  visible: { 
    opacity: 1, 
    rotateY: 0, 
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};

// Legacy exports for compatibility
export const fadeInUp = blurReveal;
export const fadeInDown = {
  hidden: { opacity: 0, y: -30, filter: "blur(8px)" },
  visible: { 
    opacity: 1, 
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};
export const fadeInLeft = {
  hidden: { opacity: 0, x: -40, filter: "blur(6px)" },
  visible: { 
    opacity: 1, 
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};
export const fadeInRight = {
  hidden: { opacity: 0, x: 40, filter: "blur(6px)" },
  visible: { 
    opacity: 1, 
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};
export const scaleIn = elasticPop;
export const staggerContainer = cascadeContainer;
export const staggerItem = cascadeItem;
export const slideInFromBottom = sweepUp;
export const pageTransition = cinematicPage;
export const letterAnimation = textReveal;
export const floatingAnimation = glowFloat;
export const pulseGlow = breathe;
