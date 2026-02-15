import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";

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
      sourcemap: true,
      cssCodeSplit: true,
      minify: "esbuild",
      target: "es2015",
      cssMinify: true,
      rollupOptions: {
        output: {
          manualChunks: {
            "react-vendor": ["react", "react-dom"],
            animation: ["framer-motion"],
            stripe: ["@stripe/react-stripe-js", "@stripe/stripe-js"],
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
    },
  };
});
