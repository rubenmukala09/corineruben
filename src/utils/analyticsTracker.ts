import { supabase } from "@/integrations/supabase/client";

let sessionId: string | null = null;

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
  eventData?: Record<string, any>;
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
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
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

    await supabase.functions.invoke("track-analytics-event", {
      body: eventPayload,
    });
  } catch (error) {
    console.error("Error tracking event:", error);
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

export const trackFormSubmit = (formName: string, formData?: Record<string, any>) => {
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