import fs from "fs";
import path from "path";

const SITE_URL = "https://invisionnetwork.org";
const OUTPUT_PATH = path.resolve(process.cwd(), "public", "sitemap.xml");
const ENV_PATH = path.resolve(process.cwd(), ".env");

const BASE_PAGES = [
  { path: "/", priority: 1.0, changefreq: "daily" },
  { path: "/training", priority: 0.9, changefreq: "weekly" },
  { path: "/business", priority: 0.9, changefreq: "weekly" },
  { path: "/business/ai-receptionist", priority: 0.85, changefreq: "weekly" },
  { path: "/business/ai-automation", priority: 0.85, changefreq: "weekly" },
  { path: "/business/website-design", priority: 0.85, changefreq: "weekly" },
  { path: "/business/website-insurance", priority: 0.85, changefreq: "weekly" },
  { path: "/resources", priority: 0.8, changefreq: "weekly" },
  { path: "/contact", priority: 0.8, changefreq: "monthly" },
  { path: "/about", priority: 0.7, changefreq: "monthly" },
  { path: "/services", priority: 0.7, changefreq: "weekly" },
  { path: "/faq", priority: 0.7, changefreq: "monthly" },
  { path: "/articles", priority: 0.7, changefreq: "weekly" },
  { path: "/careers", priority: 0.6, changefreq: "monthly" },
  { path: "/privacy-policy", priority: 0.3, changefreq: "yearly" },
  { path: "/terms-of-service", priority: 0.3, changefreq: "yearly" },
  { path: "/refund-policy", priority: 0.3, changefreq: "yearly" },
  { path: "/cookie-policy", priority: 0.3, changefreq: "yearly" },
  { path: "/acceptable-use", priority: 0.3, changefreq: "yearly" },
  { path: "/disclaimer", priority: 0.3, changefreq: "yearly" },
];

const readEnvValue = (key) => {
  if (!fs.existsSync(ENV_PATH)) return "";
  const env = fs.readFileSync(ENV_PATH, "utf8");
  const match = env.match(new RegExp(`^${key}=(.*)$`, "m"));
  if (!match) return "";
  return match[1].trim().replace(/^"|"$/g, "");
};

const toDate = (value) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().split("T")[0];
};

const fetchArticleSlugs = async () => {
  const supabaseUrl = readEnvValue("VITE_SUPABASE_URL");
  const supabaseKey = readEnvValue("VITE_SUPABASE_PUBLISHABLE_KEY");
  if (!supabaseUrl || !supabaseKey) {
    console.warn("Supabase env vars not found. Skipping article URLs.");
    return [];
  }

  const url = new URL(`${supabaseUrl}/rest/v1/articles`);
  url.searchParams.set("select", "slug,updated_at,published_at,created_at,status");
  url.searchParams.set("status", "eq.published");

  try {
    const res = await fetch(url.toString(), {
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
      },
    });

    if (!res.ok) {
      console.warn(`Failed to fetch articles: ${res.status} ${res.statusText}`);
      return [];
    }

    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.warn("Failed to fetch articles.", error);
    return [];
  }
};

const buildUrlEntry = ({ loc, lastmod, changefreq, priority }) => {
  const safeLastmod = lastmod || new Date().toISOString().split("T")[0];
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${safeLastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
};

const generateSitemap = async () => {
  const today = new Date().toISOString().split("T")[0];
  const articleRows = await fetchArticleSlugs();

  const baseUrls = BASE_PAGES.map((page) =>
    buildUrlEntry({
      loc: `${SITE_URL}${page.path}`,
      lastmod: today,
      changefreq: page.changefreq,
      priority: page.priority,
    })
  );

  const articleUrls = articleRows
    .filter((row) => row?.slug)
    .map((row) => buildUrlEntry({
      loc: `${SITE_URL}/articles/${row.slug}`,
      lastmod: toDate(row.updated_at || row.published_at || row.created_at) || today,
      changefreq: "monthly",
      priority: 0.6,
    }));

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...baseUrls, ...articleUrls].join("\n")}
</urlset>
`;

  fs.writeFileSync(OUTPUT_PATH, xml, "utf8");
  console.log(`Sitemap generated with ${baseUrls.length + articleUrls.length} URLs.`);
};

await generateSitemap();
