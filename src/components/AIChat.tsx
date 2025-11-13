import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { useAIChat } from "@/contexts/AIChatContext";
import { 
  MessageSquare, 
  Send, 
  Sparkles, 
  FileText, 
  Languages, 
  Heart,
  Loader2,
  X,
  Mic,
  MicOff
} from "lucide-react";
import loraAvatar from "@/assets/lora-avatar.png";

interface Message {
  role: "user" | "assistant";
  content: string;
}

type AIMode = "chat" | "sentiment" | "summary" | "translation" | "document_qa";

export const AIChat = () => {
  const { isOpen, openChat, closeChat } = useAIChat();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<AIMode>("chat");
  const [isRecording, setIsRecording] = useState(false);
  const [isTalking, setIsTalking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const { toast } = useToast();

  const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-chat`;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

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
    } catch (error) {
      console.error("Chat error:", error);
      setIsLoading(false);
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
    setIsTalking(true);
    await streamChat(userMessage);
    setTimeout(() => setIsTalking(false), 2000);
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
      case "sentiment": return <Heart className="h-4 w-4" />;
      case "summary": return <FileText className="h-4 w-4" />;
      case "translation": return <Languages className="h-4 w-4" />;
      case "document_qa": return <FileText className="h-4 w-4" />;
      default: return <MessageSquare className="h-4 w-4" />;
    }
  };

  const getModePlaceholder = () => {
    switch (mode) {
      case "sentiment": return "Paste text to analyze sentiment...";
      case "summary": return "Paste text to summarize...";
      case "translation": return "Enter text to translate (specify target language)...";
      case "document_qa": return "Ask a question about your document...";
      default: return "Ask me anything about scam protection or our services...";
    }
  };

  if (!isOpen) {
    return (
      <Button
        onClick={openChat}
        variant="ghost"
        className="fixed bottom-6 right-6 h-20 w-20 rounded-full shadow-2xl z-50 p-0 overflow-hidden 
                   bg-gradient-to-br from-primary to-accent hover:scale-110 transition-all duration-300
                   animate-gentle-pulse"
        size="icon"
      >
        <Avatar className="h-full w-full">
          <AvatarImage src={loraAvatar} alt="Lora AI Assistant" className="object-cover" />
          <AvatarFallback>LA</AvatarFallback>
        </Avatar>
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 w-[90vw] sm:w-full sm:max-w-[400px] h-[600px] max-h-[calc(100vh-3rem)] 
                     shadow-2xl z-50 flex flex-col animate-slide-up">
      <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="flex items-center gap-3">
          <Avatar className={`h-10 w-10 border-2 border-primary/20 transition-all duration-300 ${
            isTalking ? 'animate-talking-pulse scale-110' : 'animate-gentle-pulse'
          }`}>
            <AvatarImage src={loraAvatar} alt="Lora AI Assistant" className="object-cover" />
            <AvatarFallback>LA</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-base">Lora</h3>
            <p className="text-xs text-muted-foreground">
              {isTalking ? "Thinking..." : "AI Assistant"}
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={closeChat}
          className="hover:bg-destructive/10 hover:text-destructive transition-colors"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <Tabs value={mode} onValueChange={(v) => setMode(v as AIMode)} className="flex-1 flex flex-col">
        <TabsList className="mx-4 mt-2">
          <TabsTrigger value="chat" className="text-xs">
            <MessageSquare className="h-3 w-3 mr-1" />
            Chat
          </TabsTrigger>
          <TabsTrigger value="sentiment" className="text-xs">
            <Heart className="h-3 w-3 mr-1" />
            Sentiment
          </TabsTrigger>
          <TabsTrigger value="summary" className="text-xs">
            <FileText className="h-3 w-3 mr-1" />
            Summary
          </TabsTrigger>
          <TabsTrigger value="translation" className="text-xs">
            <Languages className="h-3 w-3 mr-1" />
            Translate
          </TabsTrigger>
        </TabsList>

        <TabsContent value={mode} className="flex-1 flex flex-col m-0">
          <ScrollArea className="flex-1 p-4" ref={scrollRef}>
            {messages.length === 0 ? (
              <div className="text-center text-muted-foreground py-8">
                <div className="mb-2">{getModeIcon()}</div>
                <p className="text-sm">Start a conversation with our AI assistant</p>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((msg, idx) => (
                   <div
                    key={idx}
                    className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                     {msg.role === "assistant" && (
                      <Avatar className="h-8 w-8 flex-shrink-0">
                        <AvatarImage src={loraAvatar} alt="Lora" className="object-cover" />
                        <AvatarFallback>LA</AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={`max-w-[80%] rounded-xl p-3 animate-fade-in ${
                        msg.role === "user"
                          ? "bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-md"
                          : "bg-muted/80 backdrop-blur-sm"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap break-words overflow-wrap-anywhere">
                        {msg.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>

          <form onSubmit={handleSubmit} className="p-4 border-t bg-gradient-to-t from-background to-transparent">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={getModePlaceholder()}
                  className="min-h-[60px] resize-none pr-12 rounded-xl"
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
                  className={`absolute right-2 top-2 h-10 w-10 rounded-full transition-all duration-300 ${
                    isRecording 
                      ? 'bg-destructive text-destructive-foreground animate-pulse' 
                      : 'hover:bg-primary/10 hover:text-primary'
                  }`}
                >
                  {isRecording ? (
                    <MicOff className="h-4 w-4" />
                  ) : (
                    <Mic className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <Button
                type="submit"
                size="icon"
                disabled={isLoading || !input.trim()}
                className="h-[60px] w-[60px] rounded-xl bg-gradient-to-br from-primary to-accent 
                           hover:shadow-glow-purple hover:scale-105 transition-all duration-300"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Powered by Lovable AI
            </p>
          </form>
        </TabsContent>
      </Tabs>
    </Card>
  );
};
