import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Zap, Eye, Star, Shield, Award } from "lucide-react";
import { motion } from "framer-motion";
import heroSeniorsProtected from "@/assets/hero-seniors-protected.jpg";

export const HeroHomepage = () => {
  return (
    <section className="relative min-h-[110vh] lg:min-h-[121vh] overflow-hidden bg-background">
      {/* Premium Background - NO Glassmorphism on photo */}
      <div className="absolute inset-0 grid lg:grid-cols-[45%_55%]">
        {/* Left - Premium Gradient Background */}
        <div className="bg-gradient-to-br from-background via-muted/30 to-accent/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_120%_at_0%_0%,hsl(var(--primary)/0.15),transparent)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_100%_at_100%_100%,hsl(var(--accent)/0.12),transparent)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,hsl(var(--primary)/0.06),transparent)]" />
          
          {/* Animated Gradient Orbs - NO blur/glass on left */}
          <motion.div 
            animate={{ 
              y: [-30, 30, -30], 
              x: [-15, 15, -15],
              scale: [1, 1.15, 1]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[5%] left-[-5%] w-80 h-80 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 blur-3xl pointer-events-none"
          />
          <motion.div 
            animate={{ 
              y: [30, -30, 30], 
              x: [15, -15, 15],
              opacity: [0.5, 0.9, 0.5]
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[10%] right-[-10%] w-72 h-72 rounded-full bg-gradient-to-br from-primary/15 to-accent/15 blur-3xl pointer-events-none"
          />
          <motion.div 
            animate={{ 
              y: [-20, 20, -20], 
              scale: [1, 1.25, 1],
              rotate: [0, 8, 0]
            }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[50%] left-[20%] w-52 h-52 rounded-full bg-gradient-to-br from-green-500/15 to-primary/15 blur-3xl pointer-events-none"
          />
        </div>
        
        {/* Right - PREMIUM Animated Hero Image */}
        <div className="relative hidden lg:block overflow-hidden">
          {/* Ken Burns Animated Photo */}
          <motion.div
            animate={{ 
              scale: [1, 1.08, 1.04, 1.1, 1],
              x: [0, -15, 10, -5, 0],
              y: [0, -10, 5, -8, 0]
            }}
            transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <img 
              src={heroSeniorsProtected} 
              alt="Protected seniors using technology safely"
              width={800}
              height={600}
              loading="eager"
              decoding="async"
              className="w-full h-full object-cover scale-110"
            />
          </motion.div>
          
          {/* Animated Gradient Overlay - Reduced for clearer photo */}
          <motion.div 
            animate={{ 
              opacity: [0.15, 0.25, 0.15],
              backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/15"
            style={{ backgroundSize: '200% 200%' }}
          />
          
          {/* Floating Light Particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [-20, -100, -20],
                x: [0, (i % 2 === 0 ? 30 : -30), 0],
                opacity: [0, 0.8, 0],
                scale: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 6 + i * 1.5,
                repeat: Infinity,
                delay: i * 1.2,
                ease: "easeInOut"
              }}
              className="absolute w-2 h-2 rounded-full bg-white/60 blur-[2px] pointer-events-none"
              style={{
                left: `${20 + i * 12}%`,
                bottom: `${10 + (i % 3) * 15}%`
              }}
            />
          ))}
          
          {/* Premium Shimmer Effect */}
          <motion.div
            animate={{
              x: ['-100%', '200%'],
              opacity: [0, 0.4, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatDelay: 5,
              ease: "easeInOut"
            }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none"
          />
          
          {/* Ambient Glow Orbs */}
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.15, 0.35, 0.15]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[20%] right-[20%] w-40 h-40 rounded-full bg-gradient-to-br from-primary/40 to-accent/40 blur-3xl pointer-events-none"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-[30%] left-[10%] w-32 h-32 rounded-full bg-gradient-to-br from-accent/30 to-primary/30 blur-3xl pointer-events-none"
          />
          
          {/* Edge Blending Overlays - Reduced opacity */}
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/10 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent" />
          
          {/* Vignette Effect - Lighter */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,hsl(var(--background)/0.2)_100%)] pointer-events-none" />
        </div>
      </div>

      {/* Decorative Accent Lines */}
      <motion.div 
        animate={{ opacity: [0.15, 0.4, 0.15] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute top-0 left-[45%] w-px h-full bg-gradient-to-b from-transparent via-primary/30 to-transparent hidden lg:block pointer-events-none"
      />

      {/* Main Content with Glassmorphism Card */}
      <div className="relative z-10 min-h-[93.5vh] flex items-center">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-xl py-28 lg:py-0 pb-36">
            
            {/* Glassmorphism Content Card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="relative"
            >
              {/* Prestige Marker */}
              <motion.div 
                initial={{ opacity: 0, x: -25 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9 }}
                className="flex items-center gap-3 mb-8"
              >
                <div className="flex items-center gap-2.5 px-4 py-2 bg-white/60 dark:bg-card/60 backdrop-blur-xl rounded-full border border-white/40 dark:border-border/40 shadow-lg">
                  <motion.div
                    animate={{ rotate: [0, 20, -20, 0], scale: [1, 1.15, 1] }}
                    transition={{ duration: 5, repeat: Infinity }}
                  >
                    <Sparkles className="w-4 h-4 text-primary" />
                  </motion.div>
                  <motion.div 
                    animate={{ scaleX: [1, 1.3, 1] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="w-14 h-1 rounded-full bg-gradient-to-r from-primary via-accent to-primary"
                  />
                  <span className="text-[11px] font-bold tracking-[0.2em] text-foreground/60 uppercase">
                    Est. 2020 | Ohio
                  </span>
                </div>
              </motion.div>

              {/* Monumental Headline */}
              <motion.div
                initial={{ opacity: 0, y: 35 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.1, delay: 0.3 }}
              >
                <h1 className="mb-6">
                  <motion.span 
                    animate={{ opacity: [0.85, 1, 0.85] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-foreground leading-[1.1] tracking-[-0.02em] mb-3"
                    style={{ fontFamily: "'Clash Display', 'DM Sans', sans-serif" }}>
                    Uncompromising
                  </motion.span>
                  <motion.span 
                    animate={{ 
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                    }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[0.95] tracking-[-0.02em]"
                    style={{ 
                      fontFamily: "'Clash Display', 'DM Sans', sans-serif",
                      background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--accent)) 25%, hsl(265 55% 42%) 50%, hsl(var(--primary)) 75%, hsl(var(--accent)) 100%)',
                      backgroundSize: '200% 200%',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      filter: 'drop-shadow(0 4px 20px hsl(var(--accent)/0.35))',
                    }}>
                    Protection
                  </motion.span>
                </h1>
              </motion.div>

              {/* Refined Body with Glass Effect */}
              <motion.div 
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.5 }}
                className="relative mb-10"
              >
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-md font-light">
                  Veteran-supporting. Enterprise-caliber AI security safeguarding 
                  <motion.span 
                    animate={{ opacity: [0.75, 1, 0.75] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                    className="text-foreground font-medium bg-gradient-to-r from-primary/15 to-accent/15 px-2 py-1 rounded-lg mx-1 backdrop-blur-sm"
                  >over 500 families</motion.span>
                  and businesses from evolving digital threats.
                </p>
              </motion.div>

              {/* Glassmorphism CTAs */}
              <motion.div 
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <motion.div
                  whileHover={{ scale: 1.06, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Link 
                    to="/training"
                    className="group inline-flex items-center justify-center gap-2.5 h-14 px-10 rounded-full font-bold text-base tracking-wide text-white shadow-[0_10px_30px_-8px_hsl(var(--primary)/0.5)] hover:shadow-[0_16px_45px_-8px_hsl(var(--primary)/0.65)] transition-all duration-300"
                    style={{ 
                      background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--accent)) 100%)',
                    }}
                  >
                    <Zap className="w-5 h-5" />
                    Begin Protection
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </Link>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.06, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Link 
                    to="/business"
                    className="inline-flex items-center justify-center h-14 px-10 rounded-full border-2 border-border/50 text-foreground/70 font-bold text-base tracking-wide bg-white/50 dark:bg-card/50 backdrop-blur-xl hover:border-primary/50 hover:text-foreground hover:bg-white/70 dark:hover:bg-card/70 hover:shadow-lg transition-all duration-300"
                  >
                    For Businesses
                  </Link>
                </motion.div>
              </motion.div>

              {/* Quick Stats Row */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.8 }}
                className="flex flex-wrap gap-8 mt-10 pt-8 border-t border-border/30"
              >
                {[
                  { value: "10%", label: "Veteran Discount" },
                  { value: "60", label: "Day Guarantee" },
                  { value: "24/7", label: "Support" },
                  { value: "100%", label: "Satisfaction" }
                ].map((stat, i) => (
                  <motion.div 
                    key={i} 
                    className="text-center px-3 py-2 bg-white/40 dark:bg-card/40 backdrop-blur-xl rounded-xl border border-white/30 dark:border-border/30"
                    whileHover={{ scale: 1.15, y: -3 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <motion.div 
                      animate={{ opacity: [0.8, 1, 0.8] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                      className="text-2xl lg:text-3xl font-black"
                      style={{
                        background: 'linear-gradient(135deg, hsl(var(--foreground)) 0%, hsl(var(--primary)) 50%, hsl(var(--accent)) 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                      }}>{stat.value}</motion.div>
                    <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Privacy Notice */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 1.2 }}
        whileHover={{ scale: 1.03 }}
        className="absolute top-6 left-1/2 -translate-x-1/2 z-20"
      >
        <div className="flex items-center gap-2.5 px-5 py-2.5 bg-white/70 dark:bg-card/70 backdrop-blur-2xl rounded-full border border-white/40 dark:border-border/40 shadow-[0_8px_30px_rgba(0,0,0,0.1)]">
          <motion.div
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            <Eye className="w-4 h-4 text-accent" />
          </motion.div>
          <span className="text-xs text-muted-foreground">
            <span className="font-medium text-foreground/70">Privacy:</span> AI-generated images protect identities
          </span>
        </div>
      </motion.div>

      {/* Glassmorphism Trust Bar - Bottom */}
      <motion.div 
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 1 }}
        className="absolute bottom-0 left-0 right-0 z-20"
      >
        <div className="bg-white/75 dark:bg-card/75 backdrop-blur-2xl border-t border-white/30 dark:border-border/30 shadow-[0_-12px_40px_rgba(0,0,0,0.08)]">
          <div className="container mx-auto px-6 lg:px-8 py-5">
            <div className="flex flex-wrap items-center justify-between gap-8">
              
              {/* Trust Circles + Stars */}
              <div className="flex items-center gap-5">
                <div className="flex -space-x-2">
                  {[
                    { bg: 'hsl(48 96% 53%)', letter: 'S' },
                    { bg: 'hsl(217 91% 60%)', letter: 'T' },
                    { bg: 'hsl(160 84% 39%)', letter: 'C' },
                    { bg: 'hsl(var(--primary))', letter: 'F' }
                  ].map((item, i) => (
                    <motion.div 
                      key={i}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 1.2 + i * 0.1, duration: 0.5 }}
                      whileHover={{ scale: 1.25, zIndex: 10, y: -3 }}
                      className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-xs border-2 border-white shadow-lg cursor-pointer"
                      style={{ backgroundColor: item.bg, boxShadow: `0 4px 15px ${item.bg}40` }}
                    >
                      {item.letter}
                    </motion.div>
                  ))}
                </div>
                <div>
                  <div className="flex gap-0.5 mb-0.5">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.12 }}
                      >
                        <Star className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500" />
                      </motion.div>
                    ))}
                  </div>
                  <span className="text-xs font-medium text-muted-foreground">Trusted by Ohio</span>
                </div>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap items-center gap-4">
                {[
                  { num: "01", icon: Shield, label: "Verified Experts" },
                  { num: "02", icon: Award, label: "Ohio Certified" },
                  { num: "03", icon: Star, label: "Top Rated" }
                ].map((badge, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="flex items-center gap-2 px-4 py-2.5 bg-white/60 dark:bg-card/60 backdrop-blur-xl rounded-xl border border-primary/15 hover:shadow-lg hover:border-primary/30 transition-all cursor-pointer"
                  >
                    <span className="text-[10px] font-bold text-primary">{badge.num}</span>
                    <badge.icon className="w-3.5 h-3.5 text-primary" />
                    <span className="text-xs font-medium text-foreground">{badge.label}</span>
                  </motion.div>
                ))}
              </div>

              {/* Stats */}
              <div className="hidden xl:flex items-center gap-8">
                {[
                  { value: "17%", label: "Veteran Discount", gradient: true },
                  { value: "60", label: "Day Guarantee", gradient: false }
                ].map((stat, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ scale: 1.15 }}
                    className="text-center px-4 py-2 bg-white/50 dark:bg-card/50 backdrop-blur-xl rounded-xl"
                  >
                    <div className="text-2xl font-black" style={stat.gradient ? { 
                      background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--accent)) 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    } : { color: 'hsl(var(--foreground))' }}>{stat.value}</div>
                    <div className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroHomepage;