 import { motion } from "framer-motion";
 import { Star, Shield, Award, Users, TrendingUp, CheckCircle } from "lucide-react";
 
 const stats = [
   { label: "Happy Clients", value: "500+", icon: Users },
   { label: "Success Rate", value: "99.8%", icon: TrendingUp },
   { label: "Years Active", value: "4+", icon: Award },
   { label: "Expert Rating", value: "5.0", icon: Star },
 ];
 
 const logos = [
   "TechGuard", "SecureOhio", "FamilySafe", "BizShield", "CyberWatch"
 ];
 
 export const TrustedExpertsBar = () => {
   return (
     <section className="py-12 bg-gradient-to-r from-slate-50 via-white to-slate-50 border-y border-gray-100">
       <div className="container mx-auto px-4">
         {/* Partner Logos */}
         <div className="text-center mb-10">
           <p className="text-sm font-medium text-foreground/40 uppercase tracking-wider mb-6">
             Trusted by Leading Organizations
           </p>
           <div className="flex items-center justify-center gap-8 lg:gap-16 flex-wrap">
             {logos.map((logo, i) => (
               <motion.div 
                 key={logo}
                 initial={{ opacity: 0, y: 10 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ delay: i * 0.1 }}
                 viewport={{ once: true }}
                 className="text-xl font-bold text-foreground/20 hover:text-foreground/40 transition-colors cursor-default"
                 style={{ fontFamily: "'DM Sans', sans-serif" }}
               >
                 {logo}
               </motion.div>
             ))}
           </div>
         </div>
 
         {/* Stats Grid */}
         <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-12">
           {stats.map((stat, i) => (
             <motion.div 
               key={stat.label}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.1 }}
               viewport={{ once: true }}
               className="text-center group"
             >
               <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-coral-50 to-lavender-50 border border-coral-100/50 mb-3 group-hover:scale-110 transition-transform">
                 <stat.icon className="w-6 h-6 text-coral-500" />
               </div>
               <div className="text-3xl lg:text-4xl font-black text-[#18305A] mb-1"
                 style={{ fontFamily: "'Clash Display', 'DM Sans', sans-serif" }}>
                 {stat.value}
               </div>
               <div className="text-sm text-foreground/50 font-medium">{stat.label}</div>
             </motion.div>
           ))}
         </div>
       </div>
     </section>
   );
 };