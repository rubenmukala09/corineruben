import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { QrCode, Loader2, ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface QRCodePaymentProps {
  amount: number;
  items?: Array<{ name: string; quantity: number; price: number }>;
  customerEmail?: string;
}

export function QRCodePayment({ amount, items, customerEmail }: QRCodePaymentProps) {
  const [loading, setLoading] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(240); // 4 minutes in seconds
  const [isExpired, setIsExpired] = useState(false);

  // Timer countdown effect
  useEffect(() => {
    if (paymentUrl && timeRemaining > 0 && !isExpired) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            setIsExpired(true);
            setPaymentUrl(null);
            setQrCodeDataUrl(null);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [paymentUrl, timeRemaining, isExpired]);

  const generateQRCode = async (url: string) => {
    try {
      // Use a simple QR code generation approach
      const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}`;
      setQrCodeDataUrl(qrApiUrl);
    } catch (error) {
      console.error("QR generation error:", error);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleGenerateQR = async () => {
    setLoading(true);
    setIsExpired(false);
    setTimeRemaining(240); // Reset to 4 minutes
    try {
      const { data, error } = await supabase.functions.invoke('generate-payment-link', {
        body: {
          amount: Math.round(amount * 100), // Convert to cents
          items,
          customerEmail,
        },
      });

      if (error) throw error;

      if (data?.url) {
        setPaymentUrl(data.url);
        await generateQRCode(data.url);
        toast.success("QR code generated! Scan within 4 minutes.");
      }
    } catch (error) {
      console.error("QR generation error:", error);
      toast.error("Failed to generate QR code. Please use card payment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {!paymentUrl ? (
        <Button
          type="button"
          variant="outline"
          onClick={handleGenerateQR}
          disabled={loading}
          className="w-full"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Generating QR Code...
            </>
          ) : (
            <>
              <QrCode className="w-4 h-4 mr-2" />
              Pay with QR Code (Mobile)
            </>
          )}
        </Button>
      ) : isExpired ? (
        <Alert className="border-destructive/50 bg-destructive/5">
          <AlertDescription className="text-center space-y-3">
            <p className="text-sm font-semibold text-destructive">QR Code Expired</p>
            <p className="text-xs text-muted-foreground">
              For security, QR codes expire after 4 minutes. Generate a new one to continue.
            </p>
            <Button
              type="button"
              variant="outline"
              onClick={handleGenerateQR}
              disabled={loading}
              className="w-full"
            >
              Generate New QR Code
            </Button>
          </AlertDescription>
        </Alert>
      ) : (
        <Alert className="border-primary/50 bg-primary/5">
          <AlertDescription className="space-y-4">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <p className="font-semibold">Scan to Pay ${amount.toFixed(2)}</p>
                <span className={`text-xs font-mono px-2 py-1 rounded ${
                  timeRemaining < 60 ? 'bg-destructive/20 text-destructive' : 'bg-muted'
                }`}>
                  {formatTime(timeRemaining)}
                </span>
              </div>
              {qrCodeDataUrl && (
                <div className="flex justify-center">
                  <img
                    src={qrCodeDataUrl}
                    alt="Payment QR Code"
                    className="border-4 border-background rounded-lg shadow-lg"
                  />
                </div>
              )}
              <p className="text-xs text-muted-foreground mt-3">
                📱 Open your phone camera and scan the QR code above
              </p>
              {timeRemaining < 60 && (
                <p className="text-xs text-destructive mt-2 font-semibold">
                  ⚠️ Expires soon! Generate new code if needed.
                </p>
              )}
            </div>
            <Button
              type="button"
              variant="link"
              size="sm"
              onClick={() => window.open(paymentUrl, '_blank')}
              className="w-full"
            >
              <ExternalLink className="w-3 h-3 mr-1" />
              Or open payment link in browser
            </Button>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
