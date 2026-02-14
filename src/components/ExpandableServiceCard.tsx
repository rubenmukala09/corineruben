import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ExpandableServiceCardProps {
  icon: React.ReactNode;
  title: string;
  summary: string;
  children: React.ReactNode;
  delay?: number;
  image?: string;
}

export const ExpandableServiceCard = ({
  icon,
  title,
  summary,
  children,
  image,
}: ExpandableServiceCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card
      className={cn(
        "bg-card rounded-2xl border border-border/60 hover:border-primary/30 hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer",
        isExpanded && "border-primary/40 shadow-lg",
      )}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {image && (
        <div className="relative h-40 overflow-hidden">
          <img
            src={image}
            alt={title}
            width={768}
            height={512}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
        </div>
      )}

      <div className="p-5 min-h-[120px] flex items-center">
        <div className="flex items-center gap-4 w-full">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
            {icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-lg font-bold">{title}</h3>
              <ChevronDown
                className={cn(
                  "w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-300",
                  isExpanded && "rotate-180",
                )}
              />
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
              {summary}
            </p>
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="overflow-hidden">
          <div
            className="px-5 pb-5 pt-3 border-t border-border/50"
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </div>
        </div>
      )}
    </Card>
  );
};
