

# Visual Performance Overhaul Plan

## Problem Summary
The CSS system has accumulated ~5,000+ lines across 6 stylesheets with severe performance bottlenecks causing sluggish rendering, visual blinking, and scroll lag:

1. **268 `backdrop-filter` instances** across 7 files — each one forces GPU compositing and is the single biggest cause of scroll lag
2. **`transition: all`** still in 8+ class definitions (`.skeuo-button`, `.soft-image`, `.soft-hover`, `.soft-lift`, `.form-input`, `.widget-glow-hover`, `.widget-embossed`, `.widget-border-double`) — forces the browser to check every CSS property on every frame
3. **Duplicate animation systems** — `stagger-children` is defined in BOTH `animations.css` (lines 440-470) AND `components.css` (lines 523-551) with conflicting values, causing unpredictable behavior
4. **~400 lines of unused animation keyframes** in `animations.css` (lines 472-870) — letter animations, SVG morphing, typewriter, loop-float, etc. that are never referenced by any component
5. **Continuous infinite animations** running even when off-screen (`.btn-shine::before`, `.shimmer-border`, `.dynamic-gradient-overlay::before`, `.fluid-motion`) — constant GPU work for decorative elements
6. **Glassy loader system** (~170 lines, animations.css 223-425) with `!important` on all animations — forces rendering even when the loader isn't visible

## Implementation Plan

### 1. Neutralize `backdrop-filter` across all stylesheets
Replace all `backdrop-filter: blur(...)` with `backdrop-filter: none` in:
- `trending-ui.css`: `.glass`, `.glass-light`, `.glass-heavy`, `.glass-subtle`, `.glass-dark`, `.glass-panel`, `.glass-card-premium`, `.premium-metric-card`, `.premium-glass-card`
- `components.css`: `.skeuo-badge`, `.glass-effect`, `.widget-frosted`  
- `base.css`: `.skeuo-glass`, decorative orb
- `animations.css`: `.glassy-loader-fullscreen`
- `LoadingCard.css`: both instances

Increase background opacity to compensate (e.g., `0.82 → 0.96`) so the visual "frosted" look is preserved without GPU cost.

### 2. Replace all `transition: all` with scoped properties
In `components.css`:
- `.skeuo-button` → `transition: transform 0.2s, box-shadow 0.2s`
- `.soft-image`, `.soft-hover`, `.soft-lift` → `transition: transform 0.2s, box-shadow 0.2s`
- `.form-input` → `transition: border-color 0.2s, box-shadow 0.2s`
- `.widget-glow-hover` → `transition: transform 0.3s, box-shadow 0.3s`
- `.widget-embossed` → `transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s`
- `.neumorphism-base`, `.neumorphism-card`, `.neumorphism-widget` → scope to `transform, box-shadow`

### 3. Remove duplicate stagger-children
Delete the duplicate `stagger-children` block from `components.css` (lines 511-551) — keep the one in `animations.css` which has faster, tighter timing (40ms vs 100ms delays).

### 4. Delete unused animation keyframes
Remove from `animations.css` (lines 472-870):
- Pre-load animations (`preload-spin`, `preload-bounce`, `preload-fade`, `preload-scale`)
- Button animations (`button-ripple`, `button-shine`, `button-pulse`)
- SVG animations (`svg-draw`, `svg-morph`, `svg-fill`)
- Loop animations (`loop-float`, `loop-sway`, `loop-breathe`, `loop-rotate-slow`, `loop-wiggle`)
- Enhanced scroll animations (`scroll-reveal-up/down`, `scroll-zoom-in`, `scroll-rotate-in`)
- Image animations (`image-zoom`, `image-pan-right`, `image-reveal`, `image-blur-in`)
- Text animations (`text-slide-up`, `text-slide-left`, `text-typewriter`, `text-blink`, `text-gradient-shift`)
- Letter animations (`letter-bounce`, `letter-wave`, `letter-rotate`, `letter-glow`)
- Utility delay/duration/easing classes

**Keep**: core scroll-fade classes, hover effects, fade-in, skeleton, accordion, glass-float/orbit/pulse, and the glassy loader (trimmed).

### 5. Stop infinite animations when off-screen
Add to `animations.css`:
```css
@media (prefers-reduced-motion: no-preference) {
  .btn-shine::before,
  .fluid-motion,
  .dynamic-gradient-overlay::before {
    animation-play-state: paused;
  }
  .btn-shine:hover::before,
  .fluid-motion:hover,
  .dynamic-gradient-overlay:hover::before {
    animation-play-state: running;
  }
}
```

### 6. Trim glassy loader `!important` flags
Remove all `!important` from loader animation declarations (lines 301, 323, 337, 345, 353, 367, 381, 408). These force GPU work globally.

### 7. Reduce components.css bloat
- Remove the redundant `fadeInUpStagger` keyframe (components.css line 512) — already covered by CSS transitions in animations.css
- Remove `.page-transition` and `.section-stagger-1` through `-6` (lines 553-593) — PageTransition component is a no-op pass-through, so these are dead CSS

### Expected Impact
- **~60% reduction in total CSS weight** (from ~5,000 to ~2,000 lines)
- **Zero backdrop-filter GPU compositing** — eliminates the #1 cause of scroll lag
- **No more "blink" on section reveal** — removing conflicting duplicate stagger definitions
- **Faster paint times** — scoped transitions mean the browser only checks 2-3 properties instead of all

