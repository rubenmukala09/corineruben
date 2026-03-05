import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const Story = () => {
  const { t } = useLanguage();

  const events = [
    { titleKey: 'story.event1.title', descKey: 'story.event1.description', dateKey: 'story.event1.date', icon: '💫' },
    { titleKey: 'story.event2.title', descKey: 'story.event2.description', dateKey: 'story.event2.date', icon: '🌹' },
    { titleKey: 'story.event3.title', descKey: 'story.event3.description', dateKey: 'story.event3.date', icon: '✈️' },
    { titleKey: 'story.event4.title', descKey: 'story.event4.description', dateKey: 'story.event4.date', icon: '🏡' },
    { titleKey: 'story.event5.title', descKey: 'story.event5.description', dateKey: 'story.event5.date', icon: '💍' },
  ];

  return (
    <div className="min-h-screen pt-28 pb-20 relative overflow-hidden gradient-mesh">
      <div className="floating-blob w-[450px] h-[450px] bg-primary/20 top-20 right-[-120px]" />
      <div className="floating-blob w-[350px] h-[350px] bg-pale-lilac/25 bottom-40 left-[-100px]" />
      <div className="floating-blob w-[250px] h-[250px] bg-dusty-rose/15 top-[50%] left-[60%]" />

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

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/40 via-accent/30 to-transparent md:-translate-x-px" />

          {events.map((event, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className={`relative flex items-start mb-14 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
            >
              {/* Timeline dot */}
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
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <div className="glass-card-strong rounded-3xl p-8 inline-block">
            <Heart className="w-8 h-8 text-dusty-rose fill-dusty-rose mx-auto mb-3" />
            <p className="font-serif-display text-lg text-foreground font-semibold">Our journey continues...</p>
            <p className="font-sans-elegant text-sm text-muted-foreground mt-1">{t('hero.date')}</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Story;
