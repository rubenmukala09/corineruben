import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { motion, AnimatePresence } from 'framer-motion';
import { Image, Upload, Trash2, Loader2, Plus, Layout, Eye } from 'lucide-react';
import { Input } from '@/components/ui/input';

const SECTIONS = [
  {
    id: 'homepage_hero',
    label: '🏠 Homepage Hero',
    desc: 'Main banner image at the top of the landing page',
    preview: 'Full-width banner behind "C & R" heading',
    layout: 'hero', // single large image
  },
  {
    id: 'homepage_gallery',
    label: '🖼️ Homepage Gallery',
    desc: '4-photo love gallery strip on homepage',
    preview: 'Row of 4 square photos in the "Our Love Gallery" section',
    layout: 'grid-4',
  },
  {
    id: 'story_timeline',
    label: '📖 Story Timeline',
    desc: 'Images alongside each story timeline event',
    preview: 'Appears next to timeline cards on Our Story page',
    layout: 'cards',
  },
  {
    id: 'story_gallery',
    label: '🎨 Story Gallery',
    desc: 'Masonry photo gallery at the bottom of Our Story',
    preview: 'Mixed-size photos in a 3-column masonry grid',
    layout: 'masonry',
  },
  {
    id: 'faith',
    label: '⛪ Faith & Grace',
    desc: 'Images in the faith & grace section on homepage',
    preview: 'Decorative images in the faith widgets area',
    layout: 'cards',
  },
  {
    id: 'rsvp',
    label: '💌 RSVP',
    desc: 'Decorative images on the RSVP page',
    preview: 'Background/accent images around the RSVP form',
    layout: 'accent',
  },
];

interface SiteImage {
  id: string;
  section: string;
  storage_path: string;
  url: string;
  alt_text: string;
  sort_order: number;
  created_at: string;
}

