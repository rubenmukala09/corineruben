import { useEffect, useRef } from "react";
import { preloadRouteImages } from "./useImagePreload";
import { PAGE_NATURE_IMAGES } from "@/config/natureHeroImages";

const prefetchedRoutes = new Set<string>();

// Map routes to their page keys for nature images
const routeToPageKey: Record<string, string> = {
  "/about": "about",
  "/business": "business",
  "/training": "training",
  "/resources": "resources",
  "/careers": "careers",
  "/contact": "contact",
  "/faq": "faq",
};


export const usePrefetchRoute = (path: string) => {
  const prefetchTimerRef = useRef<NodeJS.Timeout>();

  const prefetch = () => {
    if (prefetchedRoutes.has(path)) return;

    prefetchTimerRef.current = setTimeout(() => {
      // Preload nature hero images for the route
      const pageKey = routeToPageKey[path];
      if (pageKey && PAGE_NATURE_IMAGES[pageKey]) {
        const heroImages = PAGE_NATURE_IMAGES[pageKey].map(img => img.src);
        preloadRouteImages(heroImages);
      }

      // Dynamically import the route component
      const routeMap: Record<string, () => Promise<any>> = {
        "/": () => import("../pages/Index"),
        "/training": () => import("../pages/Training"),
        "/business": () => import("../pages/Business"),
        "/about": () => import("../pages/About"),
        "/resources": () => import("../pages/Resources"),
        "/safety-vault": () => import("../pages/SafetyVault"),
        "/articles": () => import("../pages/Articles"),
        "/contact": () => import("../pages/Contact"),
        "/careers": () => import("../pages/Careers"),
        "/faq": () => import("../pages/FAQ"),
      };

      const importFn = routeMap[path];
      if (importFn) {
        importFn().then(() => {
          prefetchedRoutes.add(path);
        });
      }
    }, 100); // Small delay to avoid prefetching on quick hovers
  };

  const cancelPrefetch = () => {
    if (prefetchTimerRef.current) {
      clearTimeout(prefetchTimerRef.current);
    }
  };

  useEffect(() => {
    return () => cancelPrefetch();
  }, []);

  return { prefetch, cancelPrefetch };
};
