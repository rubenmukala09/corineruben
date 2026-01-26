import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  build: {
    sourcemap: true,
    cssCodeSplit: true,
    minify: 'esbuild',
    target: 'es2020',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          motion: ['framer-motion'],
          supabase: ['@supabase/supabase-js'],
          stripe: ['@stripe/react-stripe-js', '@stripe/stripe-js'],
          query: ['@tanstack/react-query'],
          ui: ['sonner', 'lucide-react'],
        },
      },
    },
  },
  css: {
    devSourcemap: true,
    postcss: {
      plugins: [],
    },
  },
  esbuild: {
    legalComments: 'none',
    treeShaking: true,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    // Make CSS non-render-blocking in production
    mode === "production" && {
      name: 'async-css-plugin',
      transformIndexHtml(html: string) {
        return html.replace(
          /<link rel="stylesheet"([^>]*) href="([^"]*\.css[^"]*)"([^>]*)>/g,
          '<link rel="stylesheet"$1 href="$2"$3 media="print" onload="this.media=\'all\'">'
        );
      }
    },
    ViteImageOptimizer({
      jpg: {
        quality: 75,
        progressive: true,
      },
      jpeg: {
        quality: 75,
        progressive: true,
      },
      png: {
        quality: 70,
        compressionLevel: 9,
      },
      webp: {
        quality: 75,
      },
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
