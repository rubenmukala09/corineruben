import { useState, useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Users, Utensils, ChevronRight, Plus, X, UserPlus, Crown, Check, Gift, Heart, Sparkles, QrCode, Copy, ArrowRight, EyeOff, Wine, Globe, AlertTriangle, Gem, Pencil, Loader2, MapPin, Clock, Car, Train, ParkingCircle, Hotel, ExternalLink, Church, PartyPopper, Camera, Music, Cake, Waves, Share2, Link2 } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useSiteSettings, useVenueData } from '@/hooks/useSiteContent';
import ringsImg from '@/assets/rings-small.webp';

// Table seating config — 30 tables with flower/nature names
const TABLE_NAMES = [
  'Rose', 'Lavande', 'Jasmin', 'Orchidée', 'Lys', 'Pivoine', 'Magnolia', 'Camélia',
  'Tulipe', 'Iris', 'Dahlia', 'Violette', 'Lilas', 'Azalée', 'Hortensia', 'Amaryllis',
  'Freesia', 'Anémone', 'Gardénia', 'Hibiscus', 'Mimosa', 'Pétunia', 'Chrysanthème',
  'Bégonia', 'Clématite', 'Jonquille', 'Muguet', 'Renoncule', 'Tournesol', 'Édelweiss',
];

const TABLES_DATA = TABLE_NAMES.map((name, i) => ({
  id: i + 1,
  name,
  seats: i % 3 === 0 ? 10 : 8,
  family: false,
  guests: [] as string[],
}));

type Step = 'info' | 'meal' | 'table' | 'gift' | 'done';
type CourtStep = 'info' | 'gift' | 'done';

const giftTiers = [
  { amount: 60, emoji: '💐', labelKey: 'registry.tier.bouquet' },
  { amount: 100, emoji: '🥂', labelKey: 'registry.tier.toast' },
  { amount: 200, emoji: '✨', labelKey: 'registry.tier.sparkle' },
  { amount: 500, emoji: '💎', labelKey: 'registry.tier.diamond' },
];

const cuisineOptions = [
  { key: 'african', emoji: '🌍' },
  { key: 'indian', emoji: '🇮🇳' },
  { key: 'italian', emoji: '🇮🇹' },
  { key: 'french', emoji: '🇫🇷' },
  { key: 'mediterranean', emoji: '🫒' },
  { key: 'caribbean', emoji: '🌴' },
];

