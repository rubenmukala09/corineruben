import { Link } from "react-router-dom";
import {
  Shield,
  GraduationCap,
  Building2,
  BookOpen,
  Phone,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

import serviceTraining from "@/assets/service-training.jpg";
import serviceAiBusiness from "@/assets/service-ai-business.jpg";
import serviceFamilySafety from "@/assets/service-family-safety.jpg";
import serviceScamshield from "@/assets/service-scamshield.jpg";

const pages = [
  {
    icon: GraduationCap,
    title: "Learn & Train",
    description: "Hands-on workshops that teach you to spot and stop scams.",
    link: "/training",
    cta: "View Plans",
    featured: true,
    image: serviceTraining,
  },
  {
    icon: Building2,
    title: "AI & Business",
    description: "Security audits, AI automation, and employee training.",
    link: "/business",
    cta: "Get a Quote",
    image: serviceAiBusiness,
  },
  {
    icon: Shield,
    title: "ScamShield AI",
    description: "Real-time AI-powered scanning for calls, texts, and emails.",
    link: "/training/ai-analysis",
    cta: "Try Free",
    image: serviceScamshield,
  },
  {
    icon: BookOpen,
    title: "Resources",
    description: "Free guides, e-books, and security tools for your family.",
    link: "/resources",
    cta: "Browse Free",
    image: serviceFamilySafety,
  },
];

export const SiteOrientationGrid = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="py-16 md:py-24" ref={ref}>
      <div className="container mx-auto px-4 md:px-6 lg:px-12">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-4">
            What We Offer
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Explore Our Services
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            From personal protection to enterprise security, we have a solution
            for every need.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto" style={{ perspective: 1000 }}>
          {pages.map((page, i) => (
            <motion.div
              key={page.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
              whileHover={{
                y: -8,
                scale: 1.02,
                boxShadow: "0 25px 50px -12px hsl(288 25% 20% / 0.15)",
              }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <Link
                to={page.link}
                className={`group block rounded-2xl border overflow-hidden transition-colors h-full ${
                  page.featured
                    ? "border-primary/40 bg-card ring-1 ring-primary/10"
                    : "border-border/60 bg-card hover:border-primary/20"
                }`}
              >
                {/* Image */}
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={page.image}
                    alt={page.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                  {page.featured && (
                    <span className="absolute top-3 left-3 inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-primary text-primary-foreground shadow-md">
                      ⭐ Most Popular
                    </span>
                  )}
                </div>

                <div className="p-5">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
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
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Button
            asChild
            size="lg"
            className="h-12 px-8 text-sm font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
          >
            <Link to="/contact">
              Talk to an Expert <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="h-12 px-8 text-sm font-semibold rounded-lg"
          >
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
