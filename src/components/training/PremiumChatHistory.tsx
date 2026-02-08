import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Bot } from "lucide-react";
import { PremiumChatMessage } from "./PremiumChatMessage";
import type { AiMessage, AiChatStatus } from "@/hooks/useAiChat";

interface PremiumChatHistoryProps {
  messages: AiMessage[];
  status: AiChatStatus;
}

export const PremiumChatHistory = ({ messages, status }: PremiumChatHistoryProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, status]);

  const isThinking = status === "thinking" || status === "responding";

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-6xl mx-auto h-[700px] overflow-y-auto px-4 py-6 space-y-6 scroll-smooth premium-custom-scrollbar"
    >
      {messages.length === 0 && !isThinking && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center justify-center h-full gap-4"
        >
          <motion.div
            className="w-20 h-20 rounded-full premium-aurora premium-3d-card flex items-center justify-center"
            animate={{
              rotateY: [0, 360],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <Bot className="w-10 h-10 text-primary" />
          </motion.div>
          <div className="text-center space-y-2">
            <h3 className="text-xl font-semibold premium-gradient-text premium-hd-text">
              AI Scam Prevention Assistant
            </h3>
            <p className="text-sm text-muted-foreground max-w-md">
              Ask me anything about scam detection, suspicious messages, or file security.
              I'm here to help protect you and your loved ones.
            </p>
          </div>
        </motion.div>
      )}

      <AnimatePresence mode="popLayout">
        {messages.map((message, index) => (
          <PremiumChatMessage key={message.id} message={message} index={index} />
        ))}
      </AnimatePresence>

      {/* Thinking indicator */}
      {isThinking && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="flex gap-3 items-start"
        >
          <div className="shrink-0 w-9 h-9 rounded-full premium-3d-card flex items-center justify-center bg-gradient-to-br from-primary to-accent shadow-lg">
            <Loader2 className="w-5 h-5 text-white animate-spin" />
          </div>
          <div className="premium-glass-refraction px-5 py-3.5 rounded-2xl shadow-md">
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                <motion.div
                  className="w-2 h-2 rounded-full bg-primary"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: 0,
                  }}
                />
                <motion.div
                  className="w-2 h-2 rounded-full bg-accent"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: 0.2,
                  }}
                />
                <motion.div
                  className="w-2 h-2 rounded-full bg-primary"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: 0.4,
                  }}
                />
              </div>
              <span className="text-xs text-muted-foreground ml-2">
                {status === "thinking" ? "Thinking..." : "Generating response..."}
              </span>
            </div>
          </div>
        </motion.div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
};

export default PremiumChatHistory;
