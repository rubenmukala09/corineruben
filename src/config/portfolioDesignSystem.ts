/**
 * ══════════════════════════════════════════════════════════
 * PORTFOLIO DESIGN SYSTEM - Internal Documentation
 * ══════════════════════════════════════════════════════════
 *
 * This file serves as the single source of truth for the
 * portfolio's naming, categorization, and tagging system.
 */

// ─── 1. NAMING RULES ───
// Convention: Noun-based labels (modern, premium feel)
// Examples: "Brand Systems" not "Branding", "Motion Design" not "Animating"
// Rule: Every label must be a noun phrase. No gerunds (-ing).

// ─── 2. CATEGORY HIERARCHY ───
export const CATEGORY_HIERARCHY = {
  primary: [
    "Brand Systems",
    "Digital Design",
    "Print Design",
    "Typography",
    "Illustration",
    "Motion Design",
    "UI Assets",
  ],
  secondary: [
    // Visible as filter chips, not in main nav
    "Visual Style", // Glassmorphism, Brutalism, etc.
    "Industry",
    "Mood",
  ],
  hidden: [
    // CMS-only, shown in case study detail pages
    "Process",
    "Strategy",
    "Grid Type",
    "Motion Language",
    "Production Readiness",
  ],
} as const;

// ─── 3. CASE STUDY STRUCTURE (7-Section Arc) ───
export const CASE_STUDY_SECTIONS = [
  {
    type: "context",
    label: "Context & Problem",
    description: "What challenge existed and why it mattered",
    order: 0,
  },
  {
    type: "role_scope",
    label: "Role & Scope",
    description: "Your responsibilities and the project boundaries",
    order: 1,
  },
  {
    type: "visual_strategy",
    label: "Visual Strategy",
    description: "The creative direction and visual approach chosen",
    order: 2,
  },
  {
    type: "design_system",
    label: "Design System",
    description: "Colors, typography, components, and patterns",
    order: 3,
  },
  {
    type: "key_screens",
    label: "Key Screens & Assets",
    description: "The primary deliverables and hero screens",
    order: 4,
  },
  {
    type: "motion_interaction",
    label: "Motion & Interaction",
    description: "Animations, transitions, and interactive elements",
    order: 5,
  },
  {
    type: "outcome",
    label: "Outcome & Impact",
    description: "Results, metrics, and client feedback",
    order: 6,
  },
] as const;

// ─── 4. STYLE VOCABULARY (Canonical Terms) ───
// Rule: One term = one meaning = one tag.
// The canonical_term in the database is the ONLY acceptable form.
// Aliases are stored for search/import but never displayed.
export const STYLE_VOCABULARY = {
  "Neo-Brutalism": {
    banned: ["Brutalist", "Brutal UI", "New Brutalism"],
    clientFacing: "Bold, raw aesthetic with high-contrast elements",
  },
  Glassmorphism: {
    banned: ["Glass UI", "Frosted UI", "Frosted Glass"],
    clientFacing: "Layered, modern interface with depth and clarity",
  },
  Neumorphism: {
    banned: ["Soft UI", "Skeuomorphic 2.0"],
    clientFacing: "Soft, tactile interface with subtle depth",
  },
  Minimalism: {
    banned: ["Minimal", "Clean Design"],
    clientFacing: "Clean, focused design with purposeful simplicity",
  },
  "Editorial Design": {
    banned: ["Magazine Style", "Editorial Layout"],
    clientFacing: "Story-driven layouts inspired by editorial publishing",
  },
  "Experimental Typography": {
    banned: ["Expressive Type", "Type Art"],
    clientFacing: "Expressive type-led identity",
  },
} as const;

// ─── 5. TREND AGE CLASSIFICATIONS ───
export const TREND_AGES = {
  timeless: {
    label: "Timeless",
    description: "Evergreen styles that never look dated",
    color: "bg-green-500/10 text-green-700",
  },
  "trend-aware": {
    label: "Trend-Aware",
    description: "Current but with longevity built in",
    color: "bg-blue-500/10 text-blue-700",
  },
  "trend-led": {
    label: "Trend-Led",
    description: "Riding a current wave, may need refreshing in 2-3 years",
    color: "bg-amber-500/10 text-amber-700",
  },
  experimental: {
    label: "Experimental",
    description: "Pushing boundaries, not for every client",
    color: "bg-red-500/10 text-red-700",
  },
} as const;

// ─── 6. ENERGY LEVELS ───
export const BRAND_ENERGY = [
  "Calm",
  "Confident",
  "Energetic",
  "Disruptive",
  "Serious",
  "Friendly",
] as const;

// ─── 7. TAG USAGE RULES ───
// - Maximum 8 tags per project
// - At least 1 mood tag, 1 industry tag
// - Style tags should match style dictionary canonical terms ONLY
// - Do NOT create new tags without updating this file first
// - Hidden tags (process, strategy, grid, motion, production) are for CMS only

// ─── 8. AI PROMPT SEED FORMAT ───
// Example: "Minimal SaaS landing page using glassmorphism,
//           soft motion, neutral palette, and editorial typography."
// Structure: [mood] [industry] [page type] using [style],
//            [motion], [palette], and [typography].

export const generateAIPromptSeed = (project: {
  mood?: string;
  industry?: string;
  style?: string;
  motion?: string;
  palette?: string;
  typography?: string;
}) => {
  const parts = [
    project.mood,
    project.industry,
    "design",
    project.style ? `using ${project.style}` : null,
    project.motion ? `${project.motion} motion` : null,
    project.palette ? `${project.palette} palette` : null,
    project.typography ? `and ${project.typography} typography` : null,
  ].filter(Boolean);
  return parts.join(", ");
};
