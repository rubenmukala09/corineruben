import { useState, useEffect } from "react";
import { X, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
}

const COOKIE_CONSENT_KEY = "invision-cookie-consent";
const COOKIE_PREFERENCES_KEY = "invision-cookie-preferences";

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      setShowBanner(true);
    } else {
      const saved = localStorage.getItem(COOKIE_PREFERENCES_KEY);
      if (saved) {
        const prefs = JSON.parse(saved);
        setPreferences(prefs);
        applyPreferences(prefs);
      }
    }
  }, []);

  const acceptAll = () => {
    const allPreferences = {
      essential: true,
      analytics: true,
      marketing: true,
    };
    savePreferences(allPreferences);
    setShowBanner(false);
  };

  const acceptEssential = () => {
    const essentialOnly = {
      essential: true,
      analytics: false,
      marketing: false,
    };
    savePreferences(essentialOnly);
    setShowBanner(false);
  };

  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "true");
    localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(prefs));
    setPreferences(prefs);
    applyPreferences(prefs);
  };

  const applyPreferences = (prefs: CookiePreferences) => {
    // Enable/disable analytics tracking
    if (prefs.analytics) {
      // Enable Google Analytics if configured
      if (window.gtag) {
        window.gtag("consent", "update", {
          analytics_storage: "granted",
        });
      }
    } else {
      if (window.gtag) {
        window.gtag("consent", "update", {
          analytics_storage: "denied",
        });
      }
    }

    // Enable/disable marketing cookies
    if (prefs.marketing) {
      if (window.gtag) {
        window.gtag("consent", "update", {
          ad_storage: "granted",
          ad_user_data: "granted",
          ad_personalization: "granted",
        });
      }
    } else {
      if (window.gtag) {
        window.gtag("consent", "update", {
          ad_storage: "denied",
          ad_user_data: "denied",
          ad_personalization: "denied",
        });
      }
    }
  };

  const handleSaveSettings = () => {
    savePreferences(preferences);
    setShowSettings(false);
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 animate-slide-up">
        <Card className="max-w-4xl mx-auto p-4 sm:p-6 shadow-2xl border-2 border-border">
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-bold mb-2">🍪 We Value Your Privacy</h3>
              <p className="text-sm text-muted-foreground mb-4">
                We use cookies to improve your experience, analyze site traffic, and provide
                personalized content. You can customize your preferences or accept all cookies.
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button onClick={acceptAll} size="sm">
                  Accept All
                </Button>
                <Button onClick={acceptEssential} variant="outline" size="sm">
                  Essential Only
                </Button>
                <Button
                  onClick={() => setShowSettings(true)}
                  variant="ghost"
                  size="sm"
                  className="gap-2"
                >
                  <Settings className="w-4 h-4" />
                  Customize
                </Button>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={acceptEssential}
              className="self-start"
              aria-label="Close cookie banner"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      </div>

      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Cookie Preferences</DialogTitle>
            <DialogDescription>
              Manage your cookie preferences. Essential cookies are required for the site to
              function and cannot be disabled.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="flex items-center justify-between space-x-2">
              <div className="flex-1">
                <Label htmlFor="essential" className="font-semibold">
                  Essential Cookies
                </Label>
                <p className="text-sm text-muted-foreground">
                  Required for the website to function. Cannot be disabled.
                </p>
              </div>
              <Switch id="essential" checked={true} disabled />
            </div>

            <div className="flex items-center justify-between space-x-2">
              <div className="flex-1">
                <Label htmlFor="analytics" className="font-semibold">
                  Analytics Cookies
                </Label>
                <p className="text-sm text-muted-foreground">
                  Help us understand how visitors use our website.
                </p>
              </div>
              <Switch
                id="analytics"
                checked={preferences.analytics}
                onCheckedChange={(checked) =>
                  setPreferences({ ...preferences, analytics: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between space-x-2">
              <div className="flex-1">
                <Label htmlFor="marketing" className="font-semibold">
                  Marketing Cookies
                </Label>
                <p className="text-sm text-muted-foreground">
                  Used to deliver personalized advertisements.
                </p>
              </div>
              <Switch
                id="marketing"
                checked={preferences.marketing}
                onCheckedChange={(checked) =>
                  setPreferences({ ...preferences, marketing: checked })
                }
              />
            </div>
          </div>

          <DialogFooter>
            <Button onClick={handleSaveSettings}>Save Preferences</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

// Type definitions for gtag
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}
