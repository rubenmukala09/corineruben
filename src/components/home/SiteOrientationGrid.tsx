import { Link } from "react-router-dom";
import {
  Shield,
  GraduationCap,
  Building2,
  BookOpen,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, useInView } from "framer-motion";
import { useRef, useCallback } from "react";

import serviceTraining from "@/assets/service-training.jpg";
import serviceAiBusiness from "@/assets/service-ai-business.jpg";
import serviceFamilySafety from "@/assets/service-family-safety.jpg";
import serviceScamshield from "@/assets/service-scamshield.jpg";

const pages = [
  {
    icon: GraduationCap,
    title: "Learn & Train",
    description: "Hands-on workshops that teach you to spot and stop scams before they happen.",
    link: "/training",
    cta: "View Plans",
    featured: true,
    image: serviceTraining,
    gradient: "from-primary/20 to-accent/10",
  },
  {
    icon: Building2,
    title: "AI & Business",
    description: "Security audits, AI automation, and employee training for organizations.",
    link: "/business",
    cta: "Get a Quote",
    image: serviceAiBusiness,
    gradient: "from-accent/20 to-primary/10",
  },
  {
    icon: Shield,
    title: "ScamShield AI",
    description: "Real-time AI-powered scanning for calls, texts, and emails.",
    link: "/training/ai-analysis",
    cta: "Try Free",
    image: serviceScamshield,
    gradient: "from-primary/15 to-accent/15",
  },
  {
    icon: BookOpen,
    title: "Resources",
    description: "Free guides, e-books, and security tools for your family.",
    link: "/resources",
    cta: "Browse Free",
    image: serviceFamilySafety,
    gradient: "from-accent/15 to-primary/10",
  },
];

export const SiteOrientationGrid = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="py-16 md:py-28 relative overflow-hidden" ref={ref}>
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 lg:px-12 relative">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-4">
            What We Offer
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Explore Our Services
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            From personal protection to enterprise security, we have a solution
            for every need.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto" style={{ perspective: 1200 }}>
          {pages.map((page, i) => (
            <motion.div
              key={page.title}
              initial={{ opacity: 0, y: 50, rotateX: 15 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12, ease: "easeOut" }}
              whileHover={{
                y: -12,
                rotateX: -3,
                rotateY: 4,
                scale: 1.03,
                boxShadow: "0 30px 60px -15px hsl(288 25% 20% / 0.2)",
              }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <Link
                to={page.link}
                className={`group block rounded-2xl border overflow-hidden transition-all h-full ${
                  page.featured
                    ? "border-primary/40 bg-card ring-1 ring-primary/10"
                    : "border-border/50 bg-card hover:border-primary/20"
                }`}
              >
                {/* Image */}
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={page.image}
                    alt={page.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                  {page.featured && (
                    <span className="absolute top-3 left-3 inline-flex items-center px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r from-primary to-accent text-white shadow-lg">
                      ⭐ Most Popular
                    </span>
                  )}
                  {/* Floating icon overlay */}
                  <motion.div
                    className="absolute bottom-3 right-3 w-10 h-10 rounded-xl glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    whileHover={{ rotate: 8 }}
                  >
                    <page.icon className="w-5 h-5 text-primary" />
                  </motion.div>
                </div>

                <div className="p-5 relative">
                  <div className={`absolute inset-0 bg-gradient-to-br ${page.gradient} opacity-30 pointer-events-none`} />
                  <div className="relative">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary/15 to-accent/10 flex items-center justify-center mb-3 shadow-sm border border-primary/10">
                      <page.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">
                      {page.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {page.description}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-2.5 transition-all">
                      {page.cta} <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-12 flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Button asChild size="lg">
            <Link to="/contact">
              Talk to an Expert <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/about">
              About Our Team <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default SiteOrientationGrid;
