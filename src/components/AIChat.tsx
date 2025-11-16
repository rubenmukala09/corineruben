import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { useAIChat } from "@/contexts/AIChatContext";
import { supabase } from "@/integrations/supabase/client";
import { 
  MessageSquare, 
  Send, 
  Languages, 
  X,
  Mic,
  MicOff,
  Phone,
  Mail,
  ExternalLink
} from "lucide-react";
import { Link } from "react-router-dom";
import loraAvatar3D from "@/assets/lora-avatar-3d.png";

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
  const [isTalking, setIsTalking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const { toast } = useToast();

  const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-chat`;

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ 
        behavior: "smooth", 
        block: "end",
        inline: "nearest"
      });
    }
  }, [messages]);

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

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      
      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsRecording(false);
      };
      
      recognitionRef.current.onerror = () => {
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
  }, [toast]);

  const streamChat = async (userMessage: string) => {
    try {
      const newMessages = [...messages, { role: "user" as const, content: userMessage }];
      setMessages(newMessages);
      setIsLoading(true);
      setIsTalking(true);

      const response = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${(await supabase.auth.getSession()).data.session?.access_token || ""}`
        },
        body: JSON.stringify({
          messages: newMessages,
          mode: mode
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response from AI");
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      
      if (!reader) {
        throw new Error("No response body");
      }

      let assistantMessage = "";
      
      while (true) {
        const { done, value } = await reader.read();
        
        if (done) {
          break;
        }

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');
        
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') {
              continue;
            }
            
            try {
              const parsed = JSON.parse(data);
              if (parsed.content) {
                assistantMessage += parsed.content;
                setMessages([...newMessages, { role: "assistant", content: assistantMessage }]);
              }
            } catch (e) {
              console.error("Error parsing chunk:", e);
            }
          }
        }
      }

      setIsLoading(false);
      setIsTalking(false);
    } catch (error: any) {
      console.error("Chat error:", error);
      setIsLoading(false);
      setIsTalking(false);
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
      recognitionRef.current.start();
      setIsRecording(true);
    }
  };

  const getModePlaceholder = () => {
    switch (mode) {
      case "translation": return "Enter French text to translate to Spanish...";
      default: return "Ask me anything about scam protection or our services...";
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-4 right-4 z-50 group">
        <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" style={{ animationDuration: '2s' }} />
        <div className="absolute inset-0 rounded-full bg-accent/30 animate-ping" style={{ animationDuration: '3s', animationDelay: '0.5s' }} />
        
        <Button
          onClick={openChat}
          size="lg"
          className="relative rounded-full w-16 h-16 bg-gradient-to-br from-primary via-accent to-purple-500 hover:scale-110 transition-transform shadow-2xl shadow-primary/50"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent" />
          <MessageSquare className="w-8 h-8 relative z-10" />
        </Button>
        
        <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <div className="bg-foreground text-background text-sm px-3 py-2 rounded-lg whitespace-nowrap shadow-xl">
            Chat with Lora AI
            <div className="absolute top-full right-4 -mt-1">
              <div className="border-8 border-transparent border-t-foreground" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Card className="fixed bottom-4 right-4 left-4 sm:bottom-6 sm:right-6 sm:left-auto sm:w-full sm:max-w-[420px] h-[85vh] sm:h-[650px] max-h-[calc(100vh-2rem)] shadow-2xl z-50 flex flex-col animate-slide-up border-2 border-primary/20 backdrop-blur-xl">
      {/* Compact Header */}
      <div className="relative border-b border-border/50 bg-gradient-to-br from-primary/5 via-accent/5 to-transparent">
        <Button
          variant="ghost"
          size="icon"
          onClick={closeChat}
          className="absolute top-2 right-2 z-10 rounded-full h-8 w-8 hover:bg-destructive/10 hover:text-destructive transition-all"
          aria-label="Close chat"
        >
          <X className="h-5 w-5" />
        </Button>
        
        <div className="relative p-3">
          <div className="flex items-center gap-3 mb-3">
            <Avatar className="h-10 w-10 border-2 border-primary/30">
              <AvatarImage src={loraAvatar3D} alt="Lora AI" />
              <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground">
                AI
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-lg font-bold bg-gradient-to-r from-primary via-accent to-purple-500 bg-clip-text text-transparent">
                Lora AI
              </h2>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Online
              </div>
            </div>
          </div>
          
          <Tabs value={mode} onValueChange={(v) => setMode(v as AIMode)}>
            <TabsList className="w-full justify-start bg-background/50 h-9">
              <TabsTrigger value="chat" className="flex-1 text-xs data-[state=active]:bg-primary/10">
                <MessageSquare className="w-3.5 h-3.5 mr-1.5" />
                Chat
              </TabsTrigger>
              <TabsTrigger value="translation" className="flex-1 text-xs data-[state=active]:bg-accent/10">
                <Languages className="w-3.5 h-3.5 mr-1.5" />
                Translate
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 px-3 sm:px-4" ref={scrollRef}>
        <div className="py-4 space-y-4">
          {messages.length === 0 && (
            <div className="text-center py-8 space-y-3">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 mb-2">
                <MessageSquare className="w-8 h-8 text-primary" />
              </div>
              <p className="text-muted-foreground text-sm px-4">
                {mode === "chat" 
                  ? "Start a conversation with Lora AI. I'm here to help with scam protection, our services, and answer any questions you have."
                  : "Enter text in French and I'll translate it to Spanish for you."
                }
              </p>
            </div>
          )}
          
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex gap-2 sm:gap-3 ${msg.role === "assistant" ? "justify-start" : "justify-end"}`}
            >
              {msg.role === "assistant" && (
                <Avatar className="h-7 w-7 sm:h-8 sm:w-8 border border-primary/20 flex-shrink-0">
                  <AvatarImage src={loraAvatar3D} alt="Lora AI" />
                  <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground text-xs">
                    AI
                  </AvatarFallback>
                </Avatar>
              )}
              
              <div
                className={`rounded-2xl px-3 sm:px-4 py-2.5 max-w-[85%] sm:max-w-[70%] max-h-[400px] overflow-y-auto overflow-x-hidden ${
                  msg.role === "assistant"
                    ? "bg-muted/50 text-foreground border border-border/50"
                    : "bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-lg"
                }`}
                style={{
                  scrollbarWidth: 'thin',
                  scrollbarColor: 'hsl(var(--primary) / 0.3) transparent'
                }}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">{msg.content}</p>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex gap-2 sm:gap-3 justify-start">
              <Avatar className="h-7 w-7 sm:h-8 sm:w-8 border border-primary/20 flex-shrink-0">
                <AvatarImage src={loraAvatar3D} alt="Lora AI" />
                <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground text-xs">
                  AI
                </AvatarFallback>
              </Avatar>
              <div className="rounded-2xl px-3 sm:px-4 py-2.5 bg-muted/50 border border-border/50">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Quick Actions */}
      <div className="border-t border-border/50 px-3 sm:px-4 py-2 bg-muted/30">
        <div className="flex items-center justify-center gap-3 sm:gap-4 text-xs">
          <Link to="/contact" className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors">
            <Phone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Call</span>
          </Link>
          <Link to="/contact" className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors">
            <Mail className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Email</span>
          </Link>
          <Link to="/services" className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors">
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Services</span>
          </Link>
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-border/50 p-3 sm:p-4 bg-background/50 backdrop-blur-sm">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={getModePlaceholder()}
            className="min-h-[44px] max-h-[120px] resize-none text-sm"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />
          <div className="flex flex-col gap-2">
            <Button
              type="button"
              size="icon"
              variant={isRecording ? "destructive" : "outline"}
              onClick={toggleVoiceRecording}
              className="h-[44px] w-[44px] flex-shrink-0"
              disabled={isLoading}
            >
              {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            </Button>
            <Button
              type="submit"
              size="icon"
              disabled={!input.trim() || isLoading}
              className="h-[44px] w-[44px] flex-shrink-0 bg-gradient-to-br from-primary to-accent"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </div>
    </Card>
  );
};
