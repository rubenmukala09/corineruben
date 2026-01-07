import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export function useRouteChangeTracker() {
  const location = useLocation();
  const prevLocationRef = useRef(location.pathname);

  useEffect(() => {
    const prevPath = prevLocationRef.current;
    const currentPath = location.pathname;

    if (prevPath !== currentPath) {
      // Track with Performance API
      if (window.performance && window.performance.mark) {
        performance.mark(`route-change-${currentPath}`);
        
        if (performance.measure) {
          try {
            performance.measure(
              `navigation-to-${currentPath}`,
              undefined,
              `route-change-${currentPath}`
            );
          } catch (e) {
            // Measure might fail if marks don't exist
          }
        }
      }

      prevLocationRef.current = currentPath;
    }
  }, [location]);
}
