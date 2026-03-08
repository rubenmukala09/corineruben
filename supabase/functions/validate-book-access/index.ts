import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, accessId } = await req.json();

    if (!email || !accessId) {
      return new Response(
        JSON.stringify({ error: "Email and Access ID are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    const { data: purchase, error } = await supabase
      .from("book_purchases")
      .select("*")
      .eq("access_id", accessId.toUpperCase().trim())
      .eq("customer_email", email.toLowerCase().trim())
      .maybeSingle();

    if (error) {
      throw new Error(error.message);
    }

    if (!purchase) {
      return new Response(
        JSON.stringify({ valid: false, error: "Invalid credentials. Please check your email and Access ID." }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Update last_accessed_at
    await supabase
      .from("book_purchases")
      .update({ last_accessed_at: new Date().toISOString() })
      .eq("id", purchase.id);

    return new Response(
      JSON.stringify({
        valid: true,
        bookIds: purchase.book_ids,
        customerName: purchase.customer_name,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("validate-book-access error:", msg);
    return new Response(
      JSON.stringify({ error: msg }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
