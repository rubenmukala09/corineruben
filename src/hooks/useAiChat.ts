import { useState, useCallback, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface AiMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export type AiChatStatus = "idle" | "thinking" | "responding" | "error";

export const useAiChat = () => {
  const [messages, setMessages] = useState<AiMessage[]>([]);
  const [status, setStatus] = useState<AiChatStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const sendMessage = useCallback(async (userMessage: string) => {
    if (!userMessage.trim() || status === "thinking" || status === "responding") {
      return;
    }

    const userMsg: AiMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: userMessage.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setStatus("thinking");
    setError(null);

    // Create abort controller for this request
    abortControllerRef.current = new AbortController();

    try {
      // Build the messages array in the format expected by the AI function
      const allMessages = [
        ...messages.map((m) => ({
          role: m.role,
          content: m.content,
        })),
        {
          role: "user",
          content: userMessage.trim(),
        },
      ];

      setStatus("responding");

      // Get the supabase URL and auth token
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
      const session = await supabase.auth.getSession();
      const token = session.data.session?.access_token || supabaseKey;

      const response = await fetch(`${supabaseUrl}/functions/v1/ai-chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          messages: allMessages,
          type: "chat",
        }),
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: "Unknown error" }));
        throw new Error(errorData.error || `HTTP ${response.status}`);
      }

      // Handle streaming response
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let fullResponse = "";
      const assistantMsgId = `assistant-${Date.now()}`;

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split("\n");

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const data = line.slice(6);
              if (data === "[DONE]") continue;

              try {
                const parsed = JSON.parse(data);
                const content = parsed.choices?.[0]?.delta?.content || "";
                if (content) {
                  fullResponse += content;
                  // Update the message in real-time
                  setMessages((prev) => {
                    const existing = prev.find((m) => m.id === assistantMsgId);
                    if (existing) {
                      return prev.map((m) =>
                        m.id === assistantMsgId
                          ? { ...m, content: fullResponse }
                          : m
                      );
                    }
                    return [
                      ...prev,
                      {
                        id: assistantMsgId,
                        role: "assistant",
                        content: fullResponse,
                        timestamp: new Date(),
                      },
                    ];
                  });
                }
              } catch (e) {
                // Ignore JSON parse errors for incomplete chunks
              }
            }
          }
        }
      }

      setStatus("idle");
    } catch (err: any) {
      if (err.name === "AbortError") {
        setStatus("idle");
        return;
      }

      const errorMessage = err?.message || "Failed to get AI response. Please try again.";
      setStatus("error");
      setError(errorMessage);
      toast.error(errorMessage);

      // Remove the user message that failed
      setMessages((prev) => prev.filter((m) => m.id !== userMsg.id));
    } finally {
      abortControllerRef.current = null;
    }
  }, [messages, status]);

  const clearChat = useCallback(() => {
    setMessages([]);
    setStatus("idle");
    setError(null);
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
  }, []);

  const stopGenerating = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setStatus("idle");
  }, []);

  return {
    messages,
    status,
    error,
    sendMessage,
    clearChat,
    stopGenerating,
  };
};

export default useAiChat;
