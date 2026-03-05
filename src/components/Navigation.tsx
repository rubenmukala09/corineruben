import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Sun, Moon, Menu, X, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navigation = () => {
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const lastScrollY = useRef(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 20);

      // Hide when scrolling down past 100px, show when scrolling up
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

  const links = [
    { to: '/', label: t('nav.home') },
    { to: '/story', label: t('nav.story') },
    { to: '/rsvp', label: t('nav.rsvp') },
  ];

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-3 px-4"
      initial={{ y: 0 }}
      animate={{ y: visible ? 0 : -100 }}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
    >
      <nav
        className={`w-full max-w-2xl nav-glow-border transition-all duration-500 rounded-[20px] border border-primary/20 ${
          scrolled
            ? 'bg-gradient-to-r from-plum/80 via-plum-dark/70 to-plum/80 backdrop-blur-xl shadow-[0_8px_32px_rgba(107,78,113,0.25)]'
            : 'bg-gradient-to-r from-plum/60 via-plum-dark/50 to-plum/60 backdrop-blur-lg shadow-[0_4px_16px_rgba(107,78,113,0.15)]'
        }`}
        style={{ height: '52px' }}
      >
        <div className="px-5 md:px-6 flex items-center justify-between h-full">
          <Link to="/" className="font-serif-display text-base font-extrabold tracking-wide text-white hover:text-white/90 transition-colors" style={{ letterSpacing: '0.5px' }}>
            C & R
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`font-sans-elegant text-xs font-bold transition-all duration-300 relative px-3.5 py-1.5 rounded-full ${
                  location.pathname === link.to
                    ? 'text-white'
                    : 'text-white/65 hover:text-white hover:bg-white/10'
                }`}
                style={{ letterSpacing: '0.3px' }}
              >
                {location.pathname === link.to && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute inset-0 rounded-full bg-white/15 border border-white/20"
                    style={{ boxShadow: '0 0 12px rgba(255,255,255,0.15), inset 0 1px 0 rgba(255,255,255,0.1)' }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </Link>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}
              className="flex items-center gap-1 px-3 py-1.5 text-[11px] font-bold rounded-full border border-white/25 text-white/85 hover:text-white hover:border-white/40 transition-all"
              aria-label="Toggle language"
            >
              <Globe className="w-3.5 h-3.5" />
              {language === 'fr' ? 'EN' : 'FR'}
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-white/10 transition-all duration-300 text-white/70 hover:text-white"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>
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
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="absolute top-[72px] left-2 right-2 md:hidden overflow-hidden rounded-2xl glass-card-strong shadow-[0_20px_60px_rgba(139,107,138,0.2)]"
            >
              <div className="flex flex-col p-4 gap-1">
                {links.map(link => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className={`font-sans-elegant text-sm font-medium py-3 px-4 rounded-2xl transition-all duration-300 ${
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
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.div>
  );
};

export default Navigation;
