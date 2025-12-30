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
        {/* Main button with Laura avatar - transparent background */}
        <button
          onClick={openChat}
          className="relative w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden"
        >
          <img 
            src={lauraAvatar} 
            alt="Laura AI Assistant" 
            className="w-full h-full object-cover object-top"
          />
          
          {/* Online indicator */}
          <div className="absolute bottom-0.5 right-0.5 w-3 h-3 rounded-full bg-green-500 border-2 border-white" />
        </button>
        
        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none">
          <div className="bg-white text-gray-800 text-xs font-medium px-3 py-1.5 rounded-lg whitespace-nowrap shadow-md">
            Talk to Laura
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6">
      {/* Clean, compact white chat panel */}
      <div className="bg-white rounded-2xl shadow-2xl w-[320px] max-h-[480px] flex flex-col overflow-hidden border border-gray-100">
        {/* Compact Header */}
        <div className="flex items-center justify-between p-3 border-b border-gray-100 bg-white">
          <div className="flex items-center gap-2">
            <div className="relative w-9 h-9 rounded-full overflow-hidden flex-shrink-0">
              <img src={lauraAvatar} alt="Laura" className="w-full h-full object-cover object-top" />
              <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border border-white" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-800">Laura</h3>
              <p className="text-[10px] text-gray-400">AI Assistant</p>
            </div>
          </div>
          
          <div className="flex items-center gap-0.5">
            <button
              onClick={() => setAutoSpeak(!autoSpeak)}
              className={`p-1.5 rounded-full transition-all ${autoSpeak ? 'text-primary bg-primary/10' : 'text-gray-400 hover:bg-gray-100'}`}
              title={autoSpeak ? "Voice on" : "Voice off"}
            >
              {autoSpeak ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={() => setMode(mode === "chat" ? "translation" : "chat")}
              className={`p-1.5 rounded-full transition-all ${mode === "translation" ? 'text-accent bg-accent/10' : 'text-gray-400 hover:bg-gray-100'}`}
              title={mode === "chat" ? "Chat mode" : "Translation mode"}
            >
              <Languages className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={closeChat}
              className="p-1.5 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-all"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Messages Area */}
        <ScrollArea className="flex-1 px-3 h-[280px]" ref={scrollRef}>
          <div className="py-3 space-y-3">
            {messages.length === 0 && (
              <div className="text-center py-4 space-y-2">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full overflow-hidden">
                  <img src={lauraAvatar} alt="Laura" className="w-full h-full object-cover object-top" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-800">Hi, I'm Laura!</p>
                  <p className="text-gray-500 text-xs px-2 leading-relaxed">
                    {mode === "chat" 
                      ? "Ask me anything about staying safe online, or tap the mic to talk!"
                      : "Enter French text to translate to Spanish."
                    }
                  </p>
                </div>
                {mode === "chat" && (
                  <div className="flex flex-wrap justify-center gap-1.5 pt-1">
                    <button 
                      onClick={() => setInput("How do I spot a scam?")}
                      className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-[11px] rounded-full transition-all"
                    >
                      Spot a scam
                    </button>
                    <button 
                      onClick={() => setInput("Tell me about your services")}
                      className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-[11px] rounded-full transition-all"
                    >
                      Services
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
                  <div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0">
                    <img src={lauraAvatar} alt="Laura" className="w-full h-full object-cover object-top" />
                  </div>
                )}
                
                <div
                  className={`rounded-xl px-3 py-2 max-w-[80%] ${
                    msg.role === "assistant"
                      ? "bg-gray-100 text-gray-800"
                      : "bg-primary text-white"
                  }`}
                >
                  <p className="text-xs leading-relaxed whitespace-pre-wrap break-words">{msg.content}</p>
                  {msg.role === "assistant" && !isLoading && (
                    <button
                      onClick={() => speakText(msg.content)}
                      className="mt-1 flex items-center gap-1 text-[10px] text-gray-500 hover:text-primary transition-colors"
                      disabled={isGeneratingAudio}
                    >
                      {isGeneratingAudio ? (
                        <Loader2 className="w-2.5 h-2.5 animate-spin" />
                      ) : isSpeaking ? (
                        <VolumeX className="w-2.5 h-2.5" onClick={(e) => { e.stopPropagation(); stopSpeaking(); }} />
                      ) : (
                        <Volume2 className="w-2.5 h-2.5" />
                      )}
                      {isSpeaking ? "Stop" : "Listen"}
                    </button>
                  )}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex gap-2 justify-start">
                <div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0">
                  <img src={lauraAvatar} alt="Laura" className="w-full h-full object-cover object-top" />
                </div>
                <div className="rounded-xl px-3 py-2 bg-gray-100">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Speaking indicator */}
        {(isSpeaking || isGeneratingAudio) && (
          <div className="px-3 py-1.5 bg-primary/5 border-t border-gray-100">
            <div className="flex items-center justify-center gap-1.5 text-xs text-primary">
              {isGeneratingAudio ? (
                <>
                  <Loader2 className="w-3 h-3 animate-spin" />
                  <span>Preparing...</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3 h-3 animate-pulse" />
                  <span>Speaking...</span>
                  <button onClick={stopSpeaking} className="ml-1 underline hover:no-underline">Stop</button>
                </>
              )}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-2.5 bg-white border-t border-gray-100">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <button
              type="button"
              onClick={toggleVoiceRecording}
              className={`h-10 w-10 flex-shrink-0 rounded-full flex items-center justify-center transition-all ${
                isRecording 
                  ? 'bg-red-500 text-white animate-pulse' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              disabled={isLoading}
            >
              {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            </button>
            
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={mode === "chat" ? "Type a message..." : "French text..."}
              className="flex-1 bg-gray-100 rounded-full px-3 py-2 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30"
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
              className="h-10 w-10 flex-shrink-0 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
          
          {isRecording && (
            <p className="text-center text-[10px] text-primary mt-1.5 animate-pulse">
              🎤 Listening...
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
