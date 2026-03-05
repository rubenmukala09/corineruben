import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useMusic } from '@/components/MusicPlayer';
import { motion } from 'framer-motion';
import { ChevronDown, Heart, MapPin, Calendar, Clock, Utensils, Camera, Gift, Star, Sparkles, Play, Pause, Music, Users, Flower2, BookOpen, Cross } from 'lucide-react';

import heroImg from '@/assets/hero-wedding.jpg';
import flowersImg from '@/assets/flowers-lavender.jpg';
import ringsImg from '@/assets/rings.jpg';
import cakeImg from '@/assets/cake.jpg';
import coupleImg from '@/assets/couple-lavender.jpg';

const WEDDING_DATE = new Date('2027-08-15T14:00:00');

const Index = () => {
  const { t } = useLanguage();
  const { isPlaying, toggleMusic } = useMusic();
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
    { icon: MapPin, titleKey: 'details.ceremony', descKey: 'details.ceremony.location', img: cakeImg },
    { icon: Utensils, titleKey: 'details.reception', descKey: 'details.reception.location', img: ringsImg },
  ];

  const features = [
    { icon: Heart, label: t('nav.story'), desc: t('story.subtitle'), to: '/story' },
    { icon: Camera, label: t('nav.gallery'), desc: t('gallery.subtitle'), to: '/gallery' },
    { icon: Gift, label: t('nav.registry'), desc: t('registry.subtitle'), to: '/registry' },
    { icon: Clock, label: t('nav.rsvp'), desc: t('rsvp.subtitle'), to: '/rsvp' },
  ];

  const hymns = [
    { title: t('hymn.amazing'), duration: '4:32', img: flowersImg },
    { title: t('hymn.blessed'), duration: '3:15', img: ringsImg },
    { title: t('hymn.howgreat'), duration: '5:01', img: cakeImg },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* ===== HERO ===== */}
      <section className="w-full min-h-screen relative overflow-hidden flex flex-col items-center pt-8 pb-16">
        <div className="absolute inset-0 mix-blend-soft-light z-[1]">
          <img src={heroImg} alt="" className="w-full h-full object-cover opacity-[0.1]" style={{ filter: 'saturate(0.4) brightness(1.2)' }} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="flex flex-col items-center text-center max-w-3xl mx-auto mt-20 md:mt-28 z-20 px-6"
        >
          {/* Floating badge — Blessed Union */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2 }}
            className="absolute top-24 left-4 md:left-12 z-30 hidden md:block"
          >
            <motion.div animate={{ y: [-4, 6, -4] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="glass-card-strong rounded-full px-4 py-2 flex items-center gap-2"
            >
              <Cross className="w-3.5 h-3.5 text-primary" />
              <span className="font-sans-elegant text-[11px] font-bold text-foreground drop-shadow-sm">{t('badge.blessed')}</span>
            </motion.div>
          </motion.div>

          {/* Floating badge — Guests */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.4 }}
            className="absolute top-28 right-4 md:right-12 z-30 hidden md:block"
          >
            <motion.div animate={{ y: [5, -5, 5] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="glass-card-strong rounded-2xl px-4 py-2.5 flex items-center gap-2"
            >
              <Users className="w-3.5 h-3.5 text-primary" />
              <span className="font-sans-elegant text-[11px] font-bold text-foreground drop-shadow-sm">150+ {t('index.guestsInvited')}</span>
            </motion.div>
          </motion.div>

          {/* Top label */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-6 py-2.5 rounded-full glass-card-strong mb-6"
          >
            <p className="font-sans-elegant text-xs tracking-[0.3em] uppercase text-foreground/80 dark:text-foreground/90 font-semibold">
              {t('hero.tagline')}
            </p>
          </motion.div>

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

          <p className="font-sans-elegant text-lg md:text-xl text-foreground/70 dark:text-foreground/80 max-w-xl mb-8 font-medium" style={{ lineHeight: 1.6 }}>
            {t('hero.date')}
          </p>

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

        {/* ===== FLOATING CARDS ===== */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: 'easeOut' }}
          className="w-full max-w-6xl mx-auto mt-8 md:mt-12 relative z-20 px-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">

            {/* LEFT */}
            <div className="flex flex-col gap-4 items-center md:items-end md:translate-y-8">
              {/* Scripture card */}
              <motion.div
                animate={{ y: [-6, 8, -6] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="glass-card-strong rounded-3xl p-5 w-52"
              >
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="w-4 h-4 text-primary" />
                  <span className="font-sans-elegant text-[10px] font-bold text-foreground/70 tracking-wider uppercase">{t('index.scripture')}</span>
                </div>
                <p className="font-serif-display text-sm text-foreground italic leading-relaxed">
                  "{t('verse.1cor13')}"
                </p>
                <p className="font-sans-elegant text-[10px] text-muted-foreground mt-2 font-semibold">1 Corinthians 13:4-7</p>
              </motion.div>

              {/* Hymn player card */}
              <motion.div
                animate={{ y: [-8, 10, -8] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="glass-card-strong rounded-3xl p-4 flex items-center gap-3 cursor-pointer"
                onClick={toggleMusic}
              >
                <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                  <img src={hymns[0].img} alt="" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="font-sans-elegant text-sm font-bold text-foreground drop-shadow-sm">{hymns[0].title}</p>
                  <p className="font-sans-elegant text-xs text-foreground/60 font-medium">{hymns[0].duration}</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-background/80 dark:bg-background/40 flex items-center justify-center ml-1">
                  {isPlaying ? <Pause className="w-3 h-3 text-foreground fill-foreground" /> : <Play className="w-3 h-3 text-foreground fill-foreground" />}
                </div>
              </motion.div>
            </div>

            {/* CENTER — main countdown card */}
            <div className="flex justify-center z-30 relative">
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="glass-card-dark rounded-3xl p-6 w-full max-w-[260px] md:scale-105"
              >
                <p className="font-sans-elegant text-xs font-medium opacity-70 mb-2 tracking-[0.1em] uppercase">{t('index.sacredUnion')}</p>
                <p className="font-serif-display text-xl font-semibold mb-2">{t('index.covenantLove')}</p>
                <p className="font-sans-elegant text-xs opacity-60 mb-5" style={{ lineHeight: 1.5 }}>
                  {t('index.celebrationDesc')}
                </p>

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
                  <button onClick={toggleMusic} className="w-10 h-10 rounded-full bg-background/20 backdrop-blur-sm border border-background/30 flex items-center justify-center hover:bg-background/30 transition-colors">
                    {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                  </button>
                  <div className="w-10 h-10 rounded-full bg-background/20 backdrop-blur-sm border border-background/30 flex items-center justify-center">
                    <Music className="w-4 h-4" />
                  </div>
                  <div className="w-10 h-10 rounded-full bg-background/20 backdrop-blur-sm border border-background/30 flex items-center justify-center">
                    <Heart className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* RIGHT */}
            <div className="flex flex-col gap-4 items-center md:items-start md:-translate-y-6">
              <motion.div
                animate={{ y: [6, -8, 6] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                className="glass-card-strong rounded-full px-5 py-3 flex items-center gap-2"
              >
                <Heart className="w-4 h-4 text-dusty-rose fill-dusty-rose" />
                <span className="font-sans-elegant text-sm font-bold text-foreground drop-shadow-sm">{t('index.foreverAlways')}</span>
              </motion.div>

              {/* Hymn card 2 */}
              <motion.div
                animate={{ y: [-6, 10, -6] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="glass-card-strong rounded-3xl p-4 flex items-center gap-3 cursor-pointer"
                onClick={toggleMusic}
              >
                <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                  <img src={hymns[1].img} alt="" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="font-sans-elegant text-sm font-bold text-foreground drop-shadow-sm">{hymns[1].title}</p>
                  <p className="font-sans-elegant text-xs text-foreground/60 font-medium">{hymns[1].duration}</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-background/80 dark:bg-background/40 flex items-center justify-center ml-1">
                  <Play className="w-3 h-3 text-foreground fill-foreground" />
                </div>
              </motion.div>

              {/* Date card */}
              <motion.div
                animate={{ y: [-4, 8, -4] }}
                transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
                className="glass-card-strong rounded-3xl p-4 w-48"
              >
                <p className="font-sans-elegant text-xs text-foreground/60 font-medium mb-1">{t('hero.date')}</p>
                <p className="font-sans-elegant text-sm font-bold text-foreground drop-shadow-sm">{t('index.beginJourney')}</p>
                <p className="font-sans-elegant text-xs text-foreground/60 font-medium mt-1">{t('index.celebrationDesc')}</p>
              </motion.div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-auto pt-6 flex flex-col items-center gap-2 z-10"
        >
          <span className="font-sans-elegant text-xs tracking-wider text-muted-foreground">{t('hero.scroll')}</span>
          <ChevronDown className="w-4 h-4 text-muted-foreground animate-scroll-indicator" />
        </motion.div>
      </section>

      {/* ===== SCRIPTURE SECTION ===== */}
      <section className="py-16 md:py-20 relative">
        <div className="container mx-auto px-6 md:px-12 max-w-3xl relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="glass-card-strong rounded-3xl p-10 md:p-14">
              <BookOpen className="w-8 h-8 text-primary mx-auto mb-6" />
              <p className="font-serif-display text-xl md:text-2xl text-foreground italic leading-relaxed mb-4">
                "{t('verse.genesis')}"
              </p>
              <p className="font-sans-elegant text-sm text-muted-foreground font-semibold">Genesis 2:24</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== ABOUT / INTRO ===== */}
      <section className="py-16 md:py-24 relative">
        <div className="container mx-auto px-6 md:px-12 max-w-6xl relative z-10">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
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
                      <p className="font-sans-elegant text-sm font-bold text-foreground">4+ {t('index.years')}</p>
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

      {/* ===== HYMN PLAYLIST ===== */}
      <section className="py-16 md:py-20 relative">
        <div className="container mx-auto px-6 md:px-12 max-w-2xl relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <div className="inline-block px-5 py-2 rounded-full glass-card-strong mb-5">
              <p className="font-sans-elegant text-xs tracking-[0.25em] uppercase text-muted-foreground font-medium">{t('index.worshipMusic')}</p>
            </div>
            <h2 className="font-serif-display text-3xl md:text-4xl text-foreground font-semibold mb-3">{t('index.hymns')}</h2>
            <p className="font-sans-elegant text-sm text-muted-foreground">{t('index.hymns.desc')}</p>
          </motion.div>

          <div className="space-y-3">
            {[
              { title: t('hymn.amazing'), artist: t('hymn.traditional'), duration: '4:32', img: flowersImg },
              { title: t('hymn.blessed'), artist: t('hymn.traditional'), duration: '3:15', img: ringsImg },
              { title: t('hymn.howgreat'), artist: t('hymn.traditional'), duration: '5:01', img: cakeImg },
              { title: t('hymn.joyful'), artist: t('hymn.traditional'), duration: '3:48', img: coupleImg },
              { title: t('hymn.greatis'), artist: t('hymn.traditional'), duration: '4:15', img: heroImg },
            ].map((hymn, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                onClick={toggleMusic}
                className="glass-card-strong rounded-2xl p-4 flex items-center gap-4 card-hover cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                  <img src={hymn.img} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-sans-elegant text-sm font-bold text-foreground truncate">{hymn.title}</p>
                  <p className="font-sans-elegant text-xs text-muted-foreground">{hymn.artist}</p>
                </div>
                <span className="font-sans-elegant text-xs text-muted-foreground mr-2">{hymn.duration}</span>
                <div className="w-9 h-9 rounded-full glass-card flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play className="w-3.5 h-3.5 text-foreground fill-foreground" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HIGHLIGHTS CARDS ===== */}
      <section className="py-16 md:py-24 relative">
        <div className="container mx-auto px-6 md:px-12 max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-block px-5 py-2 rounded-full glass-card-strong mb-5">
              <p className="font-sans-elegant text-xs tracking-[0.25em] uppercase text-muted-foreground font-medium">{t('nav.details')}</p>
            </div>
            <h2 className="font-serif-display text-3xl md:text-5xl text-foreground font-semibold mb-4">{t('details.title')}</h2>
            <p className="font-sans-elegant text-lg text-muted-foreground max-w-lg mx-auto">{t('details.subtitle')}</p>
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
                <div className="glass-card-strong rounded-3xl overflow-hidden card-hover">
                  <div className="relative h-52 overflow-hidden">
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
      <section className="py-16 md:py-24 relative">
        <div className="container mx-auto px-6 md:px-12 max-w-5xl relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="flex flex-wrap gap-3 justify-center mb-8">
              {[
                { icon: Cross, text: t('badge.faith') },
                { icon: Flower2, text: t('badge.garden') },
                { icon: BookOpen, text: t('badge.covenant') },
              ].map((badge, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card-strong rounded-full px-4 py-2 flex items-center gap-2"
                >
                  <badge.icon className="w-3.5 h-3.5 text-primary" />
                  <span className="font-sans-elegant text-[11px] font-semibold text-foreground">{badge.text}</span>
                </motion.div>
              ))}
            </div>

            <p className="font-sans-elegant text-sm text-muted-foreground mb-4 tracking-wide">{t('index.joinCelebration')}</p>
            <h2 className="font-serif-display text-3xl md:text-5xl text-foreground font-semibold mb-4">
              {t('hero.tagline')}
            </h2>
            <p className="font-sans-elegant text-lg text-muted-foreground mb-12 max-w-md mx-auto">
              {t('index.celebrationDesc')}
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: countdown.days, label: t('countdown.days'), icon: '📅' },
              { value: '150+', label: t('index.guestsInvited'), icon: '👥' },
              { value: '5', label: t('index.courseDinner'), icon: '🍽️' },
              { value: '∞', label: t('index.love'), icon: '✝️' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card-strong rounded-3xl p-6 card-hover group"
              >
                <span className="text-2xl mb-2 block group-hover:scale-110 transition-transform duration-300">{stat.icon}</span>
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
            className="mt-10"
          >
            <Link to="/rsvp" className="btn-primary">
              {t('hero.cta')} →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ===== PRAYER / VERSE ===== */}
      <section className="py-16 md:py-20 relative">
        <div className="container mx-auto px-6 md:px-12 max-w-3xl relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="glass-card-strong rounded-3xl p-10 md:p-14">
              <Cross className="w-8 h-8 text-primary mx-auto mb-6" />
              <p className="font-serif-display text-xl md:text-2xl text-foreground italic leading-relaxed mb-4">
                "{t('verse.ecclesiastes')}"
              </p>
              <p className="font-sans-elegant text-sm text-muted-foreground font-semibold">Ecclesiastes 4:9-12</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== EXPLORE NAVIGATION ===== */}
      <section className="py-16 md:py-24 relative">
        <div className="container mx-auto px-6 md:px-12 max-w-5xl relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
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

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Link
                  to={feat.to}
                  className="glass-card-strong rounded-3xl p-7 flex flex-col items-center text-center card-hover group block h-full"
                >
                  <div className="w-14 h-14 rounded-3xl gradient-primary flex items-center justify-center mb-4 group-hover:shadow-glow group-hover:scale-110 transition-all duration-500 shadow-soft">
                    <feat.icon className="w-6 h-6 text-primary-foreground" />
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
      <section className="py-16 md:py-24 relative">
        <div className="container mx-auto px-6 md:px-12 max-w-6xl relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <div className="inline-block px-5 py-2 rounded-full glass-card-strong mb-5">
              <p className="font-sans-elegant text-xs tracking-[0.25em] uppercase text-muted-foreground font-medium">{t('nav.gallery')}</p>
            </div>
            <h2 className="font-serif-display text-3xl md:text-5xl text-foreground font-semibold mb-4">{t('gallery.title')}</h2>
            <p className="font-sans-elegant text-lg text-muted-foreground max-w-md mx-auto">{t('index.capturedMoments')}</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[heroImg, flowersImg, ringsImg, cakeImg, coupleImg].map((img, i) => (
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

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mt-10">
            <Link to="/gallery" className="btn-primary">
              {t('nav.gallery')} →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ===== CTA / RSVP ===== */}
      <section className="py-16 md:py-24 relative">
        <div className="container mx-auto px-6 md:px-12 max-w-3xl relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="glass-card-strong rounded-full w-28 h-28 mx-auto mb-8 flex items-center justify-center overflow-hidden ring-4 ring-primary/15">
              <img src={ringsImg} alt="Wedding rings" className="w-full h-full object-cover" />
            </div>
            <h2 className="font-serif-display text-4xl md:text-6xl text-foreground font-semibold mb-6">
              {t('rsvp.title')}
            </h2>
            <p className="font-sans-elegant text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-lg mx-auto">
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
