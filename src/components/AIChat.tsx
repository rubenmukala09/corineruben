import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { useAIChat } from "@/contexts/AIChatContext";
import { supabase } from "@/integrations/supabase/client";
import { 
  MessageSquare, 
  Send, 
  Languages, 
  Loader2,
  X,
  Mic,
  MicOff,
  Phone,
  Mail,
  ExternalLink
} from "lucide-react";
import { Link } from "react-router-dom";
import { AnimatedAvatar } from "./AnimatedAvatar";
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

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+L to open chat
      if ((e.ctrlKey || e.metaKey) && e.key === "l") {
        e.preventDefault();
        openChat();
      }
      // Esc to close chat
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
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          messages: newMessages,
          type: mode,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to get AI response");
      }

      if (!response.body) {
        throw new Error("No response body");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantMessage = "";
      let buffer = "";

      // Add empty assistant message that we'll update
      setMessages(prev => [...prev, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (let line of lines) {
          line = line.trim();
          if (!line || line.startsWith(":")) continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") continue;

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              assistantMessage += content;
              setMessages(prev => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1] = {
                  role: "assistant",
                  content: assistantMessage,
                };
                return newMessages;
              });
            }
          } catch (e) {
            console.error("Error parsing JSON:", e);
          }
        }
      }

      setIsLoading(false);
      setIsTalking(false);
    } catch (error) {
      console.error("Chat error:", error);
      setIsLoading(false);
      setIsTalking(false);
    if (error instanceof Error && error.message.includes("Too many requests")) {
      toast({
        title: "Rate limit exceeded",
        description: "Please wait a moment before sending another message.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send message",
        variant: "destructive",
      });
    }
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

  const getModeIcon = () => {
    switch (mode) {
      case "translation": return <Languages className="h-4 w-4" />;
      default: return <MessageSquare className="h-4 w-4" />;
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
        {/* Pulsing rings */}
        <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" style={{ animationDuration: '2s' }} />
        <div className="absolute inset-0 rounded-full bg-accent/30 animate-ping" style={{ animationDuration: '3s', animationDelay: '0.5s' }} />
        
        {/* Button */}
        <Button
          onClick={openChat}
          size="lg"
          className="relative rounded-full w-16 h-16 bg-gradient-to-br from-primary via-accent to-purple-500 hover:scale-110 transition-transform shadow-2xl shadow-primary/50"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent" />
          <MessageSquare className="w-8 h-8 relative z-10" />
        </Button>
        
        {/* Tooltip */}
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
      {/* Futuristic Header with Tech Grid Background */}
      <div className="relative overflow-hidden border-b border-border/50">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/10 to-purple-500/10" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDIwIEwgMjAgMCBNIDAgMCBMIDIwIDIwIiBzdHJva2U9ImhzbCh2YXIoLS1wcmltYXJ5KSkiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />
        
        <div className="relative p-4 sm:p-6 text-center">
          {/* Avatar with holographic rings */}
          <div className="relative mb-4 inline-block">
            {/* Holographic rings */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-primary/30 animate-ping" style={{ animationDuration: '3s' }} />
              <div className="absolute w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-accent/40 animate-ping" style={{ animationDuration: '2s', animationDelay: '0.5s' }} />
            </div>
            
            {/* Avatar with glow effect */}
            <div className="relative z-10">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-gradient-to-br from-primary/20 via-accent/20 to-purple-500/20 p-1 shadow-lg shadow-primary/50">
                <img 
                  src={loraAvatar3D}
                  alt="Lora AI Assistant"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            </div>
            
            {/* Status indicator */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
              <div className="flex items-center gap-2 bg-background/95 backdrop-blur-sm border border-primary/30 rounded-full px-3 py-1">
                <div className={`w-2 h-2 rounded-full transition-all ${
                  isTalking ? 'bg-primary animate-pulse' : 'bg-green-500 animate-pulse'
                }`} />
                <span className="text-xs font-medium">
                  {isTalking ? "Thinking..." : "Online"}
                </span>
              </div>
            </div>
          </div>
          
          <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary via-accent to-purple-500 bg-clip-text text-transparent mb-2">
            Lora AI Assistant
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground mb-3">
            Powered by Advanced AI Technology
          </p>
          
          {/* Tech specs badges */}
          <div className="flex gap-1.5 sm:gap-2 justify-center mb-4 flex-wrap">
            <Badge variant="outline" className="text-[10px] sm:text-xs">
              24/7 Available
            </Badge>
            <Badge variant="outline" className="text-[10px] sm:text-xs">
              Multi-Language
            </Badge>
            <Badge variant="outline" className="text-[10px] sm:text-xs">
              Voice Enabled
            </Badge>
          </div>

          {/* Close and voice controls */}
          <div className="flex items-center justify-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={closeChat}
              className="rounded-full hover:bg-destructive/10 hover:text-destructive transition-all"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <Tabs value={mode} onValueChange={(v) => setMode(v as AIMode)} className="flex-1 flex flex-col">
        <TabsList className="mx-4 mt-3 bg-accent/10 border border-accent/20">
          <TabsTrigger 
            value="chat" 
            className="text-sm data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-accent data-[state=active]:text-primary-foreground"
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            Chat Mode
          </TabsTrigger>
          <TabsTrigger 
            value="translation"
            className="text-sm data-[state=active]:bg-gradient-to-r data-[state=active]:from-accent data-[state=active]:to-purple-500 data-[state=active]:text-primary-foreground"
          >
            <Languages className="h-4 w-4 mr-2" />
            Translate
          </TabsTrigger>
        </TabsList>

        <TabsContent value={mode} className="flex-1 flex flex-col m-0 overflow-hidden">
          <ScrollArea className="flex-1 px-4">
            <div className="py-4">
              {messages.length === 0 ? (
                <div className="text-center py-12">
                  <div className="mb-4 flex justify-center">
                    <div className="p-4 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 backdrop-blur-sm">
                      {getModeIcon()}
                    </div>
                  </div>
                  <p className="text-base font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    {mode === "translation" ? "French to Spanish Translation" : "Start a conversation"}
                  </p>
                  <p className="text-xs mt-2 text-muted-foreground">
                    {mode === "translation" 
                      ? "Enter French text and I'll translate it to Spanish" 
                      : "I can help with scam protection, training, and business solutions"}
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      {msg.role === "assistant" && (
                        <div className="relative">
                          <Avatar className="ring-2 ring-accent/30 ring-offset-2 h-9 w-9">
                            <AvatarImage src={loraAvatar3D} />
                            <AvatarFallback className="bg-gradient-to-br from-accent/20 to-purple-500/20">LA</AvatarFallback>
                          </Avatar>
                          {isTalking && idx === messages.length - 1 && (
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background animate-pulse" />
                          )}
                        </div>
                      )}
                      <div className="group max-w-[80%]">
                        <div
                          className={`rounded-2xl px-4 py-3 shadow-lg hover:shadow-xl transition-all backdrop-blur-sm ${
                            msg.role === "user"
                              ? "rounded-tr-sm bg-gradient-to-br from-primary to-primary/80 text-primary-foreground ml-auto"
                              : "rounded-tl-sm bg-gradient-to-br from-accent/10 to-purple-500/10 border border-accent/20"
                          }`}
                        >
                          <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">{msg.content}</p>
                        </div>
                        <span className="text-xs text-muted-foreground mt-1 block opacity-0 group-hover:opacity-100 transition-opacity">
                          {msg.role === "assistant" ? "AI Response" : "Just now"}
                        </span>
                      </div>
                      {msg.role === "user" && (
                        <Avatar className="ring-2 ring-primary/20 h-9 w-9">
                          <AvatarFallback className="bg-primary/10 text-primary font-semibold text-xs">
                            You
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex gap-3 justify-start animate-fade-in">
                      <AnimatedAvatar 
                        isTalking={isTalking}
                        isLoading={true}
                        className="h-9 w-9"
                      />
                      <div className="max-w-[80%] rounded-2xl p-4 bg-muted/80 backdrop-blur-sm border border-primary/10">
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-muted-foreground font-medium">Lora is typing</span>
                          <div className="flex gap-1.5">
                            <span className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                            <span className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                            <span className="w-2 h-2 bg-primary rounded-full animate-bounce"></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Quick Actions */}
          <div className="px-4 py-3 border-t bg-gradient-to-r from-muted/30 via-primary/5 to-muted/30 backdrop-blur-sm">
            <div className="flex items-center justify-between gap-3">
              <a
                href="tel:9375550199"
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-all group"
              >
                <Phone className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>Call Us</span>
              </a>
              <Link
                to="/contact"
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-all group"
                onClick={closeChat}
              >
                <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>Contact</span>
              </Link>
              <Link
                to="/business"
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-all group"
                onClick={closeChat}
              >
                <ExternalLink className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>Services</span>
              </Link>
            </div>
          </div>

          {/* Futuristic Input Area */}
          <form onSubmit={handleSubmit} className="p-2 sm:p-4 border-t border-border/50 bg-gradient-to-r from-background via-accent/5 to-background">
            {/* Input with cyber border */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-purple-500/20 rounded-lg blur-sm" />
              <div className="relative flex gap-2 items-end bg-background/95 backdrop-blur-sm border-2 border-primary/20 rounded-lg p-2">
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={getModePlaceholder()}
                  className="min-h-[60px] max-h-[120px] resize-none border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                  disabled={isLoading || isRecording}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit(e);
                    }
                  }}
                />
                
                {/* Action buttons */}
                <div className="flex flex-col gap-2">
                  {/* Voice button */}
                  <Button
                    type="button"
                    size="icon"
                    variant={isRecording ? "default" : "outline"}
                    onClick={toggleVoiceRecording}
                    disabled={isLoading}
                    className={isRecording ? "bg-red-500 hover:bg-red-600 animate-pulse" : ""}
                  >
                    {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                  </Button>
                  
                  {/* Send button */}
                  <Button
                    type="submit"
                    size="icon"
                    disabled={!input.trim() || isLoading}
                    className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                  >
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between mt-3 px-1">
              <p className="text-xs text-muted-foreground font-medium">
                ✨ Powered by Lovable AI
              </p>
              <p className="text-xs text-muted-foreground/60">
                <kbd className="px-2 py-1 rounded-md bg-muted/50 text-muted-foreground text-[10px] font-mono border border-primary/10">Ctrl+L</kbd>
                {" · "}
                <kbd className="px-2 py-1 rounded-md bg-muted/50 text-muted-foreground text-[10px] font-mono border border-primary/10">Esc</kbd>
              </p>
            </div>
          </form>
        </TabsContent>
      </Tabs>
    </Card>
  );
};