const mealOptions: Record<string, { key: string; emoji: string; sides: string[] }[]> = {
  african: [
    { key: 'jollof', emoji: '🍛', sides: ['rsvp.side.plantain', 'rsvp.side.vegetables', 'rsvp.side.couscous', 'rsvp.side.salad'] },
    { key: 'grilled_tilapia', emoji: '🐟', sides: ['rsvp.side.plantain', 'rsvp.side.rice', 'rsvp.side.vegetables', 'rsvp.side.cassava'] },
    { key: 'veg_african', emoji: '🥗', sides: ['rsvp.side.couscous', 'rsvp.side.vegetables', 'rsvp.side.plantain', 'rsvp.side.sweetpotato'] },
    { key: 'ndole', emoji: '🥬', sides: ['rsvp.side.plantain', 'rsvp.side.rice', 'rsvp.side.cassava', 'rsvp.side.vegetables'] },
  ],
  indian: [
    { key: 'butter_chicken', emoji: '🍗', sides: ['rsvp.side.naan', 'rsvp.side.rice', 'rsvp.side.raita', 'rsvp.side.vegetables'] },
    { key: 'paneer_tikka', emoji: '🧀', sides: ['rsvp.side.naan', 'rsvp.side.rice', 'rsvp.side.raita', 'rsvp.side.salad'] },
    { key: 'dal_makhani', emoji: '🍲', sides: ['rsvp.side.naan', 'rsvp.side.rice', 'rsvp.side.raita', 'rsvp.side.vegetables'] },
    { key: 'biryani', emoji: '🍚', sides: ['rsvp.side.raita', 'rsvp.side.salad', 'rsvp.side.naan', 'rsvp.side.vegetables'] },
  ],
  italian: [
    { key: 'risotto', emoji: '🍝', sides: ['rsvp.side.salad', 'rsvp.side.bread', 'rsvp.side.vegetables', 'rsvp.side.potatoes'] },
    { key: 'osso_buco', emoji: '🥩', sides: ['rsvp.side.polenta', 'rsvp.side.vegetables', 'rsvp.side.salad', 'rsvp.side.bread'] },
    { key: 'eggplant_parm', emoji: '🍆', sides: ['rsvp.side.pasta', 'rsvp.side.salad', 'rsvp.side.bread', 'rsvp.side.vegetables'] },
    { key: 'seafood_linguine', emoji: '🦐', sides: ['rsvp.side.bread', 'rsvp.side.salad', 'rsvp.side.vegetables', 'rsvp.side.potatoes'] },
  ],
  french: [
    { key: 'coq_au_vin', emoji: '🍗', sides: ['rsvp.side.potatoes', 'rsvp.side.vegetables', 'rsvp.side.bread', 'rsvp.side.salad'] },
    { key: 'ratatouille', emoji: '🥗', sides: ['rsvp.side.bread', 'rsvp.side.rice', 'rsvp.side.quinoa', 'rsvp.side.salad'] },
    { key: 'salmon_en_croute', emoji: '🐟', sides: ['rsvp.side.potatoes', 'rsvp.side.vegetables', 'rsvp.side.salad', 'rsvp.side.rice'] },
    { key: 'beef_bourguignon', emoji: '🥩', sides: ['rsvp.side.potatoes', 'rsvp.side.bread', 'rsvp.side.vegetables', 'rsvp.side.salad'] },
  ],
  mediterranean: [
    { key: 'lamb_kofta', emoji: '🍖', sides: ['rsvp.side.hummus', 'rsvp.side.rice', 'rsvp.side.salad', 'rsvp.side.bread'] },
    { key: 'falafel_plate', emoji: '🧆', sides: ['rsvp.side.hummus', 'rsvp.side.salad', 'rsvp.side.rice', 'rsvp.side.bread'] },
    { key: 'grilled_sea_bass', emoji: '🐟', sides: ['rsvp.side.rice', 'rsvp.side.salad', 'rsvp.side.vegetables', 'rsvp.side.hummus'] },
    { key: 'stuffed_peppers', emoji: '🫑', sides: ['rsvp.side.rice', 'rsvp.side.salad', 'rsvp.side.hummus', 'rsvp.side.bread'] },
  ],
  caribbean: [
    { key: 'jerk_chicken', emoji: '🍗', sides: ['rsvp.side.rice', 'rsvp.side.plantain', 'rsvp.side.vegetables', 'rsvp.side.salad'] },
    { key: 'curry_goat', emoji: '🍛', sides: ['rsvp.side.rice', 'rsvp.side.plantain', 'rsvp.side.vegetables', 'rsvp.side.bread'] },
    { key: 'fish_escovitch', emoji: '🐟', sides: ['rsvp.side.plantain', 'rsvp.side.rice', 'rsvp.side.salad', 'rsvp.side.vegetables'] },
    { key: 'callaloo_veg', emoji: '🥬', sides: ['rsvp.side.rice', 'rsvp.side.plantain', 'rsvp.side.vegetables', 'rsvp.side.sweetpotato'] },
  ],
};

const drinkOptions = [
  { key: 'juice_tropical', emoji: '🧃' },
  { key: 'lemonade', emoji: '🍋' },
  { key: 'sparkling_water', emoji: '💧' },
  { key: 'mocktail', emoji: '🍹' },
  { key: 'tea', emoji: '🍵' },
  { key: 'coffee', emoji: '☕' },
  { key: 'smoothie', emoji: '🥤' },
  { key: 'hibiscus', emoji: '🌺' },
];

// Payment link placeholder — replace with actual payment link
const PAYMENT_BASE_URL = 'https://pay.example.com/corine-ruben';

const ICON_MAP: Record<string, React.ElementType> = {
  Sparkles, Church, Camera, PartyPopper, Waves, Cake, Music,
  Car, Train, ParkingCircle,
};

const TRANSPORT_ICON_MAP: Record<string, React.ElementType> = {
  Car, Train, ParkingCircle,
};

const TRANSPORT_LABEL_MAP: Record<string, string> = {
  car: 'venue.byCar',
  transit: 'venue.byTransit',
  parking: 'venue.parking',
};

const fadeUp = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

