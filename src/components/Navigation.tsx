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

  const navLinks = [
    { name: "Team & Career", href: "/team" },
    { name: "Resources", href: "/resources" },
    { name: "About", href: "/about" },
  ];

  const mainLinks = [
    { name: "AI Business", href: "/business" },
    { name: "Learn & Train", href: "/training" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 hover:scale-105 transition-transform duration-300">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center shadow-glow-purple relative">
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
                className="w-6 h-6 text-primary-foreground relative z-10"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <span className="text-xl font-bold gradient-text-primary leading-none">InVision Network</span>
          </Link>

          {/* Desktop Navigation */}
          {!user && (
            <div className="hidden lg:flex flex-1 items-center justify-center">
              <NavigationMenu>
                <NavigationMenuList className="space-x-6">
                  {/* Main Links */}
                  {mainLinks.map((link) => (
                    <NavigationMenuItem key={link.name}>
                      <Link
                        to={link.href}
                        className="text-foreground/80 hover:text-foreground font-bold transition-colors duration-200 text-base whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-md px-2 py-1"
                      >
                        {link.name}
                      </Link>
                    </NavigationMenuItem>
                  ))}

                  {/* Regular Links */}
                  {navLinks.map((link) => (
                    <NavigationMenuItem key={link.name}>
                      <Link
                        to={link.href}
                        className="text-foreground/80 hover:text-foreground font-bold transition-colors duration-200 text-base whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-md px-2 py-1"
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
            <Button asChild variant="default" size="sm" className="hidden md:inline-flex font-semibold">
              <Link to="/training" aria-label="Book a training session">BOOK TRAINING</Link>
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
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  ))}

                  {/* Regular Links */}
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.href}
                      className="text-foreground/80 hover:text-foreground py-2 transition-colors font-bold text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-md px-2"
                      onClick={() => setMobileMenuOpen(false)}
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
                <Button asChild variant="default" className="w-full">
                  <Link to="/training" onClick={() => setMobileMenuOpen(false)} aria-label="Book a training session">
                    BOOK TRAINING
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
