 import { motion } from "framer-motion";
 import { Star, Shield, Users, TrendingUp, Award, Heart, Quote, ArrowRight, CheckCircle, Sparkles, Lock, Eye, Bell, Zap, Target, Clock, Activity, ShieldCheck, Globe, Fingerprint } from "lucide-react";
 import { Link } from "react-router-dom";
 import familyLivingRoom from "@/assets/family-living-room-natural.jpg";
 import grandmotherGrandchildren from "@/assets/grandmother-grandchildren-sofa.jpg";
 import seniorsTablet from "@/assets/seniors-tablet-kitchen.jpg";
 
// Sample testimonials for design preview only.
const testimonials = [
  {
    name: "Sample Client",
    role: "Family Member (Sample)",
    quote: "Clear guidance and calm, respectful support throughout the process.",
    rating: 5,
    image: grandmotherGrandchildren,
  },
  {
    name: "Sample Veteran",
    role: "Veteran (Sample)",
    quote: "Helpful, patient, and focused on practical next steps.",
    rating: 5,
    image: seniorsTablet,
  },
];
 
// Note: Update these stats periodically with real metrics from database
 const floatingStats = [
  { icon: Users, value: "100+", label: "Families Protected", color: "#F8926A" },
  { icon: Shield, value: "1K+", label: "Threats Analyzed", color: "#BB81B5" },
   { icon: TrendingUp, value: "99.8%", label: "Success Rate", color: "#18305A" },
   { icon: Award, value: "2+", label: "Years Active", color: "#F8926A" },
 ];
 
 const securityFeatures = [
   { icon: Lock, title: "End-to-End Protection", desc: "Industry-standard encryption", gradient: "from-coral-400 to-coral-600", stat: "TLS" },
   { icon: Eye, title: "24/7 Monitoring", desc: "Always vigilant", gradient: "from-lavender-400 to-lavender-600", stat: "Real-time" },
   { icon: Bell, title: "Instant Alerts", desc: "Immediate response", gradient: "from-blue-400 to-blue-600", stat: "<1 sec" },
   { icon: Fingerprint, title: "Identity Shield", desc: "Personal protection", gradient: "from-emerald-400 to-emerald-600", stat: "Active" },
 ];
 
 const liveMetrics = [
   { icon: Activity, label: "Active Scans", value: "2.4K", color: "#F8926A", trend: "+12%" },
   { icon: ShieldCheck, label: "Threats Blocked", value: "847", color: "#BB81B5", trend: "+8%" },
   { icon: Globe, label: "Protected Devices", value: "1.2K", color: "#18305A", trend: "+15%" },
 ];
 
