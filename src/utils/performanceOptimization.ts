/**
 * Performance optimization utilities
 */

/**
 * Debounce function to limit execution rate
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function to ensure maximum execution rate
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Defer heavy computations until browser is idle
 */
export function runWhenIdle(callback: () => void, options?: { timeout?: number }) {
  if ("requestIdleCallback" in window) {
    requestIdleCallback(callback, { timeout: options?.timeout || 2000 });
  } else {
    setTimeout(callback, 1);
  }
}

/**
 * Prefetch resource for faster navigation
 */
export function prefetchResource(url: string, as: "fetch" | "image" | "script" | "style") {
  const link = document.createElement("link");
  link.rel = "prefetch";
  link.href = url;
  link.as = as;
  document.head.appendChild(link);
}

/**
 * Preload critical resource
 */
export function preloadResource(url: string, as: "fetch" | "image" | "script" | "style" | "font") {
  const link = document.createElement("link");
  link.rel = "preload";
  link.href = url;
  link.as = as;
  if (as === "font") {
    link.crossOrigin = "anonymous";
  }
  document.head.appendChild(link);
}

/**
 * Check if device is low-end
 */
export function isLowEndDevice(): boolean {
  // @ts-ignore - navigator.hardwareConcurrency is not in all browsers
  const cores = navigator.hardwareConcurrency || 4;
  // @ts-ignore - navigator.deviceMemory is experimental
  const memory = navigator.deviceMemory || 4;
  
  return cores < 4 || memory < 4;
}

/**
 * Check if user has slow connection
 */
export function hasSlowConnection(): boolean {
  // @ts-ignore - navigator.connection is experimental
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  
  if (!connection) return false;
  
  const effectiveType = connection.effectiveType;
  return effectiveType === "slow-2g" || effectiveType === "2g" || effectiveType === "3g";
}

/**
 * Get optimal timeout based on connection speed
 */
export function getOptimalTimeout(): number {
  if (hasSlowConnection()) {
    return 30000; // 30 seconds for slow connections
  }
  return 10000; // 10 seconds for normal connections
}

/**
 * Measure and log performance metrics
 */
export function logPerformanceMetrics() {
  if ("performance" in window) {
    runWhenIdle(() => {
      const perfData = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming;
      
      if (perfData) {
        console.log("Performance Metrics:", {
          DNS: `${(perfData.domainLookupEnd - perfData.domainLookupStart).toFixed(2)}ms`,
          TCP: `${(perfData.connectEnd - perfData.connectStart).toFixed(2)}ms`,
          Request: `${(perfData.responseStart - perfData.requestStart).toFixed(2)}ms`,
          Response: `${(perfData.responseEnd - perfData.responseStart).toFixed(2)}ms`,
          DOMLoad: `${(perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart).toFixed(2)}ms`,
          FullLoad: `${(perfData.loadEventEnd - perfData.loadEventStart).toFixed(2)}ms`,
          TotalTime: `${(perfData.loadEventEnd - perfData.fetchStart).toFixed(2)}ms`,
        });
      }
      
      // Web Vitals
      if ("PerformanceObserver" in window) {
        try {
          // Largest Contentful Paint
          const lcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1] as any;
            console.log("LCP:", `${lastEntry.renderTime || lastEntry.loadTime}ms`);
          });
          lcpObserver.observe({ entryTypes: ["largest-contentful-paint"] });
          
          // First Input Delay
          const fidObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach((entry: any) => {
              console.log("FID:", `${entry.processingStart - entry.startTime}ms`);
            });
          });
          fidObserver.observe({ entryTypes: ["first-input"] });
          
          // Cumulative Layout Shift
          let clsScore = 0;
          const clsObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries() as any[]) {
              if (!entry.hadRecentInput) {
                clsScore += entry.value;
              }
            }
            console.log("CLS:", clsScore.toFixed(3));
          });
          clsObserver.observe({ entryTypes: ["layout-shift"] });
        } catch (e) {
          // PerformanceObserver not supported
        }
      }
    });
  }
}

/**
 * Initialize performance monitoring
 */
export function initPerformanceMonitoring() {
  if (typeof window !== "undefined") {
    window.addEventListener("load", () => {
      logPerformanceMetrics();
    });
  }
}

/**
 * Initialize all performance optimizations
 */
export function initPerformanceOptimizations() {
  if (typeof window === 'undefined') return;

  // Preload critical assets
  const fontLink = document.createElement('link');
  fontLink.rel = 'preload';
  fontLink.as = 'font';
  fontLink.type = 'font/woff2';
  fontLink.crossOrigin = 'anonymous';
  document.head.appendChild(fontLink);

  // Setup prefetch on hover
  const prefetchedUrls = new Set<string>();
  document.addEventListener('mouseover', (e) => {
    const target = e.target as HTMLElement;
    const link = target.closest('a');
    
    if (link && link.href && !prefetchedUrls.has(link.href)) {
      if (link.href.startsWith(window.location.origin)) {
        prefetchResource(link.href, 'fetch');
        prefetchedUrls.add(link.href);
      }
    }
  }, { passive: true, capture: true });

  // Add instant button feedback
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    const button = target.closest('button, a');
    
    if (button) {
      button.classList.add('active-press');
      setTimeout(() => button.classList.remove('active-press'), 100);
    }
  }, { passive: true });

  // Log performance metrics in development
  if (import.meta.env.DEV) {
    logPerformanceMetrics();
  }

  console.log('⚡ Performance optimizations initialized');
}
