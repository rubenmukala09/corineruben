 import { motion } from "framer-motion";
 
 interface GlassmorphismBackgroundProps {
   children: React.ReactNode;
   className?: string;
   variant?: "default" | "coral" | "lavender" | "mixed";
  skeuomorphic?: boolean;
 }
 
 export const GlassmorphismBackground = ({ 
   children, 
   className = "",
  variant = "mixed",
  skeuomorphic = true
 }: GlassmorphismBackgroundProps) => {
   const getGradientColors = () => {
     switch (variant) {
       case "coral":
         return {
           orb1: "from-coral-300/40 to-coral-400/20",
           orb2: "from-coral-200/30 to-coral-300/15",
           orb3: "from-lavender-200/25 to-coral-200/15",
         };
       case "lavender":
         return {
           orb1: "from-lavender-300/40 to-lavender-400/20",
           orb2: "from-lavender-200/30 to-lavender-300/15",
           orb3: "from-coral-200/25 to-lavender-200/15",
         };
       case "mixed":
       default:
         return {
           orb1: "from-coral-300/35 to-lavender-300/20",
           orb2: "from-lavender-200/30 to-coral-200/15",
           orb3: "from-coral-200/25 to-lavender-200/20",
         };
     }
   };
 
   const colors = getGradientColors();
 
   return (
     <div className={`relative overflow-hidden ${className}`}>
       {/* Base gradient background */}
       <div 
         className="absolute inset-0 pointer-events-none"
         style={{
           background: "linear-gradient(135deg, hsl(var(--background)) 0%, hsl(30 25% 97%) 25%, hsl(var(--background)) 50%, hsl(340 20% 97%) 75%, hsl(var(--background)) 100%)",
         }}
       />
       
       {/* Animated floating orbs */}
       <motion.div
         className={`absolute -top-32 -left-32 w-96 h-96 rounded-full bg-gradient-to-br ${colors.orb1} blur-3xl pointer-events-none`}
         animate={{
           x: [0, 50, 0],
           y: [0, 30, 0],
           scale: [1, 1.1, 1],
         }}
         transition={{
           duration: 20,
           repeat: Infinity,
           ease: "easeInOut",
         }}
       />
       
       <motion.div
         className={`absolute top-1/4 -right-24 w-80 h-80 rounded-full bg-gradient-to-br ${colors.orb2} blur-3xl pointer-events-none`}
         animate={{
           x: [0, -40, 0],
           y: [0, 50, 0],
           scale: [1, 1.15, 1],
         }}
         transition={{
           duration: 18,
           repeat: Infinity,
           ease: "easeInOut",
           delay: 2,
         }}
       />
       
       <motion.div
         className={`absolute bottom-1/4 left-1/4 w-72 h-72 rounded-full bg-gradient-to-br ${colors.orb3} blur-3xl pointer-events-none`}
         animate={{
           x: [0, 30, 0],
           y: [0, -40, 0],
           scale: [1, 1.08, 1],
         }}
         transition={{
           duration: 22,
           repeat: Infinity,
           ease: "easeInOut",
           delay: 4,
         }}
       />
       
       <motion.div
         className={`absolute -bottom-20 right-1/3 w-64 h-64 rounded-full bg-gradient-to-br from-coral-200/20 to-lavender-300/15 blur-3xl pointer-events-none`}
         animate={{
           x: [0, -20, 0],
           y: [0, 20, 0],
           scale: [1, 1.12, 1],
         }}
         transition={{
           duration: 25,
           repeat: Infinity,
           ease: "easeInOut",
           delay: 6,
         }}
       />
       
       {/* Mesh gradient overlay */}
       <div 
         className="absolute inset-0 pointer-events-none opacity-40"
         style={{
           backgroundImage: `
             radial-gradient(at 20% 30%, hsl(var(--coral-200) / 0.3) 0%, transparent 50%),
             radial-gradient(at 80% 20%, hsl(var(--lavender-200) / 0.25) 0%, transparent 50%),
             radial-gradient(at 50% 80%, hsl(var(--coral-100) / 0.2) 0%, transparent 50%),
             radial-gradient(at 90% 70%, hsl(var(--lavender-100) / 0.2) 0%, transparent 50%)
           `,
         }}
       />
       
       {/* Subtle noise texture */}
       <div 
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
         style={{
           backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
         }}
       />
       
      {/* Skeuomorphic ambient lighting */}
      {skeuomorphic && (
        <>
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `
                radial-gradient(ellipse 80% 50% at 20% 20%, hsl(var(--coral-200) / 0.15) 0%, transparent 50%),
                radial-gradient(ellipse 60% 40% at 80% 80%, hsl(var(--lavender-200) / 0.12) 0%, transparent 50%)
              `,
            }}
          />
          {/* Top edge highlight for depth */}
          <div 
            className="absolute top-0 left-0 right-0 h-px pointer-events-none"
            style={{
              background: 'linear-gradient(90deg, transparent 10%, rgba(255,255,255,0.8) 50%, transparent 90%)',
            }}
          />
        </>
      )}
      
       {/* Floating glass particles */}
       <div className="absolute inset-0 pointer-events-none overflow-hidden">
         {[...Array(6)].map((_, i) => (
           <motion.div
             key={i}
             className="absolute w-2 h-2 rounded-full bg-gradient-to-br from-white/40 to-white/10 backdrop-blur-sm"
             style={{
               left: `${15 + i * 15}%`,
               top: `${20 + (i % 3) * 25}%`,
             }}
             animate={{
               y: [0, -30, 0],
               opacity: [0.3, 0.6, 0.3],
               scale: [1, 1.2, 1],
             }}
             transition={{
               duration: 8 + i * 2,
               repeat: Infinity,
               ease: "easeInOut",
               delay: i * 1.5,
             }}
           />
         ))}
       </div>
       
       {/* Content */}
       <div className="relative z-10">
         {children}
       </div>
     </div>
   );
 };
 
 export default GlassmorphismBackground;