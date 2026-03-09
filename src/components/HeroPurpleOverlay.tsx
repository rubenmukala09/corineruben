import { memo } from "react";

/**
 * Cinematic overlay for hero text readability
 * Warm gradient ensures text is legible while preserving image impact
 */
const HeroPurpleOverlay = memo(() => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-r from-[hsl(220_30%_10%/0.65)] via-[hsl(220_25%_14%/0.45)] to-[hsl(220_20%_16%/0.3)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-[hsl(220_30%_8%/0.35)] via-transparent to-[hsl(220_25%_12%/0.15)]" />
    </div>
  );
});

HeroPurpleOverlay.displayName = "HeroPurpleOverlay";

export default HeroPurpleOverlay;
