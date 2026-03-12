import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { CheckCircle, XCircle, Trash2, Loader2, MessageCircle, Pencil, EyeOff, Eye, Check, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  approved: boolean;
  created_at: string;
}

const GuestbookManager = () => {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from('guestbook')
        .select('*')
        .order('created_at', { ascending: false });
      if (data) setEntries(data);
      setLoading(false);
    };
    fetch();
  }, []);

  const toggleApproval = async (id: string, approved: boolean) => {
    await supabase.from('guestbook').update({ approved: !approved }).eq('id', id);
    setEntries(entries.map(e => e.id === id ? { ...e, approved: !approved } : e));
    toast.success(!approved ? 'Entry visible' : 'Entry hidden');
  };

  const deleteEntry = async (id: string) => {
    await supabase.from('guestbook').delete().eq('id', id);
    setEntries(entries.filter(e => e.id !== id));
    toast.success('Entry deleted');
  };

  const updateEntry = async (id: string, name: string, message: string) => {
    const { error } = await supabase.from('guestbook').update({ name, message }).eq('id', id);
    if (error) {
      toast.error('Failed to update');
      return;
    }
    setEntries(entries.map(e => e.id === id ? { ...e, name, message } : e));
    toast.success('Entry updated');
  };

  const pending = entries.filter(e => !e.approved);
  const approved = entries.filter(e => e.approved);

  if (loading) return <div className="flex justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>;

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="glass-card-strong rounded-3xl p-6 text-center">
          <p className="font-sans-elegant text-xs text-muted-foreground uppercase tracking-wide mb-1">Total</p>
          <p className="font-serif-display text-3xl font-semibold text-foreground">{entries.length}</p>
        </div>
        <div className="glass-card-strong rounded-3xl p-6 text-center">
          <p className="font-sans-elegant text-xs text-muted-foreground uppercase tracking-wide mb-1">Hidden</p>
          <p className="font-serif-display text-3xl font-semibold text-amber-400">{pending.length}</p>
        </div>
        <div className="glass-card-strong rounded-3xl p-6 text-center">
          <p className="font-sans-elegant text-xs text-muted-foreground uppercase tracking-wide mb-1">Visible</p>
          <p className="font-serif-display text-3xl font-semibold text-emerald-400">{approved.length}</p>
        </div>
      </div>

      {pending.length > 0 && (
        <div>
          <h3 className="font-serif-display text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" /> Hidden ({pending.length})
          </h3>
          <div className="space-y-3">
            {pending.map(entry => (
              <EntryCard key={entry.id} entry={entry} onToggle={toggleApproval} onDelete={deleteEntry} onUpdate={updateEntry} />
            ))}
          </div>
        </div>
      )}

      {approved.length > 0 && (
        <div>
          <h3 className="font-serif-display text-lg font-semibold text-foreground mb-3">Visible ({approved.length})</h3>
          <div className="space-y-3">
            {approved.map(entry => (
              <EntryCard key={entry.id} entry={entry} onToggle={toggleApproval} onDelete={deleteEntry} onUpdate={updateEntry} />
            ))}
          </div>
        </div>
      )}

      {entries.length === 0 && (
        <div className="glass-card-strong rounded-3xl p-12 text-center">
          <MessageCircle className="w-8 h-8 text-muted-foreground/40 mx-auto mb-3" />
          <p className="font-sans-elegant text-sm text-muted-foreground">No guestbook entries yet</p>
        </div>
      )}
    </div>
  );
};

const EntryCard = ({ entry, onToggle, onDelete, onUpdate }: {
  entry: GuestbookEntry;
  onToggle: (id: string, approved: boolean) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, name: string, message: string) => void;
}) => {
  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState(entry.name);
  const [editMessage, setEditMessage] = useState(entry.message);

  const handleSave = () => {
    if (!editName.trim() || !editMessage.trim()) return;
    onUpdate(entry.id, editName.trim(), editMessage.trim());
    setEditing(false);
  };

  const handleCancel = () => {
    setEditName(entry.name);
    setEditMessage(entry.message);
    setEditing(false);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
      className="glass-card-strong rounded-3xl p-5 flex items-start gap-4">
      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 ${
        entry.approved ? 'bg-emerald-500/15' : 'bg-amber-500/15'
      }`}>
        {entry.approved ? <Eye className="w-5 h-5 text-emerald-400" /> : <EyeOff className="w-5 h-5 text-amber-400" />}
      </div>
      <div className="flex-1 min-w-0">
        {editing ? (
          <div className="space-y-3">
            <div>
              <label className="font-sans-elegant text-xs text-muted-foreground mb-1 block">Name</label>
              <Input
                value={editName}
                onChange={e => setEditName(e.target.value)}
                className="rounded-2xl h-10 text-sm"
              />
            </div>
            <div>
              <label className="font-sans-elegant text-xs text-muted-foreground mb-1 block">Message</label>
              <Textarea
                value={editMessage}
                onChange={e => setEditMessage(e.target.value)}
                className="rounded-2xl text-sm"
                rows={3}
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-500 font-sans-elegant text-xs font-semibold transition-colors"
              >
                <Check className="w-3.5 h-3.5" /> Save
              </button>
              <button
                onClick={handleCancel}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-muted hover:bg-muted/80 text-muted-foreground font-sans-elegant text-xs font-semibold transition-colors"
              >
                <X className="w-3.5 h-3.5" /> Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <p className="font-sans-elegant text-sm font-bold text-foreground">{entry.name}</p>
            <p className="font-sans-elegant text-sm text-muted-foreground leading-relaxed mt-1">{entry.message}</p>
            <p className="font-sans-elegant text-[10px] text-muted-foreground/60 mt-2">{new Date(entry.created_at).toLocaleDateString()}</p>
          </>
        )}
      </div>
      {!editing && (
        <div className="flex gap-2 flex-shrink-0">
          <button
            onClick={() => setEditing(true)}
            className="w-9 h-9 rounded-xl bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors"
            title="Edit"
          >
            <Pencil className="w-4 h-4 text-primary" />
          </button>
          <button
            onClick={() => onToggle(entry.id, entry.approved)}
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
              entry.approved ? 'bg-amber-500/10 hover:bg-amber-500/20' : 'bg-emerald-500/10 hover:bg-emerald-500/20'
            }`}
            title={entry.approved ? 'Hide' : 'Show'}
          >
            {entry.approved ? <EyeOff className="w-4 h-4 text-amber-500" /> : <Eye className="w-4 h-4 text-emerald-500" />}
          </button>
          <button
            onClick={() => onDelete(entry.id)}
            className="w-9 h-9 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 flex items-center justify-center transition-colors"
            title="Delete"
          >
            <Trash2 className="w-4 h-4 text-rose-500" />
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default GuestbookManager;
