import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { Heart, ExternalLink } from 'lucide-react';

const registries = [
  { name: 'Amazon', url: '#', icon: '🎁' },
  { name: 'Crate & Barrel', url: '#', icon: '🏠' },
  { name: 'Honeymoon Fund', url: '#', icon: '✈️' },
];

const Registry = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen pt-28 pb-20 relative overflow-hidden gradient-mesh">
      <div className="floating-blob w-[400px] h-[400px] bg-primary/18 top-20 left-[-100px]" />
      <div className="floating-blob w-[350px] h-[350px] bg-pale-lilac/22 bottom-40 right-[-100px]" />
      <div className="floating-blob w-[200px] h-[200px] bg-dusty-rose/15 top-[50%] right-[40%]" />

      <div className="container mx-auto px-6 md:px-12 max-w-2xl relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <div className="inline-block px-5 py-2 rounded-full glass-card-strong mb-5">
            <p className="font-sans-elegant text-xs tracking-[0.25em] uppercase text-muted-foreground font-medium">{t('nav.registry')}</p>
          </div>
          <h1 className="font-serif-display text-4xl md:text-6xl text-foreground mb-4 font-semibold" style={{ letterSpacing: '-0.5px' }}>
            {t('registry.title')}
          </h1>
          <p className="font-sans-elegant text-base text-muted-foreground max-w-md mx-auto" style={{ lineHeight: 1.6 }}>
            {t('registry.subtitle')}
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          className="glass-card-strong rounded-3xl p-10 text-center mb-10"
        >
          <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mx-auto mb-6 shadow-glow">
            <Heart className="w-7 h-7 text-primary-foreground" />
          </div>
          <p className="font-sans-elegant text-sm text-muted-foreground max-w-sm mx-auto" style={{ lineHeight: 1.6 }}>
            {t('registry.message')}
          </p>
        </motion.div>

        <div className="space-y-4">
          {registries.map((reg, i) => (
            <motion.a
              key={reg.name}
              href={reg.url}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="flex items-center justify-between glass-card-strong rounded-3xl p-7 card-hover group block"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl glass-card flex items-center justify-center text-2xl">
                  {reg.icon}
                </div>
                <span className="font-sans-elegant text-foreground font-semibold text-base">{reg.name}</span>
              </div>
              <div className="flex items-center gap-2 text-primary">
                <span className="font-sans-elegant text-sm font-semibold hidden sm:inline">{t('registry.link')}</span>
                <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Registry;
