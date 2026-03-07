import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { motion, AnimatePresence } from 'framer-motion';
import { Image, Upload, Trash2, Loader2, Plus, GripVertical } from 'lucide-react';
import { Input } from '@/components/ui/input';

const SECTIONS = [
  { id: 'homepage_hero', label: '🏠 Homepage Hero', desc: 'Main banner images on the landing page' },
  { id: 'homepage_gallery', label: '🖼️ Homepage Gallery', desc: 'Love gallery strip on homepage' },
  { id: 'story_timeline', label: '📖 Story Timeline', desc: 'Images for story timeline events' },
  { id: 'story_gallery', label: '🎨 Story Gallery', desc: 'Masonry photo gallery on Story page' },
  { id: 'faith', label: '⛪ Faith & Grace', desc: 'Images in the faith widgets section' },
  { id: 'rsvp', label: '💌 RSVP', desc: 'Background/decorative images on RSVP page' },
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
      {/* Section selector */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="glass-card-strong rounded-3xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Image className="w-5 h-5 text-primary" />
          <h3 className="font-serif-display text-lg font-semibold text-foreground">Select Section</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {SECTIONS.map(section => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`rounded-2xl p-4 text-left transition-all duration-300 border ${
                activeSection === section.id
                  ? 'border-primary/40 bg-primary/10'
                  : 'border-border/20 glass-card hover:bg-primary/5'
              }`}
            >
              <p className="font-sans-elegant text-sm font-bold text-foreground">{section.label}</p>
              <p className="font-sans-elegant text-[10px] text-muted-foreground mt-1">{section.desc}</p>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Upload area */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="glass-card-strong rounded-3xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Upload className="w-5 h-5 text-primary" />
            <h3 className="font-serif-display text-lg font-semibold text-foreground">
              {SECTIONS.find(s => s.id === activeSection)?.label}
            </h3>
          </div>
          <span className="font-sans-elegant text-xs text-muted-foreground">
            {sectionImages.length} image{sectionImages.length !== 1 ? 's' : ''}
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
              <p className="font-sans-elegant text-sm text-muted-foreground">Uploading...</p>
            </>
          ) : (
            <>
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center">
                <Plus className="w-7 h-7 text-primary" />
              </div>
              <p className="font-sans-elegant text-sm text-foreground font-medium">Click to upload images</p>
              <p className="font-sans-elegant text-xs text-muted-foreground">JPG, PNG, WebP · Multiple files supported</p>
            </>
          )}
        </button>

        {/* Image grid */}
        <AnimatePresence>
          {sectionImages.length === 0 ? (
            <div className="text-center py-8">
              <Image className="w-8 h-8 text-muted-foreground/30 mx-auto mb-2" />
              <p className="font-sans-elegant text-sm text-muted-foreground">No images in this section yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {sectionImages.map((img) => (
                <motion.div
                  key={img.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="glass-card rounded-2xl p-2 group relative"
                >
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
                    className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-rose-500/80 hover:bg-rose-500 flex items-center justify-center transition-colors opacity-0 group-hover:opacity-100"
                    title="Delete image"
                  >
                    {deleting === img.id ? (
                      <Loader2 className="w-3.5 h-3.5 text-white animate-spin" />
                    ) : (
                      <Trash2 className="w-3.5 h-3.5 text-white" />
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
