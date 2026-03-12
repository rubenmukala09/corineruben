import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Loader2, Upload, X, ImageIcon, Camera } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useSiteImages, useStoryEvents } from '@/hooks/useSiteContent';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

// Personal couple photos
import coupleFirstMeeting from '@/assets/couple-first-meeting.jpg';
import couple3 from '@/assets/couple-3.jpg';
import couple5 from '@/assets/couple-5.jpg';
import couple9 from '@/assets/couple-9.jpg';
import couple10 from '@/assets/couple-10.jpg';
import coupleForever from '@/assets/couple-forever.jpg';
import coupleProposal from '@/assets/couple-proposal.jpg';

const FALLBACK_EVENTS = [
  { titleKey: 'story.event1.title', descKey: 'story.event1.description', dateKey: 'story.event1.date', icon: '💫' },
  { titleKey: 'story.event2.title', descKey: 'story.event2.description', dateKey: 'story.event2.date', icon: '✈️' },
  { titleKey: 'story.event3.title', descKey: 'story.event3.description', dateKey: 'story.event3.date', icon: '🔥' },
  { titleKey: 'story.event4.title', descKey: 'story.event4.description', dateKey: 'story.event4.date', icon: '🤝' },
  { titleKey: 'story.event5.title', descKey: 'story.event5.description', dateKey: 'story.event5.date', icon: '💍' },
  { titleKey: 'story.event6.title', descKey: 'story.event6.description', dateKey: 'story.event6.date', icon: '🏡' },
];

// Images paired with timeline events
const EVENT_IMAGES = [coupleFirstMeeting, couple3, couple9, couple5, coupleProposal, couple10];

interface Photo {
  id: string;
  url: string;
  alt: string;
  uploader?: string;
}

const STATIC_PHOTOS = [
  { id: 'static-1', url: coupleFirstMeeting, alt: 'Corine & Ruben' },
  { id: 'static-3', url: couple3, alt: 'Corine & Ruben' },
  { id: 'static-4', url: couple9, alt: 'Corine & Ruben' },
  { id: 'static-5', url: couple10, alt: 'Corine & Ruben' },
];

