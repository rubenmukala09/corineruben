import { motion, AnimatePresence, Variants } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Shield, ArrowRight, Lock, Eye, Fingerprint, ShieldCheck, Zap, Globe, Play, ChevronDown } from "lucide-react";
import heroSecurityCamera from "@/assets/hero-security-camera.jpg";
import heroHome1 from "@/assets/hero-home-1.jpg";
import heroAbout1 from "@/assets/hero-about-1.jpg";
import heroBusiness1 from "@/assets/hero-business-1.jpg";

const heroImages = [
  { src: heroSecurityCamera, alt: "Security monitoring" },
  { src: heroHome1, alt: "Family protection" },
  { src: heroAbout1, alt: "Professional security" },
  { src: heroBusiness1, alt: "Business security" }
];

const securityFeatures = [
  { icon: Lock, label: "End-to-End Encryption", delay: 0 },
  { icon: Eye, label: "24/7 Monitoring", delay: 0.15 },
  { icon: Fingerprint, label: "Identity Shield", delay: 0.3 },
  { icon: ShieldCheck, label: "AI Protection", delay: 0.45 }
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8 }
  }
};

export const HeroHomepage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">
      {/* Animated Background Images with Ken Burns Effect */}
      <div className="absolute inset-0">
        <AnimatePresence mode="sync">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              transition: { duration: 1.8, ease: [0.22, 1, 0.36, 1] }
            }}
            exit={{ 
              opacity: 0,
              transition: { duration: 1.2, ease: "easeInOut" }
            }}
            className="absolute inset-0"
          >
            <motion.img
              src={heroImages[currentImageIndex].src}
              alt={heroImages[currentImageIndex].alt}
              className="w-full h-full object-cover"
              animate={{ scale: [1, 1.08] }}
              transition={{ duration: 12, ease: "linear" }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Premium Multi-layer Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/95 to-slate-950/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/30" />
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/40 via-transparent to-purple-950/30" />
      </div>

      {/* Subtle Animated Grid */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(99, 102, 241, 0.5) 1px, transparent 1px), 
                             linear-gradient(90deg, rgba(99, 102, 241, 0.5) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
          animate={{ opacity: [0.02, 0.04, 0.02] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-indigo-400/40 rounded-full"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.2, 0.6, 0.2]
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-screen py-28 lg:py-0">
          
          {/* Left Content */}
          <motion.div 
            className="order-2 lg:order-1"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Premium Badge */}
            <motion.div 
              variants={itemVariants}
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 mb-8"
            >
              <motion.div 
                className="w-2 h-2 rounded-full bg-emerald-400"
                animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-sm font-medium text-white/90 tracking-wide">
                Veteran-Owned • Ohio-Based • Trusted
              </span>
            </motion.div>
            
            {/* Headline with Stagger Animation */}
            <motion.h1 
              variants={itemVariants}
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[0.95] mb-8 tracking-tight"
            >
              <motion.span 
                className="block text-white"
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                Secure
              </motion.span>
              <motion.span 
                className="block bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent"
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.45, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                Protection
              </motion.span>
              <motion.span 
                className="block text-white/50 font-light text-4xl sm:text-5xl lg:text-6xl mt-3"
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                Starts Here
              </motion.span>
            </motion.h1>
            
            {/* Description */}
            <motion.p 
              variants={itemVariants}
              className="text-lg sm:text-xl text-white/60 max-w-xl mb-10 leading-relaxed"
            >
              Protecting families from AI-powered scams with enterprise-grade cybersecurity services. Professional, proactive, and always personal.
            </motion.p>
            
            {/* CTAs with Hover Effects */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button 
                asChild 
                size="lg" 
                className="group h-14 px-8 text-base font-semibold rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-xl shadow-indigo-500/25 hover:shadow-2xl hover:shadow-indigo-500/40 transition-all duration-500 border-0"
              >
                <Link to="/services">
                  <span className="relative z-10 flex items-center">
                    Get Protected Now
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" />
                  </span>
                </Link>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                size="lg" 
                className="group h-14 px-8 text-base font-semibold rounded-xl border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/30 text-white transition-all duration-500"
              >
                <Link to="/about" className="flex items-center gap-3">
                  <motion.div 
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/15 transition-colors"
                    whileHover={{ scale: 1.1 }}
                  >
                    <Play className="w-4 h-4 text-white fill-white/80" />
                  </motion.div>
                  Watch Our Story
                </Link>
              </Button>
            </motion.div>

            {/* Image Indicators */}
            <motion.div 
              variants={itemVariants}
              className="flex gap-2 mt-14"
            >
              {heroImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className="relative h-1.5 rounded-full overflow-hidden transition-all duration-500"
                  style={{ width: index === currentImageIndex ? 48 : 24 }}
                >
                  <div className="absolute inset-0 bg-white/20" />
                  {index === currentImageIndex && (
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-400"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 6, ease: "linear" }}
                      style={{ transformOrigin: "left" }}
                    />
                  )}
                </button>
              ))}
            </motion.div>
          </motion.div>
          
          {/* Right Content - Premium Security Visual */}
          <motion.div 
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          >
            <div className="relative w-full max-w-lg">
              {/* Main visual container */}
              <div className="relative">
                {/* Ambient Glow */}
                <motion.div 
                  className="absolute inset-0 rounded-full blur-3xl"
                  style={{
                    background: 'radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, rgba(139, 92, 246, 0.15) 50%, transparent 70%)'
                  }}
                  animate={{ 
                    scale: [1, 1.15, 1],
                    opacity: [0.6, 0.8, 0.6]
                  }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Central Shield Container */}
                <motion.div className="relative mx-auto w-56 h-56 md:w-72 md:h-72">
                  {/* Outer Ring */}
                  <motion.div 
                    className="absolute inset-0 rounded-full border border-dashed border-indigo-400/30"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                  />
                  
                  {/* Second Ring */}
                  <motion.div 
                    className="absolute inset-6 rounded-full border border-purple-400/20"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  />
                  
                  {/* Inner Glow */}
                  <motion.div 
                    className="absolute inset-12 rounded-full blur-2xl"
                    style={{
                      background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.4), rgba(139, 92, 246, 0.3))'
                    }}
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  />
                  
                  {/* Core Circle */}
                  <div className="absolute inset-16 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-indigo-600 shadow-2xl shadow-indigo-500/40" />
                  
                  {/* Shield Icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <Shield className="w-16 h-16 md:w-20 md:h-20 text-white drop-shadow-lg" strokeWidth={1.5} />
                    </motion.div>
                  </div>
                </motion.div>

                {/* Floating Feature Badges */}
                {securityFeatures.map((feature, index) => {
                  const positions = [
                    { top: '-5%', left: '50%', x: '-50%', y: '0%' },
                    { top: '50%', right: '-12%', x: '0%', y: '-50%' },
                    { bottom: '-5%', left: '50%', x: '-50%', y: '0%' },
                    { top: '50%', left: '-12%', x: '0%', y: '-50%' }
                  ];
                  const pos = positions[index];
                  
                  return (
                    <motion.div
                      key={feature.label}
                      className="absolute"
                      style={{
                        top: pos.top,
                        left: pos.left,
                        right: pos.right,
                        bottom: pos.bottom,
                        transform: `translate(${pos.x}, ${pos.y})`
                      }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1 + feature.delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <motion.div 
                        className="flex items-center gap-2.5 px-4 py-2.5 bg-slate-900/90 backdrop-blur-xl rounded-full border border-white/10 shadow-xl"
                        whileHover={{ scale: 1.08, borderColor: 'rgba(99, 102, 241, 0.4)' }}
                        animate={{ y: [0, -6, 0] }}
                        transition={{
                          y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 0.4 }
                        }}
                      >
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center">
                          <feature.icon className="w-4 h-4 text-indigo-400" />
                        </div>
                        <span className="text-sm text-white/90 font-medium whitespace-nowrap">
                          {feature.label}
                        </span>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Stats Row */}
              <motion.div 
                className="mt-20 grid grid-cols-3 gap-3"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                {[
                  { icon: Globe, value: "500+", label: "Protected" },
                  { icon: Zap, value: "24/7", label: "Support" },
                  { icon: ShieldCheck, value: "99.9%", label: "Success" }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="text-center p-4 bg-slate-900/60 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-indigo-400/30 transition-all duration-500"
                    whileHover={{ scale: 1.05, y: -4 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5 + index * 0.1, duration: 0.6 }}
                  >
                    <stat.icon className="w-5 h-5 text-indigo-400 mx-auto mb-2" />
                    <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent">
                      {stat.value}
                    </div>
                    <div className="text-xs text-white/50 font-medium">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
          
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <motion.div
          className="flex flex-col items-center gap-2 text-white/40"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-xs font-medium tracking-wider uppercase">Scroll</span>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent pointer-events-none" />
    </section>
  );
};

export default HeroHomepage;