import { motion } from "framer-motion";
import { Star, Shield, Award, Users, TrendingUp, Sparkles, CheckCircle } from "lucide-react";
 
 const stats = [
   { label: "Happy Clients", value: "500+", icon: Users },
   { label: "Success Rate", value: "99.8%", icon: TrendingUp },
   { label: "Years Active", value: "4+", icon: Award },
   { label: "Expert Rating", value: "5.0", icon: Star },
 ];
 
 const logos = [
   "TechGuard", "SecureOhio", "FamilySafe", "BizShield", "CyberWatch"
 ];
 
const badges = [
  { num: "01", icon: Shield, label: "Verified Experts" },
  { num: "02", icon: Award, label: "Ohio Certified" },
  { num: "03", icon: Star, label: "Top Rated" },
];

 export const TrustedExpertsBar = () => {
   return (
    <section className="py-12 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #FAF9F7 0%, #FFF5F0 50%, #FAF9F7 100%)' }}>
       {/* Decorative Elements */}
       <motion.div 
        className="absolute top-0 left-[10%] w-[400px] h-[400px] opacity-40 pointer-events-none"
         style={{
          background: 'radial-gradient(circle at center, rgba(248,146,106,0.4) 0%, transparent 60%)',
          filter: 'blur(80px)',
         }}
       />
       <motion.div 
        className="absolute bottom-0 right-[20%] w-[350px] h-[350px] opacity-30 pointer-events-none"
         style={{
          background: 'radial-gradient(circle at center, rgba(124,58,237,0.3) 0%, transparent 60%)',
          filter: 'blur(100px)',
         }}
       />
      
      <div className="container mx-auto px-6 lg:px-12">
        
        {/* Top Trust Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-between gap-6 mb-12 pb-10 border-b border-[#1a1a2e]/5"
        >
          {/* Trust Circles + Stars */}
          <div className="flex items-center gap-4">
            <div className="flex -space-x-2">
              {[
                { letter: 'S', color: '#22C55E' },
                { letter: 'T', color: '#3B82F6' },
                { letter: 'C', color: '#EAB308' },
                { letter: 'F', color: '#8B5CF6' },
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: i * 0.1, type: "spring" }}
                  viewport={{ once: true }}
                  className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-sm border-2 border-white shadow-lg"
                  style={{ backgroundColor: item.color }}
                >
                  {item.letter}
                </motion.div>
              ))}
            </div>
            <div>
              <div className="flex gap-0.5 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#22C55E] text-[#22C55E]" />
                ))}
              </div>
              <span className="text-sm font-medium text-[#1a1a2e]/70">Trusted by Ohio Families</span>
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap items-center gap-3">
            {badges.map((badge, i) => (
              <motion.div 
                key={badge.label}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-full border border-[#1a1a2e]/10 shadow-sm hover:shadow-md transition-shadow"
              >
                <span className="text-xs font-bold text-[#22C55E]">{badge.num}</span>
                <badge.icon className="w-4 h-4 text-[#7C3AED]" />
                <span className="text-sm font-semibold text-[#1a1a2e]">{badge.label}</span>
              </motion.div>
            ))}
          </div>

          {/* Stats Highlights */}
          <div className="flex items-center gap-8">
            <div className="text-center">
              <div className="text-3xl font-black" style={{ 
                background: 'linear-gradient(135deg, #22C55E 0%, #10B981 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>17%</div>
              <div className="text-[10px] text-[#1a1a2e]/50 uppercase tracking-wider font-semibold">Veteran Discount</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-[#1a1a2e]">60</div>
              <div className="text-[10px] text-[#1a1a2e]/50 uppercase tracking-wider font-semibold">Day Guarantee</div>
            </div>
          </div>
        </motion.div>

         {/* Partner Logos */}
         <div className="text-center mb-12 relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white shadow-lg border border-[#7C3AED]/20 mb-6"
          >
            <Sparkles className="w-4 h-4 text-[#F8926A]" />
             <span className="text-sm font-semibold text-[#18305A] uppercase tracking-wide">Our Impact</span>
          </motion.div>
          <p className="text-sm font-medium text-[#1a1a2e]/40 uppercase tracking-[0.2em] mb-6">
             Trusted by Leading Organizations
           </p>
          <div className="flex items-center justify-center gap-4 lg:gap-6 flex-wrap">
             {logos.map((logo, i) => (
               <motion.div 
                 key={logo}
                 initial={{ opacity: 0, y: 10 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ delay: i * 0.1 }}
                 viewport={{ once: true }}
                className="px-6 py-3 rounded-xl bg-white border border-[#1a1a2e]/5 shadow-sm hover:shadow-md hover:border-[#7C3AED]/20 transition-all cursor-default"
               >
                <span className="text-base font-bold text-[#18305A]/50 hover:text-[#7C3AED] transition-colors"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}>
                   {logo}
                 </span>
               </motion.div>
             ))}
           </div>
         </div>
 
         {/* Stats Grid */}
         <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 relative z-10">
           {stats.map((stat, i) => (
             <motion.div 
               key={stat.label}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.1 }}
               viewport={{ once: true }}
               className="text-center group"
             >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white shadow-lg border border-[#F8926A]/20 mb-4 group-hover:scale-110 group-hover:shadow-xl transition-all">
                <stat.icon className="w-7 h-7 text-[#F8926A]" />
               </div>
              <div className="text-4xl lg:text-5xl font-black mb-2"
                 style={{ 
                   fontFamily: "'Clash Display', 'DM Sans', sans-serif",
                  background: 'linear-gradient(135deg, #1a1a2e 0%, #7C3AED 100%)',
                   WebkitBackgroundClip: 'text',
                   WebkitTextFillColor: 'transparent',
                 }}>
                 {stat.value}
               </div>
              <div className="text-sm text-[#1a1a2e]/50 font-medium">{stat.label}</div>
             </motion.div>
           ))}
         </div>
       </div>
     </section>
   );
 };