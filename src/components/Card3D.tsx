import { ReactNode, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { throttle } from "@/utils/performanceOptimization";

interface Card3DProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
}

const Card3D = ({ children, className = "", intensity = 10 }: Card3DProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  // Throttled mouse move handler to reduce forced reflows
  const handleMouseMove = useCallback(
    throttle((e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return;

      requestAnimationFrame(() => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateXValue = ((y - centerY) / centerY) * -intensity;
        const rotateYValue = ((x - centerX) / centerX) * intensity;

        setRotateX(rotateXValue);
        setRotateY(rotateYValue);
      });
    }, 16),
    [intensity]
  );

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovering(false);
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      animate={{
        rotateX,
        rotateY,
        scale: isHovering ? 1.02 : 1
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30
      }}
      style={{
        transformStyle: "preserve-3d",
        transformPerspective: 1000
      }}
      className={cn("relative", className)}
    >
      <motion.div
        animate={{
          boxShadow: isHovering 
            ? "0 20px 60px -10px rgba(139, 92, 246, 0.5)"
            : "0 10px 30px -10px rgba(139, 92, 246, 0.3)"
        }}
        transition={{ duration: 0.3 }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default Card3D;
