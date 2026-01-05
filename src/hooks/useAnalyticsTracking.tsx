import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackPageView, trackScroll, getSessionId } from "@/utils/analyticsTracker";

// Defer analytics to idle time to avoid blocking critical path
const scheduleIdleTask = (callback: () => void) => {
  if ('requestIdleCallback' in window) {
    (window as any).requestIdleCallback(callback, { timeout: 3000 });
  } else {
    setTimeout(callback, 1000);
  }
};

export function useAnalyticsTracking() {
  const location = useLocation();

  useEffect(() => {
    // Initialize session - defer to idle (runs once on mount)
    scheduleIdleTask(() => getSessionId());
  }, []);

  useEffect(() => {
    // Defer page view tracking to idle time (out of critical path)
    scheduleIdleTask(() => {
      trackPageView(location.pathname + location.search, document.title);
    });

    // Track scroll depth
    let maxScroll = 0;
    const handleScroll = () => {
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
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location]);
}