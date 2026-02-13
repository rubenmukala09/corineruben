import { supabase } from "@/integrations/supabase/client";

let sessionId: string | null = null;
const COOKIE_CONSENT_KEY = "invision-cookie-consent";
const COOKIE_PREFERENCES_KEY = "invision-cookie-preferences";

export const isAnalyticsAllowed = (): boolean => {
  if (typeof window === "undefined") return false;
  const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
  if (!consent) return false;

  const prefsRaw = localStorage.getItem(COOKIE_PREFERENCES_KEY);
  if (!prefsRaw) return false;

  try {
    const prefs = JSON.parse(prefsRaw);
    return !!prefs.analytics;
  } catch {
    return false;
  }
};

// Generate or retrieve session ID
export const getSessionId = (): string => {
  if (sessionId) return sessionId;

  sessionId = sessionStorage.getItem("analytics_session_id");

  if (!sessionId) {
    sessionId = `sess_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem("analytics_session_id", sessionId);
  }

  return sessionId;
};

interface TrackEventParams {
  eventName: string;
  eventCategory?: string;
  eventData?: Record<string, unknown>;
  pageUrl?: string;
  pageTitle?: string;
}

export const trackEvent = async ({
  eventName,
  eventCategory,
  eventData,
  pageUrl,
  pageTitle,
}: TrackEventParams) => {
  if (!isAnalyticsAllowed()) {
    return;
  }

  try {
    // Use AbortController for timeout to prevent hanging requests
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const eventPayload = {
      eventName,
      eventCategory,
      eventData,
      pageUrl: pageUrl || window.location.pathname,
      pageTitle: pageTitle || document.title,
      sessionId: getSessionId(),
      userId: user?.id,
      referrer: document.referrer,
      userAgent: navigator.userAgent,
    };

    await Promise.race([
      supabase.functions.invoke("track-analytics-event", {
        body: eventPayload,
      }),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Analytics timeout")), 5000),
      ),
    ]);

    clearTimeout(timeoutId);
  } catch {
    // Silently ignore analytics errors - they should never affect UX
  }
};

export const trackPageView = (pageUrl?: string, pageTitle?: string) => {
  trackEvent({
    eventName: "page_view",
    eventCategory: "engagement",
    pageUrl,
    pageTitle,
  });
};

export const trackButtonClick = (buttonName: string, location: string) => {
  trackEvent({
    eventName: "button_click",
    eventCategory: "interaction",
    eventData: { buttonName, location },
  });
};

export const trackFormSubmit = (
  formName: string,
  formData?: Record<string, unknown>,
) => {
  trackEvent({
    eventName: "form_submit",
    eventCategory: "conversion",
    eventData: { formName, ...formData },
  });
};

export const trackConversion = (conversionType: string, value?: number) => {
  trackEvent({
    eventName: `conversion_${conversionType}`,
    eventCategory: "conversion",
    eventData: { value },
  });
};

export const trackScroll = (scrollDepth: number) => {
  trackEvent({
    eventName: "scroll_depth",
    eventCategory: "engagement",
    eventData: { depth: scrollDepth },
  });
};
