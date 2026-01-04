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
      
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-background via-muted/10 to-background px-4 py-20 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl" />
        </div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground) / 0.1) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground) / 0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />

        <div className="max-w-5xl w-full text-center relative z-10">
          {/* Error Icon & Code */}
          <div className="mb-10">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl scale-150" />
              <div className="relative inline-flex items-center justify-center w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 mb-8 border border-primary/20">
                <Shield className="w-16 h-16 md:w-20 md:h-20 text-primary" />
              </div>
            </div>
            <h1 className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">404</h1>
          </div>

          {/* Headline */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Page Not Found</h2>
          
          {/* Message */}
          <p className="text-muted-foreground text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
            This page is under protection! The content you're looking for may have been moved or deleted. Let's get you back on track.
          </p>

          {/* Search Bar */}
          <Card className="p-8 mb-10 max-w-2xl mx-auto shadow-lg">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="text"
                placeholder="Search InVision Network..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-14 h-14 text-lg"
              />
              <button
                type="submit"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Search className="h-6 w-6" />
              </button>
            </form>
          </Card>

          {/* Popular Pages */}
          <div className="mb-10 max-w-3xl mx-auto">
            <h3 className="text-xl font-semibold mb-6">Popular Pages:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {popularPages.map((page) => (
                <Link
                  key={page.path}
                  to={page.path}
                  className="flex items-center gap-4 p-5 rounded-xl border border-border bg-card hover:bg-accent hover:border-primary transition-all group shadow-sm hover:shadow-md"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <page.icon className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
                  </div>
                  <span className="text-foreground font-medium text-lg">{page.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* CTA Button - Large and Prominent */}
          <div className="flex justify-center mb-10">
            <Button asChild size="lg" className="h-16 px-10 text-lg font-semibold gap-3 bg-primary hover:bg-primary/90 shadow-xl hover:shadow-2xl transition-all">
              <Link to="/">
                <Home className="h-6 w-6" />
                Take Me Home
              </Link>
            </Button>
          </div>

          {/* Help Section */}
          <Card className="p-8 bg-muted/50 max-w-2xl mx-auto">
            <h3 className="font-semibold text-lg mb-4">Need Help?</h3>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button variant="outline" size="lg" className="gap-2" asChild>
                <Link to="/contact">
                  <MessageCircle className="h-5 w-5" />
                  Contact Support
                </Link>
              </Button>
              <span className="text-muted-foreground">or call us</span>
              <a 
                href="tel:+19373018749" 
                className="text-primary hover:text-primary/80 font-semibold text-lg"
              >
                (937) 301-8749
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
