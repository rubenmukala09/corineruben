import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { Send, MessageCircleQuestion, CheckCircle, Heart } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const Enquiries = () => {
  const { t } = useLanguage();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [question, setQuestion] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !question.trim()) return;
    setSending(true);
    const { error } = await supabase.from('enquiries').insert({
      name: name.trim(),
      email: email.trim(),
      question: question.trim(),
    });
    if (!error) {
      try {
        await supabase.functions.invoke('send-contact-email', {
          body: {
            name: name.trim(),
            email: email.trim(),
            message: question.trim(),
          },
        });
      } catch (emailErr) {
        console.error('Email notification failed:', emailErr);
      }
      setSent(true);
      setName('');
      setEmail('');
      setQuestion('');
    }
    setSending(false);
  };

  return (
    <div className="min-h-screen pt-28 pb-20 relative">
      <div className="container mx-auto px-6 md:px-12 max-w-2xl relative z-10">
        <div className="glass-section p-6 md:p-10">
        <div className="text-center mb-12">
          <div className="inline-block px-5 py-2 rounded-full glass-card-strong mb-5">
            <p className="font-sans-elegant text-xs tracking-[0.25em] uppercase text-muted-foreground font-medium">
              {t('enquiries.badge')}
            </p>
          </div>
          <h1 className="font-serif-display text-3xl md:text-5xl text-foreground mb-4 font-semibold">
            {t('enquiries.title')}
          </h1>
          <p className="font-sans-elegant text-base text-muted-foreground max-w-md mx-auto">
            {t('enquiries.subtitle')}
          </p>
        </div>

        {sent ? (
          <div className="glass-card-strong rounded-3xl p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-emerald-400" />
            </div>
            <h2 className="font-serif-display text-2xl font-semibold text-foreground mb-3">{t('enquiries.sent.title')}</h2>
            <p className="font-sans-elegant text-sm text-muted-foreground mb-6">{t('enquiries.sent.desc')}</p>
            <button onClick={() => setSent(false)} className="btn-primary">
              <MessageCircleQuestion className="w-4 h-4" />
              {t('enquiries.sent.another')}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}
            className="glass-card-strong rounded-3xl p-5 md:p-10 space-y-5 md:space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-violet-500/10 flex items-center justify-center">
                <MessageCircleQuestion className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="font-serif-display text-lg font-semibold text-foreground">{t('enquiries.form.title')}</h2>
                <p className="font-sans-elegant text-xs text-muted-foreground">{t('enquiries.form.desc')}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="font-sans-elegant text-sm font-medium text-foreground mb-1.5 block">{t('enquiries.form.name')}</label>
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder={t('enquiries.form.name.placeholder')}
                  className="rounded-2xl h-11 glass-card border-border/30 font-sans-elegant" required />
              </div>
              <div>
                <label className="font-sans-elegant text-sm font-medium text-foreground mb-1.5 block">{t('enquiries.form.email')}</label>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t('enquiries.form.email.placeholder')}
                  className="rounded-2xl h-11 glass-card border-border/30 font-sans-elegant" required />
              </div>
              <div>
                <label className="font-sans-elegant text-sm font-medium text-foreground mb-1.5 block">{t('enquiries.form.question')}</label>
                <Textarea value={question} onChange={(e) => setQuestion(e.target.value)} placeholder={t('enquiries.form.question.placeholder')}
                  className="rounded-2xl glass-card border-border/30 font-sans-elegant min-h-[120px]" required />
              </div>
            </div>

            <button type="submit" disabled={sending || !name.trim() || !email.trim() || !question.trim()}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed">
              <Send className="w-4 h-4" />
              {t('enquiries.form.submit')}
            </button>

            <div className="flex items-center justify-center gap-2 pt-2">
              <Heart className="w-3 h-3 text-primary/40 fill-primary/40" />
              <p className="font-sans-elegant text-[10px] text-muted-foreground">{t('enquiries.form.note')}</p>
              <Heart className="w-3 h-3 text-primary/40 fill-primary/40" />
            </div>
          </form>
        )}
        </div>
      </div>
    </div>
  );
};

export default Enquiries;
