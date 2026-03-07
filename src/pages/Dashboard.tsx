import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Users, Utensils, Gift, Heart, CheckCircle, XCircle, Clock,
  TrendingUp, BarChart3, PieChart, MapPin, Music, Sparkles,
  ChevronDown, Search, Filter, Download, Eye, Mail
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from '@/components/ui/table';

/* ── Mock data (replace with real DB data once Cloud is connected) ── */
const MOCK_RSVPS = [
  { id: 1, name: 'Alice & David Martin', guests: 2, status: 'confirmed', meal: 'Italian', table: 'Rose', date: '2026-02-14', message: 'So excited!' },
  { id: 2, name: 'Sophie Laurent', guests: 1, status: 'confirmed', meal: 'African', table: 'Lavande', date: '2026-02-15', message: 'Can\'t wait 💕' },
  { id: 3, name: 'Lucas & Emma Tremblay', guests: 3, status: 'confirmed', meal: 'Indian', table: 'Jasmin', date: '2026-02-16', message: '' },
  { id: 4, name: 'Paul Bernard', guests: 1, status: 'pending', meal: '', table: '', date: '2026-02-18', message: '' },
  { id: 5, name: 'Léa & Hugo Nguyen', guests: 2, status: 'confirmed', meal: 'Italian', table: 'Orchidée', date: '2026-02-20', message: 'We\'ll be there!' },
  { id: 6, name: 'Marc & Julie Rousseau', guests: 4, status: 'confirmed', meal: 'African', table: 'Lys', date: '2026-02-21', message: 'Bringing the kids' },
  { id: 7, name: 'Chloé Fontaine', guests: 1, status: 'declined', meal: '', table: '', date: '2026-02-22', message: 'So sorry, will be traveling' },
  { id: 8, name: 'Antoine & Clara Dubois', guests: 2, status: 'confirmed', meal: 'Italian', table: 'Pivoine', date: '2026-02-23', message: '' },
  { id: 9, name: 'Pierre & Marie Chevalier', guests: 2, status: 'pending', meal: '', table: '', date: '2026-02-25', message: '' },
  { id: 10, name: 'François & Nathalie Moreau', guests: 2, status: 'confirmed', meal: 'Indian', table: 'Magnolia', date: '2026-03-01', message: 'Blessed to witness!' },
];

const MOCK_GIFTS = [
  { id: 1, from: 'Alice Martin', amount: 200, message: 'For a beautiful honeymoon!', date: '2026-02-14' },
  { id: 2, from: 'Sophie Laurent', amount: 100, message: 'Love you both! 🥂', date: '2026-02-15' },
  { id: 3, from: 'Lucas Tremblay', amount: 60, message: '', date: '2026-02-16' },
  { id: 4, from: 'Léa Nguyen', amount: 500, message: 'God bless your union', date: '2026-02-20' },
  { id: 5, from: 'Marc Rousseau', amount: 100, message: 'Congratulations!', date: '2026-02-21' },
  { id: 6, from: 'Antoine Dubois', amount: 200, message: '', date: '2026-02-23' },
  { id: 7, from: 'François Moreau', amount: 100, message: 'With all our love', date: '2026-03-01' },
];

const TABLE_NAMES = [
  'Rose', 'Lavande', 'Jasmin', 'Orchidée', 'Lys', 'Pivoine', 'Magnolia', 'Camélia',
  'Tulipe', 'Iris', 'Dahlia', 'Violette', 'Lilas', 'Azalée', 'Hortensia', 'Amaryllis',
];

