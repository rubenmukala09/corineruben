import { memo } from "react";

/**
 * Cinematic overlay for hero text readability
 * Gradient ensures text is legible while preserving image impact
 */
const HeroPurpleOverlay = memo(() => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-r from-[hsl(270_25%_8%/0.7)] via-[hsl(270_20%_10%/0.5)] to-[hsl(270_15%_12%/0.35)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-[hsl(270_25%_6%/0.4)] via-transparent to-[hsl(270_20%_8%/0.2)]" />
    </div>
  );
});

HeroPurpleOverlay.displayName = "HeroPurpleOverlay";

export default HeroPurpleOverlay;
