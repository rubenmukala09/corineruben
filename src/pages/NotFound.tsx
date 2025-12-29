import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Search, Home, Shield, Briefcase, BookOpen, Phone, MessageCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

function NotFound() {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  const popularPages = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Briefcase, label: "AI for Business", path: "/business" },
    { icon: Shield, label: "Family Shield Protection", path: "/training" },
    { icon: BookOpen, label: "Resources & Products", path: "/resources" },
    { icon: Phone, label: "Contact Us", path: "/contact" },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/resources?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-background via-background to-muted px-4 py-16">
        <div className="max-w-2xl w-full text-center">
          {/* Error Icon & Code */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/10 mb-6">
              <Shield className="w-12 h-12 text-primary" />
            </div>
            <h1 className="text-7xl font-bold text-primary mb-4">404</h1>
          </div>

          {/* Headline */}
          <h2 className="text-4xl font-bold mb-4">Page Not Found</h2>
          
          {/* Message */}
          <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto leading-relaxed">
            This page is under protection! The content you're looking for may have been moved or deleted. Let's get you back on track.
          </p>

          {/* Search Bar */}
          <Card className="p-6 mb-8">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="text"
                placeholder="Search InVision Network..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-12 h-12 text-base"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Search className="h-5 w-5" />
              </button>
            </form>
          </Card>

          {/* Popular Pages */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Popular Pages:</h3>
            <div className="grid gap-3">
              {popularPages.map((page) => (
                <Link
                  key={page.path}
                  to={page.path}
                  className="flex items-center gap-3 p-4 rounded-lg border border-border bg-card hover:bg-accent hover:border-primary transition-all group"
                >
                  <page.icon className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
                  <span className="text-foreground font-medium">{page.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* CTA Button - Large and Prominent */}
          <div className="flex justify-center">
            <Button asChild size="lg" className="h-14 px-8 text-lg font-semibold gap-2 bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all">
              <Link to="/">
                <Home className="h-5 w-5" />
                Take Me Home
              </Link>
            </Button>
          </div>

          {/* Help Section */}
          <Card className="mt-8 p-6 bg-muted/50">
            <h3 className="font-semibold mb-3">Need Help?</h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button variant="outline" size="sm" className="gap-2" asChild>
                <Link to="/contact">
                  <MessageCircle className="h-4 w-4" />
                  Contact Support
                </Link>
              </Button>
              <span className="text-muted-foreground text-sm">or call us</span>
              <a 
                href="tel:9375550199" 
                className="text-primary hover:text-primary/80 font-medium text-sm"
              >
                (937) 555-0199
              </a>
            </div>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default NotFound;
