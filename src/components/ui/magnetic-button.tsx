import React, { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

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
  const boundsRef = useRef<{ centerX: number; centerY: number } | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Cache bounds on mouse enter to avoid forced reflows during mouse move
  const handleMouseEnter = useCallback(() => {
    const button = buttonRef.current;
    if (!button || disabled) return;
    
    const rect = button.getBoundingClientRect();
    boundsRef.current = {
      centerX: rect.left + rect.width / 2,
      centerY: rect.top + rect.height / 2,
    };
  }, [disabled]);

  // Use cached bounds - no layout reads during mouse move
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!boundsRef.current || disabled) return;

      const distanceX = (e.clientX - boundsRef.current.centerX) * strength;
      const distanceY = (e.clientY - boundsRef.current.centerY) * strength;

      setPosition({ x: distanceX, y: distanceY });
    },
    [disabled, strength]
  );

  const handleMouseLeave = useCallback(() => {
    setPosition({ x: 0, y: 0 });
    boundsRef.current = null;
  }, []);

  return (
    <motion.div
      ref={buttonRef}
      className={cn("inline-block cursor-pointer", className)}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      onMouseEnter={handleMouseEnter}
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
  const boundsRef = useRef<{ centerX: number; centerY: number } | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Cache bounds on mouse enter to avoid forced reflows during mouse move
  const handleMouseEnter = useCallback(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    
    const rect = wrapper.getBoundingClientRect();
    boundsRef.current = {
      centerX: rect.left + rect.width / 2,
      centerY: rect.top + rect.height / 2,
    };
  }, []);

  // Use cached bounds - no layout reads during mouse move
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!boundsRef.current) return;

      const distanceX = (e.clientX - boundsRef.current.centerX) * strength;
      const distanceY = (e.clientY - boundsRef.current.centerY) * strength;

      setPosition({ x: distanceX, y: distanceY });
    },
    [strength]
  );

  const handleMouseLeave = useCallback(() => {
    setPosition({ x: 0, y: 0 });
    boundsRef.current = null;
  }, []);

  return (
    <motion.div
      ref={wrapperRef}
      className={cn("inline-block", className)}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
};

export default MagneticButton;
