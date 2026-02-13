import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SITE } from "@/config/site";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  type?: string;
  keywords?: string;
  canonical?: string;
  noindex?: boolean;
  structuredData?: Record<string, any>;
}

const DEFAULT_SEO = {
  title: "Cybersecurity & AI Protection in Ohio | InVision Network",
  description:
    "InVision Network provides expert cybersecurity training and AI protection for Ohio families and businesses. Protect your identity and data from online scams.",
  image:
    "https://storage.googleapis.com/gpt-engineer-file-uploads/UpYpYr7MTVdr1jgHmL94ALNUlk93/social-images/social-1761862743436-shield_purpleb.png",
  type: "website",
  keywords:
    "cybersecurity Ohio, AI scam protection, deepfake detection, senior scam training, family cybersecurity, phishing defense, Dayton Ohio",
};

export function SEO({
  title,
  description = DEFAULT_SEO.description,
  image = DEFAULT_SEO.image,
  type = DEFAULT_SEO.type,
  keywords = DEFAULT_SEO.keywords,
  canonical,
  noindex = false,
  structuredData,
}: SEOProps) {
  const location = useLocation();
  const fullTitle = title ? `${title} | InVision Network` : DEFAULT_SEO.title;
  const url = `https://invisionnetwork.org${location.pathname}`;
  const canonicalUrl = canonical || url;

  useEffect(() => {
    // Update document title
    document.title = fullTitle;

    // Update or create meta tags
    updateMeta("description", description);
    updateMeta("keywords", keywords);

    // Open Graph tags
    updateMeta("og:title", fullTitle, "property");
    updateMeta("og:description", description, "property");
    updateMeta("og:image", image, "property");
    updateMeta("og:url", url, "property");
    updateMeta("og:type", type, "property");

    // Twitter Card tags
    updateMeta("twitter:card", "summary_large_image");
    updateMeta("twitter:title", fullTitle);
    updateMeta("twitter:description", description);
    updateMeta("twitter:image", image);

    // Canonical URL
    updateLink("canonical", canonicalUrl);

    // Robots
    if (noindex) {
      updateMeta("robots", "noindex,nofollow");
    } else {
      updateMeta("robots", "index,follow,max-image-preview:large");
    }

    // Structured data
    if (structuredData) {
      updateStructuredData(structuredData);
    }
  }, [
    fullTitle,
    description,
    image,
    url,
    type,
    keywords,
    canonicalUrl,
    noindex,
    structuredData,
  ]);

  return null;
}

function updateMeta(
  name: string,
  content: string,
  attributeName: "name" | "property" = "name",
) {
  let element = document.querySelector(`meta[${attributeName}="${name}"]`);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attributeName, name);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
}

function updateLink(rel: string, href: string) {
  let element = document.querySelector(`link[rel="${rel}"]`);

  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    document.head.appendChild(element);
  }

  element.setAttribute("href", href);
}

function updateStructuredData(data: Record<string, any>) {
  const scriptId = "structured-data";
  let script = document.getElementById(scriptId) as HTMLScriptElement | null;

  if (!script) {
    script = document.createElement("script");
    script.id = scriptId;
    script.type = "application/ld+json";
    document.head.appendChild(script);
  }

  script.textContent = JSON.stringify(data);
}

