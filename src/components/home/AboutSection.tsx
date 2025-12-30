import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, Award } from "lucide-react";
import heroAbout from "@/assets/hero-about-1.jpg";
import aboutSectionTeam from "@/assets/about-section-team.jpg";

const features = [
  "Specialized Scam Protection",
  "AI-Powered Threat Detection",
  "24/7 Family Monitoring",
  "Senior-Friendly Training",
];

export const AboutSection = () => {
  return (
    <section className="py-16 md:py-20 relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${aboutSectionTeam})` }}
      />
      <div className="absolute inset-0 bg-primary/85" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Award className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-primary-foreground/80">About Our Company</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 tracking-tight">
            Our Company Provides
            <br />
            <span className="text-primary-foreground/90">The Best Security Services</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
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
                  className="w-full h-[450px] lg:h-[550px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent" />
              </div>

              {/* Floating years badge */}
              <motion.div
                className="absolute -bottom-6 -right-6 lg:-right-8 bg-accent text-accent-foreground p-6 rounded-2xl shadow-2xl"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-4xl font-bold">11+</div>
                <div className="text-sm font-medium opacity-90">Years of<br />Experience</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right - Content Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-card rounded-3xl p-10 lg:p-12 shadow-2xl border border-border/10">
              <div className="mb-2">
                <span className="text-sm font-semibold text-primary uppercase tracking-wider">Specialized</span>
              </div>
              <h3 className="text-3xl lg:text-4xl font-bold text-foreground mb-8">
                Security Services
              </h3>

              <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
                InVision Network is a veteran-owned cybersecurity company dedicated to 
                protecting seniors and families from the rising threat of AI-powered scams. 
                Our mission is to make digital safety accessible to everyone.
              </p>

              {/* Features List */}
              <div className="space-y-4 mb-10">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                      <CheckCircle className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-foreground font-medium text-lg">{feature}</span>
                  </motion.div>
                ))}
              </div>

              <Button asChild size="lg" className="h-14 px-8 text-base font-semibold rounded-xl">
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
