 import { motion } from "framer-motion";
 import { Star, Shield, Users, TrendingUp, Award, Heart, Quote, ArrowRight, CheckCircle, Sparkles } from "lucide-react";
 import { Link } from "react-router-dom";
 import familyLivingRoom from "@/assets/family-living-room-natural.jpg";
 import grandmotherGrandchildren from "@/assets/grandmother-grandchildren-sofa.jpg";
 import seniorsTablet from "@/assets/seniors-tablet-kitchen.jpg";
 
 const testimonials = [
   {
     name: "Margaret S.",
     role: "Protected Family Member",
     quote: "They saved me from a $15,000 scam. Forever grateful!",
     rating: 5,
     image: grandmotherGrandchildren,
   },
   {
     name: "Robert T.",
     role: "Veteran",
     quote: "Finally, experts who understand our community's needs.",
     rating: 5,
     image: seniorsTablet,
   },
 ];
 
 const floatingStats = [
   { icon: Users, value: "500+", label: "Families Protected", color: "#F8926A" },
   { icon: Shield, value: "10K+", label: "Scams Blocked", color: "#BB81B5" },
   { icon: TrendingUp, value: "99.8%", label: "Success Rate", color: "#18305A" },
   { icon: Award, value: "4+", label: "Years Active", color: "#F8926A" },
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
             style={{ fontFamily: "'Clash Display', 'DM Sans', sans-serif" }}>
             Real <span className="bg-gradient-to-r from-coral-500 to-lavender-500 bg-clip-text text-transparent">Protection</span>,{" "}
             Real <span className="bg-gradient-to-r from-lavender-500 to-[#18305A] bg-clip-text text-transparent">Results</span>
           </h2>
           <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
             Join thousands of Ohio families who trust us with their digital safety every day.
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
                     <div className="text-white text-3xl font-black" style={{ fontFamily: "'Clash Display', sans-serif" }}>500+</div>
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
                   className="group relative bg-white/80 backdrop-blur-xl rounded-3xl p-6 border border-white/50 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-default overflow-hidden"
                 >
                   {/* Glow Effect */}
                   <div 
                     className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                     style={{ background: `radial-gradient(circle at center, ${stat.color} 0%, transparent 70%)` }}
                   />
                   <div className="relative z-10">
                     <div 
                       className="w-12 h-12 rounded-2xl mb-4 flex items-center justify-center shadow-lg"
                       style={{ background: `linear-gradient(135deg, ${stat.color}20 0%, ${stat.color}40 100%)` }}
                     >
                       <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
                     </div>
                     <div className="text-2xl font-black text-[#18305A] mb-1" style={{ fontFamily: "'Clash Display', sans-serif" }}>
                       {stat.value}
                     </div>
                     <div className="text-xs text-foreground/50 font-medium">{stat.label}</div>
                   </div>
                 </motion.div>
               ))}
             </div>
 
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
                   
                   {/* Stars */}
                   <div className="flex gap-1 mb-4">
                     {[...Array(testimonial.rating)].map((_, j) => (
                       <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />
                     ))}
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
                   <h3 className="text-2xl font-black text-white mb-2" style={{ fontFamily: "'Clash Display', sans-serif" }}>
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