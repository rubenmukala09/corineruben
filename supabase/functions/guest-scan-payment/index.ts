import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const MB = 1024 * 1024;
const RATE_PER_MB = 0.1;
const MINIMUM_CHARGE = 0.5;
const MAX_FILE_MB = 500;

const ALLOWED_MIME_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "video/mp4",
  "audio/mpeg",
  "audio/mp3",
  "audio/wav",
  "audio/x-wav",
];

const ALLOWED_EXTENSIONS = [
  ".pdf",
  ".jpg",
  ".jpeg",
  ".png",
  ".mp4",
  ".mp3",
  ".wav",
];

const EXTENSION_MIME_MAP: Record<string, string> = {
  ".pdf": "application/pdf",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".mp4": "video/mp4",
  ".mp3": "audio/mpeg",
  ".wav": "audio/wav",
};

const sanitizeFileName = (name: string) =>
  name
    .replace(/[^a-zA-Z0-9._-]/g, "_")
    .replace(/_{2,}/g, "_")
    .slice(0, 120);

const getExtension = (name: string) =>
  name.slice(Math.max(0, name.lastIndexOf("."))).toLowerCase();

const calculateAmount = (bytes: number) => {
  const sizeMb = bytes / MB;
  const raw = sizeMb * RATE_PER_MB;
  const cost = Math.max(MINIMUM_CHARGE, Math.ceil(raw * 100) / 100);
  return { sizeMb, cost };
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

    const body = await req.json();
    const { fileName, fileSize, fileType } = body;
    const fileSizeNumber = Number(fileSize);

    if (!fileName || !fileSizeNumber || Number.isNaN(fileSizeNumber)) {
      throw new Error("Missing file metadata.");
    }

    const extension = getExtension(fileName);
    const normalizedType = (fileType || "").toLowerCase();
    const storedType =
      normalizedType || EXTENSION_MIME_MAP[extension] || extension;

    if (
      !ALLOWED_MIME_TYPES.includes(normalizedType) &&
      !ALLOWED_EXTENSIONS.includes(extension)
    ) {
      return new Response(JSON.stringify({ error: "Unsupported file type." }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    if (fileSize > MAX_FILE_MB * MB) {
      return new Response(
        JSON.stringify({ error: `File exceeds ${MAX_FILE_MB}MB limit.` }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        },
      );
    }

    const { cost } = calculateAmount(fileSizeNumber);
    const scanId = crypto.randomUUID();
    const sanitized = sanitizeFileName(fileName);
    const filePath = `guest/${scanId}/${sanitized}`;

    const stripe = new Stripe(stripeKey, { apiVersion: "2024-11-20.acacia" });
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(cost * 100),
      currency: "usd",
      payment_method_types: ["card"],
      metadata: {
        scan_id: scanId,
        file_name: sanitized,
        file_type: storedType,
        file_size: fileSizeNumber.toString(),
      },
    });

    const clientIp =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      null;

    const supabase = createClient(supabaseUrl, serviceRoleKey);
    const { error: insertError } = await supabase.from("guest_scans").insert({
      id: scanId,
      file_name: sanitized,
      file_size: fileSizeNumber,
      file_type: storedType,
      file_path: filePath,
      stripe_payment_id: paymentIntent.id,
      amount_paid: cost,
      status: "pending",
      ip_address: clientIp,
    });

    if (insertError) {
      throw new Error(insertError.message);
    }

    return new Response(
      JSON.stringify({
        clientSecret: paymentIntent.client_secret,
        scanId,
        amount: cost,
        filePath,
        paymentIntentId: paymentIntent.id,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      },
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Payment initialization failed.";
    return new Response(JSON.stringify({ error: message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
