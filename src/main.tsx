import './dev-refresh-guard';
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Clean refresh param from URL
if (window.location.search.includes('r=')) {
  window.history.replaceState({}, '', window.location.pathname);
}

// Lazy load performance optimizations
import("./utils/performanceOptimization").then(m => m.initPerformanceOptimizations?.());

// Service worker: production only, deferred
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  });
}

createRoot(document.getElementById("root")!).render(<App />);
