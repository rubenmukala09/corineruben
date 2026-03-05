import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  Search,
  Home,
  Shield,
  Briefcase,
  BookOpen,
  Phone,
  MessageCircle,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { SITE } from "@/config/site";

const popularPages = [
  { icon: Home, label: "Home", desc: "Back to the main page", path: "/" },
  { icon: Briefcase, label: "AI for Business", desc: "Enterprise security solutions", path: "/business" },
  { icon: Shield, label: "Family Protection", desc: "Training plans and pricing", path: "/training" },
  { icon: BookOpen, label: "Resources", desc: "Free guides and tools", path: "/resources" },
  { icon: Phone, label: "Contact Us", desc: "Talk to our team", path: "/contact" },
];

function NotFound() {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/resources?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      <div className="flex-1 flex items-center justify-center px-4 py-20 relative">
        {/* Ambient glows */}
        <div className="absolute top-[10%] right-[15%] w-72 h-72 rounded-full bg-primary/[0.04] blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[15%] left-[10%] w-60 h-60 rounded-full bg-accent/[0.04] blur-[100px] pointer-events-none" />

        <div className="max-w-2xl w-full animate-fade-in">
          <div className="text-center mb-10">
            {/* Shield icon */}
            <div className="relative inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-br from-primary/12 to-accent/8 border border-primary/15 mb-8 shadow-[0_12px_40px_-12px_hsl(var(--primary)/0.12)]">
              <Shield className="w-12 h-12 text-primary" />
            </div>

            {/* Badge pill */}
            <div className="flex justify-center mb-4">
              <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-[0.2em] border border-primary/15 bg-primary/5 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                <span className="text-primary">Error 404</span>
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
              Page Not Found
            </h1>
            <p className="text-muted-foreground text-lg max-w-md mx-auto leading-relaxed">
              The page you're looking for doesn't exist or has been moved. Let's get you back on track.
            </p>
          </div>

          {/* Search */}
          <form onSubmit={handleSearch} className="relative mb-10">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search InVision Network..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-14 pl-12 pr-4 text-base rounded-2xl border-2 border-border bg-card/80 backdrop-blur-sm shadow-sm focus:border-primary"
            />
          </form>

          {/* Quick Links */}
          <div className="space-y-3 mb-10">
            <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Quick Navigation</p>
            {popularPages.map((page) => (
              <Link
                key={page.path}
                to={page.path}
                className="flex items-center gap-4 p-4 rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm hover:border-primary/30 hover:bg-primary/[0.03] transition-all group"
              >
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary/10 to-accent/8 border border-primary/10 flex items-center justify-center flex-shrink-0 group-hover:shadow-sm transition-shadow">
                  <page.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <span className="font-semibold text-foreground block">{page.label}</span>
                  <span className="text-sm text-muted-foreground">{page.desc}</span>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg">
              <Link to="/">
                <Home className="w-5 h-5 mr-2" />
                Back to Home
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/contact">
                <MessageCircle className="w-5 h-5 mr-2" />
                Contact Support
              </Link>
            </Button>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Or call us at{" "}
            <a href={SITE.phone.tel} className="text-primary font-medium hover:underline">
              {SITE.phone.display}
            </a>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default NotFound;
