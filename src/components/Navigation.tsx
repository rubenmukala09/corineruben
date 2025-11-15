import * as React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PrefetchLink } from "@/components/PrefetchLink";
import { ShoppingCart } from "@/components/ShoppingCart";
import invisionLogo from "@/assets/shield-logo.png";

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Lock body scroll when mobile menu is open
  React.useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: "AI & Business", href: "/business" },
    { name: "Learn & Train", href: "/training" },
    { name: "Resources", href: "/resources" },
    { name: "About", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "FAQ", href: "/faq" },
    { name: "Contact", href: "/contact" },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Mobile backdrop overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border shadow-soft">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20 lg:h-24">
            {/* Logo */}
          <Link to="/" className="flex items-center gap-2 md:gap-3 lg:gap-4 hover:scale-105 transition-transform duration-300 group flex-shrink-0 no-underline" onClick={scrollToTop}>
            <img 
              src={invisionLogo} 
              alt="InVision Network Shield Logo" 
              className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 group-hover:scale-110 transition-transform duration-300"
            />
            <div className="flex flex-col leading-tight">
              <span className="text-base md:text-lg lg:text-2xl font-bold gradient-text-primary group-hover:scale-105 transition-transform duration-300">InVision Network</span>
              <span className="text-[10px] md:text-xs lg:text-sm text-muted-foreground hidden sm:block">AI Scam Protection & Business Solutions</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2 flex-1 justify-center max-w-3xl mx-auto">
            {navLinks.map((link) => (
              <PrefetchLink
                key={link.name}
                to={link.href}
                className="text-sm xl:text-base text-muted-foreground hover:text-primary transition-colors duration-300 font-medium px-3 py-2 rounded-xl hover:bg-primary/5 whitespace-nowrap"
              >
                {link.name}
              </PrefetchLink>
            ))}
          </div>

          {/* Right Side - Phone & Login */}
          <div className="flex items-center gap-2 xl:gap-3">
            <ShoppingCart />
            <a
              href="tel:9375550199"
              className="hidden md:flex items-center gap-2 text-xs xl:text-sm text-foreground/80 font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-md px-2 py-2 no-underline whitespace-nowrap"
              style={{ transition: "color 0.3s ease" }}
              onMouseEnter={(e) => e.currentTarget.style.color = "#14B8A6"}
              onMouseLeave={(e) => e.currentTarget.style.color = ""}
              aria-label="Call us at 937-555-0199"
            >
              <span className="text-base">📞</span>
              <span>(937) 555-0199</span>
            </a>
            <Button 
              asChild 
              className="hidden md:inline-flex font-bold bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground rounded-full px-4 xl:px-6 py-2 text-xs xl:text-sm hover:-translate-y-0.5 hover:shadow-glow-purple transition-all duration-300 hover:scale-105 whitespace-nowrap"
            >
              <Link to="/portal" aria-label="Login to your account">Login</Link>
            </Button>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 md:p-3 rounded-xl hover:bg-primary/10 transition-colors duration-300 min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 md:h-7 md:w-7 text-primary" />
            ) : (
              <Menu className="h-6 w-6 md:h-7 md:w-7 text-primary" />
            )}
          </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed top-16 md:top-20 lg:top-24 left-0 right-0 bottom-0 bg-card/98 backdrop-blur-xl border-t border-border shadow-2xl z-50 overflow-y-auto">
            <div className="container mx-auto px-4 py-6 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="block text-base md:text-lg text-foreground hover:text-primary transition-colors duration-300 font-medium px-4 py-3 rounded-xl hover:bg-primary/10 active:bg-primary/20 active:scale-[0.98] touch-target"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    scrollToTop();
                  }}
                >
                  {link.name}
                </Link>
              ))}
              
              {/* Mobile Actions */}
              <div className="pt-4 border-t border-border mt-4 space-y-3">
                {/* Mobile Login Button */}
                <Button
                  asChild 
                  className="w-full bg-gradient-to-r from-primary to-accent text-primary-foreground hover:shadow-glow-purple transition-all duration-300 h-12 text-base font-semibold touch-target"
                >
                  <Link to="/portal" onClick={() => setMobileMenuOpen(false)} aria-label="Login to your account">
                    Login
                  </Link>
                </Button>

                {/* Mobile Phone Link */}
                <a
                  href="tel:9375550199"
                  className="flex items-center justify-center gap-2 text-base text-foreground font-medium px-4 py-3 rounded-xl hover:bg-primary/10 transition-colors touch-target"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Call us at 937-555-0199"
                >
                  <Phone className="h-5 w-5" />
                  (937) 555-0199
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navigation;
