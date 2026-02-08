import { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { PageTransition } from "@/components/PageTransition";
import { PaymentDialog } from "@/components/scanner/PaymentDialog";
import { ScanResults } from "@/components/scanner/ScanResults";
import { SmartCommandCenter } from "@/components/training/SmartCommandCenter";
import { PremiumChatHistory } from "@/components/training/PremiumChatHistory";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { usePrerenderReady } from "@/contexts/PrerenderContext";
import { useGuestScanner } from "@/hooks/useGuestScanner";
import { useAiChat } from "@/hooks/useAiChat";
import { SITE } from "@/config/site";
import { Bookmark, Code2, LayoutGrid, Loader2, Moon, MoreHorizontal, RefreshCw, Trash2 } from "lucide-react";

export default function TrainingAiAnalysis() {
  usePrerenderReady(true);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showBookmarks, setShowBookmarks] = useState(false);

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
    setStatus,
  } = useGuestScanner();

  const {
    messages,
    status: chatStatus,
    error: chatError,
    sendMessage,
    clearChat,
  } = useAiChat();

  const isProcessing = status === "uploading" || status === "analyzing";
  const canPay = file && status === "ready";

  const handlePaymentSuccess = (payload: { scanId: string; filePath: string; paymentIntentId: string }) => {
    setPaymentOpen(false);
    setStatus("uploading");
    startScan({ scanId: payload.scanId, filePath: payload.filePath });
  };

  const handleRequestPayment = () => {
    if (!canPay || isProcessing) return;
    setStatus("paying");
    setPaymentOpen(true);
  };

  const handlePaymentOpenChange = (open: boolean) => {
    setPaymentOpen(open);
    if (!open && status === "paying" && !isProcessing) {
      setStatus(file ? "ready" : "idle");
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const toggleBookmarks = () => {
    setShowBookmarks(!showBookmarks);
  };

  return (
    <PageTransition variant="fade">
      <div className="min-h-screen">
        <SEO
          title="AI Analysis & Secure File Scan"
          description="Run instant AI analysis on suspicious files, messages, and screenshots. Secure guest scan workflow with automatic deletion in 10 minutes."
          keywords="AI analysis, file scan, scam detection, document scanning, secure analysis"
          structuredData={{
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "AI Analysis & Secure File Scan",
            "description": "Run instant AI analysis on suspicious files, messages, and screenshots.",
            "url": "https://invisionnetwork.org/training/ai-analysis",
            "publisher": {
              "@type": "Organization",
              "name": SITE.name,
              "telephone": SITE.phone.e164,
            },
          }}
        />

        <main className="relative min-h-screen overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,#B8B9D1_0%,#FFFFFF_100%)]" />

          <div className="relative min-h-screen flex flex-col px-6 py-6">
            {/* Top Navigation Bar */}
            <div className="w-full flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 rounded-full bg-black/45 backdrop-blur-md border border-white/10 px-3 py-2 shadow-xl">
                  <Link
                    to="/training"
                    className="h-8 w-8 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition"
                    title="View grid layout"
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </Link>
                  <button
                    onClick={toggleDarkMode}
                    className="h-8 w-8 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition"
                    title="Toggle dark mode"
                  >
                    <Moon className="h-4 w-4" />
                  </button>
                  <button
                    onClick={handleRefresh}
                    className="h-8 w-8 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition"
                    title="Refresh page"
                  >
                    <RefreshCw className="h-4 w-4" />
                  </button>
                </div>
                <Link
                  to="/training"
                  className="hidden sm:inline-flex text-xs font-medium text-white/70 hover:text-white transition"
                >
                  Back to Learn & Train
                </Link>
              </div>

              <div className="flex items-center gap-2 rounded-full bg-black/45 backdrop-blur-md border border-white/10 px-3 py-2 shadow-xl">
                <button
                  onClick={clearChat}
                  className="h-8 w-8 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition disabled:opacity-40 disabled:cursor-not-allowed"
                  title="Clear chat history"
                  disabled={messages.length === 0}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
                <button
                  onClick={toggleBookmarks}
                  className="h-8 w-8 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition"
                  title="Bookmarks"
                >
                  <Bookmark className="h-4 w-4" />
                </button>
                <Link
                  to="/training"
                  className="h-8 w-8 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition"
                  title="More options"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Main Chat Area - Expanded */}
            <div className="flex-1 w-full flex flex-col items-center justify-center gap-8 max-w-7xl mx-auto">
              {/* AI Chat History */}
              {messages.length > 0 && (
                <PremiumChatHistory messages={messages} status={chatStatus} />
              )}

              {/* Command Center */}
              <SmartCommandCenter
                file={file}
                status={status}
                onFileSelect={prepareFile}
                onClearFile={clearFile}
                onRequestPayment={handleRequestPayment}
                onSendText={sendMessage}
              />
            </div>
          </div>

          <div className="bg-background">
            <section className="py-16">
              <div id="guest-scanner" aria-hidden="true" />
              <div className="container mx-auto px-6">
                <div className="space-y-6">
                  {isProcessing && (
                    <Card className="premium-3d-card premium-shadow-depth max-w-6xl mx-auto p-6 glass-light">
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
                    <Card className="premium-3d-card premium-shadow-depth max-w-6xl mx-auto p-6 border border-destructive/30 bg-destructive/5 space-y-3">
                      <p className="text-sm text-destructive">{error}</p>
                      <Button variant="outline" onClick={restartScan} className="w-fit">Try again</Button>
                    </Card>
                  )}

                  {analysis && file && status === "completed" && expiresAt && (
                    <div className="max-w-6xl mx-auto">
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
                    <Card className="premium-3d-card premium-shadow-depth max-w-6xl mx-auto p-6 border border-emerald-200 bg-emerald-50/60 text-emerald-700">
                      Your data has been permanently deleted. We do not store your files or results.
                    </Card>
                  )}
                </div>
              </div>
            </section>
            <Footer />
          </div>
        </main>
      </div>

      <PaymentDialog
        open={paymentOpen}
        onOpenChange={handlePaymentOpenChange}
        file={file}
        amount={cost}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </PageTransition>
  );
}
