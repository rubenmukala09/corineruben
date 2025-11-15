import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface VideoProcessRequest {
  testimonialId: string;
  videoUrl: string;
  thumbnailUrl?: string;
  duration?: number;
  fileSize?: number;
  mimeType?: string;
  width?: number;
  height?: number;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const videoData: VideoProcessRequest = await req.json();

    console.log("Processing video for testimonial:", videoData.testimonialId);

    // Insert video metadata
    const { data: mediaData, error: mediaError } = await supabase
      .from("testimonial_media")
      .insert({
        testimonial_id: videoData.testimonialId,
        media_type: "video",
        file_url: videoData.videoUrl,
        thumbnail_url: videoData.thumbnailUrl,
        duration_seconds: videoData.duration,
        file_size_bytes: videoData.fileSize,
        mime_type: videoData.mimeType,
        width: videoData.width,
        height: videoData.height,
        processing_status: "completed",
      })
      .select()
      .single();

    if (mediaError) {
      console.error("Error inserting media:", mediaError);
      throw mediaError;
    }

    // Update testimonial with primary media URL
    const { error: updateError } = await supabase
      .from("testimonials")
      .update({
        has_video: true,
        primary_media_url: videoData.videoUrl,
      })
      .eq("id", videoData.testimonialId);

    if (updateError) {
      console.error("Error updating testimonial:", updateError);
      throw updateError;
    }

    console.log("Video processed successfully:", mediaData);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Video processed successfully",
        media: mediaData,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error: any) {
    console.error("Error in process-testimonial-video function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});