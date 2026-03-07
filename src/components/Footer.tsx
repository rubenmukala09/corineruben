import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Heart, Instagram, Mail, MapPin, Send } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';

const Footer = () => {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [subscribing, setSubscribing] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error(t('footer.subscribe.invalidEmail'));
      return;
    }
    setSubscribing(true);
    try {
      const { error } = await (supabase as any).from('newsletter_subscribers').insert({ email: email.trim().toLowerCase() });
      if (error) {
        if (error.code === '23505') {
          toast.info(t('footer.subscribe.already'));
        } else throw error;
      } else {
        setSubscribed(true);
        toast.success(t('footer.subscribe.success'));
        setEmail('');
        setTimeout(() => setSubscribed(false), 5000);
      }
    } catch (err) {
      console.error(err);
      toast.error(t('footer.subscribe.error'));
    } finally {
      setSubscribing(false);
    }
  };

  const companyLinks = [
    { label: t('nav.home'), to: '/' },
    { label: t('nav.story'), to: '/story' },
  ];

  const inspirationLinks = [
    { label: t('nav.rsvp'), to: '/rsvp' },
  ];

  return (
    <footer className="footer-dark relative overflow-hidden z-20">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[300px] rounded-full bg-[hsl(var(--footer-fg))] opacity-5 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[250px] rounded-full bg-[hsl(var(--footer-fg))] opacity-[0.03] blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 md:px-12 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8 mb-14">
          {/* Brand */}
          <div className="md:col-span-1">
            <span className="font-serif-display text-2xl font-semibold text-[hsl(var(--footer-fg))] block mb-5">C & R</span>
            <p className="font-sans-elegant text-sm leading-relaxed mb-6 text-[hsl(var(--footer-muted))]">
              {t('hero.tagline')}. {t('hero.date')}.
            </p>
            <div className="flex gap-3">
              {[
                { Icon: Instagram, label: 'Instagram' },
                { Icon: Mail, label: 'Email' },
                { Icon: MapPin, label: 'Location' },
              ].map(({ Icon, label }, i) => (
                <a key={i} href="#" aria-label={label} className="w-10 h-10 rounded-full bg-[hsl(var(--footer-fg))]/10 hover:bg-[hsl(var(--footer-fg))]/20 flex items-center justify-center transition-all duration-300 hover:scale-110 border border-[hsl(var(--footer-fg))]/10">
                  <Icon className="w-4 h-4 text-[hsl(var(--footer-muted))]" />
                </a>
              ))}
            </div>
          </div>

          {/* Links col 1 */}
          <div>
            <h2 className="font-sans-elegant text-xs font-semibold tracking-[0.2em] uppercase mb-5 text-[hsl(var(--footer-fg))]">
              {t('footer.links')}
            </h2>
            <ul className="space-y-3">
              {companyLinks.map(link => (
                <li key={link.to}>
                  <Link to={link.to} className="font-sans-elegant text-sm text-[hsl(var(--footer-muted))] hover:text-[hsl(var(--footer-fg))] transition-all duration-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links col 2 */}
          <div>
            <h2 className="font-sans-elegant text-xs font-semibold tracking-[0.2em] uppercase mb-5 text-[hsl(var(--footer-fg))]">
              {t('footer.celebrate')}
            </h2>
            <ul className="space-y-3">
              {inspirationLinks.map(link => (
                <li key={link.to}>
                  <Link to={link.to} className="font-sans-elegant text-sm text-[hsl(var(--footer-muted))] hover:text-[hsl(var(--footer-fg))] transition-all duration-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Subscribe */}
          <div>
            <h2 className="font-sans-elegant text-xs font-semibold tracking-[0.2em] uppercase mb-5 text-[hsl(var(--footer-fg))]">
              {t('footer.subscribe.title')}
            </h2>
            <p className="font-sans-elegant text-sm text-[hsl(var(--footer-muted))] leading-relaxed mb-4">
              {t('footer.subscribe.desc')}
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2 text-emerald-400">
                <Heart className="w-4 h-4 fill-current" />
                <span className="font-sans-elegant text-sm font-medium">{t('footer.subscribe.thankyou')}</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('footer.subscribe.placeholder')}
                  className="font-sans-elegant rounded-full h-10 text-sm bg-[hsl(var(--footer-fg))]/10 border-[hsl(var(--footer-fg))]/20 text-[hsl(var(--footer-fg))] placeholder:text-[hsl(var(--footer-muted))]/60"
                  required
                />
                <button
                  type="submit"
                  disabled={subscribing}
                  aria-label="Subscribe to newsletter"
                  className="w-10 h-10 rounded-full bg-primary flex items-center justify-center hover:bg-primary/90 transition-colors disabled:opacity-50 flex-shrink-0"
                >
                  <Send className="w-4 h-4 text-primary-foreground" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-[hsl(var(--footer-fg))]/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[hsl(var(--footer-muted))] flex items-center gap-1.5 font-sans-elegant">
            {t('footer.made')} <Heart className="w-3 h-3 text-dusty-rose fill-dusty-rose" /> {t('footer.copyright')}
          </p>
          <p className="font-serif-display text-lg font-semibold text-[hsl(var(--footer-fg))]">Corine & Ruben</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;