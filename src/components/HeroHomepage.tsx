 import { Link } from "react-router-dom";
 import { Button } from "@/components/ui/button";
 import { ArrowRight, Shield, Users, Award, Phone } from "lucide-react";
 import { motion } from "framer-motion";
 import heroFamilySafe from "@/assets/hero-home-family-safe.jpg";
 
 const stats = [
   { value: "500+", label: "Families Protected", icon: Users },
   { value: "99.8%", label: "Success Rate", icon: Award },
   { value: "4+", label: "Years Excellence", icon: Shield },
 ];
 
 export const HeroHomepage = () => {
   return (
     <section className="relative min-h-screen overflow-hidden">
       {/* Full-width Background Image */}
       <div className="absolute inset-0">
         <img 
           src={heroFamilySafe} 
           alt="Protected family enjoying safety and security"
           width={1920}
           height={1080}
           loading="eager"
           decoding="async"
           className="w-full h-full object-cover"
         />
         {/* Premium Dark Overlay with Gradient */}
         <div className="absolute inset-0 bg-gradient-to-r from-[#18305A]/95 via-[#18305A]/80 to-[#18305A]/40" />
         <div className="absolute inset-0 bg-gradient-to-t from-[#18305A]/60 via-transparent to-transparent" />
       </div>
 
       {/* Decorative Elements */}
       <div className="absolute top-0 right-0 w-[800px] h-[800px] opacity-30 pointer-events-none"
         style={{
           background: 'radial-gradient(circle at center, rgba(248,146,106,0.4) 0%, rgba(187,129,181,0.2) 40%, transparent 70%)',
           filter: 'blur(100px)',
         }}
       />
       
       {/* Main Content */}
       <div className="container mx-auto px-4 lg:px-8 pt-32 pb-16 relative z-10">
         <div className="max-w-4xl min-h-[80vh] flex flex-col justify-center">
           
           {/* Badge */}
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6 }}
             className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8 w-fit"
           >
             <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-coral-400 to-lavender-400 animate-pulse" />
             <span className="text-sm font-semibold text-white/90 tracking-wide uppercase">Veteran-Owned • Ohio-Based</span>
           </motion.div>
 
           {/* Giant Headline */}
           <motion.h1 
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.7, delay: 0.1 }}
             className="mb-6"
           >
             <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[1.05] tracking-tight"
               style={{ fontFamily: "'Clash Display', 'DM Sans', sans-serif" }}>
               Protecting Families
             </span>
             <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[1.05] tracking-tight mt-2"
               style={{ 
                 fontFamily: "'Clash Display', 'DM Sans', sans-serif",
                 background: 'linear-gradient(135deg, #F8926A 0%, #BB81B5 50%, #F8926A 100%)',
                 WebkitBackgroundClip: 'text',
                 WebkitTextFillColor: 'transparent',
               }}>
               From AI Scams
             </span>
           </motion.h1>
 
           {/* Subheadline */}
           <motion.p 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6, delay: 0.2 }}
             className="text-lg md:text-xl text-white/80 mb-10 leading-relaxed max-w-2xl"
           >
             Enterprise-grade AI security solutions for families and businesses. 
             Join 500+ protected households across Ohio.
           </motion.p>
 
           {/* CTA Buttons */}
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6, delay: 0.3 }}
             className="flex flex-col sm:flex-row gap-4 mb-12"
           >
             <Button asChild size="lg"
               className="h-14 px-10 text-base font-bold rounded-full shadow-2xl shadow-coral-500/40 hover:shadow-coral-500/60 hover:scale-105 transition-all duration-300"
               style={{ background: 'linear-gradient(135deg, #F8926A 0%, #BB81B5 100%)' }}>
               <Link to="/training" className="text-white">
                 Get Protected Now
                 <ArrowRight className="ml-2 w-5 h-5" />
               </Link>
             </Button>
             
             <Button asChild variant="outline" size="lg"
               className="h-14 px-10 text-base font-semibold rounded-full border-2 border-white/30 text-white bg-white/5 backdrop-blur-sm hover:bg-white/15 hover:border-white/50 transition-all duration-300">
               <Link to="/contact" className="flex items-center gap-2">
                 <Phone className="w-5 h-5" />
                 Schedule Consultation
               </Link>
             </Button>
           </motion.div>
 
           {/* Stats Row - Glassmorphism Cards */}
           <motion.div 
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.7, delay: 0.4 }}
             className="grid grid-cols-3 gap-4 max-w-2xl"
           >
             {stats.map((stat, index) => (
               <motion.div
                 key={stat.label}
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                 className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 md:p-5 border border-white/20 hover:bg-white/15 transition-all duration-300 group"
               >
                 <div className="flex items-center gap-3 mb-2">
                   <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                     style={{ background: 'linear-gradient(135deg, #F8926A 0%, #BB81B5 100%)' }}>
                     <stat.icon className="w-5 h-5 text-white" />
                   </div>
                 </div>
                 <div className="text-2xl md:text-3xl font-black text-white" style={{ fontFamily: "'Clash Display', sans-serif" }}>
                   {stat.value}
                 </div>
                 <div className="text-xs md:text-sm text-white/60 font-medium mt-1">
                   {stat.label}
                 </div>
               </motion.div>
             ))}
           </motion.div>
         </div>
       </div>
 
       {/* Bottom Gradient Fade */}
       <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none" />
     </section>
   );
 };
 
 export default HeroHomepage;