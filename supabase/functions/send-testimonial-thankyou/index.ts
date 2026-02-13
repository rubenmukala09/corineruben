import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const resendApiKey = Deno.env.get("RESEND_API_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : "";
  console.log(`[SEND-TESTIMONIAL-THANKYOU] ${step}${detailsStr}`);
};

interface TestimonialThankYouRequest {
  email: string;
  name: string;
  rating?: number;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    const { email, name, rating }: TestimonialThankYouRequest =
      await req.json();

    logStep("Request data", { email, name, rating });

    // Send thank-you email
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "InVision Network <hello@invisionnetwork.org>",
        to: [email],
        subject: "Thank You for Sharing Your Story! 💜 - InVision Network",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #6D28D9;">Thank You, ${name}! 💜</h1>
            
            <p>We're incredibly grateful that you took the time to share your experience with InVision Network.</p>
            
            <div style="background: linear-gradient(135deg, #faf5ff, #ede9fe); padding: 20px; border-radius: 12px; margin: 20px 0; text-align: center;">
              <p style="font-size: 24px; margin: 0;">
                ${rating ? "⭐".repeat(rating) : "⭐⭐⭐⭐⭐"}
              </p>
              <p style="color: #6D28D9; font-weight: bold; margin-top: 10px;">Your Rating</p>
            </div>
            
            <h3>What Happens Next?</h3>
            <p>Our team will review your testimonial, and once approved, it may be featured on:</p>
            <ul>
              <li>Our website's testimonials section</li>
              <li>Our social media channels</li>
              <li>Marketing materials (with your permission)</li>
            </ul>
            
            <p>Your story helps others trust InVision Network and makes a real difference in our community.</p>
            
            <div style="background: #f0fdf4; padding: 15px; border-radius: 8px; margin: 20px 0; border: 1px solid #bbf7d0;">
              <p style="margin: 0; color: #16a34a; font-weight: bold;">
                🎁 As a thank you, you'll receive early access to our new features!
              </p>
            </div>
            
            <p style="margin-top: 30px;">With appreciation,<br><strong>The InVision Network Team</strong></p>
          </div>
        `,
      }),
    });

    if (!emailResponse.ok) {
      const error = await emailResponse.text();
      console.error("Email send failed:", error);
      throw new Error("Failed to send email");
    }

    logStep("Thank-you email sent successfully");

    return new Response(
      JSON.stringify({ success: true, message: "Thank-you email sent" }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      },
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
