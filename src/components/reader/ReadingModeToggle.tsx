import { Sun, Moon, CloudSun, Type, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type ReadingMode = "day" | "night" | "dimmed";
export type FontSize = "sm" | "md" | "lg";

interface ReadingModeToggleProps {
  mode: ReadingMode;
  onModeChange: (mode: ReadingMode) => void;
  fontSize: FontSize;
  onFontSizeChange: (size: FontSize) => void;
}

const modes: { value: ReadingMode; icon: typeof Sun; label: string }[] = [
  { value: "day", icon: Sun, label: "Day" },
  { value: "dimmed", icon: CloudSun, label: "Dimmed" },
  { value: "night", icon: Moon, label: "Night" },
];

const fontSizes: FontSize[] = ["sm", "md", "lg"];

export function ReadingModeToggle({ mode, onModeChange, fontSize, onFontSizeChange }: ReadingModeToggleProps) {
  const currentIdx = fontSizes.indexOf(fontSize);

  return (
    <div className="flex items-center gap-1">
      {/* Reading mode switcher */}
      <div className="flex items-center rounded-lg border border-border/50 overflow-hidden">
        {modes.map(({ value, icon: Icon, label }) => (
          <button
            key={value}
            onClick={() => onModeChange(value)}
            className={cn(
              "flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium transition-colors",
              mode === value
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted text-muted-foreground"
            )}
            title={label}
          >
            <Icon className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">{label}</span>
          </button>
        ))}
      </div>

      {/* Font size controls */}
      <div className="flex items-center rounded-lg border border-border/50 overflow-hidden ml-1">
        <button
          onClick={() => currentIdx > 0 && onFontSizeChange(fontSizes[currentIdx - 1])}
          disabled={currentIdx === 0}
          className="px-2 py-1.5 hover:bg-muted text-muted-foreground disabled:opacity-30 transition-colors"
          title="Decrease font size"
        >
          <Minus className="h-3 w-3" />
        </button>
        <span className="px-1.5 text-xs font-medium text-foreground flex items-center gap-0.5">
          <Type className="h-3 w-3" />
          {fontSize.toUpperCase()}
        </span>
        <button
          onClick={() => currentIdx < fontSizes.length - 1 && onFontSizeChange(fontSizes[currentIdx + 1])}
          disabled={currentIdx === fontSizes.length - 1}
          className="px-2 py-1.5 hover:bg-muted text-muted-foreground disabled:opacity-30 transition-colors"
          title="Increase font size"
        >
          <Plus className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}

export const MODE_CLASSES: Record<ReadingMode, string> = {
  day: "bg-white text-foreground",
  night: "bg-[hsl(240_20%_10%)] text-gray-200",
  dimmed: "bg-[hsl(36_33%_92%)] text-[hsl(28_25%_32%)]",
};

export const CARD_CLASSES: Record<ReadingMode, string> = {
  day: "bg-card border-border",
  night: "bg-[hsl(240_20%_14%)] border-[hsl(240_15%_22%)] text-gray-200",
  dimmed: "bg-[hsl(36_33%_88%)] border-[hsl(36_20%_78%)] text-[hsl(28_25%_32%)]",
};

export const FONT_SIZE_CLASSES: Record<FontSize, string> = {
  sm: "text-sm leading-relaxed",
  md: "text-base leading-relaxed",
  lg: "text-lg leading-loose",
};
