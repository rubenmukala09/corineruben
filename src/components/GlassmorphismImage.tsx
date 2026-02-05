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
 }
 
 /**
  * Image component with cursor-following glassmorphism overlay effect
  * Premium interactive hover effect with theme layer colors
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
 }: GlassmorphismImageProps) {
   const containerRef = useRef<HTMLDivElement>(null);
   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
   const [isHovering, setIsHovering] = useState(false);
 
   const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
     if (disabled || !containerRef.current) return;
     
     const rect = containerRef.current.getBoundingClientRect();
     const x = ((e.clientX - rect.left) / rect.width) * 100;
     const y = ((e.clientY - rect.top) / rect.height) * 100;
     setMousePosition({ x, y });
   }, [disabled]);
 
   const overlayGradients = {
     coral: 'from-coral-400/30 via-coral-300/20 to-transparent',
     lavender: 'from-lavender-400/30 via-lavender-300/20 to-transparent',
     navy: 'from-navy-400/30 via-navy-300/20 to-transparent',
     mixed: 'from-coral-400/25 via-lavender-400/20 to-navy-300/15',
   };
 
   const borderGradients = {
     coral: 'border-coral-300/40',
     lavender: 'border-lavender-300/40',
     navy: 'border-navy-300/40',
     mixed: 'border-white/50',
   };
 
   return (
     <div
       ref={containerRef}
       className={cn(
         'relative overflow-hidden rounded-2xl group cursor-pointer',
         className
       )}
       onMouseMove={handleMouseMove}
       onMouseEnter={() => !disabled && setIsHovering(true)}
       onMouseLeave={() => setIsHovering(false)}
     >
       {/* Base Image */}
       <img
         src={src}
         alt={alt}
         width={width}
         height={height}
         loading="lazy"
         decoding="async"
         className={cn(
           'w-full h-full object-cover transition-transform duration-500',
           isHovering && 'scale-105',
           imageClassName
         )}
       />
 
       {/* Theme Layer Color Overlay */}
       <div 
         className={cn(
           'absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-300',
           overlayGradients[overlayColor],
           isHovering && 'opacity-100'
         )}
       />
 
       {/* Cursor-following Glassmorphism Spotlight */}
       {!disabled && (
         <motion.div
           className="absolute pointer-events-none"
           animate={{
             left: `${mousePosition.x}%`,
             top: `${mousePosition.y}%`,
             opacity: isHovering ? 1 : 0,
           }}
           transition={{ type: 'spring', stiffness: 300, damping: 30 }}
           style={{
             width: '180px',
             height: '180px',
             marginLeft: '-90px',
             marginTop: '-90px',
           }}
         >
           <div className="w-full h-full rounded-full bg-white/20 backdrop-blur-md border border-white/40 shadow-[0_8px_32px_rgba(255,255,255,0.25)]" />
         </motion.div>
       )}
 
       {/* Edge Glow Effect */}
       <div 
         className={cn(
           'absolute inset-0 rounded-2xl border-2 transition-all duration-300',
           borderGradients[overlayColor],
           isHovering ? 'opacity-100 shadow-lg' : 'opacity-0'
         )}
         style={{
           boxShadow: isHovering 
             ? `inset 0 0 30px rgba(255,255,255,0.1), 0 0 20px rgba(248,146,106,0.15)` 
             : 'none'
         }}
       />
 
       {/* Bottom Gradient Fade */}
       <div 
         className={cn(
           'absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/30 to-transparent transition-opacity duration-300',
           isHovering ? 'opacity-100' : 'opacity-0'
         )}
       />
     </div>
   );
 }
 
 export default GlassmorphismImage;