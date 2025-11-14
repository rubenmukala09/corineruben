/**
 * Generate XML sitemap for SEO
 */

export interface SitemapPage {
  path: string;
  priority: number;
  changefreq: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  lastmod?: string;
}

const SITE_URL = "https://invisionnetwork.com";

export const SITEMAP_PAGES: SitemapPage[] = [
  // High priority pages
  {
    path: "/",
    priority: 1.0,
    changefreq: "daily",
  },
  {
    path: "/training",
    priority: 0.9,
    changefreq: "weekly",
  },
  {
    path: "/business",
    priority: 0.9,
    changefreq: "weekly",
  },
  {
    path: "/contact",
    priority: 0.8,
    changefreq: "monthly",
  },
  
  // Medium priority pages
  {
    path: "/about",
    priority: 0.7,
    changefreq: "monthly",
  },
  {
    path: "/resources",
    priority: 0.7,
    changefreq: "weekly",
  },
  {
    path: "/careers",
    priority: 0.6,
    changefreq: "monthly",
  },
  
  // Legal pages
  {
    path: "/privacy-policy",
    priority: 0.3,
    changefreq: "yearly",
  },
  {
    path: "/terms-of-service",
    priority: 0.3,
    changefreq: "yearly",
  },
];

export function generateSitemap(): string {
  const today = new Date().toISOString().split("T")[0];

  const urls = SITEMAP_PAGES.map((page) => {
    const lastmod = page.lastmod || today;
    return `  <url>
    <loc>${SITE_URL}${page.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
  }).join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

// Generate sitemap and save to public folder
export function saveSitemap() {
  const sitemap = generateSitemap();
  console.log("Generated sitemap:", sitemap);
  // Note: In production, you would write this to public/sitemap.xml
  // This requires server-side generation or build-time generation
  return sitemap;
}
