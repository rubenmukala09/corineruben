import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Hook for instant page navigation
 * Prefetches routes on hover for zero-delay navigation
 */
export function useInstantNavigation() {
  const navigate = useNavigate();

  useEffect(() => {
    const prefetchedRoutes = new Set<string>();

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a[href^="/"]') as HTMLAnchorElement;

      if (link && link.href && !prefetchedRoutes.has(link.href)) {
        const url = new URL(link.href);
        const path = url.pathname;

        // Prefetch the route
        if (!prefetchedRoutes.has(path)) {
          // Create invisible link to trigger route prefetch
          const prefetchLink = document.createElement('link');
          prefetchLink.rel = 'prefetch';
          prefetchLink.href = path;
          document.head.appendChild(prefetchLink);
          
          prefetchedRoutes.add(path);
          
          // Clean up after 5 seconds
          setTimeout(() => {
            document.head.removeChild(prefetchLink);
          }, 5000);
        }
      }
    };

    // Listen for all mouseenter events on links
    document.addEventListener('mouseover', handleMouseEnter, { 
      passive: true,
      capture: true 
    });

    return () => {
      document.removeEventListener('mouseover', handleMouseEnter);
    };
  }, []);

  return { navigate };
}
