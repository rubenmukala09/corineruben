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
import invisionLogo from "@/assets/shield-logo.png";
import { DonationModal } from "@/components/DonationModal";

const Navigation = React.memo(() => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [donateOpen, setDonateOpen] = useState(false);
  const location = useLocation();
  const { user, roleConfig } = useAuth();

  const isAdminOrStaff = user && roleConfig;

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
          className="fixed inset-0 bg-foreground/40 z-[9998] lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <nav className="sticky top-0 z-[9999] bg-card border-b border-border shadow-[0_1px_3px_hsl(var(--foreground)/0.04)]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-[60px]">
            {/* Logo */}
            <a
              href="/"
              className="flex items-center gap-2.5 hover:opacity-90 transition-opacity duration-150 flex-shrink-0 no-underline"
              onClick={handleBrandClick}
            >
              <img
                src={invisionLogo}
                alt="InVision Network Shield Logo"
                width={36}
                height={36}
                loading="eager"
                decoding="sync"
                className="w-9 h-9 object-contain flex-shrink-0"
              />
              <div className="flex flex-col leading-none min-w-0">
                <span className="text-[15px] md:text-base font-bold text-foreground tracking-tight">
                  InVision Network
                </span>
                <span className="text-[9px] md:text-[10px] font-medium text-muted-foreground hidden sm:block tracking-wide uppercase">
                  AI Scam Protection
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center">
              {navLinks.map((link) => {
                const isActive = isActiveLink(link.href);
                return (
                  <PrefetchLink
                    key={link.name}
                    to={link.href}
                    className={`relative text-[13px] font-medium px-3 xl:px-3.5 py-2 whitespace-nowrap transition-colors duration-150 ${
                      isActive
                        ? "text-primary font-semibold"
                        : "text-foreground/70 hover:text-foreground"
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full bg-primary" />
                    )}
                  </PrefetchLink>
                );
              })}
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-1.5 md:gap-2">
              <ShoppingCart />

              {/* Phone */}
              <a
                href={SITE.phone.tel}
                className="flex items-center gap-1.5 text-foreground hover:text-primary transition-colors duration-150 no-underline"
                aria-label={`Call us at ${SITE.phone.display}`}
              >
                <div className="w-8 h-8 rounded-full bg-primary/8 flex items-center justify-center">
                  <Phone className="w-3.5 h-3.5 text-primary" />
                </div>
                <span className="hidden md:inline text-[13px] font-semibold whitespace-nowrap text-foreground">
                  {SITE.phone.display}
                </span>
              </a>

              {/* Donate Button */}
              <button
                type="button"
                onClick={() => setDonateOpen(true)}
                className="hidden lg:flex items-center gap-1.5 text-[13px] font-medium px-2.5 py-1.5 rounded-md text-primary hover:bg-primary/8 transition-colors"
                aria-label="Donate"
              >
                <Heart className="w-3.5 h-3.5" fill="currentColor" />
                <span className="hidden xl:inline">Donate</span>
              </button>

              {/* Login/Dashboard Button */}
              <Button
                asChild
                size="sm"
                className="h-8 px-4 text-[13px] text-primary-foreground font-semibold rounded-lg"
              >
                {isAdminOrStaff ? (
                  <Link
                    to="/admin"
                    aria-label="Go to Dashboard"
                    className="flex items-center gap-1.5"
                  >
                    <LayoutDashboard className="h-3.5 w-3.5" />
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
                className="lg:hidden p-2 rounded-lg hover:bg-muted/60 transition-colors duration-150 min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="h-5 w-5 text-foreground" />
                ) : (
                  <Menu className="h-5 w-5 text-foreground" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed top-[60px] left-0 right-0 bottom-0 bg-card border-t border-border z-[10001] overflow-y-auto overscroll-contain pb-[calc(env(safe-area-inset-bottom)+1.25rem)] [-webkit-overflow-scrolling:touch]">
            <div className="container mx-auto px-4 py-4 space-y-1">
              {navLinks.map((link) => {
                const isActive = isActiveLink(link.href);
                return (
                  <Link
                    key={link.name}
                    to={link.href}
                    className={`block text-[15px] transition-colors duration-150 font-medium px-4 py-3 rounded-lg ${
                      isActive
                        ? "text-primary font-semibold bg-primary/5"
                        : "text-foreground/80 hover:text-foreground hover:bg-muted/40"
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
              <div className="pt-4 border-t border-border mt-3 space-y-3">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-11 text-[15px] font-semibold border-primary/20 text-primary hover:bg-primary/5"
                  onClick={() => {
                    setDonateOpen(true);
                    setMobileMenuOpen(false);
                  }}
                >
                  <Heart className="h-4 w-4 mr-2" />
                  Donate
                </Button>

                <Button
                  asChild
                  className="w-full h-11 text-[15px] font-semibold text-primary-foreground rounded-lg"
                >
                  {isAdminOrStaff ? (
                    <Link
                      to="/admin"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-center gap-2"
                    >
                      <LayoutDashboard className="h-4 w-4" />
                      Dashboard
                    </Link>
                  ) : (
                    <Link to="/portal" onClick={() => setMobileMenuOpen(false)}>
                      Login
                    </Link>
                  )}
                </Button>

                <a
                  href={SITE.phone.tel}
                  className="flex items-center justify-center gap-2 text-[15px] text-muted-foreground font-medium px-4 py-3 rounded-lg hover:bg-muted/40 transition-colors duration-150"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Phone className="h-4 w-4" />
                  {SITE.phone.display}
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>

      <DonationModal
        open={donateOpen}
        onOpenChange={setDonateOpen}
        type="general"
      />
    </>
  );
});

export default Navigation;
