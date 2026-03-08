import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Send, BookOpen, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  created_at: string;
}

const COLORS = [
  'from-dusty-rose/20 to-plum/10',
  'from-plum/20 to-violet-500/10',
  'from-amber-400/15 to-orange-300/10',
  'from-emerald-500/15 to-teal-400/10',
  'from-primary/20 to-violet-400/10',
];

const Guestbook = () => {
  const { t } = useLanguage();
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEntries = async () => {
    const { data } = await supabase
      .from('guestbook')
      .select('id, name, message, created_at')
      .eq('approved', true)
      .order('created_at', { ascending: false });
    if (data) setEntries(data);
    setLoading(false);
  };

  useEffect(() => { fetchEntries(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    setSubmitting(true);
    const { error } = await supabase.from('guestbook').insert({
      name: name.trim(),
      message: message.trim(),
    });
    if (error) {
      toast.error('Something went wrong. Please try again.');
    } else {
      toast.success(t('guestbook.success'));
      setName('');
      setMessage('');
      fetchEntries();
    }
    setSubmitting(false);
  };

  const formatDate = (iso: string) => {
    return new Date(iso).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="min-h-screen pt-28 pb-20 relative">
      <div className="container mx-auto px-6 md:px-12 max-w-2xl relative z-10">
        <div className="glass-section p-6 md:p-10">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="inline-block px-5 py-2 rounded-full glass-card-strong mb-5">
            <p className="font-sans-elegant text-xs tracking-[0.25em] uppercase text-muted-foreground font-medium">{t('guestbook.badge')}</p>
          </div>
          <h1 className="font-serif-display text-4xl md:text-6xl text-foreground mb-4 font-semibold" style={{ letterSpacing: '-0.5px' }}>
            {t('guestbook.title')}
          </h1>
          <p className="font-sans-elegant text-base text-muted-foreground max-w-sm mx-auto" style={{ lineHeight: 1.6 }}>
            {t('guestbook.subtitle')}
          </p>
        </motion.div>

        {/* Submit form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="glass-card-strong rounded-3xl p-8 mb-10 space-y-4"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-11 h-11 rounded-2xl gradient-primary flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h2 className="font-serif-display text-lg font-semibold text-foreground">{t('guestbook.badge')}</h2>
              <p className="font-sans-elegant text-xs text-muted-foreground">{t('guestbook.subtitle')}</p>
            </div>
          </div>

          <div>
            <label className="font-sans-elegant text-sm font-medium text-foreground mb-1.5 block">{t('guestbook.form.name')}</label>
            <Input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder={t('guestbook.form.placeholder.name')}
              className="rounded-2xl h-11 glass-card border-border/30 font-sans-elegant"
              required
              maxLength={80}
            />
          </div>

          <div>
            <label className="font-sans-elegant text-sm font-medium text-foreground mb-1.5 block">{t('guestbook.form.message')}</label>
            <Textarea
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder={t('guestbook.form.placeholder.message')}
              className="rounded-2xl glass-card border-border/30 font-sans-elegant min-h-[110px]"
              required
              maxLength={500}
            />
            <p className="font-sans-elegant text-xs text-muted-foreground/60 mt-1 text-right">{message.length}/500</p>
          </div>

          <button
            type="submit"
            disabled={submitting || !name.trim() || !message.trim()}
            className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
            {t('guestbook.form.submit')}
          </button>
        </motion.form>

        {/* Messages section */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <Heart className="w-4 h-4 text-primary fill-primary" />
            <h2 className="font-serif-display text-xl font-semibold text-foreground">{t('guestbook.messages')}</h2>
            {entries.length > 0 && (
              <span className="ml-auto font-sans-elegant text-xs text-muted-foreground">{entries.length} message{entries.length !== 1 ? 's' : ''}</span>
            )}
          </div>

          {loading ? (
            <div className="flex justify-center py-16">
              <Loader2 className="w-8 h-8 animate-spin text-primary/50" />
            </div>
          ) : entries.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="glass-card-strong rounded-3xl p-12 text-center"
            >
              <p className="text-4xl mb-4">💕</p>
              <p className="font-sans-elegant text-sm text-muted-foreground">{t('guestbook.empty')}</p>
            </motion.div>
          ) : (
            <div className="space-y-4">
              <AnimatePresence>
                {entries.map((entry, i) => (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className={`glass-card-strong rounded-2xl p-6 bg-gradient-to-br ${COLORS[i % COLORS.length]}`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-xs font-bold text-primary-foreground font-serif-display">
                          {entry.name.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-sans-elegant text-sm font-semibold text-foreground">{entry.name}</span>
                      </div>
                      <span className="font-sans-elegant text-xs text-muted-foreground flex-shrink-0">{formatDate(entry.created_at)}</span>
                    </div>
                    <p className="font-sans-elegant text-sm text-foreground/80 leading-relaxed italic">
                      "{entry.message}"
                    </p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
        </div>
      </div>
    </div>
  );
};

export default Guestbook;
