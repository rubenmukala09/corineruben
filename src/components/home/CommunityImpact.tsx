 import { Link } from "react-router-dom";
 import { Button } from "@/components/ui/button";
 import { Heart, Shield, Users, Ribbon, ArrowRight, CheckCircle } from "lucide-react";
 import { motion } from "framer-motion";
 
 const values = [
   { icon: Shield, title: "Treating you with respect and courtesy" },
   { icon: Heart, title: "Explaining the concepts and options" },
   { icon: Users, title: "Helping you solve problems" },
 ];
 
 const teamMembers = [
   { name: "Brandon Joe", role: "Founder & CEO", color: "from-coral-400 to-lavender-500" },
   { name: "Laura Wilson", role: "Security Lead", color: "from-lavender-500 to-[#18305A]" },
   { name: "Jackson Mills", role: "Training Director", color: "from-[#18305A] to-coral-400" },
 ];
 
 export const CommunityImpact = () => {
   return (
     <section className="relative py-24 lg:py-32 bg-white overflow-hidden">
       {/* Decorative Gradient */}
       <div className="absolute top-0 left-0 w-[400px] h-[400px] opacity-20 pointer-events-none"
         style={{
           background: 'radial-gradient(circle at center, rgba(248,146,106,0.4) 0%, transparent 60%)',
           filter: 'blur(80px)',
           transform: 'translate(-30%, -30%)'
         }}
       />
       
       <div className="container mx-auto px-4 lg:px-8 relative z-10">
         {/* Team Section */}
         <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6 }}
           viewport={{ once: true }}
           className="text-center mb-16"
         >
           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-coral-50 to-lavender-50 border border-coral-200/50 mb-6">
             <span className="w-2 h-2 rounded-full bg-coral-400" />
             <span className="text-sm font-semibold text-foreground/80 uppercase tracking-wide">Our Team</span>
           </div>
           <h2 className="text-4xl md:text-5xl font-black text-[#18305A] leading-tight mb-4"
             style={{ fontFamily: "'Clash Display', 'DM Sans', sans-serif" }}>
             Dedicated Consulting <span className="bg-gradient-to-r from-coral-500 to-lavender-500 bg-clip-text text-transparent">Team</span>
           </h2>
         </motion.div>
 
         {/* Team Cards */}
         <div className="grid md:grid-cols-3 gap-6 mb-24">
           {teamMembers.map((member, i) => (
             <motion.div 
               key={member.name}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.1 }}
               viewport={{ once: true }}
               className="group"
             >
               {/* Photo Placeholder */}
               <div className={`relative aspect-[4/5] rounded-3xl overflow-hidden bg-gradient-to-br ${member.color} mb-4 group-hover:scale-[1.02] transition-transform`}>
                 <div className="absolute inset-0 flex items-center justify-center">
                   <Users className="w-20 h-20 text-white/50" />
                 </div>
                 {/* Decorative Pattern */}
                 <div className="absolute inset-0 opacity-10"
                   style={{
                     backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                     backgroundSize: '16px 16px'
                   }}
                 />
               </div>
               <h3 className="text-xl font-bold text-[#18305A]">{member.name}</h3>
               <p className="text-foreground/50">{member.role}</p>
             </motion.div>
           ))}
         </div>
 
         {/* Values Section */}
         <div className="grid lg:grid-cols-2 gap-16 items-center">
           {/* Left - Image */}
           <motion.div 
             initial={{ opacity: 0, x: -30 }}
             whileInView={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.6 }}
             viewport={{ once: true }}
             className="relative"
           >
             <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-br from-coral-400 via-lavender-400 to-[#18305A] flex items-center justify-center">
               <Heart className="w-24 h-24 text-white/70" />
             </div>
             
             {/* Floating Badge */}
             <motion.div 
               className="absolute -bottom-4 -right-4 bg-[#18305A] rounded-2xl shadow-2xl px-6 py-4 text-white"
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               transition={{ delay: 0.4 }}
               viewport={{ once: true }}
             >
               <div className="text-sm font-medium text-white/60">Veteran-Owned</div>
               <div className="text-2xl font-black">Ohio Based</div>
             </motion.div>
           </motion.div>
 
           {/* Right - Content */}
           <motion.div 
             initial={{ opacity: 0, x: 30 }}
             whileInView={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.6, delay: 0.2 }}
             viewport={{ once: true }}
             className="space-y-6"
           >
             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-coral-50 to-lavender-50 border border-coral-200/50">
               <span className="w-2 h-2 rounded-full bg-coral-400" />
               <span className="text-sm font-semibold text-foreground/80 uppercase tracking-wide">Our Commitment</span>
             </div>
             
             <h3 className="text-3xl md:text-4xl font-black text-[#18305A] leading-tight"
               style={{ fontFamily: "'Clash Display', 'DM Sans', sans-serif" }}>
               Committed to Giving you{" "}
               <span className="bg-gradient-to-r from-coral-500 to-lavender-500 bg-clip-text text-transparent">True Value.</span>
             </h3>
             
             <p className="text-foreground/60 leading-relaxed">
               We craft unique digital experiences with more than 4 years of expertise in design and digital transformation, providing our customers with exceptional service.
             </p>
 
             {/* Values List */}
             <div className="space-y-4 pt-4">
               {values.map((value, i) => (
                 <motion.div 
                   key={value.title}
                   initial={{ opacity: 0, x: -10 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   transition={{ delay: 0.3 + i * 0.1 }}
                   viewport={{ once: true }}
                   className="flex items-center gap-4 group"
                 >
                   <div className="w-12 h-12 rounded-full bg-gradient-to-br from-coral-100 to-lavender-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                     <value.icon className="w-5 h-5 text-coral-500" />
                   </div>
                   <span className="font-medium text-[#18305A]">{value.title}</span>
                 </motion.div>
               ))}
             </div>
 
             {/* CTA */}
             <div className="pt-6">
               <Button asChild size="lg"
                 className="h-14 px-8 text-base font-bold rounded-full shadow-lg shadow-coral-400/30 hover:shadow-xl hover:shadow-coral-400/40 transition-all"
                 style={{ background: 'linear-gradient(135deg, #F8926A 0%, #BB81B5 100%)' }}>
                 <Link to="/about" className="text-white">
                   Learn Our Story
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