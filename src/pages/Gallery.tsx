import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

const placeholderImages = [
  { id: 1, aspect: 'aspect-square' },
  { id: 2, aspect: 'aspect-[3/4]' },
  { id: 3, aspect: 'aspect-square' },
  { id: 4, aspect: 'aspect-[4/3]' },
  { id: 5, aspect: 'aspect-[3/4]' },
  { id: 6, aspect: 'aspect-square' },
  { id: 7, aspect: 'aspect-[4/3]' },
  { id: 8, aspect: 'aspect-square' },
  { id: 9, aspect: 'aspect-[3/4]' },
];

const Gallery = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen pt-28 pb-20 relative overflow-hidden">
      <div className="floating-blob w-[400px] h-[400px] bg-accent/25 top-40 left-[-120px]" />
      <div className="floating-blob w-[350px] h-[350px] bg-primary/15 bottom-20 right-[-100px]" />

      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-1.5 rounded-full bg-secondary/80 border border-border/50 mb-4">
            <p className="font-sans-elegant text-xs tracking-[0.25em] uppercase text-muted-foreground">{t('nav.gallery')}</p>
          </div>
          <h1 className="font-serif-display text-4xl md:text-6xl text-foreground mb-4 font-semibold">{t('gallery.title')}</h1>
          <p className="font-serif-body text-lg text-muted-foreground max-w-md mx-auto">{t('gallery.subtitle')}</p>
        </motion.div>

        <div className="columns-2 md:columns-3 gap-4 space-y-4">
          {placeholderImages.map((img, i) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="break-inside-avoid"
            >
              <div className={`${img.aspect} rounded-2xl overflow-hidden flex items-center justify-center gradient-soft border border-border/30 hover:shadow-card-hover transition-all duration-500 cursor-pointer hover:scale-[1.02]`}>
                <span className="font-serif-display text-5xl text-primary/20">
                  {i + 1}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;