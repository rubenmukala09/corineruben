import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Heart, Instagram, Mail, MapPin, Send, MessageSquare, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const Footer = () => {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [subscribing, setSubscribing] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  // Contact form
  const [contactOpen, setContactOpen] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSending, setContactSending] = useState(false);
  const [contactSent, setContactSent] = useState(false);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactEmail.trim() || !contactMessage.trim()) return;
    setContactSending(true);
    try {
      const { error } = await supabase.from('contact_messages').insert({
        name: contactName.trim(),
        email: contactEmail.trim().toLowerCase(),
        message: contactMessage.trim(),
      });
      if (error) throw error;
      setContactSent(true);
      setContactName('');
      setContactEmail('');
      setContactMessage('');
      toast.success('Message sent! We\'ll get back to you soon.');
      setTimeout(() => { setContactSent(false); setContactOpen(false); }, 3000);
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setContactSending(false);
    }
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error(t('footer.subscribe.invalidEmail'));
      return;
    }
    setSubscribing(true);
    try {
      const { error } = await supabase.from('newsletter_subscribers').insert({ email: email.trim().toLowerCase() });
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
    { label: t('nav.rsvp'), to: '/rsvp' },
    { label: t('nav.faq'), to: '/faq' },
  ];

  const inspirationLinks = [
    { label: t('nav.gallery'), to: '/gallery' },
    { label: t('nav.guestbook'), to: '/guestbook' },
    { label: t('nav.enquiries'), to: '/enquiries' },
    { label: t('nav.registry'), to: '/registry' },
  ];

  return (
    <footer className="footer-dark relative overflow-hidden z-20">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[300px] rounded-full bg-[hsl(var(--footer-fg))] opacity-5 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[250px] rounded-full bg-[hsl(var(--footer-fg))] opacity-[0.03] blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 md:px-12 py-12 md:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8 mb-14">
          {/* Brand */}
          <div className="md:col-span-1">
            <span className="font-serif-display text-xl md:text-2xl font-semibold text-[hsl(var(--footer-fg))] block mb-4 md:mb-5">Corine & Ruben's Wedding</span>
            <p className="font-sans-elegant text-sm leading-relaxed mb-6 text-[hsl(var(--footer-muted))]">
              {t('hero.tagline')}.
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
          <p className="font-serif-display text-lg font-semibold text-[hsl(var(--footer-fg))]">Corine & Ruben's Wedding</p>
          <button
            type="button"
            onClick={() => setContactOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[hsl(var(--footer-fg))]/10 hover:bg-[hsl(var(--footer-fg))]/20 border border-[hsl(var(--footer-fg))]/15 transition-all duration-300 font-sans-elegant text-sm text-[hsl(var(--footer-muted))] hover:text-[hsl(var(--footer-fg))]"
          >
            <MessageSquare className="w-4 h-4" />
            Contact Us
          </button>
        </div>
      </div>

      {/* Contact Modal */}
      {contactOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setContactOpen(false)} />
          <div className="relative w-full max-w-md glass-card-strong rounded-3xl p-8 shadow-2xl">
            <button
              type="button"
              aria-label="Close contact form"
              onClick={() => setContactOpen(false)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-muted/50 hover:bg-muted flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl gradient-primary flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h2 className="font-serif-display text-xl font-semibold text-foreground">Contact Us</h2>
                <p className="font-sans-elegant text-xs text-muted-foreground">We'd love to hear from you</p>
              </div>
            </div>

            {contactSent ? (
              <div className="text-center py-8">
                <Heart className="w-10 h-10 text-dusty-rose fill-dusty-rose mx-auto mb-3" />
                <p className="font-serif-display text-lg font-semibold text-foreground mb-1">Thank you!</p>
                <p className="font-sans-elegant text-sm text-muted-foreground">We'll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <label className="font-sans-elegant text-xs font-medium text-muted-foreground mb-1.5 block">Your Name</label>
                  <Input
                    value={contactName}
                    onChange={e => setContactName(e.target.value)}
                    placeholder="Jane Doe"
                    className="rounded-xl glass-card border-border/30 font-sans-elegant"
                    required
                  />
                </div>
                <div>
                  <label className="font-sans-elegant text-xs font-medium text-muted-foreground mb-1.5 block">Email Address</label>
                  <Input
                    type="email"
                    value={contactEmail}
                    onChange={e => setContactEmail(e.target.value)}
                    placeholder="jane@example.com"
                    className="rounded-xl glass-card border-border/30 font-sans-elegant"
                    required
                  />
                </div>
                <div>
                  <label className="font-sans-elegant text-xs font-medium text-muted-foreground mb-1.5 block">Message</label>
                  <Textarea
                    value={contactMessage}
                    onChange={e => setContactMessage(e.target.value)}
                    placeholder="Write your message here..."
                    className="rounded-xl glass-card border-border/30 font-sans-elegant min-h-[120px]"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={contactSending || !contactName.trim() || !contactEmail.trim() || !contactMessage.trim()}
                  className="w-full btn-primary justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {contactSending ? (
                    <span className="flex items-center gap-2"><Send className="w-4 h-4 animate-pulse" /> Sending...</span>
                  ) : (
                    <span className="flex items-center gap-2"><Send className="w-4 h-4" /> Send Message</span>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;