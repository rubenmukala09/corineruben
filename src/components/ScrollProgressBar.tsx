import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

const ScrollProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed left-0 top-0 w-1 h-full bg-gradient-to-b from-primary via-accent to-primary z-50 origin-top"
      style={{ scaleY }}
    />
  );
};

export default ScrollProgressBar;
