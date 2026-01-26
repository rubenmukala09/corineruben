import { ReactNode, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Card3DProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
}

const Card3D = ({ children, className = "", intensity = 10 }: Card3DProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const boundsRef = useRef<{ width: number; height: number; left: number; top: number } | null>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  // Cache bounds on mouse enter with rAF to avoid forced reflows
  const handleMouseEnter = useCallback(() => {
    if (!ref.current) return;
    
    const element = ref.current;
    setIsHovering(true);
    
    // Defer geometry read to next frame to avoid forced reflow
    requestAnimationFrame(() => {
      const rect = element.getBoundingClientRect();
      boundsRef.current = {
        width: rect.width,
        height: rect.height,
        left: rect.left,
        top: rect.top,
      };
    });
  }, []);

  // Use cached bounds - no layout reads during mouse move
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!boundsRef.current) return;

      const x = e.clientX - boundsRef.current.left;
      const y = e.clientY - boundsRef.current.top;

      const centerX = boundsRef.current.width / 2;
      const centerY = boundsRef.current.height / 2;

      const rotateXValue = ((y - centerY) / centerY) * -intensity;
      const rotateYValue = ((x - centerX) / centerX) * intensity;

      setRotateX(rotateXValue);
      setRotateY(rotateYValue);
    },
    [intensity]
  );

  const handleMouseLeave = useCallback(() => {
    setRotateX(0);
    setRotateY(0);
    setIsHovering(false);
    boundsRef.current = null;
  }, []);

  return (
    <motion.div
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
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
