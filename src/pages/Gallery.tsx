import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import heroImg from '@/assets/hero-wedding.jpg';
import flowersImg from '@/assets/flowers-lavender.jpg';
import ringsImg from '@/assets/rings.jpg';
import venueImg from '@/assets/venue.jpg';
import coupleImg from '@/assets/couple-lavender.jpg';
import cakeImg from '@/assets/cake.jpg';

const galleryImages = [
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

const Gallery = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen pt-28 pb-20 relative overflow-hidden gradient-mesh">
      <div className="floating-blob w-[450px] h-[450px] bg-pale-lilac/25 top-40 left-[-140px]" />
      <div className="floating-blob w-[380px] h-[380px] bg-primary/15 bottom-20 right-[-120px]" />
      <div className="floating-blob w-[250px] h-[250px] bg-dusty-rose/10 top-[30%] right-[20%]" />

      <div className="container mx-auto px-6 md:px-12 max-w-5xl relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <div className="inline-block px-5 py-2 rounded-full glass-card-strong mb-5">
            <p className="font-sans-elegant text-xs tracking-[0.25em] uppercase text-muted-foreground font-medium">{t('nav.gallery')}</p>
          </div>
          <h1 className="font-serif-display text-4xl md:text-6xl text-foreground mb-4 font-semibold" style={{ letterSpacing: '-0.5px' }}>
            {t('gallery.title')}
          </h1>
          <p className="font-sans-elegant text-base text-muted-foreground max-w-md mx-auto" style={{ lineHeight: 1.6 }}>
            {t('gallery.subtitle')}
          </p>
        </motion.div>

        <div className="columns-2 md:columns-3 gap-5 space-y-5">
          {galleryImages.map((img, i) => (
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
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
