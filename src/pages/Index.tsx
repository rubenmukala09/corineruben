import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { ChevronDown, Heart, MapPin, Calendar, Clock, Utensils, Camera, Gift, Star, Sparkles, Play, Music } from 'lucide-react';
import heroImg from '@/assets/hero-wedding.jpg';
import flowersImg from '@/assets/flowers-lavender.jpg';
import ringsImg from '@/assets/rings.jpg';
import venueImg from '@/assets/venue.jpg';
import coupleImg from '@/assets/couple-lavender.jpg';
import cakeImg from '@/assets/cake.jpg';

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

  const highlights = [
    { icon: Calendar, titleKey: 'hero.tagline', descKey: 'hero.date', img: flowersImg },
    { icon: MapPin, titleKey: 'details.ceremony', descKey: 'details.ceremony.location', img: venueImg },
    { icon: Utensils, titleKey: 'details.reception', descKey: 'details.reception.location', img: cakeImg },
  ];

  const features = [
    { icon: Heart, label: t('nav.story'), desc: t('story.subtitle'), to: '/story' },
    { icon: Camera, label: t('nav.gallery'), desc: t('gallery.subtitle'), to: '/gallery' },
    { icon: Gift, label: t('nav.registry'), desc: t('registry.subtitle'), to: '/registry' },
    { icon: Clock, label: t('nav.rsvp'), desc: t('rsvp.subtitle'), to: '/rsvp' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* ===== HERO ===== */}
      <section className="w-full min-h-screen relative overflow-hidden flex flex-col items-center pt-8 pb-24">
        {/* Aurora background — the canvas */}
        <div className="absolute inset-0 gradient-hero" />
        {/* Hero image — very faint watermark only */}
        <div className="absolute inset-0 mix-blend-soft-light">
          <img src={heroImg} alt="" className="w-full h-full object-cover opacity-[0.12]" style={{ filter: 'saturate(0.4) brightness(1.2)' }} />
        </div>

        {/* Aurora gradient blobs — deep plum, rose gold, peach, lavender, coral */}
        <div className="absolute left-[-5%] bottom-[0%] w-[700px] h-[700px] rounded-full blur-[120px] pointer-events-none" style={{ background: 'rgba(139, 107, 138, 0.6)' }} />
        <div className="absolute left-[-10%] top-[30%] w-[500px] h-[500px] rounded-full blur-[100px] pointer-events-none" style={{ background: 'rgba(212, 165, 165, 0.4)' }} />
        <div className="absolute right-[-5%] bottom-[5%] w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none" style={{ background: 'rgba(232, 196, 184, 0.45)' }} />
        <div className="absolute right-[-10%] top-[0%] w-[500px] h-[500px] rounded-full blur-[100px] pointer-events-none" style={{ background: 'rgba(212, 196, 224, 0.35)' }} />
        <div className="absolute left-[30%] top-[20%] w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none" style={{ background: 'rgba(245, 230, 220, 0.5)' }} />
        <div className="absolute left-[20%] bottom-[10%] w-[350px] h-[350px] rounded-full blur-[100px] pointer-events-none" style={{ background: 'rgba(224, 180, 168, 0.4)' }} />

        {/* ===== HERO TEXT CONTAINER ===== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="flex flex-col items-center text-center max-w-3xl mx-auto mt-20 md:mt-28 z-20 px-6"
        >
          {/* Top label */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-6 py-2.5 rounded-full glass-card-strong mb-6"
          >
            <p className="font-sans-elegant text-xs tracking-[0.3em] uppercase text-muted-foreground font-medium">
              {t('hero.tagline')}
            </p>
          </motion.div>

          {/* H1 Title */}
          <h1 className="font-serif-display text-5xl md:text-7xl lg:text-8xl font-semibold text-foreground mb-2 leading-tight">
            Corine
          </h1>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="my-4"
          >
            <span className="inline-flex items-center justify-center w-14 h-14 rounded-full gradient-primary shadow-glow">
              <span className="text-primary-foreground text-2xl font-serif-display">&</span>
            </span>
          </motion.div>
          <h1 className="font-serif-display text-5xl md:text-7xl lg:text-8xl font-semibold text-foreground mb-6 leading-tight">
            Ruben
          </h1>

          {/* Description */}
          <p className="font-sans-elegant text-lg md:text-xl text-muted-foreground max-w-xl mb-8" style={{ lineHeight: 1.6 }}>
            {t('hero.date')}
          </p>

          {/* Button Group */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-row gap-4 justify-center mb-8"
          >
            <Link to="/rsvp" className="btn-primary">
              {t('hero.cta')}
            </Link>
            <Link to="/story" className="btn-outline">
              {t('nav.story')}
            </Link>
          </motion.div>
        </motion.div>

        {/* ===== FLOATING CARDS COMPOSITION GRID ===== */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: 'easeOut' }}
          className="w-full max-w-6xl mx-auto mt-10 md:mt-16 relative z-20 px-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">

            {/* LEFT COLUMN — pushed down */}
            <div className="flex flex-col gap-6 items-center md:items-end md:translate-y-12">
              {/* Circular stats widget */}
              <motion.div
                animate={{ y: [-6, 8, -6] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="glass-card-strong rounded-3xl p-5 w-44"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Star className="w-4 h-4 text-primary fill-primary" />
                  <span className="font-sans-elegant text-lg font-bold text-foreground">4.8</span>
                </div>
                <p className="font-sans-elegant text-xs font-semibold text-foreground">Guest Reviews</p>
                <p className="font-sans-elegant text-[10px] text-muted-foreground">150+ invited</p>
              </motion.div>

              {/* Music player card */}
              <motion.div
                animate={{ y: [-8, 10, -8] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="glass-card-strong rounded-3xl p-4 flex items-center gap-3"
              >
                <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                  <img src={flowersImg} alt="Flowers" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="font-sans-elegant text-sm font-semibold text-foreground">Celestial Calm</p>
                  <p className="font-sans-elegant text-xs text-muted-foreground">2:10 mins</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-background/80 dark:bg-background/40 flex items-center justify-center ml-1">
                  <Play className="w-3 h-3 text-foreground fill-foreground" />
                </div>
              </motion.div>
            </div>

            {/* CENTER COLUMN — main focal card, scaled up */}
            <div className="flex justify-center z-30 relative">
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="glass-card-dark rounded-3xl p-6 w-full max-w-[260px] md:scale-105"
              >
                <p className="font-sans-elegant text-xs font-medium opacity-70 mb-2 tracking-[0.1em] uppercase">Featured</p>
                <p className="font-serif-display text-xl font-semibold mb-2">Serenity Waves</p>
                <p className="font-sans-elegant text-xs opacity-60 mb-5" style={{ lineHeight: 1.5 }}>
                  A celebration of love, family & togetherness
                </p>

                {/* Countdown mini */}
                <div className="grid grid-cols-4 gap-2 mb-5">
                  {[
                    { value: countdown.days, label: t('countdown.days') },
                    { value: countdown.hours, label: t('countdown.hours') },
                    { value: countdown.minutes, label: t('countdown.minutes') },
                    { value: countdown.seconds, label: t('countdown.seconds') },
                  ].map((item) => (
                    <div key={item.label} className="text-center">
                      <span className="font-serif-display text-xl font-semibold block">
                        {String(item.value).padStart(2, '0')}
                      </span>
                      <span className="font-sans-elegant text-[8px] tracking-[0.1em] uppercase opacity-60 block mt-0.5">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <div className="w-10 h-10 rounded-full bg-background/20 backdrop-blur-sm border border-background/30 flex items-center justify-center">
                    <Play className="w-4 h-4 fill-current" />
                  </div>
                  <div className="w-10 h-10 rounded-full bg-background/20 backdrop-blur-sm border border-background/30 flex items-center justify-center">
                    <Music className="w-4 h-4" />
                  </div>
                  <div className="w-10 h-10 rounded-full bg-background/20 backdrop-blur-sm border border-background/30 flex items-center justify-center">
                    <Heart className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* RIGHT COLUMN — pulled up */}
            <div className="flex flex-col gap-6 items-center md:items-start md:-translate-y-8">
              {/* Rating pill */}
              <motion.div
                animate={{ y: [6, -8, 6] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                className="glass-card-strong rounded-full px-5 py-3 flex items-center gap-2"
              >
                <Heart className="w-4 h-4 text-dusty-rose fill-dusty-rose" />
                <span className="font-sans-elegant text-sm font-semibold text-foreground">Forever & Always</span>
              </motion.div>

              {/* Event info card */}
              <motion.div
                animate={{ y: [-6, 10, -6] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="glass-card-strong rounded-3xl p-4 flex items-center gap-3"
              >
                <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                  <img src={ringsImg} alt="Rings" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="font-sans-elegant text-sm font-semibold text-foreground">Forever & Always</p>
                  <p className="font-sans-elegant text-xs text-muted-foreground">3:22 mins</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-background/80 dark:bg-background/40 flex items-center justify-center ml-1">
                  <Play className="w-3 h-3 text-foreground fill-foreground" />
                </div>
              </motion.div>

              {/* Date mini card */}
              <motion.div
                animate={{ y: [-4, 8, -4] }}
                transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
                className="glass-card-strong rounded-3xl p-4 w-48"
              >
                <p className="font-sans-elegant text-xs text-muted-foreground mb-1">15 Aug 2027</p>
                <p className="font-sans-elegant text-sm font-semibold text-foreground">Start Your Journey</p>
                <p className="font-sans-elegant text-xs text-muted-foreground mt-1">A celebration of love</p>
              </motion.div>
            </div>

          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-auto pt-8 flex flex-col items-center gap-2 z-10"
        >
          <span className="font-sans-elegant text-xs tracking-wider text-muted-foreground">{t('hero.scroll')}</span>
          <ChevronDown className="w-4 h-4 text-muted-foreground animate-scroll-indicator" />
        </motion.div>
      </section>

      {/* ===== ABOUT / INTRO ===== */}
      <section className="py-28 md:py-36 relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh" />
        <div className="absolute top-[-80px] right-[-150px] w-[550px] h-[550px] rounded-full blur-[100px] pointer-events-none" style={{ background: 'rgba(184, 169, 201, 0.3)' }} />
        <div className="absolute bottom-[-40px] left-[-100px] w-[400px] h-[400px] rounded-full blur-[100px] pointer-events-none" style={{ background: 'rgba(212, 165, 165, 0.25)' }} />

        <div className="container mx-auto px-6 md:px-12 max-w-6xl relative z-10">
          <div className="grid md:grid-cols-2 gap-14 md:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="relative">
                <div className="glass-card-strong rounded-3xl p-2.5">
                  <img
                    src={coupleImg}
                    alt="Corine & Ruben"
                    className="rounded-[20px] w-full object-cover aspect-[4/5]"
                    style={{ boxShadow: '0 20px 40px rgba(107, 78, 113, 0.15)' }}
                  />
                </div>
                <motion.div
                  animate={{ y: [-8, 8, -8] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-6 -right-6 glass-card-strong rounded-3xl p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center shadow-soft">
                      <Heart className="w-5 h-5 text-primary-foreground fill-primary-foreground" />
                    </div>
                    <div>
                      <p className="font-sans-elegant text-sm font-bold text-foreground">4+ Years</p>
                      <p className="font-sans-elegant text-[10px] text-muted-foreground">{t('story.subtitle')}</p>
                    </div>
                  </div>
                </motion.div>
                <motion.div
                  animate={{ y: [6, -6, 6] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-4 -left-4 glass-card rounded-3xl px-4 py-2.5 hidden md:block"
                >
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span className="font-sans-elegant text-xs font-semibold text-foreground">{t('index.ourJourney')}</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-block px-5 py-2 rounded-full glass-card-strong mb-6">
                <p className="font-sans-elegant text-xs tracking-[0.25em] uppercase text-muted-foreground font-medium">{t('nav.story')}</p>
              </div>
              <h2 className="font-serif-display text-3xl md:text-5xl text-foreground mb-6 font-semibold">
                {t('story.title')}
              </h2>
              <div className="glass-card rounded-3xl p-6 mb-6">
                <p className="font-sans-elegant text-base text-muted-foreground leading-relaxed">
                  <span className="text-foreground font-semibold">{t('story.event1.description').split('.')[0]}.</span>{' '}
                  {t('story.event1.description').split('.').slice(1).join('.')}
                </p>
              </div>
              <p className="font-serif-display text-lg text-muted-foreground leading-relaxed mb-8 italic">
                "{t('story.event5.description')}"
              </p>
              <Link to="/story" className="btn-primary">
                {t('nav.story')} →
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== HIGHLIGHTS CARDS ===== */}
      <section className="py-28 md:py-36 relative overflow-hidden">
        <div className="absolute inset-0 gradient-soft" />
        <div className="absolute top-[-80px] left-[-120px] w-[500px] h-[500px] rounded-full blur-[100px] pointer-events-none" style={{ background: 'rgba(139, 107, 138, 0.25)' }} />
        <div className="absolute bottom-[-60px] right-[-80px] w-[400px] h-[400px] rounded-full blur-[100px] pointer-events-none" style={{ background: 'rgba(212, 196, 224, 0.25)' }} />

        <div className="container mx-auto px-6 md:px-12 max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-block px-5 py-2 rounded-full glass-card-strong mb-5">
              <p className="font-sans-elegant text-xs tracking-[0.25em] uppercase text-muted-foreground font-medium">{t('nav.details')}</p>
            </div>
            <h2 className="font-serif-display text-3xl md:text-5xl text-foreground font-semibold mb-4">{t('details.title')}</h2>
            <p className="font-sans-elegant text-lg text-muted-foreground max-w-lg mx-auto">{t('details.subtitle')}</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {highlights.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="group"
              >
                <div className="glass-card-strong rounded-3xl overflow-hidden card-hover">
                  <div className="relative h-60 overflow-hidden">
                    <img src={item.img} alt={t(item.titleKey)} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                          <item.icon className="w-4 h-4 text-primary-foreground" />
                        </div>
                        <p className="font-sans-elegant text-sm font-semibold text-[hsl(var(--text-light))]">{t(item.titleKey)}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-8">
                    <p className="font-sans-elegant text-sm text-muted-foreground leading-relaxed">{t(item.descKey)}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="py-28 md:py-36 relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh" />
        <div className="absolute top-[-120px] right-[-120px] w-[550px] h-[550px] rounded-full blur-[100px] pointer-events-none" style={{ background: 'rgba(201, 169, 182, 0.3)' }} />
        <div className="absolute bottom-[-60px] left-[-80px] w-[350px] h-[350px] rounded-full blur-[100px] pointer-events-none" style={{ background: 'rgba(184, 169, 201, 0.25)' }} />

        <div className="container mx-auto px-6 md:px-12 max-w-5xl relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="font-sans-elegant text-sm text-muted-foreground mb-4 tracking-wide">{t('index.joinCelebration')}</p>
            <h2 className="font-serif-display text-3xl md:text-5xl text-foreground font-semibold mb-4">
              {t('hero.tagline')}
            </h2>
            <p className="font-sans-elegant text-lg text-muted-foreground mb-14 max-w-md mx-auto">
              {t('index.celebrationDesc')}
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: countdown.days, label: t('countdown.days'), icon: '📅' },
              { value: '150+', label: t('index.guestsInvited'), icon: '👥' },
              { value: '5', label: t('index.courseDinner'), icon: '🍽️' },
              { value: '∞', label: t('index.love'), icon: '💜' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card-strong rounded-3xl p-8 card-hover group"
              >
                <span className="text-3xl mb-3 block group-hover:scale-110 transition-transform duration-300">{stat.icon}</span>
                <span className="font-serif-display text-3xl md:text-4xl font-semibold gradient-text block mb-2">
                  {typeof stat.value === 'number' ? String(stat.value).padStart(2, '0') : stat.value}
                </span>
                <span className="font-sans-elegant text-xs tracking-[0.12em] uppercase text-muted-foreground font-medium">{stat.label}</span>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-14"
          >
            <Link to="/rsvp" className="btn-primary">
              {t('hero.cta')} →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ===== EXPLORE NAVIGATION ===== */}
      <section className="py-28 md:py-36 relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute bottom-[-100px] right-[-120px] w-[450px] h-[450px] rounded-full blur-[100px] pointer-events-none" style={{ background: 'rgba(232, 196, 184, 0.3)' }} />
        <div className="absolute top-[-60px] left-[-80px] w-[350px] h-[350px] rounded-full blur-[100px] pointer-events-none" style={{ background: 'rgba(212, 165, 165, 0.25)' }} />

        <div className="container mx-auto px-6 md:px-12 max-w-5xl relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <div className="inline-block px-5 py-2 rounded-full glass-card-strong mb-5">
              <p className="font-sans-elegant text-xs tracking-[0.25em] uppercase text-muted-foreground font-medium">{t('index.explore')}</p>
            </div>
            <h2 className="font-serif-display text-3xl md:text-5xl text-foreground font-semibold mb-4">
              {t('explore.title')}
            </h2>
            <p className="font-sans-elegant text-lg text-muted-foreground max-w-md mx-auto">
              {t('explore.subtitle')}
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Link
                  to={feat.to}
                  className="glass-card-strong rounded-3xl p-8 flex flex-col items-center text-center card-hover group block h-full"
                >
                  <div className="w-16 h-16 rounded-3xl gradient-primary flex items-center justify-center mb-5 group-hover:shadow-glow group-hover:scale-110 transition-all duration-500 shadow-soft">
                    <feat.icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <h3 className="font-serif-display text-lg font-semibold text-foreground mb-2">{feat.label}</h3>
                  <p className="font-sans-elegant text-sm text-muted-foreground leading-relaxed">{feat.desc}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== GALLERY PREVIEW ===== */}
      <section className="py-28 md:py-36 relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh" />
        <div className="absolute top-[-60px] right-[-80px] w-[450px] h-[450px] rounded-full blur-[100px] pointer-events-none" style={{ background: 'rgba(184, 169, 201, 0.25)' }} />
        <div className="absolute bottom-[-40px] left-[-60px] w-[300px] h-[300px] rounded-full blur-[100px] pointer-events-none" style={{ background: 'rgba(139, 107, 138, 0.2)' }} />

        <div className="container mx-auto px-6 md:px-12 max-w-6xl relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <div className="inline-block px-5 py-2 rounded-full glass-card-strong mb-5">
              <p className="font-sans-elegant text-xs tracking-[0.25em] uppercase text-muted-foreground font-medium">{t('nav.gallery')}</p>
            </div>
            <h2 className="font-serif-display text-3xl md:text-5xl text-foreground font-semibold mb-4">{t('gallery.title')}</h2>
            <p className="font-sans-elegant text-lg text-muted-foreground max-w-md mx-auto">{t('index.capturedMoments')}</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[heroImg, flowersImg, ringsImg, venueImg, coupleImg, cakeImg].map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`overflow-hidden rounded-3xl ${i === 0 ? 'md:col-span-2 md:row-span-2' : ''} group cursor-pointer glass-card-strong p-1.5 card-hover`}
              >
                <img src={img} alt="Wedding gallery" className="w-full h-full object-cover aspect-square rounded-[20px] group-hover:scale-105 transition-transform duration-700" />
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mt-12">
            <Link to="/gallery" className="btn-primary">
              {t('nav.gallery')} →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ===== CTA / RSVP ===== */}
      <section className="py-28 md:py-36 relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute top-[-120px] left-[-120px] w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none" style={{ background: 'rgba(139, 107, 138, 0.3)' }} />
        <div className="absolute bottom-[-100px] right-[-100px] w-[450px] h-[450px] rounded-full blur-[100px] pointer-events-none" style={{ background: 'rgba(212, 196, 224, 0.25)' }} />

        <div className="container mx-auto px-6 md:px-12 max-w-3xl relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="glass-card-strong rounded-full w-32 h-32 mx-auto mb-10 flex items-center justify-center overflow-hidden ring-4 ring-primary/15">
              <img src={ringsImg} alt="Wedding rings" className="w-full h-full object-cover" />
            </div>
            <h2 className="font-serif-display text-4xl md:text-6xl text-foreground font-semibold mb-6">
              {t('rsvp.title')}
            </h2>
            <p className="font-sans-elegant text-lg md:text-xl text-muted-foreground leading-relaxed mb-12 max-w-lg mx-auto">
              {t('rsvp.subtitle')}
            </p>
            <Link to="/rsvp" className="btn-primary text-base">
              {t('hero.cta')}
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;
