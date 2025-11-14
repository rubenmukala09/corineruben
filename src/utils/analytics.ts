/**
 * Analytics utilities for tracking user behavior
 * Supports Google Analytics 4 and custom events
 */

// Check if user has Do Not Track enabled
export function isTrackingEnabled(): boolean {
  return navigator.doNotTrack !== "1";
}

// Initialize Google Analytics
export function initGA(measurementId: string) {
  if (!isTrackingEnabled()) return;

  // Load gtag.js script
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };

  // Default consent mode (denied until user accepts)
  window.gtag("consent", "default", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });

  window.gtag("js", new Date());
  window.gtag("config", measurementId, {
    send_page_view: false, // We'll send manually
  });
}

// Track page view
export function trackPageView(path: string, title: string) {
  if (!window.gtag || !isTrackingEnabled()) return;

  window.gtag("event", "page_view", {
    page_path: path,
    page_title: title,
  });
}

// Track custom event
export function trackEvent(
  eventName: string,
  eventParams?: Record<string, any>
) {
  if (!window.gtag || !isTrackingEnabled()) return;

  window.gtag("event", eventName, eventParams);
}

// Track button click
export function trackButtonClick(
  buttonName: string,
  location: string,
  additionalData?: Record<string, any>
) {
  trackEvent("button_click", {
    button_name: buttonName,
    location,
    ...additionalData,
  });
}

// Track form submission
export function trackFormSubmit(
  formName: string,
  formId: string,
  success: boolean = true
) {
  trackEvent("form_submit", {
    form_name: formName,
    form_id: formId,
    success,
  });
}

// Track product view
export function trackProductView(product: {
  id: string;
  name: string;
  price: number;
  category?: string;
}) {
  trackEvent("view_item", {
    items: [
      {
        item_id: product.id,
        item_name: product.name,
        price: product.price,
        item_category: product.category,
      },
    ],
  });
}

// Track add to cart
export function trackAddToCart(product: {
  id: string;
  name: string;
  price: number;
  quantity: number;
}) {
  trackEvent("add_to_cart", {
    items: [
      {
        item_id: product.id,
        item_name: product.name,
        price: product.price,
        quantity: product.quantity,
      },
    ],
    value: product.price * product.quantity,
    currency: "USD",
  });
}

// Track purchase
export function trackPurchase(order: {
  transactionId: string;
  value: number;
  tax?: number;
  shipping?: number;
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
}) {
  trackEvent("purchase", {
    transaction_id: order.transactionId,
    value: order.value,
    tax: order.tax,
    shipping: order.shipping,
    currency: "USD",
    items: order.items.map((item) => ({
      item_id: item.id,
      item_name: item.name,
      price: item.price,
      quantity: item.quantity,
    })),
  });
}

// Track conversion
export function trackConversion(conversionType: string, value?: number) {
  trackEvent("conversion", {
    conversion_type: conversionType,
    value,
  });
}

// Track scroll depth
export function trackScrollDepth(percentage: number) {
  trackEvent("scroll_depth", {
    percentage,
  });
}

// Track search
export function trackSearch(searchTerm: string, results: number) {
  trackEvent("search", {
    search_term: searchTerm,
    results_count: results,
  });
}

// Track video interaction
export function trackVideoPlay(videoTitle: string, videoUrl: string) {
  trackEvent("video_play", {
    video_title: videoTitle,
    video_url: videoUrl,
  });
}

// Track file download
export function trackDownload(fileName: string, fileType: string) {
  trackEvent("file_download", {
    file_name: fileName,
    file_type: fileType,
  });
}

// Track outbound link
export function trackOutboundLink(url: string) {
  trackEvent("click", {
    event_category: "outbound",
    event_label: url,
  });
}

// Track error
export function trackError(error: string, location: string) {
  trackEvent("exception", {
    description: error,
    fatal: false,
    location,
  });
}

// Track timing
export function trackTiming(
  category: string,
  variable: string,
  value: number
) {
  trackEvent("timing_complete", {
    name: variable,
    value: Math.round(value),
    event_category: category,
  });
}

// Type definitions
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}
