import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export const ScrollProgressIndicator = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 z-[100] origin-left"
        style={{
          scaleX,
          background:
            "linear-gradient(90deg, hsl(var(--primary)) 0%, hsl(var(--accent)) 50%, hsl(265 55% 42%) 100%)",
        }}
      />

      {/* Glowing effect underneath */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-2 z-[99] origin-left blur-sm opacity-50"
        style={{
          scaleX,
          background:
            "linear-gradient(90deg, hsl(var(--primary)) 0%, hsl(var(--accent)) 100%)",
        }}
      />

      {/* Scroll to top button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isVisible ? 1 : 0.8,
          pointerEvents: isVisible ? "auto" : "none",
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full glass-heavy shadow-3d flex items-center justify-center hover:shadow-3d-lg transition-shadow group"
        aria-label="Scroll to top"
      >
        {/* Circular progress around button */}
        <svg className="absolute inset-0 w-12 h-12 -rotate-90">
          <motion.circle
            cx="24"
            cy="24"
            r="20"
            fill="none"
            stroke="url(#progressGradient)"
            strokeWidth="2"
            strokeLinecap="round"
            style={{
              pathLength: scrollYProgress,
            }}
            className="opacity-80"
          />
          <defs>
            <linearGradient
              id="progressGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="hsl(var(--primary))" />
              <stop offset="100%" stopColor="hsl(var(--accent))" />
            </linearGradient>
          </defs>
        </svg>

        {/* Arrow icon */}
        <motion.svg
          className="w-5 h-5 text-foreground group-hover:text-primary transition-colors"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          animate={{ y: isVisible ? [0, -2, 0] : 0 }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </motion.svg>
      </motion.button>
    </>
  );
};

export default ScrollProgressIndicator;
