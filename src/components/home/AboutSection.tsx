import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, Star } from "lucide-react";
import heroAbout from "@/assets/hero-about-1.jpg";

const features = [
  "Specialized Scam Protection",
  "AI-Powered Threat Detection",
  "24/7 Family Monitoring",
  "Senior-Friendly Training",
];

export const AboutSection = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-primary via-primary/95 to-primary/90 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-20 right-20 w-80 h-80 border border-white/10 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute bottom-20 left-20 w-60 h-60 border border-white/5 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
        <div className="absolute top-1/2 left-1/4 w-4 h-4 bg-accent/50 rounded-full blur-sm" />
        <div className="absolute bottom-1/3 right-1/4 w-6 h-6 bg-white/20 rounded-full blur-sm" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-semibold mb-6 border border-white/20">
            <Star className="w-4 h-4 text-accent" />
            About Our Company
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Our Company Provides
            <br />
            The Best{" "}
            <span className="font-serif italic text-accent">Security Services</span>.
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative">
              {/* Glowing background */}
              <div className="absolute -inset-4 bg-gradient-to-r from-accent/30 to-primary-foreground/20 rounded-[2rem] blur-2xl" />
              
              {/* Main image container */}
              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-white/10">
                <img
                  src={heroAbout}
                  alt="About InVision Network"
                  className="w-full h-[450px] lg:h-[550px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/50 via-transparent to-transparent" />
              </div>

              {/* Floating accent element */}
              <motion.div
                className="absolute -bottom-8 -right-8 lg:-right-12 bg-accent text-accent-foreground p-8 rounded-3xl shadow-2xl"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-5xl font-bold">11+</div>
                <div className="text-sm opacity-90">Years of<br />Experience</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right - Feature Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-card/95 backdrop-blur-xl rounded-[2rem] p-10 lg:p-12 shadow-2xl border border-white/10">
              <h3 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
                Specialized
              </h3>
              <h4 className="text-2xl lg:text-3xl text-primary font-semibold mb-8">
                Security Services
              </h4>

              <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
                InVision Network is a veteran-owned cybersecurity company dedicated to 
                protecting seniors and families from the rising threat of AI-powered scams. 
                Our mission is to make digital safety accessible to everyone.
              </p>

              {/* Features List */}
              <div className="space-y-5 mb-10">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <CheckCircle className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-foreground font-medium text-lg">{feature}</span>
                  </motion.div>
                ))}
              </div>

              <Button asChild size="lg" className="group px-8 py-6 text-lg rounded-xl">
                <Link to="/about">
                  Learn More
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
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
