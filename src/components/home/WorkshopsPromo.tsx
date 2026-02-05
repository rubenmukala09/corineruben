 import { Link } from "react-router-dom";
 import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Eye, AlertTriangle, Target, GraduationCap, CheckCircle, Play, Sparkles } from "lucide-react";
 import { motion } from "framer-motion";
import workshopTraining from "@/assets/workshop-training-session.jpg";
import seniorLearning from "@/assets/senior-learning.jpg";
 
 const services = [
   { icon: AlertTriangle, title: "Scam Prevention", desc: "Identify AI-powered scams before they strike" },
   { icon: Shield, title: "4-Step Protection", desc: "Proven methodology for digital safety" },
   { icon: Target, title: "Protection Tiers", desc: "Customized security for your needs" },
   { icon: Eye, title: "Threat Analysis", desc: "Real-time monitoring and alerts" },
 ];
 
 export const WorkshopsPromo = () => {
   return (
     <section className="relative py-24 lg:py-32 bg-white overflow-hidden">
       {/* Decorative Elements */}
       <div className="absolute top-0 left-0 w-[500px] h-[500px] opacity-30 pointer-events-none"
         style={{
           background: 'radial-gradient(circle at center, rgba(248,146,106,0.3) 0%, transparent 60%)',
           filter: 'blur(80px)',
           transform: 'translate(-30%, -30%)'
         }}
       />
       <motion.div 
         className="absolute top-20 right-20 w-16 h-16 rounded-full opacity-60"
         style={{ background: 'linear-gradient(135deg, #F8926A 0%, #BB81B5 100%)' }}
         animate={{ y: [0, -15, 0] }}
         transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
       />
       <motion.div 
         className="absolute bottom-32 left-[10%] w-10 h-10 rounded-full opacity-40"
         style={{ background: 'linear-gradient(135deg, #BB81B5 0%, #18305A 100%)' }}
         animate={{ y: [0, 10, 0] }}
         transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
       />
 
       <div className="container mx-auto px-4 lg:px-8 relative z-10">
         <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
           {/* Left - Image/Video Area */}
           <motion.div 
             initial={{ opacity: 0, x: -30 }}
             whileInView={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.6 }}
             viewport={{ once: true }}
             className="relative"
           >
             {/* Main Visual Container */}
             <div className="relative">
                {/* Background Shape with premium gradient */}
                <div className="absolute -inset-6 rounded-[48px] bg-gradient-to-br from-coral-200/40 via-lavender-100/30 to-white opacity-90" />
               
                {/* Primary Photo - Workshop Training */}
                <div className="relative aspect-[4/3] rounded-[32px] overflow-hidden shadow-2xl shadow-coral-400/20 border-4 border-white">
                  <img 
                    src={workshopTraining} 
                    alt="Expert-led workshop training session"
                    width={600}
                    height={450}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                  {/* Premium overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#18305A]/20 via-transparent to-transparent" />
               </div>

                {/* Secondary Photo - Floating */}
                <motion.div 
                  className="absolute -bottom-6 -left-6 w-36 h-36 rounded-2xl overflow-hidden shadow-2xl border-4 border-white"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <img 
                    src={seniorLearning} 
                    alt="Senior learning digital safety"
                    width={144}
                    height={144}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
 
               {/* Video Play Button */}
               <motion.button 
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-white/90 backdrop-blur-sm shadow-2xl flex items-center justify-center group hover:scale-110 transition-transform z-10 border-2 border-coral-200/50"
                 whileHover={{ scale: 1.1 }}
                 whileTap={{ scale: 0.95 }}
               >
                  <div className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
                    style={{ background: 'linear-gradient(135deg, #F8926A 0%, #BB81B5 100%)' }}>
                   <Play className="w-6 h-6 text-white fill-white ml-1" />
                 </div>
               </motion.button>
 
                {/* Stats Card - Premium */}
               <motion.div 
                  className="absolute -bottom-4 -right-4 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-4 border border-coral-200/50"
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.4 }}
                 viewport={{ once: true }}
               >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg"
                      style={{ background: 'linear-gradient(135deg, #F8926A 0%, #BB81B5 100%)' }}>
                      <span className="text-white font-black text-lg">99%</span>
                   </div>
                   <div>
                     <div className="text-lg font-black text-[#18305A]">Success Rate</div>
                      <div className="text-xs text-foreground/50">Client Satisfaction</div>
                   </div>
                 </div>
               </motion.div>
                
                {/* Premium Badge */}
                <motion.div 
                  className="absolute top-4 -right-2 bg-white/95 backdrop-blur-sm rounded-full shadow-xl px-3 py-1.5 border border-coral-200/50"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-coral-500" />
                    <span className="text-xs font-bold text-[#18305A]">Expert-Led</span>
                  </div>
                </motion.div>
             </div>
           </motion.div>
 
           {/* Right - Content */}
           <motion.div 
             initial={{ opacity: 0, x: 30 }}
             whileInView={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.6, delay: 0.2 }}
             viewport={{ once: true }}
             className="space-y-8"
           >
              {/* Section label - Premium */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-coral-100 to-lavender-100 border border-coral-200/50 shadow-sm">
                <Sparkles className="w-4 h-4 text-coral-500" />
                <span className="text-sm font-semibold text-[#18305A] uppercase tracking-wide">Learn & Train</span>
             </div>
             
             {/* Headline */}
             <h2 className="text-4xl md:text-5xl font-black text-[#18305A] leading-tight"
               style={{ fontFamily: "'Clash Display', 'DM Sans', sans-serif" }}>
               Reason For Choosing Our{" "}
               <span className="bg-gradient-to-r from-coral-500 to-lavender-500 bg-clip-text text-transparent">
                 Protection Training
               </span>
             </h2>
             
             <p className="text-lg text-foreground/60 leading-relaxed">
               Scammers now use deepfakes and voice cloning. Our expert-led workshops teach you to recognize and stop these sophisticated threats—protecting your family from AI-powered scams.
             </p>
 
             {/* Stats Row */}
             <div className="flex items-center gap-8 py-4">
               <div className="text-center">
                 <div className="text-4xl font-black text-[#18305A]" style={{ fontFamily: "'Clash Display', sans-serif" }}>500+</div>
                 <div className="text-sm text-foreground/50">Families Protected</div>
               </div>
               <div className="h-12 w-px bg-gray-200" />
               <div className="text-center">
                 <div className="text-4xl font-black text-coral-500" style={{ fontFamily: "'Clash Display', sans-serif" }}>100%</div>
                 <div className="text-sm text-foreground/50">Satisfaction Rate</div>
               </div>
             </div>
             
             {/* Services Grid */}
             <div className="grid grid-cols-2 gap-4">
               {services.map((service, i) => (
                 <motion.div 
                   key={service.title}
                   initial={{ opacity: 0, y: 10 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   transition={{ delay: 0.3 + i * 0.1 }}
                   viewport={{ once: true }}
                   className="flex items-start gap-3 group"
                 >
                   <CheckCircle className="w-5 h-5 text-coral-500 mt-0.5 flex-shrink-0" />
                   <span className="text-sm font-medium text-foreground/70">{service.title}</span>
                 </motion.div>
               ))}
             </div>
 
             {/* CTA */}
             <div className="pt-4">
               <Button asChild size="lg"
                 className="h-14 px-8 text-base font-bold rounded-full shadow-lg shadow-coral-400/30 hover:shadow-xl hover:shadow-coral-400/40 transition-all"
                 style={{ background: 'linear-gradient(135deg, #F8926A 0%, #BB81B5 100%)' }}>
                 <Link to="/training" className="text-white">
                   Discover More
                   <ArrowRight className="ml-2 w-5 h-5" />
                 </Link>
               </Button>
             </div>
           </motion.div>
         </div>
       </div>
     </section>
   );
 };