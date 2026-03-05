import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Info } from 'lucide-react';

const RSVP = () => {
  const { t } = useLanguage();
  const [attending, setAttending] = useState<boolean | null>(null);
  const [meal, setMeal] = useState<string | null>(null);

  return (
    <div className="min-h-screen pt-28 pb-20 relative overflow-hidden">
      <div className="floating-blob w-[350px] h-[350px] bg-primary/20 top-20 right-[-80px]" />
      <div className="floating-blob w-[300px] h-[300px] bg-accent/20 bottom-20 left-[-60px]" />

      <div className="container mx-auto px-4 max-w-lg relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-block px-4 py-1.5 rounded-full bg-secondary/80 border border-border/50 mb-4">
            <p className="font-sans-elegant text-xs tracking-[0.25em] uppercase text-muted-foreground">{t('nav.rsvp')}</p>
          </div>
          <h1 className="font-serif-display text-4xl md:text-6xl text-foreground mb-4 font-semibold">{t('rsvp.title')}</h1>
          <p className="font-serif-body text-lg text-muted-foreground">{t('rsvp.subtitle')}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="glass-card rounded-2xl p-4 flex items-start gap-3 mb-8"
        >
          <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0 mt-0.5">
            <Info className="w-4 h-4 text-primary-foreground" />
          </div>
          <p className="font-sans-elegant text-sm text-muted-foreground">{t('rsvp.notready')}</p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-2xl p-8 space-y-6"
          onSubmit={e => e.preventDefault()}
        >
          <div>
            <label className="font-sans-elegant text-sm text-foreground block mb-2 font-medium">{t('rsvp.code')}</label>
            <Input placeholder={t('rsvp.code.placeholder')} className="font-sans-elegant rounded-xl bg-background/50" />
          </div>

          <div>
            <label className="font-sans-elegant text-sm text-foreground block mb-2 font-medium">{t('rsvp.name')}</label>
            <Input className="font-sans-elegant rounded-xl bg-background/50" />
          </div>

          <div>
            <label className="font-sans-elegant text-sm text-foreground block mb-3 font-medium">{t('rsvp.attending')}</label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setAttending(true)}
                className={`flex-1 py-3.5 rounded-xl text-sm font-sans-elegant font-medium transition-all duration-300 ${
                  attending === true
                    ? 'gradient-primary text-primary-foreground shadow-glow'
                    : 'border border-border bg-background/50 hover:border-primary/40 hover:bg-primary/5 text-foreground'
                }`}
              >
                {t('rsvp.yes')}
              </button>
              <button
                type="button"
                onClick={() => setAttending(false)}
                className={`flex-1 py-3.5 rounded-xl text-sm font-sans-elegant font-medium transition-all duration-300 ${
                  attending === false
                    ? 'gradient-primary text-primary-foreground shadow-glow'
                    : 'border border-border bg-background/50 hover:border-primary/40 hover:bg-primary/5 text-foreground'
                }`}
              >
                {t('rsvp.no')}
              </button>
            </div>
          </div>

          {attending && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="space-y-6"
            >
              <div>
                <label className="font-sans-elegant text-sm text-foreground block mb-2 font-medium">{t('rsvp.meal')}</label>
                <div className="flex gap-2">
                  {['rsvp.meal.meat', 'rsvp.meal.fish', 'rsvp.meal.veg'].map(key => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setMeal(key)}
                      className={`flex-1 py-2.5 rounded-xl text-sm font-sans-elegant transition-all duration-300 ${
                        meal === key
                          ? 'gradient-primary text-primary-foreground shadow-glow'
                          : 'border border-border bg-background/50 hover:border-primary/40 text-foreground'
                      }`}
                    >
                      {t(key)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-sans-elegant text-sm text-foreground block mb-2 font-medium">{t('rsvp.dietary')}</label>
                <Textarea placeholder={t('rsvp.dietary.placeholder')} className="font-sans-elegant rounded-xl bg-background/50" />
              </div>

              <div>
                <label className="font-sans-elegant text-sm text-foreground block mb-2 font-medium">{t('rsvp.plusone')}</label>
                <Input placeholder={t('rsvp.plusone.name')} className="font-sans-elegant rounded-xl bg-background/50" />
              </div>
            </motion.div>
          )}

          <Button
            type="submit"
            className="w-full font-sans-elegant tracking-[0.15em] uppercase rounded-xl gradient-primary border-0 hover:shadow-glow transition-all duration-500 h-12"
            disabled
          >
            {t('rsvp.submit')}
          </Button>
        </motion.form>
      </div>
    </div>
  );
};

export default RSVP;