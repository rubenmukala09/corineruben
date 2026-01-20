import { memo } from "react";

/**
 * Simple dark tint overlay for hero text readability
 * 30% opacity black tint - no animations, no colors, just readability
 */
const HeroPurpleOverlay = memo(() => {
  return (
    <div 
      className="absolute inset-0 pointer-events-none bg-black/30"
    />
  );
});

HeroPurpleOverlay.displayName = 'HeroPurpleOverlay';

export default HeroPurpleOverlay;
