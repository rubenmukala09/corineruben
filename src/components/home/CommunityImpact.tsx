 import { Link } from "react-router-dom";
 import { Button } from "@/components/ui/button";
 import { Heart, Shield, Users, Ribbon, ArrowRight, CheckCircle, Sparkles } from "lucide-react";
 import { motion } from "framer-motion";
 import teamExpertsLobby from "@/assets/team-experts-lobby.jpg";
 import businessTeamMeeting from "@/assets/business-team-meeting-natural.jpg";
 
 const values = [
   { icon: Shield, title: "Treating you with respect and courtesy" },
   { icon: Heart, title: "Explaining the concepts and options" },
   { icon: Users, title: "Helping you solve problems" },
 ];
 
 const teamMembers = [
   { name: "Brandon Joe", role: "Founder & CEO", image: teamExpertsLobby },
   { name: "Laura Wilson", role: "Security Lead", image: businessTeamMeeting },
   { name: "Jackson Mills", role: "Training Director", image: teamExpertsLobby },
 ];
 
 export const CommunityImpact = () => {
   return (
    <section className="relative py-12 lg:py-16 overflow-hidden" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #faf9f7 50%, #fff5f0 100%)' }}>
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
          className="text-center mb-10"
         >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-coral-200/50 shadow-lg mb-4">
             <Sparkles className="w-4 h-4 text-coral-500" />
             <span className="text-sm font-semibold text-[#18305A] uppercase tracking-wide">Our Team</span>
           </div>
          <h2 className="text-3xl md:text-4xl font-black text-[#18305A] leading-tight mb-3"
             style={{ fontFamily: "'Clash Display', 'DM Sans', sans-serif" }}>
             Dedicated Consulting <span className="bg-gradient-to-r from-coral-500 to-lavender-500 bg-clip-text text-transparent">Team</span>
           </h2>
         </motion.div>
 
         {/* Team Cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-12">
           {teamMembers.map((member, i) => (
             <motion.div 
               key={member.name}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.1 }}
               viewport={{ once: true }}
               className="group"
             >
               {/* Real Photo */}
                 <div className="relative aspect-[4/5] rounded-3xl overflow-hidden mb-4 group-hover:scale-[1.02] transition-transform shadow-xl border-4 border-white">
                   <img 
                     src={member.image}
                     alt={member.name}
                     width={300}
                     height={375}
                     loading="lazy"
                     decoding="async"
                     className="w-full h-full object-cover"
                   />
                   {/* Premium overlay */}
                   <div className="absolute inset-0 bg-gradient-to-t from-[#18305A]/40 via-transparent to-transparent" />
                   
                   {/* Glassmorphism name card */}
                   <div className="absolute bottom-4 left-4 right-4 bg-white/20 backdrop-blur-xl rounded-2xl p-3 border border-white/30">
                     <div className="text-white font-bold">{member.name}</div>
                     <div className="text-white/70 text-sm">{member.role}</div>
                   </div>
                 </div>
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
             <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
               <img 
                 src={businessTeamMeeting}
                 alt="Team collaboration"
                 width={600}
                 height={450}
                 loading="lazy"
                 decoding="async"
                 className="w-full h-full object-cover"
               />
               {/* Premium overlay */}
               <div className="absolute inset-0 bg-gradient-to-t from-[#18305A]/30 via-transparent to-transparent" />
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
             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-coral-200/50 shadow-lg">
               <Sparkles className="w-4 h-4 text-coral-500" />
               <span className="text-sm font-semibold text-[#18305A] uppercase tracking-wide">Our Commitment</span>
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
                   <div className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-md border border-coral-200/50 shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform">
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