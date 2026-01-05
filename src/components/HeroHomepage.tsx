import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Shield, ArrowRight, Lock, Eye, Fingerprint, ShieldCheck, Zap, Globe, Play } from "lucide-react";
import heroVideo from "@/assets/hero-video.mp4";

const securityFeatures = [{
  icon: Lock,
  label: "End-to-End Encryption",
  delay: 0
}, {
  icon: Eye,
  label: "24/7 Monitoring",
  delay: 0.1
}, {
  icon: Fingerprint,
  label: "Identity Shield",
  delay: 0.2
}, {
  icon: ShieldCheck,
  label: "AI Protection",
  delay: 0.3
}];

// Typing animation component
const TypewriterText = ({ words, className }: { words: string[]; className?: string }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[currentWordIndex];
    const typeSpeed = isDeleting ? 50 : 100;
    const pauseTime = isDeleting ? 500 : 2000;

    if (!isDeleting && currentText === currentWord) {
      setTimeout(() => setIsDeleting(true), pauseTime);
      return;
    }

    if (isDeleting && currentText === "") {
      setIsDeleting(false);
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setCurrentText((prev) =>
        isDeleting
          ? currentWord.substring(0, prev.length - 1)
          : currentWord.substring(0, prev.length + 1)
      );
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWordIndex, words]);

  return (
    <span className={className}>
      {currentText}
      <span className="animate-pulse">|</span>
    </span>
  );
};
export const HeroHomepage = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);

  return <section className="relative min-h-[100vh] lg:min-h-[110vh] overflow-hidden bg-gradient-to-br from-background via-background to-purple-100/30">
      {/* Animated gradient background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute inset-0 opacity-30"
          animate={{
            background: [
              'radial-gradient(circle at 0% 0%, hsl(var(--primary) / 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 100% 0%, hsl(var(--accent) / 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 100% 100%, hsl(var(--primary) / 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 0% 100%, hsl(var(--accent) / 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 0% 0%, hsl(var(--primary) / 0.3) 0%, transparent 50%)',
            ]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Video Background - Full width */}
      <div className="absolute inset-0">
        {/* Video element */}
        {/* Solid background while video loads */}
        <div className="absolute inset-0 bg-slate-900" />
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onCanPlay={() => setVideoLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        
        {/* Premium gradient overlay - softer for wider feel */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-purple-900/10" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      </div>

      {/* Premium animated grid with brand colors */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.02]">
        <div className="absolute inset-0" style={{
        backgroundImage: `linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)`,
        backgroundSize: '100px 100px'
      }} />
      </div>
      
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 relative z-10">
        <div className="flex flex-col lg:grid lg:grid-cols-5 gap-8 lg:gap-20 xl:gap-28 items-center min-h-[100vh] py-16 sm:py-20 lg:py-0">
          
          {/* Left Content - Takes 3 columns */}
          <motion.div className="lg:col-span-3 order-2 lg:order-1 w-full" initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} transition={{
          duration: 1,
          ease: "easeOut"
        }}>
            {/* Premium Badge */}
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.3,
            duration: 0.8
          }} className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-5 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 mb-6 sm:mb-10 shadow-sm">
              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-gradient-to-r from-primary to-accent animate-pulse shadow-sm" />
              <span className="text-xs sm:text-sm font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Veteran-Supporting • Ohio-Based</span>
            </motion.div>
            
            {/* Headline with Typing Effect - Responsive sizing */}
            <motion.h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-[0.95] mb-6 sm:mb-8 tracking-tight" initial={{
            opacity: 0,
            y: 40
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.4,
            duration: 1,
            ease: [0.22, 1, 0.36, 1]
          }}>
              <span className="block text-foreground">InVision</span>
              <span className="block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">Network</span>
              <span className="block font-light text-muted-foreground/80 text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl mt-2 sm:mt-3">
                <TypewriterText 
                  words={["Protection • Education • Innovation"]} 
                  className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text"
                />
              </span>
            </motion.h1>
            
            {/* Description - Responsive */}
            <motion.p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-2xl mb-8 sm:mb-12 leading-relaxed" initial={{
            opacity: 0,
            y: 30
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.5,
            duration: 0.8
          }}>Empowering families with AI scam protection. Transforming businesses with cutting-edge automation solutions.</motion.p>
            
            {/* Split Identity CTAs - Stack on mobile, ensure z-index */}
            <motion.div className="flex flex-col sm:flex-row gap-3 sm:gap-4 relative z-30" initial={{
            opacity: 0,
            y: 30
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.6,
            duration: 0.8
          }}>
              <Button asChild size="lg" className="group h-12 sm:h-14 px-6 sm:px-8 text-sm sm:text-base font-semibold rounded-xl bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-accent/90 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/35 transition-all duration-300 border-0 w-full sm:w-auto">
                <Link to="/training">
                  <Shield className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                  Protect My Family
                  <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild size="lg" className="group h-12 sm:h-14 px-6 sm:px-8 text-sm sm:text-base font-semibold rounded-xl bg-gradient-to-r from-accent to-accent/90 hover:from-accent/90 hover:to-primary/90 shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/35 transition-all duration-300 border-0 text-accent-foreground w-full sm:w-auto">
                <Link to="/business">
                  <Zap className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                  Automate My Business
                  <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>

          </motion.div>
          
          {/* Right Content - Premium Security Visual - Takes 2 columns */}
          <motion.div className="lg:col-span-2 order-1 lg:order-2 flex justify-center lg:justify-end w-full" initial={{
          opacity: 0,
          scale: 0.95
        }} animate={{
          opacity: 1,
          scale: 1
        }} transition={{
          duration: 1.2,
          ease: [0.22, 1, 0.36, 1],
          delay: 0.2
        }}>
            <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-xl xl:max-w-2xl">
              {/* Main visual container */}
              <div className="relative">
                {/* Outer glow ring - premium gradient */}
                <motion.div className="absolute inset-0 rounded-full hidden sm:block" style={{
                background: 'radial-gradient(circle at center, hsl(var(--primary) / 0.2) 0%, hsl(var(--accent) / 0.1) 50%, transparent 70%)'
              }} animate={{
                scale: [1, 1.1, 1]
              }} transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }} />

                {/* Central Shield Container - Smaller on mobile */}
                <motion.div className="relative mx-auto w-40 h-40 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72">
                  {/* Rotating outer ring with gradient - hidden on mobile */}
                  <motion.div className="absolute inset-0 rounded-full hidden sm:block" style={{
                  borderWidth: '1px',
                  borderStyle: 'dashed',
                  borderImage: 'linear-gradient(135deg, hsl(var(--primary) / 0.4), hsl(var(--accent) / 0.4)) 1'
                }} animate={{
                  rotate: 360
                }} transition={{
                  duration: 30,
                  repeat: Infinity,
                  ease: "linear"
                }} />
                  
                  {/* Second rotating ring */}
                  <motion.div className="absolute inset-4 sm:inset-6 rounded-full border border-accent/25 hidden sm:block" animate={{
                  rotate: -360
                }} transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }} />
                  
                  {/* Pulsing glow - harmonious gradient */}
                  <motion.div className="absolute inset-8 sm:inset-12 rounded-full bg-gradient-to-br from-primary/25 via-accent/20 to-primary/15 blur-2xl" animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.6, 0.9, 0.6]
                }} transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }} />
                  
                  {/* Inner solid circle - premium gradient */}
                  <div className="absolute inset-10 sm:inset-16 rounded-full bg-gradient-to-br from-primary via-primary to-accent/80 shadow-2xl shadow-primary/40" />
                  
                  {/* Shield icon center */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div animate={{
                    scale: [1, 1.02, 1]
                  }} transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}>
                      <Shield className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-primary-foreground drop-shadow-lg" strokeWidth={1.5} />
                    </motion.div>
                  </div>
                </motion.div>

                {/* Floating feature badges - HIDDEN on mobile, shown on tablet+ */}
                <div className="hidden md:block">
                  {securityFeatures.map((feature, index) => {
                  const positions = [{
                    top: '-8%',
                    left: '50%',
                    x: '-50%',
                    y: '0%'
                  }, {
                    top: '50%',
                    right: '-15%',
                    x: '0%',
                    y: '-50%'
                  }, {
                    bottom: '-8%',
                    left: '50%',
                    x: '-50%',
                    y: '0%'
                  }, {
                    top: '50%',
                    left: '-15%',
                    x: '0%',
                    y: '-50%'
                  }];
                  const pos = positions[index];
                  return <motion.div key={feature.label} className="absolute" style={{
                    top: pos.top,
                    left: pos.left,
                    right: pos.right,
                    bottom: pos.bottom,
                    transform: `translate(${pos.x}, ${pos.y})`
                  }} initial={{
                    opacity: 0,
                    scale: 0.8
                  }} animate={{
                    opacity: 1,
                    scale: 1
                  }} transition={{
                    delay: 0.8 + feature.delay,
                    duration: 0.6
                  }}>
                        <motion.div className="flex items-center gap-2.5 px-4 py-2.5 bg-card/95 backdrop-blur-xl rounded-full border border-primary/15 shadow-lg shadow-primary/10" whileHover={{
                      scale: 1.05,
                      borderColor: 'hsl(var(--primary) / 0.3)'
                    }} animate={{
                      y: [0, -4, 0]
                    }} transition={{
                      y: {
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.3
                      }
                    }}>
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/15 to-accent/15 flex items-center justify-center">
                            <feature.icon className="w-4 h-4 text-primary" />
                          </div>
                          <span className="text-sm text-foreground font-medium whitespace-nowrap">{feature.label}</span>
                        </motion.div>
                      </motion.div>;
                })}
                </div>
              </div>

              {/* Feature badges grid - SHOWN only on mobile, stacked below shield */}
              <motion.div 
                className="grid grid-cols-2 gap-2 mt-6 md:hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                {securityFeatures.map((feature) => (
                  <div 
                    key={feature.label}
                    className="flex items-center gap-2 px-3 py-2 bg-card/90 backdrop-blur-sm rounded-lg border border-primary/10 shadow-sm"
                  >
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary/15 to-accent/15 flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-xs text-foreground font-medium leading-tight">{feature.label}</span>
                  </div>
                ))}
              </motion.div>

              {/* Stats Row - Responsive */}
              <motion.div className="mt-8 sm:mt-16 lg:mt-24 grid grid-cols-3 gap-2 sm:gap-4" initial={{
              opacity: 0,
              y: 30
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 1.2,
              duration: 0.6
            }}>
                {[{
                icon: Globe,
                value: "100+",
                label: "Protected"
              }, {
                icon: Zap,
                value: "24/7",
                label: "Support"
              }, {
                icon: ShieldCheck,
                value: "99.9%",
                label: "Success"
              }].map((stat, index) => <motion.div key={stat.label} className="text-center p-2 sm:p-4 bg-card/60 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-primary/10 hover:border-primary/25 transition-all duration-300" whileHover={{
                scale: 1.03,
                y: -2
              }} transition={{
                duration: 0.2
              }}>
                    <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 text-accent mx-auto mb-1 sm:mb-2" />
                    <div className="text-lg sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{stat.value}</div>
                    <div className="text-[10px] sm:text-xs text-muted-foreground font-medium">{stat.label}</div>
                  </motion.div>)}
              </motion.div>
            </div>
          </motion.div>
          
        </div>
      </div>

      {/* Bottom gradient fade - seamless transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background via-background/80 to-transparent" />
    </section>;
};
export default HeroHomepage;