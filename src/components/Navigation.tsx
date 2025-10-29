import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Learn & Train", href: "/training" },
    { name: "AI for Business", href: "/business" },
    { name: "Resources", href: "/resources" },
    { name: "About", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 hover:scale-105 transition-transform duration-300">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center shadow-glow-purple relative animate-heartbeat">
              {/* Radiating waves */}
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary to-accent opacity-10 animate-pulse-wave" />
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary to-accent opacity-5 animate-pulse-wave-delayed" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6 text-primary-foreground relative z-10"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-xl font-bold gradient-text-primary">InVision Network</span>
              <span className="text-[10px] text-muted-foreground hidden lg:block">AI Scam Protection & Business Solutions</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex flex-1 items-center justify-center space-x-8" role="navigation" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-foreground/80 hover:text-foreground font-bold transition-colors duration-200 text-base whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-md px-2 py-1"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Side - Phone & CTA */}
          <div className="flex items-center gap-4">
            <a
              href="tel:9375550199"
              className="hidden md:flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-md px-2 py-1"
              aria-label="Call us at 937-555-0199"
            >
              <Phone className="w-4 h-4" aria-hidden="true" />
              <span className="font-medium">(937) 555-0199</span>
            </a>
            <Button asChild variant="outline" size="default" className="hidden md:inline-flex font-bold">
              <Link to="/portal" aria-label="Login to your account">Login</Link>
            </Button>
            <Button asChild variant="default" size="default" className="hidden md:inline-flex font-bold bg-gradient-to-r from-primary to-accent hover:shadow-glow-purple transition-all duration-300 animate-pulse-subtle">
              <Link to="/contact" aria-label="Get protected">GET PROTECTED</Link>
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
                  className="text-foreground/80 hover:text-foreground py-2 transition-colors font-bold text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-md px-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-2 border-t border-border flex flex-col gap-3">
                <Button asChild variant="outline" className="w-full">
                  <Link to="/portal" onClick={() => setMobileMenuOpen(false)} aria-label="Login to your account">
                    Login
                  </Link>
                </Button>
                <Button asChild variant="default" className="w-full">
                  <Link to="/contact" onClick={() => setMobileMenuOpen(false)} aria-label="Get protected">
                    GET PROTECTED
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
