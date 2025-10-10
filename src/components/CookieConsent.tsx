import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";
import { Link } from "react-router-dom";

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem("cookieConsent", "all");
    setShowBanner(false);
  };

  const handleRejectAll = () => {
    localStorage.setItem("cookieConsent", "necessary");
    setShowBanner(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem("cookieConsent", "custom");
    setShowBanner(false);
    setShowPreferences(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-fade-in">
      <Card className="max-w-4xl mx-auto p-6 shadow-elegant bg-background border-2">
        <button
          onClick={handleRejectAll}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {!showPreferences ? (
          <>
            <h3 className="text-xl font-bold mb-3">We value your privacy</h3>
            <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
              We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. By clicking "Accept All", you consent to our use of cookies. You can manage your preferences or learn more in our{" "}
              <Link to="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </Link>
              .
            </p>
            <p className="text-xs text-muted-foreground mb-4">
              <strong>GDPR & CCPA Compliant:</strong> You have the right to withdraw consent at any time. California residents can opt out of the sale of personal information.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button onClick={handleRejectAll} variant="outline" size="sm">
                Reject All
              </Button>
              <Button onClick={() => setShowPreferences(true)} variant="outline" size="sm">
                Preferences
              </Button>
              <Button onClick={handleAcceptAll} variant="default" size="sm">
                Accept All
              </Button>
            </div>
          </>
        ) : (
          <>
            <h3 className="text-xl font-bold mb-4">Cookie Preferences</h3>
            <div className="space-y-4 mb-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold">Necessary Cookies</p>
                  <p className="text-sm text-muted-foreground">Required for basic site functionality</p>
                </div>
                <span className="text-sm text-muted-foreground">Always Active</span>
              </div>
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold">Analytics Cookies</p>
                  <p className="text-sm text-muted-foreground">Help us understand how you use our site</p>
                </div>
                <input type="checkbox" defaultChecked className="mt-1" />
              </div>
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold">Marketing Cookies</p>
                  <p className="text-sm text-muted-foreground">Used to deliver personalized content</p>
                </div>
                <input type="checkbox" defaultChecked className="mt-1" />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button onClick={() => setShowPreferences(false)} variant="outline" size="sm">
                Back
              </Button>
              <Button onClick={handleSavePreferences} variant="default" size="sm">
                Save Preferences
              </Button>
            </div>
          </>
        )}
      </Card>
    </div>
  );
};

export default CookieConsent;
