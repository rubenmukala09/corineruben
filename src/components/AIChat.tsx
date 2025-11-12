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
  Volume2,
  VolumeX,
  Phone,
  Mail,
  ExternalLink
} from "lucide-react";
import { Link } from "react-router-dom";
import loraAvatar from "@/assets/lora-avatar.png";

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
  const [isSpeaking, setIsSpeaking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-chat`;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
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

      // Generate speech for the complete response
      if (assistantMessage && !isSpeaking) {
        await speakText(assistantMessage);
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

  const speakText = async (text: string) => {
    try {
      setIsSpeaking(true);
      
      const { data, error } = await supabase.functions.invoke('text-to-speech', {
        body: { text, voice: 'nova' }
      });

      if (error) throw error;

      if (data?.audioContent) {
        // Stop any currently playing audio
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }

        // Create audio element and play
        const audio = new Audio(`data:audio/mp3;base64,${data.audioContent}`);
        audioRef.current = audio;
        
        audio.onended = () => setIsSpeaking(false);
        audio.onerror = () => {
          setIsSpeaking(false);
          toast({
            title: "Audio Error",
            description: "Failed to play audio response",
            variant: "destructive",
          });
        };
        
        await audio.play();
      }
    } catch (error) {
      console.error("TTS error:", error);
      setIsSpeaking(false);
      toast({
        title: "Voice Error",
        description: "Failed to generate voice response",
        variant: "destructive",
      });
    }
  };

  const stopSpeaking = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsSpeaking(false);
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
      <Button
        onClick={openChat}
        variant="ghost"
        className="fixed bottom-6 right-6 h-24 w-24 rounded-full shadow-2xl z-50 p-0 overflow-hidden 
                   bg-transparent hover:scale-110 transition-all duration-300
                   animate-gentle-pulse"
        size="icon"
      >
        <div className="h-full w-full rounded-full bg-gradient-to-br from-primary/20 to-accent/20 backdrop-blur-sm flex items-center justify-center border-2 border-primary/30">
          <Avatar className="h-20 w-20">
            <AvatarImage src={loraAvatar} alt="Lora AI Assistant" className="object-cover" />
            <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground text-2xl">LA</AvatarFallback>
          </Avatar>
        </div>
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 w-[90vw] sm:w-full sm:max-w-[420px] h-[650px] max-h-[calc(100vh-3rem)] 
                     shadow-2xl z-50 flex flex-col animate-slide-up border-2 border-primary/20 backdrop-blur-xl">
      <div className="flex items-center justify-between p-5 border-b bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Avatar className={`h-12 w-12 border-2 transition-all duration-300 ${
              isTalking || isSpeaking 
                ? 'border-primary animate-talking-pulse scale-110 shadow-lg shadow-primary/50' 
                : 'border-primary/30 animate-gentle-pulse'
            }`}>
              <AvatarImage src={loraAvatar} alt="Lora AI Assistant" className="object-cover" />
              <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground text-lg">LA</AvatarFallback>
            </Avatar>
            <div className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-background transition-all duration-300 ${
              isTalking || isSpeaking ? 'bg-primary animate-pulse' : 'bg-muted'
            }`} />
          </div>
          <div>
            <h3 className="font-bold text-lg bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Lora
            </h3>
            <p className="text-xs text-muted-foreground font-medium">
              {isTalking ? "🤔 Thinking..." : isSpeaking ? "🗣️ Speaking..." : "✨ AI Assistant"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={isSpeaking ? stopSpeaking : undefined}
            disabled={!isSpeaking}
            className={`rounded-full transition-all ${isSpeaking ? 'text-primary hover:text-primary/80 bg-primary/10' : 'text-muted-foreground'}`}
          >
            {isSpeaking ? <Volume2 className="h-4 w-4 animate-pulse" /> : <VolumeX className="h-4 w-4" />}
          </Button>
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

      <Tabs value={mode} onValueChange={(v) => setMode(v as AIMode)} className="flex-1 flex flex-col">
        <TabsList className="mx-4 mt-3 bg-muted/50 backdrop-blur-sm">
          <TabsTrigger value="chat" className="text-sm data-[state=active]:bg-gradient-to-br data-[state=active]:from-primary data-[state=active]:to-accent data-[state=active]:text-primary-foreground">
            <MessageSquare className="h-4 w-4 mr-2" />
            Chat
          </TabsTrigger>
          <TabsTrigger value="translation" className="text-sm data-[state=active]:bg-gradient-to-br data-[state=active]:from-primary data-[state=active]:to-accent data-[state=active]:text-primary-foreground">
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
                        <Avatar className="h-9 w-9 flex-shrink-0 border border-primary/20">
                          <AvatarImage src={loraAvatar} alt="Lora" className="object-cover" />
                          <AvatarFallback className="bg-gradient-to-br from-primary/20 to-accent/20">LA</AvatarFallback>
                        </Avatar>
                      )}
                      <div
                        className={`max-w-[80%] rounded-2xl p-4 animate-fade-in ${
                          msg.role === "user"
                            ? "bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-lg"
                            : "bg-muted/80 backdrop-blur-sm border border-primary/10"
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap break-words leading-relaxed">
                          {msg.content}
                        </p>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex gap-3 justify-start animate-fade-in">
                      <Avatar className="h-9 w-9 flex-shrink-0 animate-gentle-pulse border border-primary/20">
                        <AvatarImage src={loraAvatar} alt="Lora" className="object-cover" />
                        <AvatarFallback className="bg-gradient-to-br from-primary/20 to-accent/20">LA</AvatarFallback>
                      </Avatar>
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

          <form onSubmit={handleSubmit} className="p-4 border-t bg-gradient-to-t from-background/50 via-primary/5 to-transparent backdrop-blur-sm">
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={getModePlaceholder()}
                  className="min-h-[80px] max-h-[160px] resize-none pr-14 rounded-2xl border-2 border-primary/20 focus:border-primary/50 transition-all bg-background/50 backdrop-blur-sm"
                  disabled={isLoading || isRecording}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit(e);
                    }
                  }}
                />
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  onClick={toggleVoiceRecording}
                  disabled={isLoading}
                  className={`absolute right-2 top-2 h-11 w-11 rounded-full transition-all duration-300 ${
                    isRecording 
                      ? 'bg-destructive text-destructive-foreground animate-pulse shadow-lg' 
                      : 'hover:bg-primary/10 hover:text-primary'
                  }`}
                >
                  {isRecording ? (
                    <MicOff className="h-5 w-5" />
                  ) : (
                    <Mic className="h-5 w-5" />
                  )}
                </Button>
              </div>
              <Button
                type="submit"
                size="icon"
                disabled={isLoading || !input.trim()}
                className="h-[80px] w-[80px] rounded-2xl bg-gradient-to-br from-primary to-accent 
                           hover:shadow-lg hover:shadow-primary/50 hover:scale-105 transition-all duration-300
                           disabled:opacity-50 disabled:hover:scale-100"
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Send className="h-5 w-5" />
                )}
              </Button>
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
