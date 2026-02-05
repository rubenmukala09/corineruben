 import { useState, useRef, useCallback } from 'react';
 import { motion } from 'framer-motion';
 import { cn } from '@/lib/utils';
 
 interface GlassmorphismImageProps {
   src: string;
   alt: string;
   className?: string;
   imageClassName?: string;
   width?: number;
   height?: number;
   overlayColor?: 'coral' | 'lavender' | 'navy' | 'mixed';
   disabled?: boolean;
   intensity?: 'subtle' | 'normal' | 'strong';
 }
 
 /**
  * Premium Image component with cursor-following glassmorphism spotlight effect
  * Features: dynamic lighting, color-shifting overlay, and premium glass aesthetics
  */
 export function GlassmorphismImage({
   src,
   alt,
   className,
   imageClassName,
   width,
   height,
   overlayColor = 'mixed',
   disabled = false,
   intensity = 'normal',
 }: GlassmorphismImageProps) {
   const containerRef = useRef<HTMLDivElement>(null);
   const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
   const [isHovering, setIsHovering] = useState(false);
   const [isLoaded, setIsLoaded] = useState(false);
 
   const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
     if (disabled || !containerRef.current) return;
     const rect = containerRef.current.getBoundingClientRect();
     const x = ((e.clientX - rect.left) / rect.width) * 100;
     const y = ((e.clientY - rect.top) / rect.height) * 100;
     setMousePosition({ x, y });
   }, [disabled]);
 
   const intensityConfig = {
     subtle: { spotSize: 120, opacity: 0.6 },
     normal: { spotSize: 180, opacity: 0.85 },
     strong: { spotSize: 220, opacity: 1 },
   };
   
   const config = intensityConfig[intensity];
 
   const colorStyles = {
     coral: {
       gradient: 'linear-gradient(135deg, rgba(248,146,106,0.35) 0%, rgba(248,146,106,0.15) 50%, transparent 100%)',
       spotColor: 'rgba(248,146,106,0.5)',
       borderColor: 'rgba(248,146,106,0.6)',
       glowColor: 'rgba(248,146,106,0.35)',
     },
     lavender: {
       gradient: 'linear-gradient(135deg, rgba(187,129,181,0.35) 0%, rgba(187,129,181,0.15) 50%, transparent 100%)',
       spotColor: 'rgba(187,129,181,0.5)',
       borderColor: 'rgba(187,129,181,0.6)',
       glowColor: 'rgba(187,129,181,0.35)',
     },
     navy: {
       gradient: 'linear-gradient(135deg, rgba(24,48,90,0.35) 0%, rgba(24,48,90,0.15) 50%, transparent 100%)',
       spotColor: 'rgba(24,48,90,0.5)',
       borderColor: 'rgba(24,48,90,0.6)',
       glowColor: 'rgba(24,48,90,0.35)',
     },
     mixed: {
       gradient: 'linear-gradient(135deg, rgba(248,146,106,0.3) 0%, rgba(187,129,181,0.25) 50%, rgba(24,48,90,0.2) 100%)',
       spotColor: 'rgba(255,255,255,0.6)',
       borderColor: 'rgba(255,255,255,0.7)',
       glowColor: 'rgba(248,146,106,0.3)',
     },
   };
 
   const colors = colorStyles[overlayColor];
 
   return (
     <div
       ref={containerRef}
       className={cn(
         'relative overflow-hidden rounded-2xl group cursor-pointer transform-gpu',
         className
       )}
       onMouseMove={handleMouseMove}
       onMouseEnter={() => !disabled && setIsHovering(true)}
       onMouseLeave={() => setIsHovering(false)}
       style={{
         boxShadow: isHovering 
           ? `0 25px 50px -12px ${colors.glowColor}, 0 0 0 1px ${colors.borderColor}`
           : '0 10px 40px -10px rgba(0,0,0,0.1)',
         transition: 'box-shadow 0.4s ease-out, transform 0.4s ease-out',
         transform: isHovering ? 'translateY(-4px)' : 'translateY(0)',
       }}
     >
       {/* Base Image */}
       <img
         src={src}
         alt={alt}
         width={width}
         height={height}
         loading="lazy"
         decoding="async"
         onLoad={() => setIsLoaded(true)}
         className={cn(
           'w-full h-full object-cover transition-all duration-700 ease-out',
           isHovering && 'scale-[1.06] brightness-105',
           !isLoaded && 'opacity-0',
           imageClassName
         )}
       />
 
       {/* Dynamic Color Wash Overlay */}
       <motion.div 
         className="absolute inset-0 pointer-events-none"
         animate={{ opacity: isHovering ? 1 : 0 }}
         transition={{ duration: 0.4 }}
         style={{
           background: colors.gradient,
           mixBlendMode: 'overlay',
         }}
       />
 
       {/* Premium Cursor-Following Glass Spotlight */}
       {!disabled && (
         <motion.div
           className="absolute pointer-events-none z-10"
           animate={{
             left: `${mousePosition.x}%`,
             top: `${mousePosition.y}%`,
             opacity: isHovering ? config.opacity : 0,
             scale: isHovering ? 1 : 0.5,
           }}
           transition={{ 
             type: 'spring', 
             stiffness: 180, 
             damping: 22,
             opacity: { duration: 0.3 },
             scale: { duration: 0.4 },
           }}
           style={{
             width: `${config.spotSize}px`,
             height: `${config.spotSize}px`,
             marginLeft: `-${config.spotSize / 2}px`,
             marginTop: `-${config.spotSize / 2}px`,
           }}
         >
           {/* Outer Glow Ring */}
           <div 
             className="absolute inset-0 rounded-full blur-2xl"
             style={{
               background: `radial-gradient(circle, ${colors.spotColor} 0%, transparent 70%)`,
               transform: 'scale(1.6)',
             }}
           />
           {/* Inner Glass Circle */}
           <div 
             className="absolute inset-3 rounded-full backdrop-blur-xl border-2"
             style={{
               background: 'linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.15) 100%)',
               borderColor: 'rgba(255,255,255,0.7)',
               boxShadow: `
                 inset 0 2px 4px rgba(255,255,255,0.6),
                 0 8px 32px rgba(0,0,0,0.12),
                 0 0 80px ${colors.spotColor}
               `,
             }}
           />
           {/* Center Highlight */}
           <div 
             className="absolute inset-8 rounded-full"
             style={{
               background: 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, transparent 70%)',
             }}
           />
         </motion.div>
       )}
 
       {/* Premium Edge Frame */}
       <motion.div 
         className="absolute inset-0 rounded-2xl pointer-events-none"
         animate={{ opacity: isHovering ? 1 : 0 }}
         transition={{ duration: 0.3 }}
         style={{
           border: `2px solid ${colors.borderColor}`,
           boxShadow: `inset 0 0 50px rgba(255,255,255,0.2)`,
         }}
       />
 
       {/* Corner Shine Effects */}
       {isHovering && (
         <>
           <motion.div 
             className="absolute top-0 left-0 w-28 h-28 pointer-events-none"
             initial={{ opacity: 0 }}
             animate={{ opacity: 0.9 }}
             transition={{ duration: 0.5 }}
             style={{
               background: 'linear-gradient(135deg, rgba(255,255,255,0.5) 0%, transparent 60%)',
             }}
           />
           <motion.div 
             className="absolute bottom-0 right-0 w-36 h-36 pointer-events-none"
             initial={{ opacity: 0 }}
             animate={{ opacity: 0.7 }}
             transition={{ duration: 0.5, delay: 0.1 }}
             style={{
               background: 'linear-gradient(315deg, rgba(255,255,255,0.35) 0%, transparent 60%)',
             }}
           />
         </>
       )}
 
       {/* Subtle Vignette */}
       <div 
         className="absolute inset-0 pointer-events-none opacity-30"
         style={{
           background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.25) 100%)',
         }}
       />
     </div>
   );
 }
 
 export default GlassmorphismImage;