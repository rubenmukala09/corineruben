import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { PageTransition } from "@/components/PageTransition";
import { PaymentDialog } from "@/components/scanner/PaymentDialog";
import { EnhancedPromptInputBox } from "@/components/ui/ai-prompt-box-enhanced";
import { PremiumChatHistory } from "@/components/training/PremiumChatHistory";

import { usePrerenderReady } from "@/contexts/PrerenderContext";
import { useGuestScanner } from "@/hooks/useGuestScanner";
import { useAiChat } from "@/hooks/useAiChat";
import { SITE } from "@/config/site";
import { Download, Home, Moon, RefreshCw, Sun, Trash2, X } from "lucide-react";
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
    setStatus
  } = useGuestScanner();

  // Calculate full cost object with formatting
  const cost = useMemo(() => {
    if (!file) return {
      cost: 0.50,
      formatted: "$0.50",
      minimumCharge: 0.50
    };
    return {
      cost: costNumber,
      formatted: `$${costNumber.toFixed(2)}`,
      minimumCharge: 0.50
    };
  }, [file, costNumber]);
  const {
    messages,
    status: chatStatus,
    error: chatError,
    sendMessage,
    clearChat
  } = useAiChat();
  const isProcessing = status === "uploading" || status === "analyzing";
  const canPay = file && status === "ready";
  const handlePaymentSuccess = (payload: {
    scanId: string;
    filePath: string;
    paymentIntentId: string;
  }) => {
    setPaymentOpen(false);
    setStatus("uploading");
    startScan({
      scanId: payload.scanId,
      filePath: payload.filePath
    });
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
    const textColor = next ? "#e2e8f0" : "";
    document.body.style.backgroundColor = bg;
    document.documentElement.style.backgroundColor = bg;
    document.body.style.color = textColor;
  };
  const handleRefresh = () => {
    window.location.reload();
  };
  const toggleBookmarks = () => {
    setShowBookmarks(!showBookmarks);
  };
  return <PageTransition variant="fade">
      <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-[#1a1a2e] text-slate-200' : 'bg-[#B8B9D1] text-foreground'}`}>
        <SEO title="AI Analysis & Secure File Scan" description="Run instant AI analysis on suspicious files, messages, and screenshots. Secure guest scan workflow with automatic deletion in 10 minutes." keywords="AI analysis, file scan, scam detection, document scanning, secure analysis" structuredData={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "AI Analysis & Secure File Scan",
        "description": "Run instant AI analysis on suspicious files, messages, and screenshots.",
        "url": "https://invisionnetwork.org/training/ai-analysis",
        "publisher": {
          "@type": "Organization",
          "name": SITE.name,
          "telephone": SITE.phone.e164
        }
      }} />

        <main className={`relative min-h-screen overflow-hidden flex flex-col transition-colors duration-300 ${darkMode ? 'bg-[#1a1a2e]' : 'bg-[#B8B9D1]'}`}>

          <div className="relative flex-1 flex flex-col px-6 py-6">
            {/* Top Navigation Bar */}
            <div className="w-full flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 rounded-full bg-black/45 backdrop-blur-md border border-white/10 px-3 py-2 shadow-xl">
                  <Link to="/" className="h-8 w-8 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition" title="Go home">
                    <Home className="h-4 w-4" />
                  </Link>
                  <button type="button" onClick={toggleDarkMode} className="h-8 w-8 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition" title="Toggle dark mode">
                    {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                  </button>
                  <button type="button" onClick={handleRefresh} className="h-8 w-8 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition" title="Refresh page">
                    <RefreshCw className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-full bg-black/45 backdrop-blur-md border border-white/10 px-3 py-2 shadow-xl">
                <button type="button" onClick={() => {
                clearChat();
                clearFile();
              }} className="h-8 w-8 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition disabled:opacity-40 disabled:cursor-not-allowed" title="Delete data" disabled={messages.length === 0 && !file}>
                  <Trash2 className="h-4 w-4" />
                </button>
                <button type="button" onClick={() => {
                const chatText = messages.map(m => `[${m.role}]: ${m.content}`).join("\n\n");
                const blob = new Blob([chatText || "No data to download."], {
                  type: "text/plain"
                });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `ai-analysis-${Date.now()}.txt`;
                a.click();
                URL.revokeObjectURL(url);
              }} className="h-8 w-8 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition disabled:opacity-40 disabled:cursor-not-allowed" title="Download data" disabled={messages.length === 0}>
                  <Download className="h-4 w-4" />
                </button>
                
              </div>
            </div>

            {/* Main Chat Area - Expanded */}
            <div className="flex-1 w-full flex flex-col items-center justify-center gap-8 max-w-7xl mx-auto">
              {/* AI Chat History */}
              {messages.length > 0 && <PremiumChatHistory messages={messages} status={chatStatus} />}

              {/* Enhanced AI Command Center */}
              <div className="w-full flex flex-col items-center gap-3">
                <EnhancedPromptInputBox onSend={sendMessage} onFileSelect={prepareFile} isLoading={status === "uploading" || status === "analyzing"} placeholder="Drop file to scan or type a message..." hasFile={!!file} onClearFile={clearFile} onRequestPayment={handleRequestPayment} canAnalyze={file && status === "ready"} />
                {file && <div className="flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 shadow-xl">
                    <span className="text-sm text-white/90 font-medium truncate max-w-[200px]">{file.name}</span>
                    <span className="text-white/60">•</span>
                    <span className="text-sm text-white/80 whitespace-nowrap">{cost.formatted}</span>
                    <button type="button" onClick={clearFile} className="ml-2 rounded-full p-1 text-white/60 hover:text-white hover:bg-white/10 transition" aria-label="Remove file">
                      <X className="h-4 w-4" />
                    </button>
                  </div>}
                <p className="text-sm font-medium text-white/90 tracking-wide text-center">
                  Anonymous Scan • ${cost.minimumCharge.toFixed(2)} Minimum • Auto-deleted in 10m
                </p>
              </div>
            </div>

          </div>
        </main>
      </div>

      <PaymentDialog open={paymentOpen} onOpenChange={handlePaymentOpenChange} file={file} amount={cost.cost} onPaymentSuccess={handlePaymentSuccess} />
    </PageTransition>;
}