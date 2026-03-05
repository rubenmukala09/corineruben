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
    <div className="min-h-screen pt-28 pb-20 relative overflow-hidden">
      <div className="floating-blob w-[350px] h-[350px] bg-primary/20 top-20 left-[-80px]" />
      <div className="floating-blob w-[300px] h-[300px] bg-accent/20 bottom-40 right-[-80px]" />

      <div className="container mx-auto px-4 max-w-2xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-1.5 rounded-full bg-secondary/80 border border-border/50 mb-4">
            <p className="font-sans-elegant text-xs tracking-[0.25em] uppercase text-muted-foreground">{t('nav.registry')}</p>
          </div>
          <h1 className="font-serif-display text-4xl md:text-6xl text-foreground mb-4 font-semibold">{t('registry.title')}</h1>
          <p className="font-serif-body text-lg text-muted-foreground max-w-md mx-auto">{t('registry.subtitle')}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-2xl p-8 text-center mb-10"
        >
          <div className="w-14 h-14 rounded-full gradient-primary flex items-center justify-center mx-auto mb-5 shadow-glow">
            <Heart className="w-7 h-7 text-primary-foreground" />
          </div>
          <p className="font-serif-body text-base text-muted-foreground leading-relaxed max-w-sm mx-auto">{t('registry.message')}</p>
        </motion.div>

        <div className="space-y-4">
          {registries.map((reg, i) => (
            <motion.a
              key={reg.name}
              href={reg.url}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center justify-between glass-card rounded-2xl p-6 hover:shadow-card-hover hover:border-primary/30 transition-all duration-500 group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl gradient-soft flex items-center justify-center text-2xl border border-border/30">
                  {reg.icon}
                </div>
                <span className="font-sans-elegant text-foreground font-medium">{reg.name}</span>
              </div>
              <div className="flex items-center gap-2 text-primary">
                <span className="font-sans-elegant text-sm font-medium">{t('registry.link')}</span>
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