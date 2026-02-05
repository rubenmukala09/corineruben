 import { cn } from "@/lib/utils";
 
 interface PremiumSectionDividerProps {
   className?: string;
 }
 
 /**
  * Premium glassmorphism section divider with decorative accents
  */
 export const PremiumSectionDivider = ({ className }: PremiumSectionDividerProps) => {
   return (
     <div className={cn("relative py-8 overflow-hidden", className)}>
       <div className="container mx-auto px-4">
         <div className="flex items-center justify-center gap-6">
           {/* Left decorative line */}
           <div className="flex-1 h-px bg-gradient-to-r from-transparent via-coral-300/50 to-coral-400/30" />
           
           {/* Center decorative element */}
           <div className="relative flex items-center gap-3">
             <div 
               className="w-2 h-2 rounded-full"
               style={{ background: 'linear-gradient(135deg, #F8926A 0%, #BB81B5 100%)' }}
             />
             <div 
               className="w-3 h-3 rounded-full"
               style={{ background: 'linear-gradient(135deg, #BB81B5 0%, #F8926A 100%)' }}
             />
             <div 
               className="w-2 h-2 rounded-full"
               style={{ background: 'linear-gradient(135deg, #F8926A 0%, #BB81B5 100%)' }}
             />
           </div>
           
           {/* Right decorative line */}
           <div className="flex-1 h-px bg-gradient-to-l from-transparent via-lavender-300/50 to-lavender-400/30" />
         </div>
       </div>
     </div>
   );
 };
 
 export default PremiumSectionDivider;