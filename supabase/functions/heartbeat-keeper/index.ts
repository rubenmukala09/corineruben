import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Service configurations with their health check logic
const services = [
  {
    name: "daily_breach_scan",
    checkHealth: async (supabase: any) => {
      // Check if we can query the profiles table (breach scan target)
      const { error } = await supabase.from("profiles").select("id").limit(1);
      return !error;
    },
  },
  {
    name: "scam_feed_update",
    checkHealth: async (supabase: any) => {
      // Check if we can access activity_log (scam detection logging)
      const { error } = await supabase.from("activity_log").select("id").limit(1);
      return !error;
    },
  },
  {
    name: "threat_intel_sync",
    checkHealth: async (supabase: any) => {
      // Check if threat_events table is accessible
      const { error } = await supabase.from("threat_events").select("id").limit(1);
      return !error;
    },
  },
  {
    name: "user_alert_dispatcher",
    checkHealth: async (supabase: any) => {
      // Check if notifications system is accessible
      const { error } = await supabase.from("notifications").select("id").limit(1);
      return !error;
    },
  },
];

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    console.log("Starting heartbeat keeper check...");

    const results = [];

    for (const service of services) {
      try {
        const isHealthy = await service.checkHealth(supabase);
        const status = isHealthy ? "healthy" : "struggling";

        // Update heartbeat using the RPC function
        const { error } = await supabase.rpc("update_service_heartbeat", {
          p_service_name: service.name,
          p_status: status,
          p_error_log: isHealthy ? null : "Health check failed - table query error",
        });

        if (error) {
          console.error(`Failed to update heartbeat for ${service.name}:`, error);
          results.push({ service: service.name, status: "error", error: error.message });
        } else {
          console.log(`✓ ${service.name}: ${status}`);
          results.push({ service: service.name, status });
        }
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : "Unknown error";
        console.error(`Error checking ${service.name}:`, err);
        
        // Try to mark as struggling
        await supabase.rpc("update_service_heartbeat", {
          p_service_name: service.name,
          p_status: "struggling",
          p_error_log: `Health check exception: ${errorMsg}`,
        });
        
        results.push({ service: service.name, status: "struggling", error: errorMsg });
      }
    }

    console.log("Heartbeat keeper check complete");

    return new Response(
      JSON.stringify({
        success: true,
        timestamp: new Date().toISOString(),
        results,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : "Unknown error";
    console.error("Heartbeat keeper error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error", details: errorMsg }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
