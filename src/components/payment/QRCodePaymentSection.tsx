import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Smartphone,
  QrCode,
  Loader2,
  CheckCircle,
  RefreshCw,
  Clock,
  Sparkles,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import confetti from "canvas-confetti";

interface QRCodePaymentSectionProps {
  amount: number; // in cents
  productName: string;
  customerEmail: string;
  customerName: string;
  onSuccess: () => void;
  onBack?: () => void;
}

export function QRCodePaymentSection({
  amount,
  productName,
  customerEmail,
  customerName,
  onSuccess,
  onBack,
}: QRCodePaymentSectionProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [qrImageUrl, setQrImageUrl] = useState<string | null>(null);
  const [paymentLinkId, setPaymentLinkId] = useState<string | null>(null);
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(240); // 4 minutes
  const [isPaid, setIsPaid] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Generate QR code
  const generateQRCode = useCallback(async () => {
    setIsGenerating(true);
    setError(null);
    setQrImageUrl(null);
    setPaymentLinkId(null);
    setCountdown(240);

    try {
      const { data, error: fnError } = await supabase.functions.invoke(
        "generate-payment-link",
        {
          body: {
            amount,
            items: [{ name: productName, price: amount / 100, quantity: 1 }],
            customerEmail,
            customerName,
          },
        }
      );

      if (fnError) throw fnError;
      if (data.error) throw new Error(data.error);

      const { paymentLinkId: linkId, url } = data;
      setPaymentLinkId(linkId);
      setPaymentUrl(url);

      // Generate QR code image
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}`;
      setQrImageUrl(qrUrl);

      toast.success("QR code generated! Scan to pay.");
    } catch (err: any) {
      console.error("Error generating QR code:", err);
      setError(err.message || "Failed to generate QR code");
      toast.error("Failed to generate QR code");
    } finally {
      setIsGenerating(false);
    }
  }, [amount, productName, customerEmail, customerName]);

  // Countdown timer
  useEffect(() => {
    if (!qrImageUrl || isPaid) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setQrImageUrl(null);
          setPaymentLinkId(null);
          toast.info("QR code expired. Generate a new one.");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [qrImageUrl, isPaid]);

  // Poll for payment status
  useEffect(() => {
    if (!paymentLinkId || isPaid) return;

    const pollInterval = setInterval(async () => {
      try {
        const { data, error: fnError } = await supabase.functions.invoke(
          "verify-payment-link",
          {
            body: { paymentLinkId },
          }
        );

        if (fnError) {
          console.error("Polling error:", fnError);
          return;
        }

        if (data?.paid) {
          setIsPaid(true);
          clearInterval(pollInterval);
          
          // Celebrate!
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
          });
          
          toast.success("Payment received!");
          onSuccess();
        }
      } catch (err) {
        console.error("Payment verification error:", err);
      }
    }, 4000);

    return () => clearInterval(pollInterval);
  }, [paymentLinkId, isPaid, onSuccess]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (isPaid) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-6"
      >
        <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-success" />
        </div>
        <h3 className="text-xl font-bold mb-2">Payment Confirmed!</h3>
        <p className="text-sm text-muted-foreground">
          Your mobile payment was successful
        </p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Instructions */}
      <div className="text-center">
        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
          <Smartphone className="w-6 h-6 text-primary" />
        </div>
        <h3 className="font-semibold mb-1">Pay with your phone</h3>
        <p className="text-sm text-muted-foreground">
          Scan the QR code with your camera to complete payment
        </p>
      </div>

      {/* QR Code Display */}
      {qrImageUrl ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="relative bg-white p-4 rounded-xl border-2 border-primary/20">
            <img
              src={qrImageUrl}
              alt="Payment QR Code"
              className="w-48 h-48"
            />
            {/* Countdown overlay */}
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
              <Badge
                variant={countdown < 60 ? "destructive" : "secondary"}
                className="flex items-center gap-1"
              >
                <Clock className="w-3 h-3" />
                {formatTime(countdown)}
              </Badge>
            </div>
          </div>

          {/* Status indicator */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            Waiting for payment...
          </div>

          {/* Direct link option */}
          {paymentUrl && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.open(paymentUrl, "_blank")}
              className="text-xs"
            >
              Or click here to pay in browser
            </Button>
          )}

          {/* Regenerate button */}
          <Button
            variant="outline"
            size="sm"
            onClick={generateQRCode}
            disabled={isGenerating}
            className="text-xs"
          >
            <RefreshCw className={`w-3 h-3 mr-1 ${isGenerating ? "animate-spin" : ""}`} />
            Generate new code
          </Button>
        </motion.div>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <div className="w-48 h-48 bg-muted/50 rounded-xl border-2 border-dashed border-muted-foreground/30 flex items-center justify-center">
            <QrCode className="w-16 h-16 text-muted-foreground/40" />
          </div>

          <Button
            onClick={generateQRCode}
            disabled={isGenerating}
            className="w-full max-w-xs"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Generate QR Code
              </>
            )}
          </Button>
        </div>
      )}

      {error && (
        <div className="p-3 bg-destructive/10 text-destructive rounded-lg text-sm text-center">
          {error}
        </div>
      )}

      {/* Amount reminder */}
      <div className="text-center pt-2 border-t">
        <p className="text-sm text-muted-foreground">
          Amount: <span className="font-semibold text-foreground">${(amount / 100).toFixed(2)}</span>
        </p>
      </div>
    </div>
  );
}
