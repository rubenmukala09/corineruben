import { Link } from "react-router-dom";
import {
  Shield,
  GraduationCap,
  Building2,
  BookOpen,
  Phone,
  Info,
  ArrowRight,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const pages = [
  {
    icon: Info,
    title: "About Us",
    tagline: "Meet the Team",
    description: "See why Ohio families trust our veteran-supporting team with their digital safety.",
    link: "/about",
    color: "from-amber-500 to-orange-500",
    cta: "Our Story",
  },
  {
    icon: GraduationCap,
    title: "Learn & Train",
    tagline: "Most Popular",
    description: "Hands-on workshops that teach you to spot and stop scams. Group and private options available.",
    link: "/training",
    color: "from-emerald-500 to-teal-500",
    cta: "View Plans",
    featured: true,
  },
  {
    icon: Building2,
    title: "AI & Business",
    tagline: "Enterprise Ready",
    description: "Security audits, AI automation, and employee training to protect your organization.",
    link: "/business",
    color: "from-violet-500 to-indigo-500",
    cta: "Get a Quote",
  },
  {
    icon: BookOpen,
    title: "Resources",
    tagline: "Free Tools",
    description: "Guides, e-books, and security tools your family needs to stay safe online.",
    link: "/resources",
    color: "from-blue-500 to-cyan-500",
    cta: "Browse Free",
  },
  {
    icon: Phone,
    title: "Contact Us",
    tagline: "Talk to a Human",
    description: "Reach our support team for questions, bookings, or urgent security help. Same-day response.",
    link: "/contact",
    color: "from-rose-500 to-pink-500",
    cta: "Reach Out",
  },
];

export const SiteOrientationGrid = () => {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6 lg:px-12">
        <div className="text-center mb-8 md:mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.15em] bg-primary/10 text-primary mb-4">
            Everything You Need
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-foreground mb-3">
            Explore Our{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Services & Resources
            </span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            From personal protection to enterprise security, we have a solution for you.
          </p>
        </div>

        {/* Cards Grid — 1 col mobile, 2 col tablet, 3 col desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 max-w-5xl mx-auto">
          {pages.map((page) => (
            <Link
              key={page.title}
              to={page.link}
              className={`group block rounded-2xl border bg-card/80 backdrop-blur-sm p-5 md:p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative overflow-hidden ${
                page.featured
                  ? "border-primary/30 ring-1 ring-primary/10"
                  : "border-border/60 hover:border-primary/20"
              }`}
            >
              {/* Featured badge */}
              {page.featured && (
                <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20">
                  <Star className="w-3 h-3 text-primary fill-primary" />
                  <span className="text-[10px] font-bold text-primary uppercase tracking-wider">{page.tagline}</span>
                </div>
              )}

              {/* Non-featured tagline */}
              {!page.featured && (
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-3 block">
                  {page.tagline}
                </span>
              )}

              <div
                className={`w-11 h-11 rounded-xl bg-gradient-to-br ${page.color} flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110`}
              >
                <page.icon className="w-5 h-5 text-white" />
              </div>

              <h3 className="text-lg font-bold text-foreground mb-1.5">
                {page.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {page.description}
              </p>

              <span className="inline-flex items-center gap-1.5 text-sm font-bold text-primary group-hover:gap-2.5 transition-all">
                {page.cta} <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 md:mt-10 text-center">
          <p className="text-sm text-muted-foreground mb-4">
            Not sure where to start? Our team will guide you to the right solution.
          </p>
          <Button asChild size="lg" className="h-12 px-8 text-sm font-bold rounded-full bg-gradient-to-r from-primary to-accent text-white hover:opacity-90 w-full sm:w-auto">
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
