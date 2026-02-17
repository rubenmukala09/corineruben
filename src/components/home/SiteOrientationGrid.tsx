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

const pages = [
  {
    icon: Info,
    title: "About Us",
    description:
      "Meet our veteran-supporting team and learn why Ohio families trust us.",
    link: "/about",
    cta: "Our Story",
  },
  {
    icon: GraduationCap,
    title: "Learn & Train",
    description:
      "Hands-on workshops that teach you to spot and stop scams. Group and private options.",
    link: "/training",
    cta: "View Plans",
    featured: true,
  },
  {
    icon: Building2,
    title: "AI & Business",
    description:
      "Security audits, AI automation, and employee training for organizations.",
    link: "/business",
    cta: "Get a Quote",
  },
  {
    icon: BookOpen,
    title: "Resources",
    description:
      "Free guides, e-books, and security tools to keep your family safe online.",
    link: "/resources",
    cta: "Browse Free",
  },
  {
    icon: Phone,
    title: "Contact Us",
    description:
      "Talk to a real person for questions, bookings, or urgent security help.",
    link: "/contact",
    cta: "Reach Out",
  },
];

export const SiteOrientationGrid = () => {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6 lg:px-12">
        <div className="text-center mb-12">
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
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {pages.map((page) => (
            <Link
              key={page.title}
              to={page.link}
              className={`group block rounded-lg border p-6 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 ${
                page.featured
                  ? "border-primary/40 bg-card ring-1 ring-primary/10"
                  : "border-border/60 bg-card hover:border-primary/20"
              }`}
            >
              {page.featured && (
                <span className="inline-block text-[11px] font-bold text-primary uppercase tracking-wider mb-3">
                  Most Popular
                </span>
              )}

              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
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
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button
            asChild
            size="lg"
            className="h-12 px-8 text-sm font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Link to="/contact">
              Talk to an Expert <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SiteOrientationGrid;