// Visual layout preview showing where images appear
const LayoutPreview = ({ layout, images }: { layout: string; images: SiteImage[] }) => {
  const placeholders = images.length > 0 ? images : [];

  if (layout === 'hero') {
    return (
      <div className="rounded-xl overflow-hidden border border-border/20 bg-muted/20">
        <div className="aspect-[16/5] relative flex items-center justify-center">
          {placeholders[0] ? (
            <img src={placeholders[0].url} alt="" className="w-full h-full object-cover" />
          ) : (
            <div className="flex flex-col items-center gap-1 text-muted-foreground/40">
              <Layout className="w-6 h-6" />
              <span className="text-[9px] font-sans-elegant">Full-width hero banner</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
          <div className="absolute bottom-2 left-3 text-[8px] font-sans-elegant text-foreground/60 font-bold">C & R</div>
        </div>
      </div>
    );
  }

  if (layout === 'grid-4') {
    return (
      <div className="rounded-xl overflow-hidden border border-border/20 bg-muted/20 p-2">
        <p className="text-[8px] font-sans-elegant text-muted-foreground/50 text-center mb-1.5">Our Love Gallery</p>
        <div className="grid grid-cols-4 gap-1">
          {[0, 1, 2, 3].map(i => (
            <div key={i} className="aspect-square rounded-lg overflow-hidden bg-muted/30">
              {placeholders[i] ? (
                <img src={placeholders[i].url} alt="" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground/30">
                  <Image className="w-3 h-3" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (layout === 'masonry') {
    return (
      <div className="rounded-xl overflow-hidden border border-border/20 bg-muted/20 p-2">
        <p className="text-[8px] font-sans-elegant text-muted-foreground/50 text-center mb-1.5">Photo Gallery</p>
        <div className="grid grid-cols-3 gap-1">
          {[0, 1, 2, 3, 4, 5].map(i => (
            <div key={i} className={`rounded-lg overflow-hidden bg-muted/30 ${i % 3 === 1 ? 'aspect-square' : i % 3 === 2 ? 'aspect-[3/4]' : 'aspect-[4/3]'}`}>
              {placeholders[i] ? (
                <img src={placeholders[i].url} alt="" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground/30">
                  <Image className="w-3 h-3" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Default cards layout
  return (
    <div className="rounded-xl overflow-hidden border border-border/20 bg-muted/20 p-2">
      <div className="grid grid-cols-3 gap-1">
        {[0, 1, 2].map(i => (
          <div key={i} className="aspect-[4/3] rounded-lg overflow-hidden bg-muted/30">
            {placeholders[i] ? (
              <img src={placeholders[i].url} alt="" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground/30">
                <Image className="w-3 h-3" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const ImageManager = () => {
  const [images, setImages] = useState<SiteImage[]>([]);
  const [activeSection, setActiveSection] = useState(SECTIONS[0].id);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    const { data } = await supabase
      .from('site_images')
      .select('*')
      .order('sort_order', { ascending: true });
    if (data) setImages(data as SiteImage[]);
  };

  const sectionImages = images.filter(img => img.section === activeSection);
  const activeConfig = SECTIONS.find(s => s.id === activeSection)!;

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploading(true);

    for (const file of Array.from(files)) {
      const ext = file.name.split('.').pop();
      const path = `${activeSection}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from('site-images')
        .upload(path, file);

      if (uploadError) {
        console.error('Upload error:', uploadError);
        continue;
      }

      const { data: urlData } = supabase.storage
        .from('site-images')
        .getPublicUrl(path);

      const maxOrder = sectionImages.length > 0
        ? Math.max(...sectionImages.map(i => i.sort_order)) + 1
        : 0;

      await supabase.from('site_images').insert({
        section: activeSection,
        storage_path: path,
        url: urlData.publicUrl,
        alt_text: file.name.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' '),
        sort_order: maxOrder,
      });
    }

    await fetchImages();
    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDelete = async (img: SiteImage) => {
    setDeleting(img.id);
    await supabase.storage.from('site-images').remove([img.storage_path]);
    await supabase.from('site_images').delete().eq('id', img.id);
    setImages(prev => prev.filter(i => i.id !== img.id));
    setDeleting(null);
  };

  const handleUpdateAlt = async (id: string, alt_text: string) => {
    await supabase.from('site_images').update({ alt_text }).eq('id', id);
    setImages(prev => prev.map(i => i.id === id ? { ...i, alt_text } : i));
  };

  return (
    <div className="space-y-6">
      {/* Section selector with visual previews */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="glass-card-strong rounded-3xl p-6">
        <div className="flex items-center gap-2 mb-2">
          <Image className="w-5 h-5 text-primary" />
          <h3 className="font-serif-display text-lg font-semibold text-foreground">Where should this image appear?</h3>
        </div>
        <p className="font-sans-elegant text-xs text-muted-foreground mb-5">Select a section to see exactly where your images will be displayed on the website.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {SECTIONS.map(section => {
            const sectionImgs = images.filter(img => img.section === section.id);
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`rounded-2xl p-3 text-left transition-all duration-300 border flex flex-col gap-2 ${
                  activeSection === section.id
                    ? 'border-primary/40 bg-primary/10 ring-2 ring-primary/20'
                    : 'border-border/20 glass-card hover:bg-primary/5'
                }`}
              >
                {/* Mini layout preview */}
                <LayoutPreview layout={section.layout} images={sectionImgs} />

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-sans-elegant text-sm font-bold text-foreground">{section.label}</p>
                    <p className="font-sans-elegant text-[10px] text-muted-foreground mt-0.5">{section.desc}</p>
                  </div>
                  <span className="text-[10px] font-sans-elegant text-muted-foreground bg-muted/30 px-2 py-0.5 rounded-full">
                    {sectionImgs.length}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Upload area with context */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="glass-card-strong rounded-3xl p-6">

        {/* Section context banner */}
        <div className="rounded-2xl bg-primary/5 border border-primary/10 p-4 mb-5 flex items-start gap-3">
          <Eye className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-sans-elegant text-sm font-bold text-foreground">{activeConfig.label}</p>
            <p className="font-sans-elegant text-xs text-muted-foreground">{activeConfig.preview}</p>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Upload className="w-5 h-5 text-primary" />
            <h3 className="font-serif-display text-lg font-semibold text-foreground">
              Upload Images
            </h3>
          </div>
          <span className="font-sans-elegant text-xs text-muted-foreground">
            {sectionImages.length} image{sectionImages.length !== 1 ? 's' : ''} in this section
          </span>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleUpload}
          className="hidden"
        />

        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="w-full border-2 border-dashed border-border/30 rounded-2xl p-8 flex flex-col items-center gap-3 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 mb-4"
        >
          {uploading ? (
            <>
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
              <p className="font-sans-elegant text-sm text-muted-foreground">Uploading to {activeConfig.label}...</p>
            </>
          ) : (
            <>
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center">
                <Plus className="w-7 h-7 text-primary" />
              </div>
              <p className="font-sans-elegant text-sm text-foreground font-medium">Click to upload images</p>
              <p className="font-sans-elegant text-xs text-muted-foreground">JPG, PNG, WebP · These will appear in <span className="font-bold text-primary">{activeConfig.label}</span></p>
            </>
          )}
        </button>

        {/* Image grid */}
        <AnimatePresence>
          {sectionImages.length === 0 ? (
            <div className="text-center py-8">
              <Image className="w-8 h-8 text-muted-foreground/30 mx-auto mb-2" />
              <p className="font-sans-elegant text-sm text-muted-foreground">No images in <span className="font-bold">{activeConfig.label}</span> yet</p>
              <p className="font-sans-elegant text-[10px] text-muted-foreground/60 mt-1">Upload images above to see them appear on your website</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {sectionImages.map((img, idx) => (
                <motion.div
                  key={img.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="glass-card rounded-2xl p-2 group relative"
                >
                  {/* Position badge */}
                  <div className="absolute top-3 left-3 z-10 w-6 h-6 rounded-full bg-foreground/70 text-background text-[10px] font-bold flex items-center justify-center font-sans-elegant">
                    {idx + 1}
                  </div>

                  <div className="aspect-square rounded-xl overflow-hidden mb-2">
                    <img
                      src={img.url}
                      alt={img.alt_text}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <Input
                    value={img.alt_text}
                    onChange={(e) => handleUpdateAlt(img.id, e.target.value)}
                    placeholder="Alt text..."
                    className="rounded-lg h-8 text-xs glass-card border-border/20 font-sans-elegant"
                  />
                  <button
                    onClick={() => handleDelete(img)}
                    disabled={deleting === img.id}
                    className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-destructive/80 hover:bg-destructive flex items-center justify-center transition-colors opacity-0 group-hover:opacity-100"
                    title="Delete image"
                  >
                    {deleting === img.id ? (
                      <Loader2 className="w-3.5 h-3.5 text-destructive-foreground animate-spin" />
                    ) : (
                      <Trash2 className="w-3.5 h-3.5 text-destructive-foreground" />
                    )}
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default ImageManager;
