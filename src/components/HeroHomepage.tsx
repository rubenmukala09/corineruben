 import { Link } from "react-router-dom";
 import { Button } from "@/components/ui/button";
 import { ArrowRight } from "lucide-react";
 import { motion } from "framer-motion";
 import heroFamilySafe from "@/assets/hero-home-family-safe.jpg";
 
 export const HeroHomepage = () => {
   return (
     <section className="relative min-h-screen overflow-hidden">
       {/* Split Background */}
       <div className="absolute inset-0 grid lg:grid-cols-2">
         {/* Left - Deep Luxury Dark */}
         <div className="bg-[#0C0C0C] relative">
           <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_70%_50%,rgba(212,175,55,0.04),transparent)]" />
           {/* Subtle Pattern */}
           <div className="absolute inset-0 opacity-[0.02]" 
             style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23D4AF37" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}
           />
         </div>
         {/* Right - Hero Image */}
         <div className="relative hidden lg:block">
           <img 
             src={heroFamilySafe} 
             alt="Protected family"
             width={960}
             height={1080}
             loading="eager"
             decoding="async"
             className="w-full h-full object-cover"
           />
           <div className="absolute inset-0 bg-gradient-to-r from-[#0C0C0C] via-[#0C0C0C]/50 to-transparent" />
           <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C]/80 via-transparent to-[#0C0C0C]/40" />
           {/* Gold Accent Overlay */}
           <div className="absolute inset-0 mix-blend-overlay bg-gradient-to-br from-[#D4AF37]/10 via-transparent to-[#D4AF37]/5" />
         </div>
       </div>
 
       {/* Decorative Gold Lines */}
       <div className="absolute top-0 left-[50%] w-px h-full bg-gradient-to-b from-[#D4AF37]/0 via-[#D4AF37]/20 to-[#D4AF37]/0 hidden lg:block" />
       <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-[#D4AF37]/0 via-[#D4AF37]/10 to-[#D4AF37]/0" />
 
       {/* Main Content */}
       <div className="relative z-10 min-h-screen flex items-center">
         <div className="container mx-auto px-6 lg:px-12">
           <div className="max-w-2xl py-32 lg:py-0">
             
             {/* Prestige Marker */}
             <motion.div 
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.8 }}
               className="flex items-center gap-4 mb-12"
             >
               <div className="w-12 h-px bg-[#D4AF37]" />
               <span className="text-[11px] font-medium tracking-[0.35em] text-[#D4AF37] uppercase">
                 Est. 2020 — Ohio
               </span>
             </motion.div>
 
             {/* Monumental Headline */}
             <motion.div
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 1, delay: 0.2 }}
             >
               <h1 className="mb-8">
                 <span className="block text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl font-light text-white/90 leading-[1.1] tracking-[-0.02em] mb-3"
                   style={{ fontFamily: "'Clash Display', 'DM Sans', sans-serif" }}>
                   Uncompromising
                 </span>
                 <span className="block text-[3rem] sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1] tracking-[-0.02em]"
                   style={{ 
                     fontFamily: "'Clash Display', 'DM Sans', sans-serif",
                     background: 'linear-gradient(90deg, #D4AF37 0%, #F7E98E 40%, #D4AF37 60%, #AA8C2C 100%)',
                     WebkitBackgroundClip: 'text',
                     WebkitTextFillColor: 'transparent',
                   }}>
                   Protection
                 </span>
               </h1>
             </motion.div>
 
             {/* Refined Body */}
             <motion.p 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, delay: 0.4 }}
               className="text-base md:text-lg text-white/50 mb-12 leading-[1.8] max-w-lg font-light"
             >
               Veteran-supporting. Enterprise-caliber AI security safeguarding 
               <span className="text-white/80 font-normal"> over 500 families </span>
               and businesses from evolving digital threats.
             </motion.p>
 
             {/* Luxe CTAs */}
             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, delay: 0.5 }}
               className="flex flex-col sm:flex-row gap-4 mb-16"
             >
               <Link 
                 to="/training"
                 className="group inline-flex items-center justify-center gap-3 h-14 px-10 bg-[#D4AF37] text-[#0C0C0C] font-semibold text-sm tracking-wider uppercase hover:bg-[#E5C158] transition-all duration-500"
               >
                 Begin Protection
                 <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
               </Link>
               
               <Link 
                 to="/business"
                 className="inline-flex items-center justify-center h-14 px-10 border border-white/20 text-white/70 font-medium text-sm tracking-wider uppercase hover:border-[#D4AF37]/50 hover:text-white transition-all duration-500"
               >
                 For Businesses
               </Link>
             </motion.div>
 
             {/* Signature Stats */}
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ duration: 1, delay: 0.7 }}
               className="flex gap-12"
             >
               {[
                 { value: "99.8%", label: "Success" },
                 { value: "500+", label: "Protected" },
                 { value: "60", label: "Day Guarantee" },
               ].map((stat) => (
                 <div key={stat.label}>
                   <div className="text-2xl md:text-3xl font-light text-white mb-1 tracking-tight" 
                     style={{ fontFamily: "'Clash Display', sans-serif" }}>
                     {stat.value}
                   </div>
                   <div className="text-[10px] uppercase tracking-[0.25em] text-white/30">
                     {stat.label}
                   </div>
                 </div>
               ))}
             </motion.div>
           </div>
         </div>
       </div>
 
       {/* Floating Glassmorphism Card - Right Side */}
       <motion.div
         initial={{ opacity: 0, x: 40 }}
         animate={{ opacity: 1, x: 0 }}
         transition={{ duration: 1, delay: 0.8 }}
         className="absolute bottom-24 right-12 hidden xl:block"
       >
         <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-8 w-72">
           <div className="flex items-center gap-3 mb-4">
             <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 flex items-center justify-center">
               <svg className="w-5 h-5 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                 <path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z" />
               </svg>
             </div>
             <div className="text-xs uppercase tracking-[0.2em] text-white/50">Trusted Shield</div>
           </div>
           <div className="text-white/80 text-sm leading-relaxed mb-4">
             "InVision protected our family when we needed it most. Truly exceptional service."
           </div>
           <div className="flex items-center gap-2">
             <div className="w-6 h-6 rounded-full bg-[#D4AF37]/30" />
             <span className="text-[11px] text-white/40 tracking-wide">Verified Client — Columbus, OH</span>
           </div>
         </div>
       </motion.div>
 
       {/* Bottom Accent */}
       <div className="absolute bottom-0 left-0 right-0">
         <div className="h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />
       </div>
     </section>
   );
 };
 
 export default HeroHomepage;