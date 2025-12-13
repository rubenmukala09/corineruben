import { Link } from "react-router-dom";
import { Users, Heart, Building2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

const paths = [
  {
    icon: Users,
    title: "Families & Seniors",
    description: "Protect your loved ones from AI voice clones, deepfakes, and sophisticated scams targeting seniors.",
    link: "/training",
    cta: "Get Family Protection",
    gradient: "from-primary to-primary/70",
  },
  {
    icon: Heart,
    title: "Caregivers & Communities",
    description: "Equip your team with training and tools to protect vulnerable populations in your care.",
    link: "/training",
    cta: "Explore Training",
    gradient: "from-accent to-accent/70",
  },
  {
    icon: Building2,
    title: "Small Businesses",
    description: "Defend against business email compromise, invoice fraud, and CEO impersonation attacks.",
    link: "/business",
    cta: "Business Solutions",
    gradient: "from-primary via-accent to-primary/70",
  },
];

export const ChoosePathSection = () => {
  return (
    <section className="py-20 md:py-28 bg-background relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            Tailored Solutions
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Choose Your Path
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {paths.map((path, index) => (
            <motion.div
              key={path.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="group relative h-full border-0 bg-card rounded-2xl p-8 shadow-soft hover:shadow-strong transition-all duration-300 hover:-translate-y-2 overflow-hidden">
                {/* Gradient accent on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${path.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${path.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <path.icon className="w-8 h-8 text-primary-foreground" />
                </div>

                <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {path.title}
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {path.description}
                </p>

                <Link
                  to={path.link}
                  className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
                >
                  {path.cta}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
