import { useEffect, useRef } from "react";

const prefetchedRoutes = new Set<string>();

export const usePrefetchRoute = (path: string) => {
  const prefetchTimerRef = useRef<NodeJS.Timeout>();

  const prefetch = () => {
    if (prefetchedRoutes.has(path)) return;

    prefetchTimerRef.current = setTimeout(() => {
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
