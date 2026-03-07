import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Users, Utensils, CheckCircle, XCircle, Clock, MapPin,
  Megaphone, Search, MessageSquare, Bell, ChevronDown, ChevronUp,
  PieChart, BarChart3, Eye
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from '@/components/ui/table';

const TABLE_NAMES = [
  'Rose', 'Lavande', 'Jasmin', 'Orchidée', 'Lys', 'Pivoine', 'Magnolia', 'Camélia',
  'Tulipe', 'Iris', 'Dahlia', 'Violette', 'Lilas', 'Azalée', 'Hortensia', 'Amaryllis',
];

/* ── Reusable components ── */

const StatCard = ({ icon: Icon, label, value, sub, color, bg }: {
  icon: React.ElementType; label: string; value: string | number; sub?: string; color: string; bg: string;
}) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
    className="glass-card-strong rounded-3xl p-5 relative overflow-hidden card-hover">
    <div className={`absolute top-0 right-0 w-16 h-16 rounded-full bg-gradient-to-br ${bg} blur-xl pointer-events-none opacity-60`} />
    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${bg} flex items-center justify-center mb-3`}>
      <Icon className={`w-5 h-5 ${color}`} />
    </div>
    <p className="font-sans-elegant text-[10px] text-muted-foreground font-medium tracking-wide uppercase mb-1">{label}</p>
    <p className="font-serif-display text-2xl font-semibold text-foreground">{value}</p>
    {sub && <p className="font-sans-elegant text-[10px] text-muted-foreground mt-1">{sub}</p>}
  </motion.div>
);

const ProgressBar = ({ value, max, color }: { value: number; max: number; color: string }) => (
  <div className="w-full h-2 rounded-full bg-muted/50 overflow-hidden">
    <motion.div initial={{ width: 0 }} animate={{ width: `${Math.min((value / max) * 100, 100)}%` }}
      transition={{ duration: 1, ease: 'easeOut' }} className={`h-full rounded-full ${color}`} />
  </div>
);

const DonutChart = ({ segments, size = 100 }: { segments: { value: number; color: string; label: string }[]; size?: number }) => {
  const total = segments.reduce((a, s) => a + s.value, 0);
  if (total === 0) return <p className="text-center text-muted-foreground font-sans-elegant text-sm">No data</p>;
  let cumulative = 0;
  const gradientParts = segments.map(s => {
    const start = (cumulative / total) * 360;
    cumulative += s.value;
    const end = (cumulative / total) * 360;
    return `${s.color} ${start}deg ${end}deg`;
  });
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="rounded-full relative" style={{ width: size, height: size, background: `conic-gradient(${gradientParts.join(', ')})` }}>
        <div className="absolute inset-2.5 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center">
          <span className="font-serif-display text-lg font-semibold text-foreground">{total}</span>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 justify-center">
        {segments.map(s => (
          <div key={s.label} className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: s.color }} />
            <span className="font-sans-elegant text-[10px] text-muted-foreground">{s.label} ({s.value})</span>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ── Types ── */
interface RsvpRow {
  id: string; name: string; email: string | null; attending: boolean;
  guests: number; companions: string[] | null; cuisine: string | null;
  meal: string | null; sides: string[] | null; drinks: string[] | null;
  dietary: string | null; table_name: string | null; stay_anonymous: boolean | null;
  status: string; message: string | null; created_at: string; updated_at: string;
}

interface AnnouncementRow {
  id: string; title: string; content: string; created_at: string;
}

const Staff = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [rsvps, setRsvps] = useState<RsvpRow[]>([]);
  const [announcements, setAnnouncements] = useState<AnnouncementRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedMessage, setExpandedMessage] = useState<string | null>(null);
  const [showNotification, setShowNotification] = useState(false);
  const [lastSeenCount, setLastSeenCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const [rsvpRes, annRes] = await Promise.all([
        supabase.from('rsvps').select('*').order('created_at', { ascending: false }),
        supabase.from('announcements').select('*').order('created_at', { ascending: false }),
      ]);
      if (rsvpRes.data) setRsvps(rsvpRes.data);
      if (annRes.data) {
        setAnnouncements(annRes.data);
        const stored = localStorage.getItem('staff_ann_count');
        const prev = stored ? parseInt(stored, 10) : 0;
        if (annRes.data.length > prev) {
          setShowNotification(true);
        }
        setLastSeenCount(annRes.data.length);
      }
      setLoading(false);
    };
    fetchData();

    // Poll for new announcements every 30s
    const interval = setInterval(async () => {
      const { data } = await supabase.from('announcements').select('*').order('created_at', { ascending: false });
      if (data) {
        setAnnouncements(data);
        const stored = localStorage.getItem('staff_ann_count');
        const prev = stored ? parseInt(stored, 10) : 0;
        if (data.length > prev) {
          setShowNotification(true);
        }
      }
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const dismissNotification = () => {
    setShowNotification(false);
    localStorage.setItem('staff_ann_count', String(announcements.length));
  };

  const confirmed = rsvps.filter(r => r.status === 'confirmed');
  const pending = rsvps.filter(r => r.status === 'pending');
  const declined = rsvps.filter(r => r.status === 'declined');
  const totalGuests = confirmed.reduce((a, r) => a + r.guests, 0);

  const mealCounts = confirmed.reduce((acc, r) => {
    if (r.cuisine) acc[r.cuisine] = (acc[r.cuisine] || 0) + r.guests;
    return acc;
  }, {} as Record<string, number>);

  const filteredRsvps = rsvps.filter(r =>
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (r.table_name || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const messagesRsvps = rsvps.filter(r => r.message && r.message.trim().length > 0);
  const tablesUsed = [...new Set(confirmed.map(r => r.table_name).filter(Boolean))];
  const newAnnouncementsCount = announcements.length - (parseInt(localStorage.getItem('staff_ann_count') || '0', 10));

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}>
          <Users className="w-8 h-8 text-primary" />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-20 relative">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl relative z-10">

        {/* Announcement notification banner */}
        <AnimatePresence>
          {showNotification && newAnnouncementsCount > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-6 glass-card-strong rounded-2xl p-4 border border-primary/30 flex items-center gap-3 cursor-pointer"
              onClick={() => { dismissNotification(); setActiveTab('announcements'); }}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center animate-pulse">
                <Bell className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-sans-elegant text-sm font-semibold text-foreground">
                  {newAnnouncementsCount} new announcement{newAnnouncementsCount > 1 ? 's' : ''}!
                </p>
                <p className="font-sans-elegant text-xs text-muted-foreground">
                  Tap to view the latest updates
                </p>
              </div>
              <Megaphone className="w-5 h-5 text-primary" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="inline-block px-5 py-2 rounded-full glass-card-strong mb-4">
            <p className="font-sans-elegant text-xs tracking-[0.25em] uppercase text-muted-foreground font-medium">
              Event Coordination
            </p>
          </div>
          <h1 className="font-serif-display text-3xl md:text-5xl text-foreground mb-3 font-semibold">
            Staff Dashboard
          </h1>
          <p className="font-sans-elegant text-sm text-muted-foreground max-w-md mx-auto">
            Guest management, seating overview & live announcements
          </p>
        </motion.div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="glass-card-strong rounded-full p-1 mx-auto flex w-fit gap-1 flex-wrap justify-center">
            <TabsTrigger value="overview" className="rounded-full px-4 py-2 font-sans-elegant text-xs font-bold data-[state=active]:gradient-primary data-[state=active]:text-primary-foreground">
              <BarChart3 className="w-3.5 h-3.5 mr-1.5" /> Overview
            </TabsTrigger>
            <TabsTrigger value="guests" className="rounded-full px-4 py-2 font-sans-elegant text-xs font-bold data-[state=active]:gradient-primary data-[state=active]:text-primary-foreground">
              <Users className="w-3.5 h-3.5 mr-1.5" /> Guests
            </TabsTrigger>
            <TabsTrigger value="messages" className="rounded-full px-4 py-2 font-sans-elegant text-xs font-bold data-[state=active]:gradient-primary data-[state=active]:text-primary-foreground">
              <MessageSquare className="w-3.5 h-3.5 mr-1.5" /> Messages
            </TabsTrigger>
            <TabsTrigger value="seating" className="rounded-full px-4 py-2 font-sans-elegant text-xs font-bold data-[state=active]:gradient-primary data-[state=active]:text-primary-foreground">
              <MapPin className="w-3.5 h-3.5 mr-1.5" /> Seating
            </TabsTrigger>
            <TabsTrigger value="announcements" className="relative rounded-full px-4 py-2 font-sans-elegant text-xs font-bold data-[state=active]:gradient-primary data-[state=active]:text-primary-foreground">
              <Megaphone className="w-3.5 h-3.5 mr-1.5" /> Announcements
              {newAnnouncementsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-destructive text-destructive-foreground text-[8px] font-bold flex items-center justify-center">
                  {newAnnouncementsCount}
                </span>
              )}
            </TabsTrigger>
          </TabsList>

          {/* ═══ OVERVIEW ═══ */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <StatCard icon={Users} label="Total Guests" value={totalGuests} sub={`${confirmed.length} families`} color="text-violet-400" bg="from-violet-500/20 to-purple-500/10" />
              <StatCard icon={CheckCircle} label="Confirmed" value={confirmed.length} sub={rsvps.length ? `${Math.round((confirmed.length / rsvps.length) * 100)}% response` : '—'} color="text-emerald-400" bg="from-emerald-500/20 to-teal-500/10" />
              <StatCard icon={Clock} label="Pending" value={pending.length} sub="Awaiting response" color="text-amber-400" bg="from-amber-500/20 to-orange-500/10" />
              <StatCard icon={XCircle} label="Declined" value={declined.length} sub={`${tablesUsed.length} tables used`} color="text-rose-400" bg="from-rose-500/20 to-pink-500/10" />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="glass-card-strong rounded-3xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <PieChart className="w-4 h-4 text-primary" />
                  <h3 className="font-serif-display text-base font-semibold text-foreground">RSVP Status</h3>
                </div>
                <DonutChart segments={[
                  { value: confirmed.length, color: 'hsl(152, 60%, 52%)', label: 'Confirmed' },
                  { value: pending.length, color: 'hsl(38, 92%, 60%)', label: 'Pending' },
                  { value: declined.length, color: 'hsl(0, 72%, 62%)', label: 'Declined' },
                ]} />
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                className="glass-card-strong rounded-3xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Utensils className="w-4 h-4 text-primary" />
                  <h3 className="font-serif-display text-base font-semibold text-foreground">Cuisine Preferences</h3>
                </div>
                <div className="space-y-4">
                  {Object.keys(mealCounts).length === 0 ? (
                    <p className="font-sans-elegant text-sm text-muted-foreground text-center">No meal data yet</p>
                  ) : Object.entries(mealCounts).map(([cuisine, count]) => (
                    <div key={cuisine}>
                      <div className="flex justify-between mb-1">
                        <span className="font-sans-elegant text-xs font-medium text-foreground capitalize">{cuisine}</span>
                        <span className="font-sans-elegant text-xs text-muted-foreground">{count} guests</span>
                      </div>
                      <ProgressBar value={count} max={totalGuests || 1} color="bg-primary" />
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Quick Seating Summary */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="glass-card-strong rounded-3xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-4 h-4 text-primary" />
                <h3 className="font-serif-display text-base font-semibold text-foreground">Seating Summary</h3>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                {TABLE_NAMES.map(tn => {
                  const count = confirmed.filter(r => r.table_name === tn).reduce((a, r) => a + r.guests, 0);
                  return (
                    <div key={tn} className={`text-center p-2 rounded-xl ${count > 0 ? 'glass-card' : 'opacity-40'}`}>
                      <p className="font-sans-elegant text-[9px] text-muted-foreground truncate">{tn}</p>
                      <p className="font-serif-display text-sm font-bold text-foreground">{count}/8</p>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </TabsContent>

          {/* ═══ GUESTS ═══ */}
          <TabsContent value="guests" className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search by name or table..."
                className="pl-10 rounded-full h-10 glass-card border-border/30 font-sans-elegant text-sm"
              />
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="glass-card-strong rounded-3xl overflow-hidden">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border/20">
                      <TableHead className="font-sans-elegant text-[10px] font-bold tracking-wide uppercase text-muted-foreground">Guest</TableHead>
                      <TableHead className="font-sans-elegant text-[10px] font-bold tracking-wide uppercase text-muted-foreground">Party Size</TableHead>
                      <TableHead className="font-sans-elegant text-[10px] font-bold tracking-wide uppercase text-muted-foreground">Status</TableHead>
                      <TableHead className="font-sans-elegant text-[10px] font-bold tracking-wide uppercase text-muted-foreground">Cuisine</TableHead>
                      <TableHead className="font-sans-elegant text-[10px] font-bold tracking-wide uppercase text-muted-foreground">Table</TableHead>
                      <TableHead className="font-sans-elegant text-[10px] font-bold tracking-wide uppercase text-muted-foreground">Dietary</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRsvps.length === 0 ? (
                      <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground font-sans-elegant text-sm">No guests found</TableCell></TableRow>
                    ) : filteredRsvps.map(r => (
                      <TableRow key={r.id} className="border-border/10 hover:bg-primary/5">
                        <TableCell>
                          <div>
                            <p className="font-sans-elegant text-sm font-semibold text-foreground">{r.name}</p>
                            {r.companions && r.companions.length > 0 && (
                              <p className="font-sans-elegant text-[10px] text-muted-foreground">+{r.companions.join(', ')}</p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="font-sans-elegant text-sm text-foreground font-medium">{r.guests}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wide ${
                            r.status === 'confirmed' ? 'bg-emerald-500/15 text-emerald-500' :
                            r.status === 'pending' ? 'bg-amber-500/15 text-amber-500' :
                            'bg-rose-500/15 text-rose-500'
                          }`}>{r.status}</span>
                        </TableCell>
                        <TableCell className="font-sans-elegant text-xs text-muted-foreground capitalize">{r.cuisine || '—'}</TableCell>
                        <TableCell className="font-sans-elegant text-xs text-muted-foreground">{r.table_name || '—'}</TableCell>
                        <TableCell className="font-sans-elegant text-[10px] text-muted-foreground">{r.dietary || '—'}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </motion.div>
          </TabsContent>

          {/* ═══ MESSAGES ═══ */}
          <TabsContent value="messages" className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare className="w-4 h-4 text-primary" />
              <h3 className="font-serif-display text-base font-semibold text-foreground">
                Guest Messages ({messagesRsvps.length})
              </h3>
            </div>

            {messagesRsvps.length === 0 ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="glass-card-strong rounded-3xl p-12 text-center">
                <MessageSquare className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
                <p className="font-sans-elegant text-sm text-muted-foreground">No messages from guests yet</p>
              </motion.div>
            ) : (
              <div className="space-y-3">
                {messagesRsvps.map((r, i) => (
                  <motion.div key={r.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="glass-card-strong rounded-2xl p-4 cursor-pointer hover:bg-primary/5 transition-colors"
                    onClick={() => setExpandedMessage(expandedMessage === r.id ? null : r.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                          <span className="font-serif-display text-xs font-bold text-foreground">
                            {r.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="font-sans-elegant text-sm font-semibold text-foreground">{r.name}</p>
                          <p className="font-sans-elegant text-[10px] text-muted-foreground">
                            {new Date(r.created_at).toLocaleDateString()} · {r.guests} guest{r.guests > 1 ? 's' : ''} · {r.table_name || 'No table'}
                          </p>
                        </div>
                      </div>
                      {expandedMessage === r.id ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                    </div>
                    <AnimatePresence>
                      {expandedMessage === r.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <p className="font-sans-elegant text-sm text-foreground/80 mt-3 pt-3 border-t border-border/20 leading-relaxed">
                            "{r.message}"
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* ═══ SEATING ═══ */}
          <TabsContent value="seating" className="space-y-4">
            <div className="text-center mb-2">
              <p className="font-sans-elegant text-xs text-muted-foreground">
                {tablesUsed.length} of {TABLE_NAMES.length} tables assigned · {totalGuests} total guests
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {TABLE_NAMES.map((tableName, i) => {
                const tableGuests = confirmed.filter(r => r.table_name === tableName);
                const guestCount = tableGuests.reduce((a, r) => a + r.guests, 0);
                const maxSeats = 8;
                const hasGuests = guestCount > 0;

                return (
                  <motion.div key={tableName} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.03 }}
                    className={`glass-card-strong rounded-2xl p-4 text-center relative overflow-hidden ${hasGuests ? 'card-hover' : 'opacity-40'}`}>
                    {hasGuests && (
                      <div className="absolute top-0 right-0 w-12 h-12 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 blur-xl pointer-events-none" />
                    )}
                    <p className="font-serif-display text-sm font-semibold text-foreground mb-1">🌸 {tableName}</p>
                    <p className="font-sans-elegant text-xl font-bold text-foreground">{guestCount}<span className="text-xs text-muted-foreground font-normal">/{maxSeats}</span></p>
                    <div className="mt-2">
                      <ProgressBar value={guestCount} max={maxSeats} color={guestCount >= maxSeats ? 'bg-destructive' : 'bg-primary'} />
                    </div>
                    {tableGuests.length > 0 && (
                      <div className="mt-2 space-y-0.5">
                        {tableGuests.map(g => (
                          <p key={g.id} className="font-sans-elegant text-[9px] text-muted-foreground truncate">{g.name} ({g.guests})</p>
                        ))}
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </TabsContent>

          {/* ═══ ANNOUNCEMENTS ═══ */}
          <TabsContent value="announcements" className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Megaphone className="w-4 h-4 text-primary" />
              <h3 className="font-serif-display text-base font-semibold text-foreground">
                Announcements ({announcements.length})
              </h3>
            </div>

            {announcements.length === 0 ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="glass-card-strong rounded-3xl p-12 text-center">
                <Megaphone className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
                <p className="font-sans-elegant text-sm text-muted-foreground">No announcements yet</p>
              </motion.div>
            ) : (
              <div className="space-y-3">
                {announcements.map((ann, i) => (
                  <motion.div key={ann.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="glass-card-strong rounded-2xl p-5 relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-1 h-full bg-primary rounded-l-2xl" />
                    <div className="pl-3">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-serif-display text-base font-semibold text-foreground">{ann.title}</h4>
                        <span className="font-sans-elegant text-[10px] text-muted-foreground">
                          {new Date(ann.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="font-sans-elegant text-sm text-foreground/80 leading-relaxed">{ann.content}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Staff;