const Story = () => {
  const { t, language } = useLanguage();
  const { events: dbEvents, loading: eventsLoading } = useStoryEvents();
  const { images: galleryImages, loading: galleryLoading } = useSiteImages('story_gallery');

  // Guest photos state
  const [photos, setPhotos] = useState<Photo[]>(STATIC_PHOTOS);
  const [uploaderName, setUploaderName] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [showUploadPanel, setShowUploadPanel] = useState(false);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const fetchUploadedPhotos = async () => {
    const { data } = await supabase
      .from('photos')
      .select('id, public_url, uploader_name')
      .eq('approved', true)
      .order('created_at', { ascending: false });
    if (data) {
      const uploaded: Photo[] = data.map(p => ({
        id: p.id,
        url: p.public_url,
        alt: `Photo by ${p.uploader_name}`,
        uploader: p.uploader_name,
      }));
      setPhotos([...STATIC_PHOTOS, ...uploaded]);
    }
  };

  useEffect(() => { fetchUploadedPhotos(); }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (f.size > 10 * 1024 * 1024) {
      toast.error('File too large. Max 10 MB.');
      return;
    }
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !uploaderName.trim()) return;
    setUploading(true);

    const ext = file.name.split('.').pop();
    const path = `uploads/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const { error: storageError } = await supabase.storage
      .from('wedding-photos')
      .upload(path, file, { cacheControl: '3600', upsert: false });

    if (storageError) {
      toast.error('Upload failed: ' + storageError.message);
      setUploading(false);
      return;
    }

    const { data: urlData } = supabase.storage.from('wedding-photos').getPublicUrl(path);

    const { error: dbError } = await supabase.from('photos').insert({
      uploader_name: uploaderName.trim(),
      storage_path: path,
      public_url: urlData.publicUrl,
    });

    if (dbError) {
      toast.error('Could not save photo record.');
    } else {
      toast.success(t('gallery.upload.success'));
      setFile(null);
      setPreview(null);
      setUploaderName('');
      setShowUploadPanel(false);
      if (fileRef.current) fileRef.current.value = '';
      fetchUploadedPhotos();
    }
    setUploading(false);
  };

  const cancelUpload = () => {
    setFile(null);
    setPreview(null);
    setUploaderName('');
    setShowUploadPanel(false);
    if (fileRef.current) fileRef.current.value = '';
  };

  const useDbEvents = dbEvents.length > 0;

  const getEventTitle = (event: typeof dbEvents[number]) => {
    if (language === 'fr' && event.title_fr) return event.title_fr;
    if (language === 'es' && event.title_es) return event.title_es;
    return event.title;
  };

  const getEventDesc = (event: typeof dbEvents[number]) => {
    if (language === 'fr' && event.description_fr) return event.description_fr;
    if (language === 'es' && event.description_es) return event.description_es;
    return event.description;
  };

  const getEventDate = (event: typeof dbEvents[number]) => {
    if (language === 'fr' && event.date_label_fr) return event.date_label_fr;
    if (language === 'es' && event.date_label_es) return event.date_label_es;
    return event.date_label;
  };

  // Build gallery from DB or fallback
  const useDbGallery = galleryImages.length > 0;
  const gallery = useDbGallery
    ? galleryImages.map((img) => ({ src: img.url, alt: img.alt_text || 'Wedding photo' }))
    : EVENT_IMAGES.map((src, i) => ({ src, alt: `Wedding moment ${i + 1}` }));

  // Timeline event card with integrated image
  const renderTimelineEvent = (
    content: { icon: string; date: string; title: string; desc: string },
    index: number,
    key: string | number,
    image?: string,
  ) => {
    const isEven = index % 2 === 0;
    return (
      <motion.div
        key={key}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.4 }}
        className="relative mb-16"
      >
        {/* Timeline dot */}
        <div className="absolute left-6 md:left-1/2 w-4 h-4 rounded-full gradient-primary -translate-x-2 mt-2 z-10 ring-4 ring-background shadow-glow" />

        {/* Content row: text + image side by side on desktop */}
        <div className={`ml-14 md:ml-0 md:grid md:grid-cols-2 md:gap-8 items-start ${isEven ? '' : 'md:direction-rtl'}`}>
          {/* Text side */}
          <div className={`${isEven ? 'md:pr-4 md:text-right md:col-start-1' : 'md:pl-4 md:col-start-2'}`} style={{ direction: 'ltr' }}>
            <div className="glass-card-strong glass-glow-hover rounded-3xl p-7 card-hover">
              <span className="text-3xl mb-3 block">{content.icon}</span>
              <span className="font-sans-elegant text-xs tracking-[0.2em] uppercase text-primary font-semibold">{content.date}</span>
              <h3 className="font-serif-display text-xl text-foreground mt-2 mb-3 font-semibold">{content.title}</h3>
              <p className="font-sans-elegant text-sm text-muted-foreground" style={{ lineHeight: 1.6 }}>{content.desc}</p>
            </div>
          </div>

          {/* Image side */}
          {image && (
            <div className={`mt-4 md:mt-0 ${isEven ? 'md:col-start-2' : 'md:col-start-1 md:row-start-1'}`} style={{ direction: 'ltr' }}>
              <button
                type="button"
                onClick={() => setLightbox(image)}
                className="w-full glass-card-strong rounded-3xl p-1.5 cursor-zoom-in group card-hover overflow-hidden"
              >
                <img
                  src={image}
                  alt={content.title}
                  className="w-full aspect-[4/3] object-cover object-[center_20%] rounded-[20px] group-hover:scale-105 transition-transform duration-700"
                  loading={index < 2 ? 'eager' : 'lazy'}
                  decoding={index < 2 ? 'sync' : 'async'}
                  fetchPriority={index < 2 ? 'high' : undefined}
                  width={600}
                  height={450}
                />
              </button>
            </div>
          )}
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen pt-28 pb-20 relative">

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <button
              type="button"
              onClick={() => setLightbox(null)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <motion.img
              initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              src={lightbox}
              alt="Full size"
              className="max-w-full max-h-[90vh] rounded-2xl object-contain"
              onClick={e => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== STORY TIMELINE WITH INTEGRATED GALLERY ===== */}
      <div className="container mx-auto px-6 md:px-12 max-w-5xl relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <div className="inline-block px-5 py-2 rounded-full glass-card-strong mb-5">
            <p className="font-sans-elegant text-xs tracking-[0.25em] uppercase text-muted-foreground font-medium">{t('nav.story')}</p>
          </div>
          <h1 className="font-serif-display text-4xl md:text-6xl text-foreground mb-4 font-semibold" style={{ letterSpacing: '-0.5px' }}>
            {t('story.title')}
          </h1>
          <p className="font-sans-elegant text-base text-muted-foreground max-w-md mx-auto" style={{ lineHeight: 1.6 }}>
            {t('story.subtitle')}
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/40 via-accent/30 to-transparent md:-translate-x-px" />

          {eventsLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
          ) : useDbEvents ? (
            dbEvents.map((event, i) =>
              renderTimelineEvent(
                { icon: event.icon, date: getEventDate(event), title: getEventTitle(event), desc: getEventDesc(event) },
                i,
                event.id,
                gallery[i % gallery.length]?.src,
              )
            )
          ) : (
            FALLBACK_EVENTS.map((event, i) =>
              renderTimelineEvent(
                { icon: event.icon, date: t(event.dateKey), title: t(event.titleKey), desc: t(event.descKey) },
                i,
                i,
                EVENT_IMAGES[i % EVENT_IMAGES.length],
              )
            )
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <div className="glass-card-strong rounded-3xl p-8 inline-block">
            <Heart className="w-8 h-8 text-dusty-rose fill-dusty-rose mx-auto mb-3" />
            <p className="font-serif-display text-lg text-foreground font-semibold">{t('story.continues')}</p>
            <p className="font-sans-elegant text-sm text-muted-foreground mt-1">{t('hero.date')}</p>
          </div>
        </motion.div>
      </div>

      {/* ===== GUEST PHOTOS — Upload & Gallery ===== */}
      <div className="container mx-auto px-6 md:px-12 max-w-5xl relative z-10 mt-20 pb-20">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <div className="inline-block px-5 py-2 rounded-full glass-card-strong mb-5">
            <p className="font-sans-elegant text-xs tracking-[0.25em] uppercase text-muted-foreground font-medium">{t('nav.gallery2')}</p>
          </div>
          <h2 className="font-serif-display text-3xl md:text-5xl text-foreground mb-4 font-semibold">
            {t('gallery.title')}
          </h2>
          <p className="font-sans-elegant text-base text-muted-foreground max-w-md mx-auto mb-6" style={{ lineHeight: 1.6 }}>
            {t('gallery.subtitle')}
          </p>
          <button
            type="button"
            onClick={() => setShowUploadPanel(!showUploadPanel)}
            className="btn-primary inline-flex items-center gap-2"
          >
            <Camera className="w-4 h-4" />
            {t('gallery.upload')}
          </button>
        </motion.div>

        {/* Upload panel */}
        <AnimatePresence>
          {showUploadPanel && (
            <motion.form
              onSubmit={handleUpload}
              initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden mb-8"
            >
              <div className="glass-card-strong rounded-3xl p-7 space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-serif-display text-lg font-semibold text-foreground flex items-center gap-2">
                    <Upload className="w-5 h-5 text-primary" />
                    {t('gallery.upload')}
                  </h3>
                  <button type="button" onClick={cancelUpload} className="p-1.5 rounded-full hover:bg-white/10 transition-colors">
                    <X className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>

                <div>
                  <label className="font-sans-elegant text-sm font-medium text-foreground mb-1.5 block">{t('gallery.upload.name')}</label>
                  <Input
                    value={uploaderName}
                    onChange={e => setUploaderName(e.target.value)}
                    placeholder="Your name..."
                    className="rounded-2xl h-11 glass-card border-border/30 font-sans-elegant"
                    required
                    maxLength={60}
                  />
                </div>

                <div>
                  <label className="font-sans-elegant text-sm font-medium text-foreground mb-1.5 block">{t('gallery.upload.choose')}</label>
                  <label className="flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-border/40 hover:border-primary/50 cursor-pointer transition-colors p-8 glass-card">
                    {preview ? (
                      <img src={preview} alt="Preview" className="max-h-48 rounded-xl object-contain" />
                    ) : (
                      <>
                        <ImageIcon className="w-10 h-10 text-muted-foreground/50" />
                        <span className="font-sans-elegant text-sm text-muted-foreground text-center">
                          Click to select a photo<br />
                          <span className="text-xs text-muted-foreground/60">JPG, PNG, WebP · Max 10 MB</span>
                        </span>
                      </>
                    )}
                    <input
                      ref={fileRef}
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={handleFileChange}
                      className="sr-only"
                      required
                    />
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={uploading || !file || !uploaderName.trim()}
                  className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                  {t('gallery.upload.submit')}
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Photo grid — masonry style */}
        {photos.length > 0 && (
          <div
            className="columns-2 md:columns-3 gap-4 space-y-4"
          >
            {photos.map((photo, i) => (
              <motion.button
                key={photo.id}
                type="button"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => setLightbox(photo.url)}
                className="block w-full break-inside-avoid rounded-2xl overflow-hidden cursor-zoom-in shadow-md hover:shadow-xl transition-shadow"
              >
                <img
                  src={photo.url}
                  alt={photo.alt}
                  loading={i < 4 ? 'eager' : 'lazy'}
                  width={400}
                  height={300}
                  className="w-full aspect-[4/3] object-cover object-[center_20%]"
                />
                {photo.uploader && (
                  <div className="glass-card px-3 py-1.5 text-center">
                    <span className="font-sans-elegant text-xs text-muted-foreground">by {photo.uploader}</span>
                  </div>
                )}
              </motion.button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Story;
