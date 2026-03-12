import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { Sun, Moon, Menu, X, Globe, Heart, LogOut, LogIn, MessageCircleQuestion } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navigation = () => {
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const lastScrollY = useRef(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 20);
      if (currentY > 100) {
        setVisible(currentY < lastScrollY.current || currentY < 80);
      } else {
        setVisible(true);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/story', label: t('nav.story') },
    { to: '/rsvp', label: t('nav.rsvp') },
    ...(user ? [{ to: '/dashboard', label: 'Dashboard' }] : []),
  ];

  const mobileLinks = [
    ...navLinks,
    { to: '/gallery', label: t('nav.gallery') },
    { to: '/guestbook', label: t('nav.guestbook') },
    { to: '/faq', label: t('nav.faq') },
    { to: '/enquiries', label: t('nav.enquiries') },
  ];

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-3 px-4 transition-transform duration-350 ease-in-out"
      style={{ transform: visible ? 'translateY(0)' : 'translateY(-100px)' }}
    >
      <nav
        className={`w-full max-w-3xl nav-glow-border transition-all duration-500 rounded-[22px] border-2 ${
          scrolled
            ? 'border-white/20 bg-gradient-to-r from-plum/90 via-plum-dark/85 to-plum/90 backdrop-blur-2xl shadow-[0_8px_40px_rgba(107,78,113,0.4),0_2px_8px_rgba(0,0,0,0.2)]'
            : 'border-white/15 bg-gradient-to-r from-plum/80 via-plum-dark/75 to-plum/80 backdrop-blur-xl shadow-[0_4px_24px_rgba(107,78,113,0.3),0_1px_4px_rgba(0,0,0,0.15)]'
        }`}
        style={{ height: '56px' }}
      >
        <div className="px-4 md:px-5 flex items-center h-full gap-3">

          {/* ── GROUP 1: Logo ── */}
          <Link to="/" className="flex items-center gap-2 group flex-shrink-0">
            <span className="w-8 h-8 rounded-full bg-white/15 border border-white/25 flex items-center justify-center group-hover:bg-white/20 transition-all duration-300 shadow-[0_0_12px_rgba(255,255,255,0.1)]">
              <Heart className="w-3.5 h-3.5 text-white fill-white" />
            </span>
            <span className="font-serif-display text-sm md:text-base font-extrabold tracking-wide text-white group-hover:text-white/90 transition-colors whitespace-nowrap" style={{ letterSpacing: '0.5px' }}>
              Corine & Ruben
            </span>
          </Link>

          <div className="hidden md:block w-px h-6 bg-white/15 flex-shrink-0" />

          {/* ── GROUP 2: Nav links (centered) ── */}
          <div className="hidden md:flex items-center gap-0.5 flex-1 justify-center">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`font-sans-elegant text-xs font-bold transition-all duration-300 relative px-3 py-1.5 rounded-full whitespace-nowrap ${
                  location.pathname === link.to
                    ? 'text-white'
                    : 'text-white/65 hover:text-white hover:bg-white/10'
                }`}
                style={{ letterSpacing: '0.3px' }}
              >
                {location.pathname === link.to && (
                  <div
                    className="absolute inset-0 rounded-full bg-white/15 border border-white/20"
                    style={{ boxShadow: '0 0 12px rgba(255,255,255,0.15), inset 0 1px 0 rgba(255,255,255,0.1)' }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </Link>
            ))}

            {[
              { to: '/enquiries', icon: MessageCircleQuestion, label: t('nav.enquiries') },
            ].map(({ to, icon: Icon, label }) => (
              <Link
                key={to}
                to={to}
                className={`relative p-1.5 rounded-full transition-all duration-300 ml-0.5 ${
                  location.pathname === to
                    ? 'text-white bg-white/15 border border-white/20'
                    : 'text-white/50 hover:text-white hover:bg-white/10'
                }`}
                aria-label={label}
                title={label}
              >
                <Icon className="w-4 h-4" />
              </Link>
            ))}
          </div>

          <div className="hidden md:block w-px h-6 bg-white/15 flex-shrink-0" />

          {/* ── GROUP 3: Controls ── */}
          <div className="flex items-center gap-1.5 ml-auto md:ml-0 flex-shrink-0">
            <button
              onClick={() => {
                const langs: Array<'en' | 'fr' | 'es'> = ['en', 'fr', 'es'];
                const idx = langs.indexOf(language);
                setLanguage(langs[(idx + 1) % langs.length]);
              }}
              className="flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-bold rounded-full border border-white/20 text-white/80 hover:text-white hover:border-white/35 transition-all"
              aria-label={`Switch language, current: ${language.toUpperCase()}`}
            >
              <Globe className="w-3.5 h-3.5" />
              {language.toUpperCase()}
            </button>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-white/10 transition-all duration-300 text-white/65 hover:text-white"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
            </button>

            {user ? (
              <button
                onClick={signOut}
                className="p-2 rounded-full hover:bg-white/10 transition-all duration-300 text-white/65 hover:text-white"
                aria-label="Sign out"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-bold rounded-full border border-white/20 text-white/80 hover:text-white hover:border-white/35 transition-all"
                aria-label="Login"
              >
                <LogIn className="w-3.5 h-3.5" />
                Login
              </button>
            )}

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-full hover:bg-white/10 transition-all duration-300 text-white/90"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="absolute top-[64px] left-2 right-2 md:hidden overflow-hidden rounded-2xl bg-background/95 dark:bg-background/95 backdrop-blur-2xl border border-border/50 shadow-[0_20px_60px_rgba(139,107,138,0.25)]">
            <div className="flex flex-col p-4 gap-1">
              {mobileLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={`font-sans-elegant text-[13px] font-medium py-2.5 px-3 rounded-2xl transition-all duration-300 ${
                    location.pathname === link.to
                      ? 'text-primary-foreground bg-primary font-semibold'
                      : 'text-foreground hover:bg-primary/10'
                  }`}
                  style={{ letterSpacing: '0.3px' }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navigation;
