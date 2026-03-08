import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Plus, Trash2, Loader2, HelpCircle, Save, ChevronDown, ChevronUp } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { motion } from 'framer-motion';

interface FaqRow {
  id: string;
  question: string;
  question_fr: string | null;
  question_es: string | null;
  answer: string;
  answer_fr: string | null;
  answer_es: string | null;
  sort_order: number;
}

const FaqManager = () => {
  const [faqs, setFaqs] = useState<FaqRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ question: '', question_fr: '', question_es: '', answer: '', answer_fr: '', answer_es: '' });
  const [saving, setSaving] = useState(false);
  const [adding, setAdding] = useState(false);

  const fetchFaqs = async () => {
    const { data } = await supabase.from('faqs').select('*').order('sort_order', { ascending: true });
    if (data) setFaqs(data as FaqRow[]);
    setLoading(false);
  };

  useEffect(() => { fetchFaqs(); }, []);

  const handleAdd = async () => {
    if (!form.question.trim() || !form.answer.trim()) return;
    setSaving(true);
    const { data } = await supabase.from('faqs').insert({
      question: form.question.trim(),
      question_fr: form.question_fr.trim() || null,
      question_es: form.question_es.trim() || null,
      answer: form.answer.trim(),
      answer_fr: form.answer_fr.trim() || null,
      answer_es: form.answer_es.trim() || null,
      sort_order: faqs.length + 1,
    }).select().single();
    if (data) {
      setFaqs([...faqs, data as FaqRow]);
      setForm({ question: '', question_fr: '', question_es: '', answer: '', answer_fr: '', answer_es: '' });
      setAdding(false);
    }
    setSaving(false);
  };

  const handleUpdate = async (id: string) => {
    setSaving(true);
    await supabase.from('faqs').update({
      question: form.question.trim(),
      question_fr: form.question_fr.trim() || null,
      question_es: form.question_es.trim() || null,
      answer: form.answer.trim(),
      answer_fr: form.answer_fr.trim() || null,
      answer_es: form.answer_es.trim() || null,
    }).eq('id', id);
    setFaqs(faqs.map(f => f.id === id ? { ...f, ...form } : f));
    setEditingId(null);
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    await supabase.from('faqs').delete().eq('id', id);
    setFaqs(faqs.filter(f => f.id !== id));
  };

  const handleMove = async (id: string, direction: 'up' | 'down') => {
    const idx = faqs.findIndex(f => f.id === id);
    const swapIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= faqs.length) return;

    const updated = [...faqs];
    [updated[idx], updated[swapIdx]] = [updated[swapIdx], updated[idx]];
    updated.forEach((f, i) => { f.sort_order = i + 1; });
    setFaqs(updated);

    await Promise.all([
      supabase.from('faqs').update({ sort_order: updated[idx].sort_order }).eq('id', updated[idx].id),
      supabase.from('faqs').update({ sort_order: updated[swapIdx].sort_order }).eq('id', updated[swapIdx].id),
    ]);
  };

  const startEdit = (faq: FaqRow) => {
    setEditingId(faq.id);
    setForm({
      question: faq.question,
      question_fr: faq.question_fr || '',
      question_es: faq.question_es || '',
      answer: faq.answer,
      answer_fr: faq.answer_fr || '',
      answer_es: faq.answer_es || '',
    });
  };

  if (loading) return <div className="flex justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="font-sans-elegant text-sm text-muted-foreground">{faqs.length} FAQ items</p>
        <button onClick={() => { setAdding(!adding); setEditingId(null); setForm({ question: '', question_fr: '', question_es: '', answer: '', answer_fr: '', answer_es: '' }); }}
          className="btn-primary flex items-center gap-2 !rounded-full !px-5">
          <Plus className="w-4 h-4" /> Add FAQ
        </button>
      </div>

      {adding && (
        <FaqForm form={form} setForm={setForm} saving={saving}
          onSave={handleAdd} onCancel={() => setAdding(false)} isNew />
      )}

      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <motion.div key={faq.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="glass-card-strong rounded-3xl p-5">
            {editingId === faq.id ? (
              <FaqForm form={form} setForm={setForm} saving={saving}
                onSave={() => handleUpdate(faq.id)} onCancel={() => setEditingId(null)} />
            ) : (
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary/20 to-violet-500/10 flex items-center justify-center flex-shrink-0">
                  <HelpCircle className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-sans-elegant text-sm font-bold text-foreground">{faq.question}</p>
                  <p className="font-sans-elegant text-xs text-muted-foreground mt-1 line-clamp-2">{faq.answer}</p>
                  {faq.question_fr && <p className="font-sans-elegant text-[10px] text-muted-foreground/60 mt-1">🇫🇷 {faq.question_fr}</p>}
                </div>
                <div className="flex flex-col gap-1 flex-shrink-0">
                  <button onClick={() => handleMove(faq.id, 'up')} disabled={i === 0}
                    className="w-7 h-7 rounded-lg bg-muted/50 hover:bg-muted flex items-center justify-center disabled:opacity-30">
                    <ChevronUp className="w-3 h-3" />
                  </button>
                  <button onClick={() => handleMove(faq.id, 'down')} disabled={i === faqs.length - 1}
                    className="w-7 h-7 rounded-lg bg-muted/50 hover:bg-muted flex items-center justify-center disabled:opacity-30">
                    <ChevronDown className="w-3 h-3" />
                  </button>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button onClick={() => startEdit(faq)}
                    className="w-9 h-9 rounded-xl bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors">
                    <Save className="w-4 h-4 text-primary" />
                  </button>
                  <button onClick={() => handleDelete(faq.id)}
                    className="w-9 h-9 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 flex items-center justify-center transition-colors">
                    <Trash2 className="w-4 h-4 text-rose-500" />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const FaqForm = ({ form, setForm, saving, onSave, onCancel, isNew }: {
  form: { question: string; question_fr: string; question_es: string; answer: string; answer_fr: string; answer_es: string };
  setForm: (f: typeof form) => void;
  saving: boolean;
  onSave: () => void;
  onCancel: () => void;
  isNew?: boolean;
}) => (
  <div className="glass-card-strong rounded-3xl p-6 space-y-4">
    <p className="font-sans-elegant text-xs text-muted-foreground font-medium">🇬🇧 English (required)</p>
    <Input value={form.question} onChange={e => setForm({ ...form, question: e.target.value })}
      placeholder="Question" className="rounded-2xl h-11 glass-card border-border/30 font-sans-elegant" />
    <Textarea value={form.answer} onChange={e => setForm({ ...form, answer: e.target.value })}
      placeholder="Answer" className="rounded-2xl glass-card border-border/30 font-sans-elegant min-h-[80px]" />

    <p className="font-sans-elegant text-xs text-muted-foreground font-medium pt-2">🇫🇷 Français</p>
    <Input value={form.question_fr} onChange={e => setForm({ ...form, question_fr: e.target.value })}
      placeholder="Question (FR)" className="rounded-2xl h-11 glass-card border-border/30 font-sans-elegant" />
    <Textarea value={form.answer_fr} onChange={e => setForm({ ...form, answer_fr: e.target.value })}
      placeholder="Réponse (FR)" className="rounded-2xl glass-card border-border/30 font-sans-elegant min-h-[80px]" />

    <p className="font-sans-elegant text-xs text-muted-foreground font-medium pt-2">🇪🇸 Español</p>
    <Input value={form.question_es} onChange={e => setForm({ ...form, question_es: e.target.value })}
      placeholder="Pregunta (ES)" className="rounded-2xl h-11 glass-card border-border/30 font-sans-elegant" />
    <Textarea value={form.answer_es} onChange={e => setForm({ ...form, answer_es: e.target.value })}
      placeholder="Respuesta (ES)" className="rounded-2xl glass-card border-border/30 font-sans-elegant min-h-[80px]" />

    <div className="flex gap-3">
      <button onClick={onSave} disabled={saving || !form.question.trim() || !form.answer.trim()}
        className="btn-primary disabled:opacity-50">
        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
        {isNew ? 'Add FAQ' : 'Save Changes'}
      </button>
      <button onClick={onCancel} className="btn-outline">Cancel</button>
    </div>
  </div>
);

export default FaqManager;
