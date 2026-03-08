

# Website Speed & Cleanup Plan

## Problems Found

### 1. Massive CSS Bloat (~4,600 lines across 6 files)
The project loads ALL CSS synchronously on every page. Most of it is dead code — hundreds of glass variants, premium 3D effects, material textures, loaders, and microinteractions that are either unused or overridden by `trending-ui.css` (which strips `backdrop-filter: none` on most glass classes anyway).

**Key offenders:**
- `utilities.css` (1,403 lines): ~600 lines of glass/material/texture classes that are either dead or overridden
- `trending-ui.css` (1,431 lines): ~400 lines of premium 3D/holographic/aurora effects unlikely to be used
- `animations.css` (495 lines): ~200 lines of loader animations (glassy-loader-*) and glass-float/orbit keyframes
- `components.css` (1,328 lines): Duplicate hover/card styles

### 2. framer-motion in Initial Bundle
`Index.tsx` (the homepage) directly imports `motion` and `useInView` from framer-motion. Since Index is lazy-loaded, this pulls the 93KB library into the homepage chunk — the first thing users see. It's used only for the final CTA section's fade-in animation.

Additionally, 71 components import framer-motion, meaning it's effectively always loaded.

### 3. Duplicate/Conflicting CSS Definitions
- `.glass-card` defined twice in `utilities.css` (lines 64-82 AND lines 340-367) with completely different styles
- `.glass-dark` defined twice in `trending-ui.css` (lines 40-48 AND lines 58-83)
- `.glass-colored` defined twice in `trending-ui.css` (lines 50-56 AND lines 85-105)
- Multiple hover utilities doing the same thing: `hover-lift`, `soft-hover`, `soft-lift`, `micro-bounce`, `hover-depth` — all translateY(-2px)

### 4. Unused CSS Classes
Many premium/3D classes appear to have no usage in components:
- `premium-holographic`, `premium-orb`, `premium-float-spring`, `premium-3d-card`
- `material-acrylic`, `material-acrylic-warm`, `material-metallic-*`
- `glass-glow` (with continuous animation), `specular-highlight`
- All `glassy-loader-*` classes (the loader system was disabled per memory notes)

## Plan

### Task 1: Trim Dead CSS (~1,500 lines removal)

**`utilities.css`** — Remove:
- Duplicate `.glass-card` definition (lines 340-367) — first definition at lines 64-82 is the one used
- All `glass-*` variants that are overridden by `trending-ui.css`: `glass-ultra`, `glass-coral`, `glass-lavender`, `glass-navy`, `glass-frosted`, `glass-glow` (with its continuous animation), `glass-medium`, `glass-panel`, `glass-hero`, `glass-modal`, `glass-widget`, `glass-active`, `glass-focus`, `glass-minimal`, `glass-hover` (lines 206-478)
- `glass-premium` with its 20px blur (line 196-204) — conflicts with performance standard
- `material-frosted`, `material-frosted-warm`, `material-acrylic`, `material-acrylic-warm`, `material-metallic-*`, `specular-highlight`, `material-card-premium` (lines 1246-1403) — search first to confirm no usage
- `shimmer-overlay` with infinite animation (lines 549-579)
- `premium-gradient-bg` with infinite shimmer animation (lines 846-870)

**`trending-ui.css`** — Remove:
- Duplicate `.glass-dark` and `.glass-colored` (keep second definition, remove first at lines 40-56)
- `premium-holographic` with infinite 12s animation (lines 1000-1033)
- `premium-aurora` with infinite 25s animation (lines 1035-1092)
- `premium-orb` with infinite 20s morphing animation (lines 1137-1172)
- `premium-float-spring` with infinite 8s animation (lines 1328-1347)
- `premium-gradient-text` with infinite 6s animation (lines 1184-1208)
- `text-gradient-animate` with infinite 5s animation (lines 844-869)

**`animations.css`** — Remove:
- All `glassy-loader-*` styles (lines 221-423) — the loader system is disabled per project memory
- `glass-float`, `glass-orbit`, `glass-pulse` keyframes and utility classes if unused (lines 120-219)

**`components.css`** — Remove:
- Duplicate hover utilities: keep `soft-card`/`soft-hover`, remove `soft-lift` (identical to `soft-hover`)

### Task 2: Remove framer-motion from Homepage

Replace the single `motion.div` + `useInView` usage in `Index.tsx` (final CTA section, lines 141-186) with a lightweight CSS-based `scroll-fade-up` + IntersectionObserver approach that's already available in the CSS system. This removes framer-motion from the homepage chunk entirely.

### Task 3: Deduplicate Remaining CSS Conflicts

After the bulk removal, verify no remaining duplicates exist for:
- `.glass-card` — ensure single definition
- `.glass-dark` — ensure single definition  
- `.glass-colored` — ensure single definition

### Task 4: Verify No Broken Styles

After trimming, search the codebase for any component referencing removed class names and replace with the closest surviving equivalent.

## Files to Modify

| File | Change |
|------|--------|
| `src/styles/utilities.css` | Remove ~600 lines of dead glass/material/texture classes |
| `src/styles/trending-ui.css` | Remove ~300 lines of unused premium 3D/animation effects, fix duplicates |
| `src/styles/animations.css` | Remove ~200 lines of unused loader animations |
| `src/styles/components.css` | Remove duplicate hover utilities |
| `src/pages/Index.tsx` | Replace framer-motion with CSS scroll animation |

## Impact
- CSS payload reduced by ~30-40%
- framer-motion removed from homepage critical path
- Fewer continuous CSS animations running in background (holographic, aurora, orb, shimmer)
- Faster parse time, less layout/paint work

