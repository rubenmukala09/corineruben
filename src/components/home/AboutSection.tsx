import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, Play } from "lucide-react";
import heroAbout from "@/assets/hero-about-1.jpg";

const features = [
  "Specialized Scam Protection",
  "AI-Powered Threat Detection",
  "24/7 Family Monitoring",
  "Senior-Friendly Training",
];

export const AboutSection = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-24 h-24 rounded-full bg-accent/10" />
      <div className="absolute bottom-20 right-20 w-32 h-32 rounded-full bg-primary/5" />
      
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
                {/* Decorative circles behind */}
                <div className="absolute -top-6 -left-6 w-full h-full rounded-full border-2 border-primary/20" />
                <div className="absolute -top-3 -left-3 w-full h-full rounded-full border-2 border-accent/30" />
                
                {/* Main image container - circular */}
                <div className="relative rounded-full overflow-hidden aspect-square border-4 border-background shadow-2xl">
                  <img
                    src={heroAbout}
                    alt="About InVision Network - Family Protection"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Decorative dots */}
                <div className="absolute top-10 -right-4 w-8 h-8 rounded-full bg-accent" />
                <div className="absolute bottom-20 -left-6 w-6 h-6 rounded-full bg-primary" />
                <div className="absolute -bottom-4 right-20 w-10 h-10 rounded-full bg-primary/20" />
              </div>

              {/* Experience badge */}
              <motion.div
                className="absolute bottom-8 right-0 lg:right-10 bg-accent text-accent-foreground px-6 py-4 rounded-xl shadow-xl"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="text-3xl font-bold">11+</div>
                <div className="text-sm font-medium opacity-90">Years Experience</div>
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
            <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-4 block">
              About Our Company
            </span>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              Our Company Provides The Best{" "}
              <span className="text-primary">Security Services</span>
            </h2>

            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              InVision Network is a veteran-owned cybersecurity company dedicated to 
              protecting seniors and families from the rising threat of AI-powered scams. 
              Our mission is to make digital safety accessible to everyone in Ohio.
            </p>

            {/* Features List */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-foreground font-medium">{feature}</span>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="rounded-full px-8">
                <Link to="/about">
                  Learn More About Us
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
