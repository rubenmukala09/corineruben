 import { natureSummer1, natureSpring2, natureAutumn2 } from "@/config/natureHeroImages";
 
 interface DecorativeNatureAccentProps {
   variant?: 'left' | 'right' | 'both';
   className?: string;
 }
 
 /**
  * Premium decorative nature photo accents for sections
  * Uses beautiful natural imagery to create an upscale, welcoming feel
  */
 export const DecorativeNatureAccent = ({ 
   variant = 'right', 
   className = '' 
 }: DecorativeNatureAccentProps) => {
   return (
     <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
       {/* Soft gradient overlays */}
       <div className="absolute inset-0 bg-gradient-to-br from-background via-transparent to-transparent opacity-90" />
       
       {(variant === 'right' || variant === 'both') && (
         <div 
           className="absolute -right-20 top-1/4 w-80 h-80 rounded-full overflow-hidden opacity-20"
           style={{ 
             filter: 'blur(1px)',
             transform: 'rotate(-12deg)'
           }}
         >
           <img 
             src={natureSummer1} 
             alt="" 
             aria-hidden="true"
             className="w-full h-full object-cover scale-125"
             loading="lazy"
             decoding="async"
           />
           <div className="absolute inset-0 bg-gradient-to-l from-transparent to-background" />
         </div>
       )}
       
       {(variant === 'left' || variant === 'both') && (
         <div 
           className="absolute -left-20 bottom-1/4 w-72 h-72 rounded-full overflow-hidden opacity-15"
           style={{ 
             filter: 'blur(1px)',
             transform: 'rotate(15deg)'
           }}
         >
           <img 
             src={natureSpring2} 
             alt="" 
             aria-hidden="true"
             className="w-full h-full object-cover scale-125"
             loading="lazy"
             decoding="async"
           />
           <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background" />
         </div>
       )}
     </div>
   );
 };
 
 export default DecorativeNatureAccent;