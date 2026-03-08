

## Analysis: Mobile Performance Score Failing

The PageSpeed Insights analysis **times out on mobile** ("Scores could not be computed due to an analysis error"). This happens when the page is too computationally expensive for Lighthouse's mobile CPU throttling (4x slowdown) to complete analysis within the timeout window.

### Root Causes

The Index page is **1,403 lines** with these heavy mobile performance bottlenecks:

1. **Multiple CSS `blur()` filters running simultaneously** — Three aurora orbs with `blur(80-100px)` + backdrop-blur on multiple elements. Blur is extremely expensive on mobile GPUs.
2. **Many infinite framer-motion animations** — Floating badges, sparkle particles, aurora orbs, floating hearts, falling petals — all running concurrently on page load.
3. **Large hero image loaded eagerly** — `hero-wedding-opt.webp` at 1920×1080 loaded with `loading="eager"` even on mobile where it's barely visible at 10% opacity.
4. **`flowers-lavender-opt.webp` loaded with `fetchPriority="high"`** — This image in the Faith section shouldn't be high priority; it's below the fold.

### Plan

**1. Reduce blur effects on mobile**
- Add a CSS media query that reduces or removes `blur()` on aurora orbs for screens < 768px (e.g., `blur(40px)` instead of `80-100px`)
- Add `will-change: transform` to blurred elements for GPU compositing

**2. Disable heavy decorative animations on mobile**
- Use `useIsMobile()` hook in Index.tsx to conditionally skip `FallingPetals`, sparkle particles, and reduce floating badge animations on mobile
- Reduce FloatingHearts count on mobile (14 → 6)

**3. Fix image loading priorities**
- Change the flowers image `fetchPriority` from `"high"` to `"low"` (it's below the fold)
- The hero image at 10% opacity could use `loading="lazy"` on mobile since it's barely perceptible

**4. Add `content-visibility: auto` to below-fold sections**
- Apply CSS `content-visibility: auto` to sections below the hero to defer their rendering until scrolled into view

### Files Changed
- `src/pages/Index.tsx` — Conditional mobile optimizations for animations and image priorities
- `src/index.css` — Mobile media queries for blur reduction and content-visibility
- `src/components/FloatingHearts.tsx` — Reduce particle count on mobile

