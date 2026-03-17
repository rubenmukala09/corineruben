import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Save, RefreshCw } from "lucide-react";

type DayHours = { open: string; close: string; closed: boolean };
type BusinessHours = Record<string, DayHours>;

interface Settings {
  siteName: string;
  tagline: string;
  description: string;
  phone: string;
  primaryEmail: string;
  supportEmail: string;
  businessEmail: string;
  trainingEmail: string;
  address: string;
  serviceArea: string;
  timezone: string;
  facebook: string;
  linkedin: string;
  instagram: string;
  twitter: string;
  youtube: string;
}

const DEFAULTS: Settings = {
  siteName: "InVision Network",
  tagline: "AI Scam Protection & Business Solutions",
  description:
    "Empowering seniors and businesses with cutting-edge technology solutions and cybersecurity protection.",
  phone: "(407) 446-5749",
  primaryEmail: "hello@invisionnetwork.org",
  supportEmail: "support@invisionnetwork.org",
  businessEmail: "consulting@invisionnetwork.org",
  trainingEmail: "training@invisionnetwork.org",
  address: "Kettering, OH 45429",
  serviceArea: "Serving Dayton, Kettering & Greater Miami Valley",
  timezone: "America/New_York",
  facebook: "",
  linkedin: "",
  instagram: "",
  twitter: "",
  youtube: "",
};

const DEFAULT_HOURS: BusinessHours = {
  monday: { open: "09:00", close: "18:00", closed: false },
  tuesday: { open: "09:00", close: "18:00", closed: false },
  wednesday: { open: "09:00", close: "18:00", closed: false },
  thursday: { open: "09:00", close: "18:00", closed: false },
  friday: { open: "09:00", close: "18:00", closed: false },
  saturday: { open: "10:00", close: "15:00", closed: false },
  sunday: { open: "", close: "", closed: true },
};

// Map Settings keys to DB keys
const FIELD_MAP: Record<keyof Settings, string> = {
  siteName: "site_name",
  tagline: "tagline",
  description: "description",
  phone: "phone",
  primaryEmail: "primary_email",
  supportEmail: "support_email",
  businessEmail: "business_email",
  trainingEmail: "training_email",
  address: "address",
  serviceArea: "service_area",
  timezone: "timezone",
  facebook: "facebook",
  linkedin: "linkedin",
  instagram: "instagram",
  twitter: "twitter",
  youtube: "youtube",
};

