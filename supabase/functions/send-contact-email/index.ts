import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const resendApiKey = Deno.env.get("RESEND_API_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// Rate limiting: 10 requests per minute per IP
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 10;
const RATE_WINDOW_MS = 60 * 1000;

function checkRateLimit(ip: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_WINDOW_MS });
    return { allowed: true };
  }

  if (record.count >= RATE_LIMIT) {
    const retryAfter = Math.ceil((record.resetTime - now) / 1000);
    console.log(`[RATE LIMIT] IP ${ip} exceeded limit. Retry after ${retryAfter}s`);
    return { allowed: false, retryAfter };
  }

  record.count++;
  return { allowed: true };
}

interface ContactEmailRequest {
  name: string;
  email: string;
  phone?: string;
  interest: string;
  message: string;
  language?: string;
  preferredDate?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Rate limiting check
  const clientIP = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || 
                   req.headers.get("x-real-ip") || 
                   "unknown";
  
  const rateCheck = checkRateLimit(clientIP);
  if (!rateCheck.allowed) {
    return new Response(
      JSON.stringify({ error: "Too many requests. Please try again later." }),
      {
        status: 429,
        headers: { 
          ...corsHeaders, 
          "Content-Type": "application/json",
          "Retry-After": String(rateCheck.retryAfter)
        },
      }
    );
  }

  try {
    const { name, email, phone, interest, message, language, preferredDate }: ContactEmailRequest = await req.json();

    console.log("Sending contact form email:", { name, email, interest });

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { data: inquiry, error: dbError } = await supabase
      .from('website_inquiries')
      .insert({
        name,
        email,
        phone: phone || null,
        inquiry_type: interest,
        subject: interest,
        message,
        metadata: { language, preferredDate },
        status: 'new'
      })
      .select()
      .single();

    if (dbError) {
      console.error('Database insertion error:', dbError);
    } else {
      console.log('Inquiry saved to database:', inquiry.id);
    }

    const adminEmailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendApiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: "InVision Network <onboarding@resend.dev>",
        to: ["hello@invisionnetwork.org"],
        subject: `New Contact Form Submission - ${interest}`,
        html: `
          <h1>New Contact Form Submission</h1>
          <h2>Contact Information:</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
          <p><strong>Service Interest:</strong> ${interest}</p>
          ${language ? `<p><strong>Preferred Language:</strong> ${language}</p>` : ''}
          ${preferredDate ? `<p><strong>Preferred Date:</strong> ${preferredDate}</p>` : ''}
          
          <h2>Message:</h2>
          <p>${message.replace(/\n/g, '<br>')}</p>
          
          <hr>
          <p><small>Submitted from InVision Network Contact Form</small></p>
        `,
      }),
    });

    if (!adminEmailResponse.ok) {
      const error = await adminEmailResponse.text();
      console.error("Failed to send admin email:", error);
      throw new Error("Failed to send admin email");
    }

    console.log("Admin email sent successfully");

    const userEmailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendApiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: "InVision Network <onboarding@resend.dev>",
        to: [email],
        subject: "We received your message - InVision Network",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #6D28D9;">Thank you for contacting us, ${name}!</h1>
            
            <p>We have received your message and will get back to you within 24 hours.</p>
            
            <h2 style="color: #6D28D9;">What you submitted:</h2>
            <p><strong>Interest:</strong> ${interest}</p>
            <p><strong>Message:</strong><br>${message.replace(/\n/g, '<br>')}</p>
            
            <hr style="border: 1px solid #e5e5e5; margin: 20px 0;">
            
            <p>In the meantime, feel free to:</p>
            <ul>
              <li>Call us: <a href="tel:9375550199">(937) 555-0199</a></li>
              <li>Email us: <a href="mailto:hello@invisionnetwork.org">hello@invisionnetwork.org</a></li>
              <li>Visit our website: <a href="https://invisionnetwork.com">invisionnetwork.com</a></li>
            </ul>
            
            <p style="margin-top: 30px;">Best regards,<br><strong>The InVision Network Team</strong></p>
          </div>
        `,
      }),
    });

    if (!userEmailResponse.ok) {
      const error = await userEmailResponse.text();
      console.error("Failed to send user email:", error);
    } else {
      console.log("User confirmation email sent successfully");
    }

    return new Response(
      JSON.stringify({ 
        success: true,
        message: "Emails sent successfully"
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
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: "Failed to send contact form email"
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
