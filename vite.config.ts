import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import prerender from "@prerenderer/rollup-plugin";
import { createClient } from "@supabase/supabase-js";

const fetchArticleRoutes = async (env: Record<string, string>) => {
  const url = env.VITE_SUPABASE_URL;
  const key = env.VITE_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    console.warn("[prerender] Missing Supabase env; skipping article route generation.");
    return [];
  }

  const limitRaw = env.PRERENDER_ARTICLE_LIMIT || env.VITE_PRERENDER_ARTICLE_LIMIT || "20";
  const limit = Number.parseInt(limitRaw, 10);
  const articleLimit = Number.isFinite(limit) ? limit : 20;

  try {
    const supabase = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    const { data, error } = await supabase
      .from("articles")
      .select("slug")
      .eq("status", "published")
      .order("published_at", { ascending: false, nullsFirst: false })
      .limit(articleLimit);

    if (error) {
      console.warn("[prerender] Failed to fetch article slugs:", error.message);
      return [];
    }

    return (data || [])
      .map((item) => item.slug)
      .filter(Boolean)
      .map((slug) => `/articles/${slug}`);
  } catch (err) {
    console.warn("[prerender] Article route generation error:", err);
    return [];
  }
};

// https://vitejs.dev/config/
export default defineConfig(async ({ mode, command }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const previewFlag = (env.VITE_PREVIEW_MODE || env.LOVABLE_PREVIEW || env.PREVIEW || "").toLowerCase();
  const isPreviewBuild = previewFlag === "true" || previewFlag === "1" || previewFlag === "yes";
  const disablePrerender = (env.VITE_DISABLE_PRERENDER || env.PRERENDER_DISABLE || "").toLowerCase() === "true";
  const disableImageOptimizer = (env.VITE_DISABLE_IMAGE_OPTIMIZER || "").toLowerCase() === "true";
  const articleRoutes = command === "build" ? await fetchArticleRoutes(env) : [];
  const prerenderRoutes = [
    "/",
    "/training",
    "/business",
    "/business/ai-receptionist",
    "/business/ai-automation",
    "/business/website-design",
    "/business/website-insurance",
    "/about",
    "/services",
    "/resources",
    "/articles",
    "/contact",
    "/careers",
    "/faq",
    "/application-pending",
    "/privacy-policy",
    "/terms-of-service",
    "/refund-policy",
    "/cookie-policy",
    "/acceptable-use",
    "/disclaimer",
    "/maintenance",
    "/payment-success",
    "/payment-canceled",
    ...articleRoutes,
  ];

  const uniquePrerenderRoutes = Array.from(new Set(prerenderRoutes));

  return {
    server: {
      host: "::",
      port: 8080,
    },
    build: {
      sourcemap: true,
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-router-dom'],
          },
        },
      },
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
          jpg: {
            quality: 80,
          },
          jpeg: {
            quality: 80,
          },
          png: {
            quality: 80,
          },
          webp: {
            quality: 80,
          },
        }),
      command === "build" &&
        mode === "production" &&
        !isPreviewBuild &&
        !disablePrerender &&
        prerender({
          routes: uniquePrerenderRoutes,
          renderer: "@prerenderer/renderer-puppeteer",
          rendererOptions: {
            renderAfterDocumentEvent: "prerender-ready",
          },
        }),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
