import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { CheckCircle, XCircle, Trash2, Loader2, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

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
  };

  const deleteEntry = async (id: string) => {
    await supabase.from('guestbook').delete().eq('id', id);
    setEntries(entries.filter(e => e.id !== id));
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
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" /> Pending Approval ({pending.length})
          </h3>
          <div className="space-y-3">
            {pending.map(entry => (
              <EntryCard key={entry.id} entry={entry} onToggle={toggleApproval} onDelete={deleteEntry} />
            ))}
          </div>
        </div>
      )}

      {approved.length > 0 && (
        <div>
          <h3 className="font-serif-display text-lg font-semibold text-foreground mb-3">Approved ({approved.length})</h3>
          <div className="space-y-3">
            {approved.map(entry => (
              <EntryCard key={entry.id} entry={entry} onToggle={toggleApproval} onDelete={deleteEntry} />
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

const EntryCard = ({ entry, onToggle, onDelete }: {
  entry: GuestbookEntry;
  onToggle: (id: string, approved: boolean) => void;
  onDelete: (id: string) => void;
}) => (
  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
    className="glass-card-strong rounded-3xl p-5 flex items-start gap-4">
    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 ${
      entry.approved ? 'bg-emerald-500/15' : 'bg-amber-500/15'
    }`}>
      {entry.approved ? <CheckCircle className="w-5 h-5 text-emerald-400" /> : <XCircle className="w-5 h-5 text-amber-400" />}
    </div>
    <div className="flex-1 min-w-0">
      <p className="font-sans-elegant text-sm font-bold text-foreground">{entry.name}</p>
      <p className="font-sans-elegant text-sm text-muted-foreground leading-relaxed mt-1">{entry.message}</p>
      <p className="font-sans-elegant text-[10px] text-muted-foreground/60 mt-2">{new Date(entry.created_at).toLocaleDateString()}</p>
    </div>
    <div className="flex gap-2 flex-shrink-0">
      <button
        onClick={() => onToggle(entry.id, entry.approved)}
        className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
          entry.approved ? 'bg-amber-500/10 hover:bg-amber-500/20' : 'bg-emerald-500/10 hover:bg-emerald-500/20'
        }`}
        title={entry.approved ? 'Unapprove' : 'Approve'}
      >
        {entry.approved ? <XCircle className="w-4 h-4 text-amber-500" /> : <CheckCircle className="w-4 h-4 text-emerald-500" />}
      </button>
      <button
        onClick={() => onDelete(entry.id)}
        className="w-9 h-9 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 flex items-center justify-center transition-colors"
        title="Delete"
      >
        <Trash2 className="w-4 h-4 text-rose-500" />
      </button>
    </div>
  </motion.div>
);

export default GuestbookManager;
