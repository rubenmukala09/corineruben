import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const resendApiKey = Deno.env.get("RESEND_API_KEY")!;
const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface NewsletterSignupRequest {
  email: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email }: NewsletterSignupRequest = await req.json();

    console.log("Newsletter signup request:", email);

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: "Invalid email format" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Initialize Supabase client
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Check if email already exists
    const { data: existingSubscriber } = await supabase
      .from("newsletter_subscribers")
      .select("*")
      .eq("email", email)
      .single();

    if (existingSubscriber) {
      return new Response(
        JSON.stringify({ 
          message: "You're already subscribed!",
          alreadySubscribed: true
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Add to newsletter subscribers
    const { error: insertError } = await supabase
      .from("newsletter_subscribers")
      .insert({
        email: email,
        subscribed_at: new Date().toISOString(),
      });

    if (insertError) throw insertError;

    console.log("Added to newsletter subscribers:", email);

    // Send welcome email
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendApiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: "InVision Network <onboarding@resend.dev>",
        to: [email],
        subject: "Welcome to InVision Network Newsletter! 🛡️",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #6D28D9; margin-bottom: 10px;">Welcome to InVision Network!</h1>
              <p style="color: #666; font-size: 16px;">Thank you for subscribing to our newsletter</p>
            </div>
            
            <div style="background: #f5f3ff; padding: 20px; border-radius: 10px; margin: 20px 0;">
              <h2 style="color: #6D28D9; margin-top: 0;">What You'll Receive:</h2>
              <ul style="color: #333; line-height: 1.8;">
                <li>✓ Monthly scam alerts and warnings</li>
                <li>✓ AI security tips and best practices</li>
                <li>✓ Business automation insights</li>
                <li>✓ Exclusive offers and early access</li>
                <li>✓ Training updates and webinar invites</li>
              </ul>
            </div>
            
            <div style="margin: 30px 0;">
              <p style="color: #333;">Stay safe and informed with our expert team!</p>
            </div>
            
            <hr style="border: 1px solid #e5e5e5; margin: 20px 0;">
            
            <div style="text-align: center; color: #666; font-size: 12px;">
              <p>Need help? Contact us at <a href="mailto:hello@invisionnetwork.org" style="color: #6D28D9;">hello@invisionnetwork.org</a></p>
              <p>Didn't subscribe? <a href="mailto:hello@invisionnetwork.org?subject=Unsubscribe" style="color: #6D28D9;">Unsubscribe here</a></p>
            </div>
          </div>
        `,
      }),
    });

    if (!emailResponse.ok) {
      const error = await emailResponse.text();
      console.error("Failed to send welcome email:", error);
      // Don't throw - subscriber was added successfully
    } else {
      console.log("Welcome email sent successfully");
    }

    return new Response(
      JSON.stringify({ 
        success: true,
        message: "✓ Subscribed! Check your email."
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in newsletter-signup function:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: "Failed to process newsletter signup"
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
