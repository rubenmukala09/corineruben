import './dev-refresh-guard';
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initPerformanceOptimizations } from "./utils/performanceOptimization";

// Initialize performance optimizations
if (typeof window !== 'undefined') {
  initPerformanceOptimizations();
  
  // Preload critical hero video for faster LCP
  const videoPreload = document.createElement('link');
  videoPreload.rel = 'preload';
  videoPreload.as = 'video';
  videoPreload.href = '/assets/people-studying-video.mp4';
  videoPreload.type = 'video/mp4';
  document.head.appendChild(videoPreload);
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
