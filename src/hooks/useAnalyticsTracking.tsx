import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackPageView, trackScroll, getSessionId } from "@/utils/analyticsTracker";

export function useAnalyticsTracking() {
  const location = useLocation();

  useEffect(() => {
    // Initialize session
    getSessionId();
  }, []);

  useEffect(() => {
    // Defer tracking to avoid blocking critical rendering path
    const deferTracking = () => {
      trackPageView(location.pathname + location.search, document.title);
    };
    
    // Use requestIdleCallback if available, otherwise setTimeout
    const scheduleTracking = 'requestIdleCallback' in window
      ? (window as any).requestIdleCallback(deferTracking, { timeout: 2000 })
      : setTimeout(deferTracking, 100);
    
    const cancelTracking = () => {
      if ('requestIdleCallback' in window) {
        (window as any).cancelIdleCallback(scheduleTracking);
      } else {
        clearTimeout(scheduleTracking);
      }
    };

    // Track scroll depth
    let maxScroll = 0;
    let ticking = false;
    
    const updateScrollDepth = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollPercent = Math.round(
        (scrollTop / (documentHeight - windowHeight)) * 100
      );

      if (scrollPercent > maxScroll && [25, 50, 75, 100].includes(scrollPercent)) {
        maxScroll = scrollPercent;
        trackScroll(scrollPercent);
      }
      ticking = false;
    };
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollDepth);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      cancelTracking();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location]);
}