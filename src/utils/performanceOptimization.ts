/**
 * Lightweight performance utilities - minimal overhead
 */

// Simple debounce
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Simple throttle
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Run when idle
export function runWhenIdle(callback: () => void, options?: { timeout?: number }) {
  if ("requestIdleCallback" in window) {
    requestIdleCallback(callback, { timeout: options?.timeout || 2000 });
  } else {
    setTimeout(callback, 1);
  }
}

// Check slow connection
export function hasSlowConnection(): boolean {
  const conn = (navigator as any).connection;
  if (!conn) return false;
  const type = conn.effectiveType;
  return type === "slow-2g" || type === "2g" || type === "3g";
}

// Initialize performance optimizations - lightweight
export function initPerformanceOptimizations() {
  if (typeof window === 'undefined') return;

  // Add loaded class immediately
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      document.body.classList.add('loaded');
    }, { once: true });
  } else {
    document.body.classList.add('loaded');
  }
}
