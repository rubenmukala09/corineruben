import * as React from "react";

const MOBILE_BREAKPOINT = 768;

// Safe requestIdleCallback with fallback
const scheduleIdleTask = (callback: () => void): number => {
  if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
    return (window as typeof window & { requestIdleCallback: (cb: () => void, options?: { timeout: number }) => number }).requestIdleCallback(callback, { timeout: 100 });
  }
  return setTimeout(callback, 50) as unknown as number;
};

const cancelIdleTask = (id: number): void => {
  if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
    (window as typeof window & { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(id);
  } else {
    clearTimeout(id);
  }
};

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(mql.matches);
    };
    mql.addEventListener("change", onChange);
    
    // Use requestIdleCallback to defer initial read until browser is idle
    // This prevents forced reflow during initial page paint
    const idleId = scheduleIdleTask(() => {
      setIsMobile(mql.matches);
    });
    
    return () => {
      mql.removeEventListener("change", onChange);
      cancelIdleTask(idleId);
    };
  }, []);

  return !!isMobile;
}
