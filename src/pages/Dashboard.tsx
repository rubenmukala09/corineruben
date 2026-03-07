import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import {
  Users, Utensils, Gift, Heart, CheckCircle, XCircle, Clock,
  TrendingUp, BarChart3, PieChart, MapPin, Sparkles, Loader2, LogOut,
  Megaphone, Trash2, Plus, Share2, Copy, Check, QrCode,
  MessageCircleQuestion, Send, Bell, Image, BookOpen
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from '@/components/ui/table';
import ImageManager from '@/components/dashboard/ImageManager';
import StoryManager from '@/components/dashboard/StoryManager';


const TABLE_NAMES = [
  'Rose', 'Lavande', 'Jasmin', 'Orchidée', 'Lys', 'Pivoine', 'Magnolia', 'Camélia',
  'Tulipe', 'Iris', 'Dahlia', 'Violette', 'Lilas', 'Azalée', 'Hortensia', 'Amaryllis',
];

/* ── Reusable components ── */

const StatCard = ({ icon: Icon, label, value, sub, color, bg }: {
  icon: React.ElementType; label: string; value: string | number; sub?: string; color: string; bg: string;
}) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
    className="glass-card-strong rounded-3xl p-6 relative overflow-hidden card-hover">
    <div className={`absolute top-0 right-0 w-20 h-20 rounded-full bg-gradient-to-br ${bg} blur-xl pointer-events-none opacity-60`} />
    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${bg} flex items-center justify-center mb-4`}>
      <Icon className={`w-6 h-6 ${color}`} />
    </div>
    <p className="font-sans-elegant text-xs text-muted-foreground font-medium tracking-wide uppercase mb-1">{label}</p>
    <p className="font-serif-display text-3xl font-semibold text-foreground">{value}</p>
    {sub && <p className="font-sans-elegant text-xs text-muted-foreground mt-1">{sub}</p>}
  </motion.div>
);

const DonutChart = ({ segments, size = 120 }: { segments: { value: number; color: string; label: string }[]; size?: number }) => {
  const total = segments.reduce((a, s) => a + s.value, 0);
  if (total === 0) return <p className="text-center text-muted-foreground font-sans-elegant text-sm">No data yet</p>;
  let cumulative = 0;
  const gradientParts = segments.map(s => {
    const start = (cumulative / total) * 360;
    cumulative += s.value;
    const end = (cumulative / total) * 360;
    return `${s.color} ${start}deg ${end}deg`;
  });

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="rounded-full relative" style={{ width: size, height: size, background: `conic-gradient(${gradientParts.join(', ')})` }}>
        <div className="absolute inset-3 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center">
          <span className="font-serif-display text-xl font-semibold text-foreground">{total}</span>
        </div>
      </div>
      <div className="flex flex-wrap gap-3 justify-center">
        {segments.map(s => (
          <div key={s.label} className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }} />
            <span className="font-sans-elegant text-xs text-muted-foreground">{s.label} ({s.value})</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const ProgressBar = ({ value, max, color }: { value: number; max: number; color: string }) => (
  <div className="w-full h-2.5 rounded-full bg-muted/50 overflow-hidden">
    <motion.div initial={{ width: 0 }} animate={{ width: `${Math.min((value / max) * 100, 100)}%` }}
      transition={{ duration: 1, ease: 'easeOut' }} className={`h-full rounded-full ${color}`} />
  </div>
);

/* ── Types ── */
interface RsvpRow {
  id: string; name: string; email: string | null; attending: boolean;
  guests: number; companions: string[] | null; cuisine: string | null;
  meal: string | null; sides: string[] | null; drinks: string[] | null;
  dietary: string | null; table_name: string | null; stay_anonymous: boolean | null;
  status: string; message: string | null; created_at: string; updated_at: string;
}

interface GiftRow {
  id: string; from_name: string; amount: number; message: string | null; created_at: string;
}

interface AnnouncementRow {
  id: string; title: string; content: string; created_at: string;
  title_fr: string | null; title_es: string | null;
  content_fr: string | null; content_es: string | null;
}

interface QuoteRow {
  id: string; content: string; created_at: string;
}

interface EnquiryRow {
  id: string; name: string; email: string; question: string;
  answer: string | null; status: string; created_at: string; answered_at: string | null;
}

const Dashboard = () => {
  const { t } = useLanguage();
  const { signOut } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [rsvps, setRsvps] = useState<RsvpRow[]>([]);
  const [gifts, setGifts] = useState<GiftRow[]>([]);
  const [announcements, setAnnouncements] = useState<AnnouncementRow[]>([]);
  const [quotes, setQuotes] = useState<QuoteRow[]>([]);
  const [enquiries, setEnquiries] = useState<EnquiryRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [annTitle, setAnnTitle] = useState('');
  const [annTitleFr, setAnnTitleFr] = useState('');
  const [annTitleEs, setAnnTitleEs] = useState('');
  const [annContent, setAnnContent] = useState('');
  const [annContentFr, setAnnContentFr] = useState('');
  const [annContentEs, setAnnContentEs] = useState('');
  const [annPosting, setAnnPosting] = useState(false);
  const [quoteContent, setQuoteContent] = useState('');
  const [quotePosting, setQuotePosting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [donateLink, setDonateLink] = useState('');
  const [donateLabel, setDonateLabel] = useState('Gift / Donate');
  const [donateCopied, setDonateCopied] = useState(false);
  const [answerTexts, setAnswerTexts] = useState<Record<string, string>>({});
  const [answerSending, setAnswerSending] = useState<string | null>(null);

  const staffUrl = `${window.location.origin}/staff`;

  useEffect(() => {
    const fetchData = async () => {
      const [rsvpRes, giftRes, annRes, quoteRes, enqRes] = await Promise.all([
        supabase.from('rsvps').select('*').order('created_at', { ascending: false }),
        supabase.from('gifts').select('*').order('created_at', { ascending: false }),
        supabase.from('announcements').select('*').order('created_at', { ascending: false }),
        supabase.from('quotes').select('*').order('created_at', { ascending: false }),
        supabase.from('enquiries').select('*').order('created_at', { ascending: false }),
      ]);
      if (rsvpRes.data) setRsvps(rsvpRes.data);
      if (giftRes.data) setGifts(giftRes.data);
      if (annRes.data) setAnnouncements(annRes.data);
      if (quoteRes.data) setQuotes(quoteRes.data);
      if (enqRes.data) setEnquiries(enqRes.data as EnquiryRow[]);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handlePostAnnouncement = async () => {
    if (!annTitle.trim() || !annContent.trim()) return;
    setAnnPosting(true);
    const { data, error } = await supabase.from('announcements').insert({
      title: annTitle.trim(),
      content: annContent.trim(),
      title_fr: annTitleFr.trim() || annTitle.trim(),
      title_es: annTitleEs.trim() || annTitle.trim(),
      content_fr: annContentFr.trim() || annContent.trim(),
      content_es: annContentEs.trim() || annContent.trim(),
    }).select().single();
    if (data && !error) {
      setAnnouncements([data as AnnouncementRow, ...announcements]);
      setAnnTitle(''); setAnnTitleFr(''); setAnnTitleEs('');
      setAnnContent(''); setAnnContentFr(''); setAnnContentEs('');
    }
    setAnnPosting(false);
  };

  const handleDeleteAnnouncement = async (id: string) => {
    await supabase.from('announcements').delete().eq('id', id);
    setAnnouncements(announcements.filter(a => a.id !== id));
  };

  const handlePostQuote = async () => {
    if (!quoteContent.trim()) return;
    setQuotePosting(true);
    const { data, error } = await supabase.from('quotes').insert({ content: quoteContent.trim() }).select().single();
    if (data && !error) {
      setQuotes([data, ...quotes]);
      setQuoteContent('');
    }
    setQuotePosting(false);
  };

  const handleDeleteQuote = async (id: string) => {
    await supabase.from('quotes').delete().eq('id', id);
    setQuotes(quotes.filter(q => q.id !== id));
  };

  const handleAnswerEnquiry = async (id: string) => {
    const answer = answerTexts[id]?.trim();
    if (!answer) return;
    setAnswerSending(id);
    const { error } = await supabase.from('enquiries').update({
      answer,
      status: 'answered',
      answered_at: new Date().toISOString(),
    }).eq('id', id);
    if (!error) {
      setEnquiries(enquiries.map(e => e.id === id ? { ...e, answer, status: 'answered', answered_at: new Date().toISOString() } : e));
      setAnswerTexts(prev => { const n = { ...prev }; delete n[id]; return n; });
    }
    setAnswerSending(null);
  };

  const handleDeleteEnquiry = async (id: string) => {
    await supabase.from('enquiries').delete().eq('id', id);
    setEnquiries(enquiries.filter(e => e.id !== id));
  };

  const unansweredCount = enquiries.filter(e => e.status === 'pending').length;

  const confirmed = rsvps.filter(r => r.status === 'confirmed');
  const pending = rsvps.filter(r => r.status === 'pending');
  const declined = rsvps.filter(r => r.status === 'declined');
  const totalGuests = confirmed.reduce((a, r) => a + r.guests, 0);
  const totalGifts = gifts.reduce((a, g) => a + g.amount, 0);

  const mealCounts = confirmed.reduce((acc, r) => {
    if (r.cuisine) acc[r.cuisine] = (acc[r.cuisine] || 0) + r.guests;
    return acc;
  }, {} as Record<string, number>);

  const filteredRsvps = rsvps.filter(r =>
    r.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const tablesUsed = [...new Set(confirmed.map(r => r.table_name).filter(Boolean))];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-20 relative">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl relative z-10">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="inline-block px-5 py-2 rounded-full glass-card-strong mb-5">
            <p className="font-sans-elegant text-xs tracking-[0.25em] uppercase text-muted-foreground font-medium">
              {t('dashboard.admin')}
            </p>
          </div>
          <h1 className="font-serif-display text-4xl md:text-6xl text-foreground mb-4 font-semibold">
            {t('dashboard.title')}
          </h1>
          <p className="font-sans-elegant text-base text-muted-foreground max-w-md mx-auto">
            {t('dashboard.subtitle')}
          </p>
        </motion.div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="glass-card-strong rounded-2xl p-1.5 mx-auto flex flex-wrap w-fit gap-1 max-w-full">
            <TabsTrigger value="overview" className="rounded-full px-4 py-2 font-sans-elegant text-xs font-bold data-[state=active]:gradient-primary data-[state=active]:text-primary-foreground">
              <BarChart3 className="w-3.5 h-3.5 mr-1.5" /> {t('dashboard.overview')}
            </TabsTrigger>
            <TabsTrigger value="guests" className="rounded-full px-4 py-2 font-sans-elegant text-xs font-bold data-[state=active]:gradient-primary data-[state=active]:text-primary-foreground">
              <Users className="w-3.5 h-3.5 mr-1.5" /> {t('dashboard.guests')}
            </TabsTrigger>
            <TabsTrigger value="tables" className="rounded-full px-4 py-2 font-sans-elegant text-xs font-bold data-[state=active]:gradient-primary data-[state=active]:text-primary-foreground">
              <MapPin className="w-3.5 h-3.5 mr-1.5" /> {t('dashboard.seating')}
            </TabsTrigger>
            <TabsTrigger value="gifts" className="rounded-full px-4 py-2 font-sans-elegant text-xs font-bold data-[state=active]:gradient-primary data-[state=active]:text-primary-foreground">
              <Gift className="w-3.5 h-3.5 mr-1.5" /> {t('dashboard.gifts')}
            </TabsTrigger>
            <TabsTrigger value="images" className="rounded-full px-4 py-2 font-sans-elegant text-xs font-bold data-[state=active]:gradient-primary data-[state=active]:text-primary-foreground">
              <Image className="w-3.5 h-3.5 mr-1.5" /> Images
            </TabsTrigger>
            <TabsTrigger value="story" className="rounded-full px-4 py-2 font-sans-elegant text-xs font-bold data-[state=active]:gradient-primary data-[state=active]:text-primary-foreground">
              <BookOpen className="w-3.5 h-3.5 mr-1.5" /> Story
            </TabsTrigger>
            <TabsTrigger value="announcements" className="rounded-full px-4 py-2 font-sans-elegant text-xs font-bold data-[state=active]:gradient-primary data-[state=active]:text-primary-foreground">
              <Megaphone className="w-3.5 h-3.5 mr-1.5" /> {t('dashboard.announcements')}
            </TabsTrigger>
            <TabsTrigger value="quotes" className="rounded-full px-4 py-2 font-sans-elegant text-xs font-bold data-[state=active]:gradient-primary data-[state=active]:text-primary-foreground">
              <Heart className="w-3.5 h-3.5 mr-1.5" /> {t('dashboard.quotes')}
            </TabsTrigger>
            <TabsTrigger value="enquiries" className="rounded-full px-4 py-2 font-sans-elegant text-xs font-bold data-[state=active]:gradient-primary data-[state=active]:text-primary-foreground relative">
              <MessageCircleQuestion className="w-3.5 h-3.5 mr-1.5" /> {t('dashboard.enquiries')}
              {unansweredCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-500 text-[10px] font-bold text-white flex items-center justify-center animate-pulse">
                  {unansweredCount}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="share" className="rounded-full px-4 py-2 font-sans-elegant text-xs font-bold data-[state=active]:gradient-primary data-[state=active]:text-primary-foreground">
              <Share2 className="w-3.5 h-3.5 mr-1.5" /> Share
            </TabsTrigger>
          </TabsList>

          {/* ═══ OVERVIEW TAB ═══ */}
          <TabsContent value="overview" className="space-y-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatCard icon={Users} label={t('dashboard.totalGuests')} value={totalGuests} sub={t('dashboard.families').replace('{n}', String(confirmed.length))} color="text-violet-400" bg="from-violet-500/20 to-purple-500/10" />
              <StatCard icon={CheckCircle} label={t('dashboard.confirmed')} value={confirmed.length} sub={rsvps.length ? t('dashboard.responseRate').replace('{n}', String(Math.round((confirmed.length / rsvps.length) * 100))) : '—'} color="text-emerald-400" bg="from-emerald-500/20 to-teal-500/10" />
              <StatCard icon={Clock} label={t('dashboard.pending')} value={pending.length} sub={t('dashboard.awaitingResponse')} color="text-amber-400" bg="from-amber-500/20 to-orange-500/10" />
              <StatCard icon={Gift} label={t('dashboard.totalGifts')} value={`$${totalGifts.toLocaleString()}`} sub={t('dashboard.contributions').replace('{n}', String(gifts.length))} color="text-rose-400" bg="from-rose-500/20 to-pink-500/10" />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="glass-card-strong rounded-3xl p-8">
                <div className="flex items-center gap-2 mb-6">
                  <PieChart className="w-5 h-5 text-primary" />
                  <h3 className="font-serif-display text-lg font-semibold text-foreground">{t('dashboard.rsvpStatus')}</h3>
                </div>
                <DonutChart segments={[
                  { value: confirmed.length, color: 'hsl(152, 60%, 52%)', label: t('dashboard.confirmed') },
                  { value: pending.length, color: 'hsl(38, 92%, 60%)', label: t('dashboard.pending') },
                  { value: declined.length, color: 'hsl(0, 72%, 62%)', label: t('dashboard.declined') },
                ]} />
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                className="glass-card-strong rounded-3xl p-8">
                <div className="flex items-center gap-2 mb-6">
                  <Utensils className="w-5 h-5 text-primary" />
                  <h3 className="font-serif-display text-lg font-semibold text-foreground">{t('dashboard.cuisinePrefs')}</h3>
                </div>
                <div className="space-y-5">
                  {Object.keys(mealCounts).length === 0 && (
                    <p className="font-sans-elegant text-sm text-muted-foreground text-center">{t('dashboard.noMealData')}</p>
                  )}
                  {Object.entries(mealCounts).map(([cuisine, count]) => (
                    <div key={cuisine}>
                      <div className="flex justify-between mb-2">
                        <span className="font-sans-elegant text-sm font-medium text-foreground capitalize">{cuisine}</span>
                        <span className="font-sans-elegant text-sm text-muted-foreground">{count} {t('dashboard.guestsLabel')}</span>
                      </div>
                      <ProgressBar value={count} max={totalGuests || 1} color="bg-primary" />
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Recent Activity */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="glass-card-strong rounded-3xl p-8">
              <div className="flex items-center gap-2 mb-6">
                <TrendingUp className="w-5 h-5 text-primary" />
                <h3 className="font-serif-display text-lg font-semibold text-foreground">{t('dashboard.recentActivity')}</h3>
              </div>
              {rsvps.length === 0 ? (
                <p className="font-sans-elegant text-sm text-muted-foreground text-center py-8">{t('dashboard.noRsvps')}</p>
              ) : (
                <div className="space-y-3">
                  {rsvps.slice(0, 5).map(r => (
                    <div key={r.id} className="flex items-center gap-4 glass-card rounded-2xl p-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        r.status === 'confirmed' ? 'bg-emerald-500/15' : r.status === 'pending' ? 'bg-amber-500/15' : 'bg-rose-500/15'
                      }`}>
                        {r.status === 'confirmed' ? <CheckCircle className="w-5 h-5 text-emerald-400" /> :
                         r.status === 'pending' ? <Clock className="w-5 h-5 text-amber-400" /> :
                         <XCircle className="w-5 h-5 text-rose-400" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-sans-elegant text-sm font-semibold text-foreground truncate">{r.name}</p>
                        <p className="font-sans-elegant text-xs text-muted-foreground">{r.guests} {t('dashboard.guestsLabel')}{r.guests > 1 ? '' : ''} · {new Date(r.created_at).toLocaleDateString()}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${
                        r.status === 'confirmed' ? 'bg-emerald-500/15 text-emerald-500' :
                        r.status === 'pending' ? 'bg-amber-500/15 text-amber-500' :
                        'bg-rose-500/15 text-rose-500'
                      }`}>{r.status}</span>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </TabsContent>

          {/* ═══ GUESTS TAB ═══ */}
          <TabsContent value="guests" className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('dashboard.searchGuests')} className="pl-4 rounded-full h-11 glass-card border-border/30 font-sans-elegant" />
              </div>
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="glass-card-strong rounded-3xl overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="border-border/20">
                    <TableHead className="font-sans-elegant text-xs font-bold tracking-wide uppercase text-muted-foreground">{t('dashboard.guest')}</TableHead>
                    <TableHead className="font-sans-elegant text-xs font-bold tracking-wide uppercase text-muted-foreground">{t('dashboard.partySize')}</TableHead>
                    <TableHead className="font-sans-elegant text-xs font-bold tracking-wide uppercase text-muted-foreground">{t('dashboard.status')}</TableHead>
                    <TableHead className="font-sans-elegant text-xs font-bold tracking-wide uppercase text-muted-foreground">{t('dashboard.cuisine')}</TableHead>
                    <TableHead className="font-sans-elegant text-xs font-bold tracking-wide uppercase text-muted-foreground">{t('dashboard.table')}</TableHead>
                    <TableHead className="font-sans-elegant text-xs font-bold tracking-wide uppercase text-muted-foreground">{t('dashboard.message')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRsvps.length === 0 ? (
                    <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground font-sans-elegant">{t('dashboard.noGuests')}</TableCell></TableRow>
                  ) : filteredRsvps.map(r => (
                    <TableRow key={r.id} className="border-border/10 hover:bg-primary/5">
                      <TableCell className="font-sans-elegant text-sm font-semibold text-foreground">{r.name}</TableCell>
                      <TableCell className="font-sans-elegant text-sm text-muted-foreground">{r.guests}</TableCell>
                      <TableCell>
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${
                          r.status === 'confirmed' ? 'bg-emerald-500/15 text-emerald-500' :
                          r.status === 'pending' ? 'bg-amber-500/15 text-amber-500' :
                          'bg-rose-500/15 text-rose-500'
                        }`}>{r.status}</span>
                      </TableCell>
                      <TableCell className="font-sans-elegant text-sm text-muted-foreground capitalize">{r.cuisine || '—'}</TableCell>
                      <TableCell className="font-sans-elegant text-sm text-muted-foreground">{r.table_name || '—'}</TableCell>
                      <TableCell className="font-sans-elegant text-xs text-muted-foreground max-w-[150px] truncate">{r.message || '—'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </motion.div>
          </TabsContent>

          {/* ═══ SEATING TAB ═══ */}
          <TabsContent value="tables" className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-4">
              <p className="font-sans-elegant text-sm text-muted-foreground">
                {t('dashboard.tablesAssigned').replace('{used}', String(tablesUsed.length)).replace('{total}', String(TABLE_NAMES.length)).replace('{guests}', String(totalGuests))}
              </p>
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {TABLE_NAMES.map((tableName, i) => {
                const tableGuests = confirmed.filter(r => r.table_name === tableName);
                const guestCount = tableGuests.reduce((a, r) => a + r.guests, 0);
                const maxSeats = 8;
                const hasGuests = guestCount > 0;

                return (
                  <motion.div key={tableName} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.03 }}
                    className={`glass-card-strong rounded-3xl p-5 text-center relative overflow-hidden ${hasGuests ? 'card-hover' : 'opacity-50'}`}>
                    {hasGuests && (
                      <div className="absolute top-0 right-0 w-16 h-16 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 blur-xl pointer-events-none" />
                    )}
                    <p className="font-serif-display text-base font-semibold text-foreground mb-1">🌸 {tableName}</p>
                    <p className="font-sans-elegant text-2xl font-bold text-foreground">{guestCount}</p>
                    <p className="font-sans-elegant text-[10px] text-muted-foreground">{t('dashboard.ofSeats').replace('{n}', String(maxSeats))}</p>
                    <div className="mt-3">
                      <ProgressBar value={guestCount} max={maxSeats} color={guestCount >= maxSeats ? 'bg-rose-400' : 'bg-primary'} />
                    </div>
                    {tableGuests.length > 0 && (
                      <div className="mt-3 space-y-1">
                        {tableGuests.map(g => (
                          <p key={g.id} className="font-sans-elegant text-[10px] text-muted-foreground truncate">{g.name}</p>
                        ))}
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </TabsContent>

          {/* ═══ GIFTS TAB ═══ */}
          <TabsContent value="gifts" className="space-y-6">
            <div className="grid sm:grid-cols-3 gap-4">
              <StatCard icon={Gift} label={t('dashboard.totalReceived')} value={`$${totalGifts.toLocaleString()}`} color="text-rose-400" bg="from-rose-500/20 to-pink-500/10" />
              <StatCard icon={Heart} label={t('dashboard.contributors')} value={gifts.length} color="text-violet-400" bg="from-violet-500/20 to-purple-500/10" />
              <StatCard icon={TrendingUp} label={t('dashboard.averageGift')} value={gifts.length ? `$${Math.round(totalGifts / gifts.length)}` : '$0'} color="text-amber-400" bg="from-amber-500/20 to-orange-500/10" />
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="glass-card-strong rounded-3xl overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="border-border/20">
                    <TableHead className="font-sans-elegant text-xs font-bold tracking-wide uppercase text-muted-foreground">{t('dashboard.from')}</TableHead>
                    <TableHead className="font-sans-elegant text-xs font-bold tracking-wide uppercase text-muted-foreground">{t('dashboard.amount')}</TableHead>
                    <TableHead className="font-sans-elegant text-xs font-bold tracking-wide uppercase text-muted-foreground">{t('dashboard.date')}</TableHead>
                    <TableHead className="font-sans-elegant text-xs font-bold tracking-wide uppercase text-muted-foreground">{t('dashboard.message')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {gifts.length === 0 ? (
                    <TableRow><TableCell colSpan={4} className="text-center py-8 text-muted-foreground font-sans-elegant">{t('dashboard.noGifts')}</TableCell></TableRow>
                  ) : gifts.map(g => (
                    <TableRow key={g.id} className="border-border/10 hover:bg-primary/5">
                      <TableCell className="font-sans-elegant text-sm font-semibold text-foreground">{g.from_name}</TableCell>
                      <TableCell className="font-serif-display text-lg font-bold text-foreground">${g.amount}</TableCell>
                      <TableCell className="font-sans-elegant text-sm text-muted-foreground">{new Date(g.created_at).toLocaleDateString()}</TableCell>
                      <TableCell className="font-sans-elegant text-xs text-muted-foreground max-w-[200px] truncate">{g.message || '—'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </motion.div>

            {gifts.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="glass-card-strong rounded-3xl p-8">
                <div className="flex items-center gap-2 mb-6">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <h3 className="font-serif-display text-lg font-semibold text-foreground">{t('dashboard.giftTiers')}</h3>
                </div>
                <DonutChart segments={[
                  { value: gifts.filter(g => g.amount <= 60).length, color: 'hsl(200, 60%, 55%)', label: '💐 ≤$60' },
                  { value: gifts.filter(g => g.amount > 60 && g.amount <= 100).length, color: 'hsl(38, 92%, 60%)', label: '🥂 $100' },
                  { value: gifts.filter(g => g.amount > 100 && g.amount <= 200).length, color: 'hsl(280, 60%, 60%)', label: '✨ $200' },
                  { value: gifts.filter(g => g.amount > 200).length, color: 'hsl(340, 70%, 55%)', label: '💎 $500+' },
                ]} />
              </motion.div>
            )}
          </TabsContent>

          {/* ═══ ANNOUNCEMENTS TAB ═══ */}
          <TabsContent value="announcements" className="space-y-6">
            {/* New announcement form */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="glass-card-strong rounded-3xl p-8">
              <div className="flex items-center gap-2 mb-6">
                <Plus className="w-5 h-5 text-primary" />
                <h3 className="font-serif-display text-lg font-semibold text-foreground">{t('dashboard.newAnnouncement')}</h3>
              </div>
              <div className="space-y-4">
                <p className="font-sans-elegant text-xs text-muted-foreground font-medium">🇬🇧 English (required)</p>
                <Input
                  value={annTitle}
                  onChange={(e) => setAnnTitle(e.target.value)}
                  placeholder="Title (English)"
                  className="rounded-2xl h-11 glass-card border-border/30 font-sans-elegant"
                />
                <Textarea
                  value={annContent}
                  onChange={(e) => setAnnContent(e.target.value)}
                  placeholder="Content (English)"
                  className="rounded-2xl glass-card border-border/30 font-sans-elegant min-h-[80px]"
                />

                <p className="font-sans-elegant text-xs text-muted-foreground font-medium pt-2">🇫🇷 Français (optionnel)</p>
                <Input
                  value={annTitleFr}
                  onChange={(e) => setAnnTitleFr(e.target.value)}
                  placeholder="Titre (Français)"
                  className="rounded-2xl h-11 glass-card border-border/30 font-sans-elegant"
                />
                <Textarea
                  value={annContentFr}
                  onChange={(e) => setAnnContentFr(e.target.value)}
                  placeholder="Contenu (Français)"
                  className="rounded-2xl glass-card border-border/30 font-sans-elegant min-h-[80px]"
                />

                <p className="font-sans-elegant text-xs text-muted-foreground font-medium pt-2">🇪🇸 Español (opcional)</p>
                <Input
                  value={annTitleEs}
                  onChange={(e) => setAnnTitleEs(e.target.value)}
                  placeholder="Título (Español)"
                  className="rounded-2xl h-11 glass-card border-border/30 font-sans-elegant"
                />
                <Textarea
                  value={annContentEs}
                  onChange={(e) => setAnnContentEs(e.target.value)}
                  placeholder="Contenido (Español)"
                  className="rounded-2xl glass-card border-border/30 font-sans-elegant min-h-[80px]"
                />

                <button
                  onClick={handlePostAnnouncement}
                  disabled={annPosting || !annTitle.trim() || !annContent.trim()}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {annPosting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Megaphone className="w-4 h-4" />}
                  {t('dashboard.post')}
                </button>
              </div>
            </motion.div>

            {/* Announcements list */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="space-y-4">
              {announcements.length === 0 ? (
                <div className="glass-card-strong rounded-3xl p-12 text-center">
                  <Megaphone className="w-8 h-8 text-muted-foreground/40 mx-auto mb-3" />
                  <p className="font-sans-elegant text-sm text-muted-foreground">{t('dashboard.noAnnouncements')}</p>
                </div>
              ) : announcements.map((ann) => (
                <div key={ann.id} className="glass-card-strong rounded-3xl p-6 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary/20 to-violet-500/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <Megaphone className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-sans-elegant text-sm font-bold text-foreground mb-1">{ann.title}</p>
                    <p className="font-sans-elegant text-sm text-muted-foreground leading-relaxed">{ann.content}</p>
                    <p className="font-sans-elegant text-[10px] text-muted-foreground/60 mt-2">
                      {new Date(ann.created_at).toLocaleDateString()} · {new Date(ann.created_at).toLocaleTimeString()}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeleteAnnouncement(ann.id)}
                    className="w-9 h-9 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 flex items-center justify-center transition-colors flex-shrink-0"
                    title={t('dashboard.deleteConfirm')}
                  >
                    <Trash2 className="w-4 h-4 text-rose-500" />
                  </button>
                </div>
              ))}
            </motion.div>
          </TabsContent>

          {/* ═══ QUOTES TAB ═══ */}
          <TabsContent value="quotes" className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="glass-card-strong rounded-3xl p-8">
              <div className="flex items-center gap-2 mb-6">
                <Plus className="w-5 h-5 text-primary" />
                <h3 className="font-serif-display text-lg font-semibold text-foreground">{t('dashboard.newQuote')}</h3>
              </div>
              <div className="space-y-4">
                <Textarea
                  value={quoteContent}
                  onChange={(e) => setQuoteContent(e.target.value)}
                  placeholder={t('dashboard.quotePlaceholder')}
                  className="rounded-2xl glass-card border-border/30 font-sans-elegant min-h-[100px]"
                />
                <button
                  onClick={handlePostQuote}
                  disabled={quotePosting || !quoteContent.trim()}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {quotePosting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Heart className="w-4 h-4" />}
                  {t('dashboard.post')}
                </button>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="space-y-4">
              {quotes.length === 0 ? (
                <div className="glass-card-strong rounded-3xl p-12 text-center">
                  <Heart className="w-8 h-8 text-muted-foreground/40 mx-auto mb-3" />
                  <p className="font-sans-elegant text-sm text-muted-foreground">{t('dashboard.noQuotes')}</p>
                </div>
              ) : quotes.map((q) => (
                <div key={q.id} className="glass-card-strong rounded-3xl p-6 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-rose-500/20 to-pink-500/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <Heart className="w-5 h-5 text-rose-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-serif-display text-base text-foreground italic leading-relaxed">"{q.content}"</p>
                    <p className="font-sans-elegant text-[10px] text-muted-foreground/60 mt-2">
                      {new Date(q.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeleteQuote(q.id)}
                    className="w-9 h-9 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 flex items-center justify-center transition-colors flex-shrink-0"
                    title={t('dashboard.deleteConfirm')}
                  >
                    <Trash2 className="w-4 h-4 text-rose-500" />
                  </button>
                </div>
              ))}
            </motion.div>
          </TabsContent>

          {/* ═══ ENQUIRIES TAB ═══ */}
          <TabsContent value="enquiries" className="space-y-6">
            {/* Stats */}
            <div className="grid sm:grid-cols-3 gap-4">
              <StatCard icon={MessageCircleQuestion} label={t('dashboard.enquiries')} value={enquiries.length} color="text-blue-400" bg="from-blue-500/20 to-cyan-500/10" />
              <StatCard icon={CheckCircle} label={t('dashboard.answered')} value={enquiries.filter(e => e.status === 'answered').length} color="text-emerald-400" bg="from-emerald-500/20 to-teal-500/10" />
              <StatCard icon={Bell} label={t('dashboard.unanswered')} value={unansweredCount} sub={unansweredCount > 0 ? '⚡ Needs attention' : '✓ All clear'} color="text-amber-400" bg="from-amber-500/20 to-orange-500/10" />
            </div>

            {/* Enquiries list */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="space-y-4">
              {enquiries.length === 0 ? (
                <div className="glass-card-strong rounded-3xl p-12 text-center">
                  <MessageCircleQuestion className="w-8 h-8 text-muted-foreground/40 mx-auto mb-3" />
                  <p className="font-sans-elegant text-sm text-muted-foreground">{t('dashboard.noEnquiries')}</p>
                </div>
              ) : enquiries.map((enq) => (
                <div key={enq.id} className="glass-card-strong rounded-3xl p-6 space-y-4">
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 mt-1 ${
                      enq.status === 'answered' ? 'bg-gradient-to-br from-emerald-500/20 to-teal-500/10' : 'bg-gradient-to-br from-amber-500/20 to-orange-500/10'
                    }`}>
                      {enq.status === 'answered' ? <CheckCircle className="w-5 h-5 text-emerald-400" /> : <Clock className="w-5 h-5 text-amber-400" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-sans-elegant text-sm font-bold text-foreground">{enq.name}</p>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${
                          enq.status === 'answered' ? 'bg-emerald-500/15 text-emerald-500' : 'bg-amber-500/15 text-amber-500'
                        }`}>{enq.status === 'answered' ? t('dashboard.answered') : t('dashboard.unanswered')}</span>
                      </div>
                      <p className="font-sans-elegant text-xs text-muted-foreground mb-2">📧 {enq.email} · {new Date(enq.created_at).toLocaleDateString()}</p>
                      <div className="glass-card rounded-2xl p-3 mb-3">
                        <p className="font-sans-elegant text-sm text-foreground leading-relaxed">❓ {enq.question}</p>
                      </div>
                      {enq.answer && (
                        <div className="glass-card rounded-2xl p-3 border-l-4 border-emerald-500/30">
                          <p className="font-sans-elegant text-xs text-emerald-500 font-bold mb-1">✅ {t('dashboard.answered')}</p>
                          <p className="font-sans-elegant text-sm text-foreground leading-relaxed">{enq.answer}</p>
                        </div>
                      )}
                      {enq.status === 'pending' && (
                        <div className="flex gap-2 mt-3">
                          <Textarea
                            value={answerTexts[enq.id] || ''}
                            onChange={(e) => setAnswerTexts(prev => ({ ...prev, [enq.id]: e.target.value }))}
                            placeholder={t('dashboard.answerPlaceholder')}
                            className="rounded-2xl glass-card border-border/30 font-sans-elegant min-h-[80px] flex-1"
                          />
                        </div>
                      )}
                      {enq.status === 'pending' && (
                        <button
                          onClick={() => handleAnswerEnquiry(enq.id)}
                          disabled={answerSending === enq.id || !answerTexts[enq.id]?.trim()}
                          className="btn-primary mt-3 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {answerSending === enq.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                          {t('dashboard.sendAnswer')}
                        </button>
                      )}
                    </div>
                    <button
                      onClick={() => handleDeleteEnquiry(enq.id)}
                      className="w-9 h-9 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 flex items-center justify-center transition-colors flex-shrink-0"
                      title={t('dashboard.deleteConfirm')}
                    >
                      <Trash2 className="w-4 h-4 text-rose-500" />
                    </button>
                  </div>
                </div>
              ))}
            </motion.div>
          </TabsContent>

          {/* ═══ IMAGES TAB ═══ */}
          <TabsContent value="images" className="space-y-6">
            <ImageManager />
          </TabsContent>

          {/* ═══ STORY TAB ═══ */}
          <TabsContent value="story" className="space-y-6">
            <StoryManager />
          </TabsContent>

          {/* ═══ SHARE TAB ═══ */}
          <TabsContent value="share" className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="glass-card-strong rounded-3xl p-8 max-w-lg mx-auto text-center">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto mb-6">
                <Share2 className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-serif-display text-xl font-semibold text-foreground mb-2">Share Staff Access</h3>
              <p className="font-sans-elegant text-sm text-muted-foreground mb-8">
                Share this link or QR code with your event coordinators so they can view guest info, seating, and announcements in real time.
              </p>

              {/* QR Code */}
              <div className="glass-card rounded-3xl p-6 mb-6 inline-block">
                <QRCodeSVG
                  value={staffUrl}
                  size={180}
                  bgColor="transparent"
                  fgColor="hsl(286, 13%, 27%)"
                  level="M"
                  includeMargin={false}
                />
              </div>

              {/* Copyable link */}
              <div className="flex items-center gap-2 glass-card rounded-full p-1.5 pl-5">
                <p className="font-sans-elegant text-sm text-foreground truncate flex-1 text-left">{staffUrl}</p>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(staffUrl);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                  className="btn-primary !rounded-full !px-5 !py-2.5 flex items-center gap-2 flex-shrink-0"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied!' : 'Copy Link'}
                </button>
              </div>

              <p className="font-sans-elegant text-[10px] text-muted-foreground mt-6">
                No login required · Live data · Auto-refreshes every 30 seconds
              </p>
            </motion.div>

            {/* Donate QR Code */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="glass-card-strong rounded-3xl p-8 max-w-lg mx-auto">
              <div className="text-center mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto mb-4">
                  <Gift className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-serif-display text-xl font-semibold text-foreground mb-2">Donate / Gift QR Code</h3>
                <p className="font-sans-elegant text-sm text-muted-foreground">
                  Paste any payment link (PayPal, CashApp, Venmo, Zelle, etc.) to generate a QR code guests can scan to donate.
                </p>
              </div>

              <div className="space-y-3 mb-6">
                <Input
                  value={donateLabel}
                  onChange={(e) => setDonateLabel(e.target.value)}
                  placeholder="Label (e.g. 'Gift / Donate')"
                  className="rounded-2xl h-11 glass-card border-border/30 font-sans-elegant"
                />
                <Input
                  value={donateLink}
                  onChange={(e) => setDonateLink(e.target.value)}
                  placeholder="https://paypal.me/yourname or any payment link..."
                  className="rounded-2xl h-11 glass-card border-border/30 font-sans-elegant"
                />
              </div>

              {donateLink.trim() ? (
                <div className="text-center space-y-4">
                  <div className="glass-card rounded-3xl p-6 inline-block">
                    <p className="font-sans-elegant text-xs text-muted-foreground mb-3 font-medium">{donateLabel}</p>
                    <QRCodeSVG
                      value={donateLink.trim()}
                      size={200}
                      bgColor="transparent"
                      fgColor="hsl(286, 13%, 27%)"
                      level="M"
                      includeMargin={false}
                    />
                  </div>

                  <div className="flex items-center gap-2 glass-card rounded-full p-1.5 pl-5">
                    <p className="font-sans-elegant text-sm text-foreground truncate flex-1 text-left">{donateLink}</p>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(donateLink);
                        setDonateCopied(true);
                        setTimeout(() => setDonateCopied(false), 2000);
                      }}
                      className="btn-primary !rounded-full !px-5 !py-2.5 flex items-center gap-2 flex-shrink-0"
                    >
                      {donateCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      {donateCopied ? 'Copied!' : 'Copy'}
                    </button>
                  </div>

                  <p className="font-sans-elegant text-[10px] text-muted-foreground">
                    Share this QR code or link with guests · No personal info required · Works with any payment app
                  </p>
                </div>
              ) : (
                <div className="text-center py-6">
                  <QrCode className="w-8 h-8 text-muted-foreground/30 mx-auto mb-2" />
                  <p className="font-sans-elegant text-sm text-muted-foreground">Enter a payment link above to generate a QR code</p>
                </div>
              )}
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
