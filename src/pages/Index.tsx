import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useMusic } from '@/components/MusicPlayer';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Heart, MapPin, Calendar, Clock, Utensils, Gift, Sparkles, Play, Pause, Music, Users, Flower2, BookOpen, Cross, Church, Gem, PartyPopper, Hotel, Car, Check, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import heroImg from '@/assets/hero-wedding.jpg';
import flowersImg from '@/assets/flowers-lavender.jpg';
import flowersImgSmall from '@/assets/flowers-lavender-small.webp';
import ringsImg from '@/assets/rings.jpg';
import ringsImgSmall from '@/assets/rings-small.webp';
import cakeImg from '@/assets/cake.jpg';
import cakeImgSmall from '@/assets/cake-small.jpg';
import coupleImg from '@/assets/couple-lavender.jpg';
import coupleImgSmall from '@/assets/couple-lavender-small.webp';

const WEDDING_DATE = new Date('2027-08-15T14:00:00');

const giftTiers = [
  { amount: 60, emoji: '💐', labelKey: 'registry.tier.bouquet' },
  { amount: 100, emoji: '🥂', labelKey: 'registry.tier.toast' },
  { amount: 200, emoji: '✨', labelKey: 'registry.tier.sparkle' },
  { amount: 500, emoji: '💎', labelKey: 'registry.tier.diamond' },
];

/* Decorative aurora orb for section dividers */
const AuroraOrb = ({ 
  position = 'left', 
  color = 'rgba(201,169,182,0.3)', 
  size = 400, 
  delay = 0 
}: { position?: 'left' | 'right' | 'center'; color?: string; size?: number; delay?: number }) => {
  const posStyle = position === 'left' 
    ? { left: '-12%', top: '20%' } 
    : position === 'right' 
    ? { right: '-12%', top: '30%' } 
    : { left: '30%', top: '10%' };

  return (
    <motion.div
      className="absolute rounded-full pointer-events-none z-0"
      style={{
        width: size, height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        filter: 'blur(80px)',
        ...posStyle,
      }}
      animate={{ x: [0, 30, -20, 0], y: [0, -20, 15, 0], scale: [1, 1.08, 0.95, 1] }}
      transition={{ duration: 16 + delay, repeat: Infinity, ease: 'linear', delay }}
    />
  );
};

/* Floating hearts component */
const FloatingHearts = () =>
  <div className="fixed inset-0 pointer-events-none z-[5] overflow-hidden">
    {Array.from({ length: 12 }).map((_, i) =>
      <div
        key={i}
        className="absolute animate-float-heart text-primary/20"
        style={{
          left: `${8 + i * 7.5 % 85}%`,
          bottom: '-20px',
          '--duration': `${10 + i * 2}s`,
          '--delay': `${i * 1.5}s`,
          fontSize: `${12 + i % 4 * 6}px`
        } as React.CSSProperties}>
        ♥
      </div>
    )}
  </div>;

/* Falling petals component */
const FallingPetals = () =>
  <div className="absolute inset-0 pointer-events-none overflow-hidden z-[2]">
    {Array.from({ length: 8 }).map((_, i) =>
      <div
        key={i}
        className="absolute animate-petal-fall"
        style={{
          left: `${10 + i * 12 % 80}%`,
          top: '-30px',
          '--duration': `${14 + i * 2.5}s`,
          '--delay': `${i * 2}s`
        } as React.CSSProperties}>
        <span className="text-primary/15 text-lg">🌸</span>
      </div>
    )}
  </div>;

/* Section divider with decorative line */
const SectionDivider = ({ variant = 'heart' }: { variant?: 'heart' | 'sparkle' | 'line' }) => (
  <div className="relative py-8 flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0 flex items-center">
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
    </div>
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="relative z-10 bg-background/60 backdrop-blur-sm px-4 rounded-full"
    >
      {variant === 'heart' && <Heart className="w-5 h-5 text-primary/40 fill-primary/40" />}
      {variant === 'sparkle' && <Sparkles className="w-5 h-5 text-amber-400/60" />}
      {variant === 'line' && <span className="text-primary/30 text-xs">✦ ✦ ✦</span>}
    </motion.div>
  </div>
);

