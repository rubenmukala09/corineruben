import { useState } from 'react';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Heart, Check, CreditCard, ArrowLeft, Shield, RefreshCw } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from '@/components/ui/dialog';
import {
  Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription,
} from '@/components/ui/drawer';

/* ── Inner checkout form (inside Elements) ── */
const CheckoutForm = ({ amount, onSuccess, t }: { amount: number; onSuccess: () => void; t: (k: string) => string }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [elementsReady, setElementsReady] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: `${window.location.origin}/?gift=success&amount=${amount}` },
      redirect: 'if_required',
    });

    if (error) {
      toast.error(error.message || 'Payment failed');
      setLoading(false);
    } else {
      onSuccess();
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {!elementsReady && (
        <div className="space-y-3">
          <Skeleton className="h-12 w-full rounded-xl" />
          <Skeleton className="h-12 w-full rounded-xl" />
          <Skeleton className="h-10 w-2/3 rounded-xl" />
        </div>
      )}
      <div className={elementsReady ? '' : 'opacity-0 h-0 overflow-hidden'}>
        <PaymentElement 
          options={{ layout: 'tabs' }} 
          onReady={() => setElementsReady(true)}
        />
      </div>
      <motion.button
        type="submit"
        disabled={!stripe || loading || !elementsReady}
        whileTap={{ scale: 0.97 }}
        className="w-full btn-primary justify-center disabled:opacity-50 min-h-[52px] text-base"
      >
        {loading ? (
          <span className="animate-spin w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full" />
        ) : (
          <Heart className="w-5 h-5" />
        )}
        {loading ? '...' : `${t('registry.dialog.send')} — $${amount}`}
      </motion.button>
    </form>
  );
};

/* ── Main component ── */
interface EmbeddedPaymentFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedAmount: number | null;
}

