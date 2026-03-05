import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !serviceRoleKey) {
      throw new Error("Missing Supabase service role configuration.");
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey);
    const now = new Date().toISOString();

    const { data: expiredScans, error } = await supabase
      .from("guest_scans")
      .select("id, file_path")
      .lt("expires_at", now)
      .is("deleted_at", null);

    if (error) throw error;

    const ids = expiredScans?.map((scan) => scan.id) || [];
    const filePaths =
      expiredScans?.map((scan) => scan.file_path).filter(Boolean) || [];

    if (filePaths.length) {
      await supabase.storage.from("guest-scans").remove(filePaths);
    }

    if (ids.length) {
      await supabase.from("guest_scans").delete().in("id", ids);
    }

    return new Response(
      JSON.stringify({ deleted: ids.length, filesRemoved: filePaths.length }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      },
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Cleanup failed.";
    return new Response(JSON.stringify({ error: message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
