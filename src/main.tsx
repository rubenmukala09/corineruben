import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Non-critical CSS - loaded immediately but non-render-blocking
import("./styles/animations.css");
import("./styles/components.css");
import("./styles/utilities.css");
import("./styles/trending-ui.css");

// Clean refresh param
if (window.location.search.includes("r=")) {
  window.history.replaceState({}, "", window.location.pathname);
}

// Mount immediately
createRoot(document.getElementById("root")!).render(<App />);

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
