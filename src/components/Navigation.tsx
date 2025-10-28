import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useAuth } from "@/hooks/useAuth";
import { useUserRole } from "@/hooks/useUserRole";

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { role, loading: roleLoading } = useUserRole();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  const mainLinks = [
    { name: "ScamShield Training", href: "/training" },
    { name: "AI for Business", href: "/business" },
    { name: "Resources", href: "/resources" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/98 backdrop-blur-md border-b border-border shadow-md transition-shadow duration-300">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/" 
            onClick={scrollToTop}
            className="flex items-center gap-3 hover:scale-105 transition-transform duration-300 cursor-pointer"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center shadow-glow-navy relative">
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary to-accent opacity-5 animate-pulse-wave" />
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary to-accent opacity-0 animate-pulse-wave-delayed" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-7 h-7 text-primary-foreground relative z-10"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-xl font-bold text-primary">InVision Network</span>
              <span className="text-xs text-muted-foreground font-medium">Dayton, Ohio</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          {!user && (
            <div className="hidden lg:flex flex-1 items-center justify-center">
              <NavigationMenu>
                <NavigationMenuList className="space-x-2">
                  {/* Main Links */}
                  {mainLinks.map((link) => (
                    <NavigationMenuItem key={link.name}>
                      <Link
                        to={link.href}
                        onClick={scrollToTop}
                        className="text-foreground/80 hover:text-primary font-semibold transition-colors duration-200 text-base whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-md px-3 py-2"
                      >
                        {link.name}
                      </Link>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          )}

          {/* Right Side - Phone & CTA */}
          <div className="flex items-center gap-4">
            <a
              href="tel:9375551234"
              className="hidden md:flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-md px-2 py-1"
              aria-label="Call us at 937-555-1234"
            >
              <Phone className="w-4 h-4" aria-hidden="true" />
              <span className="font-medium">(937) 555-1234</span>
            </a>
            {user ? (
              <>
                {role && (
                  <Button 
                    asChild 
                    variant="outline" 
                    size="sm" 
                    className="hidden md:inline-flex font-semibold"
                  >
                    <Link to={
                      role === 'admin' ? '/admin-dashboard-new' :
                      role === 'staff' ? '/staff-dashboard' :
                      role === 'worker' ? '/worker-dashboard-new' :
                      '/enhanced-auth'
                    }>
                      DASHBOARD
                    </Link>
                  </Button>
                )}
                <Button onClick={handleLogout} variant="outline" size="sm" className="hidden md:inline-flex font-semibold">
                  LOGOUT
                </Button>
              </>
            ) : (
              <Button asChild variant="outline" size="sm" className="hidden md:inline-flex font-semibold">
                <Link to="/enhanced-auth" aria-label="Login to admin panel">LOGIN</Link>
              </Button>
            )}
            <Button asChild variant="default" size="sm" className="hidden md:inline-flex font-semibold bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-glow-gold">
              <Link to="/contact" aria-label="Get protected with InVision Network">GET PROTECTED</Link>
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
              {!user && (
                <>
                  {/* Main Links */}
                  {mainLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.href}
                      className="text-foreground/80 hover:text-foreground py-2 transition-colors font-bold text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-md px-2"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        scrollToTop();
                      }}
                    >
                      {link.name}
                    </Link>
                  ))}
                </>
              )}

              <div className="pt-2 border-t border-border flex flex-col gap-3">
                {user ? (
                  <>
                    {role && (
                      <Button 
                        asChild 
                        variant="outline" 
                        className="w-full"
                      >
                        <Link 
                          to={
                            role === 'admin' ? '/admin-dashboard-new' :
                            role === 'staff' ? '/staff-dashboard' :
                            role === 'worker' ? '/worker-dashboard-new' :
                            '/enhanced-auth'
                          }
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          DASHBOARD
                        </Link>
                      </Button>
                    )}
                    <Button onClick={handleLogout} variant="outline" className="w-full">
                      LOGOUT
                    </Button>
                  </>
                ) : (
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/enhanced-auth" onClick={() => setMobileMenuOpen(false)} aria-label="Login to admin panel">
                      LOGIN
                    </Link>
                  </Button>
                )}
                <Button asChild variant="default" className="w-full font-semibold bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                  <Link to="/contact" onClick={() => setMobileMenuOpen(false)} aria-label="Get protected with InVision Network">
                    GET PROTECTED
                  </Link>
                </Button>
                <a
                  href="tel:9375551234"
                  className="flex items-center justify-center gap-2 text-foreground py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-md"
                  aria-label="Call us at 937-555-1234"
                >
                  <Phone className="w-4 h-4" aria-hidden="true" />
                  <span className="font-medium">(937) 555-1234</span>
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