const RSVP = () => {
  const { t, language } = useLanguage();
  const { settings, loading: settingsLoading } = useSiteSettings();
  const { schedule, hotels, transport, loading: venueLoading } = useVenueData();
  const isCourtMode = settings.active_event === 'court';
  const [step, setStep] = useState<Step>('info');

  // Edit RSVP modal state
  const [editOpen, setEditOpen] = useState(false);
  const [editLookupName, setEditLookupName] = useState('');
  const [editLookupEmail, setEditLookupEmail] = useState('');
  const [editLooking, setEditLooking] = useState(false);
  const [editFound, setEditFound] = useState<{ id: string; attending: boolean; guests: number } | null>(null);
  const [editAttending, setEditAttending] = useState<boolean | null>(null);
  const [editGuests, setEditGuests] = useState(1);
  const [editSaving, setEditSaving] = useState(false);

  const handleEditLookup = async () => {
    if (!editLookupName.trim() || !editLookupEmail.trim()) return;
    setEditLooking(true);
    setEditFound(null);
    const { data } = await supabase
      .from('rsvps')
      .select('id, attending, guests')
      .ilike('name', editLookupName.trim())
      .ilike('email', editLookupEmail.trim())
      .maybeSingle();
    if (data) {
      setEditFound(data);
      setEditAttending(data.attending);
      setEditGuests(data.guests ?? 1);
    } else {
      toast.error(t('rsvp.edit.notFound'));
    }
    setEditLooking(false);
  };

  const handleEditSave = async () => {
    if (!editFound || editAttending === null) return;
    setEditSaving(true);
    const { error } = await supabase
      .from('rsvps')
      .update({
        attending: editAttending,
        guests: editGuests,
        status: editAttending ? 'confirmed' : 'declined',
      })
      .eq('id', editFound.id);
    if (error) {
      toast.error('Update failed. Please try again.');
    } else {
      toast.success(t('rsvp.edit.updated'));
      setEditOpen(false);
      setEditFound(null);
      setEditLookupName('');
      setEditLookupEmail('');
    }
    setEditSaving(false);
  };
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [attending, setAttending] = useState<boolean | null>(null);
  const [companions, setCompanions] = useState<string[]>([]);
  const [newCompanionName, setNewCompanionName] = useState('');

  // Meal
  const [selectedCuisine, setSelectedCuisine] = useState<string | null>(null);
  const [selectedMeal, setSelectedMeal] = useState<string | null>(null);
  const [selectedSides, setSelectedSides] = useState<string[]>([]);
  const [selectedDrinks, setSelectedDrinks] = useState<string[]>([]);
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

  const toggleDrink = (drink: string) => {
    setSelectedDrinks(prev => prev.includes(drink) ? prev.filter(d => d !== drink) : [...prev, drink]);
  };

  const currentCuisineMeals = useMemo(() => {
    return selectedCuisine ? (mealOptions[selectedCuisine] || []) : [];
  }, [selectedCuisine]);

  const currentMealSides = useMemo(() => {
    const cuisineMeals = selectedCuisine ? (mealOptions[selectedCuisine] || []) : [];
    return cuisineMeals.find(m => m.key === selectedMeal)?.sides || [];
  }, [selectedCuisine, selectedMeal]);

  const canProceedMeal = selectedCuisine !== null && selectedMeal !== null;

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

  const handleSubmitRsvp = async () => {
    try {
      // Duplicate check by name (case-insensitive)
      const { data: existing } = await supabase
        .from('rsvps')
        .select('id')
        .ilike('name', name.trim())
        .maybeSingle();
      if (existing) {
        toast.error('An RSVP with this name already exists. Please contact us if you need to update it.');
        return;
      }

      // Save RSVP
      const tableName = selectedTable ? tables.find(t => t.id === selectedTable)?.name : null;
      const { error: rsvpError } = await supabase.from('rsvps').insert({
        name,
        email: email || null,
        attending: attending ?? false,
        guests: 1 + companions.length,
        companions,
        cuisine: selectedCuisine,
        meal: selectedMeal,
        sides: selectedSides,
        drinks: selectedDrinks,
        dietary: dietary || null,
        table_name: tableName,
        stay_anonymous: stayAnonymous,
        status: attending ? 'confirmed' : 'declined',
        message: giftMessage || null,
      });
      if (rsvpError) throw rsvpError;

      // Save gift if applicable
      if (finalGiftAmount > 0) {
        const { error: giftError } = await supabase.from('gifts').insert({
          from_name: stayAnonymous ? 'Anonymous' : name,
          amount: finalGiftAmount,
          message: giftMessage || null,
        });
        if (giftError) throw giftError;
      }

      // Send RSVP confirmation email
      if (email) {
        try {
          await supabase.functions.invoke('send-rsvp-confirmation', {
            body: {
              guestName: name,
              guestEmail: email,
              attending: attending ?? false,
              guests: 1 + companions.length,
            },
          });
        } catch (e) {
          console.error('RSVP confirmation email failed:', e);
        }
      }

      setStep('done');
      toast.success('RSVP submitted! 💕');
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong. Please try again.');
    }
  };

  const courtVenue = settings.court_wedding_venue || '301 Sycamore St, Brookville — Mayor Letner';
  const courtAfterVenue = settings.court_wedding_after_venue || '10209 Gully Pass Dr, Dayton, OH 45458';

  const allSteps: Step[] = isCourtMode ? ['info'] : ['info', 'meal', 'table'];
  const currentStepIndex = allSteps.indexOf(step);

  const ceremonyAddress = settings.ceremony_address || '';
  const ceremonyMapsUrl = settings.ceremony_maps_url || '';
  const ceremonyTime = settings.ceremony_time || '15:00';
  const receptionAddress = settings.reception_address || '';
  const receptionMapsUrl = settings.reception_maps_url || '';
  const receptionTime = settings.reception_time || '19:00';
  const mapEmbedUrl = settings.map_embed_url || '';

  const getTransportDesc = (item: typeof transport[number]) => {
    if (language === 'fr' && item.description_fr) return item.description_fr;
    if (language === 'es' && item.description_es) return item.description_es;
    return item.description;
  };

  const getScheduleLabel = (item: typeof schedule[number]) => {
    if (language === 'fr' && item.label_fr) return item.label_fr;
    if (language === 'es' && item.label_es) return item.label_es;
    return item.label;
  };

  return (
    <div className="min-h-screen pt-28 pb-20 relative">

      {/* ===== VENUE SECTION ===== */}
      <div className="container mx-auto px-6 md:px-12 max-w-3xl relative z-10 mb-20">
        <motion.div initial="hidden" animate="show" variants={fadeUp} className="text-center mb-14">
          <div className="inline-block px-5 py-2 rounded-full glass-card-strong mb-5">
            <p className="font-sans-elegant text-xs tracking-[0.25em] uppercase text-muted-foreground font-medium">{t('venue.badge')}</p>
          </div>
          <h2 className="font-serif-display text-3xl md:text-5xl text-foreground mb-4 font-semibold" style={{ letterSpacing: '-0.5px' }}>
            {isCourtMode ? t('venue.court.title') : t('venue.title')}
          </h2>
          <p className="font-sans-elegant text-base text-muted-foreground max-w-md mx-auto" style={{ lineHeight: 1.6 }}>
            {isCourtMode ? t('venue.court.subtitle') : t('venue.subtitle')}
          </p>
        </motion.div>

        {isCourtMode ? (
          <>
            {/* Court venue cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
              <motion.div initial="hidden" animate="show" variants={fadeUp} className="glass-card-strong rounded-3xl p-5 md:p-7">
                <div className="flex items-start gap-4 mb-5">
                  <div className="w-14 h-14 rounded-2xl glass-card flex items-center justify-center text-2xl flex-shrink-0">⚖️</div>
                  <div>
                    <p className="font-sans-elegant text-xs tracking-[0.2em] uppercase text-muted-foreground mb-1">{t('court.wedding.ceremony')}</p>
                    <p className="font-serif-display text-xl font-semibold text-foreground">{t('court.wedding.time')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 mb-3">
                  <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="font-sans-elegant text-sm text-muted-foreground">{courtVenue}</p>
                </div>
                <p className="font-sans-elegant text-xs text-muted-foreground/70">{t('court.wedding.officiant')}</p>
              </motion.div>

              <motion.div initial="hidden" animate="show" variants={fadeUp} transition={{ delay: 0.1 }} className="glass-card-strong rounded-3xl p-5 md:p-7">
                <div className="flex items-start gap-4 mb-5">
                  <div className="w-14 h-14 rounded-2xl glass-card flex items-center justify-center text-2xl flex-shrink-0">🍽️</div>
                  <div>
                    <p className="font-sans-elegant text-xs tracking-[0.2em] uppercase text-muted-foreground mb-1">{t('court.wedding.after')}</p>
                    <p className="font-serif-display text-xl font-semibold text-foreground">{t('venue.court.after')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 mb-3">
                  <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="font-sans-elegant text-sm text-muted-foreground">{courtAfterVenue}</p>
                </div>
                <p className="font-sans-elegant text-xs text-muted-foreground/70">{t('court.wedding.after.desc')}</p>
              </motion.div>
            </div>

            {/* Church coming soon */}
            <motion.div initial="hidden" animate="show" variants={fadeUp} transition={{ delay: 0.2 }}
              className="glass-card-strong rounded-3xl p-6 text-center border-primary/20 mb-10"
            >
              <p className="font-sans-elegant text-sm text-foreground font-medium mb-1">{t('church.wedding.coming.short')}</p>
              <p className="font-sans-elegant text-xs text-muted-foreground">{t('rsvp.court.coming.note')}</p>
            </motion.div>
          </>
        ) : (
          <>
            {/* Church venue cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
              {[
                { label: t('venue.ceremony'), address: ceremonyAddress, url: ceremonyMapsUrl, time: ceremonyTime, emoji: '⛪' },
                { label: t('venue.reception'), address: receptionAddress, url: receptionMapsUrl, time: receptionTime, emoji: '🎉' },
              ].map(({ label, address, url, time, emoji }, i) => (
                <motion.div
                  key={label}
                  initial="hidden" animate="show" variants={fadeUp}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card-strong rounded-3xl p-5 md:p-7"
                >
                  <div className="flex items-start gap-4 mb-5">
                    <div className="w-14 h-14 rounded-2xl glass-card flex items-center justify-center text-2xl flex-shrink-0">
                      {emoji}
                    </div>
                    <div>
                      <p className="font-sans-elegant text-xs tracking-[0.2em] uppercase text-muted-foreground mb-1">{label}</p>
                      <p className="font-serif-display text-xl font-semibold text-foreground">{time}</p>
                    </div>
                  </div>
                  {address && (
                    <div className="flex items-start gap-2 mb-4">
                      <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <p className="font-sans-elegant text-sm text-muted-foreground">{address}</p>
                    </div>
                  )}
                  {url && (
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full btn-primary text-xs font-semibold"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      {t('venue.getDirections')}
                    </a>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Map embed */}
            {mapEmbedUrl && (
              <motion.div
                initial="hidden" animate="show" variants={fadeUp} transition={{ delay: 0.2 }}
                className="glass-card-strong rounded-3xl overflow-hidden mb-10"
              >
                <iframe
                  title="Venue location"
                  src={mapEmbedUrl}
                  width="100%"
                  height="280"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </motion.div>
            )}

            {/* Day Schedule */}
            {schedule.length > 0 && (
              <motion.div
                initial="hidden" animate="show" variants={fadeUp} transition={{ delay: 0.25 }}
                className="glass-card-strong rounded-3xl p-8 mb-10"
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-2xl glass-card flex items-center justify-center">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-serif-display text-2xl font-semibold text-foreground">{t('venue.schedule')}</h3>
                </div>
                <div className="space-y-0">
                  {schedule.map((item, i) => {
                    const Icon = ICON_MAP[item.icon] || Sparkles;
                    return (
                      <div key={item.id} className="flex gap-4 group">
                        <div className="flex flex-col items-center">
                          <div className={`w-8 h-8 rounded-full glass-card border border-border/50 flex items-center justify-center flex-shrink-0 ${item.color}`}>
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          {i < schedule.length - 1 && (
                            <div className="w-px flex-1 bg-border/40 my-1" style={{ minHeight: '28px' }} />
                          )}
                        </div>
                        <div className="pb-5 pt-0.5">
                          <span className="font-sans-elegant text-xs font-bold text-primary tracking-wide">{item.time}</span>
                          <p className="font-sans-elegant text-sm text-foreground font-medium mt-0.5">{getScheduleLabel(item)}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Getting There */}
            {transport.length > 0 && (
              <motion.div
                initial="hidden" animate="show" variants={fadeUp} transition={{ delay: 0.3 }}
                className="glass-card-strong rounded-3xl p-8 mb-10"
              >
                <h3 className="font-serif-display text-2xl font-semibold text-foreground mb-6">{t('venue.gettingThere')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {transport.map((item) => {
                    const Icon = TRANSPORT_ICON_MAP[item.icon] || Car;
                    return (
                      <div key={item.id} className="glass-card rounded-2xl p-5">
                        <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center mb-3">
                          <Icon className="w-5 h-5 text-primary-foreground" />
                        </div>
                        <p className="font-sans-elegant text-sm font-semibold text-foreground mb-2">{t(TRANSPORT_LABEL_MAP[item.type] || 'venue.byCar')}</p>
                        <p className="font-sans-elegant text-xs text-muted-foreground leading-relaxed">{getTransportDesc(item)}</p>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Accommodation */}
            {hotels.length > 0 && (
              <motion.div initial="hidden" animate="show" variants={fadeUp} transition={{ delay: 0.35 }}>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-2xl glass-card flex items-center justify-center">
                    <Hotel className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-serif-display text-2xl font-semibold text-foreground">{t('venue.accommodation')}</h3>
                    <p className="font-sans-elegant text-xs text-muted-foreground">{t('venue.accommodation.subtitle')}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {hotels.map((hotel, i) => (
                    <motion.div
                      key={hotel.id}
                      initial="hidden" animate="show" variants={fadeUp}
                      transition={{ delay: 0.35 + i * 0.07 }}
                      className="glass-card-strong rounded-2xl p-5 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-start justify-between mb-1">
                          <p className="font-sans-elegant text-sm font-semibold text-foreground">{hotel.name}</p>
                          <span className="font-sans-elegant text-xs font-bold text-primary">{hotel.price}</span>
                        </div>
                        <div className="flex gap-0.5 mb-2">
                          {Array.from({ length: hotel.stars }).map((_, j) => (
                            <span key={j} className="text-amber-400 text-xs">★</span>
                          ))}
                        </div>
                        <p className="font-sans-elegant text-xs text-muted-foreground mb-3">{hotel.description}</p>
                        <div className="flex items-center gap-1.5 mb-4">
                          <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
                          <span className="font-sans-elegant text-xs text-muted-foreground">{hotel.distance} from venue</span>
                        </div>
                      </div>
                      <a
                        href={hotel.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline font-sans-elegant"
                      >
                        <ExternalLink className="w-3 h-3" />
                        {t('venue.bookNow')}
                      </a>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </>
        )}
      </div>

      {/* ===== RSVP SECTION ===== */}
      <div className="container mx-auto px-6 md:px-12 max-w-2xl relative z-10">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="inline-block px-5 py-2 rounded-full glass-card-strong mb-5">
            <p className="font-sans-elegant text-xs tracking-[0.25em] uppercase text-muted-foreground font-medium">{t('nav.rsvp')}</p>
          </div>

          {/* Rings decoration around title */}
          <div className="relative inline-block mb-4">
            <motion.img
              src={ringsImg}
              alt="Wedding rings"
              className="absolute -top-6 -left-10 w-14 h-14 md:w-20 md:h-20 object-contain opacity-60 rotate-[-15deg] pointer-events-none"
              initial={{ opacity: 0, scale: 0.5, rotate: -30 }}
              animate={{ opacity: 0.6, scale: 1, rotate: -15 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            />
            <motion.img
              src={ringsImg}
              alt="Wedding rings"
              className="absolute -top-4 -right-8 w-12 h-12 md:w-16 md:h-16 object-contain opacity-40 rotate-[20deg] pointer-events-none"
              initial={{ opacity: 0, scale: 0.5, rotate: 40 }}
              animate={{ opacity: 0.4, scale: 1, rotate: 20 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />
            <h1 className="font-serif-display text-3xl md:text-6xl text-foreground font-semibold relative z-10" style={{ letterSpacing: '-0.5px' }}>
              {t('rsvp.title')}
            </h1>
          </div>

          <div className="flex items-center justify-center gap-3 mb-2">
            <Gem className="w-4 h-4 text-primary/50" />
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            <Gem className="w-4 h-4 text-primary/50" />
          </div>
          <p className="font-sans-elegant text-base text-muted-foreground mb-6">{t('rsvp.subtitle')}</p>

          {/* Your Information Menu */}
          <div className="flex items-center justify-center gap-3 flex-wrap">
            {/* Edit RSVP */}
            <button
              type="button"
              onClick={() => setEditOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-card-strong text-sm font-sans-elegant font-medium text-foreground hover:border-primary/30 hover:shadow-glow transition-all duration-300"
            >
              <Pencil className="w-3.5 h-3.5 text-primary" />
              {t('rsvp.edit.link')}
            </button>

            {/* Share RSVP Link */}
            <button
              type="button"
              onClick={async () => {
                const rsvpUrl = `${window.location.origin}/rsvp`;
                if (navigator.share) {
                  try { await navigator.share({ title: 'RSVP – Corine & Ruben Wedding', url: rsvpUrl }); } catch (_e) { /* share cancelled or unsupported */ }
                } else {
                  await navigator.clipboard.writeText(rsvpUrl);
                  toast.success('RSVP link copied! 💕');
                }
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-card-strong text-sm font-sans-elegant font-medium text-foreground hover:border-primary/30 hover:shadow-glow transition-all duration-300"
            >
              <Share2 className="w-3.5 h-3.5 text-primary" />
              Share RSVP
            </button>

            {/* Copy Link */}
            <button
              type="button"
              onClick={async () => {
                const rsvpUrl = `${window.location.origin}/rsvp`;
                await navigator.clipboard.writeText(rsvpUrl);
                toast.success('Link copied! 💕');
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-card-strong text-sm font-sans-elegant font-medium text-foreground hover:border-primary/30 hover:shadow-glow transition-all duration-300"
            >
              <Link2 className="w-3.5 h-3.5 text-primary" />
              Copy Link
            </button>
          </div>
        </motion.div>

        {/* Edit RSVP Dialog */}
        <Dialog open={editOpen} onOpenChange={setEditOpen}>
          <DialogContent className="glass-card-strong border-border/30 rounded-3xl max-w-md">
            <DialogHeader>
              <DialogTitle className="font-serif-display text-xl text-foreground flex items-center gap-2">
                <Pencil className="w-5 h-5 text-primary" />
                {t('rsvp.edit.title')}
              </DialogTitle>
            </DialogHeader>

            {!editFound ? (
              <div className="space-y-4 pt-2">
                <p className="font-sans-elegant text-sm text-muted-foreground">
                  {t('rsvp.edit.lookup')}
                </p>
                <div>
                  <label className="font-sans-elegant text-xs font-medium text-foreground mb-1.5 block">{t('rsvp.name')}</label>
                  <Input
                    value={editLookupName}
                    onChange={e => setEditLookupName(e.target.value)}
                    placeholder={t('rsvp.name.placeholder')}
                    className="rounded-full h-11 glass-card border-border/30 font-sans-elegant"
                  />
                </div>
                <div>
                  <label className="font-sans-elegant text-xs font-medium text-foreground mb-1.5 block">{t('rsvp.email')}</label>
                  <Input
                    type="email"
                    value={editLookupEmail}
                    onChange={e => setEditLookupEmail(e.target.value)}
                    placeholder={t('rsvp.email.placeholder')}
                    className="rounded-full h-11 glass-card border-border/30 font-sans-elegant"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleEditLookup}
                  disabled={editLooking || !editLookupName.trim() || !editLookupEmail.trim()}
                  className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {editLooking ? <Loader2 className="w-4 h-4 animate-spin" /> : <Heart className="w-4 h-4" />}
                  {t('rsvp.edit.lookup')}
                </button>
              </div>
            ) : (
              <div className="space-y-5 pt-2">
                <p className="font-sans-elegant text-sm text-emerald-400 flex items-center gap-2">
                  <Check className="w-4 h-4" /> RSVP found!
                </p>

                <div>
                  <label className="font-sans-elegant text-sm font-medium text-foreground mb-2 block">{t('rsvp.attending')}</label>
                  <div className="flex gap-3">
                    <button type="button" onClick={() => setEditAttending(true)}
                      className={`flex-1 py-3 rounded-full text-sm font-sans-elegant font-medium transition-all ${editAttending === true ? 'gradient-primary text-primary-foreground' : 'glass-card text-foreground'}`}
                    >
                      🎉 {t('rsvp.edit.attending.yes')}
                    </button>
                    <button type="button" onClick={() => setEditAttending(false)}
                      className={`flex-1 py-3 rounded-full text-sm font-sans-elegant font-medium transition-all ${editAttending === false ? 'gradient-primary text-primary-foreground' : 'glass-card text-foreground'}`}
                    >
                      💕 {t('rsvp.edit.attending.no')}
                    </button>
                  </div>
                </div>

                {editAttending && (
                  <div>
                    <label className="font-sans-elegant text-sm font-medium text-foreground mb-2 block">Total guests (including you)</label>
                    <div className="flex items-center gap-3">
                      <button type="button" onClick={() => setEditGuests(g => Math.max(1, g - 1))}
                        className="w-9 h-9 rounded-full glass-card flex items-center justify-center text-foreground hover:bg-primary/20 transition-colors"
                      >-</button>
                      <span className="font-serif-display text-xl font-bold text-foreground w-8 text-center">{editGuests}</span>
                      <button type="button" onClick={() => setEditGuests(g => Math.min(10, g + 1))}
                        className="w-9 h-9 rounded-full glass-card flex items-center justify-center text-foreground hover:bg-primary/20 transition-colors"
                      >+</button>
                    </div>
                  </div>
                )}

                <div className="flex gap-3">
                  <button type="button" onClick={() => setEditFound(null)} className="flex-1 py-3 rounded-full glass-card text-sm font-sans-elegant text-foreground">
                    Back
                  </button>
                  <button type="button" onClick={handleEditSave} disabled={editSaving || editAttending === null}
                    className="flex-1 btn-primary disabled:opacity-50"
                  >
                    {editSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                    Save
                  </button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Progress Steps */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} className="flex items-center justify-center gap-2 mb-10">
          {allSteps.map((s, i) => {
            const icons = isCourtMode ? [Users, Gift] : [Users, Utensils, Users, Gift];
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
                  <button type="button" onClick={() => setAttending(true)}
                    className={`flex-1 py-3.5 rounded-full text-sm font-sans-elegant font-medium transition-all duration-500 ${
                      attending === true ? 'gradient-primary text-primary-foreground shadow-glow' : 'glass-card hover:border-primary/30 text-foreground'
                    }`}
                  >
                    🎉 {t('rsvp.yes')}
                  </button>
                  <button type="button" onClick={() => { setAttending(false); if (name.trim()) handleSubmitRsvp(); }}
                    className={`flex-1 py-3.5 rounded-full text-sm font-sans-elegant font-medium transition-all duration-500 ${
                      attending === false ? 'gradient-primary text-primary-foreground shadow-glow' : 'glass-card hover:border-primary/30 text-foreground'
                    }`}
                  >
                    {t('rsvp.no')}
                  </button>
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

              <button disabled={!canProceedInfo} onClick={() => attending ? (isCourtMode ? handleSubmitRsvp() : setStep('meal')) : handleSubmitRsvp()}
                className="w-full btn-primary justify-center disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:transform-none"
              >
                {attending ? t('rsvp.next') : t('rsvp.next')}
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

              {/* Biblical food notice */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card rounded-2xl p-4 border-primary/20">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-sm">✝️</span>
                  </div>
                  <div>
                    <p className="font-sans-elegant text-xs text-foreground font-semibold mb-1">{t('rsvp.meal.notice.title')}</p>
                    <p className="font-sans-elegant text-[11px] text-muted-foreground leading-relaxed">{t('rsvp.meal.notice.body')}</p>
                  </div>
                </div>
              </motion.div>

              {/* Step 1: Choose cuisine */}
              <div>
                <label className="font-sans-elegant text-sm text-foreground block mb-3 font-semibold flex items-center gap-2">
                  <Globe className="w-4 h-4 text-primary" />
                  {t('rsvp.cuisine')}
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {cuisineOptions.map(c => (
                    <button key={c.key} type="button" onClick={() => { setSelectedCuisine(c.key); setSelectedMeal(null); setSelectedSides([]); }}
                      className={`py-4 rounded-2xl text-center font-sans-elegant font-medium transition-all duration-500 ${
                        selectedCuisine === c.key ? 'gradient-primary text-primary-foreground shadow-glow' : 'glass-card hover:border-primary/30 text-foreground'
                      }`}
                    >
                      <div className="text-xl mb-1.5">{c.emoji}</div>
                      <div className="text-xs">{t(`rsvp.cuisine.${c.key}`)}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Choose dish */}
              {selectedCuisine && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-3">
                  <label className="font-sans-elegant text-sm text-foreground block font-semibold">{t('rsvp.meal')}</label>
                  <div className="grid grid-cols-2 gap-3">
                    {currentCuisineMeals.map(opt => (
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
                </motion.div>
              )}

              {/* Step 3: Sides */}
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

              {/* Drinks */}
              <div>
                <label className="font-sans-elegant text-sm text-foreground block mb-3 font-semibold flex items-center gap-2">
                  <Wine className="w-4 h-4 text-primary" />
                  {t('rsvp.drinks')}
                </label>
                <p className="font-sans-elegant text-[11px] text-muted-foreground mb-3">{t('rsvp.drinks.notice')}</p>
                <div className="grid grid-cols-4 gap-2">
                  {drinkOptions.map(d => (
                    <button key={d.key} type="button" onClick={() => toggleDrink(d.key)}
                      className={`py-3 rounded-2xl text-center font-sans-elegant font-medium transition-all duration-300 ${
                        selectedDrinks.includes(d.key) ? 'gradient-primary text-primary-foreground shadow-soft' : 'glass-card hover:border-primary/30 text-foreground'
                      }`}
                    >
                      <div className="text-lg mb-1">{d.emoji}</div>
                      <div className="text-[10px]">{t(`rsvp.drink.${d.key}`)}</div>
                    </button>
                  ))}
                </div>
              </div>

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
                <button onClick={() => handleSubmitRsvp()}
                  className="flex-1 btn-primary justify-center"
                >
                  {t('rsvp.submit')} <Check className="w-4 h-4" />
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
                <button onClick={() => setStep(isCourtMode ? 'info' : 'table')} className="flex-1 btn-outline justify-center">{t('rsvp.back')}</button>
                <button onClick={handleSubmitRsvp}
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
                  {selectedMeal && selectedCuisine && (
                    <div className="glass-card rounded-2xl p-4">
                      <p className="font-sans-elegant text-[10px] text-muted-foreground uppercase tracking-wider mb-1">{t('rsvp.done.meal')}</p>
                      <p className="font-sans-elegant text-sm text-foreground font-semibold">
                        {currentCuisineMeals.find(m => m.key === selectedMeal)?.emoji} {t(`rsvp.meal.${selectedMeal}`)}
                      </p>
                      <p className="font-sans-elegant text-[10px] text-muted-foreground mt-1">{t(`rsvp.cuisine.${selectedCuisine}`)}</p>
                    </div>
                  )}
                  {selectedDrinks.length > 0 && (
                    <div className="glass-card rounded-2xl p-4">
                      <p className="font-sans-elegant text-[10px] text-muted-foreground uppercase tracking-wider mb-1">{t('rsvp.done.drinks')}</p>
                      <p className="font-sans-elegant text-sm text-foreground font-semibold">
                        {selectedDrinks.map(d => t(`rsvp.drink.${d}`)).join(', ')}
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

              {isCourtMode && (
                <div className="glass-card rounded-2xl p-4 border-primary/20 mt-2">
                  <p className="font-sans-elegant text-xs text-muted-foreground">{t('rsvp.court.coming.note')}</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RSVP;
