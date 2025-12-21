import { motion } from "framer-motion";
import { Lightbulb, Award, Package, Sparkles } from "lucide-react";

const features = [
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "AI-powered threat detection and prevention",
    color: "accent",
  },
  {
    icon: Award,
    title: "High Quality",
    description: "Expert cybersecurity professionals",
    color: "primary",
  },
  {
    icon: Package,
    title: "Best Product",
    description: "Comprehensive protection packages",
    color: "accent",
    highlighted: true,
  },
  {
    icon: Sparkles,
    title: "Top Services",
    description: "24/7 monitoring and support",
    color: "primary",
  },
];

export const FeatureBar = () => {
  return (
    <section className="relative py-6 -mt-20 z-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-card rounded-2xl shadow-xl border border-border/50 overflow-hidden"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-border/50">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`group p-6 lg:p-8 text-center transition-all duration-300 hover:bg-muted/50 ${
                  feature.highlighted ? "bg-primary text-primary-foreground hover:bg-primary/90" : ""
                }`}
              >
                <div
                  className={`mx-auto w-14 h-14 rounded-full flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 ${
                    feature.highlighted
                      ? "bg-white/20"
                      : "bg-gradient-to-br from-primary/10 to-accent/10"
                  }`}
                >
                  <feature.icon
                    className={`w-7 h-7 ${
                      feature.highlighted ? "text-white" : "text-primary"
                    }`}
                  />
                </div>
                <h3
                  className={`font-bold text-lg mb-2 ${
                    feature.highlighted ? "" : "text-foreground"
                  }`}
                >
                  {feature.title}
                </h3>
                <p
                  className={`text-sm ${
                    feature.highlighted ? "text-white/80" : "text-muted-foreground"
                  }`}
                >
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureBar;
