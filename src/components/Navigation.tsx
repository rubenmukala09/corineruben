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
  
  // Check if user is logged in with admin/staff role
  const isAdminOrStaff = user && roleConfig;

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

  const handleBrandClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    toast.info("Refreshing for optimal performance...", { duration: 1500 });
    
    // Small delay to show toast before reload
    setTimeout(async () => {
      await clearAllCachesAndReload();
    }, 300);
  };

  // Check if current path matches nav link
  const isActiveLink = (href: string) => {
    return location.pathname === href || location.pathname.startsWith(href + '/');
  };

  return (
    <>
      {/* Mobile backdrop overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998] lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <nav className="sticky top-0 z-[9999] bg-card/80 backdrop-blur-xl border-b border-border/50 shadow-[0_4px_30px_-4px_rgba(0,0,0,0.1)]">
        {/* Glassmorphism background layer */}
        <div className="absolute inset-0 bg-gradient-to-r from-card/95 via-card/90 to-card/95 backdrop-blur-xl" />
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20 lg:h-24">
            {/* Logo */}
          <a href="/" className="flex items-center gap-2 md:gap-3 lg:gap-4 hover:scale-105 transition-transform duration-300 group flex-shrink-0 no-underline max-w-[70%] sm:max-w-none cursor-pointer" onClick={handleBrandClick}>
            <img 
              src={invisionLogo} 
              alt="InVision Network Shield Logo" 
              width={56}
              height={56}
              sizes="(max-width: 640px) 32px, (max-width: 768px) 40px, (max-width: 1024px) 48px, 56px"
              loading="eager"
              decoding="async"
              fetchPriority="high"
              className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 object-contain group-hover:scale-110 transition-transform duration-300 flex-shrink-0"
            />
            <div className="flex flex-col leading-tight min-w-0">
              <span className="text-sm sm:text-base md:text-lg lg:text-2xl font-bold gradient-text-primary group-hover:scale-105 transition-transform duration-300 truncate">InVision Network</span>
              <span className="text-[9px] sm:text-[10px] md:text-xs lg:text-sm text-muted-foreground hidden sm:block truncate">AI Scam Protection & Business Solutions</span>
            </div>
          </a>

          <div className="hidden lg:flex items-center gap-1 flex-1 justify-center max-w-3xl mx-auto bg-muted/30 rounded-2xl p-1.5 border border-border/30">
            {navLinks.map((link) => {
              const isActive = isActiveLink(link.href);
              return (
                <PrefetchLink
                  key={link.name}
                  to={link.href}
                  className={`relative text-sm xl:text-base transition-all duration-300 font-semibold px-4 py-2.5 rounded-xl whitespace-nowrap ${
                    isActive 
                      ? 'text-primary-foreground bg-gradient-to-r from-primary to-accent shadow-lg shadow-primary/25' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-card/80'
                  }`}
                >
                  {link.name}
                </PrefetchLink>
              );
            })}
          </div>

          {/* Right Side - Phone & Login */}
          <div className="flex items-center gap-2 xl:gap-3">
            <ShoppingCart />
            
            {/* Modern Phone Card */}
            <a
              href="tel:9373018749"
              className="group hidden md:flex relative items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/5 to-accent/5 hover:from-primary/10 hover:to-accent/10 rounded-xl border border-primary/10 hover:border-primary/20 transition-all duration-300 no-underline overflow-hidden"
              aria-label="Call us at (937) 301-8749"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-accent/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Modern phone icon with animation */}
              <div className="relative z-10 bg-gradient-to-br from-primary to-accent p-2 rounded-lg group-hover:scale-110 transition-transform duration-300">
                <Phone className="w-4 h-4 text-white" />
              </div>
              
              {/* Phone number with gradient text */}
              <span className="relative z-10 text-sm xl:text-base font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
                (937) 301-8749
              </span>
              
              {/* Shine effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </a>
            <Button 
              asChild 
              className="h-[44px] px-6 bg-gradient-to-r from-primary via-primary to-accent hover:from-primary/90 hover:via-accent/90 hover:to-primary/90 text-primary-foreground font-bold rounded-2xl shadow-[0_8px_30px_-6px_hsl(var(--primary)/0.4)] hover:shadow-[0_12px_40px_-8px_hsl(var(--primary)/0.5)] hover:-translate-y-0.5 transition-all duration-300 border border-primary-foreground/10"
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

          {/* Mobile menu button - highest z-index to stay above hero elements */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden relative z-[10000] p-2 md:p-3 rounded-xl bg-card hover:bg-primary/10 transition-colors duration-300 min-w-[44px] min-h-[44px] flex items-center justify-center border border-border/50"
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
          <div className="lg:hidden fixed top-16 md:top-20 lg:top-24 left-0 right-0 bottom-0 bg-card border-t border-border shadow-2xl z-[9999] overflow-y-auto">
            <div className="container mx-auto px-4 py-6 space-y-2">
              {navLinks.map((link) => {
                const isActive = isActiveLink(link.href);
                return (
                  <Link
                    key={link.name}
                    to={link.href}
                    className={`block text-base md:text-lg transition-colors duration-300 font-medium px-4 py-3 rounded-lg active:scale-[0.98] touch-target ${
                      isActive 
                        ? 'text-primary bg-primary/15 border-l-4 border-primary' 
                        : 'text-foreground hover:text-primary hover:bg-primary/10 active:bg-primary/20'
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
                  className="w-full bg-gradient-to-r from-primary to-accent text-primary-foreground hover:shadow-glow-purple transition-all duration-300 h-12 text-base font-semibold touch-target"
                >
                  {isAdminOrStaff ? (
                    <Link to="/admin" onClick={() => setMobileMenuOpen(false)} aria-label="Go to Dashboard" className="flex items-center justify-center gap-2">
                      <LayoutDashboard className="h-5 w-5" />
                      Dashboard
                    </Link>
                  ) : (
                    <Link to="/portal" onClick={() => setMobileMenuOpen(false)} aria-label="Login to your account">
                      Login
                    </Link>
                  )}
                </Button>

                {/* Mobile Phone Link */}
                <a
                  href="tel:9373018749"
                  className="flex items-center justify-center gap-2 text-base text-foreground font-medium px-4 py-3 rounded-xl hover:bg-primary/10 transition-colors touch-target"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Call us at 937-301-8749"
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
