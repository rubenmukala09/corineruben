import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, Award, Headphones, ArrowRight } from "lucide-react";
import heroAbout from "@/assets/hero-about-1.jpg";

const whyChooseUs = [
  {
    icon: Clock,
    title: "22 Years Experience",
    description: "Decades of cybersecurity expertise",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Always here when you need us",
  },
  {
    icon: CheckCircle,
    title: "100% Satisfaction",
    description: "Guaranteed protection results",
  },
  {
    icon: Award,
    title: "Industry Certified",
    description: "Trusted security credentials",
  },
];

export const AboutSection = () => {
  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
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
              {/* Main image container with rounded corners */}
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
                className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground p-6 rounded-2xl shadow-xl"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="text-4xl font-bold">11+</div>
                <div className="text-sm opacity-90">Years Experience</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
              About Us
            </span>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Protecting Ohio Families with{" "}
              <span className="text-primary">AI-Powered Security</span>
            </h2>

            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              InVision Network is a veteran-owned cybersecurity company dedicated to protecting
              seniors and families from the rising threat of AI-powered scams. Our mission is to
              make digital safety accessible to everyone, regardless of their technical expertise.
            </p>

            {/* Why Choose Us Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {whyChooseUs.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-3 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">{item.title}</h4>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <Button asChild size="lg" className="group">
              <Link to="/about">
                Learn More
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
