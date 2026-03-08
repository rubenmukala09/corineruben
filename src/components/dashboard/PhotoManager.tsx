import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { CheckCircle, XCircle, Trash2, Loader2, Camera } from 'lucide-react';
import { motion } from 'framer-motion';

interface PhotoEntry {
  id: string;
  uploader_name: string;
  public_url: string;
  approved: boolean;
  created_at: string;
}

const PhotoManager = () => {
  const [photos, setPhotos] = useState<PhotoEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from('photos')
        .select('*')
        .order('created_at', { ascending: false });
      if (data) setPhotos(data);
      setLoading(false);
    };
    fetch();
  }, []);

  const toggleApproval = async (id: string, approved: boolean) => {
    await supabase.from('photos').update({ approved: !approved }).eq('id', id);
    setPhotos(photos.map(p => p.id === id ? { ...p, approved: !approved } : p));
  };

  const deletePhoto = async (id: string) => {
    await supabase.from('photos').delete().eq('id', id);
    setPhotos(photos.filter(p => p.id !== id));
  };

  const pending = photos.filter(p => !p.approved);
  const approved = photos.filter(p => p.approved);

  if (loading) return <div className="flex justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>;

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="glass-card-strong rounded-3xl p-6 text-center">
          <p className="font-sans-elegant text-xs text-muted-foreground uppercase tracking-wide mb-1">Total</p>
          <p className="font-serif-display text-3xl font-semibold text-foreground">{photos.length}</p>
        </div>
        <div className="glass-card-strong rounded-3xl p-6 text-center">
          <p className="font-sans-elegant text-xs text-muted-foreground uppercase tracking-wide mb-1">Pending</p>
          <p className="font-serif-display text-3xl font-semibold text-amber-400">{pending.length}</p>
        </div>
        <div className="glass-card-strong rounded-3xl p-6 text-center">
          <p className="font-sans-elegant text-xs text-muted-foreground uppercase tracking-wide mb-1">Approved</p>
          <p className="font-serif-display text-3xl font-semibold text-emerald-400">{approved.length}</p>
        </div>
      </div>

      {pending.length > 0 && (
        <div>
          <h3 className="font-serif-display text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" /> Pending ({pending.length})
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {pending.map(photo => (
              <PhotoCard key={photo.id} photo={photo} onToggle={toggleApproval} onDelete={deletePhoto} />
            ))}
          </div>
        </div>
      )}

      {approved.length > 0 && (
        <div>
          <h3 className="font-serif-display text-lg font-semibold text-foreground mb-3">Approved ({approved.length})</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {approved.map(photo => (
              <PhotoCard key={photo.id} photo={photo} onToggle={toggleApproval} onDelete={deletePhoto} />
            ))}
          </div>
        </div>
      )}

      {photos.length === 0 && (
        <div className="glass-card-strong rounded-3xl p-12 text-center">
          <Camera className="w-8 h-8 text-muted-foreground/40 mx-auto mb-3" />
          <p className="font-sans-elegant text-sm text-muted-foreground">No photos uploaded yet</p>
        </div>
      )}
    </div>
  );
};

const PhotoCard = ({ photo, onToggle, onDelete }: {
  photo: PhotoEntry;
  onToggle: (id: string, approved: boolean) => void;
  onDelete: (id: string) => void;
}) => (
  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
    className="glass-card-strong rounded-3xl overflow-hidden">
    <div className="aspect-square relative">
      <img src={photo.public_url} alt={`By ${photo.uploader_name}`} className="w-full h-full object-cover" />
      <div className={`absolute top-2 left-2 px-2 py-1 rounded-full text-[10px] font-bold ${
        photo.approved ? 'bg-emerald-500/90 text-white' : 'bg-amber-500/90 text-white'
      }`}>
        {photo.approved ? '✓ Approved' : '⏳ Pending'}
      </div>
    </div>
    <div className="p-3">
      <p className="font-sans-elegant text-xs font-semibold text-foreground truncate">{photo.uploader_name}</p>
      <p className="font-sans-elegant text-[10px] text-muted-foreground">{new Date(photo.created_at).toLocaleDateString()}</p>
      <div className="flex gap-2 mt-2">
        <button
          onClick={() => onToggle(photo.id, photo.approved)}
          className={`flex-1 py-1.5 rounded-xl text-[10px] font-bold transition-colors ${
            photo.approved ? 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-500' : 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500'
          }`}
        >
          {photo.approved ? 'Unapprove' : 'Approve'}
        </button>
        <button
          onClick={() => onDelete(photo.id)}
          className="py-1.5 px-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 text-[10px] font-bold transition-colors"
        >
          <Trash2 className="w-3 h-3" />
        </button>
      </div>
    </div>
  </motion.div>
);

export default PhotoManager;
