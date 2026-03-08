

# Website Audit Plan — InVision Network

## Issues Found

### Critical Issues

1. **Training page renders blank/invisible content**
   - The `/training` page shows only the footer — the main content area appears entirely white/invisible. This is a major usability failure; users cannot see any training plans or pricing.
   - Root cause likely: CSS color/background conflict where text is rendering in white on a white background, or the hero section and content sections have no visible background contrast.
   - **Fix**: Audit the Training.tsx page structure and ensure all sections have proper background colors and text contrast. Check for any CSS classes like `text-white` applied without a dark background.

2. **Massive `forwardRef` warning spam (6+ warnings on every page load)**
   - Components affected: `UnifiedCheckoutDialog`, `DonationModal`, `SEO`, `Navigation` (memo), `PrefetchLink`, `ShoppingCart`, `DialogContent`/`DialogPortal`
   - These are React warnings about function components being given refs without `React.forwardRef()`. While they don't crash the app, they indicate broken ref forwarding that can cause subtle interaction bugs (e.g., Dialog focus management, Sheet animations).
   - **Fix**: Wrap affected components in `React.forwardRef()` or remove unnecessary ref passing.

### Performance Issues

3. **Hero image too large (1.3MB)**
   - `hero-corporate-protection.webp` is 1,319KB — this is the single largest resource and takes 913ms to load. Should be compressed to under 200KB or served at appropriate dimensions.
   - **Fix**: Compress the hero image or use responsive `srcset` with smaller variants.

4. **framer-motion loaded on initial page (93KB)**
   - Per the project's own memory/architecture rules, framer-motion should be excluded from the root level and only lazy-loaded. Currently loaded as part of the initial bundle.
   - **Fix**: Ensure framer-motion imports in Index.tsx are isolated to lazy-loaded sub-components.

5. **DOM Content Loaded: 3.4s, Full Page Load: 3.6s**
   - Acceptable but could improve. The 76 script files loaded on dev is expected (Vite HMR), but production builds should be verified.

### Form Validation & Data Flow

6. **Contact form uses `useState` instead of `react-hook-form`**
   - The Contact page imports `useForm` and `zodResolver` but the `handleSubmit` function uses raw `useState` with manual form data. The Zod schema is imported (`contactFormSchema`) but may not be wired up for field-level validation feedback.
   - **Fix**: Wire up `react-hook-form` with `contactFormSchema` for proper field-level error display.

7. **Newsletter form validation is working correctly**
   - Uses Zod schema, proper error handling, loading states, and success feedback. No issues found.

### Navigation & Responsiveness

8. **Mobile navigation missing hamburger menu button on small screens**
   - On 375px width, the nav shows logo + cart + phone + Login but no hamburger icon to open the mobile menu with all nav links. Users on mobile cannot access AI & Business, Learn & Train, Resources, etc.
   - **Fix**: Ensure the hamburger menu button is visible on mobile breakpoints.

9. **Navigation responsive layout looks functional on desktop** — all 7 nav links visible, cart, phone, donate, login all accessible.

### Minor Issues

10. **`body.style.overflow` manipulation in Navigation**
    - Direct DOM mutation for scroll locking — works but could cause issues with other overlay components competing for the same property.

11. **Edge function CORS headers missing newer Supabase client headers**
    - The `process-payment` edge function uses basic CORS headers. Should include the extended headers per project standards.

---

## Implementation Plan

### Task 1: Fix Training page visibility
- Inspect `Training.tsx` full render output and all CSS classes
- Ensure hero and content sections have proper background/text colors
- Verify the page renders correctly on both desktop and mobile

### Task 2: Fix forwardRef warnings
- Add `React.forwardRef()` to: `DonationModal`, `PrefetchLink`, `ShoppingCart`, `SEO`
- These are the custom components triggering warnings; Dialog/Sheet warnings come from Radix internals and are lower priority

### Task 3: Fix mobile navigation hamburger visibility
- Ensure the hamburger menu toggle button renders on screens below `lg` breakpoint
- Verify all nav links are accessible in the mobile drawer

### Task 4: Optimize hero image size
- Compress `hero-corporate-protection.webp` to under 200KB
- Add `width`/`height` attributes to prevent layout shift

### Task 5: Wire up Contact form validation properly
- Connect `react-hook-form` + `zodResolver` with `contactFormSchema` for proper field-level error messages

### Task 6: Update edge function CORS headers
- Update `process-payment` and any other edge functions to include the full set of required CORS headers per project standards

