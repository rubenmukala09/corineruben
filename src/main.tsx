import './dev-refresh-guard';
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initPerformanceOptimizations } from "./utils/performanceOptimization";

// Initialize performance optimizations (deferred to not block FCP)
if (typeof window !== 'undefined') {
  // Use requestIdleCallback to defer non-critical initialization
  const initWhenIdle = () => initPerformanceOptimizations();
  if ('requestIdleCallback' in window) {
    requestIdleCallback(initWhenIdle, { timeout: 2000 });
  } else {
    setTimeout(initWhenIdle, 100);
  }
}

// Register service worker only in production
if ('serviceWorker' in navigator) {
  if (import.meta.env.PROD) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').catch(() => {
        // Silently fail if service worker registration fails
      });
    });
  } else {
    // Unregister service workers in development to prevent interference
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      registrations.forEach((registration) => registration.unregister());
    });
    // Clear all caches in development
    if ('caches' in window) {
      caches.keys().then((keys) => {
        keys.forEach((key) => caches.delete(key));
      });
    }
  }
}

createRoot(document.getElementById("root")!).render(<App />);
