import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAIChat } from "@/contexts/AIChatContext";
import { 
  MessageSquare, 
  Send, 
  Languages, 
  X,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Loader2,
  Square,
  ChevronDown
} from "lucide-react";
import lauraAvatar from "@/assets/laura-avatar-new.png";

interface Message {
  role: "user" | "assistant";
  content: string;
}

type AIMode = "chat" | "translation";

export const AIChat = () => {
  const { isOpen, openChat, closeChat } = useAIChat();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<AIMode>("chat");
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(true);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const { toast } = useToast();

  const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-chat`;

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = useCallback((behavior: ScrollBehavior = "smooth") => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior, block: "end" });
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Check if scrolled to bottom - wrapped in rAF to avoid forced reflows
  const handleScroll = useCallback(() => {
    requestAnimationFrame(() => {
      if (scrollContainerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
        const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
        setShowScrollButton(!isNearBottom);
      }
    });
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "l") {
        e.preventDefault();
        openChat();
      }
      if (e.key === "Escape" && isOpen) {
        closeChat();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, openChat, closeChat]);

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';
      
      recognitionRef.current.onresult = async (event: any) => {
        const transcript = event.results[0][0].transcript;
        setIsRecording(false);
        if (transcript.trim()) {
          setInput("");
          await streamChat(transcript.trim());
        }
      };
      
      recognitionRef.current.onerror = (error: any) => {
        console.error("Speech recognition error:", error);
        setIsRecording(false);
        toast({
          title: "Voice recognition error",
          description: "Could not process voice input. Please try again.",
          variant: "destructive",
        });
      };
      
      recognitionRef.current.onend = () => {
        setIsRecording(false);
      };
    }

    return () => {
      stopSpeaking();
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [toast]);

  // Immediate stop speaking - cancel all speech
  const stopSpeaking = useCallback(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  }, []);

  // Speak text using browser synthesis
  const speakText = useCallback(async (text: string) => {
    if (!autoSpeak) return;
    
    // Stop any current speech first
    stopSpeaking();
    
    try {
      setIsSpeaking(true);
      
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.95;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;
        
        // Get voices and find a good female voice
        const voices = window.speechSynthesis.getVoices();
        const preferredVoices = ['samantha', 'victoria', 'karen', 'female', 'zira', 'google us english female'];
        const femaleVoice = voices.find(v => 
          preferredVoices.some(pv => v.name.toLowerCase().includes(pv))
        );
        if (femaleVoice) {
          utterance.voice = femaleVoice;
        }
        
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);
        
        window.speechSynthesis.speak(utterance);
      }
    } catch (error) {
      console.error("TTS error:", error);
      setIsSpeaking(false);
    }
  }, [autoSpeak, stopSpeaking]);

  // Stop current response generation
  const stopGeneration = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsLoading(false);
    stopSpeaking();
  }, [stopSpeaking]);

  const streamChat = async (userMessage: string) => {
    // Cancel any ongoing request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    // Create new abort controller
    abortControllerRef.current = new AbortController();
    
    try {
      const newMessages = [...messages, { role: "user" as const, content: userMessage }];
      setMessages(newMessages);
      setIsLoading(true);
      stopSpeaking();

      const response = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apikey": import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
        },
        body: JSON.stringify({
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
          type: mode
        }),
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("AI response error:", errorText);
        throw new Error(`Failed to get response: ${response.status}`);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      
      if (!reader) {
        throw new Error("No response body");
      }

      let assistantMessage = "";
      let textBuffer = "";
      
      while (true) {
        const { done, value } = await reader.read();
        
        if (done) break;

        textBuffer += decoder.decode(value, { stream: true });
        
        // Process line-by-line for SSE format
        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") continue;

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              assistantMessage += content;
              setMessages([...newMessages, { role: "assistant", content: assistantMessage }]);
            }
          } catch {
            // Partial JSON, wait for more data
          }
        }
      }

      // Process any remaining buffer
      if (textBuffer.trim()) {
        for (const line of textBuffer.split("\n")) {
          if (!line.startsWith("data: ")) continue;
          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") continue;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              assistantMessage += content;
            }
          } catch { /* ignore */ }
        }
        if (assistantMessage) {
          setMessages([...newMessages, { role: "assistant", content: assistantMessage }]);
        }
      }

      setIsLoading(false);
      abortControllerRef.current = null;
      
      // Auto-speak the response
      if (assistantMessage && autoSpeak) {
        await speakText(assistantMessage);
      }
    } catch (error: any) {
      if (error.name === 'AbortError') {
        console.log("Request was cancelled");
        return;
      }
      console.error("Chat error:", error);
      setIsLoading(false);
      toast({
        title: "Error",
        description: error.message || "Failed to send message. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    await streamChat(userMessage);
  };

  const toggleVoiceRecording = () => {
    if (!recognitionRef.current) {
      toast({
        title: "Voice not supported",
        description: "Your browser doesn't support voice recognition.",
        variant: "destructive",
      });
      return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      stopSpeaking();
      stopGeneration();
      recognitionRef.current.start();
      setIsRecording(true);
      toast({
        title: "Listening...",
        description: "Speak now. Laura is listening.",
      });
    }
  };

  // Closed state - just show floating button
  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-[9998] group">
        <button
          onClick={openChat}
          className="relative w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden ring-2 ring-primary/20"
        >
          <img 
            src={lauraAvatar} 
            alt="Laura AI Assistant" 
            width={56}
            height={56}
            sizes="56px"
            loading="eager"
            decoding="async"
            fetchPriority="high"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute bottom-0.5 right-0.5 w-3 h-3 rounded-full bg-green-500 border-2 border-white" />
        </button>
        
        <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none">
          <div className="bg-card text-foreground text-xs font-medium px-3 py-1.5 rounded-lg whitespace-nowrap shadow-md border border-border">
            Talk to Laura
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-[9998] sm:bottom-6 sm:right-6">
      {/* Enhanced chat panel with better dimensions */}
      <div className="bg-card rounded-2xl shadow-2xl w-[360px] sm:w-[400px] h-[560px] flex flex-col overflow-hidden border border-border">
        
        {/* Header */}
        <div className="flex items-center justify-between p-3 border-b border-border bg-card shrink-0">
          <div className="flex items-center gap-2">
            <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
              <img src={lauraAvatar} alt="Laura" width={40} height={40} sizes="40px" loading="lazy" decoding="async" className="w-full h-full object-cover object-top" />
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-card" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">Laura</h3>
              <p className="text-[10px] text-muted-foreground">
                {isSpeaking ? "Speaking..." : isLoading ? "Thinking..." : "AI Assistant"}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-1">
            {/* Stop button - visible when speaking or loading */}
            {(isSpeaking || isLoading) && (
              <button
                onClick={() => {
                  stopSpeaking();
                  stopGeneration();
                }}
                className="p-2 rounded-full bg-destructive/10 text-destructive hover:bg-destructive/20 transition-all"
                title="Stop Laura"
              >
                <Square className="w-4 h-4 fill-current" />
              </button>
            )}
            
            <button
              onClick={() => setAutoSpeak(!autoSpeak)}
              className={`p-2 rounded-full transition-all ${autoSpeak ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:bg-muted'}`}
              title={autoSpeak ? "Voice enabled" : "Voice disabled"}
            >
              {autoSpeak ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
            
            <button
              onClick={() => setMode(mode === "chat" ? "translation" : "chat")}
              className={`p-2 rounded-full transition-all ${mode === "translation" ? 'text-accent bg-accent/10' : 'text-muted-foreground hover:bg-muted'}`}
              title={mode === "chat" ? "Chat mode" : "Translation mode"}
            >
              <Languages className="w-4 h-4" />
            </button>
            
            <button
              onClick={closeChat}
              className="p-2 rounded-full text-muted-foreground hover:bg-muted hover:text-foreground transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Messages Area with visible scrollbar */}
        <div 
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto px-4 py-3 space-y-3 scroll-smooth"
          style={{ 
            scrollbarWidth: 'thin',
            scrollbarColor: 'hsl(var(--primary) / 0.3) transparent'
          }}
        >
          {messages.length === 0 && (
            <div className="text-center py-6 space-y-3">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full overflow-hidden ring-2 ring-primary/20">
                <img src={lauraAvatar} alt="Laura" width={64} height={64} sizes="64px" loading="lazy" decoding="async" className="w-full h-full object-cover object-top" />
              </div>
              <div className="space-y-2">
                <p className="text-base font-semibold text-foreground">Hi, I'm Laura!</p>
                <p className="text-muted-foreground text-sm px-4 leading-relaxed">
                  {mode === "chat" 
                    ? "Your AI assistant for cybersecurity questions. Ask me anything about staying safe online!"
                    : "Enter French text to translate to Spanish."
                  }
                </p>
              </div>
              {mode === "chat" && (
                <div className="flex flex-wrap justify-center gap-2 pt-2">
                  <button 
                    onClick={() => setInput("How do I spot a scam?")}
                    className="px-3 py-1.5 bg-muted hover:bg-muted/80 text-foreground text-xs rounded-full transition-all"
                  >
                    🔍 Spot a scam
                  </button>
                  <button 
                    onClick={() => setInput("What services do you offer?")}
                    className="px-3 py-1.5 bg-muted hover:bg-muted/80 text-foreground text-xs rounded-full transition-all"
                  >
                    📋 Services
                  </button>
                  <button 
                    onClick={() => setInput("Tell me about the 60-Second Pause Protocol")}
                    className="px-3 py-1.5 bg-muted hover:bg-muted/80 text-foreground text-xs rounded-full transition-all"
                  >
                    ⏱️ Pause Protocol
                  </button>
                </div>
              )}
            </div>
          )}
          
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex gap-2 ${msg.role === "assistant" ? "justify-start" : "justify-end"}`}
            >
              {msg.role === "assistant" && (
                <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                  <img src={lauraAvatar} alt="Laura" width={32} height={32} sizes="32px" loading="lazy" decoding="async" className="w-full h-full object-cover object-top" />
                </div>
              )}
              
              <div
                className={`rounded-2xl px-4 py-2.5 max-w-[85%] ${
                  msg.role === "assistant"
                    ? "bg-muted text-foreground"
                    : "bg-primary text-primary-foreground"
                }`}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">{msg.content}</p>
                {msg.role === "assistant" && !isLoading && idx === messages.length - 1 && (
                  <div className="mt-2 flex items-center gap-2">
                    <button
                      onClick={() => speakText(msg.content)}
                      disabled={isSpeaking}
                      className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors disabled:opacity-50"
                    >
                      <Volume2 className="w-3 h-3" />
                      <span>Listen</span>
                    </button>
                    {isSpeaking && (
                      <button
                        onClick={stopSpeaking}
                        className="flex items-center gap-1 text-xs text-destructive hover:text-destructive/80 transition-colors"
                      >
                        <Square className="w-3 h-3 fill-current" />
                        <span>Stop</span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex gap-2 justify-start">
              <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                <img src={lauraAvatar} alt="Laura" width={32} height={32} loading="lazy" decoding="async" className="w-full h-full object-cover object-top" />
              </div>
              <div className="rounded-2xl px-4 py-3 bg-muted">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Scroll to bottom button */}
        {showScrollButton && (
          <button
            onClick={() => scrollToBottom()}
            className="absolute bottom-24 left-1/2 -translate-x-1/2 p-2 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-all"
          >
            <ChevronDown className="w-4 h-4" />
          </button>
        )}

        {/* Speaking/Loading indicator bar */}
        {(isSpeaking || isRecording) && (
          <div className="px-4 py-2 bg-primary/5 border-t border-border shrink-0">
            <div className="flex items-center justify-center gap-2 text-sm">
              {isRecording ? (
                <>
                  <Mic className="w-4 h-4 text-destructive animate-pulse" />
                  <span className="text-destructive font-medium">Listening...</span>
                  <button 
                    onClick={() => {
                      recognitionRef.current?.stop();
                      setIsRecording(false);
                    }}
                    className="text-xs text-muted-foreground hover:text-foreground underline"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 text-primary animate-pulse" />
                  <span className="text-primary font-medium">Laura is speaking...</span>
                  <button 
                    onClick={stopSpeaking}
                    className="text-xs text-muted-foreground hover:text-foreground underline"
                  >
                    Interrupt
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        {/* Input area */}
        <div className="p-3 bg-card border-t border-border shrink-0">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <button
              type="button"
              onClick={toggleVoiceRecording}
              className={`h-11 w-11 flex-shrink-0 rounded-full flex items-center justify-center transition-all ${
                isRecording 
                  ? 'bg-destructive text-destructive-foreground animate-pulse' 
                  : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
              }`}
              disabled={isLoading}
              title={isRecording ? "Stop recording" : "Start voice input"}
            >
              {isRecording ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </button>
            
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={mode === "chat" ? "Type a message..." : "French text..."}
              className="flex-1 bg-muted rounded-full px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
            
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="h-11 w-11 flex-shrink-0 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Send className="h-5 w-5" />
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
