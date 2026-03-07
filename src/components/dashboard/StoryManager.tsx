import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Plus, Trash2, Loader2, Save, ChevronDown, ChevronUp } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface StoryEvent {
  id: string;
  title: string;
  title_fr: string | null;
  title_es: string | null;
  description: string;
  description_fr: string | null;
  description_es: string | null;
  date_label: string;
  date_label_fr: string | null;
  date_label_es: string | null;
  icon: string;
  sort_order: number;
  created_at: string;
}

const EMOJI_OPTIONS = ['💫', '🌹', '✈️', '🏡', '💍', '💒', '🎓', '🌸', '❤️', '✨', '🥂', '💎', '🕊️', '🎶', '⛪', '🌅'];

const StoryManager = () => {
  const [events, setEvents] = useState<StoryEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);

  const [newEvent, setNewEvent] = useState({
    title: '', title_fr: '', title_es: '',
    description: '', description_fr: '', description_es: '',
    date_label: '', date_label_fr: '', date_label_es: '',
    icon: '💫',
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const { data } = await supabase
      .from('story_events')
      .select('*')
      .order('sort_order', { ascending: true });
    if (data) setEvents(data as StoryEvent[]);
    setLoading(false);
  };

  const handleAddEvent = async () => {
    if (!newEvent.title.trim() || !newEvent.description.trim() || !newEvent.date_label.trim()) return;
    setAdding(true);

    const maxOrder = events.length > 0 ? Math.max(...events.map(e => e.sort_order)) + 1 : 0;

    const { data, error } = await supabase.from('story_events').insert({
      title: newEvent.title.trim(),
      title_fr: newEvent.title_fr.trim() || null,
      title_es: newEvent.title_es.trim() || null,
      description: newEvent.description.trim(),
      description_fr: newEvent.description_fr.trim() || null,
      description_es: newEvent.description_es.trim() || null,
      date_label: newEvent.date_label.trim(),
      date_label_fr: newEvent.date_label_fr.trim() || null,
      date_label_es: newEvent.date_label_es.trim() || null,
      icon: newEvent.icon,
      sort_order: maxOrder,
    }).select().single();

    if (data && !error) {
      setEvents([...events, data as StoryEvent]);
      setNewEvent({
        title: '', title_fr: '', title_es: '',
        description: '', description_fr: '', description_es: '',
        date_label: '', date_label_fr: '', date_label_es: '',
        icon: '💫',
      });
    }
    setAdding(false);
  };

  const handleUpdateEvent = async (event: StoryEvent) => {
    setSaving(event.id);
    await supabase.from('story_events').update({
      title: event.title, title_fr: event.title_fr, title_es: event.title_es,
      description: event.description, description_fr: event.description_fr, description_es: event.description_es,
      date_label: event.date_label, date_label_fr: event.date_label_fr, date_label_es: event.date_label_es,
      icon: event.icon,
    }).eq('id', event.id);
    setSaving(null);
  };

  const handleDeleteEvent = async (id: string) => {
    await supabase.from('story_events').delete().eq('id', id);
    setEvents(events.filter(e => e.id !== id));
  };

  const handleMoveEvent = async (id: string, direction: 'up' | 'down') => {
    const idx = events.findIndex(e => e.id === id);
    if ((direction === 'up' && idx === 0) || (direction === 'down' && idx === events.length - 1)) return;

    const newEvents = [...events];
    const swapIdx = direction === 'up' ? idx - 1 : idx + 1;
    const tempOrder = newEvents[idx].sort_order;
    newEvents[idx].sort_order = newEvents[swapIdx].sort_order;
    newEvents[swapIdx].sort_order = tempOrder;
    [newEvents[idx], newEvents[swapIdx]] = [newEvents[swapIdx], newEvents[idx]];
    setEvents(newEvents);

    await Promise.all([
      supabase.from('story_events').update({ sort_order: newEvents[idx].sort_order }).eq('id', newEvents[idx].id),
      supabase.from('story_events').update({ sort_order: newEvents[swapIdx].sort_order }).eq('id', newEvents[swapIdx].id),
    ]);
  };

  const updateEventField = (id: string, field: keyof StoryEvent, value: string) => {
    setEvents(events.map(e => e.id === id ? { ...e, [field]: value } : e));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Timeline visual preview */}
      {events.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="glass-card-strong rounded-3xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-primary" />
            <h3 className="font-serif-display text-lg font-semibold text-foreground">Your Timeline Preview</h3>
          </div>
          <p className="font-sans-elegant text-xs text-muted-foreground mb-4">This is the order your story appears on the website. Drag events below to reorder.</p>

          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-primary/30 via-accent/20 to-transparent" />
            <div className="space-y-3">
              {events.map((event, idx) => (
                <div key={event.id} className="flex items-center gap-3 pl-1.5">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center z-10 flex-shrink-0 ring-2 ring-background">
                    <span className="text-[10px] font-bold font-sans-elegant text-primary">{idx + 1}</span>
                  </div>
                  <div className="flex-1 flex items-center gap-2 glass-card rounded-xl px-3 py-2">
                    <span className="text-lg">{event.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-sans-elegant text-xs font-bold text-foreground truncate">{event.title}</p>
                      <p className="font-sans-elegant text-[10px] text-muted-foreground">{event.date_label}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Add new event */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
        className="glass-card-strong rounded-3xl p-8">
        <div className="flex items-center gap-2 mb-2">
          <Plus className="w-5 h-5 text-primary" />
          <h3 className="font-serif-display text-lg font-semibold text-foreground">Add Story Event</h3>
        </div>
        <p className="font-sans-elegant text-xs text-muted-foreground mb-6">
          This will be added as <span className="font-bold text-primary">Event #{events.length + 1}</span> at the end of your timeline.
        </p>

        <div className="space-y-4">
          {/* Icon picker */}
          <div>
            <label className="font-sans-elegant text-xs text-muted-foreground font-medium block mb-2">Icon</label>
            <div className="flex flex-wrap gap-2">
              {EMOJI_OPTIONS.map(emoji => (
                <button
                  key={emoji}
                  onClick={() => setNewEvent(prev => ({ ...prev, icon: emoji }))}
                  className={`w-10 h-10 rounded-xl text-lg flex items-center justify-center transition-all border ${
                    newEvent.icon === emoji
                      ? 'border-primary/40 bg-primary/10 scale-110'
                      : 'border-border/20 glass-card hover:bg-primary/5'
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          <p className="font-sans-elegant text-xs text-muted-foreground font-medium pt-2">🇬🇧 English (required)</p>
          <Input value={newEvent.date_label} onChange={(e) => setNewEvent(prev => ({ ...prev, date_label: e.target.value }))}
            placeholder="Date label (e.g. 'Summer 2020')" className="rounded-2xl h-11 glass-card border-border/30 font-sans-elegant" />
          <Input value={newEvent.title} onChange={(e) => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
            placeholder="Event title" className="rounded-2xl h-11 glass-card border-border/30 font-sans-elegant" />
          <Textarea value={newEvent.description} onChange={(e) => setNewEvent(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Event description" className="rounded-2xl glass-card border-border/30 font-sans-elegant min-h-[80px]" />

          <p className="font-sans-elegant text-xs text-muted-foreground font-medium pt-2">🇫🇷 Français (optionnel)</p>
          <Input value={newEvent.date_label_fr} onChange={(e) => setNewEvent(prev => ({ ...prev, date_label_fr: e.target.value }))}
            placeholder="Date (Français)" className="rounded-2xl h-11 glass-card border-border/30 font-sans-elegant" />
          <Input value={newEvent.title_fr} onChange={(e) => setNewEvent(prev => ({ ...prev, title_fr: e.target.value }))}
            placeholder="Titre (Français)" className="rounded-2xl h-11 glass-card border-border/30 font-sans-elegant" />
          <Textarea value={newEvent.description_fr} onChange={(e) => setNewEvent(prev => ({ ...prev, description_fr: e.target.value }))}
            placeholder="Description (Français)" className="rounded-2xl glass-card border-border/30 font-sans-elegant min-h-[60px]" />

          <p className="font-sans-elegant text-xs text-muted-foreground font-medium pt-2">🇪🇸 Español (opcional)</p>
          <Input value={newEvent.date_label_es} onChange={(e) => setNewEvent(prev => ({ ...prev, date_label_es: e.target.value }))}
            placeholder="Fecha (Español)" className="rounded-2xl h-11 glass-card border-border/30 font-sans-elegant" />
          <Input value={newEvent.title_es} onChange={(e) => setNewEvent(prev => ({ ...prev, title_es: e.target.value }))}
            placeholder="Título (Español)" className="rounded-2xl h-11 glass-card border-border/30 font-sans-elegant" />
          <Textarea value={newEvent.description_es} onChange={(e) => setNewEvent(prev => ({ ...prev, description_es: e.target.value }))}
            placeholder="Descripción (Español)" className="rounded-2xl glass-card border-border/30 font-sans-elegant min-h-[60px]" />

          <button
            onClick={handleAddEvent}
            disabled={adding || !newEvent.title.trim() || !newEvent.description.trim() || !newEvent.date_label.trim()}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {adding ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
            Add Event
          </button>
        </div>
      </motion.div>

      {/* Existing events */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="space-y-3">
        <div className="flex items-center gap-2 px-2">
          <BookOpen className="w-5 h-5 text-primary" />
          <h3 className="font-serif-display text-lg font-semibold text-foreground">Edit Timeline Events ({events.length})</h3>
        </div>

        {events.length === 0 ? (
          <div className="glass-card-strong rounded-3xl p-12 text-center">
            <BookOpen className="w-8 h-8 text-muted-foreground/40 mx-auto mb-3" />
            <p className="font-sans-elegant text-sm text-muted-foreground">No story events yet. Add your first one above!</p>
          </div>
        ) : events.map((event, idx) => (
          <div key={event.id} className="glass-card-strong rounded-3xl overflow-hidden">
            {/* Header row */}
            <div
              className="flex items-center gap-4 p-5 cursor-pointer hover:bg-primary/5 transition-colors"
              onClick={() => setExpandedId(expandedId === event.id ? null : event.id)}
            >
              <div className="flex flex-col gap-1">
                <button onClick={(e) => { e.stopPropagation(); handleMoveEvent(event.id, 'up'); }}
                  disabled={idx === 0}
                  className="p-0.5 rounded hover:bg-primary/10 disabled:opacity-20 transition-colors">
                  <ChevronUp className="w-3.5 h-3.5 text-muted-foreground" />
                </button>
                <button onClick={(e) => { e.stopPropagation(); handleMoveEvent(event.id, 'down'); }}
                  disabled={idx === events.length - 1}
                  className="p-0.5 rounded hover:bg-primary/10 disabled:opacity-20 transition-colors">
                  <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
                </button>
              </div>

              {/* Step number */}
              <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold font-sans-elegant text-primary">{idx + 1}</span>
              </div>

              <span className="text-2xl">{event.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="font-sans-elegant text-sm font-bold text-foreground truncate">{event.title}</p>
                <p className="font-sans-elegant text-xs text-muted-foreground">{event.date_label}</p>
              </div>
              <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${expandedId === event.id ? 'rotate-180' : ''}`} />
            </div>

            {/* Expanded edit form */}
            <AnimatePresence>
              {expandedId === event.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5 space-y-4 border-t border-border/10 pt-4">
                    <div className="flex flex-wrap gap-1.5">
                      {EMOJI_OPTIONS.map(emoji => (
                        <button key={emoji} onClick={() => updateEventField(event.id, 'icon', emoji)}
                          className={`w-8 h-8 rounded-lg text-sm flex items-center justify-center transition-all border ${
                            event.icon === emoji ? 'border-primary/40 bg-primary/10' : 'border-border/10 hover:bg-primary/5'
                          }`}>{emoji}</button>
                      ))}
                    </div>

                    <p className="font-sans-elegant text-xs text-muted-foreground font-medium">🇬🇧 English</p>
                    <Input value={event.date_label} onChange={(e) => updateEventField(event.id, 'date_label', e.target.value)}
                      placeholder="Date label" className="rounded-2xl h-10 glass-card border-border/30 font-sans-elegant text-sm" />
                    <Input value={event.title} onChange={(e) => updateEventField(event.id, 'title', e.target.value)}
                      placeholder="Title" className="rounded-2xl h-10 glass-card border-border/30 font-sans-elegant text-sm" />
                    <Textarea value={event.description} onChange={(e) => updateEventField(event.id, 'description', e.target.value)}
                      placeholder="Description" className="rounded-2xl glass-card border-border/30 font-sans-elegant text-sm min-h-[70px]" />

                    <p className="font-sans-elegant text-xs text-muted-foreground font-medium">🇫🇷 Français</p>
                    <Input value={event.date_label_fr || ''} onChange={(e) => updateEventField(event.id, 'date_label_fr', e.target.value)}
                      placeholder="Date (FR)" className="rounded-2xl h-10 glass-card border-border/30 font-sans-elegant text-sm" />
                    <Input value={event.title_fr || ''} onChange={(e) => updateEventField(event.id, 'title_fr', e.target.value)}
                      placeholder="Titre (FR)" className="rounded-2xl h-10 glass-card border-border/30 font-sans-elegant text-sm" />
                    <Textarea value={event.description_fr || ''} onChange={(e) => updateEventField(event.id, 'description_fr', e.target.value)}
                      placeholder="Description (FR)" className="rounded-2xl glass-card border-border/30 font-sans-elegant text-sm min-h-[60px]" />

                    <p className="font-sans-elegant text-xs text-muted-foreground font-medium">🇪🇸 Español</p>
                    <Input value={event.date_label_es || ''} onChange={(e) => updateEventField(event.id, 'date_label_es', e.target.value)}
                      placeholder="Fecha (ES)" className="rounded-2xl h-10 glass-card border-border/30 font-sans-elegant text-sm" />
                    <Input value={event.title_es || ''} onChange={(e) => updateEventField(event.id, 'title_es', e.target.value)}
                      placeholder="Título (ES)" className="rounded-2xl h-10 glass-card border-border/30 font-sans-elegant text-sm" />
                    <Textarea value={event.description_es || ''} onChange={(e) => updateEventField(event.id, 'description_es', e.target.value)}
                      placeholder="Descripción (ES)" className="rounded-2xl glass-card border-border/30 font-sans-elegant text-sm min-h-[60px]" />

                    <div className="flex gap-2 pt-2">
                      <button onClick={() => handleUpdateEvent(event)}
                        disabled={saving === event.id}
                        className="btn-primary disabled:opacity-50">
                        {saving === event.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        Save Changes
                      </button>
                      <button onClick={() => handleDeleteEvent(event.id)}
                        className="px-4 py-2 rounded-full bg-destructive/10 hover:bg-destructive/20 text-destructive font-sans-elegant text-xs font-bold flex items-center gap-1.5 transition-colors">
                        <Trash2 className="w-4 h-4" /> Delete
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default StoryManager;
