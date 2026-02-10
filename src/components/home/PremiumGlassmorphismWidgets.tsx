import { motion } from "framer-motion";
import { Star, Shield, Users, TrendingUp, Award, Heart, Quote, ArrowRight, CheckCircle, Sparkles, Lock, Eye, Bell, Fingerprint } from "lucide-react";
import { Link } from "react-router-dom";
import familyLivingRoom from "@/assets/family-living-room-natural.jpg";
import grandmotherGrandchildren from "@/assets/grandmother-grandchildren-sofa.jpg";
import seniorsTablet from "@/assets/seniors-tablet-kitchen.jpg";

// Sample testimonials for design preview only.
const testimonials = [{
  name: "Sample Client",
  role: "Family Member (Sample)",
  quote: "Clear guidance and calm, respectful support throughout the process.",
  rating: 5,
  image: grandmotherGrandchildren
}, {
  name: "Sample Veteran",
  role: "Veteran (Sample)",
  quote: "Helpful, patient, and focused on practical next steps.",
  rating: 5,
  image: seniorsTablet
}];

// Note: Update these stats periodically with real metrics from database
const floatingStats = [{
  icon: Users,
  value: "100+",
  label: "Families Protected",
  color: "#F8926A"
}, {
  icon: Shield,
  value: "1K+",
  label: "Threats Analyzed",
  color: "#BB81B5"
}, {
  icon: TrendingUp,
  value: "99.8%",
  label: "Success Rate",
  color: "#18305A"
}];
const securityFeatures = [{
  icon: Lock,
  title: "End-to-End Protection",
  gradient: "from-coral-400 to-coral-600"
}, {
  icon: Eye,
  title: "24/7 Monitoring",
  gradient: "from-lavender-400 to-lavender-600"
}, {
  icon: Bell,
  title: "Instant Alerts",
  gradient: "from-blue-400 to-blue-600"
}, {
  icon: Fingerprint,
  title: "Identity Shield",
  gradient: "from-emerald-400 to-emerald-600"
}];
export const PremiumGlassmorphismWidgets = () => {
  return <section className="relative py-10 md:py-14 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl relative z-10">

        {/* Section Header - Mobile Optimized */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1]
      }} viewport={{
        once: true
      }} className="text-center mb-10 md:mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#18305A] leading-tight mb-3 md:mb-4 px-2" style={{
          fontFamily: "'Lora', 'Rubik', serif"
        }}>
            Real Protection, Real Results
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-foreground/60 max-w-3xl mx-auto leading-relaxed px-4">
            Join Ohio families who trust us with their digital safety.
          </p>
        </motion.div>

         {/* Main Grid Layout - Mobile Responsive */}
         <div className="grid lg:grid-cols-12 gap-6 md:gap-8 lg:gap-10 xl:gap-12">

           {/* Left - Hero Image with Glass Overlay */}
           <motion.div initial={{
          opacity: 0,
          x: -30
        }} whileInView={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.4,
          ease: [0.4, 0, 0.2, 1]
        }} viewport={{
          once: true
        }} className="lg:col-span-5 relative">
             <div className="relative aspect-[4/5] rounded-2xl sm:rounded-3xl lg:rounded-[40px] overflow-hidden shadow-2xl shadow-coral-400/20 hover:shadow-coral-400/30 transition-all duration-300">
               <img src={familyLivingRoom} alt="Happy family protected from scams" width={500} height={625} loading="lazy" decoding="async" className="w-full h-full object-cover" />
               <div className="absolute inset-0 bg-gradient-to-t from-[#18305A]/40 via-transparent to-transparent" />

               {/* Glassmorphism Stats Card - Mobile Optimized */}
               <motion.div className="absolute bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-6 glass-enhanced sm:rounded-3xl p-4 sm:p-6 shadow-float rounded-sm opacity-85 mx-[110px] pb-0 pr-[90px] py-0 px-[10px] my-[68px]" initial={{
              opacity: 0,
              y: 20
            }} whileInView={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.4
            }} viewport={{
              once: true
            }}>
                 <div className="flex items-center justify-between">
                   <div>
                     <div className="text-foreground/80 text-xs sm:text-sm font-medium mb-1">Protected Families</div>
                     <div className="text-[#18305A] text-2xl sm:text-3xl font-black" style={{
                    fontFamily: "'Lora', serif"
                  }}>100+</div>
                   </div>
                   <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-coral-400 to-coral-500 flex items-center justify-center shadow-lg">
                     <Heart className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                   </div>
                 </div>
               </motion.div>

               {/* Premium Badge - Mobile Optimized */}
               <motion.div className="absolute top-3 right-3 sm:top-6 sm:right-6 glass-enhanced rounded-full shadow-float px-3 py-1.5 sm:px-4 sm:py-2" initial={{
              opacity: 0,
              scale: 0.8
            }} whileInView={{
              opacity: 1,
              scale: 1
            }} transition={{
              delay: 0.5
            }} viewport={{
              once: true
            }}>
                 <div className="flex items-center gap-1.5 sm:gap-2">
                   <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-coral-500" />
                   <span className="text-xs sm:text-sm font-bold text-[#18305A]">Trusted</span>
                 </div>
               </motion.div>
             </div>
           </motion.div>

          {/* Right - Unified Widget Stack - Zero Gaps */}
          <div className="lg:col-span-7 flex flex-col gap-6">

            {/* Stats - Mobile Responsive Grid */}
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6,
            delay: 0.1
          }} viewport={{
            once: true
          }} className="glass-enhanced rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 shadow-float">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
                {floatingStats.map((stat, i) => <motion.div key={stat.label} className="text-center" initial={{
                opacity: 0,
                scale: 0.9
              }} whileInView={{
                opacity: 1,
                scale: 1
              }} transition={{
                delay: 0.2 + i * 0.1
              }} viewport={{
                once: true
              }}>
                    <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto rounded-xl sm:rounded-2xl mb-3 sm:mb-4 flex items-center justify-center shadow-lg" style={{
                  background: `linear-gradient(135deg, ${stat.color}40 0%, ${stat.color}60 100%)`
                }}>
                      <stat.icon className="w-7 h-7 sm:w-8 sm:h-8" style={{
                    color: stat.color
                  }} />
                    </div>
                    <div className="text-2xl sm:text-3xl md:text-4xl font-black text-[#18305A] mb-1.5 sm:mb-2" style={{
                  fontFamily: "'Lora', serif"
                }}>
                      {stat.value}
                    </div>
                    <div className="text-xs text-foreground/60 uppercase font-semibold tracking-wide">{stat.label}</div>
                  </motion.div>)}
              </div>
            </motion.div>

            {/* Security Features - Mobile Responsive Grid */}
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.2,
            duration: 0.6
          }} viewport={{
            once: true
          }} className="glass-enhanced rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 shadow-float">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
                {securityFeatures.map((feature, i) => <motion.div key={feature.title} className="text-center" initial={{
                opacity: 0,
                y: 10
              }} whileInView={{
                opacity: 1,
                y: 0
              }} transition={{
                delay: 0.3 + i * 0.08
              }} viewport={{
                once: true
              }}>
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 mx-auto rounded-lg sm:rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-2 sm:mb-3 shadow-lg`}>
                      <feature.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                    </div>
                    <div className="text-[10px] sm:text-xs font-bold text-[#18305A] leading-tight px-1">{feature.title}</div>
                  </motion.div>)}
              </div>
            </motion.div>

            {/* Testimonials - Mobile Responsive */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
              {testimonials.map((testimonial, i) => <motion.div key={testimonial.name} initial={{
              opacity: 0,
              y: 20
            }} whileInView={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.3 + i * 0.1,
              duration: 0.6
            }} viewport={{
              once: true
            }} className="glass-enhanced rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-float hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 relative">
                   {/* Quote Icon */}
                   <div className="absolute top-3 right-3 sm:top-4 sm:right-4 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-coral-100 to-lavender-100 flex items-center justify-center shadow-sm">
                     <Quote className="w-4 h-4 sm:w-5 sm:h-5 text-coral-500" />
                   </div>

                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <span className="rounded-full bg-white/90 backdrop-blur-sm px-2.5 py-1 text-[10px] font-semibold text-foreground/70 border border-white/60 shadow-sm">
                      Sample
                    </span>
                    <div className="flex gap-0.5">
                      {[...Array(testimonial.rating)].map((_, j) => <Star key={j} className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 fill-amber-400" />)}
                    </div>
                  </div>

                   <p className="text-foreground/70 mb-4 sm:mb-5 leading-relaxed font-medium text-sm">
                     "{testimonial.quote}"
                   </p>

                   <div className="flex items-center gap-3">
                     <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-coral-200/50 shadow-sm flex-shrink-0">
                       <img src={testimonial.image} alt={testimonial.name} width={48} height={48} loading="lazy" className="w-full h-full object-cover" />
                     </div>
                     <div>
                       <div className="font-bold text-[#18305A] text-sm">{testimonial.name}</div>
                       <div className="text-xs text-foreground/50">{testimonial.role}</div>
                     </div>
                   </div>
                 </motion.div>)}
             </div>

            {/* CTA - Mobile Responsive */}
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.4,
            duration: 0.6
          }} viewport={{
            once: true
          }} className="glass-enhanced rounded-2xl sm:rounded-3xl p-6 sm:p-7 md:p-8 shadow-float">
              <div className="flex flex-col md:flex-row items-center md:justify-between gap-5 sm:gap-6 text-center md:text-left">
                <div className="flex-1">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-[#18305A] mb-2 leading-tight" style={{
                  fontFamily: "'Lora', 'Rubik', serif"
                }}>
                    Ready to Protect Your Family?
                  </h3>
                  <p className="text-sm md:text-base text-foreground/60">Free consultation · 30-day guarantee · Ohio-based</p>
                </div>
                <Link to="/training#pricing" className="inline-flex items-center justify-center gap-2.5 sm:gap-3 px-6 py-3.5 sm:px-8 sm:py-4 rounded-full text-white text-sm sm:text-base font-bold shadow-2xl hover:shadow-coral-500/30 hover:scale-105 active:scale-100 transition-all duration-300 whitespace-nowrap w-full md:w-auto min-h-[48px]" style={{
                background: 'linear-gradient(135deg, #F8926A 0%, #BB81B5 100%)'
              }}>
                  Get Started
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </Link>
              </div>
            </motion.div>

           </div>
         </div>
       </div>
     </section>;
};
export default PremiumGlassmorphismWidgets;