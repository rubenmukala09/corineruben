import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

interface ReadingProgressBarProps {
  showPercentage?: boolean;
  containerRef?: React.RefObject<HTMLElement>;
}

export const ReadingProgressBar = ({ 
  showPercentage = true,
  containerRef 
}: ReadingProgressBarProps) => {
  const [percentage, setPercentage] = useState(0);
  const targetRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      setPercentage(Math.round(latest * 100));
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <div ref={targetRef} className="fixed top-0 left-0 right-0 z-[60] h-1">
      <motion.div
        className="h-full bg-gradient-to-r from-primary via-accent to-primary origin-left"
        style={{ scaleX }}
      />
      {showPercentage && percentage > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-2 right-4 bg-background/90 backdrop-blur-sm border border-border/50 rounded-full px-3 py-1 text-xs font-medium text-foreground shadow-sm"
        >
          {percentage}% read
        </motion.div>
      )}
    </div>
  );
};

export default ReadingProgressBar;
