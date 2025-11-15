import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface AnalyticsEvent {
  eventName: string;
  eventCategory?: string;
  eventData?: Record<string, any>;
  pageUrl?: string;
  pageTitle?: string;
  sessionId: string;
  userId?: string;
  referrer?: string;
  userAgent?: string;
  ipAddress?: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const event: AnalyticsEvent = await req.json();

    // Track the event
    const { error: eventError } = await supabase
      .from("analytics_events")
      .insert({
        user_id: event.userId,
        session_id: event.sessionId,
        event_name: event.eventName,
        event_category: event.eventCategory,
        event_data: event.eventData || {},
        page_url: event.pageUrl,
        page_title: event.pageTitle,
        referrer: event.referrer,
        user_agent: event.userAgent,
        ip_address: event.ipAddress,
      });

    if (eventError) {
      console.error("Error tracking event:", eventError);
      throw eventError;
    }

    // Track page view if pageUrl is provided
    if (event.pageUrl) {
      await supabase.from("page_views").insert({
        user_id: event.userId,
        session_id: event.sessionId,
        page_url: event.pageUrl,
        page_title: event.pageTitle,
        referrer: event.referrer,
      });
    }

    // Update or create session
    const { data: existingSession } = await supabase
      .from("user_sessions")
      .select("*")
      .eq("session_id", event.sessionId)
      .single();

    if (existingSession) {
      await supabase
        .from("user_sessions")
        .update({
          page_views_count: existingSession.page_views_count + 1,
          ended_at: new Date().toISOString(),
        })
        .eq("session_id", event.sessionId);
    } else {
      await supabase.from("user_sessions").insert({
        session_id: event.sessionId,
        user_id: event.userId,
        ip_address: event.ipAddress,
        user_agent: event.userAgent,
        referrer: event.referrer,
        landing_page: event.pageUrl,
        page_views_count: 1,
      });
    }

    // Track conversion events
    if (event.eventName.includes("conversion") || event.eventName.includes("submit")) {
      await supabase.from("conversion_events").insert({
        user_id: event.userId,
        session_id: event.sessionId,
        conversion_type: event.eventName,
        conversion_value: event.eventData?.value || 0,
        metadata: event.eventData || {},
      });
    }

    return new Response(
      JSON.stringify({ success: true, message: "Event tracked successfully" }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error: any) {
    console.error("Error in track-analytics-event function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});