import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  AlertTriangle,
  BookOpen,
  FileQuestion,
  Mail,
  MessageCircle,
  Mic,
  MicOff,
  Phone,
  Send,
  Shield,
  Sparkles,
  X,
  Bot,
  Headphones,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLauraChat } from "@/hooks/useLauraChat";
import lauraAvatar from "@/assets/laura-avatar-new.png";
import { SITE } from "@/config/site";

const quickActions = [
  "How do I scan a file?",
  "What's the cost?",
  "Is it private?",
  "Report a scam",
];

type QuickHelpAction = {
  icon: typeof Shield;
  label: string;
  description: string;
  href?: string;
  action?: () => void;
  color: string;
  urgent?: boolean;
  closeOnAction?: boolean;
};

export const LauraAIAssistant = () => {
  const { messages, isLoading, sendMessage } = useLauraChat();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [mode, setMode] = useState<"chat" | "help">("chat");
  const recognitionRef = useRef<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const quickHelpActions: QuickHelpAction[] = [
    {
      icon: AlertTriangle,
      label: "Report a Scam",
      description: "Encountered something suspicious?",
      href: "/resources",
      color: "from-rose-500 to-orange-500",
      urgent: true,
    },
    {
      icon: Phone,
      label: "Call Us",
      description: "Speak with a security expert",
      action: () => window.open(SITE.phone.tel, "_self"),
      color: "from-emerald-500 to-green-600",
    },
    {
      icon: MessageCircle,
      label: "Chat with Laura",
      description: "Ask about pricing & scans",
      action: () => setMode("chat"),
      color: "from-primary to-accent",
      closeOnAction: false,
    },
    {
      icon: FileQuestion,
      label: "FAQ",
      description: "Quick answers",
      href: "/faq",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: BookOpen,
      label: "Training",
      description: "Learn to stay protected",
      href: "/training",
      color: "from-purple-500 to-violet-500",
    },
    {
      icon: Mail,
      label: "Email Support",
      description: "We respond within 24 hours",
      action: () => window.open(`mailto:${SITE.emails.hello}`, "_self"),
      color: "from-amber-500 to-yellow-500",
    },
  ];

  useEffect(() => {
    if (!scrollRef.current) return;
    // Wrap in rAF to avoid forced reflow from reading scrollHeight
    requestAnimationFrame(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    });
  }, [messages, isLoading]);

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window))
      return;
    const SpeechRecognition =
      (window as any).webkitSpeechRecognition ||
      (window as any).SpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = false;
    recognitionRef.current.lang = "en-US";

    recognitionRef.current.onresult = async (event: any) => {
      const transcript = event.results[0][0].transcript;
      setIsRecording(false);
      if (transcript.trim()) {
        setInput("");
        await sendMessage(transcript.trim());
      }
    };

    recognitionRef.current.onerror = () => {
      setIsRecording(false);
    };

    recognitionRef.current.onend = () => {
      setIsRecording(false);
    };
  }, [sendMessage]);

  const toggleRecording = () => {
    if (!recognitionRef.current) return;
    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      recognitionRef.current.start();
      setIsRecording(true);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!input.trim() || isLoading) return;
    const message = input.trim();
    setInput("");
    await sendMessage(message);
  };

  /* ─── Closed FAB ─── */
  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-fab">
        <button
          onClick={() => setIsOpen(true)}
          className="group relative w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent shadow-[0_4px_20px_hsl(var(--primary)/0.35),0_12px_40px_-8px_hsl(var(--primary)/0.25)] transition-all duration-300 hover:scale-110 hover:shadow-[0_8px_30px_hsl(var(--primary)/0.45)] active:scale-95 overflow-hidden ring-2 ring-white/20"
          aria-label="Open Laura AI Assistant"
          style={{ contain: "layout" }}
        >
          <img
            src={lauraAvatar}
            alt="Laura"
            width={56}
            height={56}
            fetchPriority="high"
            className="w-full h-full object-cover object-top"
          />
          {/* Online pulse */}
          <span className="absolute bottom-0.5 right-0.5 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400 border-2 border-white/50" />
          </span>
        </button>
      </div>
    );
  }

  /* ─── Open Panel ─── */
  return (
    <div className="fixed bottom-4 right-4 z-fab w-[calc(100vw-2rem)] max-w-[380px] sm:max-w-[420px]">
      <div className="rounded-3xl border border-border/40 bg-card/95 backdrop-blur-2xl shadow-[0_8px_40px_hsl(var(--primary)/0.12),0_20px_60px_-12px_hsl(258_40%_20%/0.2)] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border/40 bg-gradient-to-r from-primary/8 to-accent/5">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-primary/20">
              <img
                src={lauraAvatar}
                alt="Laura"
                className="w-full h-full object-cover object-top"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-card" />
            </div>
            <div>
              <p className="text-sm font-bold text-foreground">Laura</p>
              <p className="text-[11px] text-muted-foreground font-medium">
                {isLoading ? "Thinking..." : "Navigation & help"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setMode("chat")}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-200 ${
                mode === "chat"
                  ? "bg-primary text-white shadow-sm"
                  : "bg-muted text-foreground hover:bg-muted/80"
              }`}
            >
              Chat
            </button>
            <button
              onClick={() => setMode("help")}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-200 ${
                mode === "help"
                  ? "bg-primary text-white shadow-sm"
                  : "bg-muted text-foreground hover:bg-muted/80"
              }`}
            >
              Help
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-full hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-all"
              aria-label="Close Laura"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {mode === "chat" ? (
          <>
            {/* Messages */}
            <div
              ref={scrollRef}
              className="max-h-[420px] overflow-y-auto p-4 space-y-3"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "hsl(var(--primary) / 0.2) transparent",
              }}
            >
              {messages.length === 0 && (
                <div className="space-y-5 text-center py-4">
                  <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-full overflow-hidden ring-4 ring-primary/10 mx-auto">
                    <img
                      src={lauraAvatar}
                      alt="Laura"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="space-y-2">
                    <p className="text-lg font-bold text-foreground">
                      Hi, I'm Laura
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed px-2">
                      I help with scanning, pricing, privacy, and navigating
                      InVision Network.
                    </p>
                  </div>
                  <div className="flex flex-wrap justify-center gap-2 pt-1">
                    {quickActions.map((action) => (
                      <button
                        key={action}
                        onClick={() => sendMessage(action)}
                        className="px-3.5 py-2 rounded-full bg-primary/10 text-xs font-semibold text-primary hover:bg-primary/18 transition-all border border-primary/15"
                      >
                        {action}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.role === "assistant" ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed max-w-[82%] ${
                      msg.role === "assistant"
                        ? "bg-muted/80 text-foreground border border-border/30"
                        : "bg-gradient-to-br from-primary to-accent text-white shadow-sm"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="rounded-2xl px-4 py-2.5 bg-muted/80 text-sm text-muted-foreground border border-border/30 flex items-center gap-2">
                    <span className="flex gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "300ms" }} />
                    </span>
                    Laura is typing
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="p-3 border-t border-border/40 flex gap-2 bg-card/80"
            >
              <button
                type="button"
                onClick={toggleRecording}
                className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                  isRecording
                    ? "bg-rose-500 text-white shadow-lg shadow-rose-500/30 scale-110"
                    : "bg-muted text-foreground hover:bg-primary/10 hover:text-primary"
                }`}
                aria-label="Voice input"
              >
                {isRecording ? (
                  <MicOff className="w-4 h-4" />
                ) : (
                  <Mic className="w-4 h-4" />
                )}
              </button>
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask Laura a question..."
                className="flex-1 rounded-full bg-muted/60 border border-border/40 px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/30 transition-all"
              />
              <Button
                type="submit"
                size="icon"
                disabled={!input.trim() || isLoading}
                className="rounded-full w-10 h-10 flex-shrink-0"
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </>
        ) : (
          /* Quick Help Panel */
          <div className="p-4 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                <Headphones className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">Quick Help</p>
                <p className="text-[11px] text-muted-foreground">
                  Fast paths to support & resources
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              {quickHelpActions.map((action) => {
                const ActionIcon = action.icon;
                const content = (
                  <div
                    className={`relative p-3 rounded-xl bg-card hover:bg-muted/50 border border-border/50 hover:border-primary/20 transition-all cursor-pointer group ${
                      action.urgent ? "ring-1 ring-rose-400/40" : ""
                    }`}
                    onClick={() => {
                      if (action.action) action.action();
                      if (action.closeOnAction !== false) {
                        setIsOpen(false);
                      }
                    }}
                  >
                    {action.urgent && (
                      <span className="absolute -top-1 -right-1 w-3 h-3 bg-rose-500 rounded-full animate-pulse" />
                    )}
                    <div
                      className={`w-9 h-9 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center mb-2 shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all`}
                    >
                      <ActionIcon className="w-4 h-4 text-white" />
                    </div>
                    <div className="text-xs font-bold text-foreground">
                      {action.label}
                    </div>
                    <div className="text-[10px] text-muted-foreground leading-tight mt-0.5">
                      {action.description}
                    </div>
                  </div>
                );

                if (action.href) {
                  return (
                    <Link
                      key={action.label}
                      to={action.href}
                      onClick={() => setIsOpen(false)}
                    >
                      {content}
                    </Link>
                  );
                }

                return <div key={action.label}>{content}</div>;
              })}
            </div>
          </div>
        )}
      </div>
      <p className="mt-1.5 text-[10px] text-muted-foreground text-right pr-2 opacity-60">
        Laura only answers InVision Network questions
      </p>
    </div>
  );
};

export default LauraAIAssistant;
