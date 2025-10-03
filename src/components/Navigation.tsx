import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Phone, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Learn & Train", href: "/training" },
    { name: "Family Scam Shield", href: "/scam-shield" },
    { name: "AI for Business", href: "/business" },
    { name: "Resources", href: "/resources" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 glass-effect border-b border-border/50 shadow-medium backdrop-blur-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover:scale-105 transition-transform duration-300">
            <div className="w-10 h-10 bg-gradient-to-br from-accent to-[hsl(38,92%,50%)] rounded-lg flex items-center justify-center shadow-glow-gold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6 text-accent-foreground"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <span className="text-xl font-bold hidden sm:inline bg-gradient-to-r from-primary to-[hsl(215,50%,38%)] bg-clip-text text-transparent">InVision Network</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-foreground font-semibold transition-all duration-300 relative after:absolute after:bottom-0 after:left-1/2 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-accent after:to-[hsl(38,92%,50%)] after:-translate-x-1/2 after:transition-all hover:after:w-4/5 hover:text-accent"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Side - Language & Phone & CTA */}
          <div className="flex items-center space-x-3">
            <div className="hidden md:flex items-center space-x-2 text-sm">
              <Globe className="w-4 h-4" />
              <span className="text-primary-foreground/80">EN | FR | ES</span>
            </div>
            <a
              href="tel:9375551234"
              className="hidden md:flex items-center space-x-2 text-sm hover:text-accent transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>(937) 555-1234</span>
            </a>
            <Button asChild variant="gold" size="sm" className="hidden md:inline-flex">
              <Link to="/training">BOOK TRAINING</Link>
            </Button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-primary-foreground hover:bg-primary-foreground/10 rounded-md transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-primary-foreground/20">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-primary-foreground/90 hover:text-primary-foreground py-2 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-2 border-t border-primary-foreground/20">
                <Button asChild variant="gold" className="w-full mb-2">
                  <Link to="/training" onClick={() => setMobileMenuOpen(false)}>
                    BOOK TRAINING
                  </Link>
                </Button>
                <a
                  href="tel:9375551234"
                  className="flex items-center justify-center space-x-2 text-primary-foreground py-2"
                >
                  <Phone className="w-4 h-4" />
                  <span>(937) 555-1234</span>
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
