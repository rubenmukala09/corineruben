import { useEffect } from "react";
import { smoothScrollTo, smoothScrollToElement } from "@/utils/smoothScroll";

export const useSmoothAnchorScroll = () => {
  useEffect(() => {
    // Enhanced smooth scrolling for anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');
      
      if (anchor && anchor instanceof HTMLAnchorElement) {
        const href = anchor.getAttribute("href");
        if (href && href.startsWith("#")) {
          e.preventDefault();
          const element = document.querySelector(href);
          
          if (element) {
            smoothScrollToElement(element, 80, 800);
          }
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);
    
    return () => {
      document.removeEventListener("click", handleAnchorClick);
    };
  }, []);
};
