import { motion } from "framer-motion";
import { User, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AiMessage } from "@/hooks/useAiChat";

interface PremiumChatMessageProps {
  message: AiMessage;
  index: number;
}

export const PremiumChatMessage = ({ message, index }: PremiumChatMessageProps) => {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.4,
        delay: index * 0.05,
        type: "spring",
        stiffness: 200,
        damping: 20,
      }}
      className={cn(
        "flex gap-3 w-full",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {!isUser && (
        <motion.div
          className="shrink-0 w-9 h-9 rounded-full premium-3d-card flex items-center justify-center bg-gradient-to-br from-primary to-accent shadow-lg"
          whileHover={{ scale: 1.1, rotateY: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Sparkles className="w-5 h-5 text-white" />
        </motion.div>
      )}

      <motion.div
        className={cn(
          "relative max-w-[75%] group",
          isUser ? "ml-auto" : "mr-auto"
        )}
        whileHover={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div
          className={cn(
            "relative px-5 py-3.5 rounded-2xl",
            isUser
              ? "premium-gradient-bg text-white shadow-lg"
              : "premium-glass-refraction shadow-md"
          )}
        >
          {/* Message content */}
          <p className={cn(
            "text-sm leading-relaxed whitespace-pre-wrap",
            isUser ? "text-white" : "text-foreground"
          )}>
            {message.content}
          </p>

          {/* Timestamp */}
          <p className={cn(
            "text-[10px] mt-1.5 opacity-60",
            isUser ? "text-white/80" : "text-muted-foreground"
          )}>
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>

          {/* Shine effect on hover */}
          {!isUser && (
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden">
              <motion.div
                className="absolute -inset-full bg-gradient-to-r from-transparent via-white/10 to-transparent"
                animate={{
                  x: ["-100%", "200%"],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatDelay: 3,
                  ease: "linear",
                }}
              />
            </div>
          )}
        </div>

        {/* 3D depth shadow */}
        <div
          className={cn(
            "absolute inset-0 rounded-2xl blur-md opacity-20 -z-10",
            isUser
              ? "bg-gradient-to-br from-primary to-accent"
              : "bg-gradient-to-br from-slate-300 to-slate-400"
          )}
          style={{
            transform: "translateY(4px) scale(0.98)",
          }}
        />
      </motion.div>

      {isUser && (
        <motion.div
          className="shrink-0 w-9 h-9 rounded-full premium-3d-card flex items-center justify-center bg-gradient-to-br from-slate-700 to-slate-900 shadow-lg"
          whileHover={{ scale: 1.1, rotateY: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <User className="w-5 h-5 text-white" />
        </motion.div>
      )}
    </motion.div>
  );
};

export default PremiumChatMessage;
