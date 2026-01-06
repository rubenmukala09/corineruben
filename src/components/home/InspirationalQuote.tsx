import { motion } from "framer-motion";
import { Quote } from "lucide-react";

interface InspirationalQuoteProps {
  quote: string;
  author: string;
  role?: string;
  variant?: "light" | "dark" | "accent";
}

export const InspirationalQuote = ({ quote, author, role, variant = "light" }: InspirationalQuoteProps) => {
  const variants = {
    light: {
      bg: "bg-white/80 backdrop-blur-sm",
      text: "text-foreground",
      subtext: "text-muted-foreground",
      quote: "text-primary/20",
      border: "border-border/50",
    },
    dark: {
      bg: "bg-slate-900/90 backdrop-blur-sm",
      text: "text-white",
      subtext: "text-slate-300",
      quote: "text-white/10",
      border: "border-slate-700",
    },
    accent: {
      bg: "bg-gradient-to-br from-primary/10 to-accent/10 backdrop-blur-sm",
      text: "text-foreground",
      subtext: "text-muted-foreground",
      quote: "text-primary/20",
      border: "border-primary/20",
    },
  };

  const v = variants[variant];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`relative ${v.bg} rounded-2xl p-6 border ${v.border} shadow-sm`}
    >
      <Quote className={`absolute top-4 left-4 w-10 h-10 ${v.quote}`} />
      <div className="relative z-10 pl-8">
        <p className={`text-lg italic leading-relaxed ${v.text} mb-4`}>
          "{quote}"
        </p>
        <div className="flex items-center gap-3">
          <div className="w-10 h-0.5 bg-primary/30 rounded-full" />
          <div>
            <p className={`font-semibold ${v.text}`}>{author}</p>
            {role && <p className={`text-sm ${v.subtext}`}>{role}</p>}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
