import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Info } from 'lucide-react';

const RSVP = () => {
  const { t } = useLanguage();
  const [attending, setAttending] = useState<boolean | null>(null);
  const [meal, setMeal] = useState<string | null>(null);

  return (
    <div className="min-h-screen pt-28 pb-20 relative overflow-hidden gradient-mesh">
      <div className="floating-blob w-[400px] h-[400px] bg-primary/18 top-20 right-[-100px]" />
      <div className="floating-blob w-[320px] h-[320px] bg-pale-lilac/22 bottom-20 left-[-80px]" />
      <div className="floating-blob w-[200px] h-[200px] bg-dusty-rose/15 top-[40%] left-[50%]" />

      <div className="container mx-auto px-6 md:px-12 max-w-lg relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="inline-block px-5 py-2 rounded-full glass-card-strong mb-5">
            <p className="font-sans-elegant text-xs tracking-[0.25em] uppercase text-muted-foreground font-medium">{t('nav.rsvp')}</p>
          </div>
          <h1 className="font-serif-display text-4xl md:text-6xl text-foreground mb-4 font-semibold" style={{ letterSpacing: '-0.5px' }}>
            {t('rsvp.title')}
          </h1>
          <p className="font-sans-elegant text-base text-muted-foreground">{t('rsvp.subtitle')}</p>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          className="glass-card-strong rounded-3xl p-5 flex items-start gap-3 mb-8"
        >
          <div className="w-10 h-10 rounded-2xl gradient-primary flex items-center justify-center flex-shrink-0 mt-0.5 shadow-soft">
            <Info className="w-4 h-4 text-primary-foreground" />
          </div>
          <p className="font-sans-elegant text-sm text-muted-foreground" style={{ lineHeight: 1.6 }}>{t('rsvp.notready')}</p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card-strong rounded-3xl p-8 space-y-7"
          onSubmit={e => e.preventDefault()}
        >
          <div>
            <label className="font-sans-elegant text-sm text-foreground block mb-2.5 font-semibold">{t('rsvp.code')}</label>
            <Input placeholder={t('rsvp.code.placeholder')} className="font-sans-elegant rounded-2xl h-12 border-border/50 bg-background/50 backdrop-blur-sm" />
          </div>

          <div>
            <label className="font-sans-elegant text-sm text-foreground block mb-2.5 font-semibold">{t('rsvp.name')}</label>
            <Input className="font-sans-elegant rounded-2xl h-12 border-border/50 bg-background/50 backdrop-blur-sm" />
          </div>

          <div>
            <label className="font-sans-elegant text-sm text-foreground block mb-3 font-semibold">{t('rsvp.attending')}</label>
            <div className="flex gap-3">
              {[true, false].map(val => (
                <button
                  key={String(val)}
                  type="button"
                  onClick={() => setAttending(val)}
                  className={`flex-1 py-3.5 rounded-full text-sm font-sans-elegant font-medium transition-all duration-400 ${
                    attending === val
                      ? 'gradient-primary text-primary-foreground shadow-glow'
                      : 'glass-card hover:border-primary/30 text-foreground'
                  }`}
                  style={{ borderRadius: '50px' }}
                >
                  {val ? t('rsvp.yes') : t('rsvp.no')}
                </button>
              ))}
            </div>
          </div>

          {attending && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-7">
              <div>
                <label className="font-sans-elegant text-sm text-foreground block mb-2.5 font-semibold">{t('rsvp.meal')}</label>
                <div className="flex gap-2">
                  {['rsvp.meal.meat', 'rsvp.meal.fish', 'rsvp.meal.veg'].map(key => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setMeal(key)}
                      className={`flex-1 py-3 text-sm font-sans-elegant font-medium transition-all duration-400 ${
                        meal === key
                          ? 'gradient-primary text-primary-foreground shadow-glow'
                          : 'glass-card hover:border-primary/30 text-foreground'
                      }`}
                      style={{ borderRadius: '50px' }}
                    >
                      {t(key)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-sans-elegant text-sm text-foreground block mb-2.5 font-semibold">{t('rsvp.dietary')}</label>
                <Textarea placeholder={t('rsvp.dietary.placeholder')} className="font-sans-elegant rounded-2xl border-border/50 bg-background/50 backdrop-blur-sm" />
              </div>

              <div>
                <label className="font-sans-elegant text-sm text-foreground block mb-2.5 font-semibold">{t('rsvp.plusone')}</label>
                <Input placeholder={t('rsvp.plusone.name')} className="font-sans-elegant rounded-2xl h-12 border-border/50 bg-background/50 backdrop-blur-sm" />
              </div>
            </motion.div>
          )}

          <button
            type="submit"
            disabled
            className="w-full btn-primary justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none disabled:hover:shadow-none"
          >
            {t('rsvp.submit')}
          </button>
        </motion.form>
      </div>
    </div>
  );
};

export default RSVP;
