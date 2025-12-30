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
  ExternalLink,
  Volume2,
  VolumeX,
  Loader2
} from "lucide-react";
import { Link } from "react-router-dom";
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
  const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-chat`;
  const TTS_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/text-to-speech`;

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
      recognitionRef.current.lang = 'en-US';
      
      recognitionRef.current.onresult = async (event: any) => {
        const transcript = event.results[0][0].transcript;
        setIsRecording(false);
        // Auto-submit voice input
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
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [toast]);

  const speakText = async (text: string) => {
    if (!autoSpeak || isGeneratingAudio) return;
    
    try {
      setIsGeneratingAudio(true);
      
      const response = await fetch(TTS_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apikey": import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
          "Authorization": `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ text, voice: "Laura" }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate speech");
      }

      const data = await response.json();
      
      if (data.audioContent) {
        // Stop any currently playing audio
        if (audioRef.current) {
          audioRef.current.pause();
        }
        
        // Use data URI for playback
        const audioUrl = `data:audio/mpeg;base64,${data.audioContent}`;
        const audio = new Audio(audioUrl);
        audioRef.current = audio;
        
        audio.onplay = () => setIsSpeaking(true);
        audio.onended = () => {
          setIsSpeaking(false);
          setIsGeneratingAudio(false);
        };
        audio.onerror = () => {
          setIsSpeaking(false);
          setIsGeneratingAudio(false);
        };
        
        await audio.play();
      }
    } catch (error) {
      console.error("TTS error:", error);
      setIsGeneratingAudio(false);
    }
  };

  const stopSpeaking = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setIsSpeaking(false);
    setIsGeneratingAudio(false);
  };

  const streamChat = async (userMessage: string) => {
    try {
      const newMessages = [...messages, { role: "user" as const, content: userMessage }];
      setMessages(newMessages);
      setIsLoading(true);

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
      
      // Auto-speak the response for elderly users
      if (assistantMessage && autoSpeak) {
        await speakText(assistantMessage);
      }
    } catch (error: any) {
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
      // Stop any playing audio before recording
      stopSpeaking();
      recognitionRef.current.start();
      setIsRecording(true);
      toast({
        title: "Listening...",
        description: "Speak now. Laura is listening.",
      });
    }
  };

  const getModePlaceholder = () => {
    switch (mode) {
      case "translation": return "Enter French text to translate to Spanish...";
      default: return "Type or tap the mic to talk to Laura...";
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50 group">
        {/* Main button with Laura avatar */}
        <button
          onClick={openChat}
          className="relative w-16 h-16 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden border-3 border-primary/30 bg-gradient-to-br from-primary/10 to-accent/10"
        >
          <img 
            src={lauraAvatar} 
            alt="Laura AI Assistant" 
            className="w-full h-full object-cover object-top"
          />
          
          {/* Online indicator */}
          <div className="absolute bottom-0.5 right-0.5 w-4 h-4 rounded-full bg-green-500 border-2 border-white animate-pulse" />
          
          {/* Subtle glow */}
          <div className="absolute inset-0 rounded-full ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all" />
        </button>
        
        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-3 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none">
          <div className="bg-foreground text-background text-sm font-medium px-4 py-2 rounded-xl whitespace-nowrap shadow-lg">
            Talk to Laura 🎤
          </div>
        </div>
      </div>
    );
  }

  return (
    <Card className="fixed bottom-4 right-4 left-4 sm:bottom-6 sm:right-6 sm:left-auto sm:w-full sm:max-w-[420px] h-[85vh] sm:h-[650px] max-h-[calc(100vh-2rem)] shadow-2xl z-50 flex flex-col animate-scale-in border-2 border-primary/20 backdrop-blur-xl bg-background/95 overflow-hidden rounded-3xl">
      {/* Decorative gradient border */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/10 via-transparent to-accent/10 pointer-events-none" />
      
      {/* Header */}
      <div className="relative border-b border-border/50 bg-gradient-to-br from-primary/5 via-accent/5 to-transparent">
        <Button
          variant="ghost"
          size="icon"
          onClick={closeChat}
          className="absolute top-3 right-3 z-10 rounded-full h-8 w-8 hover:bg-destructive/10 hover:text-destructive transition-all"
          aria-label="Close chat"
        >
          <X className="h-5 w-5" />
        </Button>
        
        <div className="relative p-4">
          <div className="flex items-center gap-4 mb-4">
            <Avatar className="h-14 w-14 border-2 border-primary/30 ring-2 ring-primary/10">
              <AvatarImage src={lauraAvatar} alt="Laura AI" className="object-cover object-top" />
              <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground">
                LA
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-xl font-bold bg-gradient-to-r from-primary via-accent to-purple-500 bg-clip-text text-transparent">
                Laura
              </h2>
              <p className="text-xs text-muted-foreground">Your AI Safety Assistant</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  Online
                </div>
                {/* Voice toggle */}
                <button
                  onClick={() => setAutoSpeak(!autoSpeak)}
                  className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs transition-all ${
                    autoSpeak 
                      ? 'bg-primary/10 text-primary' 
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {autoSpeak ? <Volume2 className="w-3 h-3" /> : <VolumeX className="w-3 h-3" />}
                  Voice {autoSpeak ? 'On' : 'Off'}
                </button>
              </div>
            </div>
          </div>
          
          <Tabs value={mode} onValueChange={(v) => setMode(v as AIMode)}>
            <TabsList className="w-full justify-start bg-background/50 h-10 rounded-xl">
              <TabsTrigger value="chat" className="flex-1 text-sm data-[state=active]:bg-primary/10 rounded-lg">
                <MessageSquare className="w-4 h-4 mr-2" />
                Chat
              </TabsTrigger>
              <TabsTrigger value="translation" className="flex-1 text-sm data-[state=active]:bg-accent/10 rounded-lg">
                <Languages className="w-4 h-4 mr-2" />
                Translate
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 px-4" ref={scrollRef}>
        <div className="py-4 space-y-4">
          {messages.length === 0 && (
            <div className="text-center py-8 space-y-4">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 mb-2 overflow-hidden">
                <img src={lauraAvatar} alt="Laura" className="w-full h-full object-cover object-top" />
              </div>
              <div className="space-y-2">
                <p className="text-lg font-medium text-foreground">Hi, I'm Laura!</p>
                <p className="text-muted-foreground text-sm px-4 leading-relaxed">
                  {mode === "chat" 
                    ? "I'm here to help you stay safe online. Ask me anything about scam protection, or tap the microphone to talk to me!"
                    : "Enter text in French and I'll translate it to Spanish for you."
                  }
                </p>
              </div>
              {mode === "chat" && (
                <div className="flex flex-wrap justify-center gap-2 pt-2">
                  <button 
                    onClick={() => setInput("How do I spot a scam?")}
                    className="px-3 py-1.5 bg-primary/10 hover:bg-primary/20 text-primary text-xs rounded-full transition-all"
                  >
                    How do I spot a scam?
                  </button>
                  <button 
                    onClick={() => setInput("Tell me about your services")}
                    className="px-3 py-1.5 bg-accent/10 hover:bg-accent/20 text-accent text-xs rounded-full transition-all"
                  >
                    Your services
                  </button>
                </div>
              )}
            </div>
          )}
          
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex gap-3 ${msg.role === "assistant" ? "justify-start" : "justify-end"}`}
            >
              {msg.role === "assistant" && (
                <Avatar className="h-9 w-9 border border-primary/20 flex-shrink-0">
                  <AvatarImage src={lauraAvatar} alt="Laura AI" className="object-cover object-top" />
                  <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground text-xs">
                    LA
                  </AvatarFallback>
                </Avatar>
              )}
              
              <div
                className={`rounded-2xl px-4 py-3 max-w-[80%] ${
                  msg.role === "assistant"
                    ? "bg-muted/50 text-foreground border border-border/50"
                    : "bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-lg"
                }`}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">{msg.content}</p>
                {msg.role === "assistant" && !isLoading && (
                  <button
                    onClick={() => speakText(msg.content)}
                    className="mt-2 flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
                    disabled={isGeneratingAudio}
                  >
                    {isGeneratingAudio ? (
                      <Loader2 className="w-3 h-3 animate-spin" />
                    ) : isSpeaking ? (
                      <VolumeX className="w-3 h-3" onClick={(e) => { e.stopPropagation(); stopSpeaking(); }} />
                    ) : (
                      <Volume2 className="w-3 h-3" />
                    )}
                    {isSpeaking ? "Stop" : "Listen"}
                  </button>
                )}
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex gap-3 justify-start">
              <Avatar className="h-9 w-9 border border-primary/20 flex-shrink-0">
                <AvatarImage src={lauraAvatar} alt="Laura AI" className="object-cover object-top" />
                <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground text-xs">
                  LA
                </AvatarFallback>
              </Avatar>
              <div className="rounded-2xl px-4 py-3 bg-muted/50 border border-border/50">
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

      {/* Speaking indicator */}
      {(isSpeaking || isGeneratingAudio) && (
        <div className="border-t border-border/50 px-4 py-2 bg-primary/5">
          <div className="flex items-center justify-center gap-2 text-sm text-primary">
            {isGeneratingAudio ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Preparing voice...</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4 animate-pulse" />
                <span>Laura is speaking...</span>
                <button onClick={stopSpeaking} className="ml-2 text-xs underline hover:no-underline">
                  Stop
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="border-t border-border/50 px-4 py-2 bg-muted/30">
        <div className="flex items-center justify-center gap-4 text-xs">
          <Link to="/contact" className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors">
            <Phone className="w-4 h-4" />
            <span>Call Us</span>
          </Link>
          <Link to="/contact" className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors">
            <Mail className="w-4 h-4" />
            <span>Email</span>
          </Link>
          <Link to="/services" className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors">
            <ExternalLink className="w-4 h-4" />
            <span>Services</span>
          </Link>
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-border/50 p-4 bg-background/50 backdrop-blur-sm">
        <form onSubmit={handleSubmit} className="flex gap-3">
          {/* Large mic button for elderly */}
          <Button
            type="button"
            size="icon"
            variant={isRecording ? "destructive" : "outline"}
            onClick={toggleVoiceRecording}
            className={`h-14 w-14 flex-shrink-0 rounded-xl transition-all ${
              isRecording 
                ? 'bg-destructive animate-pulse shadow-lg shadow-destructive/30' 
                : 'hover:bg-primary/10 hover:border-primary'
            }`}
            disabled={isLoading}
          >
            {isRecording ? (
              <MicOff className="h-6 w-6" />
            ) : (
              <Mic className="h-6 w-6" />
            )}
          </Button>
          
          <div className="flex-1 flex flex-col gap-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={getModePlaceholder()}
              className="min-h-[56px] max-h-[100px] resize-none text-base rounded-xl"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
          </div>
          
          <Button
            type="submit"
            size="icon"
            disabled={!input.trim() || isLoading}
            className="h-14 w-14 flex-shrink-0 bg-gradient-to-br from-primary to-accent rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            <Send className="h-6 w-6" />
          </Button>
        </form>
        
        {isRecording && (
          <p className="text-center text-sm text-primary mt-2 animate-pulse">
            🎤 Listening... Speak now!
          </p>
        )}
      </div>
    </Card>
  );
};
