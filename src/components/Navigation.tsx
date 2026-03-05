import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Sun, Moon, Menu, X, Globe, Heart } from 'lucide-react';
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
        className={`w-full max-w-2xl nav-glow-border transition-all duration-500 rounded-[22px] ${
          scrolled
            ? 'bg-gradient-to-r from-plum/95 via-plum-dark/92 to-plum/95 backdrop-blur-2xl shadow-[0_8px_32px_rgba(74,59,78,0.5),0_2px_8px_rgba(0,0,0,0.25)]'
            : 'bg-gradient-to-r from-plum/88 via-plum-dark/85 to-plum/88 backdrop-blur-xl shadow-[0_4px_20px_rgba(74,59,78,0.35),0_1px_4px_rgba(0,0,0,0.15)]'
        }`}
        style={{ height: '54px' }}
      >
        <div className="px-5 md:px-6 flex items-center justify-between h-full">
          <Link to="/" className="flex items-center gap-2.5 group" >
            <span className="w-8 h-8 rounded-full bg-gradient-to-br from-gold-light/30 to-gold/20 border border-gold-light/40 flex items-center justify-center group-hover:from-gold-light/40 group-hover:to-gold/30 transition-all duration-300 shadow-[0_0_10px_hsl(var(--gold-light)/0.15)]">
              <Heart className="w-3.5 h-3.5 text-gold-light fill-gold-light/80" />
            </span>
            <span className="font-serif-display text-base font-extrabold tracking-wide text-white/95 group-hover:text-white transition-colors" style={{ letterSpacing: '1.5px' }}>
              C & R
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-0.5">
            {links.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`font-sans-elegant text-[11px] font-semibold transition-all duration-300 relative px-3.5 py-1.5 rounded-full uppercase tracking-[0.08em] ${
                  location.pathname === link.to
                    ? 'text-gold-light'
                    : 'text-white/60 hover:text-white/90 hover:bg-white/8'
                }`}
              >
                {location.pathname === link.to && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute inset-0 rounded-full border border-gold-light/30 bg-gold/8"
                    style={{ boxShadow: '0 0 12px hsl(var(--gold-light) / 0.1), inset 0 1px 0 rgba(255,255,255,0.06)' }}
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
              className="flex items-center gap-1 px-3 py-1.5 text-[10px] font-bold rounded-full border border-gold-light/30 text-gold-light/90 hover:text-gold-light hover:border-gold-light/50 hover:bg-gold/8 transition-all uppercase tracking-wider"
              aria-label={language === 'fr' ? 'Switch to EN' : 'Passer en FR'}
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
