 import { Link } from "react-router-dom";
 import { Button } from "@/components/ui/button";
 import { Phone, Calendar, Bot, Globe, ArrowRight, TrendingUp, Zap, CheckCircle, Award } from "lucide-react";
 import { motion } from "framer-motion";
 
 const services = [
   { icon: Phone, title: "AI Receptionist", desc: "Never miss a call", highlight: "24/7" },
   { icon: Calendar, title: "Smart Scheduling", desc: "Automated bookings", highlight: "Auto" },
   { icon: Bot, title: "AI Automation", desc: "Custom workflows", highlight: "ROI" },
 ];
 
 const features = [
   "Digital Marketing",
   "Search Engine Optimization",
   "E-Commerce Solutions",
   "AI Consultation",
 ];
 
 export const AIBusinessPromo = () => {
   return (
     <section className="relative py-24 lg:py-32 bg-gradient-to-br from-slate-50 via-white to-lavender-50/30 overflow-hidden">
       {/* Decorative Elements */}
       <div className="absolute bottom-0 right-0 w-[600px] h-[600px] opacity-20 pointer-events-none"
         style={{
           background: 'radial-gradient(circle at center, rgba(187,129,181,0.4) 0%, transparent 60%)',
           filter: 'blur(100px)',
           transform: 'translate(30%, 30%)'
         }}
       />
       <motion.div 
         className="absolute top-32 left-[5%] w-12 h-12 rounded-full opacity-50"
         style={{ background: 'linear-gradient(135deg, #BB81B5 0%, #18305A 100%)' }}
         animate={{ y: [0, -12, 0] }}
         transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
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
           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-lavender-50 to-coral-50 border border-lavender-200/50 mb-6">
             <span className="w-2 h-2 rounded-full bg-lavender-500" />
             <span className="text-sm font-semibold text-foreground/80 uppercase tracking-wide">AI & Business</span>
           </div>
           <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#18305A] leading-tight mb-4"
             style={{ fontFamily: "'Clash Display', 'DM Sans', sans-serif" }}>
             Choice Business <span className="bg-gradient-to-r from-lavender-500 to-coral-500 bg-clip-text text-transparent">Needs</span>
           </h2>
           <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
             Transform your business with AI-powered automation. Solutions that work 24/7 so you never miss an opportunity.
           </p>
         </motion.div>
 
         {/* Services Cards Grid */}
         <div className="grid md:grid-cols-3 gap-6 mb-20">
           {services.map((service, i) => (
             <motion.div 
               key={service.title}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.1 }}
               viewport={{ once: true }}
               className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 border border-gray-100"
             >
               {/* Highlight Badge */}
               <div className="absolute -top-3 right-6 px-4 py-1 rounded-full bg-gradient-to-r from-coral-400 to-lavender-500 text-xs font-bold text-white">
                 {service.highlight}
               </div>
               
               <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-lavender-100 to-coral-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                 <service.icon className="w-8 h-8 text-lavender-600" />
               </div>
               
               <h3 className="text-xl font-bold text-[#18305A] mb-2">{service.title}</h3>
               <p className="text-foreground/60 mb-4">{service.desc}</p>
               
               <Link to="/business" className="inline-flex items-center text-coral-500 font-semibold hover:text-coral-600 transition-colors">
                 Learn More
                 <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
               </Link>
             </motion.div>
           ))}
         </div>
 
         {/* Bottom Two-Column Section */}
         <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
           {/* Left - Content */}
           <motion.div 
             initial={{ opacity: 0, x: -30 }}
             whileInView={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.6 }}
             viewport={{ once: true }}
             className="space-y-6"
           >
             <h3 className="text-3xl md:text-4xl font-black text-[#18305A] leading-tight"
               style={{ fontFamily: "'Clash Display', 'DM Sans', sans-serif" }}>
               Choosing Our Strike{" "}
               <span className="bg-gradient-to-r from-lavender-500 to-coral-500 bg-clip-text text-transparent">Consultancy</span>
             </h3>
             
             <p className="text-foreground/60 leading-relaxed">
               With more than 7 years of expertise in design and digital transformation, we are committed to providing our customers with exceptional service and measurable results.
             </p>
 
             {/* Experience Badge */}
             <div className="flex items-end gap-4 py-4">
               <div className="text-7xl font-black text-[#18305A] leading-none" style={{ fontFamily: "'Clash Display', sans-serif" }}>
                 4<span className="text-coral-500">+</span>
               </div>
               <div className="pb-2">
                 <div className="text-sm font-bold text-foreground/40 uppercase">Years</div>
                 <div className="text-lg font-bold text-[#18305A]">Experience</div>
               </div>
             </div>
             
             {/* Features List */}
             <div className="grid grid-cols-2 gap-3">
               {features.map((feature, i) => (
                 <motion.div 
                   key={feature}
                   initial={{ opacity: 0, x: -10 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   transition={{ delay: 0.3 + i * 0.1 }}
                   viewport={{ once: true }}
                   className="flex items-center gap-2"
                 >
                   <CheckCircle className="w-5 h-5 text-coral-500 flex-shrink-0" />
                   <span className="text-sm font-medium text-foreground/70">{feature}</span>
                 </motion.div>
               ))}
             </div>
 
             {/* CTA and Contact */}
             <div className="flex flex-wrap items-center gap-6 pt-4">
               <Button asChild size="lg"
                 className="h-14 px-8 text-base font-bold rounded-full shadow-lg shadow-lavender-400/30 hover:shadow-xl hover:shadow-lavender-400/40 transition-all"
                 style={{ background: 'linear-gradient(135deg, #BB81B5 0%, #F8926A 100%)' }}>
                 <Link to="/business" className="text-white">
                   Discover More
                   <ArrowRight className="ml-2 w-5 h-5" />
                 </Link>
               </Button>
               <div className="text-foreground/50 text-sm">
                 <span className="font-medium text-[#18305A]">+1 (937) 974-5682</span>
               </div>
             </div>
           </motion.div>
 
           {/* Right - Image Grid */}
           <motion.div 
             initial={{ opacity: 0, x: 30 }}
             whileInView={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.6, delay: 0.2 }}
             viewport={{ once: true }}
             className="relative"
           >
             <div className="grid grid-cols-2 gap-4">
               {/* Main Image */}
               <div className="col-span-2 rounded-3xl overflow-hidden bg-gradient-to-br from-[#18305A] to-[#2a4a7a] aspect-[16/9] flex items-center justify-center">
                 <div className="text-center text-white/80 p-6">
                   <Bot className="w-16 h-16 mx-auto mb-3 opacity-80" />
                   <p className="font-semibold">AI-Powered Solutions</p>
                 </div>
               </div>
               
               {/* Smaller Images */}
               <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-coral-400 to-lavender-500 aspect-square flex items-center justify-center">
                 <TrendingUp className="w-12 h-12 text-white" />
               </div>
               <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-lavender-400 to-[#18305A] aspect-square flex items-center justify-center">
                 <Award className="w-12 h-12 text-white" />
               </div>
             </div>
 
             {/* Floating ROI Card */}
             <motion.div 
               className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-2xl p-5 border border-gray-100"
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               transition={{ delay: 0.5 }}
               viewport={{ once: true }}
             >
               <div className="text-3xl font-black text-coral-500" style={{ fontFamily: "'Clash Display', sans-serif" }}>
                 340%
               </div>
               <div className="text-sm text-foreground/50 font-medium">Avg. ROI</div>
             </motion.div>
           </motion.div>
         </div>
       </div>
     </section>
   );
 };