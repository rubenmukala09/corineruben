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
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isLoading]);

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) return;
    const SpeechRecognition =
      (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
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

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-fab">
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex flex-col items-center justify-center w-20 h-20 rounded-3xl shadow-3d-lg overflow-hidden bg-gradient-to-br from-primary to-accent backdrop-blur-xl border-2 border-white/40 transition-all duration-300 hover:scale-105 hover:shadow-[0_12px_40px_rgba(0,0,0,0.25)] hover:-translate-y-1"
          aria-label="Open Laura AI Assistant"
        >
          {/* Avatar Background Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/30 to-primary/20 blur-xl" />

          {/* Avatar Image */}
          <div className="relative w-14 h-14 rounded-2xl overflow-hidden border-2 border-white/60 shadow-lg">
            <img
              src={lauraAvatar}
              alt="Laura"
              className="w-full h-full object-cover object-top scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent" />
          </div>

          {/* Online Status */}
          <span className="absolute top-2 right-2 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-white"></span>
          </span>

          {/* Label */}
          <span className="relative mt-1 text-[10px] font-bold text-white/95 tracking-wider drop-shadow-lg">LAURA AI</span>

          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent premium-shine-sweep" />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-fab w-[calc(100vw-2rem)] max-w-[360px] sm:max-w-[400px]">
      <div className="rounded-3xl border border-border/60 glass-heavy card-shine shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-white/40 bg-white/70 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden">
              <img src={lauraAvatar} alt="Laura" className="w-full h-full object-cover object-top" />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Laura</p>
              <p className="text-xs text-muted-foreground">Navigation & help</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMode("chat")}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition ${
                mode === "chat" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
              }`}
            >
              Chat
            </button>
            <button
              onClick={() => setMode("help")}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition ${
                mode === "help" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
              }`}
            >
              Quick Help
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-full hover:bg-muted transition"
              aria-label="Close Laura"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {mode === "chat" ? (
          <>
            <div ref={scrollRef} className="max-h-[420px] overflow-y-auto p-4 space-y-4">
              {messages.length === 0 && (
                <div className="space-y-4 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mx-auto">
                    <Sparkles className="w-6 h-6 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-base font-semibold text-foreground">Hi, I’m Laura.</p>
                    <p className="text-sm text-muted-foreground">
                      I can help with scanning, pricing, privacy, and how to use InVision Network.
                    </p>
                  </div>
                  <div className="flex flex-wrap justify-center gap-2">
                    {quickActions.map((action) => (
                      <button
                        key={action}
                        onClick={() => sendMessage(action)}
                        className="px-3 py-1.5 rounded-full bg-muted text-xs text-foreground hover:bg-muted/80 transition"
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
                    className={`rounded-2xl px-4 py-2 text-sm leading-relaxed max-w-[80%] ${
                      msg.role === "assistant"
                        ? "bg-muted text-foreground"
                        : "bg-primary text-primary-foreground"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="rounded-2xl px-4 py-2 bg-muted text-sm text-muted-foreground">
                    Laura is typing...
                  </div>
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="p-4 border-t border-white/40 flex gap-2 bg-white/70 backdrop-blur-xl">
              <button
                type="button"
                onClick={toggleRecording}
                className={`w-11 h-11 rounded-full flex items-center justify-center transition ${
                  isRecording ? "bg-rose-500 text-white" : "bg-muted text-foreground"
                }`}
                aria-label="Voice input"
              >
                {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask Laura a question..."
                className="flex-1 rounded-full bg-muted px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <Button type="submit" size="icon" disabled={!input.trim() || isLoading}>
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </>
        ) : (
          <div className="p-4 space-y-4">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" />
              <p className="text-sm font-semibold text-foreground">Quick Help</p>
            </div>
            <p className="text-xs text-muted-foreground">
              Fast paths to support, reporting, and learning resources.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {quickHelpActions.map((action) => {
                const ActionIcon = action.icon;
                const content = (
                  <div
                    className={`relative p-3 rounded-xl bg-white/70 hover:bg-white/90 border border-white/50 transition-all cursor-pointer group ${
                      action.urgent ? "ring-2 ring-rose-500/50" : ""
                    }`}
                    onClick={() => {
                      if (action.action) action.action();
                      if (action.closeOnAction !== false) {
                        setIsOpen(false);
                      }
                    }}
                  >
                    {action.urgent && (
                      <span className="absolute -top-1 -right-1 w-3 h-3 bg-rose-500 rounded-full" />
                    )}
                    <div
                      className={`w-8 h-8 rounded-lg bg-gradient-to-br ${action.color} flex items-center justify-center mb-2`}
                    >
                      <ActionIcon className="w-4 h-4 text-white" />
                    </div>
                    <div className="text-xs font-medium text-foreground">{action.label}</div>
                    <div className="text-[10px] text-muted-foreground leading-tight mt-0.5">
                      {action.description}
                    </div>
                  </div>
                );

                if (action.href) {
                  return (
                    <Link key={action.label} to={action.href} onClick={() => setIsOpen(false)}>
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
      <div className="mt-2 text-[11px] text-muted-foreground text-right">
        Laura only answers InVision Network questions.
      </div>
    </div>
  );
};

export default LauraAIAssistant;
