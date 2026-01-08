import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface HeartbeatRequest {
  service_name: string;
  status?: "healthy" | "struggling" | "dead";
  error_log?: string;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    const body: HeartbeatRequest = await req.json();

    // Validate input
    if (!body.service_name || typeof body.service_name !== "string") {
      return new Response(
        JSON.stringify({ error: "service_name is required and must be a string" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Sanitize service name (alphanumeric and underscores only)
    const sanitizedServiceName = body.service_name.replace(/[^a-zA-Z0-9_]/g, "");
    if (sanitizedServiceName !== body.service_name) {
      return new Response(
        JSON.stringify({ error: "service_name can only contain alphanumeric characters and underscores" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const status = body.status || "healthy";
    if (!["healthy", "struggling", "dead"].includes(status)) {
      return new Response(
        JSON.stringify({ error: "status must be one of: healthy, struggling, dead" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Update heartbeat using the security definer function
    const { error } = await supabase.rpc("update_service_heartbeat", {
      p_service_name: sanitizedServiceName,
      p_status: status,
      p_error_log: body.error_log || null,
    });

    if (error) {
      console.error("Heartbeat update error:", error);
      return new Response(
        JSON.stringify({ error: "Failed to update heartbeat", details: error.message }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        service: sanitizedServiceName, 
        status,
        timestamp: new Date().toISOString() 
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Heartbeat error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
