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
    // Track page view on route change
    trackPageView(location.pathname + location.search, document.title);

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