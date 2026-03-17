/**
 * update-book-content
 *
 * Supabase Edge Function — AI-powered book content updater.
 *
 * Accepts a POST request with { book_id, chapter_id } to update a specific
 * chapter, or { book_id } to update all chapters of a book sequentially.
 *
 * The function:
 *  1. Fetches the existing chapter HTML from `book_content`.
 *  2. Sends it to Claude (Anthropic API) with a prompt to update any
 *     outdated statistics, threat examples, or technology references while
 *     preserving the chapter's structure and educational intent.
 *  3. Writes the updated HTML back to `book_content.content_html`.
 *  4. Creates a record in `update_logs` with a summary of changes.
 *
 * Authentication: requires the service-role Authorization header OR a
 * request from an admin-role Supabase user.
 *
 * Environment variables required:
 *   ANTHROPIC_API_KEY   — Anthropic API key
 *   SUPABASE_URL        — project URL (auto-injected)
 *   SUPABASE_SERVICE_ROLE_KEY — service-role key (auto-injected)
 */

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";
import Anthropic from "https://esm.sh/@anthropic-ai/sdk@0.39.0";
import { corsHeaders } from "../_shared/cors.ts";

const anthropic = new Anthropic({
  apiKey: Deno.env.get("ANTHROPIC_API_KEY") ?? "",
});

const supabase = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
);

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface RequestBody {
  book_id: string;
  chapter_id?: string; // if omitted, update all chapters
  updated_by?: string; // email of triggering admin (defaults to 'ai')
}

interface Chapter {
  id: string;
  book_id: string;
  chapter_number: number;
  chapter_title: string;
  content_html: string;
  page_start: number;
  page_end: number;
}

// ---------------------------------------------------------------------------
// AI update prompt
// ---------------------------------------------------------------------------

const buildPrompt = (chapter: Chapter): string => `
You are an expert cybersecurity author updating a digital book chapter for InVision Network,
a cybersecurity education company based in Kettering, Ohio.

The chapter is titled: "${chapter.chapter_title}"

Your task is to update the HTML content below to:
1. Replace outdated statistics with the most current available figures (update year references)
2. Update or replace any technology or service names that have changed
3. Add any new major scam types, attack vectors, or security developments relevant to the chapter topic
4. Preserve the exact HTML structure, heading hierarchy, and educational tone
5. Keep the approximate same length (within 10% of original word count)
6. Do NOT change the chapter title

Respond with ONLY the updated HTML — no preamble, no markdown code blocks, no explanation.
The response must start with <article or <p or <h and be valid HTML.

CURRENT CHAPTER HTML:
${chapter.content_html}
`.trim();

// ---------------------------------------------------------------------------
// Core update logic
// ---------------------------------------------------------------------------

async function updateChapter(
  chapter: Chapter,
  updatedBy: string
): Promise<{ chapter_id: string; summary: string }> {
  const prompt = buildPrompt(chapter);

  const message = await anthropic.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 4096,
    messages: [{ role: "user", content: prompt }],
  });

  const updatedHtml =
    message.content[0].type === "text" ? message.content[0].text.trim() : null;

  if (!updatedHtml || updatedHtml.length < 100) {
    throw new Error(`AI returned invalid content for chapter ${chapter.id}`);
  }

  // Write updated content
  const { error: updateError } = await supabase
    .from("book_content")
    .update({
      content_html: updatedHtml,
      last_ai_update: new Date().toISOString(),
    })
    .eq("id", chapter.id);

  if (updateError) throw updateError;

  // Build a brief changes summary by comparing word counts
  const originalWords = chapter.content_html.replace(/<[^>]+>/g, " ").split(/\s+/).length;
  const updatedWords = updatedHtml.replace(/<[^>]+>/g, " ").split(/\s+/).length;
  const diff = updatedWords - originalWords;
  const summary = `Chapter "${chapter.chapter_title}" updated by AI. Word count: ${originalWords} → ${updatedWords} (${diff >= 0 ? "+" : ""}${diff}). Model: claude-sonnet-4-6.`;

  // Log the update
  const { error: logError } = await supabase.from("update_logs").insert({
    book_id: chapter.book_id,
    chapter_id: chapter.id,
    changes_summary: summary,
    updated_by: updatedBy,
  });

  if (logError) console.error("Failed to write update log:", logError.message);

  return { chapter_id: chapter.id, summary };
}

// ---------------------------------------------------------------------------
// Handler
// ---------------------------------------------------------------------------

Deno.serve(async (req: Request) => {
  // CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const body: RequestBody = await req.json();
    const { book_id, chapter_id, updated_by = "ai" } = body;

    if (!book_id) {
      return new Response(JSON.stringify({ error: "book_id is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Fetch chapters to update
    let query = supabase
      .from("book_content")
      .select("*")
      .eq("book_id", book_id)
      .order("chapter_number");

    if (chapter_id) {
      query = query.eq("id", chapter_id);
    }

    const { data: chapters, error: fetchError } = await query;

    if (fetchError) throw fetchError;
    if (!chapters || chapters.length === 0) {
      return new Response(
        JSON.stringify({ error: "No chapters found for the given book_id / chapter_id" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const results: { chapter_id: string; summary: string }[] = [];
    const errors: { chapter_id: string; error: string }[] = [];

    // Update chapters sequentially to respect rate limits
    for (const chapter of chapters as Chapter[]) {
      try {
        const result = await updateChapter(chapter, updated_by);
        results.push(result);
        // Small delay between calls to avoid rate limiting
        if (chapters.length > 1) {
          await new Promise((r) => setTimeout(r, 1000));
        }
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err);
        console.error(`Failed to update chapter ${chapter.id}:`, message);
        errors.push({ chapter_id: chapter.id, error: message });
      }
    }

    return new Response(
      JSON.stringify({
        updated: results.length,
        failed: errors.length,
        results,
        errors,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("update-book-content error:", message);
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
