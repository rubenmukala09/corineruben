import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight } from "lucide-react";
import heroAbout from "@/assets/hero-about-1.jpg";
import natureSecurityBg from "@/assets/nature-security-services.jpg";
import { HexagonIcon, GeometricCorner, DottedPattern, GridPattern } from "@/components/ui/GeometricDecorations";

const features = [
  "Specialized Scam Protection",
  "AI-Powered Threat Detection",
  "24/7 Family Monitoring",
  "Senior-Friendly Training",
];

export const AboutSection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Nature-themed background with subtle overlay */}
      <div className="absolute inset-0">
        <img 
          src={natureSecurityBg} 
          alt="" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-background/85" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </div>
      
      {/* Grid pattern */}
      <GridPattern />
      
      {/* Geometric corner accents */}
      <GeometricCorner position="top-left" variant="dots" />
      <GeometricCorner position="bottom-right" variant="lines" />
      
      {/* Diagonal stripe decorations */}
      <div className="absolute -top-10 -left-10 w-40 h-40 pointer-events-none">
        <div className="absolute inset-0 bg-primary/5 transform -skew-x-12 -rotate-12" />
        <div className="absolute inset-4 bg-primary/5 transform -skew-x-12 -rotate-12 opacity-50" />
      </div>
      <div className="absolute -bottom-10 -right-10 w-48 h-48 pointer-events-none">
        <div className="absolute inset-0 bg-accent/5 transform skew-x-12 rotate-12" />
      </div>
      
      {/* Decorative floating elements */}
      <motion.div 
        className="absolute top-20 left-10 w-32 h-32 rounded-full bg-primary/5 blur-2xl"
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-32 right-20 w-40 h-40 rounded-full bg-accent/5 blur-2xl"
        animate={{ scale: [1.3, 1, 1.3], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Image with circular design */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Main circular image */}
            <div className="relative">
              <div className="relative w-full max-w-lg mx-auto">
                {/* Animated decorative circles behind */}
                <motion.div 
                  className="absolute -top-6 -left-6 w-full h-full rounded-full border-2 border-primary/20"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                />
                <motion.div 
                  className="absolute -top-3 -left-3 w-full h-full rounded-full border-2 border-accent/30"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                />
                
                {/* Main image container - circular with geometric accents */}
                <div className="relative rounded-full overflow-hidden aspect-square border-4 border-background shadow-2xl shadow-primary/10">
                  <motion.img
                    src={heroAbout}
                    alt="About InVision Network - Family Protection"
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                
                {/* Corner triangle accent */}
                <div 
                  className="absolute -top-4 -right-4 w-0 h-0"
                  style={{
                    borderTop: "32px solid hsl(var(--primary))",
                    borderLeft: "32px solid transparent",
                  }}
                />
                
                {/* Animated decorative dots */}
                <motion.div 
                  className="absolute top-10 -right-4 w-8 h-8 rounded-full bg-accent"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <motion.div 
                  className="absolute bottom-20 -left-6 w-6 h-6 rounded-full bg-primary"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
                <motion.div 
                  className="absolute -bottom-4 right-20 w-10 h-10 rounded-full bg-primary/20"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>

              {/* Experience badge with hexagon style */}
              <motion.div
                className="absolute bottom-8 right-0 lg:right-10"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="relative">
                  <HexagonIcon size="lg" gradient className="w-24 h-24">
                    <div className="text-center text-white">
                      <div className="text-2xl font-bold">11+</div>
                      <div className="text-[10px] font-medium opacity-90">Years</div>
                    </div>
                  </HexagonIcon>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Angular badge */}
            <div 
              className="inline-flex items-center gap-2 px-5 py-2 bg-primary/10 text-primary text-sm font-semibold uppercase tracking-wider mb-4 border border-primary/20"
              style={{ clipPath: "polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)" }}
            >
              About Our Company
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              Our Company Provides The Best{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Security Services</span>
            </h2>

            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              InVision Network is a veteran-owned cybersecurity company dedicated to 
              protecting seniors and families from the rising threat of AI-powered scams. 
              Our mission is to make digital safety accessible to everyone in Ohio.
            </p>
            
            {/* Decorative dotted line */}
            <DottedPattern direction="horizontal" length={6} className="mb-8" />

            {/* Features List */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-3 group"
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0 group-hover:from-primary/30 group-hover:to-accent/30 transition-colors">
                    <CheckCircle className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-foreground font-medium">{feature}</span>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="rounded-full px-8">
                <Link to="/services">
                  Learn More About Our Services
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
