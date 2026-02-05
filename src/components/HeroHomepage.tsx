 import { Link } from "react-router-dom";
 import { Button } from "@/components/ui/button";
 import { ArrowRight, Play, CheckCircle2 } from "lucide-react";
 import { motion } from "framer-motion";
 
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
 
           {/* Right Visual */}
           <motion.div 
             initial={{ opacity: 0, x: 30 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.8, delay: 0.2 }}
             className="relative hidden lg:block"
           >
             {/* Main Image Container */}
             <div className="relative">
               {/* Background Shape */}
               <div className="absolute -inset-4 rounded-[40px] bg-gradient-to-br from-coral-100 via-lavender-50 to-white opacity-80" />
               
               {/* Image Placeholder - Professional Shield Visual */}
               <div className="relative aspect-[4/5] rounded-[32px] overflow-hidden bg-gradient-to-br from-[#18305A] to-[#2a4a7a] flex items-center justify-center">
                 <div className="text-center text-white/90 p-8">
                   <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-coral-400 to-lavender-500 flex items-center justify-center shadow-2xl">
                     <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                       <path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V8.26l7-3.89v8.63z"/>
                     </svg>
                   </div>
                   <h3 className="text-2xl font-bold mb-2">Enterprise Security</h3>
                   <p className="text-white/70">Protecting what matters most</p>
                 </div>
                 
                 {/* Decorative Pattern */}
                 <div className="absolute inset-0 opacity-10"
                   style={{
                     backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                     backgroundSize: '24px 24px'
                   }}
                 />
               </div>
 
               {/* Floating Stats Card */}
               <motion.div 
                 className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-2xl p-5 border border-gray-100"
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.6 }}
               >
                 <div className="flex items-center gap-4">
                   <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-coral-400 to-coral-500 flex items-center justify-center shadow-lg">
                     <span className="text-white font-black text-xl">4+</span>
                   </div>
                   <div>
                     <div className="text-2xl font-black text-[#18305A]">Years</div>
                     <div className="text-sm text-foreground/50 font-medium">Of Excellence</div>
                   </div>
                 </div>
               </motion.div>
 
               {/* Video Play Button */}
               <motion.button 
                 className="absolute top-8 -right-4 w-16 h-16 rounded-full bg-white shadow-2xl flex items-center justify-center group hover:scale-110 transition-transform"
                 whileHover={{ scale: 1.1 }}
                 whileTap={{ scale: 0.95 }}
               >
                 <div className="w-12 h-12 rounded-full bg-gradient-to-br from-coral-400 to-lavender-500 flex items-center justify-center">
                   <Play className="w-5 h-5 text-white fill-white ml-0.5" />
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