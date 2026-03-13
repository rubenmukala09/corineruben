import * as React from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Phone,
  LayoutDashboard,
  Heart,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PrefetchLink } from "@/components/PrefetchLink";
import { ShoppingCart } from "@/components/ShoppingCart";
import { useAuth } from "@/contexts/AuthContext";
import { SITE } from "@/config/site";
import invisionLogo from "@/assets/shield-logo.png";
import { DonationModal } from "@/components/DonationModal";

const primaryLinks = [
  { name: "AI & Business", href: "/business" },
  { name: "Learn & Train", href: "/training" },
  { name: "Resources", href: "/resources" },
  { name: "About", href: "/about" },
];

const secondaryLinks = [
  { name: "Careers", href: "/careers" },
  { name: "FAQ", href: "/faq" },
  { name: "Contact", href: "/contact" },
];

const allLinks = [...primaryLinks, ...secondaryLinks];

const Navigation = React.memo(() => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [donateOpen, setDonateOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const location = useLocation();
  const { user, roleConfig } = useAuth();
  const moreRef = React.useRef<HTMLDivElement>(null);

  const isAdminOrStaff = user && roleConfig;

  // Close "More" dropdown on outside click
  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    };
    if (moreOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [moreOpen]);

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

  const isSecondaryActive = secondaryLinks.some((l) => isActiveLink(l.href));

  return (
    <>
      {/* Mobile backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-foreground/40 z-[9998] lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <nav className="sticky top-0 z-[9999] bg-card/95 backdrop-blur-md border-b border-border/40">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
          <div className="flex items-center justify-between h-[68px]">
            {/* Logo */}
            <a
              href="/"
              className="flex items-center gap-2.5 hover:opacity-90 transition-opacity duration-150 flex-shrink-0 no-underline"
              onClick={handleBrandClick}
            >
              <img
                src={invisionLogo}
                alt="InVision Network Shield Logo"
                width={34}
                height={34}
                loading="eager"
                decoding="sync"
                className="w-[38px] h-[38px] object-contain flex-shrink-0"
              />
              <div className="flex flex-col leading-none min-w-0">
                <span className="text-[17px] font-extrabold text-foreground tracking-tight">
                  InVision Network
                </span>
                <span className="text-[10px] font-bold text-muted-foreground hidden sm:block tracking-widest uppercase">
                  AI Scam Protection
                </span>
              </div>
            </a>

            {/* Desktop Navigation — centered */}
            <div className="hidden lg:flex items-center gap-1">
              {primaryLinks.map((link) => {
                const isActive = isActiveLink(link.href);
                return (
                  <PrefetchLink
                    key={link.name}
                    to={link.href}
                    className={`relative text-[15px] px-3 py-2 rounded-md transition-colors duration-150 ${
                      isActive
                        ? "text-primary font-bold bg-primary/5"
                        : "text-foreground/80 font-semibold hover:text-foreground hover:bg-muted/50"
                    }`}
                  >
                    {link.name}
                  </PrefetchLink>
                );
              })}

              {/* More dropdown */}
              <div className="relative" ref={moreRef}>
                <button
                  onClick={() => setMoreOpen(!moreOpen)}
                  className={`flex items-center gap-1 text-[15px] px-3 py-2 rounded-md transition-colors duration-150 ${
                    isSecondaryActive
                      ? "text-primary font-bold bg-primary/5"
                      : "text-foreground/80 font-semibold hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  More
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${moreOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {moreOpen && (
                  <div className="absolute top-full left-0 mt-1 w-44 bg-card rounded-lg border border-border shadow-lg py-1 z-50">
                    {secondaryLinks.map((link) => {
                      const isActive = isActiveLink(link.href);
                      return (
                        <PrefetchLink
                          key={link.name}
                          to={link.href}
                          className={`block px-4 py-2.5 text-sm transition-colors ${
                            isActive
                              ? "text-primary font-semibold bg-primary/5"
                              : "text-foreground hover:bg-muted/60"
                          }`}
                          onClick={() => setMoreOpen(false)}
                        >
                          {link.name}
                        </PrefetchLink>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Right Side — streamlined */}
            <div className="flex items-center gap-2">
              <ShoppingCart />

              {/* Phone — icon only on smaller desktops, with number on xl */}
              <a
                href={SITE.phone.tel}
                className="hidden lg:flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors duration-150 no-underline px-2 py-1.5 rounded-md hover:bg-muted/50"
                aria-label={`Call us at ${SITE.phone.display}`}
              >
                <Phone className="w-4 h-4" />
                <span className="hidden xl:inline text-sm font-medium">
                  {SITE.phone.display}
                </span>
              </a>

              {/* Donate — subtle icon button */}
              <button
                type="button"
                onClick={() => setDonateOpen(true)}
                className="hidden lg:flex items-center gap-1.5 text-sm font-medium px-2.5 py-1.5 rounded-md text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors"
                aria-label="Donate"
              >
                <Heart className="w-4 h-4" />
                <span className="hidden xl:inline">Donate</span>
              </button>

              {/* Divider */}
              <div className="hidden lg:block w-px h-6 bg-border/60 mx-1" />

              {/* Login / Dashboard */}
              <Button
                asChild
                size="sm"
                className="h-9 px-5 text-sm text-primary-foreground font-semibold rounded-lg shadow-sm"
              >
                {isAdminOrStaff ? (
                  <Link
                    to="/admin"
                    aria-label="Go to Dashboard"
                    className="flex items-center gap-1.5"
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
          <div className="lg:hidden fixed top-16 left-0 right-0 bottom-0 bg-card border-t border-border z-[10001] overflow-y-auto overscroll-contain pb-[calc(env(safe-area-inset-bottom)+1.25rem)] [-webkit-overflow-scrolling:touch]">
            <div className="container mx-auto px-4 py-4 space-y-1">
              {allLinks.map((link) => {
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
