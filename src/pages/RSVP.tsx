import { useState, useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Users, Utensils, ChevronRight, Plus, X, UserPlus, Crown, Check, Gift, Heart, Sparkles, QrCode, Copy, ArrowRight, EyeOff } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

// Table seating config — 30 tables with flower/nature names
const TABLE_NAMES = [
  'Rose', 'Lavande', 'Jasmin', 'Orchidée', 'Lys', 'Pivoine', 'Magnolia', 'Camélia',
  'Tulipe', 'Iris', 'Dahlia', 'Violette', 'Lilas', 'Azalée', 'Hortensia', 'Amaryllis',
  'Freesia', 'Anémone', 'Gardénia', 'Hibiscus', 'Mimosa', 'Pétunia', 'Chrysanthème',
  'Bégonia', 'Clématite', 'Jonquille', 'Muguet', 'Renoncule', 'Tournesol', 'Édelweiss',
];

const TABLES_DATA = TABLE_NAMES.map((name, i) => {
  // Pre-populate a few tables with sample guests for realism
  const presets: Record<number, { seats: number; family: boolean; guests: string[] }> = {
    0: { seats: 8, family: false, guests: ['Alice M.', 'David K.', 'Sophie L.', 'Lucas T.', 'Emma R.', 'Paul B.', 'Léa C.', 'Hugo N.'] },
    1: { seats: 8, family: false, guests: ['Marc R.', 'Julie B.', 'Chloé N.', 'Antoine D.', 'Clara F.', 'Pierre T.', 'Marie C.', 'Jean P.'] },
    3: { seats: 8, family: true, guests: ['Famille Dupont', 'Famille Martin', 'Famille Bernard', 'Famille Petit', 'Famille Durand', 'Famille Leroy', 'Famille Moreau', 'Famille Simon'] },
    7: { seats: 8, family: false, guests: ['Sarah H.', 'Thomas G.', 'Laura D.', 'Nicolas F.', 'Camille S.', 'Maxime L.', 'Inès K.', 'Raphaël M.'] },
    4: { seats: 10, family: false, guests: ['Pierre T.', 'Emma V.', 'Lucas G.', 'Chloé N.'] },
    5: { seats: 10, family: false, guests: ['Sarah H.'] },
    9: { seats: 8, family: false, guests: ['François A.', 'Nathalie B.'] },
  };
  const preset = presets[i];
  return {
    id: i + 1,
    name,
    seats: preset?.seats || (i % 3 === 0 ? 10 : 8),
    family: preset?.family || false,
    guests: preset?.guests || [],
  };
});

type Step = 'info' | 'meal' | 'table' | 'gift' | 'done';

const giftTiers = [
  { amount: 60, emoji: '💐', labelKey: 'registry.tier.bouquet' },
  { amount: 100, emoji: '🥂', labelKey: 'registry.tier.toast' },
  { amount: 200, emoji: '✨', labelKey: 'registry.tier.sparkle' },
  { amount: 500, emoji: '💎', labelKey: 'registry.tier.diamond' },
];

const mealOptions = [
  { key: 'meat', emoji: '🥩', sides: ['rsvp.side.potatoes', 'rsvp.side.vegetables', 'rsvp.side.rice', 'rsvp.side.sweetpotato'] },
  { key: 'fish', emoji: '🐟', sides: ['rsvp.side.salad', 'rsvp.side.vegetables', 'rsvp.side.rice', 'rsvp.side.potatoes'] },
  { key: 'veg', emoji: '🥗', sides: ['rsvp.side.quinoa', 'rsvp.side.vegetables', 'rsvp.side.pasta', 'rsvp.side.hummus'] },
  { key: 'vegan', emoji: '🌱', sides: ['rsvp.side.quinoa', 'rsvp.side.vegetables', 'rsvp.side.hummus', 'rsvp.side.sweetpotato'] },
  { key: 'glutenfree', emoji: '🌾', sides: ['rsvp.side.potatoes', 'rsvp.side.rice', 'rsvp.side.vegetables', 'rsvp.side.sweetpotato'] },
  { key: 'halal', emoji: '🍖', sides: ['rsvp.side.rice', 'rsvp.side.couscous', 'rsvp.side.vegetables', 'rsvp.side.salad'] },
  { key: 'kids', emoji: '🧒', sides: ['rsvp.side.fries', 'rsvp.side.pasta', 'rsvp.side.vegetables', 'rsvp.side.rice'] },
];

// Payment link placeholder — replace with actual payment link
const PAYMENT_BASE_URL = 'https://pay.example.com/corine-ruben';

const RSVP = () => {
  const { t } = useLanguage();
  const [step, setStep] = useState<Step>('info');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [attending, setAttending] = useState<boolean | null>(null);
  const [companions, setCompanions] = useState<string[]>([]);
  const [newCompanionName, setNewCompanionName] = useState('');

  // Meal
  const [selectedMeal, setSelectedMeal] = useState<string | null>(null);
  const [selectedSides, setSelectedSides] = useState<string[]>([]);
  const [dietary, setDietary] = useState('');

  // Table
  const [tables, setTables] = useState(TABLES_DATA);
  const [selectedTable, setSelectedTable] = useState<number | null>(null);
  const [createFamily, setCreateFamily] = useState(false);
  const [familyTableName, setFamilyTableName] = useState('');
  const [stayAnonymous, setStayAnonymous] = useState(false);
  const [tableFilter, setTableFilter] = useState<'all' | 'available' | 'full'>('available');
  const [tableSearch, setTableSearch] = useState('');

  const filteredTables = useMemo(() => {
    return tables.filter(t => {
      const matchesSearch = !tableSearch || t.name.toLowerCase().includes(tableSearch.toLowerCase());
      const isFull = t.guests.length >= t.seats;
      const isSelected = selectedTable === t.id;
      if (tableFilter === 'available') return matchesSearch && (!isFull || isSelected);
      if (tableFilter === 'full') return matchesSearch && isFull;
      return matchesSearch;
    });
  }, [tables, tableFilter, tableSearch, selectedTable]);

  const fullTablesCount = useMemo(() => tables.filter(t => t.guests.length >= t.seats).length, [tables]);
  const availableTablesCount = tables.length - fullTablesCount;
  // Gift
  const [selectedGiftAmount, setSelectedGiftAmount] = useState<number | null>(null);
  const [customGiftAmount, setCustomGiftAmount] = useState('');
  const [giftMessage, setGiftMessage] = useState('');
  const [showQR, setShowQR] = useState(false);
  const [skipGift, setSkipGift] = useState(false);
  const [copied, setCopied] = useState(false);

  const toggleSide = (side: string) => {
    setSelectedSides(prev => prev.includes(side) ? prev.filter(s => s !== side) : [...prev, side]);
  };

  const currentMealSides = useMemo(() => {
    return mealOptions.find(m => m.key === selectedMeal)?.sides || [];
  }, [selectedMeal]);

  const displayName = stayAnonymous ? 'Anonymous' : (name || 'You');

  const handleJoinTable = (tableId: number) => {
    if (selectedTable === tableId) {
      setTables(prev => prev.map(t => t.id === tableId ? { ...t, guests: t.guests.filter(g => g !== displayName) } : t));
      setSelectedTable(null);
    } else {
      if (selectedTable) {
        setTables(prev => prev.map(t => t.id === selectedTable ? { ...t, guests: t.guests.filter(g => g !== displayName) } : t));
      }
      setTables(prev => prev.map(t => t.id === tableId ? { ...t, guests: [...t.guests, displayName] } : t));
      setSelectedTable(tableId);
    }
  };

  const handleCreateFamilyTable = () => {
    if (!familyTableName.trim()) return;
    const newTable = {
      id: tables.length + 1,
      name: familyTableName,
      seats: 8,
      family: true,
      guests: [displayName],
    };
    setTables(prev => [...prev, newTable]);
    setSelectedTable(newTable.id);
    setCreateFamily(false);
    setFamilyTableName('');
  };

  const finalGiftAmount = selectedGiftAmount || (customGiftAmount ? parseInt(customGiftAmount) : 0);
  const paymentUrl = `${PAYMENT_BASE_URL}?amount=${finalGiftAmount}&name=${encodeURIComponent(name)}&message=${encodeURIComponent(giftMessage)}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(paymentUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleSelectGiftTier = (amount: number) => {
    setSelectedGiftAmount(amount);
    setCustomGiftAmount('');
    setShowQR(true);
  };

  const handleCustomGiftConfirm = () => {
    const val = parseInt(customGiftAmount);
    if (val && val > 0) {
      setSelectedGiftAmount(val);
      setShowQR(true);
    }
  };

  const canProceedInfo = name.trim() && attending !== null;
  const canProceedMeal = selectedMeal !== null;

  const allSteps: Step[] = ['info', 'meal', 'table', 'gift'];
  const currentStepIndex = allSteps.indexOf(step);

  return (
    <div className="min-h-screen pt-28 pb-20 relative">
      <div className="container mx-auto px-6 md:px-12 max-w-2xl relative z-10">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="inline-block px-5 py-2 rounded-full glass-card-strong mb-5">
            <p className="font-sans-elegant text-xs tracking-[0.25em] uppercase text-muted-foreground font-medium">{t('nav.rsvp')}</p>
          </div>
          <h1 className="font-serif-display text-4xl md:text-6xl text-foreground mb-4 font-semibold" style={{ letterSpacing: '-0.5px' }}>
            {t('rsvp.title')}
          </h1>
          <p className="font-sans-elegant text-base text-muted-foreground">{t('rsvp.subtitle')}</p>
        </motion.div>

        {/* Progress Steps */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} className="flex items-center justify-center gap-2 mb-10">
          {allSteps.map((s, i) => {
            const icons = [Users, Utensils, Users, Gift];
            const Icon = icons[i];
            const isPast = currentStepIndex > i || step === 'done';
            const isCurrent = step === s;
            return (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-500 ${
                  isCurrent ? 'gradient-primary text-primary-foreground shadow-glow' :
                  isPast ? 'bg-primary/20 text-primary' :
                  'glass-card text-muted-foreground'
                }`}>
                  {isPast ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                </div>
                {i < allSteps.length - 1 && <div className={`w-6 h-0.5 rounded-full transition-all duration-500 ${
                  isPast ? 'bg-primary/40' : 'bg-border/50'
                }`} />}
              </div>
            );
          })}
        </motion.div>

        <AnimatePresence mode="wait">
          {/* STEP 1: Info */}
          {step === 'info' && (
            <motion.div key="info" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              className="glass-card-strong rounded-3xl p-8 space-y-6"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-2xl gradient-primary flex items-center justify-center shadow-soft">
                  <Users className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="font-serif-display text-xl text-foreground font-semibold">{t('rsvp.step.info')}</h2>
                  <p className="font-sans-elegant text-xs text-muted-foreground">{t('rsvp.step.info.hint')}</p>
                </div>
              </div>

              <div>
                <label className="font-sans-elegant text-sm text-foreground block mb-2.5 font-semibold">{t('rsvp.name')}</label>
                <Input value={name} onChange={e => setName(e.target.value)} className="font-sans-elegant rounded-full h-12 border-border/50 bg-background/50 backdrop-blur-sm" placeholder={t('rsvp.name.placeholder')} />
              </div>

              <div>
                <label className="font-sans-elegant text-sm text-foreground block mb-2.5 font-semibold">{t('rsvp.email')}</label>
                <Input type="email" value={email} onChange={e => setEmail(e.target.value)} className="font-sans-elegant rounded-full h-12 border-border/50 bg-background/50 backdrop-blur-sm" placeholder={t('rsvp.email.placeholder')} />
              </div>

              <div>
                <label className="font-sans-elegant text-sm text-foreground block mb-3 font-semibold">{t('rsvp.attending')}</label>
                <div className="flex gap-3">
                  {[true, false].map(val => (
                    <button key={String(val)} type="button" onClick={() => setAttending(val)}
                      className={`flex-1 py-3.5 rounded-full text-sm font-sans-elegant font-medium transition-all duration-500 ${
                        attending === val ? 'gradient-primary text-primary-foreground shadow-glow' : 'glass-card hover:border-primary/30 text-foreground'
                      }`}
                    >
                      {val ? `🎉 ${t('rsvp.yes')}` : t('rsvp.no')}
                    </button>
                  ))}
                </div>
              </div>

              {attending && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-3">
                  <label className="font-sans-elegant text-sm text-foreground block font-semibold flex items-center gap-2">
                    <UserPlus className="w-4 h-4 text-primary" />
                    {t('rsvp.companions')}
                  </label>
                  <p className="font-sans-elegant text-xs text-muted-foreground">{t('rsvp.companions.hint')}</p>

                  {/* List of added companions */}
                  <AnimatePresence>
                    {companions.map((comp, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className="glass-card rounded-2xl px-4 py-3 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center shadow-soft">
                            <span className="font-sans-elegant text-xs text-primary-foreground font-bold">{i + 1}</span>
                          </div>
                          <span className="font-sans-elegant text-sm text-foreground font-medium">{comp}</span>
                        </div>
                        <button type="button" onClick={() => setCompanions(prev => prev.filter((_, j) => j !== i))}
                          className="w-7 h-7 rounded-full bg-destructive/10 flex items-center justify-center hover:bg-destructive/20 transition-colors"
                        >
                          <X className="w-3.5 h-3.5 text-destructive" />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {/* Add companion input */}
                  <div className="flex gap-2">
                    <Input
                      value={newCompanionName}
                      onChange={e => setNewCompanionName(e.target.value)}
                      onKeyDown={e => {
                        if (e.key === 'Enter' && newCompanionName.trim()) {
                          e.preventDefault();
                          setCompanions(prev => [...prev, newCompanionName.trim()]);
                          setNewCompanionName('');
                        }
                      }}
                      placeholder={t('rsvp.companions.placeholder')}
                      className="font-sans-elegant rounded-full h-11 border-border/50 bg-background/50 backdrop-blur-sm flex-1"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (newCompanionName.trim()) {
                          setCompanions(prev => [...prev, newCompanionName.trim()]);
                          setNewCompanionName('');
                        }
                      }}
                      disabled={!newCompanionName.trim()}
                      className="btn-primary px-4 rounded-full text-sm disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <Plus className="w-4 h-4" />
                      {t('rsvp.companions.add')}
                    </button>
                  </div>

                  {companions.length > 0 && (
                    <p className="font-sans-elegant text-xs text-primary font-medium">
                      {t('rsvp.companions.count').replace('{count}', String(companions.length + 1))}
                    </p>
                  )}
                </motion.div>
              )}

              <button disabled={!canProceedInfo} onClick={() => attending ? setStep('meal') : setStep('done')}
                className="w-full btn-primary justify-center disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:transform-none"
              >
                {attending ? t('rsvp.next') : t('rsvp.submit')}
                <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}

          {/* STEP 2: Meal Designer */}
          {step === 'meal' && (
            <motion.div key="meal" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              className="glass-card-strong rounded-3xl p-8 space-y-6"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-2xl gradient-primary flex items-center justify-center shadow-soft">
                  <Utensils className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="font-serif-display text-xl text-foreground font-semibold">{t('rsvp.step.meal')}</h2>
                  <p className="font-sans-elegant text-xs text-muted-foreground">{t('rsvp.step.meal.hint')}</p>
                </div>
              </div>

              <div>
                <label className="font-sans-elegant text-sm text-foreground block mb-3 font-semibold">{t('rsvp.meal')}</label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {mealOptions.map(opt => (
                    <button key={opt.key} type="button" onClick={() => { setSelectedMeal(opt.key); setSelectedSides([]); }}
                      className={`py-4 rounded-2xl text-center font-sans-elegant font-medium transition-all duration-500 ${
                        selectedMeal === opt.key ? 'gradient-primary text-primary-foreground shadow-glow' : 'glass-card hover:border-primary/30 text-foreground'
                      }`}
                    >
                      <div className="text-xl mb-1.5">{opt.emoji}</div>
                      <div className="text-xs">{t(`rsvp.meal.${opt.key}`)}</div>
                    </button>
                  ))}
                </div>
              </div>

              {selectedMeal && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-4">
                  <label className="font-sans-elegant text-sm text-foreground block font-semibold">{t('rsvp.sides')}</label>
                  <div className="flex flex-wrap gap-2">
                    {currentMealSides.map(side => (
                      <button key={side} type="button" onClick={() => toggleSide(side)}
                        className={`px-4 py-2.5 rounded-full text-sm font-sans-elegant font-medium transition-all duration-300 ${
                          selectedSides.includes(side) ? 'gradient-primary text-primary-foreground shadow-soft' : 'glass-card text-foreground hover:border-primary/30'
                        }`}
                      >
                        {t(side)}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              <div>
                <label className="font-sans-elegant text-sm text-foreground block mb-2.5 font-semibold">{t('rsvp.dietary')}</label>
                <Textarea value={dietary} onChange={e => setDietary(e.target.value)} placeholder={t('rsvp.dietary.placeholder')}
                  className="font-sans-elegant rounded-2xl border-border/50 bg-background/50 backdrop-blur-sm" />
              </div>

              <div className="flex gap-3">
                <button onClick={() => setStep('info')} className="flex-1 btn-outline justify-center">{t('rsvp.back')}</button>
                <button disabled={!canProceedMeal} onClick={() => setStep('table')}
                  className="flex-1 btn-primary justify-center disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {t('rsvp.next')} <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: Table Seating — Round Visual Layout */}
          {step === 'table' && (
            <motion.div key="table" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="glass-card-strong rounded-3xl p-6">
                <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl gradient-primary flex items-center justify-center shadow-soft">
                      <Users className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <h2 className="font-serif-display text-xl text-foreground font-semibold">{t('rsvp.step.table')}</h2>
                      <p className="font-sans-elegant text-xs text-muted-foreground">{t('rsvp.step.table.hint')}</p>
                    </div>
                  </div>
                  {!createFamily && (
                    <button onClick={() => setCreateFamily(true)} className="btn-outline text-xs px-3 py-2 rounded-full gap-1">
                      <Plus className="w-3 h-3" /> {t('rsvp.table.createFamily')}
                    </button>
                  )}
                </div>

                {/* Anonymous toggle */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card rounded-2xl p-4 mb-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <EyeOff className="w-4 h-4 text-primary" />
                      <div>
                        <span className="font-sans-elegant text-sm text-foreground font-medium block">{t('rsvp.table.anonymous')}</span>
                        <span className="font-sans-elegant text-[10px] text-muted-foreground">{t('rsvp.table.anonymous.hint')}</span>
                      </div>
                    </div>
                    <button type="button" onClick={() => setStayAnonymous(!stayAnonymous)}
                      className={`w-12 h-7 rounded-full transition-all duration-300 ${stayAnonymous ? 'gradient-primary' : 'bg-border/50'} relative`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-white shadow-sm absolute top-1 transition-all duration-300 ${stayAnonymous ? 'left-6' : 'left-1'}`} />
                    </button>
                  </div>
                </motion.div>

                {createFamily && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                    className="glass-card rounded-2xl p-4 mb-5 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-sans-elegant text-sm text-foreground font-semibold">{t('rsvp.table.familyName')}</span>
                      <button onClick={() => setCreateFamily(false)} className="text-muted-foreground hover:text-foreground">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex gap-2">
                      <Input value={familyTableName} onChange={e => setFamilyTableName(e.target.value)}
                        placeholder={t('rsvp.table.familyName.placeholder')}
                        className="font-sans-elegant rounded-full h-10 text-sm border-border/50 bg-background/50" />
                      <button onClick={handleCreateFamilyTable} className="btn-primary px-4 py-2 rounded-full text-xs">
                        <Check className="w-3 h-3" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Summary + Search + Filter */}
                <div className="space-y-3 mb-5">
                  <div className="glass-card rounded-2xl px-4 py-3 text-center">
                    <p className="font-sans-elegant text-xs text-muted-foreground font-medium">
                      {t('rsvp.table.summary')
                        .replace('{available}', String(availableTablesCount))
                        .replace('{full}', String(fullTablesCount))
                        .replace('{total}', String(tables.length))}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Input
                      value={tableSearch}
                      onChange={e => setTableSearch(e.target.value)}
                      placeholder={t('rsvp.table.search')}
                      className="font-sans-elegant rounded-full h-10 text-sm border-border/50 bg-background/50 flex-1"
                    />
                    <div className="flex rounded-full glass-card overflow-hidden">
                      {(['available', 'all', 'full'] as const).map(f => (
                        <button key={f} onClick={() => setTableFilter(f)}
                          className={`px-3 py-2 font-sans-elegant text-[10px] font-semibold transition-all duration-300 ${
                            tableFilter === f ? 'gradient-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                          }`}
                        >
                          {t(`rsvp.table.filter.${f}`)}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Round Tables Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-h-[500px] overflow-y-auto pr-1" style={{ scrollbarWidth: 'thin' }}>
                  {filteredTables.map((table, i) => {
                    const isFull = table.guests.length >= table.seats;
                    const isSelected = selectedTable === table.id;
                    const availableSeats = table.seats - table.guests.length;

                    return (
                      <motion.div
                        key={table.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: Math.min(i * 0.03, 0.3) }}
                        className={`rounded-3xl p-5 transition-all duration-300 ${
                          isSelected ? 'glass-card-strong border-primary/40 shadow-glow' :
                          isFull ? 'glass-card opacity-50' :
                          'glass-card hover:border-primary/20'
                        }`}
                      >
                        {/* Table header */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            {table.family && <Crown className="w-3.5 h-3.5 text-primary" />}
                            <span className="font-serif-display text-sm text-foreground font-bold">{t('rsvp.table.label')} {table.name}</span>
                          </div>
                          <span className={`text-[10px] font-sans-elegant font-semibold px-2.5 py-1 rounded-full ${
                            isFull ? 'bg-destructive/10 text-destructive' : 'glass-card text-muted-foreground'
                          }`}>
                            {isFull ? t('rsvp.table.full') : `${availableSeats} ${t('rsvp.table.seats.available')}`}
                          </span>
                        </div>

                        {/* Round table visual */}
                        <div className="relative mx-auto" style={{ width: '160px', height: '160px' }}>
                          {/* Center circle — the table */}
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-gradient-to-br from-primary/15 to-accent/15 border border-border/40 flex items-center justify-center">
                            <span className="font-serif-display text-[10px] text-muted-foreground font-semibold">{table.guests.length}/{table.seats}</span>
                          </div>

                          {/* Seat circles arranged around the table */}
                          {Array.from({ length: table.seats }).map((_, si) => {
                            const angle = (si / table.seats) * 2 * Math.PI - Math.PI / 2;
                            const radius = 62;
                            const x = Math.cos(angle) * radius;
                            const y = Math.sin(angle) * radius;
                            const isOccupied = si < table.guests.length;
                            const guestName = table.guests[si] || '';
                            const initial = guestName ? guestName[0].toUpperCase() : '';

                            return (
                              <div
                                key={si}
                                className="absolute group"
                                style={{
                                  left: `calc(50% + ${x}px - 14px)`,
                                  top: `calc(50% + ${y}px - 14px)`,
                                }}
                              >
                                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-300 ${
                                  isOccupied
                                    ? 'gradient-primary text-primary-foreground shadow-sm'
                                    : 'border border-dashed border-border/60 bg-background/30 text-muted-foreground/40'
                                }`}>
                                  {initial}
                                </div>
                                {/* Tooltip with guest name */}
                                {isOccupied && (
                                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2 py-1 rounded-lg bg-foreground/90 text-background text-[9px] font-sans-elegant font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                                    {guestName}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>

                        {/* Guest names list */}
                        {table.guests.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-4 justify-center">
                            {table.guests.map(g => (
                              <span key={g} className="font-sans-elegant text-[10px] text-muted-foreground bg-background/40 px-2 py-0.5 rounded-full">{g}</span>
                            ))}
                          </div>
                        )}

                        {/* Join / Leave button */}
                        <div className="mt-4 text-center">
                          {isSelected ? (
                            <button onClick={() => handleJoinTable(table.id)}
                              className="font-sans-elegant text-xs text-destructive font-semibold px-4 py-2 rounded-full glass-card hover:bg-destructive/10 transition-colors"
                            >
                              <X className="w-3 h-3 inline mr-1" />
                              {t('rsvp.table.leave')}
                            </button>
                          ) : !isFull ? (
                            <button onClick={() => handleJoinTable(table.id)}
                              className="font-sans-elegant text-xs text-primary font-semibold px-4 py-2 rounded-full glass-card hover:border-primary/30 transition-colors"
                            >
                              <Plus className="w-3 h-3 inline mr-1" />
                              {t('rsvp.table.join')}
                            </button>
                          ) : null}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              <div className="flex gap-3">
                <button onClick={() => setStep('meal')} className="flex-1 btn-outline justify-center">{t('rsvp.back')}</button>
                <button onClick={() => setStep('gift')}
                  className="flex-1 btn-primary justify-center"
                >
                  {t('rsvp.next')} <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 4: Gift (Optional) */}
          {step === 'gift' && (
            <motion.div key="gift" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="glass-card-strong rounded-3xl p-8 space-y-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-2xl gradient-primary flex items-center justify-center shadow-soft">
                    <Gift className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h2 className="font-serif-display text-xl text-foreground font-semibold">{t('rsvp.step.gift')}</h2>
                    <p className="font-sans-elegant text-xs text-muted-foreground">{t('rsvp.step.gift.hint')}</p>
                  </div>
                </div>

                {/* Warm message */}
                <div className="glass-card rounded-2xl p-5 text-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 rounded-full bg-gradient-to-br from-rose-400/10 to-transparent blur-xl pointer-events-none" />
                  <Heart className="w-6 h-6 text-rose-400 icon-glow mx-auto mb-3" />
                  <p className="font-sans-elegant text-sm text-muted-foreground leading-relaxed relative z-10">
                    {t('rsvp.gift.message')}
                  </p>
                </div>

                <AnimatePresence mode="wait">
                  {!showQR ? (
                    <motion.div key="tiers" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                      {/* Gift tiers */}
                      <div className="grid grid-cols-2 gap-3">
                        {giftTiers.map((tier, i) => (
                          <motion.button
                            key={tier.amount}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.06 }}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => handleSelectGiftTier(tier.amount)}
                            className={`glass-card rounded-2xl p-5 text-center card-hover group ${
                              selectedGiftAmount === tier.amount ? 'border-primary/40 shadow-glow' : ''
                            }`}
                          >
                            <div className="text-2xl mb-2">{tier.emoji}</div>
                            <div className="font-serif-display text-xl text-foreground font-bold">${tier.amount}</div>
                            <div className="font-sans-elegant text-[10px] text-muted-foreground font-medium mt-1">{t(tier.labelKey)}</div>
                          </motion.button>
                        ))}
                      </div>

                      {/* Custom amount */}
                      <div className="flex gap-3">
                        <div className="relative flex-1">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-sans-elegant text-sm">$</span>
                          <Input
                            type="number"
                            min="1"
                            value={customGiftAmount}
                            onChange={e => { setCustomGiftAmount(e.target.value); setSelectedGiftAmount(null); }}
                            placeholder={t('registry.custom.placeholder')}
                            className="font-sans-elegant rounded-full h-11 pl-8 border-border/50 bg-background/50 backdrop-blur-sm"
                          />
                        </div>
                        <button onClick={handleCustomGiftConfirm} className="btn-primary px-5 rounded-full text-sm">
                          <QrCode className="w-4 h-4" />
                          {t('rsvp.gift.generateQR')}
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div key="qr" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                      className="space-y-5"
                    >
                      {/* QR Code display */}
                      <div className="glass-card rounded-3xl p-8 text-center">
                        <div className="inline-block p-4 bg-white rounded-2xl shadow-soft mb-4">
                          <QRCodeSVG
                            value={paymentUrl}
                            size={180}
                            bgColor="#ffffff"
                            fgColor="#1a1a2e"
                            level="M"
                            includeMargin={false}
                          />
                        </div>
                        <p className="font-serif-display text-2xl text-foreground font-bold mb-1">${finalGiftAmount}</p>
                        <p className="font-sans-elegant text-xs text-muted-foreground mb-4">{t('rsvp.gift.scanQR')}</p>

                        <button onClick={handleCopyLink}
                          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full glass-card text-sm font-sans-elegant font-medium text-foreground hover:border-primary/30 transition-all duration-300"
                        >
                          {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                          {copied ? t('rsvp.gift.copied') : t('rsvp.gift.copyLink')}
                        </button>
                      </div>

                      {/* Optional message */}
                      <div>
                        <label className="font-sans-elegant text-sm text-foreground block mb-2 font-semibold">{t('rsvp.gift.noteLabel')}</label>
                        <Textarea
                          value={giftMessage}
                          onChange={e => setGiftMessage(e.target.value)}
                          placeholder={t('registry.dialog.message.placeholder')}
                          className="font-sans-elegant rounded-2xl border-border/50 bg-background/50 backdrop-blur-sm"
                          rows={2}
                        />
                      </div>

                      <button onClick={() => { setShowQR(false); setSelectedGiftAmount(null); }}
                        className="font-sans-elegant text-xs text-muted-foreground hover:text-foreground transition-colors mx-auto block"
                      >
                        ← {t('rsvp.gift.changeAmount')}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex gap-3">
                <button onClick={() => setStep('table')} className="flex-1 btn-outline justify-center">{t('rsvp.back')}</button>
                <button onClick={() => setStep('done')}
                  className="flex-1 btn-primary justify-center"
                >
                  {(showQR || skipGift) ? t('rsvp.submit') : t('rsvp.gift.skip')}
                  {(showQR || skipGift) ? <Check className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                </button>
              </div>
            </motion.div>
          )}

          {/* DONE */}
          {step === 'done' && (
            <motion.div key="done" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              className="glass-card-strong rounded-3xl p-10 text-center space-y-6"
            >
              <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center mx-auto shadow-glow">
                <Check className="w-9 h-9 text-primary-foreground" />
              </div>
              <div>
                <h2 className="font-serif-display text-2xl text-foreground font-semibold mb-3">{t('rsvp.done.title')}</h2>
                <p className="font-sans-elegant text-sm text-muted-foreground max-w-sm mx-auto" style={{ lineHeight: 1.6 }}>
                  {attending ? t('rsvp.done.attending') : t('rsvp.done.notattending')}
                </p>
              </div>

              {/* Summary cards */}
              {attending && (
                <div className="grid grid-cols-2 gap-3 text-left">
                  {selectedMeal && (
                    <div className="glass-card rounded-2xl p-4">
                      <p className="font-sans-elegant text-[10px] text-muted-foreground uppercase tracking-wider mb-1">{t('rsvp.done.meal')}</p>
                      <p className="font-sans-elegant text-sm text-foreground font-semibold">
                        {mealOptions.find(m => m.key === selectedMeal)?.emoji} {t(`rsvp.meal.${selectedMeal}`)}
                      </p>
                    </div>
                  )}
                  {selectedTable && (
                    <div className="glass-card rounded-2xl p-4">
                      <p className="font-sans-elegant text-[10px] text-muted-foreground uppercase tracking-wider mb-1">{t('rsvp.done.table')}</p>
                      <p className="font-serif-display text-sm text-foreground font-bold">
                        {tables.find(t => t.id === selectedTable)?.name}
                      </p>
                    </div>
                  )}
                  {finalGiftAmount > 0 && (
                    <div className="glass-card rounded-2xl p-4">
                      <p className="font-sans-elegant text-[10px] text-muted-foreground uppercase tracking-wider mb-1">{t('rsvp.done.gift')}</p>
                      <p className="font-serif-display text-sm text-foreground font-bold">${finalGiftAmount}</p>
                    </div>
                  )}
                  {companions.length > 0 && (
                    <div className="glass-card rounded-2xl p-4">
                      <p className="font-sans-elegant text-[10px] text-muted-foreground uppercase tracking-wider mb-1">{t('rsvp.companions')}</p>
                      <div className="space-y-1">
                        {companions.map((comp, i) => (
                          <p key={i} className="font-sans-elegant text-sm text-foreground font-semibold">{comp}</p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              <p className="font-sans-elegant text-xs text-muted-foreground">{t('rsvp.done.confirmation')}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RSVP;
