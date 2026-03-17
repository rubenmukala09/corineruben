import { useEffect, forwardRef } from "react";
import { useLocation } from "react-router-dom";

export const ScrollToTop = forwardRef<HTMLDivElement>((_props, _ref) => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      requestAnimationFrame(() => {
        const element = document.querySelector(hash);
        if (element) {
          const headerOffset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition =
            elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      });
    } else {
      requestAnimationFrame(() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      });
    }
  }, [pathname, hash]);

  return null;
});

ScrollToTop.displayName = "ScrollToTop";
