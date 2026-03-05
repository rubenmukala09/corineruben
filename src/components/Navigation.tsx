import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Sun, Moon, Menu, X, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navigation = () => {
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { to: '/', label: t('nav.home') },
    { to: '/story', label: t('nav.story') },
    { to: '/details', label: t('nav.details') },
    { to: '/rsvp', label: t('nav.rsvp') },
    { to: '/gallery', label: t('nav.gallery') },
    { to: '/registry', label: t('nav.registry') },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 pt-4">
      <nav
        className={`nav-glow-border transition-all duration-500 rounded-[20px] ${
          scrolled
            ? 'glass-card-strong shadow-[0_8px_32px_rgba(139,107,138,0.18),0_2px_8px_rgba(212,165,165,0.12)]'
            : 'glass-card shadow-[0_4px_16px_rgba(139,107,138,0.1)]'
        }`}
        style={{ height: '64px' }}
      >
        <div className="px-6 md:px-8 flex items-center justify-between h-full">
        <Link to="/" className="font-serif-display text-lg font-semibold tracking-wide gradient-text hover:opacity-80 transition-opacity" style={{ letterSpacing: '0.5px' }}>
          C & R
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`font-sans-elegant text-sm font-medium transition-all duration-300 relative py-1.5 ${
                location.pathname === link.to
                  ? 'text-primary font-semibold'
                  : 'text-foreground hover:text-primary'
              }`}
              style={{ letterSpacing: '0.3px' }}
            >
              {link.label}
              {location.pathname === link.to && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute -bottom-0.5 left-0 right-0 h-[2px] gradient-primary rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </Link>
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}
            className="btn-outline flex items-center gap-1.5 !px-4 !py-2 !text-xs"
            aria-label="Toggle language"
          >
            <Globe className="w-3.5 h-3.5" />
            {language === 'fr' ? 'EN' : 'FR'}
          </button>
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-full hover:bg-primary/10 transition-all duration-300 text-muted-foreground hover:text-primary"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2.5 rounded-full hover:bg-primary/10 transition-all duration-300 text-foreground"
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
    </div>
  );
};

export default Navigation;
