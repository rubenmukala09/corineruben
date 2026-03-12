import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Upload, X, ImageIcon, Camera } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

import couple2 from '@/assets/couple-2-small.webp';
import couple4 from '@/assets/couple-4-thumb.webp';
import couple5 from '@/assets/couple-5-small.webp';
import couple6 from '@/assets/couple-6.jpg';
import couple12 from '@/assets/couple-12.jpg';
import couple13 from '@/assets/couple-13.jpg';
import couple14 from '@/assets/couple-14.jpg';
import corinePortrait from '@/assets/corine-portrait.jpg';
import rubenPortrait from '@/assets/ruben-portrait.jpg';
import coupleFlowers from '@/assets/couple-flowers.jpg';

const STATIC_PHOTOS = [
  { id: 'static-0', url: couple13, alt: 'Corine & Ruben' },
  { id: 'static-00', url: couple14, alt: 'Corine & Ruben' },
  { id: 'static-corine', url: corinePortrait, alt: 'Corine' },
  { id: 'static-ruben', url: rubenPortrait, alt: 'Ruben' },
  { id: 'static-flowers', url: coupleFlowers, alt: 'Corine & Ruben' },
  { id: 'static-1', url: couple2, alt: 'Corine & Ruben' },
  { id: 'static-3', url: couple4, alt: 'Corine & Ruben' },
  { id: 'static-4', url: couple5, alt: 'Corine & Ruben' },
  { id: 'static-5', url: couple6, alt: 'Corine & Ruben' },
  { id: 'static-6', url: couple12, alt: 'Corine & Ruben' },
];

interface Photo {
  id: string;
  url: string;
  alt: string;
  uploader?: string;
}

const Gallery = () => {
  const { t } = useLanguage();
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
    const url = URL.createObjectURL(f);
    setPreview(url);
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !uploaderName.trim()) return;
    setUploading(true);
    const ext = file.name.split('.').pop();
    const path = `uploads/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error: storageError } = await supabase.storage.from('wedding-photos').upload(path, file, { cacheControl: '3600', upsert: false });
    if (storageError) { toast.error('Upload failed: ' + storageError.message); setUploading(false); return; }
    const { data: urlData } = supabase.storage.from('wedding-photos').getPublicUrl(path);
    const { error: dbError } = await supabase.from('photos').insert({ uploader_name: uploaderName.trim(), storage_path: path, public_url: urlData.publicUrl });
    if (dbError) { toast.error('Could not save photo record.'); } else {
      toast.success(t('gallery.upload.success'));
      setFile(null); setPreview(null); setUploaderName(''); setShowUploadPanel(false);
      if (fileRef.current) fileRef.current.value = '';
      fetchUploadedPhotos();
    }
    setUploading(false);
  };

  const cancelUpload = () => {
    setFile(null); setPreview(null); setUploaderName(''); setShowUploadPanel(false);
    if (fileRef.current) fileRef.current.value = '';
  };

  return (
    <div className="min-h-screen pt-28 pb-20 relative">

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <button type="button" onClick={() => setLightbox(null)} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors">
            <X className="w-5 h-5" />
          </button>
          <img src={lightbox} alt="Full size" className="max-w-full max-h-[90vh] rounded-2xl object-contain" onClick={e => e.stopPropagation()} />
        </div>
      )}

      <div className="container mx-auto px-6 md:px-12 max-w-4xl relative z-10">
        <div className="text-center mb-12">
          <div className="inline-block px-5 py-2 rounded-full glass-card-strong mb-5">
            <p className="font-sans-elegant text-xs tracking-[0.25em] uppercase text-muted-foreground font-medium">{t('gallery.badge')}</p>
          </div>
          <h1 className="font-serif-display text-4xl md:text-6xl text-foreground mb-4 font-semibold" style={{ letterSpacing: '-0.5px' }}>{t('gallery.title')}</h1>
          <p className="font-sans-elegant text-base text-muted-foreground mb-6" style={{ lineHeight: 1.6 }}>{t('gallery.subtitle')}</p>
          <button type="button" onClick={() => setShowUploadPanel(!showUploadPanel)} className="btn-primary inline-flex items-center gap-2">
            <Camera className="w-4 h-4" />
            {t('gallery.upload')}
          </button>
        </div>

        {showUploadPanel && (
          <form onSubmit={handleUpload} className="mb-8">
            <div className="glass-card-strong rounded-3xl p-7 space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-serif-display text-lg font-semibold text-foreground flex items-center gap-2">
                  <Upload className="w-5 h-5 text-primary" />
                  {t('gallery.upload')}
                </h2>
                <button type="button" onClick={cancelUpload} className="p-1.5 rounded-full hover:bg-white/10 transition-colors">
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
              <div>
                <label className="font-sans-elegant text-sm font-medium text-foreground mb-1.5 block">{t('gallery.upload.name')}</label>
                <Input value={uploaderName} onChange={e => setUploaderName(e.target.value)} placeholder="Your name..." className="rounded-2xl h-11 glass-card border-border/30 font-sans-elegant" required maxLength={60} />
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
                  <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" onChange={handleFileChange} className="sr-only" required />
                </label>
              </div>
              <button type="submit" disabled={uploading || !file || !uploaderName.trim()} className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed">
                <Upload className="w-4 h-4" />
                {t('gallery.upload.submit')}
              </button>
            </div>
          </form>
        )}

        {photos.length === 0 ? (
          <div className="glass-card-strong rounded-3xl p-16 text-center">
            <p className="text-4xl mb-4">📷</p>
            <p className="font-sans-elegant text-sm text-muted-foreground">{t('gallery.empty')}</p>
          </div>
        ) : (
          <div className="columns-2 md:columns-3 gap-3 space-y-3">
            {photos.map((photo) => (
              <button
                key={photo.id}
                type="button"
                onClick={() => setLightbox(photo.url)}
                className="block w-full break-inside-avoid rounded-2xl overflow-hidden cursor-zoom-in shadow-md hover:shadow-xl transition-shadow"
              >
                <img src={photo.url} alt={photo.alt} style={{ objectPosition: 'center 20%' }} loading="lazy" decoding="async" className="w-full object-cover" />
                {photo.uploader && (
                  <div className="glass-card px-3 py-1.5 text-center">
                    <span className="font-sans-elegant text-xs text-muted-foreground">by {photo.uploader}</span>
                  </div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
