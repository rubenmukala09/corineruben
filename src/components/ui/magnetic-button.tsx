import React, { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { throttle } from "@/utils/performanceOptimization";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className,
  strength = 0.3,
  onClick,
  disabled,
  type = "button",
}) => {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Throttled mouse move handler to reduce forced reflows
  const handleMouseMove = useCallback(
    throttle((e: React.MouseEvent<HTMLDivElement>) => {
      const button = buttonRef.current;
      if (!button || disabled) return;

      requestAnimationFrame(() => {
        const rect = button.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const distanceX = (e.clientX - centerX) * strength;
        const distanceY = (e.clientY - centerY) * strength;

        setPosition({ x: distanceX, y: distanceY });
      });
    }, 16),
    [disabled, strength]
  );

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={buttonRef}
      className={cn("inline-block cursor-pointer", className)}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={disabled ? undefined : onClick}
    >
      {children}
    </motion.div>
  );
};

// Wrapper for existing Button components
interface MagneticWrapperProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

export const MagneticWrapper: React.FC<MagneticWrapperProps> = ({
  children,
  className,
  strength = 0.3,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Throttled mouse move handler to reduce forced reflows
  const handleMouseMove = useCallback(
    throttle((e: React.MouseEvent<HTMLDivElement>) => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;

      requestAnimationFrame(() => {
        const rect = wrapper.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const distanceX = (e.clientX - centerX) * strength;
        const distanceY = (e.clientY - centerY) * strength;

        setPosition({ x: distanceX, y: distanceY });
      });
    }, 16),
    [strength]
  );

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={wrapperRef}
      className={cn("inline-block", className)}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
};

export default MagneticButton;
