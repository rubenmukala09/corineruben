import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackPageView, initGA } from "@/utils/analytics";

// Google Analytics Measurement ID (replace with your actual ID)
const GA_MEASUREMENT_ID = "G-XXXXXXXXXX"; // TODO: Replace with actual GA4 ID

export function useAnalytics() {
  const location = useLocation();

  useEffect(() => {
    // Initialize Google Analytics on mount
    initGA(GA_MEASUREMENT_ID);
  }, []);

  useEffect(() => {
    // Track page views on route change
    const title = document.title;
    trackPageView(location.pathname + location.search, title);

    // Track scroll depth
    let scrollDepth = 0;
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollPercent = Math.round(
        (scrollTop / (documentHeight - windowHeight)) * 100
      );

      // Track at 25%, 50%, 75%, 100%
      if (
        scrollPercent >= 25 &&
        scrollDepth < 25 &&
        scrollPercent < 50
      ) {
        scrollDepth = 25;
        if (window.gtag) {
          window.gtag("event", "scroll_depth", { percentage: 25 });
        }
      } else if (
        scrollPercent >= 50 &&
        scrollDepth < 50 &&
        scrollPercent < 75
      ) {
        scrollDepth = 50;
        if (window.gtag) {
          window.gtag("event", "scroll_depth", { percentage: 50 });
        }
      } else if (
        scrollPercent >= 75 &&
        scrollDepth < 75 &&
        scrollPercent < 100
      ) {
        scrollDepth = 75;
        if (window.gtag) {
          window.gtag("event", "scroll_depth", { percentage: 75 });
        }
      } else if (scrollPercent >= 99 && scrollDepth < 100) {
        scrollDepth = 100;
        if (window.gtag) {
          window.gtag("event", "scroll_depth", { percentage: 100 });
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location]);
}
