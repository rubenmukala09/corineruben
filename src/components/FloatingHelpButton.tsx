import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MessageCircle, X, Phone, Mail, Calendar, Shield } from "lucide-react";
import { Link } from "react-router-dom";

interface FloatingHelpButtonProps {
  onScamShieldClick?: () => void;
}

export function FloatingHelpButton({ onScamShieldClick }: FloatingHelpButtonProps = {}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating button */}
      <Button
        size="lg"
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-40 animate-pulse hover:animate-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </Button>

      {/* Help menu */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-80 p-4 shadow-xl z-40 animate-in slide-in-from-bottom-2">
          <h3 className="text-lg font-bold text-foreground mb-4">How can we help?</h3>
          <div className="space-y-2">
            <Link to="/contact" onClick={() => setIsOpen(false)}>
              <Button variant="outline" className="w-full justify-start">
                <Mail className="h-4 w-4 mr-2" />
                Send us a message
              </Button>
            </Link>
            <a href="tel:937-555-0199">
              <Button variant="outline" className="w-full justify-start">
                <Phone className="h-4 w-4 mr-2" />
                Call us: (937) 555-0199
              </Button>
            </a>
            <Link to="/contact#schedule" onClick={() => setIsOpen(false)}>
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule a call
              </Button>
            </Link>
            <Link to="/faq" onClick={() => setIsOpen(false)}>
              <Button variant="outline" className="w-full justify-start">
                <MessageCircle className="h-4 w-4 mr-2" />
                Browse FAQ
              </Button>
            </Link>
            {onScamShieldClick && (
              <Button
                onClick={() => {
                  setIsOpen(false);
                  onScamShieldClick();
                }}
                variant="outline"
                className="w-full justify-start bg-destructive/10 hover:bg-destructive/20 text-destructive border-destructive/20"
              >
                <Shield className="h-4 w-4 mr-2" />
                Report Scam
              </Button>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-4 text-center">
            Typical response: 4 hours
          </p>
        </Card>
      )}
    </>
  );
}
