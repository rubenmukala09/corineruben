import { GraduationCap, Eye, HeadphonesIcon, FileText } from "lucide-react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

const services = [
  {
    icon: GraduationCap,
    title: "Scam Prevention Training",
    description: "Interactive workshops for families, seniors, and organizations. Learn to spot AI-powered scams.",
  },
  {
    icon: Eye,
    title: "Deepfake Detection",
    description: "Expert guidance on identifying AI-generated voice clones, videos, and manipulated media.",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Scam Analysis",
    description: "Submit suspicious messages anytime. Get expert analysis and peace of mind within hours.",
  },
  {
    icon: FileText,
    title: "Emergency Response Scripts",
    description: "Pre-written scripts to handle scam calls confidently. Know exactly what to say.",
  },
];

export const ServicesGrid = () => {
  return (
    <section className="py-20 md:py-28 bg-muted/30 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            What We Offer
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Comprehensive Protection Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From education to emergency response, we've got you covered.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="group h-full border-0 bg-card rounded-2xl p-6 shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
