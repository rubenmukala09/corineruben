import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, Bot, Globe, ArrowRight, TrendingUp, Zap, CheckCircle, Award, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import businessTeamMeeting from "@/assets/business-team-meeting.jpg";
import teamCollaborationOffice from "@/assets/team-collaboration-office.jpg";
 
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
   <section className="relative py-8 lg:py-12 bg-gradient-to-br from-slate-50 via-white to-lavender-50/30 overflow-hidden">
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
          className="text-center mb-10"
         >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-lavender-100 to-coral-100 border border-lavender-200/50 mb-3 shadow-sm">
              <Sparkles className="w-4 h-4 text-lavender-500" />
              <span className="text-sm font-semibold text-[#18305A] uppercase tracking-wide">AI & Business</span>
           </div>
         <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#18305A] leading-tight mb-2"
             style={{ fontFamily: "'Clash Display', 'DM Sans', sans-serif" }}>
             Choice Business <span className="bg-gradient-to-r from-lavender-500 to-coral-500 bg-clip-text text-transparent">Needs</span>
           </h2>
          <p className="text-base text-foreground/60 max-w-2xl mx-auto">
             Transform your business with AI-powered automation. Solutions that work 24/7 so you never miss an opportunity.
           </p>
         </motion.div>
 
         {/* Services Cards Grid */}
        <div className="grid md:grid-cols-3 gap-5 mb-12">
           {services.map((service, i) => (
             <motion.div 
               key={service.title}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.1 }}
               viewport={{ once: true }}
              className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border border-gray-100"
             >
               {/* Highlight Badge */}
              <div className="absolute -top-2.5 right-5 px-3 py-0.5 rounded-full bg-gradient-to-r from-coral-400 to-lavender-500 text-xs font-bold text-white">
                 {service.highlight}
               </div>
               
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-lavender-100 to-coral-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <service.icon className="w-6 h-6 text-lavender-600" />
               </div>
               
              <h3 className="text-lg font-bold text-[#18305A] mb-1">{service.title}</h3>
              <p className="text-foreground/60 text-sm mb-3">{service.desc}</p>
               
               <Link to="/business" className="inline-flex items-center text-coral-500 font-semibold hover:text-coral-600 transition-colors">
                 Learn More
                 <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
               </Link>
             </motion.div>
           ))}
         </div>
 
         {/* Bottom Two-Column Section */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
           {/* Left - Content */}
           <motion.div 
             initial={{ opacity: 0, x: -30 }}
             whileInView={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.6 }}
             viewport={{ once: true }}
            className="space-y-4"
           >
            <h3 className="text-2xl md:text-3xl font-black text-[#18305A] leading-tight"
               style={{ fontFamily: "'Clash Display', 'DM Sans', sans-serif" }}>
               Choosing Our Strike{" "}
               <span className="bg-gradient-to-r from-lavender-500 to-coral-500 bg-clip-text text-transparent">Consultancy</span>
             </h3>
             
            <p className="text-foreground/60 leading-relaxed text-sm">
               With more than 7 years of expertise in design and digital transformation, we are committed to providing our customers with exceptional service and measurable results.
             </p>
 
             {/* Experience Badge */}
            <div className="flex items-end gap-3 py-2">
              <div className="text-5xl font-black text-[#18305A] leading-none" style={{ fontFamily: "'Clash Display', sans-serif" }}>
                 4<span className="text-coral-500">+</span>
               </div>
              <div className="pb-1">
                <div className="text-xs font-bold text-foreground/40 uppercase">Years</div>
                <div className="text-base font-bold text-[#18305A]">Experience</div>
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
            <div className="flex flex-wrap items-center gap-4 pt-2">
               <Button asChild size="lg"
                className="h-12 px-6 text-sm font-bold rounded-full shadow-lg shadow-lavender-400/30 hover:shadow-xl hover:shadow-lavender-400/40 transition-all"
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
              {/* Background Shape */}
             <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-lavender-200/40 via-coral-100/30 to-white opacity-90" />
              
             <div className="relative grid grid-cols-2 gap-3">
                 {/* Main Image - Strategy Meeting */}
                <img 
                 src={businessTeamMeeting}
                 alt="Business team meeting in modern office"
                 className="col-span-2 aspect-[16/9] shadow-xl shadow-lavender-400/20 border-3 border-white rounded-2xl w-full h-full object-cover"
                 width={600}
                 height={338}
                  loading="lazy"
                  decoding="async"
                />
               
                 {/* Consulting Team Discussion */}
                <img 
                 src={teamCollaborationOffice}
                  alt="Dedicated consulting team in modern office"
                 className="aspect-[4/3] shadow-lg border-2 border-white rounded-xl w-full h-full object-cover"
                 width={200}
                 height={150}
                  loading="lazy"
                  decoding="async"
                />
                
                 {/* Expert Team Working */}
                <img 
                 src={businessTeamMeeting}
                  alt="Expert team strategic planning"
                 className="aspect-[4/3] shadow-lg border-2 border-white rounded-xl w-full h-full object-cover"
                 width={200}
                 height={150}
                  loading="lazy"
                  decoding="async"
                />
             </div>
 
             {/* Floating ROI Card */}
             <motion.div 
               className="absolute -bottom-3 -left-3 bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-3 border border-lavender-200/50"
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               transition={{ delay: 0.5 }}
               viewport={{ once: true }}
             >
              <div className="text-2xl font-black text-coral-500" style={{ fontFamily: "'Clash Display', sans-serif" }}>
                 340%
               </div>
              <div className="text-xs text-foreground/50 font-medium">Avg. ROI</div>
             </motion.div>
              
              {/* Premium Badge */}
              <motion.div 
               className="absolute top-2 right-2 bg-white/95 backdrop-blur-sm rounded-full shadow-lg px-2.5 py-1 border border-lavender-200/50"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                viewport={{ once: true }}
              >
               <div className="flex items-center gap-1">
                 <Sparkles className="w-3 h-3 text-lavender-500" />
                  <span className="text-xs font-bold text-[#18305A]">AI Powered</span>
                </div>
              </motion.div>
           </motion.div>
         </div>
       </div>
     </section>
   );
 };