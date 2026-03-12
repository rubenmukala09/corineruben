import { useLanguage } from '@/contexts/LanguageContext';
import { MapPin, Clock, Car, Train, ParkingCircle, Hotel, ExternalLink, Church, PartyPopper, Camera, Music, Cake, Sparkles, Waves, Info, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSiteSettings, useVenueData } from '@/hooks/useSiteContent';

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

const Venue = () => {
  const { language, t } = useLanguage();
  const { settings } = useSiteSettings();
  const { schedule, hotels, transport } = useVenueData();

  const isCourtMode = settings.active_event === 'court';

  const ceremonyAddress = settings.ceremony_address || '';
  const ceremonyMapsUrl = settings.ceremony_maps_url || '';
  const ceremonyTime = settings.ceremony_time || '15:00';
  const receptionAddress = settings.reception_address || '';
  const receptionMapsUrl = settings.reception_maps_url || '';
  const receptionTime = settings.reception_time || '19:00';
  const mapEmbedUrl = settings.map_embed_url || '';
  const addressVisible = settings.venue_address_visible !== 'false';

  const courtVenue = settings.court_wedding_venue || '301 Sycamore St, Brookville — Mayor Letner';

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

  // If venue is hidden, show coming soon
  if (settings.venue_visible === 'false') {
    return (
      <div className="min-h-screen pt-28 pb-20 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
            <EyeOff className="w-7 h-7 text-primary" />
          </div>
          <h1 className="font-serif-display text-3xl text-foreground font-semibold mb-3">Coming Soon</h1>
          <p className="font-sans-elegant text-base text-muted-foreground mb-6">
            Venue details will be shared soon. Stay tuned! 💕
          </p>
          <Link to="/" className="btn-primary">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-20 relative">
      <div className="container mx-auto px-6 md:px-12 max-w-3xl relative z-10">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-block px-5 py-2 rounded-full glass-card-strong mb-5">
            <p className="font-sans-elegant text-xs tracking-[0.25em] uppercase text-muted-foreground font-medium">{t('venue.badge')}</p>
          </div>
          <h1 className="font-serif-display text-4xl md:text-6xl text-foreground mb-4 font-semibold" style={{ letterSpacing: '-0.5px' }}>
            {isCourtMode ? t('venue.court.title') : t('venue.title')}
          </h1>
          <p className="font-sans-elegant text-base text-muted-foreground max-w-md mx-auto" style={{ lineHeight: 1.6 }}>
            {isCourtMode ? t('venue.court.subtitle') : t('venue.subtitle')}
          </p>
        </div>

        {/* Court Mode */}
        {isCourtMode ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
              <div className="glass-card-strong rounded-3xl p-7">
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
                <p className="font-sans-elegant text-xs text-muted-foreground/70 mb-1">{t('court.wedding.officiant')}</p>
              </div>

              <div className="glass-card-strong rounded-3xl p-7">
                <div className="flex items-start gap-4 mb-5">
                  <div className="w-14 h-14 rounded-2xl glass-card flex items-center justify-center text-2xl flex-shrink-0">🍽️</div>
                  <div>
                    <p className="font-sans-elegant text-xs tracking-[0.2em] uppercase text-muted-foreground mb-1">{t('court.wedding.after')}</p>
                    <p className="font-serif-display text-xl font-semibold text-foreground">{t('venue.court.after')}</p>
                  </div>
                </div>
                <p className="font-sans-elegant text-xs text-muted-foreground/70">{t('court.wedding.after.desc')}</p>
              </div>
            </div>

            <div className="glass-card-strong rounded-3xl p-6 text-center border-primary/20">
              <div className="flex items-center justify-center gap-3 mb-3">
                <Info className="w-5 h-5 text-primary" />
                <Church className="w-5 h-5 text-primary" />
              </div>
              <p className="font-sans-elegant text-sm text-foreground font-medium mb-1">{t('church.wedding.coming.short')}</p>
              <p className="font-sans-elegant text-xs text-muted-foreground">{t('church.wedding.coming')}</p>
            </div>
          </>
        ) : (
          <>
            {/* Church Mode */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
              {[
                { label: t('venue.ceremony'), address: ceremonyAddress, url: ceremonyMapsUrl, time: ceremonyTime, emoji: '⛪' },
                { label: t('venue.reception'), address: receptionAddress, url: receptionMapsUrl, time: receptionTime, emoji: '🎉' },
              ].map(({ label, address, url, time, emoji }) => (
                <div key={label} className="glass-card-strong rounded-3xl p-7">
                  <div className="flex items-start gap-4 mb-5">
                    <div className="w-14 h-14 rounded-2xl glass-card flex items-center justify-center text-2xl flex-shrink-0">{emoji}</div>
                    <div>
                      <p className="font-sans-elegant text-xs tracking-[0.2em] uppercase text-muted-foreground mb-1">{label}</p>
                      <p className="font-serif-display text-xl font-semibold text-foreground">{time}</p>
                    </div>
                  </div>
                  {addressVisible && address && (
                    <div className="flex items-start gap-2 mb-4">
                      <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <p className="font-sans-elegant text-sm text-muted-foreground">{address}</p>
                    </div>
                  )}
                  {addressVisible && url && (
                    <a href={url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-full btn-primary text-xs font-semibold">
                      <ExternalLink className="w-3.5 h-3.5" />
                      {t('venue.getDirections')}
                    </a>
                  )}
                </div>
              ))}
            </div>

            {addressVisible && mapEmbedUrl && (
              <div className="glass-card-strong rounded-3xl overflow-hidden mb-10">
                <iframe title="Venue location" src={mapEmbedUrl} width="100%" height="280" style={{ border: 0 }} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              </div>
            )}

            {schedule.length > 0 && (
              <div className="glass-card-strong rounded-3xl p-8 mb-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-2xl glass-card flex items-center justify-center">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="font-serif-display text-2xl font-semibold text-foreground">{t('venue.schedule')}</h2>
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
                          {i < schedule.length - 1 && <div className="w-px flex-1 bg-border/40 my-1" style={{ minHeight: '28px' }} />}
                        </div>
                        <div className="pb-5 pt-0.5">
                          <span className="font-sans-elegant text-xs font-bold text-primary tracking-wide">{item.time}</span>
                          <p className="font-sans-elegant text-sm text-foreground font-medium mt-0.5">{getScheduleLabel(item)}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {transport.length > 0 && (
              <div className="glass-card-strong rounded-3xl p-8 mb-10">
                <h2 className="font-serif-display text-2xl font-semibold text-foreground mb-6">{t('venue.gettingThere')}</h2>
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
              </div>
            )}

            {hotels.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-2xl glass-card flex items-center justify-center">
                    <Hotel className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="font-serif-display text-2xl font-semibold text-foreground">{t('venue.accommodation')}</h2>
                    <p className="font-sans-elegant text-xs text-muted-foreground">{t('venue.accommodation.subtitle')}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {hotels.map((hotel) => (
                    <div key={hotel.id} className="glass-card-strong rounded-2xl p-5 flex flex-col justify-between">
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
                      <a href={hotel.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline font-sans-elegant">
                        <ExternalLink className="w-3 h-3" />
                        {t('venue.bookNow')}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
};

export default Venue;
