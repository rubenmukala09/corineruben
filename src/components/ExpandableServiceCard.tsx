import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ExpandableServiceCardProps {
  icon: React.ReactNode;
  title: string;
  summary: string;
  children: React.ReactNode;
  delay?: number;
}

export const ExpandableServiceCard = ({
  icon,
  title,
  summary,
  children,
  delay = 0,
}: ExpandableServiceCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: delay / 1000 }}
    >
      <Card 
        className={cn(
          "group transition-all duration-400 hover:shadow-[0_20px_40px_rgba(109,40,217,0.15)] overflow-hidden cursor-pointer",
          isExpanded && "shadow-lg border-primary/30"
        )}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="p-5 min-h-[120px] flex items-center">
          <div className="flex items-center gap-3 w-full">
            <div className="w-11 h-11 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-400 group-hover:rotate-[5deg]">
              {icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-lg font-bold">{title}</h3>
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  <ChevronDown className="w-5 h-5 text-muted-foreground" />
                </motion.div>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">{summary}</p>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div 
                className="px-5 pb-5 pt-3 border-t border-border/50"
                onClick={(e) => e.stopPropagation()}
              >
                {children}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
};
