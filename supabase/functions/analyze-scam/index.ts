import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { content, type, timestamp } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log(`Analyzing ${type} scam submission from ${timestamp}`);

    const systemPrompt = `You are a cybersecurity expert specializing in scam detection and fraud prevention. Analyze the provided content and determine if it's a scam or legitimate communication.

Your analysis must return a JSON object with this exact structure:
{
  "riskLevel": "low" | "medium" | "high" | "critical",
  "confidence": 0.0-1.0,
  "threats": ["array of specific threats identified"],
  "recommendations": ["array of actionable recommendations"],
  "summary": "brief 1-2 sentence summary"
}

Consider these scam indicators:
- Urgency tactics and time pressure
- Requests for personal information or credentials
- Suspicious links or attachments
- Grammar/spelling errors
- Impersonation of legitimate organizations
- Too-good-to-be-true offers
- Requests for payment via unusual methods
- Emotional manipulation
- Spoofed sender information

Be thorough but concise. Focus on actionable insights.`;

    const userPrompt = `Analyze this ${type} for scam indicators:

${content}

Provide your analysis in valid JSON format only, no additional text.`;

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
          { role: "user", content: userPrompt }
        ],
        temperature: 0.3,
        response_format: { type: "json_object" }
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
          JSON.stringify({ error: "AI credits depleted. Please contact support." }),
          {
            status: 402,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error("AI analysis failed");
    }

    const data = await response.json();
    const analysisText = data.choices[0].message.content;
    
    let analysis;
    try {
      analysis = JSON.parse(analysisText);
    } catch (parseError) {
      console.error("Failed to parse AI response:", analysisText);
      // Fallback response
      analysis = {
        riskLevel: "medium",
        confidence: 0.5,
        threats: ["Unable to fully analyze content"],
        recommendations: ["Contact InVision Network support for manual review"],
        summary: "Analysis incomplete. Please contact our security team for detailed review."
      };
    }

    console.log("Analysis complete:", analysis.riskLevel, `${Math.round(analysis.confidence * 100)}% confidence`);

    return new Response(JSON.stringify(analysis), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Scam analysis error:", error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Analysis failed" 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
