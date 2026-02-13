import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
} from "react";
import { useLocation } from "react-router-dom";

type PrerenderContextValue = {
  block: () => () => void;
  signalReady: () => void;
};

const PrerenderContext = createContext<PrerenderContextValue | null>(null);

const firePrerenderReady = () => {
  if (typeof document === "undefined") return;
  if ((window as any).__prerenderReadyFired) return;
  (window as any).__prerenderReadyFired = true;
  document.dispatchEvent(new Event("prerender-ready"));
};

export function PrerenderProvider({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const pendingRef = useRef(0);

  useEffect(() => {
    pendingRef.current = 0;
    (window as any).__prerenderReadyFired = false;

    const finalizeReady = () => {
      if (pendingRef.current === 0) {
        firePrerenderReady();
      }
    };

    const onReady = () => {
      const fonts = (document as Document & { fonts?: FontFaceSet }).fonts;
      if (fonts?.ready) {
        fonts.ready.then(finalizeReady).catch(finalizeReady);
      } else {
        finalizeReady();
      }
    };

    if (document.readyState === "complete") {
      setTimeout(onReady, 0);
    } else {
      window.addEventListener("load", () => setTimeout(onReady, 0), {
        once: true,
      });
    }

    const fallback = window.setTimeout(() => {
      if (pendingRef.current === 0) {
        firePrerenderReady();
      }
    }, 5000);

    return () => {
      window.clearTimeout(fallback);
    };
  }, [location.pathname]);

  const block = useCallback(() => {
    pendingRef.current += 1;
    let released = false;
    return () => {
      if (released) return;
      released = true;
      pendingRef.current = Math.max(0, pendingRef.current - 1);
      if (pendingRef.current === 0) {
        firePrerenderReady();
      }
    };
  }, []);

  const signalReady = useCallback(() => {
    if (pendingRef.current === 0) {
      firePrerenderReady();
    }
  }, []);

  const value = useMemo(() => ({ block, signalReady }), [block, signalReady]);

  return (
    <PrerenderContext.Provider value={value}>
      {children}
    </PrerenderContext.Provider>
  );
}

export function usePrerenderBlocker(isBlocking: boolean) {
  const ctx = useContext(PrerenderContext);
  const releaseRef = useRef<null | (() => void)>(null);

  useLayoutEffect(() => {
    if (!ctx) return;

    if (isBlocking && !releaseRef.current) {
      releaseRef.current = ctx.block();
    }

    if (!isBlocking && releaseRef.current) {
      releaseRef.current();
      releaseRef.current = null;
    }

    return () => {
      if (releaseRef.current) {
        releaseRef.current();
        releaseRef.current = null;
      }
    };
  }, [ctx, isBlocking]);
}

export function usePrerenderReady(ready: boolean) {
  const ctx = useContext(PrerenderContext);

  useEffect(() => {
    if (ready) {
      ctx?.signalReady();
    }
  }, [ready, ctx]);
}
