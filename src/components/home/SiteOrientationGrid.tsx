import { Link } from "react-router-dom";
import {
  Shield,
  GraduationCap,
  Building2,
  BookOpen,
  Phone,
  Info,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const pages = [
  {
    icon: Info,
    title: "About Us",
    description:
      "Meet our veteran-supporting team and learn why Ohio families trust us.",
    link: "/about",
    cta: "Our Story",
    gradient: "from-lavender-300/15 to-primary/5",
  },
  {
    icon: GraduationCap,
    title: "Learn & Train",
    description:
      "Hands-on workshops that teach you to spot and stop scams. Group and private options.",
    link: "/training",
    cta: "View Plans",
    featured: true,
    gradient: "from-primary/15 to-accent/10",
  },
  {
    icon: Building2,
    title: "AI & Business",
    description:
      "Security audits, AI automation, and employee training for organizations.",
    link: "/business",
    cta: "Get a Quote",
    gradient: "from-accent/15 to-coral-200/15",
  },
  {
    icon: BookOpen,
    title: "Resources",
    description:
      "Free guides, e-books, and security tools to keep your family safe online.",
    link: "/resources",
    cta: "Browse Free",
    gradient: "from-teal-100/40 to-primary/5",
  },
  {
    icon: Phone,
    title: "Contact Us",
    description:
      "Talk to a real person for questions, bookings, or urgent security help.",
    link: "/contact",
    cta: "Reach Out",
    gradient: "from-primary/10 to-lavender-100/30",
  },
];

export const SiteOrientationGrid = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="py-16 md:py-24 bg-muted/30" ref={ref}>
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto" style={{ perspective: 1000 }}>
          {pages.map((page, i) => (
            <motion.div
              key={page.title}
              initial={{ opacity: 0, y: 40, rotateX: 12 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
              whileHover={{
                y: -8,
                rotateX: -3,
                rotateY: 4,
                scale: 1.02,
                boxShadow: "0 25px 50px -12px hsl(288 25% 20% / 0.15)",
              }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <Link
                to={page.link}
                className={`group block rounded-2xl border p-6 transition-colors h-full relative overflow-hidden ${
                  page.featured
                    ? "border-primary/40 bg-card ring-1 ring-primary/10"
                    : "border-border/60 bg-card hover:border-primary/20"
                }`}
              >
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${page.gradient} opacity-50 pointer-events-none`} />

                <div className="relative">
                  {page.featured && (
                    <span className="inline-block text-[11px] font-bold text-primary uppercase tracking-wider mb-3">
                      Most Popular
                    </span>
                  )}

                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 shadow-sm">
                    <page.icon className="w-6 h-6 text-primary" />
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
          className="mt-10 text-center"
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
        </motion.div>
      </div>
    </section>
  );
};

export default SiteOrientationGrid;
