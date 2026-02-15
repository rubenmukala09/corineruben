import * as React from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Phone,
  LayoutDashboard,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PrefetchLink } from "@/components/PrefetchLink";
import { ShoppingCart } from "@/components/ShoppingCart";
import { useAuth } from "@/contexts/AuthContext";
import { SITE } from "@/config/site";
import invisionLogo from "@/assets/shield-logo-nav.webp";
import { DonationModal } from "@/components/DonationModal";

// Memoized for performance - prevents re-renders when parent components update
const Navigation = React.memo(() => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [donateOpen, setDonateOpen] = useState(false);
  const location = useLocation();
  const { user, roleConfig } = useAuth();

  const isAdminOrStaff = user && roleConfig;

  // Use ref to skip unnecessary overflow write on initial mount (prevents forced reflow)
  const hasOpenedMenu = React.useRef(false);
  React.useEffect(() => {
    if (mobileMenuOpen) {
      hasOpenedMenu.current = true;
      document.body.style.overflow = "hidden";
    } else if (hasOpenedMenu.current) {
      document.body.style.overflow = "";
    }
    return () => {
      if (hasOpenedMenu.current) {
        document.body.style.overflow = "";
      }
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
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBrandClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = "/";
  };

  const isActiveLink = (href: string) => {
    return (
      location.pathname === href || location.pathname.startsWith(href + "/")
    );
  };

  return (
    <>
      {/* Mobile backdrop overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[9998] lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <nav className="sticky top-0 z-[9999] border-b border-white/20 bg-white/90 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-16">
            {/* Logo */}
            <a
              href="/"
              className="flex items-center gap-3 hover:opacity-90 transition-opacity duration-150 flex-shrink-0 no-underline"
              onClick={handleBrandClick}
            >
              <img
                src={invisionLogo}
                alt="InVision Network Shield Logo"
                width={44}
                height={44}
                loading="eager"
                decoding="async"
                className="w-10 h-10 md:w-11 md:h-11 object-contain flex-shrink-0"
              />
              <div className="flex flex-col leading-tight min-w-0">
                <span
                  className="text-lg md:text-xl font-bold tracking-tight"
                  style={{
                    background: "linear-gradient(120deg, #173B72 0%, #F47C52 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
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
            <div className="hidden lg:flex items-center gap-0.5">
              {navLinks.map((link) => {
                const isActive = isActiveLink(link.href);
                return (
                  <PrefetchLink
                    key={link.name}
                    to={link.href}
                    className={`relative text-sm transition-colors duration-150 font-semibold px-3 py-2 rounded-md whitespace-nowrap tracking-tight ${
                      isActive
                        ? "text-primary font-bold bg-primary/10 border border-primary/15 shadow-sm"
                        : "text-foreground/80 hover:text-foreground hover:bg-card/80"
                    }`}
                  >
                    {link.name}
                  </PrefetchLink>
                );
              })}
            </div>

            {/* Right Side - Cart, Phone & Login */}
            <div className="flex items-center gap-2 md:gap-3">
              <ShoppingCart />

              {/* Phone */}
              <a
                href={SITE.phone.tel}
                className="flex md:flex items-center gap-2 text-foreground hover:text-primary transition-colors duration-150 no-underline"
                aria-label={`Call us at ${SITE.phone.display}`}
              >
                <div className="w-8 h-8 md:w-8 md:h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Phone className="w-4 h-4 text-primary" fill="currentColor" />
                </div>
                <span className="hidden md:inline text-sm font-semibold whitespace-nowrap text-foreground">
                  {SITE.phone.display}
                </span>
              </a>

              {/* Donate Button */}
              <button
                type="button"
                onClick={() => setDonateOpen(true)}
                className="hidden lg:flex items-center gap-1.5 text-sm font-semibold px-3 py-2 rounded-md text-primary hover:bg-primary/10 transition-colors"
                aria-label="Donate"
              >
                <Heart className="w-4 h-4" fill="currentColor" />
                <span className="hidden xl:inline">Donate</span>
              </button>

              {/* Login/Dashboard Button */}
              <Button
                asChild
                className="h-9 px-5 text-white font-semibold rounded-full shadow-sm bg-gradient-to-r from-primary to-accent hover:brightness-105"
              >
                {isAdminOrStaff ? (
                  <Link
                    to="/admin"
                    aria-label="Go to Dashboard"
                    className="flex items-center gap-2"
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </Link>
                ) : (
                  <Link to="/portal" aria-label="Login to your account">
                    Login
                  </Link>
                )}
              </Button>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-md hover:bg-muted/50 transition-colors duration-150 min-w-[44px] min-h-[44px] flex items-center justify-center"
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
          <div className="lg:hidden fixed top-16 left-0 right-0 bottom-0 bg-white/95 backdrop-blur-sm border-t border-border shadow-lg z-[10001] overflow-y-auto overscroll-contain pb-[calc(env(safe-area-inset-bottom)+1.25rem)] [-webkit-overflow-scrolling:touch]">
            <div className="container mx-auto px-4 py-6 space-y-2">
              {navLinks.map((link) => {
                const isActive = isActiveLink(link.href);
                return (
                  <Link
                    key={link.name}
                    to={link.href}
                    className={`block text-base transition-colors duration-150 font-medium px-4 py-3 rounded-lg ${
                      isActive
                        ? "text-primary bg-primary/10 border border-primary/15 font-semibold"
                        : "text-muted-foreground hover:text-foreground hover:bg-card/80"
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
                {/* Mobile Donate Button */}
                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-11 text-base font-semibold border-primary/30 text-primary hover:bg-primary/10"
                  onClick={() => {
                    setDonateOpen(true);
                    setMobileMenuOpen(false);
                  }}
                >
                  <Heart className="h-5 w-5 mr-2" />
                  Donate
                </Button>

                {/* Mobile Login/Dashboard Button */}
                <Button
                  asChild
                  className="w-full h-11 text-base font-semibold text-white rounded-full bg-gradient-to-r from-primary to-accent hover:brightness-105"
                >
                  {isAdminOrStaff ? (
                    <Link
                      to="/admin"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-center gap-2"
                    >
                      <LayoutDashboard className="h-5 w-5" />
                      Dashboard
                    </Link>
                  ) : (
                    <Link to="/portal" onClick={() => setMobileMenuOpen(false)}>
                      Login
                    </Link>
                  )}
                </Button>

                {/* Mobile Phone Link */}
                <a
                  href={SITE.phone.tel}
                  className="flex items-center justify-center gap-2 text-base text-muted-foreground font-medium px-4 py-3 rounded-lg hover:bg-muted/50 transition-colors duration-150"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Phone className="h-5 w-5" />
                  {SITE.phone.display}
                </a>
              </div>
            </div>
          </div>
        )}

        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/45 to-transparent pointer-events-none" />
      </nav>

      {/* Donation Modal */}
      <DonationModal
        open={donateOpen}
        onOpenChange={setDonateOpen}
        type="general"
      />
    </>
  );
});

export default Navigation;
