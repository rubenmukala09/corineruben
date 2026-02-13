import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

type ThreatLevel = "safe" | "warning" | "danger";

interface GuestScanAnalysis {
  threatLevel: ThreatLevel;
  confidence: number;
  summary: string;
  findings: string[];
  recommendations: string[];
  indicators: {
    phishing: string[];
    malware: string[];
    deepfake: string[];
    voiceClone: string[];
    suspiciousLinks: string[];
  };
}

const suspiciousKeywords = [
  "urgent",
  "verify",
  "password",
  "login",
  "account locked",
  "gift card",
  "wire transfer",
  "crypto",
  "click here",
  "act now",
  "invoice",
  "payment required",
];

const suspiciousTlds = [".ru", ".zip", ".top", ".xyz", ".click"];

const extractUrls = (text: string) => {
  const urls = text.match(/https?:\/\/[^\s)]+/gi) || [];
  return Array.from(new Set(urls)).slice(0, 12);
};

const normalizeArray = (value: unknown): string[] =>
  Array.isArray(value) ? value.filter(Boolean).map(String) : [];

const fallbackAnalysis = (
  fileType: string,
  textSample: string,
  urls: string[],
): GuestScanAnalysis => {
  const lower = textSample.toLowerCase();
  const phishingIndicators: string[] = [];
  suspiciousKeywords.forEach((keyword) => {
    if (lower.includes(keyword))
      phishingIndicators.push(`Contains "${keyword}"`);
  });

  const suspiciousLinks = urls.filter((link) =>
    suspiciousTlds.some((tld) => link.toLowerCase().includes(tld)),
  );

  const findings: string[] = [];
  if (phishingIndicators.length)
    findings.push("Potential phishing language detected.");
  if (suspiciousLinks.length)
    findings.push("Suspicious links were found in the file.");

  if (
    fileType.startsWith("video/") ||
    fileType.startsWith("audio/") ||
    fileType.startsWith("image/")
  ) {
    findings.push(
      "Media file received. Deepfake/voice clone checks are preliminary.",
    );
  }

  const threatLevel: ThreatLevel =
    phishingIndicators.length || suspiciousLinks.length ? "warning" : "safe";

  return {
    threatLevel,
    confidence: threatLevel === "safe" ? 0.6 : 0.55,
    summary:
      threatLevel === "safe"
        ? "No immediate threats were detected in the sample."
        : "Potential scam indicators detected. Review recommendations carefully.",
    findings: findings.length ? findings : ["No immediate threats detected."],
    recommendations: [
      "Verify the sender independently before taking action.",
      "Avoid clicking links until the source is confirmed.",
      "If unsure, contact InVision Network support for guidance.",
    ],
    indicators: {
      phishing: phishingIndicators,
      malware: [],
      deepfake:
        fileType.startsWith("video/") || fileType.startsWith("image/")
          ? ["Preliminary visual checks only."]
          : [],
      voiceClone: fileType.startsWith("audio/")
        ? ["Preliminary audio checks only."]
        : [],
      suspiciousLinks,
    },
  };
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!stripeKey || !supabaseUrl || !serviceRoleKey) {
      throw new Error("Missing required server configuration.");
    }

    const { scanId } = await req.json();
    if (!scanId) throw new Error("scanId is required.");

    const supabase = createClient(supabaseUrl, serviceRoleKey);
    const { data: scan, error: scanError } = await supabase
      .from("guest_scans")
      .select("*")
      .eq("id", scanId)
      .single();

    if (scanError || !scan) {
      throw new Error("Scan not found.");
    }

    if (scan.status === "completed" && scan.analysis_results) {
      return new Response(
        JSON.stringify({
          analysis: scan.analysis_results,
          expiresAt: scan.expires_at,
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        },
      );
    }

    const stripe = new Stripe(stripeKey, { apiVersion: "2024-11-20.acacia" });
    const paymentIntent = await stripe.paymentIntents.retrieve(
      scan.stripe_payment_id,
    );

    if (
      paymentIntent.status !== "succeeded" &&
      paymentIntent.status !== "processing"
    ) {
      return new Response(
        JSON.stringify({
          error: "Payment not completed. Please finalize payment first.",
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 402,
        },
      );
    }

    await supabase
      .from("guest_scans")
      .update({ status: "analyzing" })
      .eq("id", scanId);

    const { data: fileData, error: fileError } = await supabase.storage
      .from("guest-scans")
      .download(scan.file_path);

    if (fileError || !fileData) {
      throw new Error("Unable to access uploaded file.");
    }

    const arrayBuffer = await fileData.arrayBuffer();
    const sampleSize = Math.min(arrayBuffer.byteLength, 50000);
    const sampleText = new TextDecoder().decode(
      arrayBuffer.slice(0, sampleSize),
    );
    const urls = extractUrls(sampleText);

    let analysis: GuestScanAnalysis | null = null;
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (LOVABLE_API_KEY) {
      const systemPrompt = `You are a cybersecurity analyst. Analyze the provided file metadata and text sample to identify phishing, malware, deepfake, and voice-clone indicators.

Return a valid JSON object with this exact schema:
{
  "threatLevel": "safe" | "warning" | "danger",
  "confidence": 0.0-1.0,
  "summary": "short summary",
  "findings": ["bullet findings"],
  "recommendations": ["actionable recommendations"],
  "indicators": {
    "phishing": ["signals"],
    "malware": ["signals"],
    "deepfake": ["signals"],
    "voiceClone": ["signals"],
    "suspiciousLinks": ["links"]
  }
}

If evidence is limited, be conservative and note limitations.`;

      const userPrompt = JSON.stringify({
        fileName: scan.file_name,
        fileType: scan.file_type,
        fileSize: scan.file_size,
        urls,
        textSample: sampleText.slice(0, 4000),
      });

      const response = await fetch(
        "https://ai.gateway.lovable.dev/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${LOVABLE_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "google/gemini-2.5-flash",
            messages: [
              { role: "system", content: systemPrompt },
              { role: "user", content: userPrompt },
            ],
            temperature: 0.2,
            response_format: { type: "json_object" },
          }),
        },
      );

      if (response.ok) {
        const data = await response.json();
        const content = data?.choices?.[0]?.message?.content || "{}";
        try {
          analysis = JSON.parse(content);
        } catch {
          analysis = null;
        }
      }
    }

    if (!analysis) {
      analysis = fallbackAnalysis(scan.file_type || "", sampleText, urls);
    }

    const normalizedConfidence = Number.isFinite(analysis.confidence)
      ? Math.min(1, Math.max(0, analysis.confidence))
      : 0.55;

    analysis = {
      threatLevel: ["safe", "warning", "danger"].includes(analysis.threatLevel)
        ? analysis.threatLevel
        : fallbackAnalysis(scan.file_type || "", sampleText, urls).threatLevel,
      confidence: normalizedConfidence,
      summary: analysis.summary || "Analysis complete.",
      findings: normalizeArray(analysis.findings),
      recommendations: normalizeArray(analysis.recommendations),
      indicators: {
        phishing: normalizeArray(analysis.indicators?.phishing),
        malware: normalizeArray(analysis.indicators?.malware),
        deepfake: normalizeArray(analysis.indicators?.deepfake),
        voiceClone: normalizeArray(analysis.indicators?.voiceClone),
        suspiciousLinks: normalizeArray(analysis.indicators?.suspiciousLinks),
      },
    };

    if (!analysis.findings.length)
      analysis.findings.push("No immediate threats detected.");
    if (!analysis.recommendations.length) {
      analysis.recommendations.push(
        "If in doubt, contact InVision Network support.",
      );
    }

    const expiresAt =
      scan.expires_at || new Date(Date.now() + 10 * 60 * 1000).toISOString();

    await supabase
      .from("guest_scans")
      .update({
        status: "completed",
        threat_level: analysis.threatLevel,
        analysis_results: analysis,
        expires_at: expiresAt,
      })
      .eq("id", scanId);

    const scamTypes: string[] = [];
    if (analysis.indicators.phishing.length) scamTypes.push("phishing");
    if (analysis.indicators.malware.length) scamTypes.push("malware");
    if (analysis.indicators.deepfake.length) scamTypes.push("deepfake");
    if (analysis.indicators.voiceClone.length) scamTypes.push("voice_clone");
    if (!scamTypes.length && analysis.threatLevel === "safe")
      scamTypes.push("safe");

    if (scamTypes.length) {
      await supabase.from("scam_statistics").insert(
        scamTypes.map((scamType) => ({
          scam_type: scamType,
          threat_level: analysis.threatLevel,
          file_type: scan.file_type,
        })),
      );
    }

    return new Response(JSON.stringify({ analysis, expiresAt }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Analysis failed.";
    return new Response(JSON.stringify({ error: message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
