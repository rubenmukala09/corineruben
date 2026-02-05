 import { ReactNode } from "react";
 import { cn } from "@/lib/utils";
 
 interface SkeuomorphicSectionProps {
   children: ReactNode;
   className?: string;
   variant?: "coral" | "lavender" | "mixed" | "neutral";
   withAmbient?: boolean;
   withTopHighlight?: boolean;
  id?: string;
 }
 
 export const SkeuomorphicSection = ({
   children,
   className = "",
   variant = "mixed",
   withAmbient = true,
   withTopHighlight = true,
  id,
 }: SkeuomorphicSectionProps) => {
   const getAmbientStyle = () => {
     switch (variant) {
       case "coral":
         return "radial-gradient(ellipse 100% 60% at 30% 0%, hsl(var(--coral-200) / 0.2) 0%, transparent 60%)";
       case "lavender":
         return "radial-gradient(ellipse 100% 60% at 70% 100%, hsl(var(--lavender-200) / 0.2) 0%, transparent 60%)";
       case "mixed":
         return `
           radial-gradient(ellipse 80% 50% at 20% 20%, hsl(var(--coral-200) / 0.12) 0%, transparent 50%),
           radial-gradient(ellipse 60% 40% at 80% 80%, hsl(var(--lavender-200) / 0.1) 0%, transparent 50%)
         `;
       default:
         return "none";
     }
   };
 
   return (
    <section id={id} className={cn("relative overflow-hidden", className)}>
       {/* Ambient lighting based on variant */}
       {withAmbient && (
         <div 
           className="absolute inset-0 pointer-events-none"
           style={{ background: getAmbientStyle() }}
         />
       )}
       
       {/* Top edge highlight for physical depth */}
       {withTopHighlight && (
         <div 
           className="absolute top-0 left-0 right-0 h-px pointer-events-none z-10"
           style={{
             background: 'linear-gradient(90deg, transparent 5%, rgba(255,255,255,0.6) 30%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0.6) 70%, transparent 95%)',
           }}
         />
       )}
       
       {/* Subtle noise texture for material feel */}
       <div 
         className="absolute inset-0 pointer-events-none opacity-[0.015]"
         style={{
           backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
         }}
       />
       
       {/* Content */}
       <div className="relative z-10">
         {children}
       </div>
     </section>
   );
 };
 
 export default SkeuomorphicSection;