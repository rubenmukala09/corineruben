import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Shield, ArrowRight, CheckCircle } from "lucide-react";
import heroSecurityCamera from "@/assets/hero-security-camera.jpg";

export const HeroHomepage = () => {
  return (
    <section className="relative min-h-[600px] sm:min-h-[700px] md:min-h-[800px] lg:min-h-[900px] overflow-hidden bg-gradient-to-br from-primary via-primary/95 to-primary/90">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-primary-foreground/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-accent/10 rounded-full blur-3xl" />
        {/* Geometric shapes */}
        <motion.div 
          className="absolute top-1/4 left-10 w-20 h-20 border-2 border-white/10 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute bottom-1/3 right-1/4 w-32 h-32 border border-white/5 rounded-full"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      
      <div className="container mx-auto px-4 h-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[600px] sm:min-h-[700px] md:min-h-[800px] lg:min-h-[900px] py-12 lg:py-0">
          
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
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium mb-6"
            >
              <Shield className="w-4 h-4" />
              <span>Veteran-Owned & Ohio-Based</span>
            </motion.div>
            
            {/* Headline */}
            <motion.h1 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <span className="font-serif italic text-accent">Secure </span>
              Protection{" "}
              <br className="hidden lg:block" />
              Starts Here
            </motion.h1>
            
            {/* Description */}
            <motion.p 
              className="text-base sm:text-lg lg:text-xl text-white/80 max-w-xl mx-auto lg:mx-0 mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Protecting Ohio families from AI-powered scams. Professional cybersecurity services designed for seniors and families.
            </motion.p>
            
            {/* CTAs */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <Button asChild size="lg" variant="secondary" className="group">
                <Link to="/services">
                  Learn More
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
          
          {/* Right Content - Quote Form Card */}
          <motion.div 
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 50, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <div className="relative w-full max-w-md">
              {/* Decorative image behind form */}
              <div className="absolute -bottom-8 -left-8 w-48 h-48 rounded-2xl overflow-hidden shadow-2xl hidden lg:block">
                <img 
                  src={heroSecurityCamera} 
                  alt="Security"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-primary/40" />
              </div>
              
              {/* Quote Form Card */}
              <div className="relative bg-card rounded-2xl shadow-2xl p-8 border border-border/50">
                <h2 className="text-2xl font-bold text-foreground mb-2">Request A Quote</h2>
                <p className="text-muted-foreground text-sm mb-6">Get your free consultation today</p>
                
                <form className="space-y-4">
                  <Input 
                    type="text" 
                    placeholder="Your Name*" 
                    className="bg-muted/50 border-border"
                  />
                  <Input 
                    type="email" 
                    placeholder="Email Address*" 
                    className="bg-muted/50 border-border"
                  />
                  <Input 
                    type="tel" 
                    placeholder="Phone Number*" 
                    className="bg-muted/50 border-border"
                  />
                  <Input 
                    type="text" 
                    placeholder="How can we help?" 
                    className="bg-muted/50 border-border"
                  />
                  
                  <Button type="button" className="w-full group" size="lg" asChild>
                    <Link to="/contact">
                      Request A Consultation
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </form>
                
                {/* Trust indicators */}
                <div className="mt-6 pt-6 border-t border-border">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-success" />
                    <span>Free consultation • No obligation</span>
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
