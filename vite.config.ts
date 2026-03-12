import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

/**
 * Converts Vite-injected CSS <link> tags to non-render-blocking async pattern.
 * This allows the inline HTML skeleton to paint immediately (faster FCP).
 * CSS loads asynchronously and applies once downloaded — no FOUC because
 * the skeleton uses inline styles and React hydrates after CSS is ready.
 */
function asyncCssPlugin(): Plugin {
  return {
    name: 'async-css',
    enforce: 'post',
    transformIndexHtml(html) {
      // Remove malformed source preloads/scripts that can cause MIME errors in production audits
      const sanitizedHtml = html
        .replace(
          /<link[^>]*rel=["']modulepreload["'][^>]*href=["'](?:\/src\/main\.tsx|data:application\/octet-stream[^"']*)["'][^>]*>\s*/g,
          ''
        )
        .replace(
          /<script[^>]*type=["']module["'][^>]*src=["']data:application\/octet-stream[^"']*["'][^>]*><\/script>\s*/g,
          ''
        );

      // Match Vite-injected stylesheet links (hashed asset CSS files only)
      return sanitizedHtml.replace(
        /<link rel="stylesheet" crossorigin href="(\/assets\/[^"]+\.css)">/g,
        `<link rel="stylesheet" href="$1" media="print" onload="this.media='all'" crossorigin>
    <noscript><link rel="stylesheet" href="$1" crossorigin></noscript>`
      );
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  build: {
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom', 'react-router-dom'],
          'supabase': ['@supabase/supabase-js'],
          'stripe': ['@stripe/react-stripe-js', '@stripe/stripe-js'],
          'charts': ['recharts'],
          'query': ['@tanstack/react-query'],
          'icons': ['lucide-react'],
          'forms': ['react-hook-form', '@hookform/resolvers', 'zod'],
        },
      },
    },
  },
  plugins: [react(), asyncCssPlugin(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "framer-motion"],
  },
}));
