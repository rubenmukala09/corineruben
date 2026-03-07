import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { Heart, Gift, Sparkles } from 'lucide-react';
import { Input } from '@/components/ui/input';
import EmbeddedPaymentForm from '@/components/EmbeddedPaymentForm';

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
  const [paymentOpen, setPaymentOpen] = useState(false);

  const handleSelectTier = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount('');
    setPaymentOpen(true);
  };

  const handleCustom = () => {
    const val = parseInt(customAmount);
    if (val && val > 0) {
      setSelectedAmount(val);
      setPaymentOpen(true);
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
            </motion.button>
          ))}
        </div>

        {/* Custom amount */}
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
            <button onClick={handleCustom} className="btn-primary px-6 rounded-full text-sm">
              <Gift className="w-4 h-4" />
              {t('registry.give')}
            </button>
          </div>
        </motion.div>

        {/* Animal Fund */}
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

      {/* Embedded Payment */}
      <EmbeddedPaymentForm
        open={paymentOpen}
        onOpenChange={setPaymentOpen}
        selectedAmount={selectedAmount}
      />
    </div>
  );
};

export default Registry;
