import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Gift, Sparkles, X, Check } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const giftTiers = [
  { amount: 60, emoji: '💐', labelKey: 'registry.tier.bouquet' },
  { amount: 100, emoji: '🥂', labelKey: 'registry.tier.toast' },
  { amount: 200, emoji: '✨', labelKey: 'registry.tier.sparkle' },
  { amount: 500, emoji: '💎', labelKey: 'registry.tier.diamond' },
];

const Registry = () => {
  const { t } = useLanguage();
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [giftMessage, setGiftMessage] = useState('');
  const [giftName, setGiftName] = useState('');
  const [sent, setSent] = useState(false);

  const handleSelectTier = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount('');
    setDialogOpen(true);
    setSent(false);
  };

  const handleCustom = () => {
    const val = parseInt(customAmount);
    if (val && val > 0) {
      setSelectedAmount(val);
      setDialogOpen(true);
      setSent(false);
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase.from('gifts').insert({
        from_name: giftName,
        amount: selectedAmount!,
        message: giftMessage || null,
      });
      if (error) throw error;
      setSent(true);
      toast.success('Gift recorded! Thank you 💕');
      setTimeout(() => {
        setDialogOpen(false);
        setSent(false);
        setGiftMessage('');
        setGiftName('');
        setSelectedAmount(null);
      }, 2000);
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-20 relative">
      <div className="container mx-auto px-6 md:px-12 max-w-2xl relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
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

        {/* Heart message card */}
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

        {/* Gift tiers */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {giftTiers.map((tier, i) => (
            <motion.button
              key={tier.amount}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleSelectTier(tier.amount)}
              className="glass-card-strong rounded-3xl p-6 text-center card-hover group relative overflow-hidden"
            >
              <div className="text-3xl mb-3">{tier.emoji}</div>
              <div className="font-serif-display text-2xl text-foreground font-bold mb-1">${tier.amount}</div>
              <div className="font-sans-elegant text-xs text-muted-foreground font-medium">{t(tier.labelKey)}</div>
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none gradient-primary" style={{ opacity: 0, mixBlendMode: 'overlay' }} />
            </motion.button>
          ))}
        </div>

        {/* 500+ and Custom */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35 }}
          className="glass-card-strong rounded-3xl p-6 mb-4 card-hover"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-2xl glass-card flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <span className="font-sans-elegant text-foreground font-semibold text-sm">{t('registry.custom')}</span>
          </div>
          <div className="flex gap-3">
            <div className="relative flex-1">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-sans-elegant text-sm">$</span>
              <Input
                type="number"
                min="1"
                value={customAmount}
                onChange={e => setCustomAmount(e.target.value)}
                placeholder={t('registry.custom.placeholder')}
                className="font-sans-elegant rounded-full h-12 pl-8 border-border/50 bg-background/50 backdrop-blur-sm"
              />
            </div>
            <button
              onClick={handleCustom}
              className="btn-primary px-6 rounded-full text-sm"
            >
              <Gift className="w-4 h-4" />
              {t('registry.give')}
            </button>
          </div>
        </motion.div>

        {/* Animal Fund - keeping Honeymoon Fund style */}
        <motion.button
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          onClick={() => handleSelectTier(100)}
          className="w-full glass-card-strong rounded-3xl p-7 card-hover group flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl glass-card flex items-center justify-center text-2xl">🐾</div>
            <div className="text-left">
              <span className="font-sans-elegant text-foreground font-semibold text-base block">{t('registry.animalfund')}</span>
              <span className="font-sans-elegant text-xs text-muted-foreground">{t('registry.animalfund.desc')}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-primary">
            <Gift className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
          </div>
        </motion.button>
      </div>

      {/* Payment Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif-display text-2xl text-center">{t('registry.dialog.title')}</DialogTitle>
            <DialogDescription className="font-sans-elegant text-center text-muted-foreground">
              {t('registry.dialog.subtitle')}
            </DialogDescription>
          </DialogHeader>

          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-8 text-center"
              >
                <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4 shadow-glow">
                  <Check className="w-7 h-7 text-primary-foreground" />
                </div>
                <p className="font-sans-elegant text-foreground font-semibold">{t('registry.dialog.thanks')}</p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onSubmit={handleSend}
                className="space-y-5 pt-2"
              >
                <div className="glass-card rounded-2xl p-5 text-center">
                  <p className="font-sans-elegant text-xs text-muted-foreground mb-1">{t('registry.dialog.amount')}</p>
                  <p className="font-serif-display text-3xl text-foreground font-bold">${selectedAmount}</p>
                </div>

                <div>
                  <label className="font-sans-elegant text-sm text-foreground block mb-2 font-semibold">{t('registry.dialog.name')}</label>
                  <Input
                    value={giftName}
                    onChange={e => setGiftName(e.target.value)}
                    placeholder={t('registry.dialog.name.placeholder')}
                    className="font-sans-elegant rounded-full h-12 border-border/50 bg-background/50 backdrop-blur-sm"
                    required
                  />
                </div>

                <div>
                  <label className="font-sans-elegant text-sm text-foreground block mb-2 font-semibold">{t('registry.dialog.message')}</label>
                  <Textarea
                    value={giftMessage}
                    onChange={e => setGiftMessage(e.target.value)}
                    placeholder={t('registry.dialog.message.placeholder')}
                    className="font-sans-elegant rounded-2xl border-border/50 bg-background/50 backdrop-blur-sm"
                  />
                </div>

                <button type="submit" className="w-full btn-primary justify-center">
                  <Heart className="w-4 h-4" />
                  {t('registry.dialog.send')}
                </button>

                <p className="font-sans-elegant text-[11px] text-muted-foreground text-center">{t('registry.dialog.note')}</p>
              </motion.form>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Registry;
