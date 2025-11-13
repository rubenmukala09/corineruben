import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "AI for Business", href: "/business" },
    { name: "Learn & Train", href: "/training" },
    { name: "Resources", href: "/resources" },
    { name: "About", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "Contact", href: "/contact" },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border shadow-soft">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 md:gap-3 hover:scale-105 transition-transform duration-300 group flex-shrink-0 no-underline" onClick={scrollToTop}>
            <div className="w-9 h-9 md:w-10 md:h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center shadow-glow-purple relative group-hover:shadow-glow-teal transition-all duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5 md:w-6 md:h-6 text-primary-foreground relative z-10 group-hover:scale-110 transition-transform duration-300"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-base md:text-xl font-bold gradient-text-primary group-hover:scale-105 transition-transform duration-300">InVision Network</span>
              <span className="text-[9px] md:text-[10px] text-muted-foreground hidden lg:block">AI Scam Protection & Business Solutions</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex flex-1 items-center justify-center ml-8" role="navigation" aria-label="Main navigation">
            <div className="flex items-center space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={scrollToTop}
                  className="relative text-foreground/80 hover:text-foreground font-bold transition-all duration-300 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-md px-2 py-1 group no-underline"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Right Side - Phone & Login */}
          <div className="flex items-center gap-4">
            <a
              href="tel:9375550199"
              className="hidden md:flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-md px-2 py-1"
              aria-label="Call us at 937-555-0199"
            >
              <Phone className="w-4 h-4" aria-hidden="true" />
              <span className="font-medium">(937) 555-0199</span>
            </a>
            <Button 
              asChild 
              className="hidden md:inline-flex font-bold bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6 py-2 text-sm hover:-translate-y-0.5 hover:shadow-glow-purple transition-all duration-300 ripple-effect"
            >
              <Link to="/portal" aria-label="Login to your account">Login</Link>
            </Button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-foreground hover:bg-muted rounded-md transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border" role="navigation" aria-label="Mobile navigation">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-foreground/80 hover:text-foreground py-2 transition-colors font-bold text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-md px-2 no-underline"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    scrollToTop();
                  }}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-2 border-t border-border flex flex-col gap-3">
                <Button
                  asChild 
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full"
                >
                  <Link to="/portal" onClick={() => setMobileMenuOpen(false)} aria-label="Login to your account">
                    Login
                  </Link>
                </Button>
                <a
                  href="tel:9375550199"
                  className="flex items-center justify-center gap-2 text-foreground py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-md"
                  aria-label="Call us at 937-555-0199"
                >
                  <Phone className="w-4 h-4" aria-hidden="true" />
                  <span className="font-medium">(937) 555-0199</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
