import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Search, Home, Shield, Briefcase, BookOpen, Phone, MessageCircle, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import heroAboutProfessional from "@/assets/hero-about-professional.jpg";

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
      
      {/* Premium Hero Section with Background Image */}
      <div className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img 
            src={heroAboutProfessional} 
            alt="Professional team collaboration" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-900/80 to-background" />
        </div>
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 py-20 text-center">
          {/* Error Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-full text-sm font-medium text-primary-foreground mb-6">
            <Shield className="w-4 h-4" />
            <span>Protected Route</span>
          </div>
          
          {/* Error Code */}
          <h1 className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-4 animate-pulse" style={{ animationDuration: '3s' }}>
            404
          </h1>
          
          {/* Headline */}
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Page Not Found
          </h2>
          
          {/* Message */}
          <p className="text-white/70 text-lg mb-8 max-w-md mx-auto leading-relaxed">
            This page is under protection! The content you're looking for may have been moved or deleted.
          </p>
          
          {/* Primary CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button asChild size="lg" className="h-14 px-8 text-lg font-semibold gap-2 shadow-lg hover:shadow-xl transition-all">
              <Link to="/">
                <Home className="h-5 w-5" />
                Back to Home
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-14 px-8 text-lg font-semibold gap-2 bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white backdrop-blur-sm">
              <Link to="/business">
                <Briefcase className="h-5 w-5" />
                View AI Services
              </Link>
            </Button>
          </div>
        </div>
      </div>
      
      <div className="flex-1 bg-background px-4 py-16">
        <div className="max-w-2xl w-full mx-auto">
          {/* Search Bar */}
          <Card className="p-6 mb-8 shadow-medium">
            <h3 className="font-semibold mb-3 text-center">Search Our Site</h3>
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
            <h3 className="text-lg font-semibold mb-4 text-center">Popular Pages</h3>
            <div className="grid gap-3">
              {popularPages.map((page) => (
                <Link
                  key={page.path}
                  to={page.path}
                  className="flex items-center justify-between p-4 rounded-xl border border-border bg-card hover:bg-accent/5 hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <page.icon className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-foreground font-medium">{page.label}</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </Link>
              ))}
            </div>
          </div>

          {/* Help Section */}
          <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/10">
            <h3 className="font-semibold mb-3 text-center">Need Help?</h3>
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
                className="text-primary hover:text-primary/80 font-medium text-sm flex items-center gap-1"
              >
                <Phone className="h-4 w-4" />
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