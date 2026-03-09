import { useState, lazy, Suspense } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { Heart, Gift, Sparkles, Share2, Copy, Check } from 'lucide-react';
import { Input } from '@/components/ui/input';
const EmbeddedPaymentForm = lazy(() => import('@/components/EmbeddedPaymentForm'));
import { QRCodeSVG } from 'qrcode.react';

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
  const [copied, setCopied] = useState(false);

  const rsvpUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/rsvp` 
    : 'https://smart-union-hub.lovable.app/rsvp';

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(rsvpUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
        <div className="glass-section p-6 md:p-10">
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
                className="font-sans-elegant rounded-2xl h-12 pl-8 border-2 border-border bg-white/80 dark:bg-foreground/5 backdrop-blur-sm shadow-[0_2px_8px_rgba(139,107,138,0.08)] focus-visible:border-primary focus-visible:shadow-[0_0_0_3px_hsl(var(--primary)/0.12)] transition-all duration-200"
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
        {/* RSVP Share Card with QR Code */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.45 }}
          className="glass-card-strong rounded-3xl p-7 mt-6"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-2xl gradient-primary flex items-center justify-center">
              <Share2 className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <span className="font-sans-elegant text-foreground font-semibold text-sm block">Share RSVP Link</span>
              <span className="font-sans-elegant text-xs text-muted-foreground">Help spread the word!</span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* QR Code */}
            <div className="bg-white p-4 rounded-2xl shadow-sm">
              <QRCodeSVG 
                value={rsvpUrl} 
                size={120} 
                level="H"
                includeMargin={false}
                bgColor="#ffffff"
                fgColor="#1a1a2e"
              />
            </div>

            {/* Link & Copy */}
            <div className="flex-1 w-full">
              <p className="font-sans-elegant text-xs text-muted-foreground mb-3">
                Scan the QR code or copy the link to share with guests
              </p>
              <div className="flex gap-2">
                <Input
                  readOnly
                  value={rsvpUrl}
                  className="font-sans-elegant text-sm rounded-full h-11 bg-background/50 border-border/50"
                />
                <button
                  onClick={handleCopyLink}
                  className="btn-primary px-5 rounded-full text-sm flex items-center gap-2 whitespace-nowrap"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

        </div>

      {/* Embedded Payment */}
      {paymentOpen && (
        <Suspense fallback={null}>
          <EmbeddedPaymentForm
            open={paymentOpen}
            onOpenChange={setPaymentOpen}
            selectedAmount={selectedAmount}
          />
        </Suspense>
      )}
    </div>
  );
};

export default Registry;
