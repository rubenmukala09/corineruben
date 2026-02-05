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

      <nav className="sticky top-0 z-[9999] bg-gradient-to-b from-white via-white to-gray-50/80 border-b border-gray-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)]">
        <div className="container mx-auto px-4 lg:px-6 xl:px-8">
          <div className="flex items-center justify-between h-16 md:h-20 lg:h-[72px]">
            {/* Logo */}
            <a 
              href="/" 
              className="flex items-center gap-3 hover:opacity-90 transition-opacity duration-200 group flex-shrink-0 no-underline cursor-pointer" 
              onClick={handleBrandClick}
            >
              <img 
                src={invisionLogo} 
                alt="InVision Network Shield Logo" 
                width={48}
                height={48}
                loading="eager"
                decoding="async"
                className="w-10 h-10 md:w-12 md:h-12 object-contain flex-shrink-0"
              />
              <div className="flex flex-col leading-tight min-w-0">
                <span 
                  className="text-base md:text-lg lg:text-xl font-bold tracking-tight"
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
            <div className="hidden lg:flex items-center gap-0.5 xl:gap-1 bg-gradient-to-b from-gray-50/80 to-gray-100/50 rounded-xl p-1 border border-gray-200/60 shadow-[inset_0_1px_2px_rgba(0,0,0,0.04),0_1px_0_rgba(255,255,255,0.8)]">
              {navLinks.map((link) => {
                const isActive = isActiveLink(link.href);
                return (
                  <PrefetchLink
                    key={link.name}
                    to={link.href}
                    className={`relative text-sm xl:text-[15px] transition-all duration-200 font-medium px-3 xl:px-4 py-2 rounded-lg whitespace-nowrap ${
                      isActive 
                        ? 'text-primary-foreground font-semibold bg-gradient-to-b from-primary to-primary/90 shadow-[0_1px_2px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.15)]' 
                        : 'text-foreground/70 hover:text-foreground hover:bg-white/80 hover:shadow-[0_1px_2px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.9)]'
                    }`}
                  >
                    {link.name}
                  </PrefetchLink>
                );
              })}
            </div>

            {/* Right Side - Cart, Phone & Login */}
            <div className="flex items-center gap-3 xl:gap-4">
              <ShoppingCart />
              
              {/* Phone */}
              <a
                href="tel:9373018749"
                className="hidden md:flex items-center gap-2 text-foreground/80 hover:text-foreground transition-all duration-200 no-underline group"
                aria-label="Call us at (937) 301-8749"
              >
                <div className="w-9 h-9 rounded-xl bg-gradient-to-b from-white to-gray-50 border border-gray-200/80 flex items-center justify-center shadow-[0_1px_2px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.9)] group-hover:shadow-[0_2px_4px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,1)] transition-shadow duration-200">
                  <Phone className="w-4 h-4 text-accent" />
                </div>
                <span className="text-sm font-semibold text-foreground/80 group-hover:text-foreground whitespace-nowrap transition-colors duration-200">
                  (937) 301-8749
                </span>
              </a>
              
              {/* Login/Dashboard Button */}
              <Button 
                asChild 
                className="h-10 px-5 text-white font-semibold rounded-xl border-0"
                style={{ background: 'linear-gradient(135deg, #F8926A 0%, #BB81B5 100%)' }}
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
                className="lg:hidden relative z-[10000] p-2 rounded-xl bg-gradient-to-b from-white to-gray-50 border border-gray-200/80 shadow-[0_1px_2px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.9)] hover:shadow-[0_2px_4px_rgba(0,0,0,0.06)] active:shadow-[inset_0_1px_3px_rgba(0,0,0,0.08)] transition-all duration-200 min-w-[44px] min-h-[44px] flex items-center justify-center"
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
          <div className="lg:hidden fixed top-16 md:top-20 left-0 right-0 bottom-0 bg-gradient-to-b from-white to-gray-50/50 border-t border-gray-200/80 z-[9999] overflow-y-auto">
            <div className="container mx-auto px-4 py-6 space-y-2">
              {navLinks.map((link) => {
                const isActive = isActiveLink(link.href);
                return (
                  <Link
                    key={link.name}
                    to={link.href}
                    className={`block text-base transition-all duration-200 font-medium px-4 py-3 rounded-xl ${
                      isActive 
                        ? 'text-primary-foreground bg-gradient-to-b from-primary to-primary/90 font-semibold shadow-[0_1px_2px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.15)]' 
                        : 'text-foreground/80 hover:text-foreground hover:bg-white hover:shadow-[0_1px_3px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.9)]'
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
              <div className="pt-4 border-t border-gray-200/80 mt-4 space-y-3">
                {/* Mobile Login/Dashboard Button */}
                <Button
                  asChild 
                  className="w-full h-12 text-base font-semibold rounded-xl text-white"
                  style={{ background: 'linear-gradient(135deg, #F8926A 0%, #BB81B5 100%)' }}
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
                  className="flex items-center justify-center gap-2 text-base text-foreground/80 font-medium px-4 py-3 rounded-xl hover:bg-white hover:shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all duration-200"
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
