import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

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
    <div className="min-h-screen pt-28 pb-20 relative overflow-hidden">
      <div className="floating-blob w-[400px] h-[400px] bg-primary/20 top-20 right-[-100px]" />
      <div className="floating-blob w-[300px] h-[300px] bg-accent/20 bottom-40 left-[-80px]" />

      <div className="container mx-auto px-4 max-w-3xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-1.5 rounded-full bg-secondary/80 border border-border/50 mb-4">
            <p className="font-sans-elegant text-xs tracking-[0.25em] uppercase text-muted-foreground">{t('nav.story')}</p>
          </div>
          <h1 className="font-serif-display text-4xl md:text-6xl text-foreground mb-4 font-semibold">{t('story.title')}</h1>
          <p className="font-serif-body text-lg text-muted-foreground max-w-md mx-auto">{t('story.subtitle')}</p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-accent/30 to-transparent md:-translate-x-px" />

          {events.map((event, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.1 }}
              className={`relative flex items-start mb-12 ${
                i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              <div className="absolute left-6 md:left-1/2 w-4 h-4 rounded-full gradient-primary -translate-x-2 mt-2 z-10 ring-4 ring-background shadow-glow" />

              <div className={`ml-14 md:ml-0 md:w-[calc(50%-2rem)] ${i % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8'}`}>
                <div className="glass-card rounded-2xl p-6 hover:shadow-card-hover transition-all duration-500">
                  <span className="text-3xl mb-3 block">{event.icon}</span>
                  <span className="font-sans-elegant text-xs tracking-[0.2em] uppercase text-primary font-medium">{t(event.dateKey)}</span>
                  <h3 className="font-serif-display text-xl text-foreground mt-2 mb-3 font-semibold">{t(event.titleKey)}</h3>
                  <p className="font-serif-body text-base text-muted-foreground leading-relaxed">{t(event.descKey)}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Story;