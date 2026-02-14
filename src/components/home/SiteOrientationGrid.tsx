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

const pages = [
  {
    icon: Info,
    title: "About Us",
    description: "Meet our team and learn how we protect Ohio families from digital threats.",
    link: "/about",
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: GraduationCap,
    title: "Learn & Train",
    description: "Hands-on workshops that teach you to recognize and stop scams confidently.",
    link: "/training",
    color: "from-emerald-500 to-teal-500",
  },
  {
    icon: Building2,
    title: "AI & Business",
    description: "Enterprise cybersecurity audits, AI automation, and employee training.",
    link: "/business",
    color: "from-violet-500 to-indigo-500",
  },
  {
    icon: BookOpen,
    title: "Resources",
    description: "Free guides, e-books, and tools to keep your family safe online.",
    link: "/resources",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Phone,
    title: "Contact Us",
    description: "Reach our support team for questions, bookings, or urgent help.",
    link: "/contact",
    color: "from-rose-500 to-pink-500",
  },
];

export const SiteOrientationGrid = () => {
  return (
    <section className="py-16 lg:py-20 bg-muted/30">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.15em] bg-primary/10 text-primary mb-4">
            Explore Our Platform
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-foreground mb-3">
            Everything You Need,{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              One Place
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Navigate our services and resources designed to protect your family and business.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {pages.map((page) => (
            <Link
              key={page.title}
              to={page.link}
              className="group block rounded-2xl border border-border/60 bg-card/80 backdrop-blur-sm p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary/20"
            >
              <div
                className={`w-11 h-11 rounded-xl bg-gradient-to-br ${page.color} flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110`}
              >
                <page.icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-1.5">
                {page.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                {page.description}
              </p>
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                Explore <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SiteOrientationGrid;
