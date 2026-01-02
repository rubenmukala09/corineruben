import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Shield, ArrowRight, Users, Zap, Building2, Heart, Bot, Lock } from "lucide-react";
import heroVideo from "@/assets/hero-family-warmth.mp4";

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

  return (
    <section className="relative min-h-[100vh] lg:min-h-[110vh] overflow-hidden bg-gradient-to-br from-background via-background to-purple-100/30">
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
        <video
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={() => setVideoLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        
        {/* Premium gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-purple-900/10" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      </div>

      {/* Premium animated grid */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)`,
          backgroundSize: '100px 100px'
        }} />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center justify-center min-h-[100vh] py-24 lg:py-0">
          
          {/* Premium Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 mb-8 shadow-sm"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-primary to-accent animate-pulse shadow-sm" />
            <span className="text-sm font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Veteran-Owned • Ohio-Based • Trusted</span>
          </motion.div>
          
          {/* Main Headline - Split Identity */}
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center leading-tight mb-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="block text-foreground">InVision Network:</span>
            <span className="block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              <TypewriterText 
                words={["Intelligence", "Protection", "Automation", "Security"]} 
                className=""
              />
            </span>
            <span className="block font-light text-muted-foreground/80 text-2xl sm:text-3xl md:text-4xl mt-3">
              for Life & Business
            </span>
          </motion.h1>
          
          {/* Subheadline */}
          <motion.p 
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Whether you're protecting your family from AI scams or automating your business—we've got you covered.
          </motion.p>

          {/* Split Choice Cards */}
          <motion.div 
            className="grid md:grid-cols-2 gap-6 lg:gap-8 w-full max-w-4xl mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            {/* Protect My Family Card */}
            <motion.div 
              className="relative group"
              whileHover={{ scale: 1.02, y: -4 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative p-8 bg-card/80 backdrop-blur-xl rounded-2xl border border-primary/20 group-hover:border-primary/40 transition-all duration-300 h-full">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/15 to-accent/15 flex items-center justify-center group-hover:from-primary/25 group-hover:to-accent/25 transition-colors">
                    <Heart className="w-7 h-7 text-primary" />
                  </div>
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-accent" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-foreground">Protect My Family</h3>
                <p className="text-muted-foreground mb-6">
                  AI-powered scam protection for you and your loved ones. Training, alerts, and 24/7 expert support.
                </p>
                <ul className="space-y-2 mb-6 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-primary" />
                    <span>ScamShield Protection</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-primary" />
                    <span>Family Training Programs</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-primary" />
                    <span>Identity Theft Insurance</span>
                  </li>
                </ul>
                <Button asChild size="lg" className="w-full group/btn bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-accent/90 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/35 transition-all duration-300">
                  <Link to="/training">
                    Protect My Family
                    <ArrowRight className="ml-2 w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </motion.div>

            {/* Automate My Business Card */}
            <motion.div 
              className="relative group"
              whileHover={{ scale: 1.02, y: -4 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative p-8 bg-card/80 backdrop-blur-xl rounded-2xl border border-accent/20 group-hover:border-accent/40 transition-all duration-300 h-full">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent/15 to-primary/15 flex items-center justify-center group-hover:from-accent/25 group-hover:to-primary/25 transition-colors">
                    <Building2 className="w-7 h-7 text-accent" />
                  </div>
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent/10 to-primary/10 flex items-center justify-center">
                    <Bot className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-foreground">Automate My Business</h3>
                <p className="text-muted-foreground mb-6">
                  24/7 AI receptionists, scheduling, and follow-up automation. Never miss a lead again.
                </p>
                <ul className="space-y-2 mb-6 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-accent" />
                    <span>AI Receptionist (24/7)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Bot className="w-4 h-4 text-accent" />
                    <span>Smart Scheduling</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-accent" />
                    <span>Cyber Liability Insurance</span>
                  </li>
                </ul>
                <Button asChild size="lg" variant="outline" className="w-full group/btn border-accent/30 hover:border-accent/50 hover:bg-accent/5 transition-all duration-300">
                  <Link to="/business">
                    Automate My Business
                    <ArrowRight className="ml-2 w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </motion.div>

          {/* Stats Row */}
          <motion.div 
            className="grid grid-cols-3 gap-4 max-w-xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            {[
              { value: "500+", label: "Families Protected" },
              { value: "24/7", label: "Expert Support" },
              { value: "99.9%", label: "Success Rate" }
            ].map((stat, index) => (
              <motion.div 
                key={stat.label}
                className="text-center p-4 bg-card/60 backdrop-blur-sm rounded-2xl border border-primary/10 hover:border-primary/25 transition-all duration-300"
                whileHover={{ scale: 1.03, y: -2 }}
              >
                <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{stat.value}</div>
                <div className="text-xs text-muted-foreground font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
          
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background via-background/80 to-transparent" />
    </section>
  );
};

export default HeroHomepage;
