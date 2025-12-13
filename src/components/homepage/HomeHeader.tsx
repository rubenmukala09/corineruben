import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScamShieldSubmission } from "@/components/ScamShieldSubmission";
import shieldLogo from "@/assets/shield-logo.png";

const navLinks = [
  { name: "Training", href: "/training" },
  { name: "Support", href: "/contact" },
  { name: "Business", href: "/business" },
  { name: "Resources", href: "/resources" },
];

export const HomeHeader = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scamShieldOpen, setScamShieldOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const isActiveLink = (href: string) => location.pathname === href;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/95 backdrop-blur-lg shadow-soft"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <img src={shieldLogo} alt="InVision Network" className="h-10 w-auto" />
              <span className="font-bold text-lg text-foreground hidden sm:inline">
                InVision
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActiveLink(link.href)
                      ? "bg-primary/10 text-primary"
                      : "text-foreground hover:text-primary hover:bg-muted"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Desktop CTAs */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href="tel:937-555-7233"
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span className="hidden xl:inline">937-555-SAFE</span>
              </a>
              <Button
                onClick={() => setScamShieldOpen(true)}
                className="rounded-xl bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground font-semibold shadow-md"
              >
                Check Suspicious Message
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-xl border-2 font-semibold"
              >
                <Link to="/training">Join Membership</Link>
              </Button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-foreground" />
              ) : (
                <Menu className="w-6 h-6 text-foreground" />
              )}
            </button>
          </nav>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 top-16 bg-background z-40">
            <div className="container mx-auto px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-lg font-medium transition-colors ${
                    isActiveLink(link.href)
                      ? "bg-primary/10 text-primary"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 space-y-3">
                <Button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setScamShieldOpen(true);
                  }}
                  className="w-full rounded-xl h-12 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground font-semibold"
                >
                  Check Suspicious Message
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="w-full rounded-xl h-12 border-2 font-semibold"
                >
                  <Link to="/training" onClick={() => setMobileMenuOpen(false)}>
                    Join Membership
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>

      <ScamShieldSubmission open={scamShieldOpen} onOpenChange={setScamShieldOpen} />
    </>
  );
};
