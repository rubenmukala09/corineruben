import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Video, Save, Loader2, ExternalLink, Copy, Check } from 'lucide-react';
import { toast } from 'sonner';

const LivestreamManager = () => {
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      const { data } = await supabase.from('site_settings').select('*').in('key', ['livestream_url', 'livestream_active', 'livestream_title']);
      if (data) {
        data.forEach((s: { key: string; value: string }) => {
          if (s.key === 'livestream_url') setUrl(s.value);
          if (s.key === 'livestream_title') setTitle(s.value);
          if (s.key === 'livestream_active') setActive(s.value === 'true');
        });
      }
      setLoading(false);
    };
    fetchSettings();
  }, []);

  const upsertSetting = async (key: string, value: string) => {
    const { data: existing } = await supabase.from('site_settings').select('id').eq('key', key).maybeSingle();
    if (existing) {
      await supabase.from('site_settings').update({ value }).eq('key', key);
    } else {
      await supabase.from('site_settings').insert({ key, value });
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await Promise.all([
        upsertSetting('livestream_url', url.trim()),
        upsertSetting('livestream_title', title.trim()),
        upsertSetting('livestream_active', active ? 'true' : 'false'),
      ]);
      toast.success('Live stream settings saved!');
    } catch {
      toast.error('Failed to save settings');
    }
    setSaving(false);
  };

  const handleToggle = async (checked: boolean) => {
    setActive(checked);
    await upsertSetting('livestream_active', checked ? 'true' : 'false');
    toast.success(checked ? 'Live stream is now LIVE! 🔴' : 'Live stream deactivated');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.origin);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Status Card */}
      <div className={`glass-card-strong rounded-3xl p-8 relative overflow-hidden border-2 transition-colors duration-300 ${active ? 'border-red-500/30' : 'border-border/20'}`}>
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-gradient-to-br from-red-500/10 to-rose-500/5 blur-2xl pointer-events-none" />
        
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${active ? 'bg-red-500/20' : 'bg-muted/50'}`}>
              <Video className={`w-6 h-6 ${active ? 'text-red-500' : 'text-muted-foreground'}`} />
            </div>
            <div>
              <h3 className="font-serif-display text-xl font-semibold text-foreground">Live Stream</h3>
              <div className="flex items-center gap-2">
                {active && (
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-red-500/15 text-red-500 text-xs font-bold">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    LIVE
                  </span>
                )}
                <span className="font-sans-elegant text-xs text-muted-foreground">
                  {active ? 'Visible on landing page' : 'Currently hidden'}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Label htmlFor="live-toggle" className="text-sm font-medium text-muted-foreground">
              {active ? 'On' : 'Off'}
            </Label>
            <Switch id="live-toggle" checked={active} onCheckedChange={handleToggle} />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label className="font-sans-elegant text-xs font-bold text-foreground mb-2 block">
              Stream Title (optional)
            </Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Watch Our Wedding Live!"
              className="rounded-xl"
            />
          </div>

          <div>
            <Label className="font-sans-elegant text-xs font-bold text-foreground mb-2 block">
              Stream URL
            </Label>
            <Input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://youtube.com/watch?v=... or any live stream URL"
              className="rounded-xl"
            />
            <p className="font-sans-elegant text-[11px] text-muted-foreground mt-1.5">
              Supports YouTube, Facebook Live, or any URL. YouTube/Facebook will auto-embed; others show a "Watch Live" button.
            </p>
          </div>

          <div className="flex gap-3 pt-2">
            <button onClick={handleSave} disabled={saving} className="btn-primary rounded-full px-6 py-2.5 text-sm flex items-center gap-2">
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save Settings
            </button>
            {url && (
              <a href={url} target="_blank" rel="noopener noreferrer" className="btn-outline rounded-full px-4 py-2.5 text-sm flex items-center gap-2">
                <ExternalLink className="w-4 h-4" />
                Preview
              </a>
            )}
            <button onClick={handleCopyLink} className="btn-outline rounded-full px-4 py-2.5 text-sm flex items-center gap-2">
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied!' : 'Copy Site Link'}
            </button>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="glass-card rounded-3xl p-6">
        <h4 className="font-serif-display text-base font-semibold text-foreground mb-3">How it works</h4>
        <ul className="space-y-2 font-sans-elegant text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold">1.</span>
            Paste your YouTube, Facebook, or Instagram Live stream URL above
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold">2.</span>
            Toggle the switch to make it live — it will appear on the landing page immediately
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold">3.</span>
            Guests can watch embedded (YouTube/Facebook) or click through to the stream
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold">4.</span>
            A share button lets guests copy the link to share with others
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LivestreamManager;
