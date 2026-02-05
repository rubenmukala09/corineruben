import * as React from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PrefetchLink } from "@/components/PrefetchLink";
import { ShoppingCart } from "@/components/ShoppingCart";
import { useAuth } from "@/contexts/AuthContext";
import { clearAllCachesAndReload } from "@/utils/cacheUtils";
import { toast } from "sonner";
import invisionLogo from "@/assets/shield-logo.png";

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, roleConfig } = useAuth();

  const isAdminOrStaff = user && roleConfig;

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

  const handleBrandClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    toast.info("Refreshing for optimal performance...", { duration: 1500 });
    setTimeout(async () => {
      await clearAllCachesAndReload();
    }, 300);
  };

  const isActiveLink = (href: string) => {
    return location.pathname === href || location.pathname.startsWith(href + '/');
  };

  return (
    <>
      {/* Mobile backdrop overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-[9998] lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <nav className="sticky top-0 z-[9999] bg-white border-b border-border">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between h-14 md:h-16">
            {/* Logo */}
            <a 
              href="/" 
              className="flex items-center gap-2.5 hover:opacity-90 transition-opacity duration-150 flex-shrink-0 no-underline" 
              onClick={handleBrandClick}
            >
              <img 
                src={invisionLogo} 
                alt="InVision Network Shield Logo" 
                width={48}
                height={48}
                loading="eager"
                decoding="async"
                className="w-9 h-9 md:w-10 md:h-10 object-contain flex-shrink-0"
              />
              <div className="flex flex-col leading-tight min-w-0">
                <span 
                  className="text-base md:text-lg font-bold tracking-tight"
                  style={{
                    background: 'linear-gradient(135deg, #18305A 0%, #BB81B5 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  InVision Network
                </span>
                <span className="text-[10px] md:text-xs text-muted-foreground hidden sm:block">
                  AI Scam Protection & Business Solutions
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = isActiveLink(link.href);
                return (
                  <PrefetchLink
                    key={link.name}
                    to={link.href}
                    className={`relative text-sm transition-colors duration-150 font-medium px-3 py-2 rounded-md whitespace-nowrap ${
                      isActive 
                        ? 'text-primary font-semibold bg-primary/5' 
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }`}
                  >
                    {link.name}
                  </PrefetchLink>
                );
              })}
            </div>

            {/* Right Side - Cart, Phone & Login */}
            <div className="flex items-center gap-3">
              <ShoppingCart />

              {/* Phone */}
              <a
                href="tel:9373018749"
                className="hidden md:flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-150 no-underline"
                aria-label="Call us at (937) 301-8749"
              >
                <div className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center">
                  <Phone className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm font-medium whitespace-nowrap">
                  (937) 301-8749
                </span>
              </a>

              {/* Login/Dashboard Button */}
              <Button 
                asChild 
                className="h-9 px-4 text-white font-medium"
                style={{ background: 'linear-gradient(135deg, hsl(18 92% 62%) 0%, hsl(308 28% 61%) 100%)' }}
              >
                {isAdminOrStaff ? (
                  <Link to="/admin" aria-label="Go to Dashboard" className="flex items-center gap-2">
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </Link>
                ) : (
                  <Link to="/portal" aria-label="Login to your account">Login</Link>
                )}
              </Button>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-muted/50 transition-colors duration-150 min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6 text-foreground" />
                ) : (
                  <Menu className="h-6 w-6 text-foreground" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed top-14 md:top-16 left-0 right-0 bottom-0 bg-background border-t border-border z-[9999] overflow-y-auto">
            <div className="container mx-auto px-4 py-6 space-y-2">
              {navLinks.map((link) => {
                const isActive = isActiveLink(link.href);
                return (
                  <Link
                    key={link.name}
                    to={link.href}
                    className={`block text-base transition-colors duration-150 font-medium px-4 py-3 rounded-lg ${
                      isActive 
                        ? 'text-primary bg-primary/5 font-semibold' 
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }`}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      scrollToTop();
                    }}
                  >
                    {link.name}
                  </Link>
                );
              })}

              {/* Mobile Actions */}
              <div className="pt-4 border-t border-border mt-4 space-y-3">
                {/* Mobile Login/Dashboard Button */}
                <Button
                  asChild 
                  className="w-full h-11 text-base font-medium text-white"
                  style={{ background: 'linear-gradient(135deg, hsl(18 92% 62%) 0%, hsl(308 28% 61%) 100%)' }}
                >
                  {isAdminOrStaff ? (
                    <Link to="/admin" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-center gap-2">
                      <LayoutDashboard className="h-5 w-5" />
                      Dashboard
                    </Link>
                  ) : (
                    <Link to="/portal" onClick={() => setMobileMenuOpen(false)}>Login</Link>
                  )}
                </Button>

                {/* Mobile Phone Link */}
                <a
                  href="tel:9373018749"
                  className="flex items-center justify-center gap-2 text-base text-muted-foreground font-medium px-4 py-3 rounded-lg hover:bg-muted/50 transition-colors duration-150"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Phone className="h-5 w-5" />
                  (937) 301-8749
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
