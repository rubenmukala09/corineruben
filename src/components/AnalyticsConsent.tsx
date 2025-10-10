import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const AnalyticsConsent = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const analyticsConsent = localStorage.getItem("analyticsConsent");
    const cookieConsent = localStorage.getItem("cookieConsent");
    
    // Show analytics banner only after cookie consent is given
    if (cookieConsent && !analyticsConsent) {
      // Delay showing analytics banner by 3 seconds after page load
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("analyticsConsent", "accepted");
    setShowBanner(false);
    // Initialize analytics here if needed
  };

  const handleDecline = () => {
    localStorage.setItem("analyticsConsent", "declined");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed top-24 right-4 z-50 animate-fade-in max-w-md">
      <Card className="p-4 shadow-elegant bg-background border">
        <button
          onClick={handleDecline}
          className="absolute top-2 right-2 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>
        <h4 className="font-bold mb-2 pr-6">Help us improve your experience</h4>
        <p className="text-sm text-muted-foreground mb-4">
          We use analytics to understand how you use our platform and improve your experience. Your data is anonymous and secure.
        </p>
        <div className="flex gap-2">
          <Button onClick={handleAccept} variant="default" size="sm">
            Accept
          </Button>
          <Button onClick={handleDecline} variant="outline" size="sm">
            Decline
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default AnalyticsConsent;
