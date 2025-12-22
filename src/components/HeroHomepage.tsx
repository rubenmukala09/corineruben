import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Shield, ArrowRight, CheckCircle, Play } from "lucide-react";
import heroSecurityCamera from "@/assets/hero-security-camera.jpg";
import heroHome1 from "@/assets/hero-home-1.jpg";
import heroAbout1 from "@/assets/hero-about-1.jpg";
import heroBusiness1 from "@/assets/hero-business-1.jpg";

const heroImages = [
  { src: heroSecurityCamera, alt: "Security monitoring" },
  { src: heroHome1, alt: "Family protection" },
  { src: heroAbout1, alt: "Professional security" },
  { src: heroBusiness1, alt: "Business security" },
];

export const HeroHomepage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[700px] sm:min-h-[750px] md:min-h-[850px] lg:min-h-[900px] overflow-hidden">
      {/* Transitioning Background Images */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <img
              src={heroImages[currentImageIndex].src}
              alt={heroImages[currentImageIndex].alt}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-transparent to-primary/40" />
      </div>

      {/* Floating decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-20 left-[10%] w-64 h-64 bg-accent/20 rounded-full blur-3xl"
          animate={{ 
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-20 right-[20%] w-96 h-96 bg-primary-foreground/10 rounded-full blur-3xl"
          animate={{ 
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Geometric shapes */}
        <motion.div 
          className="absolute top-1/3 left-[5%] w-20 h-20 border-2 border-white/20 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-[10%] w-16 h-16 border border-accent/30 rotate-45"
          animate={{ rotate: 405 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute top-1/2 right-[30%] w-4 h-4 bg-accent rounded-full"
          animate={{ y: [0, -20, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      
      <div className="container mx-auto px-4 h-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[700px] sm:min-h-[750px] md:min-h-[850px] lg:min-h-[900px] py-16 lg:py-0">
          
          {/* Left Content */}
          <motion.div 
            className="order-2 lg:order-1 text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-medium mb-8 border border-white/20"
            >
              <Shield className="w-4 h-4 text-accent" />
              <span>Veteran-Owned & Ohio-Based</span>
            </motion.div>
            
            {/* Headline */}
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[1.1] mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <span className="font-serif italic text-accent">Secure </span>
              <br />
              Protection
              <br />
              <span className="text-white/90">Starts Here</span>
            </motion.h1>
            
            {/* Description */}
            <motion.p 
              className="text-lg sm:text-xl lg:text-2xl text-white/80 max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Protecting Ohio families from AI-powered scams with professional cybersecurity services.
            </motion.p>
            
            {/* CTAs */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <Button asChild size="lg" className="group bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-6 text-lg">
                <Link to="/services">
                  Get Protected
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="group border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg backdrop-blur-sm">
                <Link to="/about">
                  <Play className="mr-2 w-5 h-5" />
                  Watch Video
                </Link>
              </Button>
            </motion.div>

            {/* Image indicators */}
            <motion.div 
              className="flex gap-2 mt-12 justify-center lg:justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              {heroImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-12 h-1.5 rounded-full transition-all duration-300 ${
                    index === currentImageIndex 
                      ? "bg-accent w-20" 
                      : "bg-white/30 hover:bg-white/50"
                  }`}
                />
              ))}
            </motion.div>
          </motion.div>
          
          {/* Right Content - Quote Form Card */}
          <motion.div 
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 50, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          >
            <div className="relative w-full max-w-md">
              {/* Glowing background effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-accent/20 via-primary/20 to-accent/20 rounded-3xl blur-2xl opacity-60" />
              
              {/* Quote Form Card */}
              <div className="relative bg-card/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 lg:p-10 border border-white/10">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary rounded-t-3xl" />
                
                <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">Request A Quote</h2>
                <p className="text-muted-foreground mb-8">Get your free consultation today</p>
                
                <form className="space-y-5">
                  <Input 
                    type="text" 
                    placeholder="Your Name*" 
                    className="h-14 bg-muted/50 border-border/50 rounded-xl text-base focus:border-accent focus:ring-accent"
                  />
                  <Input 
                    type="email" 
                    placeholder="Email Address*" 
                    className="h-14 bg-muted/50 border-border/50 rounded-xl text-base focus:border-accent focus:ring-accent"
                  />
                  <Input 
                    type="tel" 
                    placeholder="Phone Number*" 
                    className="h-14 bg-muted/50 border-border/50 rounded-xl text-base focus:border-accent focus:ring-accent"
                  />
                  <Input 
                    type="text" 
                    placeholder="How can we help?" 
                    className="h-14 bg-muted/50 border-border/50 rounded-xl text-base focus:border-accent focus:ring-accent"
                  />
                  
                  <Button type="button" className="w-full h-14 text-lg group rounded-xl" size="lg" asChild>
                    <Link to="/contact">
                      Request A Consultation
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </form>
                
                {/* Trust indicators */}
                <div className="mt-8 pt-6 border-t border-border/50 flex items-center gap-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-5 h-5 text-success" />
                    <span>Free consultation</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-5 h-5 text-success" />
                    <span>No obligation</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};

export default HeroHomepage;
