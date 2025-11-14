import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";

const SiteSettings = () => {
  const [settings, setSettings] = useState({
    siteName: "InVision Network",
    tagline: "AI Scam Protection & Business Solutions",
    description: "Empowering seniors and businesses with cutting-edge technology solutions and cybersecurity protection.",
    phone: "(937) 555-0199",
    primaryEmail: "hello@invisionnetwork.org",
    supportEmail: "support@invisionnetwork.org",
    businessEmail: "consulting@invisionnetwork.org",
    trainingEmail: "training@invisionnetwork.org",
    serviceArea: "Serving Dayton, Kettering & Greater Miami Valley",
    timezone: "America/New_York",
    facebook: "",
    linkedin: "",
    instagram: "",
    twitter: "",
    youtube: "",
  });

  const [businessHours, setBusinessHours] = useState({
    monday: { open: "09:00", close: "18:00", closed: false },
    tuesday: { open: "09:00", close: "18:00", closed: false },
    wednesday: { open: "09:00", close: "18:00", closed: false },
    thursday: { open: "09:00", close: "18:00", closed: false },
    friday: { open: "09:00", close: "18:00", closed: false },
    saturday: { open: "10:00", close: "15:00", closed: false },
    sunday: { open: "", close: "", closed: true },
  });

  const handleSave = () => {
    toast.success("Settings saved successfully!");
  };

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
              onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tagline">Tagline</Label>
            <Input
              id="tagline"
              value={settings.tagline}
              onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Site Description</Label>
            <Textarea
              id="description"
              value={settings.description}
              onChange={(e) => setSettings({ ...settings, description: e.target.value })}
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
              onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
              placeholder="(XXX) XXX-XXXX"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="primaryEmail">Primary Email</Label>
            <Input
              id="primaryEmail"
              type="email"
              value={settings.primaryEmail}
              onChange={(e) => setSettings({ ...settings, primaryEmail: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="supportEmail">Support Email</Label>
            <Input
              id="supportEmail"
              type="email"
              value={settings.supportEmail}
              onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="businessEmail">Business Email</Label>
            <Input
              id="businessEmail"
              type="email"
              value={settings.businessEmail}
              onChange={(e) => setSettings({ ...settings, businessEmail: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="trainingEmail">Training Email</Label>
            <Input
              id="trainingEmail"
              type="email"
              value={settings.trainingEmail}
              onChange={(e) => setSettings({ ...settings, trainingEmail: e.target.value })}
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
            onChange={(e) => setSettings({ ...settings, serviceArea: e.target.value })}
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
          <div className="space-y-2">
            <Label htmlFor="facebook">Facebook</Label>
            <Input
              id="facebook"
              value={settings.facebook}
              onChange={(e) => setSettings({ ...settings, facebook: e.target.value })}
              placeholder="https://facebook.com/..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="linkedin">LinkedIn</Label>
            <Input
              id="linkedin"
              value={settings.linkedin}
              onChange={(e) => setSettings({ ...settings, linkedin: e.target.value })}
              placeholder="https://linkedin.com/company/..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="instagram">Instagram</Label>
            <Input
              id="instagram"
              value={settings.instagram}
              onChange={(e) => setSettings({ ...settings, instagram: e.target.value })}
              placeholder="https://instagram.com/..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="twitter">Twitter/X</Label>
            <Input
              id="twitter"
              value={settings.twitter}
              onChange={(e) => setSettings({ ...settings, twitter: e.target.value })}
              placeholder="https://twitter.com/..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="youtube">YouTube</Label>
            <Input
              id="youtube"
              value={settings.youtube}
              onChange={(e) => setSettings({ ...settings, youtube: e.target.value })}
              placeholder="https://youtube.com/@..."
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-6">
        <Button onClick={handleSave} size="lg">
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default SiteSettings;
