import { useState, useEffect, ChangeEvent } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Save, Loader2, Trash2, Plus, MapPin, Clock, Hotel, Car } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';

const VenueManager = () => {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [schedule, setSchedule] = useState<Record<string, string>[]>([]);
  const [hotels, setHotels] = useState<Record<string, string>[]>([]);
  const [transport, setTransport] = useState<Record<string, string>[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const [settingsRes, scheduleRes, hotelsRes, transportRes] = await Promise.all([
        supabase.from('site_settings').select('*'),
        supabase.from('venue_schedule').select('*').order('sort_order'),
        supabase.from('venue_hotels').select('*').order('sort_order'),
        supabase.from('venue_transport').select('*').order('sort_order'),
      ]);
      if (settingsRes.data) {
        const map: Record<string, string> = {};
        settingsRes.data.forEach((s: { key: string; value: string }) => { map[s.key] = s.value; });
        setSettings(map);
      }
      if (scheduleRes.data) setSchedule(scheduleRes.data);
      if (hotelsRes.data) setHotels(hotelsRes.data);
      if (transportRes.data) setTransport(transportRes.data);
      setLoading(false);
    };
    fetch();
  }, []);

  const saveSetting = async (key: string, value: string) => {
    setSaving(true);
    await supabase.from('site_settings').update({ value }).eq('key', key);
    setSettings({ ...settings, [key]: value });
    setSaving(false);
  };

  const addScheduleItem = async () => {
    const { data } = await supabase.from('venue_schedule').insert({
      time: '00:00', icon: 'Sparkles', label: 'New Event', sort_order: schedule.length + 1, color: 'text-primary',
    }).select().single();
    if (data) setSchedule([...schedule, data]);
  };

  const updateScheduleItem = async (id: string, field: string, value: string) => {
    await supabase.from('venue_schedule').update({ [field]: value }).eq('id', id);
    setSchedule(schedule.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const deleteScheduleItem = async (id: string) => {
    await supabase.from('venue_schedule').delete().eq('id', id);
    setSchedule(schedule.filter(s => s.id !== id));
  };

  const addHotel = async () => {
    const { data } = await supabase.from('venue_hotels').insert({
      name: 'New Hotel', stars: 3, distance: '1.0 km', price: '€€', url: '#', description: '', sort_order: hotels.length + 1,
    }).select().single();
    if (data) setHotels([...hotels, data]);
  };

  const updateHotel = async (id: string, field: string, value: string | number) => {
    await supabase.from('venue_hotels').update({ [field]: value }).eq('id', id);
    setHotels(hotels.map(h => h.id === id ? { ...h, [field]: value } : h));
  };

  const deleteHotel = async (id: string) => {
    await supabase.from('venue_hotels').delete().eq('id', id);
    setHotels(hotels.filter(h => h.id !== id));
  };

  const updateTransport = async (id: string, field: string, value: string) => {
    await supabase.from('venue_transport').update({ [field]: value }).eq('id', id);
    setTransport(transport.map(t => t.id === id ? { ...t, [field]: value } : t));
  };

  if (loading) return <div className="flex justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>;

  return (
    <Tabs defaultValue="addresses" className="space-y-6">
      <TabsList className="glass-card-strong rounded-2xl p-1 flex flex-wrap w-fit gap-1">
        <TabsTrigger value="addresses" className="rounded-full px-4 py-2 font-sans-elegant text-xs font-bold data-[state=active]:gradient-primary data-[state=active]:text-primary-foreground">
          <MapPin className="w-3.5 h-3.5 mr-1.5" /> Addresses
        </TabsTrigger>
        <TabsTrigger value="schedule" className="rounded-full px-4 py-2 font-sans-elegant text-xs font-bold data-[state=active]:gradient-primary data-[state=active]:text-primary-foreground">
          <Clock className="w-3.5 h-3.5 mr-1.5" /> Schedule
        </TabsTrigger>
        <TabsTrigger value="hotels" className="rounded-full px-4 py-2 font-sans-elegant text-xs font-bold data-[state=active]:gradient-primary data-[state=active]:text-primary-foreground">
          <Hotel className="w-3.5 h-3.5 mr-1.5" /> Hotels
        </TabsTrigger>
        <TabsTrigger value="transport" className="rounded-full px-4 py-2 font-sans-elegant text-xs font-bold data-[state=active]:gradient-primary data-[state=active]:text-primary-foreground">
          <Car className="w-3.5 h-3.5 mr-1.5" /> Transport
        </TabsTrigger>
      </TabsList>

      <TabsContent value="addresses" className="space-y-4">
        <div className="glass-card-strong rounded-3xl p-6 space-y-4">
          <h3 className="font-serif-display text-lg font-semibold text-foreground">⛪ Ceremony</h3>
          <SettingField label="Address" value={settings.ceremony_address || ''} onSave={v => saveSetting('ceremony_address', v)} />
          <SettingField label="Google Maps URL" value={settings.ceremony_maps_url || ''} onSave={v => saveSetting('ceremony_maps_url', v)} />
          <SettingField label="Time" value={settings.ceremony_time || ''} onSave={v => saveSetting('ceremony_time', v)} />
        </div>
        <div className="glass-card-strong rounded-3xl p-6 space-y-4">
          <h3 className="font-serif-display text-lg font-semibold text-foreground">🎉 Reception</h3>
          <SettingField label="Address" value={settings.reception_address || ''} onSave={v => saveSetting('reception_address', v)} />
          <SettingField label="Google Maps URL" value={settings.reception_maps_url || ''} onSave={v => saveSetting('reception_maps_url', v)} />
          <SettingField label="Time" value={settings.reception_time || ''} onSave={v => saveSetting('reception_time', v)} />
        </div>
        <div className="glass-card-strong rounded-3xl p-6 space-y-4">
          <h3 className="font-serif-display text-lg font-semibold text-foreground">🗺️ Map Embed</h3>
          <SettingField label="Google Maps Embed URL" value={settings.map_embed_url || ''} onSave={v => saveSetting('map_embed_url', v)} textarea />
        </div>
      </TabsContent>

      <TabsContent value="schedule" className="space-y-4">
        <div className="flex justify-end">
          <button onClick={addScheduleItem} className="btn-primary flex items-center gap-2 !rounded-full !px-5">
            <Plus className="w-4 h-4" /> Add Event
          </button>
        </div>
        {schedule.map(item => (
          <motion.div key={item.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="glass-card-strong rounded-3xl p-5 flex flex-wrap gap-3 items-center">
            <Input value={item.time} onChange={e => updateScheduleItem(item.id, 'time', e.target.value)}
              className="w-24 rounded-xl h-9 glass-card border-border/30 font-sans-elegant text-sm" placeholder="Time" />
            <Input value={item.label} onChange={e => updateScheduleItem(item.id, 'label', e.target.value)}
              className="flex-1 min-w-[150px] rounded-xl h-9 glass-card border-border/30 font-sans-elegant text-sm" placeholder="Label (EN)" />
            <Input value={item.label_fr || ''} onChange={e => updateScheduleItem(item.id, 'label_fr', e.target.value)}
              className="flex-1 min-w-[150px] rounded-xl h-9 glass-card border-border/30 font-sans-elegant text-sm" placeholder="Label (FR)" />
            <Input value={item.icon} onChange={e => updateScheduleItem(item.id, 'icon', e.target.value)}
              className="w-28 rounded-xl h-9 glass-card border-border/30 font-sans-elegant text-sm" placeholder="Icon" />
            <button onClick={() => deleteScheduleItem(item.id)}
              className="w-9 h-9 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 flex items-center justify-center">
              <Trash2 className="w-4 h-4 text-rose-500" />
            </button>
          </motion.div>
        ))}
      </TabsContent>

      <TabsContent value="hotels" className="space-y-4">
        <div className="flex justify-end">
          <button onClick={addHotel} className="btn-primary flex items-center gap-2 !rounded-full !px-5">
            <Plus className="w-4 h-4" /> Add Hotel
          </button>
        </div>
        {hotels.map(hotel => (
          <motion.div key={hotel.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="glass-card-strong rounded-3xl p-5 space-y-3">
            <div className="flex gap-3 flex-wrap">
              <Input value={hotel.name} onChange={e => updateHotel(hotel.id, 'name', e.target.value)}
                className="flex-1 min-w-[150px] rounded-xl h-9 glass-card border-border/30 font-sans-elegant text-sm" placeholder="Name" />
              <Input type="number" value={hotel.stars} onChange={e => updateHotel(hotel.id, 'stars', parseInt(e.target.value) || 3)}
                className="w-20 rounded-xl h-9 glass-card border-border/30 font-sans-elegant text-sm" placeholder="Stars" />
              <Input value={hotel.distance} onChange={e => updateHotel(hotel.id, 'distance', e.target.value)}
                className="w-28 rounded-xl h-9 glass-card border-border/30 font-sans-elegant text-sm" placeholder="Distance" />
              <Input value={hotel.price} onChange={e => updateHotel(hotel.id, 'price', e.target.value)}
                className="w-20 rounded-xl h-9 glass-card border-border/30 font-sans-elegant text-sm" placeholder="Price" />
            </div>
            <div className="flex gap-3">
              <Input value={hotel.url} onChange={e => updateHotel(hotel.id, 'url', e.target.value)}
                className="flex-1 rounded-xl h-9 glass-card border-border/30 font-sans-elegant text-sm" placeholder="Booking URL" />
              <Input value={hotel.description} onChange={e => updateHotel(hotel.id, 'description', e.target.value)}
                className="flex-1 rounded-xl h-9 glass-card border-border/30 font-sans-elegant text-sm" placeholder="Description" />
              <button onClick={() => deleteHotel(hotel.id)}
                className="w-9 h-9 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 flex items-center justify-center flex-shrink-0">
                <Trash2 className="w-4 h-4 text-rose-500" />
              </button>
            </div>
          </motion.div>
        ))}
      </TabsContent>

      <TabsContent value="transport" className="space-y-4">
        {transport.map(item => (
          <motion.div key={item.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="glass-card-strong rounded-3xl p-5 space-y-3">
            <p className="font-sans-elegant text-xs font-bold text-foreground uppercase tracking-wide">
              {item.type === 'car' ? '🚗 By Car' : item.type === 'transit' ? '🚆 By Transit' : '🅿️ Parking'}
            </p>
            <Textarea value={item.description} onChange={e => updateTransport(item.id, 'description', e.target.value)}
              className="rounded-xl glass-card border-border/30 font-sans-elegant text-sm min-h-[60px]" placeholder="Description (EN)" />
            <Textarea value={item.description_fr || ''} onChange={e => updateTransport(item.id, 'description_fr', e.target.value)}
              className="rounded-xl glass-card border-border/30 font-sans-elegant text-sm min-h-[60px]" placeholder="Description (FR)" />
            <Textarea value={item.description_es || ''} onChange={e => updateTransport(item.id, 'description_es', e.target.value)}
              className="rounded-xl glass-card border-border/30 font-sans-elegant text-sm min-h-[60px]" placeholder="Description (ES)" />
          </motion.div>
        ))}
      </TabsContent>
    </Tabs>
  );
};

const SettingField = ({ label, value, onSave, textarea }: {
  label: string; value: string; onSave: (v: string) => void; textarea?: boolean;
}) => {
  const [val, setVal] = useState(value);
  const [dirty, setDirty] = useState(false);

  useEffect(() => { setVal(value); setDirty(false); }, [value]);

  const Component = textarea ? Textarea : Input;
  return (
    <div>
      <label className="font-sans-elegant text-xs font-medium text-muted-foreground mb-1 block">{label}</label>
      <div className="flex gap-2">
        <Component value={val} onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => { setVal(e.target.value); setDirty(true); }}
          className={`flex-1 rounded-xl ${textarea ? '' : 'h-9'} glass-card border-border/30 font-sans-elegant text-sm`} />
        {dirty && (
          <button onClick={() => { onSave(val); setDirty(false); }}
            className="btn-primary !rounded-xl !px-4 !py-1.5 text-xs">
            <Save className="w-3 h-3" /> Save
          </button>
        )}
      </div>
    </div>
  );
};

export default VenueManager;
