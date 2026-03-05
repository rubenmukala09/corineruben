import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { ChevronDown, Heart, MapPin, Calendar, Clock, Utensils, Camera, Gift, Star, Sparkles } from 'lucide-react';
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
      <section className="min-h-screen flex flex-col items-center justify-center relative px-4 overflow-hidden">
        {/* Deep layered background */}
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute inset-0">
          <img src={heroImg} alt="" className="w-full h-full object-cover opacity-[0.18] dark:opacity-[0.08]" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background/60" />

        {/* Glass overlay texture */}
        <div className="absolute inset-0 backdrop-blur-[1px]" />

        {/* Floating blobs — warm tones */}
        <div className="floating-blob w-[700px] h-[700px] bg-primary/25 top-[-280px] right-[-200px]" />
        <div className="floating-blob w-[600px] h-[600px] bg-lavender/30 top-[5%] left-[-200px]" />
        <div className="floating-blob w-[400px] h-[400px] bg-peach/35 bottom-[10%] right-[2%]" />
        <div className="floating-blob w-[300px] h-[300px] bg-blush/40 bottom-[-80px] left-[25%]" />
        <div className="floating-blob w-[200px] h-[200px] bg-rose/20 top-[45%] right-[35%]" />

        {/* Floating glass widgets */}
        <motion.div
          animate={{ y: [-12, 12, -12] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-32 left-6 md:left-16 glass-card-strong rounded-2xl p-3.5 hidden md:flex items-center gap-3 z-20 shadow-glass"
        >
          <div className="w-12 h-12 rounded-xl overflow-hidden ring-2 ring-primary/10">
            <img src={flowersImg} alt="" className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="font-sans-elegant text-xs font-bold text-foreground">15 Août 2027</p>
            <p className="font-sans-elegant text-[10px] text-muted-foreground">{t('hero.tagline')}</p>
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [10, -15, 10] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-36 right-6 md:right-16 glass-card-strong rounded-2xl overflow-hidden hidden md:block z-20 shadow-glass"
        >
          <img src={ringsImg} alt="" className="w-40 h-28 object-cover" />
          <div className="p-3 text-center glass-card">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Star className="w-3 h-3 text-primary fill-primary" />
              <Star className="w-3 h-3 text-primary fill-primary" />
              <Star className="w-3 h-3 text-primary fill-primary" />
              <Star className="w-3 h-3 text-primary fill-primary" />
              <Star className="w-3 h-3 text-primary fill-primary" />
            </div>
            <p className="font-serif-body text-[11px] italic text-muted-foreground">Forever & Always</p>
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [-8, 14, -8] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-48 left-10 md:left-28 glass-card-strong rounded-2xl p-3.5 hidden lg:flex items-center gap-3 z-20 shadow-glass"
        >
          <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-soft">
            <MapPin className="w-4 h-4 text-primary-foreground" />
          </div>
          <div>
            <p className="font-sans-elegant text-[11px] font-semibold text-foreground">{t('details.ceremony.location')}</p>
            <p className="font-sans-elegant text-[9px] text-muted-foreground">14:00 — Ceremony</p>
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [12, -10, 12] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-40 right-8 md:right-24 glass-card-strong rounded-2xl overflow-hidden hidden lg:block z-20 shadow-glass"
        >
          <img src={venueImg} alt="" className="w-36 h-24 object-cover" />
          <div className="p-2.5 text-center glass-card">
            <p className="font-sans-elegant text-[10px] text-muted-foreground">🥂 {t('nav.details')}</p>
          </div>
        </motion.div>

        {/* Decorative sparkle widget */}
        <motion.div
          animate={{ y: [-6, 10, -6], rotate: [0, 3, -3, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[55%] left-6 md:left-10 glass-card rounded-full w-14 h-14 hidden xl:flex items-center justify-center z-20 shadow-glass"
        >
          <Sparkles className="w-5 h-5 text-primary/70" />
        </motion.div>

        {/* Main hero content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="text-center relative z-10 max-w-3xl"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-6 py-2.5 rounded-full glass-card-strong mb-8 shadow-glass"
          >
            <p className="font-sans-elegant text-xs tracking-[0.3em] uppercase text-muted-foreground font-medium">
              {t('hero.tagline')}
            </p>
          </motion.div>

          <h1 className="font-serif-display text-6xl md:text-8xl lg:text-9xl font-bold tracking-wide text-foreground mb-2">
            Corine
          </h1>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="my-6"
          >
            <span className="inline-flex items-center justify-center w-18 h-18 rounded-full gradient-primary shadow-glow">
              <span className="text-primary-foreground text-3xl font-serif-display">&</span>
            </span>
          </motion.div>
          <h1 className="font-serif-display text-6xl md:text-8xl lg:text-9xl font-bold tracking-wide text-foreground mb-10">
            Ruben
          </h1>

          <p className="font-serif-body text-xl md:text-2xl tracking-wider text-muted-foreground mb-14">
            {t('hero.date')}
          </p>

          {/* Countdown — glassmorphism timer */}
          <div className="flex gap-3 md:gap-5 justify-center mb-14">
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
                className="glass-card-strong rounded-2xl px-5 py-5 md:px-8 md:py-6 min-w-[72px] md:min-w-[96px] text-center shadow-glass"
              >
                <span className="font-serif-display text-3xl md:text-4xl text-foreground block font-bold">
                  {String(item.value).padStart(2, '0')}
                </span>
                <span className="font-sans-elegant text-[9px] md:text-xs tracking-[0.15em] uppercase text-muted-foreground mt-1.5 block font-medium">
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
            <Link to="/rsvp" className="btn-primary px-10 py-4">
              {t('hero.cta')}
            </Link>
            <Link to="/story" className="btn-outline px-10 py-4">
              {t('nav.story')}
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 flex flex-col items-center gap-2 z-10"
        >
          <span className="font-sans-elegant text-xs tracking-wider text-muted-foreground">{t('hero.scroll')}</span>
          <ChevronDown className="w-4 h-4 text-muted-foreground animate-scroll-indicator" />
        </motion.div>
      </section>

      {/* ===== ABOUT / INTRO ===== */}
      <section className="py-28 md:py-36 relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background/40" />
        <div className="floating-blob w-[550px] h-[550px] bg-lavender/25 top-[-80px] right-[-150px]" />
        <div className="floating-blob w-[400px] h-[400px] bg-peach/30 bottom-[-40px] left-[-100px]" />
        <div className="floating-blob w-[250px] h-[250px] bg-blush/25 top-[50%] left-[60%]" />

        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="grid md:grid-cols-2 gap-14 md:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="relative">
                <div className="glass-card-strong rounded-3xl p-2.5 shadow-glass">
                  <img
                    src={coupleImg}
                    alt="Corine & Ruben"
                    className="rounded-2xl w-full object-cover aspect-[4/5]"
                  />
                </div>
                {/* Floating badge */}
                <motion.div
                  animate={{ y: [-8, 8, -8] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-6 -right-6 glass-card-strong rounded-2xl p-4 shadow-glass"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full gradient-primary flex items-center justify-center shadow-soft">
                      <Heart className="w-5 h-5 text-primary-foreground fill-primary-foreground" />
                    </div>
                    <div>
                      <p className="font-sans-elegant text-sm font-bold text-foreground">4+ Years</p>
                      <p className="font-sans-elegant text-[10px] text-muted-foreground">{t('story.subtitle')}</p>
                    </div>
                  </div>
                </motion.div>
                {/* Top-left decorative glass chip */}
                <motion.div
                  animate={{ y: [6, -6, 6] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-4 -left-4 glass-card rounded-xl px-3 py-2 shadow-glass hidden md:block"
                >
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-primary" />
                    <span className="font-sans-elegant text-[10px] font-semibold text-foreground tracking-wide">Our Journey</span>
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
              <div className="inline-block px-5 py-2 rounded-full glass-card-strong mb-6 shadow-glass">
                <p className="font-sans-elegant text-xs tracking-[0.25em] uppercase text-muted-foreground font-medium">{t('nav.story')}</p>
              </div>
              <h2 className="font-serif-display text-3xl md:text-5xl text-foreground mb-6 font-bold leading-tight">
                {t('story.title')}
              </h2>
              <div className="glass-card rounded-2xl p-6 mb-6">
                <p className="font-sans-elegant text-base text-muted-foreground leading-relaxed">
                  <span className="text-foreground font-semibold">{t('story.event1.description').split('.')[0]}.</span>{' '}
                  {t('story.event1.description').split('.').slice(1).join('.')}
                </p>
              </div>
              <p className="font-serif-body text-lg text-muted-foreground leading-relaxed mb-8 italic">
                "{t('story.event5.description')}"
              </p>
              <Link to="/story" className="btn-primary px-8 py-3.5">
                {t('nav.story')} →
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== HIGHLIGHTS CARDS ===== */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 gradient-soft" />
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-background/20 to-background/50" />
        <div className="floating-blob w-[500px] h-[500px] bg-primary/18 top-[-80px] left-[-120px]" />
        <div className="floating-blob w-[400px] h-[400px] bg-lavender/22 bottom-[-60px] right-[-80px]" />
        <div className="floating-blob w-[200px] h-[200px] bg-rose/15 top-[40%] right-[20%]" />

        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-block px-5 py-2 rounded-full glass-card-strong mb-5 shadow-glass">
              <p className="font-sans-elegant text-xs tracking-[0.25em] uppercase text-muted-foreground font-medium">{t('nav.details')}</p>
            </div>
            <h2 className="font-serif-display text-3xl md:text-5xl text-foreground font-bold mb-4">{t('details.title')}</h2>
            <p className="font-serif-body text-lg text-muted-foreground max-w-lg mx-auto italic">{t('details.subtitle')}</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {highlights.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="group"
              >
                <div className="glass-card-strong rounded-3xl overflow-hidden hover:shadow-card-hover transition-all duration-500 shadow-glass">
                  <div className="relative h-60 overflow-hidden">
                    <img src={item.img} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/30 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-soft">
                          <item.icon className="w-4 h-4 text-primary-foreground" />
                        </div>
                        <p className="font-sans-elegant text-sm font-bold text-foreground">{t(item.titleKey)}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="font-sans-elegant text-sm text-muted-foreground leading-relaxed">{t(item.descKey)}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-background/30" />
        <div className="floating-blob w-[550px] h-[550px] bg-primary/20 top-[-120px] right-[-120px]" />
        <div className="floating-blob w-[350px] h-[350px] bg-lavender/25 bottom-[-60px] left-[-80px]" />
        <div className="floating-blob w-[250px] h-[250px] bg-peach/20 top-[30%] left-[50%]" />

        <div className="container mx-auto px-4 max-w-5xl relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="glass-card-strong rounded-full w-28 h-28 mx-auto mb-8 flex items-center justify-center overflow-hidden shadow-glass ring-4 ring-primary/10">
              <img src={flowersImg} alt="" className="w-full h-full object-cover" />
            </div>
            <h2 className="font-serif-display text-3xl md:text-5xl text-foreground font-bold mb-4">
              {t('hero.tagline')}
            </h2>
            <p className="font-serif-body text-lg text-muted-foreground italic mb-14 max-w-md mx-auto">
              A celebration of love, family & togetherness
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { value: countdown.days, label: t('countdown.days'), icon: '📅' },
              { value: '150+', label: 'Guests Invited', icon: '👥' },
              { value: '5', label: 'Course Dinner', icon: '🍽️' },
              { value: '∞', label: 'Love', icon: '💜' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card-strong rounded-2xl p-7 hover:shadow-card-hover transition-all duration-500 shadow-glass group"
              >
                <span className="text-3xl mb-3 block group-hover:scale-110 transition-transform duration-300">{stat.icon}</span>
                <span className="font-serif-display text-3xl md:text-4xl font-bold gradient-text block mb-2">
                  {typeof stat.value === 'number' ? String(stat.value).padStart(2, '0') : stat.value}
                </span>
                <span className="font-sans-elegant text-xs tracking-[0.12em] uppercase text-muted-foreground font-medium">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== EXPLORE NAVIGATION ===== */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-background/50" />
        <div className="floating-blob w-[450px] h-[450px] bg-accent/22 bottom-[-100px] right-[-120px]" />
        <div className="floating-blob w-[350px] h-[350px] bg-peach/25 top-[-60px] left-[-80px]" />
        <div className="floating-blob w-[200px] h-[200px] bg-blush/30 top-[60%] left-[40%]" />

        <div className="container mx-auto px-4 max-w-5xl relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <div className="inline-block px-5 py-2 rounded-full glass-card-strong mb-5 shadow-glass">
              <p className="font-sans-elegant text-xs tracking-[0.25em] uppercase text-muted-foreground font-medium">Explore</p>
            </div>
            <h2 className="font-serif-display text-3xl md:text-5xl text-foreground font-bold mb-4">
              {t('explore.title') || 'Explore Our Wedding'}
            </h2>
            <p className="font-serif-body text-lg text-muted-foreground italic max-w-md mx-auto">
              {t('explore.subtitle') || 'Everything you need to know'}
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((feat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Link
                  to={feat.to}
                  className="glass-card-strong rounded-2xl p-7 flex flex-col items-center text-center hover:shadow-card-hover transition-all duration-500 group block h-full shadow-glass"
                >
                  <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mb-5 group-hover:shadow-glow group-hover:scale-110 transition-all duration-500 shadow-soft">
                    <feat.icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <h3 className="font-sans-elegant text-sm font-bold text-foreground mb-2 tracking-wide">{feat.label}</h3>
                  <p className="font-serif-body text-sm text-muted-foreground leading-relaxed italic">{feat.desc}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== GALLERY PREVIEW ===== */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh" />
        <div className="absolute inset-0 bg-gradient-to-br from-background/30 via-transparent to-background/40" />
        <div className="floating-blob w-[450px] h-[450px] bg-lavender/20 top-[-60px] right-[-80px]" />
        <div className="floating-blob w-[300px] h-[300px] bg-primary/15 bottom-[-40px] left-[-60px]" />

        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <div className="inline-block px-5 py-2 rounded-full glass-card-strong mb-5 shadow-glass">
              <p className="font-sans-elegant text-xs tracking-[0.25em] uppercase text-muted-foreground font-medium">{t('nav.gallery')}</p>
            </div>
            <h2 className="font-serif-display text-3xl md:text-5xl text-foreground font-bold mb-4">{t('gallery.title')}</h2>
            <p className="font-serif-body text-lg text-muted-foreground italic max-w-md mx-auto">Captured moments of our love story</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {[heroImg, flowersImg, ringsImg, venueImg, coupleImg, cakeImg].map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`overflow-hidden rounded-2xl ${i === 0 ? 'md:col-span-2 md:row-span-2' : ''} group cursor-pointer glass-card-strong p-1.5 hover:shadow-card-hover transition-all duration-500 shadow-glass`}
              >
                <img src={img} alt="" className="w-full h-full object-cover aspect-square rounded-xl group-hover:scale-105 transition-transform duration-700" />
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mt-12">
            <Link to="/gallery" className="btn-primary px-9 py-4">
              {t('nav.gallery')} →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ===== CTA / RSVP ===== */}
      <section className="py-28 md:py-36 relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-background/40" />
        <div className="floating-blob w-[600px] h-[600px] bg-primary/22 top-[-120px] left-[-120px]" />
        <div className="floating-blob w-[450px] h-[450px] bg-lavender/20 bottom-[-100px] right-[-100px]" />
        <div className="floating-blob w-[250px] h-[250px] bg-blush/30 top-[50%] right-[30%]" />

        <div className="container mx-auto px-4 max-w-3xl relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="glass-card-strong rounded-full w-32 h-32 mx-auto mb-10 flex items-center justify-center overflow-hidden shadow-glass ring-4 ring-primary/10">
              <img src={ringsImg} alt="" className="w-full h-full object-cover" />
            </div>
            <h2 className="font-serif-display text-4xl md:text-6xl text-foreground font-bold mb-6">
              {t('rsvp.title')}
            </h2>
            <p className="font-serif-body text-lg md:text-xl text-muted-foreground leading-relaxed mb-12 max-w-lg mx-auto italic">
              {t('rsvp.subtitle')}
            </p>
            <Link to="/rsvp" className="btn-primary px-12 py-4 text-base">
              {t('hero.cta')}
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;