// Page-specific SEO configurations
export const PAGE_SEO = {
  home: {
    title: "",
    description:
      "Protect your family from AI-powered scams. Expert training, deepfake detection, and 24/7 scam analysis. Trusted by 100+ families. Based in Dayton, OH.",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: SITE.name,
      description: SITE.tagline,
      address: {
        "@type": "PostalAddress",
        addressLocality: SITE.location.city,
        addressRegion: SITE.location.region,
        addressCountry: SITE.location.country,
      },
      telephone: SITE.phone.e164,
      url: "https://invisionnetwork.org",
      priceRange: "$$",
    },
  },
  training: {
    title: "AI Scam Protection Training",
    description:
      "Comprehensive AI scam protection training for families and seniors. Learn to spot deepfakes, phishing, and AI-powered scams. Zoom and in-person classes available.",
    keywords:
      "AI scam training, deepfake detection training, senior cybersecurity, phishing awareness, Dayton Ohio",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      name: "InVision Network Training Academy",
      description:
        "Comprehensive AI scam protection training for families, seniors, and businesses",
      url: "https://invisionnetwork.org/training",
      address: {
        "@type": "PostalAddress",
        addressLocality: SITE.location.city,
        addressRegion: SITE.location.region,
        addressCountry: SITE.location.country,
      },
      telephone: SITE.phone.e164,
      offers: [
        {
          "@type": "Offer",
          name: "Individual Training Session",
          price: "89",
          priceCurrency: "USD",
          description: "1-hour personalized AI scam protection training",
        },
        {
          "@type": "Offer",
          name: "Enterprise Training Program",
          price: "599",
          priceCurrency: "USD",
          description: "Comprehensive team training with ongoing support",
        },
      ],
    },
  },
  business: {
    title: "AI Business Solutions & Automation",
    description:
      "Transform your business with AI receptionists, automated follow-ups, and professional websites. Stop missing calls. Let AI run your front desk 24/7. Serving Dayton and all of Ohio.",
    keywords:
      "AI receptionist, business automation, AI answering service, virtual receptionist, Dayton Ohio, small business AI",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "AI Business Services",
      description: "Professional AI automation services for businesses",
      itemListElement: [
        {
          "@type": "Service",
          position: 1,
          name: "AI Receptionist & Virtual Intake Agent",
          description:
            "24/7 AI-powered phone answering that sounds human, filters spam, and books appointments automatically",
          provider: {
            "@type": "Organization",
            name: "InVision Network",
          },
          areaServed: {
            "@type": "State",
            name: "Ohio",
          },
          offers: {
            "@type": "Offer",
            price: "9500",
            priceCurrency: "USD",
            priceValidUntil: "2026-12-31",
          },
        },
        {
          "@type": "Service",
          position: 2,
          name: "AI Follow-Up Automation",
          description:
            "Automated lead nurturing, appointment reminders, and customer follow-up systems",
          provider: {
            "@type": "Organization",
            name: "InVision Network",
          },
          offers: {
            "@type": "Offer",
            price: "12500",
            priceCurrency: "USD",
          },
        },
        {
          "@type": "Service",
          position: 3,
          name: "Custom AI Automation",
          description:
            "Enterprise-grade custom AI solutions tailored to your specific business needs",
          provider: {
            "@type": "Organization",
            name: "InVision Network",
          },
          offers: {
            "@type": "Offer",
            price: "25000",
            priceCurrency: "USD",
          },
        },
      ],
    },
  },
  about: {
    title: "About Us",
    description:
      "InVision Network is Ohio's leading AI scam protection and business solutions provider. Meet our team of cybersecurity experts based in Dayton.",
    keywords:
      "InVision Network, cybersecurity Dayton, AI protection team, Ohio cybersecurity",
  },
  contact: {
    title: "Contact Us",
    description: `Get in touch with ${SITE.name} for AI scam protection services. Serving the ${SITE.location.areaLabel}. Call ${SITE.phone.display} or fill out our contact form.`,
    keywords:
      "contact InVision Network, Dayton cybersecurity contact, AI protection inquiry",
  },
  resources: {
    title: "Scam Protection Resources",
    description:
      "Free resources, guides, and articles about AI scam protection, deepfake detection, and cybersecurity. Stay informed and stay safe.",
    keywords:
      "scam protection resources, AI security guides, cybersecurity articles, deepfake information",
  },
  guestScanner: {
    title: "Guest File Scanner",
    description:
      "Scan a file without creating an account. Pay per use and get instant threat analysis with automatic deletion.",
    keywords:
      "guest file scanner, pay per scan, phishing detection, malware scan, deepfake detection",
  },
  careers: {
    title: "Careers",
    description:
      "Join the InVision Network team. We're hiring cybersecurity professionals, trainers, and AI specialists in Dayton, Ohio.",
    keywords:
      "cybersecurity careers Dayton, AI jobs Ohio, InVision Network careers",
  },
};
