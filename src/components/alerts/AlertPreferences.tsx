import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Bell, MessageSquare, Shield } from "lucide-react";
import { useState, useEffect } from "react";

export function AlertPreferences() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [prefs, setPrefs] = useState({
    sms_enabled: false,
    phone_number: "",
    email_alerts: true,
    push_alerts: false,
  });

  const { data: savedPrefs } = useQuery({
    queryKey: ["alert-prefs", user?.id],
    queryFn: async () => {
      const { data } = await supabase
        .from("user_alert_preferences")
        .select("*")
        .eq("user_id", user!.id)
        .maybeSingle();
      return data;
    },
    enabled: !!user,
  });

  useEffect(() => {
    if (savedPrefs) {
      setPrefs({
        sms_enabled: savedPrefs.sms_enabled || false,
        phone_number: savedPrefs.phone_number || "",
        email_alerts: savedPrefs.email_alerts ?? true,
        push_alerts: savedPrefs.push_alerts || false,
      });
    }
  }, [savedPrefs]);

  const saveMutation = useMutation({
    mutationFn: async () => {
      const payload = { ...prefs, user_id: user!.id };
      if (savedPrefs) {
        const { error } = await supabase.from("user_alert_preferences").update(payload).eq("user_id", user!.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("user_alert_preferences").insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast.success("Alert preferences saved!");
      queryClient.invalidateQueries({ queryKey: ["alert-prefs"] });
    },
    onError: () => toast.error("Failed to save preferences"),
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" /> Security Alert Preferences
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Bell className="h-5 w-5 text-primary" />
            <div>
              <Label>Email Alerts</Label>
              <p className="text-xs text-muted-foreground">Receive security alerts via email</p>
            </div>
          </div>
          <Switch checked={prefs.email_alerts} onCheckedChange={(v) => setPrefs({ ...prefs, email_alerts: v })} />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MessageSquare className="h-5 w-5 text-primary" />
            <div>
              <Label>SMS Alerts</Label>
              <p className="text-xs text-muted-foreground">Get instant SMS for critical threats</p>
            </div>
          </div>
          <Switch checked={prefs.sms_enabled} onCheckedChange={(v) => setPrefs({ ...prefs, sms_enabled: v })} />
        </div>

        {prefs.sms_enabled && (
          <div className="ml-8">
            <Label>Phone Number</Label>
            <Input
              type="tel"
              placeholder="+1 (555) 000-0000"
              value={prefs.phone_number}
              onChange={(e) => setPrefs({ ...prefs, phone_number: e.target.value })}
              className="mt-1"
            />
          </div>
        )}

        <Button onClick={() => saveMutation.mutate()} disabled={saveMutation.isPending} className="w-full">
          {saveMutation.isPending ? "Saving..." : "Save Preferences"}
        </Button>
      </CardContent>
    </Card>
  );
}
