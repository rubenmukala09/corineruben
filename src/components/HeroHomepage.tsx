 import { Link } from "react-router-dom";
 import { ArrowRight, Shield, Award, Star, Eye, Sparkles, Zap } from "lucide-react";
 import { motion } from "framer-motion";
 import heroFamilySafe from "@/assets/hero-home-family-safe.jpg";
 
 export const HeroHomepage = () => {
   return (
     <section className="relative min-h-[110vh] overflow-hidden bg-[#FAF9F7]">
       {/* Split Background */}
       <div className="absolute inset-0 grid lg:grid-cols-[55%_45%]">
         {/* Left - Light Premium */}
         <div className="bg-gradient-to-br from-[#FAF9F7] via-[#F8F5F2] to-[#F0EBE5] relative">
           <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_100%_at_20%_10%,rgba(248,146,106,0.15),transparent)]" />
           <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_80%_90%,rgba(187,129,181,0.12),transparent)]" />
           <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(124,58,237,0.05),transparent)]" />
           {/* Floating Orbs */}
           <motion.div 
             animate={{ y: [-20, 20, -20], x: [-10, 10, -10] }}
             transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
             className="absolute top-[20%] left-[10%] w-64 h-64 rounded-full bg-gradient-to-br from-[#F8926A]/20 to-[#BB81B5]/20 blur-3xl"
           />
           <motion.div 
             animate={{ y: [20, -20, 20], x: [10, -10, 10] }}
             transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
             className="absolute bottom-[30%] right-[5%] w-48 h-48 rounded-full bg-gradient-to-br from-[#7C3AED]/15 to-[#BB81B5]/15 blur-3xl"
           />
         </div>
         {/* Right - Hero Image */}
         <div className="relative hidden lg:block overflow-hidden">
           <img 
             src={heroFamilySafe} 
             alt="Protected family"
             width={960}
             height={1080}
             loading="eager"
             decoding="async"
             className="w-full h-full object-cover scale-105"
           />
           <div className="absolute inset-0 bg-gradient-to-r from-[#FAF9F7] via-[#FAF9F7]/40 to-transparent" />
           <div className="absolute inset-0 bg-gradient-to-t from-[#FAF9F7]/80 via-transparent to-[#FAF9F7]/20" />
           {/* Decorative frame */}
           <div className="absolute inset-8 border-2 border-white/30 rounded-3xl pointer-events-none" />
           {/* Floating badge on image */}
           <motion.div
             initial={{ opacity: 0, scale: 0.8 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ delay: 1.2, duration: 0.6 }}
             className="absolute top-12 right-12 bg-white/90 backdrop-blur-xl rounded-2xl p-4 shadow-2xl border border-white/50"
           >
             <div className="flex items-center gap-3">
               <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#22C55E] to-[#16A34A] flex items-center justify-center">
                 <Shield className="w-6 h-6 text-white" />
               </div>
               <div>
                 <div className="text-xs font-semibold text-[#22C55E] uppercase tracking-wider">Protected</div>
                 <div className="text-lg font-bold text-[#1a1a2e]">500+ Families</div>
               </div>
             </div>
           </motion.div>
         </div>
       </div>
 
       {/* Decorative Accent Lines */}
       <div className="absolute top-0 left-[55%] w-px h-full bg-gradient-to-b from-transparent via-[#BB81B5]/30 to-transparent hidden lg:block" />
 
       {/* Main Content */}
       <div className="relative z-10 min-h-screen flex items-center">
         <div className="container mx-auto px-6 lg:px-16">
           <div className="max-w-3xl py-32 lg:py-0 pb-56">
             
             {/* Prestige Marker */}
             <motion.div 
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.8 }}
               className="flex items-center gap-5 mb-14"
             >
               <div className="flex items-center gap-2">
                 <Sparkles className="w-5 h-5 text-[#F8926A]" />
                 <div className="w-16 h-1 rounded-full bg-gradient-to-r from-[#F8926A] to-[#BB81B5]" />
               </div>
               <span className="text-xs font-semibold tracking-[0.4em] text-[#1a1a2e]/80 uppercase">
                 Est. 2020 — Ohio
               </span>
             </motion.div>
 
             {/* Monumental Headline */}
             <motion.div
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 1, delay: 0.2 }}
             >
               <h1 className="mb-10">
                 <span className="block text-[3rem] sm:text-6xl md:text-7xl lg:text-8xl font-light text-[#1a1a2e] leading-[1.05] tracking-[-0.03em] mb-4"
                   style={{ fontFamily: "'Clash Display', 'DM Sans', sans-serif" }}>
                   Uncompromising
                 </span>
                 <span className="block text-[3.5rem] sm:text-7xl md:text-8xl lg:text-[7rem] font-black leading-[0.95] tracking-[-0.03em]"
                   style={{ 
                     fontFamily: "'Clash Display', 'DM Sans', sans-serif",
                     background: 'linear-gradient(135deg, #F8926A 0%, #E879A9 30%, #BB81B5 60%, #7C3AED 100%)',
                     WebkitBackgroundClip: 'text',
                     WebkitTextFillColor: 'transparent',
                     filter: 'drop-shadow(0 4px 20px rgba(187, 129, 181, 0.3))',
                   }}>
                   Protection
                 </span>
               </h1>
             </motion.div>
 
             {/* Refined Body */}
             <motion.p 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, delay: 0.4 }}
               className="text-lg md:text-xl lg:text-2xl text-[#1a1a2e]/70 mb-14 leading-[1.9] max-w-2xl font-light"
             >
               Veteran-supporting. Enterprise-caliber AI security safeguarding 
               <span className="text-[#1a1a2e] font-semibold bg-gradient-to-r from-[#F8926A]/20 to-[#BB81B5]/20 px-2 py-1 rounded-lg"> over 500 families </span>
               and businesses from evolving digital threats.
             </motion.p>
 
             {/* Luxe CTAs */}
             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, delay: 0.5 }}
               className="flex flex-col sm:flex-row gap-5"
             >
               <Link 
                 to="/training"
                 className="group inline-flex items-center justify-center gap-3 h-16 px-12 rounded-full font-bold text-base tracking-wide text-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-500"
                 style={{ 
                   background: 'linear-gradient(135deg, #F8926A 0%, #E879A9 50%, #BB81B5 100%)',
                   boxShadow: '0 10px 40px -10px rgba(248, 146, 106, 0.5)'
                 }}
               >
                 <Zap className="w-5 h-5" />
                 Begin Protection
                 <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
               </Link>
               
               <Link 
                 to="/business"
                 className="inline-flex items-center justify-center h-16 px-12 rounded-full border-2 border-[#1a1a2e]/20 text-[#1a1a2e]/80 font-semibold text-base tracking-wide hover:border-[#BB81B5] hover:text-[#1a1a2e] hover:bg-white/50 hover:shadow-lg transition-all duration-500"
               >
                 For Businesses
               </Link>
             </motion.div>
 
             {/* Quick Stats Row */}
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, delay: 0.7 }}
               className="flex flex-wrap gap-8 mt-14 pt-10 border-t border-[#1a1a2e]/10"
             >
               {[
                 { value: "17%", label: "Veteran Discount" },
                 { value: "60", label: "Day Guarantee" },
                 { value: "24/7", label: "Support" }
               ].map((stat, i) => (
                 <div key={i} className="text-center">
                   <div className="text-3xl lg:text-4xl font-black mb-1" style={{
                     background: 'linear-gradient(135deg, #1a1a2e 0%, #7C3AED 100%)',
                     WebkitBackgroundClip: 'text',
                     WebkitTextFillColor: 'transparent'
                   }}>{stat.value}</div>
                   <div className="text-xs font-medium text-[#1a1a2e]/50 uppercase tracking-wider">{stat.label}</div>
                 </div>
               ))}
             </motion.div>
           </div>
         </div>
       </div>
 
       {/* Privacy Notice */}
       <motion.div 
         initial={{ opacity: 0, y: -10 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.6, delay: 1 }}
         className="absolute top-8 left-1/2 -translate-x-1/2 z-20"
       >
         <div className="flex items-center gap-3 px-5 py-3 bg-white/90 backdrop-blur-xl rounded-full border border-[#1a1a2e]/10 shadow-lg">
           <Eye className="w-5 h-5 text-[#BB81B5]" />
           <span className="text-sm text-[#1a1a2e]/70">
             <span className="font-medium text-[#1a1a2e]/80">Privacy Notice:</span> Images are AI-generated to protect member identities
           </span>
         </div>
       </motion.div>
 
       {/* Trust Bar - Bottom */}
       <motion.div 
         initial={{ opacity: 0, y: 30 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.8, delay: 0.9 }}
         className="absolute bottom-0 left-0 right-0 z-20"
       >
         <div className="bg-white/80 backdrop-blur-xl border-t border-[#1a1a2e]/10 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
           <div className="container mx-auto px-6 lg:px-12 py-8">
             <div className="flex flex-wrap items-center justify-between gap-8">
               
               {/* Trust Circles + Stars */}
               <div className="flex items-center gap-5">
                 <div className="flex -space-x-3">
                   {['#EAB308', '#3B82F6', '#10B981', '#8B5CF6'].map((color, i) => (
                     <motion.div 
                       key={i}
                       initial={{ scale: 0, opacity: 0 }}
                       animate={{ scale: 1, opacity: 1 }}
                       transition={{ delay: 1 + i * 0.1, duration: 0.4 }}
                       className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-base border-3 border-white shadow-lg"
                       style={{ backgroundColor: color, boxShadow: `0 4px 15px ${color}40` }}
                     >
                       {['S', 'T', 'C', 'F'][i]}
                     </motion.div>
                   ))}
                 </div>
                 <div>
                   <div className="flex gap-0.5 mb-1">
                     {[...Array(5)].map((_, i) => (
                       <Star key={i} className="w-5 h-5 fill-[#EAB308] text-[#EAB308] drop-shadow-sm" />
                     ))}
                   </div>
                   <span className="text-base font-medium text-[#1a1a2e]/80">Trusted by Ohio Families</span>
                 </div>
               </div>
 
               {/* Badges */}
               <div className="flex flex-wrap items-center gap-4">
                 <div className="flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-[#7C3AED]/5 to-[#BB81B5]/5 rounded-2xl border border-[#7C3AED]/20 shadow-sm hover:shadow-md hover:scale-105 transition-all">
                   <span className="text-sm font-black text-[#7C3AED]">01</span>
                   <Shield className="w-5 h-5 text-[#7C3AED]" />
                   <span className="text-base font-semibold text-[#1a1a2e]">Verified Experts</span>
                 </div>
                 <div className="flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-[#7C3AED]/5 to-[#BB81B5]/5 rounded-2xl border border-[#7C3AED]/20 shadow-sm hover:shadow-md hover:scale-105 transition-all">
                   <span className="text-sm font-black text-[#7C3AED]">02</span>
                   <Award className="w-5 h-5 text-[#7C3AED]" />
                   <span className="text-base font-semibold text-[#1a1a2e]">Ohio Certified</span>
                 </div>
                 <div className="flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-[#7C3AED]/5 to-[#BB81B5]/5 rounded-2xl border border-[#7C3AED]/20 shadow-sm hover:shadow-md hover:scale-105 transition-all">
                   <span className="text-sm font-black text-[#7C3AED]">03</span>
                   <Star className="w-5 h-5 text-[#7C3AED]" />
                   <span className="text-base font-semibold text-[#1a1a2e]">Top Rated</span>
                 </div>
               </div>
 
               {/* Stats */}
               <div className="hidden xl:flex items-center gap-10">
                 <div className="text-center">
                   <div className="text-4xl font-black" style={{ 
                     background: 'linear-gradient(135deg, #F8926A 0%, #BB81B5 100%)',
                     WebkitBackgroundClip: 'text',
                     WebkitTextFillColor: 'transparent'
                   }}>17%</div>
                   <div className="text-sm font-medium text-[#1a1a2e]/60 uppercase tracking-wider">Veteran Discount</div>
                 </div>
                 <div className="text-center">
                   <div className="text-4xl font-black text-[#1a1a2e]">60</div>
                   <div className="text-sm font-medium text-[#1a1a2e]/60 uppercase tracking-wider">Day Guarantee</div>
                 </div>
               </div>
 
             </div>
           </div>
         </div>
       </motion.div>
     </section>
   );
 };
 
 export default HeroHomepage;