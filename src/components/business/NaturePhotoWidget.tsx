 import { natureSummer1, natureSpring2, natureAutumn2, natureWinter1 } from "@/config/natureHeroImages";
 
 interface NaturePhotoWidgetProps {
   variant?: 'grid' | 'single' | 'strip';
   className?: string;
 }
 
 /**
  * Premium nature photo widget for visual accent
  * Creates a polished, magazine-style photo display
  */
 export const NaturePhotoWidget = ({ 
   variant = 'strip',
   className = '' 
 }: NaturePhotoWidgetProps) => {
   const photos = [
     { src: natureSummer1, alt: "Summer lavender fields" },
     { src: natureSpring2, alt: "Spring lake reflection" },
     { src: natureAutumn2, alt: "Autumn vineyard" },
     { src: natureWinter1, alt: "Winter forest" },
   ];
 
   if (variant === 'strip') {
     return (
       <div className={`relative py-8 overflow-hidden ${className}`}>
         <div className="container mx-auto px-4">
           {/* Section header */}
           <div className="text-center mb-6">
             <p className="text-sm font-medium text-muted-foreground tracking-wider uppercase">
               Inspired by Nature • Built for Business
             </p>
           </div>
           
           {/* Photo strip */}
           <div className="flex justify-center gap-4 overflow-hidden">
             {photos.map((photo, index) => (
               <div 
                 key={index}
                 className="relative w-32 h-20 md:w-48 md:h-28 rounded-xl overflow-hidden shadow-lg group"
                 style={{
                   transform: `rotate(${(index - 1.5) * 3}deg)`,
                 }}
               >
                 <img 
                   src={photo.src} 
                   alt={photo.alt}
                   className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                   loading="lazy"
                   decoding="async"
                 />
                 {/* Overlay gradient */}
                 <div 
                   className="absolute inset-0 opacity-20"
                   style={{
                     background: 'linear-gradient(135deg, transparent 0%, hsl(var(--coral-400)) 100%)',
                   }}
                 />
                 {/* Border glow on hover */}
                 <div className="absolute inset-0 border-2 border-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
               </div>
             ))}
           </div>
         </div>
       </div>
     );
   }
 
   if (variant === 'grid') {
     return (
       <div className={`grid grid-cols-2 gap-3 ${className}`}>
         {photos.slice(0, 4).map((photo, index) => (
           <div 
             key={index}
             className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-md group"
           >
             <img 
               src={photo.src} 
               alt={photo.alt}
               className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
               loading="lazy"
               decoding="async"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
           </div>
         ))}
       </div>
     );
   }
 
   // Single variant
   return (
     <div className={`relative aspect-video rounded-2xl overflow-hidden shadow-xl ${className}`}>
       <img 
         src={photos[0].src} 
         alt={photos[0].alt}
         className="w-full h-full object-cover"
         loading="lazy"
         decoding="async"
       />
       <div 
         className="absolute inset-0"
         style={{
           background: 'linear-gradient(135deg, transparent 50%, hsl(var(--coral-400) / 0.2) 100%)',
         }}
       />
     </div>
   );
 };
 
 export default NaturePhotoWidget;