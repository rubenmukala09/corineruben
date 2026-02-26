import { memo } from "react";

/**
 * Simple dark tint overlay for hero text readability
 * Softer tint to keep readability while reducing heavy dark look
 */
const HeroPurpleOverlay = memo(() => {
  return <div className="absolute inset-0 pointer-events-none bg-black/20" />;
});

HeroPurpleOverlay.displayName = "HeroPurpleOverlay";

export default HeroPurpleOverlay;
