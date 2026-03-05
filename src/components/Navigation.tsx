import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Sun, Moon, Menu, X, Languages } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navigation = () => {
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const links = [
    { to: '/', label: t('nav.home') },
    { to: '/story', label: t('nav.story') },
    { to: '/details', label: t('nav.details') },
    { to: '/rsvp', label: t('nav.rsvp') },
    { to: '/gallery', label: t('nav.gallery') },
    { to: '/registry', label: t('nav.registry') },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/60 backdrop-blur-2xl border-b border-border/40">
      <div className="container mx-auto px-6 flex items-center justify-between h-18 py-4">
        <Link to="/" className="font-serif-display text-2xl tracking-wider gradient-text font-semibold">
          C & R
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-sans-elegant tracking-wide transition-all duration-300 relative py-1 ${
                location.pathname === link.to
                  ? 'text-primary font-medium'
                  : 'text-muted-foreground hover:text-primary'
              }`}
            >
              {link.label}
              {location.pathname === link.to && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 gradient-primary rounded-full"
                />
              )}
            </Link>
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-sans-elegant font-medium rounded-full border border-primary/30 text-primary hover:bg-primary/10 transition-all duration-300"
            aria-label="Toggle language"
          >
            <Languages className="w-3.5 h-3.5" />
            {language === 'fr' ? 'EN' : 'FR'}
          </button>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-primary/10 transition-all duration-300 text-primary"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-full hover:bg-primary/10 transition-all duration-300 text-primary"
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
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-2xl border-b border-border/40 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-1">
              {links.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={`text-sm font-sans-elegant tracking-wide py-3 px-4 rounded-xl transition-all duration-300 ${
                    location.pathname === link.to
                      ? 'text-primary font-medium bg-primary/10'
                      : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation;