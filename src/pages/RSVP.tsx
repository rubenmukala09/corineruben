import { useState, useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Users, Utensils, ChevronRight, Plus, X, UserPlus, Crown, Check, Gift, Heart, Sparkles, QrCode, Copy, ArrowRight } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

// Table seating config
const TABLES_DATA = [
  { id: 1, name: 'Rose', seats: 8, family: false, guests: ['Alice M.', 'David K.', 'Sophie L.'] },
  { id: 2, name: 'Lavande', seats: 8, family: false, guests: ['Marc R.', 'Julie B.'] },
  { id: 3, name: 'Jasmin', seats: 10, family: false, guests: [] },
  { id: 4, name: 'Orchidée', seats: 6, family: true, guests: ['Famille Dupont'] },
  { id: 5, name: 'Lys', seats: 10, family: false, guests: ['Pierre T.', 'Emma V.', 'Lucas G.', 'Chloé N.'] },
  { id: 6, name: 'Pivoine', seats: 12, family: false, guests: ['Sarah H.'] },
  { id: 7, name: 'Magnolia', seats: 8, family: true, guests: [] },
  { id: 8, name: 'Camélia', seats: 6, family: false, guests: ['Jean P.', 'Marie C.', 'Antoine D.', 'Clara F.'] },
];

type Step = 'info' | 'meal' | 'table' | 'gift' | 'done';

const giftTiers = [
  { amount: 60, emoji: '💐', labelKey: 'registry.tier.bouquet' },
  { amount: 100, emoji: '🥂', labelKey: 'registry.tier.toast' },
  { amount: 200, emoji: '✨', labelKey: 'registry.tier.sparkle' },
  { amount: 500, emoji: '💎', labelKey: 'registry.tier.diamond' },
];

const mealOptions = [
  { key: 'meat', emoji: '🥩', sides: ['rsvp.side.potatoes', 'rsvp.side.vegetables', 'rsvp.side.rice'] },
  { key: 'fish', emoji: '🐟', sides: ['rsvp.side.salad', 'rsvp.side.vegetables', 'rsvp.side.rice'] },
  { key: 'veg', emoji: '🥗', sides: ['rsvp.side.quinoa', 'rsvp.side.vegetables', 'rsvp.side.pasta'] },
];

// Payment link placeholder — replace with actual payment link
const PAYMENT_BASE_URL = 'https://pay.example.com/corine-ruben';

const RSVP = () => {
  const { t } = useLanguage();
  const [step, setStep] = useState<Step>('info');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [attending, setAttending] = useState<boolean | null>(null);
  const [plusOneName, setPlusOneName] = useState('');
  const [hasPlusOne, setHasPlusOne] = useState(false);

  // Meal
  const [selectedMeal, setSelectedMeal] = useState<string | null>(null);
  const [selectedSides, setSelectedSides] = useState<string[]>([]);
  const [dietary, setDietary] = useState('');

  // Table
  const [tables, setTables] = useState(TABLES_DATA);
  const [selectedTable, setSelectedTable] = useState<number | null>(null);
  const [createFamily, setCreateFamily] = useState(false);
  const [familyTableName, setFamilyTableName] = useState('');

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

  const handleJoinTable = (tableId: number) => {
    if (selectedTable === tableId) {
      setTables(prev => prev.map(t => t.id === tableId ? { ...t, guests: t.guests.filter(g => g !== name) } : t));
      setSelectedTable(null);
    } else {
      if (selectedTable) {
        setTables(prev => prev.map(t => t.id === selectedTable ? { ...t, guests: t.guests.filter(g => g !== name) } : t));
      }
      setTables(prev => prev.map(t => t.id === tableId ? { ...t, guests: [...t.guests, name || 'You'] } : t));
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
      guests: [name || 'You'],
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
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                  <div className="flex items-center justify-between glass-card rounded-2xl p-4">
                    <div className="flex items-center gap-3">
                      <UserPlus className="w-4 h-4 text-primary" />
                      <span className="font-sans-elegant text-sm text-foreground font-medium">{t('rsvp.plusone')}</span>
                    </div>
                    <button type="button" onClick={() => setHasPlusOne(!hasPlusOne)}
                      className={`w-12 h-7 rounded-full transition-all duration-300 ${hasPlusOne ? 'gradient-primary' : 'bg-border/50'} relative`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-white shadow-sm absolute top-1 transition-all duration-300 ${hasPlusOne ? 'left-6' : 'left-1'}`} />
                    </button>
                  </div>
                  {hasPlusOne && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3">
                      <Input value={plusOneName} onChange={e => setPlusOneName(e.target.value)} placeholder={t('rsvp.plusone.name')}
                        className="font-sans-elegant rounded-full h-12 border-border/50 bg-background/50 backdrop-blur-sm" />
                    </motion.div>
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
                <div className="grid grid-cols-3 gap-3">
                  {mealOptions.map(opt => (
                    <button key={opt.key} type="button" onClick={() => { setSelectedMeal(opt.key); setSelectedSides([]); }}
                      className={`py-5 rounded-2xl text-center font-sans-elegant font-medium transition-all duration-500 ${
                        selectedMeal === opt.key ? 'gradient-primary text-primary-foreground shadow-glow' : 'glass-card hover:border-primary/30 text-foreground'
                      }`}
                    >
                      <div className="text-2xl mb-2">{opt.emoji}</div>
                      <div className="text-sm">{t(`rsvp.meal.${opt.key}`)}</div>
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

          {/* STEP 3: Table Seating */}
          {step === 'table' && (
            <motion.div key="table" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="glass-card-strong rounded-3xl p-6">
                <div className="flex items-center justify-between mb-5">
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {tables.map((table, i) => {
                    const isFull = table.guests.length >= table.seats;
                    const isSelected = selectedTable === table.id;

                    return (
                      <motion.div
                        key={table.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className={`rounded-2xl p-4 transition-all duration-300 cursor-pointer ${
                          isSelected ? 'glass-card-strong border-primary/40 shadow-glow' :
                          isFull ? 'glass-card opacity-50 cursor-not-allowed' :
                          'glass-card hover:border-primary/20'
                        }`}
                        onClick={() => !isFull && handleJoinTable(table.id)}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            {table.family && <Crown className="w-3.5 h-3.5 text-primary" />}
                            <span className="font-sans-elegant text-sm text-foreground font-bold">{t('rsvp.table.label')} {table.name}</span>
                          </div>
                          <span className={`text-xs font-sans-elegant font-semibold px-2 py-1 rounded-full ${
                            isFull ? 'bg-destructive/10 text-destructive' : 'glass-card text-muted-foreground'
                          }`}>
                            {table.guests.length}/{table.seats}
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {Array.from({ length: table.seats }).map((_, si) => (
                            <div key={si} className={`w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold transition-all duration-300 ${
                              si < table.guests.length
                                ? 'gradient-primary text-primary-foreground shadow-sm'
                                : 'border border-border/50 bg-background/30 text-muted-foreground/50'
                            }`}>
                              {si < table.guests.length ? table.guests[si]?.[0] : ''}
                            </div>
                          ))}
                        </div>

                        {table.guests.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {table.guests.map(g => (
                              <span key={g} className="font-sans-elegant text-[10px] text-muted-foreground bg-background/40 px-2 py-0.5 rounded-full">{g}</span>
                            ))}
                          </div>
                        )}

                        {isSelected && (
                          <div className="mt-2 text-center">
                            <span className="font-sans-elegant text-xs text-primary font-semibold">{t('rsvp.table.yourSeat')} ✓</span>
                          </div>
                        )}
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
                  {hasPlusOne && plusOneName && (
                    <div className="glass-card rounded-2xl p-4">
                      <p className="font-sans-elegant text-[10px] text-muted-foreground uppercase tracking-wider mb-1">{t('rsvp.plusone')}</p>
                      <p className="font-sans-elegant text-sm text-foreground font-semibold">{plusOneName}</p>
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
