import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { GuestScanUpload } from "@/components/scanner/GuestScanUpload";
import { PaymentDialog } from "@/components/scanner/PaymentDialog";
import { ScanResults } from "@/components/scanner/ScanResults";
import { useGuestScanner } from "@/hooks/useGuestScanner";
import { calculateScanCost, GUEST_SCAN_PRICING } from "@/lib/guestScannerUtils";
import { Loader2, ShieldCheck, Sparkles, Upload } from "lucide-react";

export const GuestScannerSection = () => {
  const [paymentOpen, setPaymentOpen] = useState(false);

  const {
    file,
    cost,
    analysis,
    status,
    error,
    progress,
    expiresAt,
    prepareFile,
    clearFile,
    startScan,
    restartScan,
    markExpired,
  } = useGuestScanner();

  const isProcessing = status === "uploading" || status === "analyzing";
  const canPay = file && status === "ready";

  const handlePaymentSuccess = (payload: { scanId: string; filePath: string; paymentIntentId: string }) => {
    setPaymentOpen(false);
    startScan({ scanId: payload.scanId, filePath: payload.filePath });
  };

  return (
    <>
      <section id="guest-scanner" className="py-12 relative overflow-hidden premium-section-bg premium-grid-dots">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5 pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-8">
            <div className="premium-3d-card premium-shadow-depth premium-glass-refraction inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light micro-bounce mb-4">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-foreground">Quick File Scanner · No Login Required</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Scan a File for Threats Instantly
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Upload a file, pay securely with Stripe, and get instant AI analysis. Files are deleted within 10 minutes.
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid gap-6 lg:grid-cols-[1.5fr_1fr]">
            <GuestScanUpload file={file} onFileSelect={prepareFile} onClear={clearFile} />

            <Card className="premium-3d-card premium-shadow-depth premium-shine-sweep p-6 glass-light shadow-3d-lg border border-border/60">
              <h3 className="text-lg font-semibold text-foreground mb-2">Pricing</h3>
              <p className="text-sm text-muted-foreground mb-4">
                ${GUEST_SCAN_PRICING.ratePerMb.toFixed(2)} per MB · minimum ${GUEST_SCAN_PRICING.minimumCharge.toFixed(2)}
              </p>

              {file ? (
                <div className="space-y-3">
                  <div className="text-sm text-muted-foreground">
                    File size: {calculateScanCost(file.size).sizeMb.toFixed(2)} MB
                  </div>
                  <div className="text-3xl font-bold text-foreground">
                    {calculateScanCost(file.size).formatted}
                  </div>
                  <Button
                    size="lg"
                    className="w-full"
                    onClick={() => setPaymentOpen(true)}
                    disabled={!canPay || isProcessing}
                  >
                    {isProcessing ? "Processing..." : "Proceed to Secure Payment"}
                  </Button>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">Select a file to see your exact cost.</p>
              )}
            </Card>
          </div>

          {isProcessing && (
            <Card className="premium-3d-card premium-shadow-depth max-w-4xl mx-auto mt-6 p-6 glass-light">
              <div className="flex items-center gap-3 mb-4">
                <Loader2 className="w-5 h-5 text-primary animate-spin" />
                <div>
                  <p className="font-semibold text-foreground">Analyzing your file...</p>
                  <p className="text-sm text-muted-foreground">This usually takes less than 60 seconds.</p>
                </div>
              </div>
              <Progress value={progress} className="h-2" />
            </Card>
          )}

          {error && (
            <Card className="premium-3d-card premium-shadow-depth max-w-4xl mx-auto mt-6 p-6 border border-destructive/30 bg-destructive/5 space-y-3">
              <p className="text-sm text-destructive">{error}</p>
              <Button variant="outline" onClick={restartScan} className="w-fit">Try again</Button>
            </Card>
          )}

          {analysis && file && status === "completed" && expiresAt && (
            <div className="max-w-4xl mx-auto mt-6">
              <ScanResults
                analysis={analysis}
                file={file}
                expiresAt={expiresAt}
                onExpired={markExpired}
                onRestart={restartScan}
              />
            </div>
          )}

          {status === "expired" && (
            <Card className="premium-3d-card premium-shadow-depth max-w-4xl mx-auto mt-6 p-6 border border-emerald-200 bg-emerald-50/60 text-emerald-700">
              Your data has been permanently deleted. We do not store your files or results.
            </Card>
          )}

          <div className="premium-3d-card premium-shadow-depth premium-glass-refraction max-w-4xl mx-auto mt-4 rounded-xl glass-light p-4 text-sm text-muted-foreground text-center">
            <ShieldCheck className="w-4 h-4 inline mr-1.5 text-primary" />
            Your file is analyzed and permanently deleted within 10 minutes. Guest scans are anonymous.
          </div>
        </div>
      </section>

      <PaymentDialog
        open={paymentOpen}
        onOpenChange={setPaymentOpen}
        file={file}
        amount={cost}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </>
  );
};

export default GuestScannerSection;