const EmbeddedPaymentForm = ({ open, onOpenChange, selectedAmount }: EmbeddedPaymentFormProps) => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();

  const [step, setStep] = useState<'info' | 'pay' | 'success'>('info');
  const [giftName, setGiftName] = useState('');
  const [giftEmail, setGiftEmail] = useState('');
  const [giftMessage, setGiftMessage] = useState('');
  const [stripePromise, setStripePromise] = useState<Promise<Stripe | null> | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  const quickMessages = [
    t('gift.msg.congrats'),
    t('gift.msg.blessed'),
    t('gift.msg.love'),
  ];

  const handleProceedToPayment = async () => {
    if (!selectedAmount) return;
    setLoading(true);
    setPaymentError(null);
    try {
      const { data, error } = await supabase.functions.invoke('create-gift-intent', {
        body: {
          amount: selectedAmount,
          guestName: giftName.trim() || 'Anonymous',
          message: giftMessage || null,
        },
      });
      if (error) throw error;
      if (data?.clientSecret && data?.publishableKey) {
        setStripePromise(loadStripe(data.publishableKey));
        setClientSecret(data.clientSecret);
        setStep('pay');
      } else {
        throw new Error('Missing payment data');
      }
    } catch (err) {
      console.error('Payment intent error:', err);
      setPaymentError('Could not initialize payment. Please try again.');
      toast.error('Could not initialize payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    setPaymentError(null);
    handleProceedToPayment();
  };

  const handleSuccess = async () => {
    setStep('success');
    try {
      await supabase.functions.invoke('send-gift-confirmation', {
        body: {
          guestName: giftName.trim() || 'Anonymous',
          guestEmail: giftEmail.trim() || null,
          amount: selectedAmount,
          message: giftMessage || null,
        },
      });
    } catch (e) {
      console.error('Gift confirmation email failed:', e);
    }
    setTimeout(() => {
      onOpenChange(false);
      resetForm();
    }, 4000);
  };

  const resetForm = () => {
    setStep('info');
    setGiftName('');
    setGiftEmail('');
    setGiftMessage('');
    setStripePromise(null);
    setClientSecret(null);
    setShowTerms(false);
    setPaymentError(null);
  };

  const handleClose = (isOpen: boolean) => {
    onOpenChange(isOpen);
    if (!isOpen) resetForm();
  };

  const content = (
    <AnimatePresence mode="wait">
      {step === 'success' ? (
        <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="py-8 text-center">
          <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4 shadow-glow">
            <Check className="w-7 h-7 text-primary-foreground" />
          </div>
          <p className="font-sans-elegant text-foreground font-semibold">{t('registry.dialog.thanks')}</p>
        </motion.div>
      ) : showTerms ? (
        <motion.div key="terms" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 pt-2">
          <motion.button 
            type="button" 
            onClick={() => setShowTerms(false)} 
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 text-primary font-sans-elegant text-sm font-medium hover:underline min-h-[44px]"
          >
            <ArrowLeft className="w-4 h-4" /> {t('rsvp.back')}
          </motion.button>
          <div className="glass-card rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-5 h-5 text-primary" />
              <h4 className="font-serif-display text-lg font-semibold text-foreground">{t('gift.terms.title')}</h4>
            </div>
            <div className="font-sans-elegant text-sm text-muted-foreground space-y-3 leading-relaxed">
              <p>{t('gift.terms.refund')}</p>
              <p>{t('gift.terms.privacy')}</p>
              <p>{t('gift.terms.accuracy')}</p>
              <p>{t('gift.terms.contact')}</p>
            </div>
          </div>
        </motion.div>
      ) : step === 'pay' && stripePromise && clientSecret ? (
        <motion.div key="pay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 pt-2">
          <motion.button 
            type="button" 
            onClick={() => { setStep('info'); setClientSecret(null); }} 
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 text-primary font-sans-elegant text-sm font-medium hover:underline min-h-[44px]"
          >
            <ArrowLeft className="w-4 h-4" /> {t('rsvp.back')}
          </motion.button>
          <div className="glass-card rounded-2xl p-4 text-center">
            <p className="font-sans-elegant text-xs text-muted-foreground mb-1">{t('registry.dialog.amount')}</p>
            <p className="font-serif-display text-2xl text-foreground font-bold">${selectedAmount}</p>
          </div>
          <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: 'stripe', variables: { borderRadius: '12px' } } }}>
            <CheckoutForm amount={selectedAmount!} onSuccess={handleSuccess} t={t} />
          </Elements>
          <div className="text-center">
            <button type="button" onClick={() => setShowTerms(true)} className="font-sans-elegant text-[11px] text-primary underline hover:no-underline min-h-[36px] inline-flex items-center">
              <Shield className="w-3 h-3 inline mr-1" />
              {t('gift.terms.link')}
            </button>
          </div>
        </motion.div>
      ) : (
        <motion.div key="info" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 pt-1">
          <div className="glass-card rounded-2xl p-3 text-center">
            <p className="font-sans-elegant text-xs text-muted-foreground mb-0.5">{t('registry.dialog.amount')}</p>
            <p className="font-serif-display text-2xl text-foreground font-bold">${selectedAmount}</p>
          </div>

          <div>
            <label className="font-sans-elegant text-sm text-foreground block mb-2 font-semibold">
              {t('registry.dialog.name')} <span className="text-muted-foreground font-normal text-xs">({t('gift.optional')})</span>
            </label>
            <Input
              value={giftName}
              onChange={(e) => setGiftName(e.target.value)}
              placeholder={t('registry.dialog.name.placeholder')}
              className="font-sans-elegant rounded-full h-12 border-border/50 bg-background/50 backdrop-blur-sm text-base"
            />
          </div>

          <div>
            <label className="font-sans-elegant text-sm text-foreground block mb-2 font-semibold">
              Email <span className="text-muted-foreground font-normal text-xs">({t('gift.optional')} — for thank-you email)</span>
            </label>
            <Input
              type="email"
              value={giftEmail}
              onChange={(e) => setGiftEmail(e.target.value)}
              placeholder="your@email.com"
              className="font-sans-elegant rounded-full h-12 border-border/50 bg-background/50 backdrop-blur-sm text-base"
            />
          </div>

          <div>
            <label className="font-sans-elegant text-sm text-foreground block mb-2 font-semibold">
              {t('registry.dialog.message')}
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {quickMessages.map((msg) => (
                <motion.button
                  key={msg}
                  type="button"
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setGiftMessage(msg)}
                  className={`font-sans-elegant text-xs px-4 py-2.5 rounded-full border transition-all duration-200 min-h-[44px] ${
                    giftMessage === msg
                      ? 'border-primary bg-primary/10 text-primary font-semibold'
                      : 'border-border/30 text-muted-foreground hover:border-primary/30 hover:bg-primary/5 active:bg-primary/10'
                  }`}
                >
                  {msg}
                </motion.button>
              ))}
            </div>
            <Textarea
              value={giftMessage}
              onChange={(e) => setGiftMessage(e.target.value)}
              placeholder={t('registry.dialog.message.placeholder')}
              className="font-sans-elegant rounded-2xl border-border/50 bg-background/50 backdrop-blur-sm text-base"
              rows={2}
            />
          </div>

          {paymentError && (
            <div className="glass-card rounded-2xl p-4 border border-destructive/30 bg-destructive/5 text-center">
              <p className="font-sans-elegant text-sm text-destructive mb-3">{paymentError}</p>
              <motion.button
                type="button"
                onClick={handleRetry}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary inline-flex items-center gap-2 px-4 py-2 text-sm"
              >
                <RefreshCw className="w-4 h-4" />
                Try Again
              </motion.button>
            </div>
          )}

          <motion.button
            type="button"
            onClick={handleProceedToPayment}
            disabled={loading}
            whileTap={{ scale: 0.97 }}
            className="w-full btn-primary justify-center disabled:opacity-50 min-h-[56px] text-base"
          >
            {loading ? (
              <span className="animate-spin w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full" />
            ) : (
              <CreditCard className="w-5 h-5" />
            )}
            {loading ? '...' : t('gift.payCard')}
          </motion.button>

          <div className="text-center">
            <button type="button" onClick={() => setShowTerms(true)} className="font-sans-elegant text-[11px] text-primary underline hover:no-underline min-h-[36px] inline-flex items-center">
              <Shield className="w-3 h-3 inline mr-1" />
              {t('gift.terms.link')}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={handleClose}>
        <DrawerContent className="px-4 pb-6 max-h-[85dvh]">
          <DrawerHeader className="text-center py-3">
            <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center mx-auto mb-1 shadow-glow">
              <Heart className="w-4 h-4 text-primary-foreground" />
            </div>
            <DrawerTitle className="font-serif-display text-lg">{t('registry.dialog.title')}</DrawerTitle>
            <DrawerDescription className="font-sans-elegant text-muted-foreground text-xs">
              {t('registry.dialog.subtitle')}
            </DrawerDescription>
          </DrawerHeader>
          <div className="overflow-y-auto flex-1 px-1 pb-2 -mt-2">
            {content}
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="w-14 h-14 rounded-full gradient-primary flex items-center justify-center mx-auto mb-2 shadow-glow">
            <Heart className="w-6 h-6 text-primary-foreground" />
          </div>
          <DialogTitle className="font-serif-display text-2xl text-center">{t('registry.dialog.title')}</DialogTitle>
          <DialogDescription className="font-sans-elegant text-center text-muted-foreground">
            {t('registry.dialog.subtitle')}
          </DialogDescription>
        </DialogHeader>
        {content}
      </DialogContent>
    </Dialog>
  );
};

export default EmbeddedPaymentForm;
