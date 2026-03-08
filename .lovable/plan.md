

## Improve Loading Experience: Eliminate Perceived Lazy Loading

### Problem
The app feels like it has delayed/lazy loading because of three compounding issues:

1. **Framer Motion `whileInView` animations** — Every section starts at `opacity: 0` and only fades in when scrolled into view, creating a "blank then pop-in" effect
2. **CSS `content-visibility: auto`** on `.section-below-fold` — Causes the browser to skip rendering off-screen sections entirely, leading to visible content "popping in" as you scroll
3. **Excessive staggered animation delays** — Elements within sections have cascading delays (0.05s, 0.08s, 0.1s per item), making cards appear one by one slowly
4. **`loading="lazy"` on above-the-fold images** — The hero background image uses conditional lazy loading on mobile

### Plan

**1. Remove `content-visibility: auto` from CSS** (`src/index.css`)
- Delete the `.section-below-fold` rule that hides off-screen sections. This is the biggest contributor to the "lazy loading" feel.

**2. Speed up `whileInView` animations across `Index.tsx`**
- Reduce all `whileInView` transition durations from 0.6-0.7s to 0.3-0.4s
- Reduce stagger delays: change `delay: i * 0.1` / `i * 0.12` patterns to `i * 0.04`
- Set `viewport={{ once: true, margin: '-100px' }}` to trigger animations earlier (before elements are fully in view) instead of the current default or `-50px`

**3. Make the hero image always eager** (`Index.tsx` line 665)
- Change `loading={isMobile ? "lazy" : "eager"}` to just `loading="eager"` for the hero background

**4. Preload key above-the-fold images** (`index.html`)
- Add `<link rel="preload" as="image">` for the hero wedding image and couple image that appear first

**5. Speed up animations on `Story.tsx`** 
- Same treatment: reduce stagger delays and transition durations on timeline events and gallery items
- Increase viewport margin so animations trigger earlier

### Files to Edit
- `src/index.css` — Remove `content-visibility` rule
- `src/pages/Index.tsx` — Speed up animations, fix hero image loading
- `src/pages/Story.tsx` — Speed up animations
- `index.html` — Add image preloads

