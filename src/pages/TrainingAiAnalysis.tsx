import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { PageTransition } from "@/components/PageTransition";
import { PaymentDialog } from "@/components/scanner/PaymentDialog";
import { ScanResults } from "@/components/scanner/ScanResults";
import { SmartCommandCenter } from "@/components/training/SmartCommandCenter";
import { EnhancedPromptInputBox } from "@/components/ui/ai-prompt-box-enhanced";
import { PremiumChatHistory } from "@/components/training/PremiumChatHistory";
import { AIFooter } from "@/components/training/AIFooter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { usePrerenderReady } from "@/contexts/PrerenderContext";
import { useGuestScanner } from "@/hooks/useGuestScanner";
import { useAiChat } from "@/hooks/useAiChat";
import { SITE } from "@/config/site";
import { Bookmark, Download, Home, Loader2, Moon, MoreHorizontal, RefreshCw, Sun, Trash2, X } from "lucide-react";

export default function TrainingAiAnalysis() {
  usePrerenderReady(true);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showBookmarks, setShowBookmarks] = useState(false);

  // Set uniform background for this page
  useEffect(() => {
    const originalBodyBg = document.body.style.backgroundColor;
    const originalBodyBgImage = document.body.style.backgroundImage;
    const originalHtmlBg = document.documentElement.style.backgroundColor;
    const originalBodyMargin = document.body.style.margin;
    const originalBodyPadding = document.body.style.padding;
    const originalHtmlMargin = document.documentElement.style.margin;
    const originalHtmlPadding = document.documentElement.style.padding;

    // Apply uniform background
    document.body.style.backgroundColor = "#B8B9D1";
    document.body.style.backgroundImage = "none";
    document.documentElement.style.backgroundColor = "#B8B9D1";
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.documentElement.style.margin = "0";
    document.documentElement.style.padding = "0";

    return () => {
      // Restore original styles on unmount
      document.body.style.backgroundColor = originalBodyBg;
      document.body.style.backgroundImage = originalBodyBgImage;
      document.documentElement.style.backgroundColor = originalHtmlBg;
      document.body.style.margin = originalBodyMargin;
      document.body.style.padding = originalBodyPadding;
      document.documentElement.style.margin = originalHtmlMargin;
      document.documentElement.style.padding = originalHtmlPadding;
    };
  }, []);

  const {
    file,
    cost: costNumber,
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

  // Calculate full cost object with formatting
  const cost = useMemo(() => {
    if (!file) return { cost: 0.50, formatted: "$0.50", minimumCharge: 0.50 };
    return {
      cost: costNumber,
      formatted: `$${costNumber.toFixed(2)}`,
      minimumCharge: 0.50,
    };
  }, [file, costNumber]);

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
    const next = !darkMode;
    setDarkMode(next);
    document.documentElement.classList.toggle("dark", next);
    const bg = next ? "#1a1a2e" : "#B8B9D1";
    document.body.style.backgroundColor = bg;
    document.documentElement.style.backgroundColor = bg;
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const toggleBookmarks = () => {
    setShowBookmarks(!showBookmarks);
  };

  return (
    <PageTransition variant="fade">
      <div className="min-h-screen bg-[#B8B9D1]">
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

        <main className="relative min-h-screen overflow-hidden flex flex-col bg-[#B8B9D1]">

          <div className="relative flex-1 flex flex-col px-6 py-6">
            {/* Top Navigation Bar */}
            <div className="w-full flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 rounded-full bg-black/45 backdrop-blur-md border border-white/10 px-3 py-2 shadow-xl">
                  <Link
                    to="/"
                    className="h-8 w-8 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition"
                    title="Go home"
                  >
                    <Home className="h-4 w-4" />
                  </Link>
                  <button
                    type="button"
                    onClick={toggleDarkMode}
                    className="h-8 w-8 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition"
                    title="Toggle dark mode"
                  >
                    {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                  </button>
                  <button
                    type="button"
                    onClick={handleRefresh}
                    className="h-8 w-8 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition"
                    title="Refresh page"
                  >
                    <RefreshCw className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-full bg-black/45 backdrop-blur-md border border-white/10 px-3 py-2 shadow-xl">
                <button
                  type="button"
                  onClick={() => {
                    clearChat();
                    clearFile();
                  }}
                  className="h-8 w-8 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition disabled:opacity-40 disabled:cursor-not-allowed"
                  title="Delete data"
                  disabled={messages.length === 0 && !file}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const chatText = messages.map(m => `[${m.role}]: ${m.content}`).join("\n\n");
                    const blob = new Blob([chatText || "No data to download."], { type: "text/plain" });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = `ai-analysis-${Date.now()}.txt`;
                    a.click();
                    URL.revokeObjectURL(url);
                  }}
                  className="h-8 w-8 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition disabled:opacity-40 disabled:cursor-not-allowed"
                  title="Download data"
                  disabled={messages.length === 0}
                >
                  <Download className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={toggleBookmarks}
                  className="h-8 w-8 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition"
                  title="Bookmarks"
                >
                  <Bookmark className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Main Chat Area - Expanded */}
            <div className="flex-1 w-full flex flex-col items-center justify-center gap-8 max-w-7xl mx-auto">
              {/* AI Chat History */}
              {messages.length > 0 && (
                <PremiumChatHistory messages={messages} status={chatStatus} />
              )}

              {/* Enhanced AI Command Center */}
              <div className="w-full flex flex-col items-center gap-3">
                <EnhancedPromptInputBox
                  onSend={sendMessage}
                  onFileSelect={prepareFile}
                  isLoading={status === "uploading" || status === "analyzing"}
                  placeholder="Drop file to scan or type a message..."
                  hasFile={!!file}
                  onClearFile={clearFile}
                  onRequestPayment={handleRequestPayment}
                  canAnalyze={file && status === "ready"}
                />
                {file && (
                  <div className="flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 shadow-xl">
                    <span className="text-sm text-white/90 font-medium truncate max-w-[200px]">{file.name}</span>
                    <span className="text-white/60">•</span>
                    <span className="text-sm text-white/80 whitespace-nowrap">{cost.formatted}</span>
                    <button
                      type="button"
                      onClick={clearFile}
                      className="ml-2 rounded-full p-1 text-white/60 hover:text-white hover:bg-white/10 transition"
                      aria-label="Remove file"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
                <p className="text-sm font-medium text-white/90 tracking-wide text-center">
                  Anonymous Scan • ${cost.minimumCharge.toFixed(2)} Minimum • Auto-deleted in 10m
                </p>
              </div>
            </div>

          </div>

          {/* Footer at the very bottom */}
          <div className="relative mt-auto">
            <AIFooter />
          </div>

          <div className="bg-[#B8B9D1]">
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
          </div>
        </main>
      </div>

      <PaymentDialog
        open={paymentOpen}
        onOpenChange={handlePaymentOpenChange}
        file={file}
        amount={cost.cost}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </PageTransition>
  );
}
