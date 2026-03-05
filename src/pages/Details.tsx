import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { Church, PartyPopper, Shirt, Hotel, Car } from 'lucide-react';

const Details = () => {
  const { t } = useLanguage();

  const sections = [
    {
      icon: Church,
      title: t('details.ceremony'),
      items: [
        { label: t('details.ceremony.time'), bold: true },
        { label: t('details.ceremony.location'), bold: true },
        { label: t('details.ceremony.address') },
      ],
    },
    {
      icon: PartyPopper,
      title: t('details.reception'),
      items: [
        { label: t('details.reception.time'), bold: true },
        { label: t('details.reception.location'), bold: true },
        { label: t('details.reception.address') },
      ],
    },
    {
      icon: Shirt,
      title: t('details.dresscode'),
      items: [{ label: t('details.dresscode.desc') }],
    },
    {
      icon: Hotel,
      title: t('details.accommodation'),
      items: [{ label: t('details.accommodation.desc') }],
    },
    {
      icon: Car,
      title: t('details.transport'),
      items: [{ label: t('details.transport.desc') }],
    },
  ];

  return (
    <div className="min-h-screen pt-28 pb-20 relative overflow-hidden">
      <div className="floating-blob w-[400px] h-[400px] bg-accent/25 top-10 left-[-100px]" />
      <div className="floating-blob w-[350px] h-[350px] bg-primary/15 bottom-20 right-[-80px]" />

      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-1.5 rounded-full bg-secondary/80 border border-border/50 mb-4">
            <p className="font-sans-elegant text-xs tracking-[0.25em] uppercase text-muted-foreground">{t('nav.details')}</p>
          </div>
          <h1 className="font-serif-display text-4xl md:text-6xl text-foreground mb-4 font-semibold">{t('details.title')}</h1>
          <p className="font-serif-body text-lg text-muted-foreground max-w-md mx-auto">{t('details.subtitle')}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {sections.map((section, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`glass-card rounded-2xl p-8 hover:shadow-card-hover transition-all duration-500 group ${
                i === sections.length - 1 && sections.length % 2 !== 0 ? 'md:col-span-2 md:max-w-md md:mx-auto' : ''
              }`}
            >
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-5 group-hover:shadow-glow transition-shadow duration-500">
                <section.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h2 className="font-serif-display text-2xl text-foreground mb-4 font-semibold">{section.title}</h2>
              <div className="space-y-1.5">
                {section.items.map((item, j) => (
                  <p
                    key={j}
                    className={`font-serif-body text-base ${
                      item.bold ? 'text-foreground font-medium' : 'text-muted-foreground'
                    }`}
                  >
                    {item.label}
                  </p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Details;