const SiteSettings = () => {
  const queryClient = useQueryClient();
  const [settings, setSettings] = useState<Settings>(DEFAULTS);
  const [businessHours, setBusinessHours] =
    useState<BusinessHours>(DEFAULT_HOURS);

  // Load from DB
  const { isLoading } = useQuery({
    queryKey: ["site-settings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("key, value");
      if (error) throw error;
      return data as { key: string; value: string | null }[];
    },
    onSuccess: (rows) => {
      const map: Record<string, string> = {};
      rows.forEach((r) => {
        if (r.value !== null) map[r.key] = r.value;
      });

      const merged: Settings = { ...DEFAULTS };
      (Object.keys(FIELD_MAP) as (keyof Settings)[]).forEach((k) => {
        const dbKey = FIELD_MAP[k];
        if (map[dbKey] !== undefined) merged[k] = map[dbKey];
      });
      setSettings(merged);

      if (map["business_hours"]) {
        try {
          setBusinessHours(JSON.parse(map["business_hours"]));
        } catch {
          // keep defaults
        }
      }
    },
  } as any);

  const saveMutation = useMutation({
    mutationFn: async () => {
      const rows = (Object.keys(FIELD_MAP) as (keyof Settings)[]).map((k) => ({
        key: FIELD_MAP[k],
        value: settings[k],
        group_name: ["facebook", "linkedin", "instagram", "twitter", "youtube"].includes(FIELD_MAP[k])
          ? "social"
          : ["phone", "primary_email", "support_email", "business_email", "training_email", "address", "service_area"].includes(FIELD_MAP[k])
          ? "contact"
          : "general",
        updated_at: new Date().toISOString(),
      }));

      rows.push({
        key: "business_hours",
        value: JSON.stringify(businessHours),
        group_name: "general",
        updated_at: new Date().toISOString(),
      });

      const { error } = await supabase
        .from("site_settings")
        .upsert(rows, { onConflict: "key" });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["site-settings"] });
      toast.success("Settings saved successfully!");
    },
    onError: (e: any) => toast.error(e.message ?? "Failed to save settings"),
  });

  const set = (field: keyof Settings, value: string) =>
    setSettings((s) => ({ ...s, [field]: value }));

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 p-8 text-[#9CA3AF]">
        <RefreshCw className="h-4 w-4 animate-spin" />
        Loading settings…
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* General Information */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">General Information</h3>
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="siteName">Site Name</Label>
            <Input
              id="siteName"
              value={settings.siteName}
              onChange={(e) => set("siteName", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tagline">Tagline</Label>
            <Input
              id="tagline"
              value={settings.tagline}
              onChange={(e) => set("tagline", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Site Description</Label>
            <Textarea
              id="description"
              value={settings.description}
              onChange={(e) => set("description", e.target.value)}
              maxLength={160}
              rows={3}
            />
            <p className="text-xs text-muted-foreground">
              {settings.description.length}/160 characters
            </p>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Contact Information</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              value={settings.phone}
              onChange={(e) => set("phone", e.target.value)}
              placeholder="(XXX) XXX-XXXX"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              value={settings.address}
              onChange={(e) => set("address", e.target.value)}
              placeholder="City, State ZIP"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="primaryEmail">Primary Email</Label>
            <Input
              id="primaryEmail"
              type="email"
              value={settings.primaryEmail}
              onChange={(e) => set("primaryEmail", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="supportEmail">Support Email</Label>
            <Input
              id="supportEmail"
              type="email"
              value={settings.supportEmail}
              onChange={(e) => set("supportEmail", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="businessEmail">Business Email</Label>
            <Input
              id="businessEmail"
              type="email"
              value={settings.businessEmail}
              onChange={(e) => set("businessEmail", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="trainingEmail">Training Email</Label>
            <Input
              id="trainingEmail"
              type="email"
              value={settings.trainingEmail}
              onChange={(e) => set("trainingEmail", e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Service Area */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Service Area</h3>
        <div className="space-y-2">
          <Label htmlFor="serviceArea">Service Area Description</Label>
          <Input
            id="serviceArea"
            value={settings.serviceArea}
            onChange={(e) => set("serviceArea", e.target.value)}
          />
        </div>
      </div>

      {/* Business Hours */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Business Hours</h3>
        <div className="space-y-3">
          {Object.entries(businessHours).map(([day, hours]) => (
            <div key={day} className="flex items-center gap-4">
              <div className="w-28 font-medium capitalize">{day}</div>
              <div className="flex items-center gap-2 flex-1">
                {!hours.closed ? (
                  <>
                    <Input
                      type="time"
                      value={hours.open}
                      onChange={(e) =>
                        setBusinessHours({
                          ...businessHours,
                          [day]: { ...hours, open: e.target.value },
                        })
                      }
                      className="w-32"
                    />
                    <span>to</span>
                    <Input
                      type="time"
                      value={hours.close}
                      onChange={(e) =>
                        setBusinessHours({
                          ...businessHours,
                          [day]: { ...hours, close: e.target.value },
                        })
                      }
                      className="w-32"
                    />
                  </>
                ) : (
                  <span className="text-muted-foreground">Closed</span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={!hours.closed}
                  onCheckedChange={(checked) =>
                    setBusinessHours({
                      ...businessHours,
                      [day]: { ...hours, closed: !checked },
                    })
                  }
                />
                <Label className="text-sm">Open</Label>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Social Media */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Social Media</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {(
            [
              ["facebook", "Facebook", "https://facebook.com/…"],
              ["linkedin", "LinkedIn", "https://linkedin.com/company/…"],
              ["instagram", "Instagram", "https://instagram.com/…"],
              ["twitter", "Twitter/X", "https://twitter.com/…"],
              ["youtube", "YouTube", "https://youtube.com/@…"],
            ] as [keyof Settings, string, string][]
          ).map(([field, label, placeholder]) => (
            <div key={field} className="space-y-2">
              <Label htmlFor={field}>{label}</Label>
              <Input
                id={field}
                value={settings[field]}
                onChange={(e) => set(field, e.target.value)}
                placeholder={placeholder}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end pt-6">
        <Button
          onClick={() => saveMutation.mutate()}
          disabled={saveMutation.isPending}
          size="lg"
        >
          {saveMutation.isPending ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Saving…
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default SiteSettings;
