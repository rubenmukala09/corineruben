import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { Heart, Loader2 } from 'lucide-react';
import { useSiteImages, useStoryEvents } from '@/hooks/useSiteContent';

// Static fallback images (used when no DB images exist)
import heroImg from '@/assets/hero-wedding-opt.webp';
import flowersImg from '@/assets/flowers-lavender.jpg';
import ringsImg from '@/assets/rings.jpg';
import venueImg from '@/assets/venue.jpg';
import coupleImg from '@/assets/couple-lavender.jpg';
import cakeImg from '@/assets/cake.jpg';

const FALLBACK_GALLERY = [
  { src: heroImg, aspect: 'aspect-[4/3]', alt: 'Wedding celebration' },
  { src: flowersImg, aspect: 'aspect-square', alt: 'Lavender flowers' },
  { src: ringsImg, aspect: 'aspect-[3/4]', alt: 'Wedding rings' },
  { src: venueImg, aspect: 'aspect-square', alt: 'Wedding venue' },
  { src: coupleImg, aspect: 'aspect-[3/4]', alt: 'The couple' },
  { src: cakeImg, aspect: 'aspect-square', alt: 'Wedding cake' },
  { src: heroImg, aspect: 'aspect-[3/4]', alt: 'Celebration moment' },
  { src: flowersImg, aspect: 'aspect-[4/3]', alt: 'Floral arrangement' },
  { src: ringsImg, aspect: 'aspect-square', alt: 'Ring detail' },
];

const FALLBACK_EVENTS = [
  { titleKey: 'story.event1.title', descKey: 'story.event1.description', dateKey: 'story.event1.date', icon: '💫' },
  { titleKey: 'story.event2.title', descKey: 'story.event2.description', dateKey: 'story.event2.date', icon: '🌹' },
  { titleKey: 'story.event3.title', descKey: 'story.event3.description', dateKey: 'story.event3.date', icon: '✈️' },
  { titleKey: 'story.event4.title', descKey: 'story.event4.description', dateKey: 'story.event4.date', icon: '🏡' },
  { titleKey: 'story.event5.title', descKey: 'story.event5.description', dateKey: 'story.event5.date', icon: '💍' },
];

const ASPECT_CYCLE = ['aspect-[4/3]', 'aspect-square', 'aspect-[3/4]'];

