

## Plan: Enhanced Loading Animation, Vibrant Dark Footer, and Spanish Language Support

### 1. Revamp the Loading Animation (index.html)

Replace the current static loader with a richly animated one featuring:

- **Animated spectrum blob** in the center — a large morphing gradient bubble using CSS keyframe animations (`@keyframes morph`) that shifts shape, scale, and position in a fluid wave pattern
- **Wave effect** — SVG wave shapes at the bottom of the loader with gentle CSS animation (`@keyframes wave-drift`) for organic motion
- **Glassmorphism card** — keep the existing frosted glass card but enhance with stronger `backdrop-filter: blur(32px)`, more visible borders, and a subtle inner glow
- **Multiple animated aurora blobs** — 3-4 colorful gradient circles with different animation timings that float and pulse behind the glass card
- **Dark mode parity** — the `@media(prefers-color-scheme:dark)` section will use the same vibrant orchid/rose/amethyst palette at higher opacity so dark mode looks equally colorful

All animations will be pure CSS (no JS needed) since this runs before React loads.

### 2. Vibrant Dark Mode Footer

Update the dark mode footer CSS in `src/index.css` (line ~586-591):

- Change from near-black (`hsl(260 16% 11%)`) to a rich deep plum gradient that echoes the light mode's plum tones but darker
- Use colors like `hsl(286 20% 18%)` → `hsl(280 18% 14%)` for a warm, colorful dark footer instead of cold charcoal
- Increase the radial gradient accent opacities so the aurora shimmer is visible in dark mode
- Update `--footer-bg`, `--footer-fg`, `--footer-muted` dark mode tokens for richer contrast

### 3. Add Spanish (Hispanic) Language Support

Update `src/contexts/LanguageContext.tsx`:

- Expand the `Language` type from `'fr' | 'en'` to `'fr' | 'en' | 'es'`
- Add Spanish translations for every key in the `translations` object (~150 keys)
- Update the language selector UI (in Navigation component) to include Spanish option

### 4. Ensure Language Switching Covers All Pages

Review `Login.tsx` and `Dashboard.tsx`:

- **Login page** currently has hardcoded English strings — wrap them with `t()` calls and add corresponding translation keys
- **Dashboard page** already uses `useLanguage()` — verify all strings use `t()` and add any missing keys
- Add Spanish translations for all new keys

### Technical Details

**Files to modify:**
- `index.html` — new animated loader markup and CSS
- `src/index.css` — dark mode footer gradient colors (lines 586-591, 143-145)
- `src/contexts/LanguageContext.tsx` — add `'es'` type, ~150 Spanish translations, new Login/Dashboard keys
- `src/pages/Login.tsx` — replace hardcoded strings with `t()` calls
- `src/pages/Dashboard.tsx` — audit for untranslated strings
- `src/components/Navigation.tsx` — add Spanish option to language switcher

