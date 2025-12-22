import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight } from "lucide-react";
import heroAbout from "@/assets/hero-about-1.jpg";

const features = [
  "Specialized Scam Protection",
  "AI-Powered Threat Detection",
  "24/7 Family Monitoring",
  "Senior-Friendly Training",
];

export const AboutSection = () => {
  return (
    <section className="py-20 bg-primary relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-20 right-20 w-40 h-40 border border-white rounded-full" />
        <div className="absolute bottom-20 left-20 w-60 h-60 border border-white rounded-full" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-sm font-semibold mb-4">
            About Our Company
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            Our Company Provides
            <br />
            The Best{" "}
            <span className="font-serif italic text-accent">Security Services</span>.
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative">
              {/* Main image container */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={heroAbout}
                  alt="About InVision Network"
                  className="w-full h-[400px] lg:h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>

              {/* Floating accent element */}
              <motion.div
                className="absolute -bottom-6 -right-6 lg:-right-12 bg-accent text-accent-foreground p-6 rounded-2xl shadow-xl"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="text-4xl font-bold">11+</div>
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
            <div className="bg-card rounded-3xl p-8 lg:p-10 shadow-2xl">
              <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                Specialized
              </h3>
              <h4 className="text-xl lg:text-2xl text-primary font-semibold mb-6">
                Security Services
              </h4>

              <p className="text-muted-foreground mb-8 leading-relaxed">
                InVision Network is a veteran-owned cybersecurity company dedicated to 
                protecting seniors and families from the rising threat of AI-powered scams. 
                Our mission is to make digital safety accessible to everyone.
              </p>

              {/* Features List */}
              <div className="space-y-4 mb-8">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-foreground font-medium">{feature}</span>
                  </motion.div>
                ))}
              </div>

              <Button asChild size="lg" className="group">
                <Link to="/about">
                  Learn More
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