const StatCard = ({ icon: Icon, label, value, sub, color, bg }: {
  icon: React.ElementType; label: string; value: string | number; sub?: string; color: string; bg: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="glass-card-strong rounded-3xl p-6 relative overflow-hidden card-hover"
  >
    <div className={`absolute top-0 right-0 w-20 h-20 rounded-full bg-gradient-to-br ${bg} blur-xl pointer-events-none opacity-60`} />
    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${bg} flex items-center justify-center mb-4`}>
      <Icon className={`w-6 h-6 ${color}`} />
    </div>
    <p className="font-sans-elegant text-xs text-muted-foreground font-medium tracking-wide uppercase mb-1">{label}</p>
    <p className="font-serif-display text-3xl font-semibold text-foreground">{value}</p>
    {sub && <p className="font-sans-elegant text-xs text-muted-foreground mt-1">{sub}</p>}
  </motion.div>
);

/* ── Donut chart (pure CSS) ── */
const DonutChart = ({ segments, size = 120 }: { segments: { value: number; color: string; label: string }[]; size?: number }) => {
  const total = segments.reduce((a, s) => a + s.value, 0);
  let cumulative = 0;
  const gradientParts = segments.map(s => {
    const start = (cumulative / total) * 360;
    cumulative += s.value;
    const end = (cumulative / total) * 360;
    return `${s.color} ${start}deg ${end}deg`;
  });

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className="rounded-full relative"
        style={{
          width: size,
          height: size,
          background: `conic-gradient(${gradientParts.join(', ')})`,
        }}
      >
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

/* ── Progress bar ── */
const ProgressBar = ({ value, max, color }: { value: number; max: number; color: string }) => (
  <div className="w-full h-2.5 rounded-full bg-muted/50 overflow-hidden">
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: `${(value / max) * 100}%` }}
      transition={{ duration: 1, ease: 'easeOut' }}
      className={`h-full rounded-full ${color}`}
    />
  </div>
);

const Dashboard = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  const confirmed = MOCK_RSVPS.filter(r => r.status === 'confirmed');
  const pending = MOCK_RSVPS.filter(r => r.status === 'pending');
  const declined = MOCK_RSVPS.filter(r => r.status === 'declined');
  const totalGuests = confirmed.reduce((a, r) => a + r.guests, 0);
  const totalGifts = MOCK_GIFTS.reduce((a, g) => a + g.amount, 0);

  const mealCounts = confirmed.reduce((acc, r) => {
    if (r.meal) acc[r.meal] = (acc[r.meal] || 0) + r.guests;
    return acc;
  }, {} as Record<string, number>);

  const filteredRsvps = MOCK_RSVPS.filter(r =>
    r.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const tablesUsed = [...new Set(confirmed.map(r => r.table).filter(Boolean))];

  return (
    <div className="min-h-screen pt-28 pb-20 relative">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl relative z-10">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="inline-block px-5 py-2 rounded-full glass-card-strong mb-5">
            <p className="font-sans-elegant text-xs tracking-[0.25em] uppercase text-muted-foreground font-medium">
              Admin Panel
            </p>
          </div>
          <h1 className="font-serif-display text-4xl md:text-6xl text-foreground mb-4 font-semibold">
            Wedding Dashboard
          </h1>
          <p className="font-sans-elegant text-base text-muted-foreground max-w-md mx-auto">
            Track RSVPs, manage guests, and monitor gifts — all in one place.
          </p>
        </motion.div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="glass-card-strong rounded-full p-1 mx-auto flex w-fit gap-1">
            <TabsTrigger value="overview" className="rounded-full px-5 py-2 font-sans-elegant text-xs font-bold data-[state=active]:gradient-primary data-[state=active]:text-primary-foreground">
              <BarChart3 className="w-3.5 h-3.5 mr-1.5" /> Overview
            </TabsTrigger>
            <TabsTrigger value="guests" className="rounded-full px-5 py-2 font-sans-elegant text-xs font-bold data-[state=active]:gradient-primary data-[state=active]:text-primary-foreground">
              <Users className="w-3.5 h-3.5 mr-1.5" /> Guests
            </TabsTrigger>
            <TabsTrigger value="tables" className="rounded-full px-5 py-2 font-sans-elegant text-xs font-bold data-[state=active]:gradient-primary data-[state=active]:text-primary-foreground">
              <MapPin className="w-3.5 h-3.5 mr-1.5" /> Seating
            </TabsTrigger>
            <TabsTrigger value="gifts" className="rounded-full px-5 py-2 font-sans-elegant text-xs font-bold data-[state=active]:gradient-primary data-[state=active]:text-primary-foreground">
              <Gift className="w-3.5 h-3.5 mr-1.5" /> Gifts
            </TabsTrigger>
          </TabsList>

          {/* ═══ OVERVIEW TAB ═══ */}
          <TabsContent value="overview" className="space-y-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatCard icon={Users} label="Total Guests" value={totalGuests} sub={`${confirmed.length} families`} color="text-violet-400" bg="from-violet-500/20 to-purple-500/10" />
              <StatCard icon={CheckCircle} label="Confirmed" value={confirmed.length} sub={`${Math.round((confirmed.length / MOCK_RSVPS.length) * 100)}% response rate`} color="text-emerald-400" bg="from-emerald-500/20 to-teal-500/10" />
              <StatCard icon={Clock} label="Pending" value={pending.length} sub="Awaiting response" color="text-amber-400" bg="from-amber-500/20 to-orange-500/10" />
              <StatCard icon={Gift} label="Total Gifts" value={`$${totalGifts.toLocaleString()}`} sub={`${MOCK_GIFTS.length} contributions`} color="text-rose-400" bg="from-rose-500/20 to-pink-500/10" />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* RSVP Status Chart */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="glass-card-strong rounded-3xl p-8">
                <div className="flex items-center gap-2 mb-6">
                  <PieChart className="w-5 h-5 text-primary" />
                  <h3 className="font-serif-display text-lg font-semibold text-foreground">RSVP Status</h3>
                </div>
                <DonutChart segments={[
                  { value: confirmed.length, color: 'hsl(152, 60%, 52%)', label: 'Confirmed' },
                  { value: pending.length, color: 'hsl(38, 92%, 60%)', label: 'Pending' },
                  { value: declined.length, color: 'hsl(0, 72%, 62%)', label: 'Declined' },
                ]} />
              </motion.div>

              {/* Meal Preferences */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                className="glass-card-strong rounded-3xl p-8">
                <div className="flex items-center gap-2 mb-6">
                  <Utensils className="w-5 h-5 text-primary" />
                  <h3 className="font-serif-display text-lg font-semibold text-foreground">Meal Preferences</h3>
                </div>
                <div className="space-y-5">
                  {Object.entries(mealCounts).map(([meal, count]) => (
                    <div key={meal}>
                      <div className="flex justify-between mb-2">
                        <span className="font-sans-elegant text-sm font-medium text-foreground">
                          {meal === 'African' ? '🌍' : meal === 'Indian' ? '🇮🇳' : '🇮🇹'} {meal}
                        </span>
                        <span className="font-sans-elegant text-sm text-muted-foreground">{count} guests</span>
                      </div>
                      <ProgressBar value={count} max={totalGuests} color={
                        meal === 'African' ? 'bg-amber-400' : meal === 'Indian' ? 'bg-orange-400' : 'bg-emerald-400'
                      } />
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
                <h3 className="font-serif-display text-lg font-semibold text-foreground">Recent Activity</h3>
              </div>
              <div className="space-y-3">
                {[...MOCK_RSVPS].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5).map(r => (
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
                      <p className="font-sans-elegant text-xs text-muted-foreground">{r.guests} guest{r.guests > 1 ? 's' : ''} · {r.date}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${
                      r.status === 'confirmed' ? 'bg-emerald-500/15 text-emerald-500' :
                      r.status === 'pending' ? 'bg-amber-500/15 text-amber-500' :
                      'bg-rose-500/15 text-rose-500'
                    }`}>
                      {r.status}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </TabsContent>

          {/* ═══ GUESTS TAB ═══ */}
          <TabsContent value="guests" className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search guests..."
                  className="pl-10 rounded-full h-11 glass-card border-border/30 font-sans-elegant"
                />
              </div>
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="glass-card-strong rounded-3xl overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="border-border/20">
                    <TableHead className="font-sans-elegant text-xs font-bold tracking-wide uppercase text-muted-foreground">Guest</TableHead>
                    <TableHead className="font-sans-elegant text-xs font-bold tracking-wide uppercase text-muted-foreground">Party Size</TableHead>
                    <TableHead className="font-sans-elegant text-xs font-bold tracking-wide uppercase text-muted-foreground">Status</TableHead>
                    <TableHead className="font-sans-elegant text-xs font-bold tracking-wide uppercase text-muted-foreground">Meal</TableHead>
                    <TableHead className="font-sans-elegant text-xs font-bold tracking-wide uppercase text-muted-foreground">Table</TableHead>
                    <TableHead className="font-sans-elegant text-xs font-bold tracking-wide uppercase text-muted-foreground">Message</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRsvps.map(r => (
                    <TableRow key={r.id} className="border-border/10 hover:bg-primary/5">
                      <TableCell className="font-sans-elegant text-sm font-semibold text-foreground">{r.name}</TableCell>
                      <TableCell className="font-sans-elegant text-sm text-muted-foreground">{r.guests}</TableCell>
                      <TableCell>
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${
                          r.status === 'confirmed' ? 'bg-emerald-500/15 text-emerald-500' :
                          r.status === 'pending' ? 'bg-amber-500/15 text-amber-500' :
                          'bg-rose-500/15 text-rose-500'
                        }`}>
                          {r.status}
                        </span>
                      </TableCell>
                      <TableCell className="font-sans-elegant text-sm text-muted-foreground">{r.meal || '—'}</TableCell>
                      <TableCell className="font-sans-elegant text-sm text-muted-foreground">{r.table || '—'}</TableCell>
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
                {tablesUsed.length} of {TABLE_NAMES.length} tables assigned · {totalGuests} guests seated
              </p>
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {TABLE_NAMES.map((tableName, i) => {
                const tableGuests = confirmed.filter(r => r.table === tableName);
                const guestCount = tableGuests.reduce((a, r) => a + r.guests, 0);
                const maxSeats = 8;
                const hasGuests = guestCount > 0;

                return (
                  <motion.div
                    key={tableName}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.03 }}
                    className={`glass-card-strong rounded-3xl p-5 text-center relative overflow-hidden ${hasGuests ? 'card-hover' : 'opacity-50'}`}
                  >
                    {hasGuests && (
                      <div className="absolute top-0 right-0 w-16 h-16 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 blur-xl pointer-events-none" />
                    )}
                    <p className="font-serif-display text-base font-semibold text-foreground mb-1">🌸 {tableName}</p>
                    <p className="font-sans-elegant text-2xl font-bold text-foreground">{guestCount}</p>
                    <p className="font-sans-elegant text-[10px] text-muted-foreground">of {maxSeats} seats</p>
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
              <StatCard icon={Gift} label="Total Received" value={`$${totalGifts.toLocaleString()}`} color="text-rose-400" bg="from-rose-500/20 to-pink-500/10" />
              <StatCard icon={Heart} label="Contributors" value={MOCK_GIFTS.length} color="text-violet-400" bg="from-violet-500/20 to-purple-500/10" />
              <StatCard icon={TrendingUp} label="Average Gift" value={`$${Math.round(totalGifts / MOCK_GIFTS.length)}`} color="text-amber-400" bg="from-amber-500/20 to-orange-500/10" />
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="glass-card-strong rounded-3xl overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="border-border/20">
                    <TableHead className="font-sans-elegant text-xs font-bold tracking-wide uppercase text-muted-foreground">From</TableHead>
                    <TableHead className="font-sans-elegant text-xs font-bold tracking-wide uppercase text-muted-foreground">Amount</TableHead>
                    <TableHead className="font-sans-elegant text-xs font-bold tracking-wide uppercase text-muted-foreground">Date</TableHead>
                    <TableHead className="font-sans-elegant text-xs font-bold tracking-wide uppercase text-muted-foreground">Message</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {MOCK_GIFTS.map(g => (
                    <TableRow key={g.id} className="border-border/10 hover:bg-primary/5">
                      <TableCell className="font-sans-elegant text-sm font-semibold text-foreground">{g.from}</TableCell>
                      <TableCell className="font-serif-display text-lg font-bold text-foreground">${g.amount}</TableCell>
                      <TableCell className="font-sans-elegant text-sm text-muted-foreground">{g.date}</TableCell>
                      <TableCell className="font-sans-elegant text-xs text-muted-foreground max-w-[200px] truncate">{g.message || '—'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </motion.div>

            {/* Gift tier breakdown */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="glass-card-strong rounded-3xl p-8">
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-5 h-5 text-primary" />
                <h3 className="font-serif-display text-lg font-semibold text-foreground">Gift Tiers</h3>
              </div>
              <DonutChart segments={[
                { value: MOCK_GIFTS.filter(g => g.amount <= 60).length, color: 'hsl(200, 60%, 55%)', label: '💐 ≤$60' },
                { value: MOCK_GIFTS.filter(g => g.amount > 60 && g.amount <= 100).length, color: 'hsl(38, 92%, 60%)', label: '🥂 $100' },
                { value: MOCK_GIFTS.filter(g => g.amount > 100 && g.amount <= 200).length, color: 'hsl(280, 60%, 60%)', label: '✨ $200' },
                { value: MOCK_GIFTS.filter(g => g.amount > 200).length, color: 'hsl(340, 70%, 55%)', label: '💎 $500+' },
              ]} />
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
