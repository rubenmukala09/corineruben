import { User, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AiMessage } from "@/hooks/useAiChat";

interface PremiumChatMessageProps {
  message: AiMessage;
  index: number;
}

export const PremiumChatMessage = ({
  message,
  index,
}: PremiumChatMessageProps) => {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "flex gap-3 w-full animate-fade-in",
        isUser ? "justify-end" : "justify-start",
      )}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {!isUser && (
        <div className="shrink-0 w-9 h-9 rounded-full premium-3d-card flex items-center justify-center bg-gradient-to-br from-primary to-accent shadow-lg">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
      )}

      <div
        className={cn(
          "relative max-w-[75%] group",
          isUser ? "ml-auto" : "mr-auto",
        )}
      >
        <div
          className={cn(
            "relative px-5 py-3.5 rounded-2xl",
            isUser
              ? "premium-gradient-bg text-white shadow-lg"
              : "premium-glass-refraction shadow-md",
          )}
        >
          <p
            className={cn(
              "text-sm leading-relaxed whitespace-pre-wrap",
              isUser ? "text-white" : "text-foreground",
            )}
          >
            {message.content}
          </p>

          <p
            className={cn(
              "text-[10px] mt-1.5 opacity-60",
              isUser ? "text-white/80" : "text-muted-foreground",
            )}
          >
            {message.timestamp.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>

        {/* 3D depth shadow */}
        <div
          className={cn(
            "absolute inset-0 rounded-2xl blur-md opacity-20 -z-10",
            isUser
              ? "bg-gradient-to-br from-primary to-accent"
              : "bg-gradient-to-br from-slate-300 to-slate-400",
          )}
          style={{
            transform: "translateY(4px) scale(0.98)",
          }}
        />
      </div>

      {isUser && (
        <div className="shrink-0 w-9 h-9 rounded-full premium-3d-card flex items-center justify-center bg-gradient-to-br from-slate-700 to-slate-900 shadow-lg">
          <User className="w-5 h-5 text-white" />
        </div>
      )}
    </div>
  );
};

export default PremiumChatMessage;