export const PremiumGlassmorphismWidgets = () => {
  return (
    <section className="relative py-12 overflow-hidden" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #faf9f7 30%, #fff5f0 60%, #faf5fa 100%)' }}>
       {/* Decorative Gradient Orbs */}
       <motion.div 
         className="absolute top-20 right-[10%] w-[400px] h-[400px] opacity-40 pointer-events-none"
         style={{
           background: 'radial-gradient(circle at center, rgba(248,146,106,0.4) 0%, transparent 60%)',
           filter: 'blur(80px)',
         }}
         animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
         transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
       />
       <motion.div 
         className="absolute bottom-20 left-[5%] w-[350px] h-[350px] opacity-30 pointer-events-none"
         style={{
           background: 'radial-gradient(circle at center, rgba(187,129,181,0.5) 0%, transparent 60%)',
           filter: 'blur(100px)',
         }}
         animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
         transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
       />
       
       {/* Floating Accent Circles */}
       <motion.div 
         className="absolute top-32 left-[15%] w-16 h-16 rounded-full opacity-60"
         style={{ background: 'linear-gradient(135deg, #F8926A 0%, #BB81B5 100%)' }}
         animate={{ y: [0, -20, 0], rotate: [0, 180, 360] }}
         transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
       />
       <motion.div 
         className="absolute bottom-40 right-[20%] w-10 h-10 rounded-full opacity-50"
         style={{ background: 'linear-gradient(135deg, #BB81B5 0%, #18305A 100%)' }}
         animate={{ y: [0, 15, 0] }}
         transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
       />
 
       <div className="container mx-auto px-4 lg:px-8 relative z-10">
         {/* Section Header */}
         <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6 }}
           viewport={{ once: true }}
           className="text-center mb-16"
         >
           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-coral-200/50 shadow-lg mb-6">
             <Sparkles className="w-4 h-4 text-coral-500" />
             <span className="text-sm font-semibold text-[#18305A] uppercase tracking-wide">Why Families Trust Us</span>
           </div>
           <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#18305A] leading-tight mb-4"
             style={{ fontFamily: "'Lora', 'Rubik', serif" }}>
             Real <span className="bg-gradient-to-r from-coral-500 to-lavender-500 bg-clip-text text-transparent">Protection</span>,{" "}
             Real <span className="bg-gradient-to-r from-lavender-500 to-[#18305A] bg-clip-text text-transparent">Results</span>
           </h2>
           <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
             Join Ohio families who trust us with their digital safety every day.
           </p>
         </motion.div>
 
         {/* Main Grid Layout */}
         <div className="grid lg:grid-cols-12 gap-8">
           {/* Left - Large Image with Glassmorphism Overlay */}
           <motion.div 
             initial={{ opacity: 0, x: -30 }}
             whileInView={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.6 }}
             viewport={{ once: true }}
             className="lg:col-span-5 relative"
           >
             <div className="relative aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl shadow-coral-400/20">
               <img 
                 src={familyLivingRoom} 
                 alt="Happy family protected from scams"
                 width={500}
                 height={625}
                 loading="lazy"
                 decoding="async"
                 className="w-full h-full object-cover"
               />
               {/* Premium Gradient Overlay */}
               <div className="absolute inset-0 bg-gradient-to-t from-[#18305A]/40 via-transparent to-transparent" />
               
               {/* Glassmorphism Stats Card */}
               <motion.div 
                 className="absolute bottom-6 left-6 right-6 bg-white/20 backdrop-blur-xl rounded-3xl p-6 border border-white/30 shadow-2xl"
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.4 }}
                 viewport={{ once: true }}
               >
                 <div className="flex items-center justify-between">
                   <div>
                     <div className="text-white/90 text-sm font-medium mb-1">Protected Families</div>
                     <div className="text-white text-3xl font-black" style={{ fontFamily: "'Lora', serif" }}>100+</div>
                   </div>
                   <div className="w-14 h-14 rounded-2xl bg-white/30 backdrop-blur-md flex items-center justify-center">
                     <Heart className="w-7 h-7 text-white" />
                   </div>
                 </div>
               </motion.div>
               
               {/* Premium Badge */}
               <motion.div 
                 className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm rounded-full shadow-xl px-4 py-2 border border-coral-200/50"
                 initial={{ opacity: 0, scale: 0.8 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 transition={{ delay: 0.5 }}
                 viewport={{ once: true }}
               >
                 <div className="flex items-center gap-2">
                   <Sparkles className="w-4 h-4 text-coral-500" />
                   <span className="text-sm font-bold text-[#18305A]">Trusted</span>
                 </div>
               </motion.div>
             </div>
           </motion.div>
 
           {/* Right - Widgets Grid */}
           <div className="lg:col-span-7 grid gap-6">
             {/* Stats Row */}
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
               {floatingStats.map((stat, i) => (
                 <motion.div
                   key={stat.label}
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   transition={{ delay: i * 0.1 }}
                   viewport={{ once: true }}
                    className="group relative bg-white/90 backdrop-blur-xl rounded-3xl p-5 border border-white/60 shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all duration-400 cursor-default overflow-hidden"
                 >
                   {/* Glow Effect */}
                   <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                     style={{ background: `radial-gradient(circle at center, ${stat.color} 0%, transparent 70%)` }}
                   />
                    {/* Shine Effect */}
                    <div 
                      className="absolute -top-1/2 -left-1/2 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                      style={{ 
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 50%)',
                        transform: 'rotate(-45deg)',
                      }}
                    />
                   <div className="relative z-10">
                     <div 
                        className="w-14 h-14 rounded-2xl mb-4 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300"
                        style={{ background: `linear-gradient(135deg, ${stat.color}30 0%, ${stat.color}50 100%)` }}
                     >
                        <stat.icon className="w-7 h-7" style={{ color: stat.color }} />
                     </div>
                      <div className="text-3xl font-black text-[#18305A] mb-1" style={{ fontFamily: "'Lora', serif" }}>
                       {stat.value}
                     </div>
                      <div className="text-xs text-foreground/60 font-semibold uppercase tracking-wide">{stat.label}</div>
                   </div>
                 </motion.div>
               ))}
             </div>
 
             {/* Testimonials */}
             {/* Enhanced Security Feature Widgets */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
               {securityFeatures.map((feature, i) => (
                 <motion.div
                   key={feature.title}
                   initial={{ opacity: 0, scale: 0.9 }}
                   whileInView={{ opacity: 1, scale: 1 }}
                   transition={{ delay: 0.1 + i * 0.1 }}
                   viewport={{ once: true }}
                    className="group relative bg-white/90 backdrop-blur-xl rounded-2xl p-4 border border-white/60 shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all duration-400 text-center overflow-hidden"
                 >
                   <motion.div 
                     className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                   />
                    {/* Stat Badge */}
                    <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-white/80 backdrop-blur-sm border border-white/50 shadow-sm">
                      <span className="text-[10px] font-bold text-foreground/70">{feature.stat}</span>
                    </div>
                   
                    <div className={`w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-lg mb-3 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                      <feature.icon className="w-7 h-7 text-white" />
                   </div>
                    <h4 className="font-bold text-sm text-[#18305A] mb-0.5">{feature.title}</h4>
                   <p className="text-xs text-foreground/50">{feature.desc}</p>
                 </motion.div>
               ))}
             </div>
              
              {/* Live Metrics Dashboard Widget */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                viewport={{ once: true }}
                className="relative bg-gradient-to-br from-[#18305A] to-[#2a4a7a] rounded-3xl p-6 shadow-2xl overflow-hidden"
              >
                {/* Background Glow */}
                <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-coral-400 blur-3xl opacity-20" />
                <div className="absolute bottom-0 left-0 w-36 h-36 rounded-full bg-lavender-400 blur-3xl opacity-15" />
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2">
                      <Activity className="w-5 h-5 text-coral-400" />
                      <h4 className="font-bold text-white">Sample Dashboard</h4>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-xs font-medium text-white/80">Demo</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    {liveMetrics.map((metric, i) => (
                      <div key={metric.label} className="text-center">
                        <div className="w-12 h-12 mx-auto rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center mb-2 border border-white/20">
                          <metric.icon className="w-6 h-6" style={{ color: metric.color }} />
                        </div>
                        <div className="text-2xl font-black text-white mb-0.5" style={{ fontFamily: "'Lora', serif" }}>
                          {metric.value}
                        </div>
                        <div className="text-[10px] text-white/60 uppercase tracking-wide mb-1">{metric.label}</div>
                        <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20">
                          <TrendingUp className="w-3 h-3 text-emerald-400" />
                          <span className="text-[10px] font-bold text-emerald-400">{metric.trend}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
 
             {/* Testimonials */}
             <div className="grid md:grid-cols-2 gap-6">
               {testimonials.map((testimonial, i) => (
                 <motion.div
                   key={testimonial.name}
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   transition={{ delay: 0.2 + i * 0.1 }}
                   viewport={{ once: true }}
                   className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-6 border border-white/50 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
                 >
                   {/* Quote Icon */}
                   <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gradient-to-br from-coral-100 to-lavender-100 flex items-center justify-center">
                     <Quote className="w-5 h-5 text-coral-500" />
                   </div>
                   
                   <div className="flex items-center justify-between mb-4">
                     <span className="rounded-full bg-white/70 px-2 py-0.5 text-[10px] font-semibold text-foreground/70">
                       Sample
                     </span>
                     <div className="flex gap-1">
                       {[...Array(testimonial.rating)].map((_, j) => (
                         <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />
                       ))}
                     </div>
                   </div>
                   
                   {/* Quote */}
                   <p className="text-foreground/70 mb-4 leading-relaxed font-medium">
                     "{testimonial.quote}"
                   </p>
                   
                   {/* Author */}
                   <div className="flex items-center gap-3">
                     <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-coral-200/50">
                       <img 
                         src={testimonial.image} 
                         alt={testimonial.name}
                         width={48}
                         height={48}
                         loading="lazy"
                         className="w-full h-full object-cover"
                       />
                     </div>
                     <div>
                       <div className="font-bold text-[#18305A]">{testimonial.name}</div>
                       <div className="text-xs text-foreground/50">{testimonial.role}</div>
                     </div>
                   </div>
                 </motion.div>
               ))}
             </div>
 
             {/* CTA Card */}
             {/* Trust Metrics Widget */}
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.35 }}
               viewport={{ once: true }}
               className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-6 border border-white/50 shadow-lg overflow-hidden"
             >
               <div className="flex items-center justify-between mb-4">
                 <h4 className="font-bold text-lg text-[#18305A]">Sample Protection Status</h4>
                 <div className="flex items-center gap-2">
                   <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                   <span className="text-xs font-medium text-emerald-600">Active</span>
                 </div>
               </div>
               
               <div className="grid grid-cols-3 gap-4">
                 <div className="text-center p-3 rounded-xl bg-gradient-to-br from-coral-50 to-coral-100 border border-coral-200/50">
                   <Target className="w-6 h-6 mx-auto text-coral-500 mb-2" />
                   <div className="text-xl font-black text-[#18305A]">98%</div>
                   <div className="text-[10px] text-foreground/50 uppercase font-medium">Accuracy</div>
                 </div>
                 <div className="text-center p-3 rounded-xl bg-gradient-to-br from-lavender-50 to-lavender-100 border border-lavender-200/50">
                   <Zap className="w-6 h-6 mx-auto text-lavender-500 mb-2" />
                   <div className="text-xl font-black text-[#18305A]">&lt;1s</div>
                   <div className="text-[10px] text-foreground/50 uppercase font-medium">Response</div>
                 </div>
                 <div className="text-center p-3 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-100 border border-blue-200/50">
                   <Clock className="w-6 h-6 mx-auto text-blue-500 mb-2" />
                   <div className="text-xl font-black text-[#18305A]">24/7</div>
                   <div className="text-[10px] text-foreground/50 uppercase font-medium">Uptime</div>
                 </div>
               </div>
             </motion.div>
 
             {/* CTA Card */}
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.4 }}
               viewport={{ once: true }}
               className="relative overflow-hidden rounded-3xl p-8 shadow-2xl"
               style={{ background: 'linear-gradient(135deg, #18305A 0%, #2a4a7a 100%)' }}
             >
               {/* Glassmorphism Overlay */}
               <div className="absolute inset-0 opacity-10">
                 <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-coral-400 blur-3xl" />
                 <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-lavender-400 blur-3xl" />
               </div>
               
               <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                 <div>
                   <h3 className="text-2xl font-black text-white mb-2" style={{ fontFamily: "'Lora', serif" }}>
                     Ready to Protect Your Family?
                   </h3>
                   <div className="flex items-center gap-4 text-white/70">
                     <div className="flex items-center gap-2">
                       <CheckCircle className="w-4 h-4 text-coral-400" />
                       <span className="text-sm">Free Consultation</span>
                     </div>
                     <div className="flex items-center gap-2">
                       <CheckCircle className="w-4 h-4 text-coral-400" />
                       <span className="text-sm">30-Day Guarantee</span>
                     </div>
                   </div>
                 </div>
                 <Link 
                   to="/training#pricing"
                   className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-white font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                   style={{ background: 'linear-gradient(135deg, #F8926A 0%, #BB81B5 100%)' }}
                 >
                   Get Started
                   <ArrowRight className="w-5 h-5" />
                 </Link>
               </div>
             </motion.div>
           </div>
         </div>
       </div>
     </section>
  );
};

export default PremiumGlassmorphismWidgets;
