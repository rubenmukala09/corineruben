import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { ChevronDown, Heart } from 'lucide-react';

const WEDDING_DATE = new Date('2027-08-15T14:00:00');

const Index = () => {
  const { t } = useLanguage();
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const diff = WEDDING_DATE.getTime() - now.getTime();
      if (diff <= 0) return;
      setCountdown({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center relative px-4 overflow-hidden">
        {/* Gradient background blobs */}
        <div className="floating-blob w-[500px] h-[500px] bg-primary/30 top-[-100px] right-[-100px]" />
        <div className="floating-blob w-[400px] h-[400px] bg-accent/40 bottom-[-50px] left-[-80px]" />
        <div className="floating-blob w-[300px] h-[300px] bg-secondary top-[40%] left-[60%]" />

        {/* Floating decorative cards */}
        <motion.div
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-32 left-8 md:left-20 glass-card rounded-2xl p-4 hidden md:flex items-center gap-3 shadow-soft"
        >
          <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
            <Heart className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <p className="font-sans-elegant text-xs font-medium text-foreground">15.08.2027</p>
            <p className="font-sans-elegant text-[10px] text-muted-foreground">{t('hero.tagline')}</p>
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [10, -10, 10] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-40 right-8 md:right-20 glass-card rounded-2xl p-4 hidden md:flex flex-col items-center shadow-soft"
        >
          <span className="text-2xl mb-1">💒</span>
          <p className="font-sans-elegant text-[10px] text-muted-foreground font-medium tracking-wider uppercase">{t('nav.details')}</p>
        </motion.div>

        <motion.div
          animate={{ y: [-8, 12, -8] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-48 right-10 md:right-40 glass-card rounded-2xl px-4 py-3 hidden lg:flex items-center gap-2 shadow-soft"
        >
          <span className="text-lg">🥂</span>
          <p className="font-sans-elegant text-xs text-muted-foreground">{t('nav.rsvp')}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="text-center relative z-10 max-w-3xl"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-block px-5 py-2 rounded-full bg-secondary/80 backdrop-blur-sm border border-border/50 mb-8"
          >
            <p className="font-sans-elegant text-xs tracking-[0.3em] uppercase text-muted-foreground">
              {t('hero.tagline')}
            </p>
          </motion.div>

          <h1 className="font-serif-display text-6xl md:text-8xl lg:text-9xl font-semibold tracking-wide text-foreground mb-2">
            Corine
          </h1>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="my-6"
          >
            <span className="inline-flex items-center justify-center w-14 h-14 rounded-full gradient-primary shadow-glow">
              <span className="text-primary-foreground text-2xl font-serif-display">&</span>
            </span>
          </motion.div>
          <h1 className="font-serif-display text-6xl md:text-8xl lg:text-9xl font-semibold tracking-wide text-foreground mb-8">
            Ruben
          </h1>

          <p className="font-serif-body text-xl md:text-2xl tracking-wider text-muted-foreground mb-14">
            {t('hero.date')}
          </p>

          {/* Countdown */}
          <div className="flex gap-4 md:gap-6 justify-center mb-14">
            {[
              { value: countdown.days, label: t('countdown.days') },
              { value: countdown.hours, label: t('countdown.hours') },
              { value: countdown.minutes, label: t('countdown.minutes') },
              { value: countdown.seconds, label: t('countdown.seconds') },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="glass-card rounded-2xl px-5 py-4 md:px-8 md:py-5 min-w-[72px] md:min-w-[90px] text-center"
              >
                <span className="font-serif-display text-2xl md:text-4xl text-foreground block font-semibold">
                  {String(item.value).padStart(2, '0')}
                </span>
                <span className="font-sans-elegant text-[10px] md:text-xs tracking-[0.15em] uppercase text-muted-foreground mt-1 block">
                  {item.label}
                </span>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex gap-4 justify-center flex-wrap"
          >
            <Link
              to="/rsvp"
              className="inline-flex items-center gap-2 px-8 py-3.5 gradient-primary text-primary-foreground font-sans-elegant text-sm tracking-[0.12em] uppercase rounded-full hover:shadow-glow transition-all duration-500 hover:scale-105"
            >
              {t('hero.cta')}
            </Link>
            <Link
              to="/story"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-card border border-border/60 text-foreground font-sans-elegant text-sm tracking-[0.12em] uppercase rounded-full hover:border-primary/40 hover:shadow-soft transition-all duration-500"
            >
              {t('nav.story')}
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 flex flex-col items-center gap-2"
        >
          <span className="font-sans-elegant text-xs tracking-wider text-muted-foreground">
            {t('hero.scroll')}
          </span>
          <ChevronDown className="w-4 h-4 text-muted-foreground animate-scroll-indicator" />
        </motion.div>
      </section>
    </div>
  );
};

export default Index;