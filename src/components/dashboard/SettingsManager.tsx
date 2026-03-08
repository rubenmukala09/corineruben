import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Save, Loader2, Settings } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';

const SettingsManager = () => {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from('site_settings').select('*');
      if (data) {
        const map: Record<string, string> = {};
        data.forEach((s: any) => { map[s.key] = s.value; });
        setSettings(map);
      }
      setLoading(false);
    };
    fetch();
  }, []);

  const saveSetting = async (key: string, value: string) => {
    setSaving(key);
    const { data } = await supabase.from('site_settings').select('id').eq('key', key).single();
    if (data) {
      await supabase.from('site_settings').update({ value }).eq('key', key);
    } else {
      await supabase.from('site_settings').insert({ key, value });
    }
    setSettings({ ...settings, [key]: value });
    setSaving(null);
  };

  if (loading) return <div className="flex justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>;

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="glass-card-strong rounded-3xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-violet-500/10 flex items-center justify-center">
            <Settings className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="font-serif-display text-xl font-semibold text-foreground">Wedding Settings</h3>
            <p className="font-sans-elegant text-xs text-muted-foreground">Control the names, date, and key details shown on the homepage</p>
          </div>
        </div>

        <div className="space-y-5">
          <SettingRow label="Partner 1 Name" settingKey="couple_name_1" value={settings.couple_name_1 || ''} onSave={saveSetting} saving={saving} />
          <SettingRow label="Partner 2 Name" settingKey="couple_name_2" value={settings.couple_name_2 || ''} onSave={saveSetting} saving={saving} />
          <SettingRow label="Wedding Date & Time" settingKey="wedding_date" value={settings.wedding_date || ''} onSave={saveSetting} saving={saving}
            hint="Format: 2027-08-15T14:00:00" />
        </div>
      </motion.div>
    </div>
  );
};

const SettingRow = ({ label, settingKey, value, onSave, saving, hint }: {
  label: string; settingKey: string; value: string; onSave: (key: string, value: string) => void;
  saving: string | null; hint?: string;
}) => {
  const [val, setVal] = useState(value);
  const [dirty, setDirty] = useState(false);

  useEffect(() => { setVal(value); setDirty(false); }, [value]);

  return (
    <div>
      <label className="font-sans-elegant text-sm font-medium text-foreground mb-1.5 block">{label}</label>
      {hint && <p className="font-sans-elegant text-[10px] text-muted-foreground mb-1.5">{hint}</p>}
      <div className="flex gap-2">
        <Input value={val} onChange={e => { setVal(e.target.value); setDirty(true); }}
          className="flex-1 rounded-2xl h-11 glass-card border-border/30 font-sans-elegant" />
        {dirty && (
          <button onClick={() => { onSave(settingKey, val); setDirty(false); }}
            disabled={saving === settingKey}
            className="btn-primary !rounded-2xl !px-5 disabled:opacity-50">
            {saving === settingKey ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save
          </button>
        )}
      </div>
    </div>
  );
};

export default SettingsManager;
