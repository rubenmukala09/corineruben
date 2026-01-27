import { lazy, Suspense, useState, useEffect } from "react";
import lauraAvatar from "@/assets/laura-avatar-sm.webp";

const AIChat = lazy(() => import("./AIChat").then(m => ({ default: m.AIChat })));

/**
 * Placeholder FAB that reserves space to prevent CLS while AIChat loads
 * Uses the actual avatar image to prevent layout shift when component mounts
 */
const ChatFABPlaceholder = () => (
  <div className="fixed bottom-6 right-6 z-[9998]">
    <div 
      className="relative rounded-full shadow-lg overflow-hidden ring-2 ring-primary/20"
      style={{ width: 56, height: 56, contain: 'strict' }}
      aria-hidden="true"
    >
      <img 
        src={lauraAvatar}
        alt=""
        width={56}
        height={56}
        loading="eager"
        style={{ width: 56, height: 56, objectFit: 'cover', objectPosition: 'top' }}
      />
    </div>
  </div>
);

/**
 * LazyAIChat - Defers AIChat loading until browser is idle
 * This reduces initial main-thread work by not loading the 622-line AIChat component immediately
 * Shows a placeholder to prevent CLS (Cumulative Layout Shift)
 */
export const LazyAIChat = () => {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    // Defer loading until browser is idle or after 2 seconds
    if ('requestIdleCallback' in window) {
      const idleId = (window as any).requestIdleCallback(
        () => setShouldLoad(true),
        { timeout: 2000 }
      );
      return () => (window as any).cancelIdleCallback(idleId);
    } else {
      const timeoutId = setTimeout(() => setShouldLoad(true), 1000);
      return () => clearTimeout(timeoutId);
    }
  }, []);

  // Show placeholder with reserved space to prevent CLS
  if (!shouldLoad) return <ChatFABPlaceholder />;

  return (
    <Suspense fallback={<ChatFABPlaceholder />}>
      <AIChat />
    </Suspense>
  );
};
