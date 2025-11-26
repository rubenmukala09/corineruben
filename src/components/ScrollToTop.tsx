import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { smoothScrollToElement, instantScrollToTop } from "@/utils/smoothScroll";

export const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // If there's a hash (anchor link), scroll to it smoothly with professional easing
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          smoothScrollToElement(element, 80, 800);
        }
      }, 100);
    } else {
      // Instant scroll to top on route change to prevent visual flashing
      instantScrollToTop();
    }
  }, [pathname, hash]);

  return null;
};
