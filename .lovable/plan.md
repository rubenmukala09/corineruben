

## Plan: Performance Optimization & Live Stream Feature

### Part 1: Performance — Reduce Loading Delays

The Index page is ~1473 lines with heavy use of `framer-motion` animations on nearly every element, multiple `AuroraOrb` components with CSS blur, and several independent `useEffect` data fetches (announcements, quotes, site_settings, site_images). These compound to create perceived delays.

**Changes to `src/pages/Index.tsx`:**
- Replace the full-page loading gate (`settingsLoading` returns a spinner) with inline skeleton placeholders so the page renders immediately with content filling in
- Add `loading="lazy"` and `decoding="async"` to all below-fold images (most already have this — verify consistency)
- Reduce `whileInView` animation durations and remove staggered delays on mobile (`isMobile ? 0 : delay`)
- Consolidate data fetches: combine the separate `useSiteSettings` and `useSiteImages` calls into a single parallel fetch to reduce waterfall
- Remove duplicate `FloatingHearts` component (one defined locally in Index.tsx, another imported globally in App.tsx — the local one can be removed)

**Changes to `src/App.tsx`:**
- The global `FloatingHearts` already renders — remove the duplicate from Index.tsx

### Part 2: Live Stream Feature

**Database:** Create a `site_settings` entry for the livestream (using existing `site_settings` table — no schema change needed). Keys: `livestream_url`, `livestream_active` (`true`/`false`), `livestream_title`.

**New file: `src/components/dashboard/LivestreamManager.tsx`**
- Simple form to paste a YouTube/Facebook/Instagram Live URL
- Toggle switch to activate/deactivate the stream
- Optional title field
- Saves to `site_settings` table using keys `livestream_url`, `livestream_active`, `livestream_title`

**Changes to `src/pages/Dashboard.tsx`:**
- Add a "Live Stream" tab with a video icon (`Video` from lucide)
- Import and render `LivestreamManager`

**Changes to `src/pages/Index.tsx`:**
- Add a `LiveStreamSection` component that:
  - Reads `livestream_url`, `livestream_active`, `livestream_title` from the existing `useSiteSettings` hook
  - Only renders when `livestream_active === 'true'` and URL is present
  - Extracts YouTube/Facebook video ID and renders an embedded iframe player
  - For non-embeddable links (Instagram Live, etc.), shows a prominent "Watch Live" button that opens the link
  - Includes a share button (Web Share API on mobile, copy-to-clipboard fallback)
  - Shows a pulsing red "LIVE" badge
  - Positioned prominently near the top of the page (after hero, before announcements)
- The embed supports YouTube (`youtube.com`, `youtu.be`), Facebook Live, and generic URLs with a fallback CTA button

**URL Parsing Logic:**
- YouTube: extract video ID → `https://www.youtube.com/embed/{id}?autoplay=1`
- Facebook: use Facebook embed player URL
- Other URLs: show a styled "Watch Live" link/button instead of iframe

### Files to Create
1. `src/components/dashboard/LivestreamManager.tsx`

### Files to Edit
1. `src/pages/Index.tsx` — Remove duplicate FloatingHearts, reduce animation delays on mobile, add LiveStreamSection
2. `src/pages/Dashboard.tsx` — Add Live Stream tab + import

