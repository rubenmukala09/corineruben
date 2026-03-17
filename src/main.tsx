import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./i18n";

// Clean refresh param
if (window.location.search.includes("r=")) {
  window.history.replaceState({}, "", window.location.pathname);
}

// Mount immediately.
// If #root already contains pre-rendered HTML (from scripts/prerender.mjs),
// hydrate it so crawlers' static content is upgraded to a live React app
// without a full re-render flash. Otherwise fall back to a fresh createRoot.
const rootEl = document.getElementById("root")!;
if (rootEl.hasChildNodes()) {
  hydrateRoot(rootEl, <App />);
} else {
  createRoot(rootEl).render(<App />);
}

// Defer non-critical initialization
if ("requestIdleCallback" in window) {
  requestIdleCallback(() => {
    // Performance optimizations
    import("./utils/performanceOptimization").then((m) =>
      m.initPerformanceOptimizations?.(),
    );

    // Service worker - production only
    if ("serviceWorker" in navigator && import.meta.env.PROD) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }
  });
} else {
  // Fallback for Safari
  setTimeout(() => {
    import("./utils/performanceOptimization").then((m) =>
      m.initPerformanceOptimizations?.(),
    );
    if ("serviceWorker" in navigator && import.meta.env.PROD) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }
  }, 100);
}
