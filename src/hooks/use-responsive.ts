import { useState, useEffect, useMemo, useCallback } from 'react';

/**
 * Responsive breakpoints matching our design system
 * Mobile: 0-768px
 * Tablet: 769-1024px
 * Desktop: 1025px+
 */
export interface ResponsiveConfig {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  width: number;
  breakpoint: 'mobile' | 'tablet' | 'desktop';
}

/**
 * Performance-optimized responsive hook using matchMedia API
 *
 * Features:
 * - Uses native matchMedia for better performance
 * - Prevents layout shifts with proper SSR handling
 * - Debounces resize events to reduce re-renders
 * - Memoizes computed values
 * - Zero dependencies except React
 *
 * @returns ResponsiveConfig object with device type information
 *
 * @example
 * const { isMobile, isTablet, isDesktop, breakpoint } = useResponsive();
 *
 * if (isMobile) {
 *   return <MobileView />;
 * }
 */
export function useResponsive(): ResponsiveConfig {
  // SSR-safe initial state - defaults to desktop to match most server renders
  // This prevents hydration mismatches
  const [state, setState] = useState<ResponsiveConfig>(() => {
    if (typeof window === 'undefined') {
      return {
        isMobile: false,
        isTablet: false,
        isDesktop: true,
        width: 1920,
        breakpoint: 'desktop' as const,
      };
    }

    // Get actual width on mount
    const width = window.innerWidth;
    const isMobile = width <= 768;
    const isTablet = width > 768 && width <= 1024;
    const isDesktop = width > 1024;
    const breakpoint = isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop';

    return {
      isMobile,
      isTablet,
      isDesktop,
      width,
      breakpoint,
    };
  });

  // Memoized media query matchers for performance
  const mediaQueries = useMemo(() => {
    if (typeof window === 'undefined') return null;

    return {
      mobile: window.matchMedia('(max-width: 768px)'),
      tablet: window.matchMedia('(min-width: 769px) and (max-width: 1024px)'),
      desktop: window.matchMedia('(min-width: 1025px)'),
    };
  }, []);

  // Debounced update function to prevent excessive re-renders
  const updateState = useCallback(() => {
    if (typeof window === 'undefined') return;

    const width = window.innerWidth;
    const isMobile = width <= 768;
    const isTablet = width > 768 && width <= 1024;
    const isDesktop = width > 1024;
    const breakpoint = isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop';

    setState(prev => {
      // Only update if values actually changed (prevents unnecessary re-renders)
      if (
        prev.isMobile === isMobile &&
        prev.isTablet === isTablet &&
        prev.isDesktop === isDesktop &&
        prev.width === width
      ) {
        return prev;
      }

      return {
        isMobile,
        isTablet,
        isDesktop,
        width,
        breakpoint,
      };
    });
  }, []);

  useEffect(() => {
    // Skip if not in browser (SSR)
    if (typeof window === 'undefined' || !mediaQueries) return;

    // Use matchMedia change events for better performance than resize events
    const handleMediaChange = () => {
      // Use requestAnimationFrame to batch updates and prevent layout thrashing
      requestAnimationFrame(updateState);
    };

    // Attach listeners to media queries (more efficient than resize events)
    mediaQueries.mobile.addEventListener('change', handleMediaChange);
    mediaQueries.tablet.addEventListener('change', handleMediaChange);
    mediaQueries.desktop.addEventListener('change', handleMediaChange);

    // Fallback resize handler with debouncing for older browsers
    let resizeTimeout: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        requestAnimationFrame(updateState);
      }, 150); // 150ms debounce
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // Call handler immediately to sync with actual window size
    updateState();

    // Cleanup
    return () => {
      mediaQueries.mobile.removeEventListener('change', handleMediaChange);
      mediaQueries.tablet.removeEventListener('change', handleMediaChange);
      mediaQueries.desktop.removeEventListener('change', handleMediaChange);
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, [mediaQueries, updateState]);

  return state;
}

/**
 * Lightweight hook that only returns boolean for specific breakpoint
 * Use this when you only need to check one breakpoint for better performance
 *
 * @param breakpoint - The breakpoint to check ('mobile' | 'tablet' | 'desktop')
 * @returns boolean indicating if current viewport matches the breakpoint
 *
 * @example
 * const isMobile = useMediaQuery('mobile');
 */
export function useMediaQuery(breakpoint: 'mobile' | 'tablet' | 'desktop'): boolean {
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window === 'undefined') {
      return breakpoint === 'desktop'; // SSR default
    }

    const width = window.innerWidth;
    switch (breakpoint) {
      case 'mobile':
        return width <= 768;
      case 'tablet':
        return width > 768 && width <= 1024;
      case 'desktop':
        return width > 1024;
      default:
        return false;
    }
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const query =
      breakpoint === 'mobile'
        ? '(max-width: 768px)'
        : breakpoint === 'tablet'
          ? '(min-width: 769px) and (max-width: 1024px)'
          : '(min-width: 1025px)';

    const mediaQuery = window.matchMedia(query);

    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      setMatches(e.matches);
    };

    // Set initial value
    handleChange(mediaQuery);

    // Listen for changes
    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [breakpoint]);

  return matches;
}
