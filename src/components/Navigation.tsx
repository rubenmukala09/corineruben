import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Sun, Moon, Menu, X, Globe } from 'lucide-react';
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
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card-strong border-b border-border/15" style={{ borderRadius: 0 }}>
      <div className="container mx-auto px-6 flex items-center justify-between py-4">
        <Link to="/" className="font-serif-display text-xl md:text-2xl tracking-wider gradient-text font-bold hover:opacity-80 transition-opacity">
          C & R
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-7">
          {links.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-[13px] font-sans-elegant font-medium tracking-wide transition-all duration-300 relative py-1.5 ${
                location.pathname === link.to
                  ? 'text-primary font-semibold'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
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
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-sans-elegant font-semibold rounded-full border border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
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
            className="md:hidden p-2.5 rounded-full hover:bg-primary/10 transition-all duration-300 text-muted-foreground"
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
            className="md:hidden overflow-hidden border-t border-border/20"
          >
            <div className="flex flex-col p-5 gap-0.5 glass-card-strong" style={{ borderRadius: 0 }}>
              {links.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={`text-sm font-sans-elegant font-medium tracking-wide py-3 px-4 rounded-xl transition-all duration-300 ${
                    location.pathname === link.to
                      ? 'text-primary bg-primary/10 font-semibold'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
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