const Index = () => {
  const { t } = useLanguage();
  const { isPlaying, currentTrack, toggleTrack } = useMusic();
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [activeDetail, setActiveDetail] = useState<string | null>(null);

  // Gift dialog state
  const [giftOpen, setGiftOpen] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [giftFormOpen, setGiftFormOpen] = useState(false);
  const [giftName, setGiftName] = useState('');
  const [giftMessage, setGiftMessage] = useState('');
  const [giftSent, setGiftSent] = useState(false);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const diff = WEDDING_DATE.getTime() - now.getTime();
      if (diff <= 0) return;
      setCountdown({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor(diff / (1000 * 60 * 60) % 24),
        minutes: Math.floor(diff / (1000 * 60) % 60),
        seconds: Math.floor(diff / 1000 % 60)
      });
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSelectTier = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount('');
    setGiftOpen(false);
    setGiftFormOpen(true);
    setGiftSent(false);
  };

  const handleCustomGift = () => {
    const val = parseInt(customAmount);
    if (val && val > 0) {
      setSelectedAmount(val);
      setGiftOpen(false);
      setGiftFormOpen(true);
      setGiftSent(false);
    }
  };

  const handleSendGift = (e: React.FormEvent) => {
    e.preventDefault();
    setGiftSent(true);
    setTimeout(() => {
      setGiftFormOpen(false);
      setGiftSent(false);
      setGiftMessage('');
      setGiftName('');
      setSelectedAmount(null);
    }, 2000);
  };

  const features = [
    { icon: Heart, label: t('nav.story'), desc: t('story.subtitle'), to: '/story', color: 'text-rose-400', bg: 'from-rose-500/20 to-pink-500/10' },
    { icon: Clock, label: t('nav.rsvp'), desc: t('rsvp.subtitle'), to: '/rsvp', color: 'text-emerald-400', bg: 'from-emerald-500/20 to-teal-500/10' },
  ];

  const detailSections = [
    {
      id: 'ceremony',
      icon: Church,
      title: t('details.ceremony'),
      color: 'from-rose-500/20 to-pink-500/10',
      iconColor: 'text-rose-400',
      dialogContent: [
        { icon: Clock, label: t('details.ceremony.time'), desc: t('details.ceremony.program.welcome') },
        { icon: MapPin, label: t('details.ceremony.location'), desc: t('details.ceremony.address') },
        { icon: BookOpen, label: t('details.ceremony.program.readings'), desc: t('details.ceremony.program.readings.desc') },
        { icon: Gem, label: t('details.ceremony.program.vows'), desc: t('details.ceremony.program.vows.desc') },
        { icon: Music, label: t('details.ceremony.program.hymns'), desc: t('details.ceremony.program.hymns.desc') },
        { icon: Cross, label: t('details.ceremony.program.blessing'), desc: t('details.ceremony.program.blessing.desc') },
      ]
    },
    {
      id: 'reception',
      icon: PartyPopper,
      title: t('details.reception'),
      color: 'from-amber-500/20 to-orange-500/10',
      iconColor: 'text-amber-400',
      dialogContent: [
        { icon: Clock, label: t('details.reception.time'), desc: t('details.reception.program.cocktail') },
        { icon: MapPin, label: t('details.reception.location'), desc: t('details.reception.address') },
        { icon: Utensils, label: t('details.reception.program.dinner'), desc: t('details.reception.program.dinner.desc') },
        { icon: Music, label: t('details.reception.program.dance'), desc: t('details.reception.program.dance.desc') },
        { icon: Heart, label: t('details.reception.program.cake'), desc: t('details.reception.program.cake.desc') },
      ]
    },
    {
      id: 'accommodation',
      icon: Hotel,
      title: t('details.accommodation'),
      color: 'from-violet-500/20 to-purple-500/10',
      iconColor: 'text-violet-400',
      dialogContent: [
        { icon: Hotel, label: t('details.accommodation.hotel'), desc: t('details.accommodation.hotel.desc') },
        { icon: MapPin, label: t('details.accommodation.address'), desc: t('details.accommodation.address.desc') },
        { icon: Sparkles, label: t('details.accommodation.rate'), desc: t('details.accommodation.rate.desc') },
      ]
    },
    {
      id: 'transport',
      icon: Car,
      title: t('details.transport'),
      color: 'from-emerald-500/20 to-teal-500/10',
      iconColor: 'text-emerald-400',
      dialogContent: [
        { icon: Car, label: t('details.transport.shuttle'), desc: t('details.transport.shuttle.desc') },
        { icon: MapPin, label: t('details.transport.parking'), desc: t('details.transport.parking.desc') },
        { icon: Clock, label: t('details.transport.schedule'), desc: t('details.transport.schedule.desc') },
      ]
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Ambient floating hearts */}
      <FloatingHearts />

      {/* ===== FLOATING GIFT BUTTON ===== */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, type: 'spring' }}
        onClick={() => setGiftOpen(true)}
        className="fixed bottom-8 right-8 z-40 w-14 h-14 rounded-full gradient-primary shadow-glow flex items-center justify-center hover:scale-110 transition-transform duration-300 group"
        aria-label="Gift"
      >
        <Gift className="w-6 h-6 text-primary-foreground group-hover:rotate-12 transition-transform duration-300" />
        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 animate-pulse" />
      </motion.button>

      {/* ===== HERO ===== */}
      <section className="w-full min-h-screen relative overflow-hidden flex flex-col items-center pt-8 pb-16">
        <FallingPetals />

        {/* Hero aurora orbs */}
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full pointer-events-none z-[1]"
          style={{ top: '5%', left: '-8%', background: 'radial-gradient(circle, rgba(212,165,200,0.35) 0%, transparent 70%)', filter: 'blur(80px)' }}
          animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0], scale: [1, 1.15, 0.95, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full pointer-events-none z-[1]"
          style={{ top: '30%', right: '-10%', background: 'radial-gradient(circle, rgba(180,140,210,0.3) 0%, transparent 70%)', filter: 'blur(90px)' }}
          animate={{ x: [0, -50, 30, 0], y: [0, 40, -25, 0], scale: [1, 1.1, 0.9, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear', delay: 3 }}
        />
        <motion.div
          className="absolute w-[350px] h-[350px] rounded-full pointer-events-none z-[1]"
          style={{ bottom: '10%', left: '25%', background: 'radial-gradient(circle, rgba(232,196,184,0.4) 0%, transparent 70%)', filter: 'blur(100px)' }}
          animate={{ x: [0, 30, -40, 0], y: [0, -20, 35, 0], scale: [1, 1.08, 0.92, 1] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'linear', delay: 5 }}
        />
        <motion.div
          className="absolute w-[300px] h-[300px] rounded-full pointer-events-none z-[1]"
          style={{ top: '60%', right: '15%', background: 'radial-gradient(circle, rgba(201,169,182,0.3) 0%, transparent 70%)', filter: 'blur(70px)' }}
          animate={{ x: [0, -30, 20, 0], y: [0, 25, -15, 0], scale: [1, 1.12, 0.88, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear', delay: 7 }}
        />
        {/* Shimmer light streak */}
        <div className="absolute top-0 left-0 right-0 h-[1px] z-[2] overflow-hidden">
          <motion.div
            className="h-full w-1/3"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(212,196,224,0.6), transparent)' }}
            animate={{ x: ['-100%', '400%'] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', repeatDelay: 4 }}
          />
        </div>

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
              className="glass-card-strong rounded-full px-4 py-2 flex items-center gap-2">
              <Cross className="w-3.5 h-3.5 text-rose-400 icon-glow" />
              <span className="font-sans-elegant text-[11px] font-bold text-foreground drop-shadow-sm">{t('badge.blessed')}</span>
            </motion.div>
          </motion.div>

          {/* Floating badge — Soulmates */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.4 }}
            className="absolute top-28 right-4 md:right-12 z-30 hidden md:block"
          >
            <motion.div animate={{ y: [5, -5, 5] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="glass-card-strong rounded-2xl px-4 py-2.5 flex items-center gap-2">
              <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400 icon-glow" />
              <span className="font-sans-elegant text-[11px] font-bold text-foreground drop-shadow-sm">{t('love.soulmates')}</span>
            </motion.div>
          </motion.div>

          {/* Love tagline label */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-6 py-2.5 rounded-full glass-card-strong mb-6"
          >
            <p className="font-sans-elegant text-xs tracking-[0.3em] uppercase text-foreground/80 dark:text-foreground/90 font-semibold">
              {t('love.tagline')}
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
            <span className="inline-flex items-center justify-center w-16 h-16 rounded-full gradient-primary shadow-glow animate-pulse-love">
              <Heart className="w-7 h-7 text-primary-foreground fill-primary-foreground" />
            </span>
          </motion.div>
          <h1 className="font-serif-display text-5xl md:text-7xl lg:text-8xl font-semibold text-foreground mb-6 leading-tight">
            Ruben
          </h1>

          {/* Romantic subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="font-serif-display text-lg md:text-xl text-primary italic mb-2"
          >
            {t('love.together')}
          </motion.p>

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
              <Heart className="w-4 h-4 fill-current" />
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
          className="w-full max-w-6xl mx-auto mt-6 md:mt-10 relative z-20 px-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">

            {/* LEFT */}
            <div className="flex flex-col gap-4 items-center md:items-end md:translate-y-8">
              <motion.div
                animate={{ y: [-6, 8, -6] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="glass-card-strong rounded-3xl p-5 w-52"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Heart className="w-4 h-4 text-rose-400 fill-rose-400 icon-glow" />
                  <span className="font-sans-elegant text-[10px] font-bold text-foreground/70 tracking-wider uppercase">{t('love.loveStory')}</span>
                </div>
                <p className="font-serif-display text-sm text-foreground italic leading-relaxed">
                  "{t('verse.1cor13')}"
                </p>
                <p className="font-sans-elegant text-[10px] text-muted-foreground mt-2 font-semibold">1 Corinthians 13:4-7</p>
              </motion.div>

              <motion.div
                animate={{ y: [-8, 10, -8] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="glass-card-strong rounded-3xl p-4 flex items-center gap-3 cursor-pointer"
                onClick={() => toggleTrack('amazing-grace')}
              >
                <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 ring-2 ring-rose-400/20">
                  <img src={flowersImgSmall} alt="" className="w-full h-full object-cover" width={48} height={48} loading="lazy" decoding="async" />
                </div>
                <div>
                  <p className="font-sans-elegant text-sm font-bold text-foreground drop-shadow-sm">{t('hymn.amazing')}</p>
                  <p className="font-sans-elegant text-xs text-foreground/60 font-medium">Instrumental · 4:32</p>
                </div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ml-1 transition-all duration-300 ${currentTrack === 'amazing-grace' && isPlaying ? 'gradient-primary shadow-glow' : 'bg-background/80 dark:bg-background/40'}`}>
                  {currentTrack === 'amazing-grace' && isPlaying ? <Pause className="w-3 h-3 text-primary-foreground fill-primary-foreground" /> : <Play className="w-3 h-3 text-foreground fill-foreground" />}
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
                <div className="flex items-center gap-2 mb-2">
                  <Heart className="w-4 h-4 text-rose-300 fill-rose-300 animate-pulse-love" />
                  <p className="font-sans-elegant text-xs font-medium opacity-80 tracking-[0.1em] uppercase">{t('love.together')}</p>
                </div>
                <p className="font-serif-display text-xl font-semibold mb-2">{t('index.covenantLove')}</p>
                <p className="font-sans-elegant text-xs opacity-60 mb-5" style={{ lineHeight: 1.5 }}>
                  {t('love.countdownLabel')}
                </p>

                <div className="grid grid-cols-4 gap-2 mb-5">
                  {[
                    { value: countdown.days, label: t('countdown.days') },
                    { value: countdown.hours, label: t('countdown.hours') },
                    { value: countdown.minutes, label: t('countdown.minutes') },
                    { value: countdown.seconds, label: t('countdown.seconds') },
                  ].map((item) =>
                    <div key={item.label} className="text-center">
                      <span className="font-serif-display text-xl font-semibold block">
                        {String(item.value).padStart(2, '0')}
                      </span>
                      <span className="font-sans-elegant text-[8px] tracking-[0.1em] uppercase opacity-60 block mt-0.5">
                        {item.label}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <button aria-label="Play Oceans by Hillsong" onClick={() => toggleTrack('oceans-hillsong')} className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${currentTrack === 'oceans-hillsong' && isPlaying ? 'bg-white/30 shadow-glow' : 'bg-background/20 backdrop-blur-sm border border-background/30 hover:bg-background/30'}`}>
                    {currentTrack === 'oceans-hillsong' && isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                  </button>
                  <div className="w-10 h-10 rounded-full bg-background/20 backdrop-blur-sm border border-background/30 flex items-center justify-center">
                    <Music className="w-4 h-4" />
                  </div>
                  <div className="w-10 h-10 rounded-full bg-background/20 backdrop-blur-sm border border-background/30 flex items-center justify-center animate-pulse-love">
                    <Heart className="w-4 h-4 fill-current" />
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
                <Heart className="w-4 h-4 text-rose-400 fill-rose-400 icon-glow animate-pulse-love" />
                <span className="font-sans-elegant text-sm font-bold text-foreground drop-shadow-sm">{t('index.foreverAlways')}</span>
              </motion.div>

              <motion.div
                animate={{ y: [-6, 10, -6] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="glass-card-strong rounded-3xl p-4 flex items-center gap-3 cursor-pointer"
                onClick={() => toggleTrack('blessed-larson')}
              >
                <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 ring-2 ring-violet-400/20">
                  <img src={ringsImgSmall} alt="" className="w-full h-full object-cover" width={48} height={48} loading="lazy" decoding="async" />
                </div>
                <div>
                  <p className="font-sans-elegant text-sm font-bold text-foreground drop-shadow-sm">I Have Been Blessed</p>
                  <p className="font-sans-elegant text-xs text-foreground/60 font-medium">Joseph Larson</p>
                </div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ml-1 transition-all duration-300 ${currentTrack === 'blessed-larson' && isPlaying ? 'gradient-primary shadow-glow' : 'bg-background/80 dark:bg-background/40'}`}>
                  {currentTrack === 'blessed-larson' && isPlaying ? <Pause className="w-3 h-3 text-primary-foreground fill-primary-foreground" /> : <Play className="w-3 h-3 text-foreground fill-foreground" />}
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [-4, 8, -4] }}
                transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
                className="glass-card-strong rounded-3xl p-4 w-48"
              >
                <div className="flex items-center gap-1.5 mb-1.5">
                  <Sparkles className="w-3 h-3 text-amber-400 icon-glow" />
                  <p className="font-sans-elegant text-xs text-foreground/60 font-medium">{t('hero.date')}</p>
                </div>
                <p className="font-sans-elegant text-sm font-bold text-foreground drop-shadow-sm">{t('index.beginJourney')}</p>
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

      {/* ===== DIVIDER ===== */}
      <SectionDivider variant="heart" />

      {/* ===== LOVE QUOTE — Romantic Divider ===== */}
      <section className="py-12 md:py-16 relative overflow-hidden">
        <AuroraOrb position="right" color="rgba(180,140,210,0.25)" size={350} delay={2} />
        <div className="container mx-auto px-6 md:px-12 max-w-3xl relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="glass-card-strong rounded-3xl p-10 md:p-14 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-gradient-to-br from-rose-400/10 to-violet-400/10 blur-2xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-gradient-to-tr from-pink-400/10 to-rose-400/10 blur-2xl pointer-events-none" />
              
              <div className="love-divider mb-6">
                <Heart className="w-6 h-6 text-rose-400 fill-rose-400 icon-glow animate-pulse-love" />
              </div>
              
              <p className="font-serif-display text-xl md:text-2xl text-foreground italic leading-relaxed mb-4">
                {t('love.quote1')}
              </p>
              <p className="font-sans-elegant text-sm text-muted-foreground font-semibold">{t('love.quote1.ref')}</p>
              
              <div className="love-divider mt-6">
                <Heart className="w-4 h-4 text-primary/40 fill-primary/40" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== DIVIDER ===== */}
      <SectionDivider variant="sparkle" />

      {/* ===== ABOUT / LOVE STORY INTRO ===== */}
      <section className="py-14 md:py-20 relative overflow-hidden">
        <AuroraOrb position="left" color="rgba(212,165,200,0.3)" size={450} delay={0} />
        <AuroraOrb position="right" color="rgba(232,196,184,0.25)" size={350} delay={4} />
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
                    src={coupleImgSmall}
                    alt="Corine & Ruben"
                    className="rounded-[20px] w-full object-cover aspect-[4/5]"
                    style={{ boxShadow: '0 20px 40px rgba(107, 78, 113, 0.15)' }}
                    width={474}
                    height={593}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <motion.div
                  animate={{ y: [-8, 8, -8] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-6 -right-6 glass-card-strong rounded-3xl p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center shadow-soft animate-pulse-love">
                      <Heart className="w-5 h-5 text-primary-foreground fill-primary-foreground" />
                    </div>
                    <div>
                      <p className="font-sans-elegant text-sm font-bold text-foreground">___+ {t('index.years')}</p>
                      <p className="font-sans-elegant text-[10px] text-muted-foreground">{t('love.together')}</p>
                    </div>
                  </div>
                </motion.div>
                <motion.div
                  animate={{ y: [6, -6, 6] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-4 -left-4 glass-card rounded-3xl px-4 py-2.5 hidden md:block"
                >
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400 icon-glow" />
                    <span className="font-sans-elegant text-xs font-semibold text-foreground">{t('love.loveStory')}</span>
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
              <h2 className="font-serif-display text-3xl md:text-5xl text-foreground mb-4 font-semibold">
                {t('story.title')}
              </h2>
              <p className="font-serif-display text-lg text-primary italic mb-6">{t('love.tagline')}</p>
              <div className="glass-card rounded-3xl p-6 mb-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 rounded-full bg-gradient-to-br from-rose-400/8 to-violet-400/5 blur-xl pointer-events-none" />
                <p className="font-sans-elegant text-base text-muted-foreground leading-relaxed relative z-10">
                  {t('love.intro')}
                </p>
              </div>
              <div className="glass-card rounded-3xl p-6 mb-6 relative overflow-hidden border-l-4 border-primary/30">
                <p className="font-serif-display text-lg text-foreground italic leading-relaxed">
                  {t('love.loveStory.desc')}
                </p>
                <div className="flex items-center gap-2 mt-3">
                  <Heart className="w-3 h-3 text-rose-400 fill-rose-400" />
                  <span className="font-sans-elegant text-xs text-muted-foreground font-medium">Corine & Ruben</span>
                </div>
              </div>
              <Link to="/story" className="btn-primary">
                <Heart className="w-4 h-4 fill-current" />
                {t('nav.story')} →
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== DIVIDER ===== */}
      <SectionDivider variant="line" />

      {/* ===== SCRIPTURE — Love is Patient ===== */}
      <section className="py-14 md:py-18 relative overflow-hidden">
        <AuroraOrb position="center" color="rgba(139,107,138,0.2)" size={400} delay={3} />
        <div className="container mx-auto px-6 md:px-12 max-w-3xl relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="glass-card-strong rounded-3xl p-10 md:p-14 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-gradient-to-br from-rose-400/10 to-violet-400/10 blur-2xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-gradient-to-tr from-amber-400/10 to-pink-400/10 blur-2xl pointer-events-none" />
              <BookOpen className="w-8 h-8 text-amber-400 icon-glow mx-auto mb-6" />
              <p className="font-serif-display text-xl md:text-2xl text-foreground italic leading-relaxed mb-4">
                "{t('verse.genesis')}"
              </p>
              <p className="font-sans-elegant text-sm text-muted-foreground font-semibold">Genesis 2:24</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== DIVIDER ===== */}
      <SectionDivider variant="heart" />

      {/* ===== FAITH & GRACE WIDGETS ===== */}
      <section className="py-14 md:py-18 relative overflow-hidden">
        <AuroraOrb position="left" color="rgba(180,140,210,0.2)" size={500} delay={1} />
        <AuroraOrb position="right" color="rgba(212,165,165,0.2)" size={380} delay={6} />
        <div className="container mx-auto px-6 md:px-12 max-w-5xl relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <div className="inline-block px-5 py-2 rounded-full glass-card-strong mb-5">
              <p className="font-sans-elegant text-xs tracking-[0.25em] uppercase text-muted-foreground font-medium">{t('badge.faith')}</p>
            </div>
            <h2 className="font-serif-display text-3xl md:text-4xl text-foreground font-semibold mb-3">{t('index.foundedOnFaith')}</h2>
            <p className="font-sans-elegant text-base text-muted-foreground max-w-md mx-auto">{t('love.promise.desc')}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="glass-card-strong rounded-3xl overflow-hidden md:row-span-2 card-hover">
              <div className="relative h-full min-h-[300px]">
                <img src={flowersImgSmall} alt="" className="w-full h-full object-cover" width={297} height={428} loading="lazy" decoding="async" />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <Heart className="w-5 h-5 text-rose-300 fill-rose-300 icon-glow mb-3 animate-pulse-love" />
                  <p className="font-serif-display text-base text-white italic leading-relaxed mb-2">
                    "{t('verse.proverbs')}"
                  </p>
                  <p className="font-sans-elegant text-xs text-white/70 font-semibold">Proverbs 3:5-6</p>
                </div>
              </div>
            </motion.div>

            {[
              { icon: Church, title: t('index.ceremony'), desc: t('index.ceremony.desc'), color: 'from-rose-500/20 to-pink-500/10', iconColor: 'text-rose-400' },
              { icon: Cross, title: t('index.blessing'), desc: t('index.blessing.desc'), color: 'from-violet-500/20 to-purple-500/10', iconColor: 'text-violet-400' },
              { icon: Gem, title: t('index.vows'), desc: t('index.vows.desc'), color: 'from-amber-500/20 to-orange-500/10', iconColor: 'text-amber-400' },
              { icon: Users, title: t('index.fellowship'), desc: t('index.fellowship.desc'), color: 'from-emerald-500/20 to-teal-500/10', iconColor: 'text-emerald-400' },
            ].map((item, i) =>
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 + i * 0.05 }}
                className="glass-card-strong rounded-3xl p-6 card-hover relative overflow-hidden">
                <div className={`absolute top-0 right-0 w-24 h-24 rounded-full bg-gradient-to-br ${item.color} blur-xl pointer-events-none`} />
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4`}>
                  <item.icon className={`w-6 h-6 ${item.iconColor} icon-glow`} />
                </div>
                <h3 className="font-serif-display text-lg text-foreground font-semibold mb-2">{item.title}</h3>
                <p className="font-sans-elegant text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* ===== DIVIDER ===== */}
      <SectionDivider variant="sparkle" />

      {/* ===== LOVE GALLERY STRIP ===== */}
      <section className="py-10 md:py-14 relative overflow-hidden">
        <AuroraOrb position="center" color="rgba(232,196,184,0.25)" size={450} delay={2} />
        <div className="container mx-auto px-6 md:px-12 max-w-6xl relative z-10">
          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-6">
            <div className="love-divider mb-3">
              <Heart className="w-5 h-5 text-rose-400 fill-rose-400 icon-glow" />
            </div>
            <p className="font-serif-display text-lg text-primary italic">{t('index.capturedMoments')}</p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { img: heroImg, label: '♥' },
              { img: cakeImgSmall, label: '🌸' },
              { img: ringsImgSmall, label: '💍' },
              { img: coupleImgSmall, label: '♥' },
            ].map((item, i) =>
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass-card-strong rounded-3xl p-1.5 overflow-hidden card-hover"
              >
                <div className="relative rounded-[20px] overflow-hidden aspect-square group">
                  <img src={item.img} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" width={241} height={241} loading="lazy" decoding="async" />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 to-transparent flex items-end justify-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="text-2xl">{item.label}</span>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* ===== DIVIDER ===== */}
      <SectionDivider variant="line" />

      {/* ===== WEDDING DETAILS — Interactive Cards ===== */}
      <section className="py-14 md:py-20 relative overflow-hidden">
        <AuroraOrb position="left" color="rgba(201,169,182,0.25)" size={400} delay={0} />
        <AuroraOrb position="right" color="rgba(180,140,210,0.2)" size={350} delay={5} />
        <div className="container mx-auto px-6 md:px-12 max-w-4xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <div className="inline-block px-5 py-2 rounded-full glass-card-strong mb-5">
              <p className="font-sans-elegant text-xs tracking-[0.25em] uppercase text-muted-foreground font-medium">{t('nav.details')}</p>
            </div>
            <h2 className="font-serif-display text-3xl md:text-5xl text-foreground font-semibold mb-4">{t('details.title')}</h2>
            <p className="font-sans-elegant text-lg text-muted-foreground max-w-lg mx-auto">{t('details.subtitle')}</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {detailSections.map((section, i) =>
              <motion.button
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.04, y: -4 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setActiveDetail(section.id)}
                className="glass-card-strong rounded-3xl p-6 card-hover group text-center relative overflow-hidden cursor-pointer"
              >
                <div className={`absolute top-0 right-0 w-20 h-20 rounded-full bg-gradient-to-br ${section.color} blur-xl pointer-events-none opacity-60`} />
                <div className={`w-14 h-14 rounded-3xl bg-gradient-to-br ${section.color} flex items-center justify-center mb-4 mx-auto group-hover:shadow-glow transition-shadow duration-500 shadow-soft`}>
                  <section.icon className={`w-6 h-6 ${section.iconColor} icon-glow`} />
                </div>
                <h3 className="font-serif-display text-base text-foreground font-semibold">{section.title}</h3>
                <p className="font-sans-elegant text-[11px] text-muted-foreground mt-1.5">{t('details.tapToSee')}</p>
              </motion.button>
            )}
          </div>
        </div>
      </section>

      {/* ===== DIVIDER ===== */}
      <SectionDivider variant="heart" />

      {/* ===== LOVE STATS ===== */}
      <section className="py-14 md:py-20 relative overflow-hidden">
        <AuroraOrb position="center" color="rgba(212,165,200,0.2)" size={500} delay={3} />
        <div className="container mx-auto px-6 md:px-12 max-w-5xl relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="love-divider mb-6">
              <Heart className="w-6 h-6 text-rose-400 fill-rose-400 icon-glow animate-pulse-love" />
            </div>

            <p className="font-sans-elegant text-sm text-muted-foreground mb-4 tracking-wide">{t('love.joinUs')}</p>
            <h2 className="font-serif-display text-3xl md:text-5xl text-foreground font-semibold mb-4">
              {t('hero.tagline')}
            </h2>
            <p className="font-sans-elegant text-lg text-muted-foreground mb-10 max-w-md mx-auto">
              {t('index.celebrationDesc')}
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: countdown.days, label: t('countdown.days'), icon: Calendar, color: 'text-pink-400' },
              { value: '___', label: t('index.guestsInvited'), icon: Users, color: 'text-violet-400' },
              { value: '___', label: t('index.courseDinner'), icon: Utensils, color: 'text-amber-400' },
              { value: '∞', label: t('index.love'), icon: Heart, color: 'text-rose-400' },
            ].map((stat, i) =>
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card-strong rounded-3xl p-6 card-hover group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-16 h-16 rounded-full bg-gradient-to-br from-current/5 to-transparent blur-xl pointer-events-none" />
                <stat.icon className={`w-6 h-6 ${stat.color} icon-glow mb-3 mx-auto group-hover:scale-110 transition-transform duration-300 ${stat.color === 'text-rose-400' ? 'fill-rose-400 animate-pulse-love' : ''}`} />
                <span className="font-serif-display text-3xl md:text-4xl font-semibold gradient-text block mb-2">
                  {typeof stat.value === 'number' ? String(stat.value).padStart(2, '0') : stat.value}
                </span>
                <span className="font-sans-elegant text-xs tracking-[0.12em] uppercase text-muted-foreground font-medium">{stat.label}</span>
              </motion.div>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-10"
          >
            <Link to="/rsvp" className="btn-primary">
              <Heart className="w-4 h-4 fill-current" />
              {t('hero.cta')} →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ===== DIVIDER ===== */}
      <SectionDivider variant="sparkle" />

      {/* ===== PRAYER / VERSE ===== */}
      <section className="py-12 md:py-16 relative overflow-hidden">
        <AuroraOrb position="left" color="rgba(139,107,138,0.2)" size={380} delay={2} />
        <div className="container mx-auto px-6 md:px-12 max-w-3xl relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="glass-card-strong rounded-3xl p-10 md:p-14 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-40 h-40 rounded-full bg-gradient-to-br from-violet-400/8 to-transparent blur-2xl pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-32 h-32 rounded-full bg-gradient-to-tl from-rose-400/8 to-transparent blur-2xl pointer-events-none" />
              <Cross className="w-8 h-8 text-rose-400 icon-glow mx-auto mb-6" />
              <p className="font-serif-display text-xl md:text-2xl text-foreground italic leading-relaxed mb-4">
                "{t('verse.ecclesiastes')}"
              </p>
              <p className="font-sans-elegant text-sm text-muted-foreground font-semibold">Ecclesiastes 4:9-12</p>
              <div className="love-divider mt-6">
                <Heart className="w-4 h-4 text-primary/40 fill-primary/40" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== DIVIDER ===== */}
      <SectionDivider variant="line" />

      {/* ===== LOVE PROMISE SECTION ===== */}
      <section className="py-14 md:py-20 relative overflow-hidden">
        <AuroraOrb position="right" color="rgba(212,165,200,0.25)" size={420} delay={1} />
        <AuroraOrb position="left" color="rgba(232,196,184,0.2)" size={350} delay={5} />
        <div className="container mx-auto px-6 md:px-12 max-w-4xl relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
            <div className="glass-card-strong rounded-3xl p-10 md:p-16 relative overflow-hidden">
              <div className="absolute top-4 left-4 text-6xl opacity-[0.06] text-primary">♥</div>
              <div className="absolute bottom-4 right-4 text-6xl opacity-[0.06] text-primary">♥</div>
              <div className="absolute top-4 right-10 text-3xl opacity-[0.04] text-primary">♥</div>
              <div className="absolute bottom-4 left-10 text-3xl opacity-[0.04] text-primary">♥</div>

              <div className="love-divider mb-6">
                <Heart className="w-6 h-6 text-rose-400 fill-rose-400 icon-glow animate-pulse-love" />
              </div>

              <h2 className="font-serif-display text-3xl md:text-4xl text-foreground font-semibold mb-4">{t('love.promise')}</h2>
              <p className="font-sans-elegant text-base md:text-lg text-muted-foreground leading-relaxed max-w-lg mx-auto mb-8">
                {t('love.promise.desc')}
              </p>

              <div className="flex flex-wrap justify-center gap-3 mb-8">
                {['💕', '🌹', '💒', '🕊️', '✨'].map((emoji, i) =>
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="text-2xl"
                  >
                    {emoji}
                  </motion.span>
                )}
              </div>

              <div className="love-divider">
                <Heart className="w-4 h-4 text-primary/40 fill-primary/40" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== DIVIDER ===== */}
      <SectionDivider variant="heart" />

      {/* ===== EXPLORE NAVIGATION ===== */}
      <section className="py-14 md:py-20 relative overflow-hidden">
        <AuroraOrb position="center" color="rgba(180,140,210,0.2)" size={400} delay={4} />
        <div className="container mx-auto px-6 md:px-12 max-w-5xl relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
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

          <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {features.map((feat, i) =>
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Link
                  to={feat.to}
                  className="glass-card-strong rounded-3xl p-7 flex flex-col items-center text-center card-hover group block h-full relative overflow-hidden"
                >
                  <div className={`absolute top-0 right-0 w-20 h-20 rounded-full bg-gradient-to-br ${feat.bg} blur-xl pointer-events-none`} />
                  <div className={`w-14 h-14 rounded-3xl bg-gradient-to-br ${feat.bg} flex items-center justify-center mb-4 group-hover:shadow-glow group-hover:scale-110 transition-all duration-500`}>
                    <feat.icon className={`w-6 h-6 ${feat.color} icon-glow`} />
                  </div>
                  <h3 className="font-serif-display text-lg font-semibold text-foreground mb-2">{feat.label}</h3>
                  <p className="font-sans-elegant text-sm text-muted-foreground leading-relaxed">{feat.desc}</p>
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* ===== DIVIDER ===== */}
      <SectionDivider variant="sparkle" />

      {/* ===== CTA / RSVP ===== */}
      <section className="py-14 md:py-20 relative overflow-hidden">
        <AuroraOrb position="left" color="rgba(212,165,200,0.3)" size={400} delay={0} />
        <AuroraOrb position="right" color="rgba(139,107,138,0.2)" size={350} delay={6} />
        <div className="container mx-auto px-6 md:px-12 max-w-3xl relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="glass-card-strong rounded-full w-28 h-28 mx-auto mb-8 flex items-center justify-center overflow-hidden ring-4 ring-primary/15 relative">
              <img src={ringsImgSmall} alt="Wedding rings" className="w-full h-full object-cover" width={112} height={112} loading="lazy" decoding="async" />
              <div className="absolute inset-0 flex items-center justify-center bg-foreground/20" />
            </div>

            <div className="love-divider mb-6">
              <Heart className="w-5 h-5 text-rose-400 fill-rose-400 icon-glow" />
            </div>

            <h2 className="font-serif-display text-4xl md:text-6xl text-foreground font-semibold mb-4">
              {t('rsvp.title')}
            </h2>
            <p className="font-serif-display text-lg text-primary italic mb-2">{t('love.tagline')}</p>
            <p className="font-sans-elegant text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-lg mx-auto">
              {t('rsvp.subtitle')}
            </p>
            <Link to="/rsvp" className="btn-primary text-base">
              <Heart className="w-5 h-5 fill-current" />
              {t('hero.cta')}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ===== DETAIL DIALOGS ===== */}
      {detailSections.map((section) =>
        <Dialog key={section.id} open={activeDetail === section.id} onOpenChange={(open) => !open && setActiveDetail(null)}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <div className={`w-14 h-14 rounded-3xl bg-gradient-to-br ${section.color} flex items-center justify-center mb-3 mx-auto`}>
                <section.icon className={`w-6 h-6 ${section.iconColor}`} />
              </div>
              <DialogTitle className="font-serif-display text-2xl text-center">{section.title}</DialogTitle>
              <DialogDescription className="font-sans-elegant text-center text-muted-foreground">
                {t('details.subtitle')}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-3 pt-2">
              {section.dialogContent.map((item, j) =>
                <motion.div
                  key={j}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: j * 0.06 }}
                  className="glass-card rounded-2xl p-4 flex items-start gap-3"
                >
                  <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${section.color} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                    <item.icon className={`w-4 h-4 ${section.iconColor}`} />
                  </div>
                  <div>
                    <p className="font-sans-elegant text-sm font-semibold text-foreground">{item.label}</p>
                    <p className="font-sans-elegant text-xs text-muted-foreground mt-0.5" style={{ lineHeight: 1.5 }}>{item.desc}</p>
                  </div>
                </motion.div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* ===== GIFT PICKER DIALOG ===== */}
      <Dialog open={giftOpen} onOpenChange={setGiftOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mx-auto mb-3 shadow-glow">
              <Gift className="w-7 h-7 text-primary-foreground" />
            </div>
            <DialogTitle className="font-serif-display text-2xl text-center">{t('registry.title')}</DialogTitle>
            <DialogDescription className="font-sans-elegant text-center text-muted-foreground">
              {t('registry.message')}
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-3 pt-2">
            {giftTiers.map((tier, i) =>
              <motion.button
                key={tier.amount}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleSelectTier(tier.amount)}
                className="glass-card rounded-2xl p-5 text-center card-hover group"
              >
                <div className="text-2xl mb-2">{tier.emoji}</div>
                <div className="font-serif-display text-xl text-foreground font-bold">${tier.amount}</div>
                <div className="font-sans-elegant text-[10px] text-muted-foreground font-medium mt-1">{t(tier.labelKey)}</div>
              </motion.button>
            )}
          </div>

          <div className="flex gap-3 pt-2">
            <div className="relative flex-1">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-sans-elegant text-sm">$</span>
              <Input
                type="number"
                min="1"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                placeholder={t('registry.custom.placeholder')}
                className="font-sans-elegant rounded-full h-11 pl-8 border-border/50 bg-background/50 backdrop-blur-sm"
              />
            </div>
            <button onClick={handleCustomGift} className="btn-primary px-5 rounded-full text-sm">
              <Gift className="w-4 h-4" />
              {t('registry.give')}
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* ===== GIFT FORM DIALOG ===== */}
      <Dialog open={giftFormOpen} onOpenChange={setGiftFormOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif-display text-2xl text-center">{t('registry.dialog.title')}</DialogTitle>
            <DialogDescription className="font-sans-elegant text-center text-muted-foreground">
              {t('registry.dialog.subtitle')}
            </DialogDescription>
          </DialogHeader>

          <AnimatePresence mode="wait">
            {giftSent ?
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-8 text-center"
              >
                <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4 shadow-glow">
                  <Check className="w-7 h-7 text-primary-foreground" />
                </div>
                <p className="font-sans-elegant text-foreground font-semibold">{t('registry.dialog.thanks')}</p>
                <div className="love-divider mt-4">
                  <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
                </div>
              </motion.div> :
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onSubmit={handleSendGift}
                className="space-y-5 pt-2"
              >
                <div className="glass-card rounded-2xl p-5 text-center">
                  <p className="font-sans-elegant text-xs text-muted-foreground mb-1">{t('registry.dialog.amount')}</p>
                  <p className="font-serif-display text-3xl text-foreground font-bold">${selectedAmount}</p>
                </div>

                <div>
                  <label className="font-sans-elegant text-sm text-foreground block mb-2 font-semibold">{t('registry.dialog.name')}</label>
                  <Input
                    value={giftName}
                    onChange={(e) => setGiftName(e.target.value)}
                    placeholder={t('registry.dialog.name.placeholder')}
                    className="font-sans-elegant rounded-full h-12 border-border/50 bg-background/50 backdrop-blur-sm"
                    required
                  />
                </div>

                <div>
                  <label className="font-sans-elegant text-sm text-foreground block mb-2 font-semibold">{t('registry.dialog.message')}</label>
                  <Textarea
                    value={giftMessage}
                    onChange={(e) => setGiftMessage(e.target.value)}
                    placeholder={t('registry.dialog.message.placeholder')}
                    className="font-sans-elegant rounded-2xl border-border/50 bg-background/50 backdrop-blur-sm"
                  />
                </div>

                <button type="submit" className="w-full btn-primary justify-center">
                  <Heart className="w-4 h-4 fill-current" />
                  {t('registry.dialog.send')}
                </button>

                <p className="font-sans-elegant text-[11px] text-muted-foreground text-center">{t('registry.dialog.note')}</p>
              </motion.form>
            }
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
