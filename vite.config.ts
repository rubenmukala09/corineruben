import { defineConfig, loadEnv, Plugin } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";

// Plugin to defer non-critical CSS (critical CSS is already inlined in index.html)
function deferCssPlugin(): Plugin {
  return {
    name: "defer-css",
    enforce: "post",
    transformIndexHtml(html) {
      // Convert <link rel="stylesheet" href="..."> to async loading pattern
      // Only for Vite-generated asset CSS, not external fonts
      return html.replace(
        /<link rel="stylesheet"(?: crossorigin)? href="(\/assets\/[^"]+\.css)">/g,
        `<link rel="stylesheet" href="$1" media="print" onload="this.media='all'"><noscript><link rel="stylesheet" href="$1"></noscript>`
      );
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const previewFlag = (
    env.VITE_PREVIEW_MODE ||
    env.LOVABLE_PREVIEW ||
    env.PREVIEW ||
    ""
  ).toLowerCase();
  const isPreviewBuild =
    previewFlag === "true" || previewFlag === "1" || previewFlag === "yes";
  const disableImageOptimizer =
    (env.VITE_DISABLE_IMAGE_OPTIMIZER || "").toLowerCase() === "true";

  return {
    server: {
      host: "::",
      port: 8080,
    },
    build: {
      sourcemap: false,
      cssCodeSplit: true,
      minify: "esbuild",
      target: "es2020",
      cssMinify: true,
      reportCompressedSize: false,
      rollupOptions: {
        output: {
          manualChunks: {
            "react-vendor": ["react", "react-dom"],
            "router-vendor": ["react-router-dom"],
            "supabase-vendor": ["@supabase/supabase-js"],
            "query-vendor": ["@tanstack/react-query"],
            "animation-vendor": ["framer-motion"],
            "icons-vendor": ["lucide-react"],
          },
          // Optimize chunk file names for caching
          chunkFileNames: "assets/js/[name]-[hash].js",
          entryFileNames: "assets/js/[name]-[hash].js",
          assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
        },
      },
      // Enable chunk size warnings
      chunkSizeWarningLimit: 1000,
    },
    esbuild: {
      drop: mode === "production" ? ["console", "debugger"] : [],
    },
    css: {
      devSourcemap: true,
    },
    plugins: [
      react(),
      mode === "development" && componentTagger(),
      mode === "production" && deferCssPlugin(),
      !isPreviewBuild &&
        !disableImageOptimizer &&
        ViteImageOptimizer({
          jpg: { quality: 55, progressive: true },
          jpeg: { quality: 55, progressive: true },
          png: { quality: 60, compressionLevel: 9 },
          webp: { quality: 55 },
          avif: { quality: 50 },
        }),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
      dedupe: ["react", "react-dom", "react/jsx-runtime"],
    },
  };
});
