/**
 * prerender.mjs
 *
 * Puppeteer-based static pre-renderer for InVision Network.
 *
 * How it works:
 *  1. Starts `vite preview` to serve the production build on port 4173.
 *  2. For every static public route, opens the page in headless Chrome.
 *  3. Waits for the app's own `prerender-ready` DOM event (fired by
 *     PrerenderContext when React has fully painted + fonts are loaded),
 *     with a 12-second hard timeout as a safety net.
 *  4. Captures `document.documentElement.outerHTML` and writes it to
 *     dist/<route>/index.html so Netlify can serve it as a static file.
 *
 * Result: crawlers receive fully-rendered HTML with real text content,
 * meta tags, and JSON-LD already embedded — no JavaScript required.
 *
 * Run manually:   node scripts/prerender.mjs
 * Run after build: npm run build && npm run prerender
 */

import puppeteer from "puppeteer";
import { spawn } from "child_process";
import { writeFileSync, mkdirSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST_DIR   = join(__dirname, "..", "dist");
const BASE_URL   = "http://localhost:4173";
const TIMEOUT_MS = 12_000; // per-page timeout (ms)

/**
 * All static public routes to pre-render.
 * Excludes:
 *  - /portal/*  — requires authentication
 *  - /admin/*   — requires authentication
 *  - /articles/:slug, /portfolio/:slug — dynamic (DB-driven); the index
 *    pages (/articles, /portfolio) ARE included so crawlers can discover links
 *  - /auth, /reset-password, /payment-* — transactional pages
 *  - /maintenance, /demo/*, /style-showcase — internal/demo pages
 */
const ROUTES = [
  // Core
  "/",
  "/about",
  "/contact",
  "/services",
  "/resources",
  "/articles",
  "/portfolio",
  "/careers",
  "/faq",
  "/help",
  // Training
  "/training",
  "/training/ai-analysis",
  // Business services
  "/business",
  "/business/ai-receptionist",
  "/business/ai-automation",
  "/business/website-design",
  "/business/website-insurance",
  "/business/autonomous-defense-hub",
  // Individual services
  "/services/cognitive-sentinel",
  "/services/scam-insurance",
  "/services/ai-safe-certification",
  "/services/family-emergency-network",
  "/services/digital-estate",
  // Digital library
  "/library",
  "/resources/digital-self-defense",
  "/resources/scam-proof",
  "/resources/ai-for-everyday-life",
  "/resources/securing-home-network",
  "/resources/privacy-digital-age",
  "/resources/cybersecurity-small-business",
  "/resources/social-media-safety",
  "/resources/understanding-ai-threats",
  "/resources/seniors-guide-safe-computing",
  "/resources/ransomware-data-recovery",
  // Legal
  "/privacy-policy",
  "/terms-of-service",
  "/refund-policy",
  "/cookie-policy",
  "/acceptable-use",
  "/disclaimer",
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Spin up `vite preview` and resolve once the server is listening. */
function startPreviewServer() {
  return new Promise((resolve) => {
    // On Windows, spawn needs shell:true for npx / .cmd scripts to resolve
    const isWindows = process.platform === "win32";
    const server = spawn(
      "npx",
      ["vite", "preview", "--port", "4173", "--strictPort"],
      { stdio: ["ignore", "pipe", "pipe"], shell: isWindows }
    );

    let resolved = false;
    const tryResolve = (data) => {
      if (resolved) return;
      if (data.toString().includes("4173")) {
        resolved = true;
        // Brief pause so the server is fully ready to accept connections
        setTimeout(() => resolve(server), 400);
      }
    };

    server.stdout.on("data", tryResolve);
    server.stderr.on("data", tryResolve);

    // Hard fallback: assume ready after 5 s regardless of output
    setTimeout(() => {
      if (!resolved) { resolved = true; resolve(server); }
    }, 5_000);

    server.on("error", (err) => {
      console.error("Preview server error:", err.message);
      resolve(server); // continue anyway — may already be running
    });
  });
}

/** Return the filesystem path where the pre-rendered HTML should be written. */
function outputPath(route) {
  if (route === "/") return join(DIST_DIR, "index.html");
  const segments = route.replace(/^\//, "").split("/");
  const dir = join(DIST_DIR, ...segments);
  mkdirSync(dir, { recursive: true });
  return join(dir, "index.html");
}

/**
 * Visit one route, wait for `prerender-ready`, then save the rendered HTML.
 * Returns true on success, false on failure.
 */
async function renderRoute(page, route) {
  process.stdout.write(`  ${route.padEnd(45)}`);

  // Tell React's PrerenderProvider we're in a prerender run
  await page.evaluateOnNewDocument(() => {
    window.__PRERENDER__ = true;
  });

  try {
    await page.goto(`${BASE_URL}${route}`, {
      waitUntil: "domcontentloaded",
      timeout: TIMEOUT_MS,
    });
  } catch {
    // domcontentloaded timeout is non-fatal — React may have already painted
  }

  // Wait for PrerenderContext to fire "prerender-ready"
  // (see src/contexts/PrerenderContext.tsx → firePrerenderReady)
  // Falls back to resolving after TIMEOUT_MS regardless.
  try {
    await page.evaluate((timeoutMs) => {
      return new Promise((resolve) => {
        // Already fired before we attached the listener
        if (document.readyState === "complete" && (window).__prerenderReadyFired) {
          return resolve();
        }
        const onReady = () => { clearTimeout(fallback); resolve(); };
        document.addEventListener("prerender-ready", onReady, { once: true });
        const fallback = setTimeout(resolve, timeoutMs);
      });
    }, TIMEOUT_MS);
  } catch {
    // page.evaluate may throw on navigation — best-effort
  }

  // Extra tick so React can flush any remaining synchronous work
  await new Promise((r) => setTimeout(r, 200));

  const html = await page.content();
  writeFileSync(outputPath(route), html, "utf-8");
  console.log("✓");
  return true;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  // Guard: dist/ must exist
  if (!existsSync(DIST_DIR)) {
    console.error('\n❌  dist/ not found. Run "npm run build" first.\n');
    process.exit(1);
  }

  console.log("\n🔍  Starting pre-render for InVision Network\n");
  console.log("⚙️   Starting vite preview server...");
  const server = await startPreviewServer();
  console.log(`     → http://localhost:4173\n`);

  const browser = await puppeteer.launch({
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-gpu",
    ],
    // Allow a custom Chromium path (e.g., system Chrome on some CI images)
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
  });

  let passed = 0;
  let failed = 0;

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });

    // Silence app-level console noise during prerender
    page.on("console", () => {});
    page.on("pageerror", () => {});

    // Block heavy resources that don't affect rendered text:
    //  • images / fonts / media  → not needed for HTML content
    //  • analytics               → avoid side-effects in CI
    await page.setRequestInterception(true);
    page.on("request", (req) => {
      const type = req.resourceType();
      const url  = req.url();
      if (
        type === "image" ||
        type === "font"  ||
        type === "media" ||
        url.includes("googletagmanager") ||
        url.includes("google-analytics")
      ) {
        req.abort();
      } else {
        req.continue();
      }
    });

    console.log(`📄  Pre-rendering ${ROUTES.length} routes:\n`);

    for (const route of ROUTES) {
      try {
        const ok = await renderRoute(page, route);
        if (ok) passed++; else failed++;
      } catch (err) {
        console.log(`✗  (${err.message})`);
        failed++;
      }
    }
  } finally {
    await browser.close();
    server.kill("SIGTERM");
  }

  const total = passed + failed;
  console.log(`\n${"─".repeat(55)}`);
  if (failed === 0) {
    console.log(`✅  Pre-rendered ${total}/${total} pages successfully.\n`);
  } else {
    console.log(`⚠️   Pre-rendered ${passed}/${total} pages (${failed} failed).\n`);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error("\n❌  Pre-render aborted:", err.message, "\n");
  process.exit(1);
});