const Story = () => {
  const { t, language } = useLanguage();
  const { events: dbEvents, loading: eventsLoading } = useStoryEvents();
  const { images: galleryImages, loading: galleryLoading } = useSiteImages('story_gallery');

  // Use DB events if available, otherwise use static fallback
  const useDbEvents = dbEvents.length > 0;

  const getEventTitle = (event: typeof dbEvents[number]) => {
    if (language === 'fr' && event.title_fr) return event.title_fr;
    if (language === 'es' && event.title_es) return event.title_es;
    return event.title;
  };

  const getEventDesc = (event: typeof dbEvents[number]) => {
    if (language === 'fr' && event.description_fr) return event.description_fr;
    if (language === 'es' && event.description_es) return event.description_es;
    return event.description;
  };

  const getEventDate = (event: typeof dbEvents[number]) => {
    if (language === 'fr' && event.date_label_fr) return event.date_label_fr;
    if (language === 'es' && event.date_label_es) return event.date_label_es;
    return event.date_label;
  };

  // Build gallery: DB images if available, otherwise fallback
  const useDbGallery = galleryImages.length > 0;
  const gallery = useDbGallery
    ? galleryImages.map((img, i) => ({
        src: img.url,
        aspect: ASPECT_CYCLE[i % ASPECT_CYCLE.length],
        alt: img.alt_text || 'Wedding photo',
      }))
    : FALLBACK_GALLERY;

  return (
    <div className="min-h-screen pt-28 pb-20 relative">

      <div className="container mx-auto px-6 md:px-12 max-w-3xl relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <div className="inline-block px-5 py-2 rounded-full glass-card-strong mb-5">
            <p className="font-sans-elegant text-xs tracking-[0.25em] uppercase text-muted-foreground font-medium">{t('nav.story')}</p>
          </div>
          <h1 className="font-serif-display text-4xl md:text-6xl text-foreground mb-4 font-semibold" style={{ letterSpacing: '-0.5px' }}>
            {t('story.title')}
          </h1>
          <p className="font-sans-elegant text-base text-muted-foreground max-w-md mx-auto" style={{ lineHeight: 1.6 }}>
            {t('story.subtitle')}
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/40 via-accent/30 to-transparent md:-translate-x-px" />

          {eventsLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
          ) : useDbEvents ? (
            // Dynamic events from DB
            dbEvents.map((event, i) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className={`relative flex items-start mb-14 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                <div className="absolute left-6 md:left-1/2 w-4 h-4 rounded-full gradient-primary -translate-x-2 mt-2 z-10 ring-4 ring-background shadow-glow" />
                <div className={`ml-14 md:ml-0 md:w-[calc(50%-2rem)] ${i % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8'}`}>
                  <div className="glass-card-strong rounded-3xl p-7 card-hover">
                    <span className="text-3xl mb-3 block">{event.icon}</span>
                    <span className="font-sans-elegant text-xs tracking-[0.2em] uppercase text-primary font-semibold">{getEventDate(event)}</span>
                    <h3 className="font-serif-display text-xl text-foreground mt-2 mb-3 font-semibold">{getEventTitle(event)}</h3>
                    <p className="font-sans-elegant text-sm text-muted-foreground" style={{ lineHeight: 1.6 }}>{getEventDesc(event)}</p>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            // Static fallback events
            FALLBACK_EVENTS.map((event, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className={`relative flex items-start mb-14 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                <div className="absolute left-6 md:left-1/2 w-4 h-4 rounded-full gradient-primary -translate-x-2 mt-2 z-10 ring-4 ring-background shadow-glow" />
                <div className={`ml-14 md:ml-0 md:w-[calc(50%-2rem)] ${i % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8'}`}>
                  <div className="glass-card-strong rounded-3xl p-7 card-hover">
                    <span className="text-3xl mb-3 block">{event.icon}</span>
                    <span className="font-sans-elegant text-xs tracking-[0.2em] uppercase text-primary font-semibold">{t(event.dateKey)}</span>
                    <h3 className="font-serif-display text-xl text-foreground mt-2 mb-3 font-semibold">{t(event.titleKey)}</h3>
                    <p className="font-sans-elegant text-sm text-muted-foreground" style={{ lineHeight: 1.6 }}>{t(event.descKey)}</p>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <div className="glass-card-strong rounded-3xl p-8 inline-block">
            <Heart className="w-8 h-8 text-dusty-rose fill-dusty-rose mx-auto mb-3" />
            <p className="font-serif-display text-lg text-foreground font-semibold">{t('story.continues')}</p>
            <p className="font-sans-elegant text-sm text-muted-foreground mt-1">{t('hero.date')}</p>
          </div>
        </motion.div>
      </div>

      {/* ===== GALLERY ===== */}
      <div className="container mx-auto px-6 md:px-12 max-w-5xl relative z-10 mt-20 pb-20">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <div className="inline-block px-5 py-2 rounded-full glass-card-strong mb-5">
            <p className="font-sans-elegant text-xs tracking-[0.25em] uppercase text-muted-foreground font-medium">{t('nav.gallery')}</p>
          </div>
          <h2 className="font-serif-display text-4xl md:text-6xl text-foreground mb-4 font-semibold" style={{ letterSpacing: '-0.5px' }}>
            {t('gallery.title')}
          </h2>
          <p className="font-sans-elegant text-base text-muted-foreground max-w-md mx-auto" style={{ lineHeight: 1.6 }}>
            {t('gallery.subtitle')}
          </p>
        </motion.div>

        {galleryLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
          </div>
        ) : (
          <div className="columns-2 md:columns-3 gap-5 space-y-5">
            {gallery.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.6 }}
                className="break-inside-avoid"
              >
                <div className={`${img.aspect} rounded-3xl overflow-hidden cursor-pointer group card-hover glass-card-strong p-1.5`}>
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover rounded-[20px] group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Story;
