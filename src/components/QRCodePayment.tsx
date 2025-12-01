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

  const generateQRCode = async (url: string) => {
    try {
      // Use a simple QR code generation approach
      const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}`;
      setQrCodeDataUrl(qrApiUrl);
    } catch (error) {
      console.error("QR generation error:", error);
    }
  };

  const handleGenerateQR = async () => {
    setLoading(true);
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
        toast.success("QR code generated! Scan to pay.");
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
      ) : (
        <Alert className="border-primary/50 bg-primary/5">
          <AlertDescription className="space-y-4">
            <div className="text-center">
              <p className="font-semibold mb-2">Scan to Pay ${amount.toFixed(2)}</p>
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
