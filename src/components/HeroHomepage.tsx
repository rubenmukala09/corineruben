import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, CheckCircle2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import heroFamilySafe from "@/assets/hero-home-family-safe.jpg";
import communityImpact from "@/assets/community-impact-4k.jpg";
 
 export const HeroHomepage = () => {
   return (
     <section className="relative min-h-screen overflow-hidden bg-white">
       {/* Decorative Gradient Blobs */}
       <div className="absolute top-0 right-0 w-[600px] h-[600px] opacity-60 pointer-events-none"
         style={{
           background: 'radial-gradient(circle at center, rgba(248,146,106,0.4) 0%, rgba(187,129,181,0.3) 40%, transparent 70%)',
           filter: 'blur(60px)',
           transform: 'translate(20%, -30%)'
         }}
       />
       <div className="absolute bottom-0 left-0 w-[500px] h-[500px] opacity-40 pointer-events-none"
         style={{
           background: 'radial-gradient(circle at center, rgba(187,129,181,0.5) 0%, rgba(24,48,90,0.3) 50%, transparent 70%)',
           filter: 'blur(80px)',
           transform: 'translate(-30%, 30%)'
         }}
       />
       
       {/* Floating Accent Circles */}
       <motion.div 
         className="absolute top-32 right-[15%] w-20 h-20 rounded-full"
         style={{ background: 'linear-gradient(135deg, #F8926A 0%, #BB81B5 100%)' }}
         animate={{ y: [0, -20, 0], rotate: [0, 180, 360] }}
         transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
       />
       <motion.div 
         className="absolute top-[60%] right-[8%] w-12 h-12 rounded-full opacity-60"
         style={{ background: 'linear-gradient(135deg, #BB81B5 0%, #18305A 100%)' }}
         animate={{ y: [0, 15, 0] }}
         transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
       />
       <motion.div 
         className="absolute top-[40%] left-[5%] w-8 h-8 rounded-full opacity-50"
         style={{ background: 'linear-gradient(135deg, #F8926A 0%, #F6D7DD 100%)' }}
         animate={{ y: [0, -10, 0] }}
         transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
       />
 
       {/* Main Content */}
       <div className="container mx-auto px-4 lg:px-8 pt-32 pb-20 relative z-10">
         <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
           {/* Left Content */}
           <motion.div 
             initial={{ opacity: 0, x: -30 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.8 }}
             className="max-w-xl"
           >
             {/* Badge */}
             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-coral-50 to-lavender-50 border border-coral-200/50 mb-6">
               <span className="w-2 h-2 rounded-full bg-gradient-to-r from-coral-400 to-lavender-500 animate-pulse" />
               <span className="text-sm font-semibold text-foreground/80 tracking-wide uppercase">Welcome to InVision Network</span>
             </div>
 
             {/* Giant Headline */}
             <h1 className="mb-6">
               <span className="block text-5xl sm:text-6xl lg:text-7xl font-black text-[#18305A] leading-[1.1] tracking-tight"
                 style={{ fontFamily: "'Clash Display', 'DM Sans', sans-serif" }}>
                 AI Scam
               </span>
               <span className="block text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight mt-1"
                 style={{ 
                   fontFamily: "'Clash Display', 'DM Sans', sans-serif",
                   background: 'linear-gradient(135deg, #F8926A 0%, #BB81B5 60%, #18305A 100%)',
                   WebkitBackgroundClip: 'text',
                   WebkitTextFillColor: 'transparent',
                 }}>
                 Protection
               </span>
             </h1>
 
             <p className="text-lg text-foreground/60 mb-8 leading-relaxed max-w-md">
               Veteran-owned. Ohio-based. Protecting families and automating businesses with enterprise-grade AI security solutions.
             </p>
 
             {/* CTA Buttons */}
             <div className="flex flex-col sm:flex-row gap-4 mb-10">
               <Button asChild size="lg"
                 className="h-14 px-8 text-base font-bold rounded-full shadow-lg shadow-coral-400/30 hover:shadow-xl hover:shadow-coral-400/40 transition-all"
                 style={{ background: 'linear-gradient(135deg, #F8926A 0%, #BB81B5 100%)' }}>
                 <Link to="/training" className="text-white">
                   Get Protected Now
                   <ArrowRight className="ml-2 w-5 h-5" />
                 </Link>
               </Button>
               
               <Button asChild variant="outline" size="lg"
                 className="h-14 px-8 text-base font-semibold rounded-full border-2 border-[#18305A]/20 text-[#18305A] hover:bg-[#18305A] hover:text-white transition-all">
                 <Link to="/business">
                   Business Solutions
                 </Link>
               </Button>
             </div>
 
             {/* Trust Points */}
             <div className="flex flex-wrap gap-6">
               {['Veteran Owned', '99.8% Success Rate', '60-Day Guarantee'].map((point) => (
                 <div key={point} className="flex items-center gap-2">
                   <CheckCircle2 className="w-5 h-5 text-coral-500" />
                   <span className="text-sm font-medium text-foreground/70">{point}</span>
                 </div>
               ))}
             </div>
           </motion.div>
 
            {/* Right Visual - Natural Photo Collage */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              {/* Main Image Container */}
              <div className="relative">
                {/* Background Shape with gradient */}
                <div className="absolute -inset-6 rounded-[48px] bg-gradient-to-br from-coral-200/40 via-lavender-100/30 to-white opacity-90" />
                
                {/* Primary Photo - Family Safe */}
                <div className="relative aspect-[4/5] rounded-[36px] overflow-hidden shadow-2xl shadow-coral-400/20 border-4 border-white">
                  <img 
                    src={heroFamilySafe} 
                    alt="Protected family enjoying safety and security"
                    width={500}
                    height={625}
                    loading="eager"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                  {/* Premium overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#18305A]/30 via-transparent to-transparent" />
                </div>

                {/* Secondary Photo - Floating */}
                <motion.div 
                  className="absolute -bottom-8 -left-8 w-40 h-40 rounded-2xl overflow-hidden shadow-2xl border-4 border-white"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <img 
                    src={communityImpact} 
                    alt="Community protection and support"
                    width={160}
                    height={160}
                    loading="eager"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                {/* Floating Stats Card */}
                <motion.div 
                  className="absolute -bottom-4 right-4 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-4 border border-coral-200/50"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg"
                      style={{ background: 'linear-gradient(135deg, #F8926A 0%, #BB81B5 100%)' }}>
                      <span className="text-white font-black text-lg">4+</span>
                    </div>
                    <div>
                      <div className="text-xl font-black text-[#18305A]">Years</div>
                      <div className="text-xs text-foreground/50 font-medium">Of Excellence</div>
                    </div>
                  </div>
                </motion.div>

                {/* Premium Badge */}
                <motion.div 
                  className="absolute top-6 -right-2 bg-white/95 backdrop-blur-sm rounded-full shadow-xl px-4 py-2 border border-coral-200/50"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-coral-500" />
                    <span className="text-sm font-bold text-[#18305A]">Ohio's #1</span>
                  </div>
                </motion.div>

                {/* Video Play Button */}
                <motion.button 
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-white/90 backdrop-blur-sm shadow-2xl flex items-center justify-center group hover:scale-110 transition-transform border-2 border-coral-200/50"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
                    style={{ background: 'linear-gradient(135deg, #F8926A 0%, #BB81B5 100%)' }}>
                    <Play className="w-6 h-6 text-white fill-white ml-0.5" />
                  </div>
                </motion.button>
              </div>
            </motion.div>
         </div>
       </div>
 
       {/* Bottom Wave Decoration */}
       <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none">
         <svg viewBox="0 0 1440 100" className="w-full h-full" preserveAspectRatio="none">
           <path 
             fill="url(#heroWaveGradient)" 
             d="M0,60 C360,100 720,20 1080,60 C1260,80 1380,40 1440,60 L1440,100 L0,100 Z"
             opacity="0.1"
           />
           <defs>
             <linearGradient id="heroWaveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
               <stop offset="0%" stopColor="#F8926A" />
               <stop offset="100%" stopColor="#BB81B5" />
             </linearGradient>
           </defs>
         </svg>
       </div>
     </section>
   );
 };
 
 export default HeroHomepage;