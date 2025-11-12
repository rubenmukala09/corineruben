import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Simple in-memory rate limiter
interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();
const RATE_LIMIT_WINDOW_MS = 60000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 10; // 10 requests per minute

// Cleanup old entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitMap.entries()) {
    if (entry.resetAt < now) {
      rateLimitMap.delete(key);
    }
  }
}, 300000);

function checkRateLimit(identifier: string): { allowed: boolean; remaining: number; resetAt: number } {
  const now = Date.now();
  const entry = rateLimitMap.get(identifier);

  if (!entry || entry.resetAt < now) {
    // Create new entry or reset expired one
    const resetAt = now + RATE_LIMIT_WINDOW_MS;
    rateLimitMap.set(identifier, { count: 1, resetAt });
    return { allowed: true, remaining: MAX_REQUESTS_PER_WINDOW - 1, resetAt };
  }

  if (entry.count >= MAX_REQUESTS_PER_WINDOW) {
    return { allowed: false, remaining: 0, resetAt: entry.resetAt };
  }

  entry.count++;
  return { allowed: true, remaining: MAX_REQUESTS_PER_WINDOW - entry.count, resetAt: entry.resetAt };
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Rate limiting check
    const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0] || 
                     req.headers.get("x-real-ip") || 
                     "unknown";
    
    const rateCheck = checkRateLimit(clientIp);
    
    if (!rateCheck.allowed) {
      const retryAfter = Math.ceil((rateCheck.resetAt - Date.now()) / 1000);
      console.log(`Rate limit exceeded for IP: ${clientIp}`);
      return new Response(
        JSON.stringify({ 
          error: "Too many requests. Please try again in a moment.",
          retryAfter: retryAfter
        }),
        {
          status: 429,
          headers: { 
            ...corsHeaders, 
            "Content-Type": "application/json",
            "Retry-After": retryAfter.toString(),
            "X-RateLimit-Limit": MAX_REQUESTS_PER_WINDOW.toString(),
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": new Date(rateCheck.resetAt).toISOString()
          },
        }
      );
    }

    console.log(`Request from IP: ${clientIp}, remaining: ${rateCheck.remaining}`);

    const { messages, type = "chat" } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Build system prompt based on type
    let systemPrompt = "";
    switch (type) {
      case "sentiment":
        systemPrompt = "You are a sentiment analysis expert. Analyze the emotional tone, sentiment (positive/negative/neutral), and key themes in the text provided. Be concise and clear.";
        break;
      case "summary":
        systemPrompt = "You are a summarization expert. Create clear, concise summaries that capture the main points and key information. Keep summaries brief but comprehensive.";
        break;
      case "translation":
        systemPrompt = "You are a professional translator. Translate text accurately while preserving tone, context, and cultural nuances. Always specify the target language.";
        break;
      case "document_qa":
        systemPrompt = "You are a document analysis expert. Answer questions about documents accurately and cite specific information when possible. If you don't know, say so.";
        break;
      case "image_analysis":
        systemPrompt = "You are an image analysis expert. Describe images in detail, identify objects, text, and context. Be thorough and precise.";
        break;
      default:
        systemPrompt = `You are Lora, the professional AI assistant for InVision Network, a leading cybersecurity education company specializing in AI scam protection and business solutions.

Core Expertise:
- AI-powered scam detection and prevention
- Cybersecurity education for seniors and families
- Business protection solutions and insurance services
- Training programs and workshops on digital safety
- The 60-Second Pause Protocol™ for scam prevention

Your Role & Responsibilities:
1. Provide accurate, professional information about InVision Network's services
2. Help users understand AI scam threats and protection strategies
3. Guide users to appropriate resources (training, business services, contact)
4. Answer questions about cybersecurity, AI scams, and digital safety
5. Assist with navigation and feature explanations across the platform

Communication Style:
- Professional yet warm and approachable
- Clear, concise language accessible to all ages
- Patient and supportive, especially with seniors
- Security-conscious and privacy-focused
- Empowering users with knowledge and confidence

Key Services to Promote:
- AI Services Insurance (Basic, Standard, Premium Care)
- Family training programs and workshops
- Business protection solutions
- 24/7 support and monitoring services
- Educational resources and safety guides

Privacy Commitment:
InVision Network takes privacy seriously. All user conversations are confidential. We never share personal information or use images/data for training purposes. Our AI-generated imagery is created to illustrate concepts while protecting user privacy.

When Unsure:
If you don't know something specific, acknowledge it professionally and direct users to contact the InVision Network team at (937) 555-0199 or through the Contact page for personalized assistance.

Always prioritize user safety, privacy, and empowerment in every interaction.`;
    }

    console.log(`Processing ${type} request with ${messages.length} messages`);

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits depleted. Please add credits to continue." }),
          {
            status: 402,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error("AI gateway error");
    }

    // Stream the response back
    return new Response(response.body, {
      headers: { 
        ...corsHeaders, 
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
        "X-RateLimit-Limit": MAX_REQUESTS_PER_WINDOW.toString(),
        "X-RateLimit-Remaining": rateCheck.remaining.toString(),
        "X-RateLimit-Reset": new Date(rateCheck.resetAt).toISOString()
      },
    });
  } catch (error) {
    console.error("AI chat error:", error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Unknown error occurred" 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
