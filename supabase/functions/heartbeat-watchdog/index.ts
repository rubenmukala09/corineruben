import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    // Check for stale heartbeats using the security definer function
    const { data: staleServices, error: checkError } = await supabase.rpc("check_stale_heartbeats");

    if (checkError) {
      console.error("Error checking heartbeats:", checkError);
      return new Response(
        JSON.stringify({ error: "Failed to check heartbeats", details: checkError.message }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Get all current heartbeat statuses
    const { data: allHeartbeats, error: fetchError } = await supabase
      .from("system_heartbeats")
      .select("*")
      .order("service_name");

    if (fetchError) {
      console.error("Error fetching heartbeats:", fetchError);
    }

    // Log any dead or struggling services
    const deadServices = allHeartbeats?.filter(h => h.status === "dead") || [];
    const strugglingServices = allHeartbeats?.filter(h => h.status === "struggling") || [];

    if (deadServices.length > 0) {
      console.error("CRITICAL: Dead services detected:", deadServices.map(s => s.service_name));
      
      // Log to activity_log for audit trail
      await supabase.from("activity_log").insert({
        action: "SYSTEM_ALERT",
        entity_type: "system_heartbeats",
        details: {
          alert_type: "service_dead",
          services: deadServices.map(s => ({
            name: s.service_name,
            last_heartbeat: s.last_heartbeat,
            error_log: s.error_log,
          })),
          timestamp: new Date().toISOString(),
        },
      });

      // Send email alert if Resend is configured
      if (resendApiKey) {
        try {
          const alertHtml = `
            <h2>⚠️ InVision Network - Critical Service Alert</h2>
            <p>The following services are unresponsive:</p>
            <ul>
              ${deadServices.map(s => `
                <li>
                  <strong>${s.service_name}</strong><br/>
                  Last heartbeat: ${s.last_heartbeat}<br/>
                  ${s.error_log ? `Error: ${s.error_log}` : ''}
                </li>
              `).join('')}
            </ul>
            <p>Please investigate immediately.</p>
          `;

          await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${resendApiKey}`,
            },
            body: JSON.stringify({
              from: "InVision Network <alerts@invisionnetwork.org>",
              to: ["admin@invisionnetwork.org"],
              subject: "🚨 CRITICAL: InVision Service Down",
              html: alertHtml,
            }),
          });

          console.log("Alert email sent for dead services");
        } catch (emailError) {
          console.error("Failed to send alert email:", emailError);
        }
      }
    }

    if (strugglingServices.length > 0) {
      console.warn("WARNING: Struggling services:", strugglingServices.map(s => s.service_name));
    }

    return new Response(
      JSON.stringify({
        success: true,
        timestamp: new Date().toISOString(),
        summary: {
          total: allHeartbeats?.length || 0,
          healthy: allHeartbeats?.filter(h => h.status === "healthy").length || 0,
          struggling: strugglingServices.length,
          dead: deadServices.length,
        },
        stale_updates: staleServices,
        all_services: allHeartbeats,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Watchdog error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
